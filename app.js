// Dashboard behaviour
const searchMain = document.getElementById('searchMain');
const cityInputMain = document.getElementById('cityInputMain');
const curLoader = document.getElementById('curLoader');
const curResult = document.getElementById('curResult');
const forecast7 = document.getElementById('forecast7');
const forecast7Content = document.getElementById('forecast7Content');

function requireAuth() {
  const user = localStorage.getItem('sw_user');
  if (!user) { window.location = 'login.html'; }
}

function setLoadingCur(on) { curLoader.classList.toggle('hidden', !on); curResult.classList.toggle('hidden', on); }

async function fetchWeatherByCity(city) {
  const unit = localStorage.getItem('sw_unit') || 'metric';
  const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`);
  if (!r.ok) throw new Error('City not found');
  const data = await r.json();
  return data;
}


function renderCurrent(data) {
  curResult.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temp: ${data.main.temp}° · ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}% · Wind: ${data.wind.speed} m/s</p>
  `;
  // Add entrance animation class
  curResult.classList.remove('enter');
  // Force reflow then add class for CSS animation restart
  void curResult.offsetWidth;
  curResult.classList.add('enter');
}

// Dashboard add-to-favorites button
document.getElementById('addFavMain')?.addEventListener('click', ()=>{
  const h = curResult.querySelector('h2');
  if (!h) { alert('No city selected to add.'); return; }
  const city = h.textContent.trim();
  try{
    const arr = JSON.parse(localStorage.getItem('favCities')||'[]');
    if (!arr.includes(city)) { arr.push(city); localStorage.setItem('favCities', JSON.stringify(arr)); alert(`${city} added to favorites`); }
    else alert(`${city} is already in favorites`);
  }catch(e){ console.error(e); alert('Unable to add favorite'); }
});

// Some API keys do not have One Call access (returns 401). Use the 5-day/3-hour forecast and aggregate by day.
async function fetchForecastByCoords(lat, lon) {
  const unit = localStorage.getItem('sw_unit') || 'metric';
  const r = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);
  if (!r.ok) throw new Error('Forecast error');
  return await r.json();
}

function render7day(forecastData) {
  // forecastData.list contains 3-hour entries for 5 days; aggregate by day and show up to 7 days where available
  const byDay = {};
  forecastData.list.forEach(item => {
    const dayKey = new Date(item.dt * 1000).toLocaleDateString();
    if (!byDay[dayKey]) byDay[dayKey] = [];
    byDay[dayKey].push(item);
  });
  const days = Object.keys(byDay).slice(0,7);
  forecast7.style.display = 'block';
  forecast7Content.innerHTML = days.map(dk => {
    const items = byDay[dk];
    // choose the midday item if possible, otherwise average temperature
    let midday = items.find(i => new Date(i.dt*1000).getHours() === 12) || items[Math.floor(items.length/2)];
    const temp = Math.round(midday.main.temp);
    const desc = midday.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${midday.weather[0].icon}@2x.png`;
    return `<div class="forecast7-item"><strong>${dk}</strong><div>${temp}°</div><img src="${icon}" alt="icon"><div>${desc}</div></div>`;
  }).join('');

  // staggered entrance for forecast items
  const items = Array.from(forecast7Content.querySelectorAll('.forecast7-item'));
  items.forEach((el, idx) => {
    el.classList.remove('enter');
    setTimeout(() => el.classList.add('enter'), 80 * idx + 120);
  });
}

searchMain.addEventListener('click', async ()=>{
  const city = cityInputMain.value.trim(); if (!city) return;
  setLoadingCur(true);
  try {
    const data = await fetchWeatherByCity(city);
    setLoadingCur(false);
  renderCurrent(data);
  const forecastData = await fetchForecastByCoords(data.coord.lat, data.coord.lon);
  render7day(forecastData);
  } catch(e) { setLoadingCur(false); curResult.innerHTML = `<p>Error: ${e.message}</p>` }
});

document.getElementById('logout')?.addEventListener('click', ()=>{ localStorage.removeItem('sw_user'); window.location='login.html'; });

requireAuth();

// If a city was requested from another page (favorites view), auto-search and clear the hint
const navCity = localStorage.getItem('sw_nav_city');
if (navCity) {
  localStorage.removeItem('sw_nav_city');
  cityInputMain.value = navCity;
  searchMain.click();
}
