import { source } from "./_sourcesRepository";

const ACTIVATION = {
  FREE_ACTION: "Free Action",
  ACTION: "Action",
  COMBAT_ACTION: "Combat Action",
  SIMPLE_ACTION: "Simple Action",
  FULL_ACTION: "Full Action",
  REACTION: "Reaction",
};

const DURATION = {
  INSTANT: "Instant",
  SUSTAINED: "Sustained",
  ONE_ROUND: "1 Round",
  ONE_COMBAT: "1 Combat",
  ONE_SCENE: "1 Scene",
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, "-");
};

const powerz = function (
  sourceKey,
  sourcePage,
  name,
  discipline,
  cost,
  effect,
  stub = false
) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost,
    discipline,
    effect,
    stub,
  };
};

const simpleStub = function (
  id,
  sourceKey,
  sourcePage,
  cost,
  name,
  discipline,
  effect
) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    id,
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost,
    discipline,
    effect,
    stub: true,
  };
};

const simpleCrunch = function (
  dn,
  activation,
  duration,
  range,
  multi,
  effect,
  potency = ""
) {
  return {
    crunch_difficulty_number: dn,
    crunch_activation: activation,
    crunch_duration: duration,
    crunch_range: range,
    crunch_multi_target: multi,
    crunch_effect: effect,
    crunch_potency: potency.split(";"),
  };
};

const coreUniversalAbilities = [
  {
    ...powerz("playerCore", 267, "Psyniscience", "Universal Ability", 0),
    ...simpleCrunch(3, ACTIVATION.FREE_ACTION, DURATION.INSTANT, "50 m", false),
    keywords: ["Psychic"],
    effect:
      "Search the area for signs of psychic presence. I not considered a psychic power, no perils of warp.",
  },
  {
    ...powerz("playerCore", 267, "Deny The Witch", "Universal Ability", 0),
    ...simpleCrunch(3, "Action*", DURATION.INSTANT, "50 m", false),
    keywords: ["Psychic"],
    effect: "Hinder others to affect the Warp.",
  },
];

const corePowers = [
  {
    ...powerz("playerCore", 268, "Shield", "Minor", 8),
    name: "Щит",
    level: 1,
    cantrip: true,
    powerDescription: "Твердость щита увеличивается на 5",
    power: 2,
    powerValue: 5,
    tradition: ["арканный", "оккультный", "сакральный"],
    trait: ["концентрация", "сила", "чары"],
    action: 1,
    duration: "до начала вашего следующего хода",
    description:
      "Вы поднимаете магический силовой щит. Это считается как использование действия Поднять щит, давая вам до начала вашего следующего хода бонус обстоятельства +1 КБ, но не требует использования руки." +
      'Пока заклинание действует, вы можете использовать реакцию Блок щитом с вашим магическим щитом. Щит имеет Твёрдость {{powers}}. Вы можете использовать реакцию от этого заклинания, чтобы уменьшить урон от любого заклинания или магического эффекта, даже если они не наносят физического урона. После того, как вы используете "Блок щитом", заклинание заканчивается и вы не можете сотворять его в течение 10 минут.',
  },
];

const psychicPowersRepository = [
  ...corePowers,
  // ...fspgPowers,
  // ...paxNavigatorPowers,
  // ...aaoaWaaaghPowers,
  // ...aaoaSancticPowers,
  // ...aaoaAncestrialRites,
  // ...aaoaLibrariusPowers,
  // ...aaoaAeldariPowers,
  // ...teaLibrariusPowers,
];

module.exports = {
  powers: psychicPowersRepository,
  // abilities: coreUniversalAbilities,
};
