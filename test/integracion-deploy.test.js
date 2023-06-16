const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../index');


describe('Pruebas de Integración en despliegue', () => {
 

  after(async () => {
    app.close();
    process.exit();
  });

  it('Debería obtener respueta 200 del servicio de listar corridas', (done) => {
    request(app)
      .get('/corridas')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Realiza las aserciones correspondientes para verificar los resultados
        done();
      });
  });
});