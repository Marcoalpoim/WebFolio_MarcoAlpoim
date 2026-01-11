// 🔒 intro lock (intro runs first)
window.__INTRO_ACTIVE__ = true;

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  const DELAY_BEFORE_EXIT = 5000;
  const EXIT_DURATION = 1700;
  const SCRIPT_OFFSET = 1000;

  const hasPlayed = sessionStorage.getItem("introPlayed");

  // 🔥 load + run intro
  const loadIntroBundle = () => {
    const script = document.createElement("script");
    script.src = "scripts/intro-js/intro2.js?v=" + Date.now();

    script.onload = () => {
      if (window.runIntro) {
        window.runIntro();
      }
    };

    document.body.appendChild(script);
  };

  // 🔁 RETURN VISIT
  if (hasPlayed) {
    if (preloader) preloader.remove();
    loadIntroBundle();
    return;
  }

  // 🟢 FIRST VISIT
  sessionStorage.setItem("introPlayed", "true");

  if (!preloader) {
    loadIntroBundle();
    return;
  }

  // preloader animation
  preloader.style.transform = "translateY(0)";
  preloader.style.transition = `transform ${EXIT_DURATION}ms cubic-bezier(0.19, 1, 0.22, 1)`;

  preloader.offsetHeight;

  setTimeout(() => {
    preloader.style.transform = "translateY(-100vh)";
    preloader.style.pointerEvents = "none";

    // 🔥 start intro before loader fully exits
    setTimeout(loadIntroBundle, EXIT_DURATION - SCRIPT_OFFSET);

    setTimeout(() => {
      preloader.remove();
    }, EXIT_DURATION);
  }, DELAY_BEFORE_EXIT);
});

/* ======================================================
   ⏳ WAIT UNTIL INTRO FINISHES BEFORE UI INIT
====================================================== */

const waitForIntro = () => {
  if (window.__INTRO_ACTIVE__) {
    requestAnimationFrame(waitForIntro);
    return;
  }

  // ✅ SAFE TO INIT UI NOW
  initUI();
};

waitForIntro();

/* ======================================================
   UI + INTERACTIONS (UNCHANGED, JUST WRAPPED)
====================================================== */

function initUI() {
  $(function () {
    // helpers
    const $menu = $(".menu");
    const $index = $(".index");
    const $fade = $("#fadeDiv");

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

    $("#openMenu").on("click", () => setTimeout(openMenu, 10));
    $("#closeMenu, #closemenuonlick, #closemenuonlick2").on("click", closeMenu);

    // reveal cards
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

    // intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in-from-right");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );

    document.querySelectorAll(".contentslider").forEach((el) => {
      observer.observe(el);
    });

    // go to top
    const $btn = $("#myBtn-gotop");

    $(window).on("scroll", function () {
      $btn.toggle($(this).scrollTop() > 20);
    });

    $btn.on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
    });

    // typewriter
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
      if (toRotate) new TxtType(this, toRotate, period);
    });

    $("<style>")
      .text(".typewrite > .wrap { border-right: 0.08em solid #fff }")
      .appendTo("body");
  });
}
