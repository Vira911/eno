document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initAvatar();
  initRipples();
  initScrollReveal();
  initDiscord();
});

/**
 * Theme Engine - Strictly Variable Based
 */
function initTheme() {
  const sheet = document.getElementById("settings-panel");
  const openBtn = document.getElementById("open-settings");
  const closeBtn = document.getElementById("close-settings");
  const chips = document.querySelectorAll(".theme-chip, .mode-btn");

  openBtn.onclick = () => sheet.classList.add("open");
  closeBtn.onclick = () => sheet.classList.remove("open");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const theme = chip.getAttribute("data-theme");
      document.documentElement.setAttribute("data-theme", theme);

      // Sync UI state
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      localStorage.setItem("user-theme", theme);
    });
  });

  // Load saved
  const saved = localStorage.getItem("user-theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
    chips.forEach((c) => {
      if (c.getAttribute("data-theme") === saved) c.classList.add("active");
      else c.classList.remove("active");
    });
  }
}

/**
 * Safe Avatar Loading System
 */
function initAvatar() {
  const img = document.getElementById("avatar-img");
  const loader = document.getElementById("avatar-loader");

  img.onload = () => {
    img.classList.remove("hide");
    loader.style.display = "none";
  };

  img.onerror = () => {
    img.src = `https://ui-avatars.com/api/?name=CryptoUserW&background=random&color=fff&size=320`;
    img.onload();
  };
}

/**
 * High-Performance Ripple Engine
 */
function initRipples() {
  document.addEventListener("mousedown", (e) => {
    const target = e.target.closest(".ripple");
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const ripple = document.createElement("span");
    const diameter = Math.max(rect.width, rect.height);

    ripple.className = "ripple-obj";
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`;

    target.appendChild(ripple);

    // GPU Cleanup
    ripple.addEventListener("animationend", () => ripple.remove());
  });
}

/**
 * Scroll Reveal - IntersectionObserver
 */
function initScrollReveal() {
  // Initial hero reveal
  setTimeout(() => {
    document
      .querySelectorAll(".animate-on-load")
      .forEach((el) => el.classList.add("animate-ready"));
  }, 100);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document
    .querySelectorAll(".scroll-reveal")
    .forEach((el) => observer.observe(el));
}

function initDiscord() {
  const card = document.getElementById("discord-card");
  const toast = document.getElementById("toast");
  card.onclick = () => {
    navigator.clipboard.writeText("em_pq6uv");
    toast.classList.add("active");
    setTimeout(() => toast.classList.remove("active"), 2500);
  };
}
