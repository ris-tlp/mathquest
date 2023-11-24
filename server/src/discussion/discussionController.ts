import { Request, Response, Router } from "express";
import { DiscussionThread } from "./discussionModel";

// /api/courses/discussions
export const discussionController = Router();

// Get all threads in a course
discussionController.get("/", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const queryResult = await DiscussionThread.find({
            courseId: body["courseId"],
        })
            .select("-courseId")
            .exec();

        if (queryResult) {
            res.status(200).json({ threads: queryResult });
        } else {
            res.status(404).json({ error: "Discussion Threads not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
