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

  // show more blog on detail page if related blog item is greater than 0
  var moreblog_container = $('.more-blogs');
  if (moreblog_container && $('.more-blogs .more-blogs-item').length > 0) {
    moreblog_container.show();
  }

  // lightgallery
  $('#lightgallery').lightGallery({
  selector: '.gallery-item',
  exThumbImage: 'data-exthumbimage',
  counter: false,
  download: false,
  fullScreen: false
  });

  // Gallery Filter Function
  $(".inner-sub-nav li a").on("click", function() {

    // Remove active class from everything
    $(".inner-sub-nav li a").each(function() {
      $(this).removeClass('active');
    });

    // Add active class to selected option
    $(this).addClass('active');

    // Assign filter variable
    var $filter = $(this).attr("data-filter");

    // If we select "All," show all
    if ($filter == 'all') {
      $(".fancybox").attr("data-fancybox-group", "gallery").not(":visible").fadeIn();
    } else {
      $(".fancybox").fadeOut(0).filter(function() {
        // set data-filter value as the data-rel value of selected
        return $(this).data("filter") == $filter;
      }).attr("data-fancybox-group", $filter).fadeIn(1000); // set data-fancybox-group and show filtered elements
    }

  });

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

// If someone clicks enter on card, it will be clicked on card header (For Accessibility)
$('.card-header').keypress(function (event) {
  if (event.keyCode == 13) {
    $(this).find("h5").click();
  }
});

// Pinterest

function pinterestShare(img, desc) {
  window.open("//www.pinterest.com/pin/create/button/" +
    "?url=" + window.location.href +
    "&media=" + img +
    "&description=" + desc, "pinIt", "toolbar=no, scrollbars=no, resizable=no, top=0, right=0");
  return false;
}

//Smooth scroll within page
$(".banner-fullscreen .primary-btn").on('click', function (e) {

  // prevent default anchor click behavior
  e.preventDefault();

  // store hash
  var hash = this.hash;

  // animate
  $('html, body').animate({
    scrollTop: $(hash).offset().top - 70
  }, 1000, function () {

    // when done, add hash to url
    // (default click behaviour)
    //window.location.hash = hash;

  });

});


//Contact Form Validations
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {

          $('.needs-validation').find('.form-control:invalid').focus();
          $('.needs-validation').find('.form-control:invalid').focus();
          $(window).scrollTop($('.needs-validation').find('.form-control:invalid').offset().top - 100);

          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

// Bootstrap Carousel Mobile Swipe Script

(function ($) {
// Mobile swipe if more than 5 pixels moved
$(".carousel").on("touchstart", function (event) {
    var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function (event) {
        var xMove = event.originalEvent.touches[0].pageX;
        if (Math.floor(xClick - xMove) > 5) {
            $(this).carousel('next');
        }
        else if (Math.floor(xClick - xMove) < -5) {
            $(this).carousel('prev');
        }
    });
    $(".carousel").on("touchend", function () {
        $(this).off("touchmove");
    });
});

// Mouse swipe when mouse is dragged to left/right
var xClick;
var mouseDown;

$(".carousel").on("mousedown", function (event) {
    xClick = event.pageX;
    mouseDown = true;
});

$(".carousel").on("mousemove", function (event) {
    if (mouseDown) {
        var xMove = event.pageX;
        if (xClick > xMove) {
            $(this).carousel('next');
        }
        else if (xClick < xMove) {
            $(this).carousel('prev');
        }
    }
});

$(".carousel").on("mouseup", function (event) {
    mouseDown = false;
});
})(jQuery);
