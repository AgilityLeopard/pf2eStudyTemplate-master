const contentful = require('contentful');
const config = require('../../.contentful.json');

const client = contentful.createClient({
    space: config.NUXT_ENV_CTF_SPACE_ID,
    accessToken: config.NUXT_ENV_CTF_CD_ACCESS_TOKEN,
});


function normalize(item) {
    return {
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        description: item.fields.description,
        shortDescription: item.fields.shortDescription,
        type: item.fields.type,
        publishedAt: item.fields.publishedAt,
    };
}

async function getPosts() {
    const data = await client.getEntries({
        content_type: 'blogPost',
        order: '-fields.publishedAt',
    });

    return data.items.map(normalize);
}

async function getPostBySlug(slug) {
    const data = await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': slug,
    });

    const item = data.items[0];
    if (!item) return null;

    return normalize(item);
}

module.exports = {
    getPosts,
    getPostBySlug,
};