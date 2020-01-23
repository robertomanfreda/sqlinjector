/*
const IDS = {
    ID_MENU: "menu_frame",
    ID_PAYLOAD_TYPES: "payload_types",
    ID_TYPED_PAYLOADS: "typed_payloads",
    ID_BUTTON_CLOSE: "button_close",
};

const PAYLOAD_TYPES = {
    "RAW": "Raw",
    "ENCODED": "Encoded",
};

//Create array of payloads to be added, these should be SQL payloads
var TYPED_PAYLOADS = {
    "RAW": [],
    "ENCODED": ["sdsddsd", "vgvhvhj", "vvjhwdbjhd"],
};

// MySQL RAW Payloads
fetch(browser.extension.getURL("payloads/mysql.json"))
    .then(response => response.text())
    .then(text => {
        let payloads = JSON.parse(text);
        for (let i = 0; i < payloads.payloads.length; i++) TYPED_PAYLOADS.RAW.push(payloads.payloads[i].toString());
    });

// TODO Understand how to use modules and import these consts in it
const Utils = {
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
        return null !== HTMLElement;
    },
};

// TODO module
const Ui = {
    createMenu: function () {
        let menu = document.createElement("iframe");
        menu.id = IDS.ID_MENU;
        menu.src = browser.extension.getURL("menu/menu.html");
        menu.style = "display: block; position:absolute; top: 25%; left: 25%; width:50%; height:50%;";
        Utils.hide(menu);

        document.body.appendChild(menu);

        if (Utils.isNotNull(menu) && !Utils.isVisible(menu)) Utils.show(menu);

        menu.onload = function () {
            Ui.getButtonClose().onclick = function () {
                Utils.hide(Ui.getMenu());
            };


            // TODO rename div el ecc
            let listReference = Ui.getPayloadTypesList();
            for (let payloadType of Object.values(PAYLOAD_TYPES)) {
                let listElement = document.createElement("div");
                listReference.appendChild(listElement);

                let button = document.createElement("button");
                listElement.appendChild(button);
                button.innerHTML = payloadType;
                button.id = "payload_button";

                button.onclick = function () {
                    Utils.hide(Ui.getPayloadTypesList());

                    for (let typedPayload of TYPED_PAYLOADS[payloadType.toUpperCase()]) {
                        let divPayload = document.createElement("div");
                        let aPayload = document.createElement("a");
                        aPayload.className = "payload";

                        let payloadText = document.createElement("u");
                        payloadText.innerHTML = typedPayload;
                        payloadText.id = "hovered_payload";
                        aPayload.appendChild(payloadText);

                        aPayload.onclick = function () {
                            lastInputPressed.value = this.children[0].innerHTML;
                        };

                        divPayload.appendChild(aPayload);
                        Ui.getTypedPayloadsList().appendChild(divPayload);
                    }
                };
            }
        };

        return menu;
    },
    getMenu: function () {
        return document.getElementById(IDS.ID_MENU);
    },
    getButtonClose: function () {
        return this.getMenu().contentWindow.document.getElementById(IDS.ID_BUTTON_CLOSE);
    },
    getPayloadTypesList: function () {
        return this.getMenu().contentWindow.document.getElementById(IDS.ID_PAYLOAD_TYPES);
    },
    getTypedPayloadsList: function () {
        return this.getMenu().contentWindow.document.getElementById(IDS.ID_TYPED_PAYLOADS);
    },
};

var lastInputPressed;

function main() {
    let inputs = document.getElementsByTagName("INPUT");

    for (let input of inputs) {
        if ("INPUT" === input.tagName) {
            input.onclick = function () {
                // Update last input field pressed
                lastInputPressed = this;

                let menu = Ui.getMenu();

                // if menu was previously loaded, show it and return
                if (Utils.isNotNull(menu)) {
                    Utils.show(menu);
                    return;
                }

                // else create menu
                menu = Ui.createMenu();

                // show menu
                if (Utils.isNotNull(menu) && !Utils.isVisible(menu)) Utils.show(menu);
            }
        }
    }
}


 */


console.log("SQLInjector Successfully Loaded ");

var menu = null;
var lastInputPressed = null;

function main() {
    let inputs = document.getElementsByTagName('INPUT');

    for (let input of inputs) {
        input.setAttribute('data-long-press-delay', '250');
        input.addEventListener('long-press', function (e) {
            Logger.d("Input clicked");
            lastInputPressed = this;

            // Add the menu in the page for the first time
            if (null === menu) {
                menu = Menu.createMenu();
                Wizard.addHTMLElement(menu);
            }

            // On every long press in an input field show the menu
            if (Wizard.isHTMLElementHidden(menu)) {
                Wizard.showHTMLElement(menu);
            }
        });

        // On every click (outside the menu area) hide the menu if is visible
        window.addEventListener('mousedown', function (e) {
            //e.preventDefault();
            if (Wizard.isHTMLElementVisible(menu) && !menu.contains(e.target)) {
                Wizard.hideHTMLElement(menu);
            }
        });

    }

}

main();