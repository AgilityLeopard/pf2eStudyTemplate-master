import { source } from './_sourcesRepository';

const ACTIVATION = {
  FREE_ACTION: 'Free Action',
  ACTION: 'Action',
  COMBAT_ACTION: 'Combat Action',
  SIMPLE_ACTION: 'Simple Action',
  FULL_ACTION: 'Full Action',
  REACTION: 'Reaction',
};

const DURATION = {
  INSTANT: 'Instant',
  SUSTAINED: 'Sustained',
  ONE_ROUND: '1 Round',
  ONE_COMBAT: '1 Combat',
  ONE_SCENE: '1 Scene',
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const powerz = function(sourceKey, sourcePage, name, discipline, cost, effect, stub = false) {
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

const simpleStub = function (id, sourceKey, sourcePage, cost, name, discipline, effect) {
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

const simpleCrunch = function (dn, activation, duration, range, multi, effect, potency = '') {
  return {
    crunch_difficulty_number: dn,
    crunch_activation: activation,
    crunch_duration: duration,
    crunch_range: range,
    crunch_multi_target: multi,
    crunch_effect: effect,
    crunch_potency: potency.split(';'),
  };
};

const coreUniversalAbilities = [
  {
    ...powerz('playerCore',267,'Psyniscience','Universal Ability',0),
    ...simpleCrunch(3, ACTIVATION.FREE_ACTION, DURATION.INSTANT,'50 m',false),
    keywords: ['Psychic'],
    effect: 'Search the area for signs of psychic presence. I not considered a psychic power, no perils of warp.',
  },
  {
    ...powerz('playerCore',267,'Deny The Witch','Universal Ability',0),
    ...simpleCrunch(3,'Action*', DURATION.INSTANT,'50 m',false),
    keywords: ['Psychic'],
    effect: 'Hinder others to affect the Warp.',
  },
];

const corePowers = [
  {
    ...powerz('playerCore',268,'Chameleon','Minor',8),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: '+3 to Stealth and +1 Defence vs Ranged Attacks.',
    description: '<p>You bend reality just enough to cause your image to blend with your surroundings. While this power remains in effect, you gain +5 bonus dice to Stealth (A) Tests and + 1 to your Defence against ranged attacks.</p>',
  },
  {
    ...powerz('playerCore',268,'Compel','Minor',10),
    ...simpleCrunch(5, ACTIVATION.SIMPLE_ACTION, DURATION.ONE_ROUND,'5 m',false),
    keywords: ['Psychic'],
    effect: 'Target must pass DN 4 Wil test or must follow a single command.',
  },
  {
    ...powerz('playerCore',268,'Conceal Phenomena','Minor',5),
    ...simpleCrunch(3,'Full-Round Action', DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: 'Psychic atempts to detect you are at +2 DN.',
  },
  {
    ...powerz('playerCore',269,'Conjure Flame','Minor',10),
    ...simpleCrunch(4, ACTIVATION.MOVEMENT, DURATION.SUSTAINED,'Self',false),
    keywords: ['Fire','Psychic'],
    effect: 'Flaming Melee Attacks that deal 8+1ED and may (GM) inflict On Fire',
  },
  {
    ...powerz('playerCore',269,'Dull Pain','Minor',8),
    ...simpleCrunch(4, ACTIVATION.SIMPLE_ACTION, DURATION.ONE_ROUND,'5 m',true),
    keywords: ['Psychic'],
    effect: 'Affected targets reduce all shock they suffer by 1.',
  },
  {
    ...powerz('playerCore',269,'Flash Bang','Minor',8),
    ...simpleCrunch(4, ACTIVATION.ACTION, DURATION.INSTANT,'5 m',true),
    keywords: ['Auditory','Light','Psychic'],
    effect: 'Targets in range must pass DN 3 Tou of suffer 1 shock and be blinded.',
  },
  {
    ...powerz('playerCore',269,'Invoke Luck','Minor',10),
    ...simpleCrunch(4, ACTIVATION.SIMPLE_ACTION, DURATION.ONE_ROUND,'Self',false),
    keywords: ['Psychic'],
    effect: 'You may gain +1 die to one Test you make.',
  },
  {
    ...powerz('playerCore',269,'Inflict Pain','Minor',8),
    ...simpleCrunch(4, ACTIVATION.ACTION, DURATION.SUSTAINED,'5 m',true),
    keywords: ['Psychic'],
    effect: 'Deal 1d3 shock, target must pass DN3 Wil or be staggered.',
  },
  {
    ...powerz('playerCore',270,'Subvert Machine','Minor',10),
    ...simpleCrunch(4, ACTIVATION.ACTION, DURATION.INSTANT,'25 m',true),
    keywords: ['Kinetic','Psychic'],
    effect: 'Jam machine for 1 minute. Might be fixed with DN 3 Tech (Int) Test.',
  },
  {
    ...powerz('playerCore',270,'Hover','Minor',7),
    ...simpleCrunch(4, ACTIVATION.SIMPLE_ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: 'Float freely at half speed.',
  },
  {
    ...powerz('playerCore',270,'Psychic Torch','Minor',5),
    ...simpleCrunch(4, ACTIVATION.SIMPLE_ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Kinetic','Psychic'],
    effect: 'Create an illuminating, flying orb.',
  },
  {
    ...powerz('playerCore',270,'Phantom Grip','Minor',8),
    ...simpleCrunch(4, ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'10 m',false),
    keywords: ['Kinetic','Psychic'],
    effect: 'Manifest phantom hands under your control.',
  },
  {
    ...powerz('playerCore',270,'Mental Force','Minor',8),
    ...simpleCrunch(3, ACTIVATION.ACTION, DURATION.INSTANT,'15 m',false),
    keywords: ['Kinetic','Psychic'],
    effect: 'Do a mental flex to push the target prone.',
  },
  {
    ...powerz('playerCore',271,'Otherworlldy Voices','Minor',5),
    ...simpleCrunch(3, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Auditory','Psychic'],
    effect: 'Disturb others with you AWESOME WARP VOICE.',
  },
  // Universal
  {
    ...powerz('playerCore',272,'Smite','Universal',10),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'35 m',true),
    keywords: ['Psychic'],
    effect: 'Roll Psychic Mastery VS Defence to deal 1d3 Mortal Wounds.',
  },
  // Biomancy
  {
    ...powerz('playerCore',272,'Enfeeble','Biomancy',15),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.SUSTAINED,'10 m',true),
    keywords: ['Psychic'],
    effect: 'The target’s Strength is reduced by 1 and they suffer 1 Shock at the beginning of each of their turns while the power is sustained.',
  },
  {
    ...powerz('playerCore',272,'Life Leech','Biomancy',15),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'5 m',false),
    keywords: ['Psychic'],
    effect: 'Deal 1d6 shock and 1d3 Wounds, heal half of the inflicted amount.',
  },
  {
    ...powerz('playerCore',272,'Warp Speed','Biomancy',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: 'Double your speed, may take an additional Action per round, +1 Defence, you act first in combat round. Suffer 1d3+1 Shock each round.',
  },
  {
    ...powerz('playerCore',272,'Phantom Form','Biomancy',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: 'Move through solid matter at half speed. Suffer 1 Shock each round.',
  },
  {
    ...powerz('playerCore',273,'Regeneration','Biomancy',15),
    ...simpleCrunch(8, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: 'Heal one Wound per round or - if completely healed - regain 1 Shock per round.',
  },
  {
    ...powerz('playerCore',273,'Shape Flesh','Biomancy',20),
    key: 'core-sharp-flesh',
    ...simpleCrunch(8, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    prerequisite: ['At least one other Biomancy Power.'],
    effect: 'Change your form, you filthy shapechanger.',
  },
  // Divination
  {
    ...powerz('playerCore',274,'Forewarding','Divination',15),
    ...simpleCrunch(6, ACTIVATION.FULL_ACTION, DURATION.ONE_COMBAT,'Self',false),
    keywords: ['Psychic'],
    effect: 'Seize initiative for free and gain +1 Defence.',
  },
  {
    ...powerz('playerCore',274,'Presience','Divination',15),
    ...simpleCrunch(7, '30 Minutes', DURATION.ONE_SCENE,'Self',false),
    keywords: ['Psychic'],
    prerequisite: ['At least one other Divination Power.'],
    effect: '',
  },
  {
    ...powerz('playerCore',274,'Misfortune','Divination',15),
    ...simpleCrunch('Defence', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'30 m',true),
    keywords: ['Psychic'],
    effect: '',
  },
  {
    ...powerz('playerCore',275,'Psychometry','Divination',15),
    ...simpleCrunch(4, ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'10 m',false),
    keywords: ['Psychic'],
    prerequisite: ['At least one other Divination Power.'],
    effect: 'When you use this power you are able to glimpse visions of past events in an area where an individual expressed an emotional outburst.',
  },
  {
    ...powerz('playerCore',275,'Scrier’s Gaze','Divination',5),
    ...simpleCrunch(6,'Full Action (or 10 min)', DURATION.SUSTAINED,'5,000 m',false),
    keywords: ['Psychic'],
    effect: 'You project your mind remotely to view events occurring in another place within range.',
  },
  // Pyromancy
  {
    ...powerz('playerCore',275,'Fiery Form','Pyromancy',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Fire','Psychic'],
    effect: 'You burst into flame, your body engulfed in a roaring inferno. These flames cause no harm to you or your possessions.',
  },
  {
    ...powerz('playerCore',276,'Flame Breath','Pyromancy',5),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.INSTANT,'30 m',false),
    keywords: ['Fire','Psychic'],
    effect: 'Anything within Blast(Medium) suffers 14 +2 ED and is On Fire.',
  },
  {
    ...powerz('playerCore',276,'Mindfire','Pyromancy',15),
    ...simpleCrunch('Willpower', ACTIVATION.ACTION, DURATION.SUSTAINED,'100 m',false),
    keywords: ['Fire','Psychic'],
    prerequisite: ['At least one other Pyromancy Power.'],
    effect: 'Hinder the enemy by raising his temperatur.',
  },
  {
    ...powerz('playerCore',276,'Molten Beam','Pyromancy',20),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'10 m',false),
    keywords: ['Fire','Psychic'],
    effect: 'Deal 18 +2 ED and might set targets On Fire.',
  },
  {
    ...powerz('playerCore',276,'Spontaneous Combustion','Pyromancy',10),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'20 m',true),
    keywords: ['Fire','Psychic'],
    effect: 'Deal 12 +1 ED and might set targets On Fire.',
  },
  {
    ...powerz('playerCore',276,'Wall Of Flame','Pyromancy',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'20 m',false),
    keywords: ['Fire','Psychic'],
    effect: 'Summon a 3x20x10 Wall, dealing up to 12 +1 ED any might set On Fire.',
  },
  // Telekinesis
  {
    ...powerz('playerCore',277,'Assail','Telekinesis',10),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'20 m',true),
    keywords: ['Kinetic','Psychic'],
    effect: 'Throw large objects (your mom?), dealing 10 +1 ED.',
  },
  {
    ...powerz('playerCore',277,'Crush','Telekinesis',10),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.SUSTAINED,'20 m',true),
    keywords: ['Kinetic','Psychic'],
    effect: 'Force grapple, dealing 10 +1 ED and might restrain.',
  },
  {
    ...powerz('playerCore',277,'Levitation','Telekinesis',8),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Kinetic','Psychic'],
    effect: 'Fly, but pay 1 shock per hour.',
  },
  {
    ...powerz('playerCore',278,'Telekinetic Dome','Telekinesis',15),
    ...simpleCrunch(5, ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Kinetic','Psychic'],
    prerequisite: ['At least one other Telekinesis Power.'],
    effect: 'Sustain a Force Field that grants +2 Resilience, cost shock to maintain.',
  },
  {
    ...powerz('playerCore',278,'Grav-Warp','Telekinesis',20),
    ...simpleCrunch('Willpower +2', ACTIVATION.ACTION, DURATION.SUSTAINED,'50 m',true),
    keywords: ['Kinetic','Psychic'],
    effect: 'Prone, Restrain or pull with manipulated gravity.',
  },
  {
    ...powerz('playerCore',278,'Shock Wave','Telekinesis',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.INSTANT,'5 m',false),
    keywords: ['Kinetic','Psychic'],
    effect: 'Deal 12 +1 ED and probably Prone those around you.',
  },
  // Telepathy
  {
    ...powerz('playerCore',278,'Erasure','Telepathy',15),
    ...simpleCrunch('Willpower +2', ACTIVATION.FULL_ACTION, DURATION.INSTANT,'30 m',true),
    keywords: ['Telepathy','Psychic'],
    prerequisite: ['At least one other Telepathy Power.'],
    effect: 'Purge some memories from the target.',
  },
  {
    ...powerz('playerCore',279,'Fog The Mind','Telepathy',15),
    ...simpleCrunch(4, ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'10 m',false),
    keywords: ['Telepathy','Psychic'],
    effect: 'Hinder and Stagger multiple foes.',
  },
  {
    ...powerz('playerCore',279,'Mind Probe','Telepathy',15),
    ...simpleCrunch('Willpower', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'30 m',false),
    keywords: ['Telepathy','Psychic'],
    prerequisite: ['At least one other Telepathy Power.'],
    effect: 'Probe the mind, ask questions, learn answers.',
  },
  {
    ...powerz('playerCore',279,'Psychic Shriek','Telepathy',10),
    ...simpleCrunch('Willpower', ACTIVATION.ACTION, DURATION.INSTANT,'50 m',true),
    keywords: ['Psychic'],
    effect: 'Deal d3+3 Shock and (Wil vs. DN 5) stagger.',
  },
  {
    ...powerz('playerCore',279,'Telepathy','Telepathy',5),
    ...simpleCrunch(3, ACTIVATION.ACTION, DURATION.SUSTAINED,'100 m',true),
    keywords: ['Telepathy','Psychic'],
    effect: 'Do the chit-chat, or eavesdrop. Use shifts to boost the range.',
  },
  {
    ...powerz('playerCore',280,'Terrify','Telepathy',15),
    ...simpleCrunch(5, ACTIVATION.FULL_ACTION, DURATION.INSTANT,'10 m',true),
    keywords: ['Telepathy','Psychic'],
    effect: 'Enemies must succeed a DN 5 Fear test of suffer the consequences.',
  },
  // Maleficarum
  {
    ...powerz('playerCore', 281, 'Dark Flame', 'Maleficarum', 15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.INSTANT, '20 m', false),
    keywords: ['Chaos', 'Psychic'],
    prerequisite: ['You must have the CHAOS Keyword.'],
    effect: 'Targets within Blast(Medium) suffer shock any maybe mortal wounds.',
    description:
      '<p>You unleash the roiling inferno of your rage. The power affects all creatures in a Medium Blast from a point in range, unholy flames burning their very souls. Affected targets suffer 1d3 + your Corruption level in Shock damage and must pass a DN 5 Toughness Test or suffer 1d3 Mortal Wounds as well.</p>',
  },
  {
    ...powerz('playerCore',281,'Possession','Maleficarum',20),
    ...simpleCrunch('Willpower', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'30 m',false),
    keywords: ['Chaos','Psychic'],
    prerequisite: ['You must have the CHAOS Keyword.'],
    effect: 'Dominate and control a target.',
    description:
      '<p>You breach your enemy’s mind, quashing its will completely, and turning their body into your puppet.</p>' +
      '<p>You and your target make an Opposed Willpower Test. If you succeed, the target is completely dominated — they have no free will whatsoever. With a simple thought you can compel the target to perform any task you choose as long as the power is Sustained. This control has no limits, and victims do anything you command them to do without question. You immediately gain 1 Corruption on activation of this power, and the target must make a DN 6 Corruption Test when the power ends.</p>' +
      '<p>Possession is mentally draining, as you must constantly overpower the target’s persona. You suffer 1d3+1 Shock for each target you control every round you sustain the power. You may not recover Shock while sustaining this power.</p>',
  },
  {
    ...powerz('playerCore',281,'Soul Shrivel','Maleficarum',20),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'20 m',true),
    keywords: ['Chaos','Psychic'],
    prerequisite: ['You must have the CHAOS Keyword.'],
    effect: 'Deal d3 Mortal Wounds and force a Corruption test.',
  },
  {
    ...powerz('playerCore',281,'Touch Of Corruption','Maleficarum',15),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.SUSTAINED,'Touch',true),
    keywords: ['Chaos','Psychic'],
    prerequisite: ['You must have the CHAOS Keyword.'],
    effect: 'Deal Corruption and trigger a temporary mutation.',
  },
  {
    ...powerz('playerCore',281,'Infernal Gaze','Maleficarum',10),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',true),
    keywords: ['Chaos','Psychic'],
    prerequisite: ['You must have the CHAOS Keyword.'],
    effect: 'Reduce Int and see hallucinations.',
  },
  // Runes of Battle
  {
    ...powerz('playerCore',283,'Conceal / Reveal','Runes of Battle',20),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',true),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'You reach out with your mind and take command of the shadows, bending and shaping them to your will.',
    effect: 'Concealed allies within 5m gain +1 to Defence and Stealth. Revealed targets can not benefit from Cover.',
  },
  {
    ...powerz('playerCore',283,'Embolden / Horrofy','Runes of Battle',20),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'You reach into the minds of those around you, either fortifying or eroding their resolve.',
    effect: 'Gain +1 to resolve or cause +1 DN to resolve tests.',
  },
  {
    ...powerz('playerCore',283,'Empower / Enervate','Runes of Battle',30),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'You commune with the spirits of those around you, expanding their potential or draining their will to fight.',
    effect: 'Gain +1 ED in melee or cause -1 ED in melee.',
  },
  {
    ...powerz('playerCore',284,'Enhance / Drain','Runes of Battle',30),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'Drawing upon the favour of Khaine, you enhance the combat prowess of your allies or diminish that of your enemies.',
    effect: 'Gain +1 to Weapon Skill or suffer +1 DN to Weapon Skill.',
  },
  {
    ...powerz('playerCore',284,'Protect / Jinx','Runes of Battle',20),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'Tugging on the threads of fate that surround any field of battle, you isolate and bind those of a specific individual, reshaping their destiny.',
    effect: 'Gain +1 to Resilience or suffer -1 to Resilience',
  },
  {
    ...powerz('playerCore',284,'Quicken / Restrain','Runes of Battle',20),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'You twist time itself, briefly altering its flow for a select few on the battlefield.',
    effect: 'Gain additional movement or apply difficult terrain.',
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
  abilities: coreUniversalAbilities,
};
