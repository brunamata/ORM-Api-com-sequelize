const database = require('../models');

//Aqui entram os services gerais (que funcionam em mais de um controller)

class Services {
    constructor(nomeModelo){
        this.nomeModelo = nomeModelo;
    };

    //todos os controllers que usam findAll podem ser generalizados e substituidos
    async pegaTodosRegistros( where = {}) {
        return database[this.nomeModelo].findAll({where: {...where}});
    }

    async pegaUmRegistro(id){
        return database[this.nomeModelo].findOne({where: {id: Number(id)}});
    }

    async criaRegistro(dados){
        return database[this.nomeModelo].create(dados);
    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}){
        return database[this.nomeModelo]
        .update(dadosAtualizados, {where: {id: Number(id)}, transacao});
    }

    async atualizaRegistros(dadosAtualizados, objWhere, transacao = {}){
        return database[this.nomeModelo]
        .update(dadosAtualizados, {where: {...objWhere}}, transacao);
    }

    async apagaRegistro(id){
        return database[this.nomeModelo].destroy({where: {id: Number(id)}});
    }

}

module.exports = Services;