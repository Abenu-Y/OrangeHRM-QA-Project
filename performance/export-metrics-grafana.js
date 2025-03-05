import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
  ext: {
    influxdb: {
      addr: 'http://localhost:8086', // Change to your InfluxDB URL
      database: 'k6_metrics',
      tags: { test: 'loginPerformance' },
    },
  },
};

export default function () {
  let payload = JSON.stringify({
    username: 'Admin',
    password: 'admin123',
  });

  let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  let res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', payload, {headers});

  check(res, {
    'Status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
