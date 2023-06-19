
$(document).ready(function() {
  // get length of maximum character
  var maxLength = $('output').val();

  // trigger the event handler when any key press
  $("textarea").keypress(function() {
    //get remaining value of character of text area
    var textlen = maxLength - $(this).val().length;
    //set the value
    $('output').text(textlen);

    //set the color of output variable accoding to value
    if ($('output').val() < 0) {
      // set up red
      $('output').css('color', '#FF0000');
    } else {
      //set up black
      $('output').css('color', '#000000');
    }
  });
});
