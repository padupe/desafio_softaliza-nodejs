const request = require('supertest');
const app = require('../index');
const { default_user } = require('../prisma/seed');

let tokenJWT = '';

let createdPost = '';

let userOK = {
  username: default_user.username,
  password: default_user.password_hash,
};

let newPost = {
  username: 'paulopeixoto',
  title_post: 'A New Post.',
  content_post: 'Example',
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
});

describe('BlogPost Endpoint', () => {
  it('Create New Post', function (done) {
    console.log('TokenJWT:', tokenJWT);
    console.log('newPost:', newPost);
    request(app)
      .post('/v1/blogpost')
      .auth(tokenJWT, { type: 'bearer' })
      .send(newPost)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { returnPost } = res.body;
        createdPost = returnPost;
        console.log('New Post:', res.body);
      })
      .end((err) => {
        console.log(err);
        if (err) return done(err);
        done();
      });
  });
});

// PARA RODAR ESTE TESTE:
// $ npx yarn test routes/blogpost.test.js
