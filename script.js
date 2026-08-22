// =====================================================
// EASYGOV - COMPLETE SCRIPT
// =====================================================


// =====================================================
// FIREBASE CONFIGURATION
// =====================================================

const firebaseConfig = {
    apiKey: "AIzaSyCRS5tRFRdbJaDCtES-Cu_xByPL5YLpBb0",
    authDomain: "easygov-6f128.firebaseapp.com",
    projectId: "easygov-6f128",
    storageBucket: "easygov-6f128.firebasestorage.app",
    messagingSenderId: "800864492965",
    appId: "1:800864492965:web:83f763ece6b7927c99dc4c",
    measurementId: "G-F5N1S9LNME"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let currentLanguage = "en";

let textSize = 1;

let currentQuestion = 0;

let formAnswers = {};


// =====================================================
// FORM QUESTIONS
// =====================================================

const questions = [

    {
        icon: "👤",

        title: {
            en: "What is your full name?",
            kn: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ಏನು?"
        },

        description: {
            en: "Enter your name as it appears on your official document.",
            kn: "ನಿಮ್ಮ ಅಧಿಕೃತ ದಾಖಲೆಯಲ್ಲಿ ಇರುವಂತೆ ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ."
        },

        type: "text",

        placeholder: {
            en: "Enter your full name",
            kn: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ"
        }
    },


    {
        icon: "🎂",

        title: {
            en: "What is your date of birth?",
            kn: "ನಿಮ್ಮ ಜನ್ಮ ದಿನಾಂಕ ಯಾವುದು?"
        },

        description: {
            en: "Enter your date of birth.",
            kn: "ನಿಮ್ಮ ಜನ್ಮ ದಿನಾಂಕವನ್ನು ನಮೂದಿಸಿ."
        },

        type: "date",

        placeholder: {
            en: "",
            kn: ""
        }
    },


    {
        icon: "📱",

        title: {
            en: "What is your mobile number?",
            kn: "ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಏನು?"
        },

        description: {
            en: "Enter a valid mobile number.",
            kn: "ಮಾನ್ಯವಾದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ."
        },

        type: "tel",

        placeholder: {
            en: "Enter mobile number",
            kn: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ"
        }
    },


    {
        icon: "🏠",

        title: {
            en: "What is your address?",
            kn: "ನಿಮ್ಮ ವಿಳಾಸ ಏನು?"
        },

        description: {
            en: "Enter your current residential address.",
            kn: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ವಾಸಸ್ಥಳದ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ."
        },

        type: "text",

        placeholder: {
            en: "Enter your address",
            kn: "ನಿಮ್ಮ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ"
        }
    },


    {
        icon: "📍",

        title: {
            en: "Select your state",
            kn: "ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ"
        },

        description: {
            en: "Select the state where you currently live.",
            kn: "ನೀವು ಪ್ರಸ್ತುತ ವಾಸಿಸುವ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ."
        },

        type: "select",

        placeholder: {
            en: "Select your state",
            kn: "ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ"
        }
    },


    {
        icon: "📄",

        title: {
            en: "What government service do you need?",
            kn: "ನಿಮಗೆ ಯಾವ ಸರ್ಕಾರಿ ಸೇವೆ ಬೇಕಾಗಿದೆ?"
        },

        description: {
            en: "Select the government service you want help with.",
            kn: "ನಿಮಗೆ ಬೇಕಾದ ಸರ್ಕಾರಿ ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ."
        },

        type: "select",

        placeholder: {
            en: "Select a service",
            kn: "ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ"
        }
    }

];


// =====================================================
// STATE OPTIONS
// =====================================================

const states = [

    "Karnataka",
    "Tamil Nadu",
    "Kerala",
    "Andhra Pradesh",
    "Telangana",
    "Maharashtra",
    "Other"

];


// =====================================================
// GOVERNMENT SERVICES
// =====================================================

const services = [

    "Aadhaar related service",
    "Income Certificate",
    "Caste Certificate",
    "Residence Certificate",
    "Government Scheme",
    "Other"

];


// =====================================================
// SCREEN MANAGEMENT
// =====================================================

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const selectedScreen = document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =====================================================
// FIREBASE AUTHENTICATION
// =====================================================


// LOGIN

function loginUser() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    if (!email || !password) {

        showAuthMessage(
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    showAuthMessage(
        "Logging in...",
        "normal"
    );


    auth.signInWithEmailAndPassword(email, password)

        .then(() => {

            showAuthMessage(
                "Login successful!",
                "success"
            );

            showHome();

        })

        .catch(error => {

            console.error(error);

            showAuthMessage(
                getFirebaseErrorMessage(error),
                "error"
            );

        });

}


// REGISTER

function registerUser() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    if (!email || !password) {

        showAuthMessage(
            "Please enter an email and password.",
            "error"
        );

        return;
    }


    if (password.length < 6) {

        showAuthMessage(
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    showAuthMessage(
        "Creating your account...",
        "normal"
    );


    auth.createUserWithEmailAndPassword(email, password)

        .then(() => {

            showAuthMessage(
                "Account created successfully!",
                "success"
            );

            showHome();

        })

        .catch(error => {

            console.error(error);

            showAuthMessage(
                getFirebaseErrorMessage(error),
                "error"
            );

        });

}


// LOGOUT

function logout() {

    auth.signOut()

        .then(() => {

            showScreen("loginScreen");

            document.getElementById("logoutButton").style.display =
                "none";

            document.getElementById("email").value = "";

            document.getElementById("password").value = "";

        })

        .catch(error => {

            console.error(error);

        });

}


// AUTH STATE

auth.onAuthStateChanged(function(user) {

    const logoutButton =
        document.getElementById("logoutButton");


    if (user) {

        logoutButton.style.display = "block";

        showHome();

    } else {

        logoutButton.style.display = "none";

        showScreen("loginScreen");

    }

});


// =====================================================
// AUTH MESSAGE
// =====================================================

function showAuthMessage(message, type) {

    const box =
        document.getElementById("authMessage");

    box.innerText = message;

    if (type === "error") {

        box.style.color = "red";

    } else if (type === "success") {

        box.style.color = "green";

    } else {

        box.style.color = "#333";

    }

}


// FIREBASE ERROR TRANSLATION

function getFirebaseErrorMessage(error) {

    switch (error.code) {

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/email-already-in-use":
            return "This email already has an account. Please login.";

        case "auth/weak-password":
            return "Password should contain at least 6 characters.";

        case "auth/invalid-credential":
            return "Incorrect email or password.";

        default:
            return "Something went wrong. Please try again.";

    }

}


// =====================================================
// HOME
// =====================================================

function showHome() {

    showScreen("homeScreen");

}


// =====================================================
// DEMO WITHOUT LOGIN
// =====================================================

function showDemoWithoutLogin() {

    showHome();

}


// =====================================================
// LANGUAGE
// =====================================================

function setLanguage(language) {

    currentLanguage = language;


    if (language === "kn") {

        document.getElementById("loginTitle").innerText =
            "EasyGov ಗೆ ಸ್ವಾಗತ";

        document.getElementById("loginDescription").innerText =
            "ಸುಲಭವಾದ ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು ಪಡೆಯಲು ಲಾಗಿನ್ ಮಾಡಿ.";

        document.getElementById("emailLabel").innerText =
            "ಇಮೇಲ್";

        document.getElementById("passwordLabel").innerText =
            "ಪಾಸ್‌ವರ್ಡ್";

        document.getElementById("loginButton").innerText =
            "🔐 ಲಾಗಿನ್";

        document.getElementById("registerButton").innerText =
            "ಖಾತೆ ರಚಿಸಿ";

        document.getElementById("homeTitle").innerText =
            "ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು ಎಲ್ಲರಿಗೂ ಸುಲಭವಾಗಿಸಿ";

        document.getElementById("homeDescription").innerText =
            "ಎಲ್ಲರಿಗಾಗಿ ಸರಳ ಹಂತಗಳ ಮೂಲಕ ಸರ್ಕಾರಿ ಅರ್ಜಿಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.";

        document.getElementById("startButton").innerText =
            "🚀 ಅರ್ಜಿ ಪ್ರಾರಂಭಿಸಿ";

        document.getElementById("accessibilityTitle").innerText =
            "ಪ್ರವೇಶಿಸುವಿಕೆ ಆಯ್ಕೆಗಳು";

        document.getElementById("preferencesTitle").innerText =
            "ನಿಮ್ಮ ಅನುಭವವನ್ನು ವೈಯಕ್ತೀಕರಿಸಿ";

        document.getElementById("preferencesDescription").innerText =
            "ವೆಬ್‌ಸೈಟ್ ಬಳಸಲು ನಿಮಗೆ ಸುಲಭವಾಗುವ ಆಯ್ಕೆಗಳನ್ನು ಆರಿಸಿ.";

        document.getElementById("continueButton").innerText =
            "ಮುಂದುವರಿಸಿ →";

        document.getElementById("reviewTitle").innerText =
            "ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ";

        document.getElementById("reviewDescription").innerText =
            "ಪೂರ್ಣಗೊಳಿಸುವ ಮೊದಲು ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.";

        document.getElementById("completeTitle").innerText =
            "ಅರ್ಜಿಯ ಮಾಹಿತಿ ಪೂರ್ಣಗೊಂಡಿದೆ!";

        document.getElementById("completeDescription").innerText =
            "ನೀವು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಮಾಹಿತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ.";

        document.getElementById("noteText").innerText =
            "ಈ ಮಾದರಿಯು ಸುಲಭವಾದ ಸರ್ಕಾರಿ ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆಯನ್ನು ತೋರಿಸುತ್ತದೆ.";

    } else {

        document.getElementById("loginTitle").innerText =
            "Welcome to EasyGov";

        document.getElementById("loginDescription").innerText =
            "Sign in to access accessible government services.";

        document.getElementById("emailLabel").innerText =
            "Email";

        document.getElementById("passwordLabel").innerText =
            "Password";

        document.getElementById("loginButton").innerText =
            "🔐 Login";

        document.getElementById("registerButton").innerText =
            "Create Account";

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

    }


    // If currently inside form, update question

    if (
        document
            .getElementById("formScreen")
            .classList
            .contains("active")
    ) {

        displayQuestion();

    }

}


// =====================================================
// ACCESSIBILITY - TEXT SIZE
// =====================================================

function changeTextSize(direction) {

    textSize += direction * 0.1;


    if (textSize < 0.8) {

        textSize = 0.8;

    }


    if (textSize > 1.5) {

        textSize = 1.5;

    }


    document.body.style.fontSize =
        textSize + "em";

}


function resetTextSize() {

    textSize = 1;

    document.body.style.fontSize = "1em";

}


// =====================================================
// HIGH CONTRAST
// =====================================================

function toggleContrast() {

    document.body.classList.toggle("high-contrast");

}


// =====================================================
// READ ALOUD
// =====================================================

function speakText(text) {

    if (!("speechSynthesis" in window)) {

        alert("Read Aloud is not supported in this browser.");

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    if (currentLanguage === "kn") {

        speech.lang = "kn-IN";

    } else {

        speech.lang = "en-US";

    }


    speech.rate = 0.9;

    speech.pitch = 1;


    window.speechSynthesis.speak(speech);

}


// READ CURRENT PAGE

function readCurrentPage() {

    let text = "";


    const activeScreen =
        document.querySelector(".screen.active");


    if (activeScreen) {

        text = activeScreen.innerText;

    }


    speakText(text);

}


// READ CURRENT QUESTION

function readQuestion() {

    const question =
        questions[currentQuestion];


    const title =
        question.title[currentLanguage];

    const description =
        question.description[currentLanguage];


    speakText(
        title + ". " + description
    );

}


// =====================================================
// APPLICATION START
// =====================================================

function startApplication() {

    showScreen("preferencesScreen");

}


// =====================================================
// FORM START
// =====================================================

function beginForm() {

    currentQuestion = 0;

    formAnswers = {};

    displayQuestion();

    showScreen("formScreen");

}


// =====================================================
// DISPLAY QUESTION
// =====================================================

function displayQuestion() {

    const question =
        questions[currentQuestion];


    const total =
        questions.length;


    // Step

    document.getElementById("stepText").innerText =

        currentLanguage === "kn"

            ? `ಹಂತ ${currentQuestion + 1} / ${total}`

            : `Step ${currentQuestion + 1} of ${total}`;


    // Percentage

    const percent =
        Math.round(
            ((currentQuestion + 1) / total) * 100
        );


    document.getElementById("progressPercent").innerText =
        percent + "%";


    document.getElementById("progressFill").style.width =
        percent + "%";


    // Icon

    document.getElementById("questionIcon").innerText =
        question.icon;


    // Title

    document.getElementById("questionTitle").innerText =
        question.title[currentLanguage];


    // Description

    document.getElementById("questionDescription").innerText =
        question.description[currentLanguage];


    // Input container

    const container =
        document.getElementById("inputContainer");


    container.innerHTML = "";


    let input;


    // TEXT / DATE / TEL

    if (
        question.type === "text" ||
        question.type === "date" ||
        question.type === "tel"
    ) {

        input =
            document.createElement("input");

        input.type =
            question.type;

        input.placeholder =
            question.placeholder[currentLanguage];

    }


    // SELECT

    else if (question.type === "select") {

        input =
            document.createElement("select");


        const defaultOption =
            document.createElement("option");

        defaultOption.value = "";

        defaultOption.innerText =
            question.placeholder[currentLanguage];

        input.appendChild(defaultOption);


        const list =
            currentQuestion === 4
                ? states
                : services;


        list.forEach(item => {

            const option =
                document.createElement("option");

            option.value = item;

            option.innerText = item;

            input.appendChild(option);

        });

    }


    input.id = "currentAnswer";


    // Restore previous answer

    if (formAnswers[currentQuestion]) {

        input.value =
            formAnswers[currentQuestion];

    }


    container.appendChild(input);


    // Back button

    document.getElementById("backButton").style.visibility =

        currentQuestion === 0
            ? "hidden"
            : "visible";


    // Next button

    document.getElementById("nextButton").innerText =

        currentQuestion === total - 1

            ? (currentLanguage === "kn"
                ? "ಪರಿಶೀಲಿಸಿ →"
                : "Review →")

            : (currentLanguage === "kn"
                ? "ಮುಂದೆ →"
                : "Next →");

}


// =====================================================
// NEXT QUESTION
// =====================================================

function nextQuestion() {

    const input =
        document.getElementById("currentAnswer");


    if (!input.value.trim()) {

        const message =
            currentLanguage === "kn"
                ? "ದಯವಿಟ್ಟು ಉತ್ತರವನ್ನು ನಮೂದಿಸಿ."
                : "Please enter or select an answer.";

        alert(message);

        input.focus();

        return;

    }


    // Save answer

    formAnswers[currentQuestion] =
        input.value;


    // Move next

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        displayQuestion();

    } else {

        showReview();

    }

}


// =====================================================
// PREVIOUS QUESTION
// =====================================================

function previousQuestion() {

    if (currentQuestion > 0) {

        const input =
            document.getElementById("currentAnswer");


        if (input) {

            formAnswers[currentQuestion] =
                input.value;

        }


        currentQuestion--;

        displayQuestion();

    }

}


// =====================================================
// REVIEW
// =====================================================

function showReview() {

    const container =
        document.getElementById("reviewContainer");


    container.innerHTML = "";


    questions.forEach((question, index) => {

        const item =
            document.createElement("div");

        item.className =
            "review-item";


        const label =
            document.createElement("div");

        label.className =
            "review-label";

        label.innerText =
            question.title[currentLanguage];


        const value =
            document.createElement("div");

        value.className =
            "review-value";

        value.innerText =
            formAnswers[index] || "-";


        item.appendChild(label);

        item.appendChild(value);


        container.appendChild(item);

    });


    showScreen("reviewScreen");

}


// =====================================================
// COMPLETE APPLICATION
// =====================================================

function completeApplication() {

    showScreen("completeScreen");

}


// =====================================================
// RESTART
// =====================================================

function restartApplication() {

    currentQuestion = 0;

    formAnswers = {};

    showScreen("homeScreen");

}


// =====================================================
// STARTUP
// =====================================================

document.addEventListener("DOMContentLoaded", function() {

    // Default language

    currentLanguage = "en";

});
