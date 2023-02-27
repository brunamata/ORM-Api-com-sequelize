const database = require('../models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

class TurmaController {
    static async pegaTodasAsTurmas (requisicao, resposta){
        const {data_inicial, data_final} = requisicao.query;
        const where = {} //a condicao where eh um obj, por enquanto vazio

        data_inicial || data_final ? where.data_inicio = {} : null; //DI ou DF existem? entao vou criar o obj pra coluna data_inicio
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null; //se DI existe, meu where vai pegar todas as datas MAIORES QUE a data_inicial
        data_final ? where.data_inicio[Op.lte] = data_final : null; //se DF existe, meu where vai pegar todas as datas MENORES QUE DF

        //se n tiver/existir, fica tudo null e segue a vida
        
        try{
            const todoMundo = await database.Turmas.findAll( {where} ); //se tiver algum elemento dentro dele (condicao) usa, se n, n usa
            return resposta.status(200).json(todoMundo);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async pegaUmaTurma (requisicao, resposta){
        const {id} = requisicao.params;
        try{
            const umaTurma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            });
            return resposta.status(200).json(umaTurma);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async criaNovaTurma(requisicao, resposta){
        const novaTurma = requisicao.body;
        try{
            const TurmaCriada = await database.Turmas.create(novaTurma);
            return resposta.status(200).json(TurmaCriada);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async atualizaTurma(requisicao, resposta){
        const {id} = requisicao.params;
        const novasInfos = requisicao.body;
        try{
            await database.Turmas.update(novasInfos, {
                where:{
                    id: Number(id)
                }
            })
            //apenas pra retorno: 
            const turmaAtualizada = await database.Turmas.findOne({
                where: { id: Number(id)} });
            return resposta.status(200).json(turmaAtualizada);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async removeTurma(requisicao, resposta){
        const {id} = requisicao.params;
        try{
            await database.Turmas.destroy({where: {id: Number(id)}});
            return resposta.status(200).json({
                mensagem: `O id ${id} foi deletado com sucesso!`
            });
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }
}

module.exports = TurmaController;