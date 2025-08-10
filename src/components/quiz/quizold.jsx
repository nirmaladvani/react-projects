import { useState } from 'react'
import { data } from './data'

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)

  const handleSubmit = () => {
    if (currentQuestion === data.length - 1) {
      setShowResults(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: option,
    }))
  }

  const handleShowAnswers = () => {
    setShowAnswers(true)
  }

  const calculateScore = () => {
    let score = 0
    Object.keys(selectedOptions).forEach((questionId) => {
      const question = data.find((q) => q.id === questionId)
      if (question && selectedOptions[questionId] === question.correctAnswer) {
        score += 1
      }
    })
    return score
  }

  return (
    <div className='container'>
      {showResults ? (
        <div>
          <h2>Quiz finished!</h2>
          <p>
            You scored {calculateScore()} out of {data.length}
          </p>
          <button onClick={handleShowAnswers}>Show answers</button>
          {showAnswers && (
            <div>
              {data.map((question, index) => (
                <div key={index}>
                  <p>
                    <strong>Question {index + 1}:</strong> {question.question}
                  </p>
                  <p>
                    <strong>Correct answer:</strong> {question.correctAnswer}
                  </p>
                  <p>
                    <strong>Your answer:</strong> {selectedOptions[question.id]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className='question'>
          <h3>{data[currentQuestion].question}</h3>
          <div className='options'>
            {data[currentQuestion].options?.map((option, index) => (
              <div className='option' key={index}>
                <input
                  type='radio'
                  id={`option-${index}-${currentQuestion}`}
                  value={option}
                  name={`option-${currentQuestion}`}
                  checked={selectedOptions[data[currentQuestion].id] === option}
                  onChange={() =>
                    handleOptionChange(data[currentQuestion].id, option)
                  }
                />
                <label htmlFor={`option-${index}-${currentQuestion}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit}>
            {currentQuestion < data.length - 1 ? 'Submit' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  )
}
