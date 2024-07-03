import { useState } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";

export default function Question({ index, onSelectAnswer, onTimeout }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[index].answers[0],
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onTimeout} />
      <h4>{QUESTIONS[index].text}</h4>
      <Answers
        onSelectAnswer={handleSelectAnswer}
        answerState={answerState}
        selectedAnswer={answer.selectedAnswer}
        answers={QUESTIONS[index].answers}
      />
    </div>
  );
}
