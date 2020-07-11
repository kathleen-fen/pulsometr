$(document).ready(function(){
    $('.carousel__inner').slick({
      speed: 300,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src = "./img/icons/chevron-left-solid.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src = "./img/icons/chevron-right-solid.png"></button>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            dots: true,
            arrows: false
          }
        }
      ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab__active)', function() {
      $(this)
        .addClass('catalog__tab__active').siblings().removeClass('catalog__tab__active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    $('.catalog-item__link').each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
    $('.catalog-item__back').each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });

    //Modal
    $('[data-modal="consultation"]').on('click', function(){
      $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_mini').each(function(i){
      $(this).on('click',function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });
    /* $('#consultation form').validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символов!")
        },
        phone: "Введите номер телефона",
        email: {
          required: "Пожалуйста, введите свой email",
          email: "Неравильно введен адрес"
        }
      }

    }); */
  /*   $('#order form').validate();
    $('#consultation-form').validate(); */

    function validateForm(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите свое имя",
            minlength: jQuery.validator.format("Введите {0} символов!")
          },
          phone: "Введите номер телефона",
          email: {
            required: "Пожалуйста, введите свой email",
            email: "Неравильно введен адрес"
          }
        }
  
      });
    };
    validateForm('#consultation form');
    validateForm('#order form');
    validateForm('#consultation-form');

    $('input[name=phone]').mask("+375 (99) 999-99-99");

    $('form').submit(function(e) {
      console.log($(e.target).valid());
      e.preventDefault();
      if ($(e.target).valid()) {
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function(){
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow')
          


          $('form').trigger('reset');
        });
      }
      return false;
    });
    //smooth scroll and pageup
    $(window).scroll(function(){
      if($(this).scrollTop() > 1600) {
        
        $('.pageup').fadeIn();
      } else {
        
        $('.pageup').fadeOut();
      }
    });
    $("a[href=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });
    new WOW().init();

  });