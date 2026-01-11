// intro2.js — STEP 1: minimal replay-safe test

window.runIntro = function () {
  console.log("INTRO RUNNING");

  // remove old intro if it exists
  const old = document.getElementById("intro-root");
  if (old) old.remove();

  const intro = document.createElement("div");
  intro.id = "intro-root";
  intro.style.position = "fixed";
  intro.style.inset = "0";
  intro.style.background = "#000";
  intro.style.color = "#fff";
  intro.style.display = "flex";
  intro.style.alignItems = "center";
  intro.style.justifyContent = "center";
  intro.style.zIndex = "9999";
  intro.textContent = "INTRO";

  document.body.appendChild(intro);

  // remove after 2 seconds
  setTimeout(() => {
    intro.remove();
  }, 2000);
};
