const BUILDER_VERSION = 11;

export const state = () => ({
  list: [],
  characters: {},
  // version: 1,
});

export const getters = {
  characterIds: (state) => state.list,
  characterSets: (state) =>
    state.list.map((charId) => state.characters[charId]),

  characterEffectiveTierById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return {};
    }
    const archetypeTier = character.archetype.tier || 0;
    let ascensionTier = 0;
    character.ascensionPackages.forEach((i) => {
      if (i.targetTier > ascensionTier) {
        ascensionTier = i.targetTier;
      }
    });
    return Math.max(archetypeTier, ascensionTier);
  },

  characterStateJsonById: (state) => (id) => {
    const character = state.characters[id];
    let cleanCharacter = JSON.parse(JSON.stringify(character));
    cleanCharacter.avatarUrl = undefined;
    return JSON.stringify(cleanCharacter);
  },

  characterVersionById: (state) => (id) =>
    state.characters[id] ? state.characters[id].version : undefined,

  // Character setting
  characterSettingTierById: (state) => (id) =>
    state.characters[id] ? state.characters[id].settingTier : 1,
  characterSettingTitleById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].settingTitle
      : getDefaultState().settingTitle,
  characterCampaignCustomXpById: (state) => (id) =>
    state.characters[id] && state.characters[id].customXp
      ? parseInt(state.characters[id].customXp)
      : 0,
  characterCampaignCustomRankById: (state) => (id) =>
    state.characters[id] && state.characters[id].customRank
      ? parseInt(state.characters[id].customRank)
      : 1,

  characterSettingHomebrewsById: (state) => (id) =>
    state.characters[id] && state.characters[id].settingHomebrewContent
      ? state.characters[id].settingHomebrewContent
      : [],
  characterSettingOfficialOptionsById: (state) => (id) =>
    state.characters[id] && state.characters[id].settingOfficialOptions
      ? state.characters[id].settingOfficialOptions : [],

  characterSettingHouserulesById: (state) => (id) =>
    state.characters[id] && state.characters[id].settingHouserules
      ? state.characters[id].settingHouserules
      : getDefaultState().settingHouserules,

  // Cost & Spending
  characterSpeciesCostsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].species.cost : 0,
  characterArchetypeCostsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].archetype.cost : 0,
  characterAttributeCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    const attributeTotalCost = {
      //   [0, 1, 2,  3,  4,  5,  6,  7,   8,   9,  10,  11,  12],
      v10: [0, 0, 4, 10, 18, 33, 51, 72, 104, 140, 180, 235, 307],
      v15: [0, 0, 4, 10, 20, 35, 55, 80, 110, 145, 185, 230, 280],
    };
    const costKey =
      character.settingHouserules &&
        character.settingHouserules["skill-attribute-advancement-costs"]
        ? character.settingHouserules["skill-attribute-advancement-costs"]
        : "v15";
    let attributesSpending = 0;
    Object.keys(character.attributes).forEach((key) => {
      attributesSpending +=
        attributeTotalCost[costKey][character.attributes[key]];
    });
    return attributesSpending;
  },
  characterSkillCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    const skillTotalCost = {
      //   [0, 1, 2,  3,  4,  5,  6,  7,  8],
      v10: [0, 1, 3, 6, 10, 20, 32, 46, 70],
      v15: [0, 2, 6, 12, 20, 30, 42, 56, 72],
    };
    const costKey =
      character.settingHouserules &&
        character.settingHouserules["skill-attribute-advancement-costs"]
        ? character.settingHouserules["skill-attribute-advancement-costs"]
        : "v15";
    let skillSpending = 0;
    Object.keys(character.skills).forEach((key) => {
      skillSpending += skillTotalCost[costKey][character.skills[key]];
    });
    return skillSpending;
  },
  characterTalentCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    let spending = 0;
    character.talents
      .filter((talent) => talent)
      .forEach((talent) => {
        spending += talent.cost;
        if (talent.extraCost && typeof talent.extraCost === "object") {
          Object.keys(talent.extraCost).forEach((extraCostKey) => {
            spending += talent.extraCost[extraCostKey]
              ? talent.extraCost[extraCostKey]
              : 0;
          });
        } else {
          spending +=
            talent.extraCost && parseInt(talent.extraCost)
              ? talent.extraCost
              : 0;
        }
      });
    return spending;
  },
  characterAscensionCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    let spending = 0;
    // character.ascensionPackages.forEach((ascensionPackage) => {
    //   spending += ascensionPackage.cost;
    // });
    return spending;
  },
  characterPsychicPowerCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    let spending = 0;
    character.psychicPowers.forEach((psychicPower) => {
      spending += psychicPower.cost;
    });
    return spending;
  },
  characterLanguagesCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined || character.languages === undefined) {
      return 0;
    }
    let spending = 0;
    character.languages.forEach((language) => {
      spending += language.cost;
    });
    return spending;
  },
  // => total
  characterSpendBuildPointsById: (state, getters) => (id) => {
    let spend = 0;

    spend += getters.characterSpeciesCostsById(id);
    spend += getters.characterArchetypeCostsById(id);
    spend += getters.characterAttributeCostsById(id);
    spend += getters.characterSkillCostsById(id);
    spend += getters.characterTalentCostsById(id);
    spend += getters.characterAscensionCostsById(id);
    spend += getters.characterPsychicPowerCostsById(id);
    spend += getters.characterLanguagesCostsById(id);

    return spend;
  },
  characterTotalBuildPointsById: (state, getters) => (id) => {
    let total = 0;
    total += getters.characterSettingTierById(id) * 100;
    total += getters.characterCampaignCustomXpById(id);
    return total;
  },
  characterRemainingBuildPointsById: (state, getters) => (id) => {
    return (
      getters.characterTotalBuildPointsById(id) -
      getters.characterSpendBuildPointsById(id)
    );
  },

  // Character data
  characterNameById: (state) => (id) =>
    state.characters[id] ? state.characters[id].name : getDefaultState().name,
  characterAvatarUrlById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].avatarUrl
      : getDefaultState().avatarUrl,
  characterSpeciesKeyById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].species.key
      : getDefaultState().species.key,
  characterHeritageKeyById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].heritage.key
      : getDefaultState().heritage.key,
  characterSpeciesLabelById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].species.label
      : getDefaultState().species.label,
  characterHeritageLabelById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].heritage.label
      : getDefaultState().heritage.label,
  characterSpeciesAstartesChapterById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].speciesAstartesChapter
      : getDefaultState().speciesAstartesChapter,
  characterFactionKeyById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].faction.key
      : getDefaultState().faction.key,
  characterFactionLabelById: (state) => (id) =>
    state.characters[id] ? state.characters[id].faction.label : "unknown",

  characterArchetypeKeyById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].archetype.key
      : getDefaultState().faction.key,
  characterArchetypeLabelById: (state) => (id) =>
    state.characters[id] ? state.characters[id].archetype.value : "unknown",
  characterAscensionLabelById: (state) => (id) =>
    state.characters[id] ? state.characters[id].ascensionPackages.value : "unknown",
  characterArchetypeTierById: (state) => (id) =>
    state.characters[id] ? state.characters[id].archetype.tier : undefined,
  characterArchetypeKeywordsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].archetype.keywords : [],
  characterArchetypeMimicById: (state) => (id) =>
    state.characters[id] ? state.characters[id].archetype.mimic : undefined,

  characterFluffNotesById: (state) => (id) =>
    state.characters[id]?.fluff?.notes
      ? state.characters[id].fluff.notes
      : getDefaultState().fluff.notes,
  characterSkillPointsLevelById: (state) => (id) =>
    state.characters[id] ? state.characters[id].SkillPointsLevel : {},
  characterSkillTableLevelById: (state) => (id) =>
    state.characters[id] ? state.characters[id].SkillTableLevel : [],
  CharacterskillInitialById: (state) => (id) =>
    state.characters[id] ? state.characters[id].skillChoiceInitial : [],
  CharacterskillFromModificationById: (state) => (id) =>
    state.characters[id] ? state.characters[id].skillFromModification : {},
  characterSkillPointsClassId: (state) => (id) =>
    state.characters[id] ? state.characters[id].SkillPointsClass : 0,
  characterSkillPointsBackgroundId: (state) => (id) =>
    state.characters[id] ? state.characters[id].SkillPointBackground : 0,
  characterSkillPointsClassUpId: (state) => (id) =>
    state.characters[id] ? state.characters[id].SkillPointClassUp : 0,
  characterMoneyById: (state) => (id) =>
    state.characters[id] ? state.characters[id].money : {},
  characterSpeedById: (state) => (id) =>
    state.characters[id] ? state.characters[id].speed : {},
  characterBoostById: (state) => (id) =>
    state.characters[id] ? state.characters[id].Boost : 0,
  characterBoost5ById: (state) => (id) =>
    state.characters[id] ? state.characters[id].Boost5 : 0,
  characterBoost10ById: (state) => (id) =>
    state.characters[id] ? state.characters[id].Boost10 : 0,
  characterBoost15ById: (state) => (id) =>
    state.characters[id] ? state.characters[id].Boost15 : 0,
  characterBoost20ById: (state) => (id) =>
    state.characters[id] ? state.characters[id].Boost20 : 0,

  characterAttributesClassBoost: (state) => (id) =>
    state.characters[id] ? state.characters[id].attributesClassBoost : {},
  characterAttributeBoost: (state) => (id) =>
    state.characters[id] ? state.characters[id].attributesBoost : {},
  characterAttributeBoost5: (state) => (id) =>
    state.characters[id] ? state.characters[id].attributesBoost5 : {},
  characterAttributeBoost10: (state) => (id) =>
    state.characters[id] ? state.characters[id].attributesBoost10 : {},
  characterAttributeBoost15: (state) => (id) =>
    state.characters[id] ? state.characters[id].attributesBoost15 : {},
  characterAttributeBoost20: (state) => (id) =>
    state.characters[id] ? state.characters[id].attributesBoost20 : {},
  characterAncestryBoostById: (state) => (id) =>
    state.characters[id] ? state.characters[id].attributesAncestryBoost : {},
  characterBackgroundBoostId: (state) => (id) =>
    state.characters[id] ? state.characters[id].attributesBackgroundBoost : {},
  characterBackgroundBoost2Id: (state) => (id) =>
    state.characters[id] ? state.characters[id].attributesBackground2Boost : {},
  characterAncestryFreeBoostById: (state) => (id) =>
    state.characters[id] ? state.characters[id].AncestryFreeBoost : {},
  characterAncestryFreeBoost2ById: (state) => (id) =>
    state.characters[id] ? state.characters[id].AncestryFreeBoost2 : {},
  characterBackgroundFreeBoostById: (state) => (id) =>
    
    state.characters[id] ? state.characters[id].BackgroundFreeBoost : {},
  characterClassBoostById: (state) => (id) =>
    state.characters[id] ? state.characters[id].ClassBoost : {},
  characterClassSkillById: (state) => (id) =>
    state.characters[id] ? state.characters[id].ClassSkill : {},
  characterTrainedSkillClassById: (state) => (id) =>
    state.characters[id] ? state.characters[id].TrainedSkillClass : [],
  characterTrainedAdditionalSkillClassById: (state) => (id) =>
    state.characters[id] ? state.characters[id].TrainedAdditionalSkillClass : undefined,
  characterSkillSheetById: (state) => (id) => state.characters[id] ? state.characters[id].SkillSheet : [],
  characterBackgroundFreeBoost2ById: (state) => (id) =>
    state.characters[id] ? state.characters[id].BackgroundFreeBoost2 : {},
  characterAttributesById: (state) => (id) =>
    state.characters[id] ? state.characters[id].attributes : {},
  characterAttributesEnhancedById: (state) => (id) => {
    if (state.characters[id] === undefined) {
      return {};
    }
    const enhanced = { ...state.characters[id].attributes };
    const attributeEnhancements = state.characters[id].enhancements.filter(
      (e) => e.targetGroup === "attributes"
    );
    attributeEnhancements.forEach((m) => {
      console.info(
        `Enhance ${m.targetValue} by ${m.modifier} due to ${m.source}/${m.hint}.`
      );
      enhanced[m.targetValue] += m.modifier;
    });
    return enhanced;
  },
  characterHitPointsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].MaxHitPoints : {},
  characterCurrentHitPointsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].CurrentHP : 0,
  characterTempHitPointsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].TempHP : 0,
  characterBackSkillById: (state) => (id) =>
    state.characters[id] ? state.characters[id].BackSkill : "",

  characterSkillsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].skills : {},
  characterSavingById: (state) => (id) =>
    state.characters[id] ? state.characters[id].saving : {},
  characterSkillClassById: (state) => (id) =>
    state.characters[id] ? state.characters[id].skillClass : "U",
  characterBonusById: (state) => (id) =>
    state.characters[id] ? state.characters[id].Bonus : [],
  characterPerseptionById: (state) => (id) =>
    state.characters[id] ? state.characters[id].Perception : "U",
  characterWearById: (state) => (id) =>
    state.characters[id] ? state.characters[id].wearArmor : undefined,

  characterTraitsById: (state, getters) => (id) => {
    const character = state.characters[id];
    const enhancedAttributes = getters.characterAttributesEnhancedById(id);
    const skills = getters.characterSkillsById(id);
    const keywords = getters.characterKeywordsFinalById(id);
    if (character === undefined) {
      return {};
    }

    const traits = {};
    traits.defence = enhancedAttributes.initiative - 1;
    traits.resilience = enhancedAttributes.toughness + 1;
    traits.determination = enhancedAttributes.toughness;
    traits.maxWounds = enhancedAttributes.toughness + 2 * character.settingTier;
    traits.maxShock = enhancedAttributes.willpower + character.settingTier;
    traits.resolve = enhancedAttributes.willpower - 1;
    traits.conviction = enhancedAttributes.willpower;
    traits.passiveAwareness = Math.round(
      (enhancedAttributes.intellect + skills.awareness) / 2
    );

    traits.influence = enhancedAttributes.fellowship - 1;
    if (character.species.key && character.species.key === "core-ork") {
      traits.influence = enhancedAttributes.strength - 1;
    }

    // Data is Currency: Characters with the Adeptus Mechanicus keyword may use Intellect in place of Fellowship when calculating Influence.
    const hasMechanicusKeyword =
      keywords.find((k) => k === "Adeptus Mechanicus") !== undefined;
    const intellectGtFellowsip =
      enhancedAttributes.intellect > enhancedAttributes.fellowship;
    if (hasMechanicusKeyword && intellectGtFellowsip) {
      traits.influence = enhancedAttributes.intellect - 1;
    }

    traits.wealth = character.settingTier;
    traits.speed = 6;
    if (
      character.species.key &&
      ["core-aeldari", "aaoa-drukhari"].includes(character.species.key)
    ) {
      traits.speed = 8;
    }
    if (
      character.species.key &&
      ["aaoa-beastman"].includes(character.species.key)
    ) {
      traits.speed = 7;
    }
    if (
      character.species.key &&
      ["aaoa-squat"].includes(character.species.key)
    ) {
      traits.speed = 5;
    }
    if (character.species.key && character.species.key.endsWith("-astartes")) {
      traits.speed = 7;
    }

    traits.corruption = 0;
    return traits;
  },
  characterTraitsEnhancedById: (state, getters) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return {};
    }

    const enhanced = { ...getters.characterTraitsById(id) };
    const traitEnhancements = character.enhancements.filter(
      (e) => e.targetGroup === "traits"
    );
    traitEnhancements.forEach((m) => {
      enhanced[m.targetValue] += m.modifier;
    });
    return enhanced;
  },

  //
  characterEnhancementsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].enhancements : [],

  // Talents
  characterTalentsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].talents : [],

  // Spell
  characterSpellsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].spells : [],

  // Wargear
  characterWargearById: (state) => (id) =>
    state.characters[id] ? state.characters[id].wargear : [],

  // Powers
  characterPsychicPowersById: (state) => (id) =>
    state.characters[id] ? state.characters[id].psychicPowers : [],

  // Ascensions
  characterAscensionPackagesById: (state) => (id) =>
    state.characters[id] ? state.characters[id].ascensionPackages.key
      : getDefaultState().ascensionPackages.key,

  // Keywords
  characterKeywordsRawById: (state) => (id) =>
    state.characters[id] ? state.characters[id].keywords : [],
  characterKeywordsFinalById: (state) => (id) => {
    const keywords = state.characters[id] ? state.characters[id].keywords : [];
    return keywords.map((k) => (k.replacement ? k.replacement : k.name));
  },
  characterLevelById: (state) => (id) =>
    state.characters[id] ? state.characters[id].level : 1,
  // Mutations
  characterMutationsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].mutations : [],
  characterSkillPointsById: (state) => (id) =>
    state.characters[id] ? state.characters[id].SkillPoints : 0,

  characterskillAttackById: (state) => (id) =>
    state.characters[id] ? state.characters[id].skillAttack : {},
  characterskillDefenceById: (state) => (id) =>
    state.characters[id] ? state.characters[id].skillDefence : {},
  characterBackgroundById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].background
      : getDefaultState().background,
  characterBackgroundKeyById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].background.key
      : getDefaultState().background.key,
  characterBackgroundLabelById: (state) => (id) =>
    state.characters[id]
      ? state.characters[id].background.label
      : getDefaultState().background.label,

  characterLanguagesById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return [];
    }
    if (character.languages === undefined) {
      character.languages = getDefaultState().languages; // language migration
    }
    return character.languages;
  },

  characterResourceSpendById: (state, getters) => (id, resourceKey) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    if (character[resourceKey] === undefined) {
      character[resourceKey] = getDefaultState()[resourceKey]; // resource migration
    }
    return character[resourceKey].spend;
  },

  characterReloadsById: (state) => (id) =>
    state.characters[id] && state.characters[id].faith
      ? state.characters[id].reloads.points
      : getDefaultState().reloads.points,

  characterReloadsSpendById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    return character.reloads.spend;
  },

  characterFaithPointsById: (state) => (id) =>
    state.characters[id] && state.characters[id].faith
      ? state.characters[id].faith.points
      : getDefaultState().faith.points,
  characterFaithSpendById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    return character.faith.spend;
  },

  characterWoundsPointsById: (state, getters) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    return getters.characterTraitsById(id)["maxWounds"];
  },

  characterShockPointsById: (state, getters) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    return getters.characterTraitsById(id)["maxShock"];
  },

  characterWealthPointsById: (state, getters) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    return getters.characterTraitsById(id)["wealth"];
  },
  characterWealthSpendById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    if (character.wealth === undefined) {
      character.wealth = getDefaultState().wealth; // resource migration NOT REACTIVE
    }
    return character.wealth.spend;
  },

  characterCustomSkillsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return [];
    }
    if (character.customSkills === undefined) {
      character.customSkills = getDefaultState().customSkills; // migration  NOT REACTIVE
    }
    return character.customSkills;
  },
};

export const mutations = {
  setCharacterName(state, payload) {
    state.characters[payload.id].name = payload.name;
  },
  setCharacterAvatar(state, payload) {
    state.characters[payload.id].avatarUrl = payload.url;
  },
  setSettingTier(state, payload) {
    state.characters[payload.id].settingTier = payload.tier;
  },
  setSettingTitle(state, payload) {
    state.characters[payload.id].settingTitle = payload.title;
  },
  enableSettingHomebrews(state, payload) {
    state.characters[payload.id].settingHomebrewContent.push(payload.content);
  },
  setSettingHomebrews(state, payload) {
    state.characters[payload.id].settingHomebrewContent = payload.content;
  },
  setSettingHouserules(state, payload) {
    let character = state.characters[payload.id];
    const { key, value } = payload.houserule;
    character.settingHouserules[key] = value;
  },
  setCustomXp(state, payload) {
    state.characters[payload.id].customXp = payload.xp;
  },
  setLevel(state, payload) {
    // console.info(`Set Rank manually to ${payload.rank}.`);
    //this.setModification(state, payload);


    state.characters[payload.id].level = payload.level;
  },
  setModification(state, payload) {
    // console.info(`Set Rank manually to ${payload.rank}.`);
    const modification = state.characters[payload.id].enhancements.sort((a, b) => b.level - a.level).reverse().filter(s => s.level <= state.characters[payload.id].level);
    const character = state.characters[payload.id];

    if (modification) {
      modification.forEach(item => {

        switch (item.type) {
          case ("Perception"):
            {
              if (item.mode === "Upgrade")
                character.Perception = item.upgrade;
              break;
            }
          case ("Saving"):
            {
              if (item.mode === "Upgrade")
                character.saving[item.key] = item.upgrade;
              if (item.mode !== "Upgrade")
                character.Bonus.push(item);


              break;

            }
          case ("Speed"):
            {
              if (item.mode === "Bonus") {
                character.Bonus.push(item);
              }
              if (item.mode === "Upgrade")
                char.speed[item.key] = char.speed[item.key] < item.valueBonus;
              break;


            }
          case ("Defence"):
            {
              if (item.mode === "Upgrade")
                character.skillDefence[item.key] = item.upgrade;
              break;
            }
          case ("Attack"):
            {
              if (item.mode === "Upgrade")
                if (item.key === 'all')
                  Object.keys(character.skillAttack).forEach((key, index) => {
                    character.skillAttack[key] = item.upgrade;
                  });
                else
                  character.skillAttack[item.key] = item.upgrade;
              break;
            }
          case ("DC Class"):
            {
              if (item.mode === "Upgrade")
                character.skillClass = item.upgrade;
              break;
            }
          case ("Skill"):
            {
              // if (item.mode === "Upgrade") {

              //   const Initial = character.skillChoiceInitial;
              //   const Back = character.BackSkill;
              //   const classSkill = character.ClassSkill;
              //   const trained = character.TrainedSkillClass;
              //   const modSkill = character.skillFromModification[item.key];

              //   if (modSkill > 0) character.SkillPoints = character.SkillPoints + 1;
              //   else {

              //   }

              //   //Если он в списке 

              //   if ([Back, classSkill, trained, Initial].join().includes(item.key)) {
              //     character.SkillPoints = character.SkillPoints + 1;
              //     if (Initial.includes(item.key)) character.skillChoiceInitial = Initial.filter(s => s !== item.key);
              //   }
              //   else {
              //     if (!Initial.includes(item.key)) {



              //       var keys = Object.keys(character.SkillsTrained);
              //       var loc = keys.indexOf(character.skills[item.key]);
              //       character.skills[item.key] = keys[loc + 1];
              //     }

              //   }

              //   //Чтобы занести в лист модификаций

              //   character.skillFromModification[item.key] += 1;

              // }
              if (item.mode === "Add") {
                if (item.key === 'Lore') {

                  let newSkill = {};


                  newSkill[item.LoreSkill.key] = 'T'

                  if (character.level >= 3)
                    newSkill[item.LoreSkill.key] = 'E';

                  if (character.level >= 7)
                    newSkill[item.LoreSkill.key] = 'M';

                  if (character.level >= 15)
                    newSkill[item.LoreSkill.key] = 'L';

                  character.skills = {
                    ...character.skills,
                    ...newSkill,
                  };

                  character.customSkills.push(item.LoreSkill);

                }

              }
              break;

            }
          // case ("Weapon"): {
          //   // gear.traits.includes(item.key)
          //   const war = character.wargear.filter(w => w.name === item.key)
          //   //по названию
          //   if (war)
          //     war.forEach(w => {
          //       w.category = item.value === "martial" ? "simple" : w.category;
          //       w.category = item.value === "advanced" ? "martial" : w.category;

          //     })
          //   //по трейтам
          //   const traits = character.wargear.filter(w => w.traits.includes(item.key))
          //   if (traits)
          //     traits.forEach(w => {
          //       w.category = w.category === "martial" ? "simple" : w.category;
          //       w.category = w.category === "advanced" ? "martial" : w.category;

          //     })
          //   break;
          // }
        }

      }
      )
    }

  },
  clearModification(state, payload) {
    const modification = state.characters[payload.id].enhancements;
    const character = state.characters[payload.id];


    if (modification) {
      //для класса
      modification.forEach(item => {

        switch (item.type) {
          case ("Perception"):
            {
              if (item.mode === "Upgrade") {
                // var keys = Object.keys(character.SkillsTrained);
                // var loc = keys.indexOf(item.upgrade);
                character.Perception = "U";

              }
              break;
            }
          case ("Saving"):
            {
              if (item.mode === "Upgrade") {
                var keys = Object.keys(character.SkillsTrained);
                var loc = keys.indexOf(item.upgrade);
                character.saving[item.key] = "U";

              }
              if (item.mode !== "Upgrade")
                character.Bonus = character.Bonus.filter(i => i.talentId != item.talentId)

              break;
            }
          case ("Speed"):
            {
              if (item.mode === "Bonus") {
                character.Bonus = character.Bonus.filter(i => i.talentId != item.talentId)
              }
              if (item.mode === "Upgrade")
                char.speed[item.key] = 0;
              break;


            }
          case ("Defence"):
            {
              if (item.mode === "Upgrade") {
                var keys = Object.keys(character.SkillsTrained);
                var loc = keys.indexOf(item.upgrade);
                character.skillDefence[item.key] = "U";
              }
              break;


            }
          case ("Attack"):
            {
              if (item.mode === "Upgrade") {
                var keys = Object.keys(character.SkillsTrained);
                var loc = keys.indexOf(item.upgrade);
                character.skillAttack[item.key] = "U";
              }
              break;
            }
          case ("DC Class"):
            {
              if (item.mode === "Upgrade") {
                var keys = Object.keys(character.SkillsTrained);
                var loc = keys.indexOf(item.upgrade);
                character.skillClass = "U";
              }

              break;
            }
          case ("Skill"):
            {
              // if (item.mode === "Upgrade") {

              //   const Initial = character.skillChoiceInitial;
              //   const Back = character.BackSkill;
              //   const classSkill = character.ClassSkill;
              //   const trained = character.TrainedSkillClass;
              //   const modSkill = character.skillFromModification[item.key];
              //   const skillTable = Object.values(character.SkillPointsLevel).filter(s => s === item.key).length;

              //   if (modSkill > 0)
              //   //Если он в списке 
              //   {


              //     if (![Back, classSkill, trained].join().includes(item.key)) {
              //       //

              //       var keys = Object.keys(character.SkillsTrained);
              //       character.skills[item.key] = "U";

              //       let t = 2;
              //       while (t <= character.level) {
              //         let lab = 'level' + t
              //         const skillLevel = character.SkillPointsLevel[lab];
              //         if (skillLevel != "") {

              //           var loc = keys.indexOf(character.skills[skillLevel]);
              //           const newValue = keys[loc + 1];
              //           if (newValue === 'T' || newValue === 'M' && t >= 7 || newValue === 'E' && t >= 3 || newValue === 'L' && t >= 15) {
              //             character.skills[skillLevel] = newValue;
              //           }
              //         }

              //         t++;
              //       }


              //     }
              //     character.skillFromModification[item.key] -= 1;

              //   }

              // }
              if (item.mode === "Add") {
                if (item.key === 'Lore') {

                  delete character.skills[item.LoreSkill.key];
                  character.customSkills = character.customSkills.filter(
                    (s) => s.key !== item.LoreSkill.key
                  );


                }

              }
              break;
            }
          // case ("Weapon"): {
          //   // gear.traits.includes(item.key)
          //   const war = character.wargear.filter(w => w.name === item.key)
          //   //по названию
          //   if (war)
          //     war.forEach(w => {
          //       w.category = w.categoryOld;
          //       // w.category = item.value === "simple" ? "martial" : w.category;

          //     })
          //   //по трейтам
          //   const traits = character.wargear.filter(w => w.traits.includes(item.key))
          //   if (traits)
          //     traits.forEach(w => {
          //       w.category = w.categoryOld;
          //       // w.category = w.category === "martial" ? "advanced" : w.category;
          //       // w.category = w.category === "simple" ? "martial" : w.category;

          //     })
          //   break;
          // }

        }

      }
      )
    }

  },
  setCharacterHeritage(state, payload) {
    state.characters[payload.id].heritage = payload.heritage;
  },
  setCharacterSpecies(state, payload) {
    state.characters[payload.id].species = payload.species;
  },
  setCharacterSpeciesAstartesChapter(state, payload) {
    state.characters[payload.id].speciesAstartesChapter =
      payload.speciesAstartesChapter;
  },
  setCharacterArchetype(state, payload) {
    const character = state.characters[payload.id];
    state.characters[payload.id].archetype = payload.archetype;

  },
  setCharacterArchetypeCost(state, payload) {
    const { id, cost } = payload;
    state.characters[id].archetype = {
      ...state.characters[id].archetype,
      cost,
    };
  },
  setCharacterFaction(state, payload) {
    state.characters[payload.id].faction = payload.faction;
  },
  setCharacterSaving(state, payload) {
    state.characters[payload.id].saving = payload.payload.saving;

  },
  setCharacterPerception(state, payload) {
    state.characters[payload.id].Perception = payload.payload.Perception;
  },
  setCharacterskillAttack(state, payload) {
    state.characters[payload.id].skillAttack = payload.payload.skillAttack;
  },
  setCharacterskillInitial(state, payload) {
    const list = state.characters[payload.id].skillChoiceInitial;

    if (payload.payload.value > 0)
      state.characters[payload.id].skillChoiceInitial = [...list, payload.payload.skill];
    else {
      const list1 = list.filter(item => item !== payload.payload.skill);
      state.characters[payload.id].skillChoiceInitial = list1;
    }

  },
  setCharacterskillDefence(state, payload) {
    state.characters[payload.id].skillDefence = payload.payload.skillDefence;
  },
  setCharacterSkillPointsLevel(state, payload) {
    const pay = payload.payload;
    // const level = "level"+pay.level;
    state.characters[payload.id].SkillPointsLevel[pay.level] = pay.value;
  },
  setCharacterSkillTableLevel(state, payload) {
    const pay = payload.payload;
    // const level = "level"+pay.level;
    state.characters[payload.id].SkillTableLevel[pay.level] = pay.value;
  },
  setCharacterAdditionalTrainedClassSkill(state, payload) {
    const pay = payload.payload;
    // const level = "level"+pay.level;
    state.characters[payload.id].TrainedAdditionalSkillClass = pay.value;
  },
  setCharacterskillClass(state, payload) {
    state.characters[payload.id].skillClass = payload.payload.skillClass;
  },
  setInitialSkillSheet(state, payload) {
    const character = state.characters[payload.id];
    if (state.characters[payload.id].SkillSheet.length !== 0)
      state.characters[payload.id].SkillSheet = state.characters[payload.id].SkillSheet.filter(s => s.type === 'background' || s.type === 'feat');

  },
  addSkillSheet(state, payload) {
    const character = state.characters[payload.id];
    const key = payload.key;
    const level = payload.level;
    const type = payload.type;
    const source = payload.source ? payload : undefined;

    const skill = {
      level: level,
      type: type,
      key: key,
      optional: payload.optional,
      id: source,
      value: 1,
    }

    character.SkillSheet.push(skill);

  },
  removeSkillSheet(state, payload) {
    const character = state.characters[payload.id];
    const skill = character.SkillSheet.find(s => s.key === payload.key && s.level === payload.level);
    character.SkillSheet = character.SkillSheet.filter(s => s !== skill);

  },
  removeSkillSheetbyType(state, payload) {
    const character = state.characters[payload.id];
    const skill = character.SkillSheet.find(s => s.type === payload.type);
    character.SkillSheet = character.SkillSheet.filter(s => s.type !== payload.type);

  },
  setSkillSheet(state, payload) {
    const characterSkills = state.characters[payload.id].skills;

    const trained = state.characters[payload.id].TrainedSkillClass;
    const SkillProf = state.characters[payload.id].SkillsTrained;
    const keys = Object.keys(SkillProf);

    //   trained.forEach(skill =>
    //   {

    //     var loc = keys.indexOf(characterSkills[skill]);
    //     const newValue = keys[loc-1];
    //     characterSkills[skill] = newValue;
    //   }
    // );

    payload.payload.value.forEach(skill => {


      if (characterSkills[skill] === "T")
        state.characters[payload.id].SkillPoints = state.characters[payload.id].SkillPoints + 1;
      else
        characterSkills[skill] = "T"
    }
    );

    state.characters[payload.id].TrainedSkillClass = payload.payload.value;
    //this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });

  },
  setCharacterTrainedAdditionalClassSkill(state, payload) {
    const characterSkills = state.characters[payload.id].skills;

    const trained = state.characters[payload.id].TrainedAdditionalSkillClass;
    const SkillProf = state.characters[payload.id].SkillsTrained;
    const keys = Object.keys(SkillProf);

    //   trained.forEach(skill =>
    //   {

    //     var loc = keys.indexOf(characterSkills[skill]);
    //     const newValue = keys[loc-1];
    //     characterSkills[skill] = newValue;
    //   }
    // );

    if (trained)
      trained.forEach(skill => {
        characterSkills[skill] = "U"
      }
      );

    payload.payload.value.forEach(skill => {


      if (characterSkills[skill] === "T")
        state.characters[payload.id].SkillPoints = state.characters[payload.id].SkillPoints + 1;
      else
        characterSkills[skill] = "T"
    }
    );

    state.characters[payload.id].TrainedAdditionalSkillClass = payload.payload.value;
    //this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });

  },
  setCharacterTrainedClassSkill(state, payload) {
    const characterSkills = state.characters[payload.id].skills;

    const trained = state.characters[payload.id].TrainedSkillClass;
    const SkillProf = state.characters[payload.id].SkillsTrained;
    const keys = Object.keys(SkillProf);

    //   trained.forEach(skill =>
    //   {

    //     var loc = keys.indexOf(characterSkills[skill]);
    //     const newValue = keys[loc-1];
    //     characterSkills[skill] = newValue;
    //   }
    // );

    payload.payload.value.forEach(skill => {


      if (characterSkills[skill] === "T")
        state.characters[payload.id].SkillPoints = state.characters[payload.id].SkillPoints + 1;
      else
        characterSkills[skill] = "T"
    }
    );

    state.characters[payload.id].TrainedSkillClass = payload.payload.value;
    //this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });

  },
  setCharacterAncestryFreeBoost(state, payload) {
    const character = state.characters[payload.id];
    if (character.AncestryFreeBoost != "" && character.AncestryFreeBoost2 != character.AncestryFreeBoost) {
      character.attributesAncestryBoost[character.AncestryFreeBoost] -= 1;
      character.attributes[character.AncestryFreeBoost] -= 2;

    }

    character.AncestryFreeBoost = payload.payload.key;
    if (payload.payload.key != "" & payload.payload.key != character.AncestryFreeBoost2) {
      character.attributesAncestryBoost[payload.payload.key] = payload.payload.value;
      character.attributes[character.AncestryFreeBoost] += 2;
    }


  },
  setCharacterAncestryFreeBoost2(state, payload) {
    const character = state.characters[payload.id];
    if (character.AncestryFreeBoost2 != "" && character.AncestryFreeBoost2 != character.AncestryFreeBoost) {
      character.attributesAncestryBoost[character.AncestryFreeBoost2] -= 1;
      character.attributes[character.AncestryFreeBoost2] -= 2;

    }

    character.AncestryFreeBoost2 = payload.payload.key;
    if (payload.payload.key != "" && payload.payload.key != character.AncestryFreeBoost) {
      character.attributesAncestryBoost[payload.payload.key] = payload.payload.value;
      character.attributes[character.AncestryFreeBoost2] += 2;
    }


  },
  setCharacterBackgroundFreeBoost(state, payload) {
    const character = state.characters[payload.id];

    if (character.attributesBackground2Boost[payload.payload.key] != "" && character.BackgroundFreeBoost2 != character.BackgroundFreeBoost) {
      character.attributesBackgroundBoost[character.BackgroundFreeBoost] -= 1;
      character.attributes[character.BackgroundFreeBoost] -= 2;

    }

    character.BackgroundFreeBoost = payload.payload.key;
    if (payload.payload.key != "" & payload.payload.key != character.BackgroundFreeBoost2) {
      character.attributesBackgroundBoost[payload.payload.key] = payload.payload.value;
      character.attributes[character.BackgroundFreeBoost] += 2;
    }


  },

  setCharacterClassAttribute(state, payload) {
    const character = state.characters[payload.id];
    const key = payload.payload.key;
    if (character.ClassBoost != "") {

      character.attributes[character.ClassBoost] -= 2;

    }
    character.ClassBoost = payload.payload.key;
    if (key != "") {

      character.attributes[key] += 2;
    }


  },
  setCharacterClassSkill(state, payload) {
    const character = state.characters[payload.id];
    const key = payload.payload.key;


    const level = payload.payload.level;
    const type = payload.payload.type;
    const source = payload.payload.source ? payload.payload : undefined;

    const skill = {
      level: level,
      type: 'class',
      key: key,
      optional: payload.payload.optional,
      id: source,
      value: 1,
    }

    if (!character.SkillSheet.find(s => s.key === skill.key && s.level === skill.level))
      character.SkillSheet.push(skill);


    if (character.ClassSkill != "" && character.skills[character.ClassSkill] != "U") {
      character.skills[character.ClassSkill] = "U";
    }


    character.ClassSkill = payload.payload.key;
    if (key != "") {
      if (character.skills[character.ClassSkill] === 'T')
        character.SkillPoints += 1;
      else
        character.skills[character.ClassSkill] = "T";
    }


  },
  setCharacterClassSkillLevel(state, payload) {
    const character = state.characters[payload.id];
    const key = payload.payload.key;
    const characterSkills = state.characters[payload.id].skills;
    const index = payload.payload.level;
    const level = "level" + payload.payload.level;

    var keys = Object.keys(character.SkillsTrained);
    var loc = keys.indexOf(characterSkills[key]);
    const newValue = keys[loc + 1];

    if (character.SkillPointsLevel[level] != "") {

      var oldLoc = keys.indexOf(characterSkills[character.SkillPointsLevel[level]])
      const oldValue = keys[oldLoc - 1];
      characterSkills[character.SkillPointsLevel[level]] = oldValue;
    }

    if (newValue === 'T' || newValue === 'M' && index >= 7 || newValue === 'E' && index >= 3 || newValue === 'L' && index >= 15) {
      characterSkills[key] = newValue;
      character.SkillPointsLevel[level] = key;
    }
    else {
      character.SkillPointsLevel[level] = "";
    }




  },
  setCharacterBackgroundFreeBoost2(state, payload) {
    const character = state.characters[payload.id];
    if (character.BackgroundFreeBoost2 != "" && character.BackgroundFreeBoost2 != character.BackgroundFreeBoost) {
      character.attributesBackgroundBoost[character.BackgroundFreeBoost2] -= 1;
      character.attributes[character.BackgroundFreeBoost2] -= 2;

    }

    character.BackgroundFreeBoost2 = payload.payload.key;
    if (payload.payload.key != "" && payload.payload.key != character.BackgroundFreeBoost) {
      character.attributesBackgroundBoost[payload.payload.key] = payload.payload.value;
      character.attributes[character.BackgroundFreeBoost2] += 2;
    }


  },
  resetCharacterStats(state, payload) {
    const character = state.characters[payload.id];


    switch (payload.optional) {
      case "ancestry":
        {
          character.AncestryFreeBoost = "";
          character.AncestryFreeBoost2 = "";
          break;
        }
      case "background":
        {
          character.BackgroundFreeBoost = "";
          character.BackgroundFreeBoost2 = "";
          break;
        }
      case "class":
        {
          character.ClassBoost = "";
          character.ClassSkill = "";
          character.SkillPointsLevel = {

            level0: "",
            level1: "",
            level2: "",
            level3: "",
            level4: "",

            level5: "",
            level6: "",
            level7: "",
            level8: "",
            level9: "",

            level10: "",
            level11: "",
            level12: "",
            level13: "",
            level14: "",

            level15: "",
            level16: "",
            level17: "",
            level18: "",
            level19: "",

            level20: "",
          };
          character.skillChoiceInitial = [];

          break;

        }
      case "all":
        {
          character.AncestryFreeBoost = "";
          character.AncestryFreeBoost2 = "";
          character.ClassBoost = "";
          character.BackgroundFreeBoost = "";
          character.BackgroundFreeBoost2 = "";
          character.ClassSkill = "";

          character.SkillPointsLevel = {

            level0: "",
            level1: "",
            level2: "",
            level3: "",
            level4: "",

            level5: "",
            level6: "",
            level7: "",
            level8: "",
            level9: "",

            level10: "",
            level11: "",
            level12: "",
            level13: "",
            level14: "",

            level15: "",
            level16: "",
            level17: "",
            level18: "",
            level19: "",

            level20: "",
          };

          character.skillChoiceInitial = [];
          character.Boost = 0;
          character.Boost5 = 0;
          character.Boost10 = 0;
          character.Boost15 = 0;
          character.Boost20 = 0;



          Object.keys(character.attributes).forEach((key, index) => {

            character.attributesBoost[key] = 0;
            character.attributesBoost5[key] = 0;
            character.attributesBoost10[key] = 0;
            character.attributesBoost15[key] = 0;
            character.attributesBoost20[key] = 0;
          });
          break;
        }


    }


    Object.keys(character.attributes).forEach((key, index) => {

      character.attributes[key] =
        10 +
        2 * character.attributesBoost[key] +
        2 * character.attributesAncestryBoost[key] + 2 * character.attributesAncestryFlaw[key] + 2 * character.attributesClassBoost[key];
    });

    //следующие уровни
    if (character.level >= 5)
      Object.keys(character.attributesBoost5).forEach((key, index) => {
        const multiple = character.attributes[key] >= 17 ? 1 : 2;
        character.attributes[key] = character.attributes[key] + character.attributesBoost5[key] * multiple;
      });

    //следующие уровни
    if (character.level >= 10)
      Object.keys(character.attributesBoost10).forEach((key, index) => {
        const multiple = character.attributes[key] >= 17 ? 1 : 2;
        character.attributes[key] = character.attributes[key] + character.attributesBoost10[key] * multiple;
      });

    //следующие уровни
    if (character.level >= 15)
      Object.keys(character.attributesBoost15).forEach((key, index) => {
        const multiple = character.attributes[key] >= 17 ? 1 : 2;
        character.attributes[key] = character.attributes[key] + character.attributesBoost15[key] * multiple;
      });

    //следующие уровни
    if (character.level >= 20)
      Object.keys(character.attributesBoost20).forEach((key, index) => {
        const multiple = character.attributes[key] >= 17 ? 1 : 2;
        character.attributes[key] = character.attributes[key] + character.attributesBoost20[key] * multiple;
      });

    // if (payload.optional == "all") {
    //   character.SkillPoints = character.SkillPointsClass + (character.attributes["intellect"] - 10) / 2;
    //   if (character.SkillPoints < 0) character.SkillPoints = 0;
    //   character.customSkills = character.customSkills.filter(item => item.optional === true);
    // }

    // if (payload.optional == "all" || payload.optional == "ancestry") {
    //   character.SkillPoints = character.SkillPointsClass + (character.attributes["intellect"] - 10) / 2;


    //   if (character.SkillPoints < 0) character.SkillPoints = 0;
    // }

    Object.keys(character.skills).forEach((key, index) => {
      if (character.customSkills.find(item => item.key === key) === undefined) {
        if (payload.optional == "class") {

          character.skills[key] = "U";

        }

        if (payload.optional == "all") {
          if (character.TrainedSkillClass.find(item => item === key) === undefined)
            character.skills[key] = "U";

          if (character.TrainedSkillClass.find(item => item === key) !== undefined)
            character.skills[key] = "T";

        }
      }
      if (payload.optional == "all") {
        if (character.customSkills.find(item => item.key === key) !== undefined)
          character.skills[key] = "T";

      }
    });

    if (character.BackSkill != "")
      if (payload.optional == "all" || payload.optional == "class")
        if (character.skills[character.BackSkill] === "T")
          character.SkillPoints = character.SkillPoints + 1;
        else
          character.skills[character.BackSkill] = "T"


    ///Если дергаем ползунок уровня
    if (payload.optional == "level") {

      // character.SkillPoints = character.SkillPointsClass + (character.attributes["intellect"] - 10) / 2;
      if (character.SkillPoints < 0) character.SkillPoints = 0;

      Object.keys(character.skills).forEach((key, index) => {
        character.skills[key] = "U"
      });


      character.TrainedSkillClass.forEach(train => {
        character.skills[train] = 'T'

      })

      if (character.BackSkill != "")
        if (character.skills[character.BackSkill] === "T")
          character.SkillPoints = character.SkillPoints + 1;
        else
          character.skills[character.BackSkill] = "T"

      if (character.ClassSkill != "")
        if (character.skills[character.ClassSkill] === "T")
          character.ClassSkill = character.ClassSkill + 1;
        else
          character.skills[character.ClassSkill] = "T"



      character.skillChoiceInitial.forEach(train => {

        character.skills[train] = 'T'


      })

      let i = 2;

      while (i <= character.level) {
        let lab = 'level' + i
        const skillLevel = character.SkillPointsLevel[lab];
        if (skillLevel != "") {
          var keys = Object.keys(character.SkillsTrained);
          var loc = keys.indexOf(character.skills[skillLevel]);
          const newValue = keys[loc + 1];
          if (newValue === 'T' || newValue === 'M' && i >= 7 || newValue === 'E' && i >= 3 || newValue === 'L' && i >= 15) {
            character.skills[skillLevel] = newValue;
          }
        }

        i++;
      }

      Object.keys(character.skillFromModification).forEach((key, index) => {
        if (character.skillFromModification[key] > 0) {
          var keys = Object.keys(character.SkillsTrained);
          var loc = keys.indexOf(character.skills[key]);
          const newValue = keys[loc + 1];
          character.skills[key] = newValue;
        }

      });


    }


    // if (character.skills[character.BackSkill] === "T")
    //   character.SkillPoints = character.SkillPoints + 1;
    // else
    //   character.skills[character.BackSkill] = "T"




  },
  setCharacterSkillPoints(state, payload) {
    state.characters[payload.id].SkillPoints =
      payload.payload.value;
  },
  setCharacterSkillPointsClass(state, payload) {
    state.characters[payload.id].SkillPointsClass =
      payload.payload.value;
  },
  setCharacterSkillPointsBackground(state, payload) {
    state.characters[payload.id].SkillPointBackground =
      payload.payload.value;
  },
  setCharacterSkillPointClassUp(state, payload) {
    state.characters[payload.id].SkillPointClassUp =
      payload.payload.value;
  },
  setCharacterMoney(state, payload) {
    state.characters[payload.id].money[payload.nominal] =
      parseInt(payload.value);
  },
  setCharacterSkill(state, payload) {
    state.characters[payload.id].skills[payload.payload.key] =
      payload.payload.value;
  },
  setCharacterAttribute(state, payload) {
    const char = state.characters[payload.id];

    let theAttribute = state.characters[payload.id].attributes[payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributes[payload.payload.key] =
      payload.payload.value;
  },
  setCharacterBoost(state, payload) {
    const char = state.characters[payload.id];

    const theBoost = payload.payload.value;
    state.characters[payload.id].Boost =
      state.characters[payload.id].Boost + payload.payload.value;
  },
  setCharacterSpeed(state, payload) {
    const char = state.characters[payload.id];

    const type = payload.type;
    char.speed[type] =
      payload.speed;
  },
  setCharacterBoost5(state, payload) {
    const char = state.characters[payload.id];

    const theBoost = payload.payload.value;
    state.characters[payload.id].Boost5 =
      state.characters[payload.id].Boost5 + payload.payload.value;
  },
  setCharacterBoost10(state, payload) {
    const char = state.characters[payload.id];

    const theBoost = payload.payload.value;
    state.characters[payload.id].Boost10 =
      state.characters[payload.id].Boost10 + payload.payload.value;
  },
  setCharacterBackSkill(state, payload) {
    state.characters[payload.id].BackSkill = payload.payload.value

  },
  setCharacterBoost15(state, payload) {
    const char = state.characters[payload.id];

    const theBoost = payload.payload.value;
    state.characters[payload.id].Boost15 =
      state.characters[payload.id].Boost15 + payload.payload.value;
  },
  setCharacterBoost20(state, payload) {
    const char = state.characters[payload.id];

    const theBoost = payload.payload.value;
    state.characters[payload.id].Boost20 =
      state.characters[payload.id].Boost20 + payload.payload.value;
  },
  setCharacterAncestryBoost(state, payload) {
    const character = state.characters[payload.id];
    const species = state.characters[payload.id].species;
    let theAttribute = state.characters[payload.id].attributes[payload.key];

    Object.keys(character.attributesAncestryBoost).forEach((key, index) => {
      if (character.attributesAncestryBoost[key] != 0)
        state.characters[payload.id].attributes[key] =
          state.characters[payload.id].attributes[key] - 2;
      character.attributesAncestryBoost[key] = 0;
    });

    Object.keys(character.attributesAncestryBoost).forEach((key, index) => { });
    state.characters[payload.id].attributesAncestryBoost[payload.payload.key] =
      payload.payload.value;
    state.characters[payload.id].attributes[payload.payload.key] =
      state.characters[payload.id].attributes[payload.payload.key] + 2;
  },
  setCharacterAttributeBoost(state, payload) {
    const char = state.characters[payload.id];

    let theAttribute = state.characters[payload.id].attributes[payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributesBoost[payload.payload.key] =
      payload.payload.value;
  },
  setCharacterAttributeBoost5(state, payload) {
    const char = state.characters[payload.id];

    let theAttribute = state.characters[payload.id].attributes[payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributesBoost5[payload.payload.key] =
      payload.payload.value;
  },

  setCharacterAttributeBoost10(state, payload) {
    const char = state.characters[payload.id];

    let theAttribute = state.characters[payload.id].attributes[payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributesBoost10[payload.payload.key] =
      payload.payload.value;
  },
  setCharacterAttributeBoost15(state, payload) {
    const char = state.characters[payload.id];

    let theAttribute = state.characters[payload.id].attributes[payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributesBoost15[payload.payload.key] =
      payload.payload.value;
  },
  setCharacterAttributeBoost20(state, payload) {
    const char = state.characters[payload.id];

    let theAttribute = state.characters[payload.id].attributes[payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributesBoost20[payload.payload.key] =
      payload.payload.value;
  },
  setCharacterBackgroundBoostForAll(state, payload) {
    const char = state.characters[payload.id];

    let theAttribute =
      state.characters[payload.id].attributesBackgroundBoost[payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributesBackgroundBoost[payload.payload.key] =
      payload.payload.value;
  },
  setCharacterAncestryBoostForAll(state, payload) {
    const char = state.characters[payload.id];

    let theAttribute =
      state.characters[payload.id].attributesAncestryBoost[payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributesAncestryBoost[payload.payload.key] =
      payload.payload.value;
  },
  setCharacterClassBoostForAll(state, payload) {
    const char = state.characters[payload.id].attributesClassBoost[payload.key];


    let theAttribute =
      state.characters[payload.id].attributesClassBoost[payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributesClassBoost[payload.payload.key] =
      payload.payload.value;
  },
  setCharacterHitPoints(state, payload) {
    const char = state.characters[payload.id];
    if (payload.payload.type === "ancestry")
      char.MaxHitPoints["species"] = payload.payload.value;
    if (payload.payload.type === "class")
      char.MaxHitPoints["class"] = payload.payload.value;

  },
  setCurrentHP(state, payload) {
    const char = state.characters[payload.id];
    char.CurrentHP = payload.curHP;

  },
  setTempHP(state, payload) {
    const char = state.characters[payload.id];
    char.TempHP = payload.tempHP;

  },
  setCharacterAncestryFlawForAll(state, payload) {
    const char = state.characters[payload.id];

    let theAttribute =
      state.characters[payload.id].attributesAncestryFlaw[payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributesAncestryFlaw[payload.payload.key] =
      payload.payload.value;
  },
  addCharacterCustomSkill(state, payload) {
    let { id, skill } = payload;
    const character = state.characters[id];

    let newSkill = {};
    newSkill[skill.key] = 'T';
    character.skills = {
      ...character.skills,
      ...newSkill,
    };

    //Добавляем в повышение
    const key = skill.key;
    const level = skill.level;
    const source = skill.source ? skill.source : undefined;

    const skill1 = {
      level: level,
      type: skill.type,
      key: key,
      optional: payload.optional,
      id: source,
      value: 1,
    }

    character.SkillSheet.push(skill1);
    ///
    skill.custom = true;
    character.customSkills.push(skill);
  },
  removeBackgroundCustomSkill(state, payload) {
    const { id, key1 } = payload;
    const character = state.characters[id];

    character.customSkills.forEach(

      t => {
        if (t.background === true) {
          const key = t.key;
          delete character.skills[key];
          character.customSkills.pop(
            (s) => s.key === key
          );
        }

      }

    );


  },
  removeCharacterCustomSkill(state, payload) {
    const { id, key } = payload;
    const character = state.characters[id];

    character.SkillSheet = character.SkillSheet.filter(s => s.key !== key);
    delete character.skills[key];
    character.customSkills = character.customSkills.filter(
      (s) => s.key !== key
    );
  },

  /**
   * @param state
   * @param payload {
   *   id
   *   content {
   *     modifications
   *     source
   *   }
   * }
   */

  setCharacterModifications(state, payload) {
    const character = state.characters[payload.id];
    const { modifications } = payload.content;
    const source = payload.content.source || undefined;
    const level = payload.content.level;
    //payload.item - черта, особенность, предмет
    if (modifications)
      if (payload.content.optionsSelect) {
        if (character.enhancements.find(item => item.talentId === payload.content.talentId))
          character.enhancements.find(item => item.talentId === payload.content.talentId).key = modifications.key;
        else
          modifications.forEach((item) => {
            item.source = source;
            const war = {
              ...item,
              level: item.level ? item.level : level,
              talentId: payload.content.talentId
            }
            character.enhancements.push(war);
          });
      }
      else {

        // we remove all enhancements that share the cleanup value.
        modifications.forEach((item) => {
          item.source = source;
          const war = {
            ...item,
            level: level || item.level,
            talentId: payload.content.talentId
          }
          character.enhancements.push(war);
        });
      }

  },
  addCharacterModifications(state, payload) {
    const character = state.characters[payload.id];
    const { modifications } = payload.content;
    const source = payload.content.source || undefined;

    modifications.forEach((item) => {
      const uuid = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 8);
      item.id = uuid;
      item.source = source;
      character.enhancements.push(item);


    });
  },
  removeModification(state, payload) {
    const character = state.characters[payload.id];

    character.enhancements = character.enhancements.filter(
      (e) => e.talentId !== payload.talentId
    );
  },
  removeCharacterModificationById(state, payload) {
    const character = state.characters[payload.id];


    character.enhancements = character.enhancements.filter(
      (e) => e.id !== payload.modificationId
    );
  },


  clearCharacterEnhancementsBySource(state, payload) {
    const { id, source, exact } = payload;
    const character = state.characters[id];
    let { enhancements } = character;

    character.enhancements = character.enhancements.filter(
      (e) => e.source !== payload.source
    );


  },
  setCharacterSpeciesModifications(state, payload) {
    const character = state.characters[payload.id];

    character.enhancements = character.enhancements.filter(
      (e) => e.source !== "species"
    );
    payload.content.modifications.forEach((item) => {
      item.source = "species";
      character.enhancements.push(item);
    });
  },

  addCharacterClassModFeature(state, payload) {
    const character = state.characters[payload.id];

    character.enhancements = character.enhancements.filter(
      (e) => e.key !== payload.content.key
    );
    character.enhancements.push(payload.content);
    // payload.content.modifications.forEach((item) => {
    //   character.enhancements.push(item);
    // });
  },

  clearCharacterClassModFeature(state, payload) {
    const character = state.characters[payload.id];

    character.enhancements = character.enhancements.filter(
      (e) => e.key !== payload.content.key
    );
  },


  // Talents
  addCharacterTalent(state, payload) {
    const character = state.characters[payload.id];
    const { talent } = payload;

    if (talent.place === "background")
      character.talents = character.talents.filter(item => item.place != "background")

    if (talent.place === "free")
      talent.place = 'free' + (character.talents.filter(item => item.place.includes('free')).length + 1);

    const talentUniqueId = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 8);

    talent.id = talent.id || talentUniqueId;
    character.talents.push(talent);

  },
  removeCharacterTalent(state, payload) {
    const character = state.characters[payload.id];
    character.talents = character.talents.filter((t) => t); // cleanup
    const hasTalent =
      character.talents.find((t) => t.id === payload.talentId) !== undefined;

    if (hasTalent) {
      const talent = character.talents.find((t) => t.id === payload.talentId);
      if (talent.choice == "skill")
        if (character.skills[talent.selected] == "T")
          character.skills[talent.selected] = "U"
        else
          character.SkillPoints = character.SkillPoints - 1;

      character.talents = character.talents.filter(
        (t) => t.id !== payload.talentId
      );

      character.talents = character.talents.filter(
        (t) => t.link !== payload.talentId
      );
    }
  },

  removeCharacterTalentbySource(state, payload) {
    const character = state.characters[payload.id];
    character.talents = character.talents.filter((t) => t.source !== payload.source); // cleanup

  },

  // Spell
  addCharacterSpell(state, payload) {
    const character = state.characters[payload.id];
    const { talent } = payload;


    const talentUniqueId = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 8);

    talent.id = talent.id || talentUniqueId;
    character.spells.push(talent);

  },
  removeCharacterSpell(state, payload) {
    const character = state.characters[payload.id];
    character.spells = character.spells.filter((t) => t.id !== payload.talentId); // cleanup

  },
  /**
   * @param state
   * @param payload { id, source: `ascension.${key}`, cascade: true }
   */
  clearCharacterTalentsBySource(state, payload) {
    const character = state.characters[payload.id];
    const { source, cascade } = payload;
    if (character.talents.length > 0) {
      character.talents = character.talents.filter(
        (k) => k.source === undefined || !k.source.includes(source)
      );

    }
  },
  setCharacterTalentSelected(state, payload) {
    const character = state.characters[payload.id];
    const { id, key, name, choice, selected } = payload.talent;
    character.talents = character.talents.filter((t) => t); // cleanup


    const theTalent = character.talents.find((t) => t.id === id);
    const theOtherTalents = character.talents.filter((t) => t.id !== id);

    if (choice == "skill" && theTalent.selected)
      if (character.skills[theTalent.selected] == "T")
        character.skills[theTalent.selected] = "U"
      else
        character.SkillPoints = character.SkillPoints - 1;

    if (theTalent) {
      // the character has a talent with the given uniqueID, thus we set the talents selected value accordingly
      theTalent.selected = selected;
    }

    character.talents = [...theOtherTalents, theTalent];
    if (choice == "skill")
      if (character.skills[selected] == "U")
        character.skills[selected] = "T"
      else
        character.SkillPoints = character.SkillPoints + 1;
  },
  setCharacterTalentExtraCost(state, payload) {
    const character = state.characters[payload.charId];
    const { id, key, name, extraKey, extraCost } = payload;


    const theTalent = character.talents.find((t) => t.id === id);
    const theOtherTalents = character.talents.filter((t) => t.id !== id);

    if (theTalent) {
      if (typeof theTalent.extraCost !== "object") {
        theTalent.extraCost = {};
      }
      theTalent.extraCost[extraKey] = extraCost;
    }

    character.talents = [...theOtherTalents, theTalent];
  },

  // Mutations
  addCharacterMutation(state, payload) {
    const { id, mutation } = payload;
    const character = state.characters[id];

    const uuid = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 8);


    mutation.id = uuid;
    character.mutations.push(mutation);
  },
  removeCharacterMutation(state, payload) {
    const character = state.characters[payload.id];
    const hasMutation =
      character.mutations.find((t) => t.id === payload.uuid) !== undefined;
    if (hasMutation) {
      character.mutations = character.mutations.filter(
        (t) => t.id !== payload.uuid
      );
    }
  },

  updateCharacterWargear(state, payload) {
    const character = state.characters[payload.id];
    const gearId = payload.gear.id;
    const edit = payload.notEnc;
    const Wargear =
      character.wargear.find((t) => t.id === gearId);
    if (Wargear && edit === false) {
      Wargear.runeWeapon.striking = payload.striking;
      Wargear.runeWeapon.potency = payload.potency;
      Wargear.damage = payload.damage;
      Wargear.runeWeapon.property = payload.property;
    }
    if (Wargear && edit === true) {
      Wargear.qty = payload.qty;
    }

  },

  // Wargear { id, name, source, (variant) }
  addCharacterWargear(state, payload) {
    const character = state.characters[payload.id];
    const wargearUniqueId = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 8);

    if (payload.gear && payload.gear.modifiers) {
    }
    const wargear = payload.gear;
    wargear.id = wargearUniqueId;
    character.wargear.push({
      // id: wargearUniqueId,
      name: payload.name,
      source: payload.source,
      variant: payload.variant,
      ...wargear
    });

  },
  removeCharacterWargear(state, payload) {
    const character = state.characters[payload.id];
    const { gearId } = payload;
    const hasWargear =
      character.wargear.find((t) => t.id === gearId) !== undefined;
    if (hasWargear) {
      character.wargear = character.wargear.filter((t) => t.id !== gearId);
    }
  },
  wearCharacterWargear(state, payload) {
    const character = state.characters[payload.id];
    const { gearId } = payload;
    const hasWargear =
      character.wargear.find((t) => t.id === gearId) !== undefined;
    if (hasWargear) {
      character.wearArmor = payload.gear;
    }
  },
  unwearCharacterWargear(state, payload) {
    const character = state.characters[payload.id];
    const { gearId } = payload;
    const hasWargear =
      character.wargear.find((t) => t.id === gearId) !== undefined;
    if (hasWargear) {
      character.wearArmor = undefined;
    }
  },
  removeCharacterWargearBySource(state, payload) {
    const character = state.characters[payload.id];
    const { source } = payload;
    character.wargear = character.wargear.filter(
      (item) => !item.source.includes(source)
    );
  },

  // Psychic Powers
  addCharacterPsychicPower(state, payload) {
    const character = state.characters[payload.id];
    const hasPower =
      character.psychicPowers.find((t) => t.name === payload.name) !==
      undefined;
    if (!hasPower) {

      character.psychicPowers.push({
        key: payload.key,
        name: payload.name,
        cost: payload.cost,
        source: payload.source || undefined,
      });
    }
  },
  removeCharacterPsychicPower(state, payload) {
    const character = state.characters[payload.id];
    const foundPower = character.psychicPowers.find(
      (t) => t.name === payload.name
    );
    if (foundPower) {

      character.psychicPowers = character.psychicPowers.filter(
        (t) => t.name !== payload.name
      );
    }
  },
  clearCharacterPsychicPowersBySource(state, payload) {
    const character = state.characters[payload.id];
    if (character.psychicPowers.length > 0) {

      character.psychicPowers = character.psychicPowers.filter(
        (k) => k.source === undefined || !k.source.includes(payload.source)
      );

    }
  },

  // Ascension & Ascension Packages
  addCharacterAscensionPackage(state, payload) {
    const character = state.characters[payload.id];
    character.ascensionPackages = payload;
  },
  setCharacterAscensionPackageStoryElement(state, payload) {
    const character = state.characters[payload.id];

    // find package by payload.ascensionPackageKey and payload.ascensionPackage
    const index = character.ascensionPackages.findIndex(
      (a) =>
        a.key === payload.ascensionPackageKey &&
        a.targetTier === payload.ascensionPackageTargetTier
    );
    if (index >= 0) {
      character.ascensionPackages[index].storyElementChoice =
        payload.ascensionPackageStoryElementKey;
    }
  },
  setCharacterAscensionPackageWargearOption(state, payload) {
    const character = state.characters[payload.id];

    // find package by payload.ascensionPackageKey and payload.ascensionPackage
    const index = character.ascensionPackages.findIndex(
      (a) =>
        a.key === payload.ascensionPackageKey &&
        a.targetTier === payload.ascensionPackageTargetTier
    );
    if (index >= 0) {
      if (character.ascensionPackages[index].featureChoices === undefined)
        character.ascensionPackages[index] = {
          ...character.ascensionPackages[index],
          featureChoices: {},
        };
      character.ascensionPackages[index].featureChoices[
        payload.ascensionPackageFeatureName
      ] = payload.ascensionPackageFeatureOptionChoiceKey;
    }
  },
  clearCharacterAscensionPackage(state, payload) {
    const { id, value, key } = payload;
    const character = state.characters[id];
    character.ascensionPackages = character.ascensionPackages.filter(
      (a) => a.key !== key
    );
  },

  // Background { id, type, key }
  setCharacterBackground(state, payload) {
    const { id, type, key } = payload;
    const character = state.characters[id];

    character.background[type] = key;
  },
  setCharacterBackgroundPlusOne(state, payload) {
    const { id, type, key, plusOne } = payload;
    const character = state.characters[id];

    character.background.plusOne = key;
  },

  // languages
  addCharacterLanguage(state, payload) {
    const character = state.characters[payload.id];
    const { name, cost, source } = payload;
    const language = { name, cost, source };
    character.languages.push(language);
  },
  removeCharacterLanguage(state, payload) {
    const character = state.characters[payload.id];
    const { name } = payload;
    character.languages = character.languages.filter(
      (language) => language.name.localeCompare(name, "en") !== 0
    );
  },

  setCharacterFluffNotes(state, payload) {
    const { id, notes } = payload;
    const character = state.characters[id];
    if (character.fluff === undefined) character["fluff"] = { notes: "" };
    character.fluff.notes = notes;
  },

  // Keywords
  addCharacterKeyword(state, payload) {
    const character = state.characters[payload.id];
    const { keyword } = payload;
    character.keywords.push(keyword);
  },
  clearCharacterKeywordsBySource(state, payload) {
    const character = state.characters[payload.id];
    const { source, cascade } = payload;
    if (character.keywords.length > 0) {

      character.keywords = character.keywords.filter(
        (k) => k.source !== source
      );
      if (cascade) {
        character.keywords = character.keywords.filter(
          (k) => !k.source.startsWith(source)
        );
      }

    }
  },
  /**
   * keyword { name:String, source:String, type:String, replacement:undefined/String }
   * @param payload { placeholder:String, replacement:String, source:String}
   */
  replaceCharacterKeywordPlaceholder(state, payload) {
    const character = state.characters[payload.id];
    if (character.keywords.length > 0) {
      const placeholderKeyword = character.keywords.find(
        (k) => k.source === payload.source && k.name === payload.placeholder
      );
      if (placeholderKeyword) {
        placeholderKeyword.replacement = payload.replacement;
        character.keywords = character.keywords.filter(
          (k) =>
            !(k.source === payload.source && k.name === payload.placeholder)
        );
        character.keywords.push(placeholderKeyword);
      }
    }
  },

  setCharacterResourceSpend(state, payload) {
    const { id, spend, resourceKey } = payload;
    const character = state.characters[id];
    const resource = character[resourceKey];
    resource.spend = spend;
  },

  setCharacterFaithSpend(state, payload) {
    const { id, spend } = payload;
    const character = state.characters[id];
    const faith = character.faith;
    faith.spend = spend;
  },

  // character handling
  create(state, id) {
    state.list.push(id);
    const newChar = {};
    Object.assign(newChar, getDefaultState());
    newChar.id = id;
    const newObj = {};
    newObj[id] = newChar;
    state.characters = {
      ...state.characters,
      ...newObj,
    };
  },
  import(state, payload) {
    state.list.push(payload.id);
    const newChar = {};
    Object.assign(newChar, JSON.parse(payload.stateString));
    newChar.id = payload.id;
    const newObj = {};
    newObj[payload.id] = newChar;
    state.characters = {
      ...state.characters,
      ...newObj,
    };
  },
  add(state, character) {
    state.list.push(character.id);
  },

  remove(state, characterId) {
    state.list.splice(state.list.indexOf(characterId), 1);
    delete state.characters[characterId];
  },

  migrate(state, config) {
    const character = state.characters[config.characterId];

    switch (character.version) {
      case 10:

        character.version = 11;
        character.enhancements = character.enhancements.map((e) => {
          if (e.source) {
            e.source = e.source.includes("species.Asuryani Paths.Path")
              ? e.source.replace(
                "species.Asuryani Paths.Path",
                "species.Asuryani Paths.0.Path"
              )
              : e.source;
          }
          return e;
        });
        state.characters[config.characterId] = { ...character };

        break;
      case 9:
        console.debug(`v9 -> v10 : adding mutations.`);
        const mutations = {
          mutations: getDefaultState().mutations,
        };
        character.version = 10;
        state.characters[config.characterId] = {
          ...character,
          ...mutations,
        };

        break;
      case 8:

        const fluff = {
          fluff: getDefaultState().fluff,
        };
        character.version = 9;
        state.characters[config.characterId] = {
          ...character,
          ...fluff,
        };

        break;
      case 7:
        console.debug(`v7 -> v8 : Adding houserules handling.`);
        const settingHouserules = {
          settingHouserules: getDefaultState().settingHouserules,
        };
        character.version = 8;
        state.characters[config.characterId] = {
          ...character,
          ...settingHouserules,
        };

        break;
    }
  },
};

export const actions = {
  clearCharacterAscensionPackage({ commit, state }, payload) {
    const { id, value, key } = payload;




    commit("clearCharacterEnhancementsBySource", {
      id,
      source: `ascension.${key}`,
    });


    commit("clearCharacterKeywordsBySource", {
      id,
      source: `ascension.${key}`,
      cascade: true,
    });


    commit("clearCharacterTalentsBySource", {
      id,
      source: `ascension.${key}`,
      cascade: true,
    });


    commit("clearCharacterPsychicPowersBySource", {
      id,
      source: `ascension.${key}`,
    });


    commit("removeCharacterWargearBySource", {
      id,
      source: `ascension.${key}`,
    });


    commit("clearCharacterAscensionPackage", { id, value, key });


  },

  /**
   * migrate the character object to a newer version
   * @param context
   * @param payload
   * {
   *   characterId: Integer,
   * }
   */
  migrate({ commit, state, rootState }, payload) {
    const character = state.characters[payload.characterId];

    if (character === undefined) {
      console.warn(`Could not read character for id [${payload.characterId}].`);
      return;
    }

    const characterVersion = character.version;
    const builderVersion = BUILDER_VERSION;

    if (characterVersion < builderVersion) {

      const config = {
        characterId: character.id,
        currentVersion: characterVersion,
        targetVersion: characterVersion + 1,
      };
      commit("migrate", config);
    } else {
      console.info(
        `[${character.name}] is up to date. ${characterVersion} / ${builderVersion}.`
      );
    }
  },
};

const getDefaultState = () => ({
  id: -1,
  version: 11, // 7+ is revised
  setting: undefined,
  settingSelected: true,
  settingTier: 3,
  settingTitle: "",
  settingHomebrewContent: [], // e.g. pax
  settingHouserules: {
    "rank-advancement-type": "milestone",
    "skill-attribute-advancement-costs": "v15",
  },
  customXp: 0,
  customRank: 1,
  level: 1,
  name: "Сеони",
  avatarUrl: undefined,
  species: {
    key: undefined,
    label: "",
    cost: 0,
  },
  heritage: {
    key: undefined,
    label: "",
    cost: 0,
  },
  speciesAstartesChapter: undefined,
  faction: {
    key: undefined,
    label: "",
  },
  archetype: {
    key: undefined,
    label: "",
    cost: 0,
  },


  //Бусты и Понижения
  //1-й уровень, стандартный
  attributesBoost: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intellect: 0,
    wisdom: 0,
    charisma: 0,
  },
  attributesBackgroundBoost: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intellect: 0,
    wisdom: 0,
    charisma: 0,
  },
  attributesBackground2Boost: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intellect: 0,
    wisdom: 0,
    charisma: 0,
  },
  attributesAncestryBoost: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intellect: 0,
    wisdom: 0,
    charisma: 0,
  },
  attributesClassBoost: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intellect: 0,
    wisdom: 0,
    charisma: 0,
  },
  attributesAncestryFlaw: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intellect: 0,
    wisdom: 0,
    charisma: 0,
  },
  money: {
    pp: 0,
    gp: 15,
    sp: 0,
    cp: 0,
  },
  Boost: 0,
  AncestryFreeBoost: "",
  AncestryFreeBoost2: "",
  BackgroundFreeBoost: "",
  BackgroundFreeBoost2: "",
  ClassBoost: "",

  //5-й уровень
  attributesBoost5: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intellect: 0,
    wisdom: 0,
    charisma: 0,
  },
  Boost5: 0,

  //10-й уровень
  attributesBoost10: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intellect: 0,
    wisdom: 0,
    charisma: 0,
  },
  Boost10: 0,

  //15-й уровень
  attributesBoost15: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intellect: 0,
    wisdom: 0,
    charisma: 0,
  },
  Boost15: 0,

  //20-й уровень
  attributesBoost20: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intellect: 0,
    wisdom: 0,
    charisma: 0,
  },
  Boost20: 0,
  CurrentHP: 0,
  TempHP: 0,
  MaxHitPoints:
  {
    species: 0,
    class: 0,
  },
  attributes: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intellect: 10,
    wisdom: 10,
    charisma: 10,
  },
  SkillPoints: 0,



  SkillPointsLevel: {

    level0: "",
    level1: "",
    level2: "",
    level3: "",
    level4: "",

    level5: "",
    level6: "",
    level7: "",
    level8: "",
    level9: "",

    level10: "",
    level11: "",
    level12: "",
    level13: "",
    level14: "",

    level15: "",
    level16: "",
    level17: "",
    level18: "",
    level19: "",

    level20: "",
  },

  //Сетка уровней
  SkillSheet: [],
  SkillPointBackground: 0,
  SkillPointsClass: 0,
  SkillPointsClassUp: 0,

  skillClass: "",
  Bonus: [],
  TrainedSkillClass: [],
  TrainedAdditionalSkillClass: undefined,
  //Окончательный вид
  skills: {
    acrobatics: "U",
    arcana: "U",
    athletics: "U",
    nature: "U",
    crafting: "U",
    deception: "U",
    diplomacy: "U",
    intimidation: "U",
    medicine: "U",
    occultism: "U",
    perfomance: "U",
    religion: "U",
    society: "U",
    stealth: "U",
    survival: "U",
    thievery: "U",
  },

  skillFromModification: {
    acrobatics: 0,
    arcana: 0,
    athletics: 0,
    nature: 0,
    crafting: 0,
    deception: 0,
    diplomacy: 0,
    intimidation: 0,
    medicine: 0,
    occultism: 0,
    perfomance: 0,
    religion: 0,
    society: 0,
    stealth: 0,
    survival: 0,
    thievery: 0,
  },
  saving: {
    reflex: "U",
    fortitude: "U",
    will: "U",
  },
  skillChoiceInitial: [],
  // skillFromModification: [],
  skillAttack:
  {
    simple: "U",
    martial: "U",
    advanced: "U",
    unarmed: "U"
  },
  skillDefence:
  {
    light: "U",
    medium: "U",
    heavy: "U",
    unarmored: "U"
  },
  Perception: "U",
  SkillsTrained: {
    U: 0,
    T: 2,
    E: 4,
    M: 6,
    L: 8,
  },
  BackSkill: "",
  customSkills: [],
  languages: [
    {
      name: "Всеобщий",
      source: "",
      trait: "common"
    }
  ],
  keywords: [],
  talents: [],
  spells: [],
  mutations: [],
  psychicPowers: [],
  ascensionPackages: {
    key: undefined,
    label: "",
    cost: 0,
  },


  modificatorsBonus: [],
  speed: {
    land: 25,
    climb: 0,
    burrow: 0,
    swim: 0,
  },
  AC: 0,
  wargear: [],
  wearArmor: {},
  background: {
    origin: undefined,
    accomplishment: undefined,
    goal: undefined,
    plusOne: undefined,
  },
  enhancements: [],
  objectives: [],
  objectiveArchived: false,
  fluff: {
    notes: "",
  },

});
