/* Simple weather fetcher using OpenWeatherMap */
// Replace the apiKey value below with your OpenWeatherMap API key
/* Clean weather fetcher (no embedded API key) */
// Add your OpenWeatherMap API key to the `apiKey` constant below.
// Note: keeping API keys in source is not recommended for public repos.
const apiKey = ''; // <-- PUT YOUR KEY HERE (or keep blank and set locally)

const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');

function showMessage(msg) {
  weatherDisplay.innerHTML = `<p>${msg}</p>`;
}

searchBtn.addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    showMessage('Please enter a city name.');
    return;
  }
  if (!apiKey) {
    showMessage('Please set your OpenWeatherMap API key in script.js');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(async response => {
      if (!response.ok) {
        try {
          const errData = await response.json();
          const msg = errData && errData.message ? errData.message : 'City not found';
          throw new Error(msg);
        } catch (e) {
          throw new Error('City not found');
        }
      }
      return response.json();
    })
    .then(data => {
      weatherDisplay.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
      `;
    })
    .catch(err => showMessage(`Error: ${err.message}`));
});
