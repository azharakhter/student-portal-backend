(async () => {
  const chai = await import('chai');
  const chaiHttp = await import('chai-http');
  const app = (await import('../app.js')).default;

  const { expect } = chai;
  chai.use(chaiHttp);

  describe('GET /api/ping', () => {
    it('should return a pong message', (done) => {
      chai.request(app)
        .get('/api/ping')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'pong');
          done();
        });
    });
  });
})();
