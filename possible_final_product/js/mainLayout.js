var state = "minimized";
//Check if navbar is expanded or minimized and handle
onload=$('#navbar-toggle').click(function() {
    if (state == "expanded") {
        $('.sidebar').css('margin-left', '-230px');
        state = "minimized";
    } else {
        if (state == "minimized") {
            $('.sidebar').css('margin-left', '-20px');
            $('.li a').css('color', 'black');
            state = "expanded";
        }
    }
})