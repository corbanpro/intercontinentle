import React from "react";
import MapSvg from "./MapSvg";
import CountryDataJson from "data/countryData.json";
import { TCountries } from "types/Country";
import CountryAbbrJson from "data/countryAbbr.json";

type TCountryAbbr = {
  [key: string]: string;
};

const CountryData: TCountries = CountryDataJson;
const CountryAbbr: TCountryAbbr = CountryAbbrJson;

type TMapProps = {
  submitGuessHandler: (guess: string, e?: React.FormEvent<HTMLFormElement>) => void;
};

export default function Map({ submitGuessHandler }: TMapProps) {
  function CountryClickHandler(countryCode: string) {
    submitGuessHandler(
      CountryData[countryCode.toLowerCase()]?.Country.value ??
        CountryAbbr[countryCode.toUpperCase()]
    );
  }

  return (
    <div className="map-container">
      <div className="map">
        <MapSvg CountryClickHandler={CountryClickHandler} />
      </div>
    </div>
  );
}
