const request = require('supertest');
const app = require('../index');
const { default_user, user_block } = require('../prisma/seed');

let tokenJWT = '';

let userOK = {
  username: default_user.username,
  password: default_user.password_hash,
};

let user_PassFAIL = {
  username: default_user.username,
  password: user_block.password_hash,
};

let userFAIL = {
  username: user_block.username,
  password: user_block.password_hash,
};

describe('Auth Endpoint', () => {
  // Teste de Login na Aplicação: Usuário e Senha Válidos
  it('Successful Login Test in Application', function (done) {
    request(app)
      .post('/v1/auth')
      .send(userOK)
      .set('Accept', 'application/json')
      .expect(202)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { token } = res.body;
        console.log(res.body);
        tokenJWT = token;
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Teste de Login na Aplicação: Usuário Válido, porém, Senha Inválida
  it('User enters wrong password', function (done) {
    request(app)
      .post('/v1/auth')
      .send(user_PassFAIL)
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect((res) => {
        console.log(res.body);
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Teste de Login na Aplicação: Usuário e Senha Inválidos
  it('User without access', function (done) {
    request(app)
      .post('/v1/auth')
      .send(userFAIL)
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect((res) => {
        console.log(res.body);
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

// PARA RODAR ESTE TESTE:
// $ npx yarn test routes/auth.test.js
