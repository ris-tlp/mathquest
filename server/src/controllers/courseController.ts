import { Request, Response, Router } from "express";
import { Course } from "../models/courseModel";

export const courseRouter = Router();

courseRouter.post("/", async (req: Request, res: Response) => {
    try {
        const details = req.body;
        const course = new Course(details);

        try {
            await course.save();
            res.status(201).json({
                result: "Course has been created.",
                course: course,
            });
        } catch (error) {
            res.status(400).json({ error: "Invalid request body." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
