/**
 * Local/preview API so volunteer access codes stay off the frontend bundle.
 * Reads VOLUNTEER_ACCESS_CODES (preferred) or VITE_VOLUNTEER_ACCESS_CODES.
 */
export function createVolunteerAccessMiddleware(env = process.env) {
  function codes() {
    const raw = env.VOLUNTEER_ACCESS_CODES || env.VITE_VOLUNTEER_ACCESS_CODES || "";
    return String(raw)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }

  return function volunteerAccessMiddleware(req, res, next) {
    const url = req.url?.split("?")[0] ?? "";
    if (url !== "/api/volunteer-access" && !url.endsWith("/api/volunteer-access")) {
      next();
      return;
    }

    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
      return;
    }

    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      let submitted = "";
      try {
        submitted = String(JSON.parse(raw || "{}").code ?? "").trim();
      } catch {
        submitted = "";
      }
      const ok = Boolean(submitted) && codes().includes(submitted);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok }));
    });
  };
}
