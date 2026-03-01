import mongoose, { type Document } from "mongoose";
import bcrypt from "bcryptjs";

const baseOptions = {
    discriminatorKey: 'role', // This is the crucial field Mongoose will use
    timestamps: true,
};

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['student', 'staff', 'admin', 'intern'],
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^\+65 \d{2} \d{3} \d{4}$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[a-z]\.[a-z]+[0-9]{4}@(student)?\.nanyang\.edu\.sg$/
    },
    nanyangId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    },
    password: {
        type: String,
        required: true,
    },

}, baseOptions);

UserSchema.pre('save', async function () {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return;
    }

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(this.password, salt);

        // Replace the plaintext password with the hashed password
        this.password = hashedPassword;
        return;
    } catch (err) {
        console.error(err);
        throw err;
    }
});

UserSchema.pre('findOneAndDelete', async function (next: any) {
    const userId: mongoose.Types.ObjectId = this.getQuery()._id;

    try {
        // Automatically remove the corresponding student record
        await mongoose.model('Student').deleteMany({ user: userId });
        next();
    } catch (err: any) {
        next(err);
    }
});

UserSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<UserDocument>('user', UserSchema);

export interface UserDocument extends Document {
    role: 'student' | 'staff' | 'admin' | 'intern',
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    nanyangId: string,
    comparePassword: (password: string) => Promise<boolean>;
}

export default User;