let timerInterval, seconds = 0;
let recognition = null;
let finalTranscript = "";

const recordButton  = document.getElementById("recordButton");
const recordLabel   = document.getElementById("recordLabel");
const timer         = document.getElementById("timer");
const recordStatus  = document.getElementById("recordStatus");
const transcriptBox = document.getElementById("transcript");
const splitButton   = document.getElementById("splitButton");
const clearButton   = document.getElementById("clearButton");
const results       = document.getElementById("results");
const err           = document.getElementById("err");
const announcer     = document.getElementById("announcer");

/* ------------------------------------------------------------------ */
/* Announce to screen reader                                           */
/* Double rAF ensures NVDA/JAWS/VoiceOver all re-read the region      */
/* ------------------------------------------------------------------ */
function announce(message) {
    announcer.textContent = "";
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            announcer.textContent = message;
        });
    });
}

/* ---- Send sound via Web Audio API ---- */
function playSendSound() {
    try {
        const ctx  = new (window.AudioContext || window.webkitAudioContext)();
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.25);
    } catch (_) {}
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
            // Update only the visible text — no aria-live on timer so it is NOT announced every second
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

/* ---- Collect all filled answers and send ---- */
function verstuurAntwoorden() {
    const antwoorden = [];
    results.querySelectorAll(".message").forEach((messageEl) => {
        const i           = messageEl.dataset.index;
        const messageText = messageEl.querySelector(".message-text").textContent.trim();
        const textarea    = document.getElementById(`input-${i}`);
        if (textarea && textarea.value.trim()) {
            antwoorden.push({ boodschap: messageText, antwoord: textarea.value.trim() });
        }
    });

    if (antwoorden.length === 0) {
        err.textContent = "Geen antwoorden om te versturen.";
        announce("Geen antwoorden om te versturen.");
        return;
    }

    playSendSound();

    const samenvatting = antwoorden.map((a, i) =>
        `Boodschap ${i + 1}: "${a.boodschap}"\nAntwoord: ${a.antwoord}`
    ).join("\n\n");
    console.log("Verstuur:\n" + samenvatting);

    const count = antwoorden.length;
    const msg   = `${count} antwoord${count !== 1 ? "en" : ""} verstuurd.`;
    announce(msg);

    /* Visible + AT feedback via aria-live region */
    const sendFeedback = document.getElementById("sendFeedback");
    if (sendFeedback) {
        sendFeedback.textContent = "✓ " + msg;
        sendFeedback.removeAttribute("hidden");
        setTimeout(() => sendFeedback.setAttribute("hidden", ""), 3500);
    }
}

/* ---- Global Ctrl+Enter / Cmd+Enter shortcut to send ---- */
document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        if (results.querySelector(".message")) {
            e.preventDefault();
            verstuurAntwoorden();
        }
    }
});

/* ================================================================== */
/* SPLITSEN                                                            */
/* ================================================================== */
splitButton.addEventListener("click", () => {
    err.textContent = "";
    const tekst = transcriptBox.value.trim();

    if (!tekst) {
        err.textContent = "Plak eerst een transcript of neem een bericht op.";
        announce("Fout: plak eerst een transcript of neem een bericht op.");
        return;
    }

    const zinnen = splitZinnen(tekst);
    const total  = zinnen.length;

    /*
     * ARIA design
     * -----------
     * - Each message is role="group" labeled by its <h3>.
     * - <h3> lets screen reader users jump by heading (H key in NVDA/JAWS).
     * - "Beantwoorden" is a real <button> — no div tricks needed.
     * - reply section uses both `hidden` + `aria-hidden` to block
     *   virtual-cursor access when collapsed.
     * - Merge checkboxes have an explicit <label> (sr-only) for AT.
     * - shortcut hint in send button is aria-hidden — spoken via aria-label.
     * - sendFeedback has aria-live="polite" + aria-atomic so the full
     *   message is read when it appears.
     */
    results.innerHTML = `
        <div class="card">
            <p id="results-summary"
               class="messages-label"
               aria-live="polite"
               aria-atomic="true">
                ${total} boodschap${total !== 1 ? "pen" : ""} gevonden
            </p>

            <div role="list" aria-label="Gevonden boodschappen">
                ${zinnen.map((z, i) => `
                    <div class="message"
                         role="group"
                         aria-labelledby="msg-heading-${i}"
                         data-index="${i}"
                         data-total="${total}">

                        <span class="message-number" aria-hidden="true">${i + 1}</span>

                        <div class="message-content">
                            <!-- h3 makes this navigable via heading keys in NVDA/JAWS/VO -->
                            <h3 class="message-text" id="msg-heading-${i}">
                                <span class="sr-only">Boodschap ${i + 1} van ${total}:</span>${z}
                            </h3>

                            <!-- aria-label contains bericht number — no aria-describedby to avoid
                                 the full message text being read a second time after the button label -->
                            <button class="open-reply-button"
                                    type="button"
                                    data-index="${i}"
                                    aria-controls="reply-section-${i}"
                                    aria-expanded="false"
                                    aria-label="Beantwoorden op bericht ${i + 1}">
                                Beantwoorden
                            </button>

                            <!-- Reply panel — hidden + aria-hidden while closed -->
                            <div class="message-reply"
                                 id="reply-section-${i}"
                                 role="region"
                                 aria-label="Antwoord op boodschap ${i + 1}"
                                 hidden
                                 aria-hidden="true">

                                <div class="reply-button-row">
                                    <button class="voice-reply-button"
                                            type="button"
                                            data-index="${i}"
                                            aria-label="Spreek antwoord in voor boodschap ${i + 1}"
                                            aria-pressed="false">
                                        <span class="dot" aria-hidden="true"></span>
                                        <span class="voice-reply-label" aria-hidden="true">Spreek in</span>
                                    </button>
                                </div>

                                <label class="field-label" for="input-${i}">
                                    <span class="sr-only">Antwoord op bericht ${i + 1}:</span>
                                    <span aria-hidden="true">Antwoord:</span>
                                </label>
                                <textarea id="input-${i}"
                                          placeholder="Typ of spreek je antwoord..."></textarea>

                                <button class="close-reply-button"
                                        type="button"
                                        data-index="${i}"
                                        aria-label="Sluit antwoordveld voor boodschap ${i + 1}">
                                    Sluiten
                                </button>
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>

            <div class="action-row" role="group" aria-label="Acties voor alle boodschappen">
                <button id="sendButton"
                        type="button"
                        class="send-button"
                        aria-label="Verstuur alle antwoorden, sneltoets Control Enter">
                    Versturen
                    <span class="shortcut-hint" aria-hidden="true">Ctrl+Enter</span>
                </button>
                <span id="sendFeedback"
                      class="send-feedback"
                      role="status"
                      aria-live="polite"
                      aria-atomic="true"
                      hidden></span>
            </div>
        </div>
    `;

    announce(`${total} boodschap${total !== 1 ? "pen" : ""} gevonden. Gebruik Tab om door de boodschappen te navigeren en druk op Beantwoorden om te reageren.`);

    /* ---- Send button ---- */
    document.getElementById("sendButton").addEventListener("click", verstuurAntwoorden);

    /* ---- Open reply panel ---- */
    results.querySelectorAll(".open-reply-button").forEach(openBtn => {
        openBtn.addEventListener("click", () => {
            const i            = openBtn.dataset.index;
            const replySection = document.getElementById(`reply-section-${i}`);
            const voiceBtn     = replySection.querySelector(".voice-reply-button");
            const messageEl    = openBtn.closest(".message");

            openBtn.hidden = true;
            replySection.hidden = false;
            replySection.removeAttribute("aria-hidden");
            openBtn.setAttribute("aria-expanded", "true");
            messageEl.classList.add("expanded");

            announce(`Antwoordveld voor boodschap ${parseInt(i) + 1} geopend. U kunt nu een antwoord inspreken of typen.`);
            if (voiceBtn) voiceBtn.focus();
        });
    });

    /* ---- Close reply panel via Sluiten button ---- */
    results.querySelectorAll(".close-reply-button").forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
            const i            = closeBtn.dataset.index;
            const replySection = document.getElementById(`reply-section-${i}`);
            const openBtn      = results.querySelector(`.open-reply-button[data-index="${i}"]`);
            const messageEl    = closeBtn.closest(".message");

            replySection.hidden = true;
            replySection.setAttribute("aria-hidden", "true");
            if (openBtn) {
                openBtn.hidden = false;
                openBtn.setAttribute("aria-expanded", "false");
                openBtn.focus();
            }
            messageEl.classList.remove("expanded");
            announce(`Antwoordveld voor boodschap ${parseInt(i) + 1} gesloten.`);
        });
    });

    /* ---- Close reply when focus leaves and textarea is empty ---- */
    results.querySelectorAll(".message").forEach(messageEl => {
        messageEl.addEventListener("focusout", (e) => {
            if (messageEl.contains(e.relatedTarget)) return;

            const i            = messageEl.dataset.index;
            const replySection = document.getElementById(`reply-section-${i}`);
            const textarea     = document.getElementById(`input-${i}`);
            const openBtn      = messageEl.querySelector(".open-reply-button");

            if (!replySection || !textarea) return;
            if (textarea.value.trim() !== "") return;

            replySection.hidden = true;
            replySection.setAttribute("aria-hidden", "true");
            if (openBtn) {
                openBtn.hidden = false;
                openBtn.setAttribute("aria-expanded", "false");
            }
            messageEl.classList.remove("expanded");
        });
    });

    /* ---- Voice reply per message ---- */
    let activeReplyRecognition = null;
    let activeReplyButton      = null;

    results.querySelectorAll(".voice-reply-button").forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            const i             = button.dataset.index;
            const replyTextarea = document.getElementById(`input-${i}`);

            if (button.classList.contains("recording")) {
                activeReplyRecognition.stop();
                return;
            }

            if (activeReplyRecognition) {
                activeReplyRecognition.stop();
                activeReplyButton.classList.remove("recording");
                activeReplyButton.setAttribute("aria-pressed", "false");
                activeReplyButton.setAttribute("aria-label",
                    `Spreek antwoord in voor boodschap ${parseInt(activeReplyButton.dataset.index) + 1}`
                );
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
                button.setAttribute("aria-label",
                    `Spreek antwoord in voor boodschap ${parseInt(i) + 1}`
                );
                button.querySelector(".voice-reply-label").textContent = "Spreek in";
                announce("Microfoon fout. Opname gestopt.");
            };

            replyRecognition.onend = () => {
                button.classList.remove("recording");
                button.setAttribute("aria-pressed", "false");
                button.setAttribute("aria-label",
                    `Spreek antwoord in voor boodschap ${parseInt(i) + 1}`
                );
                button.querySelector(".voice-reply-label").textContent = "Spreek in";
                activeReplyRecognition = null;
                activeReplyButton      = null;
                announce("Opname gestopt. Antwoord opgeslagen in tekstveld.");
            };

            replyRecognition.start();
            activeReplyRecognition = replyRecognition;
            activeReplyButton      = button;
            button.classList.add("recording");
            button.setAttribute("aria-pressed", "true");
            button.setAttribute("aria-label",
                `Stop opname voor boodschap ${parseInt(i) + 1}`
            );
            button.querySelector(".voice-reply-label").textContent = "Stop";
            announce(`Opname gestart voor boodschap ${parseInt(i) + 1}. Spreek nu.`);
        });
    });

    /* Move initial focus to first "Beantwoorden" button */
    const firstOpenBtn = results.querySelector(".open-reply-button");
    if (firstOpenBtn) firstOpenBtn.focus();
});