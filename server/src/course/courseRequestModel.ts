// Importing necessary modules from Mongoose
import { Schema, Types, model } from "mongoose";

// Enum to define possible request statuses
export enum RequestStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
}

// Interface defining the structure of a course request
interface ICourseRequest {
    courseId: Types.ObjectId;
    teacherEmail: string;
    requestStatus: RequestStatus;
}

// Creating a Mongoose schema for the CourseRequest model
const courseRequestSchema = new Schema<ICourseRequest>(
    {
        courseId: { type: Schema.Types.ObjectId, ref: "Course" },
        teacherEmail: { type: String },
        requestStatus: {
            type: String,
            enum: Object.values(RequestStatus),
            default: RequestStatus.ACCEPTED,
        },
    },
    { timestamps: true }
);

// Creating the CourseRequest model using the defined schema
export const CourseRequest = model<ICourseRequest>(
    "CourseRequest",
    courseRequestSchema
);
