import { Schema, Types, model } from "mongoose";

enum QuestionType {
    MCQ = "mcq",
    multipleSelect = "multipleselect",
    truthy = "truthy",
}

export interface IQuestion {
    points: number;
    questionType: QuestionType;
    options: [Types.ObjectId];
    quizID: Types.ObjectId;
}

const questionSchema = new Schema<IQuestion>(
    {
        points: { type: Number, required: true },
        questionType: {
            type: String,
            enum: Object.values(QuestionType),
        },
        options: [{ type: Schema.Types.ObjectId, ref: "QuestionOption" }],
        quizID: { type: Schema.Types.ObjectId, ref: "Quiz" },
    },
    { timestamps: true }
);

export const QuizQuestion = model<IQuestion>("QuizQuestion", questionSchema);
