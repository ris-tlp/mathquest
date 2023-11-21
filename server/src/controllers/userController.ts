import { Request, Response, Router } from "express";
import { User } from "../models/userModel";

export const userRouter = Router();

userRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const details = req.body;
        const query_result = await User.findOne({
            email: details["email"],
            password: details["password"],
        }).exec();

        if (!query_result) {
            res.status(404).json({
                error: "Incorrect login details.",
            });
        } else {
            res.status(200).json({
                userId: query_result["_id"],
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const details = req.body;
        const user = new User(details);

        try {
            await user.save();
            res.status(201).json({ result: "User has been created." });
        } catch (error) {
            res.status(400).json({ error: "Invalid request body." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

userRouter.get("/:userEmail", async (req: Request, res: Response) => {
    try {
        const params = req.params;

        // Return everything other than password
        const query_result = await User.findOne({
            email: params["userEmail"],
        })
            .select("-password")
            .exec();

        if (!query_result) {
            res.status(404).json({
                error: "User not found.",
            });
        } else {
            res.status(200).json({
                query_result,
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
