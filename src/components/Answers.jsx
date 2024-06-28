export default function Answers({ activeQuestionIndex, answers, selectedAnswer, answerState }) {
  return (<ul key={activeQuestionIndex * 2} id="answers">
  {shuffledAnswers.current.map((a) => {
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
</ul>)
}