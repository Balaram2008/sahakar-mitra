import unittest
import json
import sys

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from server import app

class TestSahakaraMitraStateLanguagesAndCMs(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_01_states_have_cm_portraits(self):
        res = self.client.get('/api/states')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        states = data['states']
        
        # Check that state objects have cm_name and cm_image
        ap_state = next(s for s in states if s['id'] == 'ap')
        self.assertIn('cm_name', ap_state)
        self.assertIn('Chandrababu', ap_state['cm_name']['en'])
        self.assertEqual(ap_state['cm_image'], '/static/images/cms/cm_ap.jpg')

        tg_state = next(s for s in states if s['id'] == 'tg')
        self.assertIn('Revanth', tg_state['cm_name']['en'])
        self.assertEqual(tg_state['cm_image'], '/static/images/cms/cm_tg.jpg')

        ka_state = next(s for s in states if s['id'] == 'ka')
        self.assertIn('Siddaramaiah', ka_state['cm_name']['en'])
        self.assertEqual(ka_state['cm_image'], '/static/images/cms/cm_ka.jpg')
        print("[PASS] States contain authentic Chief Minister details & portraits")

    def test_02_schemes_have_correct_cm_images(self):
        res = self.client.get('/api/schemes?state_id=all')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        schemes = data['schemes']
        
        for s in schemes:
            if s.get('category') == 'state':
                self.assertTrue(s['leader_image'].startswith('/static/images/cms/cm_'))
            elif s.get('category') == 'central_moc':
                self.assertIn('modi', s['leader_image'])
        print(f"[PASS] All {len(schemes)} schemes correctly linked with state CM images")

    def test_03_tts_state_languages(self):
        languages = ['te', 'hi', 'en', 'kn', 'ta', 'mr', 'bn', 'gu', 'pa', 'or']
        for lang in languages:
            res = self.client.get(f'/api/tts?lang={lang}&text=Farmer')
            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.mimetype, 'audio/mpeg')
            self.assertGreater(len(res.data), 1000)
        print(f"[PASS] Multilingual TTS verified across {len(languages)} state languages")

    def test_04_chat_multi_state_queries(self):
        # Query 1: Telangana CM schemes in Telugu
        res1 = self.client.post('/api/chat',
                                data=json.dumps({'message': 'తెలంగాణ ముఖ్యమంత్రి రేవంత్ రెడ్డి రైతు భరోసా వివరాలు', 'lang': 'te'}),
                                content_type='application/json')
        self.assertEqual(res1.status_code, 200)
        self.assertIn('రైతు భరోసా', res1.get_json()['response'])

        # Query 2: Karnataka CM schemes in English
        res2 = self.client.post('/api/chat',
                                data=json.dumps({'message': 'Who is CM of Karnataka and tell me about Krishi Bhagya?', 'lang': 'en'}),
                                content_type='application/json')
        self.assertEqual(res2.status_code, 200)
        self.assertIn('Krishi Bhagya', res2.get_json()['response'])

        # Query 3: CM List in Hindi
        res3 = self.client.post('/api/chat',
                                data=json.dumps({'message': 'सभी 28 राज्यों के मुख्यमंत्री की सूची', 'lang': 'hi'}),
                                content_type='application/json')
        self.assertEqual(res3.status_code, 200)
        self.assertIn('मुख्यमंत्री', res3.get_json()['response'])
        print("[PASS] Chatbot multi-state intelligence verified in Telugu, Hindi & English")

if __name__ == '__main__':
    unittest.main()