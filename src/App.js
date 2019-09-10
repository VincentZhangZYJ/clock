import React from 'react';
import CountDown from './components/countDown';

function App() {
  const testSecs = 5000;

  return (
    <div className="App">
      <CountDown secs={testSecs}/>
    </div>
  );
}

export default App;
