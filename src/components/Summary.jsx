import quizCompleteImage from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((a) => a === null);
  const correctAnswers = userAnswers.filter(
    (a, i) => a === QUESTIONS[i].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const correctdAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  const incorrectAnswersShare =
    100 - skippedAnswersShare - correctdAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompleteImage} alt="" />
      <h2>Quiz completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctdAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{incorrectAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((a, i) => {
          let cssClass = "user-answer";

          if (a === null) {
            cssClass += " skipped";
          } else if (a === QUESTIONS[i].answers[0]) {
            cssClass += " correct";
          } else if (a !== QUESTIONS[i].answers[0]) {
            cssClass += " wrong";
          }

          return (
            <li key={i}>
              <h3>{i + 1}</h3>
              <p className="question">{QUESTIONS[i].text}</p>
              <p className={cssClass}>{a ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
