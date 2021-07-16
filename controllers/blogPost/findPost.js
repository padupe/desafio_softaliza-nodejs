const logging = require('../../utilities/logging');
const prisma = require('../../prisma/prisma');

// Função para localizar os BlogPosts
async function findPost(type, data) {
  // Por ID
  if (type == 'id') {
    let result = await prisma.blogPost.findUnique({
      where: { id: data },
      select: {
        // Para retornar o username
        user: {
          select: {
            username: true,
          },
        },
        title: true,
        content: true,
        slug: true,
      },
    });
    if (result == null) {
      logging.error('Invalid Post ID!');
    }
    return result;
  }

  // Por SLUG
  if (type == 'slug') {
    let result = await prisma.blogPost.findUnique({
      where: { slug: data },
      select: {
        // Para retornar o username
        user: {
          select: {
            username: true,
          },
        },
        title: true,
        content: true,
        slug: true,
      },
    });
    if (result == null) {
      logging.error('Invalid Post SLUG!');
    }
    return result;
  }
}

module.exports = { findPost };
