const { verifyJWT } = require('../auth/token');
const logging = require('../utilities/logging');
const prisma = require('../prisma/prisma');
const { findUsername } = require('./findUsername');
const slugify = require('slugify'); // Função que cria o slug com base no título de cada BlogSpot
const { findPost } = require('./blogSpot/findPost');

const index = async (req, res) => {
  res.send('Route BlogSpot');
};

const create = async (req, res) => {
  if (verifyJWT(req.headers.authorization.replace('Bearer ', ''))) {
    const { username, title_post, content_post } = req.body;
    logging.debug(JSON.stringify(req.body));

    try {
      // Função para buscar se o username existe na Base do Banco de Dados
      const userPost = await findUsername(username);
      // Se o username não existir "cai" no IF
      if (userPost == null) {
        logging.error('Invalid Username.');
        return res.status(401).json({ err: 'Invalid Username.' });
      }

      const new_post = await prisma.blogPost.create({
        data: {
          created_by: userPost.id,
          title: title_post,
          content: content_post,
          slug: slugify(title_post, {
            // A propriedade remove, ignora caracteres especiais ao gerar o slug
            remove: /[*+~.()'"!?:@]/g,
            // A propriedade lower, já formata todos os caracteres para minúsculo
            lower: true,
          }),
        },
      });

      // Função que "formata" o retorno de maneira mais simples e objetiva.
      const returnPost = await findPost('id', new_post.id);

      return res
        .status(201)
        .json({ post: returnPost, msg: 'New Post Created!' });
    } catch (err) {
      logging.error(JSON.stringify(err));
      return res.status(400).json({ err: 'Could not create your post.' });
    }
  }
  res.status(401).send({ err: 'Unauthorized user!' });
};

const show = async (req, res) => {
  if (verifyJWT(req.headers.authorization.replace('Bearer ', ''))) {
    const { slug } = req.params;
    logging.debug(JSON.stringify(req.params));

    try {
      const showPost = await findPost('slug', slug);
      if (showPost == null) {
        logging.error('Post not found!');
      }

      return res
        .status(200)
        .json({ post: showPost, msg: 'Show Post Successful!' });
    } catch (err) {
      console.log(err);
      logging.error(JSON.stringify(err));
      return res.status(404).json({ err: 'Post not found!' });
    }
  }
  res.status(401).send({ err: 'Unauthorized user!' });
};
const update = async (req, res) => {
  if (verifyJWT(req.headers.authorization.replace('Bearer ', ''))) {
    const { slug } = req.params;
    const { new_title, new_content } = req.body;
    logging.debug(JSON.stringify(req.params, req.body));

    try {
      const postUpdate = await prisma.blogPost.update({
        where: { slug: slug },
        select: {
          // Para retornar o username
          user: {
            select: {
              username: true,
            },
          },
          title: true,
          content: true,
        },
        data: {
          title: new_title,
          content: new_content,
          slug: slugify(new_title, {
            // A propriedade remove, ignora caracteres especiais ao gerar o slug
            remove: /[*+~.()'"!?:@]/g,
            // A propriedade lower, já formata todos os caracteres para minúsculo
            lower: true,
          }),
        },
      });
      return res
        .status(202)
        .json({ post: postUpdate, msg: 'Update Post Successful!' });
    } catch (error) {
      logging.error(JSON.stringify(error));
      return res.status(406).json({ error: 'Unable to update!' });
    }
  }
  res.status(401).json({ err: 'Unauthorized User.' });
};

const destroy = async (req, res) => {
  if (verifyJWT(req.headers.authorization.replace('Bearer ', ''))) {
    const { slug } = req.params;
    logging.debug(JSON.stringify(req.params));

    console.log(req.params);

    try {
      const postDelete = await prisma.blogPost.delete({
        where: { slug: slug },
        select: {
          // Para retornar o username do Usuário que teve o blogSpot deletado
          user: {
            select: {
              username: true,
            },
          },
        },
      });
      console.log(postDelete);
      return res.status(202).json({
        user: postDelete.user.username,
        msg: 'Delete Post Successful!',
      });
    } catch (error) {
      logging.error(JSON.stringify(error));
      return res.status(406).json({ error: 'Unable to delete!' });
    }
  }
  res.status(401).json({ err: 'Unauthorized User.' });
};

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
};
