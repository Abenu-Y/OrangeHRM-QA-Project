import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Load user credentials from external JSON file
const users = new SharedArray('users', function () {
  return JSON.parse(open('./users.json'));
});

export let options = {
  vus: users.length, 
  duration: '1m', 
  iterations: users.length,
  thresholds: {
    http_req_duration: ['p(95) < 2000'], // 95% of requests should complete in <2s
    http_req_failed: ['rate < 0.01'], // Failure rate should be <1%
  },
};

export default function () {
  let user = users[__ITER];

  let payload = { username: user.username, password: user.password};
  let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  let res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', payload, { headers });


  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response time < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}
