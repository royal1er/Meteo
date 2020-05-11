var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var Client =require('node-rest-client').Client;

//activer les dépendances
var app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static(__dirname + '/semantic'))



//utiliser les routes

app.get('/',(req,res) => {
 res.render('meteo.ejs')
})


.post('/', urlencodedParser, function(req, res) {
 // ajouter un élément à la liste (si le champs n'est pas vide)
 var ville = req.body
 ville = ville.meteo
 console.log(ville);
 var client = new Client();
 var url = "https://www.prevision-meteo.ch/services/json/"+ville
 console.log(url);
 client.registerMethod("jsonMethod",url, "GET");
 client.methods.jsonMethod(function (data, response) {
   // parsed response body as json object
   if(town != ""){
     var town = data.city_info.name
     var condition = data.current_condition.condition
     var soleil = data.city_info.sunrise
     var csoleil = data.city_info.sunset
     var temp = data.current_condition.tmp
   }
   res.render('meteo',{condition: condition, town: town, soleil: soleil, csoleil: csoleil, temp: temp})
 });
})

.listen(3000)
