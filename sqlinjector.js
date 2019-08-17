//Create array of payloads to be added, these should be SQL payloads
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

const TYPED_PAYLOADS = {
    "RAW_PAYOLADS": ["", "1 OR 1=1", "1\\' OR \\'1\\'=\\'1", "1\\'1", "1 EXEC XP_", "1 AND 1=1", "1\\' AND 1=(SELECT COUNT(*) FROM tablenames); --", "1 AND USER_NAME() = \\'dbo\\'", "\\\\\\'; DESC users; --"],
    "ENCODED_PAYLOADS": 2,
};

// TODO Understand how to use modules and import these vars in it
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
        menu.style = "display: block; position:absolute; top: 50%; left: 25%; width:50%;";
        Utils.hide(menu);

        document.body.appendChild(menu);

        if (Utils.isNotNull(menu) && !Utils.isVisible(menu)) Utils.show(menu);

        Ui.getButtonClose().onclick = function () {
            Utils.hide(menu);
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
    openTypedPayloadsList: function (payloadType) {
        switch (payloadType) {
            case TYPED_PAYLOADS.RAW_PAYOLADS:
                break;
            case TYPED_PAYLOADS.ENCODED_PAYLOADS:
                break;
            default:
                console.log(payloadType + " case not handled");
        }
    },
};

function hi() {
    console.log("hi");
}
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

                // TODO Select function
                /*let listReference = Ui.getPayloadTypesList();
                for (let payloadType of Object.keys(PAYLOAD_TYPES)) {
                    let listElement = document.createElement("li");
                    listReference.appendChild(listElement);

                    let button = document.createElement("button");
                    listElement.appendChild(button);
                    button.innerHTML = payloadType;
                    //button.onclick = openTypedPayloads(payloadType);
                }*/

                // show menu
                if (Utils.isNotNull(menu) && !Utils.isVisible(menu)) Utils.show(menu);
            }
        }
    }
}

//+------------+
//|***-MAIN-***|
//+------------+
main();
