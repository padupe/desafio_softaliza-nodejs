// Teste Unitário para validar a Função 'findUsername'
const { findUsername } = require('./findUsername');
const { default_user } = require('../prisma/seed');

let validUsername = default_user.username;
let failedUsername = 'failedusername';

describe('Test Function findPost by SLUG', () => {
  // Função localiza com sucesso o username informado
  it('Successful', async function (done) {
    await findUsername(validUsername).then((result) => {
      expect(result.username).toBe(validUsername);
      console.log(
        'fn findUsername:',
        result.username,
        'username informed:',
        validUsername
      );
      console.log('✅ Username successfully located');
      done();
    });
  });

  it('Fail', async function (done) {
    // Erro ao localizar username
    await findUsername(failedUsername).then((result) => {
      expect(result).toBe(null);
      console.log('❌ Failed to find Username!');
      done();
    });
  });
});

// PARA RODAR ESTE ARQUIVO DE TESTES:
// $ npx yarn test controllers/findUsername.test.js
