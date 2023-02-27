const PessoasServices = require('./PessoasServices');
const TurmasServices = require('./TurmasServices');
const NiveisServices = require('./NiveisServices');
const MatriculasServices = require('./MatriculasServices');

//Esse arquivo eh o ponto de entrada, recebe todos os services
// e exporta de uma vez, a gente so usa ele pra importar
// n precisa ficar chamando PessoasServices, etc

module.exports = {
    PessoasServices: PessoasServices,
    TurmasServices: TurmasServices,
    NiveisServices: NiveisServices,
    MatriculasServices: MatriculasServices
};
