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

export const emptyCountry: TCountry = {
  total_area: "NA",
  land_area: "NA",
  water_area: "NA",
  boundaries_distance: "NA",
  random_border_country: "NA",
  highest_elevation: "NA",
  mean_elevation: "NA",
  coastline_distance: "NA",
  landlocked: "NA",
  latitude: "NA",
  longitude: "NA",
  population: "NA",
  most_popular_religion: "NA",
  median_age: "NA",
  population_growth_rate: "NA",
  birth_rate: "NA",
  death_rate: "NA",
  sex_ratio: "NA",
  infant_mortality_rate: "NA",
  life_expectancy_at_birth: "NA",
  drinking_water_access_pct: "NA",
  obesity: "NA",
  literacy: "NA",
  government_type: "NA",
  GDP: "NA",
  GDP_growth_rate: "NA",
  GDP_per_capita: "NA",
  labor_force: "NA",
  unemployment_rate: "NA",
  population_below_poverty_line: "NA",
  total_exports: "NA",
  export_partners: "NA",
  export_commodities: "NA",
  total_imports: "NA",
  import_partners: "NA",
  electricity_access: "NA",
  mobile_phone_subscriptions: "NA",
  internet_users_total: "NA",
  internet_users_pct: "NA",
  internet_country_code: "NA",
};
