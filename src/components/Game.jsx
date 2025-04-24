import React, { useState, useEffect, useRef } from 'react';
import Target from './Target.jsx';
import EndScreen from './EndScreen.jsx';
import LoginModal from './LoginModal.jsx';
import '../styles/Game.css';
import { sendMatchData } from '../api.js';  // Import the API function to send match data

export default function Game() {
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const targetIdRef = useRef(0);

  const createTarget = () => ({
    id: targetIdRef.current++,
    top: Math.random() * 90,
    left: Math.random() * 90,
  });

  useEffect(() => {
    const initialTargets = Array.from({ length: 10 }, createTarget);
    setTargets(initialTargets);
  }, []);

  const handleDestroy = (id) => {
    if (!gameStarted) setGameStarted(true);
    setScore((s) => s + 10);
    setTargets((prev) => {
      const remaining = prev.filter((t) => t.id !== id);
      return [...remaining, createTarget()];
    });
  };

  const handleClickArea = () => {
    if (!gameStarted || gameOver) return;
    setClicks((c) => c + 1);
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setGameTime((t) => {
        if (t >= 3) {
          clearInterval(timer);
          setGameOver(true);
          setTargets([]);
          sendMatchDataToDB();  // Send match data after the game ends
        }
        return t + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, ]);

  const accuracy = ((score * 10) / (score / 10 + clicks)).toFixed(2);
  const finalScore = (0.8 * score + 0.7 * accuracy).toFixed(0);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Function to send match data to the database
  const sendMatchDataToDB = async () => {
    if (user) {
      const matchData = {
        user_id: user,  // Send user_id along with match data
        accuracy: accuracy,
        target_hit: score / 10,  // Total targets hit in the game
        score: finalScore,
      };
      console.log(matchData);
      try {
        const data = await sendMatchData(matchData);
        console.log(data);
      } catch (error) {
        console.error("Error sending match data to DB:", error);
      }
    }
  };

  return (
    <div className="game-container">
      <div>
        <h1 className="pixel-font yellow">🎯 Reaction Rush</h1>
      </div>
      {!gameOver ? (
        <>
          <div className="pixel-font flex-boxA">
            <div>
              <h2 className="yellow">Score</h2>
              <h2 className="faded-yellow">{isNaN(finalScore) ? 0 : finalScore}</h2>
            </div>
            <div className="profile-bar">
              <img
                src="https://images.pexels.com/photos/14823950/pexels-photo-14823950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="profile"
                className="profile-icon"
                onClick={() => {
                  if (user) handleLogout();
                  else setShowLogin(true);
                }}
              />
              {user && (
                <p className="pixel-font faded-yellow">
                  Welcome, {user.name}
                </p>
              )}
            </div>
            <div>
              <h2 className="yellow">Time</h2>
              <h2 className="faded-yellow">{30 - gameTime}s</h2>
            </div>
          </div>
          <div className="game-area" onClick={handleClickArea}>
            {targets.map((target) => (
              <Target
                key={target.id}
                id={target.id}
                top={target.top}
                left={target.left}
                onDestroy={handleDestroy}
              />
            ))}
          </div>
        </>
      ) : (
        <EndScreen
          score={score}
          accuracy={accuracy}
          clicks={clicks}
          finalScore={finalScore}
        />
      )}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
    </div>
  );
}
