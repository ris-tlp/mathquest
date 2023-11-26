import { Schema, Types, model } from "mongoose";

interface IQuiz {
    courseID: Types.ObjectId;
    duration: number;
    numberOfAttempts: number;
    dueDate: Date;
    summary: String;
}

const quizSchema = new Schema<IQuiz>(
    {
        courseID: { type: Schema.Types.ObjectId, required: true },
        duration: { type: Number, default: 120 },
        numberOfAttempts: { type: Number, default: 1 },
        dueDate: { type: Schema.Types.Date },
        summary: { type: String },
    },
    { timestamps: true }
);

export const Quiz = model<IQuiz>("Quiz", quizSchema);
