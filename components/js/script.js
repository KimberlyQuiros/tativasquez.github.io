//CODE CANVAS
/*
 * requestAnimationFrame pollyfill
 */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 1000 / 60);
    });
}

// Init Stats
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);


/*!
 * Mantis.js / jQuery / Zepto.js plugin for Constellation
 * @version 1.2.2
 * @author Acauã Montiel <contato@acauamontiel.com.br>
 * @license http://acaua.mit-license.org/
 */
(function ($, window) {
    /**
     * Makes a nice constellation on canvas
     * @constructor Constellation
     */
    function Constellation (canvas, options) {
        var $canvas = $(canvas),
            context = canvas.getContext('2d'),
            defaults = {
                star: {
                    color: '#D02A5C',
                    width: 1
                },
                line: {
                    color: '#D02A5C',
                    width: 0.2
                },
                position: {
                    x: 0, // This value will be overwritten at startup
                    y: 0 // This value will be overwritten at startup
                },
                width: window.innerWidth,
                height: window.innerHeight,
                velocity: 0.1,
                length: 100,
                distance: 120,
                radius: 150,
                stars: []
            },
            config = $.extend(true, {}, defaults, options);

        function Star () {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.vx = (config.velocity - (Math.random() * 0.5));
            this.vy = (config.velocity - (Math.random() * 0.5));

            this.radius = Math.random() * config.star.width;
        }

        Star.prototype = {
            create: function(){
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                context.fill();
            },

            animate: function(){
                var i;
                for (i = 0; i < config.length; i++) {

                    var star = config.stars[i];

                    if (star.y < 0 || star.y > canvas.height) {
                        star.vx = star.vx;
                        star.vy = - star.vy;
                    } else if (star.x < 0 || star.x > canvas.width) {
                        star.vx = - star.vx;
                        star.vy = star.vy;
                    }

                    star.x += star.vx;
                    star.y += star.vy;
                }
            },

            line: function(){
                var length = config.length,
                    iStar,
                    jStar,
                    i,
                    j;

                for (i = 0; i < length; i++) {
                    for (j = 0; j < length; j++) {
                        iStar = config.stars[i];
                        jStar = config.stars[j];

                        if (
                            (iStar.x - jStar.x) < config.distance &&
                            (iStar.y - jStar.y) < config.distance &&
                            (iStar.x - jStar.x) > - config.distance &&
                            (iStar.y - jStar.y) > - config.distance
                        ) {
                            if (
                                (iStar.x - config.position.x) < config.radius &&
                                (iStar.y - config.position.y) < config.radius &&
                                (iStar.x - config.position.x) > - config.radius &&
                                (iStar.y - config.position.y) > - config.radius
                            ) {
                                context.beginPath();
                                context.moveTo(iStar.x, iStar.y);
                                context.lineTo(jStar.x, jStar.y);
                                context.stroke();
                                context.closePath();
                            }
                        }
                    }
                }
            }
        };

        this.createStars = function () {
            var length = config.length,
                star,
                i;

            context.clearRect(0, 0, canvas.width, canvas.height);

            for (i = 0; i < length; i++) {
                config.stars.push(new Star());
                star = config.stars[i];

                star.create();
            }

            star.line();
            star.animate();
        };

        this.setCanvas = function () {
            canvas.width = config.width;
            canvas.height = config.height;
        };

        this.setContext = function () {
            context.fillStyle = config.star.color;
            context.strokeStyle = config.line.color;
            context.lineWidth = config.line.width;
        };

        this.setInitialPosition = function () {
            if (!options || !options.hasOwnProperty('position')) {
                config.position = {
                    x: canvas.width * 0.5,
                    y: canvas.height * 0.5
                };
            }
        };

        this.loop = function (callback) {
            callback();

            window.requestAnimationFrame(function () {
                stats.begin(); // Only for Stats
                this.loop(callback);
                stats.end(); // Only for Stats
            }.bind(this));
        };

        this.bind = function () {
            $canvas.on('mousemove', function(e){
                config.position.x = e.pageX - $canvas.offset().left;
                config.position.y = e.pageY - $canvas.offset().top;
            });
        };

        this.init = function () {
            this.setCanvas();
            this.setContext();
            this.setInitialPosition();
            this.loop(this.createStars);
            this.bind();
        };
    }

    $.fn.constellation = function (options) {
        return this.each(function () {
            var c = new Constellation(this, options);
            c.init();
        });
    };
})($, window);

// Init plugin
$('canvas').constellation({
    star: {
        width: 3
    },
    line: {
        color: 'rgba(255, 255, 255, .5)'
    },
    radius: 250
});

//text

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

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
