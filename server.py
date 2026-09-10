import os
import json
import random
import datetime
import urllib.request
import urllib.parse
import re
import html
from flask import Flask, render_template, request, jsonify, Response, send_file, redirect
from flask_cors import CORS

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

def load_json_file(filename, default_val=None):
    try:
        tmp_path = os.path.join('/tmp', filename)
        if os.path.exists(tmp_path):
            with open(tmp_path, 'r', encoding='utf-8') as f:
                return json.load(f)
    except Exception:
        pass
    path = os.path.join(DATA_DIR, filename)
    if os.path.exists(path):
        try:
            with open(path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return default_val if default_val is not None else []

def save_json_file(filename, data):
    path = os.path.join(DATA_DIR, filename)
    try:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            return
    except (OSError, PermissionError):
        pass
    try:
        tmp_path = os.path.join('/tmp', filename)
        with open(tmp_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Warning: Could not save {filename}: {e}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/kiosk')
def kiosk():
    return redirect('/')

@app.route('/kiosk-mode')
def kiosk_mode():
    return render_template('kiosk.html')

@app.route('/download')
def download_project_zip():
    zip_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'sahakara-mitra-ap-project.zip')
    if not os.path.exists(zip_path):
        zip_path = os.path.join(os.path.dirname(__file__), 'sahakara-mitra-ap-project.zip')
    if not os.path.exists(zip_path):
        tmp_zip = os.path.join('/tmp', 'sahakara-mitra-ap-project.zip')
        if os.path.exists(tmp_zip):
            zip_path = tmp_zip
        else:
            import shutil
            try:
                shutil.make_archive(zip_path.replace('.zip', ''), 'zip', os.path.dirname(__file__))
            except (OSError, PermissionError):
                shutil.make_archive(tmp_zip.replace('.zip', ''), 'zip', os.path.dirname(__file__))
                zip_path = tmp_zip
    return send_file(zip_path, as_attachment=True, download_name='sahakara-mitra-ap-project.zip')

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'Sahakara Mitra All-India Cooperative Governance & Schemes Portal',
        'version': '3.0.0',
        'total_states_supported': 28,
        'supported_languages': ['te', 'hi', 'en'],
        'timestamp': datetime.datetime.now().isoformat()
    })

@app.route('/api/states', methods=['GET'])
def get_states():
    """Returns the list of all 28 States of India + Central MoC."""
    states = load_json_file('states.json', [])
    return jsonify({'count': len(states), 'states': states})

@app.route('/api/tts', methods=['GET'])
def get_tts_audio():
    """High-quality Multilingual TTS Audio Stream for Indian State Languages."""
    text = request.args.get('text', '').strip()
    lang = request.args.get('lang', 'te').strip().lower()
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
        
    supported_langs = {
        'te': 'te', 'hi': 'hi', 'en': 'en',
        'ta': 'ta', 'kn': 'kn', 'ml': 'ml',
        'mr': 'mr', 'gu': 'gu', 'bn': 'bn',
        'or': 'or', 'pa': 'pa', 'as': 'as'
    }
    target_lang = supported_langs.get(lang, 'te')
    
    clean_text = text.replace('\n', ' ').replace('*', '').replace('#', '').replace('_', '')
    if len(clean_text) > 200:
        clean_text = clean_text[:200]
        
    encoded_text = urllib.parse.quote(clean_text)
    tts_url = f"https://translate.google.com/translate_tts?ie=UTF-8&tl={target_lang}&client=tw-ob&q={encoded_text}"
    
    req = urllib.request.Request(tts_url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })
    
    try:
        with urllib.request.urlopen(req, timeout=8) as response:
            audio_bytes = response.read()
            return Response(audio_bytes, mimetype='audio/mpeg')
    except Exception as e:
        print(f"TTS streaming error for lang {target_lang}: {e}")
        # fallback to hindi or english if dialect unavailable
        try:
            fallback_url = f"https://translate.google.com/translate_tts?ie=UTF-8&tl=hi&client=tw-ob&q={encoded_text}"
            with urllib.request.urlopen(urllib.request.Request(fallback_url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=5) as resp:
                return Response(resp.read(), mimetype='audio/mpeg')
        except Exception:
            return jsonify({'error': 'TTS generation failed', 'details': str(e)}), 500

# ================= LIVE INTERNET SCHEMES SEARCH ENGINE =================

def clean_html(raw_html):
    if not raw_html:
        return ""
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return html.unescape(cleantext).strip()

def fetch_live_wikipedia_scheme(query):
    """Fetch live agricultural & welfare scheme information from Wikipedia and web APIs."""
    schemes_found = []
    try:
        search_terms = [f"{query} scheme India", f"{query} agriculture", query]
        seen_titles = set()
        
        for st in search_terms:
            if len(schemes_found) >= 3:
                break
            encoded = urllib.parse.quote(st)
            url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={encoded}&format=json&utf8=1"
            req = urllib.request.Request(url, headers={'User-Agent': 'SahakaraMitra/3.0 (Rural Agriculture & Welfare Assistant)'})
            try:
                with urllib.request.urlopen(req, timeout=4) as response:
                    data = json.loads(response.read().decode('utf-8'))
                    search_results = data.get('query', {}).get('search', [])
                    for top_match in search_results[:2]:
                        title = top_match.get('title', query)
                        if title.lower() in seen_titles:
                            continue
                        seen_titles.add(title.lower())
                        
                        snippet = clean_html(top_match.get('snippet', ''))
                        extract = snippet
                        title_enc = urllib.parse.quote(title)
                        ex_url = f"https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&titles={title_enc}&format=json"
                        try:
                            ex_req = urllib.request.Request(ex_url, headers={'User-Agent': 'SahakaraMitra/3.0'})
                            with urllib.request.urlopen(ex_req, timeout=3) as ex_resp:
                                ex_data = json.loads(ex_resp.read().decode('utf-8'))
                                pages = ex_data.get('query', {}).get('pages', {})
                                for p_id, p_val in pages.items():
                                    if 'extract' in p_val and p_val['extract']:
                                        extract = p_val['extract'][:380] + "..."
                                        break
                        except Exception:
                            pass

                        slug = "internet-" + re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-')[:35]
                        
                        img_url = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                        t_low = title.lower()
                        if any(w in t_low for w in ['solar', 'kusum', 'urja', 'energy']):
                            img_url = "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
                        elif any(w in t_low for w in ['drone', 'tech', 'smart']):
                            img_url = "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
                        elif any(w in t_low for w in ['dairy', 'pashu', 'gokul', 'milk', 'cattle']):
                            img_url = "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80"
                        elif any(w in t_low for w in ['drip', 'sinchayee', 'water', 'irrigation']):
                            img_url = "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80"
                        elif any(w in t_low for w in ['storage', 'godown', 'grain', 'warehouse']):
                            img_url = "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"
                        elif any(w in t_low for w in ['machinery', 'tractor', 'yantra']):
                            img_url = "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80"
                        elif any(w in t_low for w in ['insurance', 'bima', 'suraksha']):
                            img_url = "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"

                        schemes_found.append({
                            "id": slug,
                            "state_id": "all",
                            "category": "internet_live",
                            "badge": "🌐 Live Internet Verified",
                            "icon": "fa-globe",
                            "color": "#0284c7",
                            "scheme_image": img_url,
                            "leader_name": {
                                "en": "Government Welfare Division",
                                "te": "ప్రభుత్వ సంక్షేమ విభాగం",
                                "hi": "सरकारी कल्याण विभाग"
                            },
                            "leader_image": "/static/images/pm_narendra_modi.jpg",
                            "title": {
                                "en": f"{title} (Live Web Scheme)",
                                "te": f"{title} (ఇంటర్నెట్ ప్రత్యక్ష పథకం)",
                                "hi": f"{title} (इंटरनेट लाइव योजना)"
                            },
                            "tagline": {
                                "en": extract[:130] + "..." if len(extract) > 130 else f"Live government agricultural welfare initiative for {title}",
                                "te": f"{title} వ్యవసాయ మరియు సంక్షేమ పథకానికి సంబంధించిన ప్రత్యక్ష సమాచారం",
                                "hi": f"{title} कृषि एवं कल्याणकारी योजना से संबंधित लाइव जानकारी"
                            },
                            "authority": {
                                "en": "Ministry of Agriculture & Farmers Welfare / State Government",
                                "te": "వ్యవసాయ & రైతు సంక్షేమ శాఖ / రాష్ట్ర ప్రభుత్వం",
                                "hi": "कृषि एवं किसान कल्याण मंत्रालय / राज्य सरकार"
                            },
                            "benefits": {
                                "en": f"{extract}\n\nDirect financial, input, and technological support provided to eligible beneficiaries under official government guidelines.",
                                "te": f"{extract}\n\nఅర్హులైన రైతులకు ప్రభుత్వ రాయితీ, సాంకేతిక పరికరాలు మరియు ఆర్థిక సాయం అందించబడుతుంది.",
                                "hi": f"{extract}\n\nपात्र किसानों को सरकारी अनुदान, तकनीकी उपकरण एवं प्रत्यक्ष वित्तीय सहायता प्रदान की जाती है।"
                            },
                            "eligibility": {
                                "en": f"Cultivating farmers, tenant agriculturalists, and eligible rural beneficiaries under {title} guidelines.",
                                "te": "రైతులు, కౌలు రైతులు మరియు గ్రామీణ లబ్ధిదారులు ఈ పథకానికి దరఖాస్తు చేసుకోవచ్చు.",
                                "hi": "किसान, बटाईदार एवं ग्रामीण लाभार्थी इस योजना के पात्र हैं।"
                            },
                            "documents": {
                                "en": ["Aadhaar Card", "Land Record / Pattadar Passbook / 1B", "Bank Account Passbook", "Active Mobile Number", "Passport Size Photograph"],
                                "te": ["ఆధార్ కార్డు", "భూమి పట్టాదారు పాస్‌బుక్ / 1B", "బ్యాంక్ ఖాతా పాస్‌బుక్", "మొబైల్ నంబర్", "పాస్‌పోర్ట్ సైజు ఫోటో"],
                                "hi": ["आधार कार्ड", "भूमि पट्टादार पासबुक / खतौनी", "बैंक खाता पासबुक", "मोबाइल नंबर", "पासपोर्ट फोटो"]
                            },
                            "how_to_apply": {
                                "en": f"Visit the official portal for {title} or apply through your nearest Common Service Centre (CSC) / Village Rythu Seva Kendra (RSK).",
                                "te": f"{title} అధికారిక పోర్టల్ లేదా మీ సమీపంలోని గ్రామ రైతు సేవా కేంద్రం (RSK) / CSC సెంటర్‌ను సంప్రదించండి.",
                                "hi": f"{title} के आधिकारिक पोर्टल अथवा नजदीकी ग्राम आरबीके (RSK) / सीएससी केंद्र पर संपर्क करें।"
                            },
                            "source_url": f"https://en.wikipedia.org/wiki/{title_enc}"
                        })
            except Exception:
                pass
    except Exception as err:
        print(f"Wikipedia scheme fetch error: {err}")
        
    return schemes_found

def search_internet_schemes(query, lang='te', state_id='all'):
    """Search library, cache, and live web for schemes matching query."""
    q_clean = query.lower().strip()
    if not q_clean:
        return []
    
    # 1. Check Library and Cache
    library = load_json_file('internet_schemes_library.json', [])
    cache = load_json_file('internet_schemes_cache.json', [])
    base_schemes = load_json_file('schemes.json', [])
    
    matches = []
    seen_ids = set()

    for s in library + cache + base_schemes:
        s_id = s.get('id', '')
        if s_id in seen_ids:
            continue
        
        # Tag is_internet attribute
        is_ext = s_id.startswith('internet-') or s.get('category') == 'internet_live' or 'wikipedia' in s.get('source_url', '').lower()
        s_copy = dict(s)
        s_copy['is_internet'] = is_ext
        if is_ext:
            s_copy['category'] = 'internet_live'
        
        score = 0
        keywords = s.get('keywords', [])
        for kw in keywords:
            if kw.lower() in q_clean or q_clean in kw.lower():
                score += 25
        
        for lk in ['en', 'te', 'hi']:
            title_txt = s['title'].get(lk, '').lower() if isinstance(s.get('title'), dict) else str(s.get('title', '')).lower()
            tagline_txt = s['tagline'].get(lk, '').lower() if isinstance(s.get('tagline'), dict) else str(s.get('tagline', '')).lower()
            benefits_txt = s['benefits'].get(lk, '').lower() if isinstance(s.get('benefits'), dict) else str(s.get('benefits', '')).lower()
            
            if q_clean in title_txt or q_clean in tagline_txt:
                score += 30
            elif q_clean in benefits_txt:
                score += 15
                
            for word in q_clean.split():
                if len(word) > 2 and (word in title_txt or word in tagline_txt):
                    score += 8
                    
        if score > 0:
            matches.append((score, s_copy))
            seen_ids.add(s_id)
            
    matches.sort(key=lambda x: x[0], reverse=True)
    results = [m[1] for m in matches]
    
    # 2. Fetch live Wikipedia/Web schemes if results < 4
    if len(results) < 4:
        live_schemes = fetch_live_wikipedia_scheme(query)
        for ls in live_schemes:
            if ls['id'] not in seen_ids:
                ls['is_internet'] = True
                results.append(ls)
                seen_ids.add(ls['id'])
                # Save to cache
                if ls['id'] not in [c.get('id') for c in cache]:
                    cache.append(ls)
                    save_json_file('internet_schemes_cache.json', cache)
                
    return results

@app.route('/api/schemes/internet-search', methods=['GET', 'POST'])
def search_schemes_internet():
    """Live Internet Scheme Search API."""
    if request.method == 'POST':
        payload = request.get_json() or {}
        query = payload.get('query', '').strip()
        lang = payload.get('lang', 'te')
        state_id = payload.get('state_id', 'all')
    else:
        query = request.args.get('query', '').strip()
        lang = request.args.get('lang', 'te')
        state_id = request.args.get('state_id', 'all')
        
    if not query:
        return jsonify({'count': 0, 'schemes': [], 'message': 'Please provide a search query.'})
        
    schemes = search_internet_schemes(query, lang=lang, state_id=state_id)
    return jsonify({
        'query': query,
        'count': len(schemes),
        'source': 'internet_live',
        'schemes': schemes
    })

@app.route('/api/schemes', methods=['GET'])
def get_schemes():
    """Filter schemes by state_id (all 28 states supported) and search query."""
    state_id = request.args.get('state_id', 'all').lower().strip()
    category = request.args.get('category', 'all').lower().strip()
    search = request.args.get('search', '').lower().strip()
    include_internet = request.args.get('include_internet', 'false').lower() == 'true'
    
    schemes = load_json_file('schemes.json', [])
    
    if state_id != 'all':
        # Return schemes for this state + central schemes
        schemes = [s for s in schemes if s.get('state_id') == state_id or s.get('state_id') == 'all' or s.get('category') == 'central_moc']
        
    if category != 'all':
        schemes = [s for s in schemes if s.get('category') == category]
        
    if search:
        filtered = []
        for s in schemes:
            text_en = s['title']['en'] + ' ' + s['tagline']['en'] + ' ' + s['benefits']['en']
            text_te = s['title']['te'] + ' ' + s['tagline']['te'] + ' ' + s['benefits']['te']
            text_hi = s['title']['hi'] + ' ' + s['tagline']['hi'] + ' ' + s['benefits']['hi']
            if search in (text_en + ' ' + text_te + ' ' + text_hi).lower() or search in s.get('state_id', ''):
                filtered.append(s)
        schemes = filtered
        
        # If no local schemes found or include_internet requested, append internet search results
        if len(schemes) == 0 or include_internet:
            net_schemes = search_internet_schemes(search, state_id=state_id)
            existing_ids = {s.get('id') for s in schemes}
            for ns in net_schemes:
                if ns.get('id') not in existing_ids:
                    schemes.append(ns)
        
    return jsonify({'count': len(schemes), 'state_id': state_id, 'schemes': schemes})

@app.route('/api/laws', methods=['GET'])
def get_laws():
    search = request.args.get('search', '').lower().strip()
    laws = load_json_file('laws.json', [])
    if search:
        filtered = []
        for law in laws:
            act_text = law['act_name']['en'] + ' ' + law['act_name']['te'] + ' ' + law['act_name']['hi']
            matching_sections = []
            for sec in law['sections']:
                sec_text = sec['section_no'] + ' ' + sec['title']['en'] + ' ' + sec['title']['te'] + ' ' + sec['title']['hi'] + ' ' + sec['summary']['en'] + ' ' + sec['summary']['te'] + ' ' + sec['summary']['hi']
                if search in sec_text.lower() or search in act_text.lower():
                    matching_sections.append(sec)
            if matching_sections:
                law_copy = dict(law)
                law_copy['sections'] = matching_sections
                filtered.append(law_copy)
        return jsonify({'count': len(filtered), 'laws': filtered})
    return jsonify({'count': len(laws), 'laws': laws})

@app.route('/api/grievance/submit', methods=['POST'])
def submit_grievance():
    payload = request.get_json() or {}
    farmer_name = payload.get('farmer_name', '').strip()
    phone = payload.get('phone', '').strip()
    district = payload.get('district', 'General District')
    state = payload.get('state', 'Andhra Pradesh')
    mandal = payload.get('mandal', 'Rural Mandal')
    village_pacs = payload.get('village_pacs', 'Local PACS')
    category = payload.get('category', 'pacs_loan')
    description = payload.get('description', '').strip()
    lang = payload.get('lang', 'te')
    
    if not farmer_name or not phone or not description:
        return jsonify({'error': 'Please provide Farmer Name, Phone Number, and Complaint Description.'}), 400
        
    ticket_num = random.randint(1000, 9999)
    ticket_id = f'GRV-2026-{ticket_num}'
    
    cat_names = {
        'pacs_loan': {'en': 'PACS Crop Loan Disbursal Delay / Rejection', 'te': 'పిఎసిఎస్ పంట రుణాల జాప్యం / తిరస్కరణ', 'hi': 'पैक्स फसल ऋण वितरण में देरी / अस्वीकृति'},
        'fertilizer_shortage': {'en': 'Fertilizer & Seed Stock / Overpricing', 'te': 'ఎరువులు, విత్తనాల కృత్రిమ కొరత లేదా అధిక ధరలు', 'hi': 'उर्वरक एवं बीज उपलब्धता व अधिक कीमत'},
        'crop_insurance': {'en': 'Crop Insurance / PMFBY Claim Pending', 'te': 'పంటల బీమా / క్లెయిమ్ చెల్లింపు పెండింగ్', 'hi': 'फसल बीमा क्लेम लंबित'},
        'membership_issue': {'en': 'Refusal of PACS Membership / Rights Denial', 'te': 'పిఎసిఎస్ సభ్యత్వం నిరాకరణ / హక్కుల ఉల్లంఘన', 'hi': 'पैक्स सदस्यता से इनकार / अधिकार हनन'},
        'election_governance': {'en': 'Irregularity in Society Election / Mismanagement', 'te': 'సహకార సంఘ ఎన్నికల అవకతవకలు / నిధుల దుర్వినియోగం', 'hi': 'समिति चुनाव में अनियमितता / वित्तीय अनियमितता'}
    }
    
    now_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M')
    
    new_grievance = {
        'ticket_id': ticket_id,
        'created_at': now_str,
        'farmer_name': farmer_name,
        'phone': phone,
        'state': state,
        'district': district,
        'mandal': mandal,
        'village_pacs': village_pacs,
        'category': category,
        'category_name': cat_names.get(category, cat_names['pacs_loan']),
        'description': description,
        'status': 'Registered',
        'priority': 'High' if any(w in description.lower() for w in ['fraud', 'corruption', 'అవినీతి', 'లంచం', 'धोखाधड़ी']) else 'Standard',
        'timeline': [
            {'date': now_str, 'stage': 'Grievance Lodged', 'note': f'Ticket {ticket_id} created successfully via Sahakara Mitra Portal.'},
            {'date': (datetime.datetime.now() + datetime.timedelta(minutes=5)).strftime('%Y-%m-%d %H:%M'), 'stage': 'Automated Routing', 'note': f'Assigned to District Cooperative Officer (DCO) - {district}, {state}.'}
        ]
    }
    
    grievances = load_json_file('grievances.json', [])
    grievances.insert(0, new_grievance)
    save_json_file('grievances.json', grievances)
    
    messages = {
        'en': f'Grievance registered successfully! Your Ticket ID is {ticket_id}. It has been forwarded to District Cooperative Officer ({district}, {state}).',
        'te': f'మీ ఫిర్యాదు విజయవంతంగా నమోదైంది! మీ టికెట్ ఐడీ: {ticket_id}. ఇది జిల్లా సహకార అధికారికి ({district}, {state}) పంపబడింది.',
        'hi': f'आपकी शिकायत सफलतापूर्वक दर्ज हो गई है! आपका टिकट आईडी {ticket_id} है। इसे जिला सहकारी अधिकारी ({district}, {state}) को भेज दिया गया है।'
    }
    
    return jsonify({
        'success': True,
        'ticket_id': ticket_id,
        'grievance': new_grievance,
        'message': messages.get(lang, messages['te'])
    })

@app.route('/api/grievance/track/<ticket_id>', methods=['GET'])
def track_grievance(ticket_id):
    grievances = load_json_file('grievances.json', [])
    for g in grievances:
        if g['ticket_id'].upper() == ticket_id.strip().upper():
            return jsonify({'found': True, 'grievance': g})
            
    return jsonify({
        'found': False,
        'message': f'No grievance record found for Ticket ID: {ticket_id}'
    }), 404

@app.route('/api/calculate-insurance', methods=['POST'])
def calculate_insurance():
    data = request.get_json() or {}
    crop = data.get('crop', 'paddy').lower()
    acres = float(data.get('acres', 1.0))
    season = data.get('season', 'kharif').lower()
    state = data.get('state', 'ap').lower()
    
    scale_rates = {
        'paddy': {'sum_per_acre': 38000, 'rate': 0.02, 'category': 'Kharif/Rabi Food Crop'},
        'cotton': {'sum_per_acre': 45000, 'rate': 0.05, 'category': 'Commercial / Cash Crop'},
        'groundnut': {'sum_per_acre': 32000, 'rate': 0.02, 'category': 'Oilseeds Crop'},
        'chillies': {'sum_per_acre': 75000, 'rate': 0.05, 'category': 'Commercial Horticultural'},
        'maize': {'sum_per_acre': 30000, 'rate': 0.02, 'category': 'Kharif Coarse Cereal'},
        'pulses': {'sum_per_acre': 24000, 'rate': 0.015 if season == 'rabi' else 0.02, 'category': 'Pulses Crop'},
        'sugarcane': {'sum_per_acre': 60000, 'rate': 0.05, 'category': 'Commercial Annual Crop'},
        'mango': {'sum_per_acre': 50000, 'rate': 0.05, 'category': 'Horticulture Fruit Crop'}
    }
    
    info = scale_rates.get(crop, scale_rates['paddy'])
    sum_insured_per_acre = info['sum_per_acre']
    total_sum_insured = sum_insured_per_acre * acres
    
    standard_pmfby_rate = info['rate']
    actuarial_rate = 0.12
    
    total_actuarial_premium = total_sum_insured * actuarial_rate
    standard_farmer_premium = total_sum_insured * standard_pmfby_rate
    
    # State specific free policies (e.g. AP 100% Free, MH ₹1, BR 100% Free)
    if state in ['ap', 'br', 'tr']:
        farmer_payable_premium = 0.0
    elif state == 'mh':
        farmer_payable_premium = 1.0
    else:
        farmer_payable_premium = standard_farmer_premium
        
    farmer_savings = standard_farmer_premium - farmer_payable_premium
    
    return jsonify({
        'crop': crop,
        'acres': acres,
        'season': season,
        'state': state,
        'crop_category': info['category'],
        'sum_insured_per_acre': sum_insured_per_acre,
        'total_sum_insured': total_sum_insured,
        'total_actuarial_premium': total_actuarial_premium,
        'standard_pmfby_farmer_share': standard_farmer_premium,
        'farmer_payable_premium': farmer_payable_premium,
        'farmer_savings': farmer_savings
    })

@app.route('/api/calculate-kcc', methods=['POST'])
def calculate_kcc():
    data = request.get_json() or {}
    loan_amount = float(data.get('loan_amount', 50000))
    months = int(data.get('months', 12))
    
    base_rate = 7.0
    central_subvention = 3.0
    state_subvention = 4.0 if (loan_amount <= 100000 and months <= 12) else 0.0
    
    effective_rate = max(0.0, base_rate - central_subvention - state_subvention)
    
    interest_standard = (loan_amount * (base_rate / 100)) * (months / 12)
    interest_actual = (loan_amount * (effective_rate / 100)) * (months / 12)
    total_savings = interest_standard - interest_actual
    
    return jsonify({
        'loan_amount': loan_amount,
        'months': months,
        'base_interest_rate': f'{base_rate}%',
        'central_prompt_subvention': f'{central_subvention}%',
        'state_subvention': f'{state_subvention}%',
        'net_effective_interest_rate': f'{effective_rate}%',
        'standard_bank_interest': round(interest_standard, 2),
        'interest_payable_by_farmer': round(interest_actual, 2),
        'total_farmer_savings': round(total_savings, 2)
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    payload = request.get_json() or {}
    message = payload.get('message', '').strip()
    selected_lang = payload.get('lang', 'te')
    
    if not message:
        return jsonify({'response': 'Please enter or speak your question.', 'lang': selected_lang})
        
    kb = load_json_file('knowledge_base.json', {'intents': []})
    schemes = load_json_file('schemes.json', [])
    laws = load_json_file('laws.json', [])
    states = load_json_file('states.json', [])
    
    msg_lower = message.lower()
    has_telugu = any('\u0c00' <= char <= '\u0c7f' for char in message)
    has_hindi = any('\u0900' <= char <= '\u097f' for char in message)
    
    lang = selected_lang
    if has_telugu:
        lang = 'te'
    elif has_hindi:
        lang = 'hi'

    # 1. First Check for State-Specific Scheme Matching (All 28 States)
    best_scheme = None
    best_scheme_score = 0
    
    for s in schemes:
        score = 0
        s_id = s.get('id', '').lower()
        s_state = s.get('state_id', '').lower()
        
        # Check title in en, te, hi
        for lk in ['en', 'te', 'hi']:
            title_text = s['title'].get(lk, '').lower()
            tagline_text = s['tagline'].get(lk, '').lower()
            
            for word in title_text.split():
                if len(word) > 2 and word in msg_lower:
                    score += len(word) * 3
            for word in tagline_text.split():
                if len(word) > 3 and word in msg_lower:
                    score += len(word) * 1.5

        if s_state in msg_lower or s_id in msg_lower:
            score += 15

        # Check state name in all languages
        state_obj = next((st for st in states if st['id'] == s_state), None)
        if state_obj:
            for lk in ['en', 'te', 'hi']:
                st_name = state_obj['name'].get(lk, '').lower()
                if st_name and st_name in msg_lower:
                    score += 20

        if score > best_scheme_score:
            best_scheme_score = score
            best_scheme = s

    if best_scheme and best_scheme_score >= 12:
        top = best_scheme
        if lang == 'te':
            resp = f"🌾 **{top['title']['te']}**\n\n**వివరణ:** {top['tagline']['te']}\n\n**ప్రయోజనాలు:** {top['benefits']['te']}\n\n**అర్హత:** {top['eligibility']['te']}\n\n**దరఖాస్తు విధానం:** {top['how_to_apply']['te']}"
        elif lang == 'hi':
            resp = f"🌾 **{top['title']['hi']}**\n\n**विवरण:** {top['tagline']['hi']}\n\n**लाभ:** {top['benefits']['hi']}\n\n**पात्रता:** {top['eligibility']['hi']}\n\n**आवेदन कैसे करें:** {top['how_to_apply']['hi']}"
        else:
            resp = f"🌾 **{top['title']['en']}**\n\n**Summary:** {top['tagline']['en']}\n\n**Benefits:** {top['benefits']['en']}\n\n**Eligibility:** {top['eligibility']['en']}\n\n**How to Apply:** {top['how_to_apply']['en']}"
        return jsonify({
            'response': resp,
            'lang': lang,
            'intent': 'scheme_info',
            'actions': ['view_schemes']
        })

    # 2. Match Knowledge Base Intents
    matched_intent = None
    best_intent_score = 0
    for intent in kb.get('intents', []):
        score = 0
        for kw in intent.get('keywords', []):
            kw_clean = kw.lower().strip()
            if kw_clean in msg_lower:
                score += len(kw_clean) * 2
            for word in kw_clean.split():
                if len(word) > 3 and word in msg_lower:
                    score += len(word)
        if score > best_intent_score:
            best_intent_score = score
            matched_intent = intent
            
    if matched_intent and best_intent_score >= 4:
        response_text = matched_intent['response'].get(lang, matched_intent['response']['te' if lang == 'te' else 'en'])
        actions = matched_intent.get('actions', [])
        return jsonify({
            'response': response_text,
            'lang': lang,
            'intent': matched_intent['id'],
            'actions': actions
        })

    # 3. Match Laws
    for law in laws:
        for sec in law.get('sections', []):
            sec_text = (sec['section_no'] + ' ' + sec['title']['en'] + ' ' + sec['title']['te'] + ' ' + sec['title']['hi']).lower()
            if any(word in sec_text for word in msg_lower.split() if len(word) > 3):
                if lang == 'te':
                    resp = f"⚖️ **{law['act_name']['te']} - {sec['section_no']}**\n\n**అంశం:** {sec['title']['te']}\n\n**చట్టపరమైన వివరణ:** {sec['summary']['te']}"
                elif lang == 'hi':
                    resp = f"⚖️ **{law['act_name']['hi']} - {sec['section_no']}**\n\n**शीर्षक:** {sec['title']['hi']}\n\n**कानूनी प्रावधान:** {sec['summary']['hi']}"
                else:
                    resp = f"⚖️ **{law['act_name']['en']} - {sec['section_no']}**\n\n**Title:** {sec['title']['en']}\n\n**Legal Provision:** {sec['summary']['en']}"
                return jsonify({
                    'response': resp,
                    'lang': lang,
                    'intent': 'law_info',
                    'actions': ['view_laws']
                })
                
    # 3.5 Check Live Internet Schemes Engine
    net_matches = search_internet_schemes(message, lang=lang)
    if net_matches:
        top = net_matches[0]
        if lang == 'te':
            resp = f"🌐 **{top['title']['te']}** (ఇంటర్నెట్ ప్రత్యక్ష సమాచారం)\n\n**వివరణ:** {top['tagline']['te']}\n\n**ప్రయోజనాలు:** {top['benefits']['te']}\n\n**అర్హత:** {top['eligibility']['te']}\n\n**దరఖాస్తు విధానం:** {top['how_to_apply']['te']}\n\n🔗 [అధికారిక వెబ్‌సైట్ లింక్]({top.get('source_url', 'https://www.myscheme.gov.in')})"
        elif lang == 'hi':
            resp = f"🌐 **{top['title']['hi']}** (इंटरनेट लाइव जानकारी)\n\n**विवरण:** {top['tagline']['hi']}\n\n**लाभ:** {top['benefits']['hi']}\n\n**पात्रता:** {top['eligibility']['hi']}\n\n**आवेदन कैसे करें:** {top['how_to_apply']['hi']}\n\n🔗 [आधिकारिक वेबसाइट लिंक]({top.get('source_url', 'https://www.myscheme.gov.in')})"
        else:
            resp = f"🌐 **{top['title']['en']}** (Live Web Information)\n\n**Summary:** {top['tagline']['en']}\n\n**Benefits:** {top['benefits']['en']}\n\n**Eligibility:** {top['eligibility']['en']}\n\n**How to Apply:** {top['how_to_apply']['en']}\n\n🔗 [Official Portal Link]({top.get('source_url', 'https://www.myscheme.gov.in')})"
        return jsonify({
            'response': resp,
            'lang': lang,
            'intent': 'internet_scheme_info',
            'actions': ['view_schemes']
        })

    # 4. Trilingual Fallback
    if lang == 'te':
        fallback_resp = (
            "నమస్కారం రైతు మిత్రులారా! నేను భారతదేశంలోని 28 రాష్ట్రాలు మరియు కేంద్ర సహకార మంత్రిత్వ శాఖ పథకాల AI సహాయకుడిని (సహకార మిత్ర).\n\n"
            "మీరు భారతదేశంలోని ఏ రాష్ట్ర పథకం గురించైనా నన్ను అడగవచ్చు:\n"
            "1. **ఆంధ్రప్రదేశ్:** అన్నదాత సుఖీభవ ₹20,000, 100% ఉచిత పంటల బీమా, 0% సున్నా వడ్డీ\n"
            "2. **తెలంగాణ:** రైతు భరోసా ₹15,000/ఎకరా, రైతు బీమా ₹5 లక్షలు\n"
            "3. **కర్ణాటక, మహారాష్ట్ర, గుజరాత్, యూపీ, ఒడిశా, బెంగాల్, రాజస్థాన్, బీహార్, అస్సాం మొదలైన 28 రాష్ట్రాలు**\n"
            "4. **కేంద్ర పథకాలు:** పిఎసిఎస్ కంప్యూటరీకరణ, గోదాముల పథకం, PMFBY, డైరీ సహకార్\n"
            "5. **సహకార స్పందన:** సమస్యలపై అధికారిక ఫిర్యాదు నమోదు"
        )
    elif lang == 'hi':
        fallback_resp = (
            "नमस्ते किसान साथियों! मैं सहकार मित्र - भारत के सभी 28 राज्यों एवं केंद्रीय सहकारिता मंत्रालय की योजनाओं का एआई सहायक हूँ।\n\n"
            "आप मुझसे किसी भी राज्य की योजना के बारे में पूछ सकते हैं:\n"
            "1. **आंध्र प्रदेश:** अन्नदाता सुखीभव ₹20,000, मुफ्त फसल बीमा, 0% ब्याज ऋण\n"
            "2. **तेलंगाना:** रायथू भरोसा ₹15,000/एकड़, रायथू बीमा ₹5 लाख\n"
            "3. **महाराष्ट्र, कर्नाटक, गुजरात, उत्तर प्रदेश, राजस्थान, बिहार, पश्चिम बंगाल, ओडिशा सहित सभी 28 राज्य**\n"
            "4. **केंद्रीय योजनाएं:** पैक्स डिजिटलीकरण, अन्न भंडारण गोदाम, पीएमएफबीवाई, डेयरी सहकार\n"
            "5. **शिकायत निवारण:** पैक्स एवं सहकारिता संबंधी शिकायत दर्ज करें"
        )
    else:
        fallback_resp = (
            "Hello! I am **Sahakara Mitra AI** - your intelligent assistant for Cooperative Governance, Agricultural Welfare Schemes across all **28 States of India** and the Ministry of Cooperation.\n\n"
            "You can ask me about:\n"
            "1. **Andhra Pradesh:** Annadata Sukhibhava ₹20,000, Free Crop Insurance, 0% Vaddi Leni Runalu\n"
            "2. **Telangana:** Rythu Bharosa ₹15,000/acre, Rythu Bima ₹5 Lakh\n"
            "3. **All 28 Indian States:** Karnataka, Maharashtra, Gujarat, UP, Rajasthan, Bihar, Bengal, Odisha, Assam, etc.\n"
            "4. **Central MoC Initiatives:** PACS Cloud ERP Computerization, Decentralized Grain Storage Godowns, PMFBY, Dairy Sahakar\n"
            "5. **Grievance Redressal:** Lodge official complaints directly to District Cooperative Officers"
        )
        
    return jsonify({
        'response': fallback_resp,
        'lang': lang,
        'intent': 'general_guidance',
        'actions': ['quick_options']
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f'Starting Sahakara Mitra 28-States Portal on http://127.0.0.1:{port}')
    app.run(host='0.0.0.0', port=port, debug=False)