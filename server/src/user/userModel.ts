import { Schema, Types, model } from "mongoose";

enum UserType {
    TEACHER = "teacher",
    ADMINISTRATOR = "administrator",
    STUDENT = "student",
}

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    userType: UserType;
    firebaseUid: string;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    userType: {
        type: String,
        enum: Object.values(UserType),
        default: UserType.STUDENT,
    },
    firebaseUid: { type: String, required: true, unique: true },
});

export const User = model<IUser>("User", userSchema);
