import React from 'react';
import Game from './components/Game.jsx';
import UserProgress from './components/UserProgress.jsx';
import Leaderboard from './components/LeaderBoard.jsx';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <Game />
      <UserProgress />
      <Leaderboard />
    </div>
  );
}

export default App;
