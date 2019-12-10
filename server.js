const http = require('http');

var express = require('express')
var app = express();

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

app.listen(3000, ()=> console.log("hello"))

app.get("/acao",(req, res, next)=>{
  res.json(["maria","tony", "rosana"]);

})

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


//https://www.notion.so/cotacao-em-tempo-Real-0e9627ca8b2346938c369b8eb26526fb