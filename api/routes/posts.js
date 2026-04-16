if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { NUXT_ENV_CTF_SPACE_ID, NUXT_ENV_CTF_CD_ACCESS_TOKEN } = process.env;
const config = require('./.contentful.json');
const Router = require('express-promise-router');
const router = new Router();

module.exports = router;


const contentful = require('contentful');
const client = contentful.createClient({
  space: config.NUXT_ENV_CTF_SPACE_ID,
  accessToken: config.NUXT_ENV_CTF_CD_ACCESS_TOKEN,
});



router.get('/', async (req, res) => {
  const query = {
    content_type: 'blogPost',
    order: '-fields.publishedAt',
  };

  const data = await client.getEntries(query);


  const normalize = (item) => ({
    id: item.sys.id,
    title: item.fields.title,
    slug: item.fields.slug,
    description: item.fields.description,
    shortDescription: item.fields.shortDescription,
    type: item.fields.type,
    publishedAt: item.fields.publishedAt,
  });

  res.json(data.items.map(normalize));
});


router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  const query = {
    content_type: 'blogPost',
    'fields.slug': slug,
  };

  console.log(client);

  try {
    const data = await client.getEntries(query);

    const item = data.items[0];

    if (!item) {
      return res.status(404).json(null);
    }

    const normalize = (item) => ({
      id: item.sys.id,
      ...item.fields,
    });

    res.json(normalize(item));
  } catch (e) {
    console.warn(e);
    res.status(500).json(null);
  }
});