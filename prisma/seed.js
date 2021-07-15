const prisma = require('./prisma');
const { hash } = require('../utilities/crypt');
const slugify = require('slugify');

const default_user = {
  username: 'paulopeixoto',
  email: 'peixoto.pauloeduardo@gmail.com',
  password_hash: 'softaliza@2021',
};

const user_block = {
  username: 'faileduser',
  email: 'fail@email.com',
  password_hash: '123456',
};

const blogspot_1 = {
  title: 'The history of my life!',
  content: 'Summary of my professional trajectory',
};

const blogspot_2 = {
  title: 'How did I decide to become a developer?',
  content: 'The Career Transition Process',
};

const blogspot_3 = {
  title: 'Why did I choose to be Back-end?',
  content:
    'The challenges and opportunities that the back-end universe offers.',
};

async function clearDB() {
  await prisma.blogSpot.deleteMany({ where: {} });
  await prisma.user.deleteMany({ where: {} });
}

async function populateDB() {
  const new_user = await prisma.user.create({
    data: {
      username: default_user.username,
      email: default_user.email,
      password_hash: await hash(default_user.password_hash),
    },
  });

  const blospot1 = await prisma.blogSpot.create({
    data: {
      created_by: new_user.id,
      title: blogspot_1.title,
      content: blogspot_1.content,
      slug: slugify(blogspot_1.title, {
        remove: /[*+~.()'"!?:@]/g,
      }).toLowerCase(),
    },
  });

  const blospot2 = await prisma.blogSpot.create({
    data: {
      created_by: new_user.id,
      title: blogspot_2.title,
      content: blogspot_2.content,
      slug: slugify(blogspot_2.title, {
        remove: /[*+~.()'"!?:@]/g,
      }).toLowerCase(),
    },
  });

  const blospot3 = await prisma.blogSpot.create({
    data: {
      created_by: new_user.id,
      title: blogspot_3.title,
      content: blogspot_3.content,
      slug: slugify(blogspot_3.title, {
        remove: /[*+~.()'"!?:@]/g,
      }).toLowerCase(),
    },
  });
}

async function main() {
  await populateDB();
}
if (process.env.NODE_ENV !== 'test') {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = {
  default_user,
  user_block,
  clearDB,
  populateDB,
};
