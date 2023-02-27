const Services = require('./Services');

//Aqui entram os métodos exclusivos a este modelo
class TurmasServices extends Services {
    constructor(){
        super('Turmas')
    }
}

module.exports = TurmasServices;