/*
   Settings and other scripts
   ========================================================================== */

$(document).ready(function () {

  // Navigation Change on page Scroll
  navOnScroll();


  // Restrict form submission by disabling submit button until all required fields are filled (W.r.t GDPR Guidelines)
  function checkForm() {
      // here, "this" is an input element
      var isValidForm = true;
      $(this.form)
        .find(':input[required]:visible')
        .each(function () {
          if (!this.value.trim()) {
            isValidForm = false;
          }
        });
      $(this.form)
        .find('input[type="checkbox"]:required')
        .each(function () {
          if (!$(this)
            .is(':checked')) {
            isValidForm = false;
          }
        });
      $(this.form)
        .find('select:required')
        .each(function () {
          if (!$(this)
            .find('option:selected')
            .val()
            .trim()) {
            isValidForm = false;
          }
        });
      $(this.form)
        .find('#contact-btn') // Button class names should be unique for every form
        .prop('disabled', !isValidForm);
      return isValidForm;
    }

    $(' #contact-btn') // Button class names should be unique for every form
      .closest('form')
      // indirectly bind the handler to form
      .submit(function () {
        return checkForm.apply($(this)
          .find(':input')[0]);
      })
      // look for input elements
      .find(':input[required]:visible')
      // bind the handler to input elements
      .on('change keyup', checkForm)
      // immediately fire it to initialize buttons state
      .keyup();

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
