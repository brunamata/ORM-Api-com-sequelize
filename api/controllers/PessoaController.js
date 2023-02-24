const database = require('../models');

class PessoaController {
    static async pegaTodasAsPessoas (requisicao, resposta){
        try{
            const todoMundo = await database.Pessoas.findAll();
            return resposta.status(200).json(todoMundo);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async pegaUmaPessoa (requisicao, resposta){
        const {id} = requisicao.params;
        try{
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            });
            return resposta.status(200).json(umaPessoa);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async criaNovaPessoa(requisicao, resposta){
        const novaPessoa = requisicao.body;
        try{
            const pessoaCriada = await database.Pessoas.create(novaPessoa);
            return resposta.status(200).json(pessoaCriada);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async atualizaPessoa(requisicao, resposta){
        const {id} = requisicao.params;
        const novasInfos = requisicao.body;
        try{
            await database.Pessoas.update(novasInfos, {
                where:{
                    id: Number(id)
                }
            })
            //apenas pra retorno: 
            const pessoaAtualizada = await database.Pessoas.findOne({
                where: { id: Number(id)} });
            return resposta.status(200).json(pessoaAtualizada);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async removePessoa(requisicao, resposta){
        const {id} = requisicao.params;
        try{
            await database.Pessoas.destroy({where: {id: Number(id)}});
            return resposta.status(200).json({
                mensagem: `O id ${id} foi deletado com sucesso!`
            });
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async pegaMatriculasDoAluno(requisicao, resposta){
        const {estudante_id} = requisicao.params;
        try{
            const todasMatriculas = await database.Matriculas.findAll({
                where: {
                    estudante_id: Number(estudante_id)
                }
            });
            return resposta.status(200).json(todasMatriculas);
        }
        catch(erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async pegaUmaMatricula(requisicao, resposta){
        const {estudante_id, matricula_id} = requisicao.params;
        try{
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matricula_id),
                    estudante_id: Number(estudante_id)
                }
            });
            return resposta.status(200).json(umaMatricula);
        }
        catch(erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async criaNovaMatricula(requisicao, resposta){
        const {estudante_id} = requisicao.params;
        const novaMatricula = {
            ...requisicao.body,
            estudante_id: Number(estudante_id)
        };
        try{
            const matriculaCriada = await database.Matriculas.create(novaMatricula);
            return resposta.status(200).json(matriculaCriada);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async atualizaMatricula(requisicao, resposta){
        const {estudante_id, matricula_id} = requisicao.params;
        const novasInfos = requisicao.body;
        try{
            await database.Matriculas.update(novasInfos, {
                where:{
                    id: Number(matricula_id),
                    estudante_id: Number(estudante_id)
                }
            })
            //apenas pra retorno: 
            const matriculaaAtualizada = await database.Matriculas.findOne({
                where: { id: Number(matricula_id)} });
            return resposta.status(200).json(matriculaaAtualizada);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async removeMatricula(requisicao, resposta){
        const {estudante_id, matricula_id} = requisicao.params;
        try{
            await database.Matriculas.destroy({where: {
                id: Number(matricula_id)
            }});
            return resposta.status(200).json({
                mensagem: `O id ${matricula_id} foi deletado com sucesso!`
            });
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }
    
}

module.exports = PessoaController;