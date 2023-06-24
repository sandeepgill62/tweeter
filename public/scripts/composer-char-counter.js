
$(document).ready(function() {
  // get length of maximum character
  var maxLength = $('.counter').val();

  // trigger the event handler when any key press
  $("textarea").keypress(function() {
    //get remaining value of character of text area
    var textlen = maxLength - $(this).val().length;
    //set the value
    $('.counter').text(textlen);

    //set the color of output variable accoding to value
    if ($('.counter').val() < 0) {
      // set up red
      $('.counter').css('color', '#FF0000');
    } else {
      //set up black
      $('.counter').css('color', '#000000');
    }
  });
});
