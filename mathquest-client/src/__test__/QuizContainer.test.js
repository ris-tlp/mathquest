import { render, screen, waitFor } from '@testing-library/react';
import React from "react";
import QuizContainer from '../components/QuizContainer';


jest.mock("../utils/constants", () => ({
  CONNECTION_STRING: "mocked-connection-string",
  PORT: "mocked-port",
}));

// Mocking fetch function
global.fetch = jest.fn();

// Mocking sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

describe("QuizContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders quiz list when quizzes are fetched successfully", async () => {
    // Mock the response from the fetchQuizzes function
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: [
          {
            _id: "1",
            summary: "Quiz 1 Summary",
            duration: 30,
            numberOfAttempts: 3,
            hasAttempted: false,
          },
          {
            _id: "2",
            summary: "Quiz 2 Summary",
            duration: 45,
            numberOfAttempts: 2,
            hasAttempted: true,
          },
        ],
      }),
    });

    render(<QuizContainer />);

    // Wait for the component to fetch quizzes
    await waitFor(() => screen.getByText("Quiz 1"));

    // Check if the quizzes are rendered correctly
    expect(screen.getByText("Quiz 1")).toBeInTheDocument();
    expect(screen.getByText("Quiz 2")).toBeInTheDocument();
  });

  
  // it("handles starting a quiz and renders QuizController", async () => {
  //   // Mock the response from the fetchQuizzes function
  //   global.fetch.mockResolvedValueOnce({
  //     json: jest.fn().mockResolvedValueOnce({
  //       result: [
  //         {
  //           _id: "1",
  //           summary: "Quiz 1 Summary",
  //           duration: 30,
  //           numberOfAttempts: 3,
  //           hasAttempted: false,
  //         },
  //       ],
  //     }),
  //   });

  //   // Mock the response for starting the quiz
  //   global.fetch.mockResolvedValueOnce({
  //     json: jest.fn().mockResolvedValueOnce({}),
  //   });

  //   render(<QuizContainer />);

  //   // Wait for the component to fetch quizzes
  //   await waitFor(() => screen.getByText("Quiz 1"));

  //   // Click the "Start Quiz" button
  //   fireEvent.click(screen.getByText("Start Quiz"));

  //   // Check if the QuizController component is rendered
  //   await waitFor(() => screen.getByText("Quiz Controller Content"));
  // });

  // it("renders 'Quiz Completed' button for completed quizzes", async () => {
  //   // Mock the response from the fetchQuizzes function
  //   global.fetch.mockResolvedValueOnce({
  //     json: jest.fn().mockResolvedValueOnce({
  //       result: [
  //         {
  //           _id: "1",
  //           summary: "Quiz 1 Summary",
  //           duration: 30,
  //           numberOfAttempts: 3,
  //           hasAttempted: true,
  //         },
  //       ],
  //     }),
  //   });

  //   render(<QuizContainer />);

  //   // Wait for the component to fetch quizzes
  //   await waitFor(() => screen.getByText("Quiz 1"));

  //   // Check if the 'Quiz Completed' button is rendered
  //   expect(screen.getByText("Quiz Completed")).toBeInTheDocument();
  //   expect(screen.getByText("Quiz Completed")).toBeDisabled();
  // });

  // Add more test cases as needed
});