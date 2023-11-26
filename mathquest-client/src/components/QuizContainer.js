import React, { useEffect, useState } from "react";
import { CONNECTION_STRING, PORT } from "../utils/constants";

const QuizContainer = () => {
  const [allQuiz, setAllQuiz] = useState([]);
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const [showSelectedQuiz, setShowSelectedQuiz] = useState(false);

  const fetchQuizzes = async () => {
    const courseID = sessionStorage.getItem("courseID");
    const data = await fetch(
      CONNECTION_STRING + PORT + "/api/courses/quizzes/getAllQuizzes",
      {
        method: "POST",
        body: JSON.stringify({
          courseID: courseID,
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

  const handleStartQuiz = (quizID) => {
    sessionStorage.setItem("quizID", quizID);
    setShowSelectedQuiz(true);
  };

  return (
    <div>
      {allQuiz &&
        allQuiz.map((e, index) => {
          return (
            <div className=" border-2 border-slate-600 bg-white text-black shadow-slate-500 font-mono p-2 rounded-lg flex cursor-pointer">
              <div className="mx-4 w-[100%]">
                <h3 className="text-sm font-bold">Quiz {index + 1}</h3>
                <h1 className="text-lg font-bold">{e.summary}</h1>

                <p>{e.duration} minutes</p>
                <p>Attemmpts left: {e.numberOfAttempts}</p>

                <button
                  className="border-2 bg-slate-700 text-white p-2 my-4 rounded-lg shadow-2xl"
                  onClick={handleStartQuiz(e._id)}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default QuizContainer;
