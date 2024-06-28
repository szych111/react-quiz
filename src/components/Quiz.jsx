import { useState, useCallback, useRef } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteImage from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Quiz() {
  const shuffledAnswers = useRef();
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("selected");
      setUserAnswers((prevState) => {
        return [...prevState, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else setAnswerState("wrong");

        setTimeout(() => {
          setAnswerState("");
        }, 500);
      }, 500);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImage} alt="" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  const answersNotShuffled = [...QUESTIONS[activeQuestionIndex].answers];

  return (
    <main id="quiz">
      <h2>
        question no.:{activeQuestionIndex}, user's answers: {userAnswers.length}
      </h2>
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={5000}
          onTimeout={handleSkipAnswer}
        />
        <h4>{QUESTIONS[activeQuestionIndex].text}</h4>
        <ul id="answers">
          {answersNotShuffled.map((a) => {
            const isSelected = userAnswers[userAnswers.length - 1] === a;
            let cssClass = "";

            if (answerState !== "" && isSelected) {
              cssClass = answerState;
            }

            return (
              <li className="answer" key={a}>
                <button
                  onClick={() => handleSelectAnswer(a)}
                  className={cssClass}
                >
                  {a}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
