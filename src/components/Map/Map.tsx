import React from "react";
import MapSvg from "./MapSvg";
import CountryDataJson from "data/countryData.json";
import { TCountries, TCountryData } from "types/Country";

const CountryData: TCountries = Object.entries(CountryDataJson).reduce((acc, [countryCode, data]) => {
  acc[countryCode] = Object.entries(data).reduce((countryAcc, [category, values]) => {
    countryAcc[category] = values;
    return countryAcc;
  }, {} as TCountryData);
  return acc;
}, {} as TCountries);

export default function Map({
  submitGuessHandler,
}: {
  submitGuessHandler: (guess: string, e?: React.FormEvent<HTMLFormElement>) => void;
}) {
  function CountryClickHandler(countryCode: string) {
    console.log(CountryData[countryCode].Country.value.toLowerCase());
    submitGuessHandler(CountryData[countryCode].Country.value.toLowerCase());
  }

  return (
    <>
      <div className="map-wrapper">
        <MapSvg CountryClickHandler={CountryClickHandler} />
      </div>
    </>
  );
}
