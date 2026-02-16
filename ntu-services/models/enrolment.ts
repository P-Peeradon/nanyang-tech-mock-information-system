import mongoose, { Schema, type Document } from "mongoose";

const enrolmentSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    status: {
        type: String,
        enum: ['Registered', 'Pending', 'Dropped'],
        default: 'Pending'
    },
    enrolledAt: { type: Date, default: Date.now }
});

export interface EnrolmentDocument extends Document {
    student: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    status: string;
    enrolledAt: Date;
}

const Enrolment = mongoose.model('Enrolment', enrolmentSchema);

export default Enrolment;