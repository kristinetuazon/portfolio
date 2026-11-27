*** Settings ***
Documentation       Projects: the section on the home page and the /projects page.
Resource            resources/common.resource
Suite Setup         Start Browser
Suite Teardown      Close Browser    ALL
Test Teardown       Close Context


*** Test Cases ***
Home Page Shows Projects, Not The Old Bootcamp Apps
    [Tags]    smoke    projects
    Open Site
    Text Should Contain    \#projects h2    projects;
    Text Should Contain    \#projects    Minimize v2
    ${old}=    Evaluate JavaScript    ${None}    () => document.body.textContent.includes("Study Hero")
    Should Not Be True    ${old}

Projects Page Lists Every Project With Its Links
    [Tags]    smoke    projects
    Open Site
    Hide Bubbles
    Scroll To    \#projects a[href="/projects"]
    Click    \#projects a[href="/projects"]
    Get Url    ==    ${BASE_URL}/projects
    Text Should Contain    h1    projects;
    Get Element Count    .pj-card    ==    3
    Get Attribute    \#minimize-v2 a    href    ==    https://minimize-v2.vercel.app/
    Text Should Contain    \#lazuli-e2e    the code is private
    Get Element Count    \#lazuli-e2e a    ==    0

Projects Page In Japanese, And The Switch Stays On It
    [Tags]    projects    i18n
    Open Site    /projects
    Hide Bubbles
    Click    .lang-switch >> text=日本語
    Get Url    ==    ${BASE_URL}/ja/projects
    Text Should Contain    h1    作品たち
    Get Attribute    html    lang    ==    ja

Projects Page Is In The Sitemap
    [Tags]    seo    projects
    Open Site
    ${xml}=    Evaluate JavaScript    ${None}    async () => (await fetch("/sitemap.xml")).text()
    Should Contain    ${xml}    <loc>https://www.kristinecodes.dev/projects</loc>
    Should Contain    ${xml}    <loc>https://www.kristinecodes.dev/ja/projects</loc>
