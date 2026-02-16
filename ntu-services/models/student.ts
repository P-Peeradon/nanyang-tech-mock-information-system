import mongoose, { Schema, type Document } from "mongoose";

const studentSchema = new Schema({
    studentId: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        regex: '^[UP][0-9]{7}[A-Z]$'
    },
    major: { type: String, required: true },
    minor: { type: String },
    yearOfStudy: { type: Number, required: true, min: 1, max: 5 },
    registrationSlot: { type: Date }, // Specific time they can start registering
    currentAUs: { type: Number, default: 0 },
    maxAUs: { type: Number, default: 21 },
    school: {
        type: Schema.Types.ObjectId,
        reference: 'School'
    },
    academicStatus: {
        type: String,
        enum: ['Active', 'On Leave', 'Graduated', 'Withdrawn'],
        default: 'Active'
    },
    enrolmentThisSemester: [{
        type: Schema.Types.ObjectId,
        reference: 'Enrolment'
    }],
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
            },
            grade: {
                type: String,
                require: false
            },
            status: {
                type: String,
                enum: ['Registered', 'Waitlisted', 'Completed', 'Dropped']
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
        year: number,
        grade: string,
        status: string
    }[];
    comparePassword: (password: string) => Promise<boolean>;
}

export default Student;