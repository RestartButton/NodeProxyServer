$('body').ready(getLocation());
$("#curtain").hide();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $('#result').text("Geolocation is not supported by this browser.");
    $("#curtain").show();
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

async function getPlaceName(position) {
  $.ajax({
    type:"POST",
    dataType: "json",
    url: window.location + 'place',
    data: {
      "lat": `${position.coords.latitude}`,
      "lon": `${position.coords.longitude}`,
    },
    success: (result) => {
      let text = result.results[0].county ? `${result.results[0].county}/${result.results[0].country}` : `${result.results[0].country}`;
      $('#title').append(`<div id="longname">` + text + `</div>`);
      $("#curtain").show();
    }
  });
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
    success: async (result) => {
      console.log(`${result.name}: ${result.weather[0].main}`);
      $('#result').html(
        `<div id="title">` +
          `<div id="city">${result.name}</div>` + 
        `</div>` +
        `<div id="icon">` + 
          `<img id="wicon" src="http://openweathermap.org/img/wn/${result.weather[0].icon}.png" alt="Weather icon">` + 
          `<h2>` + 
            `${Math.ceil(result.main.temp - 273.15)}°C` + 
          `</h2>` + 
        `</div>` + 
        `<div>` + 
          `<div id="weather">` + 
            `${capitalizeFirstLetter(result.weather[0].description)}` + 
          `</div>` + 
          `<div id="maxmin">` + 
            `${Math.ceil(result.main.temp_min - 273.15)}°C/${Math.ceil(result.main.temp_max - 273.15)}°C` + 
          `</div>` + 
        `</div>` 
        );
        if(result.weather[0].main) {
          $('body').css('background-image', `url(${getBackgroud(result.weather[0].main)})`);
          await getPlaceName(position);
        }
        
    }

  });
  
}

