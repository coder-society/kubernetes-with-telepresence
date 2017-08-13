const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
  const data = {
    status: 'ok',
    time: +new Date,
    hostname: os.hostname(),
  };

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

server.listen(3000, () => {
  console.log('Echo Server listening on http://localhost:3000');
});
