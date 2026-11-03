const genderStimuli = [
  "Financially supports a partner",
  "Tends to ask others for emotional reassurance",
  "Takes the lead in decision-making",
  "Prioritizes more caregiving responsibilities",
  "Feels comfortable admitting feeling afraid",
  "Allows a partner to take more control",
  "Compromises more career advancement for family",
  "Tends to solve personal problems independently"
];

const consequenceStimuli = [
  {
    text: "Receives public praise",
    category: "Rewarded"
  },
  {
    text: "Is mocked by peers",
    category: "Penalized"
  },
  {
    text: "Gains respect from others",
    category: "Rewarded"
  },
  {
    text: "Is excluded from leadership",
    category: "Penalized"
  },
  {
    text: "Is portrayed positively by the media",
    category: "Rewarded"
  },
  {
    text: "Is portrayed negatively by the media",
    category: "Penalized"
  },
  {
    text: "Gains influence within a group",
    category: "Rewarded"
  },
  {
    text: "Is judged as incompetent",
    category: "Penalized"
  }
];

const introScreen = document.getElementById("intro-screen");
const partOneScreen = document.getElementById("part-one-screen");
const partOneCompletion =
  document.getElementById("part-one-completion");

const partTwoIntro = document.getElementById("part-two-intro");
const partTwoScreen = document.getElementById("part-two-screen");
const partTwoCompletion =
  document.getElementById("part-two-completion");

const startButton = document.getElementById("start-button");
const partTwoButton = document.getElementById("part-two-button");
const beginPartTwoButton =
  document.getElementById("begin-part-two-button");

const partOneProgress =
  document.getElementById("part-one-progress");
const partOneStimulus =
  document.getElementById("part-one-stimulus");

const partTwoProgress =
  document.getElementById("part-two-progress");
const partTwoStimulus =
  document.getElementById("part-two-stimulus");

const errorMark = document.getElementById("error-mark");
const partTwoSummary =
  document.getElementById("part-two-summary");

let activePart = 0;
let currentTrial = 0;
let trialStartTime = 0;

let genderResponses = [];
let consequenceResponses = [];
let currentErrorCount = 0;

startButton.addEventListener("click", startPartOne);

partTwoButton.addEventListener("click", showPartTwoIntro);

beginPartTwoButton.addEventListener(
  "click",
  startPartTwo
);

window.addEventListener("keydown", handleKeyPress, true);

function startPartOne() {
  introScreen.classList.add("hidden");
  partOneScreen.classList.remove("hidden");

  activePart = 1;
  currentTrial = 0;
  genderResponses = [];

  showPartOneTrial();
}

function showPartOneTrial() {
  partOneProgress.textContent =
    `Description ${currentTrial + 1} of ${genderStimuli.length}`;

  partOneStimulus.textContent =
    genderStimuli[currentTrial];

  trialStartTime = performance.now();
}

function finishPartOne() {
  activePart = 0;

  partOneScreen.classList.add("hidden");
  partOneCompletion.classList.remove("hidden");

  sessionStorage.setItem(
    "genderClassifications",
    JSON.stringify(genderResponses)
  );
}

function showPartTwoIntro() {
  partOneCompletion.classList.add("hidden");
  partTwoIntro.classList.remove("hidden");
}

function startPartTwo() {
  partTwoIntro.classList.add("hidden");
  partTwoScreen.classList.remove("hidden");

  activePart = 2;
  currentTrial = 0;
  consequenceResponses = [];
  currentErrorCount = 0;

  showPartTwoTrial();
}

function showPartTwoTrial() {
  errorMark.classList.add("hidden");

  partTwoProgress.textContent =
    `Consequence ${currentTrial + 1} of ${consequenceStimuli.length}`;

  partTwoStimulus.textContent =
    consequenceStimuli[currentTrial].text;

  currentErrorCount = 0;
  trialStartTime = performance.now();
}

function handleKeyPress(event) {
  if (activePart === 0 || event.repeat) {
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

  if (activePart === 1) {
    recordPartOneResponse(pressedE);
  }

  if (activePart === 2) {
    checkPartTwoResponse(pressedE);
  }
}

function recordPartOneResponse(pressedE) {
  const reactionTime = Math.round(
    performance.now() - trialStartTime
  );

  const selectedCategory = pressedE
    ? "Masculinity"
    : "Femininity";

  genderResponses.push({
    description: genderStimuli[currentTrial],
    category: selectedCategory,
    reactionTime: reactionTime
  });

  currentTrial++;

  if (currentTrial < genderStimuli.length) {
    showPartOneTrial();
  } else {
    finishPartOne();
  }
}

function checkPartTwoResponse(pressedE) {
  const selectedCategory = pressedE
    ? "Rewarded"
    : "Penalized";

  const correctCategory =
    consequenceStimuli[currentTrial].category;

  if (selectedCategory !== correctCategory) {
    currentErrorCount++;
    errorMark.classList.remove("hidden");
    return;
  }

  const reactionTime = Math.round(
    performance.now() - trialStartTime
  );

  consequenceResponses.push({
    description: consequenceStimuli[currentTrial].text,
    category: correctCategory,
    reactionTime: reactionTime,
    errors: currentErrorCount
  });

  currentTrial++;

  if (currentTrial < consequenceStimuli.length) {
    showPartTwoTrial();
  } else {
    finishPartTwo();
  }
}

function finishPartTwo() {
  activePart = 0;

  partTwoScreen.classList.add("hidden");
  partTwoCompletion.classList.remove("hidden");

  sessionStorage.setItem(
    "socialConsequences",
    JSON.stringify(consequenceResponses)
  );

  const totalErrors = consequenceResponses.reduce(
    function (sum, response) {
      return sum + response.errors;
    }
  )
}
