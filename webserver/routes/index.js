var express = require('express');
var router = express.Router();
// var influxdb = require('../src/InfluxDB')
var energieId = require('../src/EnergieID');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/savevalues', (req, res) => {
  if(req.query.gas){
    energieId.send('gas', req.query.gas)
    //influxdb.send('gas', req.query.gas)
  }

  if(req.query.electricity){
    energieId.send('electricity', req.query.electricity)
    //influxdb.send('electricity', req.query.electricity)
  }

  if(req.query.water){
    energieId.send('water', req.query.water)
    //influxdb.send('water', req.query.water)
  }

  res.redirect('/');
})

module.exports = router;
