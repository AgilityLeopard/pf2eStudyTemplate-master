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
const archetype = function (sourceKey, sourcePage, name, tier, species, stub = false) {
    let speciesSourceKey = 'playerCore';
    let speciesName = 'Human';
    let split = [];
    split = species.split('/');
    if (split.length === 2) {
        speciesSourceKey = split[0];
        speciesName = split[1];
    } else {
        split = species.split('-');
        if (split.length >= 2) {
            speciesSourceKey = split[0];
            speciesName = split.splice(1).map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join(' ');
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
        species: [speciesObject],
        stub,
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
        ...archetype(source.playerCore.key, 92, 'Fighter', 1, 'Human'),
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

    //Бард
    {
        ...archetype(source.playerCore.key, 92, 'Bard', 1, 'Human'),
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
        ...archetype(source.playerCore.key, 92, 'Druid', 1, 'Human'),
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
            light: "U",
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
        ...archetype(source.playerCore.key, 92, 'Cleric', 1, 'Human'),
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
            "Divine Font", "Cleric Spellcasting", "Doctrine"

            //Обще-классовые
            // "Perception Expertise Druid", "Fortitude Expertise Druid", "Reflex Expertise Druid", "Expert Spellcaster Druid", "Weapon Expertise Druid",
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
];

const playerCore2 = [
    {
        ...archetype(source.playerCore.key, 92, 'Oracle', 1, 'Human'),
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
            "Reactive Strike"
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
];
const archetypeRepository = [
    ...playerCore,
    ...playerCore2
];

module.exports = archetypeRepository;
