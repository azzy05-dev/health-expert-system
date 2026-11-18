// ==========================================
// HEALTH EXPERT SYSTEM
// ==========================================


// GET HTML ELEMENTS

const welcomeScreen = document.getElementById("welcomeScreen");
const checkerScreen = document.getElementById("checkerScreen");

const userNameInput = document.getElementById("userName");
const welcomeButton = document.getElementById("welcomeButton");

const displayName = document.getElementById("displayName");

const checkButton = document.getElementById("checkButton");
const resetButton = document.getElementById("resetButton");

const resultsModal = document.getElementById("resultsModal");

const closeModalButton = document.getElementById("closeModal");
const tryAgainButton = document.getElementById("tryAgainButton");
const finishButton = document.getElementById("finishButton");

const selectedCount = document.getElementById("selectedCount");

const resultGreeting = document.getElementById("resultGreeting");
const resultCount = document.getElementById("resultCount");
const ruleCount = document.getElementById("ruleCount");

const findingsContainer = document.getElementById("findingsContainer");


// ==========================================
// WELCOME SCREEN
// ==========================================

welcomeButton.addEventListener("click", startSystem);


// ALLOW ENTER KEY

userNameInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        startSystem();
    }

});


// START SYSTEM

function startSystem() {

    let name = userNameInput.value.trim();

    if (name === "") {
        name = "User";
    }

    displayName.textContent = name;

    welcomeScreen.classList.remove("active");

    checkerScreen.classList.add("active");

}


// ==========================================
// SYMPTOM SELECTION
// ==========================================

const symptomCheckboxes = document.querySelectorAll(
    ".symptom-card input"
);


// UPDATE SELECTED SYMPTOM COUNT

symptomCheckboxes.forEach(function(checkbox) {

    checkbox.addEventListener("change", updateCount);

});


function updateCount() {

    let count = 0;

    symptomCheckboxes.forEach(function(checkbox) {

        if (checkbox.checked) {
            count++;
        }

    });

    selectedCount.textContent = count;

}


// ==========================================
// CLEAR SYMPTOMS
// ==========================================

resetButton.addEventListener("click", function() {

    symptomCheckboxes.forEach(function(checkbox) {

        checkbox.checked = false;

    });

    updateCount();

});


// ==========================================
// EXPERT SYSTEM
// ==========================================

checkButton.addEventListener("click", checkSymptoms);


function checkSymptoms() {

    // GET SELECTED SYMPTOMS

    let symptoms = [];

    symptomCheckboxes.forEach(function(checkbox) {

        if (checkbox.checked) {

            symptoms.push(checkbox.value);

        }

    });


    // CHECK IF USER SELECTED ANY SYMPTOM

    if (symptoms.length === 0) {

        alert("Please select at least one symptom.");

        return;

    }


    // KNOWLEDGE BASE RESULTS

    let findings = [];


    // RULE 1
    // IF sneezing
    // THEN possible allergies

    if (symptoms.includes("sneezing")) {

        findings.push({
            title: "Possible Allergies",
            description:
                "Sneezing may be associated with allergies or irritation caused by environmental factors.",
            icon: "🤧"
        });

    }


    // RULE 2
    // IF cough
    // THEN possible respiratory irritation

    if (symptoms.includes("cough")) {

        findings.push({
            title: "Possible Respiratory Irritation",
            description:
                "A cough may be related to irritation of the throat or respiratory system.",
            icon: "😷"
        });

    }


    // RULE 3
    // IF fever
    // THEN possible infection

    if (symptoms.includes("fever")) {

        findings.push({
            title: "Possible Infection",
            description:
                "A fever may occur when the body responds to an infection or another illness.",
            icon: "🌡️"
        });

    }


    // RULE 4
    // IF runny nose
    // THEN possible common cold or allergies

    if (symptoms.includes("runny nose")) {

        findings.push({
            title: "Possible Common Cold or Allergies",
            description:
                "A runny nose may be associated with a common cold or an allergic reaction.",
            icon: "💧"
        });

    }


    // RULE 5
    // IF cough AND fever
    // THEN possible respiratory infection

    if (
        symptoms.includes("cough") &&
        symptoms.includes("fever")
    ) {

        findings.push({
            title: "Possible Respiratory Infection",
            description:
                "The combination of cough and fever may be associated with a respiratory infection.",
            icon: "🫁"
        });

    }


    // RULE 6
    // IF headache
    // THEN possible dehydration or illness

    if (symptoms.includes("headache")) {

        findings.push({
            title: "Possible Dehydration or Illness",
            description:
                "A headache may be associated with dehydration, fatigue, or an underlying illness.",
            icon: "🤕"
        });

    }


    // RULE 7
    // IF stomach pain AND diarrhea
    // THEN possible gastrointestinal problem

    if (
        symptoms.includes("stomach pain") &&
        symptoms.includes("diarrhea")
    ) {

        findings.push({
            title: "Possible Gastrointestinal Problem",
            description:
                "Stomach pain together with diarrhea may indicate a gastrointestinal condition.",
            icon: "🩺"
        });

    }


    // RULE 8
    // IF difficulty breathing
    // THEN medical attention may be needed

    if (symptoms.includes("difficulty breathing")) {

        findings.push({
            title: "Breathing Difficulty",
            description:
                "Difficulty breathing can be serious. Seek immediate medical attention if this symptom is occurring.",
            icon: "⚠️"
        });

    }


    // RULE 9
    // IF chest pain
    // THEN medical attention may be needed

    if (symptoms.includes("chest pain")) {

        findings.push({
            title: "Chest Pain",
            description:
                "Chest pain can have serious causes. Seek immediate medical attention if you are experiencing chest pain.",
            icon: "⚠️"
        });

    }


    // ADDITIONAL RULE
    // IF sore throat
    // THEN possible throat irritation

    if (symptoms.includes("sore throat")) {

        findings.push({
            title: "Possible Throat Irritation",
            description:
                "A sore throat may be associated with irritation, infection, or other conditions.",
            icon: "🗣️"
        });

    }


    // ADDITIONAL RULE
    // IF itchy eyes
    // THEN possible allergies

    if (symptoms.includes("itchy eyes")) {

        findings.push({
            title: "Possible Eye Allergies",
            description:
                "Itchy eyes may be associated with an allergic reaction or environmental irritation.",
            icon: "👁️"
        });

    }


    // DISPLAY RESULTS

    displayResults(symptoms, findings);

}


// ==========================================
// DISPLAY FINDINGS
// ==========================================

function displayResults(symptoms, findings) {

    // DISPLAY USER NAME

    resultGreeting.textContent =
        "Hello, " + displayName.textContent +
        "! Here are the possible findings based on your selected symptoms.";


    // DISPLAY COUNTS

    resultCount.textContent = symptoms.length;

    ruleCount.textContent = findings.length;


    // CLEAR OLD RESULTS

    findingsContainer.innerHTML = "";


    // IF NO RULE MATCHES

    if (findings.length === 0) {

        findingsContainer.innerHTML = `
            <div class="no-findings">

                <h3>No specific findings</h3>

                <p>
                    The selected symptoms did not match
                    any of the system's predefined rules.
                </p>

            </div>
        `;

    }


    // DISPLAY EACH FINDING

    findings.forEach(function(finding) {

        let card = document.createElement("div");

        card.className = "finding-card";

        card.innerHTML = `

            <div class="finding-icon">
                ${finding.icon}
            </div>

            <div>

                <h3>${finding.title}</h3>

                <p>${finding.description}</p>

            </div>

        `;

        findingsContainer.appendChild(card);

    });


    // SHOW MODAL

    resultsModal.classList.add("show");

}


// ==========================================
// CLOSE RESULTS
// ==========================================


// CLOSE BUTTON

closeModalButton.addEventListener("click", closeResults);


// TRY AGAIN BUTTON

tryAgainButton.addEventListener("click", function() {

    closeResults();

    symptomCheckboxes.forEach(function(checkbox) {

        checkbox.checked = false;

    });

    updateCount();

});


// FINISH BUTTON

finishButton.addEventListener("click", function() {

    closeResults();

    checkerScreen.classList.remove("active");

    welcomeScreen.classList.add("active");

    userNameInput.value = "";

});


// CLOSE MODAL FUNCTION

function closeResults() {

    resultsModal.classList.remove("show");

}


// CLICK OUTSIDE MODAL

resultsModal.addEventListener("click", function(event) {

    if (event.target === resultsModal) {

        closeResults();

    }

});


// ESCAPE KEY

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeResults();

    }

});