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
let hasScrolled = false;
const STICKY_THRESHOLD = 10;

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  const divToHide = document.getElementById("onscrollremove");
  if (divToHide) {
    divToHide.style.visibility = y > 0 ? "hidden" : "visible";
  }

  header.classList.toggle("sticky", y > STICKY_THRESHOLD);
}, { passive: true });


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
        y: ".5em",
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
  openBtn.setAttribute("aria-expanded", "true");
}
function closeMenu() {
  menu.classList.remove("open");  
  openBtn.setAttribute("aria-expanded", "false");
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

(function () {
  let observer;
  let atTop = true;

  function getRevealElements() {
    return document.querySelectorAll(".card, #filters-root");
  }

  function createObserver(elements) {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 0px 0px"
      }
    );

    elements.forEach(element => observer.observe(element));
  }

  function showAllElements(elements) {
    elements.forEach(element => {
      element.classList.add("visible");
    });
  }

  function onScroll(y) {
    const elements = getRevealElements();
    if (!elements.length) return;

    if (y < 50 && !atTop) {
      atTop = true;

      elements.forEach(element => {
        element.classList.add("reset");
        element.classList.remove("visible");

        requestAnimationFrame(() => {
          element.classList.remove("reset");
        });
      });

      if (observer) observer.disconnect();
    }

    if (y > 50 && atTop) {
      atTop = false;
      createObserver(elements);
    }
  }

  function initCardReveal() {
    const elements = getRevealElements();
    if (!elements.length) return;

    const navEntry = performance.getEntriesByType("navigation")[0];

    if (navEntry && navEntry.type === "back_forward") {
      showAllElements(elements);
      atTop = false;
      return;
    }

    if (window.scrollY > 50) {
      atTop = false;
      createObserver(elements);
    } else {
      atTop = true;

      if (observer) observer.disconnect();
    }
  }

  document.addEventListener(
    "projects:rendered",
    initCardReveal
  );

  window.addEventListener("load", () => {
    initCardReveal();

    if (window.lenis) {
      window.lenis.on("scroll", ({ scroll }) => {
        onScroll(scroll);
      });
    } else {
      window.addEventListener(
        "scroll",
        () => onScroll(window.scrollY),
        { passive: true }
      );
    }
  });
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


 

// ── Back/forward cache repaint fix ─────────────────────────────────────────
window.addEventListener("pageshow", e => {
  if (e.persisted) {
    document.body.style.display = "none";
    document.body.offsetHeight;
    document.body.style.display = "";
  }
});


// ── Smooth inertial scroll (Lenis) ─────────────────────────────────────────
(function () {
  const ua = navigator.userAgent || "";
  const isInAppBrowser =
    /Instagram|FBAN|FBAV|FB_IAB|TikTok|BytedanceWebview|musical_ly/i.test(ua);

  if (isInAppBrowser) {
    window.addEventListener("scroll", () => {
      window.dispatchEvent(new Event("scroll"));
    }, { passive: true });
    return;
  }

  window.lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // ── Guard against infinite loop ──────────────────────────────────────────
  let isLenisScrolling = false;
  window.lenis.on("scroll", () => {
    if (isLenisScrolling) return;
    isLenisScrolling = true;
    window.dispatchEvent(new Event("scroll"));
    isLenisScrolling = false;
  });
})();

 // ── Go-to-top button ───────────────────────────────────────────────────────
(function () {
  const btn = document.getElementById("myBtn-gotop");
  if (!btn) return;

  const ring = btn.querySelector(".scroll-top-btn__ring-progress");
  const circumference = 125.66; // 2 * PI * r(20)
  const showThreshold = 20;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let ticking = false;

  function updateButton() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

    if (ring) {
      ring.style.strokeDashoffset = circumference - scrollPercent * circumference;
    }

    btn.classList.toggle("is-visible", scrollTop > showThreshold);
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateButton);
      ticking = true;
    }
  }, { passive: true });

  updateButton(); // correct state on reload mid-scroll

  btn.addEventListener("click", () => {
    btn.classList.add("is-animating");

    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }

    setTimeout(() => btn.classList.remove("is-animating"), 600);

    sendTracking("Scroll Top Button", "click", "scroll to top");
  });

  function sendTracking(eventCategory, eventAction, eventLabel) {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "ab_tasty_interaction",
        eventCategory,
        eventAction,
        eventLabel,
      });
    }
  }
})();

 