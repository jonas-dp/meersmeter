var express = require('express');
var router = express.Router();
var influxdb = require('../src/InfluxDB')
var energieId = require('../src/EnergieID');

/* GET home page. */
router.get('/', function(req, res, next) {
  let gas = 0;
  let water = 0;

  influxdb.getLatestValue('gas').then((data) => {
    gas = data;
    return influxdb.getLatestValue('water');
  }).then(data => {
    water = data;
    return influxdb.getLatestValue('electricity');
  }).then(data => {
    const lastValues = {
      'gas': gas,
      'water': water,
      'electricity': data
    }
    res.render('index', {lastValues});
  })
});

router.get('/savevalues', (req, res) => {
  if(req.query.gas){
    energieId.send('gas', req.query.gas)
    influxdb.send('gas', req.query.gas)
  }

  if(req.query.electricity){
    energieId.send('electricity', req.query.electricity)
    influxdb.send('electricity', req.query.electricity)
  }

  if(req.query.water){
    energieId.send('water', req.query.water)
    influxdb.send('water', req.query.water)
  }

  res.redirect('/');
})

module.exports = router;
