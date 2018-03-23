$(function () {
    $('#btn-sidebar-toggle').click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});   

// Uses regular expression to only accept numerical input
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key)) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}