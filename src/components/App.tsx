/**
 * cowritten component
 */
import React from "react";
import "components/App.css";
import Header from "components/Header";
import GameInputComponent from "components/GameInputComponent";
import CountryModal from "components/CountryModal";

function App() {
  const mapExists = document.getElementById("map-wrapper") === null;
  return (
    <div className={`App ${mapExists ? "text-input-mode" : "map-input-mode"}`} data-testid="app">
      <Header />
      <div className="game-container">
        <GameInputComponent />
      </div>
      <CountryModal />
    </div>
  );
}

export default App;
