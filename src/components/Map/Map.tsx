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
  mapWidth: number;
  mapAspectRatio: number;
  submitGuessHandler: (guess: string, e?: React.FormEvent<HTMLFormElement>) => void;
};

export default function Map({ mapWidth, mapAspectRatio, submitGuessHandler }: TMapProps) {
  function CountryClickHandler(countryCode: string) {
    submitGuessHandler(
      CountryData[countryCode.toLowerCase()]?.Country.value ??
        CountryAbbr[countryCode.toUpperCase()]
    );
  }

  return (
    <div className="map-container" style={{ minHeight: mapWidth * mapAspectRatio }}>
      <div className="map">
        <MapSvg
          mapWidth={mapWidth}
          mapAspectRatio={mapAspectRatio}
          CountryClickHandler={CountryClickHandler}
        />
      </div>
    </div>
  );
}
