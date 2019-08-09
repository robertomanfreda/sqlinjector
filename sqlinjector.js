//alert("ADDON is executing");
document.body.style.border = "5px solid blue";

//Create array of options to be added, these should be SQL payloads
const array = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

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
    let payloads_span = document.getElementById("payloads_span");
    if (null != payloads_span) payloads_span.remove();

    // Create select list
    let payloadsList = document.createElement("select");
    payloadsList.id = "payloads_select";

    // Create and append options
    for (let i = 0; i < array.length; i++) {
        let payload = document.createElement("option");
        payload.value = array[i];
        payload.text = array[i];
        payload.id = "opt_" + i;
        payload.onclick = function () {
            element.value = this.text;
        };

        // Append options
        payloadsList.appendChild(payload);
    }


    // Append select list
    payloads_span = document.createElement("span");
    payloads_span.id = "payloads_span";
    payloads_span.innerHTML = "Inject payload";

    document.body.appendChild(payloads_span);

    payloads_span.style = getStyle();

    payloads_span.appendChild(payloadsList);

    let spanClose = document.createElement("button");
    spanClose.innerHTML = "X";
    spanClose.style = "color: red";
    spanClose.onclick = function () {
        payloads_span.remove();
    };

    payloads_span.appendChild(spanClose);
}

function getStyle() {
    return "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);";
}

//__________
main();