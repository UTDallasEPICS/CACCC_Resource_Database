// var h = $('#c2')[0].scrollHeight;


$('#more').click(function(e) {
    e.stopPropagation();
    $('#c2').animate({
        'height': '100px'
    })
});

$(document).click(function() {
    $('#c2').animate({
        'height': '1000px'
    })
})
