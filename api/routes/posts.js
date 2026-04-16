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
  try {
    const data = await client.getEntries({
      content_type: 'blogPost',
      order: '-fields.publishedAt',
    });

    res.set('Cache-Control', 'public, max-age=1800');
    res.status(200).json(data.items);

  } catch (error) {
    console.error('POSTS ERROR:', error);

    res.status(500).json({
      error: 'Contentful failed',
      message: error.message,
    });
  }
});


router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const data = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
    });

    const item = data.items[0];

    if (!item) {
      return res.status(404).json(null);
    }

    res.json({
      id: item.sys.id,
      ...item.fields,
    });

  } catch (error) {
    console.error('SLUG ERROR:', error);

    res.status(500).json({
      error: 'Contentful failed',
      message: error.message,
    });
  }
});