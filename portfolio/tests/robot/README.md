# Robot Framework tests

End-to-end tests for the portfolio, written with [Robot Framework](https://robotframework.org/)
and the [Browser library](https://robotframework-browser.org/) (Playwright under the hood).

| Suite | Covers |
| --- | --- |
| `home.robot` | Intro, onigiri nav (sections, bites), Lazuli timeline, bubble counter, earlier work and scrapbook, plus layout regressions (inner scrollbars, sideways scrolling, clipped washi tape) |
| `mailbox.robot` | `/blog` redirects, envelopes, opening a letter, the envelope after Back, flap layering, RSS feed, reduced motion |

Shared keywords live in `resources/common.resource`. Tests tagged `regression` guard bugs that were
fixed before. Run just those with `--include regression`.

## Run locally

```bash
cd portfolio
python3 -m venv tests/robot/.venv
tests/robot/.venv/bin/pip install -r tests/robot/requirements.txt
tests/robot/.venv/bin/rfbrowser init chromium
npm run build && npm start -- -p 3000 &
tests/robot/.venv/bin/robot --outputdir tests/robot/results tests/robot
```

Then open `tests/robot/results/report.html`.

- `BASE_URL` points the tests at another address (default `http://localhost:3000`).
- `CHROMIUM_PATH` uses an already-installed Chromium instead of the one `rfbrowser init` downloads.

## In CI

`.github/workflows/robot-tests.yml` builds the site, starts it, and runs the suite on every pull request
and on pushes to `main`. The Robot report and log are kept as a downloadable artifact (`robot-report`)
for 14 days.
