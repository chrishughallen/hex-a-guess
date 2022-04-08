import './ColorBlock.css'

export default function ColorBlock(props) {
  let style = {
    backgroundColor: props.color
  }

  return(
    <div id={props.boxColor} onClick={props.checkGuess} style={style} className="color-block">
      {props.showHex && <p>{props.color}</p>}
    </div>
  )
}