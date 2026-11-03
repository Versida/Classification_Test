const stimuli = [
  "financially supports a partner",
  "asks others for emotional reassurance",
  "takes the lead in decision-making",
  "prioritizes caregiving responsibilities",
  "admits feeling afraid",
  "allows a partner to take control",
  "compromises career advancement for family",
  "solves personal problems independently"
];

const introScreen = document.getElementById("intro-screen");
const testScreen = document.getElementById("test-screen");
const completionScreen = document.getElementById("completion-screen");

const startButton = document.getElementById("start-button");
const reviewButton = document.getElementById("review-button");

const stimulusText = document.getElementById("stimulus-text");
const progressText = document.getElementById("progress-text");
const responseSummary = document.getElementById("response-summary");

let currentTrial = 0;
let trialStartTime = 0;
let testActive = false;
let responses = [];

startButton.addEventListener("click", startTest);
reviewButton.addEventListener("click", showResponses);
window.addEventListener("keydown", handleKeyPress, true);

function startTest() {
  introScreen.classList.add("hidden");
  testScreen.classList.remove("hidden");

  currentTrial = 0;
  responses = [];
  testActive = true;

  showTrial();
}

function showTrial() {
  progressText.textContent =
    `Description ${currentTrial + 1} of ${stimuli.length}`;

  stimulusText.textContent = stimuli[currentTrial];

  trialStartTime = performance.now();
}

function handleKeyPress(event) {
  if (!testActive || event.repeat) {
    return;
  }

  const keyCode = event.code;
  const keyName = event.key.toLowerCase();

  const pressedE =
    keyCode === "KeyE" ||
    keyName === "e" ||
    event.keyCode === 69;

  const pressedI =
    keyCode === "KeyI" ||
    keyName === "i" ||
    event.keyCode === 73;

  if (!pressedE && !pressedI) {
    return;
  }

  event.preventDefault();

  const reactionTime = Math.round(
    performance.now() - trialStartTime
  );

  const selectedCategory = pressedE
    ? "Masculinity"
    : "Femininity";

  responses.push({
    description: stimuli[currentTrial],
    category: selectedCategory,
    reactionTime: reactionTime
  });

  currentTrial++;

  if (currentTrial < stimuli.length) {
    showTrial();
  } else {
    finishPartOne();
  }
}

function finishPartOne() {
  testActive = false;

  testScreen.classList.add("hidden");
  completionScreen.classList.remove("hidden");

  // Keep the responses available for later sections.
  sessionStorage.setItem(
    "genderClassifications",
    JSON.stringify(responses)
  );
}

function showResponses() {
  responseSummary.innerHTML = "";

  responses.forEach(function (response) {
    const responseItem = document.createElement("div");
    responseItem.className = "response-item";

    responseItem.innerHTML = `
      <strong>${response.description}</strong>
      <span>
        ${response.category} · ${response.reactionTime} ms
      </span>
    `;

    responseSummary.appendChild(responseItem);
  });

  responseSummary.classList.remove("hidden");
  reviewButton.classList.add("hidden");
}
