const express= require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const apikey= "fd6177322c4a7773b5690abf30bafa6d"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apikey+ "&units=metric";

    https.get(url, function(response){
    console.log("statusCode: ", response.statusCode);
    
    response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp= weatherData.main.temp
        const weatherDescription= weatherData.weather[0].description
        const icon= weatherData.weather[0].icon
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The Weather is Currently " + weatherDescription + "</p>");
        res.write("<h1>The Temperature here at " + query + " is " + temp + " degree celcius</h1>");
        res.write("<image src=" + imageURL + ">")
        res.send() 
    })
    })
})




app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})