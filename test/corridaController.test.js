const assert = require('assert');
const corridaService = require('../src/service/corridaService');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

describe('Pruebas unitarias del corridaController', () => {

    before(() => {

        const mongoHost = process.env.MONGO_HOST || 'localhost';
        const mongoPort = process.env.MONGO_PORT || '27017';

        // Conexión a la base de datos
        mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/ado`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

            .then(() => {
                console.log('Conexión exitosa a la base de datos');
            })
            .catch((error) => {
                console.error('Error al conectar a la base de datos:', error);
            });

    });

    after(async () => {
        // app.close();
        process.exit();
    });

    // Prueba de la función createCorrida
    it('Debería crear una corrida', async () => {
        // Crea un objeto de prueba con los datos necesarios
        const date = new Date('2023-06-16T10:30:00.000Z');
        const corridaData = {
            fecha: date,
            active: true
        };

        // Llama a la función createCorrida
        const nuevaCorrida = await corridaService.createCorridaInDB(corridaData);
        

        // Realiza las aserciones correspondientes
        assert.strictEqual(nuevaCorrida.fecha, corridaData.fecha);
        assert.strictEqual(nuevaCorrida.active, corridaData.active);
    });

    // Prueba de la función updateCorrida
    it('Debería actualizar una corrida', async () => {
        // Crea un objeto de prueba con los datos necesarios
        const newDate = new Date();
        const nuevaCorrida = await _createCorrida();
        nuevaCorrida.fecha = newDate;

        // Llama a la función updateCorrida
        const corridaActualizada = await corridaService.updateCorridaInDB(nuevaCorrida);

        // Realiza las aserciones correspondientes
        assert.strictEqual(corridaActualizada.id, nuevaCorrida.id);
        assert.equal(corridaActualizada.fecha.getTime(), nuevaCorrida.fecha.getTime());
        // assert.strictEqual(corridaActualizada.active, nuevaCorrida.active);
    });

    // Prueba de la función getCorridasMayoresA30Minutos
      it('Debería obtener las corridas mayores a 30 minutos', async () => {
        // Llama a la función getCorridasMayoresA30Minutos
        const corridas = await corridaService.getCorridasFromDB();

        // Realiza las aserciones correspondientes
        assert.equal(Array.isArray(corridas), true);
        // Realiza más aserciones según el comportamiento esperado
      });

      // Prueba de la función deleteCorrida
      it('Debería eliminar una corrida', async () => {
        // Crea un objeto de prueba con los datos necesarios
        const nuevaCorrida = await _createCorrida();

        // Llama a la función deleteCorrida
        const resultado = await corridaService.deleteCorridaInDB(nuevaCorrida.id);

        // Realiza las aserciones correspondientes
        assert.strictEqual(resultado, true);
        // Realiza más aserciones según el comportamiento esperado
      });

});


async function _createCorrida() {
    const date = new Date('2023-06-16T10:30:00.000Z');
    const corridaData = {
        fecha: date,
        active: true
    };

    // Llama a la función createCorrida
    const nuevaCorrida = await corridaService.createCorridaInDB(corridaData);
    return nuevaCorrida;
}
