import mongoose, { Schema, type Document } from 'mongoose';

const courseSchema = new Schema({
    courseCode: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    au: { type: Number, required: true },
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    prerequisites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    exam: {
        date: { type: Date },
        venue: { type: String },
        duration: { type: Number } // in minutes
    }
});

const Course = mongoose.model('Course', courseSchema);

export interface CourseDocument extends Document {
    courseCode: string;
    title: string;
    description: string;
    au: number;
    school: mongoose.Types.ObjectId;
    prerequisites: mongoose.Types.ObjectId[];
    offers: {
        section: number;
        capacity: number;
        enrolled: number;
        waitlist: mongoose.Types.ObjectId[];
        schedule: {
            type: string;
            day: string;
            timeStart: string;
            timeEnd: string;
            venue: string;
        }[];
    }[];
    exam: {
        date: Date;
        venue: string;
        duration: number;
    };
};

export default Course;