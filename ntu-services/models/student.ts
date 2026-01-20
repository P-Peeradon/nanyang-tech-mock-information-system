import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentId: { 
        type: String,
        required: true,
        trim: true,
        uppercase: true
    }
});

const Student = mongoose.model('student', studentSchema);

export default Student;