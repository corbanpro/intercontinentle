import CountriesData from "data/countryData";

export type TValidCountry = keyof typeof CountriesData;

export type TCountry = {
  [key: string]: string;
};

export type TCountries = {
  [key: string]: TCountry;
};

export type TGuess = {
  value: string;
  isCorrect: boolean;
};

export type TClue = {
  category: string;
  fact: string;
};
