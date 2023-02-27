// const database = require('../models');
// const Sequelize = require('sequelize');

const {PessoasServices, MatriculasServices} = require('../services');
const pessoasServices = new PessoasServices();
const matriculasServices = new MatriculasServices();

class PessoaController {
    static async pegaPessoasAtivas (requisicao, resposta){
        try{
            // const pessoasAtivas = await database.Pessoas.findAll();
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
            return resposta.status(200).json(pessoasAtivas);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async pegaTodasAsPessoas (requisicao, resposta){
        //como n eh o escopo default, eu tenho q especificar
        try{
            // const todoMundo = await database.Pessoas.scope('todoMundo').findAll();
            const todoMundo = await pessoasServices.pegaTodosRegistros();
            return resposta.status(200).json(todoMundo);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async pegaUmaPessoa (requisicao, resposta){
        const {id} = requisicao.params;
        try{
           /*  const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            }); */
            const umaPessoa = await pessoasServices.pegaUmRegistro(id);
            return resposta.status(200).json(umaPessoa);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async criaNovaPessoa(requisicao, resposta){
        const novaPessoa = requisicao.body;
        try{
            // const pessoaCriada = await database.Pessoas.create(novaPessoa);
            const pessoaCriada = await pessoasServices.criaRegistro(novaPessoa);
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
            /* await database.Pessoas.update(novasInfos, {
                where:{
                    id: Number(id)
                }
            })
            //apenas pra retorno: 
            const pessoaAtualizada = await database.Pessoas.findOne({
                where: { id: Number(id)} }); */

            
                await pessoasServices.atualizaRegistro(novasInfos, id);
                const pessoaAtualizada = await pessoasServices.pegaUmRegistro(id);
            return resposta.status(200).json(pessoaAtualizada);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async removePessoa(requisicao, resposta){
        const {id} = requisicao.params;
        try{
            // await database.Pessoas.destroy({where: {id: Number(id)}});
            await pessoasServices.apagaRegistro(id);
            return resposta.status(200).json({
                mensagem: `O id ${id} foi deletado com sucesso!`
            });
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async restauraPessoa(requisicao, resposta){
        const {id} = requisicao.params;
        try{
            /* await database.Pessoas.restore({
                where: {
                    id: Number(id)
                }
            }); */

            await pessoasServices.restauraPessoa(id);
            return resposta.status(200).json({
                mensagem: `O id ${id} foi restaurado com sucesso!`
            });
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

// --------------------------MATRICULAS-----------------------------------

    static async pegaMatriculasDoAluno(requisicao, resposta){
        const {estudante_id} = requisicao.params;
        try{
            /* const todasMatriculas = await database.Matriculas.findAll({
                where: {
                    estudante_id: Number(estudante_id)
                }
            }); */

            const todasMatriculas = await matriculasServices.pegaTodosRegistros({estudante_id: Number(estudante_id)})
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

    static async pegaMatriculasConfirmadas (requisicao, resposta){
        const {estudante_id} = requisicao.params
        try{
            const estudante = await database.Pessoas.findOne({
                where: {
                    id: Number(estudante_id)
                }
            });
            const matriculas = await estudante.getAulasMatriculadas(); //funcao para fazer essas associacoes de foreign key

            return resposta.status(200).json(matriculas);
        }
        catch (erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async pegaEContaTurmasMatriculadas(requisicao, resposta){
        const {turma_id} = requisicao.params;
        try{
            const contadorMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turma_id),
                    status: "confirmado"
                },
                limit: 20,
                order: [['turma_id', 'ASC']]
            });
            return resposta.status(200).json(contadorMatriculas);
        }
        catch(erro){
            return resposta.status(500).json(erro.message);
        }
    }

    static async pegaTurmasLotadas(requisicao, resposta){
        const turmaLotada = 2;
        //retorna turmas lotadas
        try{
            const contadorMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    status: "confirmado"
                },
                attributes: ['turma_id'], //equivale a SELECT turma_id FROM Matriculas
                group: ['turma_id'],  //todos que tiverem a mesma turma_id sendo confirmado serao agrupados
                having: Sequelize.literal(`COUNT(turma_id) >= ${turmaLotada}`) //como vai agrupar, o q fazer com os dados
            });
            return resposta.status(200).json(contadorMatriculas.count);
        }
        catch(erro){
            return resposta.status(500).json(erro.message);
        }
    }

    //Ao mudar o status de uma pessoa de Ativo para inativo, quero
    //que as matriculas referentes a esse aluno sejam automaticamente canceladas
    static async cancelaMatricula(requisicao, resposta){
        const {estudante_id} = requisicao.params;
        try{
            //            SEM O SERVICE
            /* database.sequelize.transaction(async (transacao) =>{
                await database.Pessoas.update(
                    {ativo: false},
                    {where: {id: Number(estudante_id)}},
                    {transaction: transacao}
                );
                await database.Matriculas.update(
                    {status: "cancelado"},
                    {where: {estudante_id: Number(estudante_id)}},
                    {transaction: transacao}
                );
            }) */

            await pessoasServices.cancelaPessoaEMatriculas(Number(estudante_id))
            return resposta.status(200).json({
                mensagem: `A matricula do estudante ${estudante_id} foi alterada com sucesso!`
            });
        }
        catch (erro){
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