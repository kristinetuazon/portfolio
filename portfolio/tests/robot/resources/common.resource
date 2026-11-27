*** Settings ***
Documentation       Shared keywords for the portfolio's Robot Framework tests.
...                 Uses the Browser library (Playwright under the hood).
Library             Browser    timeout=10s    run_on_failure=Take Screenshot


*** Variables ***
# Where the site is running (CI starts a production build on port 3000).
${BASE_URL}         %{BASE_URL=http://localhost:3000}
# Optional: use an already-installed Chromium instead of the one rfbrowser downloads.
${CHROMIUM}         %{CHROMIUM_PATH=}
${DESKTOP}          {"width": 1440, "height": 900}
${PHONE}            {"width": 390, "height": 844}


*** Keywords ***
Start Browser
    [Documentation]    Launch headless Chromium once per suite.
    IF    $CHROMIUM
        New Browser    chromium    headless=${True}    executablePath=${CHROMIUM}
    ELSE
        New Browser    chromium    headless=${True}
    END

Open Site
    [Documentation]    Open a fresh, isolated page (new context, so no shared cookies or storage).
    [Arguments]    ${path}=/    ${viewport}=${DESKTOP}    ${reduced_motion}=no-preference
    ${viewport}=    Evaluate    json.loads($viewport)    modules=json
    New Context    viewport=${viewport}    reducedMotion=${reduced_motion}
    New Page    ${BASE_URL}${path}
    Wait For Load State    networkidle

Text Should Contain
    [Documentation]    Compare the element's actual text. Many headings are uppercased with CSS,
    ...    so their visible text (innerText) reads differently from the source.
    [Arguments]    ${selector}    ${expected}
    Get Property    ${selector}    textContent    *=    ${expected}

Hide Bubbles
    [Documentation]    The floating soap bubbles can sit on top of things we want to click.
    Add Style Tag    .soap-layer { display: none !important; }

Scroll To
    [Documentation]    Scroll an element into view and let its scroll animations settle.
    [Arguments]    ${selector}
    Evaluate JavaScript    ${selector}    (el) => el.scrollIntoView({ block: "center" })
    Sleep    1.2s

Scroll Through Page
    [Documentation]    Scroll top to bottom in steps, running a check at every stop.
    ...    The check is the name of a JavaScript function in window.__checks; returns failures.
    [Arguments]    ${check}
    ${failures}=    Evaluate JavaScript    ${None}
    ...    async (check) => {
    ...      const max = document.documentElement.scrollHeight - innerHeight;
    ...      const out = new Set();
    ...      for (let y = 0; y <= max + 1; y += Math.round(innerHeight / 3)) {
    ...        scrollTo(0, y);
    ...        await new Promise((r) => setTimeout(r, 200));
    ...        for (const f of window.__checks[check]()) out.add(f);
    ...      }
    ...      return [...out];
    ...    }
    ...    arg=${check}
    RETURN    ${failures}

Install Page Checks
    [Documentation]    Small JavaScript checks used by the regression tests.
    Evaluate JavaScript    ${None}
    ...    () => {
    ...      const label = (el) => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") +
    ...        (typeof el.className === "string" && el.className ? "." + el.className.split(" ")[0] : "");
    ...      window.__checks = {
    ...        // Any element (other than the page) that grew its own scrollbar.
    ...        innerScrollbars: () => [...document.querySelectorAll("body *")].filter((el) => {
    ...          const cs = getComputedStyle(el);
    ...          if (cs.display === "none") return false;
    ...          const y = /(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 1;
    ...          const x = /(auto|scroll)/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 1;
    ...          return x || y;
    ...        }).map(label),
    ...        // The page itself scrolling sideways.
    ...        sidewaysScroll: () => {
    ...          scrollTo(500, scrollY);
    ...          const moved = scrollX > 0;
    ...          scrollTo(0, scrollY);
    ...          return moved ? ["page scrolled sideways at y=" + Math.round(scrollY)] : [];
    ...        },
    ...      };
    ...    }
