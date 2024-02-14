import CountriesJson from "../countries.json";

export type TValidCountries = keyof typeof CountriesJson;
export type TValidClueCategories = keyof typeof CountriesJson.Afghanistan;

export type TCountry = {
  [key in TValidClueCategories]: string;
};

export type TCountries = {
  [key in TValidCountries]: TCountry;
};

export type TClue = {
  category: string;
  fact: string;
};
