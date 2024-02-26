BASE_URL = https://www.cia.gov/the-world-factbook/

- country
  - fact_key (1)
    - url
    - value
    - comparitive_ranking
    - category
    - tooltip
    - year_updated
    - only_country_page_enabled

comparitive_rankings:
  - communications, culture, economy, energy, environment, geography, government, military and security, people and society, transportation

Administrative divisions
  - url: field/administrative-divisions/
  - value: (";")[0]
    - some exceptions
  - comparitive_ranking: NA
  - category: geography
  - tooltip: This entry generally gives the numbers, designatory terms, and first-order administrative divisions as approved by the US Board on Geographic Names (BGN).
  - year_updated: NA
  - only_country_page_enabled: False

Male/Female population distribution
  - url: field/age-structure/
  - value: combine three categories 0-14 years, 15-64 years, 65 years and over, by sex

Age distribution
  - url: field/age-structure/
  - value: one string of three categories' percentages 0-14 years, 15-64 years, 65 years and over
  - year_updated: 2023 est.

Agricultural products
  - url: field/agricultural-products/
  - value: make an array of strings, randomly select three
  - tooltip: This entry provides a list of three of the country's ten most important agricultural products.

Airports, Number of 
  - url: field/airports/
  - value: (";")[0]
    - 2024 est.
    - compare to other countries
  - tooltip: This entry gives the total number of active airports or airfields and includes both civilian and military facilities. The runway(s) may be paved (concrete or asphalt surfaces) or unpaved (grass, earth, sand, or gravel surfaces)

Area, Total
  - url: field/area/
  - value: ("tal: ")[1]
    - order and rank each country for compartive value
  - tooltip: the sum of all land and water areas delimited by international boundaries and/or coastlines

Area, Land
  - url: field/area/
  - value: ("and: ")[1]
    - order and rank each country for compartive value
  - tooltip: the aggregate of all surfaces delimited by international boundaries and/or coastlines, excluding inland water bodies (lakes, reservoirs, rivers)

Area, Water
  - url: field/area/
  - value: ("ater: ")[1]
    - order and rank each country for compartive value
  - tooltip: the sum of the surfaces of all inland water bodies, such as lakes, reservoirs, or rivers, as delimited by international boundaries and/or coastlines.

Area, Comparative
  - url: field/area-comparative/
  - value: full string
  - tooltip: an area comparison based on total area equivalents. Most entities are compared with the entire US or one of the 50 states based on area measurements (1990 revised) provided by the US Bureau of the Census. The smaller entities are compared with Washington, DC (178 sq km, 69 sq mi) or The Mall in Washington, DC (0.59 sq km, 0.23 sq mi, 146 acres).

Birth rate
  - url: field/birth-rate/
  - value: (" (2023")[1] full, includes (2023 est.)
    - 2023 est.
  - tooltip: This entry gives the average annual number of births during a year per 1,000 persons in the population at midyear; also known as crude birth rate.

Budget, Revenues
  - url: field/budget/
  - value: ("enues: ")[1], (" (")[0]
    - .
  - tooltip: This entry records total revenues received by the national government. The difference between revenues and expenditures is the budget balance. Sources of revenues are taxes, fees, and social contributions related to a specific government's activities. Revenues from the federal government are the individual and corporate income tax, Social Security contributions, excise taxes, and grants. State and local government revenues come from income, sales, and property taxes and various fees.

Budget, Expenditures