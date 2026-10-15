"use strict";

// The original page uses native horizontal scrolling with snap points.
const gallery = document.querySelector(".screen-viewport");
const slides = [...gallery.querySelectorAll(".screen-slide")];
const dots = [...document.querySelectorAll(".screen-dots button")];
const previous = document.querySelector('[aria-label="Previous screen"]');
const next = document.querySelector('[aria-label="Next screen"]');
const counter = document.querySelector(".screen-counter");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let activeSlide = 0;
let scrollFrame = 0;
let drag = null;

function slidePosition(index) {
  return slides[index].offsetLeft - slides[0].offsetLeft;
}

function updateGallery() {
  let nearest = 0;
  let distance = Infinity;
  slides.forEach((_, index) => {
    const candidate = Math.abs(gallery.scrollLeft - slidePosition(index));
    if (candidate < distance) {
      distance = candidate;
      nearest = index;
    }
  });
  activeSlide = nearest;
  previous.disabled = activeSlide === 0;
  next.disabled = activeSlide === slides.length - 1;
  dots.forEach((dot, index) => {
    if (index === activeSlide) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
  counter.textContent = `${activeSlide + 1} / ${slides.length}`;
}

function goToSlide(index, instant = false) {
  const destination = Math.max(0, Math.min(slides.length - 1, index));
  gallery.scrollTo({
    left: slidePosition(destination),
    behavior: instant || reducedMotion.matches ? "instant" : "smooth",
  });
}

previous.addEventListener("click", () => goToSlide(activeSlide - 1));
next.addEventListener("click", () => goToSlide(activeSlide + 1));
dots.forEach((dot, index) => dot.addEventListener("click", () => goToSlide(index)));
gallery.addEventListener("keydown", (event) => {
  const destinations = {
    ArrowLeft: activeSlide - 1,
    ArrowRight: activeSlide + 1,
    Home: 0,
    End: slides.length - 1,
  };
  if (!(event.key in destinations)) return;
  event.preventDefault();
  goToSlide(destinations[event.key], true);
});
gallery.addEventListener("scroll", () => {
  cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(updateGallery);
}, { passive: true });

gallery.addEventListener("pointerdown", (event) => {
  // Touch and trackpad retain native momentum and swipe behavior.
  if (event.pointerType !== "mouse" || event.button !== 0) return;
  event.preventDefault();
  gallery.focus({ preventScroll: true });
  drag = { id: event.pointerId, x: event.clientX, left: gallery.scrollLeft };
  gallery.setPointerCapture(event.pointerId);
  gallery.classList.add("is-dragging");
});
gallery.addEventListener("pointermove", (event) => {
  if (!drag || drag.id !== event.pointerId) return;
  gallery.scrollLeft = drag.left - (event.clientX - drag.x);
});
function endDrag(event) {
  if (!drag || drag.id !== event.pointerId) return;
  drag = null;
  gallery.classList.remove("is-dragging");
  if (gallery.hasPointerCapture(event.pointerId)) gallery.releasePointerCapture(event.pointerId);
  updateGallery();
  goToSlide(activeSlide, true);
}
gallery.addEventListener("pointerup", endDrag);
gallery.addEventListener("pointercancel", endDrag);
gallery.addEventListener("lostpointercapture", endDrag);
new ResizeObserver(() => {
  gallery.scrollTo({ left: slidePosition(activeSlide), behavior: "instant" });
  updateGallery();
}).observe(gallery);
updateGallery();

const themeButton = document.querySelector(".theme-switcher");
const systemDark = matchMedia("(prefers-color-scheme: dark)");
const sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
const moon = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
let activeTransition = null;
let themeRevision = 0;

function isDark() {
  return document.documentElement.dataset.theme === "dark" ||
    (!document.documentElement.dataset.theme && systemDark.matches);
}
function updateThemeButton() {
  const label = `Appearance: ${isDark() ? "Light" : "Dark"}`;
  themeButton.setAttribute("aria-label", label);
  themeButton.title = label;
  themeButton.querySelector("svg").innerHTML = isDark() ? moon : sun;
}
themeButton.addEventListener("click", async (event) => {
  const theme = isDark() ? "light" : "dark";
  const revision = ++themeRevision;
  activeTransition?.skipTransition();
  const apply = () => {
    if (revision !== themeRevision) return;
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("token-meter-theme", theme); } catch { /* Optional persistence. */ }
    updateThemeButton();
  };
  if (!document.startViewTransition || reducedMotion.matches) {
    apply();
    return;
  }
  document.documentElement.dataset.themeTransition = "";
  const transition = document.startViewTransition(apply);
  activeTransition = transition;
  try {
    await transition.ready;
    const rect = themeButton.getBoundingClientRect();
    const x = event.detail ? event.clientX : rect.x + rect.width / 2;
    const y = event.detail ? event.clientY : rect.y + rect.height / 2;
    const origin = `${(x / innerWidth * 100).toFixed(2)}% ${(y / innerHeight * 100).toFixed(2)}%`;
    await document.documentElement.animate({
      clipPath: [`circle(0% at ${origin})`, `circle(150% at ${origin})`],
    }, { duration: 600, easing: "cubic-bezier(0.2, 0.7, 0, 1)", pseudoElement: "::view-transition-new(root)" }).finished;
    await transition.finished;
  } catch {
    transition.skipTransition();
  } finally {
    if (activeTransition === transition) {
      activeTransition = null;
      delete document.documentElement.dataset.themeTransition;
    }
  }
});
systemDark.addEventListener("change", updateThemeButton);
new MutationObserver(updateThemeButton).observe(document.documentElement, {
  attributes: true, attributeFilter: ["data-theme"],
});
window.addEventListener("storage", (event) => {
  if (event.key !== "token-meter-theme" && event.key !== null) return;
  if (event.newValue === "light" || event.newValue === "dark") {
    document.documentElement.dataset.theme = event.newValue;
  } else {
    delete document.documentElement.dataset.theme;
  }
});
updateThemeButton();

// Menus intentionally retain the reference site's native <details> behavior.
