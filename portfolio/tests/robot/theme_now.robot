*** Settings ***
Documentation       The light/dark theme button and the "now;" line under the intro.
Resource            resources/common.resource
Suite Setup         Start Browser
Suite Teardown      Close Browser    ALL
Test Teardown       Close Context


*** Test Cases ***
Dark Is The Default
    [Tags]    smoke    theme
    Open Site
    ${theme}=    Evaluate JavaScript    ${None}    () => document.documentElement.dataset.theme ?? null
    Should Be Equal    ${theme}    ${None}
    Get Style    body    background-color    ==    rgb(43, 33, 41)

Dark Stays The Default Even When The Computer Prefers Light
    [Tags]    theme
    ${viewport}=    Evaluate    json.loads($DESKTOP)    modules=json
    New Context    viewport=${viewport}    colorScheme=light
    New Page    ${BASE_URL}/
    Get Style    body    background-color    ==    rgb(43, 33, 41)

The Sun Button Switches To Light And Remembers It
    [Tags]    theme
    Open Site
    Hide Bubbles
    Click    .theme-toggle
    Get Attribute    html    data-theme    ==    light
    Get Style    body    background-color    ==    rgb(245, 236, 220)
    # Still light after a reload (saved in this browser)
    Reload
    Get Attribute    html    data-theme    ==    light
    Click    .theme-toggle
    ${theme}=    Evaluate JavaScript    ${None}    () => document.documentElement.dataset.theme ?? null
    Should Be Equal    ${theme}    ${None}

The Mailbox Has The Theme Button Too
    [Tags]    theme
    Open Site    /mailbox
    Get Element Count    .theme-toggle    ==    1
    Get Element Count    .lang-switch    ==    0

Now Line Shows What Kristine Is Up To
    [Tags]    smoke    now
    Open Site
    Text Should Contain    .now-label    now;
    Get Text    .now-stack .is-current    *=    reading
    Click    .now-items
    Get Text    .now-stack .is-current    *=    listening to
    # Screen readers get every item at once
    Get Element Count    .now-line .sr-only li    ==    5

Now Line Is In Japanese On The Japanese Page
    [Tags]    now    i18n
    Open Site    /ja
    Text Should Contain    .now-label    いま
    Text Should Contain    .now-line .sr-only    中国語の日常会話

Contact Is A Postcard You Can Copy The Email From
    [Tags]    smoke    contact
    ${viewport}=    Evaluate    json.loads($DESKTOP)    modules=json
    # Reduced motion: the card starts on its writing side (no flip to wait for).
    New Context    viewport=${viewport}    permissions=["clipboard-read", "clipboard-write"]
    ...    reducedMotion=reduce
    New Page    ${BASE_URL}/
    Hide Bubbles
    Scroll To    \#contact
    Get Element Count    .postcard svg[aria-label="Kristine"]    ==    1
    Click    .pc-copy
    Text Should Contain    .pc-hanko    copied!
    ${clip}=    Evaluate JavaScript    ${None}    () => navigator.clipboard.readText()
    Should Match Regexp    ${clip}    ^[a-z.]+@[a-z]+\\.com$
    # "show my email" reveals the same address as a mailto link
    Click    .pc-show
    Get Attribute    .pc-email a    href    ==    mailto:${clip}

The Email Is Not In The Page Until Someone Asks
    [Documentation]    Scrapers read the raw HTML; the address must not be in it.
    [Tags]    contact    privacy
    Open Site
    ${html}=    Evaluate JavaScript    ${None}    async () => (await fetch("/")).text()
    Should Not Match Regexp    ${html}    [a-z0-9.]+@[a-z0-9-]+\\.[a-z]+
    Should Not Contain    ${html}    mailto:
    ${dom}=    Evaluate JavaScript    ${None}    () => document.documentElement.outerHTML
    Should Not Contain    ${dom}    mailto:

Postcard Fits On A Phone
    [Documentation]    A long email address must wrap, not push the card wider than the screen.
    [Tags]    regression    layout    mobile    contact
    Open Site    viewport=${PHONE}    reduced_motion=reduce
    Hide Bubbles
    Scroll To    \#contact
    ${overflow}=    Evaluate JavaScript    ${None}
    ...    () => {
    ...      const card = document.querySelector(".postcard").getBoundingClientRect();
    ...      return [...document.querySelectorAll(".pc-lines li, .pc-copy")]
    ...        .filter((el) => el.getBoundingClientRect().right > card.right + 2).length;
    ...    }
    Should Be Equal As Integers    ${overflow}    0

The Postcard Arrives Picture Side Up And Turns Over
    [Tags]    contact
    Open Site
    Hide Bubbles
    ${back_inert}=    Evaluate JavaScript    .pc-back    (el) => el.inert
    Should Be True    ${back_inert}    The writing side should start face down
    Scroll To    \#contact
    Sleep    2.5s
    ${back_inert}=    Evaluate JavaScript    .pc-back    (el) => el.inert
    Should Not Be True    ${back_inert}    The card should have turned over
    Click    .pc-turn
    ${front_inert}=    Evaluate JavaScript    .pc-front    (el) => el.inert
    Should Not Be True    ${front_inert}

The Mailbox Link Is A Post Box
    [Tags]    nav
    Open Site
    Text Should Contain    .rice-blog-icon    📮
    Get Attribute    .rice-blog    aria-label    ==    mailbox
