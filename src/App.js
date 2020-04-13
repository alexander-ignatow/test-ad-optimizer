import React, { useState } from 'react';
import './App.css';
import performTest from './AdsProcessor/simulator';

function App() {
  const [ testResult, setTestResult ] = useState('')
  const [ totalClicks, setTotalClicks ] = useState('')

  const displayResults = (testStat) => {
    setTestResult(JSON.stringify(testStat))
    setTotalClicks(
      (testStat.clicks.A || 0) +
      (testStat.clicks.B || 0) +
      (testStat.clicks.C || 0) +
      (testStat.clicks.D || 0) +
      (testStat.clicks.E || 0))
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          PRESS THE BUTTON TO RUN TEST
        </p>
        <button onClick={() => {
          const testStat = performTest({
            runs: 100000,
            clickMap: {
              A: 0.1,
              B: 0.05,
              C: 0.02,
              D: 0.01,
              E: 0.001
            }
          })

          displayResults(testStat)
          
        }}>run!</button>
        <button onClick={() => {
          const testStat = performTest({
            runs: 100000,
            noOptimization: true,
            clickMap: {
              A: 0.1,
              B: 0.05,
              C: 0.02,
              D: 0.01,
              E: 0.001
            }
          })

          displayResults(testStat)
          
        }}>run (no optimization)</button>
      </header>
      <div>
        <code>
          {testResult}
          <br/>
          {totalClicks && <div>TOTAL CLICKS: {totalClicks}</div>}
        </code>
      </div>
    </div>
  );
}

export default App;
