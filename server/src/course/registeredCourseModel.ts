import { Schema, Types, model } from "mongoose";

interface IRegisteredCourse {
    student: Types.ObjectId;
    courses: [Types.ObjectId];
}

const registeredCourseSchema = new Schema<IRegisteredCourse>({
    student: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true,
    },
    courses: [{ type: Schema.Types.ObjectId, required: true, ref: "Course" }],
});

export const RegisteredCourse = model<IRegisteredCourse>(
    "RegisteredCourse",
    registeredCourseSchema
);
