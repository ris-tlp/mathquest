import { Schema, Types, model } from "mongoose";

export interface IQuestionOption {
    content: string;
    isCorrect: boolean;
    questionID: Types.ObjectId;
}

const questionOptionSchema = new Schema<IQuestionOption>(
    {
        content: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        questionID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "QuizQuestion",
        },
    },
    { timestamps: true }
);

export const QuizQuestionOption = model<IQuestionOption>(
    "QuizQuestionOption",
    questionOptionSchema
);
