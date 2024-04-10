type TToolTips = {
  [key: string]: {
    Clue: string;
    ToolTip: string;
    Category: string;
  };
};

//TODO - Add more tooltips for the "Ranking" clues
export const ToolTips: TToolTips = {
  Abbreviation: {
    Clue: "Abbreviation",
    ToolTip: "Abbreviation or code representing the country.",
    Category: "Social",
  },
  AgriculturalLandPct: {
    Clue: "Agricultural Land Percentage",
    ToolTip: "Percentage of land area used for agricultural purposes.",
    Category: "Geography",
  },
  ArmedForcesSize: {
    Clue: "ArmedForcesSize",
    ToolTip: "Size of the armed forces in the country.",
    Category: "Military",
  },
  BirthRate: {
    Clue: "BirthRate",
    ToolTip: "Number of births per 1,000 population per year.",
    Category: "Demographics",
  },
  CallingCode: {
    Clue: "CallingCode",
    ToolTip: "International calling code for the country.",
    Category: "Social",
  },
  CapitalCity: {
    Clue: "CapitalCity",
    ToolTip: "Name of the capital or major city.",
    Category: "Geography",
  },
  Co2Emissions: {
    Clue: "Co2Emissions",
    ToolTip: "Carbon dioxide emissions in tons.",
    Category: "Health",
  },
  CoastlineDistance: {
    Clue: "CoastlineDistance",
    ToolTip: "Total distance of country boundary that touches coastline, in km.",
    Category: "Geography",
  },
  CPI: {
    Clue: "CPI",
    ToolTip: "Consumer Price Index, a measure of inflation and purchasing power.",
    Category: "Economics",
  },
  CurrencyCode: {
    Clue: "CurrencyCode",
    ToolTip: "Currency code used in the country.",
    Category: "Economics",
  },
  DeathRatePerThousand: {
    Clue: "DeathRatePerThousand",
    ToolTip: "The number of deaths per 1,000 population per year.",
    Category: "Health",
  },
  Density: {
    Clue: "Density",
    ToolTip: "Population density measured in persons per square kilometer.",
    Category: "Demographics",
  },
  ExportPartners: {
    Clue: "ExportPartners",
    ToolTip:
      "Top 3 countries or entities with which the country engages in significant export trade.",
    Category: "Economics",
  },
  FertilityRate: {
    Clue: "FertilityRate",
    ToolTip: "Average number of children born to a woman during her lifetime.",
    Category: "Demographics",
  },
  ForestedAreaPct: {
    Clue: "ForestedAreaPct",
    ToolTip: "Percentage of land area covered by forests.",
    Category: "Geography",
  },
  GasolinePrice: {
    Clue: "GasolinePrice",
    ToolTip: "Price of gasoline per liter in local currency.",
    Category: "Economics",
  },
  GDP: {
    Clue: "GDP",
    ToolTip:
      "Gross Domestic Product, the total value of goods and services produced in the country.",
    Category: "Economics",
  },
  GDPPerCapita: {
    Clue: "GDPPerCapita",
    ToolTip:
      "Gross Domestic Product (GDP) per capita, which represents the average wealth per person in the country.",
    Category: "Economics",
  },
  HighestElevation: {
    Clue: "HighestElevation",
    ToolTip: "The highest point in the country, usually measured in meters above sea level.",
    Category: "Geography",
  },
  InfantMortality: {
    Clue: "InfantMortality",
    ToolTip: "Number of deaths per 1,000 live births before reaching one year of age.",
    Category: "Health",
  },
  InternetCountryCode: {
    Clue: "InternetCountryCode",
    ToolTip: "The two-letter country code used in internet domain names governed by the country.",
    Category: "Social",
  },
  InternetUsersPct: {
    Clue: "InternetUsersPct",
    ToolTip: "Percentage of the country's population that uses the internet.",
    Category: "Demographics",
  },
  LandArea: {
    Clue: "LandArea",
    ToolTip: "Total land area of the country in square kilometers.",
    Category: "Geography",
  },
  Landlocked: {
    Clue: "Landlocked",
    ToolTip: " Indicates whether the country is entirely surrounded by land and has no coastline.",
    Category: "Geography",
  },
  LargestCity: {
    Clue: "LargestCity",
    ToolTip: "Name of the country's largest city.",
    Category: "Geography",
  },
  Latitude: {
    Clue: "Latitude",
    ToolTip: "Latitude coordinate of the country's location.",
    Category: "Geography",
  },
  LifeExpectancy: {
    Clue: "LifeExpectancy",
    ToolTip: "Average number of years a newborn is expected to live.",
    Category: "Health",
  },
  LiteracyPct: {
    Clue: "LiteracyPct",
    ToolTip: "Percentage of the population aged 15 and over who can read and write.",
    Category: "Demographics",
  },
  Longitude: {
    Clue: "Longitude",
    ToolTip: "Longitude coordinate of the country's location.}",
    Category: "Geography",
  },
  MaternalMortalityRatio: {
    Clue: "MaternalMortalityRatio",
    ToolTip: "Number of maternal deaths per 100,000 live births.",
    Category: "Health",
  },
  MedianAge: {
    Clue: "MedianAge",
    ToolTip:
      "The age that divides the population into two numerically equal groups, with half being younger and half older.",
    Category: "Demographics",
  },
  MinimumWage: {
    Clue: "MinimumWage",
    ToolTip: "Minimum wage level in local currency.",
    Category: "Economics",
  },
  MostPopularReligion: {
    Clue: "MostPopularReligion",
    ToolTip: "The dominant religion or faith tradition practiced in the country.",
    Category: "Social",
  },
  Obesity: {
    Clue: "Obesity",
    ToolTip: "Percentage of the population that is considered obese.",
    Category: "Health",
  },
  OfficialLanguage: {
    Clue: "OfficialLanguage",
    ToolTip: "Official language(s) spoken in the country.",
    Category: "Social",
  },
  OutOfPocketHealthExpenditure: {
    Clue: "OutOfPocketHealthExpenditure",
    ToolTip: "Percentage of total health expenditure paid out-of-pocket by individuals.",
    Category: "Health",
  },
  PhysiciansPerThousand: {
    Clue: "PhysiciansPerThousand",
    ToolTip: "Number of physicians per thousand people.",
    Category: "Health",
  },
  Population: {
    Clue: "Population",
    ToolTip: "Total population of the country.",
    Category: "Demographics",
  },
  PopulationBelowPovertyLine: {
    Clue: "PopulationBelowPovertyLine",
    ToolTip: "Percentage of the population living below the poverty line.",
    Category: "Demographics",
  },
  PopulationLaborForcePct: {
    Clue: "PopulationLaborForcePct",
    ToolTip: "Percentage of the population that is part of the labor force.",
    Category: "Demographics",
  },
  PrimaryEducationEnrollmentRatio: {
    Clue: "PrimaryEducationEnrollmentRatio",
    ToolTip: "Gross enrollment ratio for primary education, per one thousand persons.",
    Category: "Health",
  },
  RandomBorderCountry: {
    Clue: "RandomBorderCountry",
    ToolTip: "A neighboring country that shares a border with the country, selected randomly.",
    Category: "Geography",
  },
  TaxRevenuePct: {
    Clue: "TaxRevenuePct",
    ToolTip: "Tax revenue as a percentage of GDP.",
    Category: "Economics",
  },
  TotalExports: {
    Clue: "TotalExports",
    ToolTip: "Total value of goods and services exported by the country in a given period.",
    Category: "Economics",
  },
  TotalTaxRate: {
    Clue: "TotalTaxRate",
    ToolTip: "Overall tax burden as a percentage of commercial profits.",
    Category: "Economics",
  },
  UnemploymentRate: {
    Clue: "UnemploymentRate",
    ToolTip: "Percentage of the labor force that is unemployed.",
    Category: "Demographics",
  },
  UrbanPopulation: {
    Clue: "UrbanPopulation",
    ToolTip: "Percentage of the population living in urban areas.",
    Category: "Demographics",
  },
} as const;
