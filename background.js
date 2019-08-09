// TODO customize it
// Reference https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Add_a_button_to_the_toolbar
function openPage() {
    browser.tabs.create({
        url: "https://developer.mozilla.org"
    });
}

browser.browserAction.onClicked.addListener(openPage);