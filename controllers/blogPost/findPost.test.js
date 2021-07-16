// Teste Unitário para validar a Função 'findPost' por SLUG
// IMPORTANTE: O teste da função por ID, será realizado através de INTEGRAÇÃO
const { findPost } = require('./findPost');

let validSLUG = 'how-did-i-decide-to-become-a-developer';
let failedSLUG = 'failed-slug';

describe('Test Function findPost by SLUG', () => {
  it('Successful', async function (done) {
    await findPost('slug', validSLUG).then((result) => {
      expect(result.slug).toBe(validSLUG);
      console.log('fn findPost:', result.slug, 'slug informed:', validSLUG);
      console.log('✅ Post successfully located');
      done();
    });
  });

  it('Fail', async function (done) {
    await findPost('slug', failedSLUG).then((result) => {
      expect(result).toBe(null);
      console.log('❌ Failed to find Post!');
      done();
    });
  });
});

// PARA RODAR ESTE TESTE:
// $ npx yarn test controllers/blogPost/findPost.test.js
