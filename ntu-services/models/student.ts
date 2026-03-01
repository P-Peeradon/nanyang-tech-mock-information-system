import mongoose, { Schema } from "mongoose";
import User, { type UserDocument } from "./user";

const studentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // This must match the name of your User model
        required: true,
        unique: true // One user can only be one student
    },
    studentId: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        match: /^[UP][0-9]{7}[A-Z]$/
    },
    major: { type: String, required: true },
    minor: { type: String },
    yearOfStudy: { type: Number, required: true, min: 1, max: 5 },
    registrationSlot: { type: Date }, // Specific time they can start registering
    currentAUs: { type: Number, default: 0 },
    maxAUs: { type: Number, default: 21 },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    },
    academicStatus: {
        type: String,
        enum: ['Active', 'On Leave', 'Graduated', 'Withdrawn'],
        default: 'Active'
    },
    enrolmentThisSemester: [{
        type: Schema.Types.ObjectId,
        ref: 'Enrolment'
    }],
    enrolmentHistory: [{
        type: {
            course: {
                type: Schema.Types.ObjectId,
                ref: 'Course',
                required: true
            },
            semester: {
                type: Schema.Types.Mixed,
                required: true
            },
            year: {
                type: Number,
                required: true
            },
            grade: {
                type: String,
                required: false
            },
            status: {
                type: String,
                enum: ['Registered', 'Waitlisted', 'Completed', 'Dropped']
            }
        }
    }]
});

const Student = User.discriminator<StudentDocument>('student', studentSchema);

export interface StudentDocument extends UserDocument {
    user: mongoose.Types.ObjectId;
    studentId: string;
    major: string;
    minor?: string;
    yearOfStudy: number;
    registrationSlot?: Date;
    currentAUs: number;
    maxAUs: number;
    school: mongoose.Types.ObjectId;
    academicStatus: 'Active' | 'On Leave' | 'Graduated' | 'Withdrawn';
    enrolmentThisSemester: mongoose.Types.ObjectId[];
    enrolmentHistory: {
        course: mongoose.Types.ObjectId,
        semester: number | string,
        year: number,
        grade?: string,
        status: 'Registered' | 'Waitlisted' | 'Completed' | 'Dropped'
    }[];
}

export default Student;
