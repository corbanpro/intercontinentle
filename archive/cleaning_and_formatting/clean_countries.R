library(tidyverse)
setwd("C:/Users/corba/Documents/WebDevProjects/intercontinentle/intercontinentle/src/I_HATE_CSV/")

raw_countries <- read_csv("../../public/countries.csv")

countries <- raw_countries %>%
  select(!most_pop_language_outside_native_and_english) %>%
  select(!...1) %>%
  mutate(landlocked = as.character(landlocked))

long_countries <- countries %>%
  pivot_longer(
    cols = total_area:internet_country_code,
  )

long_countries_na_counts <- long_countries %>%
  group_by(official_country_name) %>%
  summarise(count = sum(is.na(value)))

filtered_long_countries <- long_countries %>%
  left_join(long_countries_na_counts) %>%
  filter(count < 9)

filtered_countries <- filtered_long_countries %>%
  pivot_wider() %>%
  select(!count)

write_csv(filtered_countries, "../../public/filtered_countries.csv")
