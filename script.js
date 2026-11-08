const APP_CONFIG = {
  saveToSupabase: false,

  supabaseUrl: "YOUR_SUPABASE_PROJECT_URL",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY"
};

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

const classificationModuleSelect =
  document.getElementById("classification-module-select");


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

  masculinityRewardedErrors.textContent =
    result.masculinityRewardedErrors;

  masculinityPenalizedErrors.textContent =
    result.masculinityPenalizedErrors;

  femininityRewardedErrors.textContent =
    result.femininityRewardedErrors;

  femininityPenalizedErrors.textContent =
    result.femininityPenalizedErrors;

  renderPersonalPatternExplanation(result);

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

      const absoluteDifference =
        Math.abs(comparison.difference);

      let fasterStatement;

      if (comparison.difference < 0) {
        fasterStatement =
          comparison.firstLabel +
          " was faster by " +
          absoluteDifference +
          " ms.";
      } else if (comparison.difference > 0) {
        fasterStatement =
          comparison.secondLabel +
          " was faster by " +
          absoluteDifference +
          " ms.";
      } else {
        fasterStatement =
          "Both pairings had the same median response time.";
      }

      const signedDifference =
        comparison.difference > 0
          ? "+" + comparison.difference
          : String(comparison.difference);

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
          ${comparison.firstLabel}<br>
          − ${comparison.secondLabel}
        </p>

        <p class="difference-formula">
          ${comparison.firstValue} ms
          − ${comparison.secondValue} ms
          =
          <strong>${signedDifference} ms</strong>
        </p>

        <p class="difference-result">
          ${fasterStatement}
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
  const masculinityDifference =
    result.masculinityPenalizedMedian -
    result.masculinityRewardedMedian;

  const femininityDifference =
    result.femininityPenalizedMedian -
    result.femininityRewardedMedian;

  personalPatternText.innerHTML = "";

  const masculinityText =
    document.createElement("p");

  const femininityText =
    document.createElement("p");

  if (Math.abs(masculinityDifference) < 100) {
    masculinityText.textContent =
      "▸ Your response times for Masculinity were similar " +
      "across the Rewarded and Penalized pairings.";
  } else if (masculinityDifference > 0) {
    masculinityText.textContent =
      "▸ You responded more quickly when Masculinity was " +
      "paired with Socially Rewarded.";
  } else {
    masculinityText.textContent =
      "▸ You responded more quickly when Masculinity was " +
      "paired with Socially Penalized.";
  }

  if (Math.abs(femininityDifference) < 100) {
    femininityText.textContent =
      "▸ Your response times for Femininity were similar " +
      "across the Rewarded and Penalized pairings.";
  } else if (femininityDifference > 0) {
    femininityText.textContent =
      "▸ You responded more quickly when Femininity was " +
      "paired with Socially Rewarded.";
  } else {
    femininityText.textContent =
      "▸ You responded more quickly when Femininity was " +
      "paired with Socially Penalized.";
  }

  personalPatternText.append(
    masculinityText,
    femininityText
  );
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


async function saveResultToSupabase(completeResult) {
  if (
    !APP_CONFIG.supabaseUrl ||
    APP_CONFIG.supabaseUrl.includes("YOUR_") ||
    !APP_CONFIG.supabaseAnonKey ||
    APP_CONFIG.supabaseAnonKey.includes("YOUR_")
  ) {
    throw new Error(
      "Supabase URL or anon key has not been configured."
    );
  }

  const background =
    completeResult.participantBackground;

  const databaseRecord = {
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
        "apikey": APP_CONFIG.supabaseAnonKey,
        "Authorization":
          "Bearer " + APP_CONFIG.supabaseAnonKey,
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
