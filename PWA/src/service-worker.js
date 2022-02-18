/* eslint-disable no-undef, no-restricted-globals */
import { precacheAndRoute } from "workbox-precaching";
self.importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.2/workbox-sw.js"
);

console.log("Loaded service worker!");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Got push", data);
  self.registration.showNotification(data.title, {
    body: "Testing PWA-push",
    icon: "/assets/logo.png",
  });
});

precacheAndRoute(self.__WB_MANIFEST);
