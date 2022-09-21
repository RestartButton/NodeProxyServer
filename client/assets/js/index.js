$('body').ready(getLocation());
$("#result").hide();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $('#result').text("Geolocation is not supported by this browser.");
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getBackgroud(w) {
  let base_url = '/img/'
  return w == 'Rain' ? (base_url + 'chuva.jpg') : w == 'Clouds' 
    ? (base_url + 'nublado.jpg') : (base_url + 'ensolarado.jpg');
}

async function showPosition(position) {

  $.ajax({
    type: "POST",
    dataType: "json",
    url: window.location + 'weather',
    data: {
        "lat": `${position.coords.latitude}`, 
        "lon": `${position.coords.longitude}`,
    },
    success: (result) => {
        console.log(`${result.name}: ${result.weather[0].main}`);
        $('#result').html(
          `<div id="icon">` + 
            `<h2>` +
              `<img id="wicon" src="http://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="Weather icon">` + 
              `${Math.ceil(result.main.temp - 273.15)}°C` + 
            `</h2>` +
          `</div>` +
          `<h2>${result.name}: ${capitalizeFirstLetter(result.weather[0].description)}</h2>`
        );
        if(result.weather[0].main) {
          $('body').css('background-image', `url(${getBackgroud(result.weather[0].main)})`);
          $("#result").show();
        }

    }

  });
  
}