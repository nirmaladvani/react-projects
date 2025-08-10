import { useState } from 'react'
import { data } from './data'
import './style.css'

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const handleNextQuestion = (currentQuestion) => {
    setCurrentQuestion(
      currentQuestion < data.length - 1 ? currentQuestion + 1 : currentQuestion
    )
  }

  return (
    <div className='acc-wrapper'>
      <h1>Quiz</h1>
      <h2>{data[currentQuestion].question}</h2>
      {data[currentQuestion].options.map((option, index) => {
        return (
          <div key={index} className='option'>
            {option}
          </div>
        )
      })}
      <button
        onClick={() => {
          handleNextQuestion(currentQuestion)
        }}
      >
        Next
      </button>
    </div>
  )
}
