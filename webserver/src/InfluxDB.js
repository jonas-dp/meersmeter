var got = require('got')
var http = require('http')

async function getLatestValue(tag){
    try {
        const res = await got(`http://nuc.home:8086/query?db=meersmeter&q=SELECT LAST(value) from "${tag}"`)
        return JSON.parse(res.body).results[0].series[0].values[0][1];
    } catch (error){
        return console.log(error);
    }
}

function send(tag, value){
    const timestamp = new Date().getTime()
    const body = `${tag} value=${value} ${timestamp}`

    const options = {
        hostname: 'nuc.home',
        port: 8086,
        path: '/api/v2/write?bucket=meersmeter&precision=ms',
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        }
    }

    const req = http.request(options, res => {
        console.log(res.statusCode)
    })

    req.write(body);
    req.end();
}

module.exports = {
    getLatestValue,
    send
}