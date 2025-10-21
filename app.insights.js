async function fetchForecastByCity(city) {
  const unit = localStorage.getItem('sw_unit') || 'metric';
  const r = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`);
  if(!r.ok) throw new Error('Forecast fetch failed');
  return await r.json();
}

function aggregateDaily(forecast) {
  const byDay = {};
  forecast.list.forEach(item => {
    const d = new Date(item.dt*1000);
    const dk = d.toLocaleDateString();
    if(!byDay[dk]) byDay[dk] = { temps:[], hum:[], wind:[] };
    byDay[dk].temps.push(item.main.temp);
    byDay[dk].hum.push(item.main.humidity);
    byDay[dk].wind.push(item.wind.speed);
  });
  const days = Object.keys(byDay).slice(0,7);
  return days.map(dk=>{
    const o = byDay[dk];
    return {
      day: dk,
      avgTemp: Math.round(o.temps.reduce((a,b)=>a+b,0)/o.temps.length),
      avgHum: Math.round(o.hum.reduce((a,b)=>a+b,0)/o.hum.length),
      avgWind: Math.round((o.wind.reduce((a,b)=>a+b,0)/o.wind.length)*10)/10
    }
  });
}

function drawCharts(data) {
  const tempCtx = document.getElementById('tempChart').getContext('2d');
  const humWindCtx = document.getElementById('humWindChart').getContext('2d');
  const labels = data.map(d=>d.day);
  const temps = data.map(d=>d.avgTemp);
  const hums = data.map(d=>d.avgHum);
  const winds = data.map(d=>d.avgWind);

  new Chart(tempCtx, { type:'line', data:{ labels, datasets:[{ label:'Avg Temp', data:temps, borderColor:'#ff7a7a', tension:0.3, fill:false }] }, options:{ responsive:true } });

  new Chart(humWindCtx, { type:'bar', data:{ labels, datasets:[{ label:'Humidity %', data:hums, backgroundColor:'#6ec1ff' }, { label:'Wind m/s', data:winds, backgroundColor:'#ffd36e' }] }, options:{ responsive:true, scales:{ y:{ beginAtZero:true } } } });
}

document.getElementById('insRun').addEventListener('click', async ()=>{
  const city = document.getElementById('insCity').value.trim();
  if(!city) return alert('Enter a city');
  try{
    const f = await fetchForecastByCity(city);
    const agg = aggregateDaily(f);
    drawCharts(agg);
  }catch(e){ alert('Error: '+e.message) }
});
