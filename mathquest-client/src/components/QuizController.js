import React, { useEffect, useState } from "react";
import { CONNECTION_STRING, PORT } from "../utils/constants";

// QuizController Component
const QuizController = (props) => {
  // State variables
  const [quiz, setQuiz] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitedAnswers, setSubmittedAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(null);

  // Effect hook to fetch quiz data when component mounts
  useEffect(() => {
    fetchQuiz(props.quizID);
    console.log(props.quiz);
  }, []);

  // State variable for tracking the current question
  const [currentQuestion, setCurrentQuestion] = useState(0);

  //fetching quiz based upon quiz ID
  const fetchQuiz = async () => {
    const data = await fetch(
      CONNECTION_STRING + PORT + "/api/courses/quizzes/getQuiz",
      {
        method: "POST",
        body: JSON.stringify({
          quizID: props.quizID,
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
    setQuiz(json?.questions);
  };

  const handleSubmitQuiz = () => {
    setSelectedOption(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  //Handling every selected option on quiz
  const handleOptionClick = (questionID, optionID, option) => {
    let obj = {
      questionID: questionID,
      optionSelectedID: optionID,
    };

    let ans = submitedAnswers;
    ans.push(obj);
    setSubmittedAnswers(ans);

    setSelectedOption(option);
  };

  // Handling the final submission of the quiz
  const handleSubmit = async () => {
    const data = await fetch(
      CONNECTION_STRING + PORT + "/api/courses/quizzes/grades/gradeQuiz",
      {
        method: "POST",
        body: JSON.stringify({
          email: sessionStorage.getItem("email"),
          quizID: props.quizID,
          answers: submitedAnswers,
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
    setQuizScore(json.score);
  };
  
  // Render JSX
  return (
    <div>
      <h1 className="text-xl text-white">{props.quiz.summary}</h1>
      <p className="text-sm text-white my-4">
        Duration : {props.quiz.duration} minutes
      </p>

      {currentQuestion < quiz.length && !quizScore && (
        <div>
          <div>
            {
              <div className=" border-2 border-slate-600 bg-white text-black shadow-slate-500 font-mono p-2 rounded-lg flex cursor-pointer p-8">
                {currentQuestion < quiz.length && (
                  <div>
                    <h1 className="text-lg font-bold">
                      {currentQuestion + 1}. {quiz[currentQuestion].question}
                    </h1>

                    {quiz[currentQuestion].options.map((option, index) => (
                      <div key={index} className="form-check">
                        <input
                          type="radio"
                          name="option"
                          value={option.content}
                          checked={selectedOption === option.content}
                          onChange={() =>
                            handleOptionClick(
                              quiz[currentQuestion]._id,
                              option._id,
                              option.content
                            )
                          }
                          className="form-check-input"
                        />

                        <label className="mx-2 form-check-label">
                          {option.content}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      )}

      {currentQuestion < quiz.length - 1 && (
        <div>
          {" "}
          <button
            className="border-2 bg-white float-right font-bold p-2 rounded-lg"
            onClick={handleSubmitQuiz}
          >
            NEXT QUESTION
          </button>
        </div>
      )}

      {currentQuestion == quiz.length - 1 && !quizScore && (
        <div>
          {" "}
          <button
            className="border-2 bg-white float-right font-bold p-2 rounded-lg"
            onClick={handleSubmit}
          >
            SUBMIT QUIZ
          </button>
        </div>
      )}

      {quizScore && (
        <div className="">
          <div className="border-2 bg-white font-bold text-2xl h-20 p-4 rounded-md">
            <h1>Congratulations!!! You scored {quizScore}!!</h1>
          </div>

          <button
            onClick={props.closeSelectedQuiz}
            className="border-2 bg-white my-4 p-4 rounded-lg cursor-pointer font-bold"
          >
            Go Back to All Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizController;
