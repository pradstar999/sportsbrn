// Publishes admin-entered results site-wide by committing data.js to GitHub.
// Netlify then redeploys from the new commit (about a minute).
//
// Required environment variables (Netlify > Site configuration > Environment variables):
//   GITHUB_TOKEN    fine-grained token with Contents: read & write on the repo only
//   ADMIN_PASSWORD  password the admin types when publishing (checked here, on the server)
// Optional:
//   GITHUB_REPO     default "pradstar999/sportsbrn"
//   GITHUB_BRANCH   default "main"

const crypto = require("crypto");

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(body),
});

function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function validShape(d) {
  return (
    d && typeof d === "object" &&
    Array.isArray(d.houses) && d.houses.length === 2 &&
    Array.isArray(d.houseSports) && d.houseSports.length > 0 &&
    Array.isArray(d.individualEvents) && d.individualEvents.length > 0 &&
    d.houseSports.every((s) => s && typeof s.id === "string" && Array.isArray(s.fixtures)) &&
    d.individualEvents.every((e) => e && typeof e.id === "string" && Array.isArray(e.results))
  );
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "POST only" });

  const { GITHUB_TOKEN, ADMIN_PASSWORD } = process.env;
  const repo = process.env.GITHUB_REPO || "pradstar999/sportsbrn";
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!GITHUB_TOKEN || !ADMIN_PASSWORD) {
    return json(500, { error: "Publishing is not set up yet: GITHUB_TOKEN and ADMIN_PASSWORD are missing in Netlify." });
  }

  let payload;
  try { payload = JSON.parse(event.body || "{}"); } catch { return json(400, { error: "Bad request" }); }

  if (!safeEqual(payload.password || "", ADMIN_PASSWORD)) {
    await new Promise((r) => setTimeout(r, 1200)); // slow down guessing
    return json(401, { error: "Wrong publish password." });
  }
  if (!validShape(payload.data)) return json(400, { error: "Data looks incomplete, nothing was published." });

  const gh = (path, opts = {}) =>
    fetch(`https://api.github.com/repos/${repo}/${path}`, {
      ...opts,
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "sportsbrn-publish",
        ...(opts.headers || {}),
      },
    });

  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      const cur = await gh(`contents/data.js?ref=${encodeURIComponent(branch)}`);
      if (!cur.ok) return json(502, { error: `Could not read data.js from GitHub (${cur.status}).` });
      const curFile = await cur.json();

      // Keep the explanatory comment at the top of data.js; replace only the data.
      const old = Buffer.from(curFile.content, "base64").toString("utf8");
      const at = old.indexOf("window.SITE");
      const header = at > 0 ? old.slice(0, at) : "";
      const text = header + "window.SITE = " + JSON.stringify(payload.data, null, 2) + ";\n";
      if (text.length > 3_000_000) return json(413, { error: "Data is too large." });
      if (text === old) return json(200, { ok: true, unchanged: true });

      const put = await gh("contents/data.js", {
        method: "PUT",
        body: JSON.stringify({
          message: "Update results from admin panel",
          content: Buffer.from(text, "utf8").toString("base64"),
          sha: curFile.sha,
          branch,
        }),
      });
      if (put.ok) return json(200, { ok: true });
      if (put.status !== 409 && put.status !== 422) {
        return json(502, { error: `GitHub refused the update (${put.status}). Check the token has Contents: write on ${repo}.` });
      }
      // someone published at the same moment: re-read and retry once
    }
    return json(409, { error: "Another update happened at the same time. Try again." });
  } catch (e) {
    return json(502, { error: "Could not reach GitHub." });
  }
};
