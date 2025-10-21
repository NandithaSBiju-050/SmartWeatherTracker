const favCitiesList = document.getElementById('favCitiesList');
async function fetchWeather(city) {
  try {
    const unit = localStorage.getItem('sw_unit')||'metric';
    const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`);
    if(!r.ok) return null;
    return await r.json();
  } catch(e) { return null }
}

async function renderFavCities(){
  const favs = JSON.parse(localStorage.getItem('favCities')||'[]');
  if (!favCitiesList) return;
  if (favs.length===0) { favCitiesList.innerHTML = '<li>No favorites yet. Add a city from the dashboard.</li>'; return; }
  // fetch weather for each favorite and render card
  const cards = await Promise.all(favs.map(async c=>{
    const data = await fetchWeather(c);
    if (!data) return `<li class="fav-card"><strong>${c}</strong><div>Unavailable</div><div><button data-city="${c}" class="view-btn">View</button> <button data-city="${c}" class="fav-btn">Remove</button></div></li>`;
    const temp = Math.round(data.main.temp);
    const desc = data.weather?.[0]?.description || '';
    return `<li class="fav-card"><strong>${data.name}, ${data.sys.country}</strong><div>${temp}° · ${desc}</div><div><button data-city="${data.name}, ${data.sys.country}" class="view-btn">View</button> <button data-city="${data.name}, ${data.sys.country}" class="fav-btn">Remove</button></div></li>`;
  }));
  favCitiesList.innerHTML = cards.join('');
  // wire buttons
  favCitiesList.querySelectorAll('.fav-btn').forEach(b=> b.addEventListener('click', ()=>{
    const city = b.dataset.city; let arr = JSON.parse(localStorage.getItem('favCities')||'[]'); arr = arr.filter(x=>x!==city); localStorage.setItem('favCities', JSON.stringify(arr)); renderFavCities();
  }));
  favCitiesList.querySelectorAll('.view-btn').forEach(b=> b.addEventListener('click', ()=>{
    const city = b.dataset.city; // open dashboard and search the city
    // navigate to dashboard and pre-fill search (best-effort)
    localStorage.setItem('sw_nav_city', city);
    window.location = 'dashboard.html';
  }));
}

renderFavCities();
document.getElementById('logoutFav')?.addEventListener('click', ()=>{ localStorage.removeItem('sw_user'); window.location='login.html'; });
