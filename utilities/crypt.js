const bcrypt = require('bcrypt');
const saltRounds = 10;

//Função para realizar o "hash" da Senha
const hash = async (data) => {
  return await bcrypt.hash(data, saltRounds);
};

//Função para comparar se a Senha informada está correta
const compare = async (password, data) => {
  return await bcrypt.compare(password, data);
};

module.exports = {
  hash,
  compare,
};
