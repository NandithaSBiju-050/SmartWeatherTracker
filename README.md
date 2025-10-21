# SmartWeatherTracker

A simple, attractive static front-end weather app using OpenWeatherMap.

Quick start

1. Copy `config.example.js` to `config.js` and set your OpenWeatherMap API key there:

```javascript
// config.js (local only — DO NOT commit)
const API_KEY = 'YOUR_REAL_KEY_HERE';
```

2. Start a local server (Python):

```powershell
py -3 -m http.server 5500
```

3. Open http://127.0.0.1:5500/index.html

Security

- Keep the real API key out of the repo. `config.js` is included in `.gitignore`.
- If you accidentally committed a key, rotate it immediately in OpenWeatherMap and remove it from your repo history.

Files

- `index.html`, `dashboard.html`, `favorites.html`, `insights.html`, `login.html`, `signup.html`, `contact.html`
- `style.css`, `main.js`, `app.js`, `script.fixed.js`, `app.favs.js`, `app.insights.js`, `app.auth.js`

How to publish to GitHub

1. Create a repository on GitHub (via web or CLI).
2. From your project folder:

```powershell
git init
git add .
git commit -m "Initial commit - SmartWeatherTracker"
# add remote (replace URL with your repo URL)
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

Deployment & hiding the API key

- Deploy to GitHub Pages, Netlify or Vercel for a live demo.
- To keep the API key secret in production, add a small server-side proxy or serverless function to inject the key.

If you want, I can scaffold a minimal proxy or help deploy and wire a secure function for the API key.