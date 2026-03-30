let timerInterval, seconds = 0;
let recognition = null;
let finalTranscript = "";

const recBtn = document.getElementById("recBtn");
const recLabel = document.getElementById("recLabel");
const timer = document.getElementById("timer");
const recStatus = document.getElementById("recStatus");
const transcriptBox = document.getElementById("transcript");
const splitBtn = document.getElementById("splitBtn");
const wisBtn = document.getElementById("wisBtn");
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
                finalTranscript += e.results[i][0].transcript + " ";
            } else {
                interim = e.results[i][0].transcript;
            }
        }
        transcriptBox.value = (finalTranscript + interim).trim();
    };

    recognition.onerror = (e) => {
        recStatus.textContent = "Microfoon fout: " + e.error;
        stopRecording();
    };

    recognition.onend = () => {
        if (recBtn.classList.contains("recording")) stopRecording();
    };

} else {
    recBtn.disabled = true;
    recBtn.title = "Spraakherkenning niet beschikbaar in deze browser. Gebruik Chrome of Edge.";
}

/* ---- Recording controls ---- */
function stopRecording() {
    recBtn.classList.remove("recording");
    recLabel.textContent = "Opname starten";
    recBtn.setAttribute("aria-pressed", "false");
    recBtn.setAttribute("aria-label", "Start opname");
    recStatus.textContent = "Opname gestopt";
    clearInterval(timerInterval);
    timer.textContent = "";
}

recBtn.addEventListener("click", () => {
    if (!recognition) return;

    if (recBtn.classList.contains("recording")) {
        recognition.stop();
        stopRecording();
    } else {
        finalTranscript = "";
        transcriptBox.value = "";
        recognition.start();
        recBtn.classList.add("recording");
        recLabel.textContent = "Stop opname";
        recBtn.setAttribute("aria-pressed", "true");
        recBtn.setAttribute("aria-label", "Stop opname");
        recStatus.textContent = "Opname bezig";
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
wisBtn.addEventListener("click", () => {
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
splitBtn.addEventListener("click", () => {
    err.textContent = "";
    const tekst = transcriptBox.value.trim();

    if (!tekst) {
        err.textContent = "Plak eerst een transcript of neem een bericht op.";
        return;
    }

    const zinnen = splitZinnen(tekst);

    results.innerHTML = `
        <div class="card">
            <p class="msg-label">${zinnen.length} boodschap${zinnen.length !== 1 ? "pen" : ""} gevonden</p>
            <div role="list" aria-label="Gevonden boodschappen">
                ${zinnen.map((z, i) => `
                    <div class="zin" role="listitem"
                         aria-label="Boodschap ${i + 1}: ${z}">
                        <span class="zin-num" aria-hidden="true">${i + 1}</span>
                        <div class="zin-text">${z}</div>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
});