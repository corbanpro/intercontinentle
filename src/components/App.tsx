/**
 * cowritten component
 */
import React from "react";
import "components/App.css";
import GameInputComponent from "components/GameInputComponent";

function App() {
  return (
    <div className="App" data-testid="app">
      <header className="App-header">
        <h1>Intercontinentle</h1>
      </header>
      <div className="game-wrapper">
        <GameInputComponent />
      </div>
    </div>
  );
}

export default App;
