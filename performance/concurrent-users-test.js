import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 },  // Ramp-up to 10 users
    { duration: '30s', target: 50 },  // Hold at 50 users
    { duration: '10s', target: 0 },   // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95) < 3000'], // 95% of requests should be <3s (allows some slowdown)
  },
};

export default function () {
  let loginPayload = JSON.stringify({
    username: 'Admin',
    password: 'admin123',
  });

  let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  let res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', loginPayload, { headers });

  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response time < 3s': (r) => r.timings.duration < 3000,
  });

  sleep(1);
}
