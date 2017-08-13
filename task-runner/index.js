const http = require('http');

function runTask() {
  const request = http.get('http://echo-server', (req) => {
    req.setEncoding('utf8');
    req.on('data', console.log.bind(null));
  });

  request.on('error', (err) => console.log(err.message));
}

setInterval(runTask, 3000);
