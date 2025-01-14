import { useState } from "react";
import Pokecard from "./components/Pokecards";
import "./styles/app.css";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const range = shuffleArray(Array.from({ length: 151 }, (_, i) => i + 1));
  const [memoIds, setMemoIds] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  function handleChoice(id) {
    if (memoIds.has(id)) {
      setBestScore(Math.max(currentScore, bestScore));
      setCurrentScore(0);
      setMemoIds(new Set());
      return;
    }
    setCurrentScore((currentScore) => currentScore + 1);
    const newMemoIds = new Set(memoIds);
    newMemoIds.add(id);
    setMemoIds(newMemoIds);
  }

  return (
    <>
      {/* introductory text */}
      {/* current score */}
      {/* best score */}
      {/* optionally, a victory message */}
      <div className="score-display">
        Current Score: {currentScore}
        Best Score: {bestScore}
      </div>
      {/* randomize the memorycards */}
      <div className="card-collection">
        {range.map((id) => {
          return <Pokecard key={id} reqId={id} handleChoice={handleChoice} />;
        })}
      </div>
    </>
  );
}

export default App;
