/* Header.tsx */
import React from "react";
import setColorScheme from "utils/setColorScheme";

type THeaderProps = {
  showMap: boolean;
  setShowMap: (showMap: boolean) => void;
};

function Header({ showMap, setShowMap }: THeaderProps) {
  function handleDarkModeClick() {
    setColorScheme();
  }

  function handleMapInputMode() {
    setShowMap(!showMap);
  }
  return (
    <>
      <header className="App-header saira">
        <div className="app-settings">
          <button id="color-setting" onClick={handleDarkModeClick} className="setting-button">
            Dark Mode
          </button>
          <button id="input-setting" onClick={handleMapInputMode} className="setting-button">
            Map Input Mode
          </button>
        </div>
        <h1>intercontinentle</h1>
        <div className="header-spacer">Spacer</div>
      </header>
    </>
  );
}

export default Header;
