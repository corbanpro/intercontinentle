import React, { useState } from "react";
import MapSvg from "./MapSvg";

export default function Map() {
  const [selectedCountry, setSelectedCountry] = useState("");

  function CountryClickHandler(countryCode: string) {
    setSelectedCountry(countryCode);
  }

  let mapImage;
  try {
    mapImage = require(`data/countryOutlines/all/${selectedCountry.toLowerCase()}/vector.svg`);
  } catch (error) {
    mapImage = undefined;
  }

  return (
    <>
      {mapImage && <img className="filter-white" src={mapImage} alt="" height={100} />}
      <MapSvg CountryClickHandler={CountryClickHandler} />
    </>
  );
}
