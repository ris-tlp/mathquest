import { Request, Response, Router } from "express";
import { Course } from "./courseModel";

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

courseRouter.get("/:courseId", async (req: Request, res: Response) => {
    try {
        const params = req.params;

        const queryResult = await Course.findOne({
            _id: params["courseId"],
        })
            .select("-isPublished -__v")
            .exec();

        if (!queryResult) {
            res.status(404).json({
                error: "Course not found.",
            });
        } else {
            res.status(200).json({
                queryResult,
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
