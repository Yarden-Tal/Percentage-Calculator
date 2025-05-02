import { useEffect, useState } from 'react'
import { modes } from './models';
import { calculate, handleKeyDown } from './utils';

const App = () => {
  const [mode, setMode] = useState<string>(modes.WHAT_PERCENT);
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const handleCalculate = (): void => {
    if (!num1 || !num2) return alert("Please provide 2 numbers.")
    setResult(calculate(mode, num1, num2));
  };

  const changeMode = (mode: string): void => {
    setMode(mode === modes.PERCENT_OF ? modes.WHAT_PERCENT : modes.PERCENT_OF);
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
      <div className="calculator-container" style={{border: `${theme === "light" ? "1px solid #282828" : "1px solid #ccc"}`}}>
        <div className="button-group">
          <button
          style={{border: `${theme === "light" ? "1px solid #282828" : "none"}`}}
            className={mode === modes.WHAT_PERCENT ? "active" : ""}
            onClick={() => changeMode(modes.PERCENT_OF)}
          >
            __ is what % of __?
          </button>
          <div className='sized-box'></div>
          <button
          style={{border: `${theme === "light" ? "1px solid #282828" : "none"}`}}
            className={mode === modes.PERCENT_OF ? "active" : ""}
            onClick={() => changeMode(modes.WHAT_PERCENT)}
          >
            What is __% of __?
          </button>
        </div>

        <div className="input-group">
          <input
          style={{border: `${theme === "light" ? "1px solid #282828" : "none"}`}}
            inputMode='decimal'
            type="number"
            placeholder={mode === modes.PERCENT_OF ? "%" : "Number"}
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            onKeyDown={e => handleKeyDown(e, handleCalculate)}
          />
          <span className='mid-span'>{mode === modes.PERCENT_OF ? "of" : "is what % of"}</span>
          <input
          style={{border: `${theme === "light" ? "1px solid #282828" : "none"}`}}
            inputMode='decimal'
            type="number"
            placeholder="Number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            onKeyDown={e => handleKeyDown(e, handleCalculate)}
          />
        </div>

        <button onClick={handleCalculate} className="calculate-button" style={{border: `${theme === "light" ? "1px solid #282828" : "none"}`}}>Calculate</button>

        <div className="result" style={{ opacity: result ?? "0", pointerEvents: result === null ? "none" : "all" }}>
          <span>
            {(result !== null) ? result.toFixed(2) : "None"} {((result !== null) && mode === modes.WHAT_PERCENT) && <span> %</span>}
          </span>
        </div>
      </div>
      <button className={`theme-toggle-button ${theme}`}
              onClick={toggleTheme}>
        Switch to {theme === "dark" ? "Light" : "Dark"} Mode <span>{theme === "dark" ? "☀️" : "🌙"}</span>
      </button>
      <p className="footnote">
        Created by <a target="_blank" href="https://github.com/Yarden-Tal">Yarden Tal</a>
      </p>
    </>
  );
};

export default App;
