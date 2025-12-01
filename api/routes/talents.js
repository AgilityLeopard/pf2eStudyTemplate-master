const Router = require('express-promise-router');
const repository = require('../db/static/talentRepository');

const router = new Router();
module.exports = router;

router.get('/', async (req, res) => {
  let items = repository.filter(v => v && v.key); // все данные

  // ===== Фильтры =====
  if (req.query.type) {
    const types = req.query.type.split(',').map(t => t.toLowerCase());
    if (types.length)
      items = items.filter(i => types.includes(i.system.category.toLowerCase()));
  }

  if (req.query.search) {
    const search = req.query.search.toLowerCase();
    if (search.length) items = items.filter(i => i.name.toLowerCase().includes(search));
  }

  if (req.query.rarity) {
    const rarities = req.query.rarity.split(',');
    items = items.filter(i => rarities.includes(i.rarity));
  }

  // ===== Фильтрация по трейтам =====
  const requiredTraits = req.query.requiredTraits
    ? req.query.requiredTraits.split(',').map(t => t.toLowerCase())
    : [];
  const optionalTraits = req.query.traits
    ? req.query.traits.split(',').map(t => t.toLowerCase())
    : [];


  // фильтрация по обязательным трейтам (AND)
  if (req.query.requiredTraits) {
    const required = req.query.requiredTraits.split(',').map(t => t.toLowerCase());
    items = items.filter(i => {
      if (!Array.isArray(i.traits)) return false;
      const itemTraits = i.traits.map(tr => tr.toLowerCase());
      // проверяем, что все обязательные трейты есть у элемента
      return required.some(tr => itemTraits.includes(tr));
    });
  }

  // фильтрация по опциональным трейтам (OR)
  if (req.query.traits) {
    const optional = req.query.traits.split(',').map(t => t.toLowerCase());
    items = items.filter(i => {
      if (!Array.isArray(i.traits)) return false;
      const itemTraits = i.traits.map(tr => tr.toLowerCase());
      // хотя бы один совпал
      return optional.some(tr => itemTraits.includes(tr));
    });
  }



  if (req.query.source) {
    const sources = req.query.source.split(',');
    items = items.filter(i => i.source && i.source.key ? sources.includes(i.source.key) : false);
  }

  if (req.query['value-leq']) {
    const maxValue = parseInt(req.query['value-leq']);
    items = items.filter(i => parseInt(i.value) <= maxValue);
  }

  if (req.query.name) {
    const names = req.query.name.split(',');
    items = items.filter(i => names.includes(i.name));
  }

  if (req.query.level) {
    const [minLevel, maxLevel] = req.query.level;
    items = items.filter(
      item => item.level ? item.system.level.value >= minLevel && item.system.level.value <= maxLevel : false
    );
  }

  // === Формируем уникальные значения для фильтров ===
  const filterSources = [...new Set(items.map(i => i.source ? i.source.book : false))];
  const filterTypes = [...new Set(items.map(i => i.system.category))];
  const filterRarities = [...new Set(items.map(i => i.rarity))];
  const filterTraits = [
    ...new Set(
      items.flatMap(i => {
        if (Array.isArray(i.traits)) return i.traits.map(t => t.trim());
        if (typeof i.traits === "string") return i.traits.split(",").map(t => t.trim());
        return [];
      }).filter(Boolean)
    ),
  ];

  const levelValues = items
    .map(i => i.level?.value)
    .filter(v => v != null)
    .filter(v => !isNaN(v));

  const filterLevel = levelValues.length ? [Math.min(...levelValues), Math.max(...levelValues)] : [0, 20];

  // ===== Пагинация =====
  const total = items.length;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : total;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pagedItems = items.slice(start, end);

  res.json({
    total,
    page,
    perPage,
    pageCount: Math.ceil(total / perPage),
    filters: {
      sources: filterSources.sort(),
      types: filterTypes.sort(),
      rarities: filterRarities.sort(),
      level: filterLevel,
    },
    traits: filterTraits,
    data: pagedItems,
  });
});

router.get('/:slug', async (request, response) => {
  const { slug } = request.params;
  const item = repository.find(talent => talent.key === slug);

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
