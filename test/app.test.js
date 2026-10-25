const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');

test('health endpoint returns status ok', async () => {
  const port = 4100 + Math.floor(Math.random() * 1000);

  const app = spawn(process.execPath, ['app.js'], {
    env: { ...process.env, PORT: String(port) },
    stdio: 'ignore'
  });

  try {
    let response;

    for (let i = 0; i < 30; i++) {
      try {
        response = await fetch(`http://127.0.0.1:${port}/health`);
        break;
      } catch {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    assert.ok(response, 'Application did not start');
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok' });
  } finally {
    app.kill();
  }
});
