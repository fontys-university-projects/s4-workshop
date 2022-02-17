import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

self.addEventListener("push", (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: "Testing PWA-push",
    icon: "/assets/logo.png",
  });
});

precacheAndRoute(self.__WB_MANIFEST);