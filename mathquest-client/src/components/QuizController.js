import React, { useEffect, useState } from "react";
import { CONNECTION_STRING, PORT } from "../utils/constants";

const QuizController = (props) => {
  const [quiz, setQuiz] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitedAnswers, setSubmittedAnswers] = useState([]);
  useEffect(() => {
    fetchQuiz(props.quizID);
    console.log(props.quiz);
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const fetchQuiz = async (quizID) => {
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

  const handleOptionClick = (questionID, optionID, option) => {
    submitedAnswers[questionID] = optionID;

    let ans = submitedAnswers;
    ans.push([questionID, optionID]);
    setSubmittedAnswers(ans);

    setSelectedOption(option);
  };

  return (
    <div>
      <h1 className="text-xl text-white">{props.quiz.summary}</h1>
      <p className="text-sm text-white my-4">
        Duration : {props.quiz.duration} minutes
      </p>

      {currentQuestion < quiz.length && (
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

          <button
            className="border-2 bg-white float-right font-bold p-2 rounded-lg"
            onClick={handleSubmitQuiz}
          >
            NEXT QUESTION
          </button>
        </div>
      )}

      {currentQuestion == quiz.length && (
        <h1>Quiz submiited</h1>
      )}
    </div>
  );
};

export default QuizController;
