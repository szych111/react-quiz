import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";

export default function Question({ activeQuestionIndex, onTimeout }) {
return (<div id="question">
  <QuestionTimer
    key={activeQuestionIndex}
    timeout={5000}
    onTimeout={handleSkipAnswer}
  />
  <h4>{QUESTIONS[activeQuestionIndex].text}</h4>
  <Answers answers={QUESTIONS[activeQuestionIndex]} />
</div>)
}