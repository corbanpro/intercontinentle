/**
 * cowritten component
 */
import React, { useState } from "react";
import "components/App.css";
import Header from "components/Header";
import GameInputComponent from "components/GameInputComponent";
import CountryList from "./CountryList";

function App() {
  const [showMap, setShowMap] = useState(true);
  const [showCountryList, setShowCountryList] = useState(false);
  return (
    <div className="App">
      <Header
        showMap={showMap}
        setShowMap={setShowMap}
        setShowCountryList={setShowCountryList}
        showCountryList={showCountryList}
      />
      <GameInputComponent showMap={showMap} />
      <CountryList showCountryList={showCountryList} setShowCountryList={setShowCountryList} />
    </div>
  );
}

export default App;
