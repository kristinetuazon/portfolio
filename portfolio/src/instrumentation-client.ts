import { initBotId } from "botid/client/core";

// Vercel BotID: invisibly checks that requests to these routes come from a real browser.
// Its challenge script is only served on Vercel, so skip it when running locally
// (the server only enforces BotID on Vercel too; see src/pages/api/cv.ts).
const local = ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);

if (!local) {
  initBotId({
    protect: [{ path: "/api/cv", method: "POST" }],
  });
}
