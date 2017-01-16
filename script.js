$(document).ready(function() {  
  var latitude;  //variable for lattitude
  var longitude;   //variable for longitude

  var location = "https://ipapi.co/json";
  
  $.getJSON(location, function(data2){
    latitude = data2.latitude; //storing lattitude info 
    longitude = data2.longitude; //storing longitude info 
    
    //Open Weather API with geolocation
    var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=a7bb6cdb70750c94d2b8a8307707c2c7";
  
    $.getJSON(api, function(data) {
      var weatherType = data.weather[0].description;
      var kelvin = data.main.temp;
      var windSpeed = data.wind.speed;
      var city = data.name;
      var tempChange = true;
      
      //temperature in fahrenheit
      var fahrenheit = ((kelvin) * (9/5)-459.67).toFixed(1);
      
      //temperature in celsius
      var celsius = (kelvin-273).toFixed(1);
      
      //displaying city, weather type, wind speed, and temperature to the page
      $("#city").html(city);
      $("#weatherType").html(weatherType);
      $("#windSpeed").html(windSpeed);
      $("#temp").html(fahrenheit + " &#x2109;");
      
      //Toggling between fahrenheit and celsius
      $("#temp").click(function() {
        if (tempChange === true) {
          $("#temp").html(celsius + " &#x2103;");
          tempChange = false;
        } else {
          $("#temp").html(fahrenheit + " &#x2109;");
          tempChange = true;
        }
      });
      
      //Calculating wind speed & displaying on page
      windSpeed = "Wind Speed "+(2.237*(windSpeed)).toFixed(1) + " MPH";
      $("#windSpeed").html(windSpeed);
      
      //Changing background image for various temperatures
      //Fahrenheit >= 95 degrees
      if (fahrenheit >= 95) { 
        $("body").addClass("background-95");
        
        //fahrenheit between 80-94 degrees
      } else if (fahrenheit >= 80 && fahrenheit < 95) { 
        $("body").addClass("background-80-95");
        
        //fahrenheit between 65-79 degrees
      } else if (fahrenheit >= 65 && fahrenheit < 80) {
        $("body").addClass("background-65-80");
        
        //fahrenheit between 50-64 degrees
      } else if (fahrenheit >= 50 && fahrenheit < 65) {
        $("body").addClass("background-50-65");
        
        //fahrenheit between 36-49 degrees
      } else if (fahrenheit < 50 && fahrenheit >= 36) {
        $("body").addClass("background-36-50");
        
        //fahrenheit <= 35 degrees
      } else if (fahrenheit <= 35) {
        $("body").addClass("background-35");
        
      }
  
 }); 
 
  });
 
});
  