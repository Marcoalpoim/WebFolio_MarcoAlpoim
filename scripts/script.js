

window.addEventListener("load", () => {

  const main_navBar = document.getElementById("main_navBar");
  main_navBar.classList.add("main_navBar");
  
  setTimeout(function () {
        document.getElementById("main_navBar").classList.add("visible");
      }, 100);
  
  
  const preloader = document.getElementById("preloader");
  const DELAY_BEFORE_EXIT = 5000;
  const EXIT_DURATION = 1700;
  const SCRIPT_OFFSET = 5000;  
  const hasPlayed = sessionStorage.getItem("introPlayed");

 
  if (hasPlayed) {
    if (preloader) preloader.remove();
 
    if (typeof startIntro === "function") {
      startIntro();
    }

    return;
  }

 
  sessionStorage.setItem("introPlayed", "true");

  preloader.style.transform = "translateY(0)";
  preloader.style.transition =
    `transform ${EXIT_DURATION}ms cubic-bezier(0.19, 1, 0.22, 1)`;

 
  preloader.offsetHeight;

 
  setTimeout(() => {
    preloader.style.transform = "translateY(-100vh)";
    preloader.style.pointerEvents = "none";

  
    setTimeout(() => {
      if (typeof startIntro === "function") {
        startIntro();
      }
    }, EXIT_DURATION - SCRIPT_OFFSET);

   
    setTimeout(() => {
      preloader.remove();
    }, EXIT_DURATION);

  }, DELAY_BEFORE_EXIT);
});

let resizeTimeout;


const header = document.querySelector("header");
const sticky = header.offsetTop;
let hasScrolled = false;


 window.addEventListener("scroll", function () {
   if (!hasScrolled) {
     const divToRemove = document.getElementById("onscrollremove");
     if (divToRemove) {
       divToRemove.remove();
     }
     hasScrolled = true;
   }

   if (window.pageYOffset > sticky) {
     header.classList.add("sticky");
   } else {
     header.classList.remove("sticky");
   }



 });

 

const GLYPHS = "ABCDEFGHIJRSTUVXYZ";

function startIntro() {
  const rows = document.querySelectorAll(".row-intro");
  const banners = document.querySelectorAll(".banner-box");

  /* ------------------------------------
     Build scrambled letters
  ------------------------------------ */
  document.querySelectorAll(".word-wrapper").forEach(wrapper => {
    const finalWord = wrapper.dataset.final;
    wrapper.innerHTML = "";

    [...finalWord].forEach(letter => {
      const span = document.createElement("span");
      span.className = "character";
      span.dataset.final = letter;
      span.textContent =
        GLYPHS[(Math.random() * GLYPHS.length) | 0];
      wrapper.appendChild(span);
    });
  });

  /* ------------------------------------
     Animate rows
  ------------------------------------ */
rows.forEach((row, rowIndex) => {
  const letters = row.querySelectorAll(".character");

  const tl = gsap.timeline({
    delay: rowIndex * 0.3
  });

  /* LIQUID FALL */
  tl.fromTo(
    letters,
    { y: "-1.2em", opacity: 1 },
    {
      y: "0em",
      duration: 1,
      ease: "cubic-bezier(0.86, 0.2, 0.11, 1.19)",
      stagger: 0.065
    }
  );

  /* SMOOTH LETTER RESOLVE (NO GLITCH) */
letters.forEach((letter, i) => {
  const total = letters.length - 1;
  const t = i / total;

  // start AFTER fall finishes
  const resolveTime =
    0 + gsap.parseEase("power3.out")(t) * 1.4;

  tl.call(() => {
    letter.textContent = letter.dataset.final;
  }, null, resolveTime);
});

});

  /* ------------------------------------
     Banner curtain animation
  ------------------------------------ */
  banners.forEach((box, i) => {
    setTimeout(() => {
      box.style.animation = "none";
      box.offsetHeight; // force reflow
      box.style.animation =
        "4s curtain cubic-bezier(1, 0.06, 0.49, 1) forwards";
    }, 200);
  });
}



document.querySelectorAll("a.card").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        let href = this.href;
        let div = document.getElementById("container");
        let opacity = 1;

        let fadeOut = setInterval(() => {
          if (opacity <= 0) {
            clearInterval(fadeOut);
            div.style.display = "none";
          } else {
            opacity -= 0.05;
            div.style.opacity = opacity;
          }
        }, 30);

        setTimeout(() => {
          document.body.classList.add("fade-out");
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        }, 30);
      });
    });





$(function () {
   

  const $menu = $(".menu");
  const $index = $(".index");
  const $fade = $("#main_navBar");

  function openMenu() {
    $menu.addClass("open");
    $index.css("filter", "blur(90px)");
    $fade.css("filter", "blur(90px)");
  }

  function closeMenu() {
    $menu.removeClass("open");
    $index.css("filter", "blur(0)");
    $fade.css("filter", "blur(0)");
  }

  $("#openMenu").on("click", function () {
    setTimeout(openMenu, 10);
  });

  $("#closeMenu, #closemenuonlick, #closemenuonlick2").on("click", closeMenu);

  //reveal cards on scroll

  const $cards = $(".card");

  function revealCards() {
    if ($(window).scrollTop() < 10) return;

    const triggerBottom = $(window).height();

    $cards.each(function () {
      const cardTop = this.getBoundingClientRect().top;

      $(this).toggleClass("visible", cardTop < triggerBottom);
    });
  }

  $(window).on("scroll", revealCards);
  revealCards();

  //sliding text

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-in-from-right");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  document.querySelectorAll(".contentslider").forEach((el) => {
    observer.observe(el);
  });

  //btn go to top

  const $btn = $("#myBtn-gotop");

  $(window).on("scroll", function () {
    $btn.toggle($(this).scrollTop() > 20);
  });

  $btn.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  function TxtType(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = period || 2000;
    this.txt = "";
    this.isDeleting = false;
    this.tick();
  }

  TxtType.prototype.tick = function () {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1)
      : fullTxt.substring(0, this.txt.length + 1);

    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

    let delta = 200 - Math.random() * 100;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  };

  $(".typewrite").each(function () {
    const toRotate = $(this).data("type");
    const period = $(this).data("period");

    if (toRotate) {
      new TxtType(this, toRotate, period);
    }
  });

  $("<style>")
    .text(".typewrite > .wrap { border-right: 0.08em solid #fff }")
    .appendTo("body");
});

// Stacked Cards
(function () {
  bind = function (fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  this.stackedCards = (function () {
    stackedCards.prototype.defaults = {
      layout: "slide", // slide, fanOut
      onClick: undefined, // onclick event provided
      transformOrigin: "center", // css transformOrigin
    };

    function stackedCards(options) {
      if (options == null) {
        options = {};
      }

      this.draw = bind(this.draw, this);
      this.config = this.extend(options, this.defaults);
    }

    stackedCards.prototype.init = function () {
      this.element = window.document.documentElement;
      if ((ref = document.readyState) === "interactive" || ref === "complete") {
        this.draw();
      } else {
        document.addEventListener("DOMContentLoaded", this.draw);
      }
    };

    stackedCards.prototype.draw = function () {
      var me = this;

      var selector = this.config.selector;

      this.els = document.querySelectorAll(selector + " li");
      var els = this.els;

      this.parent = els[0].parentNode;

      var getItemHeight = els[0].getBoundingClientRect().height;

      /*var liWidth = 0;
          for(var q = 0;q<els.length; q++) {
              liWidth = liWidth + els[q].getBoundingClientRect().width;
          }*/

      els[0].parentNode.style.height = parseInt(getItemHeight) + "px";

      // to get the active element's position, we will have to know if elements are in even/odd count
      var lenAdjust = els.length % 2 == 0 ? -2 : -1;

      // oneHalf if the centerPoint - things go left and right from here
      var oneHalf = (els.length + lenAdjust) / 2;

      var activeTransform = "translate(" + -50 + "%, 0%)  scale(1)";

      this.detectSwipe();

      Array.prototype.forEach.call(els, function (el) {
        el.style.transformOrigin = me.config.transformOrigin;

        el.addEventListener("click", function () {
          var clickedEl = el;
          var nextCnt = 0;
          var prevCnt = 0;

          do {
            // While there is a next sibling, loop
            var next = clickedEl.nextElementSibling;
            nextCnt = nextCnt + 1;
          } while ((clickedEl = clickedEl.nextElementSibling));

          // re-initialize the clickedEl to do the same for prev elements
          clickedEl = el;

          do {
            // While there is a prev sibling, loop
            var prev = clickedEl.previousElementSibling;
            prevCnt = prevCnt + 1;
          } while ((clickedEl = clickedEl.previousElementSibling));

          me.reCalculateTransformsOnClick(nextCnt - 1, prevCnt - 1);

          me.loopNodeList(els, function (el) {
            el.classList.remove("active");
          });

          el.classList.add("active");
          el.classList.add(me.config.layout);

          el.style.zIndex = els.length * 5;
          el.style.transform = activeTransform;

          if (me.config.onClick !== undefined) {
            me.config.onClick(el);
          }
        });
      });

      els[oneHalf].click();
    };

    stackedCards.prototype.reCalculateTransformsOnClick = function (
      nextCnt,
      prevCnt
    ) {
      var z = 10;

      var els = this.nodelistToArray(this.els);

      var scale = 1,
        translateX = 0,
        rotateVal = 0,
        rotate = "";
      var rotateNegStart = 0; // ((75 / els.length) * (oneHalf))*-1;

      var transformArr = [];
      var zIndexArr = [];
      var relArr = [];

      var layout = this.config.layout;

      var maxCntDivisor = Math.max(prevCnt, nextCnt);
      var prevDivisor = 100 / maxCntDivisor;
      var nextDivisor = 100 / maxCntDivisor;

      if (prevCnt > nextCnt) {
        scale = 0 + 100 / (prevCnt + 1) / 100;
      } else {
        scale = 1 - prevCnt * (1 / (nextCnt + 1));
      }

      var rotatePrevStart = ((prevCnt * 10) / prevCnt) * prevCnt * -1;
      var rotateNextStart = (nextCnt * 10) / nextCnt;

      for (var i = 0; i < prevCnt; i++) {
        switch (layout) {
          case "slide":
            if (i > 0) {
              scale = scale + 100 / (maxCntDivisor + 1) / 100;
            }

            translateX = -50 - prevDivisor * (prevCnt - i);

            rotate = "rotate(0deg)";
            break;
          case "fanOut":
            rotateVal = rotatePrevStart;

            if (i > 0) {
              scale = scale + 100 / (maxCntDivisor + 1) / 100;
            }
            translateX = -50 - prevDivisor * (prevCnt - i);
            rotate = "rotate(" + rotateVal + "deg)";

            rotatePrevStart = rotatePrevStart + (prevCnt * 10) / prevCnt;

            break;
          default:
            translateX = (150 - prevDivisor * 2 * i) * -1;
            rotate = "rotate(0deg)";
        }

        var styleStr =
          "translate(" + translateX + "%, 0%)  scale(" + scale + ") " + rotate;

        z = z + 1;

        els[i].style.transform = styleStr;
        els[i].style.zIndex = z;
      }

      // we are going for active element, so make it higher
      z = z - 1;

      var j = 0;

      rotateNegStart = 0;
      scale = 1;
      for (var i = prevCnt + 1; i < nextCnt + prevCnt + 1; i++) {
        j = j + 1;
        switch (layout) {
          case "slide":
            scale = scale - 100 / (maxCntDivisor + 1) / 100;
            translateX = (50 - nextDivisor * j) * -1;
            rotate = "rotate(0deg)";
            break;
          case "fanOut":
            rotateVal = rotateNextStart;

            scale = scale - 100 / (maxCntDivisor + 1) / 100;
            translateX = (50 - nextDivisor * j) * -1;
            rotate = "rotate(" + rotateVal + "deg)";

            rotateNextStart = rotateNextStart + (nextCnt * 10) / nextCnt;
            break;
          default:
            translateX = (50 - prevDivisor * 2 * i) * -1;
            rotate = "rotate(0deg)";
        }

        z = z - 1;

        var styleStr =
          "translate(" + translateX + "%, 0%)  scale(" + scale + ") " + rotate;

        els[i].style.transform = styleStr;
        els[i].style.zIndex = z;
      }
    };

    stackedCards.prototype.detectSwipe = function () {
      var me = this;
      var regionEl = document.querySelector(me.config.selector);

      me.detectSwipeDir(regionEl, function (swipedir) {
        var activeEl = document.querySelector(
          me.config.selector + " li.active"
        );
        if (swipedir == "left") {
          activeEl.nextElementSibling.click();
        } else if (swipedir == "right") {
          activeEl.previousElementSibling.click();
        }
      });
    };

    stackedCards.prototype.extend = function (custom, defaults) {
      var key, value;
      for (key in defaults) {
        value = defaults[key];
        if (custom[key] == null) {
          custom[key] = value;
        }
      }
      return custom;
    };

    stackedCards.prototype.nodelistToArray = function (nodelist) {
      var results = [];
      var i, element;
      for (i = 0; i < nodelist.length; i++) {
        element = nodelist[i];
        results.push(element);
      }
      return results;
    };

    stackedCards.prototype.loopNodeList = function (els, callback, scope) {
      for (var i = 0; i < els.length; i++) {
        callback.call(scope, els[i]);
      }
    };

    stackedCards.prototype.scrolledIn = function (el, offset) {
      if (typeof el == "undefined") return;

      var elemTop = el.getBoundingClientRect().top;
      var elemBottom = el.getBoundingClientRect().bottom;

      var scrolledInEl = elemTop >= 0 && elemTop <= window.innerHeight;
      return scrolledInEl;
    };

    stackedCards.prototype.detectSwipeDir = function (el, callback) {
      //credits: http://www.javascriptkit.com/javatutors/touchevents2.shtml

      var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 75, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) {};

      touchsurface.addEventListener(
        "touchstart",
        function (e) {
          var touchobj = e.changedTouches[0];
          swipedir = "none";
          dist = 0;
          startX = touchobj.pageX;
          startY = touchobj.pageY;
          startTime = new Date().getTime(); // record time when finger first makes contact with surface
          e.preventDefault();
        },
        false
      );

      touchsurface.addEventListener(
        "touchmove",
        function (e) {
          // e.preventDefault() // prevent scrolling when inside DIV
        },
        false
      );

      touchsurface.addEventListener(
        "touchend",
        function (e) {
          var touchobj = e.changedTouches[0];
          distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
          distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
          elapsedTime = new Date().getTime() - startTime; // get time elapsed
          if (elapsedTime <= allowedTime) {
            // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
              // 2nd condition for horizontal swipe met
              swipedir = distX < 0 ? "left" : "right"; // if dist traveled is negative, it indicates left swipe
            } else if (
              Math.abs(distY) >= threshold &&
              Math.abs(distX) <= restraint
            ) {
              // 2nd condition for vertical swipe met
              swipedir = distY < 0 ? "up" : "down"; // if dist traveled is negative, it indicates up swipe
            }
          }
          handleswipe(swipedir);
          e.preventDefault();
        },
        false
      );
    };

    return stackedCards;
  })();
}).call(this);
const stackedCard = new stackedCards({
  selector: ".featured",
  layout: "fanOut",
  transformOrigin: "bottom",
});

stackedCard.init();
