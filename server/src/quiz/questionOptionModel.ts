import { Schema, Types, model } from "mongoose";

export interface IQuestionOption {
    content: string;
    isCorrect: boolean;
}

const questionOptionSchema = new Schema<IQuestionOption>(
    {
        content: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
    },
    { timestamps: true }
);

export const QuizQuestionOption = model<IQuestionOption>(
    "QuizQuestionOption",
    questionOptionSchema
);
