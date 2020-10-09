import csv
import datetime
import requests

with open('Aardgas.csv') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=';')

    for row in csvreader:
        if row[0] == 'ï»¿Timestamp':
            continue

        timestamp = datetime.datetime.strptime(row[0], '%d/%m/%Y %H:%M:%S')
        timestamp = int(timestamp.timestamp())

        req = requests.post("http://nuc.home:8086/api/v2/write?bucket=meersmeter&precision=s", data=f"gas value={row[1]} {timestamp}")
        print(req.text)