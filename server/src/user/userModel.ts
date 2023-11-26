import { Schema, Types, model } from "mongoose";

enum UserType {
    TEACHER = "teacher",
    ADMINISTRATOR = "administrator",
    STUDENT = "student",
}

export interface IUser {
    fullName: string;
    email: string;
    userType: UserType;
    firebaseUid: string;
    image: string;
    // registeredCourses: Array<string>;
}

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: false },
    email: { type: String, required: true },
    userType: {
        type: String,
        enum: Object.values(UserType),
        default: UserType.STUDENT,
    },
    firebaseUid: { type: String, required: false, unique: true },
    image: { type: String, required: false, unique: true },
});

export const User = model<IUser>("User", userSchema);
