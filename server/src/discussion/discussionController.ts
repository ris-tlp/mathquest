import { Request, Response, Router } from "express";
import { DiscussionThread } from "./discussionThreadModel";
import { DiscussionReply } from "./discussionReplyModel";

// /api/courses/discussions
export const discussionController = Router();

// Get all threads in a course
discussionController.post("/threads/", async (req: Request, res: Response) => {
    try {
        const courseID = req.body.courseID;
        console.log(courseID);
        const queryResult = await DiscussionThread.find({
            courseId: courseID,
        })
            .select("-courseId")
            .exec();
        console.log(queryResult);
        if (queryResult) {
            res.status(200).json({ threads: queryResult });
        } else {
            res.status(404).json({ error: "Discussion Threads not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all replies of a specific thread
discussionController.post("/replies/", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const queryResult = await DiscussionReply.find({
            threadId: body["threadId"],
        })
            .select("-threadId")
            .exec();
        if (queryResult) {
            res.status(200).json({ replies: queryResult });
        } else {
            res.status(404).json({ error: "Discussion Threads not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create a thread in a course
discussionController.post("/threads/", async (req: Request, res: Response) => {
    try {
        const body = req.body;

        try {
            const newThread = await new DiscussionThread({
                courseId: body["courseId"],
                createdByEmail: body["email"],
                title: body["title"],
                body: body["body"],
            }).save();

            res.status(201).json({ thread: newThread });
        } catch (error) {
            res.status(400).json({ error: "Missing information" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create a reply in a thread
discussionController.post("/replies/", async (req: Request, res: Response) => {
    try {
        const body = req.body;

        try {
            const newReply = await new DiscussionReply({
                threadId: body["threadId"],
                createdByEmail: body["email"],
                body: body["body"],
            }).save();

            res.status(201).json({ reply: newReply });
        } catch (error) {
            res.status(400).json({ error: "Missing information" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
