import { Schema, Types, model } from "mongoose";

interface IRegisteredCourse {
    email: String;
    courses: [Types.ObjectId];
}

const registeredCourseSchema = new Schema<IRegisteredCourse>({
    email: { type: String, required: true },
    courses: [{ type: String, required: true }],
});

export const RegisteredCourse = model<IRegisteredCourse>(
    "registeredCourse",
    registeredCourseSchema
);
