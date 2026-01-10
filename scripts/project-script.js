window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
/*
// scripts.js
document.addEventListener("scroll", function() {
    const scrollTopBtn = document.querySelector("#scrollTopBtn");
    if (window.scrollY > 200) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});
*/

document.getElementById('openMenu').addEventListener('click', function() {
  

   // Use a small timeout to trigger the transition after the menu is added
   setTimeout(function() {
       document.querySelector('.menu').classList.add('open');
       //document.querySelector('.index').style.filter = 'blur(90px)';
       document.getElementById('fadeDiv').style.filter = 'blur(90px)';
   }, 10); // Delay to ensure rendering before transition

   // Add the close functionality
   document.getElementById('closeMenu').addEventListener('click', function() {
       document.querySelector('.menu').classList.remove('open');
       //document.querySelector('.index').style.filter = 'blur(0px)';
       document.getElementById('fadeDiv').style.filter = 'blur(0px)';
   });
});

    // Add the close functionality
    document.getElementById('closemenuonlick').addEventListener('click', function() {
        document.querySelector('.menu').classList.remove('open');
        document.querySelector('.index').style.filter = 'blur(0px)';
        document.getElementById('fadeDiv').style.filter = 'blur(0px)';
    });
  // Add the close functionality
  document.getElementById('closemenuonlick2').addEventListener('click', function() {
    document.querySelector('.menu').classList.remove('open');
    document.querySelector('.index').style.filter = 'blur(0px)';
    document.getElementById('fadeDiv').style.filter = 'blur(0px)';
});
 

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');

  const revealCards = () => {
      const isMobile = window.innerWidth <= 768;

      const scrollThreshold = isMobile ? 10 : 10;
      if (window.scrollY < scrollThreshold) return;

      const triggerBottom = isMobile
          ? window.innerHeight / 4 * 4
          : window.innerHeight / 4 * 4;

      cards.forEach(card => {
          const cardTop = card.getBoundingClientRect().top;

          if (cardTop < triggerBottom) {
              card.classList.add('visible');
          } else {
              card.classList.remove('visible');
          }
      });
  };

    window.addEventListener('scroll', revealCards);
    revealCards(); // Initial check
});

  const slidingText = (entries, observer2) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("slide-in-from-right", entry.isIntersecting);
    });
  };
  
  const observer2 = new IntersectionObserver(slidingText);
  const options2 = { root: null, rootMargin: '0px', threshold: 1 }; 
  
  const elements2 = document.querySelectorAll('.contentslider');
  elements2.forEach(el => {
    observer2.observe(el, options2);
  });

  $(window).on('load', addNoise);

function addNoise() {
  $('.noise-wrapper').css('opacity',1);}



  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

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
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};