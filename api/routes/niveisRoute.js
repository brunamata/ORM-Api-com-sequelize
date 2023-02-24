const {Router} = require('express');
const NivelController = require('../controllers/NivelController.js');

const router = Router();

router.get('/niveis', NivelController.pegaTodosOsNiveis);
router.get('/niveis/:id', NivelController.pegaUmNivel);
router.post('/niveis', NivelController.criaNovoNivel);
router.put('/niveis/:id', NivelController.atualizaNivel);
router.delete('/niveis/:id', NivelController.removeNivel);

module.exports = router;