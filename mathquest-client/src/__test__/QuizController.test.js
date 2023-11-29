import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizController from '../components/QuizController';

// Mocking fetch for testing purposes
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ questions: [] }),
  })
);

describe('QuizController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders QuizController component', async () => {
    // const props = {
    //   quizID: '123',
    //   quiz: {
    //     summary: 'Test Quiz',
    //     duration: 10,
    //   },
    //   closeSelectedQuiz: jest.fn(),
    // };

//    render(<QuizController />);
//   // const quiz = screen.getByTestId("quizID");
// //const incrementBtn = screen.getByTestId("increment");
//     // Add more assertions based on your component's rendering
//     //expect(screen.getByText('Test Quiz')).toBeInTheDocument();
//    // expect(quiz).toBeRequired("Id123")
//   });
});

});