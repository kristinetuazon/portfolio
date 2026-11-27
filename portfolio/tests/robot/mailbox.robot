*** Settings ***
Documentation       The mailbox (blog): envelopes, letters, redirects, RSS and envelope regressions.
Resource            resources/common.resource
Suite Setup         Start Browser
Suite Teardown      Close Browser    ALL
Test Teardown       Close Context


*** Test Cases ***
Old Blog Links Redirect To The Mailbox
    [Tags]    smoke    redirects
    Open Site    /blog
    Get Url    ==    ${BASE_URL}/mailbox
    Open Site    /blog/why-programming
    Get Url    ==    ${BASE_URL}/mailbox/why-programming

Mailbox Shows Letters As Envelopes
    [Tags]    smoke
    Open Site    /mailbox
    Text Should Contain    main h1    the mailbox;
    Get Element Count    .envelope    >=    1
    Text Should Contain    .env-title >> nth=0    Why programming?

Opening An Envelope Shows The Letter
    [Tags]    smoke    letters
    Open Site    /mailbox
    Click    .envelope-link >> nth=0
    Get Url    ==    ${BASE_URL}/mailbox/why-programming
    Get Style    .letter    opacity    ==    1
    Text Should Contain    .letter h1    Why programming?
    Get Text    .post-body    *=    2020 was a tough year

Back Brings A Sealed Envelope
    [Documentation]    Regression: the envelope could be left stuck half-open.
    [Tags]    regression    letters
    Open Site    /mailbox
    Click    .envelope-link >> nth=0
    Get Url    ==    ${BASE_URL}/mailbox/why-programming
    Go Back
    Get Url    ==    ${BASE_URL}/mailbox
    Get Classes    .envelope-wrap >> nth=0    validate    "is-opening" not in value
    ${leftover}=    Evaluate JavaScript    .env-flap >> nth=0    (flap) => flap.getAttribute("style")
    Should Be Equal    ${leftover}    ${None}    The flap still has animation styles: ${leftover}

The Open Flap Sits Behind The Letter
    [Documentation]    Regression: in some browsers the opened flap was drawn in front of the letter.
    [Tags]    regression    letters
    Open Site    /mailbox
    # Hold the envelope open by stopping the page change, then look at the layers.
    Evaluate JavaScript    ${None}    () => { window.next.router.push = () => new Promise(() => {}); }
    Click    .envelope-link >> nth=0
    Sleep    1s
    ${on_top}=    Evaluate JavaScript    ${None}
    ...    () => {
    ...      const f = document.querySelector(".env-flap").getBoundingClientRect();
    ...      const l = document.querySelector(".env-letter").getBoundingClientRect();
    ...      const el = document.elementFromPoint(l.left + l.width / 2, Math.max(f.top, l.top) + 10);
    ...      return el && el.className;
    ...    }
    Should Be Equal    ${on_top}    env-letter

RSS Feed Lists Posts
    [Tags]    smoke    rss
    Open Site    /mailbox
    ${xml}=    Evaluate JavaScript    ${None}    async () => (await fetch("/mailbox/rss.xml")).text()
    Should Contain    ${xml}    <title>kristineCodes; mailbox</title>
    Should Contain    ${xml}    <title>Why programming?</title>
    Should Contain    ${xml}    /mailbox/why-programming</link>

Reduced Motion Shows The Letter Straight Away
    [Tags]    accessibility    letters
    Open Site    /mailbox/why-programming    reduced_motion=reduce
    Get Style    .letter    opacity    ==    1
    Get Element States    .letter-fold-top    contains    hidden
