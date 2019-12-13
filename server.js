//const http = require('http');
const fetch = require('node-fetch')
const request = require('request')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const port = 8282

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// var corsOptions = {
  //   origin: 'http://example.com',
  //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  // }
  
 //app.use(cors);

 app.get("/",(req,res,next)=>{
  res.json(["teste","de", "acesso"]);
})


app.get("/acao", cors() ,async (req, res, next)=>{
  console.log('entrou')
  request('https://jsonplaceholder.typicode.com/todos',(err, body)=>{
    //console.log(body.body)
     return res.json(body.body)
    //return res.send({todo:[12,3,4,5,6,7,8,9]})
    
  })
  
})


//TODO o front deve passar uma listagem com os codigos das acoes que irei listar
app.get('/stock/:acao',cors(), async (req, res, next)=>{
  console.log('entrou2')
  var acao = req.params.acao
  let parsed = {}
  console.log(acao)
  request(`http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.${acao}`,(err, body)=>{
   var valor = body.body
   //res.json(body.body)
   parsed = JSON.parse(valor)
   return res.json(body.body)
   
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

app.listen(port, ()=> {
  console.log('hello Server, estou ouvindo na porta 3000')
})

 

// req.query: directly access the parsed query string parameters
// req.params: directly access the parsed route parameters from the path