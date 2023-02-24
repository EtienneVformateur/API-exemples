let latitude;
let longitude;
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    const crd = pos.coords;
    latitude = crd.latitude;
    longitude = crd.longitude;
    displayLatitude.textContent = latitude;
    displayLongitude.textContent = longitude;
    fetchTemperature(latitude,longitude);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
function fetchTemperature(la, lo){
    fetch(`https://weather.contrateumdev.com.br/api/weather?lat=${la}&lon=${lo}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        displayTemp.textContent = `${data.main.temp}° à ${data.name}`;
        let sunrise = new Date(data.sys.sunrise * 1000);
        let sunset = new Date(data.sys.sunset * 1000);
        displaySun.innerHTML = `
            Levé du soleil à : ${sunrise.getHours()}H${sunrise.getMinutes()} <br>
            Couché du soleil à : ${sunset.getHours()}H${sunset.getMinutes()}
        `
    });
} 


btnGet.addEventListener("click",()=>{
    
    navigator.geolocation.getCurrentPosition(success, error, options)
}
);
