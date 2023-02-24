const database = require('../models');

class TurmaController {
    static async pegaTodasAsTurmas (requisicao, resposta){
        try{
            const todoMundo = await database.Turmas.findAll();
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