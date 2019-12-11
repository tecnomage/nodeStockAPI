//const http = require('http');
const fetch = require('node-fetch')
const request = require('request')
var express = require('express')
var app = express();


app.listen(3000, ()=> {
  
  console.log(JSON.stringify({x:1 , n:45 , teste: 'ok'}))
  console.log("hello")})

app.get("/",(req,res,next)=>{
  res.json(["teste","de", "acesso"]);
})


app.get("/acao", async (req, res, next)=>{
  console.log('entrou')
  request('https://jsonplaceholder.typicode.com/todos',(err, body)=>{
    res.json(body)
    
  })
  
})


//TODO o front deve passar uma listagem com os codigos das acoes que irei listar
app.get('/stock/:acao', async (req, res, next)=>{
  console.log('entrou2')
  var acao = req.params.acao
  let parsed = {}
  request(`http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.${acao}`,(err, body)=>{
   var valor = body.body
   //res.json(body.body)
   parsed = JSON.parse(valor)
   res.json(parsed)
   
   
   //console.log(res.json(body.filter(n => n === statusCode)))
    //console.log(res.json(body))
  })
})


app.get('/st/:acao', async (req, res, next)=>{
  console.log('entrou3')
  
  request(`http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.${acao}`,(err, body)=>{
    //res.json(body)
  //  console.log(JSON.stringify({x:1 , n:45 , teste: 'ok'}))
    //console.log(JSON.stringify(res.json(body)))
    
  })
})


// req.query: directly access the parsed query string parameters
// req.params: directly access the parsed route parameters from the path