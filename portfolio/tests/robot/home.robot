*** Settings ***
Documentation       The home page: intro, onigiri nav, Lazuli, bubbles, scrapbook, layout regressions.
Resource            resources/common.resource
Suite Setup         Start Browser
Suite Teardown      Close Browser    ALL
Test Teardown       Close Context


*** Test Cases ***
Intro Introduces Kristine
    [Tags]    smoke
    Open Site
    Text Should Contain    h1.hello    Hi, my name is Kristine
    Get Text    .hero-sub    *=    software engineer based in Yokohama
    Get Title    *=    kristineCodes;

Nav Has An Onigiri For Every Section
    [Tags]    smoke    nav
    Open Site
    Get Element Count    .rice-btn    ==    6
    Get Attribute    .rice-btn >> nth=0    data-section    ==    hi
    Get Attribute    .rice-btn >> nth=5    data-section    ==    contact
    Text Should Contain    .rice-blog    mailbox

Clicking An Onigiri Goes To Its Section
    [Tags]    nav
    Open Site
    Hide Bubbles
    Click    [data-section="offhours"]
    # Smooth scrolling takes a moment (longer on a busy machine): wait for the highlight.
    Wait For Condition    Attribute    [data-section="offhours"]    aria-current    ==    ${EMPTY}

Passed Sections Get Bitten
    [Documentation]    Scrolling past a section takes a bite out of its onigiri.
    [Tags]    nav
    Open Site
    Hide Bubbles
    Scroll To    \#about
    Get Classes    [data-section="hi"]    contains    is-bitten
    Get Classes    [data-section="contact"]    validate    "is-bitten" not in value

Lazuli Shows Three Years On The Skewer
    [Tags]    smoke    lazuli
    Open Site
    Text Should Contain    \#lazuli h2    Software Engineer
    Get Element Count    .lz-card    ==    3
    Text Should Contain    .lz-card-0    Year 1
    Text Should Contain    .lz-card-2    QA & end-to-end testing
    Text Should Contain    .lz-card-2    now

Popping A Bubble Counts It
    [Tags]    bubbles
    Open Site
    Get Text    .pop-counter    *=    0 popped
    # Bubbles drift and shy away from the cursor, so click wherever one is right now.
    ${box}=    Get BoundingBox    .soap >> nth=0
    ${x}=    Evaluate    ${box}[x] + ${box}[width] / 2
    ${y}=    Evaluate    ${box}[y] + ${box}[height] / 2
    Mouse Button    click    ${x}    ${y}
    Get Text    .pop-counter    *=    1 popped

Earlier Work And Scrapbook Are There
    [Tags]    smoke
    Open Site
    Get Element Count    .ew-card    ==    4
    Get Element Count    \#offhours .oh-item    >=    7
    Get Text    \#offhours    *=    Yamanote

Learning Note Says The Site Is Tested With Robot
    [Tags]    smoke
    Open Site
    Text Should Contain    .bt-learning    tested with Robot Framework on every change
    Get Attribute    .bt-learning a >> text=this website    href
    ...    ==    https://github.com/kristinetuazon/portfolio/tree/main/portfolio/tests/robot

No Element Grows Its Own Scrollbar On Desktop
    [Documentation]    Regression: "* { overflow-x: hidden }" gave 15 elements inner scrollbars.
    [Tags]    regression    layout
    Open Site
    Hide Bubbles
    Install Page Checks
    ${failures}=    Scroll Through Page    innerScrollbars
    Should Be Empty    ${failures}

No Element Grows Its Own Scrollbar On A Phone
    [Tags]    regression    layout    mobile
    Open Site    viewport=${PHONE}
    Hide Bubbles
    Install Page Checks
    ${failures}=    Scroll Through Page    innerScrollbars
    Should Be Empty    ${failures}

Page Never Scrolls Sideways
    [Documentation]    Slide-in animations start a full screen-width off to the side.
    [Tags]    regression    layout
    Open Site
    Install Page Checks
    ${failures}=    Scroll Through Page    sidewaysScroll
    Should Be Empty    ${failures}

Scrapbook Tape Is Not Clipped
    [Documentation]    Regression: the washi tape on the scrapbook cards was cut off at the top.
    [Tags]    regression    layout
    Open Site
    Hide Bubbles
    ${count}=    Get Element Count    \#offhours .oh-tape
    FOR    ${i}    IN RANGE    ${count}
        Scroll To    \#offhours .oh-tape >> nth=${i}
        ${visible}=    Evaluate JavaScript    \#offhours .oh-tape >> nth=${i}
        ...    (tape) => {
        ...      const r = tape.getBoundingClientRect();
        ...      // 30% down: the tape is slightly rotated, so its very top edge is uneven.
        ...      return document.elementFromPoint(r.left + r.width / 2, r.top + r.height * 0.3) === tape;
        ...    }
        Should Be True    ${visible}    Tape ${i} is clipped at its top edge
    END
