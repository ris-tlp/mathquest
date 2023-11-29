import { Schema, Types, model } from "mongoose";

interface ICourse {
    courseName: string;
    courseDescription: string;
    courseSyllabus: string;
    passScore: number;
    isPublished: boolean;
    courseImg: string;
    courseInstructor: string;
    email: string; // important
    courseDuration: string;
    overview: string;
    instructorImage: string;
    instructorDescription: string;
    whatYouWillLearn: [string];
    courseVideoUrl: string;
}

const courseSchema = new Schema<ICourse>({
    courseName: { type: String, required: true, unique: true },
    courseDescription: { type: String, required: false },
    courseSyllabus: { type: String, required: false },
    courseImg: { type: String },
    passScore: { type: Number, required: false },
    isPublished: { type: Boolean, required: false },
    courseInstructor: { type: String, required: false },
    email: { type: String, required: true },
    courseDuration: { type: String, required: false },
    overview: { type: String, required: false },
    instructorImage: { type: String, required: false },
    instructorDescription: { type: String, required: false },
    whatYouWillLearn: [{ type: String, required: false }],
    courseVideoUrl: { type: String, required: false },
});

export const Course = model<ICourse>("Course", courseSchema);
