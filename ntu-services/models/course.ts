import mongoose, { Schema, type Document } from 'mongoose';

const courseSchema = new Schema({
    courseCode: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    aus: { type: Number, required: true },
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    prerequisites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    indexes: [{
        indexCode: { type: String, required: true }, // e.g. "10101"
        capacity: { type: Number, required: true },
        enrolled: { type: Number, default: 0 },
        waitlist: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
        schedule: [{
            type: { type: String, enum: ['Lecture', 'Tutorial', 'Lab'] },
            day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
            timeStart: { type: String }, // HH:mm
            timeEnd: { type: String },
            venue: { type: String }
        }]
    }],
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
    aus: number;
    school: mongoose.Types.ObjectId;
    prerequisites: mongoose.Types.ObjectId[];
    indexes: {
        indexCode: string;
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
}

export default Course