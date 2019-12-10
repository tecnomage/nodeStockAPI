//const http = require('http');
const fetch = require('node-fetch')
const request = require('request')
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

app.get("/",(req,res,next)=>{
  res.json(["teste","de", "acesso"]);
})


app.get("/acao", async (req, res, next)=>{
  console.log('entrou')
  request('https://jsonplaceholder.typicode.com/todos',(err, body)=>{
    res.json(body)
    //console.log(JSON(body))
  })
  
})


app.get('/stock/:acao', async (req, res, next)=>{
  console.log('entrou2')
  var acao = req.params.acao
  //res.json(acao)
  //console.log(acao)
  // //console.log(acao)
  request(`http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.${acao}`,(err, body)=>{
    res.json(body)
    //console.log(res.json(body))
  })
})


app.get('/st/:acao', async (req, res, next)=>{
  console.log('entrou3')
  
  request(`http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.${acao}`,(err, body)=>{
    res.json(body)
    //console.log(JSON(body))
  })
})
