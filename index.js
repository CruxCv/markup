var one = "#10e88a",
  two = "#7f3995",
  three = "#0d78e7",
  four = "#f88f18",
  five = "#bb6774";

$(window).on("scroll touchmove", function () {
  if ($(document).scrollTop() >= $("#one").position().top) {
    $('body').css('background', $("#one").attr("data-color"));

  };
  if ($(document).scrollTop() > $("#two").position().top) {
    $('body').css('background', $("#two").attr("data-color"))
  };
  if ($(document).scrollTop() > $("#three").position().top) {

    $('body').css('background', $("#three").attr("data-color"))
  };
  if ($(document).scrollTop() > $("#four").position().top) {

    $('body').css('background', $("#four").attr("data-color"))
  };
  if ($(document).scrollTop() >= $("#five").position().top) {
    $('body').css('background', $("#five").attr("data-color"))
  };
  if ($(document).scrollTop() >= $("#six").position().top) {
    $('body').css('background', $("#six").attr("data-color"))
  };
  if ($(document).scrollTop() >= $("#seven").position().top) {
    $('body').css('background', $("#seven").attr("data-color"))
  };
  if ($(document).scrollTop() >= $("#eight").position().top) {
    $('body').css('background', $("#eight").attr("data-color"))
  };
  if ($(document).scrollTop() >= $("#nine").position().top) {
    $('body').css('background', $("#nine").attr("data-color"))
  };
  if ($(document).scrollTop() >= $("#ten").position().top) {
    $('body').css('background', $("#ten").attr("data-color"))
  };
  if ($(document).scrollTop() >= $("#eleven").position().top) {
    $('body').css('background', $("#eleven").attr("data-color"))
  };
  if ($(document).scrollTop() >= $("#twelve").position().top) {
    $('body').css('background', $("#twelve").attr("data-color"))
  };
});
jackHarnerSig("light")