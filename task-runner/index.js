const http = require('http');

function runTask() {
  http.get('http://localhost:3000', (req) => {
    req.setEncoding('utf8');
    req.on('data', console.log.bind(null));
  });
}

setInterval(runTask, 3000);
