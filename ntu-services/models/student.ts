import mongoose, { Schema, type Document } from "mongoose";

const studentSchema = new Schema({
    studentId: { 
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        regex: '^[UP][0-9]{7}[A-Z]$'
    },
    school: {
        type: Schema.Types.ObjectId,
        reference: 'School'
    },
    enrolmentHistory: [{
        type: {
            course: {
                type: Schema.Types.ObjectId,
                reference: 'Course',
                require: true
            },
            semester: {
                type: [Number, String],
                require: true
            },
            year: {
                type: Number,
                require: true
            }
        }
    }]
});

const Student = mongoose.model('Student', studentSchema);

export interface StudentDocument extends Document {
    userType: 'student' | 'intern';
    password: string;
    fullName: string;
    email: string;
    role: "student";
    studentId: string;
    enrolmentHistory: { 
        course: object, 
        semester: number | string, 
        year: number
    }[];
    comparePassword: (password: string) => Promise<boolean>;
}

export default Student;