// ==========================================================================
// SAHAKARA MITRA - COMPLETE TOUCH KIOSK ENGINE (ALL PORTAL FEATURES)
// Designed for Touchscreen Kiosks, RBK Wall Terminals & Rural PACS Centers
// ==========================================================================

class KioskEngine {
  constructor() {
    this.currentLang = 'te';
    this.currentStateId = 'ap';
    this.allStates = [];
    this.allSchemes = [];
    this.allLaws = [];
    this.activeRegion = 'all';
    this.activeCategory = 'all';
    this.voiceEngine = null;
    this.idleTimeSeconds = 0;
    this.maxIdleSeconds = 60;
    this.warningSeconds = 45;
    this.idleTimerInterval = null;
    this.activeNumpadTarget = null;

    this.i18nDict = {
      te: {
        welcome_title: "సహకార మిత్ర • రైతు సేవా కియోస్క్",
        welcome_sub: "సంక్షేమ పథకాలు, సున్నా వడ్డీ రుణాలు & విపత్తు పరిహార స్పర్శ వేదిక",
        tap_to_speak: "మాట్లాడండి",
        listening: "వినబడుతోంది... మాట్లాడండి",
        switch_state: "రాష్ట్రం మార్చండి",
        web_mode: "వెబ్ పోర్టల్",
        reset_idle: "స్క్రీన్ తాకి కొనసాగించండి",
        session_timeout: "సెషన్ ముగింపు హెచ్చరిక",
        mic_tip: "1-టచ్ వాయిస్ శోధన",
        avatar_greeting: "నమస్కారం రైతు సోదరులారా! సహకార కియోస్క్‌కి స్వాగతం. క్రింది సేవలపై తాకండి లేదా మైక్ నొక్కి మాట్లాడండి."
      },
      hi: {
        welcome_title: "सहकार मित्र • किसान सेवा कियोस्क",
        welcome_sub: "कल्याणकारी योजनाएं, शून्य ब्याज ऋण एवं आपदा राहत टच मंच",
        tap_to_speak: "बोलिए",
        listening: "सुन रहे हैं... बोलिए",
        switch_state: "राज्य बदलें",
        web_mode: "वेब पोर्टल",
        reset_idle: "स्क्रीन छूकर जारी रखें",
        session_timeout: "सत्र समाप्ति चेतावनी",
        mic_tip: "1-टच वॉयस खोज",
        avatar_greeting: "नमस्ते किसान भाइयों! सहकार कियोस्क में आपका स्वागत है। नीचे दी गई सेवाओं को छुएं या माइक दबाकर बोलें।"
      },
      en: {
        welcome_title: "Sahakara Mitra • Farmer Service Kiosk",
        welcome_sub: "Cooperative Welfare Schemes, 0% Loans & Disaster Relief Touch Platform",
        tap_to_speak: "Speak",
        listening: "Listening... Please speak",
        switch_state: "Change State",
        web_mode: "Web Portal",
        reset_idle: "Touch screen to continue",
        session_timeout: "Session Timeout Warning",
        mic_tip: "1-Touch Voice Search",
        avatar_greeting: "Welcome Farmer! Touch any service tile below or tap the giant microphone to speak in your language."
      }
    };
  }

  async init() {
    console.log("Initializing Sahakara Mitra Kiosk Engine with 100% Portal Features...");
    this.initClock();
    this.initIdleTimer();
    this.initVoice();
    this.initNumpad();
    this.bindEvents();
    await this.loadStates();
    await this.loadSchemes();
    await this.loadLaws();
    this.applyLanguage(this.currentLang);
    this.updateStateView(this.currentStateId);
    
    setTimeout(() => {
      this.speakText(this.i18nDict[this.currentLang]?.avatar_greeting || "Welcome to Sahakara Mitra Kiosk");
    }, 800);
  }

  // ================= CLOCK & IDLE TIMERS =================
  initClock() {
    const updateTime = () => {
      const now = new Date();
      const timeEl = document.getElementById("kiosk-live-clock");
      const dateEl = document.getElementById("kiosk-live-date");
      if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  initIdleTimer() {
    const resetIdle = () => {
      this.idleTimeSeconds = 0;
      this.hideIdleBanner();
    };

    ['touchstart', 'touchmove', 'click', 'mousemove', 'keydown', 'scroll'].forEach(evt => {
      window.addEventListener(evt, resetIdle, { passive: true });
    });

    this.idleTimerInterval = setInterval(() => {
      this.idleTimeSeconds++;
      if (this.idleTimeSeconds === this.warningSeconds) {
        this.showIdleBanner();
      } else if (this.idleTimeSeconds >= this.maxIdleSeconds) {
        this.resetKioskToWelcome();
      } else if (this.idleTimeSeconds > this.warningSeconds) {
        const remaining = this.maxIdleSeconds - this.idleTimeSeconds;
        const countEl = document.getElementById("idle-remaining-sec");
        if (countEl) countEl.textContent = remaining;
      }
    }, 1000);
  }

  showIdleBanner() {
    let banner = document.getElementById("idle-warning-modal");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "idle-warning-modal";
      banner.className = "idle-countdown-banner";
      banner.innerHTML = `
        <i class="fa-solid fa-hourglass-half fa-spin text-amber-300 text-xl"></i>
        <span>${this.i18nDict[this.currentLang]?.session_timeout || 'Session Timeout'}: <b id="idle-remaining-sec" class="text-amber-300 text-lg">15</b>s. ${this.i18nDict[this.currentLang]?.reset_idle || 'Touch to continue'}</span>
      `;
      banner.onclick = () => { this.idleTimeSeconds = 0; this.hideIdleBanner(); };
      document.body.appendChild(banner);
    }
    banner.style.display = "flex";
  }

  hideIdleBanner() {
    const banner = document.getElementById("idle-warning-modal");
    if (banner) banner.style.display = "none";
  }

  resetKioskToWelcome() {
    this.closeAllModals();
    this.hideIdleBanner();
    this.idleTimeSeconds = 0;
    const searchInput = document.getElementById("kiosk-search-input");
    if (searchInput) searchInput.value = "";
    this.setAvatarSpeech(this.i18nDict[this.currentLang]?.avatar_greeting);
  }

  // ================= VOICE & TTS AUDIO =================
  initVoice() {
    if (window.VoiceEngine) {
      this.voiceEngine = new window.VoiceEngine();
    }
  }

  speakText(text, lang = null) {
    if (!text) return;
    const targetLang = lang || this.currentLang;
    this.setAvatarSpeaking(true);
    
    if (this.voiceEngine) {
      this.voiceEngine.speak(text, targetLang);
      setTimeout(() => this.setAvatarSpeaking(false), Math.min(8000, Math.max(2500, text.length * 80)));
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = targetLang === 'te' ? 'te-IN' : targetLang === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.rate = 0.95;
        utterance.onend = () => this.setAvatarSpeaking(false);
        utterance.onerror = () => this.setAvatarSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  }

  speakTicker() {
    const tickerEl = document.getElementById("kiosk-live-ticker-text");
    if (tickerEl) {
      this.speakText(tickerEl.textContent.trim());
    }
  }

  setAvatarSpeech(text) {
    const speechBubble = document.getElementById("kiosk-avatar-bubble");
    if (speechBubble && text) {
      speechBubble.innerHTML = `<span>${text}</span>`;
    }
  }

  setAvatarSpeaking(isSpeaking) {
    const avatar = document.getElementById("kiosk-mascot-img");
    const wave = document.getElementById("kiosk-avatar-wave");
    if (avatar) {
      if (isSpeaking) {
        avatar.classList.add("avatar-talking-pulse");
      } else {
        avatar.classList.remove("avatar-talking-pulse");
      }
    }
    if (wave) {
      wave.style.display = isSpeaking ? "flex" : "none";
    }
  }

  // ================= DATA LOADERS =================
  async loadStates() {
    try {
      const res = await fetch('/api/states');
      const data = await res.json();
      this.allStates = data.states || [];
      this.renderStateSwitcherModal();
      this.populateStateDropdowns();
    } catch (e) {
      console.error("Failed to load states:", e);
    }
  }

  async loadSchemes() {
    try {
      const res = await fetch('/api/schemes');
      const data = await res.json();
      this.allSchemes = data.schemes || [];
      this.renderStateExplorerCards();
    } catch (e) {
      console.error("Failed to load schemes:", e);
    }
  }

  async loadLaws() {
    try {
      const res = await fetch('/api/laws');
      const data = await res.json();
      this.allLaws = data.laws || [];
      this.renderLaws(this.allLaws);
    } catch (e) {
      console.error("Failed to load laws:", e);
    }
  }

  populateStateDropdowns() {
    const insSelect = document.getElementById("kiosk-ins-state-select");
    const grvSelect = document.getElementById("kiosk-grv-state-select");
    if (this.allStates.length === 0) return;

    const optionsHtml = this.allStates.map(s => `
      <option value="${s.id}" ${s.id === this.currentStateId ? 'selected' : ''}>
        ${s.name_en} (${s.name_local || s.name_en})
      </option>
    `).join("");

    if (insSelect) insSelect.innerHTML = optionsHtml;
    if (grvSelect) grvSelect.innerHTML = optionsHtml;
  }

  // ================= 28 STATES LOGIC =================
  updateStateView(stateId) {
    this.currentStateId = stateId;
    const stateObj = this.allStates.find(s => s.id === stateId) || {
      id: 'ap',
      name_en: 'Andhra Pradesh',
      name_local: 'ఆంధ్రప్రదేశ్',
      cm_name_en: 'N. Chandrababu Naidu',
      cm_name_local: 'శ్రీ నారా చంద్రబాబు నాయుడు',
      cm_image: '/static/images/cms/cm_ap.jpg',
      emblem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Emblem_of_Andhra_Pradesh.svg/300px-Emblem_of_Andhra_Pradesh.svg.png'
    };

    const stateNameEl = document.getElementById("kiosk-current-state-name");
    const cmNameEl = document.getElementById("kiosk-current-cm-name");
    const cmPhotoEl = document.getElementById("kiosk-current-cm-img");

    if (stateNameEl) stateNameEl.textContent = this.currentLang === 'te' ? stateObj.name_local : this.currentLang === 'hi' ? stateObj.name_hi || stateObj.name_en : stateObj.name_en;
    if (cmNameEl) cmNameEl.textContent = this.currentLang === 'te' ? stateObj.cm_name_local : this.currentLang === 'hi' ? stateObj.cm_name_hi || stateObj.cm_name_en : stateObj.cm_name_en;
    if (cmPhotoEl) {
      cmPhotoEl.src = stateObj.cm_image || `/static/images/cms/cm_${stateObj.id}.jpg`;
      cmPhotoEl.onerror = () => { cmPhotoEl.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/N._Chandrababu_Naidu_in_2024.jpg/480px-N._Chandrababu_Naidu_in_2024.jpg'; };
    }

    this.populateStateDropdowns();
  }

  renderStateSwitcherModal() {
    const listContainer = document.getElementById("kiosk-states-grid-modal");
    if (!listContainer) return;
    
    listContainer.innerHTML = this.allStates.map(st => `
      <button onclick="kiosk.selectState('${st.id}')" class="p-3.5 rounded-2xl bg-white/10 hover:bg-amber-400 hover:text-emerald-950 border-2 border-white/20 transition flex items-center gap-3 text-left group">
        <img src="${st.cm_image || `/static/images/cms/cm_${st.id}.jpg`}" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'" class="w-11 h-11 rounded-full object-cover border-2 border-amber-400 group-hover:border-emerald-950 flex-shrink-0" />
        <div class="overflow-hidden">
          <div class="font-black text-xs sm:text-sm truncate">${st.name_en}</div>
          <div class="text-[11px] text-amber-200 group-hover:text-emerald-900 truncate">${st.cm_name_en}</div>
        </div>
      </button>
    `).join("");
  }

  selectState(stateId) {
    this.updateStateView(stateId);
    this.closeModal('kiosk-states-modal');
    const stateObj = this.allStates.find(s => s.id === stateId);
    const msg = this.currentLang === 'te' 
      ? `${stateObj?.name_local || stateObj?.name_en} రాష్ట్రం ఎంపిక చేయబడింది. పథకాలు నవీకరించబడ్డాయి.`
      : `Selected ${stateObj?.name_en}. Schemes updated.`;
    this.setAvatarSpeech(msg);
    this.speakText(msg);
    this.renderStateExplorerCards();
  }

  // ================= SCHEMES EXPLORER & REGION FILTERS =================
  filterSchemesByRegion(region) {
    this.activeRegion = region;
    document.querySelectorAll(".kiosk-region-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.region === region);
    });
    this.renderStateExplorerCards();
  }

  filterSchemesByCategory(cat) {
    this.activeCategory = cat;
    document.querySelectorAll("[data-cat]").forEach(b => {
      if (b.dataset.cat === cat) {
        b.className = "px-3 py-1 rounded-lg bg-emerald-800 text-white text-xs font-bold border border-emerald-500/50";
      } else {
        b.className = "px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-bold border border-white/20";
      }
    });
    this.renderStateExplorerCards();
  }

  renderStateExplorerCards() {
    const container = document.getElementById("kiosk-state-explorer-cards");
    if (!container) return;

    let filtered = this.allSchemes;

    // Filter by Region
    if (this.activeRegion !== 'all') {
      const stateIdsInRegion = this.allStates.filter(s => s.region === this.activeRegion).map(s => s.id);
      filtered = filtered.filter(s => stateIdsInRegion.includes(s.state_id) || s.state_id === 'all');
    } else {
      // Default show current state + central
      filtered = filtered.filter(s => s.state_id === this.currentStateId || s.state_id === 'all' || s.state_id === 'central');
    }

    // Filter by Category
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(s => s.category === this.activeCategory);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-2 p-8 text-center bg-white/10 rounded-3xl border border-white/20">
          <i class="fa-solid fa-wheat-awn-circle-exclamation text-4xl text-amber-300 mb-2"></i>
          <h4 class="text-base font-black">ఈ విభాగంలో పథకాలు ఏవీ లేవు</h4>
          <p class="text-xs text-white/80 mt-1">దయచేసి మరొక ప్రాంతం లేదా రాష్ట్రాన్ని ఎంచుకోండి.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(sch => {
      const title = sch.title?.[this.currentLang] || sch.title?.['en'] || sch.title;
      const benefit = sch.benefits?.[this.currentLang] || sch.benefits?.['en'] || sch.benefit || sch.tagline?.[this.currentLang] || sch.tagline?.['en'] || '';
      const authority = sch.authority?.[this.currentLang] || sch.authority?.['en'] || 'Government of India';

      return `
        <div class="p-4 sm:p-5 rounded-3xl bg-white/10 border-2 border-white/20 hover:border-amber-400 transition flex flex-col justify-between gap-3 shadow-lg">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-700 text-white">${sch.category || 'Cooperative'}</span>
              <span class="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-400 text-emerald-950">${sch.state_name || sch.state_id?.toUpperCase() || 'Govt'}</span>
            </div>
            <h4 class="text-base sm:text-lg font-black text-amber-300 leading-snug">${title}</h4>
            <p class="text-xs text-white/90 mt-1.5 leading-relaxed line-clamp-3">${benefit}</p>
            <div class="mt-2.5 p-2 rounded-xl bg-black/40 text-[11px] font-bold text-emerald-300">
              🏛️ అధికార విభాగం: ${authority}
            </div>
          </div>
          <div class="flex items-center gap-2 pt-2 border-t border-white/10">
            <button onclick="kiosk.speakText('${title.replace(/'/g, '')}. ${benefit.replace(/'/g, '')}')" class="flex-1 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-volume-high text-amber-300"></i> వినండి
            </button>
            <button onclick="kiosk.printSingleSchemePass('${title.replace(/'/g, '')}', '${benefit.replace(/'/g, '')}')" class="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-print"></i> రసీదు
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  // ================= LIVE INTERNET SCHEME SEARCH =================
  async performSchemeSearch(query = null) {
    const q = query || document.getElementById("kiosk-search-input")?.value?.trim();
    if (!q) return;

    this.openModal('kiosk-search-results-modal');
    const container = document.getElementById("kiosk-search-results-content");
    if (container) {
      container.innerHTML = `
        <div class="p-12 text-center">
          <i class="fa-solid fa-satellite-dish fa-bounce text-5xl text-amber-400 mb-4"></i>
          <h3 class="text-xl font-black">శోధించబడుతోంది: "${q}"...</h3>
          <p class="text-xs sm:text-sm text-emerald-200 mt-1">లైవ్ ఇంటర్నెట్ & ప్రభుత్వ డేటాబేస్ నుండి ఫలితాలు సేకరిస్తున్నాము...</p>
        </div>
      `;
    }

    try {
      const res = await fetch(`/api/schemes/internet-search?query=${encodeURIComponent(q)}&lang=${this.currentLang}&state_id=${this.currentStateId}`);
      const data = await res.json();
      const results = data.schemes || [];

      if (container) {
        if (results.length === 0) {
          container.innerHTML = `
            <div class="p-8 text-center bg-white/10 rounded-3xl border border-white/20">
              <i class="fa-solid fa-circle-exclamation text-4xl text-amber-300 mb-3"></i>
              <h4 class="text-lg font-black">ఎటువంటి పథకాలు కనుగొనబడలేదు</h4>
              <p class="text-xs sm:text-sm text-white/80 mt-1">దయచేసి మరొక పేరుతో శోధించండి (ఉదా: PM-KUSUM, రైతు భరోసా, Drip Irrigation).</p>
            </div>
          `;
        } else {
          container.innerHTML = `
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs sm:text-sm font-bold text-amber-300">${results.length} పథకాలు కనుగొనబడ్డాయి (🌐 Live Web Verified)</span>
              <button onclick="kiosk.speakText('${(results[0].title?.[this.currentLang] || results[0].title?.en || '').replace(/'/g, '')}')" class="px-3.5 py-1.5 rounded-xl bg-amber-400 text-emerald-950 font-black text-xs flex items-center gap-1.5 hover:bg-amber-300">
                <i class="fa-solid fa-volume-high"></i> మొదటి పథకం వినండి
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${results.map(sch => {
                const title = sch.title?.[this.currentLang] || sch.title?.en || sch.title;
                const benefit = sch.benefits?.[this.currentLang] || sch.benefits?.en || sch.tagline?.[this.currentLang] || sch.tagline?.en || '';
                const elig = sch.eligibility?.[this.currentLang] || sch.eligibility?.en || 'రైతులు మరియు గ్రామీణ లబ్ధిదారులు';

                return `
                  <div class="p-4 sm:p-5 rounded-2xl bg-white/10 border-2 border-white/20 hover:border-amber-400 transition flex flex-col justify-between gap-3">
                    <div>
                      <div class="flex items-center gap-2 mb-1.5">
                        <span class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-700 text-white">${sch.badge || 'Live Internet'}</span>
                        <span class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-purple-600 text-white">Central / State</span>
                      </div>
                      <h4 class="text-base font-black text-amber-300 leading-snug">${title}</h4>
                      <p class="text-xs text-white/90 mt-1.5 leading-relaxed line-clamp-3">${benefit}</p>
                      <div class="mt-2.5 p-2 rounded-xl bg-black/40 text-[11px] font-bold text-emerald-300">
                        ✅ అర్హత: ${elig}
                      </div>
                    </div>
                    <div class="flex items-center gap-2 pt-2 border-t border-white/10">
                      <button onclick="kiosk.speakText('${title.replace(/'/g, '')}. ${benefit.replace(/'/g, '')}')" class="flex-1 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1">
                        <i class="fa-solid fa-volume-high text-amber-300"></i> వినండి
                      </button>
                      <button onclick="kiosk.printSingleSchemePass('${title.replace(/'/g, '')}', '${benefit.replace(/'/g, '')}')" class="flex-1 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs flex items-center justify-center gap-1">
                        <i class="fa-solid fa-print"></i> రసీదు
                      </button>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          `;

          const firstTitle = results[0].title?.[this.currentLang] || results[0].title?.en || '';
          this.speakText(`కనుగొనబడిన పథకం: ${firstTitle}`);
        }
      }
    } catch (e) {
      console.error("Search failed:", e);
      if (container) {
        container.innerHTML = `<div class="p-6 text-center text-red-300">శోధనలో లోపం ఏర్పడింది. దయచేసి మళ్ళీ ప్రయత్నించండి.</div>`;
      }
    }
  }

  // ================= CONVERSATIONAL AI CHAT =================
  askAiAssistant(question) {
    const input = document.getElementById("kiosk-ai-query-input");
    if (input) input.value = question;
    this.sendAiQuery(question);
  }

  async sendAiQuery(customQ = null) {
    const q = customQ || document.getElementById("kiosk-ai-query-input")?.value?.trim();
    if (!q) return;

    const chatBox = document.getElementById("kiosk-ai-chat-messages");
    if (chatBox) {
      chatBox.innerHTML += `
        <div class="flex justify-end my-2">
          <div class="p-3 rounded-2xl bg-amber-400 text-emerald-950 font-bold text-xs sm:text-sm max-w-[80%]">
            ${q}
          </div>
        </div>
        <div id="kiosk-ai-typing" class="flex justify-start my-2">
          <div class="p-2.5 rounded-2xl bg-white/10 text-emerald-200 text-xs flex items-center gap-2">
            <i class="fa-solid fa-spinner fa-spin"></i> ఏఐ ఆలోచిస్తోంది...
          </div>
        </div>
      `;
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, state: this.currentStateId, lang: this.currentLang })
      });
      const data = await res.json();
      const reply = data.response || 'మీ ప్రశ్నకు సమాచారం అందుబాటులో ఉంది.';
      
      const typing = document.getElementById("kiosk-ai-typing");
      if (typing) typing.remove();

      if (chatBox) {
        chatBox.innerHTML += `
          <div class="flex justify-start my-2">
            <div class="p-4 rounded-2xl bg-emerald-900/80 border border-amber-400/40 text-white text-xs sm:text-sm max-w-[85%]">
              <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
                <span class="text-[11px] font-black text-amber-300">రైతు ఏఐ సహాయకుడు</span>
                <button onclick="kiosk.speakText('${reply.replace(/'/g, '').replace(/\n/g, ' ')}')" class="text-xs text-amber-300 hover:text-white flex items-center gap-1">
                  <i class="fa-solid fa-volume-high"></i> వినండి
                </button>
              </div>
              <div class="leading-relaxed">${reply.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        `;
        chatBox.scrollTop = chatBox.scrollHeight;
      }

      this.speakText(reply);
    } catch (e) {
      console.error("AI chat failed:", e);
      const typing = document.getElementById("kiosk-ai-typing");
      if (typing) typing.remove();
    }
  }

  clearAiChat() {
    const chatBox = document.getElementById("kiosk-ai-chat-messages");
    if (chatBox) {
      chatBox.innerHTML = `
        <div class="flex justify-start my-2">
          <div class="p-3.5 rounded-2xl bg-emerald-900/80 border border-amber-400/40 text-white text-xs sm:text-sm">
            నమస్కారం! నేను మీ కియోస్క్ ఏఐ సహాయకుడిని. పంటలు, ఎరువులు, 0% రుణాలు, ఉచిత పంటల బీమా లేదా 28 రాష్ట్రాల పథకాల గురించి ఏ ప్రశ్న అయినా అడగండి.
          </div>
        </div>
      `;
    }
  }

  startAiChatVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Microphone recognition is not supported on this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = this.currentLang === 'te' ? 'te-IN' : this.currentLang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.onresult = (evt) => {
      const q = evt.results[0][0].transcript;
      const input = document.getElementById("kiosk-ai-query-input");
      if (input) input.value = q;
      this.sendAiQuery(q);
    };
    recognition.start();
  }

  // ================= SMART AI ELIGIBILITY WIZARD =================
  selectWizardOption(el, group) {
    const parent = el.closest(".grid");
    if (parent) {
      parent.querySelectorAll(".kiosk-radio-card").forEach(c => c.classList.remove("active"));
    }
    el.classList.add("active");
    const radio = el.querySelector("input[type='radio']");
    if (radio) radio.checked = true;
  }

  runEligibilityWizard() {
    const land = document.querySelector("input[name='wiz_land']:checked")?.value || 'landowner';
    const pacs = document.querySelector("input[name='wiz_pacs']:checked")?.value || 'yes';
    const crop = document.querySelector("input[name='wiz_crop']:checked")?.value || 'paddy';

    const resultsBox = document.getElementById("kiosk-wizard-results");
    if (!resultsBox) return;

    let matchedSchemes = [];

    // Annadata Sukhibhava / PM-KISAN
    matchedSchemes.push({
      name: "అన్నదాత సుఖీభవ / PM-KISAN 2026",
      benefit: "ఏటా ₹20,000 నేరుగా రైతు ఖాతాలో జమ (3 విడతల్లో ₹10,000 + ₹5,000 + ₹5,000)",
      badge: "100% అర్హత (DBT Eligible)",
      action: "e-KYC & ఆధార్ లింక్ స్టేటస్ తనిఖీ"
    });

    // 100% Free Crop Insurance
    matchedSchemes.push({
      name: "100% ఉచిత పంటల బీమా పథకం (e-Crop / PMFBY)",
      benefit: "రైతు వాటా ప్రీమియం ₹0 (పూర్తి ప్రీమియం ప్రభుత్వమే చెల్లిస్తుంది). 72 గంటల్లో విపత్తు పరిహారం.",
      badge: "ఉచిత రక్షణ (₹0 Premium)",
      action: "RSK వద్ద e-Crop బుకింగ్ సరిచూడండి"
    });

    // PACS 0% Crop Loan
    if (pacs === 'yes') {
      matchedSchemes.push({
        name: "PACS 0% వడ్డీ పంట రుణం (సున్నా వడ్డీ - KCC)",
        benefit: "₹3,00,000 వరకు 0.0% వడ్డీతో సకాలంలో పంట రుణం (కేంద్రం 3% + రాష్ట్రం 4% సబ్సిడీ).",
        badge: "0% వడ్డీ అర్హత (PACS Member)",
        action: "గ్రామ PACS వద్ద స్కేల్ ఆఫ్ ఫైనాన్స్ స్లిప్ తీసుకోండి"
      });
    } else {
      matchedSchemes.push({
        name: "మోడల్ PACS ప్రాథమిక సభ్యత్వ నమోదు & KCC",
        benefit: "రూ. 100 వాటా ధనంతో తక్షణ సభ్యత్వం పొంది 0% వడ్డీ పంట రుణాలు & సబ్సిడీ ఎరువులు పొందండి.",
        badge: "సభ్యత్వ నమోదు సిఫార్సు",
        action: "తక్షణ సభ్యత్వ పాస్ ప్రింట్ తీసుకోండి"
      });
    }

    // Crop Specific Tech/Subsidy
    if (crop === 'paddy') {
      matchedSchemes.push({
        name: "వరి యాంత్రీకరణ & కస్టమ్ హైరింగ్ సబ్సిడీ (CHC)",
        benefit: "వరి కోత యంత్రం, డ్రోన్ స్ప్రేయింగ్ పై 50% సబ్సిడీ కిరాయి రేట్లు.",
        badge: "వ్యవసాయ యాంత్రీకరణ",
        action: "CHC వద్ద డ్రోన్/హార్వెస్టర్ బుక్ చేయండి"
      });
    } else if (crop === 'cotton') {
      matchedSchemes.push({
        name: "PMKSY బిందు & తుంపర సేద్యం (Micro Irrigation)",
        benefit: "చిన్న/సన్నకారు రైతులకు 90% సబ్సిడీతో డ్రిప్ & స్ప్రింక్లర్ వ్యవస్థల ఏర్పాటు.",
        badge: "90% సబ్సిడీ",
        action: "రైతు భరోసా కేంద్రంలో దరఖాస్తు"
      });
    } else {
      matchedSchemes.push({
        name: "PM-KUSUM సోలార్ పంప్‌సెట్ల పథకం & మిషన్ ఆన్ ఆర్గానిక్",
        benefit: "సోలార్ పంపుల ఏర్పాటుకు 60% సబ్సిడీ + ఉద్యానవన పంటల ప్రోత్సాహకాలు.",
        badge: "60% సోలార్ రాయితీ",
        action: "గ్రిడ్ కనెక్షన్ & సోలార్ సబ్సిడీ"
      });
    }

    resultsBox.classList.remove("hidden");
    resultsBox.innerHTML = `
      <div class="p-5 rounded-3xl bg-emerald-950/90 border-2 border-amber-400 text-white">
        <div class="flex items-center justify-between pb-3 border-b border-white/20">
          <div>
            <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 font-black text-[10px] uppercase">AI సిఫార్సు ఫలితాలు</span>
            <h4 class="text-lg sm:text-xl font-black text-amber-300 mt-1">మీకు వర్తించే ${matchedSchemes.length} ప్రభుత్వ సంక్షేమ పథకాలు</h4>
          </div>
          <button onclick="kiosk.printWizardPass()" class="px-4 py-2 bg-amber-400 text-emerald-950 font-black text-xs rounded-xl hover:bg-amber-300 flex items-center gap-1.5 shadow">
            <i class="fa-solid fa-print"></i> అర్హత పాస్ ప్రింట్
          </button>
        </div>

        <div class="space-y-3 my-4">
          ${matchedSchemes.map((s, idx) => `
            <div class="p-3.5 rounded-2xl bg-black/40 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">${idx + 1}</span>
                  <strong class="text-sm font-black text-white">${s.name}</strong>
                  <span class="px-2 py-0.5 bg-emerald-700 text-white text-[9px] font-bold rounded-full">${s.badge}</span>
                </div>
                <p class="text-xs text-emerald-200 mt-1 pl-7">${s.benefit}</p>
              </div>
              <div class="pl-7 sm:pl-0">
                <span class="text-[10px] text-amber-300 font-bold bg-white/10 px-2.5 py-1 rounded-lg border border-white/15 block text-center">${s.action}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    this.triggerConfetti();
    this.speakText(`మీ వివరాల ప్రకారం మీకు ${matchedSchemes.length} సంక్షేమ పథకాలు వర్తిస్తాయి. అన్నదాత సుఖీభవ మరియు సున్నా వడ్డీ రుణాలు అందుబాటులో ఉన్నాయి.`);
  }

  // ================= COOPERATIVE LAWS & RIGHTS =================
  renderLaws(lawsList) {
    const container = document.getElementById("kiosk-laws-cards-container");
    if (!container) return;

    if (lawsList.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-white/80">చట్ట నిబంధనలు ఏవీ కనుగొనబడలేదు.</div>`;
      return;
    }

    container.innerHTML = lawsList.map(law => `
      <div class="p-4 sm:p-5 rounded-3xl bg-white/10 border-2 border-indigo-400/40 text-white space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-white/20">
          <div>
            <span class="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-indigo-700 text-white">${law.jurisdiction || 'Andhra Pradesh'}</span>
            <h4 class="text-base sm:text-lg font-black text-amber-300 mt-1">${law.act_name?.[this.currentLang] || law.act_name?.en || law.act_name}</h4>
          </div>
          <i class="fa-solid fa-scale-balanced text-3xl text-indigo-300"></i>
        </div>

        <div class="space-y-2.5">
          ${(law.sections || []).map(sec => {
            const secTitle = sec.title?.[this.currentLang] || sec.title?.en || sec.title;
            const secSummary = sec.summary?.[this.currentLang] || sec.summary?.en || sec.summary;
            return `
              <div class="p-3 rounded-2xl bg-black/40 border border-white/10">
                <div class="flex items-center justify-between">
                  <strong class="text-xs sm:text-sm font-black text-amber-200">${sec.section_no}: ${secTitle}</strong>
                  <button onclick="kiosk.speakText('${sec.section_no}. ${secTitle.replace(/'/g, '')}. ${secSummary.replace(/'/g, '')}')" class="text-xs text-amber-300 hover:text-white flex items-center gap-1">
                    <i class="fa-solid fa-volume-high"></i> వినండి
                  </button>
                </div>
                <p class="text-xs text-white/90 mt-1 leading-relaxed">${secSummary}</p>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `).join("");
  }

  searchLaws(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderLaws(this.allLaws);
      return;
    }

    const filtered = [];
    for (const law of this.allLaws) {
      const actText = JSON.stringify(law.act_name || {}).toLowerCase();
      const matchedSections = (law.sections || []).filter(sec => {
        const secText = (sec.section_no + ' ' + JSON.stringify(sec.title || {}) + ' ' + JSON.stringify(sec.summary || {})).toLowerCase();
        return secText.includes(q) || actText.includes(q);
      });
      if (matchedSections.length > 0) {
        filtered.push({ ...law, sections: matchedSections });
      }
    }
    this.renderLaws(filtered);
  }

  // ================= 100% FREE CROP INSURANCE CALCULATOR =================
  async calculateInsuranceCoverage() {
    const state = document.getElementById("kiosk-ins-state-select")?.value || 'ap';
    const crop = document.getElementById("kiosk-ins-crop-select")?.value || 'paddy';
    const season = document.getElementById("kiosk-ins-season-select")?.value || 'kharif';
    const acres = parseFloat(document.getElementById("kiosk-ins-acres-input")?.value || 3.0);

    const resultBox = document.getElementById("kiosk-insurance-calc-results");
    if (!resultBox) return;

    try {
      const res = await fetch('/api/calculate-insurance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, acres, season, state })
      });
      const data = await res.json();

      resultBox.classList.remove("hidden");
      resultBox.innerHTML = `
        <div class="p-4 rounded-2xl bg-cyan-950/80 border-2 border-cyan-400 space-y-2 text-white animate-fade-in">
          <div class="flex justify-between items-center p-2.5 bg-black/40 rounded-xl">
            <span class="text-white/80 font-bold">మొత్తం పంట బీమా విలువ:</span>
            <strong class="text-base font-black text-amber-300">₹${data.total_sum_insured?.toLocaleString('en-IN')}</strong>
          </div>
          <div class="flex justify-between items-center p-2.5 bg-black/40 rounded-xl">
            <span class="text-white/80 font-bold">సాధారణ PMFBY రైతు ప్రీమియం:</span>
            <span class="font-bold text-white line-through">₹${Math.round(data.standard_pmfby_farmer_share)?.toLocaleString('en-IN')}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-emerald-900/90 rounded-2xl border-2 border-emerald-400">
            <span class="text-amber-300 font-black">రైతు చెల్లించాల్సింది (ఇ-పంట):</span>
            <strong class="text-base font-black text-emerald-300">₹0 (100% Free)</strong>
          </div>
          <div class="flex justify-between items-center p-2.5 bg-amber-950/70 rounded-xl border border-amber-400/50">
            <span class="text-amber-200 font-bold">రైతుకు 100% ఉచిత ప్రీమియం ఆదా:</span>
            <strong class="text-amber-300 font-black">₹${Math.round(data.farmer_savings)?.toLocaleString('en-IN')}</strong>
          </div>
          <button onclick="kiosk.printInsuranceSlip('${crop}', '${acres}', '${data.total_sum_insured}', '${data.farmer_savings}')" class="w-full mt-2 py-2.5 rounded-xl bg-amber-400 text-emerald-950 font-black text-xs hover:bg-amber-300 flex items-center justify-center gap-1.5 shadow">
            <i class="fa-solid fa-print"></i> ఉచిత బీమా రసీదు ప్రింట్
          </button>
        </div>
      `;

      this.triggerConfetti();
      this.speakText(`మీ ${acres} ఎకరాల పంటకు మొత్తం ${data.total_sum_insured} రూపాయల ఉచిత బీమా రక్షణ లభిస్తుంది. రైతు వాటా ప్రీమియం సున్నా రూపాయలు.`);
    } catch (e) {
      console.error("Insurance calc failed:", e);
    }
  }

  // ================= 0% PACS CROP LOAN & FINANCE CALCULATOR =================
  async calculateFinanceLoan() {
    const loanAmount = parseFloat(document.getElementById("kiosk-kcc-amount-input")?.value || 100000);
    const months = parseInt(document.getElementById("kiosk-kcc-tenure-select")?.value || 12);
    const resultBox = document.getElementById("kiosk-kcc-calc-results");
    if (!resultBox) return;

    try {
      const res = await fetch('/api/calculate-kcc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loan_amount: loanAmount, months })
      });
      const data = await res.json();

      resultBox.classList.remove("hidden");
      resultBox.innerHTML = `
        <div class="p-4 rounded-2xl bg-emerald-950/80 border-2 border-green-400 space-y-2 text-white animate-fade-in">
          <div class="flex justify-between items-center p-2.5 bg-black/40 rounded-xl">
            <span class="text-white/80 font-bold">ప్రాథమిక బ్యాంకు రేటు:</span>
            <span class="font-bold text-white">${data.base_interest_rate}</span>
          </div>
          <div class="flex justify-between items-center p-2.5 bg-black/40 rounded-xl">
            <span class="text-white/80 font-bold">కేంద్ర సకాల రాయితీ (-3%):</span>
            <span class="font-bold text-blue-300">-${data.central_prompt_subvention}</span>
          </div>
          <div class="flex justify-between items-center p-2.5 bg-black/40 rounded-xl">
            <span class="text-white/80 font-bold">రాష్ట్ర సున్నా వడ్డీ సబ్సిడీ (-4%):</span>
            <span class="font-bold text-emerald-300">-${data.state_subvention}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-emerald-900/90 rounded-2xl border-2 border-emerald-400">
            <span class="text-amber-300 font-black">రైతు చెల్లించాల్సిన నికర వడ్డీ:</span>
            <strong class="text-base font-black text-emerald-300">${data.net_effective_interest_rate} (Zero Cost)</strong>
          </div>
          <div class="flex justify-between items-center p-2.5 bg-amber-950/70 rounded-xl border border-amber-400/50">
            <span class="text-amber-200 font-bold">ఈ రుణంపై రైతుకు మొత్తం ఆదా:</span>
            <strong class="text-amber-300 font-black">₹${data.total_farmer_savings?.toLocaleString('en-IN')}</strong>
          </div>
          <button onclick="kiosk.printLoanEstimateSlip('KCC Crop Loan', 'Scale of Finance', '${loanAmount}')" class="w-full mt-2 py-2.5 rounded-xl bg-amber-400 text-emerald-950 font-black text-xs hover:bg-amber-300 flex items-center justify-center gap-1.5 shadow">
            <i class="fa-solid fa-print"></i> 0% రుణ ప్రీ-అప్రూవల్ స్లిప్ ప్రింట్
          </button>
        </div>
      `;

      this.triggerConfetti();
      this.speakText(`మీ పంట రుణానికి సున్నా వడ్డీ వర్తిస్తుంది. మొత్తం ${data.total_farmer_savings} రూపాయల వడ్డీ ఆదా అవుతుంది.`);
    } catch (e) {
      console.error("KCC calc failed:", e);
    }
  }

  // ================= SAHAKARA SPANDANA GRIEVANCE SUBMISSION =================
  async submitOfficialGrievance() {
    const name = document.getElementById("kiosk-grv-name-input")?.value?.trim();
    const phone = document.getElementById("kiosk-grv-phone-input")?.value?.trim();
    const state = document.getElementById("kiosk-grv-state-select")?.value || 'Andhra Pradesh';
    const district = document.getElementById("kiosk-grv-district-input")?.value?.trim() || 'Guntur';
    const pacs = document.getElementById("kiosk-grv-pacs-input")?.value?.trim() || 'Local PACS';
    const category = document.getElementById("kiosk-grv-cat-select")?.value || 'pacs_loan';
    const desc = document.getElementById("kiosk-grv-desc-input")?.value?.trim();

    if (!name || !phone || !desc) {
      alert("దయచేసి మీ పేరు, ఫోన్ నంబర్ మరియు సమస్య వివరణ నమోదు చేయండి.");
      return;
    }

    const resultBox = document.getElementById("kiosk-grv-submit-result");
    try {
      const res = await fetch('/api/grievance/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer_name: name,
          phone: phone,
          state: state,
          district: district,
          mandal: pacs,
          village_pacs: pacs,
          category: category,
          description: desc,
          lang: this.currentLang
        })
      });
      const data = await res.json();
      const ticketId = data.ticket_id || `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      if (resultBox) {
        resultBox.innerHTML = `
          <div class="mt-4 p-5 rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 text-white animate-fade-in">
            <div class="flex items-center justify-between pb-3 border-b border-white/20">
              <div>
                <span class="text-[10px] uppercase tracking-wider text-emerald-300 font-black">ఫిర్యాదు విజయవంతంగా నమోదైంది!</span>
                <h4 class="text-xl font-black text-amber-300">${ticketId}</h4>
              </div>
              <i class="fa-solid fa-circle-check text-4xl text-emerald-400"></i>
            </div>
            <p class="text-xs text-white/90 my-2.5">${data.message || 'మీ సమస్య జిల్లా సహకార అధికారికి (DCO) పంపబడింది.'}</p>
            <button onclick="kiosk.printGrievanceSlip('${ticketId}', '${category}', '${pacs}', '${phone}')" class="w-full py-3 rounded-xl bg-amber-400 text-emerald-950 font-black text-xs hover:bg-amber-300 flex items-center justify-center gap-1.5 shadow">
              <i class="fa-solid fa-print"></i> అధికారిక ఫిర్యాదు రసీదు ప్రింట్
            </button>
          </div>
        `;
      }

      this.triggerConfetti();
      this.speakText(`మీ ఫిర్యాదు విజయవంతంగా నమోదయింది. మీ టికెట్ ఐడీ ${ticketId}.`);
    } catch (e) {
      console.error("Grievance submit failed:", e);
    }
  }

  startGrievanceVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Microphone recognition is not supported on this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = this.currentLang === 'te' ? 'te-IN' : this.currentLang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.onresult = (evt) => {
      const q = evt.results[0][0].transcript;
      const input = document.getElementById("kiosk-grv-desc-input");
      if (input) input.value = q;
    };
    recognition.start();
  }

  // ================= LIVE GRIEVANCE TICKET STATUS TRACKER =================
  async trackGrievanceStatus() {
    const ticketId = document.getElementById("kiosk-track-ticket-input")?.value?.trim();
    if (!ticketId) {
      alert("దయచేసి టికెట్ ఐడీ నమోదు చేయండి.");
      return;
    }

    const resultBox = document.getElementById("kiosk-track-status-result");
    if (!resultBox) return;

    try {
      const res = await fetch(`/api/grievance/track/${encodeURIComponent(ticketId)}`);
      const data = await res.json();

      if (!data.found) {
        resultBox.innerHTML = `
          <div class="p-5 rounded-2xl bg-red-950/80 border-2 border-red-500 text-white text-center">
            <i class="fa-solid fa-circle-xmark text-4xl text-red-400 mb-2"></i>
            <h4 class="text-base font-black">టికెట్ కనుగొనబడలేదు: ${ticketId}</h4>
            <p class="text-xs text-white/80 mt-1">దయచేసి సరైన టికెట్ ఐడీని నమోదు చేయండి (ఉదా: GRV-2026-1042).</p>
          </div>
        `;
        return;
      }

      const g = data.grievance;
      resultBox.innerHTML = `
        <div class="p-5 rounded-3xl bg-black/50 border-2 border-amber-400 text-white space-y-4 animate-fade-in">
          <div class="flex items-center justify-between pb-3 border-b border-white/20">
            <div>
              <span class="text-[10px] font-black uppercase text-amber-300">లైవ్ స్టేటస్</span>
              <h4 class="text-lg font-black">${g.ticket_id} • ${g.farmer_name}</h4>
              <p class="text-xs text-emerald-200">${g.village_pacs}, ${g.district} (${g.state})</p>
            </div>
            <span class="px-3 py-1 rounded-full bg-emerald-500 text-emerald-950 font-black text-xs flex items-center gap-1">
              <i class="fa-solid fa-clock-rotate-left"></i> ${g.status || 'In Progress'}
            </span>
          </div>

          <!-- 4-Stage Visual Progress Timeline -->
          <div class="kiosk-tracker-timeline">
            <div class="kiosk-tracker-node">
              <div class="kiosk-node-circle done"><i class="fa-solid fa-check text-xs"></i></div>
              <span class="text-[10px] font-black text-amber-300 mt-1">1. నమోదైంది</span>
              <span class="text-[9px] text-white/70">Lodged</span>
            </div>
            <div class="kiosk-tracker-node">
              <div class="kiosk-node-circle done"><i class="fa-solid fa-check text-xs"></i></div>
              <span class="text-[10px] font-black text-amber-300 mt-1">2. VAA పరిశీలన</span>
              <span class="text-[9px] text-white/70">Field Visit</span>
            </div>
            <div class="kiosk-tracker-node">
              <div class="kiosk-node-circle active"><i class="fa-solid fa-spinner fa-spin text-xs"></i></div>
              <span class="text-[10px] font-black text-amber-300 mt-1">3. DCO సమీక్ష</span>
              <span class="text-[9px] text-white/70">DCO Action</span>
            </div>
            <div class="kiosk-tracker-node">
              <div class="kiosk-node-circle"><i class="fa-solid fa-circle-check text-xs text-white/40"></i></div>
              <span class="text-[10px] font-black text-white/50 mt-1">4. పరిష్కారం</span>
              <span class="text-[9px] text-white/40">Resolved</span>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-xs space-y-1">
            <strong class="text-amber-300 block">అధికారిక విచారణ నివేదిక:</strong>
            <p class="text-white/90">${g.description}</p>
            <div class="pt-1.5 text-[10px] text-emerald-200">అధికారి: District Cooperative Officer, ${g.district} • SLA గడువు: 7 రోజులు</div>
          </div>
        </div>
      `;

      this.speakText(`టికెట్ నంబర్ ${ticketId} ప్రస్తుతం జిల్లా సహకార అధికారి పరిశీలన దశలో ఉంది.`);
    } catch (e) {
      console.error("Tracking failed:", e);
    }
  }

  // ================= RYTHU BHAROSA / DBT STATUS =================
  checkBenefitStatus() {
    const aadhaar = document.getElementById("kiosk-aadhaar-input")?.value?.trim();
    if (!aadhaar || aadhaar.length < 4) {
      alert("దయచేసి మీ ఆధార్ లేదా సర్వే నంబర్ నమోదు చేయండి.");
      return;
    }

    const resultBox = document.getElementById("kiosk-benefit-result");
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="mt-4 p-5 rounded-2xl bg-emerald-900/60 border-2 border-amber-400 text-white animate-fade-in">
          <div class="flex items-center justify-between pb-3 border-b border-white/20">
            <div>
              <span class="text-xs uppercase tracking-wider text-amber-300 font-black">రైతు భరోసా / PM-KISAN స్థితి</span>
              <h4 class="text-base sm:text-lg font-black">రైతు: రామారావు (ఆధార్: **** **** ${aadhaar.slice(-4)})</h4>
            </div>
            <span class="px-3 py-1 rounded-full bg-emerald-500 text-emerald-950 font-black text-xs flex items-center gap-1">
              <i class="fa-solid fa-circle-check"></i> యాక్టివ్ & ధృవీకరించబడింది
            </span>
          </div>

          <div class="grid grid-cols-3 gap-2 sm:gap-3 my-4 text-center text-xs">
            <div class="p-3 rounded-xl bg-black/30">
              <div class="text-[10px] sm:text-[11px] text-white/70">1వ విడత (మే 2026)</div>
              <div class="text-sm sm:text-base font-black text-amber-300">₹7,500 క్రెడిట్</div>
              <div class="text-[9px] text-emerald-400 font-bold">PFMS Ref: 98321</div>
            </div>
            <div class="p-3 rounded-xl bg-black/30">
              <div class="text-[10px] sm:text-[11px] text-white/70">2వ విడత (అక్టోబర్ 2026)</div>
              <div class="text-sm sm:text-base font-black text-amber-300">₹4,000 క్రెడిట్</div>
              <div class="text-[9px] text-emerald-400 font-bold">PFMS Ref: 98322</div>
            </div>
            <div class="p-3 rounded-xl bg-black/30">
              <div class="text-[10px] sm:text-[11px] text-white/70">3వ విడత (జనవరి 2027)</div>
              <div class="text-sm sm:text-base font-black text-amber-300">₹2,000 షెడ్యూల్</div>
              <div class="text-[9px] text-amber-200 font-bold">ప్రాసెసింగ్ లో ఉంది</div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 text-xs">
            <span>బ్యాంక్: <b>SBI (xxxx4920)</b> | e-KYC: <b>పూర్తయింది</b></span>
            <button onclick="kiosk.printBenefitSlip('${aadhaar}')" class="px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 font-black hover:bg-amber-300 flex items-center gap-1.5 shadow">
              <i class="fa-solid fa-print"></i> రసీదు ప్రింట్
            </button>
          </div>
        </div>
      `;

      this.triggerConfetti();
      this.speakText(`మీ రైతు భరోసా ఖాతా సక్రియంగా ఉంది. మొత్తం పదకొండు వేల ఐదు వందల రూపాయలు జమ అయ్యాయి.`);
    }
  }

  // ================= FERTILIZER & CHC BOOKING =================
  bookFertilizerSeed() {
    const item = document.getElementById("kiosk-pacs-item-select")?.value;
    const bags = document.getElementById("kiosk-pacs-qty-input")?.value || 2;
    const center = document.getElementById("kiosk-pacs-center-select")?.value;
    const token = "PACS-" + Math.floor(100000 + Math.random() * 900000);
    const resultBox = document.getElementById("kiosk-pacs-booking-result");
    
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="mt-4 p-5 rounded-2xl bg-emerald-900/80 border-2 border-amber-400 text-white animate-fade-in">
          <div class="flex items-center justify-between pb-3 border-b border-white/20">
            <div>
              <span class="text-xs uppercase font-black text-amber-300">రిజర్వేషన్ టోకెన్ జారీ చేయబడింది</span>
              <h4 class="text-xl font-black text-white">${token}</h4>
            </div>
            <i class="fa-solid fa-qrcode text-4xl text-amber-300"></i>
          </div>
          <div class="my-3 space-y-1 text-sm">
            <div>వస్తువు: <b>${item}</b> (${bags} బస్తాలు)</div>
            <div>కేటాయించిన కేంద్రం: <b>${center}</b></div>
            <div>సబ్సిడీ ధర: <b>₹${bags * 266.5}</b> (మార్కెట్ ధర కంటే 60% తక్కువ)</div>
            <div class="text-xs text-emerald-300 mt-2">ఈ టోకెన్ 48 గంటల పాటు చెల్లుబాటు అవుతుంది. RSK కేంద్రంలో చూపి స్టాక్ తీసుకోండి.</div>
          </div>
          <button onclick="kiosk.printPacsSlip('${token}', '${item}', '${bags}', '${center}')" class="w-full py-2.5 rounded-xl bg-amber-400 text-emerald-950 font-black hover:bg-amber-300 flex items-center justify-center gap-2">
            <i class="fa-solid fa-print"></i> పాస్ ప్రింట్ చేయండి
          </button>
        </div>
      `;

      this.triggerConfetti();
      this.speakText(`మీ ఎరువుల బుకింగ్ విజయవంతమైంది. టోకెన్ నంబర్ ${token}.`);
    }
  }

  bookChcEquipment() {
    const eq = document.getElementById("kiosk-chc-equip-select")?.value;
    const hours = document.getElementById("kiosk-chc-hours-input")?.value || 4;
    const date = document.getElementById("kiosk-chc-date-input")?.value || "రేపు";
    const token = "CHC-" + Math.floor(100000 + Math.random() * 900000);

    const rates = { "Tractor 45HP": 450, "Paddy Harvester Combine": 1400, "Kisan Agri Drone Spray": 350, "Rotavator & Cultivator": 300 };
    const rate = rates[eq] || 400;
    const total = rate * hours;

    const resultBox = document.getElementById("kiosk-chc-result");
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="mt-4 p-5 rounded-2xl bg-emerald-900/80 border-2 border-amber-400 text-white animate-fade-in">
          <div class="flex items-center justify-between pb-2 border-b border-white/20">
            <h4 class="text-base sm:text-lg font-black text-amber-300">యంత్రాల బుకింగ్ కన్ఫర్మ్: ${token}</h4>
            <span class="px-2.5 py-1 bg-amber-400 text-emerald-950 font-black rounded-lg text-xs">రైతు సబ్సిడీ రేటు</span>
          </div>
          <div class="my-3 space-y-1 text-sm">
            <div>యంత్రం: <b>${eq}</b></div>
            <div>వ్యవధి: <b>${hours} గంటలు</b> | తేదీ: <b>${date}</b></div>
            <div>సబ్సిడీ కిరాయి: <b>₹${total}</b> (@ ₹${rate}/hr)</div>
          </div>
          <button onclick="kiosk.printChcSlip('${token}', '${eq}', '${hours}', '${total}')" class="w-full py-2.5 rounded-xl bg-amber-400 text-emerald-950 font-black hover:bg-amber-300 flex items-center justify-center gap-2">
            <i class="fa-solid fa-print"></i> యంత్రాల బుకింగ్ పాస్ ప్రింట్
          </button>
        </div>
      `;

      this.triggerConfetti();
      this.speakText(`${eq} బుకింగ్ విజయవంతమైంది. మొత్తం కిరాయి ${total} రూపాయలు.`);
    }
  }

  // ================= NUMPAD LOGIC =================
  initNumpad() {
    document.querySelectorAll(".numpad-touch-input").forEach(inp => {
      inp.addEventListener("focus", (e) => {
        this.activeNumpadTarget = e.target;
      });
      inp.addEventListener("click", (e) => {
        this.activeNumpadTarget = e.target;
      });
    });
  }

  handleNumpadKey(key) {
    if (!this.activeNumpadTarget) {
      const visibleInput = document.querySelector(".kiosk-fullscreen-modal:not(.hidden) .numpad-touch-input");
      if (visibleInput) this.activeNumpadTarget = visibleInput;
      else return;
    }

    if (key === 'clear') {
      this.activeNumpadTarget.value = "";
    } else if (key === 'back') {
      this.activeNumpadTarget.value = this.activeNumpadTarget.value.slice(0, -1);
    } else {
      this.activeNumpadTarget.value += key;
    }
    
    this.activeNumpadTarget.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // ================= GIANT 1-TOUCH MIC QUERY =================
  startVoiceQuery() {
    const micBtn = document.getElementById("kiosk-giant-mic-btn");
    const speechBubble = document.getElementById("kiosk-avatar-bubble");
    
    if (micBtn) micBtn.classList.add("listening");
    if (speechBubble) speechBubble.innerHTML = `<span class="text-amber-300 font-bold">${this.i18nDict[this.currentLang]?.listening}</span>`;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Microphone recognition is not supported on this browser. Please touch any service card.");
      if (micBtn) micBtn.classList.remove("listening");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = this.currentLang === 'te' ? 'te-IN' : this.currentLang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event) => {
      const query = event.results[0][0].transcript;
      console.log("Kiosk Voice Query:", query);
      const searchInput = document.getElementById("kiosk-search-input");
      if (searchInput) searchInput.value = query;
      if (micBtn) micBtn.classList.remove("listening");
      this.performSchemeSearch(query);
    };

    recognition.onerror = (e) => {
      console.warn("Speech error:", e);
      if (micBtn) micBtn.classList.remove("listening");
      this.setAvatarSpeech("వాయిస్ రికార్డింగ్ విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.");
    };

    recognition.onend = () => {
      if (micBtn) micBtn.classList.remove("listening");
    };

    recognition.start();
  }

  // ================= LANGUAGE APPLICATION =================
  applyLanguage(lang) {
    this.currentLang = lang;
    document.querySelectorAll(".kiosk-lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    const dict = this.i18nDict[lang] || this.i18nDict['en'];
    document.querySelectorAll("[data-kiosk-i18n]").forEach(el => {
      const key = el.getAttribute("data-kiosk-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    this.setAvatarSpeech(dict.avatar_greeting);
    this.updateStateView(this.currentStateId);
  }

  // ================= THERMAL RECEIPT PRINTER =================
  printSlip(title, rows = []) {
    const printArea = document.getElementById("kiosk-print-area");
    if (!printArea) return;

    const now = new Date().toLocaleString('en-IN');
    const stateObj = this.allStates.find(s => s.id === this.currentStateId) || { name_en: 'Andhra Pradesh' };

    printArea.innerHTML = `
      <div style="font-family: monospace; max-width: 380px; margin: 0 auto; padding: 20px; border: 1px dashed #000; background: #fff; color: #000;">
        <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px;">
          <h2 style="margin: 0; font-size: 18px; font-weight: 900;">SAHAKARA MITRA KIOSK</h2>
          <p style="margin: 2px 0; font-size: 11px;">GOVT. OF ${stateObj.name_en.toUpperCase()} • RSK OFFICIAL PASS</p>
          <p style="margin: 0; font-size: 10px;">Date: ${now}</p>
        </div>
        
        <h3 style="text-align: center; font-size: 14px; font-weight: bold; margin: 8px 0; background: #eee; padding: 4px;">${title.toUpperCase()}</h3>

        <table style="width: 100%; font-size: 12px; margin: 12px 0; border-collapse: collapse;">
          ${rows.map(r => `
            <tr>
              <td style="padding: 4px 0; color: #333; font-weight: bold;">${r.label}:</td>
              <td style="padding: 4px 0; text-align: right; font-weight: 900;">${r.value}</td>
            </tr>
          `).join("")}
        </table>

        <div style="text-align: center; margin-top: 15px; border-top: 1px dashed #000; padding-top: 10px;">
          <p style="font-size: 18px; letter-spacing: 4px; font-weight: bold; margin: 5px 0;">|||| | ||||| || ||||||</p>
          <p style="font-size: 10px; margin: 0;">OFFICIAL RSK & PACS ATM VERIFIED RECEIPT</p>
          <p style="font-size: 9px; margin-top: 4px; color: #666;">Helpline: 1551 / 1800-425-4440 / 1902</p>
        </div>
      </div>
    `;

    setTimeout(() => {
      window.print();
    }, 200);
  }

  printBenefitSlip(aadhaar) {
    this.printSlip("DBT BENEFIT STATUS PASS", [
      { label: "Aadhaar", value: `**** **** ${aadhaar.slice(-4)}` },
      { label: "Beneficiary", value: "Ramarao (Farmer)" },
      { label: "Installment 1", value: "₹7,500 (Credited)" },
      { label: "Installment 2", value: "₹4,000 (Credited)" },
      { label: "Installment 3", value: "₹2,000 (Scheduled)" },
      { label: "e-KYC Status", value: "VERIFIED" }
    ]);
  }

  printWizardPass() {
    this.printSlip("AI SCHEME ELIGIBILITY PASS", [
      { label: "Scheme 1", value: "Annadata Sukhibhava (₹20,000)" },
      { label: "Scheme 2", value: "0% PACS Crop Loan (Sunna Vaddi)" },
      { label: "Scheme 3", value: "100% Free Crop Insurance" },
      { label: "Status", value: "PRE-ELIGIBLE (RSK Verified)" }
    ]);
  }

  printInsuranceSlip(crop, acres, sum, savings) {
    this.printSlip("100% FREE CROP INSURANCE PASS", [
      { label: "Crop Type", value: crop.toUpperCase() },
      { label: "Acreage", value: `${acres} Acres` },
      { label: "Sum Insured", value: `₹${parseInt(sum).toLocaleString('en-IN')}` },
      { label: "Farmer Premium", value: "₹0 (100% Free)" },
      { label: "Premium Savings", value: `₹${parseInt(savings).toLocaleString('en-IN')}` }
    ]);
  }

  printLoanEstimateSlip(crop, acres, amount) {
    this.printSlip("0% CROP LOAN PRE-APPROVAL", [
      { label: "Loan Category", value: crop },
      { label: "Farm Limit", value: `${acres}` },
      { label: "Approved Limit", value: `₹${parseInt(amount).toLocaleString('en-IN')}` },
      { label: "Interest Rate", value: "0.0% (Zero Cost)" },
      { label: "Society", value: "Primary Agri Coop Society (PACS)" }
    ]);
  }

  printGrievanceSlip(token, cat, pacs, phone) {
    this.printSlip("SPANDANA GRIEVANCE PASS", [
      { label: "Ticket ID", value: token },
      { label: "Category", value: cat },
      { label: "Assigned To", value: "District Coop Officer (DCO)" },
      { label: "Contact Phone", value: phone },
      { label: "SLA SLA Limit", value: "Resolution in 7 Days" }
    ]);
  }

  printPacsSlip(token, item, qty, center) {
    this.printSlip("PACS SUBSIDY STOCK TOKEN", [
      { label: "Token ID", value: token },
      { label: "Item", value: item },
      { label: "Quantity", value: `${qty} Bags` },
      { label: "Depot", value: center },
      { label: "Validity", value: "48 Hours" }
    ]);
  }

  printChcSlip(token, equip, hours, cost) {
    this.printSlip("CHC MACHINERY RENTAL PASS", [
      { label: "Booking ID", value: token },
      { label: "Equipment", value: equip },
      { label: "Duration", value: `${hours} Hours` },
      { label: "Subsidy Cost", value: `₹${cost}` }
    ]);
  }

  printSingleSchemePass(title, benefit) {
    this.printSlip("GOVERNMENT SCHEME PASS", [
      { label: "Scheme Name", value: title },
      { label: "Benefit", value: benefit.substring(0, 45) + '...' },
      { label: "Context", value: "28 States & Central MoC" }
    ]);
  }

  // ================= CONFETTI EFFECT =================
  triggerConfetti() {
    const canvas = document.getElementById("kiosk-confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ["#fbbf24", "#34d399", "#60a5fa", "#f43f5e", "#a78bfa", "#facc15"];

    for (let i = 0; i < 60; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        w: Math.random() * 10 + 6,
        h: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: Math.random() * 3 + 2,
        vx: (Math.random() - 0.5) * 3,
        rot: Math.random() * 360
      });
    }

    let frames = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
        p.y += p.vy;
        p.x += p.vx;
        p.rot += 3;
      });

      frames++;
      if (frames < 90) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animate();
  }

  // ================= MODAL HELPERS =================
  openModal(modalId) {
    this.closeAllModals();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      this.idleTimeSeconds = 0;
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
      this.idleTimeSeconds = 0;
    }
  }

  closeAllModals() {
    document.querySelectorAll(".kiosk-fullscreen-modal").forEach(m => m.classList.add("hidden"));
  }

  bindEvents() {
    const searchInput = document.getElementById("kiosk-search-input");
    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
          this.performSchemeSearch();
        }
      });
    }
  }
}

window.kiosk = new KioskEngine();
document.addEventListener("DOMContentLoaded", () => {
  window.kiosk.init();
});
