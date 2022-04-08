import './App.css';
import ColorBlock from './ColorBlock.js';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {
  const [swatches, setSwatches] = useState(generateSwatches())
  const [winningColor, setWinningColor] = useState('')
  const [guesses, setGuesses] = useState(0)
  const [win, setWin] = useState(false)

  function  randomColor() {
    let color = '#'
    for (let i = 0; i < 6; i++) {
      let value = Math.floor(Math.random() * 9)
      value % 2 === 0 ? color += value : color += ['A', 'B', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 6)]
    }
    return color
  }

  function generateSwatches () {
    let newSwatches = []
    for(let i = 0; i < 6; i++) {
      newSwatches.push({
        color: randomColor(),
        id: nanoid(),
        showHex: false
      })
    }
    return newSwatches
  }

  useEffect(() => {
    setWinningColor(swatches[Math.floor(Math.random() * swatches.length)].color)
  }, [swatches])


  const checkUserGuess = (swatch) => {
    if (win) {
      return false
    }

    if (swatch.color === winningColor) {
      setWin(true)
    }

    toggleHexDisplay(swatch)
    setGuesses((guesses) => guesses += 1)
  }

  const toggleHexDisplay = (swatch) => {
    swatch.showHex = !swatch.showHex
  }

  const resetGame = () => {
    setSwatches(generateSwatches)
    setWin(false)
    setGuesses(0)
  }

  let colors = swatches.map((swatch) => {
    return(
      <ColorBlock
        key={swatch.id}
        showHex={swatch.showHex}
        checkGuess={() => checkUserGuess(swatch)}
        id={swatch.id}
        color={swatch.color} />
    )
  })

  return (
    <div className="App">
      {win && <Confetti/>}
      <div className="content">
        <h2>Click the swatch that matches the Hex!</h2>
        <h4><u>{winningColor}</u></h4>
        <h3>Guesses: {guesses}</h3>
        <div className="palette">
          {colors}
        </div>
        {win && <h3>Winner!</h3>}
        {win && <button onClick={() => resetGame()}>New Game</button>}
      </div>
    </div>
  );
}

export default App;
