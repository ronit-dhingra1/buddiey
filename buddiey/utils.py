import json
import pickle

# Parse JSON input and get value based off the key that is inputted as a paramter
def parse_json(json_data, key):
    dict_data = json.loads(json_data.read())
    value_data = dict_data[key]
    return value_data
