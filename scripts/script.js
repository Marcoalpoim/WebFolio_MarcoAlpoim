// script.js — vanilla JS (jQuery removed)

window.addEventListener("load", () => {

  const main_navBar = document.getElementById("main_navBar");
  main_navBar.classList.add("main_navBar");

  setTimeout(() => {
    document.getElementById("main_navBar").classList.add("visible");
  }, 100);

  const preloader = document.getElementById("preloader");
  const DELAY_BEFORE_EXIT = 5000;
  const EXIT_DURATION = 1700;
  const SCRIPT_OFFSET = 5000;
  const hasPlayed = sessionStorage.getItem("introPlayed");

  if (hasPlayed) {
    if (preloader) preloader.remove();
    if (typeof startIntro === "function") startIntro();
    return;
  }

  sessionStorage.setItem("introPlayed", "true");

  preloader.style.transform = "translateY(0)";
  preloader.style.transition = `transform ${EXIT_DURATION}ms cubic-bezier(0.19, 1, 0.22, 1)`;

  preloader.offsetHeight; // force reflow

  setTimeout(() => {
    preloader.style.transform = "translateY(-100vh)";
    preloader.style.pointerEvents = "none";

    setTimeout(() => {
      if (typeof startIntro === "function") startIntro();
    }, EXIT_DURATION - SCRIPT_OFFSET);

    setTimeout(() => {
      preloader.remove();
    }, EXIT_DURATION);

  }, DELAY_BEFORE_EXIT);
});


// ── Sticky header + scroll-remove chevron ──────────────────────────────────
const header = document.querySelector("header");
const sticky = header.offsetTop;
let hasScrolled = false;

window.addEventListener("scroll", () => {
  if (!hasScrolled) {
    const divToRemove = document.getElementById("onscrollremove");
    if (divToRemove) divToRemove.remove();
    hasScrolled = true;
  }

  header.classList.toggle("sticky", window.pageYOffset > sticky);
});


// ── Scramble intro animation ───────────────────────────────────────────────
const GLYPHS = "ABCDEFGHIJRSTUVXYZ";

function startIntro() {
  const rows = document.querySelectorAll(".row-intro");
  const banners = document.querySelectorAll(".banner-box");

  // Build scrambled letters
  document.querySelectorAll(".word-wrapper").forEach(wrapper => {
    const finalWord = wrapper.dataset.final;
    wrapper.innerHTML = "";

    [...finalWord].forEach(letter => {
      const span = document.createElement("span");
      span.className = "character";
      span.dataset.final = letter;
      span.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      wrapper.appendChild(span);
    });
  });

  // Animate rows
  rows.forEach((row, rowIndex) => {
    const letters = row.querySelectorAll(".character");

    const tl = gsap.timeline({ delay: rowIndex * 0.3 });

    tl.fromTo(
      letters,
      { y: "-1.2em", opacity: 1 },
      {
        y: "0em",
        duration: 1,
        ease: "cubic-bezier(0.86, 0.2, 0.11, 1.19)",
        stagger: 0.065,
      }
    );

    letters.forEach((letter, i) => {
      const total = letters.length - 1;
      const t = i / total;
      const resolveTime = gsap.parseEase("power3.out")(t) * 1.4;

      tl.call(() => {
        letter.textContent = letter.dataset.final;
      }, null, resolveTime);
    });
  });

  // Banner curtain animation
  banners.forEach(box => {
    box.style.animation = "none";
    box.offsetHeight; // force reflow
    box.style.animation = "4s curtain cubic-bezier(1, 0.06, 0.49, 1) forwards";
  });
}


// ── Menu open/close ────────────────────────────────────────────────────────
(function () {
  const menu    = document.querySelector(".menu");
  const index   = document.querySelector(".index");
  const navBar  = document.getElementById("main_navBar");
  const openBtn = document.getElementById("openMenu");

  if (!menu || !openBtn) return;

  function openMenu() {
    menu.classList.add("open");
    if (index)  index.style.filter  = "blur(90px)";
    if (navBar) navBar.style.filter = "blur(90px)";

    // accessibility
    openBtn.setAttribute("aria-expanded", "true");
    const menuContainer = document.getElementById("menuContainer");
    if (menuContainer) menuContainer.removeAttribute("hidden");
  }

  function closeMenu() {
    menu.classList.remove("open");
    if (index)  index.style.filter  = "blur(0)";
    if (navBar) navBar.style.filter = "blur(0)";

    openBtn.setAttribute("aria-expanded", "false");
    const menuContainer = document.getElementById("menuContainer");
    if (menuContainer) menuContainer.setAttribute("hidden", "");
  }

  openBtn.addEventListener("click", () => setTimeout(openMenu, 10));

  ["closeMenu", "closemenuonlick", "closemenuonlick2"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", closeMenu);
  });

  // Close on Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
  });
})();


// ── Reveal cards on scroll ─────────────────────────────────────────────────
(function () {
  const cards = document.querySelectorAll(".card");
  if (!cards.length) return;

  function revealCards() {
    if (window.scrollY < 10) return;
    const triggerBottom = window.innerHeight;

    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      card.classList.toggle("visible", cardTop < triggerBottom);
    });
  }

  window.addEventListener("scroll", revealCards, { passive: true });
  revealCards();
})();


// ── Slide-in observer for .contentslider ──────────────────────────────────
(function () {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-in-from-right");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -80px 0px" }
  );

  document.querySelectorAll(".contentslider").forEach(el => observer.observe(el));
})();


// ── Go-to-top button ───────────────────────────────────────────────────────
(function () {
  const btn = document.getElementById("myBtn-gotop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 20 ? "block" : "none";
  }, { passive: true });

  btn.addEventListener("click", () => {
    // Smooth scroll to top — works without jQuery
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();


// ── Typewriter effect ──────────────────────────────────────────────────────
(function () {
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

  // Inject cursor style
  const style = document.createElement("style");
  style.textContent = ".typewrite > .wrap { border-right: 0.08em solid #fff }";
  document.body.appendChild(style);

  document.querySelectorAll(".typewrite").forEach(el => {
    const toRotate = el.dataset.type ? JSON.parse(el.dataset.type) : null;
    const period   = parseInt(el.dataset.period, 10) || 2000;
    if (toRotate) new TxtType(el, toRotate, period);
  });
})();


// ── Stacked Cards ─────────────────────────────────────────────────────────
(function () {
  bind = function (fn, me) {
    return function () { return fn.apply(me, arguments); };
  };

  this.stackedCards = (function () {
    stackedCards.prototype.defaults = {
      layout: "slide",
      onClick: undefined,
      transformOrigin: "center",
    };

    function stackedCards(options) {
      if (options == null) options = {};
      this.draw = bind(this.draw, this);
      this.config = this.extend(options, this.defaults);
    }

    stackedCards.prototype.init = function () {
      this.element = window.document.documentElement;
      const ref = document.readyState;
      if (ref === "interactive" || ref === "complete") {
        this.draw();
      } else {
        document.addEventListener("DOMContentLoaded", this.draw);
      }
    };

    stackedCards.prototype.draw = function () {
      const me = this;
      const selector = this.config.selector;

      this.els = document.querySelectorAll(selector + " li");
      const els = this.els;

      this.parent = els[0].parentNode;

      const getItemHeight = els[0].getBoundingClientRect().height;
      els[0].parentNode.style.height = parseInt(getItemHeight) + "px";

      const lenAdjust = els.length % 2 === 0 ? -2 : -1;
      const oneHalf = (els.length + lenAdjust) / 2;
      const activeTransform = "translate(" + -50 + "%, 0%)  scale(1)";

      this.detectSwipe();

      Array.prototype.forEach.call(els, el => {
        el.style.transformOrigin = me.config.transformOrigin;

        el.addEventListener("click", function () {
          let clickedEl = el;
          let nextCnt = 0;
          let prevCnt = 0;

          do {
            nextCnt++;
          } while ((clickedEl = clickedEl.nextElementSibling));

          clickedEl = el;

          do {
            prevCnt++;
          } while ((clickedEl = clickedEl.previousElementSibling));

          me.reCalculateTransformsOnClick(nextCnt - 1, prevCnt - 1);

          me.loopNodeList(els, el => el.classList.remove("active"));

          el.classList.add("active");
          el.classList.add(me.config.layout);
          el.style.zIndex = els.length * 5;
          el.style.transform = activeTransform;

          if (me.config.onClick !== undefined) me.config.onClick(el);
        });
      });

      els[oneHalf].click();
    };

    stackedCards.prototype.reCalculateTransformsOnClick = function (nextCnt, prevCnt) {
      let z = 10;
      const els = this.nodelistToArray(this.els);
      let scale, translateX, rotateVal, rotate;
      const layout = this.config.layout;
      const maxCntDivisor = Math.max(prevCnt, nextCnt);
      const prevDivisor = 100 / maxCntDivisor;
      const nextDivisor = 100 / maxCntDivisor;

      if (prevCnt > nextCnt) {
        scale = 0 + 100 / (prevCnt + 1) / 100;
      } else {
        scale = 1 - prevCnt * (1 / (nextCnt + 1));
      }

      let rotatePrevStart = ((prevCnt * 10) / prevCnt) * prevCnt * -1;
      let rotateNextStart = (nextCnt * 10) / nextCnt;

      for (let i = 0; i < prevCnt; i++) {
        switch (layout) {
          case "slide":
            if (i > 0) scale = scale + 100 / (maxCntDivisor + 1) / 100;
            translateX = -50 - prevDivisor * (prevCnt - i);
            rotate = "rotate(0deg)";
            break;
          case "fanOut":
            rotateVal = rotatePrevStart;
            if (i > 0) scale = scale + 100 / (maxCntDivisor + 1) / 100;
            translateX = -50 - prevDivisor * (prevCnt - i);
            rotate = "rotate(" + rotateVal + "deg)";
            rotatePrevStart = rotatePrevStart + (prevCnt * 10) / prevCnt;
            break;
          default:
            translateX = (150 - prevDivisor * 2 * i) * -1;
            rotate = "rotate(0deg)";
        }

        z++;
        els[i].style.transform = `translate(${translateX}%, 0%) scale(${scale}) ${rotate}`;
        els[i].style.zIndex = z;
      }

      z--;
      let j = 0;
      scale = 1;

      for (let i = prevCnt + 1; i < nextCnt + prevCnt + 1; i++) {
        j++;
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

        z--;
        els[i].style.transform = `translate(${translateX}%, 0%) scale(${scale}) ${rotate}`;
        els[i].style.zIndex = z;
      }
    };

    stackedCards.prototype.detectSwipe = function () {
      const me = this;
      const regionEl = document.querySelector(me.config.selector);
      me.detectSwipeDir(regionEl, swipedir => {
        const activeEl = document.querySelector(me.config.selector + " li.active");
        if (swipedir === "left"  && activeEl.nextElementSibling)     activeEl.nextElementSibling.click();
        if (swipedir === "right" && activeEl.previousElementSibling) activeEl.previousElementSibling.click();
      });
    };

    stackedCards.prototype.extend = function (custom, defaults) {
      for (const key in defaults) {
        if (custom[key] == null) custom[key] = defaults[key];
      }
      return custom;
    };

    stackedCards.prototype.nodelistToArray = function (nodelist) {
      return Array.prototype.slice.call(nodelist);
    };

    stackedCards.prototype.loopNodeList = function (els, callback, scope) {
      for (let i = 0; i < els.length; i++) callback.call(scope, els[i]);
    };

    stackedCards.prototype.scrolledIn = function (el) {
      if (!el) return;
      const elemTop = el.getBoundingClientRect().top;
      return elemTop >= 0 && elemTop <= window.innerHeight;
    };

    stackedCards.prototype.detectSwipeDir = function (el, callback) {
      const touchsurface = el;
      let swipedir, startX, startY, distX, distY, startTime;
      const threshold   = 75;
      const restraint   = 100;
      const allowedTime = 300;
      const handleswipe = callback || function () {};

      touchsurface.addEventListener("touchstart", e => {
        const touchobj = e.changedTouches[0];
        swipedir = "none";
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
      }, { passive: false });

      touchsurface.addEventListener("touchmove", () => {}, { passive: true });

      touchsurface.addEventListener("touchend", e => {
        const touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        const elapsedTime = new Date().getTime() - startTime;

        if (elapsedTime <= allowedTime) {
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
            swipedir = distX < 0 ? "left" : "right";
          } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
            swipedir = distY < 0 ? "up" : "down";
          }
        }

        handleswipe(swipedir);
        e.preventDefault();
      }, { passive: false });
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


// ── Back/forward cache repaint fix ─────────────────────────────────────────
window.addEventListener("pageshow", e => {
  if (e.persisted) {
    document.body.style.display = "none";
    document.body.offsetHeight;
    document.body.style.display = "";
  }
});