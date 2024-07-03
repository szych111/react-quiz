import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelectAnswer,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((a) => {
        const isSelected = selectedAnswer === a;
        let cssClass = "";

        if (answerState !== "" && isSelected) {
          cssClass = answerState;
        }

        return (
          <li className="answer" key={a}>
            <button
              onClick={() => onSelectAnswer(a)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {a}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
