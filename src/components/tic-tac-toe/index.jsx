import { useEffect, useState } from 'react'
import './style.css'
import ConfettiExplosion from 'react-confetti-explosion'

export default function TicTacToe() {
  const [player, setPlayer] = useState(false)
  const [select, setSelect] = useState(Array(9).fill(0))
  const [winner, setWinner] = useState(false)
  const [draw, setDraw] = useState(false)

  function handleClick(index) {
    if (select[index] === 0 && !winner) {
      const newSelect = [...select]
      newSelect[index] = player ? 1 : 2
      setSelect(newSelect)
      setPlayer(!player)
    }
  }

  function handleReset() {
    setSelect(Array(9).fill(0))
    setPlayer(false)
    setWinner(false)
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (select[a] && select[a] === select[b] && select[a] === select[c]) {
        setWinner(select[a] === 1 ? 'X' : 'O')
        return
      }
    }
    if (select.every((box) => box !== 0) && !winner) {
      setDraw(true)
    }
  }

  useEffect(() => {
    checkWinner()
  }, [select])

  return (
    <div className='acc-wrapper'>
      <div className='board'>
        {select && select.length > 0
          ? select.map((box, index) => {
              //   console.log(box)
              return (
                <div
                  className='box'
                  key={index}
                  onClick={() => {
                    handleClick(index)
                  }}
                >
                  {box === 1 ? 'X' : box === 2 && 'O'}
                </div>
              )
            })
          : null}
      </div>
      {winner && (
        <ConfettiExplosion
          zIndex={100}
          width={1000}
          height={'120vh'}
          className='confetti'
        />
      )}
      <div className='status'>
        {winner
          ? `Winner: ${winner}`
          : draw
          ? 'Draw!'
          : `Next Player: ${player ? 'X' : 'O'}`}
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}
