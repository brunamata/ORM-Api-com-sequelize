const express = require('express');
const routes = require('./routes');

const app = express();

/* 
//use => avisar q vai ter biblioteca ajudando nas requisicoes
//converter o corpo pra json
app.use(bodyParser.json());
 */

//numero padrao pro http
const porta = 3000; 
routes(app);

/* 
//1 - string com a porta, 2 - funcao callback
//reposta que ele vai devolver eh 200, junto com o send (pode ser array ou obj)
app.get('/teste', (requisicao, resposta) => resposta.status(200).send({
    mensagem: 'boas-vindas à api!'
}))
 */

//ficar ouvindo se ta tudo ok
app.listen(porta, () => console.log(`serivdor está rodando na porta ${porta}`));

module.exports = app;
