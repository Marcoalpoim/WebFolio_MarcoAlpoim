// render-projects.js
// Included from index.html as:
//   <script type="module" src="scripts/render-projects.js"></script>
// (projects-data.js lives right next to this file, inside /scripts)
//
// It reads projects-data.js and builds the filter bar + a flat card grid.
// No build step needed — the browser understands `type="module"` + import/export natively.

import { projects, categoryLabels, categoryOrder } from "./projects-data.js";

const root = document.getElementById("projects-root");

function cardHTML(p) {
  const target = p.external ? `target="_blank" rel="noopener noreferrer"` : "";
  const styleAttr = p.style ? `style="${p.style}"` : "";
  const isFeatured = p.type === "featured";

  const label = p.label ? `<p class="label" data-v-cardsinfo="">${p.label}</p>` : "";
  const infoBtn = isFeatured ? `
    <div class="infoBtn-container" data-v-cardsinfo="">
      <p class="infoBtn" data-v-cardsinfo="">
        <svg width="25" height="25" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M0.675318 7.84315L0.675318 6.4907L11.4153 6.4907L6.68178 1.75713L7.63645 0.802462L14.0009 7.16692L7.63645 13.5314L6.68178 12.5767L11.4153 7.84315L0.675318 7.84315Z" fill="white"/>
        </svg>
      </p>
    </div>` : "";

  const media = p.media === "video"
    ? `<video src="${p.src}" playsinline muted autoplay loop preload="none" aria-label="${p.alt}" class="img" data-v-cardsinfo="" width="${p.w}" height="${p.h}"></video>`
    : `<img src="${p.src}" alt="${p.alt}" loading="lazy" width="${p.w}" height="${p.h}" ${p.sizes ? `sizes="${p.sizes}"` : ""} class="img" data-v-cardsinfo="" />`;

  const meta = `
    <div class="meta" data-v-cardsinfo="">
      <p class="title" data-v-cardsinfo="">${p.title}</p>
      <p class="year" data-v-cardsinfo="">${p.year}</p>
      ${infoBtn}
    </div>`;
  const image = `<div class="image" data-v-cardsinfo="">${media}</div>`;

  // Matches the original hand-written markup: featured cards show
  // label + meta first, then media; large/small cards show media first.
  const body = isFeatured ? `${label}${meta}${image}` : `${image}${meta}`;

  return `
    <a href="${p.href}" ${target} scale="${p.scale}" type="${p.type}" ${p.bright ? 'bright="true"' : ""} ${styleAttr} class="card" data-category="${p.category}" data-v-cardsinfo="" data-v-cardsmain="">
      ${body}
    </a>
  `;
}

function render(filter = "all") {
  const cats = filter === "all"
    ? categoryOrder.filter((c) => projects.some((p) => p.category === c))
    : [filter];

  
  const items = cats.flatMap((cat) => projects.filter((p) => p.category === cat));

  root.innerHTML = items.map(cardHTML).join("");

  // Cards were just replaced in the DOM — let script.js know so it can
  // re-attach the scroll-reveal IntersectionObserver to the new elements.
  document.dispatchEvent(new CustomEvent("projects:rendered"));
}

function buildFilters() {
  const bar = document.getElementById("filters-root");
  if (!bar) return;

  const counts = { all: projects.length };

  categoryOrder.forEach((category) => {
    counts[category] = projects.filter(
      (project) => project.category === category
    ).length;
  });

  const pills = [
    { key: "all", label: "All" },
    ...categoryOrder
      .filter((category) => counts[category] > 0)
      .map((category) => ({
        key: category,
        label: categoryLabels[category],
      })),
  ];

  bar.innerHTML = `
    <div class="filters-shell">
      <div class="filters-scroll" role="group" aria-label="Project filters">
        <div class="filter-indicator" aria-hidden="true"></div>

        ${pills
          .map(
            (pill, index) => `
              <button
                class="filter-btn ${index === 0 ? "is-active" : ""}"
                type="button"
                data-filter="${pill.key}"
                aria-pressed="${index === 0}"
              >
                <span class="filter-label">${pill.label}</span>
                <span class="count">${counts[pill.key]}</span>
              </button>
            `
          )
          .join("")}
      </div>

      <div class="filters-fade filters-fade-left" aria-hidden="true"></div>
      <div class="filters-fade filters-fade-right" aria-hidden="true"></div>
    </div>
  `;

  const buttons = [...bar.querySelectorAll(".filter-btn")];
  const scrollContainer = bar.querySelector(".filters-scroll");
  let isDragging = false;
let startX = 0;
let startScrollLeft = 0;

scrollContainer.addEventListener("mousedown", (event) => {
  isDragging = true;
  startX = event.pageX;
  startScrollLeft = scrollContainer.scrollLeft;

  scrollContainer.classList.add("is-dragging");
});

window.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  event.preventDefault();

  const distance = event.pageX - startX;

  scrollContainer.scrollLeft = startScrollLeft - distance;
});

window.addEventListener("mouseup", () => {
  if (!isDragging) return;

  isDragging = false;
  scrollContainer.classList.remove("is-dragging");
});

scrollContainer.addEventListener(
  "wheel",
  (event) => {
    // Allow normal horizontal trackpad scrolling
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    // Convert mouse-wheel vertical movement into horizontal scrolling
    if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
      event.preventDefault();

      scrollContainer.scrollLeft += event.deltaY;
    }
  },
  { passive: false }
);
  const indicator = bar.querySelector(".filter-indicator");

  const moveIndicator = (button, animate = true) => {
    if (!button || !indicator) return;

    const scroll = bar.querySelector(".filters-scroll");
    const scrollRect = scroll.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    indicator.style.transition = animate
      ? ""
      : "none";

    indicator.style.width = `${buttonRect.width}px`;
    indicator.style.transform = `translateX(${
      buttonRect.left - scrollRect.left + scroll.scrollLeft
    }px)`;

    if (!animate) {
      requestAnimationFrame(() => {
        indicator.style.transition = "";
      });
    }
  };

  const activateFilter = (button) => {
    if (!button) return;

    buttons.forEach((btn) => {
      const active = btn === button;

      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    moveIndicator(button);

    // Keep the selected filter comfortably visible on mobile.
    button.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    render(button.dataset.filter);
  };

  // Event delegation — only one listener.
  bar.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");

    if (!button || !bar.contains(button)) return;

    activateFilter(button);
  });

  // Keyboard navigation between filters.
  bar.addEventListener("keydown", (event) => {
    const current = event.target.closest(".filter-btn");

    if (!current) return;

    const index = buttons.indexOf(current);

    if (event.key === "ArrowRight") {
      event.preventDefault();

      const next = buttons[(index + 1) % buttons.length];
      next.focus();
      activateFilter(next);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      const previous =
        buttons[(index - 1 + buttons.length) % buttons.length];

      previous.focus();
      activateFilter(previous);
    }

    if (event.key === "Home") {
      event.preventDefault();

      buttons[0].focus();
      activateFilter(buttons[0]);
    }

    if (event.key === "End") {
      event.preventDefault();

      buttons[buttons.length - 1].focus();
      activateFilter(buttons[buttons.length - 1]);
    }
  });

  // Initial indicator position.
  requestAnimationFrame(() => {
    moveIndicator(buttons[0], false);
  });

  // Keep indicator perfectly aligned after resizing.
  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      const active = bar.querySelector(".filter-btn.is-active");
      moveIndicator(active, false);
    }, 100);
  });
}

buildFilters();
render("all");