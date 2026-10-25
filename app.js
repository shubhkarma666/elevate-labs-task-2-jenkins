const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      message: 'Hello from Jenkins CI/CD!'
    }));
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(process.env.PORT || 3000, '0.0.0.0');
