import { useState } from 'react'
import { data } from './data'
import './style.css'

export default function Quiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const question = data[current]

  const handleSelect = (option) => {
    if (selected) return
    setSelected(option)
    if (option === question.correctAnswer) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (current === data.length - 1) {
      setShowResult(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowResult(false)
  }

  if (showResult) {
    return (
      <div className='acc-wrapper'>
        <div className='todo-wrapper'>
          <h1>Quiz</h1>
          <h2>
            Score: {score} / {data.length}
          </h2>
          <button onClick={handleRestart}>Restart</button>
        </div>
      </div>
    )
  }

  return (
    <div className='acc-wrapper'>
      <div className='todo-wrapper'>
        <h1>Quiz</h1>
        <h2>{question.question}</h2>

        <div className='options'>
          {question.options.map((option, idx) => {
            const isSelected = selected === option
            const isCorrect = selected && option === question.correctAnswer
            const isWrong =
              selected && isSelected && option !== question.correctAnswer

            return (
              <div
                key={idx}
                className={[
                  'option',
                  isSelected ? 'selected' : '',
                  isCorrect ? 'correct' : '',
                  isWrong ? 'wrong' : '',
                ]
                  .join(' ')
                  .trim()}
                onClick={() => handleSelect(option)}
                role='button'
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') && handleSelect(option)
                }
              >
                {option}
              </div>
            )
          })}
        </div>

        <button onClick={handleNext} disabled={!selected}>
          {current === data.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
}
