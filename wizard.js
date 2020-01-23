const Wizard = {
    addHTMLElement: function (htmlElement) {
        document.body.appendChild(htmlElement);
    },
    removeHTMLElement: function (htmlElement) {
        document.body.removeChild(htmlElement);
    },
    showHTMLElement: function (htmlElement) {
        htmlElement.style.visibility = 'visible';
    },
    hideHTMLElement: function (htmlElement) {
        htmlElement.style.visibility = 'hidden';
    },
    isHTMLElementVisible: function (htmlElement) {
        return htmlElement.style.visibility === 'visible';
    },
    isHTMLElementHidden: function (htmlElement) {
        return htmlElement.style.visibility === 'hidden';
    },
};