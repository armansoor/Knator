// Surname pool
const surnames = [
  "김","이","박","최","정","강","윤","임",
  "남궁","선우","황보","제갈"
];

// Male and Female syllable pools
const maleSyllables = ["민","준","호","현","석","우","재","훈","태","영","기","도","혁","성"];
const femaleSyllables = ["지","수","아","린","서","나","해","윤","예","라","별","미","채","연"];

// Dictionary of meanings
const meanings = {
  "민": "clever/quick",
  "준": "talented/handsome",
  "호": "brave",
  "현": "virtuous/wise",
  "석": "rock/strong",
  "우": "friend/universe",
  "재": "wealth/talent",
  "훈": "teaching",
  "태": "big/great",
  "영": "flower/petal",
  "기": "rise/energy",
  "도": "path/way",
  "혁": "bright",
  "성": "success/star",
  "지": "wisdom",
  "수": "graceful",
  "아": "beautiful",
  "린": "delicate",
  "서": "auspicious",
  "나": "elegant",
  "해": "sun/ocean",
  "윤": "shine",
  "예": "art/gifted",
  "라": "melody",
  "별": "star",
  "미": "beauty",
  "채": "color",
  "연": "lotus"
};

// Utility: get random from array
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate Random Name
function generateRandomName() {
  const gender = document.getElementById("genderRandom").value;
  const surname = randomChoice(surnames);

  let syllables = (gender === "male") ? maleSyllables : femaleSyllables;
  let given = "";

  // realistic: 2-syllable (70%), 1-syllable (20%), 3-syllable (10%)
  const roll = Math.random();
  if (roll < 0.2) {
    given = randomChoice(syllables);
  } else if (roll < 0.9) {
    given = randomChoice(syllables) + randomChoice(syllables);
  } else {
    given = randomChoice(syllables) + randomChoice(syllables) + randomChoice(syllables);
  }

  showResult("randomResult", surname, given);
}

// Generate Personal Name
function generatePersonalName() {
  const nameInput = document.getElementById("inputName").value.trim();
  const gender = document.getElementById("genderPersonal").value;
  if (!nameInput) {
    alert("Please enter your name!");
    return;
  }

  const letters = nameInput.replace(/[^a-zA-Z]/g, "").toLowerCase().split("");
  let syllables = (gender === "male") ? maleSyllables : femaleSyllables;

  // Map first 2-3 letters to syllables
  let given = "";
  for (let i = 0; i < Math.min(3, letters.length); i++) {
    const idx = letters[i].charCodeAt(0) % syllables.length;
    given += syllables[idx];
  }

  const surname = randomChoice(surnames);
  showResult("personalResult", surname, given);
}

// Show result card
function showResult(elementId, surname, given) {
  const container = document.getElementById(elementId);
  const fullName = surname + given;
  const romanized = romanize(surname) + " " + romanize(given);
  const meaning = [...given].map(syl => `${syl} (${meanings[syl] || "—"})`).join(" + ");

  container.innerHTML = `
    <div class="hangul">${fullName}</div>
    <div class="roman">${romanized}</div>
    <div class="meaning">${surname} + ${meaning}</div>
  `;
  container.style.display = "block";
}

// Romanization (basic approximation)
function romanize(korean) {
  const map = {
    "김":"Kim","이":"Lee","박":"Park","최":"Choi","정":"Jung","강":"Kang","윤":"Yoon","임":"Lim",
    "남궁":"Namgoong","선우":"Seonwoo","황보":"Hwangbo","제갈":"Jegal",
    "민":"Min","준":"Jun","호":"Ho","현":"Hyun","석":"Seok","우":"Woo","재":"Jae","훈":"Hoon",
    "태":"Tae","영":"Young","기":"Ki","도":"Do","혁":"Hyuk","성":"Seong",
    "지":"Ji","수":"Soo","아":"Ah","린":"Rin","서":"Seo","나":"Na","해":"Hae","윤":"Yoon",
    "예":"Ye","라":"Ra","별":"Byeol","미":"Mi","채":"Chae","연":"Yeon"
  };
  return [...korean].map(ch => map[ch] || ch).join("");
}

// Tab switching
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});
