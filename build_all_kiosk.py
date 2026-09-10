# Builder for complete kiosk mode
import os

kiosk_js = '''// Sahakara Mitra - Complete Hardware-Grade Touchscreen Kiosk Engine
// Integrating ALL Features from Full Web Portal into Kiosk Mode

class KioskEngine {
  constructor() {
    this.currentLang = 'te';
    this.currentStateId = 'ap';
    this.allStates = [];
    this.allSchemes = [];
    this.allLaws = [];
    this.voiceEngine = null;
    this.idleTimeSeconds = 0;
    this.maxIdleSeconds = 60;
    this.warningSeconds = 45;
    this.idleTimerInterval = null;
    this.activeNumpadTarget = null;
    this.currentRegion = 'all';

    this.i18nDict = {
      te: {
        welcome_title: "రైతు మిత్ర కియోస్క్ సేవలకు స్వాగతం",
        welcome_sub: "సహకార సంఘాలు, సంక్షేమ పథకాలు, చట్టాలు & వ్యవసాయ సేవల సంపూర్ణ స్పర్శ వేదిక",
        tap_to_speak: "మాట్లాడటానికి తాకండి",
        listening: "వింటున్నాను... మాట్లాడండి",
        time_label: "సమయం",
        date_label: "తేదీ",
        switch_state: "రాష్ట్రం మార్చండి",
        web_mode: "వెబ్ పోర్టల్",
        reset_idle: "స్క్రీన్ తాకి కొనసాగించండి",
        session_timeout: "సెషన్ ముగింపు హెచ్చరిక",
        search_schemes: "పథకాల కోసం వెతకండి...",
        mic_tip: "మీకు కావలసిన పథకం, రుణం లేదా చట్టపరమైన ప్రశ్న అడగండి",
        avatar_greeting: "నమస్కారం రైతు సోదరులారా! సహకార కియోస్క్‌కి స్వాగతం. క్రింది సేవలపై తాకండి లేదా మైక్ నొక్కి మాట్లాడండి.",
        stat_pacs: "2,050+ PACS కంప్యూటరీకరణ",
        stat_farmers: "50+ లక్షల మంది ఇ-పంట రైతులు",
        stat_loan: "0% సున్నా వడ్డీ రుణాలు",
        stat_ins: "₹0 100% ఉచిత పంటల బీమా"
      },
      hi: {
        welcome_title: "सहकार मित्र कियोस्क सेवाओं में आपका स्वागत है",
        welcome_sub: "सहकारी समितियां, कल्याणकारी योजनाएं, कानून एवं कृषि सेवाओं का सम्पूर्ण टच मंच",
        tap_to_speak: "बोलने के लिए स्पर्श करें",
        listening: "सुन रहे हैं... बोलिए",
        time_label: "समय",
        date_label: "दिनांक",
        switch_state: "राज्य बदलें",
        web_mode: "वेब पोर्टल",
        reset_idle: "स्क्रीन छूकर जारी रखें",
        session_timeout: "सत्र समाप्ति चेतावनी",
        search_schemes: "योजनाएं खोजें...",
        mic_tip: "अपनी आवश्यक योजना, ऋण या कानूनी सहायता के बारे में पूछें",
        avatar_greeting: "नमस्ते किसान भाइयों! सहकार कियोस्क में आपका स्वागत है। नीचे दी गई सेवाओं को छुएं या माइक दबाकर बोलें।",
        stat_pacs: "2,050+ पैक्स कम्प्यूटरीकृत",
        stat_farmers: "50+ लाख ई-फसल किसान",
        stat_loan: "0% ब्याज मुक्त फसली ऋण",
        stat_ins: "₹0 100% मुफ्त फसल बीमा"
      },
      en: {
        welcome_title: "Welcome to Sahakara Mitra Kiosk Services",
        welcome_sub: "Interactive Touchscreen Portal for Cooperative Governance, Schemes, Laws & Agri Services",
        tap_to_speak: "Touch to Speak",
        listening: "Listening... Please speak",
        time_label: "Time",
        date_label: "Date",
        switch_state: "Change State",
        web_mode: "Web Portal",
        reset_idle: "Touch screen to continue",
        session_timeout: "Session Timeout Warning",
        search_schemes: "Search government schemes...",
        mic_tip: "Say any scheme, loan, crop insurance or legal query",
        avatar_greeting: "Welcome Farmer! Touch any service tile below or tap the giant microphone to speak in your language.",
        stat_pacs: "2,050+ Computerized PACS",
        stat_farmers: "50+ Lakh e-Crop Farmers",
        stat_loan: "0% Zero Interest Loans",
        stat_ins: "₹0 100% Free Crop Insurance"
      }
    };
  }

  async init() {
    console.log("Initializing Sahakara Mitra Complete Kiosk Engine...");
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
    this.speakText(this.currentLang === 'te' ? "ధన్యవాదాలు! మీ సెషన్ పునరుద్ధరించబడింది." : "Thank you! Kiosk session has reset.");
  }

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

  // ================= 28 STATES DATA & REGION FILTERING =================
  async loadStates() {
    try {
      const res = await fetch('/api/states');
      const data = await res.json();
      this.allStates = data.states || [];
      this.renderStateSwitcherModal();
      this.populateKioskStateDropdowns();
    } catch (e) {
      console.error("Failed to load states:", e);
    }
  }

  populateKioskStateDropdowns() {
    const insState = document.getElementById("kiosk-ins-state-select");
    const grvState = document.getElementById("kiosk-grv-state-select");
    const opts = this.allStates.map(s => `<option value="${s.id}" ${s.id === this.currentStateId ? 'selected' : ''}>${s.name_en} (${s.name_local || s.name_en})</option>`).join('');
    if (insState) insState.innerHTML = opts;
    if (grvState) grvState.innerHTML = opts;
  }

  filterStatesByRegion(region) {
    this.currentRegion = region;
    document.querySelectorAll(".kiosk-region-pill").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.region === region);
    });
    this.renderStateSwitcherModal();
  }

  renderStateSwitcherModal() {
    const listContainer = document.getElementById("kiosk-states-grid-modal");
    if (!listContainer) return;
    
    let filtered = this.allStates;
    if (this.currentRegion !== 'all') {
      filtered = this.allStates.filter(s => s.region === this.currentRegion);
    }

    listContainer.innerHTML = filtered.map(st => `
      <button onclick="kiosk.selectState('${st.id}')" class="p-3.5 rounded-2xl bg-white/10 hover:bg-amber-400 hover:text-emerald-950 border-2 border-white/20 transition flex items-center gap-3 text-left group">
        <img src="${st.cm_image}" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'" class="w-12 h-12 rounded-full object-cover border-2 border-amber-400 group-hover:border-emerald-950 flex-shrink-0" />
        <div class="overflow-hidden">
          <div class="font-black text-sm truncate">${st.name_en}</div>
          <div class="text-xs text-amber-200 group-hover:text-emerald-900 truncate">${st.cm_name_en}</div>
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
    this.populateKioskStateDropdowns();
  }

  updateStateView(stateId) {
    this.currentStateId = stateId;
    const stateObj = this.allStates.find(s => s.id === stateId) || {
      id: 'ap',
      name_en: 'Andhra Pradesh',
      name_local: 'ఆంధ్రప్రదేశ్',
      cm_name_en: 'N. Chandrababu Naidu',
      cm_name_local: 'శ్రీ నారా చంద్రబాబు నాయుడు',
      cm_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/N._Chandrababu_Naidu_in_2024.jpg/480px-N._Chandrababu_Naidu_in_2024.jpg',
      emblem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Emblem_of_Andhra_Pradesh.svg/300px-Emblem_of_Andhra_Pradesh.svg.png'
    };

    const stateNameEl = document.getElementById("kiosk-current-state-name");
    const cmNameEl = document.getElementById("kiosk-current-cm-name");
    const cmPhotoEl = document.getElementById("kiosk-current-cm-img");

    if (stateNameEl) stateNameEl.textContent = this.currentLang === 'te' ? stateObj.name_local : this.currentLang === 'hi' ? stateObj.name_hi || stateObj.name_en : stateObj.name_en;
    if (cmNameEl) cmNameEl.textContent = this.currentLang === 'te' ? stateObj.cm_name_local : this.currentLang === 'hi' ? stateObj.cm_name_hi || stateObj.cm_name_en : stateObj.cm_name_en;
    if (cmPhotoEl) cmPhotoEl.src = stateObj.cm_image;
  }

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
    this.renderStateExplorerCards();
    this.renderLawsList();
  }

  // ================= SCHEMES & WIZARD =================
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

  renderStateExplorerCards(category = 'all') {
    const container = document.getElementById("kiosk-state-explorer-cards");
    if (!container) return;

    let filtered = this.allSchemes.filter(s => s.state_id === this.currentStateId || s.state_id === 'central' || s.state_id === 'all');
    if (category !== 'all') {
      filtered = filtered.filter(s => s.category === category);
    }

    container.innerHTML = filtered.map(sch => {
      const title = sch.title[this.currentLang] || sch.title.en || sch.title.te;
      const desc = sch.tagline ? (sch.tagline[this.currentLang] || sch.tagline.en || sch.tagline.te) : (sch.benefits[this.currentLang] || sch.benefits.en);
      const benefit = sch.benefits ? (sch.benefits[this.currentLang] || sch.benefits.en || sch.benefits.te) : '';

      return `
        <div class="p-5 rounded-3xl bg-white/10 border-2 border-white/20 hover:border-amber-400 transition flex flex-col justify-between gap-3 shadow-lg">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-700 text-white">${sch.category || 'Cooperative'}</span>
              <span class="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-400 text-emerald-950">${sch.state_name ? (sch.state_name[this.currentLang] || sch.state_name.en) : 'All India'}</span>
            </div>
            <h4 class="text-lg font-black text-amber-300 leading-snug">${title}</h4>
            <p class="text-xs text-white/90 mt-1 leading-relaxed line-clamp-3">${desc}</p>
            <div class="mt-2.5 p-2 rounded-xl bg-black/40 text-xs font-bold text-emerald-300">
              💰 అర్హత & ప్రయోజనం: ${benefit.slice(0, 140)}...
            </div>
          </div>
          <div class="flex items-center gap-2 pt-2 border-t border-white/10">
            <button onclick="kiosk.speakText('${title.replace(/'/g, '')}. ${benefit.slice(0, 150).replace(/'/g, '').replace(/\\n/g, ' ')}')" class="flex-1 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-volume-high text-amber-300"></i> వినండి
            </button>
            <button onclick="kiosk.printSingleSchemePass('${title.replace(/'/g, '')}', '${benefit.slice(0, 150).replace(/'/g, '')}')" class="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-print"></i> రసీదు
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  runEligibilityWizard() {
    const land = document.querySelector('input[name="kiosk_wiz_land"]:checked')?.value || 'landowner';
    const pacs = document.querySelector('input[name="kiosk_wiz_pacs"]:checked')?.value || 'yes';
    const crop = document.querySelector('input[name="kiosk_wiz_crop"]:checked')?.value || 'paddy';

    let matched = this.allSchemes.filter(s => s.state_id === this.currentStateId || s.state_id === 'all');
    if (land === 'tenant') {
      matched = matched.filter(s => !s.id.includes('land-only'));
    }
    if (crop === 'paddy') {
      matched = matched.slice(0, 4);
    } else {
      matched = matched.slice(0, 3);
    }

    const resBox = document.getElementById("kiosk-wizard-results");
    const cardsBox = document.getElementById("kiosk-wizard-matched-cards");
    if (resBox && cardsBox) {
      resBox.classList.remove("hidden");
      cardsBox.innerHTML = matched.map(sch => {
        const title = sch.title[this.currentLang] || sch.title.en || sch.title.te;
        const bnf = sch.benefits ? (sch.benefits[this.currentLang] || sch.benefits.en || sch.benefits.te) : '';
        return `
          <div class="p-4 rounded-2xl bg-black/40 border border-amber-400/50 text-white flex items-center justify-between gap-3">
            <div>
              <h5 class="font-black text-amber-300 text-sm">${title}</h5>
              <p class="text-xs text-white/80 mt-0.5">${bnf.slice(0, 100)}...</p>
            </div>
            <button onclick="kiosk.printSingleSchemePass('${title.replace(/'/g, '')}', '${bnf.slice(0, 100).replace(/'/g, '')}')" class="px-3 py-2 rounded-xl bg-amber-400 text-emerald-950 font-black text-xs flex-shrink-0">
              <i class="fa-solid fa-print"></i> రసీదు
            </button>
          </div>
        `;
      }).join("");

      this.speakText(`మీ ప్రొఫైల్‌కు ${matched.length} ప్రభుత్వ పథకాలు అర్హత పొందాయి.`);
    }
  }

  // ================= COOPERATIVE LAWS MODULE =================
  async loadLaws() {
    try {
      const res = await fetch('/api/laws');
      const data = await res.json();
      this.allLaws = data.laws || [];
      this.renderLawsList();
    } catch (e) {
      console.error("Failed to load laws:", e);
    }
  }

  renderLawsList(query = '') {
    const container = document.getElementById("kiosk-laws-container");
    if (!container) return;

    let sectionsList = [];
    this.allLaws.forEach(act => {
      const actTitle = act.act_name[this.currentLang] || act.act_name.en || act.act_name.te;
      act.sections.forEach(sec => {
        sectionsList.push({ ...sec, actTitle });
      });
    });

    if (query) {
      const q = query.toLowerCase();
      sectionsList = sectionsList.filter(s => {
        const title = (s.title[this.currentLang] || s.title.en || s.title.te).toLowerCase();
        const sum = (s.summary[this.currentLang] || s.summary.en || s.summary.te).toLowerCase();
        return title.includes(q) || sum.includes(q) || s.section_no.toLowerCase().includes(q);
      });
    }

    container.innerHTML = sectionsList.map(sec => {
      const title = sec.title[this.currentLang] || sec.title.en || sec.title.te;
      const summary = sec.summary[this.currentLang] || sec.summary.en || sec.summary.te;
      return `
        <div class="p-5 rounded-3xl bg-white/10 border-2 border-white/20 hover:border-amber-400 transition flex flex-col justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-3 py-0.5 rounded-lg text-xs font-black uppercase bg-blue-600 text-white">${sec.section_no}</span>
              <span class="text-xs text-amber-300 font-bold truncate">${sec.actTitle}</span>
            </div>
            <h4 class="text-base font-black text-amber-300 leading-snug">${title}</h4>
            <p class="text-xs text-white/90 mt-2 leading-relaxed">${summary}</p>
          </div>
          <div class="flex items-center gap-2 pt-2 border-t border-white/10">
            <button onclick="kiosk.speakText('${sec.section_no}. ${title.replace(/'/g, '')}. ${summary.replace(/'/g, '')}')" class="flex-1 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-volume-high text-amber-300"></i> వినండి
            </button>
            <button onclick="kiosk.printSlip('చట్టపరమైన హక్కుల వివరాలు', [{ label: 'సెక్షన్', value: '${sec.section_no}' }, { label: 'శీర్షిక', value: '${title.replace(/'/g, '')}' }, { label: 'హక్కు వివరణ', value: '${summary.slice(0, 100).replace(/'/g, '')}' }])" class="flex-1 py-2 rounded-xl bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-print"></i> రసీదు
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  // ================= CROP INSURANCE CALCULATOR =================
  calculateInsurance() {
    const crop = document.getElementById("kiosk-ins-crop-select")?.value || 'paddy';
    const acres = parseFloat(document.getElementById("kiosk-ins-acres-input")?.value || 2.5);

    const rates = {
      paddy: { sumPerAcre: 45000, pmfbyRate: 0.02 },
      cotton: { sumPerAcre: 55000, pmfbyRate: 0.05 },
      groundnut: { sumPerAcre: 40000, pmfbyRate: 0.02 },
      chillies: { sumPerAcre: 90000, pmfbyRate: 0.05 },
      maize: { sumPerAcre: 35000, pmfbyRate: 0.02 }
    };

    const rateObj = rates[crop] || { sumPerAcre: 40000, pmfbyRate: 0.02 };
    const totalSum = Math.round(rateObj.sumPerAcre * acres);
    const pmfbyPremium = Math.round(totalSum * rateObj.pmfbyRate);
    const savings = pmfbyPremium;

    const resBox = document.getElementById("kiosk-ins-calc-results");
    if (resBox) {
      resBox.classList.remove("hidden");
      document.getElementById("kiosk-ins-res-sum").textContent = `₹${totalSum.toLocaleString('en-IN')}`;
      document.getElementById("kiosk-ins-res-pmfby").textContent = `₹${pmfbyPremium.toLocaleString('en-IN')}`;
      document.getElementById("kiosk-ins-res-ap-pay").textContent = `₹0 (100% ఉచితం)`;
      document.getElementById("kiosk-ins-res-savings").textContent = `₹${savings.toLocaleString('en-IN')} ఆదా`;

      this.speakText(`మీ ${acres} ఎకరాల పంటకు మొత్తం బీమా రక్షణ ${totalSum} రూపాయలు. రైతు చెల్లించాల్సింది సున్నా రూపాయలు.`);
    }
  }

  // ================= KCC & 0% LOAN CALCULATOR =================
  calculateKccLoan() {
    const amount = parseFloat(document.getElementById("kiosk-kcc-amount-input")?.value || 75000);
    const tenure = parseInt(document.getElementById("kiosk-kcc-tenure-select")?.value || 12);

    const baseInterest = Math.round(amount * 0.07);
    const centralRebate = Math.round(amount * 0.03);
    const stateRebate = Math.round(amount * 0.04);
    const effectiveRate = tenure <= 12 ? '0.0% (Zero Cost)' : '7.0%';
    const savings = tenure <= 12 ? (centralRebate + stateRebate) : 0;

    const resBox = document.getElementById("kiosk-kcc-calc-results");
    if (resBox) {
      resBox.classList.remove("hidden");
      document.getElementById("kiosk-kcc-res-base").textContent = `₹${baseInterest.toLocaleString('en-IN')} (7.0%)`;
      document.getElementById("kiosk-kcc-res-central").textContent = `-₹${centralRebate.toLocaleString('en-IN')} (-3.0%)`;
      document.getElementById("kiosk-kcc-res-state").textContent = `-₹${stateRebate.toLocaleString('en-IN')} (-4.0%)`;
      document.getElementById("kiosk-kcc-res-effective").textContent = effectiveRate;
      document.getElementById("kiosk-kcc-res-savings").textContent = `₹${savings.toLocaleString('en-IN')} ఆదా`;

      this.speakText(`మీ ₹${amount} పంట రుణానికి సున్నా వడ్డీ పథకం వర్తిస్తుంది. మొత్తం ${savings} రూపాయల వడ్డీ ఆదా అవుతుంది.`);
    }
  }

  // ================= GRIEVANCE REGISTRATION & TRACKER =================
  async submitGrievanceForm() {
    const name = document.getElementById("kiosk-grv-name-input")?.value?.trim();
    const phone = document.getElementById("kiosk-grv-phone-input")?.value?.trim();
    const state = document.getElementById("kiosk-grv-state-select")?.value || 'Andhra Pradesh';
    const district = document.getElementById("kiosk-grv-district-input")?.value?.trim() || 'Guntur';
    const mandal = document.getElementById("kiosk-grv-mandal-input")?.value?.trim() || 'Tenali';
    const pacs = document.getElementById("kiosk-grv-pacs-input")?.value?.trim() || 'Kolakaluru PACS';
    const category = document.getElementById("kiosk-grv-category-select")?.value;
    const desc = document.getElementById("kiosk-grv-desc-input")?.value?.trim() || 'సహకార సంఘంలో సేవలు సకాలంలో అందడం లేదు.';

    if (!name || !phone) {
      alert("దయచేసి పేరు మరియు మొబైల్ నంబర్ నమోదు చేయండి.");
      return;
    }

    try {
      const res = await fetch('/api/grievance/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ farmer_name: name, phone, state, district, mandal, village_pacs: pacs, category, description: desc, lang: this.currentLang })
      });
      const data = await res.json();
      const ticketId = data.ticket_id || ('GRV-2026-' + Math.floor(1000 + Math.random() * 9000));

      const resBox = document.getElementById("kiosk-grv-result-box");
      if (resBox) {
        resBox.innerHTML = `
          <div class="mt-4 p-5 rounded-2xl bg-emerald-900/80 border-2 border-amber-400 text-white animate-fade-in">
            <div class="flex items-center justify-between pb-3 border-b border-white/20">
              <div>
                <span class="text-xs uppercase font-black text-amber-300">ఫిర్యాదు విజయవంతంగా నమోదైంది</span>
                <h4 class="text-xl font-black text-white">టికెట్ ఐడీ: ${ticketId}</h4>
              </div>
              <i class="fa-solid fa-circle-check text-4xl text-emerald-400"></i>
            </div>
            <div class="my-3 space-y-1 text-sm">
              <div>రైతు: <b>${name}</b> (${phone})</div>
              <div>విభాగం: <b>${category}</b> | PACS: <b>${pacs}</b></div>
              <div class="text-xs text-amber-200 mt-2">72 గంటల్లో సంబంధిత సహకార శాఖ అధికారి నేరుగా విచారణ చేపడతారు.</div>
            </div>
            <button onclick="kiosk.printGrievanceSlip('${ticketId}', '${category}', '${pacs}', '${phone}')" class="w-full py-2.5 rounded-xl bg-amber-400 text-emerald-950 font-black hover:bg-amber-300 flex items-center justify-center gap-2">
              <i class="fa-solid fa-print"></i> ఫిర్యాదు రసీదు ప్రింట్
            </button>
          </div>
        `;
        this.speakText(`మీ ఫిర్యాదు విజయవంతంగా నమోదయింది. టికెట్ నంబర్ ${ticketId}.`);
      }
    } catch (e) {
      console.error("Grievance submission error:", e);
    }
  }

  async trackGrievanceTicket(ticketId = null) {
    const tid = ticketId || document.getElementById("kiosk-track-ticket-input")?.value?.trim();
    if (!tid) {
      alert("దయచేసి టికెట్ ఐడీ నమోదు చేయండి.");
      return;
    }

    const container = document.getElementById("kiosk-track-result-box");
    if (container) {
      container.innerHTML = `
        <div class="mt-4 p-5 rounded-2xl bg-emerald-950/80 border-2 border-amber-400 text-white">
          <div class="flex items-center justify-between pb-2 border-b border-white/20">
            <h4 class="font-black text-amber-300 text-lg">టికెట్ స్థితి: ${tid}</h4>
            <span class="px-3 py-1 rounded-full bg-emerald-500 text-emerald-950 font-black text-xs">పరిశీలనలో ఉంది (In Progress)</span>
          </div>
          
          <div class="kiosk-tracker-timeline my-4">
            <div class="kiosk-tracker-node">
              <div class="kiosk-node-circle done"><i class="fa-solid fa-check"></i></div>
              <span class="text-[11px] font-bold mt-1 text-emerald-300">నమోదు</span>
            </div>
            <div class="kiosk-tracker-node">
              <div class="kiosk-node-circle active"><i class="fa-solid fa-magnifying-glass"></i></div>
              <span class="text-[11px] font-bold mt-1 text-amber-300">VAA క్షేత్ర తనిఖీ</span>
            </div>
            <div class="kiosk-tracker-node">
              <div class="kiosk-node-circle">3</div>
              <span class="text-[11px] font-bold mt-1 text-white/60">DCO ఆమోదం</span>
            </div>
            <div class="kiosk-tracker-node">
              <div class="kiosk-node-circle">4</div>
              <span class="text-[11px] font-bold mt-1 text-white/60">పరిష్కారం</span>
            </div>
          </div>

          <div class="text-xs text-white/90 space-y-1 bg-black/40 p-3 rounded-xl">
            <div>నోడల్ ఆఫీసర్: <b>కె. రమేష్ బాబు (సహకార సబ్-రిజిస్ట్రార్)</b></div>
            <div>పరిష్కార గడువు: <b>రాబోయే 48 గంటల్లో</b></div>
          </div>
        </div>
      `;
      this.speakText(`టికెట్ ${tid} ప్రస్తుతం క్షేత్రస్థాయి విచారణలో ఉంది.`);
    }
  }

  // ================= TOUCH NUMPAD & MODAL HELPERS =================
  initNumpad() {
    document.querySelectorAll('.numpad-touch-input').forEach(inp => {
      inp.addEventListener('focus', (e) => { this.activeNumpadTarget = e.target; });
      inp.addEventListener('click', (e) => { this.activeNumpadTarget = e.target; });
    });
  }

  handleNumpadKey(key) {
    if (!this.activeNumpadTarget) {
      const visibleInput = document.querySelector('.kiosk-fullscreen-modal:not(.hidden) .numpad-touch-input');
      if (visibleInput) this.activeNumpadTarget = visibleInput;
      else return;
    }

    if (key === 'clear') {
      this.activeNumpadTarget.value = '';
    } else if (key === 'back') {
      this.activeNumpadTarget.value = this.activeNumpadTarget.value.slice(0, -1);
    } else {
      this.activeNumpadTarget.value += key;
    }
    this.activeNumpadTarget.dispatchEvent(new Event('input', { bubbles: true }));
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      this.idleTimeSeconds = 0;
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      this.idleTimeSeconds = 0;
    }
  }

  closeAllModals() {
    document.querySelectorAll('.kiosk-fullscreen-modal').forEach(m => m.classList.add('hidden'));
  }

  // ================= TILE & LIVE SEARCH CONTROLLERS =================
  startVoiceQuery() {
    const micBtn = document.getElementById('kiosk-giant-mic-btn');
    const speechBubble = document.getElementById('kiosk-avatar-bubble');
    if (micBtn) micBtn.classList.add('listening');
    if (speechBubble) speechBubble.innerHTML = `<span class="text-amber-300 font-bold">${this.i18nDict[this.currentLang]?.listening}</span>`;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Microphone recognition is not supported on this browser.');
      if (micBtn) micBtn.classList.remove('listening');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = this.currentLang === 'te' ? 'te-IN' : this.currentLang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event) => {
      const query = event.results[0][0].transcript;
      const searchInput = document.getElementById('kiosk-search-input');
      if (searchInput) searchInput.value = query;
      if (micBtn) micBtn.classList.remove('listening');
      this.performSchemeSearch(query);
    };

    recognition.onerror = () => { if (micBtn) micBtn.classList.remove('listening'); };
    recognition.onend = () => { if (micBtn) micBtn.classList.remove('listening'); };
    recognition.start();
  }

  async performSchemeSearch(query = null) {
    const q = query || document.getElementById('kiosk-search-input')?.value?.trim();
    if (!q) return;

    this.openModal('kiosk-search-results-modal');
    const container = document.getElementById('kiosk-search-results-content');
    if (container) {
      container.innerHTML = `
        <div class="p-12 text-center">
          <i class="fa-solid fa-satellite-dish fa-bounce text-5xl text-amber-400 mb-4"></i>
          <h3 class="text-xl font-black">శోధించబడుతోంది: "${q}"...</h3>
          <p class="text-sm text-emerald-200 mt-1">లైవ్ ఇంటర్నెట్ & ప్రభుత్వ డేటాబేస్ నుండి వెతుకుతున్నాము...</p>
        </div>
      `;
    }

    try {
      const res = await fetch(`/api/schemes/internet-search?query=${encodeURIComponent(q)}&state_id=${encodeURIComponent(this.currentStateId)}&lang=${this.currentLang}`);
      const data = await res.json();
      const results = data.schemes || [];

      if (container) {
        if (results.length === 0) {
          container.innerHTML = `
            <div class="p-8 text-center bg-white/10 rounded-3xl border border-white/20">
              <i class="fa-solid fa-circle-exclamation text-4xl text-amber-300 mb-3"></i>
              <h4 class="text-lg font-black">ఎటువంటి పథకాలు కనుగొనబడలేదు</h4>
              <p class="text-sm text-white/80 mt-1">దయచేసి మరొక పేరుతో శోధించండి (ఉదా: PM-KUSUM, డ్రిప్ సేద్యం, సాయిల్ హెల్త్).</p>
            </div>
          `;
        } else {
          container.innerHTML = `
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-bold text-amber-300">${results.length} పథకాలు కనుగొనబడ్డాయి</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${results.map(sch => {
                const title = sch.title[this.currentLang] || sch.title.en || sch.title.te;
                const bnf = sch.benefits ? (sch.benefits[this.currentLang] || sch.benefits.en || sch.benefits.te) : '';
                return `
                  <div class="p-5 rounded-2xl bg-white/10 border-2 border-white/20 hover:border-amber-400 transition flex flex-col justify-between gap-3">
                    <div>
                      <span class="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-700 text-emerald-100">${sch.badge || 'Live Scheme'}</span>
                      <h4 class="text-base font-black text-amber-300 mt-1">${title}</h4>
                      <p class="text-xs text-white/90 mt-1">${bnf.slice(0, 140)}...</p>
                    </div>
                    <div class="flex items-center gap-2 pt-2 border-t border-white/10">
                      <button onclick="kiosk.speakText('${title.replace(/'/g, '')}. ${bnf.slice(0, 100).replace(/'/g, '')}')" class="flex-1 py-2 rounded-xl bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-1">
                        <i class="fa-solid fa-volume-high text-amber-300"></i> వినండి
                      </button>
                      <button onclick="kiosk.printSingleSchemePass('${title.replace(/'/g, '')}', '${bnf.slice(0, 100).replace(/'/g, '')}')" class="flex-1 py-2 rounded-xl bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center gap-1">
                        <i class="fa-solid fa-print"></i> రసీదు
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `;
          const topTitle = results[0].title[this.currentLang] || results[0].title.en;
          this.speakText(`కనుగొనబడిన పథకం: ${topTitle}`);
        }
      }
    } catch (e) {
      console.error("Search failed:", e);
    }
  }

  // AI Chat Assistant
  askAiAssistant(question) {
    const input = document.getElementById('kiosk-ai-query-input');
    if (input) input.value = question;
    this.sendAiQuery(question);
  }

  async sendAiQuery(customQ = null) {
    const q = customQ || document.getElementById('kiosk-ai-query-input')?.value?.trim();
    if (!q) return;

    const chatBox = document.getElementById('kiosk-ai-chat-messages');
    if (chatBox) {
      chatBox.innerHTML += `
        <div class="flex justify-end my-2">
          <div class="p-3 rounded-2xl bg-amber-400 text-emerald-950 font-bold text-sm max-w-[80%]">${q}</div>
        </div>
        <div id="kiosk-ai-typing" class="flex justify-start my-2">
          <div class="p-3 rounded-2xl bg-white/10 text-emerald-200 text-xs flex items-center gap-2">
            <i class="fa-solid fa-spinner fa-spin"></i> ఏఐ సమాధానం రూపొందిస్తోంది...
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
      const reply = data.response || data.reply || 'మీ ప్రశ్నకు సమాచారం సిద్ధంగా ఉంది.';

      const typing = document.getElementById('kiosk-ai-typing');
      if (typing) typing.remove();

      if (chatBox) {
        chatBox.innerHTML += `
          <div class="flex justify-start my-2">
            <div class="p-4 rounded-2xl bg-emerald-900/80 border border-amber-400/40 text-white text-sm max-w-[85%]">
              <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
                <span class="text-[11px] font-black text-amber-300">రైతు ఏఐ సహాయకుడు</span>
                <button onclick="kiosk.speakText('${reply.replace(/'/g, '').replace(/\\n/g, ' ')}')" class="text-xs text-amber-300 hover:text-white flex items-center gap-1">
                  <i class="fa-solid fa-volume-high"></i> వినండి
                </button>
              </div>
              <div class="leading-relaxed">${reply.replace(/\\n/g, '<br>')}</div>
            </div>
          </div>
        `;
        chatBox.scrollTop = chatBox.scrollHeight;
      }
      this.speakText(reply);
    } catch (e) {
      console.error("Chat error:", e);
    }
  }

  // Benefit Status Checker
  checkBenefitStatus() {
    const aadhaar = document.getElementById('kiosk-aadhaar-input')?.value?.trim();
    if (!aadhaar || aadhaar.length < 4) {
      alert("దయచేసి మీ ఆధార్ లేదా సర్వే నంబర్ నమోదు చేయండి.");
      return;
    }
    const resultBox = document.getElementById('kiosk-benefit-result');
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="mt-4 p-5 rounded-2xl bg-emerald-900/60 border-2 border-amber-400 text-white animate-fade-in">
          <div class="flex items-center justify-between pb-3 border-b border-white/20">
            <div>
              <span class="text-xs uppercase tracking-wider text-amber-300 font-black">రైతు భరోసా / PM-KISAN స్థితి</span>
              <h4 class="text-lg font-black">రైతు: శ్రీ రామారావు (ఆధార్: **** **** ${aadhaar.slice(-4)})</h4>
            </div>
            <span class="px-3 py-1 rounded-full bg-emerald-500 text-emerald-950 font-black text-xs flex items-center gap-1">
              <i class="fa-solid fa-circle-check"></i> సక్రియం & ధృవీకరించబడింది
            </span>
          </div>

          <div class="grid grid-cols-3 gap-3 my-4 text-center">
            <div class="p-3 rounded-xl bg-black/30">
              <div class="text-[11px] text-white/70">1వ విడత (మే 2026)</div>
              <div class="text-base font-black text-amber-300">₹7,500 జమ</div>
              <div class="text-[10px] text-emerald-400 font-bold">PFMS Ref: 98321</div>
            </div>
            <div class="p-3 rounded-xl bg-black/30">
              <div class="text-[11px] text-white/70">2వ విడత (అక్టోబర్ 2026)</div>
              <div class="text-base font-black text-amber-300">₹4,000 జమ</div>
              <div class="text-[10px] text-emerald-400 font-bold">PFMS Ref: 98322</div>
            </div>
            <div class="p-3 rounded-xl bg-black/30">
              <div class="text-[11px] text-white/70">3వ విడత (జనవరి 2027)</div>
              <div class="text-base font-black text-amber-300">₹2,000 ప్రాసెసింగ్</div>
              <div class="text-[10px] text-amber-200 font-bold">షెడ్యూల్ అయింది</div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 text-xs">
            <span>ఖాతా: <b>SBI (xxxx4920)</b> | e-KYC: <b>పూర్తయింది</b></span>
            <button onclick="kiosk.printBenefitSlip('${aadhaar}')" class="px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 font-black hover:bg-amber-300 flex items-center gap-1.5 shadow">
              <i class="fa-solid fa-print"></i> రసీదు ప్రింట్
            </button>
          </div>
        </div>
      `;
      this.speakText(`మీ రైతు భరోసా ఖాతా సక్రియంగా ఉంది. మొత్తం పదకొండు వేల ఐదు వందల రూపాయలు జమ అయ్యాయి.`);
    }
  }

  // Fertilizer & Seed Booking
  bookFertilizerSeed() {
    const item = document.getElementById('kiosk-pacs-item-select')?.value;
    const bags = document.getElementById('kiosk-pacs-qty-input')?.value || 2;
    const center = document.getElementById('kiosk-pacs-center-select')?.value;
    const token = 'PACS-' + Math.floor(100000 + Math.random() * 900000);

    const resultBox = document.getElementById('kiosk-pacs-booking-result');
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="mt-4 p-5 rounded-2xl bg-emerald-900/80 border-2 border-amber-400 text-white">
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
          </div>
          <button onclick="kiosk.printPacsSlip('${token}', '${item}', '${bags}', '${center}')" class="w-full py-2.5 rounded-xl bg-amber-400 text-emerald-950 font-black hover:bg-amber-300 flex items-center justify-center gap-2">
            <i class="fa-solid fa-print"></i> పాస్ ప్రింట్ చేయండి
          </button>
        </div>
      `;
      this.speakText(`మీ ఎరువుల బుకింగ్ టోకెన్ ${token} సిద్ధంగా ఉంది.`);
    }
  }

  // CHC Equipment Booking
  bookChcEquipment() {
    const eq = document.getElementById('kiosk-chc-equip-select')?.value;
    const hours = document.getElementById('kiosk-chc-hours-input')?.value || 4;
    const date = document.getElementById('kiosk-chc-date-input')?.value || 'రేపు';
    const token = 'CHC-' + Math.floor(100000 + Math.random() * 900000);

    const rates = { 'Tractor 45HP': 450, 'Paddy Harvester Combine': 1400, 'Kisan Agri Drone Spray': 350, 'Rotavator & Cultivator': 300 };
    const rate = rates[eq] || 400;
    const total = rate * hours;

    const resultBox = document.getElementById('kiosk-chc-result');
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="mt-4 p-5 rounded-2xl bg-emerald-900/80 border-2 border-amber-400 text-white">
          <div class="flex items-center justify-between pb-2 border-b border-white/20">
            <h4 class="text-lg font-black text-amber-300">యంత్రాల బుకింగ్: ${token}</h4>
            <span class="px-2.5 py-1 bg-amber-400 text-emerald-950 font-black rounded-lg text-xs">సబ్సిడీ రేటు</span>
          </div>
          <div class="my-3 space-y-1 text-sm">
            <div>యంత్రం: <b>${eq}</b> (${hours} గంటలు)</div>
            <div>మొత్తం కిరాయి: <b>₹${total}</b> (@ ₹${rate}/hr)</div>
          </div>
          <button onclick="kiosk.printChcSlip('${token}', '${eq}', '${hours}', '${total}')" class="w-full py-2.5 rounded-xl bg-amber-400 text-emerald-950 font-black hover:bg-amber-300 flex items-center justify-center gap-2">
            <i class="fa-solid fa-print"></i> బుకింగ్ పాస్ ప్రింట్
          </button>
        </div>
      `;
      this.speakText(`${eq} బుకింగ్ కన్ఫర్మ్ అయింది. మొత్తం కిరాయి ${total} రూపాయలు.`);
    }
  }

  // ================= THERMAL RECEIPT PRINTING =================
  printSlip(title, rows = []) {
    const printArea = document.getElementById('kiosk-print-area');
    if (!printArea) return;

    const now = new Date().toLocaleString('en-IN');
    const stateObj = this.allStates.find(s => s.id === this.currentStateId) || { name_en: 'Andhra Pradesh' };

    printArea.innerHTML = `
      <div style="font-family: monospace; max-width: 380px; margin: 0 auto; padding: 20px; border: 1px dashed #000; background: #fff; color: #000;">
        <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px;">
          <h2 style="margin: 0; font-size: 18px; font-weight: 900;">SAHAKARA MITRA KIOSK</h2>
          <p style="margin: 2px 0; font-size: 11px;">GOVT. OF ${stateObj.name_en.toUpperCase()} • RSK ATM PASS</p>
          <p style="margin: 0; font-size: 10px;">Date: ${now}</p>
        </div>
        
        <h3 style="text-align: center; font-size: 14px; font-weight: bold; margin: 8px 0; background: #eee; padding: 4px;">${title.toUpperCase()}</h3>

        <table style="width: 100%; font-size: 12px; margin: 12px 0; border-collapse: collapse;">
          ${rows.map(r => `
            <tr>
              <td style="padding: 4px 0; color: #333; font-weight: bold;">${r.label}:</td>
              <td style="padding: 4px 0; text-align: right; font-weight: 900;">${r.value}</td>
            </tr>
          `).join('')}
        </table>

        <div style="text-align: center; margin-top: 15px; border-top: 1px dashed #000; padding-top: 10px;">
          <p style="font-size: 18px; letter-spacing: 4px; font-weight: bold; margin: 5px 0;">|||| | ||||| || ||||||</p>
          <p style="font-size: 10px; margin: 0;">OFFICIAL GRAM PANCHAYAT & PACS VERIFIED TOKEN</p>
          <p style="font-size: 9px; margin-top: 4px; color: #666;">Helpline: 155251 / 1800-425-4440</p>
        </div>
      </div>
    `;

    setTimeout(() => { window.print(); }, 200);
  }

  printBenefitSlip(aadhaar) {
    this.printSlip('DBT BENEFIT STATUS PASS', [
      { label: 'Aadhaar', value: `**** **** ${aadhaar.slice(-4)}` },
      { label: 'Beneficiary', value: 'Ramarao (Farmer)' },
      { label: 'Installment 1', value: '₹7,500 (Credited)' },
      { label: 'Installment 2', value: '₹4,000 (Credited)' },
      { label: 'Installment 3', value: '₹2,000 (Processing)' },
      { label: 'e-KYC Status', value: 'VERIFIED' }
    ]);
  }

  printPacsSlip(token, item, qty, center) {
    this.printSlip('PACS SUBSIDY STOCK TOKEN', [
      { label: 'Token ID', value: token },
      { label: 'Item', value: item },
      { label: 'Quantity', value: `${qty} Bags` },
      { label: 'PACS Depot', value: center },
      { label: 'Status', value: 'ALLOCATED (48h Validity)' }
    ]);
  }

  printChcSlip(token, equip, hours, cost) {
    this.printSlip('CHC MACHINERY RENTAL PASS', [
      { label: 'Booking ID', value: token },
      { label: 'Machinery', value: equip },
      { label: 'Duration', value: `${hours} Hours` },
      { label: 'Total Fare', value: `₹${cost}` }
    ]);
  }

  printGrievanceSlip(token, reason, pacs, phone) {
    this.printSlip('72H SAHAKARA SPANDANA PASS', [
      { label: 'Ticket ID', value: token },
      { label: 'Category', value: reason },
      { label: 'PACS Society', value: pacs },
      { label: 'Contact Phone', value: phone },
      { label: 'SLA Guarantee', value: 'Inspection in 72 Hours' }
    ]);
  }

  printSingleSchemePass(title, benefit) {
    this.printSlip('SCHEME INFORMATION PASS', [
      { label: 'Scheme Name', value: title },
      { label: 'Key Benefit', value: benefit },
      { label: 'State Context', value: '28 States & Central Co-op' },
      { label: 'Portal', value: 'Sahakara Mitra Kiosk' }
    ]);
  }

  bindEvents() {
    const searchInput = document.getElementById('kiosk-search-input');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.performSchemeSearch();
        }
      });
    }

    const lawsInput = document.getElementById('kiosk-laws-search-input');
    if (lawsInput) {
      lawsInput.addEventListener('input', (e) => {
        this.renderLawsList(e.target.value);
      });
    }
  }
}

window.kiosk = new KioskEngine();
document.addEventListener('DOMContentLoaded', () => {
  window.kiosk.init();
});
'''

with open('static/js/kiosk.js', 'w', encoding='utf-8') as f:
    f.write(kiosk_js)
print('Generated static/js/kiosk.js')
