if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const config = require('./.contentful.json');
const { NUXT_ENV_CTF_SPACE_ID, NUXT_ENV_CTF_CD_ACCESS_TOKEN } = process.env;

const Router = require('express-promise-router');

const router = new Router();

const TABLE_FIELDS = ['id', 'title', 'subtitle', 'slug', 'version', 'author'];

module.exports = router;




const contentful = require('contentful');
const client = contentful.createClient({
    space: config.NUXT_ENV_CTF_SPACE_ID,
    accessToken: config.NUXT_ENV_CTF_CD_ACCESS_TOKEN,
});

router.get('/', (request, response) => {
    const query = {
        'content_type': 'homebrewItem',
        'sys.revision[gt]': 0,
    };
    client.getEntries(query)
        .then((data) => {
            response.set('Cache-Control', 'public, max-age=1800'); // 1/2 hour
            response.status(200).json(data.items);
        })
        .catch((error) => {
            console.warn(error);
        });
});

router.get('/:slug', async (request, response) => {
    const { slug } = request.params;

    const query = {
        'content_type': 'homebrewItem',
        'sys.revision[gt]': 0,
        'fields.urlSlug[in]': slug,
    };
    client.getEntries(query)
        .then((data) => {
            response.set('Cache-Control', 'public, max-age=1800'); // 1/2 hour
            response.status(200).json(data.items);
        })
        .catch((error) => {
            console.warn(error);
        });
});
