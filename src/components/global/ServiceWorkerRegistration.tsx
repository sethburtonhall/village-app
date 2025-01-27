"use client";

import { useEffect } from "react";

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registered:", reg))
        .catch((err) =>
          console.error("Service Worker registration failed:", err),
        );
    }
  }, []);

  return null;
};

export default ServiceWorkerRegistration;
