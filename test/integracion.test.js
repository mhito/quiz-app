const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../index');
const { MongoClient } = require('mongodb');

describe('Pruebas de Integración', () => {
  let db;
  let collection;

  before(async () => {
    const mongoHost = process.env.MONGO_HOST || 'localhost';
    const mongoPort = process.env.MONGO_PORT || '27017';
    // Establece la conexión a la base de datos
    const client = await MongoClient.connect(`mongodb://${mongoHost}:${mongoPort}`)
    db = client.db('ado');
    collection = db.collection('corridas');
  });

  after(async () => {
    // Cierra la conexión a la base de datos
    await db.client.close();
    app.close();
    process.exit();
  });


  it('Debería crear una nueva Corrida', (done) => {
    const date = '2023-06-16T10:30:00.000Z'
    request(app)
      .post('/corridas')
      .send({ fecha: '2023-06-16T10:30:00.000Z', active: true })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.fecha).to.equal('2023-06-16T10:30:00.000Z');
        expect(res.body.active).to.equal(true);
        done();
      });
  });

  it('Debería obtener todas las Corridas mayores a 30 minutos de la hora actual', (done) => {
    request(app)
      .get('/corridas')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Realiza las aserciones correspondientes para verificar los resultados
        done();
      });
  });

  it('Debería actualizar una Corrida existente', async () => {
    // Inserta una corrida en la base de datos y obtén su ID
    const corridaId = await insertCorrida();

    // Realiza la solicitud de actualización a la API
    const res = await request(app)
      .put(`/corridas/${corridaId}`)
      .send({ fecha: new Date(), active: false })
      .expect(200);

    // await collection.deleteOne({ _id: corridaId });

    // Verifica el resultado de la actualización
    expect(res.body.message).to.equal('Corrida actualizada correctamente');
  });

  it('Debería eliminar una Corrida existente', async () => {
    // Inserta una corrida en la base de datos y obtén su ID
    const corridaId = await insertCorrida();

    request(app)
      .delete(`/corridas/${corridaId}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log("eer::", err);
          return done(err);
        }
        // Realiza las aserciones correspondientes para verificar los resultados
        expect(res.body.message).to.equal('Corrida eliminada correctamente');
      });
  });


  async function insertCorrida() {
    const dateCorrida = new Date();
    const insertResult = await collection.insertOne({
      fecha: dateCorrida,
      active: true
    });
    const corridaId = insertResult.insertedId;
    return corridaId;
  }
});