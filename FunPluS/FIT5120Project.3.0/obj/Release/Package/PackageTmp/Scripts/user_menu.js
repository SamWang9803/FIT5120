﻿function user_menu(obj) {
    var num = 0;
    for (var i = 0; i < obj.options.length; i++) {
            if (obj.options[i].selected == true) {
        num++;
            }
        }
    if (num == 1) {
            var url = obj.options[obj.selectedIndex].value;
        window.location.href = url
        }
    }