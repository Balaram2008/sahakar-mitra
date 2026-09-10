// Sahakara Mitra - Universal Trilingual Voice Engine (STT & Native TTS Audio Stream)

class VoiceEngine {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.audioElement = new Audio();
    this.synth = window.speechSynthesis;
    this.currentUtterance = null;
    this.activeCallback = null;
    this.speechRate = 1.0;
    
    this.initAudioPlayer();
    this.initRecognition();
    this.initFloatingAudioBar();
  }

  initAudioPlayer() {
    this.audioElement.addEventListener("ended", () => {
      this.isSpeaking = false;
      this.hideFloatingBar();
    });
    this.audioElement.addEventListener("error", (e) => {
      console.warn("Audio stream error, falling back to Web Speech synthesis:", e);
      if (this.currentPendingText) {
        this.speakViaWebSpeech(this.currentPendingText, this.currentPendingLang);
      } else {
        this.isSpeaking = false;
        this.hideFloatingBar();
      }
    });
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateVoiceUI(true);
        console.log("Voice recognition active in language:", this.getLangCode());
      };

      this.recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (this.activeCallback) {
          this.activeCallback(transcript, event.results[0].isFinal);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        this.stopListening();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateVoiceUI(false);
      };
    }
  }

  initFloatingAudioBar() {
    if (!document.getElementById("floating-speak-bar")) {
      const bar = document.createElement("div");
      bar.id = "floating-speak-bar";
      bar.className = "floating-audio-bar hidden";
      bar.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="audio-wave-mini">
            <span></span><span></span><span></span><span></span>
          </div>
          <div class="flex flex-col">
            <span id="floating-audio-lang-label" class="text-[10px] font-black text-amber-300 uppercase tracking-wider">Audio Playing</span>
            <span id="floating-audio-title" class="text-xs text-white font-bold truncate max-w-[200px] sm:max-w-[340px]">Speaking out...</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button id="float-stop-btn" class="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition transform active:scale-95">
            <i class="fa-solid fa-stop text-white text-xs"></i> Stop
          </button>
        </div>
      `;
      document.body.appendChild(bar);

      document.getElementById("float-stop-btn")?.addEventListener("click", () => {
        this.stopSpeaking();
      });
    }
  }

  getLangCode(customLang = null) {
    const l = customLang || currentLanguage;
    switch (l) {
      case "te": return "te-IN";
      case "hi": return "hi-IN";
      default: return "en-IN";
    }
  }

  startListening(callback) {
    this.stopSpeaking();
    this.activeCallback = callback;
    
    if (this.recognition) {
      this.recognition.lang = this.getLangCode();
      try {
        this.recognition.start();
      } catch (e) {
        console.warn("Recognition start catch:", e);
      }
    } else {
      this.simulateSpeechInput(callback);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
    this.isListening = false;
    this.updateVoiceUI(false);
  }

  toggleListening(callback) {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening(callback);
    }
  }

  speak(text, previewTitle = "Speaking out...", customLang = null) {
    this.stopSpeaking();
    if (!text) return;

    const lang = customLang || currentLanguage;
    const cleanText = text
      .replace(/[\*\_#`]/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/\n+/g, " ")
      .trim();

    this.currentPendingText = cleanText;
    this.currentPendingLang = lang;

    // Use backend proxy audio streaming for 100% native natural pronunciation in Telugu & Hindi
    try {
      const audioUrl = `/api/tts?lang=${encodeURIComponent(lang)}&text=${encodeURIComponent(cleanText.substring(0, 200))}`;
      this.audioElement.src = audioUrl;
      this.audioElement.playbackRate = this.speechRate;
      
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isSpeaking = true;
          this.showFloatingBar(previewTitle, lang);
        }).catch(err => {
          console.warn("Audio stream playback blocked or failed, using Web Speech API fallback:", err);
          this.speakViaWebSpeech(cleanText, lang, previewTitle);
        });
      }
    } catch (e) {
      console.warn("Audio element setup error, using Web Speech API fallback:", e);
      this.speakViaWebSpeech(cleanText, lang, previewTitle);
    }
  }

  speakViaWebSpeech(cleanText, lang, previewTitle = "Speaking out...") {
    if (!this.synth) return;
    const langCode = this.getLangCode(lang);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode;
    utterance.rate = this.speechRate;

    const voices = this.synth.getVoices();
    const voice = voices.find(v => v.lang === langCode) ||
                  voices.find(v => v.lang.startsWith(lang.toLowerCase())) ||
                  voices.find(v => v.lang.includes("IN"));
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.currentUtterance = utterance;
      this.showFloatingBar(previewTitle, lang);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      this.hideFloatingBar();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.hideFloatingBar();
    };

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.hideFloatingBar();
  }

  showFloatingBar(title, lang = "te") {
    const bar = document.getElementById("floating-speak-bar");
    const titleEl = document.getElementById("floating-audio-title");
    const langEl = document.getElementById("floating-audio-lang-label");
    if (bar) {
      bar.classList.remove("hidden");
      if (titleEl) titleEl.innerText = title;
      if (langEl) {
        langEl.innerText = lang === "te" ? "🔊 తెలుగు ఆడియో ప్లే అవుతోంది" : (lang === "hi" ? "🔊 हिन्दी ऑडियो चल रहा है" : "🔊 Playing Audio (English)");
      }
    }
  }

  hideFloatingBar() {
    const bar = document.getElementById("floating-speak-bar");
    if (bar) {
      bar.classList.add("hidden");
    }
  }

  updateVoiceUI(isListening) {
    const waveElem = document.getElementById("voice-wave-container");
    const micButtons = document.querySelectorAll(".voice-mic-btn");
    
    if (waveElem) {
      if (isListening) {
        waveElem.classList.remove("hidden");
      } else {
        waveElem.classList.add("hidden");
      }
    }

    micButtons.forEach(btn => {
      if (isListening) {
        btn.classList.add("listening-pulse");
      } else {
        btn.classList.remove("listening-pulse");
      }
    });
  }

  simulateSpeechInput(callback) {
    this.updateVoiceUI(true);
    const demoPhrases = {
      te: "అన్నదాత సుఖీభవ ₹20,000 పథకం అర్హతలు ఏమిటి?",
      hi: "अन्नदाता सुखीभव एवं शून्य प्रतिशत ब्याज फसल ऋण योजना की जानकारी दीजिए",
      en: "What are the benefits under Annadata Sukhibhava and Free Crop Insurance?"
    };
    const phrase = demoPhrases[currentLanguage] || demoPhrases.te;

    setTimeout(() => {
      if (callback) callback(phrase, true);
      this.updateVoiceUI(false);
    }, 2000);
  }
}

const voiceEngine = new VoiceEngine();