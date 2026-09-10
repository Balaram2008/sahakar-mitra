
// Global helper for secure TTS speech execution without HTML attribute escaping issues
window.speakSchemeById = function(schemeId, lang) {
  const scheme = (allSchemesData || []).find(s => s.id === schemeId);
  if (!scheme) return;
  const l = lang || currentLanguage;
  const title = (scheme.title && scheme.title[l]) || scheme.title?.en || scheme.title?.te || "Scheme";
  const tagline = (scheme.tagline && scheme.tagline[l]) || scheme.tagline?.en || scheme.tagline?.te || "";
  const benefits = (scheme.benefits && scheme.benefits[l]) || scheme.benefits?.en || scheme.benefits?.te || "";
  const speechText = `${title}. ${tagline}. ${benefits}`;
  try {
    if (typeof voiceEngine !== 'undefined' && voiceEngine && voiceEngine.speak) {
      voiceEngine.speak(speechText, title, l);
    }
  } catch (e) {
    console.warn("Speech error:", e);
  }
};

function showStateToast(stateObj, lang) {
  const existing = document.getElementById("state-toast-notification");
  if (existing) existing.remove();

  const stateName = (stateObj.name && stateObj.name[lang]) || stateObj.name?.en || stateObj.name?.te || "State";
  const langName = stateObj.lang_name ? ((stateObj.lang_name[lang]) || stateObj.lang_name.en) : (lang.toUpperCase());

  const toast = document.createElement("div");
  toast.id = "state-toast-notification";
  toast.className = "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white px-5 py-3.5 rounded-2xl border-2 border-apGold-400 shadow-2xl flex items-center gap-3 animate-fade-in";
  toast.innerHTML = `
    <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-apGold-400 flex-shrink-0 bg-white shadow">
      <img src="${stateObj.cm_image || `/static/images/cms/cm_${stateObj.id}.jpg`}" class="w-full h-full object-cover" onerror="this.src='/static/images/cms/cm_ap.jpg'">
    </div>
    <div class="text-left">
      <div class="text-[10px] font-black text-apGold-300 uppercase tracking-wider">🏛️ State Selected • Official Language Active</div>
      <div class="text-sm font-black text-white">${stateName} • <span class="text-amber-300 underline font-extrabold">${langName}</span></div>
    </div>
    <button onclick="this.parentElement.remove()" class="ml-2 text-slate-400 hover:text-white text-base">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4500);
}

// Sahakara Mitra - Core Web Portal Logic (28 States, Live Internet Schemes & Large Readable UI)

let allStatesData = [];
let allSchemesData = [];
let allLawsData = [];
let selectedStateId = "all";
let selectedRegion = "all";
let searchDebounceTimer = null;

document.addEventListener("DOMContentLoaded", async () => {
  initLanguageSelector();
  initTabs();
  initChat();
  await loadStates();
  await loadSchemes();
  loadLaws();
  initEligibilityWizard();
  initCalculators();
  initGrievanceSystem();
  initFabButton();
  
  // Set default language to Telugu on load
  setLanguage("te", false);
  updateHeaderCmBadge("ap");
  animateStatCounters();
});

function initFabButton() {
  const fabBtn = document.getElementById("floating-ai-voice-btn");
  if (fabBtn) {
    fabBtn.addEventListener("click", () => {
      const chatTab = document.querySelector(".nav-tab-btn[data-tab='tab-chat']");
      if (chatTab) chatTab.click();
      const voiceBtn = document.getElementById("chat-mic-btn");
      if (voiceBtn) voiceBtn.click();
    });
  }
}

function animateStatCounters() {
  const pacsElem = document.querySelector('[data-i18n="stat_pacs_count"]');
  const farmersElem = document.querySelector('[data-i18n="stat_farmers_count"]');
  
  if (pacsElem) {
    const target = 2050;
    const duration = 1600;
    const startTime = performance.now();
    
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress * (2 - progress);
      const current = Math.floor(eased * target);
      pacsElem.textContent = `${current.toLocaleString('en-IN')}+ PACS`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        pacsElem.textContent = "2,050+ PACS";
      }
    }
    requestAnimationFrame(step);
  }

  if (farmersElem) {
    const target = 50;
    const duration = 1600;
    const startTime = performance.now();
    
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress * (2 - progress);
      const current = Math.floor(eased * target);
      const suffix = currentLanguage === 'te' ? ' లక్షల మంది' : (currentLanguage === 'hi' ? ' लाख' : '+ Lakh');
      farmersElem.textContent = `${current}+${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }
}

function initLanguageSelector() {
  // Quick Lang Buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const lang = btn.getAttribute("data-lang");
      changeAppLanguage(lang);
    });
  });

  // More State Languages Dropdown
  const moreLangDropdown = document.getElementById("state-lang-dropdown");
  if (moreLangDropdown) {
    moreLangDropdown.addEventListener("change", (e) => {
      const lang = e.target.value;
      if (lang) {
        document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
        changeAppLanguage(lang);
      }
    });
  }
}

function changeAppLanguage(lang) {
  setLanguage(lang, false);
  renderStatesDropdown();
  renderStateChips();
  renderCmGallery();
  populateFormStateDropdowns();
  if (currentSearchResults && currentSearchResults.query) {
    renderDualSearchResults(
      currentSearchResults.query,
      currentSearchResults.local,
      currentSearchResults.internet,
      currentSearchResults.activeFilter,
      currentSearchResults.isSearching
    );
  } else {
    renderSchemes(allSchemesData);
  }
  renderLaws(allLawsData);
  updateActiveStateBanner();
  updateHeaderCmBadge(selectedStateId);
  animateStatCounters();
}

function initTabs() {
  const tabButtons = document.querySelectorAll(".nav-tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      
      tabButtons.forEach(b => b.classList.remove("active-tab"));
      btn.classList.add("active-tab");

      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.remove("hidden");
          panel.classList.add("animate-fade-in");
        } else {
          panel.classList.add("hidden");
        }
      });

      window.scrollTo({ top: 160, behavior: "smooth" });
    });
  });
}

// ------------------- 28 STATES MODULE -------------------
async function loadStates() {
  try {
    const res = await fetch("/api/states");
    const data = await res.json();
    allStatesData = data.states || [];
    
    renderStatesDropdown();
    renderStateChips();
    renderCmGallery();
    initCmGalleryToggle();
    initRegionFilters();
    populateFormStateDropdowns();
  } catch (err) {
    console.error("Failed to load states:", err);
  }
}

function renderStatesDropdown() {
  const dropdown = document.getElementById("state-select-dropdown");
  if (!dropdown) return;

  const currentVal = dropdown.value || selectedStateId;
  const lang = currentLanguage;

  dropdown.innerHTML = allStatesData.map(st => {
    const name = st.name[lang] || st.name.en || st.name.te;
    const prefix = st.id === "all" ? "🇮🇳 " : "🏛️ ";
    return `<option value="${st.id}" ${st.id === currentVal ? "selected" : ""}>${prefix}${name}</option>`;
  }).join("");

  dropdown.onchange = (e) => {
    selectState(e.target.value);
  };
}

function renderStateChips() {
  const container = document.getElementById("states-chips-container");
  if (!container) return;

  const lang = currentLanguage;
  const filtered = selectedRegion === "all" 
    ? allStatesData 
    : allStatesData.filter(s => s.region === selectedRegion || s.id === "all");

  container.innerHTML = filtered.map(st => {
    const name = st.name[lang] || st.name.en || st.name.te;
    const cmName = st.cm_name ? (st.cm_name[lang] || st.cm_name.en || st.cm_name.te) : "";
    const isActive = st.id === selectedStateId;
    const cmImg = st.cm_image || (st.id === "all" ? "/static/images/pm_narendra_modi.jpg" : `/static/images/cms/cm_${st.id}.jpg`);
    
    return `
      <button class="state-chip ${isActive ? 'active' : ''} px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border ${isActive ? 'bg-apGold-400 text-slate-950 border-apGold-300 shadow-lg scale-105 ring-2 ring-apGold-200' : 'bg-emerald-900/90 text-emerald-100 border-emerald-700/60 hover:bg-emerald-800'}" data-state-id="${st.id}">
        <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 ${isActive ? 'border-slate-950' : 'border-apGold-400'} flex-shrink-0 bg-white shadow-sm">
          <img src="${cmImg}" alt="${name}" class="w-full h-full object-cover" onerror="this.src='/static/images/cms/cm_ap.jpg'">
        </div>
        <div class="text-left leading-tight">
          <span class="block text-xs sm:text-sm font-black">${name}</span>
          ${cmName ? `<span class="text-[10px] ${isActive ? 'text-slate-900 font-bold' : 'text-emerald-300 font-medium'} block truncate max-w-[120px]">${cmName}</span>` : ''}
        </div>
      </button>
    `;
  }).join("");

  container.querySelectorAll(".state-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      const sId = btn.getAttribute("data-state-id");
      selectState(sId);
    });
  });
}

function renderCmGallery() {
  const grid = document.getElementById("cm-cards-grid");
  if (!grid) return;

  const lang = currentLanguage;
  const statesOnly = allStatesData.filter(s => s.id !== "all");

  grid.innerHTML = statesOnly.map(st => {
    const stateName = st.name[lang] || st.name.en || st.name.te;
    const cmName = st.cm_name ? (st.cm_name[lang] || st.cm_name.en || st.cm_name.te) : "";
    const cmImg = st.cm_image || `/static/images/cms/cm_${st.id}.jpg`;
    const isSelected = st.id === selectedStateId;

    return `
      <div class="cm-gallery-card p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center ${isSelected ? 'bg-apGold-400 text-slate-950 border-apGold-300 shadow-lg ring-2 ring-apGold-200 scale-105' : 'bg-emerald-900/80 text-white border-emerald-700/50 hover:bg-emerald-800 hover:border-apGold-400'}" data-state-id="${st.id}">
        <div class="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 ${isSelected ? 'border-slate-950 ring-2 ring-slate-900' : 'border-apGold-400 ring-2 ring-emerald-500/50'} shadow-md bg-white mb-2 flex-shrink-0">
          <img src="${cmImg}" alt="${cmName}" class="w-full h-full object-cover transform hover:scale-110 transition duration-300" onerror="this.src='/static/images/cms/cm_ap.jpg'">
        </div>
        <strong class="text-xs sm:text-sm font-black line-clamp-1 leading-tight ${isSelected ? 'text-slate-950' : 'text-apGold-300'}">${cmName}</strong>
        <span class="text-[11px] font-bold mt-0.5 line-clamp-1 ${isSelected ? 'text-slate-900' : 'text-emerald-100'}">${stateName}</span>
        <span class="text-[9px] uppercase tracking-wider font-extrabold mt-1.5 px-2 py-0.5 rounded-full ${isSelected ? 'bg-slate-950 text-apGold-300' : 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'}">
          ${st.region || 'India'}
        </span>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".cm-gallery-card").forEach(card => {
    card.addEventListener("click", () => {
      const sId = card.getAttribute("data-state-id");
      selectState(sId);
    });
  });
}

function initCmGalleryToggle() {
  const toggleBtn = document.getElementById("toggle-cm-gallery-btn");
  const galleryContainer = document.getElementById("cm-gallery-container");
  const btnText = document.getElementById("cm-gallery-btn-text");

  if (!toggleBtn || !galleryContainer) return;

  toggleBtn.onclick = () => {
    const isHidden = galleryContainer.classList.contains("hidden");
    if (isHidden) {
      galleryContainer.classList.remove("hidden");
      if (btnText) btnText.textContent = "గ్యాలరీని దాచండి (Hide CMs Gallery)";
      toggleBtn.classList.add("bg-apGold-400", "text-slate-950");
      toggleBtn.classList.remove("bg-emerald-800", "text-apGold-300");
    } else {
      galleryContainer.classList.add("hidden");
      if (btnText) btnText.textContent = "28 రాష్ట్రాల CMల గ్యాలరీ (View 28 CMs)";
      toggleBtn.classList.remove("bg-apGold-400", "text-slate-950");
      toggleBtn.classList.add("bg-emerald-800", "text-apGold-300");
    }
  };
}

function initRegionFilters() {
  const pills = document.querySelectorAll(".region-pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      selectedRegion = pill.getAttribute("data-region");
      renderStateChips();
    });
  });
}

async function selectState(stateId) {
  selectedStateId = stateId;

  // Sync dropdown
  const dropdown = document.getElementById("state-select-dropdown");
  if (dropdown) dropdown.value = stateId;

  // Re-render chips and CM gallery cards to reflect active state
  renderStateChips();
  renderCmGallery();

  // Load schemes for this state
  await loadSchemes(stateId);

  // Update active state banner and header badge
  updateActiveStateBanner();
  updateHeaderCmBadge(stateId);

  // Auto-switch to state's native official language!
  const stateObj = allStatesData.find(s => s.id === stateId);
  if (stateObj && stateObj.default_lang) {
    const targetLang = stateObj.default_lang;
    if (targetLang !== currentLanguage) {
      changeAppLanguage(targetLang);
      showStateToast(stateObj, targetLang);
    }
  }
}

function updateHeaderCmBadge(stateId) {
  const imgElem = document.getElementById("header-cm-img");
  const nameElem = document.getElementById("header-cm-name");
  const subElem = document.getElementById("header-cm-sub");
  if (!imgElem || !nameElem || !subElem) return;

  const targetId = stateId === "all" ? "ap" : stateId;
  const stateObj = allStatesData.find(s => s.id === targetId);
  const lang = currentLanguage;

  if (stateObj && stateObj.cm_name) {
    nameElem.textContent = stateObj.cm_name[lang] || stateObj.cm_name.en || stateObj.cm_name.te;
    subElem.textContent = stateObj.govt_name ? (stateObj.govt_name[lang] || stateObj.govt_name.en) : "State Government";
    imgElem.src = stateObj.cm_image || `/static/images/cms/cm_${targetId}.jpg`;
  }
}

function updateActiveStateBanner() {
  const banner = document.getElementById("active-state-banner");
  const nameElem = document.getElementById("active-state-name");
  const countElem = document.getElementById("active-state-count");
  const cmImgElem = document.getElementById("active-state-cm-img");
  const cmLabelElem = document.getElementById("active-state-cm-label");
  if (!banner || !nameElem || !countElem) return;

  const lang = currentLanguage;
  const stateObj = allStatesData.find(s => s.id === selectedStateId);
  const stateName = stateObj ? (stateObj.name[lang] || stateObj.name.en || stateObj.name.te) : "All India";
  
  nameElem.textContent = stateName;
  const count = allSchemesData.length;
  countElem.textContent = `${count} ${lang === 'te' ? 'పథకాలు' : (lang === 'hi' ? 'योजनाएं' : 'Schemes')}`;

  const targetId = selectedStateId === "all" ? "ap" : selectedStateId;
  const targetObj = stateObj || allStatesData.find(s => s.id === targetId);
  if (targetObj) {
    const cmName = targetObj.cm_name ? (targetObj.cm_name[lang] || targetObj.cm_name.en || targetObj.cm_name.te) : "";
    if (cmImgElem) cmImgElem.src = targetObj.cm_image || `/static/images/cms/cm_${targetId}.jpg`;
    if (cmLabelElem && cmName) {
      const prefix = lang === 'hi' ? 'मुख्यमंत्री: ' : (lang === 'en' ? 'Chief Minister: ' : 'ముఖ్యమంత్రి: ');
      cmLabelElem.textContent = `${prefix}${cmName}`;
    }
  }
}

function populateFormStateDropdowns() {
  const grvState = document.getElementById("grv-state-select");
  const insState = document.getElementById("ins-state-select");
  const lang = currentLanguage;

  const optionsHtml = allStatesData.filter(s => s.id !== "all").map(st => {
    const name = st.name[lang] || st.name.en || st.name.te;
    return `<option value="${st.id}" ${st.id === "ap" ? "selected" : ""}>${name}</option>`;
  }).join("");

  if (grvState) grvState.innerHTML = optionsHtml;
  if (insState) insState.innerHTML = optionsHtml;
}

let currentSearchResults = {
  query: "",
  local: [],
  internet: [],
  activeFilter: "all",
  isSearching: false
};

// ------------------- SCHEMES MODULE & DUAL LIVE INTERNET SEARCH -------------------
async function loadSchemes(stateId = "all") {
  const container = document.getElementById("schemes-container");
  if (!container) return;

  try {
    const url = stateId === "all" ? "/api/schemes" : `/api/schemes?state_id=${stateId}`;
    const res = await fetch(url);
    const data = await res.json();
    allSchemesData = data.schemes || [];
    renderSchemes(allSchemesData);
    updateActiveStateBanner();
  } catch (err) {
    console.error("Failed to load schemes:", err);
    container.innerHTML = `<div class="p-8 text-center text-red-600 font-bold text-base">Unable to load schemes. Please verify network connection.</div>`;
  }

  // Filter Buttons (All / State / Central)
  document.querySelectorAll(".scheme-filter-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".scheme-filter-btn").forEach(b => b.classList.remove("active-filter"));
      btn.classList.add("active-filter");
      const category = btn.getAttribute("data-category");
      if (category === "all") {
        renderSchemes(allSchemesData);
      } else {
        const filtered = allSchemesData.filter(s => s.category === category || (category === 'state' && s.category !== 'central_moc'));
        renderSchemes(filtered);
      }
    };
  });

  // Search Input & Dual Local + Internet Search
  const searchInput = document.getElementById("schemes-search-input");
  const clearBtn = document.getElementById("clear-schemes-search-btn");
  const internetSearchBtn = document.getElementById("internet-scheme-search-btn");

  if (searchInput) {
    searchInput.oninput = (e) => {
      const q = e.target.value.trim();
      if (clearBtn) {
        if (q) clearBtn.classList.remove("hidden");
        else clearBtn.classList.add("hidden");
      }

      if (!q) {
        clearTimeout(searchDebounceTimer);
        currentSearchResults = { query: "", local: [], internet: [], activeFilter: "all", isSearching: false };
        renderSchemes(allSchemesData);
        const statusBar = document.getElementById("internet-search-status-bar");
        if (statusBar) statusBar.classList.add("hidden");
        return;
      }

      const qLower = q.toLowerCase();
      const localFiltered = allSchemesData.filter(s => {
        const t = (
          (s.title?.en || "") + (s.title?.te || "") + (s.title?.hi || "") + 
          (s.tagline?.en || "") + (s.tagline?.te || "") + (s.tagline?.hi || "") + 
          (s.benefits?.en || "") + (s.benefits?.te || "") + (s.benefits?.hi || "") + 
          (s.state_id || "") + (s.keywords ? s.keywords.join(" ") : "")
        ).toLowerCase();
        return t.includes(qLower);
      });

      currentSearchResults = {
        query: q,
        local: localFiltered,
        internet: [],
        activeFilter: "all",
        isSearching: true
      };

      // Instantly render local matches while internet search is dispatched
      renderDualSearchResults(q, localFiltered, [], "all", true);

      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        fetchInternetSchemes(q);
      }, 400);
    };

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        clearTimeout(searchDebounceTimer);
        const q = searchInput.value.trim();
        if (q) fetchInternetSchemes(q, true);
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearTimeout(searchDebounceTimer);
      if (searchInput) searchInput.value = "";
      clearBtn.classList.add("hidden");
      currentSearchResults = { query: "", local: [], internet: [], activeFilter: "all", isSearching: false };
      renderSchemes(allSchemesData);
      const statusBar = document.getElementById("internet-search-status-bar");
      if (statusBar) statusBar.classList.add("hidden");
    });
  }

  if (internetSearchBtn) {
    internetSearchBtn.addEventListener("click", () => {
      clearTimeout(searchDebounceTimer);
      const q = searchInput ? searchInput.value.trim() : "";
      if (q) {
        fetchInternetSchemes(q, true);
      } else {
        if (searchInput) {
          searchInput.focus();
          searchInput.placeholder = "పథకం పేరు టైప్ చేసి శోధించండి...";
        }
      }
    });
  }

  // Quick Trending Internet Schemes Chips
  document.querySelectorAll(".internet-quick-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      clearTimeout(searchDebounceTimer);
      const query = chip.getAttribute("data-query");
      if (searchInput) searchInput.value = query;
      if (clearBtn) clearBtn.classList.remove("hidden");
      fetchInternetSchemes(query, true);
    });
  });
}

function filterSearchResults(filterType) {
  currentSearchResults.activeFilter = filterType;
  renderDualSearchResults(
    currentSearchResults.query,
    currentSearchResults.local,
    currentSearchResults.internet,
    filterType,
    currentSearchResults.isSearching
  );
}

// ------------------- DUAL LOCAL + INTERNET SEARCH RESULTS RENDERER -------------------
function renderDualSearchResults(query, localSchemes, internetSchemes, activeFilter = "all", isSearchingInternet = false) {
  const container = document.getElementById("schemes-container");
  if (!container) return;

  const lang = currentLanguage;
  const localCount = localSchemes.length;
  const internetCount = internetSchemes.length;
  const totalCount = localCount + internetCount;

  // 0 local and 0 internet schemes (search finished)
  if (totalCount === 0 && !isSearchingInternet) {
    renderEmptySearchState(query, false);
    return;
  }

  let html = "";

  // 1. Search Results Ribbon & Filter Tabs
  html += `
    <div class="col-span-1 md:col-span-2 mb-2 p-4 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl border-2 border-emerald-400/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
      <div class="space-y-1">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <i class="fa-solid fa-magnifying-glass text-apGold-400"></i>
            <span>"${query}" శోధన ఫలితాలు:</span>
          </span>
          <span class="px-3 py-1 bg-emerald-800 text-emerald-100 font-bold text-xs sm:text-sm rounded-xl border border-emerald-500/50">
            🏛️ ${localCount} స్థానిక పథకాలు
          </span>
          <span class="px-3 py-1 bg-sky-800 text-sky-100 font-bold text-xs sm:text-sm rounded-xl border border-sky-400/50">
            🌐 ${internetCount} ఇంటర్నెట్ లైవ్ పథకాలు
          </span>
          ${isSearchingInternet ? `
            <span class="inline-flex items-center gap-1.5 text-xs text-sky-300 bg-sky-950 px-3 py-1 rounded-xl border border-sky-400 font-black animate-pulse">
              <i class="fa-solid fa-satellite-dish animate-spin"></i> ఇంటర్నెట్ శోధిస్తోంది...
            </span>
          ` : ''}
        </div>
        <p class="text-xs sm:text-sm text-emerald-200 font-medium">
          ${localCount > 0 && internetCount > 0 ? 'స్థానిక డేటాబేస్ మరియు లైవ్ ఇంటర్నెట్ ఫలితాలు రెండూ అందుబాటులో ఉన్నాయి.' : (localCount === 0 ? 'స్థానిక జాబితాలో లేని పథకాలు ఇంటర్నెట్ నుండి విజయవంతంగా పొందబడ్డాయి.' : 'స్థానిక డేటాబేస్ పథకాలు సిద్ధంగా ఉన్నాయి.')}
        </p>
      </div>

      <!-- Quick Sub-Filter Tabs -->
      <div class="flex items-center gap-2 flex-wrap flex-shrink-0">
        <button onclick="filterSearchResults('all')" class="search-tab-pill ${activeFilter === 'all' ? 'active' : ''}">
          <span>అన్నీ (${totalCount})</span>
        </button>
        ${localCount > 0 ? `
          <button onclick="filterSearchResults('local')" class="search-tab-pill ${activeFilter === 'local' ? 'active' : ''}">
            <span>🏛️ స్థానిక (${localCount})</span>
          </button>
        ` : ''}
        <button onclick="filterSearchResults('internet')" class="search-tab-pill ${activeFilter === 'internet' ? 'active' : ''}">
          <span>🌐 ఇంటర్నెట్ (${internetCount})</span>
        </button>
      </div>
    </div>
  `;

  // 2. Local Schemes Section
  if ((activeFilter === "all" || activeFilter === "local") && localCount > 0) {
    html += `
      <div class="col-span-1 md:col-span-2 pt-2 pb-1">
        <div class="p-3.5 sm:p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded-2xl flex items-center justify-between shadow-sm">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-lg shadow">
              <i class="fa-solid fa-landmark"></i>
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-black text-emerald-950">🏛️ స్థానిక డేటాబేస్ పథకాలు (${localCount})</h3>
              <span class="text-xs text-emerald-700 font-bold">ఆంధ్రప్రదేశ్ & కేంద్ర సహకార రిజిస్ట్రీ నుండి స్థానికంగా అందుబాటులో ఉన్న పథకాలు</span>
            </div>
          </div>
          <span class="hidden sm:inline-block text-xs font-black bg-emerald-200 text-emerald-950 px-3 py-1 rounded-full">Local Verified</span>
        </div>
      </div>
    `;

    localSchemes.forEach(scheme => {
      html += renderSchemeCard(scheme, lang);
    });
  }

  // 3. Live Searching Banner (if in flight)
  if (isSearchingInternet) {
    html += `
      <div class="col-span-1 md:col-span-2 p-6 bg-gradient-to-r from-sky-50 to-indigo-50 border-2 border-dashed border-sky-400 rounded-3xl text-center space-y-2 animate-pulse my-2">
        <div class="w-12 h-12 mx-auto rounded-2xl bg-sky-600 text-white flex items-center justify-center text-xl animate-spin shadow-lg">
          <i class="fa-solid fa-satellite-dish"></i>
        </div>
        <h4 class="text-base font-black text-sky-950">🌐 "${query}" కోసం ఇంటర్నెట్ & జాతీయ పోర్టల్స్ లో ప్రత్యక్ష శోధన జరుగుతోంది...</h4>
        <p class="text-xs sm:text-sm text-slate-600 font-medium">కేంద్ర వ్యవసాయ శాఖ, వికీపీడియా మరియు జాతీయ సంక్షేమ డేటాబేస్ నుండి తాజా వివరాలు సేకరిస్తున్నాము.</p>
      </div>
    `;
  }

  // 4. Internet Schemes Section
  if ((activeFilter === "all" || activeFilter === "internet") && internetCount > 0) {
    html += `
      <div class="col-span-1 md:col-span-2 pt-4 pb-1">
        <div class="p-3.5 sm:p-4 bg-sky-50 border-l-4 border-sky-600 rounded-2xl flex items-center justify-between shadow-sm">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-sky-700 text-white flex items-center justify-center text-lg shadow">
              <i class="fa-solid fa-globe"></i>
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-black text-sky-950">🌐 ఇంటర్నెట్ & జాతీయ పోర్టల్స్ నుండి సేకరించిన ప్రత్యక్ష పథకాలు (${internetCount})</h3>
              <span class="text-xs text-sky-700 font-bold">భారత ప్రభుత్వ పోర్టల్స్ & వికీపీడియా నుండి లైవ్ సేకరించిన తాజా సంక్షేమ సమాచారం</span>
            </div>
          </div>
          <span class="hidden sm:inline-block text-xs font-black bg-sky-200 text-sky-950 px-3 py-1 rounded-full">Live Web Verified</span>
        </div>
      </div>
    `;

    internetSchemes.forEach(scheme => {
      html += renderSchemeCard(scheme, lang);
    });
  }

  container.innerHTML = html;
}

function renderEmptySearchState(query, isAutoSearching = false) {
  const container = document.getElementById("schemes-container");
  if (!container) return;

  container.innerHTML = `
    <div class="col-span-1 md:col-span-2 p-8 sm:p-10 text-center bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50 rounded-3xl border-2 border-sky-400 shadow-xl space-y-4 animate-fade-in">
      <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-br from-sky-600 to-blue-700 text-white flex items-center justify-center text-3xl sm:text-4xl shadow-xl animate-bounce">
        <i class="fa-solid fa-satellite-dish"></i>
      </div>
      <div>
        <h3 class="text-xl sm:text-2xl font-black text-slate-950 mb-1.5">"${query}" స్థానిక జాబితాలో లభించలేదు</h3>
        <p class="text-sm sm:text-base text-slate-700 font-medium max-w-xl mx-auto">
          ${isAutoSearching ? '🌐 మా ఏఐ ఇంజిన్ ఆటోమేటిక్‌గా ఇంటర్నెట్ & ప్రభుత్వ పోర్టల్స్ నుండి వివరాలు సేకరిస్తోంది...' : 'మా ఏఐ ఇంజిన్ ద్వారా ఇంటర్నెట్ నుండి నేరుగా ప్రభుత్వ పోర్టల్స్ & వికీపీడియా సమాచారాన్ని సేకరించవచ్చు.'}
        </p>
      </div>
      <button onclick="fetchInternetSchemes('${query.replace(/'/g, "\\'")}', true)" class="px-6 sm:px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl transition transform hover:scale-105 active:scale-95 flex items-center gap-2.5 mx-auto">
        <i class="fa-solid fa-globe text-apGold-300 text-xl"></i>
        <span>"${query}" కోసం ఇంటర్నెట్‌లో ప్రత్యక్ష శోధన (Fetch from Live Web)</span>
      </button>
    </div>
  `;
}

// ------------------- LIVE INTERNET SCHEME FETCHER -------------------
async function fetchInternetSchemes(query, isManualClick = false) {
  if (!query || !query.trim()) return;
  query = query.trim();

  const statusBar = document.getElementById("internet-search-status-bar");
  const statusTitle = document.getElementById("internet-status-title");
  const statusDesc = document.getElementById("internet-status-desc");
  const countBadge = document.getElementById("internet-results-count-badge");
  const spinner = document.getElementById("internet-search-spinner");
  const searchInput = document.getElementById("schemes-search-input");
  const clearBtn = document.getElementById("clear-schemes-search-btn");

  if (searchInput) searchInput.value = query;
  if (clearBtn) clearBtn.classList.remove("hidden");

  if (statusBar && statusTitle && statusDesc) {
    statusBar.classList.remove("hidden");
    if (spinner) spinner.classList.add("animate-spin");
    statusTitle.innerHTML = `<i class="fa-solid fa-satellite-dish text-apGold-400"></i> <span>"${query}" కోసం ఇంటర్నెట్‌లో ప్రత్యక్ష శోధన జరుగుతోంది...</span>`;
    statusDesc.textContent = "కేంద్ర & రాష్ట్ర ప్రభుత్వ అధికారిక పోర్టల్స్, వికీపీడియా నుండి తాజా సమాచారం సేకరిస్తున్నాము...";
    if (countBadge) countBadge.textContent = "శోధన జరుగుతోంది...";
  }

  try {
    const lang = currentLanguage;
    const res = await fetch(`/api/schemes/internet-search?query=${encodeURIComponent(query)}&lang=${lang}&state_id=${selectedStateId}`);
    const data = await res.json();
    const fetchedSchemes = data.schemes || [];

    // Filter local matches from allSchemesData
    const qLower = query.toLowerCase();
    const localFiltered = allSchemesData.filter(s => {
      const t = (
        (s.title?.en || "") + (s.title?.te || "") + (s.title?.hi || "") + 
        (s.tagline?.en || "") + (s.tagline?.te || "") + (s.tagline?.hi || "") + 
        (s.benefits?.en || "") + (s.benefits?.te || "") + (s.benefits?.hi || "") + 
        (s.state_id || "") + (s.keywords ? s.keywords.join(" ") : "")
      ).toLowerCase();
      return t.includes(qLower);
    });

    // Isolate pure external internet schemes (not duplicates of local)
    const externalSchemes = fetchedSchemes.filter(fs => {
      return !localFiltered.some(ls => ls.id === fs.id);
    });

    currentSearchResults = {
      query: query,
      local: localFiltered,
      internet: externalSchemes.length > 0 ? externalSchemes : (fetchedSchemes.some(s => s.is_internet || s.category === 'internet_live') ? fetchedSchemes : []),
      activeFilter: "all",
      isSearching: false
    };

    renderDualSearchResults(
      query,
      currentSearchResults.local,
      currentSearchResults.internet,
      "all",
      false
    );

    if (currentSearchResults.internet.length > 0 || currentSearchResults.local.length > 0) {
      fireConfetti();

      if (statusTitle && statusDesc && countBadge) {
        if (spinner) spinner.classList.remove("animate-spin");
        statusTitle.innerHTML = `<i class="fa-solid fa-circle-check text-green-400"></i> <span>శోధన పూర్తయింది: ${currentSearchResults.local.length} స్థానిక + 🌐 ${currentSearchResults.internet.length} ఇంటర్నెట్ పథకాలు లభించాయి!</span>`;
        statusDesc.textContent = `"${query}" పథకం వివరాలు విజయవంతంగా లోడ్ చేయబడ్డాయి. వివరాలు వినడానికి 'వినండి' బటన్ నొక్కండి.`;
        countBadge.textContent = `${currentSearchResults.local.length + currentSearchResults.internet.length} మొత్తం ఫలితాలు`;
      }

      const topItem = currentSearchResults.internet[0] || currentSearchResults.local[0];
      if (topItem && isManualClick) {
        const topTitle = topItem.title[lang] || topItem.title.en || topItem.title.te;
        const speakMsg = lang === "hi" 
          ? `खोज परिणाम: ${topTitle} की जानकारी प्राप्त हुई।` 
          : (lang === "en" 
            ? `Search result: Fetched details for ${topTitle}.` 
            : `శోధన ఫలితం: ${topTitle} పథకం వివరాలు విజయవంతంగా పొందబడ్డాయి.`);
        
        voiceEngine.speak(speakMsg, "Scheme Found", lang);
      }
    } else {
      if (statusTitle && statusDesc && countBadge) {
        if (spinner) spinner.classList.remove("animate-spin");
        statusTitle.innerHTML = `<i class="fa-solid fa-circle-exclamation text-amber-400"></i> <span>క్షమించండి, "${query}" పై ఫలితాలు లభించలేదు.</span>`;
        statusDesc.textContent = "దయచేసి వేరొక కీలక పదాన్ని (ఉదా: Drip Irrigation, Solar Pump, Soil Health, Dairy, Drone) శోధించండి.";
        countBadge.textContent = "0 ఫలితాలు";
      }
      renderEmptySearchState(query, false);
    }
  } catch (err) {
    console.error("Internet scheme fetch error:", err);
    if (statusTitle) {
      statusTitle.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-rose-400"></i> <span>ఇంటర్నెట్ శోధనలో అంతరాయం ఏర్పడింది.</span>`;
    }
  }
}

// Helper to render an individual scheme card HTML
function renderSchemeCard(scheme, lang) {
  const l = lang || currentLanguage;
  const title = (scheme.title && scheme.title[l]) || scheme.title?.en || scheme.title?.te || "Government Scheme";
  const tagline = (scheme.tagline && scheme.tagline[l]) || scheme.tagline?.en || scheme.tagline?.te || "";
  const benefits = (scheme.benefits && scheme.benefits[l]) || scheme.benefits?.en || scheme.benefits?.te || "";
  const eligibility = (scheme.eligibility && scheme.eligibility[l]) || scheme.eligibility?.en || scheme.eligibility?.te || "";
  const howToApply = (scheme.how_to_apply && scheme.how_to_apply[l]) || scheme.how_to_apply?.en || scheme.how_to_apply?.te || "";
  const docs = scheme.documents ? ((scheme.documents[l]) || scheme.documents.en || scheme.documents.te || []) : [];
  const authority = (scheme.authority && scheme.authority[l]) || scheme.authority?.en || scheme.authority?.te || "Government of India";
  const leaderName = scheme.leader_name ? ((scheme.leader_name[l]) || scheme.leader_name.en || scheme.leader_name.te) : "";
  
  const isAP = scheme.state_id === "ap";
  const isCentral = scheme.category === "central_moc" || scheme.state_id === "all";
  const isInternet = scheme.category === "internet_live" || scheme.is_internet || (scheme.badge && scheme.badge.includes("Internet")) || (scheme.id && scheme.id.startsWith("internet-"));

  let leaderImg = scheme.leader_image;
  if (!leaderImg) {
    leaderImg = `/static/images/cms/cm_${scheme.state_id || 'ap'}.jpg`;
  }

  const schemeImg = scheme.scheme_image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80";
  const stateObj = allStatesData.find(s => s.id === scheme.state_id);
  const stateName = stateObj ? ((stateObj.name && stateObj.name[l]) || stateObj.name?.en || stateObj.name?.te) : (isCentral ? "All India (Central)" : "State Scheme");

  let borderClasses = "border-emerald-200 hover:border-emerald-500 shadow-emerald-100/50";
  if (isInternet) {
    borderClasses = "border-sky-300 hover:border-sky-500 shadow-sky-100 ring-2 ring-sky-200";
  } else if (isCentral) {
    borderClasses = "border-blue-200 hover:border-blue-500 shadow-blue-100/50";
  } else if (!isAP) {
    borderClasses = "border-amber-200 hover:border-amber-500 shadow-amber-100/50";
  }

  return `
    <div class="scheme-card bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 ${borderClasses} transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
      
      <!-- Top Colorful Internet Agricultural Banner -->
      <div class="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900 flex-shrink-0">
        <img src="${schemeImg}" alt="${title}" class="w-full h-full object-cover transform group-hover:scale-108 transition-all duration-700 brightness-95" onerror="this.src='https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        
        <!-- Top Badges Overlay -->
        <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span class="px-3 py-1 text-xs font-black rounded-full backdrop-blur-md shadow-lg ${isInternet ? 'bg-sky-600 text-white' : (isAP ? 'bg-emerald-600 text-white' : (isCentral ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'))} flex items-center gap-1.5">
            <i class="fa-solid ${scheme.icon || (isInternet ? 'fa-globe' : 'fa-seedling')} text-xs"></i>
            <span>${scheme.badge || (isInternet ? '🌐 Live Internet' : (isAP ? '🌾 AP State' : (isCentral ? '🇮🇳 Central MoC' : '🌾 State Flagship')))}</span>
          </span>
          <span class="px-2.5 py-1 text-[11px] font-black rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/40 shadow">
            🏛️ ${stateName}
          </span>
        </div>

        <!-- Leader Portrait Floating on Banner -->
        <div class="absolute bottom-2.5 left-3.5 flex items-center gap-2.5">
          <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-white ring-2 ${isInternet ? 'ring-sky-400' : 'ring-amber-400'} shadow-xl flex-shrink-0 bg-white">
            <img src="${leaderImg}" alt="${leaderName}" class="w-full h-full object-cover" onerror="this.src='/static/images/cms/cm_ap.jpg'">
          </div>
          <div class="text-white drop-shadow-md leading-tight">
            <span class="text-xs font-black block text-amber-300 line-clamp-1">${leaderName || authority}</span>
            <span class="text-[10px] text-slate-200 font-semibold block line-clamp-1">${authority}</span>
          </div>
        </div>
      </div>

      <!-- Card Content Body -->
      <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-start gap-3 mb-3">
            <div class="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-xl shadow-md flex-shrink-0" style="background-color: ${scheme.color || (isInternet ? '#0284c7' : '#16a34a')}">
              <i class="fa-solid ${scheme.icon || (isInternet ? 'fa-globe' : 'fa-seedling')}"></i>
            </div>
            <div>
              <h3 class="text-lg sm:text-xl font-black text-slate-950 leading-tight">${title}</h3>
            </div>
          </div>

          <p class="${isInternet ? 'text-sky-950 bg-sky-50 border-sky-300' : 'text-emerald-950 bg-emerald-50 border-emerald-200'} font-bold text-xs sm:text-sm mb-3.5 p-3 rounded-2xl border leading-relaxed">
            <i class="fa-solid fa-sparkles text-amber-500 mr-1"></i> ${tagline}
          </p>

          <div class="space-y-3 text-xs sm:text-sm text-slate-800">
            <div>
              <span class="font-black text-slate-950 flex items-center gap-2"><i class="fa-solid fa-gift text-sm ${isInternet ? 'text-sky-600' : 'text-emerald-600'}"></i> ${getTranslation("benefits_label")}:</span>
              <p class="mt-0.5 text-slate-700 pl-5 leading-relaxed font-medium">${benefits}</p>
            </div>

            <div>
              <span class="font-black text-slate-950 flex items-center gap-2"><i class="fa-solid fa-circle-check text-sm text-blue-600"></i> ${getTranslation("eligibility_label")}:</span>
              <p class="mt-0.5 text-slate-700 pl-5 leading-relaxed font-medium">${eligibility}</p>
            </div>

            ${docs && docs.length > 0 ? `
              <div>
                <span class="font-black text-slate-950 flex items-center gap-2"><i class="fa-solid fa-folder-open text-sm text-amber-600"></i> ${getTranslation("documents_label")}:</span>
                <ul class="list-disc list-inside mt-0.5 text-slate-700 pl-5 font-medium space-y-0.5">
                  ${docs.map(d => `<li>${d}</li>`).join("")}
                </ul>
              </div>
            ` : ''}

            <div>
              <span class="font-black text-slate-950 flex items-center gap-2"><i class="fa-solid fa-paper-plane text-sm text-purple-600"></i> ${getTranslation("apply_label")}:</span>
              <p class="mt-0.5 text-slate-700 pl-5 leading-relaxed font-medium">${howToApply}</p>
            </div>

            ${scheme.source_url ? `
              <div class="pt-1.5">
                <a href="${scheme.source_url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-black text-sky-800 hover:text-sky-950 bg-sky-100/80 hover:bg-sky-200 px-3 py-1.5 rounded-xl border border-sky-300 transition">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  <span>Official Portal / ಅಧಿಕೃತ ಪೋರ್ಟಲ್</span>
                </a>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Card Footer with Speak Out Button -->
        <div class="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <span class="text-xs text-slate-500 font-semibold italic truncate max-w-[180px]"><i class="fa-solid fa-building-shield"></i> ${authority}</span>
          
          <button class="px-4 py-2 ${isInternet ? 'bg-gradient-to-r from-sky-700 to-blue-800 hover:from-sky-800 hover:to-blue-900' : 'bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900'} text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-md hover:scale-105 transform active:scale-95" onclick="window.speakSchemeById('${scheme.id}', '${l}')">
            <i class="fa-solid fa-volume-high text-amber-300 text-sm"></i>
            <span>${getTranslation("speak_scheme_btn")}</span>
          </button>
        </div>
      </div>

    </div>
  `;
}

function renderSchemes(schemes) {
  const container = document.getElementById("schemes-container");
  if (!container) return;

  if (schemes.length === 0) {
    const searchInput = document.getElementById("schemes-search-input");
    const currentQ = searchInput ? searchInput.value.trim() : "";
    if (currentQ) {
      renderEmptySearchState(currentQ, false);
    } else {
      container.innerHTML = `<div class="col-span-2 p-8 text-center text-slate-500 font-bold text-base">No matching schemes found for this state filter. Try selecting "All India" or a different state.</div>`;
    }
    return;
  }

  const lang = currentLanguage;
  container.innerHTML = schemes.map(scheme => renderSchemeCard(scheme, lang)).join("");
}

// ------------------- ELIGIBILITY WIZARD -------------------
function initEligibilityWizard() {
  const form = document.getElementById("wizard-form");
  const resultsDiv = document.getElementById("wizard-results");
  const matchedDiv = document.getElementById("wizard-matched-schemes");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const tenure = form.querySelector("input[name='wiz_land']:checked")?.value;
    const pacs = form.querySelector("input[name='wiz_pacs']:checked")?.value;
    const crop = form.querySelector("input[name='wiz_crop']:checked")?.value;

    const matched = [];

    allSchemesData.forEach(s => {
      if (s.id.includes("annadata") || s.id.includes("bharosa") || s.id.includes("kalyan") || s.id.includes("shetkari")) {
        matched.push(s);
      }
      if (s.id.includes("free-crop-insurance") || s.id.includes("pmfby") || s.id.includes("sahayata") || s.id.includes("bima")) {
        matched.push(s);
      }
      if (pacs === "yes" && (s.id.includes("runalu") || s.id.includes("pacs") || s.id.includes("loan") || s.id.includes("sahakarita"))) {
        matched.push(s);
      }
      if (tenure === "dairy" && s.id.includes("dairy")) {
        matched.push(s);
      }
    });

    const uniqueMatched = Array.from(new Set(matched));
    const lang = currentLanguage;

    matchedDiv.innerHTML = uniqueMatched.map(s => {
      const title = s.title[lang] || s.title.en || s.title.te;
      const tagline = s.tagline[lang] || s.tagline.en || s.tagline.te;
      const benefits = s.benefits[lang] || s.benefits.en || s.benefits.te;
      const speechText = `${title}. ${tagline}. ${benefits}`;

      return `
        <div class="p-4 sm:p-5 bg-emerald-50 rounded-2xl border border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div>
            <h4 class="font-black text-slate-900 text-base sm:text-lg">${title}</h4>
            <p class="text-xs sm:text-sm text-emerald-950 font-semibold mt-0.5">${tagline}</p>
          </div>
          <button class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow flex-shrink-0" onclick="voiceEngine.speak('${speechText.replace(/'/g, "\\'")}', '${title.replace(/'/g, "\\'")}', '${lang}')">
            <i class="fa-solid fa-volume-high text-amber-300"></i> ${getTranslation("speak_scheme_btn")}
          </button>
        </div>
      `;
    }).join("");

    resultsDiv.classList.remove("hidden");
    resultsDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
    fireConfetti();
  });
}

// ------------------- COOPERATIVE LAWS MODULE -------------------
async function loadLaws() {
  const container = document.getElementById("laws-container");
  if (!container) return;

  try {
    const res = await fetch("/api/laws");
    const data = await res.json();
    allLawsData = data.laws || [];
    renderLaws(allLawsData);
  } catch (err) {
    console.error("Failed to load laws:", err);
  }

  const searchInput = document.getElementById("laws-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = [];
      allLawsData.forEach(law => {
        const matchingSecs = law.sections.filter(sec => {
          const t = (sec.section_no + sec.title.en + sec.title.te + sec.title.hi + sec.summary.en + sec.summary.te + sec.summary.hi).toLowerCase();
          return t.includes(q);
        });
        if (matchingSecs.length > 0) {
          filtered.push({ ...law, sections: matchingSecs });
        }
      });
      renderLaws(filtered);
    });
  }
}

function renderLaws(laws) {
  const container = document.getElementById("laws-container");
  if (!container) return;

  if (laws.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-slate-500 font-bold text-base">No matching legal provisions found.</div>`;
    return;
  }

  container.innerHTML = laws.map(law => {
    const lang = currentLanguage;
    const actName = law.act_name[lang] || law.act_name.en || law.act_name.te;
    const jurisdiction = law.jurisdiction[lang] || law.jurisdiction.en || law.jurisdiction.te;

    return `
      <div class="mb-8 bg-white rounded-3xl p-6 sm:p-7 shadow-lg border-2 border-slate-200">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 class="text-xl sm:text-2xl font-black text-slate-900">${actName}</h3>
            <span class="text-xs sm:text-sm text-slate-500 font-bold"><i class="fa-solid fa-scale-balanced text-blue-600 mr-1.5"></i> ${getTranslation("jurisdiction_label")}: ${jurisdiction}</span>
          </div>
          <span class="px-3.5 py-1.5 bg-blue-100 text-blue-900 font-black text-xs sm:text-sm rounded-full">Statutory Law</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          ${law.sections.map(sec => {
            const secTitle = sec.title[lang] || sec.title.en || sec.title.te;
            const secSummary = sec.summary[lang] || sec.summary.en || sec.summary.te;
            const rights = sec.rights ? (sec.rights[lang] || sec.rights.en || sec.rights.te) : "";
            const penalties = sec.penalties ? (sec.penalties[lang] || sec.penalties.en || sec.penalties.te) : "";
            const speechText = `${sec.section_no}. ${secTitle}. ${secSummary}. ${rights}`;

            return `
              <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-blue-400 transition">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="px-3 py-1 bg-blue-800 text-white font-black text-xs sm:text-sm rounded-lg">${sec.section_no}</span>
                    <button class="text-xs sm:text-sm text-blue-800 hover:text-blue-950 font-black flex items-center gap-1.5" onclick="voiceEngine.speak('${speechText.replace(/'/g, "\\'")}', '${sec.section_no}', '${lang}')">
                      <i class="fa-solid fa-volume-high text-amber-500"></i> ${getTranslation("speak_law_btn")}
                    </button>
                  </div>
                  <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1.5">${secTitle}</h4>
                  <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">${secSummary}</p>
                  
                  ${rights ? `<div class="mt-3 p-3 bg-emerald-50 rounded-xl text-xs sm:text-sm text-emerald-950 font-semibold border border-emerald-200">✅ <strong>హక్కు (Rights):</strong> ${rights}</div>` : ""}
                  ${penalties ? `<div class="mt-2 p-3 bg-rose-50 rounded-xl text-xs sm:text-sm text-rose-950 font-semibold border border-rose-200">⚠️ <strong>శిక్ష (Penalties):</strong> ${penalties}</div>` : ""}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }).join("");
}

// ------------------- CALCULATORS MODULE -------------------
function initCalculators() {
  const insForm = document.getElementById("insurance-calc-form");
  if (insForm) {
    insForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const state = document.getElementById("ins-state-select")?.value || "ap";
      const crop = document.getElementById("ins-crop-select").value;
      const season = document.getElementById("ins-season-select").value;
      const acres = document.getElementById("ins-acres-input").value;

      try {
        const res = await fetch("/api/calculate-insurance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state, crop, season, acres })
        });
        const d = await res.json();
        
        document.getElementById("ins-res-sum").textContent = `₹${d.total_sum_insured.toLocaleString("en-IN")}`;
        const stdEl = document.getElementById("ins-res-pmfby") || document.getElementById("ins-res-standard");
        if (stdEl) stdEl.textContent = `₹${d.standard_pmfby_farmer_share.toLocaleString("en-IN")}`;
        const payEl = document.getElementById("ins-res-ap-pay") || document.getElementById("ins-res-payable");
        if (payEl) payEl.textContent = `₹${d.farmer_payable_premium.toLocaleString("en-IN")} (100% Free)`;
        document.getElementById("ins-res-savings").textContent = `₹${d.farmer_savings.toLocaleString("en-IN")}`;
        
        document.getElementById("insurance-calc-results").classList.remove("hidden");
        document.getElementById("insurance-calc-results").scrollIntoView({ behavior: "smooth", block: "nearest" });
        fireConfetti();

        const lang = currentLanguage;
        const msg = lang === "hi"
          ? `फसल बीमा गणना पूरी हुई। किसान को देय प्रीमियम शून्य रुपये है!`
          : (lang === "en"
            ? `Crop insurance calculated successfully. Farmer payable premium is ₹0!`
            : `పంటల బీమా విజయవంతంగా లెక్కించబడింది. రైతు చెల్లించాల్సిన ప్రీమియం సున్నా రూపాయలు!`);
        voiceEngine.speak(msg, "Insurance Result", lang);
      } catch (err) {
        console.error("Insurance calculation failed:", err);
      }
    });
  }

  const kccForm = document.getElementById("kcc-calc-form");
  if (kccForm) {
    kccForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const loan_amount = document.getElementById("kcc-amount-input").value;
      const months = document.getElementById("kcc-tenure-select").value;

      try {
        const res = await fetch("/api/calculate-kcc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ loan_amount, months })
        });
        const d = await res.json();

        document.getElementById("kcc-res-base-rate").textContent = d.base_interest_rate;
        document.getElementById("kcc-res-central-rebate").textContent = `-${d.central_prompt_subvention}`;
        document.getElementById("kcc-res-ap-rebate").textContent = `-${d.state_subvention}`;
        document.getElementById("kcc-res-effective-rate").textContent = `${d.net_effective_interest_rate} (Zero Cost)`;
        document.getElementById("kcc-res-savings-total").textContent = `₹${d.total_farmer_savings.toLocaleString("en-IN")}`;

        document.getElementById("kcc-calc-results").classList.remove("hidden");
        document.getElementById("kcc-calc-results").scrollIntoView({ behavior: "smooth", block: "nearest" });
        fireConfetti();

        const lang = currentLanguage;
        const msg = lang === "hi"
          ? `शून्य ब्याज ऋण गणना पूरी हुई। आपकी कुल बचत ₹${d.total_farmer_savings.toLocaleString("en-IN")} है!`
          : (lang === "en"
            ? `0% Interest loan calculated. Your total savings is ₹${d.total_farmer_savings.toLocaleString("en-IN")}!`
            : `సున్నా వడ్డీ రుణ పొదుపు లెక్కించబడింది. రైతుకు మొత్తం ఆదా ₹${d.total_farmer_savings.toLocaleString("en-IN")}!`);
        voiceEngine.speak(msg, "KCC Result", lang);
      } catch (err) {
        console.error("KCC calculation failed:", err);
      }
    });
  }
}

// ------------------- GRIEVANCE SYSTEM (SPANDANA) -------------------
function initGrievanceSystem() {
  const form = document.getElementById("grievance-form");
  const confBox = document.getElementById("grievance-confirmation");
  const confMsg = document.getElementById("grv-confirm-msg");
  const confTicket = document.getElementById("grv-confirm-ticket");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const farmer_name = document.getElementById("grv-name-input").value.trim();
      const phone = document.getElementById("grv-phone-input").value.trim();
      const state = document.getElementById("grv-state-select")?.value || "Andhra Pradesh";
      const district = document.getElementById("grv-district-input").value.trim();
      const mandal = document.getElementById("grv-mandal-input").value.trim();
      const village_pacs = document.getElementById("grv-pacs-input").value.trim();
      const category = document.getElementById("grv-category-select").value;
      const description = document.getElementById("grv-desc-input").value.trim();
      const lang = currentLanguage;

      try {
        const res = await fetch("/api/grievance/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ farmer_name, phone, state, district, mandal, village_pacs, category, description, lang })
        });
        const d = await res.json();

        if (d.success) {
          confMsg.textContent = d.message;
          confTicket.textContent = d.ticket_id;
          confBox.classList.remove("hidden");
          form.reset();
          confBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
          fireConfetti();
          
          voiceEngine.speak(d.message, d.ticket_id, lang);
        }
      } catch (err) {
        console.error("Grievance submission error:", err);
      }
    });
  }

  // Grievance Voice Input Button
  const grvVoiceBtn = document.getElementById("grv-voice-btn");
  const grvDescInput = document.getElementById("grv-desc-input");
  if (grvVoiceBtn && grvDescInput) {
    grvVoiceBtn.addEventListener("click", () => {
      voiceEngine.toggleListening((transcript, isFinal) => {
        grvDescInput.value = transcript;
        if (isFinal) {
          voiceEngine.stopListening();
        }
      });
    });
  }

  const trackForm = document.getElementById("grievance-track-form");
  const trackInput = document.getElementById("grv-ticket-input") || document.getElementById("grv-track-input");
  const trackResult = document.getElementById("grievance-track-result") || document.getElementById("grv-track-result");

  if (trackForm && trackInput && trackResult) {
    trackForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const ticketId = trackInput.value.trim();
      if (!ticketId) return;

      try {
        const res = await fetch(`/api/grievance/track/${ticketId}`);
        const d = await res.json();

        if (d.found) {
          const g = d.grievance;
          const lang = currentLanguage;
          const cat = g.category_name[lang] || g.category_name.en || g.category_name.te;

          trackResult.innerHTML = `
            <div class="p-5 bg-slate-50 rounded-2xl border-2 border-emerald-300 space-y-2">
              <div class="flex items-center justify-between mb-2">
                <span class="font-black text-emerald-950 text-base">${g.ticket_id}</span>
                <span class="px-3 py-1 bg-emerald-600 text-white font-black text-xs rounded-full">${g.status}</span>
              </div>
              <p class="text-sm text-slate-800"><strong>రైతు పేరు:</strong> ${g.farmer_name} | ${g.phone}</p>
              <p class="text-sm text-slate-800"><strong>రాష్ట్రం & జిల్లా:</strong> ${g.state || "AP"}, ${g.district} (${g.mandal})</p>
              <p class="text-sm text-slate-800"><strong>సొసైటీ:</strong> ${g.village_pacs}</p>
              <p class="text-sm text-slate-800"><strong>విభాగం:</strong> ${cat}</p>
              <p class="text-sm text-slate-700 mt-2 p-3 bg-white rounded-xl border border-slate-200 font-medium">${g.description}</p>
              
              <div class="mt-4 pt-3 border-t border-slate-200">
                <h5 class="text-sm font-black text-slate-900 mb-2">పురోగతి (Action Timeline):</h5>
                <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  ${g.timeline.map(t => `<li><i class="fa-solid fa-clock-rotate-left text-emerald-600"></i> [${t.date}] <strong>${t.stage}</strong>: ${t.note}</li>`).join("")}
                </ul>
              </div>
            </div>
          `;
          trackResult.classList.remove("hidden");
        } else {
          trackResult.innerHTML = `<div class="p-4 bg-rose-50 text-rose-800 text-sm font-bold rounded-2xl border border-rose-300">No records found for ${ticketId}. Please verify your ticket ID.</div>`;
          trackResult.classList.remove("hidden");
        }
      } catch (err) {
        console.error("Tracking error:", err);
      }
    });
  }
}

// ------------------- CONFETTI PARTICLE SYSTEM -------------------
function fireConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#fbbf24", "#22c55e", "#38bdf8", "#f43f5e", "#a855f7", "#ffffff"];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      alpha: 1
    });
  }

  let animationFrame;
  let startTime = Date.now();

  function render() {
    const elapsed = Date.now() - startTime;
    if (elapsed > 2200) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vRot;
      p.alpha -= 0.012;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    animationFrame = requestAnimationFrame(render);
  }

  render();
}