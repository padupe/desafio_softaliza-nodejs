const { findUsername } = require('./findUsername');
const { compare } = require('../utilities/crypt');
const { signJWT } = require('../auth/token');
const logging = require('../utilities/logging');

const logUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    // Função para buscar se o username existe na Base do Banco de Dados
    const userLog = await findUsername(username);
    // Se o username não existir "cai" no IF
    if (userLog == null) {
      logging.error('Invalid Data!');
      return res.status(401).json({ err: 'Invalid Data!' });
    }

    // Função para verificar se a senha informada está correta
    const passOK = await compare(password, userLog.password_hash);

    switch (true) {
      // Se for verificada que a senha está incorreta "cai" no IF
      case passOK == false:
        logging.error('Invalid Data!');
        return res.status(401).json({ err: 'Invalid Data!' });

      default:
        try {
          // Username e Password Validados é gerada a chave TokenJWT
          const TokenJWT = await signJWT({
            username: userLog.username,
            email: userLog.email,
          });
          return res.status(202).json({ token: TokenJWT });
        } catch (error) {
          logging.error(JSON.stringify(error));
        }
    }
  } catch (error) {
    logging.error(JSON.stringify(error));
    return res.status(401).json({ err: 'Invalid Data!' });
  }
};

module.exports = {
  logUser,
};
