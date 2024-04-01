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
scrape_data_to_combine = scrape_data_to_combine[scrape_data_to_combine['official_country_name'].isin(kaggle_countries)]
filtered_countries_list = scrape_data_to_combine['official_country_name'].tolist()

# diff check the two lists
diff = list(set(full_countries_list) - set(filtered_countries_list))
for country in diff:
  print(country)




