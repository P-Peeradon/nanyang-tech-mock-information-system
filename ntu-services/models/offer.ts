import mongoose, { Schema, type Document } from "mongoose";

const offerSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    section: { type: Number, required: true },
    capacity: { type: Number, required: true },
    enrolled: { type: Number, default: 0 },
    waitlists: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    schedule: [{
        type: { type: String, enum: ['Lecture', 'Tutorial', 'Lab'] },
        day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
        timeStart: { type: String }, // HH:mm
        timeEnd: { type: String },
        venue: { type: String }
    }]
});

const Offer = mongoose.model('Offer', offerSchema);

export interface OfferDocument extends Document {
    course: mongoose.Types.ObjectId;
    section: number;
    capacity: number;
    enrolled: number;
    waitlists: mongoose.Types.ObjectId[];
    schedule: {
        type: string;
        day: string;
        timeStart: string;
        timeEnd: string;
        venue: string;
    }[];
}

export default Offer;
