var Menu = {
    createMenu: function () {
        Logger.d("Creating menu");
        let menu = document.createElement('div');
        menu.id = 'SQLI_MENU';
        menu.style.zIndex = '1000';
        menu.style.visibility = 'hidden';
        menu.style.display = 'block';
        menu.style.position = 'absolute';
        menu.style.top = '20%';
        menu.style.left = '20%';
        menu.style.width = '60%';
        menu.style.height = '60%';
        menu.style.backgroundColor = 'black';
        menu.style.opacity = "80%";
        menu.style.borderRadius = '20px';
        menu.style.boxShadow = '0 0 100px black';
        Logger.d("Returning menu");
        return menu;
    },
};

