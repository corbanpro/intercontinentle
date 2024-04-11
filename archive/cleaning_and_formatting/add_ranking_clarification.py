import json


def convert_country_data(country_data):
    converted_country_data = {}
    for key, value in country_data.items():
        if key.endswith("Ranking"):
            new_key = key[:-len("Ranking")]
            converted_country_data[new_key] = {
                "value": country_data[new_key], "ranking": value}
        else:
            converted_country_data[key] = {"value": value, "ranking": "NA"}
    return converted_country_data


def convert_json_format(input_file, output_file):
    # Read input JSON file
    with open(input_file, 'r') as f:
        data = json.load(f)

    # Create dictionary for converted data
    converted_data = {}

    # Iterate through each country's data
    for country_code, country_data in data.items():
        converted_country_data = convert_country_data(country_data)
        converted_data[country_code] = converted_country_data

    # Write converted data to output JSON file
    with open(output_file, 'w') as f:
        json.dump(converted_data, f, indent=2)


# Example usage:
input_file = r'src/data/countryData.json'
output_file = r'src/data/countryDataRankins.json'
convert_json_format(input_file, output_file)
