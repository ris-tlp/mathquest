import { Request, Response, Router } from "express";
import { RegisteredCourse } from "./registeredCourseModel";
import { User } from "../user/userModel";
import { Course } from "./courseModel";

export const registeredCourseRouter = Router();

// Get all registered courses
registeredCourseRouter.post("/", async (req: Request, res: Response) => {
    try {
        const _email = req.body.e;
        console.log("hello", _email);
        // Get corresponding mongo uid for firebase uid
        const user = await User.findOne({ email: _email })
            .select("email")
            .exec();
        // console.log("here", user)
        let queryResult = await RegisteredCourse.find({
            email: user?.email,
        })
            .select("courses")
            .populate("courses")
            .exec();

        queryResult = await Course.find({
            courseName: { $in: [...queryResult[0].courses] },
        });

        console.log(queryResult);

        res.status(200).json({ courses: queryResult });
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
