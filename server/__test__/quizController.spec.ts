import request from "supertest";
import { app, server } from "..";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

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

describe("Tests api/courses/quizzes/getAllQuizzes", () => {
    it("should get all quizzes within a course", async () => {
        const payload = {
            courseID: "655fbe735eb88ede085051ab",
            email: "ashwini@mathquest.com",
        };

        const response = await request(app)
            .post("/api/courses/quizzes/getAllQuizzes")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("result");
    });
});

describe("api/courses/quizzes/getQuiz", () => {
    it("should get a specific quiz within a course", async () => {
        const payload = {
            quizID: "65628bf765aaaaed8fd96a9a",
        };

        const response = await request(app)
            .post("/api/courses/quizzes/getQuiz")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("questions");
    });
});
