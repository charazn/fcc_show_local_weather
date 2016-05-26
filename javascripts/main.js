$(document).ready(function() {
  var city_location = document.getElementById('cityLocation');

  if (!navigator.geolocation) {
    city_location.innerHTML = '<p>Geolocation is not supported by your browser</p>';
    return;
  }

  function success(position) {
    console.log(position);
  };

  function error() {
    city_location.innerHTML = 'Unable to retrieve your location';
  };

  city_location.innerHTML = '<p>Locating…</p>';

  navigator.geolocation.getCurrentPosition(success, error);

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  $.getJSON('http://ipinfo.io', function(data){
    var city = data.city;
    var region = data.region;
    var country = data.country;
    var city_region_country = "";
    if (city) {
      city_region_country += city;
    }
    if (region) {
      city_region_country += region;
    }
    if (country) {
      city_region_country += country;
    }
    var lat_lon = data.loc.split(',');
    var lat = lat_lon[0];
    var lon = lat_lon[1];

    city_location.innerHTML = city_region_country;

    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=a728f5bb1a1391b5cd501bcbdb761bf7&units=metric', function(data) {
      var weather = data.weather[0].description.capitalize();
      var weathericon = data.weather[0].icon;
      var temperature = data.main.temp;
      var pressure = data.main.pressure;
      var humidity = data.main.humidity;
      var windspeed = data.wind.speed;
      $('#weatherIcon')[0].innerHTML = '<img src="http://openweathermap.org/img/w/'+weathericon+'.png">';
      $('#weatherDescription')[0].innerHTML = weather;
      $('#temperature')[0].innerHTML += '<div class="temperature-text">'+temperature+'°C</div>';
      $('#pressure')[0].innerHTML += '<div class="pressure-text">'+pressure+'hPa</div>';
      $('#humidity')[0].innerHTML += '<div class="humidity-text">'+humidity+'%</div>';
      $('#windspeed')[0].innerHTML += '<div class="windspeed-text">'+windspeed+'m/s</div>';
    });
  });
});
