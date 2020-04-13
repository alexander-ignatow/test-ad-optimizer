import React, { useState } from 'react';
import './App.css';
import performTest from './AdsProcessor/simulator';

function App() {
  const [ testResult, setTestResult ] = useState('')

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

          console.log(testStat)
          console.log(JSON.stringify(testStat))

          setTestResult(JSON.stringify(testStat))

        }} >run!</button>
      </header>
      <div>
        <code>
          {testResult}
        </code>
      </div>
    </div>
  );
}

export default App;
