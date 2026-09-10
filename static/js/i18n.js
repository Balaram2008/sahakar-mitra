// Sahakara Mitra - Multilingual Dictionary (Telugu, Hindi, English)

const translations = {
  en: {
    portal_title: "Multilingual Cooperative Governance & Legal Assistance Chatbot",
    portal_sub: "Government of Andhra Pradesh & Ministry of Cooperation • AI Voice & Legal Guidance Portal",
    tagline: "Empowering AP Farmers & Cooperative Members with AI Voice Guidance & Legal Literacy",
    dept_name: "Dept. of Cooperation & Agriculture, Govt. of Andhra Pradesh",
    kiosk_mode_btn: "Village Touch Kiosk",
    exit_kiosk_btn: "Exit Kiosk Mode",
    active_lang: "English",
    
    cm_title: "Hon'ble CM Sri N. Chandrababu Naidu",
    cm_sub: "Government of Andhra Pradesh",
    pm_title: "Hon'ble PM Sri Narendra Modi",
    pm_sub: "Government of India (Ministry of Cooperation)",
    ap_schemes_heading_lead: "Andhra Pradesh State Schemes",
    central_schemes_heading_lead: "Central & Ministry of Cooperation Schemes",

    tab_chat: "AI Voice Chatbot",
    tab_schemes: "Govt Schemes & Eligibility",
    tab_laws: "Cooperative Laws & Rights",
    tab_insurance: "Crop Insurance (PMFBY)",
    tab_finance: "KCC & 0% Loans",
    tab_grievance: "Grievance Portal (Spandana)",

    stat_pacs_count: "2,050+ PACS",
    stat_pacs_label: "Computerized Societies in AP",
    stat_farmers_count: "50+ Lakh",
    stat_farmers_label: "Farmers Registered in e-Crop",
    stat_interest_rate: "0% Interest",
    stat_interest_label: "Vaddi Leni Runalu (Sunna Vaddi)",
    stat_insurance_fee: "₹0 Premium",
    stat_insurance_label: "100% Free AP Crop Insurance",

    chat_header_title: "Sahakara Legal & Governance AI Assistant",
    chat_header_status: "Online • Ready for Voice & Text (తెలుగు / हिन्दी / English)",
    chat_welcome_msg: "Namaskaram! I am your **Multilingual Cooperative Governance & Legal Assistance Chatbot**. Ask me in **Telugu**, **Hindi**, or **English** about AP Cooperative Laws, PACS 0% Loans, Annadata Sukhibhava / Rythu Bharosa, Free Crop Insurance, or submit a Grievance to the District Cooperative Officer. Speak or type below!",
    chat_placeholder: "Ask in Telugu, Hindi or English about PACS loans, Annadata Sukhibhava, laws...",
    chat_send_btn: "Send",
    chat_voice_start: "Tap to Speak",
    chat_voice_listening: "Listening in your language... Speak now",
    chat_clear: "Clear Chat",
    chat_read_aloud: "Speak Out",
    chat_stop_speech: "Stop Voice",
    chat_speak_status_playing: "Speaking out answer...",

    chip_annadata: "🌾 Annadata Sukhibhava ₹20,000 dates & benefits",
    chip_pacs_loan: "💰 How to get 0% PACS Crop Loan (Sunna Vaddi)?",
    chip_crop_insurance: "🛡️ AP Free Crop Insurance claim process (e-Crop)",
    chip_election_rules: "⚖️ Cooperative election rules & voting rights",
    chip_pacs_modi: "🇮🇳 PACS Computerization & Village Godowns Plan",
    chip_grievance: "📢 File official complaint against PACS / Secretary",

    schemes_heading: "Government Welfare & Cooperative Development Schemes",
    schemes_subheading: "Flagship initiatives by Hon'ble CM Sri N. Chandrababu Naidu & Hon'ble PM Sri Narendra Modi",
    filter_all: "All Schemes",
    filter_ap: "AP State Schemes (CM Chandrababu Naidu)",
    filter_central: "Central / MoC Schemes (PM Modi)",
    search_schemes_placeholder: "Search schemes by keyword or topic (e.g. Drip Irrigation, Solar Pump, Soil Health, Drone)...",
    btn_internet_search: "🌐 Live Internet Search",
    search_summary_both: "Search Results for \"{q}\": {local} Local Schemes + 🌐 {internet} Live Internet Schemes",
    search_summary_internet_only: "\"{q}\" is not in the local database. Fetched 🌐 {internet} live government schemes directly from the internet!",
    search_local_heading: "🏛️ Local Database Schemes ({count})",
    search_internet_heading: "🌐 Live Schemes Fetched from Internet & National Portals ({count})",
    search_filter_all: "All Results",
    search_filter_local: "🏛️ Local Schemes",
    search_filter_internet: "🌐 Live Internet",
    search_searching_internet: "🌐 Searching the internet and national registries for more schemes matching \"{q}\"...",
    benefits_label: "Key Benefits",
    eligibility_label: "Eligibility",
    documents_label: "Required Documents",
    apply_label: "How to Apply",
    speak_scheme_btn: "🔊 Speak Out Scheme Details",

    wizard_title: "🔍 Smart Scheme Eligibility Finder",
    wizard_sub: "Answer 3 quick questions to discover all schemes you are eligible for right now",
    wiz_q1: "1. What is your landholding status in Andhra Pradesh?",
    wiz_opt_landowner: "Landowning Farmer (Pattadar Passbook)",
    wiz_opt_tenant: "Tenant Farmer / Sharecropper (CCRC Card)",
    wiz_opt_dairy: "Dairy / Livestock / Fisheries Farmer",
    wiz_q2: "2. Are you an active member of a Primary Agricultural Credit Society (PACS)?",
    wiz_opt_pacs_yes: "Yes, Active PACS Member",
    wiz_opt_pacs_no: "No, Not Yet Enrolled in PACS",
    wiz_q3: "3. What is your primary crop for this agricultural season?",
    wiz_opt_paddy: "Paddy (Kharif / Rabi)",
    wiz_opt_cotton: "Cotton / Groundnut / Pulses",
    wiz_opt_horticulture: "Chillies / Mango / Vegetables / Commercial",
    wiz_find_btn: "Check My Eligible Schemes",
    wiz_results_title: "Eligible Government Schemes For You:",

    laws_heading: "AP Cooperative Laws, By-Laws & Legal Rights",
    laws_subheading: "Know your statutory rights under APCS Act 1964 and Model PACS By-laws",
    search_laws_placeholder: "Search legal provisions (e.g., voting, election, audit, Section 51, dispute)...",
    jurisdiction_label: "Jurisdiction",
    speak_law_btn: "🔊 Speak Out Legal Provision",

    insurance_heading: "🌾 PMFBY & AP 100% Free Crop Insurance Portal",
    insurance_subheading: "Calculate Crop Insurance, State Subsidy, and 72-Hour Emergency Damage Steps",
    calc_select_crop: "Select Crop Cultivated",
    calc_crop_paddy: "Paddy (వరి / धान)",
    calc_crop_cotton: "Cotton (పత్తి / कपास)",
    calc_crop_groundnut: "Groundnut (వేరుశనగ / मूंगफली)",
    calc_crop_chillies: "Chillies (మిర్చి / मिर्च)",
    calc_crop_maize: "Maize (మొక్కజొన్న / मक्का)",
    calc_crop_pulses: "Pulses (పప్పుధాన్యాలు / दालें)",
    calc_crop_sugarcane: "Sugarcane (చెరకు / गन्ना)",
    calc_crop_mango: "Mango / Horticulture (మామిడి / बागवानी)",
    calc_select_season: "Select Cropping Season",
    calc_season_kharif: "Kharif Season (ఖరీఫ్)",
    calc_season_rabi: "Rabi Season (రబీ)",
    calc_acres_label: "Cultivation Area (Acres)",
    calc_btn: "Calculate Insurance Coverage",
    calc_result_sum_insured: "Total Crop Sum Insured",
    calc_result_standard_premium: "Standard PMFBY Farmer Premium",
    calc_result_ap_payable: "Payable by AP Farmer (e-Crop)",
    calc_result_savings: "Farmer 100% Premium Savings",
    calc_result_state_sub: "AP State & Central Subsidy Borne",
    insurance_flow_title: "📋 72-Hour Crop Loss Claim Intimation Steps",
    flow_step1: "1. Calamity Occurs (Flood, Cyclone, Drought, Pest)",
    flow_step1_sub: "Inform Village Agriculture Assistant (VAA) at RSK within 72 hours.",
    flow_step2: "2. e-Crop Booking Verification",
    flow_step2_sub: "RSK verifies your digital survey number and crop status.",
    flow_step3: "3. Joint Survey & Crop Cutting Experiment (CCE)",
    flow_step3_sub: "Insurance company and Agriculture Dept assess yield loss.",
    flow_step4: "4. Direct Benefit Transfer (DBT)",
    flow_step4_sub: "Compensation credited directly to Aadhaar-linked bank account.",

    finance_heading: "💳 Financial Literacy & PACS 0% Interest Loans",
    finance_subheading: "Empowering farmers with transparent calculations and micro-credit tools",
    kcc_loan_amount: "Crop Loan Principal (₹)",
    kcc_loan_tenure: "Repayment Duration",
    kcc_tenure_12m: "Within 12 Months (Eligible for 0% AP Sunna Vaddi)",
    kcc_tenure_18m: "18 Months (Standard DCCB Rate)",
    kcc_calc_btn: "Calculate Interest & Subsidy",
    kcc_res_base: "Base DCCB / Commercial Bank Rate (7%)",
    kcc_res_central_sub: "Central Prompt Repayment Rebate (-3%)",
    kcc_res_ap_sub: "AP Vaddi Leni Runalu Reimbursement (-4%)",
    kcc_res_effective: "Net Interest Rate Paid by Farmer",
    kcc_res_savings: "Total Farmer Savings on Loan",

    grievance_heading: "📢 Sahakara Spandana (Cooperative Grievance Redressal)",
    grievance_subheading: "Direct Cooperative Complaint Registration & Live Status Tracking",
    grv_form_title: "Lodge a Cooperative Grievance",
    grv_name: "Farmer / Member Full Name",
    grv_phone: "10-digit Mobile Number",
    grv_district: "Select District",
    grv_mandal: "Mandal Name",
    grv_pacs: "PACS Society / RSK Village Name",
    grv_category: "Grievance Category",
    grv_cat_loan: "PACS Crop Loan Disbursal Delay / Rejection",
    grv_cat_fertilizer: "Fertilizer / Seed Stock Shortage or Overpricing",
    grv_cat_insurance: "Crop Insurance / PMFBY Claim Pending",
    grv_cat_membership: "Refusal of PACS Membership / Rights Denial",
    grv_cat_election: "Irregularity in Society Election / Committee Mismanagement",
    grv_desc: "Detailed Description of Issue (Type or Speak)",
    grv_voice_input: "🎙️ Voice Input in Telugu / Hindi / English",
    grv_submit_btn: "Submit Grievance to DCO",
    grv_track_title: "🔍 Track Existing Grievance Ticket",
    grv_ticket_placeholder: "Enter Ticket ID (e.g. AP-GRV-2026-1042)",
    grv_track_btn: "Track Status",

    kiosk_welcome: "Rythu Seva Cooperative Kiosk",
    kiosk_instructions: "Touch any service card below or press the big green button to speak in Telugu, Hindi or English.",
    kiosk_btn_speak: "🎙️ Touch & Speak Out in Telugu / English / Hindi",
    kiosk_print_token: "🖨️ Print Service Receipt Slip",
    kiosk_card_loan: "0% PACS Crop Loan",
    kiosk_card_schemes: "Annadata Schemes",
    kiosk_card_insurance: "Free Crop Insurance",
    kiosk_card_spandana: "Lodge Grievance",
    kiosk_card_laws: "Legal Rights",
    kiosk_card_storage: "Village Godowns",
    ticker_live_badge: "Live Updates",
    fab_tooltip: "🎙️ AI Voice Assistant (Speak)",
    live_ticker_content: "🌾 Annadata Sukhibhava 2026 fund release started • 💰 PACS 0% Interest Crop Loan limit enhanced up to ₹3,00,000 • 🛡️ 100% Free Crop Insurance for all farmers registered in e-Crop • 🇮🇳 Welfare schemes for all 28 Indian States now available • 📞 72-Hour Calamity Emergency Helpline: 1070 / 1800-425-4440 • ⚖️ Statutory voting and audit rights for all PACS members"
  },

  te: {
    portal_title: "బహుభాషా సహకార పాలన & చట్టపరమైన సహాయక ఏఐ చాట్‌బాట్",
    portal_sub: "ఆంధ్రప్రదేశ్ ప్రభుత్వం & కేంద్ర సహకార మంత్రిత్వ శాఖ • ఏఐ వాయిస్ & చట్టపరమైన సేవల వేదిక",
    tagline: "ఏఐ వాయిస్ మార్గదర్శకత్వంతో ఆంధ్రప్రదేశ్ రైతులు మరియు సహకార సంఘ సభ్యుల సాధికారత",
    dept_name: "సహకార & వ్యవసాయ శాఖ, ఆంధ్రప్రదేశ్ ప్రభుత్వం",
    kiosk_mode_btn: "గ్రామ కియోస్క్ మోడ్",
    exit_kiosk_btn: "సాధారణ మోడ్‌కి మారండి",
    active_lang: "తెలుగు",

    cm_title: "గౌరవ ముఖ్యమంత్రి శ్రీ నారా చంద్రబాబు నాయుడు",
    cm_sub: "ఆంధ్రప్రదేశ్ ప్రభుత్వం",
    pm_title: "గౌరవ ప్రధాన మంత్రి శ్రీ నరేంద్ర మోదీ",
    pm_sub: "భారత ప్రభుత్వం (కేంద్ర సహకార మంత్రిత్వ శాఖ)",
    ap_schemes_heading_lead: "ఆంధ్రప్రదేశ్ రాష్ట్ర ప్రభుత్వ పథకాలు",
    central_schemes_heading_lead: "కేంద్ర & సహకార మంత్రిత్వ శాఖ పథకాలు",

    tab_chat: "ఏఐ వాయిస్ చాట్‌బాట్",
    tab_schemes: "పథకాలు & అర్హత",
    tab_laws: "సహకార చట్టాలు & హక్కులు",
    tab_insurance: "పంటల బీమా (PMFBY)",
    tab_finance: "కేసీసీ & 0% రుణాలు",
    tab_grievance: "సహకార స్పందన (ఫిర్యాదులు)",

    stat_pacs_count: "2,050+ పిఎసిఎస్",
    stat_pacs_label: "కంప్యూటరీకరణ అయిన సంఘాలు",
    stat_farmers_count: "50+ లక్షల మంది",
    stat_farmers_label: "ఇ-పంటలో నమోదైన రైతులు",
    stat_interest_rate: "0% వడ్డీ",
    stat_interest_label: "వడ్డీ లేని రుణాలు (సున్నా వడ్డీ)",
    stat_insurance_fee: "₹0 ప్రీమియం",
    stat_insurance_label: "100% ఉచిత పంటల బీమా",

    chat_header_title: "సహకార పాలన & చట్టపరమైన ఏఐ సహాయకుడు",
    chat_header_status: "ఆన్‌లైన్ • వాయిస్ & టెక్స్ట్ సిద్ధంగా ఉంది (తెలుగు / हिन्दी / English)",
    chat_welcome_msg: "నమస్కారం రైతు మిత్రులారా! నేను మీ **బహుభాషా సహకార పాలన & చట్టపరమైన సహాయక ఏఐ చాట్‌బాట్**ని. పిఎసిఎస్ 0% పంట రుణాలు, అన్నదాత సుఖీభవ / రైతు భరోసా, 100% ఉచిత పంటల బీమా, సహకార చట్టం 1964 నిబంధనలు లేదా స్పందన ఫిర్యాదుల గురించి **తెలుగులో మాట్లాడండి లేదా టైప్ చేయండి**!",
    chat_placeholder: "పిఎసిఎస్ రుణాలు, అన్నదాత సుఖీభవ, ఉచిత పంట బీమా, చట్టాల గురించి అడగండి...",
    chat_send_btn: "పంపండి",
    chat_voice_start: "మాట్లాడటానికి నొక్కండి",
    chat_voice_listening: "మీ భాషలో వింటున్నాను... స్పష్టంగా మాట్లాడండి",
    chat_clear: "చాట్ క్లియర్",
    chat_read_aloud: "వాయిస్ వినండి",
    chat_stop_speech: "వాయిస్ ఆపు",
    chat_speak_status_playing: "సమాధానాన్ని చదివి వినిపిస్తోంది...",

    chip_annadata: "🌾 అన్నదాత సుఖీభవ ₹20,000 విడతల వివరాలు",
    chip_pacs_loan: "💰 0% సున్నా వడ్డీ పిఎసిఎస్ పంట రుణం ఎలా పొందాలి?",
    chip_crop_insurance: "🛡️ ఏపీ 100% ఉచిత పంటల బీమా క్లెయిమ్ విధానం",
    chip_election_rules: "⚖️ సహకార సంఘం ఎన్నికల నిబంధనలు & ఓటు హక్కు",
    chip_pacs_modi: "🇮🇳 పిఎసిఎస్ కంప్యూటరీకరణ & గోదాముల పథకం",
    chip_grievance: "📢 పిఎసిఎస్ / కార్యదర్శిపై అధికారిక ఫిర్యాదు నమోదు",

    schemes_heading: "ప్రభుత్వ సంక్షేమ & సహకార అభివృద్ధి పథకాలు",
    schemes_subheading: "గౌరవ ముఖ్యమంత్రి శ్రీ నారా చంద్రబాబు నాయుడు & గౌరవ ప్రధాని శ్రీ నరేంద్ర మోదీ నాయకత్వంలోని పథకాలు",
    filter_all: "అన్ని పథకాలు",
    filter_ap: "ఆంధ్రప్రదేశ్ పథకాలు (చంద్రబాబు నాయుడు గారి ప్రభుత్వం)",
    filter_central: "కేంద్ర సహకార పథకాలు (నరేంద్ర మోదీ గారి ప్రభుత్వం)",
    search_schemes_placeholder: "పథకం పేరు లేదా అంశంతో శోధించండి (ఉదా: డ్రిప్ సేద్యం, సోలార్ పంపులు, భూసార పరీక్ష, డ్రోన్)...",
    btn_internet_search: "🌐 ఇంటర్నెట్ నుండి లైవ్ శోధన",
    search_summary_both: "\"{q}\" శోధన ఫలితాలు: {local} స్థానిక పథకాలు + 🌐 {internet} ఇంటర్నెట్ ప్రత్యక్ష పథకాలు",
    search_summary_internet_only: "\"{q}\" స్థానిక జాబితాలో లేదు. ఇంటర్నెట్ & జాతీయ పోర్టల్స్ నుండి 🌐 {internet} ప్రత్యక్ష పథకాలు విజయవంతంగా పొందబడ్డాయి!",
    search_local_heading: "🏛️ స్థానిక డేటాబేస్ పథకాలు ({count})",
    search_internet_heading: "🌐 ఇంటర్నెట్ & జాతీయ పోర్టల్స్ నుండి సేకరించిన ప్రత్యక్ష పథకాలు ({count})",
    search_filter_all: "అన్ని ఫలితాలు",
    search_filter_local: "🏛️ స్థానిక పథకాలు",
    search_filter_internet: "🌐 ఇంటర్నెట్ ప్రత్యక్షం",
    search_searching_internet: "🌐 \"{q}\" కోసం ఇంటర్నెట్ మరియు జాతీయ పోర్టల్స్ లో అదనపు పథకాలు శోధిస్తున్నాము...",
    benefits_label: "ప్రధాన ప్రయోజనాలు",
    eligibility_label: "అర్హత నిబంధనలు",
    documents_label: "కావలసిన పత్రాలు",
    apply_label: "దరఖాస్తు విధానం",
    speak_scheme_btn: "🔊 పథకం వివరాలను వినండి",

    wizard_title: "🔍 స్మార్ట్ పథక అర్హత తనిఖీ (విజార్డ్)",
    wizard_sub: "మీరు దరఖాస్తు చేసుకోదగిన పథకాలను తక్షణమే తెలుసుకోవడానికి 3 ప్రశ్నలకు సమాధానం ఇవ్వండి",
    wiz_q1: "1. ఆంధ్రప్రదేశ్‌లో మీ భూమి సాగు వివరాలు ఏమిటి?",
    wiz_opt_landowner: "సొంత భూమి గల రైతు (పట్టాదారు పాస్ పుస్తకం)",
    wiz_opt_tenant: "కౌలు రైతు / భాగస్వామి (CCRC కార్డుదారు)",
    wiz_opt_dairy: "పాడి రైతు / పశుపోషణ / మత్స్యకారుడు",
    wiz_q2: "2. మీరు ప్రాథమిక వ్యవసాయ సహకార పరపతి సంఘంలో (PACS) సభ్యులా?",
    wiz_opt_pacs_yes: "అవును, క్రియాశీలక పిఎసిఎస్ సభ్యుడిని",
    wiz_opt_pacs_no: "కాదు, ఇంకా పిఎసిఎస్‌లో నమోదు కాలేదు",
    wiz_q3: "3. ఈ వ్యవసాయ కాలంలో మీరు సాగు చేస్తున్న ప్రధాన పంట ఏది?",
    wiz_opt_paddy: "వరి (ఖరీఫ్ / రబీ పంట)",
    wiz_opt_cotton: "పత్తి / వేరుశనగ / పప్పుదినుసులు",
    wiz_opt_horticulture: "మిర్చి / మామిడి / కూరగాయలు / వాణిజ్య పంటలు",
    wiz_find_btn: "నాకు వర్తించే పథకాలు చూడండి",
    wiz_results_title: "మీకు వర్తించే ప్రభుత్వ పథకాలు:",

    laws_heading: "ఆంధ్రప్రదేశ్ సహకార చట్టాలు & రైతుల హక్కులు",
    laws_subheading: "APCS చట్టం 1964 మరియు పిఎసిఎస్ మోడల్ బై-లాస్ క్రింద మీ చట్టబద్ధమైన హక్కులు",
    search_laws_placeholder: "చట్ట నిబంధనలను శోధించండి (ఉదా: ఓటు హక్కు, ఎన్నికలు, ఆడిట్, సెక్షన్ 51)...",
    jurisdiction_label: "వర్తించే పరిధి",
    speak_law_btn: "🔊 చట్టపరమైన వివరణ వినండి",

    insurance_heading: "🌾 100% ఉచిత పంటల బీమా & పీఎంఎఫ్‌బీవై క్యాలిక్యులేటర్",
    insurance_subheading: "పంటల బీమా మొత్తం, ప్రభుత్వ సబ్సిడీ మరియు 72 గంటల నష్ట పరిహార మార్గదర్శకాలు",
    calc_select_crop: "సాగు చేసిన పంటను ఎంచుకోండి",
    calc_crop_paddy: "వరి (Paddy)",
    calc_crop_cotton: "పత్తి (Cotton)",
    calc_crop_groundnut: "వేరుశనగ (Groundnut)",
    calc_crop_chillies: "మిర్చి (Chillies)",
    calc_crop_maize: "మొక్కజొన్న (Maize)",
    calc_crop_pulses: "పప్పుధాన్యాలు (Pulses)",
    calc_crop_sugarcane: "చెరకు (Sugarcane)",
    calc_crop_mango: "మామిడి / ఉద్యానవన పంటలు (Mango)",
    calc_select_season: "పంట కాలాన్ని ఎంచుకోండి",
    calc_season_kharif: "ఖరీఫ్ కాలం (Kharif)",
    calc_season_rabi: "రబీ కాలం (Rabi)",
    calc_acres_label: "సాగు విస్తీర్ణం (ఎకరాల్లో)",
    calc_btn: "బీమా రక్షణను లెక్కించండి",
    calc_result_sum_insured: "మొత్తం పంట బీమా విలువ",
    calc_result_standard_premium: "సాధారణ PMFBY రైతు ప్రీమియం",
    calc_result_ap_payable: "ఏపీ రైతు చెల్లించాల్సింది (ఇ-పంట)",
    calc_result_savings: "రైతుకు 100% ఉచిత ప్రీమియం ఆదా",
    calc_result_state_sub: "ప్రభుత్వాలు భరించే పూర్తి సబ్సిడీ",
    insurance_flow_title: "📋 72 గంటల్లో పంట నష్ట క్లెయిమ్ ప్రక్రియ",
    flow_step1: "1. పంట నష్టం సంభవించడం (వరదలు, తుఫాను, తెగుళ్లు)",
    flow_step1_sub: "72 గంటల్లోపు ఆర్బీకేలో గ్రామ వ్యవసాయ సహాయకుడికి (VAA) సమాచారం ఇవ్వాలి.",
    flow_step2: "2. ఇ-పంట (e-Crop) బుకింగ్ ధృవీకరణ",
    flow_step2_sub: "ఆర్బీకే అధికారులు డిజిటల్ సర్వే నంబర్ మరియు పంట స్థితిని తనిఖీ చేస్తారు.",
    flow_step3: "3. సంయుక్త సర్వే & పంట కోత ప్రయోగాలు (CCE)",
    flow_step3_sub: "బీమా కంపెనీ మరియు వ్యవసాయ శాఖ అధికారులు క్షేత్రస్థాయిలో నష్టాన్ని అంచనా వేస్తారు.",
    flow_step4: "4. నేరుగా బ్యాంకు ఖాతాలో పరిహారం జమ (DBT)",
    flow_step4_sub: "పరిహారం మొత్తం ఆధార్ అనుసంధానమైన రైతు బ్యాంకు ఖాతాలో జమవుతుంది.",

    finance_heading: "💳 ఆర్థిక అక్షరాస్యత & పిఎసిఎస్ సున్నా వడ్డీ రుణాలు",
    finance_subheading: "పారదర్శక రుణ లెక్కింపు మరియు ప్రభుత్వ రాయితీలతో రైతులకు సాధికారత",
    kcc_loan_amount: "పంట రుణం మొత్తం (₹)",
    kcc_loan_tenure: "తిరిగి చెల్లించే వ్యవధి",
    kcc_tenure_12m: "12 నెలల్లోపు (0% సున్నా వడ్డీ పథకం వర్తింపు)",
    kcc_tenure_18m: "18 నెలలు (సాధారణ బ్యాంకు రేటు)",
    kcc_calc_btn: "వడ్డీ & ఆదా లెక్కించండి",
    kcc_res_base: "ప్రాథమిక బ్యాంకు వడ్డీ రేటు (7%)",
    kcc_res_central_sub: "కేంద్ర సకాల చెల్లింపు రాయితీ (-3%)",
    kcc_res_ap_sub: "ఏపీ వడ్డీ లేని రుణాల పూర్తి రీయింబర్స్‌మెంట్ (-4%)",
    kcc_res_effective: "రైతు వాస్తవంగా చెల్లించాల్సిన నికర వడ్డీ",
    kcc_res_savings: "ఈ రుణంపై రైతుకు లభించే మొత్తం ఆదా",

    grievance_heading: "📢 సహకార స్పందన (ఫిర్యాదుల విభాగం)",
    grievance_subheading: "సహకార సమస్యలపై నేరుగా ఫిర్యాదు నమోదు & లైవ్ స్టేటస్ ట్రాకింగ్",
    grv_form_title: "సహకార సంఘంపై ఫిర్యాదు నమోదు చేయండి",
    grv_name: "రైతు / సభ్యుని పూర్తి పేరు",
    grv_phone: "10 అంకెల మొబైల్ నంబర్",
    grv_district: "జిల్లాను ఎంచుకోండి",
    grv_mandal: "మండలం పేరు",
    grv_pacs: "పిఎసిఎస్ సంఘం / ఆర్బీకే గ్రామం పేరు",
    grv_category: "ఫిర్యాదు విభాగం",
    grv_cat_loan: "పిఎసిఎస్ పంట రుణం జాప్యం / తిరస్కరణ",
    grv_cat_fertilizer: "ఎరువులు, విత్తనాల కొరత లేదా అధిక ధరలు",
    grv_cat_insurance: "ఉచిత పంట బీమా క్లెయిమ్ పెండింగ్",
    grv_cat_membership: "పిఎసిఎస్ సభ్యత్వం నిరాకరణ / హక్కుల ఉల్లంఘన",
    grv_cat_election: "సంఘ ఎన్నికల అవకతవకలు / నిధుల దుర్వినియోగం",
    grv_desc: "సమస్య పూర్తి వివరణ (టైప్ చేయండి లేదా వాయిస్ ద్వారా చెప్పండి)",
    grv_voice_input: "🎙️ తెలుగులో మాట్లాడి ఫిర్యాదు నమోదు చేయండి",
    grv_submit_btn: "జిల్లా సహకార అధికారికి (DCO) పంపండి",
    grv_track_title: "🔍 మీ ఫిర్యాదు స్టేటస్ తనిఖీ చేయండి",
    grv_ticket_placeholder: "టికెట్ నంబర్ ఎంటర్ చేయండి (ఉదా: AP-GRV-2026-1042)",
    grv_track_btn: "స్టేటస్ చూడండి",

    kiosk_welcome: "రైతు సేవా సహకార కియోస్క్",
    kiosk_instructions: "క్రింది సేవలపై తాకండి లేదా పెద్ద ఆకుపచ్చ బటన్ నొక్కి తెలుగు, హిందీ లేదా ఇంగ్లీషులో మాట్లాడండి.",
    kiosk_btn_speak: "🎙️ మాట్లాడటానికి ఇక్కడ తాకండి (Telugu/English/Hindi)",
    kiosk_print_token: "🖨️ సేవా రసీదు స్లిప్ ప్రింట్ చేయండి",
    kiosk_card_loan: "0% పంట రుణాలు",
    kiosk_card_schemes: "అన్నదాత పథకాలు",
    kiosk_card_insurance: "ఉచిత పంటల బీమా",
    kiosk_card_spandana: "సహకార స్పందన",
    kiosk_card_laws: "రైతుల హక్కులు",
    kiosk_card_storage: "గ్రామ గోదాములు",
    ticker_live_badge: "తాజా సమాచారం",
    fab_tooltip: "🎙️ ఏఐ వాయిస్ సహాయకుడు (మాట్లాడండి)",
    live_ticker_content: "🌾 అన్నదాత సుఖీభవ 2026 నిధుల విడుదల ప్రారంభం • 💰 పిఎసిఎస్ 0% వడ్డీ పంట రుణాల పరిమితి ₹3,00,000 వరకు పెంపు • 🛡️ ఈ-పంట (e-Crop) లో నమోదైన రైతులకు 100% ఉచిత పంటల బీమా వర్తింపు • 🇮🇳 భారతదేశంలోని 28 రాష్ట్రాల సంక్షేమ పథకాలు ఇప్పుడు అందుబాటులో ఉన్నాయి • 📞 పంట నష్టం అత్యవసర ఫిర్యాదుల హెల్ప్‌లైన్: 1070 / 1800-425-4440 • ⚖️ సహకార చట్టం 1964 ప్రకారం రైతులందరికీ ఓటు హక్కు కల్పన"
  },

  hi: {
    portal_title: "बहुभाषी सहकारिता शासन एवं विधिक सहायता चैटबॉट",
    portal_sub: "आंध्र प्रदेश सरकार एवं सहकारिता मंत्रालय • एआई वॉयस व विधिक सहायता पोर्टल",
    tagline: "एआई वॉयस मार्गदर्शन द्वारा आंध्र प्रदेश के किसानों एवं सहकारी सदस्यों का सशक्तिकरण",
    dept_name: "सहकारिता एवं कृषि विभाग, आंध्र प्रदेश सरकार",
    kiosk_mode_btn: "ग्राम टच कियोस्क",
    exit_kiosk_btn: "सामान्य मोड में लौटें",
    active_lang: "हिन्दी",

    cm_title: "माननीय मुख्यमंत्री श्री एन. चंद्रबाबू नायडू",
    cm_sub: "आंध्र प्रदेश सरकार",
    pm_title: "माननीय प्रधानमंत्री श्री नरेंद्र मोदी",
    pm_sub: "भारत सरकार (सहकारिता मंत्रालय)",
    ap_schemes_heading_lead: "आंध्र प्रदेश राज्य सरकार की योजनाएं",
    central_schemes_heading_lead: "केंद्रीय एवं सहकारिता मंत्रालय की योजनाएं",

    tab_chat: "एआई वॉयस चैटबॉट",
    tab_schemes: "सरकारी योजनाएं व पात्रता",
    tab_laws: "सहकारी कानून व अधिकार",
    tab_insurance: "फसल बीमा (PMFBY)",
    tab_finance: "केसीसी व 0% ऋण",
    tab_grievance: "शिकायत निवारण (स्पंदना)",

    stat_pacs_count: "2,050+ पैक्स",
    stat_pacs_label: "कंप्यूटरीकृत सहकारी समितियां",
    stat_farmers_count: "50+ लाख",
    stat_farmers_label: "ई-क्रॉप में पंजीकृत किसान",
    stat_interest_rate: "0% ब्याज दर",
    stat_interest_label: "वड्डी लेनी रुनालु (शून्य ब्याज)",
    stat_insurance_fee: "₹0 प्रीमियम",
    stat_insurance_label: "100% मुफ्त एपी फसल बीमा",

    chat_header_title: "सहकारिता शासन एवं विधिक सहायता एआई",
    chat_header_status: "ऑनलाइन • वॉयस और टेक्स्ट के लिए तैयार (हिन्दी / తెలుగు / English)",
    chat_welcome_msg: "नमस्ते किसान साथियों! मैं आपका **बहुभाषी सहकारिता शासन एवं विधिक सहायता चैटबॉट** हूँ। पैक्स 0% ऋण, अन्नदाता सुखीभव / रायथू भरोसा, 100% मुफ्त फसल बीमा या सहकारी कानून 1964 के बारे में **हिन्दी, तेलुगु या अंग्रेज़ी में बोलें या लिखें**!",
    chat_placeholder: "पैक्स ऋण, अन्नदाता सुखीभव, मुफ्त फसल बीमा, कानूनों के बारे में पूछें...",
    chat_send_btn: "भेजें",
    chat_voice_start: "बोलने के लिए टैप करें",
    chat_voice_listening: "आपकी भाषा में सुन रहा हूँ... बोलिए",
    chat_clear: "चैट साफ करें",
    chat_read_aloud: "आवाज़ सुनें",
    chat_stop_speech: "आवाज़ रोकें",
    chat_speak_status_playing: "उत्तर पढ़कर सुनाया जा रहा है...",

    chip_annadata: "🌾 अन्नदाता सुखीभव ₹20,000 किस्त विवरण",
    chip_pacs_loan: "💰 0% ब्याज पर पैक्स फसल ऋण कैसे लें?",
    chip_crop_insurance: "🛡️ मुफ्त फसल बीमा क्लेम प्रक्रिया (ई-क्रॉप)",
    chip_election_rules: "⚖️ सहकारी चुनाव और मतदान के अधिकार",
    chip_pacs_modi: "🇮🇳 पैक्स डिजिटलीकरण एवं अन्न भंडारण योजना",
    chip_grievance: "📢 पैक्स सचिव या समिति के विरुद्ध शिकायत दर्ज करें",

    schemes_heading: "सरकारी कल्याणकारी एवं सहकारी विकास योजनाएं",
    schemes_subheading: "माननीय मुख्यमंत्री श्री एन. चंद्रबाबू नायडू एवं माननीय प्रधानमंत्री श्री नरेंद्र मोदी के नेतृत्व में प्रमुख योजनाएं",
    filter_all: "सभी योजनाएं",
    filter_ap: "आंध्र प्रदेश योजनाएं (चंद्रबाबू नायडू सरकार)",
    filter_central: "केंद्रीय सहकारिता योजनाएं (नरेंद्र मोदी सरकार)",
    search_schemes_placeholder: "योजना का नाम या विषय खोजें (उदा. ड्रिप सिंचाई, सोलर पंप, मिट्टी जांच, ड्रोन)...",
    btn_internet_search: "🌐 इंटरनेट से लाइव खोजें",
    search_summary_both: "\"{q}\" के खोज परिणाम: {local} स्थानीय योजनाएं + 🌐 {internet} इंटरनेट लाइव योजनाएं",
    search_summary_internet_only: "\"{q}\" स्थानीय सूची में उपलब्ध नहीं है। इंटरनेट से 🌐 {internet} लाइव सरकारी योजनाएं सफलतापूर्वक प्राप्त हुईं!",
    search_local_heading: "🏛️ स्थानीय डेटाबेस योजनाएं ({count})",
    search_internet_heading: "🌐 इंटरनेट एवं राष्ट्रीय पोर्टल्स से प्राप्त लाइव योजनाएं ({count})",
    search_filter_all: "सभी परिणाम",
    search_filter_local: "🏛️ स्थानीय योजनाएं",
    search_filter_internet: "🌐 इंटरनेट लाइव",
    search_searching_internet: "🌐 \"{q}\" हेतु इंटरनेट एवं राष्ट्रीय पोर्टल्स पर अतिरिक्त योजनाएं खोजी जा रही हैं...",
    benefits_label: "मुख्य लाभ",
    eligibility_label: "पात्रता",
    documents_label: "आवश्यक दस्तावेज",
    apply_label: "आवेदन कैसे करें",
    speak_scheme_btn: "🔊 योजना का विवरण सुनें",

    wizard_title: "🔍 स्मार्ट योजना पात्रता खोजक",
    wizard_sub: "अपने लिए उपयुक्त योजनाओं को जानने के लिए 3 आसान प्रश्नों के उत्तर दें",
    wiz_q1: "1. आंध्र प्रदेश में आपकी भूमि स्वामित्व की स्थिति क्या है?",
    wiz_opt_landowner: "भूमि स्वामी किसान (पट्टादार पासबुक)",
    wiz_opt_tenant: "बटाईदार किसान (सीसीआरसी कार्ड)",
    wiz_opt_dairy: "दुग्ध उत्पादक / पशुपालक / मत्स्य पालक",
    wiz_q2: "2. क्या आप प्राथमिक कृषि ऋण समिति (PACS) के सदस्य हैं?",
    wiz_opt_pacs_yes: "हाँ, सक्रिय पैक्स सदस्य",
    wiz_opt_pacs_no: "नहीं, अभी तक सदस्य नहीं हैं",
    wiz_q3: "3. इस सीजन में आपकी मुख्य फसल कौन सी है?",
    wiz_opt_paddy: "धान (खरीफ / रबी)",
    wiz_opt_cotton: "कपास / मूंगफली / दालें",
    wiz_opt_horticulture: "मिर्च / आम / सब्जियां / वाणिज्यिक फसलें",
    wiz_find_btn: "पात्र योजनाएं खोजें",
    wiz_results_title: "आपके लिए पात्र सरकारी योजनाएं:",

    laws_heading: "आंध्र प्रदेश सहकारी कानून एवं किसानों के अधिकार",
    laws_subheading: "APCS Act 1964 और मॉडल पैक्स उप-नियमों के तहत अपने वैधानिक अधिकार जानें",
    search_laws_placeholder: "कानूनी प्रावधान खोजें (उदा. मतदान, चुनाव, ऑडिट, धारा 51)...",
    jurisdiction_label: "क्षेत्राधिकार",
    speak_law_btn: "🔊 कानूनी प्रावधान सुनें",

    insurance_heading: "🌾 100% मुफ्त फसल बीमा एवं पीएमएफबीवाई पोर्टल",
    insurance_subheading: "बीमा राशि, सरकारी सब्सिडी और 72 घंटे में फसल क्षतिपूर्ति दावा प्रक्रिया",
    calc_select_crop: "फसल का चयन करें",
    calc_crop_paddy: "धान (Paddy)",
    calc_crop_cotton: "कपास (Cotton)",
    calc_crop_groundnut: "मूंगफली (Groundnut)",
    calc_crop_chillies: "मिर्च (Chillies)",
    calc_crop_maize: "मक्का (Maize)",
    calc_crop_pulses: "दालें (Pulses)",
    calc_crop_sugarcane: "गन्ना (Sugarcane)",
    calc_crop_mango: "आम / बागवानी (Mango)",
    calc_select_season: "फसल सीजन चुनें",
    calc_season_kharif: "खरीफ सीजन (Kharif)",
    calc_season_rabi: "रबी सीजन (Rabi)",
    calc_acres_label: "खेती का रकबा (एकड़ में)",
    calc_btn: "बीमा सुरक्षा की गणना करें",
    calc_result_sum_insured: "कुल फसल बीमा राशि",
    calc_result_standard_premium: "मानक पीएमएफबीवाई किसान प्रीमियम",
    calc_result_ap_payable: "एपी किसान द्वारा देय प्रीमियम (ई-क्रॉप)",
    calc_result_savings: "किसान की 100% प्रीमियम बचत",
    calc_result_state_sub: "सरकार द्वारा वहन की गई कुल सब्सिडी",
    insurance_flow_title: "📋 72 घंटे में फसल क्षति दावा दर्ज करने के चरण",
    flow_step1: "1. प्राकृतिक आपदा घटित होना (बाढ़, सूखा, चक्रवात)",
    flow_step1_sub: "72 घंटे के भीतर ग्राम कृषि सहायक (VAA) को सूचित करें।",
    flow_step2: "2. ई-क्रॉप बुकिंग सत्यापन",
    flow_step2_sub: "आरबीके अधिकारी डिजिटल सर्वेक्षण संख्या और फसल की जांच करते हैं।",
    flow_step3: "3. संयुक्त सर्वेक्षण एवं फसल कटाई प्रयोग",
    flow_step3_sub: "बीमा कंपनी और कृषि विभाग द्वारा नुकसान का आकलन।",
    flow_step4: "4. प्रत्यक्ष बैंक खाता अंतरण (DBT)",
    flow_step4_sub: "क्षतिपूर्ति राशि सीधे आधार लिंक बैंक खाते में जमा होती है।",

    finance_heading: "💳 वित्तीय साक्षरता एवं पैक्स 0% ब्याज ऋण",
    finance_subheading: "पारदर्शी ऋण गणना और सरकारी ब्याज छूट की जानकारी",
    kcc_loan_amount: "फसल ऋण राशि (₹)",
    kcc_loan_tenure: "ऋण चुकाने की अवधि",
    kcc_tenure_12m: "12 महीने के भीतर (0% ब्याज योजना के पात्र)",
    kcc_tenure_18m: "18 महीने (मानक बैंक ब्याज दर)",
    kcc_calc_btn: "ब्याज एवं बचत की गणना करें",
    kcc_res_base: "मूल बैंक ब्याज दर (7%)",
    kcc_res_central_sub: "केंद्र सरकार समय पर भुगतान छूट (-3%)",
    kcc_res_ap_sub: "एपी सरकार ब्याज प्रतिपूर्ति (-4%)",
    kcc_res_effective: "किसान द्वारा देय वास्तविक ब्याज दर",
    kcc_res_savings: "इस ऋण पर किसान की कुल बचत",

    grievance_heading: "📢 सहकार स्पंदना (शिकायत निवारण)",
    grievance_subheading: "सहकारी समस्याओं पर सीधी शिकायत दर्ज करें एवं लाइव स्थिति जांचें",
    grv_form_title: "सहकारी समिति के विरुद्ध शिकायत दर्ज करें",
    grv_name: "किसान / सदस्य का पूरा नाम",
    grv_phone: "10 अंकों का मोबाइल नंबर",
    grv_district: "जिले का चयन करें",
    grv_mandal: "मंडल का नाम",
    grv_pacs: "पैक्स समिति / आरबीके गांव का नाम",
    grv_category: "शिकायत की श्रेणी",
    grv_cat_loan: "पैक्स फसल ऋण वितरण में देरी या मनाही",
    grv_cat_fertilizer: "उर्वरक/बीज की कमी या अधिक कीमत",
    grv_cat_insurance: "फसल बीमा क्लेम लंबित होना",
    grv_cat_membership: "पैक्स सदस्यता से इनकार या अधिकार हनन",
    grv_cat_election: "समिति चुनाव में धांधली या वित्तीय गड़बड़ी",
    grv_desc: "समस्या का विस्तृत विवरण (टाइप करें या बोलकर बताएं)",
    grv_voice_input: "🎙️ बोलकर शिकायत दर्ज करें",
    grv_submit_btn: "जिला सहकारी अधिकारी (DCO) को भेजें",
    grv_track_title: "🔍 अपनी शिकायत की स्थिति ट्रैक करें",
    grv_ticket_placeholder: "टिकट संख्या दर्ज करें (उदा. AP-GRV-2026-1042)",
    grv_track_btn: "स्थिति देखें",

    kiosk_welcome: "रायथू सेवा सहकारी कियोस्क",
    kiosk_instructions: "नीचे दी गई सेवा पर स्पर्श करें या बोलने के लिए बड़ा हरा बटन दबाएं।",
    kiosk_btn_speak: "🎙️ बोलने के लिए यहाँ दबाएं (Telugu/Hindi/English)",
    kiosk_print_token: "🖨️ सेवा पावती पर्ची प्रिंट करें",
    kiosk_card_loan: "0% फसल ऋण",
    kiosk_card_schemes: "अन्नदाता योजनाएं",
    kiosk_card_insurance: "मुफ्त फसल बीमा",
    kiosk_card_spandana: "सहकार स्पंदना",
    kiosk_card_laws: "सदस्य अधिकार",
    kiosk_card_storage: "ग्राम गोदाम",
    ticker_live_badge: "ताज़ा जानकारी",
    fab_tooltip: "🎙️ एआई वॉयस सहायक (बोलिए)",
    live_ticker_content: "🌾 अन्नदाता सुखीभव 2026 राशि अंतरण प्रारंभ • 💰 पैक्स 0% ब्याज फसल ऋण सीमा ₹3,00,000 तक बढ़ाई गई • 🛡️ ई-क्रॉप में पंजीकृत सभी किसानों हेतु 100% मुफ्त फसल बीमा • 🇮🇳 भारत के सभी 28 राज्यों की योजनाएं उपलब्ध • 📞 72 घंटे में फसल क्षति आपातकालीन हेल्पलाइन: 1070 / 1800-425-4440 • ⚖️ सहकारी कानून 1964 के तहत प्रत्येक सदस्य को वोट का अधिकार"
  }
,
  kn: {
    portal_title: "ಬಹುಭಾಷಾ ಸಹಕಾರ ಆಡಳಿತ ಮತ್ತು ಕಾನೂನು ನೆರವು AI ಚಾಟ್‌ಬಾಟ್",
    portal_sub: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, 0% ಬಡ್ಡಿ ಸಾಲ, ಬೆಳೆ ವಿಮೆ ಮತ್ತು 28 ರಾಜ್ಯಗಳ ಸಹಕಾರ ಸೇವೆಗಳು",
    tagline: "ರೈತರು ಮತ್ತು ಸಹಕಾರ ಸಂಘಗಳ ಸದಸ್ಯರಿಗೆ AI ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ",
    tab_chat: "AI ವಾಯ್ಸ್ ಚಾಟ್‌ಬಾಟ್",
    tab_schemes: "ಯೋಜನೆಗಳು & ಅರ್ಹತೆ",
    tab_laws: "ಸಹಕಾರ ಕಾಯ್ದೆಗಳು & ಹಕ್ಕುಗಳು",
    tab_insurance: "ಬೆಳೆ ವಿಮೆ (PMFBY)",
    tab_finance: "0% ಸಾಲ & KCC",
    tab_grievance: "ದೂರು ನಿವಾರಣೆ (ಸ್ಪಂದನ)",
    select_state_title: "🏛️ ಭಾರತದ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ (28 ರಾಜ್ಯಗಳು & ಕೇಂದ್ರ ಯೋಜನೆಗಳು)",
    select_state_sub: "ನಿಮ್ಮ ರಾಜ್ಯದ ಕೃಷಿ ಕಲ್ಯಾಣ, ಸಹಕಾರ ಸಾಲ ಮತ್ತು ವಿಮಾ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಲು ರಾಜ್ಯವನ್ನು ಆರಿಸಿ:",
    stat_pacs_count: "2,050+ PACS",
    stat_pacs_label: "ಗಣಕೀಕೃತ ಸಹಕಾರ ಸಂಘಗಳು",
    stat_farmers_count: "50+ ಲಕ್ಷ",
    stat_farmers_label: "ನೋಂದಾಯಿತ ರೈತರು",
    stat_interest_rate: "0% ಬಡ್ಡಿ",
    stat_interest_label: "ಶೂನ್ಯ ಬಡ್ಡಿ ಸಾಲಗಳು",
    stat_insurance_fee: "₹0 ಪ್ರೀಮಿಯಂ",
    stat_insurance_label: "100% ಉಚಿತ ಬೆಳೆ ವಿಮೆ",
    chat_header_title: "ಸಹಕಾರ ಆಡಳಿತ & ಕಾನೂನು AI ಸಹಾಯಕ",
    chat_header_status: "ಆನ್‌ಲೈನ್ • ಧ್ವನಿ ಮತ್ತು ಪಠ್ಯ ಲಭ್ಯವಿದೆ",
    chat_welcome_msg: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ **ಸಹಕಾರ ಮಿತ್ರ AI ಸಹಾಯಕ**. PACS ಸಾಲಗಳು, ಬೆಳೆ ವಿಮೆ, ಕೃಷಿ ಯೋಜನೆಗಳು ಅಥವಾ ದೂರುಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ!",
    chat_placeholder: "PACS ಸಾಲಗಳು, ಬೆಳೆ ವಿಮೆ, ಕೃಷಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
    chat_send_btn: "ಕಳುಹಿಸಿ",
    chat_voice_start: "ಮಾತನಾಡಲು ಒತ್ತಿ",
    chat_voice_listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...",
    chat_clear: "ತೆರವುಗೊಳಿಸಿ",
    chat_read_aloud: "ಓದಿ ಹೇಳಿ",
    chat_stop_speech: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    schemes_heading: "ಸರ್ಕಾರಿ ಕೃಷಿ & ಸಹಕಾರ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು",
    schemes_subheading: "ಭಾರತದ 28 ರಾಜ್ಯಗಳು ಮತ್ತು ಕೇಂದ್ರ ಸಹಕಾರ ಸಚಿವಾಲಯದ ಯೋಜನೆಗಳು",
    filter_all: "ಎಲ್ಲಾ ಯೋಜನೆಗಳು",
    filter_ap: "ರಾಜ್ಯ ಸರ್ಕಾರದ ಯೋಜನೆಗಳು",
    filter_central: "ಕೇಂದ್ರ / MoC ಯೋಜನೆಗಳು",
    search_schemes_placeholder: "ಯೋಜನೆಯ ಹೆಸರು ಅಥವಾ ಕೀವರ್ಡ್ ಮೂಲಕ ಹುಡುಕಿ...",
    benefits_label: "ಪ್ರಯೋಜನಗಳು",
    eligibility_label: "ಅರ್ಹತೆ",
    documents_label: "ದಾಖಲೆಗಳು",
    apply_label: "ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ",
    speak_scheme_btn: "ಧ್ವನಿ ವಿವರಣೆ",
    region_all: "ಎಲ್ಲಾ ರಾಜ್ಯಗಳು",
    region_south: "ದಕ್ಷಿಣ ಭಾರತ",
    region_north: "ಉತ್ತರ ಭಾರತ",
    region_west: "ಪಶ್ಚಿಮ ಭಾರತ",
    region_east: "ಪೂರ್ವ ಭಾರತ",
    region_central: "ಮಧ್ಯ ಭಾರತ",
    region_northeast: "ಈಶಾನ್ಯ ಭಾರತ",
    state_selected_badge: "ಆಯ್ಕೆಯಾದ ರಾಜ್ಯ:",
  },
  ta: {
    portal_title: "பன்மொழி கூட்டுறவு நிர்வாகம் மற்றும் சட்ட உதவி AI சாட்போட்",
    portal_sub: "அரசு திட்டங்கள், 0% வட்டி கடன், பயிர் காப்பீடு மற்றும் 28 மாநில கூட்டுறவு சேவைகள்",
    tagline: "விவசாயிகள் மற்றும் கூட்டுறவு உறுப்பினர்களுக்கான AI குரல் வழிகாட்டுதல்",
    tab_chat: "AI குரல் சாட்போட்",
    tab_schemes: "திட்டங்கள் & தகுதி",
    tab_laws: "கூட்டுறவு சட்டங்கள்",
    tab_insurance: "பயிர் காப்பீடு (PMFBY)",
    tab_finance: "0% கடன் & KCC",
    tab_grievance: "குறைதீர்ப்பு (ஸ்பந்தனா)",
    select_state_title: "🏛️ இந்திய மாநிலத்தை தேர்வு செய்க (28 மாநிலங்கள்)",
    select_state_sub: "உங்கள் மாநிலத்தின் விவசாய மற்றும் கூட்டுறவு திட்டங்களை காண மாநிலத்தை தேர்வு செய்க:",
    stat_pacs_count: "2,050+ PACS",
    stat_pacs_label: "கணினிமயமாக்கப்பட்ட சங்கங்கள்",
    stat_farmers_count: "50+ லட்சம்",
    stat_farmers_label: "பதிவுசெய்த விவசாயிகள்",
    stat_interest_rate: "0% வட்டி",
    stat_interest_label: "வட்டி இல்லா பயிர்க்கடன்",
    stat_insurance_fee: "₹0 பிரீமியம்",
    stat_insurance_label: "100% இலவச பயிர் காப்பீடு",
    chat_header_title: "கூட்டுறவு நிர்வாக AI உதவியாளர்",
    chat_header_status: "ஆன்லைன் • குரல் & உரை தயார்",
    chat_welcome_msg: "வணக்கம்! நான் உங்கள் **சககார மித்ரா AI உதவியாளர்**. கூட்டுறவு கடன், பயிர் காப்பீடு மற்றும் அரசு திட்டங்கள் பற்றி கேளுங்கள்!",
    chat_placeholder: "பயிர்க்கடன், காப்பீடு, அரசு திட்டங்கள் பற்றி கேளுங்கள்...",
    chat_send_btn: "அனுப்புக",
    chat_voice_start: "பேச தொடங்குங்கள்",
    chat_voice_listening: "கேட்கிறேன்...",
    chat_clear: "அழி",
    chat_read_aloud: "குரலில் கேள்",
    chat_stop_speech: "நிறுத்து",
    schemes_heading: "அரசு நலத்திட்டங்கள் & கூட்டுறவு திட்டங்கள்",
    schemes_subheading: "28 மாநிலங்கள் மற்றும் மத்திய கூட்டுறவு அமைச்சக திட்டங்கள்",
    filter_all: "அனைத்து திட்டங்கள்",
    filter_ap: "மாநில திட்டங்கள்",
    filter_central: "மத்திய திட்டங்கள்",
    search_schemes_placeholder: "திட்டங்களை தேடுக...",
    benefits_label: "பயன்கள்",
    eligibility_label: "தகுதி",
    documents_label: "தேவையான ஆவணங்கள்",
    apply_label: "விண்ணப்பிப்பது எப்படி",
    speak_scheme_btn: "குரலில் கேள்",
    region_all: "அனைத்து மாநிலங்கள்",
    region_south: "தென் இந்தியா",
    region_north: "வட இந்தியா",
    region_west: "மேற்கு இந்தியா",
    region_east: "கிழக்கு இந்தியா",
    region_central: "மத்திய இந்தியா",
    region_northeast: "வடகிழக்கு இந்தியா",
    state_selected_badge: "தேர்ந்தெடுக்கப்பட்ட மாநிலம்:",
  },
  mr: {
    portal_title: "बहुभाषिक सहकार शासन आणि कायदेशीर सहाय्य एआय चॅटबॉट",
    portal_sub: "शासकीय योजना, 0% पीक कर्ज, पीक विमा आणि 28 राज्यांच्या सहकारी सेवा",
    tagline: "शेतकरी आणि सहकारी सदस्यांसाठी एआय व्हॉइस मार्गदर्शन",
    tab_chat: "एआय व्हॉइस चॅटबॉट",
    tab_schemes: "योजना व पात्रता",
    tab_laws: "सहकारी कायदे",
    tab_insurance: "पीक विमा (PMFBY)",
    tab_finance: "0% कर्ज व केसीसी",
    tab_grievance: "तक्रार निवारण (स्पंदना)",
    select_state_title: "🏛️ भारतातील राज्य निवडा (२८ राज्ये व केंद्रीय योजना)",
    select_state_sub: "आपल्या राज्याच्या कृषी कल्याण, सहकारी कर्ज व विमा योजना पाहण्यासाठी राज्य निवडा:",
    stat_pacs_count: "२,०५०+ पॅक्स",
    stat_pacs_label: "संगणकीकृत सोसायट्या",
    stat_farmers_count: "५०+ लाख",
    stat_farmers_label: "नोंदणीकृत शेतकरी",
    stat_interest_rate: "०% व्याज",
    stat_interest_label: "बिनव्याजी पीक कर्ज",
    stat_insurance_fee: "₹० प्रीमियम",
    stat_insurance_label: "१००% मोफत पीक विमा",
    chat_header_title: "सहकार शासन आणि कायदेशीर एआय सहाय्यक",
    chat_header_status: "ऑनलाइन • व्हॉइस आणि टेक्स्ट तयार",
    chat_welcome_msg: "नमस्कार! मी तुमचा **सहकार मित्र एआय सहाय्यक**. पॅक्स कर्ज, नमो शेतकरी योजना, पीक विमा किंवा तक्रारींबाबत काहीही विचारा!",
    chat_placeholder: "पॅक्स कर्ज, नमो शेतकरी योजना, पीक विमा याबद्दल विचारा...",
    chat_send_btn: "पाठवा",
    chat_voice_start: "बोलण्यासाठी स्पर्श करा",
    chat_voice_listening: "ऐकत आहे...",
    chat_clear: "साफ करा",
    chat_read_aloud: "ऐका",
    chat_stop_speech: "थांबवा",
    schemes_heading: "शासकीय कल्याणकारी व सहकारी विकास योजना",
    schemes_subheading: "भारतातील सर्व २८ राज्ये व सहकार मंत्रालयाच्या योजना",
    filter_all: "सर्व योजना",
    filter_ap: "राज्य योजना",
    filter_central: "केंद्रीय योजना",
    search_schemes_placeholder: "योजना शोधा...",
    benefits_label: "फायदे",
    eligibility_label: "पात्रता",
    documents_label: "कागदपत्रे",
    apply_label: "अर्ज कसा करावा",
    speak_scheme_btn: "आवाजात ऐका",
    region_all: "सर्व राज्ये",
    region_south: "दक्षिण भारत",
    region_north: "उत्तर भारत",
    region_west: "पश्चिम भारत",
    region_east: "पूर्व भारत",
    region_central: "मध्य भारत",
    region_northeast: "ईशान्य भारत",
    state_selected_badge: "निवडलेले राज्य:",
  },
  bn: {
    portal_title: "বহুভাষিক সমবায় শাসন ও আইনি সহায়তা এআই চ্যাটবট",
    portal_sub: "সরকারি প্রকল্প, 0% শস্য ঋণ, ফসল বীমা ও 28টি রাজ্যের সমবায় পরিষেবা",
    tagline: "কৃষক ও সমবায় সদস্যদের জন্য এআই ভয়েস সহায়তা",
    tab_chat: "এআই ভয়েস চ্যাটবট",
    tab_schemes: "প্রকল্প ও যোগ্যতা",
    tab_laws: "সমবায় আইন",
    tab_insurance: "ফসল বীমা (PMFBY)",
    tab_finance: "0% ঋণ ও কেসিসি",
    tab_grievance: "অভিযোগ প্রতিকার",
    select_state_title: "🏛️ ভারতের রাজ্য নির্বাচন করুন (২৮টি রাজ্য)",
    select_state_sub: "আপনার রাজ্যের কৃষি কল্যাণ, সমবায় ঋণ ও বীমা প্রকল্প দেখতে রাজ্য নির্বাচন করুন:",
    stat_pacs_count: "২,০৫০+ প্যাক্স",
    stat_pacs_label: "কম্পিউটারাইজড সমবায় সমিতি",
    stat_farmers_count: "৫০+ লাখ",
    stat_farmers_label: "নিবন্ধিত কৃষক",
    stat_interest_rate: "০% সুদ",
    stat_interest_label: "সুদমুক্ত শস্য ঋণ",
    stat_insurance_fee: "₹০ প্রিমিয়াম",
    stat_insurance_label: "১০০% বিনামূল্যে ফসল বীমা",
    chat_header_title: "সমবায় শাসন এআই সহকারী",
    chat_header_status: "অনলাইন • ভয়েস ও টেক্সট উপলব্ধ",
    chat_welcome_msg: "নমস্কার! আমি আপনার **সহকার মিত্র এআই সহকারী**। সমবায় ঋণ, কৃষক বন্ধু, ফসল বীমা নিয়ে প্রশ্ন করুন!",
    chat_placeholder: "ঋণ, ফসল বীমা, কৃষক বন্ধু প্রকল্প সম্পর্কে জানুন...",
    chat_send_btn: "পাঠান",
    chat_voice_start: "কথা বলুন",
    chat_voice_listening: "শুনছি...",
    chat_clear: "মুছুন",
    chat_read_aloud: "শুনুন",
    chat_stop_speech: "থামুন",
    schemes_heading: "সরকারি কৃষি ও সমবায় কল্যাণ প্রকল্প",
    schemes_subheading: "ভারতের ২৮টি রাজ্য এবং কেন্দ্রীয় সমবায় মন্ত্রকের প্রকল্প",
    filter_all: "সকল প্রকল্প",
    filter_ap: "রাজ্য প্রকল্প",
    filter_central: "কেন্দ্রীয় প্রকল্প",
    search_schemes_placeholder: "প্রকল্প অনুসন্ধান করুন...",
    benefits_label: "সুবিধা",
    eligibility_label: "যোগ্যতা",
    documents_label: "নথিপত্র",
    apply_label: "আবেদন পদ্ধতি",
    speak_scheme_btn: "ভয়েস শুনুন",
    region_all: "সকল রাজ্য",
    region_south: "দক্ষিণ ভারত",
    region_north: "উত্তর ভারত",
    region_west: "পশ্চিম ভারত",
    region_east: "পূর্ব ভারত",
    region_central: "মধ্য ভারত",
    region_northeast: "উত্তর-পূর্ব ভারত",
    state_selected_badge: "নির্বাচিত রাজ্য:",
  },
  gu: {
    portal_title: "બહુભાષી સહકારી શાસન અને કાનૂની સહાય AI ચેટબોટ",
    portal_sub: "સરકારી યોજનાઓ, 0% પાક ધિરાણ, પાક વીમો અને 28 રાજ્યોની સહકારી સેવાઓ",
    tagline: "ખેડૂતો અને સહકારી સભ્યો માટે AI વૉઇસ માર્ગદર્શન",
    tab_chat: "AI વૉઇસ ચેટબોટ",
    tab_schemes: "યોજનાઓ અને પાત્રતા",
    tab_laws: "સહકારી કાયદા",
    tab_insurance: "પાક વીમો (PMFBY)",
    tab_finance: "0% ધિરાણ અને KCC",
    tab_grievance: "ફરિયાદ નિવારણ",
    select_state_title: "🏛️ ભારતનું રાજ્ય પસંદ કરો (28 રાજ્યો)",
    select_state_sub: "તમારા રાજ્યની કૃષિ કલ્યાણ અને સહકારી યોજનાઓ જોવા માટે રાજ્ય પસંદ કરો:",
    stat_pacs_count: "2,050+ PACS",
    stat_pacs_label: "કોમ્પ્યુટરાઈઝ્ડ મંડળીઓ",
    stat_farmers_count: "50+ લાખ",
    stat_farmers_label: "નોંધાયેલા ખેડૂતો",
    stat_interest_rate: "0% વ્યાજ",
    stat_interest_label: "બિનવ્યાજી પાક ધિરાણ",
    stat_insurance_fee: "₹0 પ્રીમિયમ",
    stat_insurance_label: "100% મફત પાક વીમો",
    chat_header_title: "સહકારી શાસન AI સહાયક",
    chat_header_status: "ઓનલાઇન • વૉઇસ અને ટેક્સ્ટ ઉપલબ્ધ",
    chat_welcome_msg: "નમસ્તે! હું તમારો **સહકાર મિત્ર AI સહાયક** છું. PACS ધિરાણ, કિસાન સહાય અને સરકારી યોજનાઓ વિશે પૂછો!",
    chat_placeholder: "પાક ધિરાણ, કિસાન સહાય યોજના વિશે પૂછો...",
    chat_send_btn: "મોકલો",
    chat_voice_start: "બોલવા માટે સ્પર્શ કરો",
    chat_voice_listening: "સાંભળી રહ્યા છીએ...",
    chat_clear: "સાફ કરો",
    chat_read_aloud: "સાંભળો",
    chat_stop_speech: "બંધ કરો",
    schemes_heading: "સરકારી કૃષિ અને સહકારી વિકાસ યોજનાઓ",
    schemes_subheading: "ભારતના 28 રાજ્યો અને કેન્દ્રીય સહકાર મંત્રાલયની યોજનાઓ",
    filter_all: "તમામ યોજનાઓ",
    filter_ap: "રાજ્ય યોજનાઓ",
    filter_central: "કેન્દ્રીય યોજનાઓ",
    search_schemes_placeholder: "યોજના શોધો...",
    benefits_label: "લાભો",
    eligibility_label: "પાત્રતા",
    documents_label: "જરૂરી દસ્તાવેજો",
    apply_label: "અરજી કેવી રીતે કરવી",
    speak_scheme_btn: "અવાજમાં સાંભળો",
    region_all: "તમામ રાજ્યો",
    region_south: "દક્ષિણ ભારત",
    region_north: "ઉત્તર ભારત",
    region_west: "પશ્ચિમ ભારત",
    region_east: "પૂર્વ ભારત",
    region_central: "મધ્ય ભારત",
    region_northeast: "ઉત્તર-પૂર્વ ભારત",
    state_selected_badge: "પસંદ કરેલ રાજ્ય:",
  },
  pa: {
    portal_title: "ਬਹੁਭਾਸ਼ਾਈ ਸਹਿਕਾਰੀ ਸ਼ਾਸਨ ਅਤੇ ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ AI ਚੈਟਬੋਟ",
    portal_sub: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ, 0% ਫ਼ਸਲੀ ਕਰਜ਼ੇ, ਫ਼ਸਲ ਬੀਮਾ ਅਤੇ 28 ਰਾਜਾਂ ਦੀਆਂ ਸਹਿਕਾਰੀ ਸੇਵਾਵਾਂ",
    tagline: "ਕਿਸਾਨਾਂ ਅਤੇ ਸਹਿਕਾਰੀ ਮੈਂਬਰਾਂ ਲਈ AI ਵੌਇਸ ਮਾਰਗਦਰਸ਼ਨ",
    tab_chat: "AI ਵੌਇਸ ਚੈਟਬੋਟ",
    tab_schemes: "ਸਕੀਮਾਂ ਅਤੇ ਯੋਗਤਾ",
    tab_laws: "ਸਹਿਕਾਰੀ ਕਾਨੂੰਨ",
    tab_insurance: "ਫ਼ਸਲ ਬੀਮਾ (PMFBY)",
    tab_finance: "0% ਕਰਜ਼ੇ ਅਤੇ ਕੇਸੀਸੀ",
    tab_grievance: "ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਣ",
    select_state_title: "🏛️ ਭਾਰਤ ਦਾ ਰਾਜ ਚੁਣੋ (28 ਰਾਜ)",
    select_state_sub: "ਆਪਣੇ ਰਾਜ ਦੀਆਂ ਖੇਤੀ ਭਲਾਈ ਅਤੇ ਸਹਿਕਾਰੀ ਸਕੀਮਾਂ ਦੇਖਣ ਲਈ ਰਾਜ ਚੁਣੋ:",
    stat_pacs_count: "2,050+ PACS",
    stat_pacs_label: "ਕੰਪਿਊਟਰੀਕ੍ਰਿਤ ਸੁਸਾਇਟੀਆਂ",
    stat_farmers_count: "50+ ਲੱਖ",
    stat_farmers_label: "ਰਜਿਸਟਰਡ ਕਿਸਾਨ",
    stat_interest_rate: "0% ਵਿਆਜ",
    stat_interest_label: "ਬਿਨਾਂ ਵਿਆਜ ਫ਼ਸਲੀ ਕਰਜ਼ਾ",
    stat_insurance_fee: "₹0 ਪ੍ਰੀਮੀਅਮ",
    stat_insurance_label: "100% ਮੁਫ਼ਤ ਫ਼ਸਲ ਬੀਮਾ",
    chat_header_title: "ਸਹਿਕਾਰੀ ਸ਼ਾਸਨ AI ਸਹਾਇਕ",
    chat_header_status: "ਆਨਲਾਈਨ • ਵੌਇਸ ਅਤੇ ਟੈਕਸਟ ਤਿਆਰ",
    chat_welcome_msg: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ **ਸਹਿਕਾਰ ਮਿੱਤਰ AI ਸਹਾਇਕ** ਹਾਂ। ਸਹਿਕਾਰੀ ਕਰਜ਼ਿਆਂ ਅਤੇ ਸਕੀਮਾਂ ਬਾਰੇ ਪੁੱਛੋ!",
    chat_placeholder: "ਫ਼ਸਲੀ ਕਰਜ਼ੇ, ਮਸ਼ੀਨਰੀ ਸਬਸਿਡੀ ਬਾਰੇ ਪੁੱਛੋ...",
    chat_send_btn: "ਭੇਜੋ",
    chat_voice_start: "ਬੋਲਣ ਲਈ ਛੂਹੋ",
    chat_voice_listening: "ਸੁਣ ਰਿਹਾ ਹਾਂ...",
    chat_clear: "ਸਾਫ਼ ਕਰੋ",
    chat_read_aloud: "ਸੁਣੋ",
    chat_stop_speech: "ਰੋਕੋ",
    schemes_heading: "ਸਰਕਾਰੀ ਖੇਤੀ ਅਤੇ ਸਹਿਕਾਰੀ ਭਲਾਈ ਸਕੀਮਾਂ",
    schemes_subheading: "ਭਾਰਤ ਦੇ 28 ਰਾਜਾਂ ਅਤੇ ਕੇਂਦਰੀ ਸਹਿਕਾਰਤਾ ਮੰਤਰਾਲੇ ਦੀਆਂ ਸਕੀਮਾਂ",
    filter_all: "ਸਾਰੀਆਂ ਸਕੀਮਾਂ",
    filter_ap: "ਰਾਜ ਸਕੀਮਾਂ",
    filter_central: "ਕੇਂਦਰੀ ਸਕੀਮਾਂ",
    search_schemes_placeholder: "ਸਕੀਮਾਂ ਦੀ ਖੋਜ ਕਰੋ...",
    benefits_label: "ਲਾਭ",
    eligibility_label: "ਯੋਗਤਾ",
    documents_label: "ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼",
    apply_label: "ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇਣੀ ਹੈ",
    speak_scheme_btn: "ਆਵਾਜ਼ ਸੁਣੋ",
    region_all: "ਸਾਰੇ ਰਾਜ",
    region_south: "ਦੱਖਣੀ ਭਾਰਤ",
    region_north: "ਉੱਤਰੀ ਭਾਰਤ",
    region_west: "ਪੱਛਮੀ ਭਾਰਤ",
    region_east: "ਪੂਰਬੀ ਭਾਰਤ",
    region_central: "ਮੱਧ ਭਾਰਤ",
    region_northeast: "ਉੱਤਰ-ਪੂਰਬੀ ਭਾਰਤ",
    state_selected_badge: "ਚੁਣਿਆ ਗਿਆ ਰਾਜ:",
  },
  or: {
    portal_title: "ବହୁଭାଷୀ ସମବାୟ ଶାସନ ଓ ଆଇନଗତ ସହାୟତା AI ଚାଟବଟ୍",
    portal_sub: "ସରକାରୀ ଯୋଜନା, 0% ଫସଲ ଋଣ, ଫସଲ ବୀମା ଏବଂ 28 ରାଜ୍ୟର ସମବାୟ ସେବା",
    tagline: "କୃଷକ ଓ ସମବାୟ ସଦସ୍ୟମାନଙ୍କ ପାଇଁ AI ଭଏସ୍ ମାର୍ଗଦର୍ଶନ",
    tab_chat: "AI ଭଏସ୍ ଚାଟବଟ୍",
    tab_schemes: "ଯୋଜନା ଓ ଯୋଗ୍ୟତା",
    tab_laws: "ସମବାୟ ଆଇନ",
    tab_insurance: "ଫସଲ ବୀମା (PMFBY)",
    tab_finance: "0% ଋଣ ଓ କେସିସି",
    tab_grievance: "ଅଭିଯୋଗ ନିବାରଣ",
    select_state_title: "🏛️ ଭାରତର ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ (28 ରାଜ୍ୟ)",
    select_state_sub: "ଆପଣଙ୍କ ରାଜ୍ୟର କୃଷି କଲ୍ୟାଣ ଓ ସମବାୟ ଯୋଜନା ଦେଖିବା ପାଇଁ ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ:",
    stat_pacs_count: "2,050+ PACS",
    stat_pacs_label: "କମ୍ପ୍ୟୁଟରାଇଜ୍ଡ ସୋସାଇଟି",
    stat_farmers_count: "50+ ଲକ୍ଷ",
    stat_farmers_label: "ପଞ୍ଜୀକୃତ କୃଷକ",
    stat_interest_rate: "0% ସୁଧ",
    stat_interest_label: "ବିନା ସୁଧ ଫସଲ ଋଣ",
    stat_insurance_fee: "₹0 ପ୍ରିମିୟମ",
    stat_insurance_label: "100% ମାଗଣା ଫସଲ ବୀମା",
    chat_header_title: "ସମବାୟ ଶାସନ AI ସହାୟକ",
    chat_header_status: "ଅନଲାଇନ୍ • ଭଏସ୍ ଏବଂ ଟେକ୍ସଟ୍ ପ୍ରସ୍ତୁତ",
    chat_welcome_msg: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର **ସହକାର ମିତ୍ର AI ସହାୟକ**। କାଳିଆ ଯୋଜନା, ଫସଲ ଋଣ ଓ ବୀମା ବିଷୟରେ ପଚାରନ୍ତୁ!",
    chat_placeholder: "ଫସଲ ଋଣ, କାଳିଆ ଯୋଜନା, ବୀମା ବିଷୟରେ ପଚାରନ୍ତୁ...",
    chat_send_btn: "ପଠାନ୍ତୁ",
    chat_voice_start: "କହିବା ପାଇଁ ସ୍ପର୍ଶ କରନ୍ତୁ",
    chat_voice_listening: "ଶୁଣୁଛି...",
    chat_clear: "ସଫା କରନ୍ତୁ",
    chat_read_aloud: "ଶୁଣନ୍ତୁ",
    chat_stop_speech: "ବନ୍ଦ କରନ୍ତୁ",
    schemes_heading: "ସରକାରୀ କୃଷି ଓ ସମବାୟ କଲ୍ୟାଣ ଯୋଜନା",
    schemes_subheading: "ଭାରତର 28 ରାଜ୍ୟ ଏବଂ କେନ୍ଦ୍ରୀୟ ସମବାୟ ମନ୍ତ୍ରଣାଳୟର ଯୋଜନା",
    filter_all: "ସମସ୍ତ ଯୋଜନା",
    filter_ap: "ରାଜ୍ୟ ଯୋଜନା",
    filter_central: "କେନ୍ଦ୍ରୀୟ ଯୋଜନା",
    search_schemes_placeholder: "ଯୋଜନା ଖୋଜନ୍ତୁ...",
    benefits_label: "ଲାଭ",
    eligibility_label: "ଯୋଗ୍ୟତା",
    documents_label: "ଆବଶ୍ୟକ କାଗଜପତ୍ର",
    apply_label: "କିପରି ଆବେଦନ କରିବେ",
    speak_scheme_btn: "ସ୍ୱରରେ ଶୁଣନ୍ତୁ",
    region_all: "ସମସ୍ତ ରାଜ୍ୟ",
    region_south: "ଦକ୍ଷିଣ ଭାରତ",
    region_north: "ଉତ୍ତର ଭାରତ",
    region_west: "ପଶ୍ଚିମ ଭାରତ",
    region_east: "ପୂର୍ବ ଭାରତ",
    region_central: "ମଧ୍ୟ ଭାରତ",
    region_northeast: "ଉତ୍ତର-ପୂର୍ବ ଭାରତ",
    state_selected_badge: "ଚୟନିତ ରାଜ୍ୟ:",
  },
  ml: {
    portal_title: "ബഹുഭാഷാ സഹകരണ ഭരണവും നിയമ സഹായവും AI ചാറ്റ്ബോട്ട്",
    portal_sub: "സർക്കാർ പദ്ധതികൾ, 0% പലിശ വായ്പകൾ, വിള ഇൻഷുറൻസ് & 28 സംസ്ഥാനങ്ങളുടെ സഹകരണ സേവനങ്ങൾ",
    tagline: "കർഷകർക്കും സഹകരണ അംഗങ്ങൾക്കും AI വോയ്‌സ് മാർഗ്ഗനിർദ്ദേശം",
    tab_chat: "AI വോയ്‌സ് ചാറ്റ്ബോട്ട്",
    tab_schemes: "പദ്ധതികളും യോഗ്യതയും",
    tab_laws: "സഹകരണ നിയമങ്ങൾ",
    tab_insurance: "വിള ഇൻഷുറൻസ് (PMFBY)",
    tab_finance: "0% വായ്പ & KCC",
    tab_grievance: "പരാതി പരിഹാരം",
    select_state_title: "🏛️ ഇന്ത്യൻ സംസ്ഥാനം തിരഞ്ഞെടുക്കുക (28 സംസ്ഥാനങ്ങൾ)",
    select_state_sub: "നിങ്ങളുടെ സംസ്ഥാനത്തെ കാർഷിക സഹകരണ പദ്ധതികൾ കാണാൻ സംസ്ഥാനം തിരഞ്ഞെടുക്കുക:",
    stat_pacs_count: "2,050+ PACS",
    stat_pacs_label: "കമ്പ്യൂട്ടറൈസ്ഡ് സൊസൈറ്റികൾ",
    stat_farmers_count: "50+ ലക്ഷം",
    stat_farmers_label: "രജിസ്റ്റർ ചെയ്ത കർഷകർ",
    stat_interest_rate: "0% പലിശ",
    stat_interest_label: "പലിശരഹിത കാർഷിക വായ്പ",
    stat_insurance_fee: "₹0 പ്രീമിയം",
    stat_insurance_label: "100% സൗജന്യ വിള ഇൻഷുറൻസ്",
    chat_header_title: "സഹകരണ ഭരണ AI സഹായി",
    chat_header_status: "ഓൺലൈൻ • വോയ്‌സ് & ടെക്സ്റ്റ് ലഭ്യമാണ്",
    chat_welcome_msg: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ **സഹകാര മിത്ര AI സഹായി**. വായ്പകൾ, സുഭിക്ഷ കേരളം, ഇൻഷുറൻസ് എന്നിവയെക്കുറിച്ച് ചോദിക്കൂ!",
    chat_placeholder: "വായ്പകൾ, കാർഷിക പദ്ധതികൾ, ഇൻഷുറൻസ് എന്നിവയെക്കുറിച്ച് ചോദിക്കൂ...",
    chat_send_btn: "അയക്കുക",
    chat_voice_start: "സംസാരിക്കാൻ സ്പർശിക്കുക",
    chat_voice_listening: "കേൾക്കുന്നു...",
    chat_clear: "മായ്ക്കുക",
    chat_read_aloud: "കേൾക്കുക",
    chat_stop_speech: "നിർത്തുക",
    schemes_heading: "സർക്കാർ കാർഷിക & സഹകരണ ക്ഷേമ പദ്ധതികൾ",
    schemes_subheading: "ഇന്ത്യയിലെ 28 സംസ്ഥാനങ്ങളുടെയും കേന്ദ്ര സഹകരണ മന്ത്രാലയത്തിന്റെയും പദ്ധതികൾ",
    filter_all: "എല്ലാ പദ്ധതികളും",
    filter_ap: "സംസ്ഥാന പദ്ധതികൾ",
    filter_central: "കേന്ദ്ര പദ്ധതികൾ",
    search_schemes_placeholder: "പദ്ധതികൾ തിരയുക...",
    benefits_label: "നേട്ടങ്ങൾ",
    eligibility_label: "യോഗ്യത",
    documents_label: "രേഖകൾ",
    apply_label: "എങ്ങനെ അപേക്ഷിക്കാം",
    speak_scheme_btn: "ശബ്ദത്തിൽ കേൾക്കുക",
    region_all: "എല്ലാ സംസ്ഥാനങ്ങളും",
    region_south: "ദക്ഷിണേന്ത്യ",
    region_north: "ഉത്തരേന്ത്യ",
    region_west: "പടിഞ്ഞാറൻ ഇന്ത്യ",
    region_east: "കിഴക്കൻ ഇന്ത്യ",
    region_central: "മധ്യേന്ത്യ",
    region_northeast: "വടക്കുകിഴക്കൻ ഇന്ത്യ",
    state_selected_badge: "തിരഞ്ഞെടുത്ത സംസ്ഥാനം:",
  },
  as: {
    portal_title: "বহুভাষিক সমবায় শাসন আৰু আইনী সাহায্য AI চ্যাটবট",
    portal_sub: "চৰকাৰী আঁচনি, 0% শস্য ঋণ, শস্য বীমা আৰু 28 খন ৰাজ্যৰ সমবায় সেৱা",
    tagline: "কৃষক আৰু সমবায় সদস্যসকলৰ বাবে AI ভয়েচ সহায়",
    tab_chat: "AI ভয়েচ চ্যাটবট",
    tab_schemes: "আঁচনি আৰু যোগ্যতা",
    tab_laws: "সমবায় আইন",
    tab_insurance: "শস্য বীমা (PMFBY)",
    tab_finance: "0% ঋণ আৰু KCC",
    tab_grievance: "অভিযোগ নিবাৰণ",
    select_state_title: "🏛️ ভাৰতৰ ৰাজ্য বাছনি কৰক (২৮ খন ৰাজ্য)",
    select_state_sub: "আপোনাৰ ৰাজ্যৰ কৃষি কল্যাণ আৰু সমবায় আঁচনি চাবলৈ ৰাজ্য বাছনি কৰক:",
    stat_pacs_count: "২,০৫০+ PACS",
    stat_pacs_label: "কম্পিউটাৰাইজড সমবায় সমিতি",
    stat_farmers_count: "৫০+ লাখ",
    stat_farmers_label: "পঞ্জীয়নভুক্ত কৃষক",
    stat_interest_rate: "০% সূত",
    stat_interest_label: "সূতমুক্ত শস্য ঋণ",
    stat_insurance_fee: "₹০ প্রিমিয়াম",
    stat_insurance_label: "১০০% বিনামূলীয়া শস্য বীমা",
    chat_header_title: "সমবায় শাসন AI সহায়ক",
    chat_header_status: "অনলাইন • ভয়েচ আৰু টেক্সট উপলব্ধ",
    chat_welcome_msg: "নমস্কাৰ! মই আপোনাৰ **সহকাৰ মিত্ৰ AI সহায়ক**। সমবায় ঋণ আৰু চৰকাৰী আঁচনিৰ বিষয়ে সোধক!",
    chat_placeholder: "শস্য ঋণ, সা-সঁজুলি অনুদান আদিৰ বিষয়ে সোধক...",
    chat_send_btn: "পঠিয়াওক",
    chat_voice_start: "কথা কওক",
    chat_voice_listening: "শুনি আছোঁ...",
    chat_clear: "মচি পেলাওক",
    chat_read_aloud: "শুনক",
    chat_stop_speech: "বন্ধ কৰক",
    schemes_heading: "চৰকাৰী কৃষি আৰু সমবায় কল্যাণ আঁচনি",
    schemes_subheading: "ভাৰতৰ ২৮ খন ৰাজ্য আৰু কেন্দ্ৰীয় সমবায় মন্ত্ৰালয়ৰ আঁচনি",
    filter_all: "সকলো আঁচনি",
    filter_ap: "ৰাজ্যিক আঁচনি",
    filter_central: "কেন্দ্ৰীয় আঁচনি",
    search_schemes_placeholder: "আঁচনি সন্ধান কৰক...",
    benefits_label: "সুবিধা",
    eligibility_label: "যোগ্যতা",
    documents_label: "নথিপত্র",
    apply_label: "কেনেদৰে আবেদন কৰিব",
    speak_scheme_btn: "ভয়েচত শুনক",
    region_all: "সকলো ৰাজ্য",
    region_south: "দক্ষিণ ভাৰত",
    region_north: "উত্তৰ ভাৰਤ",
    region_west: "পশ্চিম ভাৰত",
    region_east: "পূব ভাৰত",
    region_central: "মধ্য ভাৰত",
    region_northeast: "উত্তৰ-পূব ভাৰত",
    state_selected_badge: "নিৰ্বাচিত ৰাজ্য:",
  }
};

let currentLanguage = "te";

function setLanguage(lang, announce = false) {
  if (!lang) lang = "te";
  currentLanguage = lang;
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(elem => {
    const key = elem.getAttribute("data-i18n");
    const val = getTranslation(key);
    if (val !== undefined && val !== null) {
      if (elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") {
        elem.placeholder = val;
      } else if (elem.tagName === "OPTION") {
        elem.innerText = val;
      } else {
        elem.innerHTML = val;
      }
    }
  });

  // Sync dynamic live ticker text
  const tickerElem = document.getElementById("live-ticker-text");
  if (tickerElem) {
    const tickerVal = getTranslation("live_ticker_content");
    if (tickerVal) tickerElem.textContent = tickerVal;
  }

  // Sync quick lang buttons (te, hi, en)
  document.querySelectorAll(".lang-btn").forEach(btn => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Sync more state languages dropdown
  const moreLangDropdown = document.getElementById("state-lang-dropdown");
  if (moreLangDropdown) {
    if (["te", "hi", "en"].includes(lang)) {
      moreLangDropdown.value = "";
    } else {
      moreLangDropdown.value = lang;
    }
  }

  // Update voice engine language
  try {
    if (typeof voiceEngine !== "undefined" && voiceEngine && voiceEngine.recognition) {
      voiceEngine.recognition.lang = voiceEngine.getLangCode(lang);
    }
  } catch (e) {
    console.warn("Voice engine recognition lang update error:", e);
  }

  // Dispatch languageChanged event
  window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: lang } }));

  // Spoken confirmation
  if (announce) {
    const confirmations = {
      te: "తెలుగు భాష ఎంపిక చేయబడింది.",
      hi: "हिन्दी भाषा चुनी गई है।",
      en: "English language selected.",
      kn: "ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ.",
      ta: "தமிழ் மொழி தேர்ந்தெடுக்கப்பட்டது.",
      mr: "मराठी भाषा निवडली गेली आहे.",
      bn: "বাংলা ভাষা নির্বাচিত হয়েছে।",
      gu: "ગુજરાતી ભાષા પસંદ કરવામાં આવી છે.",
      pa: "ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਚੁਣੀ ਗਈ ਹੈ।",
      or: "ଓଡ଼ିଆ ଭାଷା ଚୟନ କରାଗଲା।",
      ml: "മലയാളം ഭാഷ തിരഞ്ഞെടുത്തു.",
      as: "অসমীয়া ভাষা বাছনি কৰা হ'ল।"
    };
    try {
      if (typeof voiceEngine !== "undefined" && voiceEngine && typeof voiceEngine.speak === "function") {
        voiceEngine.speak(confirmations[lang] || confirmations["en"], "Language Changed", lang);
      }
    } catch (e) {
      console.warn("Audio announcement catch:", e);
    }
  }
}

function getTranslation(key) {
  if (translations[currentLanguage] && translations[currentLanguage][key]) {
    return translations[currentLanguage][key];
  }
  if (translations["te"] && translations["te"][key]) {
    return translations["te"][key];
  }
  if (translations["hi"] && translations["hi"][key]) {
    return translations["hi"][key];
  }
  if (translations["en"] && translations["en"][key]) {
    return translations["en"][key];
  }
  return key;
}
// Append 28 States keys to translations
if (typeof translations !== 'undefined') {
  translations.en.select_state_title = "🏛️ Select State in India (28 States & Central Schemes)";
  translations.en.select_state_sub = "Choose your state to view state-specific agricultural welfare, cooperative loans, and insurance schemes:";
  translations.en.all_states_option = "🇮🇳 All India (Central & All 28 States)";
  translations.en.region_all = "All States";
  translations.en.region_south = "South India";
  translations.en.region_north = "North India";
  translations.en.region_west = "West India";
  translations.en.region_east = "East India";
  translations.en.region_central = "Central India";
  translations.en.region_northeast = "North-East India";
  translations.en.state_selected_badge = "Active State Selection:";

  translations.te.select_state_title = "🏛️ భారతదేశంలోని రాష్ట్రాన్ని ఎంచుకోండి (28 రాష్ట్రాలు & కేంద్ర పథకాలు)";
  translations.te.select_state_sub = "మీ రాష్ట్ర వ్యవసాయ సంక్షేమ, సహకార రుణాలు మరియు బీమా పథకాలను చూడటానికి రాష్ట్రాన్ని ఎంచుకోండి:";
  translations.te.all_states_option = "🇮🇳 భారతదేశం అంతటా (కేంద్ర & 28 రాష్ట్రాలు)";
  translations.te.region_all = "అన్ని రాష్ట్రాలు";
  translations.te.region_south = "దక్షిణ భారతం";
  translations.te.region_north = "ఉత్తర భారతం";
  translations.te.region_west = "పశ్చిమ భారతం";
  translations.te.region_east = "తూర్పు భారతం";
  translations.te.region_central = "మధ్య భారతం";
  translations.te.region_northeast = "ఈశాన్య భారతం";
  translations.te.state_selected_badge = "ఎంచుకున్న రాష్ట్రం:";

  translations.hi.select_state_title = "🏛️ भारत के राज्य का चयन करें (28 राज्य एवं केंद्रीय योजनाएं)";
  translations.hi.select_state_sub = "अपने राज्य की कृषि कल्याण, सहकारी ऋण एवं फसल बीमा योजनाएं देखने हेतु राज्य चुनें:";
  translations.hi.all_states_option = "🇮🇳 अखिल भारतीय (केंद्रीय एवं 28 राज्य)";
  translations.hi.region_all = "सभी राज्य";
  translations.hi.region_south = "दक्षिण भारत";
  translations.hi.region_north = "उत्तर भारत";
  translations.hi.region_west = "पश्चिम भारत";
  translations.hi.region_east = "पूर्वी भारत";
  translations.hi.region_central = "मध्य भारत";
  translations.hi.region_northeast = "पूर्वोत्तर भारत";
  translations.hi.state_selected_badge = "चयनित राज्य:";
}
// Additional UI section keys
if (typeof translations !== 'undefined') {
  if (translations["en"]) translations["en"]["quick_questions_title"] = "⚡ Quick Questions & Assistance";
  if (translations["te"]) translations["te"]["quick_questions_title"] = "⚡ త్వరిత ప్రశ్నలు & సహాయం";
  if (translations["hi"]) translations["hi"]["quick_questions_title"] = "⚡ त्वरित प्रश्न एवं सहायता";
  if (translations["kn"]) translations["kn"]["quick_questions_title"] = "⚡ ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ನೆರವು";
  if (translations["ta"]) translations["ta"]["quick_questions_title"] = "⚡ விரைவு கேள்விகள் மற்றும் உதவி";
  if (translations["mr"]) translations["mr"]["quick_questions_title"] = "⚡ झटपट प्रश्न व मदत";
  if (translations["bn"]) translations["bn"]["quick_questions_title"] = "⚡ দ্রুত প্রশ্ন ও সহায়তা";
  if (translations["gu"]) translations["gu"]["quick_questions_title"] = "⚡ ઝડપી પ્રશ્નો અને સહાય";
  if (translations["pa"]) translations["pa"]["quick_questions_title"] = "⚡ ਤੁਰੰਤ ਸਵਾਲ ਅਤੇ ਸਹਾਇਤਾ";
  if (translations["or"]) translations["or"]["quick_questions_title"] = "⚡ ଶୀଘ୍ର ପ୍ରଶ୍ନ ଓ ସହାୟତା";
  if (translations["ml"]) translations["ml"]["quick_questions_title"] = "⚡ പെട്ടെന്നുള്ള ചോദ്യങ്ങളും സഹായവും";
  if (translations["as"]) translations["as"]["quick_questions_title"] = "⚡ ক্ষিপ্ৰ প্ৰশ্ন আৰু সাহায্য";
  if (translations["en"]) translations["en"]["helpline_kcc"] = "Kisan Call Centre (Toll-Free):";
  if (translations["te"]) translations["te"]["helpline_kcc"] = "రైతు సేవా కేంద్రం (టోల్ ఫ్రీ):";
  if (translations["hi"]) translations["hi"]["helpline_kcc"] = "किसान कॉल सेंटर (टोल-फ्री):";
  if (translations["kn"]) translations["kn"]["helpline_kcc"] = "ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್:";
  if (translations["ta"]) translations["ta"]["helpline_kcc"] = "விவசாயிகள் அழைப்பு மையம்:";
  if (translations["mr"]) translations["mr"]["helpline_kcc"] = "किसान कॉल सेंटर:";
  if (translations["bn"]) translations["bn"]["helpline_kcc"] = "কিষাণ কল সেন্টার:";
  if (translations["gu"]) translations["gu"]["helpline_kcc"] = "કિસાન કૉલ સેન્ટર:";
  if (translations["pa"]) translations["pa"]["helpline_kcc"] = "ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ:";
  if (translations["or"]) translations["or"]["helpline_kcc"] = "କିଷାନ କଲ୍ ସେଣ୍ଟର:";
  if (translations["ml"]) translations["ml"]["helpline_kcc"] = "കിസാൻ കോൾ സെന്റർ:";
  if (translations["as"]) translations["as"]["helpline_kcc"] = "কিষাণ কল চেণ্টাৰ:";
  if (translations["en"]) translations["en"]["helpline_insurance"] = "Crop Insurance Helpline:";
  if (translations["te"]) translations["te"]["helpline_insurance"] = "ఉచిత పంట బీమా హెల్ప్‌లైన్:";
  if (translations["hi"]) translations["hi"]["helpline_insurance"] = "फसल बीमा हेल्पलाइन:";
  if (translations["kn"]) translations["kn"]["helpline_insurance"] = "ಬೆಳೆ ವಿಮೆ ಸಹಾಯವಾಣಿ:";
  if (translations["ta"]) translations["ta"]["helpline_insurance"] = "பயிர் காப்பீடு உதவி எண்:";
  if (translations["mr"]) translations["mr"]["helpline_insurance"] = "पीक विमा हेल्पलाइन:";
  if (translations["bn"]) translations["bn"]["helpline_insurance"] = "ফসল বীমা হেল্পলাইন:";
  if (translations["gu"]) translations["gu"]["helpline_insurance"] = "પાક વીમો હેલ્પલાઇન:";
  if (translations["pa"]) translations["pa"]["helpline_insurance"] = "ਫ਼ਸਲ ਬੀਮਾ ਹੈਲਪਲਾਈਨ:";
  if (translations["or"]) translations["or"]["helpline_insurance"] = "ଫସଲ ବୀମା ହେଲ୍ପଲାଇନ୍:";
  if (translations["ml"]) translations["ml"]["helpline_insurance"] = "വിള ഇൻഷുറൻസ് ഹെൽപ്പ്‌ലൈൻ:";
  if (translations["as"]) translations["as"]["helpline_insurance"] = "শস্য বীমা হেল্পলাইন:";
  if (translations["en"]) translations["en"]["helpline_spandana"] = "Cooperative Spandana Redressal:";
  if (translations["te"]) translations["te"]["helpline_spandana"] = "సహకార స్పందన పరిష్కారం:";
  if (translations["hi"]) translations["hi"]["helpline_spandana"] = "सहकार स्पंदना निवारण:";
  if (translations["kn"]) translations["kn"]["helpline_spandana"] = "ಸಹಕಾರ ಸ್ಪಂದನ ಪರಿಹಾರ:";
  if (translations["ta"]) translations["ta"]["helpline_spandana"] = "கூட்டுறவு ஸ்பந்தனா குறைதீர்ப்பு:";
  if (translations["mr"]) translations["mr"]["helpline_spandana"] = "सहकार स्पंदना निवारण:";
  if (translations["bn"]) translations["bn"]["helpline_spandana"] = "সমবায় স্পন্দনা প্রতিকার:";
  if (translations["gu"]) translations["gu"]["helpline_spandana"] = "સહકાર સ્પંદના નિવારણ:";
  if (translations["pa"]) translations["pa"]["helpline_spandana"] = "ਸਹਿਕਾਰ ਸਪੰਦਨਾ ਨਿਵਾਰਣ:";
  if (translations["or"]) translations["or"]["helpline_spandana"] = "ସମବାୟ ସ୍ପନ୍ଦନା ନିବାରଣ:";
  if (translations["ml"]) translations["ml"]["helpline_spandana"] = "സഹകരണ സ്പന്ദന പരിഹാരം:";
  if (translations["as"]) translations["as"]["helpline_spandana"] = "সমবায় স্পন্দনা নিবাৰণ:";
  if (translations["en"]) translations["en"]["form_label_state"] = "Select State in India:";
  if (translations["te"]) translations["te"]["form_label_state"] = "భారతదేశంలోని రాష్ట్రాన్ని ఎంచుకోండి:";
  if (translations["hi"]) translations["hi"]["form_label_state"] = "भारत का राज्य चुनें:";
  if (translations["kn"]) translations["kn"]["form_label_state"] = "ಭಾರತದ ರಾಜ್ಯವನ್ನು ಆರಿಸಿ:";
  if (translations["ta"]) translations["ta"]["form_label_state"] = "இந்திய மாநிலத்தை தேர்வு செய்க:";
  if (translations["mr"]) translations["mr"]["form_label_state"] = "भारतातील राज्य निवडा:";
  if (translations["bn"]) translations["bn"]["form_label_state"] = "ভারতের রাজ্য নির্বাচন করুন:";
  if (translations["gu"]) translations["gu"]["form_label_state"] = "ભારતનું રાજ્ય પસંદ કરો:";
  if (translations["pa"]) translations["pa"]["form_label_state"] = "ਭਾਰਤ ਦਾ ਰਾਜ ਚੁਣੋ:";
  if (translations["or"]) translations["or"]["form_label_state"] = "ଭାରତର ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ:";
  if (translations["ml"]) translations["ml"]["form_label_state"] = "ഇന്ത്യൻ സംസ്ഥാനം തിരഞ്ഞെടുക്കുക:";
  if (translations["as"]) translations["as"]["form_label_state"] = "ভাৰতৰ ৰাজ্য বাছনি কৰক:";
  if (translations["en"]) translations["en"]["pacs_godowns_title"] = "Village Grain Storage Godowns";
  if (translations["te"]) translations["te"]["pacs_godowns_title"] = "గ్రామ ధాన్య నిల్వ గోదాములు";
  if (translations["hi"]) translations["hi"]["pacs_godowns_title"] = "ग्राम अन्न भंडारण गोदाम";
  if (translations["kn"]) translations["kn"]["pacs_godowns_title"] = "ಗ್ರಾಮ ಧಾನ್ಯ ಉಗ್ರಾಣಗಳು";
  if (translations["ta"]) translations["ta"]["pacs_godowns_title"] = "கிராம தானிய கிடங்குகள்";
  if (translations["mr"]) translations["mr"]["pacs_godowns_title"] = "ग्राम धान्य गोदामे";
  if (translations["bn"]) translations["bn"]["pacs_godowns_title"] = "গ্রামের খাদ্যশস্যের গুদাম";
  if (translations["gu"]) translations["gu"]["pacs_godowns_title"] = "ગ્રામીણ અનાજ સંગ્રહ ગોડાઉન";
  if (translations["pa"]) translations["pa"]["pacs_godowns_title"] = "ਪਿੰਡ ਦੇ ਅਨਾਜ ਗੋਦਾਮ";
  if (translations["or"]) translations["or"]["pacs_godowns_title"] = "ଗ୍ରାମ ଶସ୍ୟ ସଂରକ୍ଷଣ ଗୋଦାମ";
  if (translations["ml"]) translations["ml"]["pacs_godowns_title"] = "ഗ്രാമ ധാന്യ സംഭരണ ഗോഡൗണുകൾ";
  if (translations["as"]) translations["as"]["pacs_godowns_title"] = "গাঁওৰ শস্য সংৰক্ষণ গুদাম";
  if (translations["en"]) translations["en"]["pacs_godowns_desc"] = "500-2000 MT storage & 75% pledge loan against e-NWR receipts";
  if (translations["te"]) translations["te"]["pacs_godowns_desc"] = "500-2000 MT ధాన్య నిల్వ & e-NWR రశీదులపై 75% తాకట్టు రుణాలు";
  if (translations["hi"]) translations["hi"]["pacs_godowns_desc"] = "500-2000 मीट्रिक टन भंडारण व ई-एनडब्ल्यूआर रसीद पर 75% गिरवी ऋण";
  if (translations["kn"]) translations["kn"]["pacs_godowns_desc"] = "500-2000 ಮೆಟ್ರಿಕ್ ಟನ್ ಸಂಗ್ರಹಣೆ ಮತ್ತು ರಸೀದಿಗಳ ಮೇಲೆ 75% ಅಡಮಾನ ಸಾಲ";
  if (translations["ta"]) translations["ta"]["pacs_godowns_desc"] = "500-2000 மெட்ரிக் டன் சேமிப்பு மற்றும் 75% அடமான கடன்";
  if (translations["mr"]) translations["mr"]["pacs_godowns_desc"] = "५००-२००० मेट्रिक टन साठवण आणि ७५% तारण कर्ज";
  if (translations["bn"]) translations["bn"]["pacs_godowns_desc"] = "৫০০-২০০০ মেট্ৰিক টন সঞ্চয় ও ৭৫% বন্ধকী ঋণ";
  if (translations["gu"]) translations["gu"]["pacs_godowns_desc"] = "500-2000 મેટ્રિક ટન સંગ્રહ અને 75% ધિરાણ";
  if (translations["pa"]) translations["pa"]["pacs_godowns_desc"] = "500-2000 ਮੀਟ੍ਰਿਕ ਟਨ ਭੰਡਾਰਨ ਅਤੇ 75% ਕਰਜ਼ਾ";
  if (translations["or"]) translations["or"]["pacs_godowns_desc"] = "500-2000 ମେଟ୍ରିକ ଟନ ସଂରକ୍ଷଣ ଓ 75% ବନ୍ଧକ ଋଣ";
  if (translations["ml"]) translations["ml"]["pacs_godowns_desc"] = "500-2000 മെട്രിക് ടൺ സംഭരണവും 75% പണയ വായ്പയും";
  if (translations["as"]) translations["as"]["pacs_godowns_desc"] = "৫০০-২০০০ মেট্ৰিক টন সংৰক্ষণ আৰু ৭৫% বন্ধকী ঋণ";
  if (translations["en"]) translations["en"]["pacs_custom_hiring_title"] = "Custom Hiring Centres (CHC)";
  if (translations["te"]) translations["te"]["pacs_custom_hiring_title"] = "కస్టమ్ హైరింగ్ కేంద్రాలు (CHC)";
  if (translations["hi"]) translations["hi"]["pacs_custom_hiring_title"] = "कस्टम हायरिंग केंद्र (सीएचसी)";
  if (translations["kn"]) translations["kn"]["pacs_custom_hiring_title"] = "ಕಸ್ಟಮ್ ಹೈರಿಂಗ್ ಕೇಂದ್ರಗಳು";
  if (translations["ta"]) translations["ta"]["pacs_custom_hiring_title"] = "வாடகை மையங்கள் (CHC)";
  if (translations["mr"]) translations["mr"]["pacs_custom_hiring_title"] = "कस्टम हायरिंग सेंटर्स";
  if (translations["bn"]) translations["bn"]["pacs_custom_hiring_title"] = "কাস্টম হায়ারিং সেন্টার";
  if (translations["gu"]) translations["gu"]["pacs_custom_hiring_title"] = "કસ્ટમ હાયરિંગ સેન્ટર્સ";
  if (translations["pa"]) translations["pa"]["pacs_custom_hiring_title"] = "ਕਸਟਮ ਹਾਇਰਿੰਗ ਸੈਂਟਰ";
  if (translations["or"]) translations["or"]["pacs_custom_hiring_title"] = "କଷ୍ଟମ ହାୟାରିଙ୍ଗ କେନ୍ଦ୍ର";
  if (translations["ml"]) translations["ml"]["pacs_custom_hiring_title"] = "കസ്റ്റം ഹയറിംഗ് സെന്ററുകൾ";
  if (translations["as"]) translations["as"]["pacs_custom_hiring_title"] = "কাষ্টম হায়াৰিং চেণ্টাৰ";
  if (translations["en"]) translations["en"]["pacs_custom_hiring_desc"] = "Affordable rental of agricultural drones, harvesters, and tractors";
  if (translations["te"]) translations["te"]["pacs_custom_hiring_desc"] = "డ్రోన్లు, హార్వెస్టర్లు మరియు ట్రాక్టర్ల సరసమైన అద్దె సేవలు";
  if (translations["hi"]) translations["hi"]["pacs_custom_hiring_desc"] = "ड्रोन, कंबाइन हार्वेस्टर और ट्रैक्टरों का किफायती किराए पर प्रावधान";
  if (translations["kn"]) translations["kn"]["pacs_custom_hiring_desc"] = "ಕೃಷಿ ಡ್ರೋನ್, ಹಾರ್ವೆಸ್ಟರ್ ಮತ್ತು ಟ್ರ್ಯಾಕ್ಟರ್ ಕೈಗೆಟುಕುವ ಬಾಡಿಗೆ";
  if (translations["ta"]) translations["ta"]["pacs_custom_hiring_desc"] = "ட்ரோன்கள், அறுவடை இயந்திரங்கள், டிராக்டர்கள் வாடகை சேவை";
  if (translations["mr"]) translations["mr"]["pacs_custom_hiring_desc"] = "ड्रोन, हार्वेस्टर आणि ट्रॅक्टर रास्त दरात भाड्याने";
  if (translations["bn"]) translations["bn"]["pacs_custom_hiring_desc"] = "ড্রোন, হার্ভেস্টার এবং ট্র্যাক্টর ভাড়া সুবিধা";
  if (translations["gu"]) translations["gu"]["pacs_custom_hiring_desc"] = "ડ્રોન, હાર્વેસ્ટર અને ટ્રેક્ટર વાજબી ભાડે";
  if (translations["pa"]) translations["pa"]["pacs_custom_hiring_desc"] = "ਡਰੋਨ, ਹਾਰਵੈਸਟਰ ਅਤੇ ਟਰੈਕਟਰ ਕਿਰਾਏ ਤੇ";
  if (translations["or"]) translations["or"]["pacs_custom_hiring_desc"] = "ଡ୍ରୋନ୍, ହାର୍ଭେଷ୍ଟର ଓ ଟ୍ରାକ୍ଟର ସୁଲଭ ଭଡ଼ା ସୁବିଧା";
  if (translations["ml"]) translations["ml"]["pacs_custom_hiring_desc"] = "ഡ്രോണുകൾ, ട്രാക്ടറുകൾ എന്നിവ മിതമായ നിരക്കിൽ വാടകയ്ക്ക്";
  if (translations["as"]) translations["as"]["pacs_custom_hiring_desc"] = "ড্ৰোন, হাৰ্ভেষ্টাৰ আৰু ট্ৰেক্টৰ ভাড়া সেৱা";
  if (translations["en"]) translations["en"]["pacs_jan_aushadhi_title"] = "Pradhan Mantri Jan Aushadhi Kendras";
  if (translations["te"]) translations["te"]["pacs_jan_aushadhi_title"] = "ప్రధాన మంత్రి జన్ ఔషధి కేంద్రాలు";
  if (translations["hi"]) translations["hi"]["pacs_jan_aushadhi_title"] = "प्रधानमंत्री जन औषधि केंद्र";
  if (translations["kn"]) translations["kn"]["pacs_jan_aushadhi_title"] = "ಪ್ರಧಾನ ಮಂತ್ರಿ ಜನ ಔಷಧಿ ಕೇಂದ್ರಗಳು";
  if (translations["ta"]) translations["ta"]["pacs_jan_aushadhi_title"] = "பிரதான் மந்திரி மக்கள் மருந்தகம்";
  if (translations["mr"]) translations["mr"]["pacs_jan_aushadhi_title"] = "प्रधानमंत्री जन औषधी केंद्रे";
  if (translations["bn"]) translations["bn"]["pacs_jan_aushadhi_title"] = "প্রধানমন্ত্ৰী জন ঔষধী কেন্দ্র";
  if (translations["gu"]) translations["gu"]["pacs_jan_aushadhi_title"] = "પ્રધાનમંત્રી જન ઔષધિ કેન્દ્રો";
  if (translations["pa"]) translations["pa"]["pacs_jan_aushadhi_title"] = "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਜਨ ਔਸ਼ਧੀ ਕੇਂਦਰ";
  if (translations["or"]) translations["or"]["pacs_jan_aushadhi_title"] = "ପ୍ରଧାନମନ୍ତ୍ରୀ ଜନ ଔଷଧି କେନ୍ଦ୍ର";
  if (translations["ml"]) translations["ml"]["pacs_jan_aushadhi_title"] = "പ്രധാനമന്ത്രി ജൻ ഔഷധി കേന്ദ്രങ്ങൾ";
  if (translations["as"]) translations["as"]["pacs_jan_aushadhi_title"] = "প্ৰধানমন্ত্ৰী জন ঔষধি কেন্দ্ৰ";
  if (translations["en"]) translations["en"]["pacs_jan_aushadhi_desc"] = "Quality generic medicines and fertilizers at 50-90% subsidized rates";
  if (translations["te"]) translations["te"]["pacs_jan_aushadhi_desc"] = "50-90% తక్కువ ధరకే నాణ్యమైన జనరిక్ మందులు మరియు ఎరువులు";
  if (translations["hi"]) translations["hi"]["pacs_jan_aushadhi_desc"] = "50-90% कम कीमत पर उच्च गुणवत्ता वाली जेनेरिक दवाएं";
  if (translations["kn"]) translations["kn"]["pacs_jan_aushadhi_desc"] = "50-90% ಕಡಿಮೆ ದರದಲ್ಲಿ ಗುಣಮಟ್ಟದ ಜನರಿಕ್ ಔಷಧಗಳು";
  if (translations["ta"]) translations["ta"]["pacs_jan_aushadhi_desc"] = "50-90% குறைந்த விலையில் தரமான மருந்துகள்";
  if (translations["mr"]) translations["mr"]["pacs_jan_aushadhi_desc"] = "५०-९०% कमी दरात दर्जेदार जेनेरिक औषधे";
  if (translations["bn"]) translations["bn"]["pacs_jan_aushadhi_desc"] = "৫০-৯০% কম মূল্যে মানসম্পন্ন জেনেরিক ওষুধ";
  if (translations["gu"]) translations["gu"]["pacs_jan_aushadhi_desc"] = "50-90% ઓછા ભાવે ગુણવત્તાયુક્ત જેનેરિક દવાઓ";
  if (translations["pa"]) translations["pa"]["pacs_jan_aushadhi_desc"] = "50-90% ਸਸਤੀਆਂ ਮਿਆਰੀ ਦਵਾਈਆਂ";
  if (translations["or"]) translations["or"]["pacs_jan_aushadhi_desc"] = "50-90% କମ୍ ମୂଲ୍ୟରେ ଉନ୍ନତ ଜେନେରିକ୍ ଔଷଧ";
  if (translations["ml"]) translations["ml"]["pacs_jan_aushadhi_desc"] = "50-90% വിലക്കുറവിൽ ഗുണനിലവാരമുള്ള ജനറിക് മരുന്നുകൾ";
  if (translations["as"]) translations["as"]["pacs_jan_aushadhi_desc"] = "৫০-৯০% কম দামত উন্নত মানৰ ঔষধ";
  if (translations["en"]) translations["en"]["pacs_csc_title"] = "PACS Common Service Centres (CSC)";
  if (translations["te"]) translations["te"]["pacs_csc_title"] = "పిఎసిఎస్ కామన్ సర్వీస్ కేంద్రాలు (CSC)";
  if (translations["hi"]) translations["hi"]["pacs_csc_title"] = "पैक्स कॉमन सर्विस सेंटर (सीएससी)";
  if (translations["kn"]) translations["kn"]["pacs_csc_title"] = "PACS ಸಾಮಾನ್ಯ ಸೇವಾ ಕೇಂದ್ರಗಳು (CSC)";
  if (translations["ta"]) translations["ta"]["pacs_csc_title"] = "பொது சேவை மையங்கள் (CSC)";
  if (translations["mr"]) translations["mr"]["pacs_csc_title"] = "पॅक्स कॉमन सर्व्हिस सेंटर्स (सीएससी)";
  if (translations["bn"]) translations["bn"]["pacs_csc_title"] = "প্যাক্স কমন সার্ভিস সেন্টার (সিএসসি)";
  if (translations["gu"]) translations["gu"]["pacs_csc_title"] = "PACS કોમન સર્વિસ સેન્ટર્સ (CSC)";
  if (translations["pa"]) translations["pa"]["pacs_csc_title"] = "ਕਾਮਨ ਸਰਵਿਸ ਸੈਂਟਰ (ਸੀਐਸਸੀ)";
  if (translations["or"]) translations["or"]["pacs_csc_title"] = "PACS ସାଧାରଣ ସେବା କେନ୍ଦ୍ର (CSC)";
  if (translations["ml"]) translations["ml"]["pacs_csc_title"] = "കോമൺ സർവീസ് സെന്ററുകൾ (CSC)";
  if (translations["as"]) translations["as"]["pacs_csc_title"] = "কমন চাৰ্ভিচ চেণ্টাৰ (CSC)";
  if (translations["en"]) translations["en"]["pacs_csc_desc"] = "Electricity bills, Aadhaar services, banking, insurance and e-Services";
  if (translations["te"]) translations["te"]["pacs_csc_desc"] = "కరెంట్ బిల్లులు, ఆధార్ సేవలు, బ్యాంకింగ్ మరియు 300+ డిజిటల్ సేవలు";
  if (translations["hi"]) translations["hi"]["pacs_csc_desc"] = "बिजली बिल, आधार सेवाएं, बैंकिंग, बीमा और 300+ डिजिटल सेवाएं";
  if (translations["kn"]) translations["kn"]["pacs_csc_desc"] = "ವಿದ್ಯುತ್ ಬಿಲ್, ಆಧಾರ್ ಸೇವೆಗಳು, ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು ಡಿಜಿಟಲ್ ಸೇವೆಗಳು";
  if (translations["ta"]) translations["ta"]["pacs_csc_desc"] = "மின் கட்டணம், ஆதார், வங்கி மற்றும் டிஜிட்டல் சேவைகள்";
  if (translations["mr"]) translations["mr"]["pacs_csc_desc"] = "वीज बिल, आधार सेवा, बँकिंग आणि डिजिटल सेवा";
  if (translations["bn"]) translations["bn"]["pacs_csc_desc"] = "বিদ্যুৎ বিল, আধার পরিষেবা, ব্যাংকিং ও ডিজিটাল সেবা";
  if (translations["gu"]) translations["gu"]["pacs_csc_desc"] = "વીજળી બિલ, આધાર, બેન્કિંગ અને ડિજિટલ સેવાઓ";
  if (translations["pa"]) translations["pa"]["pacs_csc_desc"] = "ਬਿਜਲੀ ਦੇ ਬਿੱਲ, ਆਧਾਰ ਸੇਵਾਵਾਂ, ਬੈਂਕਿੰਗ ਅਤੇ ਡਿਜੀਟਲ ਸੇਵਾਵਾਂ";
  if (translations["or"]) translations["or"]["pacs_csc_desc"] = "ବିଜୁଳି ବିଲ୍, ଆଧାର, ବ୍ୟାଙ୍କିଂ ଓ ଡିଜିଟାଲ୍ ସେବା";
  if (translations["ml"]) translations["ml"]["pacs_csc_desc"] = "വൈദ്യുതി ബിൽ, ആധാർ സേവനങ്ങൾ, ബാങ്കിംഗ് & ഡിജിറ്റൽ സേവനങ്ങൾ";
  if (translations["as"]) translations["as"]["pacs_csc_desc"] = "বিদ্যুৎ বিল, আধাৰ, বেংকিং আৰু ডিজিটেল সেৱা";
  if (translations["en"]) translations["en"]["grv_level_1"] = "Level 1 (48 Hours): Primary Society Secretary & Village RSK Officer";
  if (translations["te"]) translations["te"]["grv_level_1"] = "స్థాయి 1 (48 గంటలు): ప్రాథమిక సంఘ కార్యదర్శి & ఆర్బీకే అధికారి";
  if (translations["hi"]) translations["hi"]["grv_level_1"] = "स्तर 1 (48 घंटे): प्राथमिक समिति सचिव व ग्राम आरबीके अधिकारी";
  if (translations["kn"]) translations["kn"]["grv_level_1"] = "ಹಂತ 1 (48 ಗಂಟೆ): ಸಂಘದ ಕಾರ್ಯದರ್ಶಿ & ಗ್ರಾಮ ಕೃಷಿ ಅಧಿಕಾರಿ";
  if (translations["ta"]) translations["ta"]["grv_level_1"] = "நிலை 1 (48 மணிநேரம்): சங்க செயலாளர் & கிராம அலுவலர்";
  if (translations["mr"]) translations["mr"]["grv_level_1"] = "स्तर १ (४८ तास): सोसायटी सचिव व ग्राम कृषी अधिकारी";
  if (translations["bn"]) translations["bn"]["grv_level_1"] = "স্তর ১ (৪৮ ঘন্টা): সমবায় সচিব ও গ্রাম কৃষি আধিকারিক";
  if (translations["gu"]) translations["gu"]["grv_level_1"] = "સ્તર 1 (48 કલાક): મંડળી મંત્રી અને ગ્રામ કૃષિ અધિકારી";
  if (translations["pa"]) translations["pa"]["grv_level_1"] = "ਪੱਧਰ 1 (48 ਘੰਟੇ): ਸੁਸਾਇਟੀ ਸਕੱਤਰ ਅਤੇ ਪਿੰਡ ਖੇਤੀਬਾੜੀ ਅਧਿਕਾਰੀ";
  if (translations["or"]) translations["or"]["grv_level_1"] = "ସ୍ତର 1 (48 ଘଣ୍ଟା): ସୋସାଇଟି ସମ୍ପାଦକ ଓ ଗ୍ରାମ କୃଷି ଅଧିକାରୀ";
  if (translations["ml"]) translations["ml"]["grv_level_1"] = "ലെവൽ 1 (48 മണിക്കൂർ): സൊസൈറ്റി സെക്രട്ടറി & കൃഷി ഓഫീസർ";
  if (translations["as"]) translations["as"]["grv_level_1"] = "স্তৰ ১ (৪৮ ঘণ্টা): সমিতিৰ সম্পাদক আৰু কৃষি বিষয়া";
  if (translations["en"]) translations["en"]["grv_level_2"] = "Level 2 (7 Days): District Cooperative Officer (DCO)";
  if (translations["te"]) translations["te"]["grv_level_2"] = "స్థాయి 2 (7 రోజులు): జిల్లా సహకార అధికారి (DCO)";
  if (translations["hi"]) translations["hi"]["grv_level_2"] = "स्तर 2 (7 दिन): जिला सहकारी अधिकारी (डीसीओ)";
  if (translations["kn"]) translations["kn"]["grv_level_2"] = "ಹಂತ 2 (7 ದಿನಗಳು): ಜಿಲ್ಲಾ ಸಹಕಾರ ಅಧಿಕಾರಿ (DCO)";
  if (translations["ta"]) translations["ta"]["grv_level_2"] = "நிலை 2 (7 நாட்கள்): மாவட்ட கூட்டுறவு அலுவலர் (DCO)";
  if (translations["mr"]) translations["mr"]["grv_level_2"] = "स्तर २ (७ दिवस): जिल्हा उपनिबंधक / सहकारी अधिकारी (DCO)";
  if (translations["bn"]) translations["bn"]["grv_level_2"] = "স্তর ২ (৭ দিন): জেলা সমবায় আধিকারিক (DCO)";
  if (translations["gu"]) translations["gu"]["grv_level_2"] = "સ્તર 2 (7 દિવસ): જિલ્લા રજિસ્ટ્રાર / સહકારી અધિકારી (DCO)";
  if (translations["pa"]) translations["pa"]["grv_level_2"] = "ਪੱਧਰ 2 (7 ਦਿਨ): ਜ਼ਿਲ੍ਹਾ ਸਹਿਕਾਰੀ ਅਧਿਕਾਰੀ (DCO)";
  if (translations["or"]) translations["or"]["grv_level_2"] = "ସ୍ତର 2 (7 ଦିନ): ଜିଲ୍ଲା ସମବାୟ ଅଧିକାରୀ (DCO)";
  if (translations["ml"]) translations["ml"]["grv_level_2"] = "ലെവൽ 2 (7 ദിവസം): ജില്ലാ സഹകരണ ഓഫീസർ (DCO)";
  if (translations["as"]) translations["as"]["grv_level_2"] = "স্তৰ ২ (৭ দিন): জিলা সমবায় বিষয়া (DCO)";
  if (translations["en"]) translations["en"]["grv_level_3"] = "Level 3 (Final): State Commissioner & Registrar of Cooperative Societies";
  if (translations["te"]) translations["te"]["grv_level_3"] = "స్థాయి 3 (తుది పరిష్కారం): రాష్ట్ర సహకార శాఖ కమిషనర్ & రిజిస్ట్రార్";
  if (translations["hi"]) translations["hi"]["grv_level_3"] = "स्तर 3 (अंतिम समाधान): राज्य सहकारिता आयुक्त एवं पंजीयक";
  if (translations["kn"]) translations["kn"]["grv_level_3"] = "ಹಂತ 3 (ಅಂತಿಮ): ರಾಜ್ಯ ಸಹಕಾರ ಆಯುಕ್ತರು & ನಿಬಂಧಕರು";
  if (translations["ta"]) translations["ta"]["grv_level_3"] = "நிலை 3 (இறுதி தீர்வு): மாநில கூட்டுறவு ஆணையர் & பதிவாளர்";
  if (translations["mr"]) translations["mr"]["grv_level_3"] = "स्तर ३ (अंतिम): राज्य सहकार आयुक्त व निबंधक";
  if (translations["bn"]) translations["bn"]["grv_level_3"] = "স্তর ৩ (চূড়ান্ত): রাজ্য সমবায় কমিশনার ও নিবন্ধক";
  if (translations["gu"]) translations["gu"]["grv_level_3"] = "સ્તર 3 (અંતિમ): રાજ્ય સહકાર કમિશનર અને રજિસ્ટ્રાર";
  if (translations["pa"]) translations["pa"]["grv_level_3"] = "ਪੱਧਰ 3 (ਅੰਤਿਮ): ਰਾਜ ਸਹਿਕਾਰੀ ਕਮਿਸ਼ਨਰ ਅਤੇ ਰਜਿਸਟਰਾਰ";
  if (translations["or"]) translations["or"]["grv_level_3"] = "ସ୍ତର 3 (ଚୂଡ଼ାନ୍ତ): ରାଜ୍ୟ ସମବାୟ କମିଶନର ଓ ପଞ୍ଜୀୟକ";
  if (translations["ml"]) translations["ml"]["grv_level_3"] = "ലെവൽ 3 (അന്തിമം): സംസ്ഥാന സഹകരണ കമ്മീഷണറും രജിസ്ട്രാറും";
  if (translations["as"]) translations["as"]["grv_level_3"] = "স্তৰ ৩ (চূড়ান্ত): ৰাজ্যিক সমবায় আয়ুক্ত আৰু পঞ্জীয়ক";
}
