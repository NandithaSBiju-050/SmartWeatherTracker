# SmartWeatherTracker

A simple, attractive static front-end weather app using OpenWeatherMap.

Quick start

1. Add your OpenWeatherMap API key to `config.js` (or better: run a server proxy). Do not commit your key.
2. Start a local server (Python):

```powershell
py -3 -m http.server 5500
```

3. Open http://127.0.0.1:5500/index.html

Security

- The project currently stores the API key in `config.js` for local development. Remove the key before pushing to a public repository or use a server-side proxy.

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

If you want, I can scaffold a minimal Node proxy to hide the API key and help you push the repo (I can't push to your GitHub directly, but I can provide the exact commands and help troubleshoot).