// --- 0. TEMA CLARO/ESCURO ---
const themeBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeBtn.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "light") {
    themeIcon.classList.remove("ph-sun");
    themeIcon.classList.add("ph-moon");
  } else {
    themeIcon.classList.remove("ph-moon");
    themeIcon.classList.add("ph-sun");
  }
}

// --- 1. BOOT PRELOADER ---
const bootText = [
  "> Texto Meramente Ilustrativo",
  "> Initializing Kernel...",
  "> Loading Interface Modules...",
  "> Mount Volume: /dev/portfolio...",
  "> Verifying Security Protocols... OK",
  "> Decrypting User Data... OK",
  "> System Ready.",
];
const bootElement = document.getElementById("boot-text");
const progressElement = document.querySelector(".loader-progress");
const preloader = document.getElementById("preloader");
const terminalHeader = document.querySelector(".terminal-header");
let lineIndex = 0;

function getBiosDate() {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
  const time = now.toLocaleTimeString("en-US", { hour12: false });
  return `BIOS DATE ${date} ${time} VER 1.0.2`;
}

function runBootSequence() {
  if (lineIndex === 0) terminalHeader.textContent = getBiosDate();

  if (lineIndex < bootText.length) {
    const line = document.createElement("div");
    line.textContent = bootText[lineIndex];
    bootElement.appendChild(line);
    const progress = ((lineIndex + 1) / bootText.length) * 100;
    progressElement.style.width = `${progress}%`;
    lineIndex++;

    // TEMPO DAS LINHAS: Muito mais rápido (entre 50ms e 150ms por linha)
    setTimeout(runBootSequence, Math.random() * 100 + 50);
  } else {
    // TEMPO DE ESPERA FINAL: Reduzido de 1000ms para 300ms
    setTimeout(() => {
      preloader.style.transition = "opacity 0.4s ease"; // Fade out em 0.4s (antes era 0.8s)
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.remove("hidden-scroll");
        startTypewriter();
      }, 400); // Antes era 800ms
    }, 300);
  }
}
window.addEventListener("load", runBootSequence);

// --- 2. RENDERIZAR PROJETOS POR DATA ---
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container || typeof projectsData === "undefined") return;

  // Ordenar da data mais recente para a mais antiga
  const sortedProjects = projectsData.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  sortedProjects.forEach((proj) => {
    let thumbHTML = "";
    if (proj.type === "image") {
      thumbHTML = `<img src="${proj.imageContent}" alt="${proj.title}" loading="lazy" class="tech-img ${proj.imageFit || ""}" style="background: ${proj.imageBg || "transparent"};" />`;
    } else {
      thumbHTML = `<div class="tech-img" style="background: ${proj.imageBg}; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: ${proj.imageColor}; font-family: monospace; font-size: ${proj.fontSize || "1.5rem"}; text-align: center; padding: 10px;">${proj.imageContent}</div>`;
    }

    let linksHTML = proj.links
      .map(
        (link) => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="cyber-link ${link.highlight ? "highlight" : ""}">
        <i class="ph ${link.icon}"></i> ${link.text}
      </a>
    `,
      )
      .join("");

    let techsHTML = proj.techs.map((tech) => `<li>${tech}</li>`).join("");

    const article = document.createElement("article");
    article.className = "project-item glass-panel fade-up";
    article.setAttribute("data-tilt", "");

    article.innerHTML = `
      <div class="project-thumb">
        ${thumbHTML}
        <div class="scan-overlay"></div>
      </div>
      <div class="project-content">
        <div class="project-header">
          <div class="project-year">${proj.displayDate}</div>
          <div class="project-links">${linksHTML}</div>
        </div>
        <div class="project-details">
          <h4>${proj.title}</h4>
          <p>${proj.description}</p>
          <ul class="tech-list">${techsHTML}</ul>
        </div>
      </div>
    `;
    container.appendChild(article);
  });

  initObservers(); // Reinicia os efeitos para os novos elementos criados
}
renderProjects();

// --- 3. MATRIX RAIN (Com adaptação de cor) ---
const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, 100);
});

const chars =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const drops = [];
const fontSize = 14;
let columns = Math.floor(window.innerWidth / fontSize);

for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * (window.innerHeight / fontSize);
}

let mouseX = 0,
  mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let lastTime = 0;
const interval = 1000 / 15;

function drawMatrix(currentTime) {
  requestAnimationFrame(drawMatrix);
  const deltaTime = currentTime - lastTime;

  if (deltaTime >= interval) {
    lastTime = currentTime - (deltaTime % interval);

    const isLight = root.getAttribute("data-theme") === "light";

    // Fundo muda consoante o tema
    ctx.fillStyle = isLight
      ? "rgba(244, 244, 249, 0.05)"
      : "rgba(2, 2, 2, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px monospace";

    columns = Math.floor(canvas.width / fontSize);
    while (drops.length < columns)
      drops.push(Math.random() * (canvas.height / fontSize));

    for (let i = 0; i < columns; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      let x = i * fontSize;
      let y = drops[i] * fontSize;
      const dist = Math.hypot(x - mouseX, y - mouseY);

      if (dist < 100) {
        ctx.fillStyle = isLight
          ? "rgba(0, 143, 17, 0.4)"
          : "rgba(0, 50, 0, 0.4)";
      } else {
        if (isLight) {
          ctx.fillStyle = Math.random() > 0.95 ? "#333" : "#008f11";
        } else {
          ctx.fillStyle = Math.random() > 0.95 ? "#FFF" : "#00FF41";
        }
      }

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
}
requestAnimationFrame(drawMatrix);

// --- 4. CUSTOM CURSOR & TILT ---
const cursor = document.getElementById("cursor-custom");
const trail = document.getElementById("cursor-trail");
const hoverSound = document.getElementById("hover-sound");
let trailX = 0,
  trailY = 0;

function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  trail.style.left = trailX + "px";
  trail.style.top = trailY + "px";
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  // 3D TILT
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= -30 && x <= rect.width + 30 && y >= -30 && y <= rect.height + 30) {
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -8;
      const ry = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
    } else {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    }
  });
});

// --- 5. OBSERVERS & TYPEWRITER ---
function initObservers() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".fade-in, .fade-up, .fade-in-left, .fade-in-right")
    .forEach((el) => observer.observe(el));

  // Re-bind hover states for dynamically added links
  document
    .querySelectorAll(
      "[data-hover], a, button, .trigger-egg, .twitch-char-wrapper",
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        document.body.classList.add("hovering");
        if (hoverSound && Math.random() > 0.7) {
          hoverSound.volume = 0.1;
          hoverSound.currentTime = 0;
          hoverSound.play().catch(() => {});
        }
      });
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("hovering"),
      );
    });
}

function startTypewriter() {
  const text =
    "Arquitetando soluções digitais seguras e interfaces de alta performance.";
  const el = document.getElementById("typed-text");
  let i = 0;
  el.textContent = "";
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 40);
    }
  }
  type();
}

// --- 6. MOBILE MENU ---
const menuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = menuBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("ph-list");
      icon.classList.add("ph-x");
    } else {
      icon.classList.remove("ph-x");
      icon.classList.add("ph-list");
    }
  });
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuBtn.querySelector("i").classList.remove("ph-x");
      menuBtn.querySelector("i").classList.add("ph-list");
    });
  });
}

// --- 7. TWITCH EASTER EGG ---
const eggTrigger = document.querySelector(".trigger-egg");
const eggContainer = document.getElementById("twitch-easter-egg");
const eggSound = document.getElementById("easter-egg-sound");
let clickCount = 0;
let clickTimer;

function handleInteraction(e) {
  if (e.type === "touchend") e.preventDefault();
  clickCount++;
  eggTrigger.style.color = "#fff";
  eggTrigger.style.textShadow = "0 0 10px #fff";
  setTimeout(() => {
    eggTrigger.style.color = "";
    eggTrigger.style.textShadow = "";
  }, 150);
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => {
    clickCount = 0;
  }, 500);
  if (clickCount === 2) {
    activateEasterEgg();
    clickCount = 0;
  }
}

if (eggTrigger) {
  eggTrigger.addEventListener("click", handleInteraction);
  eggTrigger.addEventListener("touchend", handleInteraction);
}

function activateEasterEgg() {
  if (eggContainer.classList.contains("twitch-active")) return;
  eggContainer.style.display = "flex";
  requestAnimationFrame(() => {
    eggContainer.classList.remove("twitch-hidden");
    eggContainer.classList.add("twitch-active");
  });
  if (eggSound) {
    eggSound.volume = 0.4;
    eggSound.play().catch(() => {});
  }
  setTimeout(() => {
    eggContainer.classList.remove("twitch-active");
    eggContainer.classList.add("twitch-hidden");
    setTimeout(() => {
      eggContainer.style.display = "";
    }, 600);
  }, 6000);
}
