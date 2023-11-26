import { Request, Response, Router } from "express";
import { DiscussionThread } from "./discussionThreadModel";
import { DiscussionReply } from "./discussionReplyModel";
import { User } from "../user/userModel";

// /api/courses/discussions
export const discussionRouter = Router();

// Get all threads in a course
discussionRouter.post("/getAllThreads", async (req: Request, res: Response) => {
    try {
        const courseID = req.body.courseID;

        // await new DiscussionThread({
        //     courseId: courseID,
        //     title: "This is a new title with a timestamp.",
        //     body: "This is a new body of a thread with a timestamp",
        //     createdByEmail: "ashwini@mathquest.com"
        // }).save()

        // console.log(courseID);

        const queryResult = await DiscussionThread.find({
            courseId: courseID,
        })
            .select("-courseId")
            .exec();

        if (queryResult) {
            var finalizedThreads: JSON[] = [];

            // Big(O of lmfao)
            for (let i = 0; i < queryResult.length; i++) {
                let thread = JSON.stringify(queryResult[i]);
                let threadJson = JSON.parse(thread);

                // Add the user object for each thread
                const user = await User.findOne({
                    email: threadJson.createdByEmail,
                }).exec();
                threadJson.user = user;

                console.log(threadJson._id);

                // Get number of replies
                const numberOfReplies = await DiscussionReply.countDocuments({
                    threadId: threadJson._id,
                });

                threadJson.numberOfReplies = numberOfReplies;

                finalizedThreads.push(threadJson);
            }

            res.status(200)
                .setHeader("Content-Type", "application/json")
                .json({ threads: finalizedThreads });
        } else {
            res.status(404).json({ error: "Discussion Threads not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all replies of a specific thread
discussionRouter.post(
    "/getAllReplies/",
    async (req: Request, res: Response) => {
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
                res.status(404).json({
                    error: "Discussion Threads not found.",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

// Create a thread in a course
discussionRouter.post("/createThread", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        console.log("here", body);
        try {
            const newThread = await new DiscussionThread({
                courseId: body?.courseID,
                createdByEmail: body?.email,
                title: body.title,
                body: body.body,
            }).save();

            console.log(newThread);
            res.status(201).json({ thread: newThread });
        } catch (error) {
            res.status(400).json({ error: "Missing information" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create a reply in a thread
discussionRouter.post("/createReply/", async (req: Request, res: Response) => {
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
