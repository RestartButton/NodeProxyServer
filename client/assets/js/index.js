var x = document.getElementById("result");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

async function showPosition(position) {
  //x.innerHTML = "Latitude: " + position.coords.latitude +
  //"<br>Longitude: " + position.coords.longitude;

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
    }

  });

  
}