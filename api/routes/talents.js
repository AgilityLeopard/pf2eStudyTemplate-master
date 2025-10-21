const Router = require('express-promise-router');

const repository = require('../db/static/talentRepository');

const router = new Router();

module.exports = router;

router.get('/', async (request, response) => {
  try {
    let items = repository;
    const filter = {};

    const filterSourceString = request.query.source;
    if (filterSourceString) {
      filter.source = filterSourceString.split(',').map(s => s.trim());

      items = items.filter(item => {
        // Пропускаем некорректные элементы
        if (!item || !item.source || typeof item.source !== 'object' || !item.source.key) {
          return false;
        }

        // Проверяем совпадение ключа
        return filter.source.includes(item.source.key);
      });
    }

    response.set('Cache-Control', 'public, max-age=3600');
    response.status(200).json(items);
  } catch (err) {
    console.error("❌ Ошибка в /api/talents:", err);
    response.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});



router.get('/:slug', async (request, response) => {

  
  const { slug } = request.params;
  
  const item = repository.find(talent => talent.key === slug);

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
