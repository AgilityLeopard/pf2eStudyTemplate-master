import {source} from './_sourcesRepository';
import {stringToKebab} from './_stringUtils';

const cost = function (cost, archetype = 0, stats = 0, species = 0, other = 0) {
  return {
    cost,
    costs: {
      total: cost,
      archetype,
      stats,
      species,
      other,
    }
  };
}

// ...archetype(source.playerCore.key, 99,'Adepta Sororitas','Sister of Battle',2,'Human',94),
const archetype = function (sourceKey, sourcePage, name, tier, species, stub = false) {
  let speciesSourceKey = 'playerCore';
  let speciesName = 'Human';
  let split = [];
  split = species.split('/');
  if ( split.length === 2) {
    speciesSourceKey = split[0];
    speciesName = split[1];
  } else {
    split = species.split('-');
    if ( split.length >= 2 ){
      speciesSourceKey = split[0];
      speciesName = split.splice(1).map((i)=>i.charAt(0).toUpperCase() + i.slice(1)).join(' ');
    } else {
      speciesName = species;
    }
  }

  const speciesObject = {
    name: speciesName,
    key: `${speciesSourceKey.toLowerCase()}-${stringToKebab(speciesName)}`,
    sourceKey: speciesSourceKey.toLowerCase(),
  };

  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost,
    tier,
    species: [ speciesObject ],
    stub,
    wargear: [],
    prerequisites: [],
    archetypeFeatures: [],
    influence: 0,
  };
}

const wargearOptionFromString = function(partString) {
  let part = partString.trim();
  const gear = {};

  // of it does start with a number
  if (!isNaN(part.split(' ')[0])) {
    gear.amount = part.split(/ /)[0];
    part = part.split(/ (.+)/)[1];
    // remove trailing s, indicating a plural
    part = part.replace(/s$/, "");
  }

  // if it contains a /
  if (part.indexOf('/') > 0) {
    let parts = part.split('/');
    gear.name = parts[0];
    gear.variant = parts[1];
  } else {
    gear.name = part;
  }

  return gear;
}

const statBoost = function (str, dex, con, int, wis, cha) {
  return {
    attributeBoost: [
      { name: "Сила", key: "strength", value: str },
      { name: "Ловкость", key: "dexterity", value: dex },
      { name: "Телосложение", key: "constitution", value: con },
      { name: "Интеллект", key: "intellect", value: int },
      { name: "Мудрость", key: "wisdom", value: wis },
      { name: "Харизма", key: "charisma", value: cha },
    ],
  };
};

const playerCore =  [
  {
    ...archetype(source.playerCore.key,92,'Fighter',1,'Human'),
    ...cost(12,0,12, 0, 0),
    ...statBoost(0, 0, 0, 0, 0, 0),
    hint: 'Сражаясь ради чести, жадности, верности или просто ради азарта битвы, вы бесспорно являетесь мастером владения оружием и боевыми техниками. Вы сочетаете свои действия в комбинациях открывающих движений, завершающих ударов, и контратак, когда ваши враги по неосторожности ослабят защиту. Являетесь ли вы рыцарем, наемником, снайпером или мастером клинка, вы искусно отточили свои боевые навыки и обрушиваете сокрушительные критические атаки на своих врагов.',
    name: 'Воин',
    keywords: 'воин',
    hitpoints: 10,
    keyAbility: ["dexterity", "strength"],
    trait: ["воин"],
    rarity: "Common",
    skillTrainedChoice: ["acrobatics", "athletics"],
    skillTrained: [],
    skillTrainedPoints: 3,
    Perception: "E",
    skillAttack:
    {
      simple: "T",
      martial: "T",
      advanced: "T",
      unarmed: "T"
    },
    skillDefence:
    {
      light: "T",
      medium: "T",
      heavy: "T",
      unarmored: "T"
    },
    skillClass: "T",
    saving:
    {
      reflex: "E",
      fortitude: "E",
      will: "T",
    },
    isFeatLevelOne: true,
    description: [
      {
        name: 'encounter',
        text: '<p>Вы наносите удары с непревзойденной точностью и используете специализированные боевые приемы. Воин ближнего боя стоит между союзниками и врагами, атакуя врагов, которые пытаются пройти мимо. Воин дальнего боя производит точные выстрелы с расстояния.</p>'

      },
      {
        name: 'social',
        text: '<p>Вы можете быть устрашающим фактором. Это может быть полезно при переговорах с врагами, но иногда является помехой при более деликатных взаимодействиях.</p>'

      },
      {
        name: 'exporation',
        text: '<p>Вы на чеку, поддерживаете свою оборону, и следите за скрытыми угрозами. Еще вы преодолеваете физические трудности на своем пути, ломая двери, поднимая препятствия, ловко взбираясь и перепрыгивая через ямы.</p>'

      },
      {
        name: 'downtime',
        text: '<p>Вы можете заниматься ручным трудом или создавать и ремонтировать оружие. Если вы знаете приемы, которые вам больше не нравятся, то можете обучиться новым. Если вы имеете авторитет, то можете основать собственную организацию или крепость.</p>'

      },
      {
        name: 'you',
        text: '<li><p>Знать назначение и качество каждого оружия и части доспеха, которыми владеете</p></li><li><p>Признавать, что опасность жизни авантюриста должна быть уравновешена отличной попойкой или амбициозными делами</p></li><li><p>Быть нетерпеливым при решении головоломок или проблем, требующих обстоятельной логики или обучения</p></li>'
      },
      {
        name: 'other',
        text: '<li><p>Считать вас пугающим, пока не узнают вас поближе, а возможно, и даже после того, как узнают</p></li><li><p>Ожидать, что вы лишь грубая сила без мозгов</p></li><li><p>Уважать ваш опыт в военном искусстве и ценят ваше мнение о качестве вооружения</p></li>'
      }
    ],
    archetypeFeatures: [
      {
        name: 'Возможность для атаки',
        snippet: 'Всегда внимательный к уязвимостям, вы можете быстро атаковать неприятеля, который оставляет брешь в своей защите. Вы получаете реакцию "Возможность для атаки".',
        item: {key: 'Attack of the Opportunity', type: 'action'},
        key: 'fighterAbility',
        level: 1
      },
      {
        name: 'Блок щитом',
        snippet: 'Вы получаете общую черту Блок щитом / 1, это реакция для уменьшения урона с помощью щита.',
        item: {key: 'Shield Block', type: 'general'},
        key: 'fighterAbility',
        level: 1 
      },
      {
        name: 'Оценка противника',
        snippet: 'Независимо от того, осматриваете ли вы вражескую армию или просто стоите на страже, вы преуспеваете в наблюдении за своими врагами. Ваш уровень мастерства Восприятия увеличивается до мастера. Дополнительно, вы получаете бонус обстоятельства +2 к проверкам Восприятия для инициативы, что позволяет вам быстрее реагировать в бою.',
        // item: {key: 'Shield Block', type: 'general'},
        key: 'fighterAbility',
        level: 7 
      },
        ],
    modification:
      [     
      {
        key: "will",
        upgrade: "E",
        mode: "Upgrade",
        type: "Saving",
        level: 3,
      },

      {
        key: "weapon-specialization",
        // upgrade: "M",
        type: "weapon-specialization",
        level: 7, 
        bonusDamage: {
          E: 2,
          M: 3,
          L: 4,
        }
        // valueBonus: 2,
        // typeBonus: "damage"
      },
      {
        key: "Perception",
        upgrade: "M",
        type: "Perception",
        mode: "Upgrade",
        level: 7,
        valueBonus: 2,
        typeBonus: "circumstance"
      },
      {
        key: "fortitude",
        upgrade: "M",
        mode: "Upgrade",
        type: "Saving",
        level: 9,
      },
      {
        key: "light",
        upgrade: "E",
        mode: "Upgrade",
        type: "Defence",
        level: 11,
      },
      {
        key: "class",
        upgrade: "E",
        mode: "Upgrade",
        type: "DC Class",
        level: 11,
      },
      {
        key: "medium",
        upgrade: "E",
        mode: "Upgrade",
        type: "Defence",
        criticalSpecialization: true,
        level: 11,
      },
      {
        key: "heavy",
        mode: "Upgrade",
        upgrade: "E",
        type: "Defence",
        criticalSpecialization: true,
        level: 11,
      },
      {
        key: "unarmored",
        upgrade: "E",
        mode: "Upgrade",
        type: "Defence",
        level: 11,
      },
      {
        key: "simple",
        upgrade: "M",
        mode: "Upgrade",
        type: "Attack",
        level: 13,
      },
      {
        key: "martial",
        upgrade: "M",
        mode: "Upgrade",
        type: "Attack",
        level: 13,
      },
      {
        key: "advanced",
        upgrade: "E",
        mode: "Upgrade",
        type: "Attack",
        level: 13,
      },
      {
        key: "unarmed",
        mode: "Upgrade",
        upgrade: "M",
        type: "Attack",

        level: 13,
      },
      {
        key: "reflex",
        upgrade: "M",
        mode: "Upgrade",
        type: "Saving",
        level: 15,
      },
      {
        key: "greater-weapon-specialization",
        // upgrade: "M",
        type: "greater-weapon-specialization",
        level: 15, 
        bonusDamage: {
          E: 4,
          M: 6,
          L: 8,
        }
        // valueBonus: 2,
        // typeBonus: "damage"
      },
      {
        key: "light",
        upgrade: "M",
        mode: "Upgrade",
        type: "Defence",
        level: 17,
      },
      {
        key: "medium",
        upgrade: "M",
        type: "Defence",
        mode: "Upgrade",
        criticalSpecialization: true,
        level: 17,
      },
      {
        key: "heavy",
        upgrade: "M",
        mode: "Upgrade",
        type: "Defence",
        criticalSpecialization: true,
        level: 17,
      },
      {
        key: "unarmored",
        mode: "Upgrade",
        upgrade: "M",
        type: "Defence",
        level: 17,
      },
      {
        key: "simple",
        mode: "Upgrade",
        upgrade: "L",
        type: "Attack",
        level: 19,
      },
      {
        key: "martial",
        upgrade: "L",
        type: "Attack",
        mode: "Upgrade",
        level: 19,
      },
      {
        key: "advanced",
        upgrade: "M",
        mode: "Upgrade",
        type: "Attack",
        level: 19,
      },
      {
        key: "unarmed",
        upgrade: "L",
        mode: "Upgrade",
        type: "Attack",
        level: 19,
      },
      {
        key: "class",
        upgrade: "M",
        mode: "Upgrade",
        type: "DC Class",
        level: 19,
      },
    ]
  },

    {
    ...archetype(source.playerCore.key,92,'Bard',1,'Human'),
    ...cost(12,0,12, 0, 0),
    ...statBoost(0, 0, 0, 0, 0, 1),
    hint: 'Ваш проводник божественной силы сторонится традиционных каналов молитвы и служения - вместо этого вы собираете сакральные истины, которые выходят за рамки любого отдельного божества. Вы понимаете великие тайны вселенной, воплощенные во всеобъемлющих концепциях, которые превосходят добро и зло или хаос и порядок, независимо от того, воспринимаете ли вы общую связь между несколькими божествами или полностью обходите стороной их силу. Вы исследуете одну из этих тайн и используете ее силу, чтобы творить чудесные заклинания, но эта сила стоит ужасную цену: чем больше вы ее используете, тем сильнее становится проклятие. Ваши умения - обоюдоострый меч, который вы можете поддерживать как божественный инструмент или как проклятие богов.',
    name: 'Бард',
    keywords: 'бард',
    hitpoints: 8,
    // keyAbility: ["dexterity", "strength"],
     keyAbility: [],
    trait: ["бард"],
    rarity: "common",
    skillTrainedChoice: [],
    skillTrained: ['occultism', 'perfomance'],
    skillTrainedPoints: 4,
    spellTradition: 'оккультный',
    spellProgression: {
      1: [5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      2: [5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [5, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [5, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [5, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0],
      6: [5, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0],
      7: [5, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0],
      8: [5, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0],
      9: [5, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0],
      10: [5, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
      11: [5, 3, 3, 3, 3, 3, 2, 0, 0, 0, 0],
      12: [5, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0],
      13: [5, 3, 3, 3, 3, 3, 3, 2, 0, 0, 0],
      14: [5, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
      15: [5, 3, 3, 3, 3, 3, 3, 3, 2, 0, 0],
      16: [5, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0],
      17: [5, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0],
      18: [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
      19: [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
      20: [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    },
    spellsClass:
    {
      attack: "T",
      class: "T"
    },
    Perception: "E",
    skillAttack:
    {
      simple: "T",
      martial: "T",
      advanced: "U",
      unarmed: "T"
    },
    skillDefence:
    {
      light: "T",
      medium: "U",
      heavy: "U",
      unarmored: "T"
    },
    skillClass: "T",
    saving:
    {
      reflex: "T",
      fortitude: "T",
      will: "E",
    },
    isFeatLevelOne: false,
    // option: [
    //   {
    //     level
    //   }
    // ],
    description: [
      {
        name: 'encounter',
        text: '<p>Вы используете свое таинство, чтобы усилить себя в бою, уравновешивая чудесные эффекты с возрастающей степенью вашего проклятия, поскольку противоречивые божественные требования перенапрягают ваше физическое тело. Вы сотворяете заклинания, чтобы помочь своим союзникам и вредить своим врагам, или, в зависимости от вашего таинства, вы можете сами вступить в бой.</p>'

      },
      {
        name: 'social',
        text: '<p>Вы полагаетесь на озарения, почерпнутые из вашего таинства. Вы можете использовать свое проклятие, чтобы запугать людей или скрывать его последствия, чтобы не выделяться и слиться с толпой.</p>'

      },
      {
        name: 'exporation',
        text: '<p>Вы сосредотачиваетесь, чтобы взять под контроль ужасные метафизические конфликты, вызывающие ваше проклятие, чтобы вы позднее могли снова использовать силу своего таинства. Вы остаетесь в курсе сверхъестественных сил, действующих вокруг вас, возможно, заглядывая в будущее, чтобы получить озарения.</p>'

      },
      {
        name: 'downtime',
        text: '<p>Вы можете попытаться узнать больше о своем таинстве и божественных источниках, питающих вашу силу. Общение с другими интересующимися вашей тайной, может облегчить жизнь с вашим проклятием. Вы можете присоединиться к существующей религии или даже организовать свое собственное верование, посвященное вашей тайне.</p>'

      },
      {
        name: 'you',
        text: '<li><p>Считать свои силы оракула благословением, проклятьем или и тем и другим</p></li><li><p>Довести себя до предела того, что вы можете выдержать, чтобы творить великую магию</p></li><li><p>Полагаться на магические предметы, чтобы иметь запас безопасной и более надежной магии</p></li>'
      },
      {
        name: 'other',
        text: '<li><p>Не понимают, что ваше колдовство основывается на божественной силе, и вместо этого верят, что вы управляете чуждыми, и возможно злыми силами</p></li><li><p>Предполагают, что вы совершили какой-то ужасный проступок, чтобы стать проклятым богами</p></li><li><p>Восхищаются вашей решимостью и приносимыми жертвами, чтобы совершать удивительные поступки</p></li>'
      }
    ],
    archetypeFeatures: [
      {
        name: 'Возможность для атаки',
        snippet: 'Всегда внимательный к уязвимостям, вы можете быстро атаковать неприятеля, который оставляет брешь в своей защите. Вы получаете реакцию "Возможность для атаки".',
        item: {key: 'Attack of the Opportunity', type: 'action'},
        key: 'fighterAbility',
        level: 1
      },
      {
        name: 'Блок щитом',
        snippet: 'Вы получаете общую черту Блок щитом / 1, это реакция для уменьшения урона с помощью щита.',
        item: {key: 'Shield Block', type: 'general'},
        key: 'fighterAbility',
        level: 1 
      },
      {
        name: 'Оценка противника',
        snippet: 'Независимо от того, осматриваете ли вы вражескую армию или просто стоите на страже, вы преуспеваете в наблюдении за своими врагами. Ваш уровень мастерства Восприятия увеличивается до мастера. Дополнительно, вы получаете бонус обстоятельства +2 к проверкам Восприятия для инициативы, что позволяет вам быстрее реагировать в бою.',
        // item: {key: 'Shield Block', type: 'general'},
        key: 'fighterAbility',
        level: 7 
      },
        ],
    modification:
    [      
      {
        key: "will",
        upgrade: "M",
        type: "Saving",
          mode: "Upgrade",
        level: 7,
        },
      {
        key: "fortitude",
        upgrade: "E",
        type: "Saving",
          mode: "Upgrade",
        level: 9,
      },
      {
        key: "Perception",
        upgrade: "E",
        type: "Perception",
          mode: "Upgrade",
        level: 11,
        // valueBonus: 2,
        // typeBonus: "circumstance"
        },
        {
        key: "unarmed",
        upgrade: "E",
          type: "Attack",
          mode: "Upgrade",
        level: 11,
      },
      {
        key: "simple",
        upgrade: "E",
        type: "Attack",
          mode: "Upgrade",
        level: 11,
      },
      {
        key: "light",
        upgrade: "E",
        type: "Defence",
          mode: "Upgrade",
        level: 13,
      },
      {
        key: "unarmored",
        upgrade: "E",
          mode: "Upgrade",
        type: "Defence",
        level: 13,
        },
        {
        key: "reflex",
        upgrade: "E",
              type: "Saving",
          mode: "Upgrade",
        level: 13,
        },
      
      {
        key: "weapon-specialization",
        // upgrade: "M",
        type: "weapon-specialization",
        level: 13, 
        bonusDamage: {
          E: 2,
          M: 3,
          L: 4,
        }
        // valueBonus: 2,
        // typeBonus: "damage"
      },
            {
        key: "will",
        upgrade: "L",
        type: "Saving",
        mode: "Upgrade",
        level: 17,
        },
      
    ]
  },
];
  
const playerCore2 =  [
    {
    ...archetype(source.playerCore.key,92,'Oracle',1,'Human'),
    ...cost(12,0,12, 0, 0),
    ...statBoost(0, 0, 0, 0, 0, 1),
    hint: 'Ваш проводник божественной силы сторонится традиционных каналов молитвы и служения - вместо этого вы собираете сакральные истины, которые выходят за рамки любого отдельного божества. Вы понимаете великие тайны вселенной, воплощенные во всеобъемлющих концепциях, которые превосходят добро и зло или хаос и порядок, независимо от того, воспринимаете ли вы общую связь между несколькими божествами или полностью обходите стороной их силу. Вы исследуете одну из этих тайн и используете ее силу, чтобы творить чудесные заклинания, но эта сила стоит ужасную цену: чем больше вы ее используете, тем сильнее становится проклятие. Ваши умения - обоюдоострый меч, который вы можете поддерживать как божественный инструмент или как проклятие богов.',
    name: 'Оракул',
    keywords: 'оракул',
    hitpoints: 8,
    // keyAbility: ["dexterity", "strength"],
     keyAbility: [],
    trait: ["оракул"],
    rarity: "сommon",
    skillTrainedChoice: [],
    skillTrained: ['religion'],
    skillTrainedPoints: 3,
    spellsClass:
    {
      attack: "T",
      class: "T"
    },
    Perception: "T",
    skillAttack:
    {
      simple: "T",
      martial: "U",
      advanced: "U",
      unarmed: "T"
    },
    skillDefence:
    {
      light: "T",
      medium: "U",
      heavy: "U",
      unarmored: "T"
    },
    skillClass: "T",
    saving:
    {
      reflex: "T",
      fortitude: "T",
      will: "E",
    },
    isFeatLevelOne: false,
    // option: [
    //   {
    //     level
    //   }
    // ],
    description: [
      {
        name: 'encounter',
        text: '<p>Вы используете свое таинство, чтобы усилить себя в бою, уравновешивая чудесные эффекты с возрастающей степенью вашего проклятия, поскольку противоречивые божественные требования перенапрягают ваше физическое тело. Вы сотворяете заклинания, чтобы помочь своим союзникам и вредить своим врагам, или, в зависимости от вашего таинства, вы можете сами вступить в бой.</p>'

      },
      {
        name: 'social',
        text: '<p>Вы полагаетесь на озарения, почерпнутые из вашего таинства. Вы можете использовать свое проклятие, чтобы запугать людей или скрывать его последствия, чтобы не выделяться и слиться с толпой.</p>'

      },
      {
        name: 'exporation',
        text: '<p>Вы сосредотачиваетесь, чтобы взять под контроль ужасные метафизические конфликты, вызывающие ваше проклятие, чтобы вы позднее могли снова использовать силу своего таинства. Вы остаетесь в курсе сверхъестественных сил, действующих вокруг вас, возможно, заглядывая в будущее, чтобы получить озарения.</p>'

      },
      {
        name: 'downtime',
        text: '<p>Вы можете попытаться узнать больше о своем таинстве и божественных источниках, питающих вашу силу. Общение с другими интересующимися вашей тайной, может облегчить жизнь с вашим проклятием. Вы можете присоединиться к существующей религии или даже организовать свое собственное верование, посвященное вашей тайне.</p>'

      },
      {
        name: 'you',
        text: '<li><p>Считать свои силы оракула благословением, проклятьем или и тем и другим</p></li><li><p>Довести себя до предела того, что вы можете выдержать, чтобы творить великую магию</p></li><li><p>Полагаться на магические предметы, чтобы иметь запас безопасной и более надежной магии</p></li>'
      },
      {
        name: 'other',
        text: '<li><p>Не понимают, что ваше колдовство основывается на божественной силе, и вместо этого верят, что вы управляете чуждыми, и возможно злыми силами</p></li><li><p>Предполагают, что вы совершили какой-то ужасный проступок, чтобы стать проклятым богами</p></li><li><p>Восхищаются вашей решимостью и приносимыми жертвами, чтобы совершать удивительные поступки</p></li>'
      }
    ],
    archetypeFeatures: [
      {
        name: 'Возможность для атаки',
        snippet: 'Всегда внимательный к уязвимостям, вы можете быстро атаковать неприятеля, который оставляет брешь в своей защите. Вы получаете реакцию "Возможность для атаки".',
        item: {key: 'Attack of the Opportunity', type: 'action'},
        key: 'fighterAbility',
        level: 1
      },
      {
        name: 'Блок щитом',
        snippet: 'Вы получаете общую черту Блок щитом / 1, это реакция для уменьшения урона с помощью щита.',
        item: {key: 'Shield Block', type: 'general'},
        key: 'fighterAbility',
        level: 1 
      },
      {
        name: 'Оценка противника',
        snippet: 'Независимо от того, осматриваете ли вы вражескую армию или просто стоите на страже, вы преуспеваете в наблюдении за своими врагами. Ваш уровень мастерства Восприятия увеличивается до мастера. Дополнительно, вы получаете бонус обстоятельства +2 к проверкам Восприятия для инициативы, что позволяет вам быстрее реагировать в бою.',
        // item: {key: 'Shield Block', type: 'general'},
        key: 'fighterAbility',
        level: 7 
      },
        ],
    modification:
    [      
      {
        key: "will",
        upgrade: "M",
        type: "Saving",
          mode: "Upgrade",
        level: 7,
        },
      {
        key: "fortitude",
        upgrade: "E",
        type: "Saving",
          mode: "Upgrade",
        level: 9,
      },
      {
        key: "Perception",
        upgrade: "E",
        type: "Perception",
          mode: "Upgrade",
        level: 11,
        // valueBonus: 2,
        // typeBonus: "circumstance"
        },
        {
        key: "unarmed",
        upgrade: "E",
          type: "Attack",
          mode: "Upgrade",
        level: 11,
      },
      {
        key: "simple",
        upgrade: "E",
        type: "Attack",
          mode: "Upgrade",
        level: 11,
      },
      {
        key: "light",
        upgrade: "E",
        type: "Defence",
          mode: "Upgrade",
        level: 13,
      },
      {
        key: "unarmored",
        upgrade: "E",
          mode: "Upgrade",
        type: "Defence",
        level: 13,
        },
        {
        key: "reflex",
        upgrade: "E",
              type: "Saving",
          mode: "Upgrade",
        level: 13,
        },
      
      {
        key: "weapon-specialization",
        // upgrade: "M",
        type: "weapon-specialization",
        level: 13, 
        bonusDamage: {
          E: 2,
          M: 3,
          L: 4,
        }
        // valueBonus: 2,
        // typeBonus: "damage"
      },
            {
        key: "will",
        upgrade: "L",
        type: "Saving",
        mode: "Upgrade",
        level: 17,
        },
      
    ]
},
]; 
const archetypeRepository = [
  ...playerCore,

];

module.exports = archetypeRepository;
