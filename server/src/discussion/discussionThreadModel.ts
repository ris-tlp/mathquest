import { Schema, Types, model } from "mongoose";

interface IDiscussionThread {
    courseId: Types.ObjectId;
    createdByEmail: string;
    title: string;
    body: string;
}

const discussionThreadSchema = new Schema<IDiscussionThread>(
    {
        courseId: { type: Schema.Types.ObjectId, required: true },
        createdByEmail: { type: String, required: true },
        title: { type: String, required: true },
        body: { type: String, required: true },
    },
    { timestamps: true }
);

export const DiscussionThread = model<IDiscussionThread>(
    "DiscussionThread",
    discussionThreadSchema
);
