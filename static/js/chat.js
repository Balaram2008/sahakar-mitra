// Sahakara Mitra - Trilingual AI Chatbot Interface

let isChatInitialized = false;

window.speakCurrentBubble = function(btn, lang) {
  const bubble = btn.closest(".bot-bubble");
  if (!bubble) return;
  const msgElem = bubble.querySelector(".message-content");
  if (!msgElem) return;
  const text = msgElem.innerText || msgElem.textContent;
  const l = lang || currentLanguage;
  try {
    if (typeof voiceEngine !== 'undefined' && voiceEngine && voiceEngine.speak) {
      voiceEngine.speak(text, "AI Response", l);
    }
  } catch (e) {
    console.warn("Speech error:", e);
  }
};

window.copyCurrentBubble = function(btn) {
  const bubble = btn.closest(".bot-bubble");
  if (!bubble) return;
  const msgElem = bubble.querySelector(".message-content");
  if (!msgElem) return;
  const text = msgElem.innerText || msgElem.textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  }).catch(() => {
    console.log("Clipboard write fallback");
  });
};

function initChat() {
  if (isChatInitialized) return;
  isChatInitialized = true;

  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const micBtn = document.getElementById("chat-mic-btn");
  const clearBtn = document.getElementById("chat-clear-btn");
  const stopVoiceBtn = document.getElementById("chat-stop-voice-btn");

  appendBotWelcomeMessage();

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      sendMessage(message);
      chatInput.value = "";
    });
  }

  if (micBtn) {
    micBtn.addEventListener("click", () => {
      voiceEngine.toggleListening((transcript, isFinal) => {
        if (chatInput) chatInput.value = transcript;
        if (isFinal) {
          sendMessage(transcript);
          if (chatInput) chatInput.value = "";
          voiceEngine.stopListening();
        }
      });
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const messagesContainer = document.getElementById("chat-messages");
      if (messagesContainer) {
        messagesContainer.innerHTML = "";
        appendBotWelcomeMessage();
      }
      voiceEngine.stopSpeaking();
    });
  }

  if (stopVoiceBtn) {
    stopVoiceBtn.addEventListener("click", () => {
      voiceEngine.stopSpeaking();
      voiceEngine.stopListening();
    });
  }

  // Bind Quick Chips
  document.querySelectorAll(".quick-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const query = chip.innerText.replace(/^[^\w\s\u0C00-\u0C7F\u0900-\u097F]+/g, '').trim();
      sendMessage(query);
    });
  });

  // Re-render welcome message on language change
  window.addEventListener("languageChanged", () => {
    const messagesContainer = document.getElementById("chat-messages");
    if (messagesContainer && messagesContainer.children.length <= 1) {
      messagesContainer.innerHTML = "";
      appendBotWelcomeMessage();
    }
  });
}

function appendBotWelcomeMessage() {
  const messagesContainer = document.getElementById("chat-messages");
  if (!messagesContainer) return;

  const welcomeText = getTranslation("chat_welcome_msg");
  const welcomeBubble = document.createElement("div");
  welcomeBubble.className = "chat-bubble bot-bubble";
  welcomeBubble.innerHTML = `
    <div class="bubble-header flex items-center justify-between mb-1.5">
      <span class="badge-bot font-black flex items-center gap-1.5">
        <i class="fa-solid fa-robot text-emerald-600"></i> ${getTranslation("chat_header_title")}
      </span>
      <span class="text-[10px] text-slate-400 font-bold">Now</span>
    </div>
    <div class="message-content text-sm leading-relaxed">${formatMarkdown(welcomeText)}</div>
    <div class="bubble-actions">
      <button class="btn-icon-action" onclick="window.speakCurrentBubble(this, currentLanguage)">
        <i class="fa-solid fa-volume-high text-emerald-600"></i> ${getTranslation("chat_read_aloud")}
      </button>
    </div>
  `;
  messagesContainer.appendChild(welcomeBubble);
}

async function sendMessage(text) {
  const messagesContainer = document.getElementById("chat-messages");
  if (!messagesContainer || !text) return;

  // Append User Bubble
  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble user-bubble";
  userBubble.innerHTML = `
    <div class="bubble-header flex items-center justify-between mb-1.5">
      <span class="badge-sender font-black flex items-center gap-1">
        <i class="fa-solid fa-user"></i> ${currentLanguage === "te" ? "రైతు మిత్రుడు" : (currentLanguage === "hi" ? "किसान भाई" : "Farmer")}
      </span>
      <span class="text-[10px] text-blue-200 font-bold">Now</span>
    </div>
    <div class="message-content text-sm">${escapeHtml(text)}</div>
  `;
  messagesContainer.appendChild(userBubble);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Typing Indicator
  const typingIndicator = document.createElement("div");
  typingIndicator.className = "chat-bubble bot-bubble typing-bubble";
  typingIndicator.innerHTML = `
    <div class="flex items-center gap-2 text-xs text-emerald-800 font-black">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
      <span>${currentLanguage === "te" ? "ఆలోచిస్తున్నాను..." : (currentLanguage === "hi" ? "उत्तर खोज रहा हूँ..." : "Analyzing query...")}</span>
    </div>
  `;
  messagesContainer.appendChild(typingIndicator);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, lang: currentLanguage })
    });
    const data = await res.json();
    
    typingIndicator.remove();
    
    const responseText = data.response || "No response received.";
    const respLang = data.lang || currentLanguage;

    const botBubble = document.createElement("div");
    botBubble.className = "chat-bubble bot-bubble";
    botBubble.innerHTML = `
      <div class="bubble-header flex items-center justify-between mb-1.5">
        <span class="badge-bot font-black flex items-center gap-1.5">
          <i class="fa-solid fa-robot text-emerald-600"></i> ${getTranslation("chat_header_title")}
        </span>
        <span class="text-[10px] text-slate-400 font-bold">Now</span>
      </div>
      <div class="message-content text-sm leading-relaxed">${formatMarkdown(responseText)}</div>
      <div class="bubble-actions">
        <button class="btn-icon-action" onclick="window.speakCurrentBubble(this, '${respLang}')">
          <i class="fa-solid fa-volume-high text-emerald-600"></i> ${getTranslation("chat_read_aloud")}
        </button>
        <button class="btn-icon-action" onclick="window.copyCurrentBubble(this)">
          <i class="fa-solid fa-copy"></i> Copy
        </button>
      </div>
    `;
    messagesContainer.appendChild(botBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Auto speak response in native voice
    voiceEngine.speak(responseText, "AI Response", respLang);

  } catch (err) {
    console.error("Chat error:", err);
    typingIndicator.remove();
    const errorBubble = document.createElement("div");
    errorBubble.className = "chat-bubble bot-bubble border-red-300 bg-red-50 text-red-800";
    errorBubble.innerHTML = `
      <div class="text-sm font-bold flex items-center gap-2">
        <i class="fa-solid fa-circle-exclamation text-red-600"></i>
        <span>Network error. Please verify your connection or try again.</span>
      </div>
    `;
    messagesContainer.appendChild(errorBubble);
  }
}

function formatMarkdown(text) {
  if (!text) return "";
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^### (.*$)/gim, '<h4 class="text-base font-black text-emerald-950 mt-2 mb-1">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 class="text-lg font-black text-emerald-950 mt-2 mb-1">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 class="text-xl font-black text-emerald-950 mt-2 mb-1">$1</h2>')
    .replace(/^\s*\d+\.\s+(.*$)/gim, '<div class="ml-2 font-medium text-slate-800">📌 $1</div>')
    .replace(/^\s*[\-\*]\s+(.*$)/gim, '<div class="ml-2 font-medium text-slate-800">• $1</div>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
  return html;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}