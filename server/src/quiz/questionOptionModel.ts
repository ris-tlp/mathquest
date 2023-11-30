// Importing necessary modules from Mongoose library
import { Schema, Types, model } from "mongoose";

// Defining the interface for a question option
export interface IQuestionOption {
    content: string;
    isCorrect: boolean;
    questionID: Types.ObjectId;
}

// Creating a Mongoose schema for the question option
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

// Creating a Mongoose model based on the schema
export const QuizQuestionOption = model<IQuestionOption>(
    "QuizQuestionOption",
    questionOptionSchema
);
