import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // Simulate 10 virtual users
  duration: '30s', // Test runs for 30 seconds
  thresholds: {
    http_req_duration: ['p(95) < 2000'], // 95% of requests should complete in under 2s
  },
};

export default function () {
  let loginPayload = JSON.stringify({
    username: 'Admin',
    password: 'admin123',
  });

  let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  let res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', loginPayload, {  headers });

  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response time < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(1); // Pause for 1s before the next iteration
}
