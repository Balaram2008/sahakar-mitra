# 🌾 సహకార మిత్ర (Sahakara Mitra / सहकार मित्र)
### AI-Powered Multilingual Voice Portal & Touchscreen Kiosk for All-India Cooperative Governance, PMFBY, and Farmer Welfare Schemes

---

## 🌟 Overview
**Sahakara Mitra** is an intelligent, voice-enabled, multilingual public welfare portal and digital governance platform designed for farmers, cooperative society members (PACS), tenant cultivators, and rural citizens across **all 28 Indian States** and Central Ministries.

The portal provides:
- **Automatic State Default Languages**: Dynamically adapts to native state languages (Telugu, Hindi, Kannada, Tamil, Marathi, Bengali, Gujarati, Punjabi, Odia, Malayalam, Assamese, etc.) when any state is selected.
- **Welfare Schemes Directory**: 34 government schemes enriched with authentic high-resolution agricultural internet imagery.
- **AI-Powered Voice Chatbot**: Trilingual conversational intelligence and real-time Text-to-Speech (TTS) audio streaming.
- **Cooperative Society Laws**: Statutory guidance on APCS Act 1964 and National Model By-Laws for Multipurpose PACS.
- **Calculators & Wizard**: 0% Vaddi Leni Runalu (KCC loan) calculator, PMFBY crop insurance calculator, and a 3-step eligibility wizard.
- **Sahakara Spandana**: Digital grievance registration with automatic ticket generation and timeline tracking.
- **Touchscreen Kiosk Mode**: Hardware-grade, high-contrast interface designed for village Rythu Bharosa Kendras (RBKs) and PACS offices (`/kiosk-mode`).

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology |
|---|---|
| **Backend Framework** | Python 3 (Flask WSGI Web Framework) |
| **Serverless Engine** | Vercel Python Runtime (`@vercel/python` via `api/index.py`) |
| **Frontend UI** | HTML5, Modern Vanilla JavaScript (ES6+), CSS3 |
| **Styling & Icons** | Tailwind CSS (CDN), Custom CSS3 animations & gradients, Lucide Icons (CDN) |
| **Data Storage** | Structured JSON databases (`data/` directory with automatic `/tmp` serverless fallback) |
| **Speech & Audio** | Web Speech API (STT), Google Translate TTS Audio Streaming (`/api/tts`) |
| **Testing** | Python `unittest` suite (21 automated integration tests) |

---

## 📁 Project Directory Structure

```text
sahakara-mitra/
├── api/
│   └── index.py                    # Vercel Serverless Function entry point
├── data/                           # Application JSON databases
│   ├── grievances.json             # Citizen grievance records
│   ├── internet_schemes_cache.json # Cached live schemes
│   ├── internet_schemes_library.json # Pre-seeded internet scheme database
│   ├── knowledge_base.json         # Chatbot intent matching & trilingual QA
│   ├── laws.json                   # Cooperative societies statutory acts
│   ├── schemes.json                # All 34 welfare schemes with internet images
│   └── states.json                 # 28 States + Central with CM details & default languages
├── static/                         # Static web assets
│   ├── css/
│   │   ├── kiosk.css               # Kiosk touch interface stylesheet
│   │   └── style.css               # Main portal theme, animations, and glowing badges
│   ├── images/
│   │   ├── cm_chandrababu_naidu.jpg
│   │   ├── cms/                    # 28 state Chief Minister portraits (cm_ap.jpg .. cm_wb.jpg)
│   │   └── pm_narendra_modi.jpg
│   └── js/
│       ├── app.js                  # Main application controller & state switcher
│       ├── chat.js                 # Chatbot assistant engine
│       ├── i18n.js                 # 28-language internationalization dictionary & engine
│       ├── kiosk.js                # Kiosk touchscreen controller
│       └── voice.js                # Voice recognition & TTS streaming client
├── templates/                      # Jinja2 HTML templates
│   ├── index.html                  # Full Web Portal
│   └── kiosk.html                  # Touchscreen Kiosk Interface
├── .gitignore                      # Git exclusion rules
├── package.json                    # Project metadata & npm-compatible scripts
├── README.md                       # Documentation & deployment guide
├── requirements.txt                # Python dependencies for local & Vercel deployment
├── server.py                       # Core Flask backend server & REST API
├── start.bat                       # Windows launch script
├── start.ps1                       # PowerShell launch script
├── test_cms_and_languages.py       # CM & language test suite
├── test_server.py                  # Server integration test suite
└── vercel.json                     # Vercel routing & rewrites configuration
```

---

## 🚀 Local Installation & Running

### 1. Prerequisites
- Python 3.9 or newer installed.
- Git installed.

### 2. Setup & Installation
```bash
# Clone the repository (or extract files)
cd sahakara-mitra

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Run the Development Server
```bash
# Start via Python
python server.py

# Or via npm script (if node is installed)
npm start
```
The application will start at:
- **Web Portal**: `http://127.0.0.1:5000/`
- **Kiosk Interface**: `http://127.0.0.1:5000/kiosk-mode`
- **Health Check**: `http://127.0.0.1:5000/api/health`

### 4. Run Automated Tests
```bash
# Run CM and language validation suite
python test_cms_and_languages.py

# Run server API and integration test suite
python test_server.py
```

---

## 🌐 Deploying to GitHub and Vercel

### Step 1: Initialize Git Repository
In your project directory, run:
```bash
git init
git add .
git commit -m "Initial commit: Sahakara Mitra multilingual portal ready for Vercel"
```

### Step 2: Push to GitHub
1. Open [GitHub](https://github.com/) and click **New Repository**.
2. Name the repository (e.g. `sahakara-mitra`).
3. Leave it Public (or Private) and **do not** check "Add a README" or ".gitignore" (they are already present).
4. Connect your local folder and push:
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/sahakara-mitra.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** $\rightarrow$ **"Project"**.
3. Under **Import Git Repository**, select your `sahakara-mitra` repository and click **Import**.
4. Configure the project settings:
   - **Framework Preset**: `Other` (or leave as auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: Leave empty / default
   - **Output Directory**: Leave empty / default
   - **Environment Variables**: None required! (Optional: set `FLASK_ENV=production`)
5. Click **Deploy**.
6. In approximately 30-45 seconds, Vercel will provision the Python serverless runtime, install `requirements.txt`, cache static assets on its global CDN, and output your live production URL (e.g. `https://sahakara-mitra.vercel.app`).

---

## ⚙️ Deployment Configurations Explained

### `vercel.json`
Routes incoming traffic to the serverless function while allowing Vercel's Edge CDN to serve static assets:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index.py"
    }
  ]
}
```

### `api/index.py`
Exposes the WSGI `app` callable to Vercel's Python runtime:
```python
import os, sys
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)
from server import app
```

### Serverless Read-Only File Protection
On serverless platforms like Vercel, the root filesystem is read-only. `server.py` automatically falls back to `/tmp` for any runtime writes (such as saving new grievances or caching live Wikipedia scheme lookups), guaranteeing 0 runtime exceptions.

---

## 🔒 Security & Best Practices
- **No Secrets Exposed**: The project contains zero hard-coded credentials, API keys, database passwords, or auth tokens.
- **Clean `.gitignore`**: Excludes `__pycache__`, virtual environments, IDE configs, system dumps, and local test artifacts from Git.
- **Root-Relative URLs**: All frontend API calls use root-relative endpoints (`/api/states`, `/api/schemes`, `/api/chat`), making the application run seamlessly across `localhost`, Vercel preview URLs, and custom production domains.