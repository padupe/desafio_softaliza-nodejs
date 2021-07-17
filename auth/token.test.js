const { signJWT, verifyJWT } = require('./token');
const { default_user } = require('../prisma/seed');

const payload = {
  username: default_user.username,
  email: default_user.email,
};

// Testes para validar se as funções de SIGNWJT e VERIFYJWT estão funcionando corretamente
describe('JWT Authentication', () => {
  // Teste compara se o JWT gerado com a função 'signJWT', quando verificado com a função 'verifyJWT' é considerado VÁLIDO
  it('Generate e Compare JWT Successful', async function (done) {
    let tokenTest = await signJWT({
      username: payload.username,
      email: payload.email,
    });
    console.log('Token JWT:', tokenTest);

    let verifyTest = await verifyJWT(tokenTest);
    console.log('VerifyJWT:', verifyTest);

    let result = {
      username: verifyTest.username,
      email: verifyTest.email,
    };

    expect(result).toStrictEqual(payload);
    console.log('✅ JWT generated and validated Successfully!!');
    done();
  });

  // Teste para validar que uma 'falsa' chave NÃO será validada
  it('JWT Generated and compared with error.', async function (done) {
    let tokenFailTest = 'tokenfail';

    let verifyFailTest = await verifyJWT(tokenFailTest);
    console.log('VerifyJWT [FAIL]:', verifyFailTest);

    expect(verifyFailTest).toBe(false);
    console.log('❌ Invalid JWT!');
    done();
  });
});

// PARA RODAR ESTE ARQUIVO DE TESTES:
// $ npx yarn test auth/token.test.js
