*** Settings ***
Documentation       Japanese pages, the 404 page, and the bits search engines and link previews read.
Resource            resources/common.resource
Suite Setup         Start Browser
Suite Teardown      Close Browser    ALL
Test Teardown       Close Context


*** Test Cases ***
Japanese Home Page Is In Japanese
    [Tags]    smoke    i18n
    Open Site    /ja
    Get Attribute    html    lang    ==    ja
    Text Should Contain    h1.hello    こんにちは、クリスティンです
    Text Should Contain    \#lazuli h2    ソフトウェアエンジニア
    Text Should Contain    .lz-card-2    QA・E2Eテスト
    Text Should Contain    \#offhours-title    おやすみの日
    Text Should Contain    [data-section="offhours"] .rice-label    おやすみの日
    Text Should Contain    \#beyond-title    テストの、その先
    Text Should Contain    \#learning-title    いま勉強中
    Text Should Contain    \#about    すべては、この一行から
    Text Should Contain    \#projects h2    作品たち
    Text Should Contain    \#projects    断捨離アプリ
    Text Should Contain    .rice-blog    ポスト

Japanese Image Descriptions Are In Japanese
    [Documentation]    Screen readers read the alt text, so it is translated too.
    [Tags]    i18n    accessibility
    Open Site    /ja
    ${english}=    Evaluate JavaScript    ${None}
    ...    () => [...document.querySelectorAll("img[alt]")]
    ...      .map((img) => img.alt)
    ...      .filter((alt) => alt && !/[\u3040-\u30ff\u4e00-\u9fff]/.test(alt))
    Should Be Empty    ${english}    English alt text on the Japanese page: ${english}

English Is Still The Default
    [Tags]    smoke    i18n
    Open Site    /
    Get Attribute    html    lang    ==    en
    Text Should Contain    h1.hello    Hi, my name is Kristine

The Switch Changes Language Both Ways
    [Tags]    i18n
    Open Site    /
    Hide Bubbles
    Get Text    .lang-switch [aria-current]    ==    EN
    Click    .lang-switch >> text=日本語
    Get Url    ==    ${BASE_URL}/ja
    Text Should Contain    h1.hello    こんにちは
    Click    .lang-switch >> text=EN
    Get Url    ==    ${BASE_URL}/
    Text Should Contain    h1.hello    Hi, my name is Kristine

Japanese Mailbox Links Go To The English Letters
    [Documentation]    The letters are only written in English.
    [Tags]    i18n    redirects
    Open Site    /ja
    Get Attribute    .rice-blog    href    ==    /mailbox
    Open Site    /ja/mailbox/why-programming
    Get Url    ==    ${BASE_URL}/mailbox/why-programming

Japanese Page Has No Inner Scrollbars
    [Documentation]    Longer Japanese lines must wrap, not overflow.
    [Tags]    regression    layout    i18n    mobile
    Open Site    /ja    viewport=${PHONE}
    Hide Bubbles
    Install Page Checks
    ${failures}=    Scroll Through Page    innerScrollbars
    Should Be Empty    ${failures}
    ${failures}=    Scroll Through Page    sidewaysScroll
    Should Be Empty    ${failures}

Missing Pages Get Eaten
    [Tags]    smoke    404
    New Context
    New Page    ${BASE_URL}/this-page-does-not-exist
    Text Should Contain    h1    This page got eaten
    Get Element Count    .nf-onigiri    ==    1
    Get Attribute    a >> text=Back to the start →    href    ==    /

Missing Japanese Pages Get Eaten In Japanese
    [Tags]    404    i18n
    New Context
    New Page    ${BASE_URL}/ja/this-page-does-not-exist
    Text Should Contain    h1    このページ、食べられちゃいました

Home Page Tells Search Engines Who Kristine Is
    [Tags]    smoke    seo
    Open Site    /
    Get Title    *=    Kristine Tuazon
    Get Attribute    link[rel="canonical"]    href    ==    https://www.kristinecodes.dev/
    Get Attribute    link[hreflang="ja"]    href    ==    https://www.kristinecodes.dev/ja
    ${data}=    Evaluate JavaScript    script[type="application/ld+json"]    (el) => JSON.parse(el.textContent)
    ${person}=    Set Variable    ${data}[@graph][0]
    Should Be Equal    ${person}[@type]    Person
    Should Be Equal    ${person}[name]    Kristine Tuazon
    Should Be Equal    ${person}[jobTitle]    Software Engineer

Letters Have Link Previews And Article Data
    [Tags]    seo    letters
    Open Site    /mailbox/why-programming
    Get Attribute    meta[property="og:type"]    content    ==    article
    Get Attribute    meta[name="twitter:card"]    content    ==    summary_large_image
    Get Attribute    meta[property="og:image"]    content    *=    /api/og?kind=letter
    ${data}=    Evaluate JavaScript    script[type="application/ld+json"]    (el) => JSON.parse(el.textContent)
    Should Be Equal    ${data}[@type]    BlogPosting
    Should Be Equal    ${data}[headline]    Why programming?

Link Preview Images Are Real PNGs
    [Tags]    seo
    Open Site    /
    ${result}=    Evaluate JavaScript    ${None}
    ...    async () => {
    ...      const r = await fetch("/api/og?kind=letter&title=Why%20programming%3F");
    ...      const bytes = new Uint8Array(await r.arrayBuffer());
    ...      const img = await createImageBitmap(new Blob([bytes]));
    ...      return [r.headers.get("content-type"), img.width, img.height];
    ...    }
    Should Be Equal    ${result}[0]    image/png
    Should Be Equal As Integers    ${result}[1]    1200
    Should Be Equal As Integers    ${result}[2]    630

Sitemap And Robots Point At Each Other
    [Tags]    smoke    seo
    Open Site    /
    ${xml}=    Evaluate JavaScript    ${None}    async () => (await fetch("/sitemap.xml")).text()
    Should Contain    ${xml}    <loc>https://www.kristinecodes.dev/</loc>
    Should Contain    ${xml}    <loc>https://www.kristinecodes.dev/ja</loc>
    Should Contain    ${xml}    <loc>https://www.kristinecodes.dev/mailbox/why-programming</loc>
    Should Contain    ${xml}    hreflang="ja"
    ${robots}=    Evaluate JavaScript    ${None}    async () => (await fetch("/robots.txt")).text()
    Should Contain    ${robots}    Sitemap: https://www.kristinecodes.dev/sitemap.xml

The History Timeline Has Every Chapter In Both Languages
    [Tags]    smoke    history    i18n
    Open Site
    Get Element Count    .ht-chapter    ==    6
    Get Element Count    .ht-rail-fill    ==    1
    Get Element Count    .ht-bar    ==    4
    Text Should Contain    .ht-chapter[data-id="bootcamp"]    Code Chrysalis
    Open Site    /ja
    Get Element Count    .ht-chapter    ==    6
    Text Should Contain    .ht-chapter[data-id="lazuli"]    Lazuliへ
