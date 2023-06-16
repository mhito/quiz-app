const express = require('express');
const router = express.Router();
const corridaController = require('../controllers/corridaController');

// Ruta POST para crear una nueva Corrida
router.post('/', corridaController.createCorrida);

// Ruta PUT para actualizar una Corrida por su ID
router.put('/:id', corridaController.updateCorrida);

// Ruta GET para obtener todas las Corridas mayores a 30 minutos de la hora actual
router.get('/', corridaController.getCorridas);

// Ruta DELETE para eliminar una Corrida por su ID
router.delete('/:id', corridaController.deleteCorrida);

module.exports = router;

