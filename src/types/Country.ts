import CountriesData from "data/countryData.json";

export type TValidCountry = keyof typeof CountriesData;

export type TCountry = {
  [key: string]: string;
};

export type TRankingData = {
  value: string;
  ranking: string;
};

export type TCountryData = {
  [key: string]: TRankingData;
};

export type TCountries = {
  [key: string]: TCountryData;
};

export type TGuess = {
  value: string;
  isCorrect: boolean;
};

export type TClue = {
  category: string;
  fact: string;
};
