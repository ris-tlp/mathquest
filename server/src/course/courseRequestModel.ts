import { Schema, Types, model } from "mongoose";

export enum RequestStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
}

interface ICourseRequest {
    courseId: Types.ObjectId;
    teacherEmail: string;
    requestStatus: RequestStatus;
}

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

export const CourseRequest = model<ICourseRequest>(
    "CourseRequest",
    courseRequestSchema
);
