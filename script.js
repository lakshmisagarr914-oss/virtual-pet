// Pet data
let pet = {
  hunger: 100,
  happiness: 100,
  energy: 100
};

// Load saved data
function loadPet() {
  const saved = JSON.parse(localStorage.getItem("virtualPet"));
  if (saved) pet = saved;
  updateUI();
}

// Save data
function savePet() {
  localStorage.setItem("virtualPet", JSON.stringify(pet));
}

// Update UI
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

// Feed function
function feedPet() {
  pet.hunger = Math.min(100, pet.hunger + 20);
  updateUI();
  savePet();
}

// Play function
function playPet() {
  pet.happiness = Math.min(100, pet.happiness + 20);
  pet.energy = Math.max(0, pet.energy - 10);
  updateUI();
  savePet();
}

// Sleep function
function sleepPet() {
  pet.energy = Math.min(100, pet.energy + 25);
  pet.hunger = Math.max(0, pet.hunger - 10);
  updateUI();
  savePet();
}

// Auto decrease every 5 seconds
setInterval(() => {
  pet.hunger = Math.max(0, pet.hunger - 2);
  pet.happiness = Math.max(0, pet.happiness - 1);
  pet.energy = Math.max(0, pet.energy - 1);
  updateUI();
  savePet();
}, 5000);

// Start app
window.onload = loadPet;
