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
// =====================================================
// EASYGOV AI ASSISTANT - CHATBOT
// =====================================================

function toggleChat() {

    const chatbot = document.getElementById("chatbot");

    chatbot.classList.toggle("active");

}


// -----------------------------------------------------
// Send message
// -----------------------------------------------------

function sendChatMessage() {

    const input =
        document.getElementById("chatInput");

    const message =
        input.value.trim();


    if (!message) {
        return;
    }


    // Show user's message

    addChatMessage(
        message,
        "user"
    );


    input.value = "";


    // Get assistant response

    const response =
        getEasyGovResponse(message);


    // Small delay so it feels like an assistant

    setTimeout(function() {

        addChatMessage(
            response,
            "bot"
        );

    }, 400);

}


// -----------------------------------------------------
// Add message to chat
// -----------------------------------------------------

function addChatMessage(message, type) {

    const container =
        document.getElementById("chatMessages");


    const messageDiv =
        document.createElement("div");


    messageDiv.className =
        type === "user"
            ? "user-message"
            : "bot-message";


    messageDiv.innerText =
        message;


    container.appendChild(messageDiv);


    container.scrollTop =
        container.scrollHeight;

}


// -----------------------------------------------------
// EasyGov Assistant knowledge
// -----------------------------------------------------

function getEasyGovResponse(message) {

    const text =
        message.toLowerCase();


    // LANGUAGE

    if (
        text.includes("kannada") ||
        text.includes("language") ||
        text.includes("ಕನ್ನಡ")
    ) {

        if (currentLanguage === "kn") {

            return "ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಬಳಸಲು ಮೇಲಿನ ಕನ್ನಡ ಬಟನ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ.";

        }

        return "You can switch to Kannada by clicking the ಕನ್ನಡ button at the top of the page.";

    }


    // READ ALOUD

    if (
        text.includes("read") ||
        text.includes("listen") ||
        text.includes("hear") ||
        text.includes("speak")
    ) {

        return currentLanguage === "kn"

            ? "🔊 ಸೂಚನೆಗಳನ್ನು ಕೇಳಲು Read Aloud ಬಟನ್ ಅನ್ನು ಒತ್ತಿರಿ."

            : "🔊 Use the Read Aloud button to listen to the instructions instead of reading them.";

    }


    // TEXT SIZE

    if (
        text.includes("text size") ||
        text.includes("font") ||
        text.includes("small text") ||
        text.includes("big text")
    ) {

        return currentLanguage === "kn"

            ? "🔤 A+ ಬಟನ್ ಒತ್ತಿದರೆ ಪಠ್ಯದ ಗಾತ್ರ ಹೆಚ್ಚಾಗುತ್ತದೆ. A− ಬಟನ್ ಒತ್ತಿದರೆ ಗಾತ್ರ ಕಡಿಮೆಯಾಗುತ್ತದೆ."

            : "🔤 Use A+ to increase the text size and A− to decrease it.";

    }


    // CONTRAST

    if (
        text.includes("contrast") ||
        text.includes("see") ||
        text.includes("visibility") ||
        text.includes("visible")
    ) {

        return currentLanguage === "kn"

            ? "👁️ ಪಠ್ಯವನ್ನು ಹೆಚ್ಚು ಸ್ಪಷ್ಟವಾಗಿ ನೋಡಲು Contrast ಬಟನ್ ಅನ್ನು ಬಳಸಿ."

            : "👁️ If the text is difficult to see, use the Contrast button to improve visibility.";

    }


    // FORM HELP

    if (
        text.includes("form") ||
        text.includes("application") ||
        text.includes("fill") ||
        text.includes("next")
    ) {

        return currentLanguage === "kn"

            ? "📝 ಪ್ರತಿ ಹಂತದಲ್ಲಿರುವ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಿ ಮತ್ತು Next ಬಟನ್ ಒತ್ತಿ ಮುಂದುವರಿಯಿರಿ."

            : "📝 Answer the question shown on the screen and click Next to continue.";

    }


    // WRONG ANSWER

    if (
        text.includes("wrong") ||
        text.includes("mistake") ||
        text.includes("change") ||
        text.includes("edit")
    ) {

        return currentLanguage === "kn"

            ? "↩️ ಹಿಂದಿನ ಪ್ರಶ್ನೆಗೆ ಹೋಗಲು Back ಬಟನ್ ಒತ್ತಿ ಮತ್ತು ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಬದಲಾಯಿಸಿ."

            : "↩️ Click Back to return to the previous question and correct your answer.";

    }


    // WHAT IS EASYGOV

    if (
        text.includes("what is easygov") ||
        text.includes("easygov")
    ) {

        return currentLanguage === "kn"

            ? "🏛️ EasyGov ಒಂದು ಸರಳ ಮತ್ತು ಸುಲಭವಾಗಿ ಬಳಸಬಹುದಾದ ಸರ್ಕಾರಿ ಸೇವೆಗಳ ಮಾರ್ಗದರ್ಶಿ ವೇದಿಕೆಯಾಗಿದೆ."

            : "🏛️ EasyGov is designed to make government services easier to understand and use.";

    }


    // HELP

    if (
        text.includes("help") ||
        text.includes("how")
    ) {

        return currentLanguage === "kn"

            ? "ನಾನು ಭಾಷೆ, Read Aloud, ಪಠ್ಯದ ಗಾತ್ರ, Contrast ಮತ್ತು ಅರ್ಜಿ ತುಂಬುವ ಬಗ್ಗೆ ಸಹಾಯ ಮಾಡಬಹುದು."

            : "I can help you with language, Read Aloud, text size, contrast, and completing the application.";

    }


    // GREETING

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return currentLanguage === "kn"

            ? "👋 ನಮಸ್ಕಾರ! EasyGov ನಲ್ಲಿ ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"

            : "👋 Hello! How can I help you use EasyGov?";

    }


    // DEFAULT

    return currentLanguage === "kn"

        ? "ಕ್ಷಮಿಸಿ, ನನಗೆ ಆ ಪ್ರಶ್ನೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ಭಾಷೆ, Read Aloud, ಪಠ್ಯದ ಗಾತ್ರ, Contrast ಅಥವಾ ಅರ್ಜಿ ಬಗ್ಗೆ ಕೇಳಿ."

        : "I'm here to help with EasyGov. You can ask me about language, Read Aloud, text size, contrast, or completing the application.";

}
async function processDocument() {

    const input = document.getElementById("documentInput");
    const status = document.getElementById("ocrStatus");

    if (!input.files || !input.files[0]) {
        return;
    }

    const file = input.files[0];

    status.innerHTML = "🔄 Reading document... Please wait.";

    try {

        const result = await Tesseract.recognize(
            file,
            "eng",
            {
                logger: function(info) {

                    if (info.status === "recognizing text") {

                        const progress =
                            Math.round(info.progress * 100);

                        status.innerHTML =
                            `🔄 Reading document... ${progress}%`;

                    }

                }
            }
        );

        const text = result.data.text;

        console.log("OCR TEXT:", text);

        const extractedData = extractDocumentFields(text);

        window.ocrData = extractedData;

        status.innerHTML =
            "✅ Document read successfully! Information extracted.";

        alert(
            "Document scanned successfully!\n\n" +
            "Name: " + (extractedData.name || "Not found") +
            "\nDOB: " + (extractedData.dob || "Not found") +
            "\nAddress: " + (extractedData.address || "Not found")
        );

    } catch (error) {

        console.error(error);

        status.innerHTML =
            "❌ Could not read the document. Please try a clearer image.";

    }
}
function extractDocumentFields(text) {

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

    let name = "";
    let dob = "";
    let address = "";

    // Find name
    for (let line of lines) {

        if (/name/i.test(line)) {

            name = line
                .replace(/name\s*[:\-]?\s*/i, "")
                .trim();

            if (name.length > 2) {
                break;
            }
        }
    }

    // Find date of birth
    const dobMatch = text.match(
        /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/
    );

    if (dobMatch) {
        dob = dobMatch[0];
    }

    // Find address
    for (let i = 0; i < lines.length; i++) {

        if (/address/i.test(lines[i])) {

            address = lines[i]
                .replace(/address\s*[:\-]?\s*/i, "")
                .trim();

            // If address is empty, use next line
            if (!address && lines[i + 1]) {
                address = lines[i + 1];
            }

            break;
        }
    }

    return {
        name: name,
        dob: dob,
        address: address
    };
}
