const Router = require('express-promise-router');

const { sourceSql } = require('./_sqlSnippets');

const { powers } = require('../db/static/psychicPowersRepository');

const router = new Router();

module.exports = router;

const TABLE_FIELDS = ['id', 'name', 'cost', 'keywords', 'effect', 'discipline'];

router.get('/', (request, response) => {
  let items = [];
  items = powers;

  const filter = {};
  const filterSourceString = request.query.source;

  if (request.query.source) {
    const sources = request.query.source.split(',');
    items = items.filter(i => i.source && i.source.key ? sources.includes(i.source.key) : false);
    console.log(sources)
  }

  // if (filterSourceString) {
  //   filter.source = filterSourceString.split(',');
  //   if (filter.source) {
  //     items = items.filter((item) => filter.source.includes(item.source.key));
  //   }
  // };

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(items);
});



router.get('/:slug', async (request, response) => {
  const { slug } = request.params;

  const item = powers.find(power => power.key === slug);

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
