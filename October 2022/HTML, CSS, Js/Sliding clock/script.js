$(document).ready(function() {
  var i = 0;
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  $(".time").append(
    "<ul class='numbers hoursFirst'></ul>,<ul class='numbers  hoursLast'></ul>,<ul class='numbers minutesFirst'></ul>,<ul class='numbers minutesLast'></ul>,<ul class='numbers secondsFirst'></ul>,<ul class='numbers secondsLast'></ul>"
  );
  arr.forEach(function(currentElement, index) {
    $(".numbers").append("<li>" + currentElement + "</li>");
  });

  var getFirstDigit = function(number) {
    return parseInt(number / 10);
  };
  var getLastDigit = function(number) {
    return number % 10;
  };

  var move = function() {
    var myDate = new Date();
    var seconds = myDate.getSeconds();
    var minutes = myDate.getMinutes();
    var hours = myDate.getHours();

    var animateFirstDigit = function(className, property) {
      $(className).animate({}, function() {
        $(this).css("top", -getFirstDigit(property) * 50);
      });
    };

    var animateSecondDigit = function(className, property) {
      $(className).animate({}, function() {
        $(this).css("top", -getLastDigit(property) * 50);
      });
    };
    animateFirstDigit(".hoursFirst", hours);
    animateSecondDigit(".hoursLast", hours);
    animateFirstDigit(".minutesFirst", minutes);
    animateSecondDigit(".minutesLast", minutes);
    animateFirstDigit(".secondsFirst", seconds);
    animateSecondDigit(".secondsLast", seconds);
  };

  setInterval(move, 1000);
});