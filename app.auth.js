// Simple auth using localStorage for demo purposes
function users() { return JSON.parse(localStorage.getItem('sw_users')||'{}'); }
function saveUsers(u){ localStorage.setItem('sw_users', JSON.stringify(u)); }

document.getElementById('signupBtn')?.addEventListener('click', ()=>{
  const user = document.getElementById('signupUser').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const p1 = document.getElementById('signupPassword').value;
  const p2 = document.getElementById('signupPassword2').value;
  const msg = document.getElementById('signupMsg');
  if (!user||!email||!p1) { msg.textContent='Please fill all fields'; return; }
  if (p1!==p2) { msg.textContent='Passwords do not match'; return; }
  const u = users(); if (u[email]) { msg.textContent='Account exists'; return; }
  u[email] = { user, password: p1 }; saveUsers(u); msg.textContent='Registration successful — redirecting...'; setTimeout(()=>window.location='login.html',1200);
});

document.getElementById('loginBtn')?.addEventListener('click', ()=>{
  const email = document.getElementById('loginEmail').value.trim();
  const p = document.getElementById('loginPassword').value; const msg = document.getElementById('loginMsg');
  const u = users(); if (!u[email] || u[email].password!==p) { msg.textContent='Invalid credentials'; return; }
  localStorage.setItem('sw_user', JSON.stringify({email:email, name:u[email].user})); window.location='dashboard.html';
});

document.getElementById('forgotPwd')?.addEventListener('click', ()=>{ alert('For demo: reset by signing up again.'); });
