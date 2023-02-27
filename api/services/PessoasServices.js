const Services = require('./Services');
const database = require('../models');

//Aqui entram os métodos exclusivos a este modelo
class PessoasServices extends Services {
    constructor(){
        super('Pessoas')
        this.matriculas = new Services('Matriculas');
    }

    async pegaRegistrosAtivos(objWhere = {}){
        return database[this.nomeModelo].findAll({where: {...objWhere}});
    }

    async pegaTodosRegistros(objWhere = {}){
        return database[this.nomeModelo].scope('todoMundo')
        .findAll({where: {...objWhere}});
    }

    async cancelaPessoaEMatriculas(estudante_id){
        return database.sequelize.transaction(async transacao =>{
            await super.atualizaRegistro({ativo: false}, estudante_id,
                {transaction: transacao});
            await this.matriculas.atualizaRegistros({status: 'cancelado'},
            {estudante_id: estudante_id}, {transaction: transacao});
        })
    }

    async restauraPessoa(id){
        return database[this.nomeModelo].restore({where: {
            id: Number(id)
        }});
    }
}

module.exports = PessoasServices;