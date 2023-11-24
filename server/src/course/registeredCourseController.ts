import { Request, Response, Router } from "express";
import { RegisteredCourse } from "./registeredCourseModel";
import { User } from "../user/userModel";
import { Course } from "./courseModel";

export const registeredCourseRouter = Router();

// Get all registered courses
registeredCourseRouter.get("/", async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.body["firebaseUid"];

        // Get corresponding mongo uid for firebase uid
        const user = await User.findOne({ email: "ashwini@mathquest.com" })
            .select("email")
            .exec();

        let queryResult = await RegisteredCourse.find({
            email: user?.email,
        })
            .select("courses")
            .populate("courses")
            .exec();

        let resArray: Array<any> = [];

        queryResult.forEach(async (e) => {
            const res = await Course.findOne({
                courseName: e.courses,
            });
            console.log("res", res);
            resArray.push(res);
            console.log("resArray", resArray);
        });

        setTimeout(() => {
            res.status(200).send(JSON.stringify(resArray));
        }, 0);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Register user in a specific course
registeredCourseRouter.post("/new", async (req: Request, res: Response) => {
    try {
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
