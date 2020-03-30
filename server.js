//const http = require('http');
const fetch = require("node-fetch");
const axios = require("axios");
const request = require("request");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8282;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//app.use(express.bodyParser());

const whiteList = [
  "http://localhost:3000/",
  "http://127.0.0.1",
  "http://localhost/",
  "http://localhost:3000/teste/"
];

var corsOptions = {
  origin: function(origin, callback) {
    if (whiteList.indexOf(origin) == -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());

app.get("/", (req, res, next) => {
  res.json(["teste", "de", "acesso"]);
});

app.get("/acao", async (req, res, next) => {
  console.log("entrou");
  request("https://jsonplaceholder.typicode.com/todos", (err, body) => {
    //console.log(body.body)
    return res.json(body.body);
    //return res.send({todo:[12,3,4,5,6,7,8,9]})
  });
});

app.post("/stocks/", cors(corsOptions), async (req, res) => {
  //var acoes = req.body.acoes;
  var acoes = "goau4";
  var novos = {};

  //console.log(acoes);
  var saida = [];
  var lista = [];

  //var resposta = resposta_do_servidor(acoes, busca_acao);
  var resposta = busca_acao("petr4");
  res.send(resposta);
  
  //TODO Rename this function
  async function resposta_do_servidor(acoes, cb) {
    let cotacoes = [];
    //FIXME1 FICA RESOLVE REJECT MESMO?
    //https://stackoverflow.com/questions/42964102/syntax-for-async-arrow-function
    cotacoes = acoes.map( async () => {
      let resultado;
      let promise = new Promise(async (resolve, reject) => {
        var listagem_dados_acao = await cb(acoes);
        //colocar um if para chegar se tem dados
        resolve(listagem_dados_acao);
        //return retorno;
      });
      resultado =  await promise;
      //funcao eh async devo colocar um resolve aqui?
      return resultado;
      
    });
    return cotacoes;
  }

  async function busca_acao(acao) {
    let promise = new Promise((resolve, reject) => {
      request(
        `http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.${acao}`,
        (err, body) => {
          let parsed;
          let dados_da_acao = body.body;

          parsed = JSON.parse(dados_da_acao);

          resolve(parsed);
        }
      );
    });
    let resultado = await promise;
    //console.log(resultado)
    return resultado;
  }

  async function busca_acoes(acoes) {
    var parsed;
    var dados_acoes = [];
    //TODO O ERRO ESTÁ AQUI map of undefined
    if (Object.entries(acoes) && acoes) {
      const saida = await acoes.map(acao => {
        request(
          `http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.${acao}`,
          (err, body) => {
            var dados_da_acao = JSON.parse(body.body);
            return dados_acoes;
          }
        );
        //if acoes.length retorna a lista
        return dados_acoes;
      });
    }
  }
});

//TODO o front deve passar uma listagem com os codigos das acoes que irei listar
app.get("/stock/:acao", cors(), async (req, res, next) => {
  console.log("entrou2");
  var acao = req.params.acao;
  let parsed = {};
  console.log(acao);
  request(
    `http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.${acao}`,
    (err, body) => {
      var dados_da_acao = body.body;
      //res.json(body.body)
      parsed = JSON.parse(dados_da_acao);
      return res.json(body.body);
    }
  );
});

app.get("/stock/:acao", cors(), async (req, res, next) => {
  console.log("entrou2");
  var acao = req.params.acao;
  console.log(acao);
  let parsed = {};
  console.log(acao);
  request(
    `http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.${acao}`,
    (err, body) => {
      var dados_da_acao = body.body;
      //res.json(body.body)
      parsed = JSON.parse(dados_da_acao);
      return res.json(body.body);
    }
  );
});

app.get("/fetch", async (req, res, next) => {
  console.log("entrou");
  try {
    fetch("https://jsonplaceholder.typicode.com/todos/").then(res => {
      return res.send("ok");
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`hello Server, estou ouvindo na porta ${port}`);
});

// req.query: directly access the parsed query string parameters
// req.params: directly access the parsed route parameters from the path
