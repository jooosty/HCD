/* ================================================================== */
/* antwoorden.js — Antwoordenpagina                                   */
/* Reads data saved by main.js via sessionStorage and renders the     */
/* chat overview. No dependency on index.html or main.js at runtime.  */
/* ================================================================== */

const announcer   = document.getElementById("announcer");
const chatMessages = document.getElementById("chatMessages");
const backButton  = document.getElementById("backButton");

/* ---- Announce to screen reader ---- */
function announce(message) {
    announcer.textContent = "";
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            announcer.textContent = message;
        });
    });
}

/* ---- Escape HTML ---- */
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/* ---- Back button → return to main app ---- */
backButton.addEventListener("click", () => {
    window.location.href = "index.html";
});

/* ---- Load data from sessionStorage ---- */
let allMessages = [];
try {
    const raw = sessionStorage.getItem("spraakberichten_antwoorden");
    if (raw) allMessages = JSON.parse(raw);
} catch (_) {}

if (allMessages.length === 0) {
    /* Nothing to show — redirect back */
    chatMessages.innerHTML = `
        <p style="text-align:center; color:#888; margin-top:2rem;">
            Geen antwoorden gevonden. 
            <a href="index.html" style="color:#5fbf6e;">Terug naar berichten</a>.
        </p>`;
} else {
    buildChat(allMessages);
}

/* ---- Build chat bubbles ---- */
function buildChat(messages) {
    const now     = new Date();
    const timeStr = now.getHours().toString().padStart(2, "0") + ":" +
                    now.getMinutes().toString().padStart(2, "0");
    const dateStr = now.toLocaleDateString("nl-NL", {
        weekday: "long", day: "numeric", month: "long"
    });

    chatMessages.innerHTML = "";

    /* Date chip */
    const chip = document.createElement("div");
    chip.className   = "chat-date-chip";
    chip.textContent = dateStr;
    chatMessages.appendChild(chip);

    /* ---- First: all incoming bubbles (original messages) ---- */
    messages.forEach((item) => {
        const inRow = document.createElement("div");
        inRow.className = "bubble-row incoming";
        inRow.innerHTML = `
            <div class="bubble incoming">
                ${escapeHtml(item.boodschap)}
                <div class="bubble-time">${timeStr}</div>
            </div>
        `;
        chatMessages.appendChild(inRow);
    });

    /* ---- Then: all outgoing replies at the bottom ---- */
    messages.filter(item => item.antwoord).forEach((item) => {
        const outRow = document.createElement("div");
        outRow.className = "bubble-row outgoing";
        outRow.innerHTML = `
            <div class="bubble outgoing">
                <div class="bubble-quote">
                    <div class="bubble-quote-label">Bericht</div>
                    ${escapeHtml(item.boodschap)}
                </div>
                ${escapeHtml(item.antwoord)}
                <div class="bubble-time">
                    ${timeStr}
                    <span class="tick" aria-hidden="true">✓✓</span>
                </div>
            </div>
        `;
        chatMessages.appendChild(outRow);
    });

    /* Scroll to bottom and announce */
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const answered = messages.filter(m => m.antwoord).length;
    announce(`${answered} van de ${messages.length} berichten beantwoord. Gebruik Tab om door het gesprek te navigeren.`);
}