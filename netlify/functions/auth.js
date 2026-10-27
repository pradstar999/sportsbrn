// Verifies admin credentials without embedding a password in the public JavaScript.
// Set ADMIN_PASSWORD in Netlify environment variables. Optional: ADMIN_USER (defaults to admin).
const crypto = require("crypto");

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
  },
  body: JSON.stringify(body),
});

function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { ...json(405, { error: "POST only" }), headers: { ...json(405, {}).headers, Allow: "POST" } };
  }

  const expectedUser = process.env.ADMIN_USER || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) return json(503, { error: "Admin sign-in is not configured. Set ADMIN_PASSWORD in Netlify." });

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid request." });
  }

  const userOk = safeEqual(body.username || "", expectedUser);
  const passwordOk = safeEqual(body.password || "", expectedPassword);
  if (!userOk || !passwordOk) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return json(401, { error: "Incorrect username or password." });
  }

  return json(200, { ok: true });
};
