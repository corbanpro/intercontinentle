/**
 * cowritten component
 */
import React, { useState } from "react";
import "components/App.css";
import Header from "components/Header";
import GameInputComponent from "components/GameInputComponent";

function App() {
  const [showMap, setShowMap] = useState(true);
  return (
    <div data-testid="app">
      <Header showMap={showMap} setShowMap={setShowMap} />
      <div className="game-container">
        <GameInputComponent showMap={showMap} />
      </div>
    </div>
  );
}

export default App;
