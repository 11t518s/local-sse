const express = require('express') //express를 설치했기 때문에 가져올 수 있다.
const cors = require("cors");
const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

app.get('/sse', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // 1초마다 SSE 메시지를 보냅니다.
  const timerId = setInterval(function() {
    const data = new Date().toLocaleTimeString();
    const sseData = `data: ${data}\n\n`;
    res.write(sseData);
  }, 1000);

  // 클라이언트와 연결이 끊어지면 SSE 전송을 중단합니다.
  req.on('close', function() {
    clearInterval(timerId);
    console.log('SSE connection closed');
  });
});


app.listen(4000)
