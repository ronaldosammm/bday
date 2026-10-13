// ======================= PENGATURAN MUDAH =======================
// Ubah password dan teks surat di bagian ini.
const CONFIG = {
  password: "14102006",
  letter: `Selamat ulang tahun, sayang. ❤️

Hari ini adalah hari ketika seseorang yang begitu berarti hadir ke dunia. Aku berharap kamu tahu betapa berharganya dirimu, bukan hanya hari ini, tetapi juga di hari-hari biasa ketika kamu mungkin lupa melihat betapa hebatnya dirimu sendiri.

Terima kasih sudah hadir dan menjadi bagian dari ceritaku. Aku mungkin ga selalu punya kata kata yang sempurna, tapi aku ingin terus belajar ngerti kamu, dukung mimpi mimpimu, dan nemenin terus lewatin hari yang mudah maupun yang sulit.

Di umur yang baru ini, semoga hal hal baik nemuin jalannya ke kamu. Semoga dikasi kesehatan, ketenangan, keberanian, dan banyak alasan buat tersenyum. Jangan terlalu keras ke dirimu sendiri, ya. Kamu boleh beristirahat, boleh merasa lelah, dan boleh meminta pelukan ketika dunia terasa berat.

Aku gabisa menjanjikan bahwa semuanya akan selalu mudah, tetapi aku ingin berusaha hadir dengan tulus dan menghargai setiap momen yang kita punya. Semoga kita masih bisa nyiptain banyak kenangan kecil yang suatu hari nanti bakal kita ceritain lagi sambil senyum.

Selamat bertambah usia, orang kesayangankuuu. Semoga semua doa baik yang kamu simpan pelanvpelan menjadi nyata. Hari ini, besok, dan seterusnya, aku berharap kamu selalu nemuin alasan untuk bahagia.

Happy birthday, my love. You deserve so much good. ❤️`
};
// ================================================================

const screens = [...document.querySelectorAll(".screen")];
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const gateCard = document.querySelector(".gate-card");
const showPassword = document.getElementById("showPassword");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");
const particles = document.getElementById("particles");
let currentScreen = 1;
let typingTimer = null;
let particleTimer = null;
let musicStarted = false;

function showScreen(number) {
  screens.forEach(screen => {
    screen.classList.remove("active");
    screen.setAttribute("aria-hidden", "true");
  });
  const next = document.getElementById(`screen-${number}`);
  next.classList.remove("active");
  // Reflow allows the entrance animation to replay.
  void next.offsetWidth;
  next.classList.add("active");
  next.setAttribute("aria-hidden", "false");
  currentScreen = number;
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (number >= 2) {
    musicToggle.classList.remove("hidden");
    const copy = next.querySelector(".typed-copy");
    if (copy) typeText(copy, copy.dataset.text || "");
  }

  if (number === 5) {
    createParticles(14);
  }
}

function typeText(element, text, speed = 27) {
  clearInterval(typingTimer);
  element.textContent = "";
  element.classList.add("typing");
  let index = 0;
  typingTimer = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;
    if (index >= text.length) {
      clearInterval(typingTimer);
      element.classList.remove("typing");
    }
  }, speed);
}

passwordForm.addEventListener("submit", event => {
  event.preventDefault();
  if (passwordInput.value === CONFIG.password) {
    passwordError.textContent = "";
    passwordInput.blur();
    showScreen(2);
    startMusic();
    createParticles(28);
  } else {
    passwordError.textContent = "Password-nya belum tepat. Coba ingat lagi, ya ♡";
    gateCard.classList.remove("shake");
    void gateCard.offsetWidth;
    gateCard.classList.add("shake");
    passwordInput.select();
  }
});

showPassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  showPassword.setAttribute("aria-label", isPassword ? "Sembunyikan password" : "Tampilkan password");
});

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    const target = Number(button.dataset.next);
    showScreen(target);
    if (target === 5) createParticles(24);
  });
});

function startMusic() {
  // Browser mungkin memblokir audio jika file belum ada atau format tidak didukung.
  music.play().then(() => {
    musicStarted = true;
    updateMusicButton();
  }).catch(() => {
    musicStarted = false;
    updateMusicButton();
    musicLabel.textContent = "Tap for music";
  });
}

function updateMusicButton() {
  const playing = !music.paused;
  musicIcon.textContent = playing ? "♫" : "♪";
  musicLabel.textContent = playing ? "Music on" : "Music off";
}

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicStarted = true;
    } catch {
      musicLabel.textContent = "Add your song";
    }
  } else {
    music.pause();
  }
  updateMusicButton();
});

const openLetter = document.getElementById("openLetter");
const letter = document.getElementById("letter");
const letterCopy = document.getElementById("letterCopy");
const finalNote = document.getElementById("finalNote");
const restartButton = document.getElementById("restartButton");

openLetter.addEventListener("click", () => {
  openLetter.classList.add("hidden");
  letter.classList.remove("hidden");
  letterCopy.textContent = "";
  typeText(letterCopy, CONFIG.letter, 22);
  finalNote.classList.remove("hidden");
  restartButton.classList.remove("hidden");
  createParticles(55);
});

restartButton.addEventListener("click", () => {
  clearInterval(typingTimer);
  letter.classList.add("hidden");
  finalNote.classList.add("hidden");
  restartButton.classList.add("hidden");
  openLetter.classList.remove("hidden");
  showScreen(1);
  passwordInput.value = "";
  passwordError.textContent = "";
});

function createParticles(amount = 10) {
  const symbols = ["♡", "♥", "✿", "❀", "✧", "·"];
  for (let i = 0; i < amount; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.fontSize = `${12 + Math.random() * 20}px`;
    particle.style.setProperty("--drift", `${Math.random() * 150 - 75}px`);
    particle.style.animationDuration = `${7 + Math.random() * 9}s`;
    particle.style.animationDelay = `${Math.random() * 2}s`;
    particles.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove());
  }
}

// Hujan dekorasi berjalan terus, dengan jumlah terbatas agar tetap ringan di HP.
function startParticleRain() {
  if (particleTimer) clearInterval(particleTimer);
  particleTimer = setInterval(() => createParticles(3), 850);
}
startParticleRain();

// Update label musik bila pemutaran berubah dari kontrol browser.
music.addEventListener("play", updateMusicButton);
music.addEventListener("pause", updateMusicButton);

// Menghormati pengaturan browser untuk mengurangi gerakan.
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  if (particleTimer) clearInterval(particleTimer);
}
