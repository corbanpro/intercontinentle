import pandas as pd
import numpy as np

# Load the data
countries = pd.read_csv('countries.csv')


null_counts = countries.isnull().sum(axis=1)
# print(countries[null_counts <= 10])

for index, country in countries.iterrows():
  try:
    country['population'] = country['population'].replace(',', '').astype(int)  
    # print(f"{country['offical_country_name']} {country['population']}")
  except:
    print(f"{country['official_country_name']} {country['population']}")


# try:
#   countries['population'] = countries['population'].str.replace(',', '').astype(int)
# except ValueError:
#   print()

# try:
#   print(countries["population"] < 20000)
# except TypeError:
#   pass

countries_filtered = countries[null_counts <= 10]
# for index, country in countries_filtered.iterrows():
#   print(country["official_country_name"])
