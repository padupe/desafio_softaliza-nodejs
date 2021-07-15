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

      const new_post = await prisma.blogSpot.create({
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

      console.log(new_post);
      // Função que "formata" o retorno de maneira mais simples e objetiva.
      const returnPost = await findPost('id', new_post.id);

      return res.status(201).json({ post: returnPost });
    } catch (err) {
      logging.error(JSON.stringify(err));
      return res.status(400).json({ err: 'Could not create your post.' });
    }
  }
  res.status(401).send({ err: 'Unauthorized user!' });
};

const show = async (req, res) => {
  if (verifyJWT(req.headers.authorization.replace('Bearer ', ''))) {
    const { slugParams } = req.params;
    logging.debug(JSON.stringify(req.params));
    console.log('----', req.params);

    // const params = JSON.stringify(req.params);
    // console.log(':::', params);

    try {
      const showPost = await findPost('slug', slugParams);
      if (showPost == null) {
        logging.error('Post not found!');
      }

      console.log('AAAAAAAAA', showPost);

      return res.status(200).json({ showPost });
    } catch (err) {
      console.log(err);
      logging.error(JSON.stringify(err));
      return res.status(404).json({ err: 'Post not found!' });
    }
  }
  res.status(401).send({ err: 'Unauthorized user!' });
};
const update = async (req, res) => {};
const destroy = async (req, res) => {};

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
};
