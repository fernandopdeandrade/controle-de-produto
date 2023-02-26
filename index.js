require('dotenv').config();
const express = require('express');
const mysql2 = require('mysql2');
const path = require('path');
const app = express();
const port = process.env.DB_PORT;
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const name = process.env.DB_NAME;

app.use(express.json());       //Suportar corpos codificados em JSON
app.use(express.urlencoded({     //Suportar corpos codificados por URL
  extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views/pages'));

const db = mysql2.createConnection({
  host: host,
  user: user,
  password: password,
  database: name,
});

db.connect((err) => {
  if (err) {
    console.log(`Não foi possível conectar ao banco de dados! ${err}`);
  }
  var sql = "SELECT * FROM dados_entrada";
  db.query(sql, (err, results) => {
    console.log("Conectado com sucesso ao banco de dados!", results.length);
  });
  var sql = "SELECT * FROM dados_saida";
  db.query(sql, (err, results) => {
    console.log("Conectado com sucesso ao banco de dados!", results.length);
  });
});

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/entrada', (req, res) => {
  res.render('entrada');
});

app.post('/entrada', (req, res) => {
  console.log('Cadastro de entrada realizado com sucesso!');
  let produto = req.body.produto;
  let peso = req.body.peso;
  let qualidade = req.body.qualidade;
  let data_entrada = req.body.data_entrada;
  let empresa = req.body.empresa;
  let cnpj = req.body.cnpj;
  let placa = req.body.placa;
  let motorista = req.body.motorista;

  db.query("INSERT INTO dados_entrada(produto, peso, qualidade, data_entrada, empresa, cnpj, placa, motorista) VALUES(?,?,?,?,?,?,?,?)", [produto, peso, qualidade, data_entrada, empresa, cnpj, placa, motorista], function (err, results) { });
  res.render('entrada');
});

app.get('/saida', (req, res) => {
  res.render('saida');
});

app.post('/saida', (req, res) => {
  console.log('Cadastro de saida realizado com sucesso!');
  let produto = req.body.produto;
  let peso = req.body.peso;
  let qualidade = req.body.qualidade;
  let data_saida = req.body.data_saida;
  let empresa = req.body.empresa;
  let cnpj = req.body.cnpj;
  let placa = req.body.placa;
  let motorista = req.body.motorista;

  db.query("INSERT INTO dados_saida(produto, peso, qualidade, data_saida, empresa, cnpj, placa, motorista) VALUES(?,?,?,?,?,?,?,?)", [produto, peso, qualidade, data_saida, empresa, cnpj, placa, motorista], function (err, results) { });
  res.render('saida');
});

app.get('/visualizarEntrada', (req, res) => {
  db.query("SELECT * FROM dados_entrada", function (err, results) {
    res.render('visualizarEntrada', { dados_entrada: results });
  });
});

app.get('/visualizarSaida', (req, res) => {
  db.query("SELECT * FROM dados_saida", function (err, results) {
    res.render('visualizarSaida', { dados_saida: results });
  });
});

app.get('/atualizarEntrada', (req, res) => {
  db.query("SELECT * FROM dados_entrada", function (err, results) {
    res.render('atualizarEntrada', { dados_entrada: results });
  });
});

app.post('/atualizarEntrada', (req, res) => {
  let id = req.body.id;
  let produto = req.body.produto;
  let peso = req.body.peso;
  let qualidade = req.body.qualidade;
  let data_entrada = req.body.data_entrada;
  let empresa = req.body.empresa;
  let cnpj = req.body.cnpj;
  let placa = req.body.placa;
  let motorista = req.body.motorista;

  db.query("UPDATE dados_entrada SET produto = ?, peso = ?, qualidade = ?, data_entrada = ?, empresa = ?, cnpj = ?, placa = ?, motorista = ? WHERE id = ?", [produto, peso, qualidade, data_entrada, empresa, cnpj, placa, motorista, id], function (err, results) { });
  res.redirect('/visualizarEntrada');
});

app.get('/atualizarSaida', (req, res) => {
  db.query("SELECT * FROM dados_saida", function (err, results) {
    res.render('atualizarSaida', { dados_saida: results });
  });
});

app.post('/atualizarSaida', (req, res) => {
  let id = req.body.id;
  let produto = req.body.produto;
  let peso = req.body.peso;
  let qualidade = req.body.qualidade;
  let data_saida = req.body.data_saida;
  let empresa = req.body.empresa;
  let cnpj = req.body.cnpj;
  let placa = req.body.placa;
  let motorista = req.body.motorista;

  db.query("UPDATE dados_saida SET produto = ?, peso = ?, qualidade = ?, data_saida = ?, empresa = ?, cnpj = ?, placa = ?, motorista = ? WHERE id = ?", [produto, peso, qualidade, data_saida, empresa, cnpj, placa, motorista, id], function (err, results) { });
  res.redirect('/visualizarSaida');
});

app.get('/deletarEntrada', (req, res) => {
  db.query("SELECT * FROM dados_entrada", function (err, results) {
    res.render('deletarEntrada', { dados_entrada: results });
  });
});

app.post('/deletarEntrada', (req, res) => {
  let id = req.body.id;
  db.query("DELETE FROM dados_entrada WHERE id = ?", [id], function (err, results) { });
  res.redirect('/deletarEntrada');
});

app.get('/deletarSaida', (req, res) => {
  db.query("SELECT * FROM dados_saida", function (err, results) {
    res.render('deletarSaida', { dados_saida: results });
  });
});

app.post('/deletarSaida', (req, res) => {
  let id = req.body.id;
  db.query("DELETE FROM dados_saida WHERE id = ?", [id], function (err, results) { });
  res.redirect('/deletarSaida');
});


app.listen(port, () => {
  console.log('Servidor escutando na porta://' + port)
});