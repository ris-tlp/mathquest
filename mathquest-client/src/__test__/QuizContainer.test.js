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
});