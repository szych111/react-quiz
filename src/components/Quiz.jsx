import { useState } from "react"

import quizCompleteImage from '../assets/quiz-complete.png'
import QUESTIONS from '../questions.js'

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([])

  const activeQuestionIndex = userAnswers.length
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers(prevState => [selectedAnswer, ...prevState])
  }

  if (quizIsComplete) {
    return (<div id="summary">
      <img src={quizCompleteImage} alt="" />
      <h2>Quiz completed!</h2>
    </div>)
  }

  const shuffledAsnwers = [...QUESTIONS[activeQuestionIndex].answers]
  shuffledAsnwers.sort(() => Math.random() - .5)

  return <main id='quiz'>
    <div id='question'>
    <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
    <ul id="answers">
    {shuffledAsnwers.map((a, index) => (
    <li className='answer' key={index}>
      <button onClick={() => handleSelectAnswer(a)}>{a}</button>
      </li>
      ))}
    </ul>
    </div>
  </main>
}