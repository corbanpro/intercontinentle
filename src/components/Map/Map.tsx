import React from "react";
import MapSvg from "./MapSvg";
import CountryDataJson from "data/countryData.json";
import { TCountries } from "types/Country";

const CountryData: TCountries = CountryDataJson;

type TMapProps = {
  submitGuessHandler: (guess: string, e?: React.FormEvent<HTMLFormElement>) => void;
};

export default function Map({ submitGuessHandler }: TMapProps) {
  function CountryClickHandler(countryCode: string) {
    submitGuessHandler(CountryData[countryCode.toLowerCase()]?.Country.value);
  }

  return (
    <>
      <div className="map-container">
        <div className="map">
          <MapSvg width={650} CountryClickHandler={CountryClickHandler} />
        </div>
      </div>
    </>
  );
}
