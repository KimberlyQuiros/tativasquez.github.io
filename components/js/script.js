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

    navbarFixedTop();

}());


//match height
$(function() {
    $('.item-height').matchHeight();
});

$(document).ready(function(){
  $(window).on('load', function () {
  /* VARIABLES */
    size_div = jQuery("#projects .project-item").size();
    x = 3;
    $('#projects .project-item:lt(' + x + ')').fadeIn(); // este muestra la cant de intem de X
    $('#btn-load-more').click(function () {

        x = (x + 3 <= size_div) ? x + 3 : size_div;
        $('#projects .project-item:lt(' + x + ')').slideDown();
        if (x == size_div) {
          $('.load-more').css('display','none');
        }
    });
    if (size_div <= 3) {
      $('.load-more').css('display','none');
    }
  });
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

$(document).ready(function(){
  $('.nav-pills li').click(function(){
    var $class = $(this).attr('class');
    if ($class === 'branding') {
      $('.project-hover.branding').css('display','block');
      $('.project-hover.aquitectura').css('display','none');
      $('.project-hover.others').css('display','none');
    }else if($class === 'aquitectura'){
      $('.project-hover.aquitectura').css('display','block');
      $('.project-hover.branding').css('display','none');
      $('.project-hover.others').css('display','none');
    }else{
       $('.project-hover.others').css('display','block');
      $('.project-hover.branding').css('display','none');
      $('.project-hover.aquitectura').css('display','none');
    }
  });
});

$(document).ready(function(){
  $(window).scroll(function() {
      if ($('header').scrollTop() > 50) {
          $('#go-to-top').fadeIn();
          $('#go-to-top').css('display','block');
      } else {
          $('#go-to-top').fadeOut();
          $('#go-to-top').css('display','none');
      }
  });
  $('#go-to-top').click(function(e){
    e.preventDefault();
    var body = $("html, body");
    var target = $(e.currentTarget).attr('href');
    var offset = $(target).offset();
    //$(document).scrollTop(offset.top);
    body.animate({scrollTop: offset.top});
  });
});
