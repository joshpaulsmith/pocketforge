const launchButtons = Array.from(document.querySelectorAll("[data-launch-game]"));
const overlay = document.getElementById("forge-launch-overlay");
const lightbox = document.getElementById("forge-lightbox");
const frame = document.getElementById("forge-lightbox-frame");
const closeTargets = Array.from(document.querySelectorAll("[data-close-lightbox]"));

let warmTimer = null;

function closeLightbox() {
  if (warmTimer) {
    window.clearTimeout(warmTimer);
    warmTimer = null;
  }

  if (overlay) overlay.hidden = true;
  if (lightbox) {
    lightbox.hidden = true;
    lightbox.classList.remove("is-visible");
  }
  if (frame) frame.src = "";
  document.body.classList.remove("modal-open");
}

function openLightbox() {
  if (!overlay || !lightbox || !frame) {
    window.location.href = "/play/";
    return;
  }

  overlay.hidden = false;
  document.body.classList.add("modal-open");

  warmTimer = window.setTimeout(() => {
    frame.src = "/play/";
    overlay.hidden = true;
    lightbox.hidden = false;
    requestAnimationFrame(() => {
      lightbox.classList.add("is-visible");
    });
  }, 1100);
}

launchButtons.forEach((button) => {
  button.addEventListener("click", openLightbox);
});

closeTargets.forEach((target) => {
  target.addEventListener("click", closeLightbox);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
