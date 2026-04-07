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
const announcer = document.getElementById("announcer");

/* ---- Announce to screen reader ---- */
function announce(message) {
    announcer.textContent = "";
    requestAnimationFrame(() => {
        announcer.textContent = message;
    });
}

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
                const isQuestion = /^(wie|wat|waar|wanneer|waarom|hoe|welk|welke|welken|kan|kun|kunt|mag|moet|wil|wilt|weet|heeft|hebben|ben|bent|is|zijn|doe|doet|ga|gaat|kom|komt|heb|hebt)\b/i.test(sentence);
                const punctuation = alreadyHasPunctuation ? " " : (isQuestion ? "? " : ". ");
                finalTranscript += sentence + punctuation;
            } else {
                interim = e.results[i][0].transcript;
            }
        }
        transcriptBox.value = (finalTranscript + interim).trim();
    };

    recognition.onerror = (e) => {
        const msg = "Microfoon fout: " + e.error;
        recordStatus.textContent = msg;
        announce(msg);
        stopRecording();
    };

    recognition.onend = () => {
        if (recordButton.classList.contains("recording")) stopRecording();
    };

} else {
    recordButton.disabled = true;
    recordButton.title = "Spraakherkenning niet beschikbaar in deze browser. Gebruik Chrome of Edge.";
    announce("Spraakherkenning is niet beschikbaar in deze browser. Gebruik Chrome of Edge.");
}

/* ---- Recording controls ---- */
function stopRecording() {
    recordButton.classList.remove("recording");
    recordLabel.textContent = "Opname starten";
    recordButton.setAttribute("aria-pressed", "false");
    recordButton.setAttribute("aria-label", "Start opname");
    recordStatus.textContent = "Opname gestopt";
    announce("Opname gestopt.");
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
        announce("Opname gestart. Spreek nu.");
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
    announce("Alles gewist.");
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

/* ---- Close a message if textarea is empty ---- */
function closeMessage(messageEl) {
    const replySection = messageEl.querySelector(".message-reply");
    const textarea = messageEl.querySelector("textarea");
    const index = parseInt(messageEl.dataset.index) + 1;
    const messageText = messageEl.querySelector(".message-text").textContent;

    if (!textarea || textarea.value.trim() !== "") return;

    messageEl.classList.remove("expanded");
    messageEl.setAttribute("aria-expanded", "false");
    messageEl.setAttribute("aria-label", `Boodschap ${index} van ${messageEl.dataset.total}: ${messageText}. Druk op Enter om te beantwoorden.`);
    messageEl.setAttribute("tabindex", "0");
    replySection.hidden = true;

    announce(`Boodschap ${index} gesloten.`);
}

/* ---- Open a message: show reply area and focus voice button ---- */
function openMessage(messageEl) {
    if (messageEl.classList.contains("expanded")) return;

    const replySection = messageEl.querySelector(".message-reply");
    const voiceBtn = messageEl.querySelector(".voice-reply-button");
    const index = parseInt(messageEl.dataset.index) + 1;
    const messageText = messageEl.querySelector(".message-text").textContent;

    messageEl.classList.add("expanded");
    messageEl.setAttribute("aria-expanded", "true");
    messageEl.setAttribute("aria-label", `Boodschap ${index}: ${messageText}`);
    messageEl.setAttribute("tabindex", "-1");

    replySection.hidden = false;

    announce(`Boodschap ${index} geopend. Spreek-in knop geselecteerd.`);

    if (voiceBtn) voiceBtn.focus();
}

/* ---- Splitsen ---- */
splitButton.addEventListener("click", () => {
    err.textContent = "";
    const tekst = transcriptBox.value.trim();

    if (!tekst) {
        err.textContent = "Plak eerst een transcript of neem een bericht op.";
        announce("Fout: plak eerst een transcript of neem een bericht op.");
        return;
    }

    const zinnen = splitZinnen(tekst);
    const total = zinnen.length;

    results.innerHTML = `
        <div class="card">
            <p class="messages-label" aria-hidden="true">${total} boodschap${total !== 1 ? "pen" : ""} gevonden</p>
            <div role="list" aria-label="Gevonden boodschappen">
                ${zinnen.map((z, i) => `
                    <div class="message"
                         role="listitem"
                         tabindex="0"
                         aria-label="Boodschap ${i + 1} van ${total}: ${z}. Druk op Enter om te beantwoorden."
                         aria-expanded="false"
                         data-index="${i}"
                         data-total="${total}">
                        <span class="message-number" aria-hidden="true">${i + 1}</span>
                        <div class="message-content">
                            <div class="message-text" aria-hidden="true">${z}</div>
                            <div class="message-reply" hidden>
                                <div class="reply-button-row">
                                    <button class="voice-reply-button"
                                            data-index="${i}"
                                            aria-label="Spreek antwoord in voor boodschap ${i + 1}"
                                            aria-pressed="false">
                                        <span class="dot" aria-hidden="true"></span>
                                        <span class="voice-reply-label">Spreek in</span>
                                    </button>
                                </div>
                                <label class="field-label" for="input-${i}">Antwoord:</label>
                                <textarea id="input-${i}"
                                          aria-label="Antwoord op boodschap ${i + 1}: ${z}"
                                          placeholder="Typ of spreek je antwoord..."></textarea>
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `;

    announce(`${total} boodschap${total !== 1 ? "pen" : ""} gevonden. Gebruik Tab om door de boodschappen te navigeren en druk Enter om te beantwoorden.`);

    /* ---- Keyboard: Enter/Space to open message ---- */
    results.querySelectorAll(".message").forEach(messageEl => {
        messageEl.addEventListener("keydown", (e) => {
            // If the key came from inside the reply area, let it through — don't intercept
            if (e.target.closest(".message-reply")) return;

            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openMessage(messageEl);
            }
        });

        messageEl.addEventListener("click", (e) => {
            if (e.target.closest(".message-reply")) return;
            openMessage(messageEl);
        });

        // Close when focus leaves the message entirely and textarea is empty
        messageEl.addEventListener("focusout", (e) => {
            if (messageEl.contains(e.relatedTarget)) return;
            closeMessage(messageEl);
        });
    });

    /* ---- Voice reply per message ---- */
    let activeReplyRecognition = null;
    let activeReplyButton = null;

    results.querySelectorAll(".voice-reply-button").forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            const i = button.dataset.index;
            const replyTextarea = document.getElementById(`input-${i}`);

            if (button.classList.contains("recording")) {
                activeReplyRecognition.stop();
                return;
            }

            if (activeReplyRecognition) {
                activeReplyRecognition.stop();
                activeReplyButton.classList.remove("recording");
                activeReplyButton.setAttribute("aria-pressed", "false");
                activeReplyButton.setAttribute("aria-label", `Spreek antwoord in voor boodschap ${parseInt(activeReplyButton.dataset.index) + 1}`);
                activeReplyButton.querySelector(".voice-reply-label").textContent = "Spreek in";
            }

            if (!SpeechRecognition) {
                replyTextarea.placeholder = "Spraakherkenning niet beschikbaar in deze browser.";
                announce("Spraakherkenning is niet beschikbaar in deze browser.");
                return;
            }

            const replyRecognition = new SpeechRecognition();
            replyRecognition.lang = "nl-NL";
            replyRecognition.continuous = true;
            replyRecognition.interimResults = true;

            let replyFinal = replyTextarea.value;

            replyRecognition.onresult = (e) => {
                let interim = "";
                for (let j = e.resultIndex; j < e.results.length; j++) {
                    if (e.results[j].isFinal) {
                        const sentence = e.results[j][0].transcript.trim();
                        const hasPunctuation = /[.!?]$/.test(sentence);
                        const isQuestion = /^(wie|wat|waar|wanneer|waarom|hoe|welk|welke|kan|kun|kunt|mag|moet|wil|wilt|weet|heeft|hebben|ben|bent|is|zijn|doe|doet|ga|gaat|kom|komt|heb|hebt)\b/i.test(sentence);
                        const punctuation = hasPunctuation ? " " : (isQuestion ? "? " : ". ");
                        replyFinal += sentence + punctuation;
                    } else {
                        interim = e.results[j][0].transcript;
                    }
                }
                replyTextarea.value = (replyFinal + interim).trim();
            };

            replyRecognition.onerror = () => {
                button.classList.remove("recording");
                button.setAttribute("aria-pressed", "false");
                button.setAttribute("aria-label", `Spreek antwoord in voor boodschap ${parseInt(i) + 1}`);
                button.querySelector(".voice-reply-label").textContent = "Spreek in";
                announce("Microfoon fout. Opname gestopt.");
            };

            replyRecognition.onend = () => {
                button.classList.remove("recording");
                button.setAttribute("aria-pressed", "false");
                button.setAttribute("aria-label", `Spreek antwoord in voor boodschap ${parseInt(i) + 1}`);
                button.querySelector(".voice-reply-label").textContent = "Spreek in";
                activeReplyRecognition = null;
                activeReplyButton = null;
                announce("Opname gestopt. Antwoord opgeslagen in tekstveld.");
            };

            replyRecognition.start();
            activeReplyRecognition = replyRecognition;
            activeReplyButton = button;
            button.classList.add("recording");
            button.setAttribute("aria-pressed", "true");
            button.setAttribute("aria-label", `Stop opname voor boodschap ${parseInt(i) + 1}`);
            button.querySelector(".voice-reply-label").textContent = "Stop";
            announce(`Opname gestart voor boodschap ${parseInt(i) + 1}. Spreek nu.`);
        });
    });

    // Focus first message so user can start tabbing immediately
    const firstMessage = results.querySelector(".message");
    if (firstMessage) firstMessage.focus();
});