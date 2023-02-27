// const database = require('../models');
const Services = require('../services/Services');
const niveisServices = new Services('Niveis');

class NivelController {
    static async pegaTodosOsNiveis (requisicao, resposta){
        try{
            // const todosNiveis = await database.Niveis.findAll();
            const todosNiveis = await niveisServices.pegaTodosRegistros();
            return resposta.status(200).json(todosNiveis);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async pegaUmNivel (requisicao, resposta){
        const {id} = requisicao.params;
        try{
            const umNivel = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            });
            return resposta.status(200).json(umNivel);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async criaNovoNivel(requisicao, resposta){
        const novoNivel = requisicao.body;
        try{
            const nivelCriado = await database.Niveis.create(novoNivel);
            return resposta.status(200).json(nivelCriado);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async atualizaNivel(requisicao, resposta){
        const {id} = requisicao.params;
        const novasInfos = requisicao.body;
        try{
            await database.Niveis.update(novasInfos, {
                where:{
                    id: Number(id)
                }
            })
            //apenas pra retorno: 
            const nivelAtualizado = await database.Niveis.findOne({
                where: { id: Number(id)} });
            return resposta.status(200).json(nivelAtualizado);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async removeNivel(requisicao, resposta){
        const {id} = requisicao.params;
        try{
            await database.Niveis.destroy({where: {id: Number(id)}});
            return resposta.status(200).json({
                mensagem: `O id ${id} foi deletado com sucesso!`
            });
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }
}

module.exports = NivelController;