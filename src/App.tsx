import { useState } from 'react'
import { modes } from './models';
import { calculate, handleKeyDown } from './utils';

const App = () => {

  const [mode, setMode] = useState<string>(modes.WHAT_PERCENT);
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (): void => {
    if (!num1 || !num2) return alert("Please provide 2 numbers.")
    else setResult(calculate(mode, num1, num2))
  };

  const changeMode = (mode: string): void => {
    if (mode === modes.PERCENT_OF) setMode(modes.WHAT_PERCENT)
    else setMode(modes.PERCENT_OF)
    setResult(null);
    setNum1("");
    setNum2("");
  }

  return (
    <>
      <div className='percent-container'>
        <span className="percent-sign">%</span>
      </div>
      <h1>Calculate percentage!</h1>
      <div className="calculator-container">
      <div className="button-group">
        <button
          className={mode === modes.WHAT_PERCENT ? "active" : ""}
          onClick={() => changeMode(modes.PERCENT_OF)}
        >
          __ is what % of __?
        </button>
        <div className='sized-box'></div>
        <button
          className={mode === modes.PERCENT_OF ? "active" : ""}
          onClick={() => changeMode(modes.WHAT_PERCENT)}
        >
          What is __% of __?
        </button>
      </div>

      <div className="input-group">
        <input
          inputMode='decimal'
          type="number"
          placeholder={mode === modes.PERCENT_OF ? "%" : "Number"}
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          onKeyDown={e => handleKeyDown(e, handleCalculate)}
        />
        <span className='mid-span'>{mode === modes.PERCENT_OF ? "of" : "is what % of"}</span>
        <input
          inputMode='decimal'
          type="number"
          placeholder="Number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          onKeyDown={e => handleKeyDown(e, handleCalculate)}
        />
      </div>

      <button onClick={handleCalculate} className="calculate-button">Calculate</button>

      
        <div className="result" style={{opacity: result ?? "0", pointerEvents: result === null ? "none" : "all"}}>
          {(result !== null) ? result.toFixed(2) : "None"} {((result !== null) && mode === modes.WHAT_PERCENT) && <span> %</span>}
        </div>
    </div>
      <p className="footnote">
        Created by <a target="_blank" href="https://github.com/Yarden-Tal">Yarden Tal</a>
      </p>
    </>
  )
}

export default App
