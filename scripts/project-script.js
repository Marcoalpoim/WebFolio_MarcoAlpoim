window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};


(function () {
  const timeouts = [];

  /*   HELPERS  */
  const onReady = (fn) =>
    document.readyState !== 'loading'
      ? fn()
      : document.addEventListener('DOMContentLoaded', fn);

  const onLoad = (fn) => window.addEventListener('load', fn);

  const clearAllTimeouts = () => {
    timeouts.forEach(clearTimeout);
    timeouts.length = 0;
  };

  window.addEventListener('beforeunload', clearAllTimeouts);

   // STAGGERED TEXT ANIMATION 
 function initStaggeredTextAuto() {
  const elements = document.querySelectorAll('[data-stagger]');
  if (!elements.length) return;

  const createSpans = (text, container) => {
    container.innerHTML = '';
    [...text].forEach(char => {
      const span = document.createElement('span');
      span.textContent = char;
      container.appendChild(span);
    });
  };

  const animateText = (container) => {
    container.querySelectorAll('span').forEach((span, i) => {
      setTimeout(() => span.classList.add('visible'), i * 100);
    });
  };

  const replaceText = (container, target) => {
    container.querySelectorAll('span').forEach((span, i) => {
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


  /*  IMAGE EXPAND ANIMATION  */
  function initImageExpand() {
    const imgs = document.querySelectorAll('.img');
    if (!imgs.length) return;

    timeouts.push(
      setTimeout(() => {
        imgs.forEach(img => img.classList.add('expand'));
      }, 100)
    );
  }

  /*  STICKY HEADER  */
  function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const sticky = header.offsetTop;

    window.addEventListener('scroll', () => {
      header.classList.toggle('sticky', window.pageYOffset > sticky);
    });
  }

  /*  FADE & SLIDE ANIMATIONS  */
  function initPageAnimations() {
    document.body?.classList.add('show');

    document.getElementById('titleAnimation')?.classList.add('fade-up');
    document.getElementById('main_navBar')?.classList.add('main_navBar');
    document.getElementById('slide-down')?.classList.add('slidedownbanner');

    timeouts.push(
      setTimeout(() => {
        document.getElementById('main_navBar')?.classList.add('visible');
      }, 10)
    );
  }

  //   MARQUEE (jQuery)
  function initMarquee() {
    if (!window.jQuery) return;

    timeouts.push(
      setTimeout(() => {
        $('.marquee-animation img').addClass('animated');
      }, 900),
      setTimeout(() => {
        $('.marquee-animation2 img').addClass('animated2');
      }, 3000)
    );
  }

 
    // SMOOTH SCROLL
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

   // MENU (jQuery)/
  function initMenu() {
    if (!window.jQuery) return;

    const $menu = $(".menu");
    const $index = $(".index");
    const $fade = $("#titleAnimation");

    if (!$menu.length) return;

    const openMenu = () => {
      $menu.addClass("open");
      $index.add($fade).css("filter", "blur(90px)");
    };

    const closeMenu = () => {
      $menu.removeClass("open");
      $index.add($fade).css("filter", "blur(0)");
    };

    $("#openMenu").on("click", () => {
      setTimeout(openMenu, 10);
    });

    $("#closeMenu, #closemenuonlick, #closemenuonlick2").on(
      "click",
      closeMenu
    );
  }
 
    // INIT/
  onReady(() => {
    initStaggeredTextAuto();

    initImageExpand();
    initStickyHeader();
    initSmoothScroll();
    initMenu(); // 👈 jQuery menu
  });

  onLoad(() => {
    initPageAnimations();
    initMarquee();
  });
})();
