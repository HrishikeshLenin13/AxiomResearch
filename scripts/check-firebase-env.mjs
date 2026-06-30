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
    console.error("\n❌ Firebase env vars missing for this Vercel build:\n");
    for (const key of missing) console.error(`   - ${key}`);
    console.error("\nAdd them in Vercel → Settings → Environment Variables");
    console.error("Enable Production + Preview + Development, then redeploy.\n");
    process.exit(1);
  }
  console.log("✓ Firebase env vars present for build");
}
