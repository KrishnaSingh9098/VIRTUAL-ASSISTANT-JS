const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

let hasIntroduced = false; // Flag to check if introduction has been given

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour < 12) {
        speak("Good Morning!");
    } else if (hour < 17) {
        speak("Good Afternoon!");
    } else {
        speak("Good Evening!");
    }
}

function introduce() {
    speak("Hello! I am your virtual assistant, Krishna. How may I help you today?");
}

window.addEventListener('load', () => {
    speak("Initializing buddy, wait a moment");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (e) => {
    const currentIndex = e.resultIndex;
    const transcript = e.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
    if (!hasIntroduced) { // Check if introduction has not been given
        introduce();
        hasIntroduced = true; // Set the flag to true
    }
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes("hello")) {
        speak("Hello! How are you?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google....");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube....");
    } else if (message.includes("wikipedia") || message.includes("what is") || message.includes("who is")) {
        const query = message.replace(/(wikipedia|what is|who is)/, "").trim();
        window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`, "_blank");
        speak("Searching Wikipedia for " + query);
    } else {
        const searchQuery = message.trim();
        if (searchQuery) {
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
            speak("Searching for " + searchQuery);
        } else {
            speak("I didn't catch that. Can you please repeat?");
        }
    }
}
