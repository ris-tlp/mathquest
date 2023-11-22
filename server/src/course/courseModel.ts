import { Schema, Types, model } from "mongoose";

interface ICourse {
    courseName: string;
    courseDescription: string;
    courseSyllabus: string;
    passScore: number;
    isPublished: boolean;
}

const courseSchema = new Schema<ICourse>({
    courseName: { type: String, required: true, unique: true },
    courseDescription: { type: String, required: false },
    courseSyllabus: { type: String, required: false },
    passScore: { type: Number, required: false },
    isPublished: { type: Boolean, required: false },
});

export const Course = model<ICourse>("Course", courseSchema);
