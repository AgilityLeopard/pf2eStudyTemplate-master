const router = require('express-promise-router')();
const { getPosts, getPostBySlug } = require('../../api/contentful/posts');

router.get('/', async (req, res) => {
  const posts = await getPosts();
  res.json(posts);
});

router.get('/:slug', async (req, res) => {
  const post = await getPostBySlug(req.params.slug);

  if (!post) {
    return res.status(404).json(null);
  }

  res.json(post);
});

module.exports = router;