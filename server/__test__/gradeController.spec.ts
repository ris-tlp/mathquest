import request from "supertest";
import { app, server } from "..";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import { QuizGrade } from "../src/course/quizGradeModel";

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

describe("Tests api/courses/quizzes/grades/gradeQuiz", () => {
    it("should grade a quiz", async () => {
        const payload = {
            quizID: "65628bf765aaaaed8fd96a9a",
            email: "test@mathquest.com",
            answers: [
                {
                    questionID: "656519c20205e01b64b85e22",
                    optionSelectedID: "65651cac293819660ab01398",
                },
            ],
        };

        const response = await request(app)
            .post("/api/courses/quizzes/grades/gradeQuiz")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("score");
        await QuizGrade.findOne({ email: payload["email"] }).deleteOne().exec();
    });
});

// describe("Tests api/users/signup", () => {
//     it("should sign up a user", async () => {
//         const payload = {
//             name: "name",
//             email: "newtest@mathquest.com",
//             userType: "student",
//             image: "http",
//         };

//         const response = await request(app)
//             .post("/api/users/signup")
//             .send(payload)
//             .set("Content-Type", "application/json")
//             .set("Accept", "application/json");

//         expect(response.status).toBe(201);
//         expect(response.body).toHaveProperty("result");

//         await User.findOne({ email: payload["email"] }).deleteOne().exec();
//     });
// });
