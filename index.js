var express = require('express')
var ejs = require('ejs')
const url = require('url')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var Client =require('node-rest-client').Client;
var getJSON = require('get-json');

//activer les dépendances
var app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static(__dirname + '/semantic'))



//accueil
app.get('/',(req,res) => {
 res.render('meteo.ejs')
})

.post('/', urlencodedParser, function(req, res) {
 var ville = req.body
 ville = ville.meteo
 console.log(ville);
 var client = new Client();
 var urlville = "https://www.prevision-meteo.ch/services/json/"+ville
 console.log(urlville);
 client.registerMethod("jsonMethod",urlville, "POST");
 client.methods.jsonMethod(function (data, response) {
   if((typeof(data.errors) == 'undefined')){
     console.log(town);
     console.log(data);
     var town = data.city_info.name
     var condition = data.current_condition.condition
     var soleil = data.city_info.sunrise
     var csoleil = data.city_info.sunset
     var temp = data.current_condition.tmp
     var imgsrc = data.current_condition.icon
     var condition1 = data.fcst_day_0.condition
     var jour1 = data.fcst_day_0.day_long
     var tempmin1 = data.fcst_day_0.tmin
     var tempmax1 = data.fcst_day_0.tmax
     var imgsrc1 = data.fcst_day_0.icon
     var condition2 = data.fcst_day_1.condition
     var jour2 = data.fcst_day_1.day_long
     var tempmin2 = data.fcst_day_1.tmin
     var tempmax2 = data.fcst_day_1.tmax
     var imgsrc2 = data.fcst_day_1.icon
     var condition3 = data.fcst_day_2.condition
     var jour3 = data.fcst_day_2.day_long
     var tempmin3 = data.fcst_day_2.tmin
     var tempmax3 = data.fcst_day_2.tmax
     var imgsrc3 = data.fcst_day_2.icon
      res.render('meteo',{condition: condition, town: town, soleil: soleil,
        csoleil: csoleil, temp: temp, imgsrc: imgsrc, imgsrc1:imgsrc1, jour1: jour1,
        tempmin1: tempmin1, tempmax1:tempmax1, condition1:condition1, imgsrc2:imgsrc2,
        jour2: jour2, tempmin2: tempmin2, tempmax2:tempmax2, condition2:condition2, imgsrc3:imgsrc3,
        jour3: jour3, tempmin3:tempmin3, tempmax3:tempmax3, condition3:condition3})
    }
    else if((data.errors[0].code == 11)){
      console.log(data);
      var ville = req.body
      ville = ville.meteo
      var desc = data.errors[0].description
      res.render('ville',{ville: ville, desc: desc})
        }});
})

app.get('/erreur',(req,res) => {
   var ville = req.body
   ville = ville.meteo
    res.render('ville',{ville: ville})
})


.listen(3000)
