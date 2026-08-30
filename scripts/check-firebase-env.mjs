const required = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

if (process.env.VERCEL || process.env.CI) {
  const missing = required.filter((key) => !process.env[key]?.trim());
  if (missing.length > 0) {
    console.warn("Firebase env vars missing. Course preview will run without login.");
    for (const key of missing) console.warn(`   - ${key}`);
  } else {
    console.log("✓ Firebase env vars present for build");
  }
}
