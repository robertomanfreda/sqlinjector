//alert("ADDON is executing");
document.body.style.border = "5px solid blue";

var br = document.createElement("br");
var w = screen.width;
var h = screen.height;

//Create array of payloads to be added, these should be SQL payloads
const rawPayloadsDictionary = ["", "1hgvsxcwqytcvqwwucvuq1hgvsxcwqytcvqwvcvquwcuqwucvuq1hgvsxcwqytcvqwvcvquwcuqwucvuq1hgvsxcwqytcvqwvcvquwcuqwucvuq1hgvsxcwqytcvqwvcvquwcuqwucvuq1hgvsxcwqytcvqwvcvquwcuqwucvuq1hgvsxcwqytcvqwvcvquwcuqwucvuq", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

function main() {
    const inputs = document.getElementsByTagName("INPUT");
    for (let input of inputs) {
        if (input.tagName === "INPUT") {
            input.onclick = function () {
                createAndAppendPayoladsBox(this);
            }
        }
    }
}

/**
 *
 * @param element the element where inject the SQL payload
 */
function createAndAppendPayoladsBox(element) {
    let container = document.getElementById("container_1");
    if (null != container) payloadsSpan.remove();

    // Create select list
    let payloadsList = document.createElement("select");

    // Create and append options
    for (let i = 0; i < rawPayloadsDictionary.length; i++) {
        let payload = document.createElement("option");
        payload.value = rawPayloadsDictionary[i];
        payload.text = rawPayloadsDictionary[i];
        payload.onclick = function () {
            element.value = this.text;
        };

        // Append options
        payloadsList.appendChild(payload);
    }

    let textInject = document.createElement("span");
    textInject.innerHTML = "Inject payloads";
    textInject.style = "color: white; " + centerElementInADiv(50, 0);


    let buttonClose = document.createElement("button");
    buttonClose.innerHTML = "X";
    buttonClose.style = "color: red; float: right;";
    buttonClose.onclick = function () {
        container.remove();
    };

    container = document.createElement("div");
    container.style = getStyle();
    container.id = "container_1";
    container.appendChild(textInject);

    container.appendChild(buttonClose);

    container.appendChild(br);

    let rawPayloadsText = document.createElement("div");
    rawPayloadsText.innerHTML = "RAW PAYLOADS";
    rawPayloadsText.style = centerElementInADiv(50, 0) + "margin-top: 20px;";
    rawPayloadsText.style.color = "red";
    container.appendChild(rawPayloadsText);


    payloadsList.style = "width: inherit";
    container.appendChild(payloadsList);

    document.body.appendChild(container);


}

function centerElementInADiv(horizontalPercentage, verticalPercentage) {
    return "position: relative; float: left; left: 50%; transform: translate(-" + horizontalPercentage + "%, " + verticalPercentage + "%);"
}

function getStyle() {
    return "padding: 30px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.8); width: -moz-available;";
}

//__________
main();
