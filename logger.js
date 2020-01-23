var active = true;

var Logger = {
    d: function (message) {
        if (active) console.log(message);
    }
}