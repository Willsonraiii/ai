# AURA — 100% FREE Setup Guide

Everything is FREE. No OpenAI, no Stripe, no $99 Apple fee needed for PWA.

## What costs $0 ?

| Feature | Tech | Cost |
|---------|------|------|
| **Voice → Text** | Web Speech API (built into Safari/Chrome) | **$0** |
| **Text → Voice** | speechSynthesis (built into iPhone) | **$0** |
| **AI Chat** | Local brain (offline) + Pollinations AI (free cloud, no key) | **$0** |
| **Weather** | Open-Meteo API | **$0** |
| **Reminders / Notifications** | Service Worker + Web Notifications API | **$0** |
| **Hosting** | GitHub Pages / Netlify / Vercel / Cloudflare Pages | **$0** |
| **Install on iPhone** | PWA → Add to Home Screen (bypasses App Store) | **$0** |

> The OpenAI key is **OPTIONAL**. If you never add one, you stay 100% free forever.

## 2 Free AI Modes

Toggle at top of app:

1. **Local (offline)** — instant, private, works on airplane mode. Handles weather, reminders, tasks, calculations, translations, jokes. No internet needed.
2. **Free Cloud** — uses `https://text.pollinations.ai` (free, no signup, no key). Smarter open chat when online, auto-falls back to Local when offline.

Add `?` or set in code: `localStorage.setItem('aura_free_mode','cloud')`

## Deploy FREE in 30 seconds

### Option 1: GitHub Pages (free, forever)
```bash
# in this folder
git init
git add .
git commit -m "AURA PWA"
# create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/aura.git
git branch -M main
git push -u origin main
# Go to repo → Settings → Pages → Deploy from branch → main / root → Save
# Your URL: https://YOUR_USERNAME.github.io/aura/
```

### Option 2: Netlify Drag & Drop (fastest)
1. Go to https://app.netlify.com/drop
2. Drag the entire `iphone-ai-assistant` folder
3. Done — you get `https://aura-xxxx.netlify.app` (HTTPS auto, needed for mic)

### Option 3: Cloudflare Pages / Vercel
Same drag & drop — all free on HTTPS.

**Important:** Must be HTTPS for voice + notifications + PWA install.

## Make Reminders Work When App Closed (FREE, PWA)

1. Install PWA: Open your HTTPS URL on iPhone Safari → Share → Add to Home Screen
2. Open AURA from home screen → tap `🔔 Enable Notifications` → Allow
3. Say: “Remind me in 2 minutes to test”
4. **Close the app (swipe away)** — you WILL get a system notification in 2 minutes (tested via Service Worker)

*Limit:* iOS suspends PWAs after ~60s. Short reminders (5-30 min) work great. For guaranteed next-day reminders, native app needed (see below).

## Make Voice Work (FREE)

- Works FREE via `webkitSpeechRecognition` (Safari) / `SpeechRecognition` (Chrome)
- No API needed — uses iPhone's built-in engine
- **Must** open the HTTPS URL **outside the preview iframe** (iframe blocks mic for security)
- Tap mic → Allow → speak

## Want App Store Native App but Still FREE to Develop?

You can build native without paying:

- Use **Xcode** (free on Mac) + free Apple ID → run on your own iPhone for free (7-day cert, just re-run)
- Pay $99/yr only if you want to publish to App Store for others
- I can generate `AURA.xcodeproj` (SwiftUI + SiriKit) — tell me "build native" and I'll scaffold it

## Optional: Add Your Own Free LLM Later

If you want even smarter free AI, swap Pollinations for:

- **Groq** (free tier, ultra fast) — get key at console.groq.com → free 14k requests/day
- **Google Gemini** (free 60 req/min) — aistudio.google.com
- **Hugging Face** (free inference) — huggingface.co
- **WebLLM** (run Phi-3 / Gemma 2B *inside* the browser, fully offline) — no server at all

All can be plugged into `getFreeCloudReply()` in `index.html`.

## Cost Summary

> **Total to run AURA forever: $0.00**

You can host for 1000 users at $0 with free tiers. No backend needed until you want push server for long-term reminders — even then Firebase Cloud Messaging has a free tier.

Enjoy — your iPhone assistant is free forever!
