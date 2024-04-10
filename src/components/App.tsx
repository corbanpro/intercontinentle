/**
 * cowritten component
 */
import React from "react";
import "components/App.css";
import GameInputComponent from "components/GameInputComponent";
const Sweden = require("components/sweden.svg");

function App() {
  return (
    <div className="App" data-testid="app">
      <header className="App-header">
        <h1>Intercontinentle</h1>
      </header>
      <div className="game-wrapper">
        <GameInputComponent />
      </div>
      <img src={Sweden} alt="sweden" />
    </div>
  );
}

export default App;
