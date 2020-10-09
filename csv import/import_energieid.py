import csv
import datetime
import requests
import json

with open('Water.csv') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=';')

    values = []

    for row in csvreader:
        if row[0] == 'ï»¿Timestamp':
            continue

        timestamp = datetime.datetime.strptime(row[0], '%d/%m/%Y %H:%M:%S')
        timestamp = timestamp.strftime('%Y-%m-%dT%H:%M:%S+0000')
        values.append((timestamp, float(row[1])))

    headers = {'Content-Type' : 'application/json'}

    payload = {
            "remoteId": "meersmeter-water", #-water, -gas, -electricity
            "remoteName": "Water", # Water, Gas, Elektriciteit
            "metric": "drinkingWaterImport", # drinkingWaterImport, naturalGasImport, 'electricityImport'
            "unit": "m³", # m³, kWh
            "readingType": "counter",
            "data": values
        }
    
    print(json.dumps(payload))
    r = requests.post('https://hooks.energyid.eu/services/WebhookIn/b3ca2853-21d9-44ce-aa43-b9f849247c8c/0Z8NNFKJ88BH', headers=headers, data=json.dumps(payload))
    print(r.content)