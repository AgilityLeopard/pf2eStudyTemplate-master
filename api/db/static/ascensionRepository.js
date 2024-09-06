import {source} from './_sourcesRepository';
import {SKILLS} from './_statUtils';

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const simpleSource = function(key, page) {
  return {
    ...source[key],
    page: page,
  }
};

const simpleStub = function (sourceKey, sourcePage, name, hint, stub = true) {
  return {
    source: simpleSource(sourceKey, sourcePage),
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    hint,
    teaser: hint,
    stub: stub,
  };
};

const playerCore =  [
  {
    name: 'Послушник',
    ...simpleStub('playerCore',150,'Acolyte','Вы провели свои ранние годы в религиозном монастыре или в уединении. ',false),
    nameBackground: 'Послушник',
    boost1: ['intellect', 'wisdom'],
    boost2: true,
    skill: 'religion',
    lore: 'Знание письменности',
    description: 'Вы провели свои ранние годы в религиозном монастыре или в уединении. Возможно, вы отправились в этот мир, чтобы распространять слово своей религии, или потому, что вы отвергли учения своей веры, но в глубине души, те уроки, которые вы извлекли, всегда будут с вами.',
    feat: stringToKebab(`${'playerCore'} ${'Student of the Canon'}`),
  },
  {
    name: 'Послушник',
    ...simpleStub('playerCore',150,'Acolyte','Вы провели свои ранние годы в религиозном монастыре или в уединении. ',false),
    nameBackground: 'Послушник',
    boost1: ['intellect', 'wisdom'],
    boost2: true,
    skill: 'religion',
    lore: 'Знание письменности',
    description: 'Вы провели свои ранние годы в религиозном монастыре или в уединении. Возможно, вы отправились в этот мир, чтобы распространять слово своей религии, или потому, что вы отвергли учения своей веры, но в глубине души, те уроки, которые вы извлекли, всегда будут с вами.',
    feat: stringToKebab(`${'playerCore'} ${'Student of the Canon'}`),
  },
];


module.exports = [
  ...playerCore,
  // ...red2,
  // ...aaoa,
  // ...tog,
  // ...ltgb,
  // ...aotgt,
  // ...thaot,
  // ...sotah,
  // ...goen,
];
