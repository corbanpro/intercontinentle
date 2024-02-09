
# Hi I'm Corban and I ripped this code from GeeksforGeeks
# https://www.geeksforgeeks.org/convert-csv-to-json-using-python/

import csv
import json


def make_json(csvFilePath, jsonFilePath):
    data = {}
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for rows in csvReader:
            key = rows['official_country_name']
            data[key] = rows
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))


csvFilePath = r'public/filtered_countries.csv'
jsonFilePath = r'src/countries.json'

make_json(csvFilePath, jsonFilePath)
