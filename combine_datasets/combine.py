import pandas as pd
import numpy as np
import os

# Load the datasets
current_dir = os.path.dirname(__file__)
data_dir = os.path.join(current_dir, '../public/')
kaggle_data = pd.read_csv(data_dir + 'world-data-2023.csv')
scrape_data = pd.read_csv(data_dir + 'scrape-data.csv')
# print(kaggle_data.head())
# print(scrape_data.head())

# create a new dataframe, from scrape_data, with only the columns we want
# random_border_country, highest_elevation, coastline_distance, landlocked, most_popular_religion, median_age, death_rate, obesity, literacy, GDP_per_capita, population_below_poverty_line, total_exports, export_partners, internet_users_pct, internet_country_code
scrape_data_to_combine = scrape_data[['official_country_name', 'random_border_country', 'highest_elevation', 'coastline_distance', 'landlocked', 'most_popular_religion', 'median_age', 'death_rate', 'obesity', 'literacy', 'GDP_per_capita', 'population_below_poverty_line', 'total_exports', 'export_partners', 'internet_users_pct', 'internet_country_code']]
full_countries_list = scrape_data_to_combine['official_country_name'].tolist()

# list of all countries in kaggle_data
kaggle_countries = kaggle_data['Country'].tolist()

# filter scrape_data_to_combine to only include countries that are in kaggle_data
filtered_countries_list = scrape_data_to_combine['official_country_name'].tolist()

# diff check the two lists
diff = list(set(full_countries_list) - set(filtered_countries_list))
# for country in diff:
#   print(country)

scrape_data_to_combine = scrape_data_to_combine.rename(columns={'official_country_name': 'Country'})

corrected_countries = {
	"The Bahamas": "Bahamas, The",
	"Democratic Republic of the Congo": "Congo, Democratic Republic of the",
	"Republic of the Congo": "Congo, Republic of the",
	"Ivory Coast": "Cote d'Ivoire",
	"Czech Republic": "Czechia",
	"The Gambia": "Gambia, The",
	"Palestinian National Authority": "Gaza Strip",
	"Republic of Ireland": "Ireland",
	"North Korea": "Korea, North",
	"South Korea": "Korea, South",
	"Federated States of Micronesia": "Micronesia, Federated States of",
	"Turkey": "Turkey (Turkiye)",
}

inverse_corrected_countries = {v: k for k, v in corrected_countries.items()}

for key in corrected_countries:
	kaggle_data.loc[kaggle_data['Country'] == key, 'Country'] = corrected_countries[key]

for country in kaggle_data['Country']:
	if country in inverse_corrected_countries:
		# strip "" from the start and end of country
		fill_country = inverse_corrected_countries[country].strip('"')
		kaggle_data.loc[kaggle_data['Country'] == country, 'Country'] = fill_country

# remove the S����������� country from the kaggle_data
kaggle_data = kaggle_data[kaggle_data['Country'] != "S�����������"]

scrape_data_to_combine = scrape_data_to_combine[scrape_data_to_combine['Country'].isin(kaggle_countries)]

# merge the two datasets
combined_data = pd.merge(kaggle_data, scrape_data_to_combine, on='Country', how='left')

correct_column_names = {
  'Country' : 'Country',
  'Density\n(P/Km2)': 'Density',
  'Abbreviation': 'Abbreviation',
  'Agricultural Land( %)' : 'AgriculturalLandPct',
  'Land Area(Km2)' : 'LandArea',
  'Armed Forces size' : 'ArmedForcesSize',
  'Birth Rate' : 'BirthRate',
  'Calling Code' : 'CallingCode',
  'Capital/Major City' : 'CapitalCity',
  'Co2-Emissions' : 'Co2Emissions',
  'CPI' : 'CPI',
  'Currency-Code' : 'CurrencyCode',
  'Fertility Rate' : 'FertilityRate',
  'Forested Area (%)' : 'ForestedAreaPct',
  'Gasoline Price' : 'GasolinePrice',
  'GDP' : 'GDP',
  'Gross primary education enrollment (%)' : 'PrimaryEducationEnrollmentPct',
  'Infant mortality' : 'InfantMortality',
  'Largest city' : 'LargestCity',
  'Life expectancy' : 'LifeExpectancy',
  'Maternal mortality ratio' : 'MaternalMortalityRatio',
  'Minimum wage' : 'MinimumWage',
  'Official language' : 'OfficialLanguage',
  'Out of pocket health expenditure' : 'OutOfPocketHealthExpenditure',
  'Physicians per thousand' : 'PhysiciansPerThousand',
  'Population' : 'Population',
  'Population: Labor force participation (%)' : 'PopulationLaborForcePct',
  'Tax revenue (%)' : 'TaxRevenuePct',
  'Total tax rate' : 'TotalTaxRate',
  'Unemployment rate' : 'UnemploymentRate',
  'Urban_population' : 'UrbanPopulation',
  'Latitude' : 'Latitude',
  'Longitude' : 'Longitude',
  'random_border_country' : 'RandomBorderCountry',
  'highest_elevation' : 'HighestElevation',
  'coastline_distance' : 'CoastlineDistance',
  'landlocked' : 'Landlocked',
  'most_popular_religion' : 'MostPopularReligion',
  'median_age' : 'MedianAge',
  'death_rate' : 'DeathRate',
  'obesity' : 'Obesity',
  'literacy' : 'LiteracyPct',
  'GDP_per_capita' : 'GDPPerCapita',
  'population_below_poverty_line' : 'PopulationBelowPovertyLine',
  'total_exports' : 'TotalExports',
  'export_partners' : 'ExportPartners',
  'internet_users_pct' : 'InternetUsersPct',
  'internet_country_code' : 'InternetCountryCode'
}

# rename the columns
combined_data = combined_data.rename(columns=correct_column_names)
# drop CPI Change (%) and Gross tertiary education enrollment (%) columns
combined_data = combined_data.drop(columns=['CPI Change (%)', 'Gross tertiary education enrollment (%)'])

num_cols = [col for col in combined_data.columns if combined_data[col].dtype in ['int64', 'float64']]
# percent_cols = [col for col in combined_data.columns if combined_data[col].dtype == 'object' and '%' in combined_data[col].iloc[0]]

ranking_df = combined_data[num_cols].apply(lambda x: x.rank(ascending=False))

ranking_df.columns = [col + 'Ranking' for col in ranking_df.columns]

result_df = pd.concat([combined_data, ranking_df], axis=1)
result_df = result_df.drop(columns=['LatitudeRanking', 'LongitudeRanking'])

# print all columns and their values for one country
country_name = 'United States'
country_row = result_df.loc[result_df['Country'] == country_name]
print(country_row.to_string(index=False))


result_df.to_csv(data_dir + 'combined_data.csv', index=False)

countries_to_print_landarea = ["Panama",
"Papua New Guinea",
"Paraguay",
"Peru",
"Philippines",
"Poland",
"Portugal",
"Qatar",
"Romania",
"Russia",
"Rwanda",
"Saint Kitts and Nevis",
"Saint Lucia",
"Saint Vincent and the Grenadines",
"Samoa",
"San Marino",
"Saudi Arabia",
"Senegal",
"Serbia",
"Seychelles",
"Sierra Leone",
"Singapore",
"Slovakia",
"Slovenia",
"Solomon Islands",
"Somalia",
"South Africa",
"South Korea",
"South Sudan",
"Spain",
"Sri Lanka",
"Sudan",
"Suriname",
"Sweden",
"Switzerland",
"Syria",
"Tajikistan",
"Tanzania",
"Thailand",
"East Timor",
"Togo",
"Tonga",
"Trinidad and Tobago",
"Tunisia",
"Turkey",
"Turkmenistan",
"Tuvalu",
"Uganda",
"Ukraine",
"United Arab Emirates",
"United Kingdom",
"United States",
"Uruguay",
"Uzbekistan",
"Vanuatu",
"Venezuela",
"Vietnam",
"Yemen",
"Zambia",
"Zimbabwe"]


for row in result_df.iterrows():
	if row[1]['Country'] in countries_to_print_landarea:
		print(row[1]['Country'], row[1]['LandArea'])

