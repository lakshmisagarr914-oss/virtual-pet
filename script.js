// ---------------------------
// 🐾 PET DATA AND STORAGE
// ---------------------------
let pet = { hunger: 100, happiness: 100, energy: 100 };

function loadPet() {
  const saved = JSON.parse(localStorage.getItem("virtualPet"));
  if (saved) pet = saved;
  updateUI();
}

function savePet() {
  localStorage.setItem("virtualPet", JSON.stringify(pet));
}

// ---------------------------
// 🌈 BACKGROUND MUSIC
// ---------------------------
const bgMusic = new Audio("sounds/background.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;
let isMusicPlaying = false;

// ---------------------------
// 🧠 UPDATE UI
// ---------------------------
function updateUI() {
  document.getElementById("hunger").textContent = pet.hunger;
  document.getElementById("happiness").textContent = pet.happiness;
  document.getElementById("energy").textContent = pet.energy;

  let mood = "😊 Happy";
  if (pet.hunger < 40) mood = "😟 Hungry";
  if (pet.energy < 40) mood = "🥱 Sleepy";
  if (pet.happiness < 40) mood = "😢 Sad";

  document.getElementById("mood").textContent = "Mood: " + mood;
}

// ---------------------------
// 🍎 FEED FUNCTION
// ---------------------------
function feedPet() {
  pet.hunger = Math.min(100, pet.hunger + 20);

  // Play sound (new instance each time)
  new Audio("sounds/eat.mp3").play();

  const petImg = document.getElementById("pet");
  petImg.classList.add("eating", "glow");
  setTimeout(() => petImg.classList.remove("eating", "glow"), 1000);

  updateUI();
  savePet();
}

// ---------------------------
// 🎾 PLAY FUNCTION
// ---------------------------
function playPet() {
  pet.happiness = Math.min(100, pet.happiness + 20);
  pet.energy = Math.max(0, pet.energy - 10);

  // Play sound (new instance each time)
  new Audio("sounds/play.mp3").play();

  const petImg = document.getElementById("pet");
  petImg.classList.add("playing", "glow");
  setTimeout(() => petImg.classList.remove("playing", "glow"), 1000);

  updateUI();
  savePet();
}

// ---------------------------
// 💤 SLEEP FUNCTION
// ---------------------------
function sleepPet() {
  pet.energy = Math.min(100, pet.energy + 25);
  pet.hunger = Math.max(0, pet.hunger - 10);

  // Play sound (new instance each time)
  new Audio("sounds/sleep.wav").play();

  const petImg = document.getElementById("pet");
  petImg.classList.add("sleeping");
  setTimeout(() => petImg.classList.remove("sleeping"), 3000);

  updateUI();
  savePet();
}

// ---------------------------
// ⏱️ AUTO DECREASE STATS
// ---------------------------
setInterval(() => {
  pet.hunger = Math.max(0, pet.hunger - 2);
  pet.happiness = Math.max(0, pet.happiness - 1);
  pet.energy = Math.max(0, pet.energy - 1);
  updateUI();
  savePet();
}, 5000);

// ---------------------------
// 🎧 MUTE / UNMUTE BUTTON
// ---------------------------
window.onload = () => {
  loadPet();

  const toggleBtn = document.getElementById("musicToggle");
  toggleBtn.addEventListener("click", () => {
    if (isMusicPlaying) {
      bgMusic.pause();
      isMusicPlaying = false;
      toggleBtn.textContent = "🔇 Play Music";
    } else {
      bgMusic.play();
      isMusicPlaying = true;
      toggleBtn.textContent = "🔊 Mute Music";
    }
  });
};
