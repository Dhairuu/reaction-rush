import React from 'react';
import '../styles/EndScreen.css';

export default function EndScreen({ score, accuracy, clicks, finalScore }) {
  return (
    <div className="end-screen">
      {/* <h2 className="large yellow">🕹 Game Over!</h2> */}
      <div>
        <p className="medium yellow bold">SCORE</p>
        <p className="medium faded-yellow">{finalScore}</p>
      </div>
      <div style={{display: "flex", gap: "1rem"}}>
        <p className="small yellow bold">ACCURACY:</p>
        <p className="small faded-yellow">{accuracy}%</p>
      </div>
      <div>
        <p className="small yellow bold">Total Clicks</p>
        <p className="small faded-yellow">{clicks + score / 10}</p>
      </div>
      <button className='playAgain-btn' onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
}