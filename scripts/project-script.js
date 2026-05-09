// project-script.js — fully vanilla JS (jQuery removed)

window.onbeforeunload = () => window.scrollTo(0, 0);

(function () {
  const timeouts = [];

  const onReady = fn =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  const onLoad = fn => window.addEventListener("load", fn);

  const clearAllTimeouts = () => {
    timeouts.forEach(clearTimeout);
    timeouts.length = 0;
  };

  window.addEventListener("beforeunload", clearAllTimeouts);


  // ── Staggered text animation ─────────────────────────────────────────────
  function initStaggeredTextAuto() {
    const elements = document.querySelectorAll("[data-stagger]");
    if (!elements.length) return;

    const createSpans = (text, container) => {
      container.innerHTML = "";
      [...text].forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        container.appendChild(span);
      });
    };

    const animateText = container => {
      container.querySelectorAll("span").forEach((span, i) => {
        setTimeout(() => span.classList.add("visible"), i * 100);
      });
    };

    const replaceText = (container, target) => {
      container.querySelectorAll("span").forEach((span, i) => {
        setTimeout(() => {
          if (target[i]) span.textContent = target[i];
        }, i * 100);
      });
    };

    elements.forEach(el => {
      const random = el.dataset.random;
      const target = el.dataset.target;
      if (!random || !target) return;

      createSpans(random, el);
      animateText(el);
      setTimeout(() => replaceText(el, target), 1500);
    });
  }


  // ── Image expand animation ───────────────────────────────────────────────
  function initImageExpand() {
    const imgs = document.querySelectorAll(".img");
    if (!imgs.length) return;

    timeouts.push(
      setTimeout(() => {
        imgs.forEach(img => img.classList.add("expand"));
      }, 100)
    );
  }


  // ── Sticky header ────────────────────────────────────────────────────────
  function initStickyHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    const sticky = header.offsetTop;
    window.addEventListener("scroll", () => {
      header.classList.toggle("sticky", window.pageYOffset > sticky);
    }, { passive: true });
  }


  // ── Fade & slide animations ──────────────────────────────────────────────
  function initPageAnimations() {
    document.body?.classList.add("show");

    document.getElementById("fadeDiv")?.classList.add("fade-up");
    document.getElementById("fadeDiv2")?.classList.add("fade-up2");
    document.getElementById("slide-down")?.classList.add("slidedownbanner");

    timeouts.push(
      setTimeout(() => {
        document.getElementById("fadeDiv2")?.classList.add("visible");
      }, 10)
    );
  }


  // ── Smooth scroll ────────────────────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }


  // ── Menu open/close (vanilla) ────────────────────────────────────────────
  function initMenu() {
    const menu    = document.querySelector(".menu");
    const index   = document.querySelector(".index");
    const navBar  = document.getElementById("main_navBar");
    const openBtn = document.getElementById("openMenu");

    if (!menu || !openBtn) return;

    const openMenu = () => {
      menu.classList.add("open");
      if (index)  index.style.filter  = "blur(90px)";
      if (navBar) navBar.style.filter = "blur(90px)";
      openBtn.setAttribute("aria-expanded", "true");
      const menuContainer = document.getElementById("menuContainer");
      if (menuContainer) menuContainer.removeAttribute("hidden");
    };

    const closeMenu = () => {
      menu.classList.remove("open");
      if (index)  index.style.filter  = "blur(0)";
      if (navBar) navBar.style.filter = "blur(0)";
      openBtn.setAttribute("aria-expanded", "false");
      const menuContainer = document.getElementById("menuContainer");
      if (menuContainer) menuContainer.setAttribute("hidden", "");
    };

    openBtn.addEventListener("click", () => setTimeout(openMenu, 10));

    ["closeMenu", "closemenuonlick", "closemenuonlick2"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
    });
  }


  // ── Init ─────────────────────────────────────────────────────────────────
  onReady(() => {
    initStaggeredTextAuto();
    initImageExpand();
    initStickyHeader();
    initSmoothScroll();
    initMenu();
  });

  onLoad(() => {
    initPageAnimations();
  });

})();