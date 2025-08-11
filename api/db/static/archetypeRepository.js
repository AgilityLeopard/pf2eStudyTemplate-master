import { source } from './_sourcesRepository';
import { stringToKebab } from './_stringUtils';

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
const archetype = function (sourceKey, sourcePage, name) {
    // let speciesSourceKey = 'playerCore';
    // let speciesName = 'Human';
    // let split = [];
    // // split = species.split('/');
    // // if (split.length === 2) {
    // //     speciesSourceKey = split[0];
    // //     speciesName = split[1];
    // // } else {
    // //     split = species.split('-');
    // //     if (split.length >= 2) {
    // //         speciesSourceKey = split[0];
    // //         speciesName = split.splice(1).map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join(' ');
    // //     } else {
    // //         speciesName = species;
    // //     }
    // // }

    // const speciesObject = {
    //     name: speciesName,
    //     key: `${speciesSourceKey.toLowerCase()}-${stringToKebab(speciesName)}`,
    //     sourceKey: speciesSourceKey.toLowerCase(),
    // };

    return {
        source: {
            ...source[sourceKey],
            page: sourcePage,
        },
        key: `${stringToKebab(`${sourceKey} ${name}`)}`,
        name,
        wargear: [],
        prerequisites: [],
        archetypeFeatures: [],
        influence: 0,
    };
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

const playerCore = [
    //воин
    {
        ...archetype(source.playerCore.key, 92, 'Fighter'),
        ...cost(12, 0, 12, 0, 0),
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
            simple: "E",
            martial: "E",
            advanced: "T",
            unarmed: "E"
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
            //Общие
            "Initial proficiencies", "Class feat", "Ancestry and background", "Skill feat", "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            //Классовые
            "Reactive Strike", "Shield Block", "Battlefield Surveyor", "Bravery", "Fighter Weapon Mastery", "Weapon Specialization", "Combat Flexibility",
            "Battle Hardened", "Armor Expertise", "Fighter Expertise", "Weapon Legend", "Tempered Reflexes", "Greater Weapon Specialization",
            "Improved Flexibility", "Armor Mastery", "Versatile Legend",
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
                    key: "Weapon Specialization",
                    // upgrade: "M",
                    type: "Weapon Specialization",
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

    //плут
    {
        ...archetype(source.playerCore.key, 92, 'Rogue'),
        ...cost(12, 0, 12, 0, 0),
        ...statBoost(0, 0, 0, 0, 0, 0),
        hint: 'Вы умелы и предприимчивы. Применяя свой острый ум и быструю реакцию, вы используете ошибки ваших противников в своих интересах и наносите удар по самому больному месту. Вы ведете опасную игру, ища острых ощущений и проверяя свои навыки, мало заботясь о любых законах, которые могут встать на вашем пути. В то время, как путь каждого плута уникален и пронизан опасностью, единственное, что вас всех объединяет - широта и глубина ваших навыков.',
        name: 'Плут',
        keywords: 'плут',
        hitpoints: 8,
        keyAbility: ["dexterity", "strength", "charisma", "intellect"],
        trait: ["плут"],
        rarity: "Common",
        skillTrainedChoice: [],
        skillTrained: ["stealth"],
        skillTrainedPoints: 7,
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
            reflex: "E",
            fortitude: "T",
            will: "E",
        },
        isFeatLevelOne: true,
        description: [
            {
                name: 'encounter',
                text: '<p>Вы скрытно перемещаетесь; чтобы застичь противника врасплох. Ваша задача — нанесение точечных ударов, поэтому атакуете вы чаще не рядовых солдат, а стоящих поодаль заклинателей и главарей.</p>'

            },
            {
                name: 'social',
                text: '<p>Благодаря навыкам у вас множество возможностей повлиять на оппонента. Вы, как никто другой, умеете выуживать информацию и устраивать различного рода аферы.</p>'

            },
            {
                name: 'exporation',
                text: '<p>Вы подкрадываетесь к врагам, чтобы ударить первым, и высматриваете опасности и ловушки. Вы ценный союзник, поскольку способны обезвреживать западни, решать головоломки и предчувствовать опасность.</p>'

            },
            {
                name: 'downtime',
                text: '<p>Вы можете заниматься карманными кражами или торговать контрабандой. Кроме этого, вы можете примкнуть к воровской гильдии или даже основать собственную.</p>'

            },
            {
                name: 'you',
                text: '<li>Оттачиваете свои навыки, как упражняясь, так и применяя их на практике.</li>'
                    + '< li > Знаете, где добыть контрабандные товары.</li>'
                    + '<li>Обходите или нарушаете закон, потому что считаете его бессмысленным или потому что придумали собственные правила.</li>',
            },
            {
                name: 'other',
                text: '<li><p>Считают вас обаятельным и интересным, даже если не особенно вам доверяют.</p></li>'
                    + ' < li > <p>Обращаются к вам, когда нужен кто-то рисковый или не боящийся запачкать руки.</p></li>'
                    + '<li><p>Полагают, что вами движет прежде всего алчность.</p></li>',
            }
        ],
        archetypeFeatures: [
            //Общие
            "Initial proficiencies", "Class feat", "Ancestry and background", "Skill feat Rogue", "General feat", "Skill increase Rogue", "Ancestry feat", "Stat boost",
            //Классовые
            "SneakAttack",
            "RoguesRacket",
            "Deny Advantage",
            "WeaponTricks",
            "PerceptionMastery",
            "EvasiveReflexes",
            "RogueExpertise",
            "DebilitatingStrike",
            "GreaterRogueReflexes",
            "PerceptionLegend",
            "MasterTricks",
            "DoubleDebilitation",
            "AgileMind",
            "MasterStrike",

            "LightArmorMastery",
            "LightArmorExpertise",
            "GreaterWeaponSpecialization",
            "WeaponSpecialization",
        ],
        modification:
            [
                {
                    key: "simple",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Attack",
                    level: 5,
                },
                {
                    key: "martial",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Attack",
                    level: 5,
                },
                {
                    key: "Perception",
                    upgrade: "M",
                    type: "Perception",
                    mode: "Upgrade",
                    level: 7,
                    // valueBonus: 2,
                    // typeBonus: "circumstance"
                },
                {
                    key: "Weapon Specialization",
                    // upgrade: "M",
                    type: "Weapon Specialization",
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
                    key: "reflex",
                    upgrade: "M",
                    mode: "Upgrade",
                    type: "Saving",
                    level: 7,
                },
                {
                    key: "fortitude",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Saving",
                    level: 9,
                },
                {
                    key: "class",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "DC Class",
                    level: 11,
                },
                {
                    key: "reflex",
                    upgrade: "L",
                    mode: "Upgrade",
                    type: "Saving",
                    level: 13,
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
                    key: "will",
                    upgrade: "M",
                    mode: "Upgrade",
                    type: "Saving",
                    level: 15,
                },


                {
                    key: "light",
                    upgrade: "M",
                    mode: "Upgrade",
                    type: "Defence",
                    level: 19,
                },

                {
                    key: "unarmored",
                    upgrade: "M",
                    mode: "Upgrade",
                    type: "Defence",
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


    //Бард
    {
        ...archetype(source.playerCore.key, 92, 'Bard'),
        ...cost(12, 0, 12, 0, 0),
        ...statBoost(0, 0, 0, 0, 0, 1),
        hint: 'Вы мастер искусств, знаток скрытых тайн, и обольстительный мастер убеждения. С помощью эффектных выступлений, вы воздействуете на умы и вдохновляете сердца на новые героические свершения. Вы можете использовать свои силы, чтобы стать харизматическим лидером, или, вместо этого вы можете быть советником, манипулятором, ученым, проходимцем или виртуозом. В то время как ваша универсальность заставляет некоторых считать вас привлекательным негодником и мастером на все руки, но опасно списывать вас со счетов, как неумеху.',
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
        spellFocusPool: 1,
        spellFocusBase: ["Courageous Anthem", "Counter Performance"],
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
        description: [
            {
                name: 'encounter',
                text: '<p>Вы используете магические выступления, чтобы изменить шансы в пользу своих союзников. Вы по мере необходимости уверенно чередуете атаки, исцеление и полезные заклинания.</p>'

            },
            {
                name: 'social',
                text: '<p>Вы с легкостью убеждаете, увиливаете и угрожаете.</p>'

            },
            {
                name: 'exporation',
                text: '<p>Вы являетесь источником знаний, народных сказок, легенд и знаний, которые обеспечивают детальный контекст и полезную информацию для приключения группы. Ваши заклинания и выступления вдохновляют ваших союзников на великие открытия и успехи.</p>'

            },
            {
                name: 'downtime',
                text: '<p>С вашими выступлениями, вы можете зарабатывать деньги и авторитет, делая себе имя и приобретая покровителей. В конце концов, рассказы о ваших талантах и победах могут привлечь других бардов для изучения ваших приемов в колледже бардов.</p>'

            },
            {
                name: 'you',
                text: '<li><p>Иметь настолько сильную страсть к своему искусству, что она формируется в духовную связь</p></li>'
                    + '<li><p>Вступить в дело, когда требуется деликатность и ненасильственное решение</p></li>'
                    + '<li><p>Следовать за своей музой, будь то таинственное существо-фея, философская концепция, психическая сила или божество искусства или музыки, и с ее помощью узнать тайные знания, которыми обладают не мног</p></li>'
            },
            {//не доделано
                name: 'other',
                text: '<li><p>Не понимают, что ваше колдовство основывается на божественной силе, и вместо этого верят, что вы управляете чуждыми, и возможно злыми силами</p></li>'
                    + '<li><p>Предполагают, что вы совершили какой-то ужасный проступок, чтобы стать проклятым богами</p></li>'
                    + '<li><p>Восхищаются вашей решимостью и приносимыми жертвами, чтобы совершать удивительные поступки</p></li>'
            }
        ],
        archetypeFeatures: [
            //Общие
            "Initial proficiencies", "Class feat Caster", "Ancestry and background", "Skill feat", "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            //Классовые
            "Composition Spells", "Muses", "Bard Spellcasting", "Magnum Opus",

            //Обще-классовые
            "Perception Expertise Bard", "Expert Fortitude Bard", "Reflex Expertise Bard", "Expert Spellcaster Bard", "Weapon Expertise Bard", "Performers Heart",
            "Light Armor Expertise Bard", "Weapon Specialization Bard", "Master Spellcaster Bard", "Legendary Spellcaster Bard", "Anathema Bard", "Perception Mastery Bard",
            "Signature Spells",
        ],
        modification:
            [
                {
                    key: "reflex",
                    upgrade: "E",
                    type: "Saving",
                    mode: "Upgrade",
                    level: 3,
                },
                {
                    key: "attack",
                    upgrade: "E",
                    type: "spellsClass",
                    mode: "Upgrade",
                    level: 7,
                },
                {
                    key: "class",
                    upgrade: "E",
                    type: "spellsClass",
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
                    key: "will",
                    upgrade: "M",
                    type: "Saving",
                    mode: "Upgrade",
                    level: 9,
                },
                {
                    key: "simple",
                    mode: "Upgrade",
                    upgrade: "E",
                    type: "Attack",
                    level: 11,
                },
                {
                    key: "martial",
                    upgrade: "E",
                    type: "Attack",
                    mode: "Upgrade",
                    level: 11,
                },
                {
                    key: "unarmed",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Attack",
                    level: 11,
                },
                {
                    key: "Perception",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Perception",
                    level: 11,
                },
                {
                    key: "light",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Defence",
                    level: 13,
                },
                {
                    key: "attack",
                    upgrade: "M",
                    type: "spellsClass",
                    mode: "Upgrade",
                    level: 15,
                },
                {
                    key: "class",
                    upgrade: "M",
                    type: "spellsClass",
                    mode: "Upgrade",
                    level: 15,
                },
                {
                    key: "attack",
                    upgrade: "L",
                    type: "spellsClass",
                    mode: "Upgrade",
                    level: 19,
                },
                {
                    key: "class",
                    upgrade: "L",
                    type: "spellsClass",
                    mode: "Upgrade",
                    level: 19,
                },
            ]
    },

    //Друид
    {
        ...archetype(source.playerCore.key, 92, 'Druid'),
        ...cost(12, 0, 12, 0, 0),
        ...statBoost(0, 0, 0, 0, 1, 0),
        hint: 'Силе природы невозможно сопротивляться. Она может разрушить самую неприступную крепость за считанные минуты, превратив даже самые мощные сооружения в руины,'
            + ' сжечь их до тла, похоронить под снежной лавиной или утопить в волнах. Она может дать нескончаемые дары и захватывающее великолепие тем, кто ее уважает, '
            + 'и мучительную смерть тем, кто относится к ней слишком легкомысленно. Вы один из тех, кто слышит зов природы. Вы трепещите перед величием ее могущества и '
            + 'отдаете всего себя ее службе.',
        name: 'Друид',
        keywords: 'друид',
        hitpoints: 8,
        // keyAbility: ["dexterity", "strength"],
        keyAbility: [],
        trait: ["друид"],
        rarity: "common",
        skillTrainedChoice: [],
        skillTrained: ['nature'],
        skillTrainedPoints: 2,
        spellTradition: 'природный',
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
        spellFocusPool: 1,
        // spellFocusBase: ["Courageous Anthem", "Counter Performance"],
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
            medium: "T",
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
        description: [
            {
                name: 'encounter',
                text: '<p>Вы призываете силы природы, чтобы побеждать врагов и защищать своих союзников. Вы колдуете заклинания подпитываемые природной магией,'
                    + ' чтобы защищать себя и своих друзей, излечивать их раны или призывать смертоносных животных, которые сражаются на вашей стороне. В зависимости от вашей'
                    + ' связи с природой, вы можете призвать мощную стихийную магию или поменять форму и стать ужасающим зверем.</p>'

            },
            {
                name: 'social',
                text: '<p>Вы олицетворяете баланс и разумный подход к проблемам, ища решения, которые не только лучше всего подходят для природного мира, но'
                    + ' и позволяют существам в нем жить в мире и гармонии. Вы часто предлагаете компромиссы, которые позволяют обеим сторонам получить то, что им действительно'
                    + ' нужно, даже если они не могут получить все, что хотят.</p>'

            },
            {
                name: 'exporation',
                text: '<p>Ваши познания природы - бесценны. Вы выслеживаете врагов, ориентируетесь в дикой местности, и используете заклинания, чтобы обнаружить магические'
                    + ' ауры вокруг вас. Вы, даже можете попросить диких животных, помочь вашей группе, своими экстраординарными чувствами и навыками разведки.</p>'

            },
            {
                name: 'downtime',
                text: '<p>Вы можете создавать магические предметы или зелья. Кроме того, ваша связь с природой может привести вас к уходу за дикими землями, дружбе'
                    + ' с животными и исцелению ран, вызванных цивилизацией. Вы можете даже научить методам долговременного земледелия и животноводства, которые'
                    + ' позволяют другим добывать пропитание с помощью земли, не нанося вреда ее балансу.</p>'

            },
            {
                name: 'you',
                text: '<li><p> Испытывать глубокое и выраженное уважение к силе природы</p></li>'
                    + '<li><p>Испытывать постоянный трепет перед природой, желая поделиться ей с другими, но опасаясь их влияния</p></li>'
                    + '<li><p>Относиться к растениям и животным как к союзникам, работая вместе с ними для достижения своих целей</p></li>'
            },
            {
                name: 'other',
                text: '<li><p>Рассматривают вас как представителя природы и уверены, что вы можете контролировать ее</p></li>'
                    + '<li><p>Считают вас отшельником, который избегает общества и городов и предпочитает жить в дикой природе</p></li>'
                    + '<li><p>Считают вас таинственным, подобным священнику, но отвечающим только силам природы</p></li>'
            }
        ],
        archetypeFeatures: [
            //Общие
            "Initial proficiencies", "Class feat Caster", "Ancestry and background", "Skill feat", "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            //Классовые
            "Shield Block", "Druid Spellcasting", "Druidic Order", "Voice of nature", "Wildsong", "Wild Empathy", "Wild Willpower", "Primal Hierophant",

            //Обще-классовые
            "Perception Expertise Druid", "Fortitude Expertise Druid", "Reflex Expertise Druid", "Expert Spellcaster Druid", "Weapon Expertise Druid",
            "Medium Armor Expertise Druid", "Weapon Specialization Druid", "Master Spellcaster Druid", "Legendary Spellcaster Druid", "Anathema Druid"
        ],
        modification:
            [
                {
                    key: "Perception",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Perception",
                    level: 3,
                },

                {
                    key: "fortitude",
                    upgrade: "E",
                    type: "Saving",
                    mode: "Upgrade",
                    level: 3,
                },
                {
                    key: "reflex",
                    upgrade: "E",
                    type: "Saving",
                    mode: "Upgrade",
                    level: 5,
                },
                {
                    key: "attack",
                    upgrade: "E",
                    type: "spellsClass",
                    mode: "Upgrade",
                    level: 7,
                },
                {
                    key: "class",
                    upgrade: "E",
                    type: "spellsClass",
                    mode: "Upgrade",
                    level: 7,
                },

                {
                    key: "will",
                    upgrade: "M",
                    type: "Saving",
                    mode: "Upgrade",
                    level: 11,
                },
                {
                    key: "simple",
                    mode: "Upgrade",
                    upgrade: "E",
                    type: "Attack",
                    level: 11,
                },
                {
                    key: "unarmed",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Attack",
                    level: 11,
                },
                {
                    key: "light",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Defence",
                    level: 13,
                },
                {
                    key: "medium",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Defence",
                    level: 13,
                },
                {
                    key: "Weapon Specialization",
                    // upgrade: "M",
                    type: "Weapon Specialization",
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
                    key: "attack",
                    upgrade: "M",
                    type: "spellsClass",
                    mode: "Upgrade",
                    level: 15,
                },
                {
                    key: "class",
                    upgrade: "M",
                    type: "spellsClass",
                    mode: "Upgrade",
                    level: 15,
                },
                {
                    key: "attack",
                    upgrade: "L",
                    type: "spellsClass",
                    mode: "Upgrade",
                    level: 19,
                },
                {
                    key: "class",
                    upgrade: "L",
                    type: "spellsClass",
                    mode: "Upgrade",
                    level: 19,
                },
            ]
    },

    //Жрец
    {
        ...archetype(source.playerCore.key, 92, 'Cleric'),
        ...cost(12, 0, 12, 0, 0),
        ...statBoost(0, 0, 0, 0, 1, 0),
        hint: 'Силе природы невозможно сопротивляться. Она может разрушить самую неприступную крепость за считанные минуты, превратив даже самые мощные сооружения в руины,'
            + ' сжечь их до тла, похоронить под снежной лавиной или утопить в волнах. Она может дать нескончаемые дары и захватывающее великолепие тем, кто ее уважает, '
            + 'и мучительную смерть тем, кто относится к ней слишком легкомысленно. Вы один из тех, кто слышит зов природы. Вы трепещите перед величием ее могущества и '
            + 'отдаете всего себя ее службе.',
        name: 'Жрец',
        keywords: 'жрец',
        hitpoints: 8,
        // keyAbility: ["dexterity", "strength"],
        keyAbility: [],
        trait: ["жрец"],
        rarity: "common",
        skillTrainedChoice: [],
        skillTrained: ['religion'],
        skillTrainedPoints: 2,
        spellTradition: 'сакральный',
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
        // spellFocusPool: 1,
        // spellFocusBase: ["Courageous Anthem", "Counter Performance"],
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
            medium: "T",
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
        description: [
            {
                name: 'encounter',
                text: '<p>Если вы боевой жрец, то соблюдаете баланс между сотворением заклинаний и атаками оружием, обычно предпочитаемым оружием божества. '
                    + 'Если вы священнослужитель, то преимущественно сотворяете заклинания. Большинство ваших заклинаний могут усиливать, защищать или лечить ваших союзников. '
                    + 'В зависимости от вашего божества, вы получаете дополнительные заклинания, чтобы исцелять союзников или ранить ваших врагов.</p>'

            },
            {
                name: 'social',
                text: '<p>Вы можете совершать дипломатические предложения или устраивать впечатляющие речи. Так как вы мудры, вы улавливаете ложь, которую говорят другие.</p>'

            },
            {
                name: 'exporation',
                text: '<p>Вы обнаруживаете магию поблизости и интерпретируете любые религиозные тексты, с которыми сталкиваетесь. Еще вы можете сосредоточиться '
                    + 'на защитном заклинании в случае стычки. После битвы или опасности вы можете исцелить всех кто был ранен.</p>'

            },
            {
                name: 'downtime',
                text: '<p>Вы можете проводит службы в храме, путешествовать чтобы нести слово вашего божества, исследовать священные писания, праздновать церковные '
                    + 'праздники, или даже основать новый храм.</p>'

            },
            {
                name: 'you',
                text: '<li><p> Посещать храмы и святые места, священные для вашей веры, и быстро находить общий язык с другими почитателями вашего божества</p></li>'
                    + '<li><p>Знать учения священных текстов вашей религии и как они применимы к дилемме</p></li>'
                    + '<li><p>Сотрудничать со своими союзниками, если они не просят вас идти против божественной воли</p></li>'
            },
            {
                name: 'other',
                text: '<li><p> Считать вашу верность впечатляющей, даже если они ее не понимают</p></li>'
                    + '<li><p>Ожидают что вы исцелите их раны</p></li>'
                    + '<li><p>Полагаются на то, что вы будете взаимодействовать с другими религиозными фигурами</p></li>'
            }
        ],

        archetypeFeatures: [
            //Общие
            "Initial proficiencies", "Class feat Caster", "Ancestry and background", "Skill feat", "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            //Классовые
            "Divine Font", "Cleric Spellcasting", "Doctrine", "Miraculous Spell", "Divine Defense", "Resolute Faith", "Deity Cleric",

            //Обще-классовые
            "Weapon Specialization", "Perception Expertise Cleric", "Reflex Expertise Cleric", "SkillCleric", "Sanctification",
            "WeaponCleric"
            //, "Fortitude Expertise Druid", "Reflex Expertise Druid", "Expert Spellcaster Druid", "Weapon Expertise Druid",
            // "Medium Armor Expertise Druid", "Weapon Specialization Druid", "Master Spellcaster Druid", "Legendary Spellcaster Druid", "Anathema Druid"
        ],
        modification:
            [
                {
                    key: "Perception",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Perception",
                    level: 3,
                },
                {
                    key: "will",
                    upgrade: "M",
                    type: "Saving",
                    mode: "Upgrade",
                    level: 9,
                },
                {
                    key: "reflex",
                    upgrade: "E",
                    type: "Saving",
                    mode: "Upgrade",
                    level: 11,
                },
                {
                    key: "unarmored",
                    upgrade: "E",
                    type: "Defence",
                    mode: "Upgrade",
                    level: 13,
                },

                {
                    key: "Weapon Specialization",
                    // upgrade: "M",
                    type: "Weapon Specialization",
                    level: 13,
                    bonusDamage: {
                        E: 2,
                        M: 3,
                        L: 4,
                    }
                    // valueBonus: 2,
                    // typeBonus: "damage"
                },
                //
            ]
    },

    //Чародей
    {
        ...archetype(source.playerCore2.key, 93, 'Sorcerer'),
        ...cost(6, 0, 0, 0, 0),
        ...statBoost(0, 0, 0, 0, 0, 1),
        hint: 'Вы не выбирали стать заклинателем — вы были рождены им. В вашей крови есть магия, независимо от того, коснулось ли божество одного из ваших предков, '
            + 'прародитель причищался с первородным существом или могущественный оккультный ритуал повлиял на ваш род. Самоанализ и учёба позволяют вам совершенствовать '
            + 'свои врожденные магические навыки и открывать новые, более мощные умения.',
        name: 'Чародей',
        keywords: 'чародей',
        hitpoints: 6,
        keyAbility: ["charisma"],
        trait: ["чародей"],
        rarity: "common",
        skillTrainedChoice: [],
        skillTrained: [], // Навыки определяются наследием крови
        skillTrainedPoints: 2,
        spellTradition: '', // Определяется наследием крови (арканный/оккультный/сакральный/природный)
        spellProgression: {
            1: [5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [5, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            4: [5, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
            5: [5, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0],
            6: [5, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0],
            7: [5, 4, 4, 4, 3, 0, 0, 0, 0, 0, 0],
            8: [5, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0],
            9: [5, 4, 4, 4, 4, 3, 0, 0, 0, 0, 0],
            10: [5, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0],
            11: [5, 4, 4, 4, 4, 4, 3, 0, 0, 0, 0],
            12: [5, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0],
            13: [5, 4, 4, 4, 4, 4, 4, 3, 0, 0, 0],
            14: [5, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0],
            15: [5, 4, 4, 4, 4, 4, 4, 4, 3, 0, 0],
            16: [5, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
            17: [5, 4, 4, 4, 4, 4, 4, 4, 4, 3, 0],
            18: [5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0],
            19: [5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1],
            20: [5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1],
        },
        spellFocusPool: 1,
        // spellFocusBase: ["Заклинание наследия крови"],
        spellsClass: {
            attack: "T",
            class: "T"
        },
        Perception: "T",
        skillAttack: {
            simple: "T",
            martial: "U",
            advanced: "U",
            unarmed: "T"
        },
        skillDefence: {
            light: "U",
            medium: "U",
            heavy: "U",
            unarmored: "T"
        },
        skillClass: "T",
        saving: {
            reflex: "T",
            fortitude: "T",
            will: "E",
        },
        isFeatLevelOne: false,
        description: [
            {
                name: 'encounter',
                text: '<p>Вы используете заклинания, чтобы ранить врагов, влиять на их умы и препятствовать их движениям. Вы можете быть слишком уязвимы, чтобы идти в ближний бой, '
                    + 'или же ваше наследие крови может дать умения, которые помогают вам держаться в драке. Хоть ваша магия и сильна, чтобы приберечь ваши лучшие заклинания, '
                    + 'либо когда вы использовали их все, вы также полагаетесь на чары.</p>'
            },
            {
                name: 'social',
                text: '<p>Ваше естественное обаяние позволяет вам хорошо взаимодействовать с людьми.</p>'
            },
            {
                name: 'exporation',
                text: '<p>Вы обнаруживаете магию вокруг себя, находя сокровища и предупреждая свою группу о магических ловушках. Когда группа сталкивается с тайнами или проблемами, '
                    + 'связанными с вашим наследием крови, то вы пытаетесь решить их.</p>'
            },
            {
                name: 'downtime',
                text: '<p>Вы создаете магические предметы или пишите свитки. Ваше наследие крови может побудить вас исследовать свою родословную или общаться с относящимися к ней '
                    + 'людьми или существами.</p>'
            },
            {
                name: 'you',
                text: '<li><p>Иметь сильную независимую черту, и неважно, принимаете ли вы или отвергаете своё магическое наследие</p></li>'
                    + '<li><p>Смотреть на свою родословную с восхищением, страхом или чем-то по середине</p></li>'
                    + '<li><p>Полагаться на магические предметы, такие как свитки и палочки, чтобы дополнить свой ограниченный выбор заклинаний</p></li>'
            },
            {
                name: 'other',
                text: '<li><p>Восхищаются вашим умением создавать магию из воздуха и смотрят на ваши способности одновременно с восхищением и недоверием</p></li>'
                    + '<li><p>Считают вас менее посвящённым заклинателем, чем прилежные волшебники</p></li>'
                    + '<li><p>Полагают, что вы столь же непредсказуемы, как и магия, порождаемая вами</p></li>'
            }
        ],

        archetypeFeatures: [
            // Общие
            "Initial proficiencies", "Class feat Caster", "Ancestry and background", "Skill feat", "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            // Классовые
            "Bloodline Spell", "Bloodline Perk", "Blood Magic", "Signature Spells", "Bloodline Resistance",
            // Обще-классовые
            "Spell Penetration", "Greater Bloodline", "Bloodline Focus", "Legendary Bloodline"
        ],
        modification: [
            {
                key: "spells",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 7,
            },
            {
                key: "class",
                upgrade: "E",
                mode: "Upgrade",
                type: "DC Class",
                level: 7,
            },
            {
                key: "fortitude",
                upgrade: "E",
                type: "Saving",
                mode: "Upgrade",
                level: 5,
            },
            {
                key: "reflex",
                upgrade: "E",
                type: "Saving",
                mode: "Upgrade",
                level: 9,
            },
            {
                key: "perception",
                upgrade: "E",
                type: "Perception",
                mode: "Upgrade",
                level: 11,
            },
            {
                key: "simple",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 11,
            },
            {
                key: "unarmed",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 11,
            },
            {
                key: "unarmored",
                upgrade: "E",
                mode: "Upgrade",
                type: "Defence",
                level: 13,
            },
            {
                key: "Weapon Specialization",
                type: "Weapon Specialization",
                level: 13,
                bonusDamage: {
                    E: 2,
                    M: 3,
                    L: 4,
                }
            },
            {
                key: "spells",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 15,
            },
            {
                key: "class",
                upgrade: "M",
                mode: "Upgrade",
                type: "DC Class",
                level: 15,
            },
            {
                key: "will",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 17,
            },
            {
                key: "spells",
                upgrade: "L",
                mode: "Upgrade",
                type: "Attack",
                level: 19,
            },
            {
                key: "class",
                upgrade: "L",
                mode: "Upgrade",
                type: "DC Class",
                level: 19,
            }
        ]
    },

    //Волшебник
    {
        ...archetype(source.playerCore.key, 94, 'Wizard'),
        ...cost(6, 0, 0, 0, 0),
        ...statBoost(0, 0, 1, 0, 0, 0),
        hint: 'Вы вечный ученик арканных тайн вселенной. Через строгую дисциплину и изучение вы овладеваете магией, используя древние тексты и научные методы, чтобы проникнуть в её суть. '
            + 'Ваша магия — это инструмент, дисциплина и путь к истине.',
        name: 'Волшебник',
        keywords: 'волшебник',
        hitpoints: 6,
        keyAbility: ["intelligence"],
        trait: ["волшебник"],
        rarity: "common",
        skillTrainedChoice: [],
        skillTrained: ["arcana"],
        skillTrainedPoints: 2, // + Int
        spellTradition: 'arcane',
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
            20: [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1]
        },
        spellFocusPool: 1,
        spellsClass: {
            attack: "T",
            class: "T"
        },
        Perception: "T",
        skillAttack: {
            simple: "T",
            martial: "U",
            advanced: "U",
            unarmed: "T"
        },
        skillDefence: {
            light: "U",
            medium: "U",
            heavy: "U",
            unarmored: "T"
        },
        skillClass: "T",
        saving: {
            reflex: "T",
            fortitude: "T",
            will: "E"
        },
        isFeatLevelOne: false,
        description: [
            {
                name: "encounter",
                text: "<p>Вы держитесь позади, рассчитывая, когда использовать заклинания. Против сильных врагов вы используете мощную магию, а против слабых — чары. У вас есть ответ почти на любую угрозу, от полета до невидимости.</p>"
            },
            {
                name: "social",
                text: "<p>Вы впечатляете своей ученостью и часто объясняете происходящее через призму арканной теории.</p>"
            },
            {
                name: "exporation",
                text: "<p>Вы определяете магические ауры, читаете древние тексты и открываете скрытые тайны магии.</p>"
            },
            {
                name: "downtime",
                text: "<p>Вы создаете магические предметы, изучаете новые заклинания или обучаете других.</p>"
            },
            {
                name: "you",
                text: "<li><p>Желаете понять, как работает магия</p></li>"
                    + "<li><p>Считаете, что магия — это инструмент, требующий дисциплины и интеллекта</p></li>"
                    + "<li><p>Записываете заклинания, анализируете их и создаете новые теории</p></li>"
            },
            {
                name: "other",
                text: "<li><p>Видят в вас великого и опасного мага</p></li>"
                    + "<li><p>Опасаются последствий ваших магических экспериментов</p></li>"
                    + "<li><p>Надеются, что вы решите их проблемы одним заклинанием</p></li>"
            }
        ],
        archetypeFeatures: [
            "Initial proficiencies", "Class feat Caster", "Ancestry and background", "Skill feat", "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            "Arcane Spellcasting", "Arcane School", "Arcane Thesis", "Arcane Bond",
            "Lightning Reflexes", "Magical Fortitude", "Alertness", "Wizard Weapon Expertise", "Defensive Robes", "Weapon Specialization", "Master Spellcaster",
            "Resolve", "Archwizard's Spellcraft", "Legendary Spellcaster"
        ],
        modification: [
            {
                key: "spells",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 7
            },
            {
                key: "class",
                upgrade: "E",
                mode: "Upgrade",
                type: "DC Class",
                level: 7
            },
            {
                key: "fortitude",
                upgrade: "E",
                type: "Saving",
                mode: "Upgrade",
                level: 9
            },
            {
                key: "perception",
                upgrade: "E",
                type: "Perception",
                mode: "Upgrade",
                level: 11
            },
            {
                key: "simple",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 11
            },
            {
                key: "unarmed",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 11
            },
            {
                key: "unarmored",
                upgrade: "E",
                mode: "Upgrade",
                type: "Defence",
                level: 13
            },
            {
                key: "Weapon Specialization",
                type: "Weapon Specialization",
                level: 13,
                bonusDamage: {
                    E: 2,
                    M: 3,
                    L: 4
                }
            },
            {
                key: "spells",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 15
            },
            {
                key: "class",
                upgrade: "M",
                mode: "Upgrade",
                type: "DC Class",
                level: 15
            },
            {
                key: "will",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 17
            },
            {
                key: "spells",
                upgrade: "L",
                mode: "Upgrade",
                type: "Attack",
                level: 19
            },
            {
                key: "class",
                upgrade: "L",
                mode: "Upgrade",
                type: "DC Class",
                level: 19
            }
        ]
    }

];

const playerCore2 = [
    //оракул
    {
        ...archetype(source.playerCore2.key, 92, 'Oracle'),
        ...cost(12, 0, 12, 0, 0),
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
        skillTrained: ['occultism', 'perfomance'],
        skillTrainedPoints: 4,
        spellTradition: 'сакральный',
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
        spellFocusPool: 2,
        // spellFocusBase: ["Courageous Anthem", "Counter Performance"],
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
            //Общие
            "Initial proficiencies", "Class feat Caster", "Ancestry and background", "Skill feat", "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            //Классовые
            "Shield Block", "Druid Spellcasting", "Druidic Order", "Voice of nature", "Wildsong", "Wild Empathy", "Wild Willpower", "Primal Hierophant",

            //Обще-классовые
            "Perception Expertise Druid", "Fortitude Expertise Druid", "Reflex Expertise Druid", "Expert Spellcaster Druid", "Weapon Expertise Druid",
            "Medium Armor Expertise Druid", "Weapon Specialization Druid", "Master Spellcaster Druid", "Legendary Spellcaster Druid", "Anathema Druid"
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

    //Варвар
    {
        ...archetype(source.playerCore2.key, 92, 'Barbarian'),
        ...cost(12, 0, 12, 0, 0),
        ...statBoost(1, 0, 0, 0, 0, 0),
        hint: 'Ярость поглощает вас в бою. Вы наслаждаетесь тем, что сеете хаос и используете мощное оружие, чтобы пробиваться через своих врагов, полагаясь на невероятную живучесть, не нуждаясь в сложных техниках или строгих тренировках. Ваши приступы ярости проистекают из свирепого инстинкта, который вы можете ассоциировать с животным, духом или какой-то частью себя. Для многих варваров грубая сила — это молот, а каждая проблема выглядит как гвоздь, в то время как другие пытаются сдержать в себе бурю эмоций и высвободить свой гнев только тогда, когда это действительно важно.',
        name: 'Варвар',
        keywords: 'варвар',
        hitpoints: 12,
        // keyAbility: ["dexterity", "strength"],
        keyAbility: [],
        trait: ["варвар"],
        rarity: "common",
        skillTrainedChoice: [],
        skillTrained: ['athletics'],
        skillTrainedPoints: 3,
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
            medium: "T",
            heavy: "U",
            unarmored: "T"
        },
        skillClass: "T",
        saving:
        {
            reflex: "T",
            fortitude: "E",
            will: "E",
        },
        isFeatLevelOne: true,
        description: [
            {
                name: 'encounter',
                text: '<p> Вы призываете свою ярость и бросаетесь на передовую, чтобы пробить себе путь.Ваша лучшая защита - нападение, вам нужно расправиться с врагам, прежде, чем они смогут воспользоваться вашей относительно слабой защитой.</p>'

            },
            {
                name: 'social',
                text: '<p> Вы используете запугивание, чтобы получить то, что вам нужно, особенно когда более мягкое убеждение не может решить задачу.</p>'

            },
            {
                name: 'exporation',
                text: '<p> Вы высматриваете опасность, готовые в одно мгновение броситься в бой. Вы взбираетесь на сложную каменную стену и сбрасываете веревку, чтобы другие последовали за вами, и идете вброд через опасные водные потоки, чтобы добраться до спрятанного переключателя под поверхностью воды.Если надо что - то сломать, то вы тут как тут.</p>'

            },
            {
                name: 'downtime',
                text: 'Вы можете отправиться в таверну чтобы покутить, дополнить устрашающую легенду о своих могучих подвигах или набрать последователей, чтобы самому стать военачальником.</p>'

            },
            {
                name: 'you',
                text: '<li><p>  Иметь укоренившийся источник гнева, ненависти или разочарования</p></li>'
                    + '<li><p>Предпочитать прямой подход тому, который утомительный и требует терпения</p></li>'
                    + '<li><p>Заниматься интенсивной физической подготовкой и бить любого, кто говорит, что это противоречит вашему отвращению к терпению и скуке</p></li>'
            },
            {
                name: 'other',
                text: '<li><p>Полагаются на вашу храбрость и силу, и верят, что вы можете постоять за себя в бою</p></li>'
                    + '<li><p>Считают вас нецивилизованным или грубым невежей, непригодным для высшего общества</p></li>'
                    + '<li><p>Верят, что вы верны своим друзьям и союзникам, и никогда не сдадитесь, пока не окончен бой</p></li>'
            }
        ],

        archetypeFeatures: [
            //Общие
            "Initial proficiencies", "Class feat Caster", "Ancestry and background", "Skill feat", "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            //Классовые
            "Rage", "Instinct", "Juggernaut", "Rage Resistance", "Brutality", "Fast Movement", "Quick Tempered", "Mighty Rage", "Greater Juggernaut",

            //Обще-классовые
            "Weapon Specialization", "Reflex Expert Barbarian", "Weapon Mastery", "Greater Weapon Specialization", "Indomitable Will", "Renewing Rage", "Armor Mastery", "Devastator"
            //, "Fortitude Expertise Druid", "Reflex Expertise Druid", "Expert Spellcaster Druid", "Weapon Expertise Druid",
            // "Medium Armor Expertise Druid", "Weapon Specialization Druid", "Master Spellcaster Druid", "Legendary Spellcaster Druid", "Anathema Druid"
        ],
        modification:
            [

                {
                    type: 'Speed',
                    mode: 'Bonus',
                    key: 'land',
                    valueBonus: 5,
                    typeBonus: 'status'
                },
                {
                    key: "simple",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Attack",
                    level: 5,
                },
                {
                    key: "martial",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "Attack",
                    level: 5,
                },
                {
                    key: "unarmed",
                    mode: "Upgrade",
                    upgrade: "E",
                    type: "Attack",
                    level: 5,
                },
                {
                    key: "fortitude",
                    upgrade: "M",
                    type: "Saving",
                    mode: "Upgrade",
                    level: 7,
                },
                {
                    key: "Weapon Specialization",
                    // upgrade: "M",
                    type: "Weapon Specialization",
                    level: 7,
                    bonusDamage: {
                        E: 2,
                        M: 3,
                        L: 4,
                    }
                    // valueBonus: 2,
                    // typeBonus: "damage"
                },
                // {
                //     key: "barbarian",
                //     value: 3,
                //     type: "Resistance",
                //     mode: "Upgrade",
                //     level: 9,
                // },
                {
                    key: "reflex",
                    upgrade: "E",
                    type: "Saving",
                    mode: "Upgrade",
                    level: 9,
                },
                {
                    key: "class",
                    upgrade: "E",
                    mode: "Upgrade",
                    type: "DC Class",
                    level: 11,
                },
                {
                    key: "fortitude",
                    upgrade: "L",
                    type: "Saving",
                    mode: "Upgrade",
                    level: 13,
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
                    key: "unarmed",
                    mode: "Upgrade",
                    upgrade: "M",
                    type: "Attack",
                    level: 13,
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
                    key: "will",
                    upgrade: "M",
                    type: "Saving",
                    mode: "Upgrade",
                    level: 15,
                },
                {
                    key: "Perception",
                    upgrade: "M",
                    type: "Perception",
                    mode: "Upgrade",
                    level: 17,

                },
                {
                    key: "light",
                    upgrade: "M",
                    mode: "Upgrade",
                    type: "Defence",
                    level: 19,
                },
                {
                    key: "medium",
                    upgrade: "M",
                    type: "Defence",
                    mode: "Upgrade",
                    criticalSpecialization: true,
                    level: 19,
                },
                {
                    key: "unarmored",
                    mode: "Upgrade",
                    upgrade: "M",
                    type: "Defence",
                    level: 19,
                },
                {
                    key: "class",
                    upgrade: "M",
                    mode: "Upgrade",
                    type: "DC Class",
                    level: 19,
                },
                //
            ]
    },

    //Алхимик
    {
        ...archetype(source.playerCore2.key, 93, 'Alchemist'),
        ...cost(8, 0, 0, 0, 0),
        ...statBoost(0, 0, 0, 1, 0, 0),
        hint: 'Для вас нет более прекрасного зрелища, чем странное варево, бурлящее в мензурке, и вы с самозабвением поглощаете свои гениальные эликсиры. Вы очарованы раскрытием тайн науки и природы, и постоянно, в своей лаборатории или прямо на ходу, экспериментируете с изобретательными составами на все случаи жизни. Вы бесстрашны в рисковой ситуации, бросая в своих врагов взрывчатые и токсичные склянки. Ваш уникальный путь к величию проложен алхимическими отварами, которые доводят ваш ум и тело до предела.',
        name: 'Алхимик',
        keywords: 'алхимик',
        hitpoints: 8,
        keyAbility: ["intelligence"],
        trait: ["алхимик"],
        rarity: "common",
        skillTrainedChoice: [],
        skillTrained: ['crafting'],
        skillTrainedPoints: 3,
        Perception: "T",
        skillAttack: {
            simple: "T",
            martial: "U",
            advanced: "U",
            unarmed: "T",
            bombs: "T"
        },
        skillDefence: {
            light: "T",
            medium: "T",
            heavy: "U",
            unarmored: "T"
        },
        skillClass: "T",
        saving: {
            reflex: "E",
            fortitude: "E",
            will: "T",
        },
        isFeatLevelOne: true,

        description: [
            {
                name: 'encounter',
                text: '<p>Вы бросаете бомбы в своих врагов, надоедаете им и поддерживаете остальную часть своей группы сильнодействующими эликсирами. На более высоких уровнях, ваши мутагены деформируют ваше тело в стойкое и мощное оружие.</p>'
            },
            {
                name: 'social',
                text: '<p>Вы предоставляете знания и опыт об алхимических предметах и связанных с ними секретах, таких как яды и болезни.</p>'
            },
            {
                name: 'exporation',
                text: '<p>Вы на чеку, держа бомбы наготове, в тоже время давая советы по всему алхимическому и таинственному.</p>'
            },
            {
                name: 'downtime',
                text: '<p>Вы экспериментируете в алхимической лаборатории, варите эликсиры, создаёте бомбы и продвигаете свои алхимические знания.</p>'
            },
            {
                name: 'you',
                text: '<li><p>Наслаждаться вознёй со странными формулами и алхимическими реагентами, часто с безрассудством и целеустремлённой самоотдачей.</p></li>' +
                    '<li><p>Получать удовольствие от того, чтобы сеять хаос с помощью сделанных вами алхимических смесей.</p></li>' +
                    '<li><p>Бесконечно экспериментировать, чтобы обнаружить новые, более мощные алхимические инструменты.</p></li>'
            },
            {
                name: 'other',
                text: '<li><p>Думают, что вы какой-то чародей или эксцентричный волшебник, и не понимают, что вы не сотворяете заклинаний.</p></li>' +
                    '<li><p>Не понимают ваше рвение к алхимии, креативности и изобретательству.</p></li>' +
                    '<li><p>Предполагают, что если вы не вызвали катастрофу своими экспериментами, то неизбежно сделаете это позже.</p></li>'
            }
        ],

        archetypeFeatures: [
            // Общие
            "Initial proficiencies", "Class feat Caster", "Ancestry and background", "Skill feat", "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            // Классовые
            "Alchemical Crafting", "Research Field", "Quick Alchemy", "Powerful Alchemy", "Perpetual Infusions", "Double Brew", "Alchemical Mastery",
            // Обще-классовые
            "Weapon Specialization", "Bombardier", "Efficient Alchemy", "Persistent Mutagens", "Greater Weapon Specialization", "Debilitating Bomb"
        ],
        modification: [
            {
                key: "bombs",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 7,
            },
            {
                key: "simple",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 7,
            },
            {
                key: "unarmed",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 7,
            },
            {
                key: "will",
                upgrade: "E",
                type: "Saving",
                mode: "Upgrade",
                level: 7,
            },
            {
                key: "class",
                upgrade: "E",
                mode: "Upgrade",
                type: "DC Class",
                level: 9,
            },
            {
                key: "perception",
                upgrade: "E",
                type: "Perception",
                mode: "Upgrade",
                level: 9,
            },
            {
                key: "Weapon Specialization",
                type: "Weapon Specialization",
                level: 13,
                bonusDamage: {
                    E: 2,
                    M: 3,
                    L: 4,
                }
            },
            {
                key: "fortitude",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 11,
            },
            {
                key: "reflex",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 15,
            },
            {
                key: "bombs",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 15,
            },
            {
                key: "simple",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 15,
            },
            {
                key: "unarmed",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 15,
            },
            {
                key: "greater-weapon-specialization",
                type: "greater-weapon-specialization",
                level: 15,
                bonusDamage: {
                    E: 4,
                    M: 6,
                    L: 8,
                }
            },
            {
                key: "light",
                upgrade: "M",
                mode: "Upgrade",
                type: "Defence",
                level: 19,
            },
            {
                key: "medium",
                upgrade: "M",
                type: "Defence",
                mode: "Upgrade",
                level: 19,
            },
            {
                key: "unarmored",
                upgrade: "M",
                mode: "Upgrade",
                type: "Defence",
                level: 19,
            },
            {
                key: "class",
                upgrade: "M",
                mode: "Upgrade",
                type: "DC Class",
                level: 17,
            }
        ]
    },

    //Ведьма
    {
        ...archetype(source.playerCore.key, 94, 'Witch'),
        ...cost(6, 0, 0, 0, 0),
        ...statBoost(0, 0, 0, 1, 0, 0),
        hint: 'Вы повелеваете могущественной магией не через изучение или преданность какому-либо идеалу, но как сосуд или представитель таинственного, потустороннего покровителя, которого даже вы не совсем понимаете. Эта сущность может быть тайным божеством, могущественной феей, проявлением природных энергий, древним духом или любым другим могущественным сверхъестественным существом.',
        name: 'Ведьма',
        keywords: 'ведьма',
        hitpoints: 6,
        keyAbility: ["intelligence"],
        trait: ["ведьма"],
        rarity: "common",
        skillTrainedChoice: [],
        skillTrained: [], // Определяется покровителем
        skillTrainedPoints: 3,
        spellTradition: '', // Определяется покровителем
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
        spellFocusPool: 1,
        // spellFocusBase: ["Марионетка покровителя", "Фазирование фамильяра"],
        spellsClass: {
            attack: "T",
            class: "T"
        },
        Perception: "T",
        skillAttack: {
            simple: "T",
            martial: "U",
            advanced: "U",
            unarmed: "T"
        },
        skillDefence: {
            light: "U",
            medium: "U",
            heavy: "U",
            unarmored: "T"
        },
        skillClass: "T",
        saving: {
            reflex: "T",
            fortitude: "T",
            will: "E",
        },
        isFeatLevelOne: false,
        description: [
            {
                name: 'encounter',
                text: '<p>Вы колдуете заклинания, чтобы изменить ход сражения. Вы используете магические сглазы, чтобы мешать врагам и помогать союзникам, в то же время используя более мощные заклинания, чтобы контролировать поле боя, исцелять или вредить, при помощи вашего экстраординарного фамильяра.</p>'
            },
            {
                name: 'social',
                text: '<p>Вы даёте знания по множеству тем, включая различные магические вопросы, и можете призывать магию своего покровителя, чтобы очаровывать или обманывать других.</p>'
            },
            {
                name: 'exporation',
                text: '<p>Вы остаетесь бдительными к магическим ловушкам и сокровищам, используя хитроумный набор заклинаний, чтобы преодолеть препятствия. Ваш фамильяр может помочь вам своим собственным набором необычных умений.</p>'
            },
            {
                name: 'downtime',
                text: '<p>Вы варите зелья, создаёте магические предметы, или охотитесь за новыми заклинаниями, которые выучит ваш фамильяр. Вы можете попытаться узнать больше о своем покровителе.</p>'
            },
            {
                name: 'you',
                text: '<li><p>Стремиться узнать больше о вашем покровителе или фамильяре</p></li>' +
                    '<li><p>Искать новые источники магии, такие как свитки и книги заклинаний</p></li>' +
                    '<li><p>Считать своего фамильяра как надежного союзника или вынужденную помеху</p></li>'
            },
            {
                name: 'other',
                text: '<li><p>Задаются вопросом о природе вашего покровителя и источнике вашей магии</p></li>' +
                    '<li><p>Ценят вашу способность помогать им магией</p></li>' +
                    '<li><p>Стараются не обижать вас, опасаясь сглаза</p></li>'
            }
        ],

        archetypeFeatures: [
            // Общие
            "Initial proficiencies", "Class feat Caster", "Ancestry and background", "Skill feat", "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            // Классовые
            "Patron Theme", "Familiar", "Witch Spellcasting", "Hexes", "Basic Lesson",
            // Обще-классовые
            "Spell Penetration", "Improved Familiar", "Greater Hex", "Legendary Witch"
        ],
        modification: [
            {
                key: "fortitude",
                upgrade: "E",
                type: "Saving",
                mode: "Upgrade",
                level: 5,
            },
            {
                key: "spells",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 7,
            },
            {
                key: "class",
                upgrade: "E",
                mode: "Upgrade",
                type: "DC Class",
                level: 7,
            },
            {
                key: "reflex",
                upgrade: "E",
                type: "Saving",
                mode: "Upgrade",
                level: 9,
            },
            {
                key: "perception",
                upgrade: "E",
                type: "Perception",
                mode: "Upgrade",
                level: 11,
            },
            {
                key: "simple",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 11,
            },
            {
                key: "unarmed",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 11,
            },
            {
                key: "unarmored",
                upgrade: "E",
                mode: "Upgrade",
                type: "Defence",
                level: 13,
            },
            {
                key: "Weapon Specialization",
                type: "Weapon Specialization",
                level: 13,
                bonusDamage: {
                    E: 2,
                    M: 3,
                    L: 4,
                }
            },
            {
                key: "spells",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 15,
            },
            {
                key: "class",
                upgrade: "M",
                mode: "Upgrade",
                type: "DC Class",
                level: 15,
            },
            {
                key: "will",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 17,
            },
            {
                key: "spells",
                upgrade: "L",
                mode: "Upgrade",
                type: "Attack",
                level: 19,
            },
            {
                key: "class",
                upgrade: "L",
                mode: "Upgrade",
                type: "DC Class",
                level: 19,
            }
        ]
    },

    //Монах
    {
        ...archetype(source.playerCore.key, 95, 'Monk'),
        ...cost(10, 0, 0, 0, 0),
        ...statBoost(1, 0, 0, 0, 0, 0), // Сила или Ловкость (на выбор)
        hint: 'Разум и дух, вот что дает силу вашему кулаку. Вы стремитесь к совершенству, превращая своё тело в безупречный инструмент, а ум — в дисциплинированный оплот мудрости. Вы — ожесточенный боец, известный своими навыками боевых искусств и боевыми стойками.',
        name: 'Монах',
        keywords: 'монах',
        hitpoints: 10,
        keyAbility: ["strength", "dexterity"], // На выбор
        trait: ["монах"],
        rarity: "common",
        skillTrainedChoice: [],
        skillTrained: ['acrobatics', 'athletics'],
        skillTrainedPoints: 4,
        Perception: "T",
        skillAttack: {
            simple: "T",
            martial: "U",
            advanced: "U",
            unarmed: "T"
        },
        skillDefence: {
            light: "U",
            medium: "U",
            heavy: "U",
            unarmored: "E" // Эксперт без доспехов с 1 уровня
        },
        skillClass: "T",
        saving: {
            reflex: "E", // Эксперт с 1 уровня
            fortitude: "E",
            will: "E"
        },
        isFeatLevelOne: true,

        description: [
            {
                name: 'encounter',
                text: '<p>Вы мчитесь в бой, уклоняясь или прыгая мимо препятствий, вытворяя акробатические трюки. Вы наносите удары врагам, обрушивая на них шквал атак голыми руками или владея специальным оружием.</p>'
            },
            {
                name: 'social',
                text: '<p>Ваша восприимчивость позволяет вам видеть ложь насквозь, а философская подготовка - постичь любую ситуацию.</p>'
            },
            {
                name: 'exporation',
                text: '<p>Вы взбираетесь на стены, уклоняетесь от ловушек, преодолеваете препятствия и перепрыгиваете через ямы. Обычно вы остаетесь вне группы, чтобы защитить её более уязвимых членов.</p>'
            },
            {
                name: 'downtime',
                text: '<p>Вы усердно тренируетесь, едите здоровую пищу, занимаетесь медитацией и изучаете различные философии. Ещё вы можете заняться ремеслом, которое стремитесь отточить до идеала.</p>'
            },
            {
                name: 'you',
                text: '<li><p>Придерживаетесь режима физической тренировки и медитации</p></li>' +
                    '<li><p>Встречаете невзгоды с холодным расчётом и спокойствием</p></li>' +
                    '<li><p>Думаете о самосовершенствовании, оставаясь в гармонии с собой</p></li>'
            },
            {
                name: 'other',
                text: '<li><p>Восхищаются вашими физическими достижениями</p></li>' +
                    '<li><p>Считают вас заносчивым из-за ваших принципов</p></li>' +
                    '<li><p>Обращаются к вам за философскими советами</p></li>'
            }
        ],

        archetypeFeatures: [
            // Общие
            "Initial proficiencies", "Ancestry and background", "Skill feat", "General feat",
            "Skill increase", "Ancestry feat", "Stat boost",
            // Классовые
            "Flurry of Blows", "Powerful Fist", "Mystic Strikes", "Ki Spells",
            // Обще-классовые
            "Weapon Specialization", "Perfection Path", "Diamond Soul", "Quivering Palm"
        ],
        modification: [
            {
                key: "speed",
                mode: "Bonus",
                valueBonus: 10,
                typeBonus: "status",
                level: 3
            },
            {
                key: "unarmed",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 5,
            },
            {
                key: "simple",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 5,
            },
            {
                key: "perception",
                upgrade: "E",
                type: "Perception",
                mode: "Upgrade",
                level: 5,
            },
            {
                key: "Weapon Specialization",
                type: "Weapon Specialization",
                level: 7,
                bonusDamage: {
                    E: 2,
                    M: 3,
                    L: 4,
                }
            },
            {
                key: "speed",
                mode: "Bonus",
                valueBonus: 15,
                typeBonus: "status",
                level: 7
            },
            {
                key: "fortitude",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 7,
            },
            {
                key: "unarmored",
                upgrade: "M",
                mode: "Upgrade",
                type: "Defence",
                level: 13,
            },
            {
                key: "unarmed",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 13,
            },
            {
                key: "simple",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 13,
            },
            {
                key: "speed",
                mode: "Bonus",
                valueBonus: 20,
                typeBonus: "status",
                level: 11
            },
            {
                key: "reflex",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 11,
            },
            {
                key: "will",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 15,
            },
            {
                key: "speed",
                mode: "Bonus",
                valueBonus: 25,
                typeBonus: "status",
                level: 15
            },
            {
                key: "unarmored",
                upgrade: "L",
                mode: "Upgrade",
                type: "Defence",
                level: 17,
            },
            {
                key: "speed",
                mode: "Bonus",
                valueBonus: 30,
                typeBonus: "status",
                level: 19
            }
        ]
    },

    //Сорвиголова
    {
        ...archetype(source.playerCore.key, 96, 'Swashbuckler'),
        ...cost(10, 0, 0, 0, 0),
        ...statBoost(0, 1, 0, 0, 0, 0), // Ловкость
        hint: 'Для вас битва — танец, в котором вы стильно и изящно двигаетесь среди врагов. Вы со вкусом мечетесь между бойцов и наносите мощные завершающие движения с легким движением запястья и блеском клинка.',
        name: 'Сорвиголова',
        keywords: 'сорвиголова',
        hitpoints: 10,
        keyAbility: ["dexterity"],
        trait: ["сорвиголова"],
        rarity: "common",
        skillTrainedChoice: [],
        skillTrained: ['acrobatics'],
        skillTrainedPoints: 4,
        Perception: "E", // Эксперт с 1 уровня
        skillAttack: {
            simple: "T",
            martial: "T", // Воинское оружие
            advanced: "U",
            unarmed: "T"
        },
        skillDefence: {
            light: "T",
            medium: "U",
            heavy: "U",
            unarmored: "T"
        },
        skillClass: "T",
        saving: {
            reflex: "E", // Эксперт с 1 уровня
            fortitude: "T",
            will: "E"
        },
        isFeatLevelOne: true,

        description: [
            {
                name: 'encounter',
                text: '<p>Вы выпендриваетесь, чтобы получить кураж, уклоняясь от ударов врага и отвечая быстрыми контратаками. В зависимости от стиля, вы можете танцевать среди врагов или обманывать их.</p>'
            },
            {
                name: 'social',
                text: '<p>Вы в равной степени можете очаровать или запугать других. Вы можете быть искусным светским львом или создавать отвлекающие маневры.</p>'
            },
            {
                name: 'exporation',
                text: '<p>Вы внимательно следите за обстановкой, всегда готовы броситься в бой со своим стилем и бравадой. Вы смело взаимодействуете с окружением.</p>'
            },
            {
                name: 'downtime',
                text: '<p>Вы можете кутить в таверне, ремонтировать своё вооружение или тренироваться. Для сохранения репутации вы можете создать организацию или завоевать поклонников.</p>'
            },
            {
                name: 'you',
                text: '<li><p>Изображаете себя героическим смельчаком или плутоватым хвастуном</p></li>' +
                    '<li><p>Высоко цените себя, будучи уверенным в своих умениях</p></li>' +
                    '<li><p>Регулярно практикуете свои навыки и движения</p></li>'
            },
            {
                name: 'other',
                text: '<li><p>Восхищаются вашей театральностью и мастерством владения клинком</p></li>' +
                    '<li><p>Считают вас высокомерным, пока не узнают лучше</p></li>' +
                    '<li><p>Недооценивают вашу угрозу до первого удара</p></li>'
            }
        ],

        archetypeFeatures: [
            // Общие
            "Initial proficiencies", "Ancestry and background", "Skill feat",
            "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            // Классовые


            "Panache",
            "SwashbucklerStyle",
            "PreciseStrike",
            "ConfidentFinisher",
            "SwashbucklerFeats",

            "GreatFortitude",
            "OpportuneRiposte",

            "StylishTricks",
            "VivaciousSpeed",

            "WeaponExpertise",
            "Evasion",
            "WeaponSpecialization",
            "ExemplaryFinisher",
            "SwashbucklerExpertise",
            "ContinuousFlair",
            "VigilantSenses",
            "ImprovedEvasion",
            "LightArmorExpertise",
            "WeaponMastery",
            "GreaterWeaponSpecialization",
            "KeenFlair",
            "Resolve",
            "EternalConfidence",
            "LightArmorMastery",

            "Panache", "Precise Strike", "Swashbuckler Style", "Confident Finisher",
            // Обще-классовые
            "Opportune Riposte", "Daring Finisher", "Perfect Finisher", "Master Duelist"
        ],
        modification: [
            {
                key: "speed",
                mode: "Bonus",
                valueBonus: 5,
                typeBonus: "status",
                condition: "hasPanache",
                level: 1
            },
            {
                key: "fortitude",
                upgrade: "E",
                type: "Saving",
                mode: "Upgrade",
                level: 3,
            },
            {
                key: "martial",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 5,
            },
            {
                key: "simple",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 5,
            },
            {
                key: "unarmed",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 5,
            },
            {
                key: "Weapon Specialization",
                type: "Weapon Specialization",
                level: 7,
                bonusDamage: {
                    E: 2,
                    M: 3,
                    L: 4,
                }
            },
            {
                key: "reflex",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 7,
            },
            {
                key: "speed",
                mode: "Bonus",
                valueBonus: 10,
                typeBonus: "status",
                condition: "hasPanache",
                level: 7
            },
            {
                key: "perception",
                upgrade: "M",
                type: "Perception",
                mode: "Upgrade",
                level: 11,
            },
            {
                key: "light",
                upgrade: "E",
                mode: "Upgrade",
                type: "Defence",
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
                key: "martial",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 13,
            },
            {
                key: "simple",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 13,
            },
            {
                key: "unarmed",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 13,
            },
            {
                key: "reflex",
                upgrade: "L",
                type: "Saving",
                mode: "Upgrade",
                level: 13,
            },
            {
                key: "will",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 17,
            },
            {
                key: "light",
                upgrade: "M",
                mode: "Upgrade",
                type: "Defence",
                level: 19,
            },
            {
                key: "unarmored",
                upgrade: "M",
                mode: "Upgrade",
                type: "Defence",
                level: 19,
            }
        ]
    },

    //чемпион
    {
        ...archetype(source.playerCore2.key, 96, 'Champion'),
        ...cost(10, 0, 0, 0, 0),
        ...statBoost(0, 1, 0, 0, 0, 0), // Ловкость
        hint: 'Вы - посланник божества, преданный служитель, взявший на себя тяжелую ношу, и придерживающийся кодекса, который отличает вас от окружающих. В то время как чемпионы существуют для всех мировоззрений, как чемпион добра, вы даете уверенность и надежду невинным. У вас есть мощная защита, которой вы делитесь со своими союзниками и невинными очевидцами, а также святая сила, которую вы используете, чтобы положить конец угрозе зла. Ваша преданность даже привлекает внимание святых духов, которые помогают вам в путешествии.',
        name: 'Чемпион',
        keywords: 'чемпион',
        hitpoints: 10,
        keyAbility: ["dexterity", "strength"],
        trait: ["чемпион"],
        rarity: "common",
        skillTrainedChoice: [],
        skillTrained: ['religion'],
        skillTrainedPoints: 2,
        Perception: "T", // Эксперт с 1 уровня
        skillAttack: {
            simple: "T",
            martial: "T", // Воинское оружие
            advanced: "U",
            unarmed: "T"
        },
        skillDefence: {
            light: "T",
            medium: "T",
            heavy: "T",
            unarmored: "T"
        },
        skillClass: "T",
        saving: {
            reflex: "T", // Эксперт с 1 уровня
            fortitude: "E",
            will: "E"
        },
        spellsClass: {
            attack: "T",
            class: "T"
        },
        isFeatLevelOne: true,

        description: [
            {
                name: 'encounter',
                text: '<p>Вы противостоите врагам в рукопашном бою, тщательно выбирая лучшую позицию, чтобы защитить своих союзников.</p>'
            },
            {
                name: 'social',
                text: '<p>Вы - голос надежды, стремящийся достичь мирного решения, которое укрепит связи и принесет хорошие результаты для всех.</p>'
            },
            {
                name: 'exporation',
                text: '<p>Вы преодолеваете как физические, так и духовные барьеры, вдохновляя ваших союзников своими действиями, и когда ваши товарищи-авантюристы просят об этом, даете моральное и этическое напутствие.</p>'
            },
            {
                name: 'downtime',
                text: '<p>Вы проводите много времени в священных молитвах и размышлениях, тщательных тренировках, благотворительных делах и исполнении принципов своего кодекса, но это не значит, что у вас нет времени заняться ремеслом или хобби.</p>'
            },
            {
                name: 'you',
                text: '<li><p>Верить, что всегда есть надежда, что добро восторжествует над злом, независимо от того, насколько мрачны шансы</p></li>' +
                    '<li><p>Знать, что цель не оправдывает средства, поскольку злые деяния лишь увеличивают влияние зла</p></li>' +
                    '<li><p>Иметь сильное чувство правильного и неправильного, и можете отчаяться, когда жадность или недальновидность порождают зло</p></li>'

            },
            {
                name: 'other',
                text: '<li><p>Видят в вас символ надежды, особенно в период великой нужды</p></li>' +
                    '<li><p>Беспокоятся, что вы втайне презираете их за то, что они не соответствуют вашим запредельным стандартам, или что вы непреклонны по отношению к компромиссам, когда это необходимо</p></li>' +
                    '<li><p>Знают, что вы дали сакральные клятвы служения, и верят, что вы сдержите их</p></li>'


            }
        ],

        archetypeFeatures: [
            // Общие
            "Initial proficiencies", "Ancestry and background", "Skill feat",
            "General feat", "Skill increase", "Ancestry feat", "Stat boost",
            //Общеклассовые

            "ArmorExpertise", "WeaponExpertise", "WeaponSpecialization", "GreaterWeaponSpecialization", "Reflex Expertise Champion",
            "Perception Expertise Champion", "Armor Mastery Champion", "WeaponMastery",
            // Классовые
            "Shield Block",
            "Cause",
            "Sanctification",
            "SkillCleric",
            "BlessingDevoted",

            "HeroDefiance",
            "LegendaryArmor",
            "ChampionMastery",
            "ExaltedReaction",
            "DivineWill",

            "SacredBody",
            "RelentlessReaction",

            "ChampionExpertise",

        ],
        modification: [
            {
                key: "speed",
                mode: "Bonus",
                valueBonus: 5,
                typeBonus: "status",
                condition: "hasPanache",
                level: 1
            },
            {
                key: "fortitude",
                upgrade: "E",
                type: "Saving",
                mode: "Upgrade",
                level: 3,
            },
            {
                key: "martial",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 5,
            },
            {
                key: "simple",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 5,
            },
            {
                key: "unarmed",
                upgrade: "E",
                mode: "Upgrade",
                type: "Attack",
                level: 5,
            },
            {
                key: "Weapon Specialization",
                type: "Weapon Specialization",
                level: 7,
                bonusDamage: {
                    E: 2,
                    M: 3,
                    L: 4,
                }
            },
            {
                key: "reflex",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 7,
            },
            {
                key: "speed",
                mode: "Bonus",
                valueBonus: 10,
                typeBonus: "status",
                condition: "hasPanache",
                level: 7
            },
            {
                key: "perception",
                upgrade: "M",
                type: "Perception",
                mode: "Upgrade",
                level: 11,
            },
            {
                key: "light",
                upgrade: "E",
                mode: "Upgrade",
                type: "Defence",
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
                key: "martial",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 13,
            },
            {
                key: "simple",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 13,
            },
            {
                key: "unarmed",
                upgrade: "M",
                mode: "Upgrade",
                type: "Attack",
                level: 13,
            },
            {
                key: "reflex",
                upgrade: "L",
                type: "Saving",
                mode: "Upgrade",
                level: 13,
            },
            {
                key: "will",
                upgrade: "M",
                type: "Saving",
                mode: "Upgrade",
                level: 17,
            },
            {
                key: "light",
                upgrade: "M",
                mode: "Upgrade",
                type: "Defence",
                level: 19,
            },
            {
                key: "unarmored",
                upgrade: "M",
                mode: "Upgrade",
                type: "Defence",
                level: 19,
            }
        ]
    }
];
const archetypeRepository = [
    ...playerCore,
    ...playerCore2
];

module.exports = archetypeRepository;
