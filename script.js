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

const partThreeIntro =
  document.getElementById("part-three-intro");
const partThreeScreen =
  document.getElementById("part-three-screen");
const partThreeCompletion =
  document.getElementById("part-three-completion");

const partFourIntro =
  document.getElementById("part-four-intro");
const partFourScreen =
  document.getElementById("part-four-screen");
const partFourCompletion =
  document.getElementById("part-four-completion");

const startButton = document.getElementById("start-button");
const partTwoButton = document.getElementById("part-two-button");
const beginPartTwoButton =
  document.getElementById("begin-part-two-button");
const partThreeButton =
  document.getElementById("part-three-button");
const beginPartThreeButton =
  document.getElementById("begin-part-three-button");

const partFourButton =
  document.getElementById("part-four-button");
const beginPartFourButton =
  document.getElementById("begin-part-four-button");

const partOneProgress =
  document.getElementById("part-one-progress");
const partOneStimulus =
  document.getElementById("part-one-stimulus");

const partTwoProgress =
  document.getElementById("part-two-progress");
const partTwoStimulus =
  document.getElementById("part-two-stimulus");

const errorMark = document.getElementById("error-mark");

const partThreeProgress =
  document.getElementById("part-three-progress");
const partThreeStimulus =
  document.getElementById("part-three-stimulus");
const partThreeError =
  document.getElementById("part-three-error");

const partFourProgress =
  document.getElementById("part-four-progress");
const partFourStimulus =
  document.getElementById("part-four-stimulus");
const partFourError =
  document.getElementById("part-four-error");

let activePart = 0;
let currentTrial = 0;
let trialStartTime = 0;

let genderResponses = [];
let consequenceResponses = [];
let currentErrorCount = 0;

let genderTrialStimuli = [];
let consequenceTrialStimuli = [];

let partThreeTrials = [];
let partThreeResponses = [];

let partFourTrials = [];
let partFourResponses = [];

startButton.addEventListener(
  "click",
  startPartOne
);

beginPartTwoButton.addEventListener(
  "click",
  startPartTwo
);

beginPartThreeButton.addEventListener(
  "click",
  startPartThree
);

beginPartFourButton.addEventListener(
  "click",
  startPartFour
);

window.addEventListener(
  "keydown",
  handleKeyPress,
  true
);

window.addEventListener("keydown", handleKeyPress, true);

function startPartOne() {
  introScreen.classList.add("hidden");
  partOneScreen.classList.remove("hidden");

  activePart = 1;
  currentTrial = 0;
  genderResponses = [];

  genderTrialStimuli = shuffleArray(genderStimuli);

  showPartOneTrial();
}

function showPartOneTrial() {
  partOneProgress.textContent =
    `Description ${currentTrial + 1} of ${genderTrialStimuli.length}`;

  partOneStimulus.textContent =
    genderTrialStimuli[currentTrial];

  trialStartTime = performance.now();
}

function finishPartOne() {
  activePart = 0;

  partOneScreen.classList.add("hidden");
  partTwoIntro.classList.remove("hidden");

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

  consequenceTrialStimuli = shuffleArray(consequenceStimuli);

  showPartTwoTrial();
}

function showPartTwoTrial() {
  errorMark.classList.add("hidden");

  partTwoProgress.textContent =
    `Consequence ${currentTrial + 1} of ${consequenceTrialStimuli.length}`;

  partTwoStimulus.textContent =
    consequenceTrialStimuli[currentTrial].text;

  currentErrorCount = 0;
  trialStartTime = performance.now();
}

function handleKeyPress(event) {
  if (
    activePart === 0 &&
    event.code === "Space" &&
    !event.repeat
  ) {
    event.preventDefault();

    const visibleBeginButton = Array.from(
      document.querySelectorAll(".begin-button")
    ).find(function (button) {
      return !button.closest("section").classList.contains("hidden");
    });

    if (visibleBeginButton) {
      visibleBeginButton.click();
    }

    return;
  }

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
    return;
  }

  if (activePart === 2) {
    checkPartTwoResponse(pressedE);
    return;
  }

  if (activePart === 3) {
  checkPartThreeResponse(pressedE);
  return;
  }
  if (activePart === 4) {
  checkPartFourResponse(pressedE);
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
    description: genderTrialStimuli[currentTrial],
    category: selectedCategory,
    reactionTime: reactionTime
  });

  currentTrial++;

  if (currentTrial < genderTrialStimuli.length) {
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
    consequenceTrialStimuli[currentTrial].category;

  if (selectedCategory !== correctCategory) {
    currentErrorCount++;
    errorMark.classList.remove("hidden");
    return;
  }

  const reactionTime = Math.round(
    performance.now() - trialStartTime
  );

  consequenceResponses.push({
    description: consequenceTrialStimuli[currentTrial].text,
    category: correctCategory,
    reactionTime: reactionTime,
    errors: currentErrorCount
  });

  currentTrial++;

  if (currentTrial < consequenceTrialStimuli.length) {
    showPartTwoTrial();
  } else {
    finishPartTwo();
  }
}

function finishPartTwo() {
  activePart = 0;

  partTwoScreen.classList.add("hidden");
  partThreeIntro.classList.remove("hidden");

  sessionStorage.setItem(
    "socialConsequences",
    JSON.stringify(consequenceResponses)
  );
}

function shuffleArray(originalArray) {
  const shuffledArray = [...originalArray];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(
      Math.random() * (i + 1)
    );

    [shuffledArray[i], shuffledArray[randomIndex]] =
      [shuffledArray[randomIndex], shuffledArray[i]];
  }

  return shuffledArray;
}

function showPartThreeIntro() {
  partTwoCompletion.classList.add("hidden");
  partThreeIntro.classList.remove("hidden");
}

function startPartThree() {
  partThreeIntro.classList.add("hidden");
  partThreeScreen.classList.remove("hidden");

  activePart = 3;
  currentTrial = 0;
  currentErrorCount = 0;
  partThreeResponses = [];

  const genderTrials = shuffleArray(genderResponses)
  .slice(0, 4)
  .map(function (response) {
    return {
      text: response.description,
      stimulusType: "Gender description",
      category: response.category,
      correctKey:
        response.category === "Masculinity" ? "E" : "I"
    };
  });

const consequenceTrials = shuffleArray(consequenceStimuli)
  .slice(0, 4)
  .map(function (stimulus) {
    return {
      text: stimulus.text,
      stimulusType: "Social consequence",
      category: stimulus.category,
      correctKey:
        stimulus.category === "Rewarded" ? "E" : "I"
    };
  });

partThreeTrials = shuffleArray([
  ...genderTrials,
  ...consequenceTrials
]);

  showPartThreeTrial();
}

function showPartThreeTrial() {
  partThreeError.classList.add("hidden");

  partThreeProgress.textContent =
    `Item ${currentTrial + 1} of ${partThreeTrials.length}`;

  partThreeStimulus.textContent =
    partThreeTrials[currentTrial].text;

  currentErrorCount = 0;
  trialStartTime = performance.now();
}

function checkPartThreeResponse(pressedE) {
  const selectedKey = pressedE ? "E" : "I";

  const currentStimulus =
    partThreeTrials[currentTrial];

  if (selectedKey !== currentStimulus.correctKey) {
    currentErrorCount++;
    partThreeError.classList.remove("hidden");
    return;
  }

  const reactionTime = Math.round(
    performance.now() - trialStartTime
  );

  partThreeResponses.push({
    description: currentStimulus.text,
    stimulusType: currentStimulus.stimulusType,
    category: currentStimulus.category,
    selectedKey: selectedKey,
    reactionTime: reactionTime,
    errors: currentErrorCount
  });

  currentTrial++;

  if (currentTrial < partThreeTrials.length) {
    showPartThreeTrial();
  } else {
    finishPartThree();
  }
}

function finishPartThree() {
  activePart = 0;

  partThreeScreen.classList.add("hidden");
  partFourIntro.classList.remove("hidden");

  sessionStorage.setItem(
    "partThreeResponses",
    JSON.stringify(partThreeResponses)
  );
}

function showPartFourIntro() {
  partThreeCompletion.classList.add("hidden");
  partFourIntro.classList.remove("hidden");
}

function startPartFour() {
  partFourIntro.classList.add("hidden");
  partFourScreen.classList.remove("hidden");

  activePart = 4;
  currentTrial = 0;
  currentErrorCount = 0;
  partFourResponses = [];

  const genderTrials = genderResponses.map(
    function (response) {
      return {
        text: response.description,
        stimulusType: "Gender description",
        category: response.category,
        correctKey:
          response.category === "Masculinity" ? "E" : "I"
      };
    }
  );

  const consequenceTrials = consequenceStimuli.map(
    function (stimulus) {
      return {
        text: stimulus.text,
        stimulusType: "Social consequence",
        category: stimulus.category,
        correctKey:
          stimulus.category === "Rewarded" ? "E" : "I"
      };
    }
  );

  partFourTrials = shuffleArray([
    ...genderTrials,
    ...consequenceTrials
  ]);

  showPartFourTrial();
}

function showPartFourTrial() {
  partFourError.classList.add("hidden");

  partFourProgress.textContent =
    `Item ${currentTrial + 1} of ${partFourTrials.length}`;

  partFourStimulus.textContent =
    partFourTrials[currentTrial].text;

  currentErrorCount = 0;
  trialStartTime = performance.now();
}

function checkPartFourResponse(pressedE) {
  const selectedKey = pressedE ? "E" : "I";
  const currentStimulus = partFourTrials[currentTrial];

  if (selectedKey !== currentStimulus.correctKey) {
    currentErrorCount++;
    partFourError.classList.remove("hidden");
    return;
  }

  const reactionTime = Math.round(
    performance.now() - trialStartTime
  );

  partFourResponses.push({
    description: currentStimulus.text,
    stimulusType: currentStimulus.stimulusType,
    category: currentStimulus.category,
    selectedKey: selectedKey,
    reactionTime: reactionTime,
    errors: currentErrorCount
  });

  currentTrial++;

  if (currentTrial < partFourTrials.length) {
    showPartFourTrial();
  } else {
    finishPartFour();
  }
}

function finishPartFour() {
  activePart = 0;

  partFourScreen.classList.add("hidden");
  partFourCompletion.classList.remove("hidden");

  sessionStorage.setItem(
    "partFourResponses",
    JSON.stringify(partFourResponses)
  );
}

