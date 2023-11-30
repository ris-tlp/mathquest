// Import necessary components from the mongoose library
import { Schema, Types, model } from "mongoose";

// Define an interface for the structure of a registered course
interface IRegisteredCourse {
    email: String;
    courses: [Types.ObjectId];
}

// Create a mongoose schema for the registered course, using the defined interface
const registeredCourseSchema = new Schema<IRegisteredCourse>({
    email: { type: String, required: true, ref: "User", refPath: "email" },
    courses: [{ type: Schema.Types.ObjectId, required: true, ref: "Course" }],
});

// Create a mongoose model for the registered course using the schema and interface
export const RegisteredCourse = model<IRegisteredCourse>(
    "registeredCourse",
    registeredCourseSchema
);
