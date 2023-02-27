const { pegaMatriculasDoAluno } = require('../controllers/PessoaController');
const Services = require('./Services');

//Aqui entram os métodos exclusivos a este modelo
class MatriculasServices extends Services {
    constructor(){
        super('Matriculas')
    }
}


module.exports = MatriculasServices;