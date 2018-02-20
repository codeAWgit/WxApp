/*jslint browser: true*/
/*global $, jQuery*/

$(document).ready(() => {
  "use strict"
  let lat
  let long
  let wxUrl

  //Section that changes page to show weather information.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude.toFixed(2)
      long = position.coords.longitude.toFixed(2)
      wxUrl = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long
      //Pal -> 31.75, -95.6

      $.getJSON(wxUrl, a => {

        $(".main").html('<div class="col-md-5 text-center"><h1 id="ctyTwn">Location</h1><div class=' +
        '"row no-gutters"><div class="col col-xs-12"><h3>Weather:</h3><h3 id="wxCond">___</h3></div>' +
        '<div class="col col-xs-12"><h3>Temperature:</h3><h3 id="temperatureCF">___</h3></div></div>' +
        '<h6 class="wx"></h6></div><div class="secondCol col text-center"><img class="img-fluid rounded"' +
        ' src="https://jaypeeonline.net/wp-content/uploads/2010/03/technical_difficulty-620x400.jpg" ' +
        'alt="Technical Difficulties"></div>')
        
           $("#ctyTwn").html(a.name + ",<br/>" + a.sys.country)

          let currentOutsideWx = a.weather[0].main
          $("#wxCond").text(currentOutsideWx)
          let wxCondUrl = picChange(currentOutsideWx)
          $(".secondCol").html('<img class="img-fluid rounded" src="' + wxCondUrl + '" alt="' + currentOutsideWx + '">')

          let fOrCTemp = a.main.temp
          $("#temperatureCF").html(fOrCTemp.toFixed(1) + "&deg; C")

          $("#temperatureCF").on("click", () => {
            if (fOrCTemp === a.main.temp){
              fOrCTemp = Math.floor(fOrCTemp * 9 / 5) + 32
              $("#temperatureCF").html(fOrCTemp.toFixed(0) + "&deg; F")
            }
            else {
              fOrCTemp = a.main.temp
              $("#temperatureCF").html(fOrCTemp.toFixed(1) + "&deg; C")
            }
          })
        
      })
        .fail(() => {
          console.log("Error")
        })
        .always(() => {
          console.log("Done")
        })
    })
  }
  //What the page shows if geolocation is not enabled or available. (Technical difficulties image)
  else {
    $(".main").html('<div class="col text-center secondTier"><br/><h2>Location information needed.</h2><h4>For weather information please allow geolocation.</h4><br/><br/><img class="img-fluid rounded" src="https://jaypeeonline.net/wp-content/uploads/2010/03/technical_difficulty-620x400.jpg" alt="Technical Difficulties"></div>')
  }
})

let picChange = x => {
  if (x == "Sunny" || x == "Mostly sunny") {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Sunny.svg/512px-Sunny.svg.png"
  }
  if (x == "Clear" || x == "Mostly clear") {
    return "http://www.gannett-cdn.com/-mm-/719e7bcee360ff12d4581723688418bf93195dad/c=0-0-449-338&r=x404&c=534x401/local/-/media/MIGroup/PortHuron/2014/09/16/1410873237000-SUNNY.jpg"
  }
  if (x == "Clouds" || x == "Mostly clouds") {
    return "http://www.wallpaperawesome.com/wallpapers-awesome/wallpapers-weather-clouds-tornado-rain-cyclone-flashlights-awesome/wallpaper-massive-clouds-weather.jpg"
  }
  if (x == "Mist" || x == "Rain") {
    return "http://cliparts.co/cliparts/rcL/xkE/rcLxkEGRi.jpg"
  }
  return "https://jaypeeonline.net/wp-content/uploads/2010/03/technical_difficulty-620x400.jpg"
}