const { hash, compare } = require('./crypt');

let passTest = '123asd';
let passFake = 'failed';

// Testes para validar se as funções de HASH e COMPARE estão funcionando corretamente
describe('Crypt Test', () => {
  // Teste compara se a senha gerada com o HASH ('result') equivale a variável 'passTest'
  it('Hash and Compare Successful', function (done) {
    hash(passTest).then((result) => {
      expect(compare(passTest, result)).toBeTruthy();
      console.log('✅ Hash and Compare Password Successful!');
      done();
    });
  });

  // Teste para validar se um usurário tentar informar um senha inválida a função COMPARE retornará FALSE
  it('Hash Password and Compare with Fake Password', function (done) {
    hash(passTest).then((result) => {
      expect(compare(passFake, result)).not.toBe(true);
      console.log('❌ Hasn and Compare Password Failed!');
      done();
    });
  });
});

// PARA RODAR ESTE ARQUIVO DE TESTES:
// $ npx yarn test utilities/crypt.test.js
