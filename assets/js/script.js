//  1. BOOT PRELOADER
const bootText = [
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
  if (lineIndex === 0) {
    terminalHeader.textContent = getBiosDate();
  }
  if (lineIndex < bootText.length) {
    const line = document.createElement("div");
    line.textContent = bootText[lineIndex];
    bootElement.appendChild(line);
    const progress = ((lineIndex + 1) / bootText.length) * 100;
    progressElement.style.width = `${progress}%`;
    lineIndex++;
    setTimeout(runBootSequence, Math.random() * 300 + 150);
  } else {
    setTimeout(() => {
      preloader.style.transition = "opacity 0.8s ease";
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.remove("hidden-scroll");
        startTypewriter();
      }, 800);
    }, 1000);
  }
}
window.addEventListener("load", runBootSequence);

//  2. MATRIX RAIN
const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// MISTURA DE KATAKANA + NUMEROS + LETRAS
const chars =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const drops = [];
const fontSize = 14;
const columns = canvas.width / fontSize;
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * canvas.height;
}

let mouseX = 0,
  mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function drawMatrix() {
  ctx.fillStyle = "rgba(2, 2, 2, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    let x = i * fontSize;
    let y = drops[i] * fontSize;
    const dist = Math.hypot(x - mouseX, y - mouseY);

    if (dist < 100) {
      ctx.fillStyle = "rgba(0, 50, 0, 0.2)";
    } else {
      ctx.fillStyle = Math.random() > 0.95 ? "#FFF" : "#00FF41";
    }

    ctx.fillText(text, x, y);
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 75);

//  3. CUSTOM CURSOR
const cursor = document.getElementById("cursor-custom");
const trail = document.getElementById("cursor-trail");
const hoverSound = document.getElementById("hover-sound");
let trailX = 0,
  trailY = 0;
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  trail.style.left = trailX + "px";
  trail.style.top = trailY + "px";
  requestAnimationFrame(animateTrail);
}
animateTrail();
document
  .querySelectorAll(
    "[data-hover], a, button, .trigger-egg, .twitch-char-wrapper"
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
    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("hovering");
    });
  });

//  4. TYPEWRITER
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

//  5. SCROLL OBSERVER
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1 }
);
document
  .querySelectorAll(".fade-in, .fade-up, .fade-in-left, .fade-in-right")
  .forEach((el) => observer.observe(el));

//  6. 3D TILT
document.addEventListener("mousemove", (e) => {
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

//  7. MOBILE MENU
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

// 8. TWITCH EASTER EGG (2 CLIQUES)
const eggTrigger = document.querySelector(".trigger-egg");
const eggContainer = document.getElementById("twitch-easter-egg");
const eggSound = document.getElementById("easter-egg-sound");
let clickCount = 0;
let clickTimer;
if (eggTrigger) {
  eggTrigger.addEventListener("click", () => {
    clickCount++;
    eggTrigger.style.color = "#fff";
    setTimeout(() => {
      eggTrigger.style.color = "";
    }, 100);
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 1000);
    if (clickCount === 2) {
      activateEasterEgg();
      clickCount = 0;
    }
  });
}
function activateEasterEgg() {
  if (eggContainer.classList.contains("twitch-active")) return;
  eggContainer.classList.remove("twitch-hidden");
  eggContainer.classList.add("twitch-active");
  if (eggSound) {
    eggSound.volume = 0.4;
    eggSound.play().catch(() => {});
  }
  setTimeout(() => {
    eggContainer.classList.remove("twitch-active");
    eggContainer.classList.add("twitch-hidden");
  }, 10000);
}
