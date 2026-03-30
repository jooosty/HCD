let timerInterval, seconds = 0;
let recognition = null;
let finalTranscript = "";

const recordButton = document.getElementById("recordButton");
const recordLabel = document.getElementById("recordLabel");
const timer = document.getElementById("timer");
const recordStatus = document.getElementById("recordStatus");
const transcriptBox = document.getElementById("transcript");
const splitButton = document.getElementById("splitButton");
const clearButton = document.getElementById("clearButton");
const results = document.getElementById("results");
const err = document.getElementById("err");

/* ---- Speech Recognition setup ---- */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "nl-NL";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (e) => {
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
            if (e.results[i].isFinal) {
                const sentence = e.results[i][0].transcript.trim();
                const alreadyHasPunctuation = /[.!?]$/.test(sentence);
                finalTranscript += sentence + (alreadyHasPunctuation ? " " : ". ");
            } else {
                interim = e.results[i][0].transcript;
            }
        }
        transcriptBox.value = (finalTranscript + interim).trim();
    };

    recognition.onerror = (e) => {
        recordStatus.textContent = "Microfoon fout: " + e.error;
        stopRecording();
    };

    recognition.onend = () => {
        if (recordButton.classList.contains("recording")) stopRecording();
    };

} else {
    recordButton.disabled = true;
    recordButton.title = "Spraakherkenning niet beschikbaar in deze browser. Gebruik Chrome of Edge.";
}

/* ---- Recording controls ---- */
function stopRecording() {
    recordButton.classList.remove("recording");
    recordLabel.textContent = "Opname starten";
    recordButton.setAttribute("aria-pressed", "false");
    recordButton.setAttribute("aria-label", "Start opname");
    recordStatus.textContent = "Opname gestopt";
    clearInterval(timerInterval);
    timer.textContent = "";
}

recordButton.addEventListener("click", () => {
    if (!recognition) return;

    if (recordButton.classList.contains("recording")) {
        recognition.stop();
        stopRecording();
    } else {
        finalTranscript = "";
        transcriptBox.value = "";
        recognition.start();
        recordButton.classList.add("recording");
        recordLabel.textContent = "Stop opname";
        recordButton.setAttribute("aria-pressed", "true");
        recordButton.setAttribute("aria-label", "Stop opname");
        recordStatus.textContent = "Opname bezig";
        seconds = 0;
        timer.textContent = "0:00";
        timerInterval = setInterval(() => {
            seconds++;
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            timer.textContent = m + ":" + String(s).padStart(2, "0");
        }, 1000);
    }
});

/* ---- Wissen ---- */
clearButton.addEventListener("click", () => {
    transcriptBox.value = "";
    finalTranscript = "";
    results.innerHTML = "";
    err.textContent = "";
    transcriptBox.focus();
});

/* ---- Splitslogica ---- */
function splitZinnen(tekst) {
    const delen = tekst
        .split(/(?<=[.!?])\s+|(?<=\boh\b)\s+|(?<=\btrouwens\b)\s+|(?<=\btrouwens,)\s+|(?<=\ben\b)\s+(?=[A-Z])/gi)
        .map(s => s.trim())
        .filter(s => s.length > 4);
    return delen.length > 1 ? delen : [tekst.trim()];
}

/* ---- Splitsen ---- */
splitButton.addEventListener("click", () => {
    err.textContent = "";
    const tekst = transcriptBox.value.trim();

    if (!tekst) {
        err.textContent = "Plak eerst een transcript of neem een bericht op.";
        return;
    }

    const zinnen = splitZinnen(tekst);

    results.innerHTML = `
        <div class="card">
            <p class="messages-label">${zinnen.length} boodschap${zinnen.length !== 1 ? "pen" : ""} gevonden</p>
            <div role="list" aria-label="Gevonden boodschappen">
                ${zinnen.map((z, i) => `
                    <div class="message" role="listitem" aria-label="Boodschap ${i + 1}: ${z}">
                        <span class="message-number" aria-hidden="true">${i + 1}</span>
                        <div class="message-content">
                            <div class="message-text">${z}</div>
                            <div class="message-reply">
                                <label class="field-label" for="input-${i}">Antwoord:</label>
                                <textarea id="input-${i}" aria-label="Antwoord op boodschap ${i + 1}" placeholder="Typ hier je antwoord..."></textarea>
                                <button class="copy-button" data-index="${i}" aria-label="Kopieer antwoord op boodschap ${i + 1}">Kopieer</button>
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `;

    results.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", () => {
            const i = button.dataset.index;
            const tekst = document.getElementById(`input-${i}`).value.trim();
            if (!tekst) return;
            navigator.clipboard.writeText(tekst).then(() => {
                button.textContent = "Gekopieerd!";
                setTimeout(() => button.textContent = "Kopieer", 2000);
            });
        });
    });
});