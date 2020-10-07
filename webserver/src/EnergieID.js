var https = require('https');
var querystring = require('querystring');

function send(tag, value){
    const timestamp = new Date().toISOString();
    let postData;

    if(tag === "gas"){
        postData = {
            "remoteId": "meersmeter-gas",
            "remoteName": "Aardgas (1)",
            "metric": "naturalGasImport",
            "unit": "m³",
            "readingType": "counter",
            "data": [
                [timestamp, value],
            ]
        };
    } else if(tag === 'water'){
        postData = {
            "remoteId": "meermseter-water",
            "remoteName": "Water (1)",
            "metric": "drinkingWaterImport",
            "unit": "m³",
            "readingType": "counter",
            "data": [
                [timestamp, value],
            ]
        };
    } else if (tag === 'electricity'){
        postData = {
            "remoteId": "meersmeter-electricity",
            "remoteName": "Elektriciteit (1)",
            "metric": "electricityImport",
            "unit": "kWh",
            "readingType": "counter",
            "data": [
                [timestamp, value],
            ]
        };
    }

    postData = JSON.stringify(postData);
    
    const postOptions = {
        host: 'hooks.energyid.eu',
        port: '443',
        path: '/services/WebhookIn/b3ca2853-21d9-44ce-aa43-b9f849247c8c/0Z8NNFKJ88BH',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const req = https.request(postOptions, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    })

    req.write(postData);
    req.end();
}

module.exports = {send}