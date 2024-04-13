/* Header.tsx */
import React from "react";
import setColorScheme from "utils/setColorScheme";
import changeInputMode from "utils/changeInputMode";

function Header() {

  function handleDarkModeClick() {
    setColorScheme();
  }

  function handleMapInputMode() {
    changeInputMode();
  }
  return (
    <>  
      <header className="App-header saira">
        <div className="app-settings">
          <button id="color-setting" onClick={handleDarkModeClick} className="setting-button">Dark Mode</button>
          <button id="input-setting" onClick={handleMapInputMode} className="setting-button">Map Input Mode</button>
        </div>
        <h1>intercontinentle</h1>
        <div className="header-spacer">Spacer</div>
      </header>
    </>
  );
}

export default Header;