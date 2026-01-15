
 
const GLYPHS = "ABCDEFGHIJRSTUVWXYZ";

function startIntro() {
  const rows = document.querySelectorAll(".row-intro");
  const banners = document.querySelectorAll(".banner-box");
 
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

  
  rows.forEach((row, rowIndex) => {
    const letters = row.querySelectorAll(".character");

    const tl = gsap.timeline({
      delay: rowIndex * 0.25
    });

   
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

 
    letters.forEach((letter, i) => {
      const buildDelay = 2 + i * 0.15;

      tl.call(() => {
        letter.textContent =
          GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }, null, buildDelay);

      tl.call(() => {
        letter.textContent = letter.dataset.final;
      }, null, buildDelay + 0.12);
    });
  });

 
  banners.forEach((box, i) => {
    setTimeout(() => {
      box.style.animation =
        "4s curtain cubic-bezier(0.86, 0.2, 0.07, 1) forwards";
    }, 800 + i * 300);
  });
}

 