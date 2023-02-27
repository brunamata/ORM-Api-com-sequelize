const Services = require('./Services');

//Aqui entram os métodos exclusivos a este modelo
class NiveisServices extends Services {
    constructor(){
        super('Niveis')
    }
}

module.exports = NiveisServices;