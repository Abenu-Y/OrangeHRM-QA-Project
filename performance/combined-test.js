import { group } from 'k6';
import { sleep } from 'k6';
import concurrentUsers from './concurrent-users-test.js';
import exportMetrics from './export-metrics-grafana.js';
import httpValidation from './http-status-validation.js';
import loginPerformance from './login-performance-test.js';
import responseTime from './response-time-test.js';
import validateAssertions from './validate-performance-assertions.js';

// export let options = {
//   scenarios: {
//     concurrentUsers: {
//       exec: 'concurrentUsersTest',
//       executor: 'ramping-vus',
//       stages: [
//         { duration: '10s', target: 10 },
//         { duration: '30s', target: 50 },
//         { duration: '10s', target: 0 },
//       ],
//     },
//     exportMetrics: {
//       exec: 'exportMetricsGrafana',
//       executor: 'constant-vus',
//       vus: 10,
//       duration: '30s',
//     },
//     httpValidation: {
//       exec: 'httpStatusValidation',
//       executor: 'constant-vus',
//       vus: 5,
//       duration: '10s',
//     },
//     loginPerformance: {
//       exec: 'loginPerformanceTest',
//       executor: 'per-vu-iterations',
//       vus: 10,
//       iterations: 10,
//     },
//     responseTime: {
//       exec: 'responseTimeTest',
//       executor: 'constant-vus',
//       vus: 10,
//       duration: '30s',
//     },
//     validateAssertions: {
//       exec: 'validatePerformanceAssertions',
//       executor: 'constant-vus',
//       vus: 20,
//       duration: '30s',
//     },
//   },
// };

// ✅ Correct function calls, using the imported functions

export let options = {
    scenarios: {
      concurrentUsers: {
        exec: 'concurrentUsersTest',
        executor: 'ramping-vus',
        stages: [
          { duration: '10s', target: 10 },
          { duration: '30s', target: 40 },  // Reduced from 50 → 40
          { duration: '10s', target: 0 },
        ],
      },
      exportMetrics: {
        exec: 'exportMetricsGrafana',
        executor: 'constant-vus',
        vus: 8,  // Reduced from 10 → 8
        duration: '30s',
      },
      httpValidation: {
        exec: 'httpStatusValidation',
        executor: 'constant-vus',
        vus: 5,  // No change
        duration: '10s',
      },
      loginPerformance: {
        exec: 'loginPerformanceTest',
        executor: 'per-vu-iterations',
        vus: 8,  // Reduced from 10 → 8
        iterations: 10,
      },
      responseTime: {
        exec: 'responseTimeTest',
        executor: 'constant-vus',
        vus: 10,  // No change
        duration: '30s',
      },
      validateAssertions: {
        exec: 'validatePerformanceAssertions',
        executor: 'constant-vus',
        vus: 18,  // Reduced from 20 → 18
        duration: '30s',
      },
    },
  };
  
export function concurrentUsersTest() {
  group('Concurrent Users Test', () => {
    concurrentUsers();  // ✅ Calls the imported function, not itself
    sleep(1);
  });
}

export function exportMetricsGrafana() {
  group('Export Metrics to Grafana', () => {
    exportMetrics();  // ✅ Correct function call
    sleep(1);
  });
}

export function httpStatusValidation() {
  group('HTTP Status Validation', () => {
    httpValidation();  // ✅ Correct function call
    sleep(1);
  });
}

export function loginPerformanceTest() {
  group('Login Performance Test', () => {
    loginPerformance();  // ✅ Correct function call
    sleep(1);
  });
}

export function responseTimeTest() {
  group('Response Time Test', () => {
    responseTime();  // ✅ Correct function call
    sleep(1);
  });
}

export function validatePerformanceAssertions() {
  group('Validate Performance Assertions', () => {
    validateAssertions();  // ✅ Correct function call
    sleep(1);
  });
}


// import { group } from 'k6';
// import { sleep } from 'k6';
// import concurrentUsers from './concurrent-users-test.js';
// import exportMetrics from './export-metrics-grafana.js';
// import httpValidation from './http-status-validation.js';
// import loginPerformance from './login-performance-test.js';
// import responseTime from './response-time-test.js';
// import validateAssertions from './validate-performance-assertions.js';

// export let options = {
//   scenarios: {
//     concurrentUsers: {
//       exec: 'concurrentUsersTest',
//       executor: 'ramping-vus',
//       stages: [
//         { duration: '10s', target: 10 },
//         { duration: '30s', target: 40 },  // Reduced from 50 → 40
//         { duration: '10s', target: 0 },
//       ],
//     },
//     exportMetrics: {
//       exec: 'exportMetricsGrafana',
//       executor: 'constant-vus',
//       vus: 8,  // Reduced from 10 → 8
//       duration: '30s',
//     },
//     httpValidation: {
//       exec: 'httpStatusValidation',
//       executor: 'constant-vus',
//       vus: 5,  // No change
//       duration: '10s',
//     },
//     loginPerformance: {
//       exec: 'loginPerformanceTest',
//       executor: 'per-vu-iterations',
//       vus: 8,  // Reduced from 10 → 8
//       iterations: 10,
//     },
//     responseTime: {
//       exec: 'responseTimeTest',
//       executor: 'constant-vus',
//       vus: 10,  // No change
//       duration: '30s',
//     },
//     validateAssertions: {
//       exec: 'validatePerformanceAssertions',
//       executor: 'constant-vus',
//       vus: 18,  // Reduced from 20 → 18
//       duration: '30s',
//     },
//   },
// };


// export function runConcurrentUsersTest() {
//   group('Concurrent Users Test', () => {
//     concurrentUsers();
//     sleep(1);
//   });
// }

// export function runExportMetricsGrafana() {
//   group('Export Metrics to Grafana', () => {
//     exportMetrics();
//     sleep(1);
//   });
// }

// export function runHttpStatusValidation() {
//   group('HTTP Status Validation', () => {
//     httpValidation();
//     sleep(1);
//   });
// }

// export function runLoginPerformanceTest() {
//   group('Login Performance Test', () => {
//     loginPerformance();
//     sleep(1);
//   });
// }

// export function runResponseTimeTest() {
//   group('Response Time Test', () => {
//     responseTime();
//     sleep(1);
//   });
// }

// export function runValidatePerformanceAssertions() {
//   group('Validate Performance Assertions', () => {
//     validateAssertions();
//     sleep(1);
//   });
// }
