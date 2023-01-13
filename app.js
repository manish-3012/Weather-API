// jshint esversion:6

// importing express to the .js file
// const { response } = require("express");
const express = require("express");

// creating an express server named as app
const app = express();

app.use(express.urlencoded({extended:true}));

// importing https server which is native to node
const https = require("https");


app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
});

app.post("/",function(req,res){
    const query = req.body.city;
    const key = "f4d035d5430f45b05f9d5439b8fe035e"; 
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +  "&appid=" + key + "&units=" + unit;

    // to response to the api link 
    https.get(url,function(response){
        console.log(response.statusCode);

        // to turn the response on when we recieve some data
        response.on("data",function(data){
            const weatherData = JSON.parse(data);  // to convert into javascript object
            
            // now we have converted the JSON format into JavaScript
            const desc = weatherData.weather[0].description;
            const city = weatherData.name;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
            
            res.write("<h1>The temperature at " + city + " is " + temp + " degree celsius</h1>");
            res.write("<h3>The weather is currently " + desc + "</h3>");
            res.write("<img src =" + imageURL + ">");
            res.send();
        });
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});