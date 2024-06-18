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
      maximumBySpeciesRepository: [
        {
          name: "Human",
          attributeMaximums: [
            { name: "Strength", value: 8 },
            { name: "Agility", value: 8 },
            { name: "Toughness", value: 8 },
            { name: "Intellect", value: 8 },
            { name: "Willpower", value: 8 },
            { name: "Fellowship", value: 8 },
            { name: "Initiative", value: 8 },
          ],
          traitMaximums: [{ name: "Speed", value: 8 }],
        },
        {
          name: "Ork",
          attributeMaximums: [
            { name: "Strength", value: 12 },
            { name: "Agility", value: 7 },
            { name: "Toughness", value: 12 },
            { name: "Intellect", value: 7 },
            { name: "Willpower", value: 8 },
            { name: "Fellowship", value: 7 },
            { name: "Initiative", value: 7 },
          ],
          traitMaximums: [{ name: "Speed", value: 7 }],
        },
        {
          name: "Eldar",
          attributeMaximums: [
            { name: "Strength", value: 7 },
            { name: "Agility", value: 12 },
            { name: "Toughness", value: 7 },
            { name: "Intellect", value: 10 },
            { name: "Willpower", value: 12 },
            { name: "Fellowship", value: 8 },
            { name: "Initiative", value: 12 },
          ],
          traitMaximums: [{ name: "Speed", value: 10 }],
        },
        {
          name: "Adeptus Astartes",
          attributeMaximums: [
            { name: "Strength", value: 10 },
            { name: "Agility", value: 9 },
            { name: "Toughness", value: 10 },
            { name: "Intellect", value: 10 },
            { name: "Willpower", value: 10 },
            { name: "Fellowship", value: 8 },
            { name: "Initiative", value: 9 },
          ],
          traitMaximums: [{ name: "Speed", value: 9 }],
        },
        {
          name: "Primaris Astartes",
          attributeMaximums: [
            { name: "Strength", value: 12 },
            { name: "Agility", value: 9 },
            { name: "Toughness", value: 12 },
            { name: "Intellect", value: 10 },
            { name: "Willpower", value: 10 },
            { name: "Fellowship", value: 8 },
            { name: "Initiative", value: 9 },
          ],
          traitMaximums: [{ name: "Speed", value: 9 }],
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
          name: "продвинутое оружие",
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
          description: "A character’s overall physical prowess",
        },
        {
          key: "arcana",
          name: "Аркана",
          attribute: "intellect",
          description:
            "Notice additional details, or perceive hidden or obscured objects.",
        },
        {
          key: "athletics",
          name: "Атлетика",
          attribute: "strength",
          description: undefined,
        },
        {
          key: "crafting",
          name: "Ремесло",
          attribute: "intellect",
          description: undefined,
        },
        {
          key: "deception",
          name: "Обман",
          attribute: "charisma",
          description: undefined,
        },
        {
          key: "diplomacy",
          name: "Дипломатия",
          attribute: "charisma",
          description: undefined,
        },
        {
          key: "intimidation",
          name: "Запугивание",
          attribute: "charisma",
          description: undefined,
        },
        {
          key: "medicine",
          name: "Медицина",
          attribute: "wisdom",
          description: undefined,
        },
        {
          key: "occultism",
          name: "Оккультизм",
          attribute: "intellect",
          description: undefined,
        },
        {
          key: "perfomance",
          name: "Выступление",
          attribute: "charisma",
          description: undefined,
        },
        {
          key: "religion",
          name: "Религия",
          attribute: "wisdom",
          description: "convince",
        },
        {
          key: "society",
          name: "Общество",
          attribute: "intellect",
          description: undefined,
        },
        {
          key: "stealth",
          name: "Скрытность",
          attribute: "dexterity",
          description: undefined,
        },
        {
          key: "survival",
          name: "Выживание",
          attribute: "wisdom",
          description: undefined,
        },
        {
          key: "thievery",
          name: "Воровство",
          attribute: "dexterity",
          description: undefined,
        },
      ],
      // https://api.sheety.co/2d702477-7a22-4d71-9c25-6119ee216253
      traitRepository: [
        {
          key: "defence",
          name: "Defence",
          attribute: "Initiative",
          description: undefined,
          type: "Combat",
          compute: { static: -1, multi: 1, tier: 0 },
        },
        {
          key: "resilience",
          name: "Resilience",
          attribute: "Toughness",
          description: undefined,
          type: "Combat",
          compute: { static: 1, multi: 1, tier: 0 },
        },
        {
          key: "determination",
          name: "Determination",
          attribute: "Toughness",
          description: undefined,
          type: "Combat",
          compute: { static: 0, multi: 1, tier: 0 },
        },
        {
          key: "maxWounds",
          name: "Max Wounds",
          attribute: "Toughness",
          description: undefined,
          type: "Combat",
          compute: { static: 0, multi: 1, tier: 2 },
        },
        {
          key: "maxShock",
          name: "Max Shock",
          attribute: "Willpower",
          description: undefined,
          type: "Combat",
          compute: { static: 0, multi: 1, tier: 1 },
        },
        {
          key: "conviction",
          name: "Conviction",
          attribute: "Willpower",
          description: undefined,
          type: "Mental",
          compute: { static: 0, multi: 1, tier: 0 },
        },
        {
          key: "resolve",
          name: "Resolve",
          attribute: "Willpower",
          description: undefined,
          type: "Mental",
          compute: { static: -1, multi: 1, tier: 0 },
        },
        {
          key: "influence",
          name: "Influence",
          attribute: "Fellowship",
          description: undefined,
          type: "Social",
          compute: { static: -1, multi: 1, tier: 0 },
          calculate: (base) => {
            return base - 1;
          },
        },
        {
          key: "wealth",
          name: "Wealth",
          attribute: undefined,
          description: undefined,
          type: "Social",
          compute: { static: 0, multi: 1, tier: 1 },
        },
        {
          key: "speed",
          name: "Speed",
          attribute: undefined,
          description: undefined,
          type: "Combat",
          compute: { static: 0, multi: 1, tier: 0 },
        },
        {
          key: "corruption",
          name: "Corruption",
          attribute: undefined,
          description: undefined,
          type: "Mental",
          compute: { static: 0, multi: 1, tier: 0 },
        },
        {
          key: "passiveAwareness",
          name: "Passive Awareness",
          attribute: undefined,
          skill: "Awareness",
          description: undefined,
          type: "Mental",
          compute: { static: 0, multi: 0.5, tier: 0 },
        },
      ],
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
