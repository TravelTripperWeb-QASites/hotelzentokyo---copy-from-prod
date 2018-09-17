/*
   Settings and other scripts
   ========================================================================== */

$(document).ready(function () {

  // Navigation Change on page Scroll
  navOnScroll();

});

//scroll navigation changes function
function navOnScroll() {
  var navigationClass = $('header');
  $(window).on('load resize scroll', function () {
    if ($(window).width() < 1024) {
      navigationClass.addClass('scroll-head');
    } else {
      if (navigationClass.offset().top > 100) {
        navigationClass.addClass('scroll-head');
      } else {
        navigationClass.removeClass('scroll-head');
      }
      if ($(window).scrollTop() > 100) {
        navigationClass.addClass('scroll-head');
      } else {
        navigationClass.removeClass('scroll-head');
      }
    }
  });
}

// Bootstrap Select trigger
$('.selectpicker').selectpicker({
  style: 'btn-transparent',
  size: 4
});
