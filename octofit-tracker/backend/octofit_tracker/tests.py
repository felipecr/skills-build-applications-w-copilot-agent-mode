from django.test import SimpleTestCase
from django.urls import reverse


class ApiRootTests(SimpleTestCase):
    def test_api_root_lists_expected_endpoints(self):
        response = self.client.get(reverse('api-root'))

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('users', data)
        self.assertIn('teams', data)
        self.assertIn('activities', data)
        self.assertIn('leaderboard', data)
        self.assertIn('workouts', data)
