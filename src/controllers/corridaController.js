const { createCorridaInDB, updateCorridaInDB, getCorridasFromDB } = require('../service/corridaService');

// Controlador para crear una nueva Corrida
const createCorrida = async (req, res) => {
  try {
    const { fecha } = req.body;
    if(!fecha) return res.status(400).json({ error: 'La fecha es requerida' });
    
    const corrida = await createCorridaInDB({ fecha });
    res.status(201).json(corrida);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la Corrida' });
  }
};

// Controlador para actualizar una Corrida por su ID
const updateCorrida = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, active } = req.body;
    await updateCorridaInDB({ id, fecha, active });
    res.json({ message: 'Corrida actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la Corrida' });
  }
};

// Controlador para obtener todas las Corridas mayores a 30 minutos de la hora actual
const getCorridas = async (req, res) => {
  try {
    const corridas = await getCorridasFromDB();
    res.json(corridas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las Corridas' });
  }
};

// Controlador para eliminar una Corrida por su ID
const deleteCorrida = async (req, res) => {
  try {
    const { id } = req.params;
    await Corrida.findByIdAndDelete(id);
    res.json({ message: 'Corrida eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la Corrida' });
  }
};

module.exports = {
  createCorrida,
  updateCorrida,
  getCorridas,
  deleteCorrida
};

