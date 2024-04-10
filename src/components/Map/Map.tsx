import React from "react";
import MapSvg from "./MapSvg";

export default function Map() {
  function CountryClickHandler(countryCode: string) {
    alert(`Country: ${countryCode}`);
  }

  return <MapSvg CountryClickHandler={CountryClickHandler} />;
}
