import React from 'react';
import data from '../data/globalLeaderBoard.json';
import '../styles/Leaderboard.css';

export default function Leaderboard() {
  return (
    <div className="leaderboard">
      <h2 className="pixel-font">🌍 Global Leaderboard</h2>
      <div className='grid-box'>
        <p>Rank</p>
        <p>Name</p>
        <p>Score</p>
        {data.map((entry, idx) => (
          <div className='span-row flex-box'>
            <p className=''>{idx + 1}</p>
            <p className=''>{entry.name}</p>
            <p className=''>{entry.high_score}</p>
          </div>
          // <p className='yellow' key={idx}>{entry.name}: {entry.high_score}</p>
        ))}
      </div>
    </div>
  );
}