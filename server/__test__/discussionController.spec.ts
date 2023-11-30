import request from "supertest";
import { app, server } from "..";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import { DiscussionThread } from "../src/discussion/discussionThreadModel";
import { DiscussionReply } from "../src/discussion/discussionReplyModel";
import { Course } from "../src/course/courseModel";

beforeAll(async () => {
    server.close();
    await mongoose.connection.close();
    dotenv.config();
    await mongoose.connect(process.env.MONGODB_URI!);
    server.listen(process.env.PORT);
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});

describe("Tests /api/courses/discussions/getAllThreads", () => {
    it("should get all threads within a course", async () => {
        const payload = {
            courseID: "655fbe735eb88ede085051ab",
        };

        const response = await request(app)
            .post("/api/courses/discussions/getAllThreads")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("threads");
    });
});

describe("Tests /api/courses/discussions/getAllReplies", () => {
    it("should get all threads within a course", async () => {
        const payload = {
            threadId: "6560d706ae6fd2fa22b581a3",
        };

        const response = await request(app)
            .post("/api/courses/discussions/getAllReplies")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("threadInfo");
        expect(response.body).toHaveProperty("replies");
    });
});

describe("Tests /api/courses/discussions/createThread", () => {
    it("should create a new thread within a course", async () => {
        const payload = {
            courseID: "655fbe735eb88ede085051ab",
            email: "test@mathquest.com",
            title: "test title",
            body: "body",
        };

        const response = await request(app)
            .post("/api/courses/discussions/createThread")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("thread");

        await DiscussionThread.findOne({ _id: response.body["thread"]["_id"] })
            .deleteOne()
            .exec();
    });
});

describe("Tests /api/courses/discussions/createThread", () => {
    it("should not create a new thread within a course because of incorrect payload", async () => {
        const payload = {
            courseId: "655fbe735eb88ede085051ab",
            email: "test@mathquest.com",
            title: "test title",
            body: "body",
        };

        const response = await request(app)
            .post("/api/courses/discussions/createThread")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});

describe("Tests /api/courses/discussions/createReply", () => {
    it("should create a new reply in a thread", async () => {
        const payload = {
            threadId: "6560d706ae6fd2fa22b581a3",
            createdByEmail: "test@mathquest.com",
            body: "body",
        };

        const response = await request(app)
            .post("/api/courses/discussions/createReply")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("reply");

        await DiscussionReply.find({ _id: response.body["reply"]["_id"] })
            .deleteOne()
            .exec();
    });
});

describe("Tests /api/courses/discussions/createReply", () => {
    it("should not create a new reply in a thread because of incorrect payload", async () => {
        const payload = {
            threadID: "6560d706ae6fd2fa22b581a3",
            createdByEmail: "test@mathquest.com",
            body: "body",
        };

        const response = await request(app)
            .post("/api/courses/discussions/createReply")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});
