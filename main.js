// Shared helpers for SmartWeatherTracker
function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (!el) return; el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.getElementById('getStarted')?.addEventListener('click', ()=>{
  smoothScrollTo('#mainSearch');
});

// change background tone by weather condition (basic mapping)
function applyWeatherTone(condition) {
  const body = document.body;
  const c = (condition||'').toLowerCase();
  if (c.includes('rain')) {
    body.style.background = 'linear-gradient(120deg, #74c0ff 0%, #809fff 100%)';
  } else if (c.includes('cloud')) {
    body.style.background = 'linear-gradient(120deg, #dfe9f3 0%, #c3cfe2 100%)';
  } else if (c.includes('snow')) {
    body.style.background = 'linear-gradient(120deg, #e6f0ff 0%, #ffffff 100%)';
  } else if (c.includes('clear')||c.includes('sun')) {
    body.style.background = 'linear-gradient(120deg, #ffd3a5 0%, #ffb86b 100%)';
  } else {
    body.style.background = ''; // fallback to CSS
  }
}

// small auth helper
function requireAuthOrRedirect() {
  if (!localStorage.getItem('sw_user')) window.location = 'login.html';
}

// favorites helper
function addCityToFavorites(city) {
  if(!city) return;
  const arr = JSON.parse(localStorage.getItem('favCities')||'[]');
  if(!arr.includes(city)) { arr.push(city); localStorage.setItem('favCities', JSON.stringify(arr)); }
}

function removeCityFromFavorites(city) {
  let arr = JSON.parse(localStorage.getItem('favCities')||'[]'); arr = arr.filter(c=>c!==city); localStorage.setItem('favCities', JSON.stringify(arr)); }

// small helper to format date nicely
function formatDateLocale(ts){ const d = new Date(ts); return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}` }
