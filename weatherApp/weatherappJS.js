
$(document).ready(function(){
      var url = "";
      var longitude;
      var latitude;
      var tempUnit = "imperial";
      var imgUrl;
      var accepted;
      var temperature;
      var hum;
  
      start(); // call start() function to check if geolocation is supported
  
 function start(){
     accepted = false;
     setTimeout(
     function(){
      if (!accepted) {
        accepted = true;
        useCity();
        }
      },
    7000 // if nothing happens after 7secs, assumes the user clicked 'Not Now' and                uses IP address to get location details
    );
      //if geolocation is supported, run getCurrentPosition(), if geolocation is  not supported, display error message, then use ip address to get location details
      if(navigator.geolocation){          
        navigator.geolocation.getCurrentPosition(success, error, {timeout:9000});  
      }
      else{
        $("#error").html("Geolocation is not supported by your browser. Using IP...");
        useCity();
        $("#error").hide();
      }       
} 
  //sets the latitude and longitude and then appends them to the API url and calls getLocation() to display details of the weather
    function success(position){
      accepted = true;
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
       url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&APPID=a9ec719a259e0f571fb4b509e76c4bc5&units="+tempUnit;
        getLocation();    
  }
  
  function error(positionError){ 
    accepted = true;
    useCity();   
  }
   
   
  function getLocation(){
   $.ajax({ 
                url: url,
                data:{
                    format:'json'
                },
                dataType:'jsonp',
                error: function(jqXHR, textStatus, errorThrown){
                    $("#error").html("Opps, couldn't retrieve address " +jqXHR.status + jqXHR.statusText);   
                },
                success: function(data){  
                     var desc = data.weather[0].description;
                     var cityName = data.name;
                     var countryCode = data.sys.country;
                     temperature = data.main.temp;
                     hum = data.main.humidity;
                     imgUrl = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
                 
                  $("#testing").html("Temp : "+temperature);
                  $("#descrip").html(desc);
                  $("#humidity").html("Humidity : " + hum);
               document.getElementById("weaImg").src=imgUrl;
                  $("#placeName").html(cityName +",  "+countryCode);
                },
                type:'GET'   
              });   
}
  function useCity(){
      $("#cityForm").show();  
      var city = document.getElementById("cities");
      city.addEventListener("keydown", function(e){
          if(e.keyCode === 13){
            city = document.getElementById("cities").value;
      url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&APPID=a9ec719a259e0f571fb4b509e76c4bc5&units="+tempUnit;
      getLocation(); 
           $("#cityForm").hide();
          }         
      });
     document.getElementById("cities").value = "";   
}
  function useIP(){
    $.ajax({
      url: "https://ipinfo.io/geo",
      datatype:'jsonp',
      data:{
          format: 'json'},
      success: function(data){
        var coords = data.loc;
        var coordsArr = coords.split(",");
        latitude = coordsArr[0];
        longitude = coordsArr[1];
         url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&APPID=a9ec719a259e0f571fb4b509e76c4bc5&units="+tempUnit;
        getLocation();
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log("Opps, something went wrong.");
      }
    });
}
  
   $("#cel").click(function(){
     url=url.replace("imperial", "metric");
     getLocation();  
    });
     
   $("#fah").click(function(){
       url = url.replace("metric", "imperial");
       getLocation();
    });
  $("#ent").click(function(){
     var city = document.getElementById("cities").value;
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&APPID=a9ec719a259e0f571fb4b509e76c4bc5&units="+tempUnit;
      getLocation(); 
           $("#cityForm").hide();
  });
});
