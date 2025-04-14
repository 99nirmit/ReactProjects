import React, { useEffect, useState } from "react";

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  }

  const calculate = () => {
    try {
        const output = eval(input);
        setResult(output);
    } catch (error) {
        setResult('Error');
    }
  };

  const handleBackSpace = () => {
    setInput((prev) => prev.slice(0, -1));
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') calculate();
        else if (e.key === 'Back') handleBackSpace();
        else if (/[\d+\-*/.]/.test(e.key)) handleClick(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-3">Simple Calculator</h2>
        <input
          type="text"
          className="form-control mb-2"
          value={input}
          readOnly
        />

        <input
          type="text"
          className="form-control mb-3"
          value={result}
          placeholder="Result"
          readOnly
        />

        <div className="d-grid gap-2">
          {[
            ["7", "8", "9", "/"],
            ["4", "5", "6", "*"],
            ["1", "2", "3", "-"],
            ["0", ".", "+", "C"],
          ].map((row, index) => (
            <div className="row mb-2" key={index}>
              {row.map((val) => (
                <div className="col" key={val}>
                  <button
                    className={`btn ${
                      val === "C" ? "btn-danger" : "btn-secondary"
                    } w-100`}
                    onClick={() => {
                      val === "C" ? clearInput() : handleClick(val);
                    }}
                  >
                    {val}
                  </button>
                </div>
              ))}
            </div>
          ))}
          
          <button className="btn btn-success" onClick={calculate}>
            =
          </button>
          <button className="btn btn-warning" onClick={handleBackSpace}> Back</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
