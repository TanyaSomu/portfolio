const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');

// Simple integration test for endpoints
const BASE_URL = 'http://localhost:5000/api';

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    }).on('error', reject);
  });
}

function post(path, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = http.request(
      `${BASE_URL}${path}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

test('PERN Portfolio API Integration Suite', async (t) => {
  await t.test('GET /health returns healthy status', async () => {
    const res = await get('/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, 'healthy');
  });

  await t.test('GET /profile returns profile structure', async () => {
    const res = await get('/profile');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.profile);
  });

  await t.test('GET /resume returns availability metadata', async () => {
    const res = await get('/resume');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
  });

  await t.test('POST /contact rejects invalid email format with 400', async () => {
    const res = await post('/contact', {
      name: 'Tester',
      email: 'not-an-email',
      subject: 'Test Subject',
      message: 'This is a test message with enough length.',
    });
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.success, false);
  });
});

