$(window).on('load', function () {
  $preloader = $('.preloader'),
  $loader = $preloader.find('.preloader__loader');
  $loader.fadeOut();
  $preloader.delay(350).fadeOut('slow');
  setTimeout(function() {
    $loader.remove();
    $preloader.remove();
  }, 2500);
});


$(document).ready(function() {

  $('.nav-toggle').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('open');
  });

  $('.header__logo, .header__nav, .footer__logo, .footer__nav').on('click','a', function(event){
    event.preventDefault();
    var id = $(this).attr('href'),
    top = $(id).offset().top;
    $('.header__nav').removeClass('open');
    $('.nav-toggle').removeClass('active');
    $('body,html').animate({scrollTop: top -0}, 600);
  });

  $('.d-1__tabs').tabslet({
    animation: true,
    controls: {
    prev: '.d-1__prev',
    next: '.d-1__next'
    }
  });

  $('.d-2__tabs').tabslet({
    animation: true,
    controls: {
    prev: '.d-2__prev',
    next: '.d-2__next'
    }
  });


  var mySwiper = new Swiper('.participantsSlider', {
    initialSlide: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.participantsSlider__next',
      prevEl: '.participantsSlider__prev',
    },
    pagination: {
      el: '.participantsSlider-pagination',
      clickable: true,
    },
  });

  var swiper = new Swiper('.teamSlider', {
    slidesPerView: 4,
    spaceBetween: 40,
    navigation: {
      nextEl: '.teamSlider__next',
      prevEl: '.teamSlider__prev',
    },
    pagination: {
      el: '.teamSlider__pagination',
      clickable: true,
    },

    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 1,
      }
    }
  });

  var mySwiper = new Swiper('.mediaSlider', {
    spaceBetween: 30,
     navigation: {
      nextEl: '.mediaSlider__next',
      prevEl: '.mediaSlider__prev',
    },
    pagination: {
      el: '.mediaSlider__pagination',
      clickable: true,
    },
  });

  var swiper = new Swiper('.reviewsSlider', {
    slidesPerView: 2,
    spaceBetween: 20,
     navigation: {
      nextEl: '.reviewsSlider__next',
      prevEl: '.reviewsSlider__prev',
    },
    pagination: {
      el: '.reviewsSlider__pagination',
      clickable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 1,
      },
    }
  });

  var acc = $('.accordion__title');
  var accContent = $('.accordion__content');
  $('.accordion__title.active').next().slideDown(500);
  acc.on('click', function(e) {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).next().slideUp(500);
    }
    else {
      $(this).addClass('active');
      accContent.not($(this).next()).slideUp(500);
      acc.not($(this)).removeClass('active');
      $(this).next().slideDown(500);
    }
  });

  $('#popup-call, #popup-curse').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
      $('.main-form').trigger('reset');
    }
  });

  $("#thanks").popup({
    transition: 'all 0.3s',
  });

  $('[data-fancybox]').fancybox({
    youtube : {
        controls : 1,
        showinfo : 0
    },
  });

  $('input[name=phone]').mask('+0 (000) 000-00-00');
  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
       return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
    }, "Введите Ваш телефон");


  $(".main-form").each(function(index, el) {
    $(el).addClass('main-form-' + index);

    $('.main-form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.main-form-' + index).find("input[name=name]").val(),
          phone: jQuery('.main-form-' + index).find("input[name=phone]").val(),
          subject: jQuery('.main-form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.main-form-' + index, t);
      }
    });

  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $("#popup-call, #popup-curse").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  };

});