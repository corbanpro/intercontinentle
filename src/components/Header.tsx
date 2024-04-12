/* Header.tsx */
import React from "react";
import setColorScheme from "utils/setColorScheme";

interface HeaderProps {
  toggleDarkMode: () => void; // Function that toggles dark mode
}

function Header({ toggleDarkMode }: HeaderProps ) {

  function handleDarkModeClick() {
    toggleDarkMode();
    setColorScheme();
  }
  return (
    <>  
      <header className="App-header saira">
        <div className="app-settings">
          <button onClick={handleDarkModeClick} className="setting-button">Dark Mode</button>
          <button className="setting-button">Map Input Mode</button>
        </div>
        <h1>intercontinentle</h1>
        <div className="header-spacer">Spacer</div>
      </header>
    </>
  );
}

export default Header;