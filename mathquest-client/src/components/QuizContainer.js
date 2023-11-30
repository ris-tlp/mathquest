import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import QuizController from "./QuizController";

const QuizContainer = () => {
  // State to store all quizzes for the current course
  const [allQuiz, setAllQuiz] = useState([]);
  // Fetch quizzes when component mounts
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // State to manage the display of selected quiz
  const [showSelectedQuiz, setShowSelectedQuiz] = useState(false);
  const [selectedQuizID, setSelectedQuizID] = useState(null);
  const [quiz, setQuiz] = useState([]);

  // Function to fetch quizzes for the current course
  const fetchQuizzes = async () => {
    const courseID = sessionStorage.getItem("courseID");
    const data = await fetch(
      BASE_URL + "/api/courses/quizzes/getAllQuizzes",
      {
        method: "POST",
        body: JSON.stringify({
          courseID: courseID,
          email: sessionStorage.getItem("email"),
        }),
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Access-control-allow-origin": "*",
          "Access-control-allow-methods": "*",
        },
      }
    );
    const json = await data.json();
    setAllQuiz(json.result);
  };

  // Function to handle starting a quiz
  const handleStartQuiz = (quizID, quiz) => {
    sessionStorage.setItem("quizID", quizID);
    setShowSelectedQuiz(true);
    setQuiz(quiz);
    setSelectedQuizID(quizID);
  };

  return (
    <div>
      {!showSelectedQuiz ? (
        <div>
          {allQuiz &&
            allQuiz.map((e, index) => {
              return (
                <div className=" border-2 border-slate-600 bg-white text-black shadow-slate-500 font-mono p-2 rounded-lg flex cursor-pointer ">
                  <div className="mx-4 w-[100%]">
                    <h3 className="text-sm font-bold">Quiz {index + 1}</h3>
                    <h1 className="text-lg font-bold">{e.summary}</h1>

                    <p>{e.duration} minutes</p>
                    <p>Attemmpts left: {e.numberOfAttempts}</p>

                    {!e.hasAttempted && (
                      <button
                        className="border-2 bg-slate-700 text-white p-2 my-4 rounded-lg shadow-2xl"
                        onClick={() => handleStartQuiz(e._id, e)}
                      >
                        Start Quiz
                      </button>
                    )}

                    {e.hasAttempted && (
                      <button
                        disabled
                        className="border-2 bg-slate-700 text-white p-2 my-4 rounded-lg shadow-2xl "
                      >
                        Quiz Completed - {e.grade} Marks
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        // Display QuizController component if a quiz is selected
        <div>
          {quiz && (
            <QuizController
              quizID={selectedQuizID}
              quiz={quiz}
              closeSelectedQuiz={() => {
                fetchQuizzes();

                setShowSelectedQuiz(false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuizContainer;
