const api = {
  key: "ca53ab2e8bdd900cfc6c40c6543c0799",
  base: "https://api.openweathermap.org/data/2.5/"
}

let searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
  }
}

let countryCode = "bd"

function getResults(query) {
  fetch(`${api.base}weather?zip=${query},${countryCode}&units=metric&APPID=${api.key}`)
    .then(weather => {

      return weather.json();
    }).then(displayResults);
}


function displayResults(weather) {
  let city = document.querySelector('.location .city');
  
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  
  let now = new Date();
  // console.log(now);
  // for local time show
  let timeHMS = document.querySelector('.timeHMS');
  
  let hours = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  
  timeHMS.innerText = hours;
  // for date show
  let date = document.querySelector('.dates');
  date.innerText = dateBuilder(now);
  
  let temp = document.querySelector('.temp');
  
  let currentTemp = `${Math.round(weather.main.temp)}<span>°C</span>`;
  temp.innerHTML = currentTemp;
  
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerHTML = weather.weather[0].description;
  
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return ` ${day}, ${date} ${month} ${year}`;
}
