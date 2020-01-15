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

// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

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

app.post("/stocks/", cors(), async (req, res) => {
  var acoes = req.body.acoes;
  var novos = {};

  var saida = [];
  var lista = [];

  busca_acoes(acoes, valor => {
    lista= [...lista,valor]
    console.log(valor);
    if(lista.length>=2){
      res.send(lista)
    }
  });
  {
    console.log("isso acontece 1o");
  }

  function busca_acoes(acoes, callback) {
    var parsed;
    const saida = acoes.map(acao => {
      request(
        `http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.${acao}`,
        (err, body) => {
          var dados_da_acao = JSON.parse(body.body);
          novos = { ...parsed };
          return callback(dados_da_acao);
        }
      );

      //return lista;
    });
  }
  
});

app.get("/fetch", async (req, res, next) => {
  console.log("entrou");

  const saida = await request(
    "https://jsonplaceholder.typicode.com/todos/",
    async (err, body) => {
      let teste = [];
      const tratados = await body.body;
      const parseado = JSON.parse(tratados);

      for (var i = 0; i < parseado.length; i++) {
        var d = parseado[i];
        if (parseado[i].id >= 1 && parseado[i].id <= 5) teste.push(parseado[i]);
      }

      console.log("12");
      return res.send(teste);
      // tratados.forEach(function (element) {
      //   console.log(element.title)
      //    });
    }
  );

  //return res.send("ok");
});

//return res.send(saida);

app.post("/stocks/", cors(), async (req, res) => {
  const { acoes } = req.body;

  const opcoes = {
    url: "https://jsonplaceholder.typicode.com/todos/1",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8"
    }
  };
  try {
    // const arrayPromises = acoes.map(acao => request(opcoes, (err,res,body) =>{
    //   console.log(body)
    //   return body;
    // }));
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    const headers = {
      "Content-Type": "application/json",
      client_id: "1001125",
      client_secret: "876JHG76UKFJYGVHf867rFUTFGHCJ8JHV"
    };

    // const resposta = await fetch(url, { method: "GET", headers: headers })
    //   .then(res => {
    //      console.res.json();
    //   })
    //   .then(json => {
    //     console.log(json);
    //     //return res.send(json)
    //   });

    // const arrayPromises = acoes.map(acao => fetch('https://jsonplaceholder.typicode.com/todos/1')
    // .then(body => console.log(body))
    // .then(res => res.text()))
    // const resolvedPromises = await Promise.all(arrayPromises);
    // const saida = resolvedPromises.map(async p => await p.json());
    return res.send("saida");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`hello Server, estou ouvindo na porta ${port}`);
});

// req.query: directly access the parsed query string parameters
// req.params: directly access the parsed route parameters from the path
