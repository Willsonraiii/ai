# AURA — AI Assistant for iPhone 📱✨

> Siri-like, **100% FREE**, PWA that works on iPhone — no App Store, no API key.

**Live:** Voice • Weather • Reminders (even when closed) • Tasks • Summarize • Calculate • Translate

### 🚀 Deploy FREE to GitHub Pages

1. Create a new repo on https://github.com/new (e.g., `aura`)
2. Then in this folder run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/aura.git
git branch -M main
git push -u origin main
```
3. GitHub → repo **Settings → Pages** → Source: **Deploy from branch** → Branch: **main** / **root** → Save
4. Open `https://YOUR_USERNAME.github.io/aura/` on iPhone Safari → **Share → Add to Home Screen** → full-screen app!

### Free Stack

- **Voice:** Web Speech API (free, built-in)
- **AI:** Local brain (offline) + Pollinations AI (free cloud, no key)
- **Weather:** Open-Meteo (free)
- **Notifications:** Service Worker (free)
- **Hosting:** GitHub Pages (free HTTPS)

### Features

- 🎙️ Tap mic / Dynamic Island to talk
- ⛅ Live Kathmandu weather
- ⏰ Reminders that notify even when app closed (after Allow Notifications)
- ✓ Tasks, 📅 Calendar, ✦ Summarize, ∑ Calculate, ◐ Translate
- PWA offline, installable

### Toggle Free Modes

At top: **Local (offline)** ↔ **Free Cloud** (smarter, needs internet). No payment ever.

Optional: for GPT-4o, run in console:
```
localStorage.setItem('aura_apikey','sk-...')
localStorage.setItem('aura_free_mode','cloud')
```

Made for iPhone • Works offline • 100% free forever
