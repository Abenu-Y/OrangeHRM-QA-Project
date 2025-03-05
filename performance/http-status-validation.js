import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  let validPayload = JSON.stringify({
    username: 'Admin',
    password: 'admin123',
  });

  let invalidPayload = JSON.stringify({
    username: 'InvalidUser',
    password: 'WrongPass',
  });

  let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  let validRes = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', validPayload, { headers });
  check(validRes, {
    'Valid login - Status 200': (r) => r.status === 200,
  });

  let invalidRes = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', invalidPayload, params);
  check(invalidRes, {
    'Invalid login - Status 401': (r) => r.status === 401,
  });

  sleep(1);
}
