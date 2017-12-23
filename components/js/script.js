//nav
(function () {
    var navbarFixed = document.querySelector('#top-header'),
        navbarCenter = document.querySelector('.navbar-js'),
        captionContainer = document.querySelectorAll('header'),
        scrollTop,
        targetOffsetTop = navbarFixed.offsetTop;

    /* Fixed navbar */
    function navbarFixedTop() {
        window.addEventListener('scroll', function() {
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop >= targetOffsetTop) {
                navbarFixed.classList.add('fixed');
                navbarCenter.classList.add('center-block');
            } else {
                navbarFixed.classList.remove('fixed');
                navbarCenter.classList.remove('center-block');
            }
        }, false );
    }

    /* active parallax: min-width > 1000px */
    enquire.register("screen and (min-width: 1000px)", {
        match : function() {
            $.stellar({
               horizontalScrolling: false,
               responsive: true
            });
            //console.log("match");
        },
        unmatch : function() {
            $.stellar("destroy");
            //console.log("unmatch");
        }
    });

    navbarFixedTop();

}());


//match height
$(function() {
    $('.item-height').matchHeight();
});

(function () {

    /* Match Elements */
    $(window).on('load resize ready', function () {
        var _ww = window.innerWidth;

        // Match captions de galeria de fotos comun
        MatchMe('.GalleyWithCaptions', '.figure .caption', 600);

        // Match colText en Agenda
        MatchMe('.skills', '.item-height', 319);

        // Match <p> dentro del card-block en Learning Center
        MatchMe('.learningItems', '.card-block p', 768);


        // Match coltext dentro del card, contiguo al logo en Learning Center
       // MatchMe('.learningItems', '.card', 768);
        if ($('.learningItems').length > 0) {
            _ww > 768 ? $('.card .row .colText').matchHeight({byRow: true}) : $('.card .row .colText').matchHeight({remove: false});
        }
    });

    /* function Match Height
     * Autor: Francisco Chanto  - francisco@baum.digital
     * Requiere variable: var ww = window.innerWidth;
     * _c = condicion => si el selector existe
     * _s = selector  => al que se le aplica el plugin
     * _q = media query => media query donde termina */
    function MatchMe(_c, _s, _q) {
        var ww = window.innerWidth;
        if ($(_c).length > 0) {
            ww > _q ? $(_s).matchHeight({byRow: true}) : $(_s).matchHeight({remove: true});
        }
    }

})();




$(window).on('load', function () {
  /* VARIABLES */
    size_div = jQuery("#projects .item-load-more").size();
    x = 6;
    $('#projects .item-load-more:lt(' + x + ')').fadeIn(); // este muestra la cant de intem de X
    $('#btn-load-more').click(function () {

        x = (x + 3 <= size_div) ? x + 3 : size_div;
        $('#projects .item-load-more:lt(' + x + ')').slideDown();
        if (x == size_div) {
          $('.load-more').css('display','none');
        }
    });
    if (size_div <= 6) {
      $('.load-more').css('display','none');
    }
});


$.fn.extend({

  // Define the threeBarToggle function by extending the jQuery object
  threeBarToggle: function(options){

    // Set the default options
    var defaults = {
      color: 'black',
      width: 30,
      height: 25,
      speed: 400,
      animate: true
    }
    var options = $.extend(defaults, options);

    return this.each(function(){

      $(this).empty().css({'width': options.width, 'height': options.height, 'background': 'transparent'});
      $(this).addClass('tb-menu-toggle');
      $(this).prepend('<i></i><i></i><i></i>').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('tb-active-toggle');
        if (options.animate) { $(this).toggleClass('tb-animate-toggle'); }
        $('.tb-mobile-menu').slideToggle(options.speed);
      });
      $(this).children().css('background', options.color);
    });
  },

  // Define the accordionMenu() function that adds the sliding functionality
  accordionMenu: function(options){

    // Set the default options
    var defaults = {
      speed: 400
    }
    var options =  $.extend(defaults, options);

    return this.each(function(){

      $(this).addClass('tb-mobile-menu');
      var menuItems = $(this).children('li');
      menuItems.find('.sub-menu').parent().addClass('tb-parent');
      $('.tb-parent ul').hide();
      $('.tb-parent > a').on('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        $(this).siblings().slideToggle(options.speed);
      });

    });
  }
});

// Convert any element into a three bar toggle
// Optional arguments are 'speed' (number in ms, 'slow' or 'fast') and 'animation' (true or false) to disable the animation on the toggle
$('#menu-toggle').threeBarToggle({color: '#fff', width: 40, height: 30});

// Make any nested ul-based menu mobile
// Optional arguments are 'speed' and 'accordion' (true or false) to disable the behavior of closing other sub
$('.menu').accordionMenu();

$(document).ready(function(){
 $('.page-scroll').click(function(){
  $('.tb-menu-toggle').removeClass('tb-animate-toggle tb-active-toggle');
  $('.menu').css('display','none');
 });
});

$(document).ready(function(){
  // alert('vfvfv');
  $(".lazy").lazyload({
    effect : "fadeIn"
  });
});
