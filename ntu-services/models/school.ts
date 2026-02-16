import mongoose, { Schema, type Document } from "mongoose";

const schoolSchema = new Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    college: { type: String, required: true },
    location: { type: String } // Singapore Address.
}, { timestamps: true });

const School = mongoose.model('School', schoolSchema);

export interface SchoolDocument extends Document {
    name: string;
    code: string;
    college: string;
    location: string;
};

export default School;