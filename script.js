const APP_CONFIG = {
  // false：完全不傳資料
  // true：傳送至 Supabase
  saveToSupabase: true,

  // 測試寫入時使用 true
  // 正式公開時改成 false
  isTestSubmission: true,

  supabaseUrl: "https://kdftqgixzjdwpxiuanjd.supabase.co",
  supabasePublishableKey: "sb_publishable_yuL8A3mMfix6uDPmO1yNUQ_PWBZXYHO"
};

function getOrCreateSessionId() {
  let sessionId =
    sessionStorage.getItem("testSessionId");

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    sessionStorage.setItem(
      "testSessionId",
      sessionId
    );
  }

  return sessionId;
}

const genderStimuli = [
  "Financially supports a household",
  "Takes the lead in decision-making",
  "Prioritizes career advancement",
  "Solves personal problems independently",
  
  "Lets a partner take the lead",
  "Seeks emotional reassurance",
  "Prioritizes caregiving responsibilities",
  "Expressing uneasy feelings openly"
];

const consequenceStimuli = [
  {
    text: "Publicly praised",
    category: "Rewarded"
  },
  {
    text: "Mocked",
    category: "Penalized"
  },
  {
    text: "Respected",
    category: "Rewarded"
  },
  {
    text: "Excluded from leadership",
    category: "Penalized"
  },
  {
    text: "Positively portrayed",
    category: "Rewarded"
  },
  {
    text: "Negatively portrayed",
    category: "Penalized"
  },
  {
    text: "Promoted to leadership",
    category: "Rewarded"
  },
  {
    text: "Judged incompetent",
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


const resultsScreen =
  document.getElementById("results-screen");


const personalPatternText =
  document.getElementById("personal-pattern-text");
const pairingDifferenceGrid =
  document.getElementById("pairing-difference-grid");

const masculinityMapping =
  document.getElementById("masculinity-mapping");
const femininityMapping =
  document.getElementById("femininity-mapping");


const viewMoreResultsButton =
  document.getElementById("view-more-results-button");

const additionalResults =
  document.getElementById("additional-results");

const classificationFactorSelect =
  document.getElementById("classification-factor-select");
const collectiveFactorSelect =
  document.getElementById("collective-factor-select");


const masculinityRewardedBar =
  document.getElementById("masculinity-rewarded-bar");

const masculinityPenalizedBar =
  document.getElementById("masculinity-penalized-bar");

const femininityRewardedBar =
  document.getElementById("femininity-rewarded-bar");

const femininityPenalizedBar =
  document.getElementById("femininity-penalized-bar");

const masculinityRewardedValue =
  document.getElementById("masculinity-rewarded-value");

const masculinityPenalizedValue =
  document.getElementById("masculinity-penalized-value");

const femininityRewardedValue =
  document.getElementById("femininity-rewarded-value");

const femininityPenalizedValue =
  document.getElementById("femininity-penalized-value");

const masculinityRewardedErrors =
  document.getElementById("masculinity-rewarded-errors");

const masculinityPenalizedErrors =
  document.getElementById("masculinity-penalized-errors");

const femininityRewardedErrors =
  document.getElementById("femininity-rewarded-errors");

const femininityPenalizedErrors =
  document.getElementById("femininity-penalized-errors");

const collectiveClassificationChart =
  document.getElementById(
    "collective-classification-chart"
  );

let collectiveClassificationData = [];

const overallPatternChart =
  document.getElementById("overall-pattern-chart");
const distributionChart =
  document.getElementById("distribution-chart");


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


viewMoreResultsButton.addEventListener(
  "click",
  toggleAdditionalResults
);

function toggleAdditionalResults() {
  const isHidden =
    additionalResults.classList.contains("hidden");

  additionalResults.classList.toggle("hidden");

  viewMoreResultsButton.textContent =
    isHidden ? "Hide details" : "View more details";

  viewMoreResultsButton.setAttribute(
    "aria-expanded",
    String(isHidden)
  );
}


classificationFactorSelect.addEventListener(
  "change",
  function () {
    loadCollectiveClassificationOverview();
  }
);


function showBackgroundForm() {
  const newSessionId = crypto.randomUUID();

  sessionStorage.setItem(
    "testSessionId",
    newSessionId
  );

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

async function finishPartSix() {
  activePart = 0;

  partSixScreen.classList.add("hidden");

  sessionStorage.setItem(
    "partSixResponses",
    JSON.stringify(partSixResponses)
  );

  const completeResult = buildCompleteResult();

  sessionStorage.setItem(
    "completeTestResult",
    JSON.stringify(completeResult)
  );

  if (APP_CONFIG.saveToSupabase) {
    try {
      await saveResultToSupabase(completeResult);

      console.info(
        "The completed result was saved to Supabase."
      );
    } catch (error) {
      console.error(error);

      /*
        The result page still opens if saving fails.
        The participant should not lose the completed result
        because of a database connection problem.
      */
    }
  } else {
    console.info(
      "Test mode: this result was not saved to Supabase.",
      completeResult
    );
  }

  showResultsPage(completeResult);
}


const demographicFactorOptions = [
  {
    value: "all",
    label: "All participants"
  },
  {
    value: "age",
    label: "Age"
  },
  {
    value: "genderIdentity",
    label: "Gender identity"
  },
  {
    value: "transgenderIdentity",
    label: "Transgender identity"
  }
];

const mediaFactorOptions = [
  {
    value: "socialMediaPlatforms",
    label: "Social media platforms"
  },
  {
    value: "dailySocialMediaTime",
    label: "Daily social media time"
  },
  {
    value: "contentPreferences",
    label: "Content preferences"
  }
];

document
  .querySelectorAll(".filter-toggle")
  .forEach(function (button) {
    button.addEventListener("click", function () {
      activateToggle(
        ".filter-toggle",
        button
      );

      updateFactorSelect(
        classificationFactorSelect,
        button.dataset.module
      );
    });
  });

document
  .querySelectorAll(".collective-toggle")
  .forEach(function (button) {
    button.addEventListener("click", function () {
      activateToggle(
        ".collective-toggle",
        button
      );

      updateFactorSelect(
        collectiveFactorSelect,
        button.dataset.module
      );
    });
  });

function activateToggle(selector, selectedButton) {
  document
    .querySelectorAll(selector)
    .forEach(function (button) {
      button.classList.remove("active");
    });

  selectedButton.classList.add("active");
}

function updateFactorSelect(selectElement, moduleName) {
  const options =
    moduleName === "media"
      ? mediaFactorOptions
      : demographicFactorOptions;

  selectElement.innerHTML = "";

  options.forEach(function (option) {
    const optionElement =
      document.createElement("option");

    optionElement.value = option.value;
    optionElement.textContent = option.label;

    selectElement.appendChild(optionElement);
  });
}


function calculateMedian(values) {
  if (values.length === 0) {
    return 0;
  }

  const sortedValues = [...values].sort(
    function (a, b) {
      return a - b;
    }
  );

  const middleIndex =
    Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return Math.round(
      (
        sortedValues[middleIndex - 1] +
        sortedValues[middleIndex]
      ) / 2
    );
  }

  return sortedValues[middleIndex];
}

function calculateTotalErrors(responses) {
  return responses.reduce(
    function (total, response) {
      return total + (response.errors || 0);
    },
    0
  );
}

function buildCompleteResult() {
  const compatibleResponses = [
    ...partThreeResponses,
    ...partFourResponses
  ];

  const reversedResponses = [
    ...partFiveResponses,
    ...partSixResponses
  ];

  /*
    Parts 3 and 4:
    E = Masculinity + Rewarded
    I = Femininity + Penalized
  */
  const masculinityRewardedResponses =
    compatibleResponses.filter(
      function (response) {
        return response.selectedKey === "E";
      }
    );

  const femininityPenalizedResponses =
    compatibleResponses.filter(
      function (response) {
        return response.selectedKey === "I";
      }
    );

  /*
    Parts 5 and 6:
    E = Femininity + Rewarded
    I = Masculinity + Penalized
  */
  const femininityRewardedResponses =
    reversedResponses.filter(
      function (response) {
        return response.selectedKey === "E";
      }
    );

  const masculinityPenalizedResponses =
    reversedResponses.filter(
      function (response) {
        return response.selectedKey === "I";
      }
    );

  const compatibleMedian = calculateMedian(
    compatibleResponses.map(
      function (response) {
        return response.reactionTime;
      }
    )
  );

  const reversedMedian = calculateMedian(
    reversedResponses.map(
      function (response) {
        return response.reactionTime;
      }
    )
  );

  const masculinityRewardedMedian =
    calculateMedian(
      masculinityRewardedResponses.map(
        function (response) {
          return response.reactionTime;
        }
      )
    );

  const masculinityPenalizedMedian =
    calculateMedian(
      masculinityPenalizedResponses.map(
        function (response) {
          return response.reactionTime;
        }
      )
    );

  const femininityRewardedMedian =
    calculateMedian(
      femininityRewardedResponses.map(
        function (response) {
          return response.reactionTime;
        }
      )
    );

  const femininityPenalizedMedian =
    calculateMedian(
      femininityPenalizedResponses.map(
        function (response) {
          return response.reactionTime;
        }
      )
    );

  const participantBackground = JSON.parse(
    sessionStorage.getItem("participantBackground") || "{}"
  );

  return {
    participantBackground: participantBackground,

    partOneResponses: genderResponses,
    partTwoResponses: consequenceResponses,
    partThreeResponses: partThreeResponses,
    partFourResponses: partFourResponses,
    partFiveResponses: partFiveResponses,
    partSixResponses: partSixResponses,

    finalResult: {
      compatibleMedian: compatibleMedian,
      reversedMedian: reversedMedian,

      masculinityRewardedMedian:
        masculinityRewardedMedian,

      masculinityPenalizedMedian:
        masculinityPenalizedMedian,

      femininityRewardedMedian:
        femininityRewardedMedian,

      femininityPenalizedMedian:
        femininityPenalizedMedian,

      masculinityRewardedErrors:
        calculateTotalErrors(
          masculinityRewardedResponses
        ),

      masculinityPenalizedErrors:
        calculateTotalErrors(
          masculinityPenalizedResponses
        ),

      femininityRewardedErrors:
        calculateTotalErrors(
          femininityRewardedResponses
        ),

      femininityPenalizedErrors:
        calculateTotalErrors(
          femininityPenalizedResponses
        )
    }
  };
}


function showResultsPage(completeResult) {
  const result = completeResult.finalResult;
  
  document.body.classList.add("results-active");

  resultsScreen.classList.remove("hidden");

  const pairingMedians = [
    result.masculinityRewardedMedian,
    result.masculinityPenalizedMedian,
    result.femininityRewardedMedian,
    result.femininityPenalizedMedian
  ];

  const longestResponseTime = Math.max(
    ...pairingMedians,
    1
  );

  setResponseBar(
    masculinityRewardedBar,
    masculinityRewardedValue,
    result.masculinityRewardedMedian,
    longestResponseTime
  );

  setResponseBar(
    masculinityPenalizedBar,
    masculinityPenalizedValue,
    result.masculinityPenalizedMedian,
    longestResponseTime
  );

  setResponseBar(
    femininityRewardedBar,
    femininityRewardedValue,
    result.femininityRewardedMedian,
    longestResponseTime
  );

  setResponseBar(
    femininityPenalizedBar,
    femininityPenalizedValue,
    result.femininityPenalizedMedian,
    longestResponseTime
  );

  renderPairingDifferences(result);
  renderPersonalPatternExplanation(result);
  
  loadOverallPairingPattern();
  
  loadPairingDifferenceDistribution(
    result
  );

  loadCollectiveClassificationOverview();

  async function loadCollectiveClassificationOverview() {
  collectiveClassificationChart.innerHTML = `
    <p>Loading classification results...</p>
  `;

  const selectedFactor =
    classificationFactorSelect.value;

  try {
    const response = await fetch(
      APP_CONFIG.supabaseUrl +
        "/rest/v1/rpc/get_collective_gender_classification",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "apikey":
            APP_CONFIG.supabasePublishableKey,
          "Authorization":
            "Bearer " +
            APP_CONFIG.supabasePublishableKey
        },

        body: JSON.stringify({
          p_factor: selectedFactor,

          p_include_test:
            APP_CONFIG.isTestSubmission
        })
      }
    );

    if (!response.ok) {
      const errorMessage =
        await response.text();

      throw new Error(
        "Unable to load gender classification: " +
        errorMessage
      );
    }

    const classificationData =
      await response.json();

    if (
      !classificationData ||
      classificationData.length === 0
    ) {
      collectiveClassificationChart.innerHTML = `
        <p>
          No classification results are available
          for this factor.
        </p>
      `;

      return;
    }

    collectiveClassificationChart.classList.remove(
      "group-chart-placeholder"
    );

    renderGenderClassificationOverview(
      classificationData,
      selectedFactor
    );
  } catch (error) {
    console.error(error);

    collectiveClassificationChart.innerHTML = `
      <p>
        Classification results are temporarily unavailable.
      </p>
    `;
  }
}



  if (moduleName === "genderClassification") {
    renderGenderClassificationOverview(
      moduleData
    );

    return;
  }

  if (moduleName === "socialConsequence") {
    renderSocialConsequenceOverview(
      moduleData
    );

    return;
  }

  renderCrossClassificationOverview(
    moduleData
  );
}


function renderGenderClassificationOverview(
  data,
  selectedFactor
) {
  const groupedResults = {};

  data.forEach(function (item) {
    const factorGroup =
      item.factor_group;

    if (!groupedResults[factorGroup]) {
      groupedResults[factorGroup] = {
        groupSize: Number(item.group_size),
        items: {}
      };
    }

    if (
      !groupedResults[factorGroup]
        .items[item.item_label]
    ) {
      groupedResults[factorGroup]
        .items[item.item_label] = {
          order: Number(item.item_order),
          masculinity: 0,
          femininity: 0
        };
    }

    if (
      item.category_label === "Masculinity"
    ) {
      groupedResults[factorGroup]
        .items[item.item_label]
        .masculinity =
          Number(item.percentage);
    }

    if (
      item.category_label === "Femininity"
    ) {
      groupedResults[factorGroup]
        .items[item.item_label]
        .femininity =
          Number(item.percentage);
    }
  });

  const factorSections =
    Object.entries(groupedResults)
      .sort(function (first, second) {
        return first[0].localeCompare(
          second[0],
          undefined,
          {
            numeric: true,
            sensitivity: "base"
          }
        );
      })
      .map(function (
        [factorGroup, groupResult]
      ) {
        const itemRows =
          Object.entries(groupResult.items)
            .sort(function (first, second) {
              return (
                first[1].order -
                second[1].order
              );
            })
            .map(function (
              [label, values]
            ) {
              return `
                <div
                  class="classification-overview-row"
                >
                  <p
                    class="classification-item-label"
                  >
                    ${label}
                  </p>

                  <div
                    class="classification-stacked-bar"
                  >
                    <div
                      class="classification-masculinity"
                      style="
                        width:
                          ${values.masculinity}%;
                      "
                    >
                      ${
                        values.masculinity > 12
                          ? values.masculinity + "%"
                          : ""
                      }
                    </div>

                    <div
                      class="classification-femininity"
                      style="
                        width:
                          ${values.femininity}%;
                      "
                    >
                      ${
                        values.femininity > 12
                          ? values.femininity + "%"
                          : ""
                      }
                    </div>
                  </div>
                </div>
              `;
            })
            .join("");

        return `
          <section
            class="classification-factor-group"
          >
            <div
              class="classification-factor-header"
            >
              <h4>${factorGroup}</h4>

              <span>
                ${groupResult.groupSize}
                participant${
                  groupResult.groupSize === 1
                    ? ""
                    : "s"
                }
              </span>
            </div>

            <div
              class="classification-overview-rows"
            >
              ${itemRows}
            </div>
          </section>
        `;
      })
      .join("");

  const overlappingGroupNote =
    selectedFactor ===
      "socialMediaPlatforms" ||
    selectedFactor ===
      "contentPreferences"
      ? `
        <p class="classification-filter-note">
          Participants may appear in more than one
          group because they could select multiple options.
        </p>
      `
      : "";

  collectiveClassificationChart.innerHTML = `
    <div class="classification-overview-legend">
      <span>
        <i class="legend-masculinity"></i>
        Masculinity
      </span>

      <span>
        <i class="legend-femininity"></i>
        Femininity
      </span>
    </div>

    <p class="classification-chart-explanation">
      Each bar shows how participants in the
      selected group classified the same
      gender-neutral description.
    </p>

    ${overlappingGroupNote}

    <div class="classification-factor-groups">
      ${factorSections}
    </div>
  `;
}
  

  masculinityRewardedErrors.textContent =
    result.masculinityRewardedErrors;

  masculinityPenalizedErrors.textContent =
    result.masculinityPenalizedErrors;

  femininityRewardedErrors.textContent =
    result.femininityRewardedErrors;

  femininityPenalizedErrors.textContent =
    result.femininityPenalizedErrors;

  renderInitialMapping(
    completeResult.partOneResponses
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function renderPairingDifferences(result) {
  const comparisons = [
    {
      title: "Masculinity: consequence difference",
      firstLabel: "Masculinity + Socially Rewarded",
      secondLabel: "Masculinity + Socially Penalized",
      firstValue: result.masculinityRewardedMedian,
      secondValue: result.masculinityPenalizedMedian
    },
    {
      title: "Femininity: consequence difference",
      firstLabel: "Femininity + Socially Rewarded",
      secondLabel: "Femininity + Socially Penalized",
      firstValue: result.femininityRewardedMedian,
      secondValue: result.femininityPenalizedMedian
    },
    {
      title: "Socially Rewarded: gender difference",
      firstLabel: "Masculinity + Socially Rewarded",
      secondLabel: "Femininity + Socially Rewarded",
      firstValue: result.masculinityRewardedMedian,
      secondValue: result.femininityRewardedMedian
    },
    {
      title: "Socially Penalized: gender difference",
      firstLabel: "Masculinity + Socially Penalized",
      secondLabel: "Femininity + Socially Penalized",
      firstValue: result.masculinityPenalizedMedian,
      secondValue: result.femininityPenalizedMedian
    }
  ];

  const calculatedComparisons =
    comparisons.map(function (comparison) {
      return {
        ...comparison,
        difference:
          comparison.firstValue -
          comparison.secondValue
      };
    });

  const largestDifference =
    calculatedComparisons.reduce(
      function (largest, current) {
        return Math.abs(current.difference) >
          Math.abs(largest.difference)
          ? current
          : largest;
      }
    );

  pairingDifferenceGrid.innerHTML = "";

  calculatedComparisons.forEach(
    function (comparison) {
      const card = document.createElement("article");

      card.className = "pairing-difference-card";

      if (comparison === largestDifference) {
        card.classList.add("largest-difference");
      }

      const signedDifference =
        comparison.difference > 0
          ? "+" + comparison.difference
          : String(comparison.difference);
      
      const differenceClass =
        comparison.difference > 0
          ? "positive-difference"
          : comparison.difference < 0
            ? "negative-difference"
            : "neutral-difference";

      card.innerHTML = `
        ${
          comparison === largestDifference
            ? `
              <p class="difference-highlight-label">
                Largest response-time difference
              </p>
            `
            : ""
        }

        <h4>${comparison.title}</h4>

        <p class="difference-pairing">
          (${comparison.firstLabel}) − (${comparison.secondLabel})
        </p>

        <p class="difference-formula">
          ${comparison.firstValue} ms −
          ${comparison.secondValue} ms =
          <strong class="${differenceClass}">
            ${signedDifference} ms
          </strong>
        </p>
      `;

      pairingDifferenceGrid.appendChild(card);
    }
  );
}


function setResponseBar(
  barElement,
  valueElement,
  responseTime,
  longestResponseTime
) {
  barElement.style.width =
    (
      responseTime /
      longestResponseTime *
      100
    ) + "%";

  valueElement.textContent =
    responseTime + " ms";
}

function renderPersonalPatternExplanation(result) {
  const similarityThreshold = 100;

  const masculinityDifference =
    result.masculinityPenalizedMedian -
    result.masculinityRewardedMedian;

  const femininityDifference =
    result.femininityPenalizedMedian -
    result.femininityRewardedMedian;

  let resultStatement = "";

  if (
    Math.abs(masculinityDifference) < similarityThreshold &&
    Math.abs(femininityDifference) < similarityThreshold
  ) {
    resultStatement =
      "Your response times were similar across the four combined pairings.";
  } else {
    const fasterMasculinityPairing =
      masculinityDifference >= 0
        ? "Socially Rewarded"
        : "Socially Penalized";

    const slowerMasculinityPairing =
      masculinityDifference >= 0
        ? "Socially Penalized"
        : "Socially Rewarded";

    const fasterFemininityPairing =
      femininityDifference >= 0
        ? "Socially Rewarded"
        : "Socially Penalized";

    const slowerFemininityPairing =
      femininityDifference >= 0
        ? "Socially Penalized"
        : "Socially Rewarded";

    resultStatement =
      "You responded faster when Masculinity was paired with " +
      fasterMasculinityPairing +
      " and Femininity with " +
      fasterFemininityPairing +
      " than when Masculinity was paired with " +
      slowerMasculinityPairing +
      " and Femininity with " +
      slowerFemininityPairing +
      ".";
  }

  personalPatternText.innerHTML = "";

  const resultParagraph = document.createElement("p");
  resultParagraph.className = "iat-result-statement";
  resultParagraph.textContent = resultStatement;

  personalPatternText.appendChild(resultParagraph);
}


function renderInitialMapping(partOneResponses) {
  masculinityMapping.innerHTML = "";
  femininityMapping.innerHTML = "";

  partOneResponses.forEach(function (response) {
    const listItem =
      document.createElement("li");

    listItem.textContent = response.description;

    if (response.category === "Masculinity") {
      masculinityMapping.appendChild(listItem);
    } else {
      femininityMapping.appendChild(listItem);
    }
  });
}

async function loadOverallPairingPattern() {
  overallPatternChart.innerHTML = `
    <p>Loading collective results...</p>
  `;

  try {
    const response = await fetch(
      APP_CONFIG.supabaseUrl +
        "/rest/v1/rpc/get_overall_pairing_pattern",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "apikey":
            APP_CONFIG.supabasePublishableKey,
          "Authorization":
            "Bearer " +
            APP_CONFIG.supabasePublishableKey
        },

        body: JSON.stringify({
          p_include_test:
            APP_CONFIG.isTestSubmission
        })
      }
    );

    if (!response.ok) {
      const errorMessage =
        await response.text();

      throw new Error(
        "Unable to load collective results: " +
        errorMessage
      );
    }

    const data = await response.json();
    const collectiveResult = data[0];

    if (
      !collectiveResult ||
      Number(collectiveResult.participant_count) === 0
    ) {
      overallPatternChart.innerHTML = `
        <p>
          Collective results will appear after
          participants complete the test.
        </p>
      `;

      return;
    }

    renderOverallPairingPattern(
      collectiveResult
    );
  } catch (error) {
    console.error(error);

    overallPatternChart.innerHTML = `
      <p>
        Collective results are temporarily unavailable.
      </p>
    `;
  }
}

async function loadPairingDifferenceDistribution(
  personalResult
) {
  distributionChart.innerHTML = `
    <p>Loading distribution...</p>
  `;

  try {
    const response = await fetch(
      APP_CONFIG.supabaseUrl +
        "/rest/v1/rpc/get_pairing_difference_distribution",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "apikey":
            APP_CONFIG.supabasePublishableKey,
          "Authorization":
            "Bearer " +
            APP_CONFIG.supabasePublishableKey
        },

        body: JSON.stringify({
          p_include_test:
            APP_CONFIG.isTestSubmission
        })
      }
    );

    if (!response.ok) {
      const errorMessage =
        await response.text();

      throw new Error(
        "Unable to load pairing distribution: " +
        errorMessage
      );
    }

    const distributionData =
      await response.json();

    if (
      !distributionData ||
      distributionData.length === 0
    ) {
      distributionChart.innerHTML = `
        <p>
          Distribution results will appear
          after participants complete the test.
        </p>
      `;

      return;
    }

    renderPairingDifferenceDistribution(
      distributionData,
      personalResult
    );
  } catch (error) {
    console.error(error);

    distributionChart.innerHTML = `
      <p>
        Distribution results are temporarily unavailable.
      </p>
    `;
  }
}


function renderPairingDifferenceDistribution(
  distributionData,
  personalResult
) {
  const personalDifferences = {
    masculinity_consequence:
      personalResult.masculinityRewardedMedian -
      personalResult.masculinityPenalizedMedian,

    femininity_consequence:
      personalResult.femininityRewardedMedian -
      personalResult.femininityPenalizedMedian,

    rewarded_gender:
      personalResult.masculinityRewardedMedian -
      personalResult.femininityRewardedMedian,

    penalized_gender:
      personalResult.masculinityPenalizedMedian -
      personalResult.femininityPenalizedMedian
  };

  const metricInformation = {
    masculinity_consequence: {
      title:
        "Masculinity paired with social consequences",
      firstPairing:
        "Socially Rewarded",
      secondPairing:
        "Socially Penalized"
    },
  
    femininity_consequence: {
      title:
        "Femininity paired with social consequences",
      firstPairing:
        "Socially Rewarded",
      secondPairing:
        "Socially Penalized"
    },
  
    rewarded_gender: {
      title:
        "Gender categories paired with Socially Rewarded",
      firstPairing:
        "Masculinity",
      secondPairing:
        "Femininity"
    },
  
    penalized_gender: {
      title:
        "Gender categories paired with Socially Penalized",
      firstPairing:
        "Masculinity",
      secondPairing:
        "Femininity"
    }
  };

  const preferredOrder = [
    "masculinity_consequence",
    "femininity_consequence",
    "rewarded_gender",
    "penalized_gender"
  ];

  const dataByMetric = {};

  distributionData.forEach(function (item) {
    dataByMetric[item.metric] = item;
  });

  const distributionRows = preferredOrder
    .filter(function (metric) {
      return dataByMetric[metric];
    })
    .map(function (metric) {
      const item = dataByMetric[metric];

      const minimum = Number(item.minimum);
      const lowerQuartile =
        Number(item.lower_quartile);
      const median = Number(item.median);
      const upperQuartile =
        Number(item.upper_quartile);
      const maximum = Number(item.maximum);

      const personalValue =
        personalDifferences[metric];

      /*
        Include zero and the current participant
        within the visible chart range.
      */
      let domainMinimum = Math.min(
        minimum,
        personalValue,
        0
      );

      let domainMaximum = Math.max(
        maximum,
        personalValue,
        0
      );

      if (domainMinimum === domainMaximum) {
        domainMinimum -= 1;
        domainMaximum += 1;
      }

      const range =
        domainMaximum - domainMinimum;

      function calculatePosition(value) {
        const position =
          (
            (value - domainMinimum) /
            range
          ) * 100;

        return Math.max(
          0,
          Math.min(100, position)
        );
      }

      const lowerQuartilePosition =
        calculatePosition(lowerQuartile);

      const upperQuartilePosition =
        calculatePosition(upperQuartile);

      const interquartileWidth =
        Math.max(
          2,
          upperQuartilePosition -
            lowerQuartilePosition
        );

      const medianPosition =
        calculatePosition(median);

      const personalPosition =
        calculatePosition(personalValue);

      const zeroPosition =
        calculatePosition(0);

      const signedPersonalValue =
        personalValue > 0
          ? "+" + personalValue
          : String(personalValue);

      const information =
        metricInformation[metric];
      
      let personalInterpretation;
      
      if (personalValue < 0) {
        personalInterpretation =
          information.firstPairing +
          " was faster by " +
          Math.abs(personalValue) +
          " ms";
      } else if (personalValue > 0) {
        personalInterpretation =
          information.secondPairing +
          " was faster by " +
          Math.abs(personalValue) +
          " ms";
      } else {
        personalInterpretation =
          "Both pairings had the same response time";
      }
            

      return `
        <div class="distribution-row">
          <div class="distribution-row-header">
            <span class="distribution-label">
              ${information.title}
              
            </span>

            <span class="distribution-personal-value">
              Your result: ${personalInterpretation}
            </span>
          </div>

          <div class="distribution-track">
            <div
              class="distribution-zero-line"
              style="left: ${zeroPosition}%"
              title="Zero difference"
            ></div>

            <div
              class="distribution-range-line"
              style="
                left: ${calculatePosition(minimum)}%;
                width:
                  ${Math.max(
                    1,
                    calculatePosition(maximum) -
                      calculatePosition(minimum)
                  )}%;
              "
            ></div>

            <div
              class="distribution-iqr"
              style="
                left: ${lowerQuartilePosition}%;
                width: ${interquartileWidth}%;
              "
              title="Middle 50% of participants"
            ></div>

            <div
              class="distribution-median"
              style="left: ${medianPosition}%"
              title="Group median: ${median} ms"
            ></div>

            <div
              class="distribution-personal-marker"
              style="left: ${personalPosition}%"
              title="Your result: ${personalInterpretation}"
            ></div>
          </div>

          <div class="distribution-axis-labels">
            <span>${domainMinimum} ms</span>
            <span>No difference</span>
            <span>${domainMaximum} ms</span>
          </div>
          
          <div class="distribution-direction-labels">
            <span>
              ← ${information.firstPairing} faster
            </span>
          
            <span>
              ${information.secondPairing} faster →
            </span>
          </div>
        </div>
      `;
    })
    .join("");

  const participantCount =
    Number(
      distributionData[0].participant_count
    );

  distributionChart.classList.remove(
    "group-chart-placeholder"
  );

  distributionChart.innerHTML = `
    <p class="collective-participant-count">
      Based on ${participantCount}
      completed test${participantCount === 1 ? "" : "s"}.
    </p>

    <p class="distribution-explanation">
      Each row compares how quickly you responded
      under two different category pairings.
      The red dot shows your result, the grey box
      shows the middle half of participants, and
      the black line shows the group median.
    </p>

    <p class="distribution-note">
      A position farther from “No difference” means a larger response-time difference between the two pairings.
    </p>

    <div class="distribution-legend">
      <span>
        <i class="legend-iqr"></i>
        Middle 50%
      </span>

      <span>
        <i class="legend-median"></i>
        Group median
      </span>

      <span>
        <i class="legend-personal"></i>
        Your result
      </span>
    </div>

    <div class="distribution-rows">
      ${distributionRows}
    </div>
  `;
}


function renderOverallPairingPattern(result) {
  const patterns = [
    {
      label:
        "Masculinity + Socially Rewarded",
      value:
        Number(
          result.masculinity_rewarded_median
        ),
      className: "masculinity-rewarded"
    },
    {
      label:
        "Masculinity + Socially Penalized",
      value:
        Number(
          result.masculinity_penalized_median
        ),
      className: "masculinity-penalized"
    },
    {
      label:
        "Femininity + Socially Rewarded",
      value:
        Number(
          result.femininity_rewarded_median
        ),
      className: "femininity-rewarded"
    },
    {
      label:
        "Femininity + Socially Penalized",
      value:
        Number(
          result.femininity_penalized_median
        ),
      className: "femininity-penalized"
    }
  ];

  const longestTime = Math.max(
    ...patterns.map(function (pattern) {
      return pattern.value;
    }),
    1
  );

  const patternRows = patterns
    .map(function (pattern) {
      const width =
        pattern.value / longestTime * 100;

      return `
        <div class="collective-pattern-row">
          <span class="collective-pattern-label">
            ${pattern.label}
          </span>

          <div class="collective-pattern-track">
            <div
              class="collective-pattern-fill ${pattern.className}"
              style="width: ${width}%"
            ></div>
          </div>

          <span class="collective-pattern-value">
            ${pattern.value} ms
          </span>
        </div>
      `;
    })
    .join("");

  overallPatternChart.classList.remove(
    "group-chart-placeholder"
  );

  overallPatternChart.innerHTML = `
    <p class="collective-participant-count">
      Based on ${result.participant_count}
      completed test${Number(result.participant_count) === 1 ? "" : "s"}.
    </p>

    <div class="collective-pattern-bars">
      ${patternRows}
    </div>
  `;
}


async function saveResultToSupabase(completeResult) {
  if (
    !APP_CONFIG.supabaseUrl ||
    APP_CONFIG.supabaseUrl.includes("YOUR_") ||
    !APP_CONFIG.supabasePublishableKey ||
    APP_CONFIG.supabasePublishableKey.includes("YOUR_")
  ) {
    throw new Error(
      "Supabase URL or anon key has not been configured."
    );
  }

  const background =
    completeResult.participantBackground;

  const databaseRecord = {
    session_id: getOrCreateSessionId(),
    is_test: APP_CONFIG.isTestSubmission,
  
    age: background.age,
    gender_identity: background.genderIdentity,
    transgender_identity:
      background.transgenderIdentity,

    social_media_platforms:
      background.socialMediaPlatforms,

    social_media_other:
      background.socialMediaOther,

    daily_social_media_time:
      background.dailySocialMediaTime,

    content_preferences:
      background.contentPreferences,

    content_preference_other:
      background.contentPreferenceOther,

    part_1_results:
      completeResult.partOneResponses,

    part_2_results:
      completeResult.partTwoResponses,

    part_3_results:
      completeResult.partThreeResponses,

    part_4_results:
      completeResult.partFourResponses,

    part_5_results:
      completeResult.partFiveResponses,

    part_6_results:
      completeResult.partSixResponses,

    final_result:
      completeResult.finalResult
  };

  const response = await fetch(
    APP_CONFIG.supabaseUrl +
      "/rest/v1/participant_results",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "apikey": APP_CONFIG.supabasePublishableKey,
        "Authorization":
          "Bearer " + APP_CONFIG.supabasePublishableKey,
        "Prefer": "return=minimal"
      },

      body: JSON.stringify(databaseRecord)
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();

    throw new Error(
      "Supabase submission failed: " + errorMessage
    );
  }
}
