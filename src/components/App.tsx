/**
 * cowritten component
 */
import React, { useState } from "react";
import "components/App.css";
import Header from "components/Header";
import GameInputComponent from "components/GameInputComponent";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : ""}`} data-testid="app">
      <Header toggleDarkMode={toggleDarkMode}/>
      <div className="game-container">
        <GameInputComponent />
      </div>
    </div>
  );
}

export default App;
