import { useState } from 'react'

const App = () => {
  enum modes {
    PERCENT_OF = "percentOf",
    WHAT_PERCENT = "whatPercent"
  }

  const [mode, setMode] = useState<string>(modes.PERCENT_OF);
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = (): void => {
    if (!num1 || !num2) return;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2) || n2 === 0) return;
    setResult(mode === modes.PERCENT_OF ? (n1 / 100) * n2 : (n1 / n2) * 100);
  };


  return (
    <>
      <div className='percent-container'>
        <span className="percent-sign">%</span>
      </div>
      <h1>Calculate percentage!</h1>
      <div className="calculator-container">
      <div className="button-group">
        <button
          className={mode === modes.PERCENT_OF ? "active" : ""}
          onClick={() => {
            setMode(modes.PERCENT_OF);
            setResult(null);
            setNum1("");
            setNum2("");
            }
          }
        >
          What is __% of __?
        </button>
        <div className='sized-box'></div>
        <button
          className={mode === modes.WHAT_PERCENT ? "active" : ""}
          onClick={() => {
            setMode(modes.WHAT_PERCENT);
            setResult(null);
            setNum1("");
            setNum2("");
            }
          }
        >
          __ is what % of __?
        </button>
      </div>

      <div className="input-group">
        <input
          inputMode='decimal'
          type="number"
          placeholder={mode === modes.PERCENT_OF ? "%" : "Number"}
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <span className='mid-span'>{mode === modes.PERCENT_OF ? "of" : "is what % of"}</span>
        <input
          inputMode='decimal'
          type="number"
          placeholder="Number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>

      <button onClick={calculate} className="calculate-button">Calculate</button>

      {result !== null && (
        <div className="result">{result.toFixed(2)}
        {mode === modes.WHAT_PERCENT && <span> %</span>}
        </div>
      )}
    </div>
      <p className="footnote">
        Created by <a href='https://github.com/Yarden-Tal'>Yarden Tal</a>
      </p>
    </>
  )
}

export default App
