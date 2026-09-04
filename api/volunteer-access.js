function codesFromEnv() {
  const raw = process.env.VOLUNTEER_ACCESS_CODES || process.env.VITE_VOLUNTEER_ACCESS_CODES || "";
  return String(raw)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export default function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const submitted = String(req.body?.code ?? "").trim();
  res.status(200).json({ ok: Boolean(submitted) && codesFromEnv().includes(submitted) });
}
