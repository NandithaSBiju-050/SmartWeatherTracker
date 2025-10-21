const unitSelect = document.getElementById('unitSelect');
const themeSelect = document.getElementById('themeSelect');
unitSelect.value = localStorage.getItem('sw_unit')||'metric';
themeSelect.value = localStorage.getItem('sw_theme')||'light';
unitSelect.addEventListener('change', ()=>{ localStorage.setItem('sw_unit', unitSelect.value); alert('Unit saved'); });
themeSelect.addEventListener('change', ()=>{ localStorage.setItem('sw_theme', themeSelect.value); alert('Theme saved'); });
document.getElementById('logoutSet')?.addEventListener('click', ()=>{ localStorage.removeItem('sw_user'); window.location='login.html'; });
