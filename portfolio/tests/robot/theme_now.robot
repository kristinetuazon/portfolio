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
    New Context    viewport=${viewport}    permissions=["clipboard-read", "clipboard-write"]
    New Page    ${BASE_URL}/
    Hide Bubbles
    Scroll To    \#contact
    Get Element Count    .postcard svg[aria-label="Kristine"]    ==    1
    Get Attribute    .pc-email a    href    ==    mailto:kristine.jane.tuazon@gmail.com
    Click    .pc-copy
    Get Text    .pc-hanko    ==    copied!
    ${clip}=    Evaluate JavaScript    ${None}    () => navigator.clipboard.readText()
    Should Be Equal    ${clip}    kristine.jane.tuazon@gmail.com

Postcard Fits On A Phone
    [Documentation]    A long email address must wrap, not push the card wider than the screen.
    [Tags]    regression    layout    mobile    contact
    Open Site    viewport=${PHONE}
    Hide Bubbles
    Scroll To    \#contact
    ${overflow}=    Evaluate JavaScript    ${None}
    ...    () => {
    ...      const card = document.querySelector(".postcard").getBoundingClientRect();
    ...      return [...document.querySelectorAll(".pc-lines li, .pc-copy")]
    ...        .filter((el) => el.getBoundingClientRect().right > card.right + 2).length;
    ...    }
    Should Be Equal As Integers    ${overflow}    0

The Mailbox Link Is A Post Box
    [Tags]    nav
    Open Site
    Text Should Contain    .rice-blog-icon    📮
    Get Attribute    .rice-blog    aria-label    ==    mailbox
