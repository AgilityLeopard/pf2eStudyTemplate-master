export default {
  data() {
    return {
      attributeRepository: [
        {
          key: "strength",
          name: "Сила",
          short: "Сил",
          description:
            "Сила измеряет физическую силу вашего персонажа. Она важна если персонаж собирается драться в ближнем бою. Ваш модификатор Силы добавляется к броскам урона ближнего боя, и определяет сколько веса может переносить персонаж.",
          order: 1,
        },
        {
          key: "dexterity",
          name: "Ловкость",
          short: "Лов",
          description:
            "Ловкость показывает проворность, чувство равновесия и рефлексы вашего персонажа. Она важна если персонаж собирается использовать дистанционные атаки, или скрытность, чтобы удивлять врагов. Еще ваш модификатор Ловкости добавляется к КБ и спасброскам Рефлекса.",
          order: 2,
        },
        {
          key: "constitution",
          name: "Телосложение",
          short: "Тел",
          description:
            "Телосложение показывает общую выносливость и здоровье персонажа. Она важна для всех персонажей, особенно для тех, кто дерется в ближнем бою. Ваш модификатор Телосложения добавляется к Очкам Здоровья и спасброскам Стойкости.",
          order: 3,
        },
        {
          key: "intellect",
          name: "Интеллект",
          short: "Инт",
          description:
            "Интеллект измеряет как хорошо ваш персонаж учится и соображает. Высокий Интеллект позволяет вашему персонажу анализировать ситуации и понимать шаблоны, и это значит, что он может обучиться дополнительным навыкам и выучить дополнительные языки.",
          order: 4,
        },
        {
          key: "wisdom",
          name: "Мудрость",
          short: "Муд",
          description:
            "Мудрость измеряет основные чувства, внимательность и интуицию персонажа. Ваш модификатор Мудрости добавляется к Восприятию и спасброскам Воли.",
          order: 5,
        },
        {
          key: "charisma",
          name: "Харизма",
          short: "Хар",
          description:
            "Харизма отражает притягательность и силу личности персонажа. Высокая Харизма помогает влиять на других и вдохновлять их.",
          order: 6,
        },
      ],
      Perception:
      {
        key: "perception",
        name: "Внимательность",
        attribute: "wisdom",
        description: "A character’s overall physical prowess",
      },
      WeaponRepository: [
        {
          key: "simple",
          name: "Простое оружие",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "martial",
          name: "Воинское оружие",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "advanced",
          name: "Продвинутое оружие",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "unarmed",
          name: "Безоружная атака",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
      ],
      DefenceRepository: [
        {
          key: "light",
          name: "Легкий доспех",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "medium",
          name: "Средний доспех",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "heavy",
          name: "Тяжелый доспех",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "unarmored",
          name: "Защита без доспехов",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
      ],
      SavingRepository: [
        {
          key: "reflex",
          name: "Рефлекс",
          attribute: "dexterity",
          description: "A character’s overall physical prowess",
        },
        {
          key: "fortitude",
          name: "Стойкость",
          attribute: "constitution",
          description: "A character’s overall physical prowess",
        },
        {
          key: "will",
          name: "Воля",
          attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
      ],
      // https://api.sheety.co/669365df-fa15-4003-ad7d-21d86e11b69a
      skillRepository: [
        {
          key: "acrobatics",
          name: "Акробатика",
          attribute: "dexterity",
          description: "Акробатика измеряет вашу способность выполнять задачи, требующие координации и изящества. При использовании основного действия Вырваться (Escape) , вы можете использовать свой модификатор Акробатики, вместо вашего модификатора безоружной атаки.",
          optional: false,
        },
        {
          key: "arcana",
          name: "Аркана",
          attribute: "intellect",
          description:
            "Аркана измеряет как много вы знаете об арканной магии и существах.",
          optional: false,
        },
        {
          key: "athletics",
          name: "Атлетика",
          attribute: "strength",
          description: "Атлетика позволяет совершать действия связанные с физической подготовкой. Когда вы используете простое действие Вырваться (Escape) , то можете использовать свой модификатор Атлетики вместо модификатора безоружной атаки.",
          optional: false,
        },
        {
          key: "crafting",
          name: "Ремесло",
          attribute: "intellect",
          description: "Вы можете использовать этот навык, чтобы создавать и ремонтировать предметы. Даже если вы нетренированы, вы можете использовать Вспомнить информацию (Recall Knowledge) .",
          optional: false,
        },
        {
          key: "deception",
          name: "Обман",
          attribute: "charisma",
          description: "Вы можете обманывать и вводить в заблуждение других, используя маскировку, ложь и другие виды уловок.",
          optional: false,
        },
        {
          key: "diplomacy",
          name: "Дипломатия",
          attribute: "charisma",
          description: "Вы влияете на других с помощью переговоров и лести.",
          optional: false,
        },
        {
          key: "intimidation",
          name: "Запугивание",
          attribute: "charisma",
          description: "Вы угрозами подчиняете других своей воле.",
          optional: false,
        },
        {
          key: "medicine",
          name: "Медицина",
          attribute: "wisdom",
          description: "Вы можете залатать раны и помочь людям оправиться от болезней и ядов. Даже если вы нетренированы Медицине, то можете Вспомнить информацию (Recall Knowledge) .",
          optional: false,
        },
        {
          key: "occultism",
          name: "Оккультизм",
          attribute: "intellect",
          description: "Вы много знаете о древних философиях, эзотерических знаниях, неясном мистицизме, и сверхъестественных существах. Даже если вы нетренированы Оккультизму, то можете Вспомнить информацию (Recall Knowledge) .",
          optional: false,
        },
        {
          key: "perfomance",
          name: "Выступление",
          attribute: "charisma",
          description: "Вы искусны в разных видах выступлений, используя свои таланты, чтобы впечатлять толпу или заработать на жизнь.",
          optional: false,
        },
        {
          key: "religion",
          name: "Религия",
          attribute: "wisdom",
          description: "Для вас открыты тайны божеств, догмы, верования и царства божественных созданий, как величественных, так и зловещих. Еще вы понимаете как работает магия, хотя ваше обучение придает этому знанию религиозный уклон. ",
          optional: false,
        },
        {
          key: "society",
          name: "Общество",
          attribute: "intellect",
          description: "Вы понимаете людей и принципы, которые управляют цивилизацией, и вы знаете исторические события, которые делают общества такими, какими они являются сегодня. Кроме того, вы можете использовать эти знания для управления сложной физической, социальной и экономической работой поселений. ",
          optional: false,
        },
        {
          key: "stealth",
          name: "Скрытность",
          attribute: "dexterity",
          description: "Вы умеете избегать обнаружения, что позволяет вам проскальзывать мимо врагов, прятаться или скрывать предмет.",
          optional: false,
        },
        {
          key: "nature",
          name: "Природа",
          attribute: "wisdom",
          description: "Вы много знаете о природе, командуете и тренируете животных и магических чудовищ. Даже если вы нетренированы Природе, то можете Вспомнить информацию (Recall Knowledge).",
          optional: false,
        },
        {
          key: "survival",
          name: "Выживание",
          attribute: "wisdom",
          description: "Вы знаток выживания в глуши, добывания пищи и строительства убежища, а с тренировкой вы открываете секреты выслеживания и заметания своих следов. ",
          optional: false,
        },
        {
          key: "thievery",
          name: "Воровство",
          attribute: "dexterity",
          description: "Вы обучены определенному набору навыков, которые предпочитают воры и негодяи.",
          optional: false,
        },
      ],
      // https://api.sheety.co/2d702477-7a22-4d71-9c25-6119ee216253
      sizeRepository: [
        {
          key: "medium",
          name: "Средний",
        },
        {
          key: "small",
          name: "Маленький",
        },
        {
          key: "Large",
          name: "Большой",
        },
      ],
      rarityRepository: [
        {
          key: "common",
          name: "Обычный",
        },
        {
          key: "uncommon",
          name: "Необычный",
        },
        {
          key: "rare",
          name: "Редкий",
        },
        {
          key: "unique",
          name: "Уникальный"
        },
      ],
      profiencyRepository: {
        U: 0,
        T: 2,
        E: 4,
        M: 6,
        L: 8,
      },
      statusRepository: [
        {
          key: "enfebled",
          name: "Ослаблен",
          description: "Вы ослаблены физически. Ослабление всегда имеет значение. Когда вы ослаблены, вы получаете штраф состояния равный значению состояния к броскам основанным на Силе, и КС, включая атаки ближнего боя основанные на Силе, броски урона основанные на Силе, и проверки Атлетики."
        },
        {
          key: "uncommon",
          name: "Необычный",
        },
        {
          key: "rare",
          name: "Редкий",
        },
        {
          key: "unique",
          name: "Уникальный"
        },
      ]
    };
  },
  methods: {
    getAttributeByKey(key) {
      return this.attributeRepository.find((a) => a.key === key);
    },
    getTraitByKey(key) {
      key = key.replace("wounds", "Max Wounds");
      key = key.replace("shock", "Max Shock");
      key = key.replace("soak", "Determination");
      const trait = this.traitRepository.find((a) => a.key === key);
      if (trait) return trait;
      console.warn(`No trait forund for ${key}`);
      return {
        key: key,
        name: key,
      };
    },
    getSkillByKey(key) {
      return this.skillRepository.find((s) => s.key === key);
    },
    getTraitsByKey(key) {
      return this.traitRepository.find((s) => s.key === key);
    },
    getAttributeMaximumForSpecies(speciesName, attributeName) {
      const species = this.maximumBySpeciesRepository.find(
        (species) => species.name === speciesName
      );
      const maximum = species.attributeMaximums.find(
        (attribute) => attribute.name === attributeName
      );
      return maximum ? maximum.value : undefined;
    },
    getTraitMaximumForSpecies(speciesName, traitName) {
      const species = this.maximumBySpeciesRepository.find(
        (species) => species.name === speciesName
      );
      const maximum = species.traitMaximums.find(
        (trait) => trait.name === traitName
      );
      return maximum ? maximum.value : undefined;
    },
    getCreationAttributeArrayByTier() {
      return [
        [2, 2, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 4, 4, 4],
        [3, 4, 4, 4, 4, 4, 5],
        [4, 4, 4, 4, 5, 5, 6],
        [4, 4, 5, 6, 6, 6, 7],
      ];
    },
    getCreationAttributeArrayByTierExamples() {
      return [
        {
          strength: 2,
          agility: 3,
          toughness: 3,
          intellect: 3,
          fellowship: 3,
          willpower: 2,
          initiative: 3,
        },
        {
          strength: 3,
          agility: 4,
          toughness: 4,
          intellect: 3,
          fellowship: 3,
          willpower: 4,
          initiative: 3,
        },
        {
          strength: 3,
          agility: 4,
          toughness: 4,
          intellect: 4,
          fellowship: 4,
          willpower: 5,
          initiative: 4,
        },
        {
          strength: 4,
          agility: 6,
          toughness: 5,
          intellect: 4,
          fellowship: 4,
          willpower: 4,
          initiative: 5,
        },
        {
          strength: 4,
          agility: 7,
          toughness: 6,
          intellect: 4,
          fellowship: 5,
          willpower: 6,
          initiative: 6,
        },
      ];
    },
    getCreationSkillArrayByTier() {
      return [
        [2, 3, 3, 3, 4],
        [2, 3, 3, 3, 3, 4, 4, 5],
        [2, 3, 3, 3, 4, 4, 4, 4, 5, 5],
        [2, 2, 2, 3, 4, 4, 4, 5, 5, 5, 6],
        [3, 4, 4, 4, 4, 4, 4, 4, 5, 6, 6, 7],
      ];
    },
    getCreationSkillArrayByTierExamples() {
      return [
        {
          athletics: 2,
          awareness: 3,
          ballisticSkill: 4,
          persuasion: 3,
        },
      ];
    },
  },
};
