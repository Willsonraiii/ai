const CACHE_NAME = 'aura-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install - cache core
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{}))
  );
});

// Activate - clean old
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

// Fetch - cache-first for assets, network-first for HTML/api
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Skip open-meteo / openai
  if (url.hostname.includes('open-meteo.com') || url.hostname.includes('openai.com')) return;
  
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        // cache successful GET
        if (e.request.method === 'GET' && resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(()=> cached || caches.match('/index.html'));
    })
  );
});

// Push - for future server push (when you add backend)
self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : { title: 'AURA', body: 'You have a reminder' };
  e.waitUntil(
    self.registration.showNotification(data.title || 'AURA', {
      body: data.body || data.message || 'Reminder from AURA',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      data: data,
      requireInteraction: true,
      actions: [
        { action: 'open', title: 'Open AURA' },
        { action: 'dismiss', title: 'Dismiss' }
      ]
    })
  );
});

// Notification click
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  if (e.action === 'dismiss') return;
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.includes(self.location.origin) && 'focus' in c) return c.focus();
      }
      return clients.openWindow('/');
    })
  );
});

// Background sync for reminders (Chrome)
self.addEventListener('sync', (e) => {
  if (e.tag === 'aura-reminders') {
    e.waitUntil(checkDueReminders());
  }
});

// Periodic check - called via postMessage from main thread
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SCHEDULE_REMINDER') {
    scheduleReminder(e.data.reminder);
  }
  if (e.data && e.data.type === 'CHECK_REMINDERS') {
    e.waitUntil(checkDueReminders());
  }
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Store reminders in IDB via cache? simpler: use clients to check localStorage via message
// Instead we handle reminders directly in SW via stored data passed from client

let scheduled = [];

function scheduleReminder(reminder) {
  // reminder: {id, text, at: timestamp}
  scheduled.push(reminder);
  // Keep only future
  scheduled = scheduled.filter(r => r.at > Date.now());
  // Set timeout for next
  setNextTimer();
}

function setNextTimer() {
  if (scheduled.length === 0) return;
  scheduled.sort((a,b)=>a.at-b.at);
  const next = scheduled[0];
  const delay = next.at - Date.now();
  if (delay <= 0) {
    fireReminder(next);
    scheduled.shift();
    setNextTimer();
    return;
  }
  // Cap at 24h max for setTimeout reliability
  const capped = Math.min(delay, 2147483647);
  setTimeout(() => {
    fireReminder(next);
    scheduled = scheduled.filter(r=>r.id!==next.id);
    setNextTimer();
    // Also check any other due
    checkDueReminders();
  }, capped);
}

function fireReminder(reminder) {
  self.registration.showNotification('AURA Reminder', {
    body: reminder.text,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [300, 100, 300, 100, 300],
    requireInteraction: true,
    tag: 'aura-reminder-'+reminder.id,
    data: reminder,
    actions: [
      { action: 'open', title: 'Open' },
      { action: 'done', title: 'Mark done' }
    ]
  });
  // Also broadcast to all clients
  self.clients.matchAll().then(clients => {
    clients.forEach(c => c.postMessage({ type: 'REMINDER_DUE', reminder }));
  });
}

async function checkDueReminders() {
  // Ask clients for due reminders
  const clients = await self.clients.matchAll();
  clients.forEach(c => c.postMessage({ type: 'CHECK_DUE_NOW' }));
}
