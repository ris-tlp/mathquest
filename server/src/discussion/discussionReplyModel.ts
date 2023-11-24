import { Schema, Types, model } from "mongoose";

interface IDiscussionReply {
    threadId: Types.ObjectId;
    createdByEmail: string;
    body: string;
}

const discussionReplySchema = new Schema<IDiscussionReply>({
    threadId: { type: Schema.Types.ObjectId, required: true },
    createdByEmail: { type: String, required: true },
    body: { type: String, required: true },
});

export const DiscussionReply = model<IDiscussionReply>(
    "DiscussionReply",
    discussionReplySchema
);
