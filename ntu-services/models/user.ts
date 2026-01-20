import mongoose, { type Document } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    nanyangId: { type: String, required: true }, // Using Student/Staff ID (e.g., U1234567A)
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'teaching_staff', 'school_admin', 'registrar_admin'],
        required: true,
    }
});

UserSchema.pre('save', async function() {
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

UserSchema.methods.comparePassword = async function(candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model<UserDocument>('user', UserSchema);

export interface UserDocument extends Document {
    password: string,
    nanyangId: string,
    fullName: string,
    email: string,
    role: "student" | "teaching_staff" | "school_admin" | "registrar_admin",
    comparePassword: (password: string) => Promise<boolean>;
}

export default User;