//Implement the character counter
let maxLength = 140;
$(document).ready(function () {
  $("form")
    .find("textarea")
    .keyup(function () {
      const numOfLetters = $(this).val().length;
      const numberCharacters = maxLength - numOfLetters;
      if (numberCharacters < 0) {
        $("output").addClass("countOver");
        $("output").text(numberCharacters);
      } else {
        $("output").removeClass("countOver");
        $("output").text(numberCharacters);
      }
    });
});