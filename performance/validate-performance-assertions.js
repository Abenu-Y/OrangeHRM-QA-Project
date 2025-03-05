import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 20,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95) < 500'], // 95% of requests should complete <500ms
    http_req_duration: ['avg < 200'], // Average response time <200ms
    http_req_failed: ['rate < 0.01'], // Failure rate <1%
  },
};

export default function () {
  let payload = JSON.stringify({
    // username: 'Admin',
    // password: 'admin123',
  });

  let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  let res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', payload,{ headers });

  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response time < 500ms': (r) => r.timings.duration < 500,
    'Avg response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
