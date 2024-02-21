export type TCountry = {
  [key: string]: string;
};

export type TCountries = {
  [key: string]: TCountry;
};

export type TClue = {
  category: string;
  fact: string;
};
