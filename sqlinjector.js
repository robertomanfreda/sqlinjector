//alert("ADDON is executing");
document.body.style.border = "5px solid blue";

//Create array of options to be added
var array = ["", "1","2","3","4", "5", "6", "7", "8", "9", "10"];

function createAndAppendSelectList(element) {
    var span = document.getElementById("payloads_span");
    if (null != span) {
        span.remove();
    }

    // Create select list
    var selectList = document.createElement("select");
    selectList.id = "payloads_select";

    // Create and append options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        option.id = "opt_" + i;
        option.onclick = function() {
            element.value = this.text;
        }

        // Append options
        selectList.appendChild(option);
    }    


    // Append select list
    span = document.createElement("span");
    span.id = "payloads_span";
    span.innerHTML = "Inject payload";

    document.body.appendChild(span);

    span.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);";

    span.appendChild(selectList);

    var span_close = document.createElement("button");
    span_close.innerHTML = "X";
    span_close.style = "color: red";
    span_close.onclick = function() {
        span.remove(); 
    }
    
    span.appendChild(span_close);
}

var elements = document.getElementsByTagName("INPUT");
for(var el of elements) {
	if (el.tagName == "INPUT") {
		el.onclick = function() {
			createAndAppendSelectList(this);
        }
    }
}