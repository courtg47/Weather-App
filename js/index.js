$(document).ready(function() {  
  var lat;  //variable for lattitude
  var long;   //variable for longitude
  
  $.getJSON("http://ip-api.com/json", function(data2){
    lat = data2.lat; //storing lattitude info 
    long = data2.lon; //storing longitude info 
    
    //Open Weather API with dynamic lattitude and longitude
    var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"139&appid=a7bb6cdb70750c94d2b8a8307707c2c7";
  
    $.getJSON(api, function(data) {
      var weatherType = data.weather[0].description;
      var kelvin = data.main.temp;
      var windSpeed = data.wind.speed;
      var city = data.name;
      var tempChange = true;
      
      //temperature in fahrenheit
      var fTemp = ((kelvin)*(9/5)-459.67).toFixed(1);
      //temperature in celsius
      var cTemp = (kelvin-273).toFixed(1);
      
      //displaying city, weather type, wind speed, and temperature to the page
      $("#city").html(city);
      $("#weatherType").html(weatherType);
      $("#windSpeed").html(windSpeed);
      $("#fTemp").html(fTemp+" &#x2109;");
      
      //for toggling between fahrenheit and celsius
      $("#fTemp").click(function() {
        if (tempChange===false) {
          $("#fTemp").html(cTemp+ " &#x2103;");
          tempChange=true;
        } else {
          $("#fTemp").html(fTemp+" &#x2109;");
          tempChange=false;
        }
      });
      
      //calculating wind speed & displaying on page
      windSpeed = "Wind Speed "+(2.237*(windSpeed)).toFixed(1) + " MPH";
      $("#windSpeed").html(windSpeed);
      
      //changing background image for various temperatures
      //fahrenheit >= 95 degrees
      if (fTemp >= 95) { 
        $("body").addClass("background-95");
        
        //fahrenheit between 80-94 degrees
      } else if (fTemp >=80 && fTemp<95) { 
        $("body").addClass("background-80-95");
        
        //fahrenheit between 65-79 degrees
      } else if (fTemp>=65 && fTemp<80) {
        $("body").addClass("background-65-80");
        
        //fahrenheit between 50-64 degrees
      } else if (fTemp >= 50 && fTemp<65) {
        $("body").addClass("background-50-65");
        
        //fahrenheit between 36-49 degrees
      } else if (fTemp<50 && fTemp>=36) {
        $("body").addClass("background-36-50");
        
        //fahrenheit <= 35 degrees
      } else if (fTemp<=35) {
        $("body").addClass("background-35");
        
      }
  
 }); 
 
  });
 
});