const Corrida = require('../models/corridaModel');

const createCorridaInDB = async (corridaData) => {
    corridaData.active = true;
    const corrida = new Corrida(corridaData);
    await corrida.save();
    return corrida;
}

const updateCorridaInDB = async (corridaData) => {
    const corrida = await Corrida.findByIdAndUpdate(corridaData.id, { fecha: corridaData.fecha, active: corridaData.active }, { new: true });
    return corrida;
}

const getCorridasFromDB = async () => {
    const currentDate = new Date();
    const thirtyMinutesAgo = new Date(currentDate.getTime() - 30 * 60000);
    const corridas = await Corrida.find({ fecha: { $gt: thirtyMinutesAgo }, active: true });
    return corridas;
}

const deleteCorridaInDB = async (corridaId) => {
    await Corrida.findByIdAndDelete(corridaId);
    return true;
}



module.exports = {
    createCorridaInDB,
    updateCorridaInDB,
    getCorridasFromDB,
    deleteCorridaInDB
};