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

const backgroundScreen = document.getElementById("background-screen");
const backgroundForm = document.getElementById("background-form");
const backgroundError = document.getElementById("background-error");
const socialMediaOtherCheckbox = document.getElementById("social-media-other-checkbox");
const socialMediaOtherInput = document.getElementById("social-media-other");
const contentOtherCheckbox = document.getElementById("content-other-checkbox");
const contentOtherInput = document.getElementById("content-other");


const partOneIntro = document.getElementById("part-one-intro");
const beginPartOneButton = document.getElementById("begin-part-one-button");
const partOneScreen = document.getElementById("part-one-screen");

const partTwoIntro = document.getElementById("part-two-intro");
const partTwoScreen = document.getElementById("part-two-screen");

const partThreeIntro =
  document.getElementById("part-three-intro");
const partThreeScreen =
  document.getElementById("part-three-screen");

const partFourIntro =
  document.getElementById("part-four-intro");
const partFourScreen =
  document.getElementById("part-four-screen");

const partFiveIntro =
  document.getElementById("part-five-intro");
const partFiveScreen =
  document.getElementById("part-five-screen");

const partSixIntro =
  document.getElementById("part-six-intro");
const partSixScreen =
  document.getElementById("part-six-screen");
const partSixCompletion =
  document.getElementById("part-six-completion");

const beginPartFiveButton =
  document.getElementById("begin-part-five-button");
const beginPartSixButton =
  document.getElementById("begin-part-six-button");

const partFiveProgress =
  document.getElementById("part-five-progress");
const partFiveStimulus =
  document.getElementById("part-five-stimulus");
const partFiveError =
  document.getElementById("part-five-error");

const partSixProgress =
  document.getElementById("part-six-progress");
const partSixStimulus =
  document.getElementById("part-six-stimulus");
const partSixError =
  document.getElementById("part-six-error");

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

let partFiveTrials = [];
let partFiveResponses = [];

let partSixTrials = [];
let partSixResponses = [];

startButton.addEventListener(
  "click",
  showBackgroundForm
);

backgroundForm.addEventListener(
  "submit",
  saveBackgroundInformation
);

socialMediaOtherCheckbox.addEventListener(
  "change",
  function () {
    socialMediaOtherInput.disabled =
      !socialMediaOtherCheckbox.checked;

    socialMediaOtherInput.required =
      socialMediaOtherCheckbox.checked;

    if (!socialMediaOtherCheckbox.checked) {
      socialMediaOtherInput.value = "";
    }
  }
);

contentOtherCheckbox.addEventListener(
  "change",
  function () {
    contentOtherInput.disabled =
      !contentOtherCheckbox.checked;

    contentOtherInput.required =
      contentOtherCheckbox.checked;

    if (!contentOtherCheckbox.checked) {
      contentOtherInput.value = "";
    }
  }
);

startButton.addEventListener(
  "click",
  showBackgroundForm
);
backgroundForm.addEventListener(
  "submit",
  saveBackgroundInformation
);
beginPartOneButton.addEventListener(
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

beginPartFiveButton.addEventListener(
  "click",
  startPartFive
);

beginPartSixButton.addEventListener(
  "click",
  startPartSix
);

window.addEventListener(
  "keydown",
  handleKeyPress,
  true
);

function showBackgroundForm() {
  introScreen.classList.add("hidden");
  backgroundScreen.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function saveBackgroundInformation(event) {
  event.preventDefault();

  const formData = new FormData(backgroundForm);

  const socialMediaPlatforms =
    formData.getAll("socialMediaPlatforms");

  const contentPreferences =
    formData.getAll("contentPreferences");

  if (socialMediaPlatforms.length === 0) {
    showBackgroundError(
      "Please select at least one social media platform."
    );
    return;
  }

  if (contentPreferences.length === 0) {
    showBackgroundError(
      "Please select at least one content preference."
    );
    return;
  }

  const participantBackground = {
    age: Number(formData.get("age")),
    genderIdentity:
      formData.get("genderIdentity"),
    transgenderIdentity:
      formData.get("transgenderIdentity"),
    socialMediaPlatforms:
      socialMediaPlatforms,
    socialMediaOther:
      formData.get("socialMediaOther") || null,
    dailySocialMediaTime:
      formData.get("dailySocialMediaTime"),
    contentPreferences:
      contentPreferences,
    contentPreferenceOther:
      formData.get("contentPreferenceOther") || null
  };

  sessionStorage.setItem(
    "participantBackground",
    JSON.stringify(participantBackground)
  );

  backgroundError.classList.add("hidden");
  backgroundError.textContent = "";

  backgroundScreen.classList.add("hidden");

  showPartOneIntro();
}

function showBackgroundError(message) {
  backgroundError.textContent = message;
  backgroundError.classList.remove("hidden");

  backgroundError.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function showPartOneIntro() {
  activePart = 0;

  backgroundScreen.classList.add("hidden");
  partOneIntro.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function startPartOne() {
  introScreen.classList.add("hidden");
  partOneIntro.classList.add("hidden");
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
  backgroundScreen &&
  !backgroundScreen.classList.contains("hidden")
  ) {
    return;
  }
  
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
  return;
  }

  if (activePart === 5) {
  checkPartFiveResponse(pressedE);
  return;
  }

  if (activePart === 6) {
  checkPartSixResponse(pressedE);
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
  partFiveIntro.classList.remove("hidden");

  sessionStorage.setItem(
    "partFourResponses",
    JSON.stringify(partFourResponses)
  );
}

function buildReversedTrials(itemsPerType) {
  const genderTrials = shuffleArray(genderResponses)
    .slice(0, itemsPerType)
    .map(function (response) {
      return {
        text: response.description,
        stimulusType: "Gender description",
        category: response.category,
        correctKey:
          response.category === "Femininity" ? "E" : "I"
      };
    });

  const consequenceTrials = shuffleArray(consequenceStimuli)
    .slice(0, itemsPerType)
    .map(function (stimulus) {
      return {
        text: stimulus.text,
        stimulusType: "Social consequence",
        category: stimulus.category,
        correctKey:
          stimulus.category === "Rewarded" ? "E" : "I"
      };
    });

  return shuffleArray([
    ...genderTrials,
    ...consequenceTrials
  ]);
}

function startPartFive() {
  partFiveIntro.classList.add("hidden");
  partFiveScreen.classList.remove("hidden");

  activePart = 5;
  currentTrial = 0;
  currentErrorCount = 0;
  partFiveResponses = [];

  // Four gender descriptions + four social consequences.
  partFiveTrials = buildReversedTrials(4);

  showPartFiveTrial();
}

function showPartFiveTrial() {
  partFiveError.classList.add("hidden");

  partFiveProgress.textContent =
    `Item ${currentTrial + 1} of ${partFiveTrials.length}`;

  partFiveStimulus.textContent =
    partFiveTrials[currentTrial].text;

  currentErrorCount = 0;
  trialStartTime = performance.now();
}

function checkPartFiveResponse(pressedE) {
  const selectedKey = pressedE ? "E" : "I";
  const currentStimulus = partFiveTrials[currentTrial];

  if (selectedKey !== currentStimulus.correctKey) {
    currentErrorCount++;
    partFiveError.classList.remove("hidden");
    return;
  }

  const reactionTime = Math.round(
    performance.now() - trialStartTime
  );

  partFiveResponses.push({
    description: currentStimulus.text,
    stimulusType: currentStimulus.stimulusType,
    category: currentStimulus.category,
    selectedKey: selectedKey,
    reactionTime: reactionTime,
    errors: currentErrorCount
  });

  currentTrial++;

  if (currentTrial < partFiveTrials.length) {
    showPartFiveTrial();
  } else {
    finishPartFive();
  }
}

function finishPartFive() {
  activePart = 0;

  partFiveScreen.classList.add("hidden");
  partSixIntro.classList.remove("hidden");

  sessionStorage.setItem(
    "partFiveResponses",
    JSON.stringify(partFiveResponses)
  );
}

function startPartSix() {
  partSixIntro.classList.add("hidden");
  partSixScreen.classList.remove("hidden");

  activePart = 6;
  currentTrial = 0;
  currentErrorCount = 0;
  partSixResponses = [];

  // Eight gender descriptions + eight social consequences.
  partSixTrials = buildReversedTrials(8);

  showPartSixTrial();
}

function showPartSixTrial() {
  partSixError.classList.add("hidden");

  partSixProgress.textContent =
    `Item ${currentTrial + 1} of ${partSixTrials.length}`;

  partSixStimulus.textContent =
    partSixTrials[currentTrial].text;

  currentErrorCount = 0;
  trialStartTime = performance.now();
}

function checkPartSixResponse(pressedE) {
  const selectedKey = pressedE ? "E" : "I";
  const currentStimulus = partSixTrials[currentTrial];

  if (selectedKey !== currentStimulus.correctKey) {
    currentErrorCount++;
    partSixError.classList.remove("hidden");
    return;
  }

  const reactionTime = Math.round(
    performance.now() - trialStartTime
  );

  partSixResponses.push({
    description: currentStimulus.text,
    stimulusType: currentStimulus.stimulusType,
    category: currentStimulus.category,
    selectedKey: selectedKey,
    reactionTime: reactionTime,
    errors: currentErrorCount
  });

  currentTrial++;

  if (currentTrial < partSixTrials.length) {
    showPartSixTrial();
  } else {
    finishPartSix();
  }
}

function finishPartSix() {
  activePart = 0;

  partSixScreen.classList.add("hidden");
  partSixCompletion.classList.remove("hidden");

  sessionStorage.setItem(
    "partSixResponses",
    JSON.stringify(partSixResponses)
  );
}
