const {Router} = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas); //por default, quando eu pedir pessoas, eu so quero ver as ativas
router.get('/pessoas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
router.get('/pessoas/:estudante_id/matriculas-confirmadas', PessoaController.pegaMatriculasConfirmadas);
router.post('/pessoas', PessoaController.criaNovaPessoa);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.delete('/pessoas/:id', PessoaController.removePessoa);
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa);

router.get('/pessoas/:estudante_id/matriculas', PessoaController.pegaMatriculasDoAluno);
router.get('/pessoas/:estudante_id/matriculas/:matricula_id', PessoaController.pegaUmaMatricula);
router.get('/pessoas/matriculas/:turma_id/confirmadas', PessoaController.pegaEContaTurmasMatriculadas);
router.get('/pessoas/matriculas/lotacao', PessoaController.pegaTurmasLotadas);
router.post('/pessoas/:estudante_id/matriculas/cancela', PessoaController.cancelaMatricula);
router.post('/pessoas/:estudante_id/matriculas', PessoaController.criaNovaMatricula);
router.put('/pessoas/:estudante_id/matriculas/:matricula_id', PessoaController.atualizaMatricula);
router.delete('/pessoas/:estudante_id/matriculas/:matricula_id', PessoaController.removeMatricula);

module.exports = router;