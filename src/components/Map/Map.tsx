import React from "react";
import MapSvg from "./MapSvg";
import CountryDataJson from "data/countryData.json";
import { TCountries } from "types/Country";

const CountryData: TCountries = CountryDataJson;

export default function Map({
  submitGuessHander,
}: {
  submitGuessHander: (guess: string, e?: React.FormEvent<HTMLFormElement>) => void;
}) {
  function CountryClickHandler(countryCode: string) {
    console.log(CountryData[countryCode.toLowerCase()]?.Country);
    submitGuessHander(CountryData[countryCode.toLowerCase()]?.Country);
  }

  return (
    <>
      <MapSvg CountryClickHandler={CountryClickHandler} />
    </>
  );
}
