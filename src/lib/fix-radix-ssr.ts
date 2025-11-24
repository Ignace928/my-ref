// src/lib/fix-radix-ssr.ts

// Empêche Radix de générer des IDs différents entre SSR et client
if (typeof window !== "undefined") {
  window.__radix = window.__radix || { id: 0 };
}
