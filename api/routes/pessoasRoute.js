const {Router} = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router.get('/pessoas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
router.post('/pessoas', PessoaController.criaNovaPessoa);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.delete('/pessoas/:id', PessoaController.removePessoa);

router.get('/pessoas/:estudante_id/matriculas', PessoaController.pegaMatriculasDoAluno);
router.get('/pessoas/:estudante_id/matriculas/:matricula_id', PessoaController.pegaUmaMatricula);
router.post('/pessoas/:estudante_id/matriculas', PessoaController.criaNovaMatricula);
router.put('/pessoas/:estudante_id/matriculas/:matricula_id', PessoaController.atualizaMatricula);
router.delete('/pessoas/:estudante_id/matriculas/:matricula_id', PessoaController.removeMatricula);

module.exports = router;