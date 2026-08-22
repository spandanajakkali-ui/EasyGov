  /* =====================================================
   EASYGOV - MAIN JAVASCRIPT
   ===================================================== */


/* ================= GLOBAL VARIABLES ================= */

let currentLanguage = "en";

let currentQuestion = 0;

let textSize = 1;

let applicationData = {
    name: "",
    dob: "",
    address: "",
    phone: "",
    idNumber: "",
    document: ""
};


/* ================= FORM QUESTIONS ================= */

const questions = [

    {
        icon: "👤",

        enTitle: "What is your full name?",

        knTitle: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ಏನು?",

        enDescription:
            "Enter your name as it appears on your official document.",

        knDescription:
            "ನಿಮ್ಮ ಅಧಿಕೃತ ದಾಖಲೆಯಲ್ಲಿ ಇರುವಂತೆ ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",

        type: "text",

        placeholderEn: "Enter your full name",

        placeholderKn: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",

        key: "name"
    },


    {
        icon: "🎂",

        enTitle: "What is your date of birth?",

        knTitle: "ನಿಮ್ಮ ಜನ್ಮ ದಿನಾಂಕ ಯಾವುದು?",

        enDescription:
            "Enter your date of birth.",

        knDescription:
            "ನಿಮ್ಮ ಜನ್ಮ ದಿನಾಂಕವನ್ನು ನಮೂದಿಸಿ.",

        type: "date",

        placeholderEn: "",

        placeholderKn: "",

        key: "dob"
    },


    {
        icon: "🏠",

        enTitle: "What is your address?",

        knTitle: "ನಿಮ್ಮ ವಿಳಾಸ ಏನು?",

        enDescription:
            "Enter your current residential address.",

        knDescription:
            "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ವಾಸದ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.",

        type: "text",

        placeholderEn: "Enter your address",

        placeholderKn: "ನಿಮ್ಮ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ",

        key: "address"
    },


    {
        icon: "📱",

        enTitle: "What is your phone number?",

        knTitle: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆ ಏನು?",

        enDescription:
            "Enter your mobile phone number.",

        knDescription:
            "ನಿಮ್ಮ ಮೊಬೈಲ್ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",

        type: "tel",

        placeholderEn: "Enter your phone number",

        placeholderKn: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",

        key: "phone"
    },


    {
        icon: "🪪",

        enTitle: "Enter your identification number",

        knTitle: "ನಿಮ್ಮ ಗುರುತಿನ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",

        enDescription:
            "Enter the identification number used for this demonstration.",

        knDescription:
            "ಈ ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಬಳಸುವ ಗುರುತಿನ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",

        type: "text",

        placeholderEn: "Enter identification number",

        placeholderKn: "ಗುರುತಿನ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",

        key: "idNumber"
    },


    {
        icon: "📄",

        enTitle: "Which document do you have?",

        knTitle: "ನಿಮ್ಮ ಬಳಿ ಯಾವ ದಾಖಲೆ ಇದೆ?",

        enDescription:
            "Choose the document you want to use for this demonstration.",

        knDescription:
            "ಈ ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ನೀವು ಬಳಸಲು ಬಯಸುವ ದಾಖಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",

        type: "select",

        key: "document"
    }

];


/* ================= SCREEN CONTROL ================= */

function showScreen(screenId) {

    let screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {

        screen.classList.remove("active");

    });

    document.getElementById(screenId).classList.add("active");

    window.scrollTo(0, 0);
}


/* ================= START APPLICATION ================= */

function startApplication() {

    showScreen("preferencesScreen");

}


/* ================= BEGIN FORM ================= */

function beginForm() {

    currentQuestion = 0;

    loadQuestion();

    showScreen("formScreen");

}


/* ================= LOAD QUESTION ================= */

function loadQuestion() {

    let question = questions[currentQuestion];

    let total = questions.length;

    let step = currentQuestion + 1;

    let percentage = Math.round((step / total) * 100);


    document.getElementById("stepText").innerText =
        "Step " + step + " of " + total;


    document.getElementById("progressPercent").innerText =
        percentage + "%";


    document.getElementById("progressFill").style.width =
        percentage + "%";


    document.getElementById("questionIcon").innerText =
        question.icon;


    if (currentLanguage === "kn") {

        document.getElementById("questionTitle").innerText =
            question.knTitle;

        document.getElementById("questionDescription").innerText =
            question.knDescription;

    } else {

        document.getElementById("questionTitle").innerText =
            question.enTitle;

        document.getElementById("questionDescription").innerText =
            question.enDescription;

    }


    createInput(question);


    document.getElementById("backButton").style.visibility =
        currentQuestion === 0 ? "hidden" : "visible";


    document.getElementById("nextButton").innerText =
        currentQuestion === total - 1
            ? (currentLanguage === "kn" ? "ಪರಿಶೀಲಿಸಿ →" : "Review →")
            : (currentLanguage === "kn" ? "ಮುಂದೆ →" : "Next →");

}


/* ================= CREATE INPUT ================= */

function createInput(question) {

    let container =
        document.getElementById("inputContainer");


    container.innerHTML = "";


    if (question.type === "select") {

        let select = document.createElement("select");

        select.id = "formInput";


        if (currentLanguage === "kn") {

            select.innerHTML = `
                <option value="">ದಾಖಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ</option>
                <option value="Identity Document">ಗುರುತಿನ ದಾಖಲೆ</option>
                <option value="Address Document">ವಿಳಾಸದ ದಾಖಲೆ</option>
                <option value="Other Document">ಇತರ ದಾಖಲೆ</option>
            `;

        } else {

            select.innerHTML = `
                <option value="">Select a document</option>
                <option value="Identity Document">Identity Document</option>
                <option value="Address Document">Address Document</option>
                <option value="Other Document">Other Document</option>
            `;

        }


        select.value =
            applicationData[question.key];


        container.appendChild(select);


        return;

    }


    let input = document.createElement("input");

    input.id = "formInput";

    input.type = question.type;


    if (currentLanguage === "kn") {

        input.placeholder =
            question.placeholderKn;

    } else {

        input.placeholder =
            question.placeholderEn;

    }


    input.value =
        applicationData[question.key];


    container.appendChild(input);

}


/* ================= SAVE CURRENT ANSWER ================= */

function saveCurrentAnswer() {

    let input =
        document.getElementById("formInput");


    if (!input) {
        return true;
    }


    let value = input.value.trim();


    if (value === "") {

        alert(
            currentLanguage === "kn"
                ? "ದಯವಿಟ್ಟು ಈ ಮಾಹಿತಿಯನ್ನು ನಮೂದಿಸಿ."
                : "Please enter this information."
        );

        input.focus();

        return false;
    }


    let key =
        questions[currentQuestion].key;


    applicationData[key] = value;


    return true;

}


/* ================= NEXT QUESTION ================= */

function nextQuestion() {

    if (!saveCurrentAnswer()) {
        return;
    }


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        createReview();

        showScreen("reviewScreen");

    }

}


/* ================= PREVIOUS QUESTION ================= */

function previousQuestion() {

    saveCurrentAnswer();


    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

}


/* ================= CREATE REVIEW ================= */

function createReview() {

    let container =
        document.getElementById("reviewContainer");


    let labels;


    if (currentLanguage === "kn") {

        labels = {

            name: "ಹೆಸರು",

            dob: "ಜನ್ಮ ದಿನಾಂಕ",

            address: "ವಿಳಾಸ",

            phone: "ಫೋನ್ ಸಂಖ್ಯೆ",

            idNumber: "ಗುರುತಿನ ಸಂಖ್ಯೆ",

            document: "ದಾಖಲೆ"

        };

    } else {

        labels = {

            name: "Full Name",

            dob: "Date of Birth",

            address: "Address",

            phone: "Phone Number",

            idNumber: "Identification Number",

            document: "Document"

        };

    }


    container.innerHTML = `

        <div class="review-item">

            <span class="review-label">
                ${labels.name}
            </span>

            <span class="review-value">
                ${escapeHTML(applicationData.name)}
            </span>

        </div>


        <div class="review-item">

            <span class="review-label">
                ${labels.dob}
            </span>

            <span class="review-value">
                ${escapeHTML(applicationData.dob)}
            </span>

        </div>


        <div class="review-item">

            <span class="review-label">
                ${labels.address}
            </span>

            <span class="review-value">
                ${escapeHTML(applicationData.address)}
            </span>

        </div>


        <div class="review-item">

            <span class="review-label">
                ${labels.phone}
            </span>

            <span class="review-value">
                ${escapeHTML(applicationData.phone)}
            </span>

        </div>


        <div class="review-item">

            <span class="review-label">
                ${labels.idNumber}
            </span>

            <span class="review-value">
                ${escapeHTML(applicationData.idNumber)}
            </span>

        </div>


        <div class="review-item">

            <span class="review-label">
                ${labels.document}
            </span>

            <span class="review-value">
                ${escapeHTML(applicationData.document)}
            </span>

        </div>

    `;

}


/* ================= COMPLETE ================= */

function completeApplication() {

    showScreen("completeScreen");

}


/* ================= RESTART ================= */

function restartApplication() {

    applicationData = {

        name: "",
        dob: "",
        address: "",
        phone: "",
        idNumber: "",
        document: ""

    };


    currentQuestion = 0;

    showScreen("homeScreen");

}


/* ================= READ ALOUD ================= */

function readCurrentPage() {

    let text = "";


    let activeScreen =
        document.querySelector(".screen.active");


    if (activeScreen) {

        text =
            activeScreen.innerText;

    }


    speak(text);

}


function readQuestion() {

    let title =
        document.getElementById("questionTitle").innerText;

    let description =
        document.getElementById("questionDescription").innerText;


    speak(title + ". " + description);

}


function speak(text) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Read Aloud is not supported in this browser."
        );

        return;

    }


    speechSynthesis.cancel();


    let speech =
        new SpeechSynthesisUtterance(text);


    let voices =
        speechSynthesis.getVoices();


    if (currentLanguage === "kn") {

        speech.lang = "kn-IN";


        let kannadaVoice =
            voices.find(function(voice) {

                return voice.lang
                    .toLowerCase()
                    .startsWith("kn");

            });


        if (kannadaVoice) {

            speech.voice = kannadaVoice;

        }

    } else {

        speech.lang = "en-US";


        let englishVoice =
            voices.find(function(voice) {

                return voice.lang
                    .toLowerCase()
                    .startsWith("en");

            });


        if (englishVoice) {

            speech.voice = englishVoice;

        }

    }


    speechSynthesis.speak(speech);

}


/* ================= TEXT SIZE ================= */

function changeTextSize(amount) {

    textSize += amount * 0.1;


    if (textSize < 0.8) {

        textSize = 0.8;

    }


    if (textSize > 1.4) {

        textSize = 1.4;

    }


    document.documentElement.style.fontSize =
        textSize + "em";

}


function resetTextSize() {

    textSize = 1;

    document.documentElement.style.fontSize =
        "1em";

}


/* ================= HIGH CONTRAST ================= */

function toggleContrast() {

    document.body.classList.toggle("high-contrast");


    let button =
        document.getElementById("contrastBtn");


    if (
        document.body.classList.contains("high-contrast")
    ) {

        button.innerText =
            currentLanguage === "kn"
                ? "☀️ ಸಾಮಾನ್ಯ ಮೋಡ್"
                : "☀️ Normal Mode";

    } else {

        button.innerText =
            currentLanguage === "kn"
                ? "🌓 ಕಾಂಟ್ರಾಸ್ಟ್"
                : "🌓 Contrast";

    }

}


/* ================= LANGUAGE ================= */

function setLanguage(language) {

    currentLanguage = language;


    if (language === "kn") {

        document.getElementById("homeTitle").innerText =
            "ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು ಎಲ್ಲರಿಗೂ ಸುಲಭವಾಗಿಸಿ";

        document.getElementById("homeDescription").innerText =
            "ಸರಳ ಹಂತಗಳ ಮೂಲಕ ಸರ್ಕಾರಿ ಫಾರ್ಮ್‌ಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.";

        document.getElementById("startButton").innerText =
            "🚀 ಅರ್ಜಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿ";

        document.getElementById("accessibilityTitle").innerText =
            "ಪ್ರವೇಶಿಸುವಿಕೆ ಆಯ್ಕೆಗಳು";

        document.getElementById("preferencesTitle").innerText =
            "ನಿಮ್ಮ ಅನುಭವವನ್ನು ವೈಯಕ್ತೀಕರಿಸಿ";

        document.getElementById("preferencesDescription").innerText =
            "ವೆಬ್‌ಸೈಟ್ ಬಳಸಲು ಸುಲಭವಾಗುವ ಆಯ್ಕೆಗಳನ್ನು ಆರಿಸಿ.";

        document.getElementById("continueButton").innerText =
            "ಮುಂದುವರಿಸಿ →";

        document.getElementById("readDescription").innerText =
            "ಸೂಚನೆಗಳನ್ನು ಓದುವ ಬದಲು ಕೇಳಿ.";

        document.getElementById("reviewTitle").innerText =
            "ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ";

        document.getElementById("reviewDescription").innerText =
            "ಪೂರ್ಣಗೊಳಿಸುವ ಮೊದಲು ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.";

        document.getElementById("completeTitle").innerText =
            "ಮಾರ್ಗದರ್ಶಿತ ಫಾರ್ಮ್ ಪೂರ್ಣಗೊಂಡಿದೆ!";

        document.getElementById("completeDescription").innerText =
            "ನೀವು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಮಾಹಿತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ.";

        document.getElementById("noteText").innerText =
            "ಈ ಪ್ರೋಟೋಟೈಪ್ ಪ್ರವೇಶಿಸಬಹುದಾದ ಮಾರ್ಗದರ್ಶಿತ ಫಾರ್ಮ್ ಅನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತದೆ. ನಿಜವಾದ ಸಲ್ಲಿಕೆಗಾಗಿ ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗೆ ಮುಂದುವರಿಯಬಹುದು.";

        document.getElementById("contrastBtn").innerText =
            "🌓 ಕಾಂಟ್ರಾಸ್ಟ್";

    } else {

        document.getElementById("homeTitle").innerText =
            "Government Services, Made Easier for Everyone";

        document.getElementById("homeDescription").innerText =
            "Complete government forms with simple, step-by-step guidance designed for everyone.";

        document.getElementById("startButton").innerText =
            "🚀 Start Application";

        document.getElementById("accessibilityTitle").innerText =
            "Accessibility Options";

        document.getElementById("preferencesTitle").innerText =
            "Personalise Your Experience";

        document.getElementById("preferencesDescription").innerText =
            "Choose the options that make this website easier for you to use.";

        document.getElementById("continueButton").innerText =
            "Continue →";

        document.getElementById("readDescription").innerText =
            "Listen to instructions instead of reading them.";

        document.getElementById("reviewTitle").innerText =
            "Review Your Information";

        document.getElementById("reviewDescription").innerText =
            "Please check your answers before completing.";

        document.getElementById("completeTitle").innerText =
            "Guided Form Completed!";

        document.getElementById("completeDescription").innerText =
            "You have successfully completed all the required information.";

        document.getElementById("noteText").innerText =
            "This prototype demonstrates an accessible guided form. Users can proceed to the official government portal for actual submission.";

        document.getElementById("contrastBtn").innerText =
            "🌓 Contrast";

    }


    /*
       If the user is already inside the form,
       reload the current question in the new language.
    */

    if (
        document
            .getElementById("formScreen")
            .classList.contains("active")
    ) {

        loadQuestion();

    }

}


/* ================= SECURITY HELPER ================= */

/*
   Prevent HTML entered by the user from being
   interpreted as webpage code in the review screen.
*/

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}