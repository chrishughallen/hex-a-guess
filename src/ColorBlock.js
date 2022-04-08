import './ColorBlock.css'



export default function ColorBlock({color, boxColor, checkGuess, showHex}) {
  const style = {
    backgroundColor: color
  }

  return (
    <div id={boxColor} onClick={checkGuess} style={style} className="color-block">
      {showHex && <p>{color}</p>}
    </div>
  )
}