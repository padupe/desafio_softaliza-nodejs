const prisma = require('../prisma/prisma');
const logging = require('../utilities/logging');

async function findUsername(username_data) {
  let result = await prisma.user.findUnique({
    where: { username: username_data },
    select: {
      id: true,
      username: true,
      email: true,
      password_hash: true,
    },
  });
  if (result == null) {
    logging.error('Invalid Data!');
  }
  return result;
}

module.exports = { findUsername };
