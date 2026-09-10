import unittest
import json
import sys

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from server import app

class TestSahakaraMitra28States(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_01_health_and_states(self):
        res = self.client.get('/api/health')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data['status'], 'healthy')
        self.assertEqual(data['total_states_supported'], 28)
        print("[PASS] Health Check & 28 States Support")

    def test_02_states_endpoint(self):
        res = self.client.get('/api/states')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertGreaterEqual(data['count'], 29)
        state_ids = [s['id'] for s in data['states']]
        self.assertIn('ap', state_ids)
        self.assertIn('tg', state_ids)
        self.assertIn('mh', state_ids)
        self.assertIn('ka', state_ids)
        self.assertIn('up', state_ids)
        self.assertIn('rj', state_ids)
        self.assertIn('br', state_ids)
        self.assertIn('wb', state_ids)
        self.assertIn('as', state_ids)
        print(f"[PASS] /api/states returned {data['count']} entities")

    def test_03_state_filtered_schemes(self):
        # Test AP
        res_ap = self.client.get('/api/schemes?state_id=ap')
        self.assertEqual(res_ap.status_code, 200)
        data_ap = res_ap.get_json()
        self.assertTrue(any(s['id'] == 'ap-annadata-sukhibhava' for s in data_ap['schemes']))

        # Test Telangana
        res_tg = self.client.get('/api/schemes?state_id=tg')
        self.assertEqual(res_tg.status_code, 200)
        data_tg = res_tg.get_json()
        self.assertTrue(any(s['id'] == 'tg-rythu-bharosa' for s in data_tg['schemes']))

        # Test Maharashtra
        res_mh = self.client.get('/api/schemes?state_id=mh')
        self.assertEqual(res_mh.status_code, 200)
        data_mh = res_mh.get_json()
        self.assertTrue(any(s['id'] == 'mh-namo-shetkari' for s in data_mh['schemes']))

        print("[PASS] State-specific Scheme Filters for AP, Telangana & Maharashtra")

    def test_04_tts_trilingual(self):
        res_te = self.client.get('/api/tts?lang=te&text=నమస్కారం')
        self.assertEqual(res_te.status_code, 200)
        self.assertEqual(res_te.mimetype, 'audio/mpeg')

        res_hi = self.client.get('/api/tts?lang=hi&text=नमस्ते')
        self.assertEqual(res_hi.status_code, 200)
        self.assertEqual(res_hi.mimetype, 'audio/mpeg')

        res_en = self.client.get('/api/tts?lang=en&text=Welcome')
        self.assertEqual(res_en.status_code, 200)
        self.assertEqual(res_en.mimetype, 'audio/mpeg')
        print("[PASS] Trilingual TTS Native Streaming (Telugu, Hindi, English)")

    def test_05_chat_telugu(self):
        res = self.client.post('/api/chat',
                               data=json.dumps({'message': 'తెలంగాణ రైతు భరోసా వివరాలు ఏమిటి?', 'lang': 'te'}),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn('తెలంగాణ రైతు భరోసా', data['response'])
        print("[PASS] Chatbot Multi-State Query (Telangana Rythu Bharosa in Telugu)")

    def test_06_chat_hindi(self):
        res = self.client.post('/api/chat',
                               data=json.dumps({'message': 'महाराष्ट्र नमो शेतकरी योजना और 1 रुपये फसल बीमा', 'lang': 'hi'}),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn('नमो शेतकरी', data['response'])
        print("[PASS] Chatbot Multi-State Query (Maharashtra Namo Shetkari in Hindi)")

    def test_07_grievance_with_state(self):
        payload = {
            'farmer_name': 'K. Ramanjaneyulu',
            'phone': '9848011223',
            'state': 'Andhra Pradesh',
            'district': 'Guntur',
            'mandal': 'Tenali',
            'village_pacs': 'Kolakaluru PACS',
            'category': 'pacs_loan',
            'description': 'Delay in sanctioning 0% interest crop loan despite prompt repayment.',
            'lang': 'te'
        }
        res = self.client.post('/api/grievance/submit',
                               data=json.dumps(payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data['success'])
        self.assertIn('GRV-2026', data['ticket_id'])
        print(f"[PASS] Grievance Registered with Ticket: {data['ticket_id']}")

    def test_08_download_endpoint(self):
        res = self.client.get('/download')
        self.assertEqual(res.status_code, 200)
        self.assertGreater(len(res.data), 100000)
        print(f"[PASS] /download endpoint returned complete ZIP ({len(res.data)} bytes)")

    def test_09_internet_scheme_search_api(self):
        res = self.client.get('/api/schemes/internet-search?query=PMKSY%20Drip%20Irrigation&lang=te')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertGreaterEqual(data['count'], 1)
        scheme = data['schemes'][0]
        self.assertIn('PMKSY', scheme['title']['en'])
        self.assertIn('డ్రిప్', scheme['title']['te'])
        self.assertIn('benefits', scheme)
        print(f"[PASS] Live Internet Scheme Search API verified ({scheme['title']['en']})")

    def test_10_internet_scheme_solar_and_drone(self):
        res_solar = self.client.get('/api/schemes/internet-search?query=KUSUM%20Solar%20Pump&lang=hi')
        self.assertEqual(res_solar.status_code, 200)
        data_solar = res_solar.get_json()
        self.assertGreaterEqual(data_solar['count'], 1)
        self.assertIn('कुसुम', data_solar['schemes'][0]['title']['hi'])

        res_drone = self.client.get('/api/schemes/internet-search?query=Kisan%20Drone&lang=te')
        self.assertEqual(res_drone.status_code, 200)
        data_drone = res_drone.get_json()
        self.assertGreaterEqual(data_drone['count'], 1)
        self.assertIn('డ్రోన్', data_drone['schemes'][0]['title']['te'])
        print("[PASS] Internet Scheme Search for PM-KUSUM Solar & Kisan Drone verified")

    def test_11_chat_internet_scheme_lookup(self):
        res = self.client.post('/api/chat',
                               data=json.dumps({'message': 'Tell me about PM Kusum Solar pump subsidy scheme', 'lang': 'en'}),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn('PM-KUSUM', data['response'])
        self.assertIn('Benefits:', data['response'])
        print("[PASS] Chatbot Live Internet Scheme Query Response verified")

    def test_12_kiosk_route_redirect(self):
        res = self.client.get('/kiosk')
        self.assertEqual(res.status_code, 302)
        self.assertEqual(res.headers.get('Location'), '/')
        print("[PASS] /kiosk endpoint successfully redirects (302) to Full Web Portal (/)")

    def test_13_laws_api(self):
        res = self.client.get('/api/laws')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertGreaterEqual(data['count'], 2)
        self.assertTrue(any('1964' in l['act_name']['en'] for l in data['laws']))
        print(f"[PASS] /api/laws returned {data['count']} statutory cooperative acts")

    def test_14_insurance_and_kcc_calc_api(self):
        # Insurance Calc
        res_ins = self.client.post('/api/calculate-insurance',
                                   data=json.dumps({'crop': 'paddy', 'acres': 3.0, 'season': 'kharif', 'state': 'ap'}),
                                   content_type='application/json')
        self.assertEqual(res_ins.status_code, 200)
        data_ins = res_ins.get_json()
        self.assertEqual(data_ins['total_sum_insured'], 114000.0)
        self.assertEqual(data_ins['farmer_payable_premium'], 0.0)

        # KCC Calc
        res_kcc = self.client.post('/api/calculate-kcc',
                                   data=json.dumps({'loan_amount': 100000, 'months': 12}),
                                   content_type='application/json')
        self.assertEqual(res_kcc.status_code, 200)
        data_kcc = res_kcc.get_json()
        self.assertEqual(data_kcc['net_effective_interest_rate'], '0.0%')
        print("[PASS] Insurance (₹0 Free) & 0% KCC Loan Calculation APIs verified")

    def test_15_web_portal_features_html(self):
        res = self.client.get('/')
        self.assertEqual(res.status_code, 200)
        html_str = res.data.decode('utf-8')
        
        # Check Live Stats Bar & High Visibility Text
        self.assertIn('2,050+ PACS', html_str)
        self.assertIn('50+ లక్షల మంది', html_str)
        self.assertIn('0% వడ్డీ', html_str)
        
        # Check Live Internet Search Bar in Web Portal
        self.assertIn('schemes-search-input', html_str)
        self.assertIn('internet-scheme-search-btn', html_str)
        self.assertIn('internet-quick-chip', html_str)
        
        # Check Navigation Tabs & Core Portal Sections
        self.assertIn('nav-tab-btn', html_str)
        self.assertIn('tab-chat', html_str)
        self.assertIn('tab-schemes', html_str)
        self.assertIn('tab-laws', html_str)
        self.assertIn('tab-insurance', html_str)
        self.assertIn('tab-finance', html_str)
        self.assertIn('tab-grievance', html_str)
        
        # Check Kiosk Button & Overlay are removed
        self.assertNotIn('toggle-kiosk-btn', html_str)
        self.assertNotIn('kiosk-overlay', html_str)
        print("[PASS] Full Web Portal verified with Internet Scheme Search, All 6 Main Sections & Kiosk Removed")

    def test_16_dual_search_local_and_internet(self):
        # 1. Search when local schemes exist (e.g. loan/pacs) AND external schemes match
        res = self.client.get('/api/schemes/internet-search?query=loan&lang=te')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertGreaterEqual(data['count'], 1)
        
        # 2. Search when 0 local schemes exist (e.g. tractor mechanization, polyhouse, e-nam)
        res_tractor = self.client.get('/api/schemes/internet-search?query=tractor%20subsidy&lang=en')
        self.assertEqual(res_tractor.status_code, 200)
        data_tractor = res_tractor.get_json()
        self.assertGreaterEqual(data_tractor['count'], 1)
        self.assertIn('SMAM', data_tractor['schemes'][0]['title']['en'])
        
        res_polyhouse = self.client.get('/api/schemes/internet-search?query=polyhouse%20horticulture&lang=te')
        self.assertEqual(res_polyhouse.status_code, 200)
        data_poly = res_polyhouse.get_json()
        self.assertGreaterEqual(data_poly['count'], 1)
        self.assertIn('MIDH', data_poly['schemes'][0]['title']['en'])

        # 3. Check is_internet flag
        self.assertTrue(data_tractor['schemes'][0].get('is_internet'))
        print("[PASS] Dual Search (Local Database + Live Internet Scheme Fallback) verified for multiple domains")

    def test_17_all_28_state_cm_portraits_and_data(self):
        import os
        res = self.client.get('/api/states')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        states = [s for s in data['states'] if s['id'] != 'all']
        self.assertEqual(len(states), 28)

        base_dir = os.path.dirname(os.path.abspath(__file__))
        cms_dir = os.path.join(base_dir, 'static', 'images', 'cms')

        for st in states:
            s_id = st['id']
            # CM name present
            self.assertIn('cm_name', st)
            self.assertTrue(st['cm_name'].get('te'))
            self.assertTrue(st['cm_name'].get('en'))
            self.assertTrue(st['cm_name'].get('hi'))

            # CM image file exists
            img_path = os.path.join(cms_dir, f'cm_{s_id}.jpg')
            self.assertTrue(os.path.exists(img_path), f"CM image missing for state {s_id}: {img_path}")

            # Test static image serves with HTTP 200
            img_res = self.client.get(f'/static/images/cms/cm_{s_id}.jpg')
            self.assertEqual(img_res.status_code, 200, f"Failed to serve CM image for {s_id}")

        print("[PASS] All 28 State CM portraits & trilingual metadata verified")

if __name__ == '__main__':
    unittest.main()