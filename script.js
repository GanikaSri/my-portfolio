/* ===============================
   CANVAS ANIMATION CONFIGURATION
================================ */
const frameCount = 200;
const imagePath = index =>
  `images/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const canvas = document.getElementById("scroll-canvas");
const ctx = canvas.getContext("2d");

const images = [];
let imagesLoaded = 0;
let currentFrame = 0;

/* ===============================
   RETINA CANVAS SETUP
================================ */
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);

/* ===============================
   IMAGE PRELOAD
================================ */
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = imagePath(i);

  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === frameCount) {
      resizeCanvas();
      drawImage(images[0]);
      requestAnimationFrame(animate);
    }
  };

  images.push(img);
}

/* ===============================
   DRAW IMAGE
================================ */
function drawImage(img) {
  if (!img.complete) return;

  const dpr = window.devicePixelRatio || 1;
  const cw = canvas.width / dpr;
  const ch = canvas.height / dpr;

  const imgRatio = img.width / img.height;
  const canvasRatio = cw / ch;

  let w, h;
  if (imgRatio > canvasRatio) {
    h = ch;
    w = imgRatio * h;
  } else {
    w = cw;
    h = w / imgRatio;
  }

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
}

/* ===============================
   SCROLL PROGRESS
================================ */
function getScrollProgress() {
  const section = document.querySelector(".hero-section");
  const scrollTop = window.scrollY;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight - window.innerHeight;

  return Math.min(
    Math.max((scrollTop - sectionTop) / sectionHeight, 0),
    1
  );
}

/* ===============================
   ANIMATION LOOP
================================ */
function animate() {
  const progress = getScrollProgress();
  const frameIndex = Math.floor(progress * (frameCount - 1));

  if (frameIndex !== currentFrame && images[frameIndex]) {
    currentFrame = frameIndex;
    drawImage(images[currentFrame]);
  }
  requestAnimationFrame(animate);
}


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.querySelector(".navbar");

/* MOBILE MENU */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

/* NAVBAR SHADOW */
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

/* SECTION REVEAL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".section").forEach(sec => {
  sec.style.opacity = "0";
  sec.style.transform = "translateY(30px)";
  sec.style.transition = "0.6s ease";
  observer.observe(sec);
});

/* SMOOTH OFFSET SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    const offset = navbar.offsetHeight;
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: "smooth"
    });
  });
});

console.log("Ganika Sri Portfolio Loaded 🚀");
