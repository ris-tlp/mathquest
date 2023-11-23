import { Request, Response, Router } from "express";
import { Course } from "../course/courseModel";
import { User, IUser } from "../user/userModel";

export const dataInitRouter = Router();

dataInitRouter.get("/createuser", async (req: Request, res: Response) => {
    try {
        let user1 = new User({
            firstName: "Omar",
            lastName: "Khan",
            firebaseUid: "tis an id",
            email: "email@email.com",
            userType: "student",
        });

        User.findOneAndUpdate({ email: user1.email }, user1, {
            upsert: true,
        }).exec();

        let user2 = new User({
            firstName: "Anand",
            lastName: "Verma",
            firebaseUid: "tis an id as well",
            email: "anand@anand.com",
            userType: "teacher",
        });

        User.findOneAndUpdate({ email: user2.email }, user2, {
            upsert: true,
        }).exec();

        let user3 = new User({
            firstName: "Tharun",
            lastName: "Polu",
            firebaseUid: "tis an id too",
            email: "tharun@tharun.com",
            userType: "administrator",
        });

        User.findOneAndUpdate({ email: user3.email }, user3, {
            upsert: true,
        }).exec();
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
