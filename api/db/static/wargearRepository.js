import { source } from './_sourcesRepository';
import { stringToKebab } from './_stringUtils';
import { ATTRIBUTES, SKILLS, TRAITS } from './_statUtils';

const rarity = {
    'C': 'Common',
    'U': 'Uncommon',
    'R': 'Rare',
    'V': 'Very Rare',
    'L': 'Unique',
};

const TYPES = {
    RANGED: 'Ranged Weapon',
    MELEE: 'Melee Weapon',
};

const gear = function (sourceKey, sourcePage, name, value, keywords, stub = false) {
    const valuePart = value.match(/\d+/g)[0];
    const rarityPart = value.match(/[a-zA-Z]+/g)[0].toUpperCase();
    return {
        source: {
            ...source[sourceKey],
            page: sourcePage,
        },
        key: `${stringToKebab(`${sourceKey} ${name}`)}`,
        name,
        hint: '',
        // type: 'Misc',
        subtype: '',
        value: valuePart,
        // rarity: rarity[rarityPart],
        keywords: keywords.split(',').map((k) => k.trim()),
        stub: stub,
        meta: [],
    };
};

const price = function (pp, gp, sp, cp) {

    return {
        pp: pp,
        gp: gp,
        sp: sp,
        cp: cp
    };
};


const armour = function (subtype, armourRating, traits) {
    return {
        type: 'Armour',
        subtype: subtype,
        meta: [
            {
                type: 'armour',
                armourRating: armourRating,
                traits: traits ? traits.split(',').map((k) => k.trim()) : [],
            }
        ],
    };
};




/**
 * Damage 2+1ED; AP 0; Range M; Steadfast
 * [Damage 2+1ED][AP 0][Range M]; Steadfast
 * Damage 4+1ED; AP 0; Range 2m; Steadfast, Two-Handed, Unwieldy (2)s
 *
 * @param paxString
 * @param subtype
 * @returns {{subtype: string, meta: [{traits: (*|[]), armourRating: *}], type: string}}
 */


const playerCore = [
    {
        ...gear(source.playerCore.key, 211, 'Short Sword', '2C', 'Blade,[Any]'),
        ...price(0, 9, 0, 0),
        nameGear: "Короткий меч",
        traits: ["быстрое", "точное", "универсальное рубящий"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d6",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "sword",
        description: "Эти клинки бывают разных форм и стилей, но они обычно 2 фута длиной."
    },
    {
        ...gear(source.playerCore.key, 212, 'Club', '2C', 'Bludgeoning'),
        ...price(0, 0, 0, 0),
        nameGear: "Дубинка",
        traits: ["простое"],
        type: "melee",
        category: "simple",
        weigthL: 1,
        damage: "1d6",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "club",
        description: "Простая деревянная дубинка, используемая для нанесения тупого урона."
    },
    {
        ...gear(source.playerCore.key, 213, 'Dagger', '2C', 'Piercing'),
        ...price(0, 2, 0, 0),
        nameGear: "Кинжал",
        traits: ["быстрое", "метательное", "точное"],
        type: "melee",
        category: "simple",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "knife",
        description: "Небольшой клинок, идеальный для скрытого ношения и метания."
    },
    {
        ...gear(source.playerCore.key, 214, 'Light Mace', '2C', 'Bludgeoning'),
        ...price(0, 4, 0, 0),
        nameGear: "Легкая булава",
        traits: ["простое"],
        type: "melee",
        category: "simple",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "club",
        description: "Легкая булава, используемая для нанесения тупого урона."
    },
    {
        ...gear(source.playerCore.key, 215, 'Mace', '2C', 'Bludgeoning'),
        ...price(0, 10, 0, 0),
        nameGear: "Булава",
        traits: ["простое"],
        type: "melee",
        category: "simple",
        weigthL: 1,
        damage: "1d6",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "club",
        description: "Тяжелая булава, способная наносить значительный урон."
    },
    {
        ...gear(source.playerCore.key, 216, 'Morningstar', '2C', 'Bludgeoning, Piercing'),
        ...price(0, 10, 0, 0),
        nameGear: "Моргенштерн",
        traits: ["простое"],
        type: "melee",
        category: "simple",
        weigthL: 1,
        damage: "1d6",
        typeDamage: "bludgeoning, piercing",
        rarity: "common",
        hands: 1,
        group: "club",
        description: "Оружие с шипами, наносящее как тупой, так и колющий урон."
    },
    {
        ...gear(source.playerCore.key, 217, 'Sickle', '2C', 'Slashing'),
        ...price(0, 2, 0, 0),
        nameGear: "Серп",
        traits: ["простое"],
        type: "melee",
        category: "simple",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "slashing",
        rarity: "common",
        hands: 1,
        group: "knife",
        description: "Небольшой изогнутый клинок, используемый для рубящих ударов."
    },
    {
        ...gear(source.playerCore.key, 218, 'Staff', '2C', 'Bludgeoning'),
        ...price(0, 0, 0, 0),
        nameGear: "Посох",
        traits: ["простое"],
        type: "melee",
        category: "simple",
        weigthL: 1,
        damage: "1d4",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "club",
        description: "Длинный деревянный посох, используемый для защиты и нападения."
    },
    {
        ...gear(source.playerCore.key, 219, 'Spear', '2C', 'Piercing'),
        ...price(0, 1, 0, 0),
        nameGear: "Копье",
        traits: ["простое", "метательное"],
        type: "melee",
        category: "simple",
        weigthL: 1,
        damage: "1d6",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "spear",
        description: "Длинное копье, используемое для колющих ударов и метания."
    },
    {
        ...gear(source.playerCore.key, 220, 'Longspear', '2C', 'Piercing'),
        ...price(0, 5, 0, 0),
        nameGear: "Длинное копье",
        traits: ["простое"],
        type: "melee",
        category: "simple",
        weigthL: 2,
        damage: "1d8",
        typeDamage: "piercing",
        rarity: "common",
        hands: 2,
        group: "spear",
        description: "Длинное копье, предназначенное для дальних атак."
    },
    {
        ...gear(source.playerCore.key, 221, 'Gauntlet', '2C', 'Bludgeoning'),
        ...price(0, 2, 0, 0),
        nameGear: "Латная рукавица",
        traits: ["простое"],
        type: "melee",
        category: "simple",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "brawling",
        description: "Металлическая рукавица, используемая для ударов."
    },
    {
        ...gear(source.playerCore.key, 222, 'Spiked Gauntlet', '2C', 'Piercing'),
        ...price(0, 3, 0, 0),
        nameGear: "Шипованная рукавица",
        traits: ["простое"],
        type: "melee",
        category: "simple",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "brawling",
        description: "Рукавица с шипами, наносящая колющий урон."
    },
    {
        ...gear(source.playerCore.key, 223, 'Forked Bipod', '2C', 'Piercing'),
        ...price(0, 3, 0, 0),
        nameGear: "Вильчатая сошка",
        traits: ["простое"],
        type: "melee",
        category: "simple",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "spear",
        description: "Оружие с вильчатым наконечником, используемое для колющих ударов."
    },
    {
        ...gear(source.playerCore.key, 224, 'Knuckle Duster', '2C', 'Bludgeoning'),
        ...price(0, 3, 0, 0),
        nameGear: "Кастет",
        traits: ["простое"],
        type: "melee",
        category: "simple",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "brawling",
        description: "Металлический кастет, усиливающий удары кулаком."
    },
    {
        ...gear(source.playerCore.key, 225, 'Throwing Knife', '2C', 'Piercing'),
        ...price(0, 3, 0, 0),
        nameGear: "Метательный нож",
        traits: ["простое", "метательное"],
        type: "melee",
        category: "simple",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "knife",
        description: "Небольшой нож, предназначенный для метания."
    },
    {
        ...gear(source.playerCore.key, 241, 'Main-gauche', '2C', 'Piercing'),
        ...price(0, 5, 0, 0),
        nameGear: "Мэн-гош",
        traits: ["быстрое", "точное", "парирование", "разоружение", "универсальное"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "knife",
        description: "Короткий кинжал, используемый для парирования и быстрых ударов."
    },
    {
        ...gear(source.playerCore.key, 242, 'Shortsword', '2C', 'Piercing'),
        ...price(0, 9, 0, 0),
        nameGear: "Короткий меч",
        traits: ["быстрое", "точное", "универсальное"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d6",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "sword",
        description: "Короткий и легкий меч, идеальный для быстрых атак."
    },
    {
        ...gear(source.playerCore.key, 243, 'Longsword', '2C', 'Slashing'),
        ...price(0, 10, 0, 0),
        nameGear: "Длинный меч",
        traits: ["универсальное"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d8",
        typeDamage: "slashing",
        rarity: "common",
        hands: 1,
        group: "sword",
        description: "Универсальный меч, подходящий для рубящих и колющих ударов."
    },
    {
        ...gear(source.playerCore.key, 244, 'Rapier', '2C', 'Piercing'),
        ...price(0, 20, 0, 0),
        nameGear: "Рапира",
        traits: ["точное", "смертельное d8", "разоружение"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d6",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "sword",
        description: "Тонкий и легкий меч, предназначенный для точных колющих ударов."
    },
    {
        ...gear(source.playerCore.key, 245, 'Scimitar', '2C', 'Slashing'),
        ...price(0, 10, 0, 0),
        nameGear: "Скимитар",
        traits: ["силовое", "размах"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d6",
        typeDamage: "slashing",
        rarity: "common",
        hands: 1,
        group: "sword",
        description: "Изогнутый меч, идеальный для мощных рубящих ударов."
    },
    {
        ...gear(source.playerCore.key, 246, 'Bastard Sword', '2C', 'Slashing'),
        ...price(0, 40, 0, 0),
        nameGear: "Меч-бастард",
        traits: ["двуручное d12"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d8",
        typeDamage: "slashing",
        rarity: "common",
        hands: 1,
        group: "sword",
        description: "Универсальный меч, который можно использовать одной или двумя руками."
    },
    {
        ...gear(source.playerCore.key, 247, 'Sword Cane', '2C', 'Piercing'),
        ...price(0, 50, 0, 0),
        nameGear: "Меч-трость",
        traits: ["быстрое", "точное", "скрываемое"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d6",
        typeDamage: "piercing",
        rarity: "uncommon",
        hands: 1,
        group: "sword",
        description: "Трость с скрытым клинком, идеальная для скрытого ношения."
    },
    {
        ...gear(source.playerCore.key, 248, 'Falchion', '2C', 'Slashing'),
        ...price(0, 30, 0, 0),
        nameGear: "Фальшион",
        traits: ["силовое", "размах"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d10",
        typeDamage: "slashing",
        rarity: "common",
        hands: 2,
        group: "sword",
        description: "Тяжелый изогнутый меч, предназначенный для мощных рубящих ударов."
    },
    {
        ...gear(source.playerCore.key, 249, 'Greatsword', '2C', 'Slashing'),
        ...price(0, 20, 0, 0),
        nameGear: "Двуручный меч",
        traits: ["универсальное"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d12",
        typeDamage: "slashing",
        rarity: "common",
        hands: 2,
        group: "sword",
        description: "Огромный меч, требующий двух рук для эффективного использования."
    },
    {
        ...gear(source.playerCore.key, 250, 'Hatchet', '2C', 'Slashing'),
        ...price(0, 4, 0, 0),
        nameGear: "Топорик",
        traits: ["быстрое", "размах", "метательное"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d6",
        typeDamage: "slashing",
        rarity: "common",
        hands: 1,
        group: "axe",
        description: "Небольшой топор, подходящий для метания и рубящих ударов."
    },
    {
        ...gear(source.playerCore.key, 251, 'Battle Axe', '2C', 'Slashing'),
        ...price(0, 10, 0, 0),
        nameGear: "Боевой топор",
        traits: ["размах"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d8",
        typeDamage: "slashing",
        rarity: "common",
        hands: 1,
        group: "axe",
        description: "Тяжелый топор, предназначенный для мощных рубящих ударов."
    },
    {
        ...gear(source.playerCore.key, 252, 'Greataxe', '2C', 'Slashing'),
        ...price(0, 20, 0, 0),
        nameGear: "Двуручный топор",
        traits: ["размах"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d12",
        typeDamage: "slashing",
        rarity: "common",
        hands: 2,
        group: "axe",
        description: "Огромный топор, требующий двух рук для нанесения сокрушительных ударов."
    },
    {
        ...gear(source.playerCore.key, 253, 'Light Pick', '2C', 'Piercing'),
        ...price(0, 4, 0, 0),
        nameGear: "Легкий клевец",
        traits: ["быстрое", "фатальное d8"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "pick",
        description: "Небольшой клевец, предназначенный для точных колющих ударов."
    },
    {
        ...gear(source.playerCore.key, 254, 'Pick', '2C', 'Piercing'),
        ...price(0, 7, 0, 0),
        nameGear: "Клевец",
        traits: ["фатальное d10"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d6",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "pick",
        description: "Тяжелый клевец, способный наносить смертельные удары."
    },
    {
        ...gear(source.playerCore.key, 255, 'Greatpick', '2C', 'Piercing'),
        ...price(0, 10, 0, 0),
        nameGear: "Двуручный клевец",
        traits: ["фатальное d12"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d10",
        typeDamage: "piercing",
        rarity: "common",
        hands: 2,
        group: "pick",
        description: "Огромный клевец, требующий двух рук для нанесения смертельных ударов."
    },
    {
        ...gear(source.playerCore.key, 256, 'Glaive', '2C', 'Slashing'),
        ...price(0, 10, 0, 0),
        nameGear: "Глефа",
        traits: ["длинное", "силовое", "смертельное d8"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d8",
        typeDamage: "slashing",
        rarity: "common",
        hands: 2,
        group: "polearm",
        description: "Древковое оружие с длинным лезвием, идеальное для размашистых ударов."
    },
    {
        ...gear(source.playerCore.key, 257, 'Halberd', '2C', 'Piercing'),
        ...price(0, 20, 0, 0),
        nameGear: "Алебарда",
        traits: ["длинное", "универсальное"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d10",
        typeDamage: "piercing",
        rarity: "common",
        hands: 2,
        group: "polearm",
        description: "Комбинированное древковое оружие с топором и копейным остриём."
    },
    {
        ...gear(source.playerCore.key, 258, 'Guisarme', '2C', 'Slashing'),
        ...price(0, 20, 0, 0),
        nameGear: "Гвизарма",
        traits: ["длинное", "опрокидывание"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d10",
        typeDamage: "slashing",
        rarity: "common",
        hands: 2,
        group: "polearm",
        description: "Изогнутое древковое оружие, эффективное против конницы."
    },
    {
        ...gear(source.playerCore.key, 259, 'Ranseur', '2C', 'Piercing'),
        ...price(0, 20, 0, 0),
        nameGear: "Рунка",
        traits: ["длинное", "разоружение"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d10",
        typeDamage: "piercing",
        rarity: "common",
        hands: 2,
        group: "polearm",
        description: "Древковое оружие с трезубым наконечником, идеальное для парирования."
    },
    {
        ...gear(source.playerCore.key, 260, 'Scythe', '2C', 'Slashing'),
        ...price(0, 20, 0, 0),
        nameGear: "Коса",
        traits: ["смертельное d10", "опрокидывание"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d10",
        typeDamage: "slashing",
        rarity: "common",
        hands: 2,
        group: "polearm",
        description: "Сельскохозяйственное орудие, адаптированное для боя."
    },
    {
        ...gear(source.playerCore.key, 261, 'Lance', '2C', 'Piercing'),
        ...price(0, 10, 0, 0),
        nameGear: "Кавалерийская пика",
        traits: ["длинное", "смертельное d8", "кавалерийское d6"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d8",
        typeDamage: "piercing",
        rarity: "common",
        hands: 2,
        group: "spear",
        description: "Длинное копьё, предназначенное для конных атак."
    },
    {
        ...gear(source.playerCore.key, 262, 'Trident', '2C', 'Piercing'),
        ...price(0, 10, 0, 0),
        nameGear: "Трезубец",
        traits: ["метательное"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d8",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "spear",
        description: "Трёхзубое копьё, используемое как для ближнего боя, так и для метания."
    },
    {
        ...gear(source.playerCore.key, 263, 'Flail', '2C', 'Bludgeoning'),
        ...price(0, 8, 0, 0),
        nameGear: "Цеп",
        traits: ["размах", "разоружение", "опрокидывание"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d6",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "flail",
        description: "Гибкое оружие с ударной частью на цепи."
    },
    {
        ...gear(source.playerCore.key, 264, 'War Flail', '2C', 'Bludgeoning'),
        ...price(0, 20, 0, 0),
        nameGear: "Двуручный цеп",
        traits: ["размах", "разоружение", "опрокидывание"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d10",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 2,
        group: "flail",
        description: "Усиленная версия цепа, требующая двух рук."
    },
    {
        ...gear(source.playerCore.key, 265, 'Light Hammer', '2C', 'Bludgeoning'),
        ...price(0, 3, 0, 0),
        nameGear: "Легкий молот",
        traits: ["быстрое", "метательное"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d6",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "hammer",
        description: "Небольшой молот, подходящий для метания."
    },
    {
        ...gear(source.playerCore.key, 266, 'Warhammer', '2C', 'Bludgeoning'),
        ...price(0, 10, 0, 0),
        nameGear: "Боевой молот",
        traits: ["толчок"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d8",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "hammer",
        description: "Тяжелый молот, способный отталкивать противников."
    },
    {
        ...gear(source.playerCore.key, 267, 'Maul', '2C', 'Bludgeoning'),
        ...price(0, 30, 0, 0),
        nameGear: "Кувалда",
        traits: ["толчок"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d12",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 2,
        group: "hammer",
        description: "Огромный молот, наносящий сокрушительные удары."
    },
    {
        ...gear(source.playerCore.key, 268, 'Greatclub', '2C', 'Bludgeoning'),
        ...price(0, 10, 0, 0),
        nameGear: "Двуручная дубина",
        traits: ["обратный замах", "толчок"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d10",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 2,
        group: "club",
        description: "Массивная дубина, требующая двух рук."
    },
    {
        ...gear(source.playerCore.key, 269, 'Machete', '2C', 'Slashing'),
        ...price(0, 7, 0, 0),
        nameGear: "Мачете",
        traits: ["размах", "смертельное d8"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d6",
        typeDamage: "slashing",
        rarity: "uncommon",
        hands: 1,
        group: "sword",
        description: "Длинный нож для рубки растительности, адаптированный для боя."
    },
    {
        ...gear(source.playerCore.key, 270, 'Meteor Hammer', '2C', 'Bludgeoning'),
        ...price(0, 30, 0, 0),
        nameGear: "Молот-метеор",
        traits: ["длинное", "обратный замах", "разоружение", "опрокидывание"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d8",
        typeDamage: "bludgeoning",
        rarity: "uncommon",
        hands: 2,
        group: "flail",
        description: "Экзотическое оружие с грузами на цепях."
    },

    ///Доспехи
    {
        ...gear(source.playerCore.key, 211, 'Chain Mail', '2C', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 6, 0, 0),
        nameGear: "Кольчуга",
        traits: ["гибкий", "шумный"],
        category: "medium",
        // category: "heavy",
        // price: "6G",
        // damage: "1d6",
        // typeDamage: "piercing",
        rarity: "common",
        bonusAC: 4,
        modDex: 1,
        penalty: 2,
        penaltySpeed: 5,
        weight: 2,
        strength: 16,
        // hands: 1,
        group: "leather",
        description: "Кольчужный комплект содержит несколько частей доспеха, состоящих из небольших металлических колец, соединенных вместе и образующих защитную сетку. Обычно он включает в себя кольчужную рубашку, поножи, рукава и койф, которые в совокупности защищают большую часть тела."
    },
    // Одежда исследователя (Explorer's Clothing)
    {
        ...gear(source.playerCore.key, 100, 'Explorer\'s Clothing', '1C', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 0, 1, 0),
        nameGear: "Одежда исследователя",
        traits: ["удобный"],
        category: "light",
        rarity: "common",
        bonusAC: 0,
        modDex: 5,
        penalty: 0,
        penaltySpeed: 0,
        weight: 0,
        strength: 0,
        group: "Одежда",
        description: "Прочная и удобная одежда для путешествий, не обеспечивающая защиты, но позволяющая свободно двигаться."
    },

    // Стеганый доспех (Padded Armor)
    {
        ...gear(source.playerCore.key, 101, 'Padded Armor', '2C', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 0, 2, 0),
        nameGear: "Стеганый доспех",
        traits: ["удобный"],
        category: "light",
        rarity: "common",
        bonusAC: 1,
        modDex: 3,
        penalty: 0,
        penaltySpeed: 0,
        weight: 0,
        strength: 10,
        group: "Одежда",
        description: "Многослойная стеганая ткань, обеспечивающая минимальную защиту."
    },

    // Кожаный доспех (Leather)
    {
        ...gear(source.playerCore.key, 102, 'Leather Armor', '2G', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 2, 0, 0),
        nameGear: "Кожаный доспех",
        traits: [],
        category: "light",
        rarity: "common",
        bonusAC: 1,
        modDex: 4,
        penalty: -1,
        penaltySpeed: 0,
        weight: 1,
        strength: 10,
        group: "Кожаный",
        description: "Доспех из твердой кожи, обеспечивающий базовую защиту."
    },

    // Клепаный кожаный доспех (Studded Leather)
    {
        ...gear(source.playerCore.key, 103, 'Studded Leather', '3G', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 3, 0, 0),
        nameGear: "Клепаный кожаный доспех",
        traits: [],
        category: "light",
        rarity: "common",
        bonusAC: 2,
        modDex: 3,
        penalty: -1,
        penaltySpeed: 0,
        weight: 1,
        strength: 12,
        group: "Кожаный",
        description: "Кожаный доспех с металлическими заклепками для усиления защиты."
    },

    // Кольчужная рубаха (Chain Shirt)
    {
        ...gear(source.playerCore.key, 104, 'Chain Shirt', '5G', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 5, 0, 0),
        nameGear: "Кольчужная рубаха",
        traits: ["гибкий", "шумный"],
        category: "light",
        rarity: "common",
        bonusAC: 2,
        modDex: 3,
        penalty: -1,
        penaltySpeed: 0,
        weight: 1,
        strength: 12,
        group: "Кольчужный",
        description: "Короткая кольчуга, защищающая торп и плечи."
    },

    // Сыромятный доспех (Hide)
    {
        ...gear(source.playerCore.key, 201, 'Hide Armor', '2G', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 2, 0, 0),
        nameGear: "Сыромятный доспех",
        traits: [],
        category: "medium",
        rarity: "common",
        bonusAC: 3,
        modDex: 2,
        penalty: -2,
        penaltySpeed: -5,
        weight: 2,
        strength: 14,
        group: "Кожаный",
        description: "Грубый доспех из толстой кожи, обеспечивающий среднюю защиту."
    },

    // Чешуйчатый доспех (Scale Mail)
    {
        ...gear(source.playerCore.key, 202, 'Scale Mail', '4G', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 4, 0, 0),
        nameGear: "Чешуйчатый доспех",
        traits: [],
        category: "medium",
        rarity: "common",
        bonusAC: 3,
        modDex: 2,
        penalty: -2,
        penaltySpeed: -5,
        weight: 2,
        strength: 14,
        group: "Композитный",
        description: "Доспех из металлических чешуек, нашитых на кожаную основу."
    },

    // Кольчуга (Chain Mail)
    {
        ...gear(source.playerCore.key, 203, 'Chain Mail', '6G', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 6, 0, 0),
        nameGear: "Кольчуга",
        traits: ["гибкий", "шумный"],
        category: "medium",
        rarity: "common",
        bonusAC: 4,
        modDex: 1,
        penalty: -2,
        penaltySpeed: -5,
        weight: 2,
        strength: 16,
        group: "Кольчужный",
        description: "Полный комплект кольчуги, защищающий все тело."
    },

    // Нагрудник (Breastplate)
    {
        ...gear(source.playerCore.key, 204, 'Breastplate', '8G', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 8, 0, 0),
        nameGear: "Нагрудник",
        traits: [],
        category: "medium",
        rarity: "common",
        bonusAC: 4,
        modDex: 1,
        penalty: -2,
        penaltySpeed: -5,
        weight: 2,
        strength: 16,
        group: "Латный",
        description: "Металлическая кираса, защищающая торс."
    },
    // Пластинчатый доспех (Splint Mail)
    {
        ...gear(source.playerCore.key, 301, 'Splint Mail', '13G', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 13, 0, 0),
        nameGear: "Пластинчатый доспех",
        traits: [],
        category: "heavy",
        rarity: "common",
        bonusAC: 5,
        modDex: 1,
        penalty: -3,
        penaltySpeed: -10,
        weight: 3,
        strength: 16,
        group: "Композитный",
        description: "Доспех из металлических пластин, соединенных кольчугой."
    },

    // Полулатный доспех (Half Plate)
    {
        ...gear(source.playerCore.key, 302, 'Half Plate', '18G', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 18, 0, 0),
        nameGear: "Полулатный доспех",
        traits: [],
        category: "heavy",
        rarity: "common",
        bonusAC: 5,
        modDex: 1,
        penalty: -3,
        penaltySpeed: -10,
        weight: 3,
        strength: 16,
        group: "Латный",
        description: "Частичный латный доспех, защищающий ключевые части тела."
    },

    // Полный латный доспех (Full Plate)
    {
        ...gear(source.playerCore.key, 303, 'Full Plate', '30G', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 30, 0, 0),
        nameGear: "Полный латный доспех",
        traits: ["защитный"],
        category: "heavy",
        rarity: "rare",
        bonusAC: 6,
        modDex: 0,
        penalty: -3,
        penaltySpeed: -10,
        weight: 4,
        strength: 18,
        group: "Латный",
        description: "Полный комплект лат, обеспечивающий максимальную защиту."
    },

    // Латный доспех Хеллнайта (Hellknight Plate)
    {
        ...gear(source.playerCore.key, 304, 'Hellknight Plate', '35G', ''),
        ...armour(undefined, 0, 0),
        ...price(0, 35, 0, 0),
        nameGear: "Латный доспех Хеллнайта",
        traits: ["защитный", "необычный"],
        category: "heavy",
        rarity: "rare",
        bonusAC: 6,
        modDex: 0,
        penalty: -3,
        penaltySpeed: -10,
        weight: 4,
        strength: 18,
        group: "Латный",
        description: "Элитный латный доспех, используемый рыцарями Хеллнайта."
    },
    {
        ...gear(source.playerCore.key, 226, 'Clan Dagger', '2C', 'Piercing'),
        ...price(0, 20, 0, 0),
        nameGear: "Клановый кинжал",
        traits: ["быстрое", "парирование", "универсальное"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "piercing",
        rarity: "uncommon",
        hands: 1,
        group: "knife",
        description: "Кинжал, используемый в клановых войнах, с уникальным дизайном."
    },
    {
        ...gear(source.playerCore.key, 227, 'Katar', '2C', 'Piercing'),
        ...price(0, 3, 0, 0),
        nameGear: "Катар",
        traits: ["быстрое", "смертельное d6"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "piercing",
        rarity: "uncommon",
        hands: 1,
        group: "knife",
        description: "Короткий клинок, используемый для быстрых и точных ударов."
    },
    {
        ...gear(source.playerCore.key, 228, 'Tri-bladed Katar', '2C', 'Piercing'),
        ...price(0, 8, 0, 0),
        nameGear: "Трехлезвийный катар",
        traits: ["фатальное d8", "разоружение"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "piercing",
        rarity: "uncommon",
        hands: 1,
        group: "knife",
        description: "Катар с тремя лезвиями, увеличивающими шанс нанести критический урон."
    },
    {
        ...gear(source.playerCore.key, 229, 'Juggling Club', '2C', 'Bludgeoning'),
        ...price(0, 1, 0, 0),
        nameGear: "Булава для жонглирования",
        traits: ["быстрое", "метательное", "несмертельное"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "bludgeoning",
        rarity: "uncommon",
        hands: 1,
        group: "club",
        description: "Булава, используемая для жонглирования и нанесения легкого урона."
    },
    {
        ...gear(source.playerCore.key, 230, 'Poi', '2C', 'Bludgeoning'),
        ...price(0, 2, 0, 0),
        nameGear: "Пои",
        traits: ["быстрое", "точное", "обратный замах", "несмертельное"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "bludgeoning",
        rarity: "uncommon",
        hands: 1,
        group: "flail",
        description: "Оружие, состоящее из грузов на цепях, используемое для круговых ударов."
    },
    {
        ...gear(source.playerCore.key, 231, 'Battle Lute', '2C', 'Bludgeoning'),
        ...price(0, 15, 0, 0),
        nameGear: "Боевая лютня",
        traits: ["толчок", "двуручное d8"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d4",
        typeDamage: "bludgeoning",
        rarity: "uncommon",
        hands: 1,
        group: "club",
        description: "Лютня, используемая как оружие, способное наносить урон и отталкивать врагов."
    },
    {
        ...gear(source.playerCore.key, 232, 'Shears', '2C', 'Slashing'),
        ...price(0, 5, 0, 0),
        nameGear: "Ножницы",
        traits: ["точное", "смертельное d8", "универсальное"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "slashing",
        rarity: "uncommon",
        hands: 1,
        group: "knife",
        description: "Большие ножницы, используемые как оружие для рубящих ударов."
    },
    {
        ...gear(source.playerCore.key, 233, 'Thundermace', '2C', 'Bludgeoning'),
        ...price(0, 2, 0, 0),
        nameGear: "Гремящая булава",
        traits: ["обратный замах"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d8",
        typeDamage: "bludgeoning",
        rarity: "uncommon",
        hands: 2,
        group: "club",
        description: "Мощная булава, способная наносить сокрушительные удары."
    },
    {
        ...gear(source.playerCore.key, 234, 'Whip', '2C', 'Slashing'),
        ...price(0, 1, 0, 0),
        nameGear: "Хлыст",
        traits: ["точное", "длинное", "разоружение", "опрокидывание", "несмертельное"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        damage: "1d4",
        typeDamage: "slashing",
        rarity: "common",
        hands: 1,
        group: "flail",
        description: "Гибкий хлыст, используемый для дальних атак и контроля над противником."
    },
    {
        ...gear(source.playerCore.key, 235, 'Sap', '2C', 'Bludgeoning'),
        ...price(0, 1, 0, 0),
        nameGear: "Мягкая дубинка",
        traits: ["быстрое", "несмертельное"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d6",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "club",
        description: "Дубинка, предназначенная для оглушения противников без нанесения смертельных ран."
    },
    {
        ...gear(source.playerCore.key, 236, 'Bo Staff', '2C', 'Bludgeoning'),
        ...price(0, 2, 0, 0),
        nameGear: "Посох-Бо",
        traits: ["длинное", "парирование", "опрокидывание"],
        type: "melee",
        category: "martial",
        weigthL: 2,
        damage: "1d8",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 2,
        group: "club",
        description: "Длинный посох, используемый для защиты и нападения."
    },
    {
        ...gear(source.playerCore.key, 237, 'Starknife', '2C', 'Piercing'),
        ...price(0, 20, 0, 0),
        nameGear: "Нож-звезда",
        traits: ["быстрое", "точное", "смертельное d6", "метательное", "универсальное"],
        type: "melee",
        category: "martial",
        weigthL: 0.5,
        damage: "1d4",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "knife",
        description: "Метательный нож в форме звезды, способный наносить точные удары."
    },
    {
        ...gear(source.playerCore.key, 238, 'Shield Bash', '2C', 'Bludgeoning'),
        ...price(0, 0, 0, 0),
        nameGear: "Удар щитом",
        traits: [],
        type: "melee",
        category: "martial",
        weigthL: 0,
        damage: "1d4",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "shield",
        description: "Использование щита для нанесения ударов."
    },
    {
        ...gear(source.playerCore.key, 239, 'Shield Boss', '2C', 'Bludgeoning'),
        ...price(0, 5, 0, 0),
        nameGear: "Умбон",
        traits: ["прикрепляемое"],
        type: "melee",
        category: "martial",
        weigthL: 0,
        damage: "1d6",
        typeDamage: "bludgeoning",
        rarity: "common",
        hands: 1,
        group: "shield",
        description: "Металлический выступ на щите, используемый для усиления ударов."
    },
    {
        ...gear(source.playerCore.key, 240, 'Shield Spikes', '2C', 'Piercing'),
        ...price(0, 5, 0, 0),
        nameGear: "Шипы для щита",
        traits: ["прикрепляемое"],
        type: "melee",
        category: "martial",
        weigthL: 0,
        damage: "1d6",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "shield",
        description: "Шипы, прикрепляемые к щиту для нанесения колющего урона."
    },



    ///другое

    {
        ...gear(source.GMCore.key, 1000, 'Зелье энергетического дыхания [Электричество, Большое] / Energy Breath Potion (Electricity, Greater)', '3000G', ''),
        ...price(0, 3000, 0, 0),
        nameGear: "Зелье энергетического дыхания [Электричество, Большое] / Energy Breath Potion (Electricity, Greater)",
        traits: ["consumable", "electricity", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[line|distance:30]{30-футовую линию} электричества, которая наносит @Damage[10d6[electricity]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:37|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1001, 'Зелье энергетического дыхания [Электричество, Среднее] / Energy Breath Potion (Electricity, Moderate)', '400G', ''),
        ...price(0, 400, 0, 0),
        nameGear: "Зелье энергетического дыхания [Электричество, Среднее] / Energy Breath Potion (Electricity, Moderate)",
        traits: ["consumable", "electricity", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[line|distance:30]{30-футовую линию} электричества, которая наносит @Damage[6d6[electricity]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:29|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1002, 'Скрипка из сумеречного дерева от легендарного мастера / Duskwood violin by a legend', '1000G', ''),
        ...price(0, 1000, 0, 0),
        nameGear: "Скрипка из сумеречного дерева от легендарного мастера / Duskwood violin by a legend",
        traits: [],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "",
        description: ``
    },

    {
        ...gear(source.GMCore.key, 1003, 'Зелье энергетического дыхания [Электричество, Малое] / Energy Breath Potion (Electricity, Lesser)', '70G', ''),
        ...price(0, 70, 0, 0),
        nameGear: "Зелье энергетического дыхания [Электричество, Малое] / Energy Breath Potion (Electricity, Lesser)",
        traits: ["consumable", "electricity", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[line|distance:30]{30-футовую линию} электричества, которая наносит @Damage[4d6[electricity]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:23|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1004, 'Корона из рассветного серебра с драгоценными камнями / Jeweled dawnsilver crown', '1000G', ''),
        ...price(0, 1000, 0, 0),
        nameGear: "Корона из рассветного серебра с драгоценными камнями / Jeweled dawnsilver crown",
        traits: [],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "",
        description: ``
    },

    {
        ...gear(source.GMCore.key, 1005, 'Легирующая сфера [Изысканная высококачественная] / Alloy Orb (Exquisite High-Grade)', '4500G', ''),
        ...price(0, 4500, 0, 0),
        nameGear: "Легирующая сфера [Изысканная высококачественная] / Alloy Orb (Exquisite High-Grade)",
        traits: ["consumable", "magical", "talisman"],
        category: "other",
        rarity: "uncommon",
        weight: 0.1,
        usage: "affixed-to-a-metal-weapon",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Concentrate]{концентрация})</p><hr /><p>Несмотря на твёрдость, эта металлическая сфера переливается яркими серебристыми и темными железными цветами, словно жидкая. При активации <em>легирующей сферы</em>, выберите адамантин, холодное железо или рассветное серебро. Присоединённое оружие функционирует как выбранный материал в течение 1 минуты, подавляя свой первоначальный материал. Эта сфера действует на оружие любого уровня.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.o6GSF420m6cdTkZo]</p>`
    },

    {
        ...gear(source.GMCore.key, 1006, 'Зелье энергетического дыхания [Кислота, Большое] / Energy Breath Potion (Acid, Greater)', '3000G', ''),
        ...price(0, 3000, 0, 0),
        nameGear: "Зелье энергетического дыхания [Кислота, Большое] / Energy Breath Potion (Acid, Greater)",
        traits: ["acid", "consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[line|distance:30]{30-футовую линию} кислоты, которая наносит @Damage[10d6[acid]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:37|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1007, 'Зелье энергетического дыхания [Кислота, Среднее] / Energy Breath Potion (Acid, Moderate)', '400G', ''),
        ...price(0, 400, 0, 0),
        nameGear: "Зелье энергетического дыхания [Кислота, Среднее] / Energy Breath Potion (Acid, Moderate)",
        traits: ["acid", "consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[line|distance:30]{30-футовую линию} кислоты, которая наносит @Damage[6d6[acid]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:29|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1008, 'Зелье энергетического дыхания [Кислота, Малое] / Energy Breath Potion (Acid, Lesser)', '70G', ''),
        ...price(0, 70, 0, 0),
        nameGear: "Зелье энергетического дыхания [Кислота, Малое] / Energy Breath Potion (Acid, Lesser)",
        traits: ["acid", "consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[line|distance:30]{30-футовую линию} кислоты, которая наносит @Damage[4d6[acid]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:23|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1009, 'Зелье энергетического дыхания [Холод, Большое] / Energy Breath Potion (Cold, Greater)', '3000G', ''),
        ...price(0, 3000, 0, 0),
        nameGear: "Зелье энергетического дыхания [Холод, Большое] / Energy Breath Potion (Cold, Greater)",
        traits: ["cold", "consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[cone|distance:15]{15-футовый конус} холода, который наносит @Damage[10d6[cold]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:37|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1010, 'Зелье энергетического дыхания [Холод, Среднее] / Energy Breath Potion (Cold, Moderate)', '400G', ''),
        ...price(0, 400, 0, 0),
        nameGear: "Зелье энергетического дыхания [Холод, Среднее] / Energy Breath Potion (Cold, Moderate)",
        traits: ["cold", "consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[cone|distance:15]{15-футовый конус} холода, который наносит @Damage[6d6[cold]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:29|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1011, 'Зелье энергетического дыхания [Огонь, Большое] / Energy Breath Potion (Fire, Greater)', '3000G', ''),
        ...price(0, 3000, 0, 0),
        nameGear: "Зелье энергетического дыхания [Огонь, Большое] / Energy Breath Potion (Fire, Greater)",
        traits: ["consumable", "fire", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[cone|distance:15]{15-футовый конус} огня, который наносит @Damage[10d6[fire]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:37|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1012, 'Зелье энергетического дыхания [Огонь, Среднее] / Energy Breath Potion (Fire, Moderate)', '400G', ''),
        ...price(0, 400, 0, 0),
        nameGear: "Зелье энергетического дыхания [Огонь, Среднее] / Energy Breath Potion (Fire, Moderate)",
        traits: ["consumable", "fire", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[cone|distance:15]{15-футовый конус} огня, который наносит @Damage[6d6[fire]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:29|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1013, 'Зелье энергетического дыхания [Звук, Большое] / Energy Breath Potion (Sonic, Greater)', '3000G', ''),
        ...price(0, 3000, 0, 0),
        nameGear: "Зелье энергетического дыхания [Звук, Большое] / Energy Breath Potion (Sonic, Greater)",
        traits: ["consumable", "magical", "potion", "sonic"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[cone|distance:15]{15-футовый конус} звука, который наносит @Damage[10d6[sonic]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[fortitude|dc:37|basic|options:area-effect]{Стойкости}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1014, 'Зелье энергетического дыхания [Звук, Среднее] / Energy Breath Potion (Sonic, Moderate)', '400G', ''),
        ...price(0, 400, 0, 0),
        nameGear: "Зелье энергетического дыхания [Звук, Среднее] / Energy Breath Potion (Sonic, Moderate)",
        traits: ["consumable", "magical", "potion", "sonic"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[cone|distance:15]{15-футовый конус} звука, который наносит @Damage[6d6[sonic]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[fortitude|dc:29|basic|options:area-effect]{Стойкости}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1015, 'Зелье энергетического дыхания [Холод, Малое] / Energy Breath Potion (Cold, Lesser)', '70G', ''),
        ...price(0, 70, 0, 0),
        nameGear: "Зелье энергетического дыхания [Холод, Малое] / Energy Breath Potion (Cold, Lesser)",
        traits: ["cold", "consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[cone|distance:15]{15-футовый конус} холода, который наносит @Damage[4d6[cold]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:23|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1016, 'Зелье энергетического дыхания [Огонь, Малое] / Energy Breath Potion (Fire, Lesser)', '70G', ''),
        ...price(0, 70, 0, 0),
        nameGear: "Зелье энергетического дыхания [Огонь, Малое] / Energy Breath Potion (Fire, Lesser)",
        traits: ["consumable", "fire", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[cone|distance:15]{15-футовый конус} огня, который наносит @Damage[4d6[fire]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[reflex|dc:23|basic|options:area-effect]{Рефлекса}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1017, 'Зелье энергетического дыхания [Звук, Малое] / Energy Breath Potion (Sonic, Lesser)', '70G', ''),
        ...price(0, 70, 0, 0),
        nameGear: "Зелье энергетического дыхания [Звук, Малое] / Energy Breath Potion (Sonic, Lesser)",
        traits: ["consumable", "magical", "potion", "sonic"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Полученное из энергии опасных заклинаний, <em>зелье энергетического дыхания</em> наделяет вас действием "Энергетическое дыхание" на 1 час после того, как вы его выпьете.</p><p><strong>Энергетическое дыхание:</strong><span class="action-glyph">1</span> Вы создаёте @Template[cone|distance:15]{15-футовый конус} звука, который наносит @Damage[4d6[sonic]|options:area-damage]. Каждое существо в области должно совершить простой спасбросок @Check[fortitude|dc:23|basic|options:area-effect]{Стойкости}.</p><p>После использования "Энергетического дыхания", вы не можете снова использовать его [[/gmr 1d4 #Перезарядка энергетического дыхания]]{1d4 раунда}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1018, 'Зелье сопротивления электричеству [Большое] / Potion of Electricity Resistance (Greater)', '850G', ''),
        ...price(0, 850, 0, 0),
        nameGear: "Зелье сопротивления электричеству [Большое] / Potion of Electricity Resistance (Greater)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 15 к электричеству.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.DbUEGIKxH6d1GgVw]</p>`
    },

    {
        ...gear(source.GMCore.key, 1019, 'Зелье сопротивления электричеству [Среднее] / Potion of Electricity Resistance (Moderate)', '180G', ''),
        ...price(0, 180, 0, 0),
        nameGear: "Зелье сопротивления электричеству [Среднее] / Potion of Electricity Resistance (Moderate)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 10 к электричеству.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.DbUEGIKxH6d1GgVw]</p>`
    },

    {
        ...gear(source.GMCore.key, 1020, 'Легирующая сфера [Изысканная стандартная] / Alloy Orb (Exquisite Standard-Grade)', '400G', ''),
        ...price(0, 400, 0, 0),
        nameGear: "Легирующая сфера [Изысканная стандартная] / Alloy Orb (Exquisite Standard-Grade)",
        traits: ["consumable", "magical", "talisman"],
        category: "other",
        rarity: "uncommon",
        weight: 0.1,
        usage: "affixed-to-a-metal-weapon",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Concentrate]{концентрация})</p><hr /><p>Несмотря на твёрдость, эта металлическая сфера переливается яркими серебристыми и темными железными цветами, словно жидкая. При активации <em>легирующей сферы</em>, выберите адамантин, холодное железо или рассветное серебро. Присоединённое оружие функционирует как выбранный материал в течение 1 минуты, подавляя свой первоначальный материал. Эта сфера действует на оружие 15-го уровня или ниже.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.BjF0eOao5UuOOKMP]</p>`
    },

    {
        ...gear(source.GMCore.key, 1021, 'Зелье сопротивления электричеству [Малое] / Potion of Electricity Resistance (Lesser)', '45G', ''),
        ...price(0, 45, 0, 0),
        nameGear: "Зелье сопротивления электричеству [Малое] / Potion of Electricity Resistance (Lesser)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 5 к электричеству.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.DbUEGIKxH6d1GgVw]</p>`
    },

    {
        ...gear(source.GMCore.key, 1022, 'Руна сопротивления энергии [Отличного] / Energy-Resistant (Greater)', '1650G', ''),
        ...price(0, 1650, 0, 0),
        nameGear: "Руна сопротивления энергии [Отличного] / Energy-Resistant (Greater)",
        traits: ["magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "etched-onto-armor",
        description: `<p>Эти символы выражают защитные силы со Стихийных планов. Вы получаете сопротивление 10 к кислоте, холоду, электричеству или огню. Ремесленник выбирает тип урона при создании руны. На комплекте доспеха могут быть выгравированы несколько <em>рун сопротивления энергии</em>; вместо того, чтобы использовать только самый сильный эффект, каждая из них должна давать сопротивление другому типу урона. Например, <em>нагрудник сопротивления кислоте и отличного сопротивления огню +2</em> будет давать вам сопротивление кислоте 5 и сопротивление огню 10.</p>`
    },

    {
        ...gear(source.GMCore.key, 1023, 'Легирующая сфера [Высококачественная] / Alloy Orb (High-Grade)', '1500G', ''),
        ...price(0, 1500, 0, 0),
        nameGear: "Легирующая сфера [Высококачественная] / Alloy Orb (High-Grade)",
        traits: ["consumable", "magical", "talisman"],
        category: "other",
        rarity: "common",
        weight: 0.1,
        usage: "affixed-to-a-metal-weapon",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Concentrate]{концентрация})</p><hr /><p>Несмотря на твёрдость, эта металлическая сфера переливается яркими серебристыми и темными железными цветами, словно жидкая. При активации <em>легирующей сферы</em>, выберите холодное железо или серебро. Присоединённое оружие функционирует как выбранный материал в течение 1 минуты, подавляя свой первоначальный материал. Эта сфера действует на оружие любого уровня.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.15qCI8sWaEwPkWiQ]</p>`
    },

    {
        ...gear(source.GMCore.key, 1024, 'Чешуйка драконьей черепахи [Отличная] / Dragon Turtle Scale (Greater)', '75G', ''),
        ...price(0, 75, 0, 0),
        nameGear: "Чешуйка драконьей черепахи [Отличная] / Dragon Turtle Scale (Greater)",
        traits: ["consumable", "magical", "talisman"],
        category: "talisman",
        rarity: "common",
        weight: 0,
        usage: "affixed-to-armor",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Concentrate]{концентрация})</p><p><strong>Требования:</strong> Вы обучены Атлетике</p><hr /><p>Эта мерцающая зеленая чешуйка обычно крепится к золотой застёжке или цепочке.</p><p>Когда вы активируете чешуйку, то на 1 минуту получаете Скорость плавания равную вашей наземной Скорости.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.4tepFOJLhZSelPoa]</p>`
    },

    {
        ...gear(source.GMCore.key, 1025, 'Зелье сопротивления кислоте [Большое] / Potion of Acid Resistance (Greater)', '850G', ''),
        ...price(0, 850, 0, 0),
        nameGear: "Зелье сопротивления кислоте [Большое] / Potion of Acid Resistance (Greater)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 15 к кислоте.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.k8Gt8zfPOhkYOn1A]</p>`
    },

    {
        ...gear(source.GMCore.key, 1026, 'Зелье сопротивления кислоте [Среднее] / Potion of Acid Resistance (Moderate)', '180G', ''),
        ...price(0, 180, 0, 0),
        nameGear: "Зелье сопротивления кислоте [Среднее] / Potion of Acid Resistance (Moderate)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 10 к кислоте.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.k8Gt8zfPOhkYOn1A]</p>`
    },

    {
        ...gear(source.GMCore.key, 1027, 'Руна стойкости доспеха [Превосходная] / Resilient (Major)', '49440G', ''),
        ...price(0, 49440, 0, 0),
        nameGear: "Руна стойкости доспеха [Превосходная] / Resilient (Major)",
        traits: ["magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "etched-onto-armor",
        description: `<p><em>Руны стойкости</em> наполняют доспех дополнительной защитной магией. Эта даёт носителю бонус предмета +3 к спасброскам.</p><p>Вы можете улучшать уже выгравированную <em>руну стойкости</em> на более сильную, используя стандартный процесс улучшения предметов и рун.</p>`
    },

    {
        ...gear(source.GMCore.key, 1028, 'Легирующая сфера [Низкокачественная] / Alloy Orb (Low-Grade)', '10G', ''),
        ...price(0, 10, 0, 0),
        nameGear: "Легирующая сфера [Низкокачественная] / Alloy Orb (Low-Grade)",
        traits: ["consumable", "magical", "talisman"],
        category: "other",
        rarity: "common",
        weight: 0.1,
        usage: "affixed-to-a-metal-weapon",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Concentrate]{концентрация})</p><hr /><p>Несмотря на твёрдость, эта металлическая сфера переливается яркими серебристыми и темными железными цветами, словно жидкая. При активации <em>легирующей сферы</em>, выберите холодное железо или серебро. Присоединённое оружие функционирует как выбранный материал в течение 1 минуты, подавляя свой первоначальный материал. Эта сфера действует только на оружие 8-го уровня или ниже.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.9MU9d8tmJg3thkSc]</p>`
    },

    {
        ...gear(source.GMCore.key, 1029, 'Кулон противодействия [Превосходный] / Countering Charm (Major)', '20000G', ''),
        ...price(0, 20000, 0, 0),
        nameGear: "Кулон противодействия [Превосходный] / Countering Charm (Major)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "uncommon",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Этот сверкающий кулон изготовлен из драгоценного камня со свинцовыми вкраплениями. Заклинатели могут сотворять заклинания в <em>кулоны противодействия</em>, которые инвестировали они готовое существо. Эффект заклинания не происходит, вместо этого сила заклинания сохраняется в кулоне, заменяя находящееся там до этого заклинание. Кулон может хранить только заклинания, сотворенные из слотов заклинания, а не чары и не заклинания фокусировки. Когда кулон инвестирован, инвестировавшее его существо знает, какое заклинание в нем заключено и автоматически его определяет при его сотворении.</p><hr /><p><strong>Активация—Противодействовать:</strong><span class="action-glyph">R</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Триггер:</strong> Вы являетесь целью или находитесь в области действия заклинания, заключённого в кулоне</p><p><strong>Требования:</strong> У вас есть свободная рука</p><p><strong>Эффект:</strong> Вы демонстрируете кулон и пытаетесь противодействовать спровоцировавшему заклинанию, используя ранг заклинания из кулона и модификатор противодействия [[/r 1d20+30 #Противодействие]]{+30}. Это расходует хранящееся в кулоне заклинание.</p>`
    },

    {
        ...gear(source.GMCore.key, 1030, 'Зелье сопротивления холоду [Большое] / Potion of Cold Resistance (Greater)', '850G', ''),
        ...price(0, 850, 0, 0),
        nameGear: "Зелье сопротивления холоду [Большое] / Potion of Cold Resistance (Greater)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 15 к холоду.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.Iw3CtHFpD3gGVjis]</p>`
    },

    {
        ...gear(source.GMCore.key, 1031, 'Зелье сопротивления холоду [Среднее] / Potion of Cold Resistance (Moderate)', '180G', ''),
        ...price(0, 180, 0, 0),
        nameGear: "Зелье сопротивления холоду [Среднее] / Potion of Cold Resistance (Moderate)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 10 к холоду.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.Iw3CtHFpD3gGVjis]</p>`
    },

    {
        ...gear(source.GMCore.key, 1032, 'Брелок сопротивления [Превосходный] / Charm of Resistance (Major)', '4400G', ''),
        ...price(0, 4400, 0, 0),
        nameGear: "Брелок сопротивления [Превосходный] / Charm of Resistance (Major)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "worn",
        description: `<p>Этот брелок, обычно носимый на поясе или на шее, дает вам сопротивление 15 к урону энергией одного типа: кислота, холод, электричество, огонь или звук. Каждый брелок создан, чтобы защищать от урона определенного типа энергии, и его внешний вид обычно каким-то образом воплощает этот вид энергии. Например, <em>брелок сопротивления холоду</em> может быть вырезан в форме йети, а <em>брелок сопротивления огню</em> сделан из вулканического стекла.</p>`
    },

    {
        ...gear(source.GMCore.key, 1033, 'Зелье сопротивления кислоте [Малое] / Potion of Acid Resistance (Lesser)', '45G', ''),
        ...price(0, 45, 0, 0),
        nameGear: "Зелье сопротивления кислоте [Малое] / Potion of Acid Resistance (Lesser)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 5 к кислоте.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.k8Gt8zfPOhkYOn1A]</p>`
    },

    {
        ...gear(source.GMCore.key, 1034, 'Зелье сопротивления звуку [Большое] / Potion of Sonic Resistance (Greater)', '850G', ''),
        ...price(0, 850, 0, 0),
        nameGear: "Зелье сопротивления звуку [Большое] / Potion of Sonic Resistance (Greater)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 15 к звуку.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.nBGodDOQTCWBXjNd]</p>`
    },

    {
        ...gear(source.GMCore.key, 1035, 'Зелье сопротивления звуку [Среднее] / Potion of Sonic Resistance (Moderate)', '180G', ''),
        ...price(0, 180, 0, 0),
        nameGear: "Зелье сопротивления звуку [Среднее] / Potion of Sonic Resistance (Moderate)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 10 к звуку.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.nBGodDOQTCWBXjNd]</p>`
    },

    {
        ...gear(source.GMCore.key, 1036, 'Наручи отклонения стрел [Отличные] / Bracers of Missile Deflection (Greater)', '650G', ''),
        ...price(0, 650, 0, 0),
        nameGear: "Наручи отклонения стрел [Отличные] / Bracers of Missile Deflection (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "wornbracers",
        description: `<p>Эти наручи сделаны из пластин прочного рассветного серебра и блестят, как летнее солнце.</p><hr /><p><strong>Активация:</strong><span class="action-glyph">R</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Частота:</strong> Раз в 10 минут</p><p><strong>Триггер:</strong> Атака дистанционным оружием попадает по вам, но не критически</p><p><strong>Требования:</strong> Вы знаете об атаке и не @Condition[Off-Guard]{застигнуты врасплох}</p><p><strong>Эффект:</strong> Браслеты уводят стрелу с ее курса. Вы получаете бонус обстоятельства +2 к КБ против спровоцировавшей атаки. Если из-за этого результат атаки будет неудачным, то она промахивается по вам.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.PeiuJ951kkBPTCSM]</p>`
    },

    {
        ...gear(source.GMCore.key, 1037, 'Зелье сопротивления холоду [Малое] / Potion of Cold Resistance (Lesser)', '45G', ''),
        ...price(0, 45, 0, 0),
        nameGear: "Зелье сопротивления холоду [Малое] / Potion of Cold Resistance (Lesser)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 5 к холоду.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.Iw3CtHFpD3gGVjis]</p>`
    },

    {
        ...gear(source.GMCore.key, 1038, 'Зелье сопротивления огню [Большое] / Potion of Fire Resistance (Greater)', '850G', ''),
        ...price(0, 850, 0, 0),
        nameGear: "Зелье сопротивления огню [Большое] / Potion of Fire Resistance (Greater)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 15 к огню.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.34gtdURRTZMS5bDK]</p>`
    },

    {
        ...gear(source.GMCore.key, 1039, 'Зелье сопротивления звуку [Малое] / Potion of Sonic Resistance (Lesser)', '45G', ''),
        ...price(0, 45, 0, 0),
        nameGear: "Зелье сопротивления звуку [Малое] / Potion of Sonic Resistance (Lesser)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 5 к звуку.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.nBGodDOQTCWBXjNd]</p>`
    },

    {
        ...gear(source.GMCore.key, 1040, 'Руна стойкости доспеха [Отличная] / Resilient (Greater)', '3440G', ''),
        ...price(0, 3440, 0, 0),
        nameGear: "Руна стойкости доспеха [Отличная] / Resilient (Greater)",
        traits: ["magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "etched-onto-armor",
        description: `<p><em>Руны стойкости</em> наполняют доспех дополнительной защитной магией. Эта даёт носителю бонус предмета +2 к спасброскам.</p><p>Вы можете улучшать уже выгравированную <em>руну стойкости</em> на более сильную, используя стандартный процесс улучшения предметов и рун.</p>`
    },

    {
        ...gear(source.GMCore.key, 1041, 'Нарукавники атлетизма [Отличные] / Armbands of Athleticism (Greater)', '13000G', ''),
        ...price(0, 13000, 0, 0),
        nameGear: "Нарукавники атлетизма [Отличные] / Armbands of Athleticism (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "wornarmbands",
        description: `<p>Благодаря умелой работе с шилом на этих слоистых кожаных браслетах запечатлены образы мускулистого тяжелоатлета, которые повышают выносливость и навыки при выполнении атлетических упражнений.</p><p>Когда нарукавники прикреплены к плечам, они дают бонус предмета +3 к проверкам Атлетики.</p><p>Кроме того, каждый раз, когда вы используете действие, чтобы @UUID[Compendium.pf2e.actionspf2e.Item.pprgrYQ1QnIDGZiy]{Карабкаться} или @UUID[Compendium.pf2e.actionspf2e.Item.c8TGiZ48ygoSPofx]{Плыть} и успешно совершаете проверку Атлетики, добавьте бонус предмета +10 футов к расстоянию, которое преодолеваете.</p>`
    },

    {
        ...gear(source.GMCore.key, 1042, 'Хоботок кровоискателя [Отличный] / Bloodseeker Beak (Greater)', '100G', ''),
        ...price(0, 100, 0, 0),
        nameGear: "Хоботок кровоискателя [Отличный] / Bloodseeker Beak (Greater)",
        traits: ["consumable", "magical", "talisman"],
        category: "talisman",
        rarity: "common",
        weight: 0.1,
        usage: "affixed-to-weapon",
        description: `<p><strong>Активация:</strong><span class="action-glyph">F</span> (@Trait[Concentrate]{концентрация})</p><p><strong>Триггер:</strong> Вы попали по @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Застигнутому врасплох} существу с помощью прикрепленного оружия</p><hr /><p>Этот длинный полый хоботок собирают с небезызвестного зверя кровоискателя, и с него капает тонкая струйка крови.</p><p>Когда вы активируете хоботок, вы наносите дополнительные 2d4 точного урона при броске на урон. Если вы наносите урон от @UUID[Compendium.pf2e.classfeatures.Item.j1JE61quDxdge4mg]{Внезапной атаки}, то существо так же получает @Damage[2d4[bleed]]{2d4 урона кровотечением}.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.5XdkHIUgc6psBxQq]</p>`
    },

    {
        ...gear(source.GMCore.key, 1043, 'Кулон противодействия [Отличный] / Countering Charm (Greater)', '5500G', ''),
        ...price(0, 5500, 0, 0),
        nameGear: "Кулон противодействия [Отличный] / Countering Charm (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "uncommon",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Этот сверкающий кулон изготовлен из драгоценного камня со свинцовыми вкраплениями. Заклинатели могут сотворять заклинания в <em>кулоны противодействия</em>, которые инвестировали они готовое существо. Эффект заклинания не происходит, вместо этого сила заклинания сохраняется в кулоне, заменяя находящееся там до этого заклинание. Кулон может хранить только заклинания, сотворенные из слотов заклинания, а не чары и не заклинания фокусировки. Когда кулон инвестирован, инвестировавшее его существо знает, какое заклинание в нем заключено и автоматически его определяет при его сотворении.</p><hr /><p><strong>Активация—Противодействовать:</strong><span class="action-glyph">R</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Триггер:</strong> Вы являетесь целью или находитесь в области действия заклинания, заключённого в кулоне</p><p><strong>Требования:</strong> У вас есть свободная рука</p><p><strong>Эффект:</strong> Вы демонстрируете кулон и пытаетесь противодействовать спровоцировавшему заклинанию, используя ранг заклинания из кулона и модификатор противодействия [[/r 1d20+25 #Противодействие]]{+25}. Это расходует хранящееся в кулоне заклинание.</p>`
    },

    {
        ...gear(source.GMCore.key, 1044, 'Эликсир ночного зрения [Большой] / Darkvision Elixir (Greater)', '90G', ''),
        ...price(0, 90, 0, 0),
        nameGear: "Эликсир ночного зрения [Большой] / Darkvision Elixir (Greater)",
        traits: ["alchemical", "consumable", "elixir"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>После того, как вы выпьете этот эликсир, ваше зрение в темноте становится острее. Вы получаете ночное зрение на 24 часа.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.7vCenP9j6FuHRv5C]</p>`
    },

    {
        ...gear(source.GMCore.key, 1045, 'Эликсир ночного зрения [Средний] / Darkvision Elixir (Moderate)', '11G', ''),
        ...price(0, 11, 0, 0),
        nameGear: "Эликсир ночного зрения [Средний] / Darkvision Elixir (Moderate)",
        traits: ["alchemical", "consumable", "elixir"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>После того, как вы выпьете этот эликсир, ваше зрение в темноте становится острее. Вы получаете ночное зрение на 1 час.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.bcxVvIbuZWOvsKcA]</p>`
    },

    {
        ...gear(source.GMCore.key, 1046, 'Сумеречное дерево [Пиломатериал] / Duskwood Lumber', '5000G', ''),
        ...price(0, 5000, 0, 0),
        nameGear: "Сумеречное дерево [Пиломатериал] / Duskwood Lumber",
        traits: ["precious"],
        category: "misc",
        rarity: "uncommon",
        weight: 1,
        usage: "held-in-one-hand",
        description: `<p>Сумеречное дерево это очень легкая древесина, встречающаяся главным образом в старых лесах южно-центрального Авистана; она темная, как эбеновое дерево, но имеет легкий пурпурный оттенок. Масса предмета из сумеречного дерева снижена на 1 (или до лёгкой Массы, если его нормальная Масса равна 1, не влияя на предмет, который уже имеет лёгкую Массу). Цена предмета сделанного из сумеречного дерева зависит от нормальной Массы предмета, а не его Массы, сниженной из-за применения сумеречного дерева, но снизьте Массу прежде чем делать какие-либо дальнейшие корректировки размера предмета.</p><h2>Предметы из сумеречного дерева</h2><table class="pf2e remaster"><thead><tr><th>Предметы из сумеречного дерева</th><th>Твёрдость</th><th>ОЗ</th><th>ПП</th></tr></thead><tbody><tr><td><strong>Тонкие предметы</strong></td><td></td><td></td><td></td></tr><tr><td>Стандартный</td><td>5</td><td>20</td><td>10</td></tr><tr><td>Высококачественный</td><td>8</td><td>32</td><td>16</td></tr><tr><td><strong>Предметы</strong></td><td></td><td></td><td></td></tr><tr><td>Стандартный</td><td>7</td><td>28</td><td>14</td></tr><tr><td>Высококачественный</td><td>10</td><td>40</td><td>20</td></tr><tr><td><strong>Строения</strong></td><td></td><td></td><td></td></tr><tr><td>Стандартный</td><td>14</td><td>56</td><td>28</td></tr><tr><td>Высококачественный</td><td>20</td><td>80</td><td>40</td></tr></tbody></table>`
    },

    {
        ...gear(source.GMCore.key, 1047, 'Эликсир орлиного глаза [Большой] / Eagle Eye Elixir (Greater)', '200G', ''),
        ...price(0, 200, 0, 0),
        nameGear: "Эликсир орлиного глаза [Большой] / Eagle Eye Elixir (Greater)",
        traits: ["alchemical", "consumable", "elixir"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпив этот эликсир, вы замечаете тонкие визуальные детали. В течение следующего часа вы получаете бонус предмета +3 к проверкам Восприятия или +4 при попытке поиска скрытых дверей и ловушек.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.VOSQ77DV4BnAkP7m]</p>`
    },

    {
        ...gear(source.GMCore.key, 1048, 'Эликсир орлиного глаза [Сильный] / Eagle Eye Elixir (Major)', '2000G', ''),
        ...price(0, 2000, 0, 0),
        nameGear: "Эликсир орлиного глаза [Сильный] / Eagle Eye Elixir (Major)",
        traits: ["alchemical", "consumable", "elixir"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпив этот эликсир, вы замечаете тонкие визуальные детали. В течение следующего часа вы получаете бонус предмета +3 к проверкам Восприятия или +4 при попытке поиска скрытых дверей и ловушек.</p><p>Каждый раз, когда вы проходите в 10 футах от скрытой двери или ловушки, Мастер автоматически бросает за вас тайную проверку поиска.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.VOSQ77DV4BnAkP7m]</p>`
    },

    {
        ...gear(source.GMCore.key, 1049, 'Эликсир орлиного глаза [Средний] / Eagle Eye Elixir (Moderate)', '27G', ''),
        ...price(0, 27, 0, 0),
        nameGear: "Эликсир орлиного глаза [Средний] / Eagle Eye Elixir (Moderate)",
        traits: ["alchemical", "consumable", "elixir"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпив этот эликсир, вы замечаете тонкие визуальные детали. В течение следующего часа вы получаете бонус предмета +2 к проверкам Восприятия или +3 при попытке поиска скрытых дверей и ловушек.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.VOSQ77DV4BnAkP7m]</p>`
    },

    {
        ...gear(source.GMCore.key, 1050, 'Вечное извержение Утёса Дроскара / Eternal Eruption of Droskar\'s Crag', '3000G', ''),
        ...price(0, 3000, 0, 0),
        nameGear: "Вечное извержение Утёса Дроскара / Eternal Eruption of Droskar's Crag",
        traits: ["fire", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Напоминающее <em>застывшую лаву</em>, <em>вечное извержение</em> создано с помощью того же типа магии времени, но построено таким образом, чтобы зацикливаться во времени, реформируя себя после использования. Чтобы определить разницу между ними, нужно внимательно присмотреться и увидеть слабый, повторяющийся узор из красных рун.</p><hr /><p><strong>Активация—Лавовая бомба:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие}, @Trait[Concentrate]{концентрация})</p><p><strong>Эффект:</strong> Вы бросаете <em>вечное извержение</em> с эффектом @UUID[Compendium.pf2e.equipment-srd.Item.YS7LJSvooG7mfwH1]{Застывшей лавы Утёса Дроскара}. После [[/gmr 2d4 #часы]]{2d4 часов}, <em>вечное извержение</em> восстанавливается в носимом вами контейнере, обычно в том, в котором вы хранили его последний раз.</p><p><em>Вечное извержение Утёса Дроскара</em> наносит @Damage[13d6[fire]|options:area-damage] с простым спасброском @Check[reflex|dc:32|basic|options:area-effect]{Рефлекса}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1051, 'Взрывающаяся амуниция [Отличная] / Explosive Ammunition (Greater)', '520G', ''),
        ...price(0, 520, 0, 0),
        nameGear: "Взрывающаяся амуниция [Отличная] / Explosive Ammunition (Greater)",
        traits: ["consumable", "fire", "magical"],
        category: "ammo",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Амуниция:</strong> любая</p><p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Эта амуниция покрыта чёрной сажей. Когда активированная <em>отличная взрывающаяся амуниция</em> попадает в цель, то взрывается @Template[burst|distance:10]{10-футовым взрывом}, нанося @Damage[10d6[fire]|options:area-damage] каждому существу в области (включая цель). Каждое существо должно совершить простой спасбросок @Check[reflex|dc:30|basic|options:area-effect]{Рефлекса}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1052, 'Эликсир туманной формы [Большой] / Mistform Elixir (Greater)', '180G', ''),
        ...price(0, 180, 0, 0),
        nameGear: "Эликсир туманной формы [Большой] / Mistform Elixir (Greater)",
        traits: ["alchemical", "consumable", "elixir", "illusion", "visual"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Слабый туман исходит от вашей кожи, давая вам в течение указанного времени состояние @UUID[Compendium.pf2e.conditionitems.Item.DmAIPqOBomZ7H95W]{Скрытый} на 5 минут.</p><p>Как обычно, будучи @Condition[Concealed]{скрытым} когда ваша позиция всё ещё очевидна, вы не можете использовать его, чтобы @UUID[Compendium.pf2e.actionspf2e.Item.XMcnh4cSI32tljXa]{Спрятаться} или @UUID[Compendium.pf2e.actionspf2e.Item.VMozDqMMuK5kpoX4]{Красться}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1053, 'Эликсир туманной формы [Средний] / Mistform Elixir (Moderate)', '56G', ''),
        ...price(0, 56, 0, 0),
        nameGear: "Эликсир туманной формы [Средний] / Mistform Elixir (Moderate)",
        traits: ["alchemical", "consumable", "elixir", "illusion", "visual"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Слабый туман исходит от вашей кожи, давая вам в течение указанного времени состояние @UUID[Compendium.pf2e.conditionitems.Item.DmAIPqOBomZ7H95W]{Скрытый} на 1 минуту.</p><p>Как обычно, будучи @Condition[Concealed]{скрытым} когда ваша позиция всё ещё очевидна, вы не можете использовать его, чтобы @UUID[Compendium.pf2e.actionspf2e.Item.XMcnh4cSI32tljXa]{Спрятаться} или @UUID[Compendium.pf2e.actionspf2e.Item.VMozDqMMuK5kpoX4]{Красться}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1054, 'Обсидиановые очки [Превосходные] / Obsidian Goggles (Major)', '20000G', ''),
        ...price(0, 20000, 0, 0),
        nameGear: "Обсидиановые очки [Превосходные] / Obsidian Goggles (Major)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "worneyepiece",
        description: `<p>Благодаря гладким чёрным линзам этих очков всё вокруг кажется более ярко освещенным. Нося эти очки, вы получаете бонус предмета +3 к проверкам Восприятия, использующим зрение.</p><hr /><p><strong>Активация—Ночное зрение:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Частота:</strong> Сколько угодно раз в день</p><p><strong>Эффект:</strong> Подстраивая свои очки, вы получаете <em>сильное ночное зрение</em> пока не деактивируете его действием @UUID[Compendium.pf2e.actionspf2e.Item.pvQ5rY2zrtPI614F] или не перестанете инвестировать предмет, в зависимости от того, что произойдёт раньше.</p>`
    },

    {
        ...gear(source.GMCore.key, 1055, 'Зелье сопротивления огню [Малое] / Potion of Fire Resistance (Lesser)', '45G', ''),
        ...price(0, 45, 0, 0),
        nameGear: "Зелье сопротивления огню [Малое] / Potion of Fire Resistance (Lesser)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья даёт на 1 час сопротивление 5 к огню.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.34gtdURRTZMS5bDK]</p>`
    },

    {
        ...gear(source.GMCore.key, 1056, 'Ремень извлечения [Превосходный] / Retrieval Belt (Major)', '2500G', ''),
        ...price(0, 2500, 0, 0),
        nameGear: "Ремень извлечения [Превосходный] / Retrieval Belt (Major)",
        traits: ["extradimensional", "invested", "magical"],
        category: "misc",
        rarity: "uncommon",
        weight: 0,
        usage: "wornbelt",
        description: `<p>Этот пояс покрыт маленькими подсумками, которые застёгиваются на пуговицы из тщательно вырезанного камня. Пояс привязан к межпространственному карману, в котором может храниться до десяти предметов Массой 1 или менее. Любой, кто держит пояс, может ощущать его содержимое, но хранить или извлекать предметы могут только те, кто инвестировал пояс. Во многих случаях пояс находят с уже находящимся в нем предметом.</p><hr /><p><strong>Активация—Убрать предмет:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Требования:</strong> В ремне есть место для предмета</p><p><strong>Эффект:</strong> Один предмет, который вы держите, Массой 1 или менее исчезает в межпространственном кармане ремня.</p><hr /><p><strong>Активация—Достать предмет:</strong><span class="action-glyph">F</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Требования:</strong> В ремне хранится предмет и у вас есть свободная рука</p><p><strong>Эффект:</strong> Хранящийся в ремне предмет появляется в вашей руке. Активации "Убрать предмет" и "Достать предмет" нельзя использовать в течение 1 минуты.</p>`
    },

    {
        ...gear(source.GMCore.key, 1057, 'Курильница откровения [Отличная] / Thurible of Revelation (Greater)', '19000G', ''),
        ...price(0, 19000, 0, 0),
        nameGear: "Курильница откровения [Отличная] / Thurible of Revelation (Greater)",
        traits: ["divine"],
        category: "misc",
        rarity: "common",
        weight: 1,
        usage: "held-in-one-hand",
        description: `<p>Это медное кадило, которое болтается на длинной цепочке. Большинство <em>курильниц откровения</em> украшены кружащимся Эмпирейскими текстами, хотя некоторые из них сделаны из железа и содержат Дьявольские или Хтонические тексты.</p><hr /><p><strong>Активация—Сжечь благовония:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Стоимость:</strong> благовония стоимостью хотя бы 5 зм</p><p><strong>Эффект:</strong> Вы зажигаете благовония внутри кадила и они горят 1 час. В течение этого времени, пока вы держите курильницу, вы получаете бонус предмета +3 к проверкам Религии и любые критические провалы при @UUID[Compendium.pf2e.actionspf2e.Item.d9gbpiQjChYDYA2L]{Расшифровке текста} религиозной природы становятся просто провалами.</p><p>Раз в день, когда вы активируете курильницу, то можете увеличить её откровения. Во время активации, с помощью действия @UUID[Compendium.pf2e.actionspf2e.Item.pvQ5rY2zrtPI614F]{Взаимодействовать} вы можете держать курильницу на уровне глаз, чтобы, смотря через дым, получить эффекты @UUID[Compendium.pf2e.spells-srd.Item.jwK43yKsHTkJQvQ9] и @UUID[Compendium.pf2e.spells-srd.Item.uqlxMQQeSGWEVjki] на 1 раунд.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.QapoFh0tbUgMwSIB]</p>`
    },

    {
        ...gear(source.GMCore.key, 1058, 'Эликсир бомбометателя [Большой] / Bomber\'s Eye Elixir(Greater)', '700G', ''),
        ...price(0, 700, 0, 0),
        nameGear: "Эликсир бомбометателя [Большой] / Bomber's Eye Elixir (Greater)",
        traits: ["alchemical", "consumable", "elixir"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Эта настойка позволяет вам точно заострить внимание на своих врагов. На следующие 5 минут, ваши @UUID[Compendium.pf2e.actionspf2e.Item.VjxZFuUXrCU94MWR]{Удары} алхимическими бомбами снижают бонус обстоятельства к КБ, получаемый врагами от укрытия на 2.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.HmpYVsyiCq8XDlop]</p>`
    },

    {
        ...gear(source.GMCore.key, 1059, 'Амулет защиты жизненной энергии / Channel Protection Amulet', '56G', ''),
        ...price(0, 56, 0, 0),
        nameGear: "Амулет защиты жизненной энергии / Channel Protection Amulet",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "uncommon",
        weight: 0,
        usage: "worn",
        description: `<p>Этот самородок полированного тектита заключен в клетку из плетеной проволоки и висит на шелковом шнурке. Когда вы носите этот амулет, то получаете сопротивление 5 к урону от заклинаний @UUID[Compendium.pf2e.spells-srd.Item.wdA52JJnsuQWeyqz], если вы живой, или к урону от заклинаний @UUID[Compendium.pf2e.spells-srd.Item.rfZpqmj0AIIdkVIs], если вы нежить.</p>`
    },

    {
        ...gear(source.GMCore.key, 1060, 'Брелок сопротивления [Отличный] / Charm of Resistance (Greater)', '975G', ''),
        ...price(0, 975, 0, 0),
        nameGear: "Брелок сопротивления [Отличный] / Charm of Resistance (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "worn",
        description: `<p>Этот брелок, обычно носимый на поясе или на шее, дает вам сопротивление 10 к урону энергией одного типа: кислота, холод, электричество, огонь или звук. Каждый брелок создан, чтобы защищать от урона определенного типа энергии, и его внешний вид обычно каким-то образом воплощает этот вид энергии. Например, <em>брелок сопротивления холоду</em> может быть вырезан в форме йети, а <em>брелок сопротивления огню</em> сделан из вулканического стекла.</p>`
    },

    {
        ...gear(source.GMCore.key, 1061, 'Хрустальный шар [Лунный камень] / Crystal Ball (Moonstone)', '7500G', ''),
        ...price(0, 7500, 0, 0),
        nameGear: "Хрустальный шар [Лунный камень] / Crystal Ball (Moonstone)",
        traits: ["magical", "scrying"],
        category: "misc",
        rarity: "uncommon",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта полированная хрустальная сфера усиливает магию видения. Любая визуальная информация, полученная через заклинание с признаком @Trait[Scrying]{видение}, которое было сотворено <em>хрустальным шаром</em>, появляется внутри сферы, а любая слуховая информация звучит с поверхности сферы. Когда вы, держа сферу, "Сотворяете заклинание" с признаком @Trait[Scrying]{видение} любым другим способом, то можете таким же образом перенаправить любую получаемую информацию, позволяя другим видеть или слышать цель.</p><hr /><p><strong>Активация—Ясновидение:</strong> 1 минута (@Trait[Manipulate]{воздействие}, @Trait[Concentrate]{концентрация})</p><p><strong>Частота:</strong> Раз в час</p><p><strong>Эффект:</strong><em>Хрустальный шар</em> сотворяет @UUID[Compendium.pf2e.spells-srd.Item.zvKWclOZ7A53DObE] с вашими требованиями.</p><hr /><p><strong>Активация—Видение:</strong> 10 минут (@Trait[Manipulate]{воздействие}, @Trait[Concentrate]{концентрация})</p><p><strong>Частота:</strong> Дважды в день</p><p><strong>Эффект:</strong><em>Хрустальный шар</em> сотворяет @UUID[Compendium.pf2e.spells-srd.Item.r784cIz17eWujtQj] @Check[will|dc:37|name:Видение] с вашими требованиями, и даёт вам преимущества @UUID[Compendium.pf2e.spells-srd.Item.KHnhPHL4x1AQHfbC]{Чтения разума} на цель, с тем же КС спасброска.</p>`
    },

    {
        ...gear(source.GMCore.key, 1062, 'Символ конфликта [Превосходный] / Symbol of Conflict (Major)', '19000G', ''),
        ...price(0, 19000, 0, 0),
        nameGear: "Символ конфликта [Превосходный] / Symbol of Conflict (Major)",
        traits: ["divine", "invested"],
        category: "misc",
        rarity: "uncommon",
        weight: 0,
        usage: "worn",
        description: `<p>Это потускневшее ожерелье может быть инвестировано только @Trait[Holy]{святыми} или @Trait[Unholy]{нечестивыми}. Когда вы инвестируете его, оно превращается в религиозный символ вашего божества или в личный символ, если у вас нет божества. Вы получаете бонус предмета +3 к Религии и бонус обстоятельства +1 к спасброскам от @Trait[Holy]{святых} и @Trait[Unholy]{нечестивых} эффектов.</p><hr /><p><strong>Активация—Присутствие:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие}, @Trait[Concentrate]{концентрация})</p><p><strong>Частота:</strong> Раз в день</p><p><strong>Эффект:</strong> Символ сотворяет @UUID[Compendium.pf2e.spells-srd.Item.7ZinJNzxq0XF0oMx] @UUID[Compendium.pf2e.spells-srd.Item.XSujb7EsSwKl19Uu], @UUID[Compendium.pf2e.spells-srd.Item.hVU9msO9yGkxKZ3J] или @UUID[Compendium.pf2e.spells-srd.Item.SUKaxVZW2TlM8lu0] 6-го ранга. Добавьте @UUID[Compendium.pf2e.spells-srd.Item.lTDixrrNKaCvLKwX] 6-го ранга, если вы @Trait[Holy]{святой}, или @UUID[Compendium.pf2e.spells-srd.Item.29ytKctjg7qSW2ff], если вы @Trait[Unholy]{нечестивый}.</p><p>КС противодействия этим эффектам 38, модификатор противодействия [[/r 1d20+28]]{+28}.</p><hr /><p><strong>Требования для создания:</strong> Вы должны быть @Trait[Holy]{святым} или @Trait[Unholy]{нечестивым}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1063, 'Курильница откровения [Средняя] / Thurible of Revelation (Moderate)', '900G', ''),
        ...price(0, 900, 0, 0),
        nameGear: "Курильница откровения [Средняя] / Thurible of Revelation (Moderate)",
        traits: ["divine"],
        category: "misc",
        rarity: "common",
        weight: 1,
        usage: "held-in-one-hand",
        description: `<p>Это медное кадило, которое болтается на длинной цепочке. Большинство <em>курильниц откровения</em> украшены кружащимся Эмпирейскими текстами, хотя некоторые из них сделаны из железа и содержат Дьявольские или Хтонические тексты.</p><hr /><p><strong>Активация—Сжечь благовония:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Стоимость:</strong> благовония стоимостью хотя бы 5 зм</p><p><strong>Эффект:</strong> Вы зажигаете благовония внутри кадила и они горят 1 час. В течение этого времени, пока вы держите курильницу, вы получаете бонус предмета +2 к проверкам Религии и любые критические провалы при @UUID[Compendium.pf2e.actionspf2e.Item.d9gbpiQjChYDYA2L]{Расшифровке текста} религиозной природы становятся просто провалами.</p><p>Раз в день, когда вы активируете курильницу, то можете увеличить её откровения. Во время активации, с помощью действия @UUID[Compendium.pf2e.actionspf2e.Item.pvQ5rY2zrtPI614F]{Взаимодействовать} вы можете держать курильницу на уровне глаз, чтобы, смотря через дым, получить эффекты @UUID[Compendium.pf2e.spells-srd.Item.jwK43yKsHTkJQvQ9] на 1 раунд.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.UlalLihKzDxcOdXL]</p>`
    },

    {
        ...gear(source.GMCore.key, 1064, 'Кольцо чревовещателя [Отличное] / Ventriloquist\'s Ring(Greater)', '670G', ''),
        ...price(0, 670, 0, 0),
        nameGear: "Кольцо чревовещателя [Отличное] / Ventriloquist's Ring (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "worn",
        description: `<p>Это элегантное медное кольцо имеет миниатюрные изображения певчих птиц, выгравированные по его окружности. Вы получаете бонус предмета +2 к проверкам Обмана.</p><hr /><p><strong>Активация—Чревовещать:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Частота:</strong> Сколько угодно раз в день</p><p><strong>Эффект:</strong> Вращение кольца вокруг пальца позволяет вам магически передавать ваш голос с эффектами заклинания @UUID[Compendium.pf2e.spells-srd.Item.yV7Ouzaoe7DHLESI] 2-го ранга (@Check[perception|dc:27]).</p>`
    },

    {
        ...gear(source.GMCore.key, 1065, 'Волшебная палочка бури осколков [1-го ранга] / Wand of Shardstorm (1st-Rank Spell)', '160G', ''),
        ...price(0, 160, 0, 0),
        nameGear: "Волшебная палочка бури осколков [1-го ранга] / Wand of Shardstorm (1st-Rank Spell)",
        traits: ["force", "magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта палочка имеет резную голову дракона на вершине и полированную металлическую сферу посередине.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]{Сотворение заклинания}</p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете @UUID[Compendium.pf2e.spells-srd.Item.gKKqvLohtrSJj3BM] 1-го ранга.</p><p>После сотворения заклинания, в начале каждого вашего хода из палочки выпускается дополнительный осколок или осколки, как если бы вы сотворяли версию <em>шквала силы</em> в 1 действие. Каждый раз выбирайте цели. Это длится в течение 1 минуты, пока вы больше не владеете палочкой или пока снова не попытаетесь активировать палочку.</p><p><strong>Требования для создания:</strong> Сотворение заклинания <em>шквала силы</em> соответствующего ранга.</p>`
    },

    {
        ...gear(source.GMCore.key, 1066, 'Волшебная палочка бури осколков [3-го ранга] / Wand of Shardstorm (3rd-Rank Spell)', '700G', ''),
        ...price(0, 700, 0, 0),
        nameGear: "Волшебная палочка бури осколков [3-го ранга] / Wand of Shardstorm (3rd-Rank Spell)",
        traits: ["force", "magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта палочка имеет резную голову дракона на вершине и полированную металлическую сферу посередине.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]{Сотворение заклинания}</p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете @UUID[Compendium.pf2e.spells-srd.Item.gKKqvLohtrSJj3BM] 3-го ранга.</p><p>После сотворения заклинания, в начале каждого вашего хода из палочки выпускается дополнительный осколок или осколки, как если бы вы сотворяли версию <em>шквала силы</em> в 1 действие. Каждый раз выбирайте цели. Это длится в течение 1 минуты, пока вы больше не владеете палочкой или пока снова не попытаетесь активировать палочку.</p><p><strong>Требования для создания:</strong> Сотворение заклинания <em>шквала силы</em> соответствующего ранга.</p>`
    },

    {
        ...gear(source.GMCore.key, 1067, 'Волшебная палочка бури осколков [5-го ранга] / Wand of Shardstorm (5th-Rank Spell)', '3000G', ''),
        ...price(0, 3000, 0, 0),
        nameGear: "Волшебная палочка бури осколков [5-го ранга] / Wand of Shardstorm (5th-Rank Spell)",
        traits: ["force", "magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта палочка имеет резную голову дракона на вершине и полированную металлическую сферу посередине.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]{Сотворение заклинания}</p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете @UUID[Compendium.pf2e.spells-srd.Item.gKKqvLohtrSJj3BM] 5-го ранга.</p><p>После сотворения заклинания, в начале каждого вашего хода из палочки выпускается дополнительный осколок или осколки, как если бы вы сотворяли версию <em>шквала силы</em> в 1 действие. Каждый раз выбирайте цели. Это длится в течение 1 минуты, пока вы больше не владеете палочкой или пока снова не попытаетесь активировать палочку.</p><p><strong>Требования для создания:</strong> Сотворение заклинания <em>шквала силы</em> соответствующего ранга.</p>`
    },

    {
        ...gear(source.GMCore.key, 1068, 'Волшебная палочка бури осколков [7-го ранга] / Wand of Shardstorm (7th-Rank Spell)', '15000G', ''),
        ...price(0, 15000, 0, 0),
        nameGear: "Волшебная палочка бури осколков [7-го ранга] / Wand of Shardstorm (7th-Rank Spell)",
        traits: ["force", "magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта палочка имеет резную голову дракона на вершине и полированную металлическую сферу посередине.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]{Сотворение заклинания}</p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете @UUID[Compendium.pf2e.spells-srd.Item.gKKqvLohtrSJj3BM] 7-го ранга.</p><p>После сотворения заклинания, в начале каждого вашего хода из палочки выпускается дополнительный осколок или осколки, как если бы вы сотворяли версию <em>шквала силы</em> в 1 действие. Каждый раз выбирайте цели. Это длится в течение 1 минуты, пока вы больше не владеете палочкой или пока снова не попытаетесь активировать палочку.</p><p><strong>Требования для создания:</strong> Сотворение заклинания <em>шквала силы</em> соответствующего ранга.</p>`
    },

    {
        ...gear(source.GMCore.key, 1069, 'Камень эонов [Израсходованный] / Aeon Stone (Consumed)', '9G', ''),
        ...price(0, 9, 0, 0),
        nameGear: "Камень эонов [Израсходованный] / Aeon Stone (Consumed)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "uncommon",
        weight: 0,
        usage: "worn",
        description: `<p>На протяжении тысячелетий эти загадочные, искусно ограненные драгоценные камни хранили мистики и фанатики, надеясь разгадать их секреты. Несмотря на огромное количество форм и функций, эти камни якобы являются фрагментами кристаллических инструментов, использовавшихся потусторонними сущностями для создания Вселенной в первородные времена.</p><p>Когда вы инвестируете один из этих кристаллов точной формы, камень вращается вокруг вашей головы, а не носится на теле. Вы можете спрятать <em>камень эонов</em> действием @UUID[Compendium.pf2e.actionspf2e.Item.pvQ5rY2zrtPI614F]{Взаимодействовать}, а кружащийся вокруг камень можно выхватить из воздуха успешным действием @UUID[Compendium.pf2e.actionspf2e.Item.Dt6B1slsBy8ipJu9]{Разоружение} против вас. Убранный или снятый камень остается инвестированным, но его эффекты подавляются, пока вы не вернете его на орбиту вокруг вашей головы.</p><p>Существуют различные типы <em>камней эонов</em>, каждый из которых имеет свой внешний вид и магический эффект. Каждый <em>камень эона</em> также приобретает силу резонанса, если поместить его в специальный магический предмет, называемый @UUID[Compendium.pf2e.equipment-srd.Item.gbwr57aT9ou8yKWT].</p><hr /><p><em>Израсходованный камень эонов</em> — это тусклый блок, утративший свои магические свойства. Он всё ещё вращается вокруг вашей головы, как любой другой камень эонов, не занимает руки и может служить в качестве стильной цели для различных заклинаний направленных на объект.</p><p>Этот камень эонов не обладает силой резонанса.</p>`
    },

    {
        ...gear(source.GMCore.key, 1070, 'Легирующая сфера [Стандартная] / Alloy Orb (Standard-Grade)', '80G', ''),
        ...price(0, 80, 0, 0),
        nameGear: "Легирующая сфера [Стандартная] / Alloy Orb (Standard-Grade)",
        traits: ["consumable", "magical", "talisman"],
        category: "other",
        rarity: "common",
        weight: 0.1,
        usage: "affixed-to-a-metal-weapon",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Concentrate]{концентрация})</p><hr /><p>Несмотря на твёрдость, эта металлическая сфера переливается яркими серебристыми и темными железными цветами, словно жидкая. При активации <em>легирующей сферы</em>, выберите холодное железо или серебро. Присоединённое оружие функционирует как выбранный материал в течение 1 минуты, подавляя свой первоначальный материал. Эта сфера действует на оружие 15-го уровня или ниже.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.GXEkmsf4Wre6zqG1]</p>`
    },

    {
        ...gear(source.GMCore.key, 1071, 'Окуляр ремесленника [Отличный] / Crafter\'s Eyepiece(Greater)', '1200G', ''),
        ...price(0, 1200, 0, 0),
        nameGear: "Окуляр ремесленника [Отличный] / Crafter's Eyepiece (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "worneyepiece",
        description: `<p>Этот прочный металлический окуляр, гравированный квадратными узорами, предназначен для ношения на одном глазу. Поворачивая линзы можно увидеть слабый трехмерный контур объекта, который вы планируете сделать или отремонтировать, с полезными метками на деталях.</p><p>Когда он надет, этот окуляр дает вам бонус предмета +2 к проверкам Ремесла. Когда вы осуществляете @UUID[Compendium.pf2e.actionspf2e.Item.bT3skovyLUtP22ME]{Ремонт} предмета, увеличьте восстановленные ОЗ на 10 + 10 за уровень мастерства при успехе, или на 15 + 15 за уровень мастерства при критическом успехе.</p><hr /><p><strong>Активация—Создание прототипа:</strong> 1 минута (@Trait[Manipulate]{воздействие})</p><p><strong>Частота:</strong> Раз в день</p><p><strong>Эффект:</strong> Вы калибруете окуляр, чтобы он в течение этой минуты сотворил @UUID[Compendium.pf2e.spells-srd.Item.TUj8eugNqAvB1vVR] 5-го ранга, для создания временного предмета.</p>`
    },

    {
        ...gear(source.GMCore.key, 1072, 'Хрустальный шар [Чистый кварц] / Crystal Ball (Clear Quartz)', '3800G', ''),
        ...price(0, 3800, 0, 0),
        nameGear: "Хрустальный шар [Чистый кварц] / Crystal Ball (Clear Quartz)",
        traits: ["magical", "scrying"],
        category: "misc",
        rarity: "uncommon",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта полированная хрустальная сфера усиливает магию видения. Любая визуальная информация, полученная через заклинание с признаком @Trait[Scrying]{видение}, которое было сотворено <em>хрустальным шаром</em>, появляется внутри сферы, а любая слуховая информация звучит с поверхности сферы. Когда вы, держа сферу, "Сотворяете заклинание" с признаком @Trait[Scrying]{видение} любым другим способом, то можете таким же образом перенаправить любую получаемую информацию, позволяя другим видеть или слышать цель.</p><p>Основная версия <em>хрустального шара</em> это сфера чистого кварца, но другие версии сделаны из других камней.</p><hr /><p><strong>Активация—Ясновидение:</strong> 1 минута (@Trait[Manipulate]{воздействие}, @Trait[Concentrate]{концентрация})</p><p><strong>Частота:</strong> Раз в час</p><p><strong>Эффект:</strong><em>Хрустальный шар</em> сотворяет @UUID[Compendium.pf2e.spells-srd.Item.zvKWclOZ7A53DObE] с вашими требованиями.</p><hr /><p><strong>Активация—Видение:</strong> 10 минут (@Trait[Manipulate]{воздействие}, @Trait[Concentrate]{концентрация})</p><p><strong>Частота:</strong> Дважды в день</p><p><strong>Эффект:</strong><em>Хрустальный шар</em> сотворяет @UUID[Compendium.pf2e.spells-srd.Item.r784cIz17eWujtQj] @Check[will|dc:33|name:Видение] с вашими требованиями.</p>`
    },

    {
        ...gear(source.GMCore.key, 1073, 'Эликсир ночного зрения [Малый] / Darkvision Elixir (Lesser)', '6G', ''),
        ...price(0, 6, 0, 0),
        nameGear: "Эликсир ночного зрения [Малый] / Darkvision Elixir (Lesser)",
        traits: ["alchemical", "consumable", "elixir"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>После того, как вы выпьете этот эликсир, ваше зрение в темноте становится острее. Вы получаете ночное зрение на 10 минут.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.7UL8belWmo7U5YGM]</p>`
    },

    {
        ...gear(source.GMCore.key, 1074, 'Эликсир орлиного глаза [Малый] / Eagle Eye Elixir (Lesser)', '4G', ''),
        ...price(0, 4, 0, 0),
        nameGear: "Эликсир орлиного глаза [Малый] / Eagle Eye Elixir (Lesser)",
        traits: ["alchemical", "consumable", "elixir"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпив этот эликсир, вы замечаете тонкие визуальные детали. В течение следующего часа вы получаете бонус предмета +1 к проверкам Восприятия или +2 при попытке поиска скрытых дверей и ловушек.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.VOSQ77DV4BnAkP7m]</p>`
    },

    {
        ...gear(source.GMCore.key, 1075, 'Изумрудный кузнечик [Отличный] / Emerald Grasshopper (Greater)', '150G', ''),
        ...price(0, 150, 0, 0),
        nameGear: "Изумрудный кузнечик [Отличный] / Emerald Grasshopper (Greater)",
        traits: ["consumable", "magical", "talisman"],
        category: "talisman",
        rarity: "common",
        weight: 0,
        usage: "affixed-to-armor",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Concentrate]{концентрация})</p><p><strong>Требования:</strong> Вы обучены Атлетике</p><hr /><p>Этот металлический кузнечик, усыпанный изумрудами, обычно крепится к защите ног доспеха.</p><p>После его активации, сделайте @UUID[Compendium.pf2e.actionspf2e.Item.d5I6018Mci2SWokk]{Прыжок} на расстояние вплоть до 100 футов горизонтально и до 30 футов вертикально. Это преимущество применяется для всех других "Прыжков", которые вы делаете до конца своего хода. Если вы заканчиваете свой прыжок не на твердой поверхности, то будете порхать в воздухе до конца своего хода, а потом невредимо падаете со скоростью 60 футов в раунд, пока не достигните земли.</p>`
    },

    {
        ...gear(source.GMCore.key, 1076, 'Вечное извержение Массива Мхар / Eternal Eruption of Mhar Massif', '1400G', ''),
        ...price(0, 1400, 0, 0),
        nameGear: "Вечное извержение Массива Мхар / Eternal Eruption of Mhar Massif",
        traits: ["fire", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Напоминающее <em>застывшую лаву</em>, <em>вечное извержение</em> создано с помощью того же типа магии времени, но построено таким образом, чтобы зацикливаться во времени, реформируя себя после использования. Чтобы определить разницу между ними, нужно внимательно присмотреться и увидеть слабый, повторяющийся узор из красных рун.</p><hr /><p><strong>Активация—Лавовая бомба:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие}, @Trait[Concentrate]{концентрация})</p><p><strong>Эффект:</strong> Вы бросаете <em>вечное извержение</em> с эффектом @UUID[Compendium.pf2e.equipment-srd.Item.X1KGaXLDUxNJ1XXB]{Застывшей лавы Массива Мхар}. После [[/gmr 2d4 #часы]]{2d4 часов}, <em>вечное извержение</em> восстанавливается в носимом вами контейнере, обычно в том, в котором вы хранили его последний раз.</p><p><em>Вечное извержение Массива Мхар</em> наносит @Damage[11d6[fire]|options:area-damage] с простым спасброском @Check[reflex|dc:30|basic|options:area-effect]{Рефлекса}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1077, 'Вечное извержение Бледной горы / Eternal Eruption of Pale Mountain', '700G', ''),
        ...price(0, 700, 0, 0),
        nameGear: "Вечное извержение Бледной горы / Eternal Eruption of Pale Mountain",
        traits: ["fire", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Напоминающее <em>застывшую лаву</em>, <em>вечное извержение</em> создано с помощью того же типа магии времени, но построено таким образом, чтобы зацикливаться во времени, реформируя себя после использования. Чтобы определить разницу между ними, нужно внимательно присмотреться и увидеть слабый, повторяющийся узор из красных рун.</p><hr /><p><strong>Активация—Лавовая бомба:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие}, @Trait[Concentrate]{концентрация})</p><p><strong>Эффект:</strong> Вы бросаете <em>вечное извержение</em> с эффектом @UUID[Compendium.pf2e.equipment-srd.Item.QGgTedo2uMi6e9PR]{Застывшей лавы Бледной горы}. После [[/gmr 2d4 #часы]]{2d4 часов}, <em>вечное извержение</em> восстанавливается в носимом вами контейнере, обычно в том, в котором вы хранили его последний раз.</p><p><em>Вечное извержение Бледной горы</em> наносит @Damage[9d6[fire]|options:area-damage] с простым спасброском @Check[reflex|dc:27|basic|options:area-effect]{Рефлекса}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1078, 'Эликсир туманной формы [Малый] / Mistform Elixir (Lesser)', '18G', ''),
        ...price(0, 18, 0, 0),
        nameGear: "Эликсир туманной формы [Малый] / Mistform Elixir (Lesser)",
        traits: ["alchemical", "consumable", "elixir", "illusion", "visual"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Слабый туман исходит от вашей кожи, давая вам в течение указанного времени состояние @UUID[Compendium.pf2e.conditionitems.Item.DmAIPqOBomZ7H95W]{Скрытый} на 3 раунда.</p><p>Как обычно, будучи @Condition[Concealed]{скрытым} когда ваша позиция всё ещё очевидна, вы не можете использовать его, чтобы @UUID[Compendium.pf2e.actionspf2e.Item.XMcnh4cSI32tljXa]{Спрятаться} или @UUID[Compendium.pf2e.actionspf2e.Item.VMozDqMMuK5kpoX4]{Красться}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1079, 'Руна упрочнения [Превосходная] / Reinforcing Rune (Major)', '8000G', ''),
        ...price(0, 8000, 0, 0),
        nameGear: "Руна упрочнения [Превосходная] / Reinforcing Rune (Major)",
        traits: ["magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "etched-onto-a-shield",
        description: `<p><em>Руна упрочнения</em> делает щит значительно более прочным, позволяя эффективно блокировать им более мощные атаки.</p><hr /><p>Твёрдость щита увеличивается на 5, он получает дополнительные 84 ОЗ, и его ПП увеличивается на 42 (максимально Тв 17, 136 ОЗ, и 68 ПП).</p>`
    },

    {
        ...gear(source.GMCore.key, 1080, 'Эликсир касания моря [Большой] / Sea Touch Elixir (Greater)', '920G', ''),
        ...price(0, 920, 0, 0),
        nameGear: "Эликсир касания моря [Большой] / Sea Touch Elixir (Greater)",
        traits: ["alchemical", "consumable", "elixir", "polymorph"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Это солоноватое варево изменяет кожу на ваших руках и ногах. Промежутки между пальцами рук и ног становятся перепончатыми, что даёт вам Скорость плавания 20 футов на 24 часа, и вы можете дышать под водой.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.RRusoN3HEGnDO1Dg]</p>`
    },

    {
        ...gear(source.GMCore.key, 1081, 'Эликсир касания моря [Средний] / Sea Touch Elixir (Moderate)', '300G', ''),
        ...price(0, 300, 0, 0),
        nameGear: "Эликсир касания моря [Средний] / Sea Touch Elixir (Moderate)",
        traits: ["alchemical", "consumable", "elixir", "polymorph"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Это солоноватое варево изменяет кожу на ваших руках и ногах. Промежутки между пальцами рук и ног становятся перепончатыми, что даёт вам Скорость плавания 20 футов на 1 час, и вы можете дышать под водой.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.9keegq0GdS1eSrNr]</p>`
    },

    {
        ...gear(source.GMCore.key, 1082, 'Рукава для хранения [Отличные] / Sleeves of Storage (Greater)', '600G', ''),
        ...price(0, 600, 0, 0),
        nameGear: "Рукава для хранения [Отличные] / Sleeves of Storage (Greater)",
        traits: ["extradimensional", "invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "worngarment",
        description: `<p>Этот свободная мантия имеет широкие, обширные рукава, каждый из которых содержит межпространственный карман. Каждое их этих пространств функционирует как @UUID[Compendium.pf2e.equipment-srd.Item.jaEEvuQ32GjAa8jy], которое может вмещать вплоть до 20 масс предметов (всего 40 масс), однако ни один из отдельных предметов не может быть более 1 массы; рукава становятся немного тяжелее по мере достижения максимальной вместимости. Вы можете добавить предмет или вытащить его из рукава одной свободной рукой, как действие @UUID[Compendium.pf2e.actionspf2e.Item.pvQ5rY2zrtPI614F]{Взаимодействовать}.</p><p>Если рукав полностью пустой, вы можете положить своего фамильяра в этот межпространственный карман. Он может там комфортно жить вплоть до 4 часов, после чего начнёт задыхаться. Находясь в рукаве, на него не воздействуют эффекты и он не может быть целью любых эффектов, но вы не получаете преимущества от способностей хозяина. Фамильяр может выбраться из рукава по собственной воле с помощью одного действия, которое имеет признаки @Trait[Manipulate]{воздействие} и @Trait[Move]{движение}. Вы не можете поместить любое другое существо в свои рукава, либо поместить своего фамильяра, если он больше чем крошечного размера. Если ваш фамильяр в рукаве, то вы не можете поместить никакие предметы в рукав.</p>`
    },

    {
        ...gear(source.GMCore.key, 1083, 'Инструментарий путешественника / Traveler\'s Any - Tool', '200G', ''),
        ...price(0, 200, 0, 0),
        nameGear: "Инструментарий путешественника / Traveler's Any-Tool",
        traits: ["magical"],
        category: "misc",
        rarity: "common",
        weight: 1,
        usage: "held-in-two-hands",
        description: `<p>До активации, этот предмет выглядит как пепельный стержень, покрытый сталью с обоих концов.</p><hr /><p><strong>Активация—Нажать:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие}, @Trait[Concentrate]{концентрация})</p><p><strong>Эффект:</strong> Вы представляете конкретный простой инструмент и инструментарий превращается в него (обычно вы можете выбрать из инструментов, перечисленных в главе 6, <a href=https://clck.ru/e7ARC>Инструмент (Tool)</a>). Это превращает деревянную часть в любое древко или рукоять, а металлические навершия в лопаты, головки молотков и т.п, что позволяет использовать самые простые инструменты, но не более сложные. Вы можете вернуть предмет в его форму жезла с помощью действия @UUID[Compendium.pf2e.actionspf2e.Item.pvQ5rY2zrtPI614F]{Взаимодействовать}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1084, 'Амуниция сокрушающей магии [Вид 1] / Spellstrike Ammunition (Type I)', '12G', ''),
        ...price(0, 12, 0, 0),
        nameGear: "Амуниция сокрушающей магии [Вид 1] / Spellstrike Ammunition (Type I)",
        traits: ["consumable", "magical"],
        category: "ammo",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Амуниция:</strong> любая</p><p><strong>Активация:</strong><span class="action-glyph">2</span> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]</p><hr /><p>Таинственные узоры создают магический резервуар внутри этой амуниции. Вы активируете <em>амуницию сокрушающей магии</em> с помощью "Сотворения заклинания" в амуницию. Заклинание должно быть 1-го ранга, и должно быть способно выбирать целью существо, не являющееся заклинателем. Существо, по которому попали <em>амуницией сокрушающей магии</em>, становится целью заклинания. Если существо не является допустимой целью для заклинания, то оно теряется.</p><p>Амуниция влияет только на цель, по которой было попадание, даже если заклинание обычно действует более чем на 1 цель. Если заклинанию требуется сделать атаку заклинанием, то используйте для этого результат вашего броска дистанционной атаки, чтобы определить степень успешности заклинания. Если для заклинания требуется спасбросок, цель делает спасбросок против вашего КС заклинаний.</p><p>Максимальный ранг заклинания, который может вместить амуниция, определяет её уровень и цену.</p>`
    },

    {
        ...gear(source.GMCore.key, 1085, 'Амуниция сокрушающей магии [Вид 2] / Spellstrike Ammunition (Type II)', '30G', ''),
        ...price(0, 30, 0, 0),
        nameGear: "Амуниция сокрушающей магии [Вид 2] / Spellstrike Ammunition (Type II)",
        traits: ["consumable", "magical"],
        category: "ammo",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Амуниция:</strong> любая</p><p><strong>Активация:</strong><span class="action-glyph">2</span> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]</p><hr /><p>Таинственные узоры создают магический резервуар внутри этой амуниции. Вы активируете <em>амуницию сокрушающей магии</em> с помощью "Сотворения заклинания" в амуницию. Заклинание должно быть 2-го ранга или ниже, и должно быть способно выбирать целью существо, не являющееся заклинателем. Существо, по которому попали <em>амуницией сокрушающей магии</em>, становится целью заклинания. Если существо не является допустимой целью для заклинания, то оно теряется.</p><p>Амуниция влияет только на цель, по которой было попадание, даже если заклинание обычно действует более чем на 1 цель. Если заклинанию требуется сделать атаку заклинанием, то используйте для этого результат вашего броска дистанционной атаки, чтобы определить степень успешности заклинания. Если для заклинания требуется спасбросок, цель делает спасбросок против вашего КС заклинаний.</p><p>Максимальный ранг заклинания, который может вместить амуниция, определяет её уровень и цену.</p>`
    },

    {
        ...gear(source.GMCore.key, 1086, 'Амуниция сокрушающей магии [Вид 3] / Spellstrike Ammunition (Type III)', '70G', ''),
        ...price(0, 70, 0, 0),
        nameGear: "Амуниция сокрушающей магии [Вид 3] / Spellstrike Ammunition (Type III)",
        traits: ["consumable", "magical"],
        category: "ammo",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Амуниция:</strong> любая</p><p><strong>Активация:</strong><span class="action-glyph">2</span> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]</p><hr /><p>Таинственные узоры создают магический резервуар внутри этой амуниции. Вы активируете <em>амуницию сокрушающей магии</em> с помощью "Сотворения заклинания" в амуницию. Заклинание должно быть 3-го ранга или ниже, и должно быть способно выбирать целью существо, не являющееся заклинателем. Существо, по которому попали <em>амуницией сокрушающей магии</em>, становится целью заклинания. Если существо не является допустимой целью для заклинания, то оно теряется.</p><p>Амуниция влияет только на цель, по которой было попадание, даже если заклинание обычно действует более чем на 1 цель. Если заклинанию требуется сделать атаку заклинанием, то используйте для этого результат вашего броска дистанционной атаки, чтобы определить степень успешности заклинания. Если для заклинания требуется спасбросок, цель делает спасбросок против вашего КС заклинаний.</p><p>Максимальный ранг заклинания, который может вместить амуниция, определяет её уровень и цену.</p>`
    },

    {
        ...gear(source.GMCore.key, 1087, 'Амуниция сокрушающей магии [Вид 4] / Spellstrike Ammunition (Type IV)', '150G', ''),
        ...price(0, 150, 0, 0),
        nameGear: "Амуниция сокрушающей магии [Вид 4] / Spellstrike Ammunition (Type IV)",
        traits: ["consumable", "magical"],
        category: "ammo",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Амуниция:</strong> любая</p><p><strong>Активация:</strong><span class="action-glyph">2</span> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]</p><hr /><p>Таинственные узоры создают магический резервуар внутри этой амуниции. Вы активируете <em>амуницию сокрушающей магии</em> с помощью "Сотворения заклинания" в амуницию. Заклинание должно быть 4-го ранга или ниже, и должно быть способно выбирать целью существо, не являющееся заклинателем. Существо, по которому попали <em>амуницией сокрушающей магии</em>, становится целью заклинания. Если существо не является допустимой целью для заклинания, то оно теряется.</p><p>Амуниция влияет только на цель, по которой было попадание, даже если заклинание обычно действует более чем на 1 цель. Если заклинанию требуется сделать атаку заклинанием, то используйте для этого результат вашего броска дистанционной атаки, чтобы определить степень успешности заклинания. Если для заклинания требуется спасбросок, цель делает спасбросок против вашего КС заклинаний.</p><p>Максимальный ранг заклинания, который может вместить амуниция, определяет её уровень и цену.</p>`
    },

    {
        ...gear(source.GMCore.key, 1088, 'Амуниция сокрушающей магии [Вид 5] / Spellstrike Ammunition (Type V)', '300G', ''),
        ...price(0, 300, 0, 0),
        nameGear: "Амуниция сокрушающей магии [Вид 5] / Spellstrike Ammunition (Type V)",
        traits: ["consumable", "magical"],
        category: "ammo",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Амуниция:</strong> любая</p><p><strong>Активация:</strong><span class="action-glyph">2</span> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]</p><hr /><p>Таинственные узоры создают магический резервуар внутри этой амуниции. Вы активируете <em>амуницию сокрушающей магии</em> с помощью "Сотворения заклинания" в амуницию. Заклинание должно быть 5-го ранга или ниже, и должно быть способно выбирать целью существо, не являющееся заклинателем. Существо, по которому попали <em>амуницией сокрушающей магии</em>, становится целью заклинания. Если существо не является допустимой целью для заклинания, то оно теряется.</p><p>Амуниция влияет только на цель, по которой было попадание, даже если заклинание обычно действует более чем на 1 цель. Если заклинанию требуется сделать атаку заклинанием, то используйте для этого результат вашего броска дистанционной атаки, чтобы определить степень успешности заклинания. Если для заклинания требуется спасбросок, цель делает спасбросок против вашего КС заклинаний.</p><p>Максимальный ранг заклинания, который может вместить амуниция, определяет её уровень и цену.</p>`
    },

    {
        ...gear(source.GMCore.key, 1089, 'Амуниция сокрушающей магии [Вид 6] / Spellstrike Ammunition (Type VI)', '600G', ''),
        ...price(0, 600, 0, 0),
        nameGear: "Амуниция сокрушающей магии [Вид 6] / Spellstrike Ammunition (Type VI)",
        traits: ["consumable", "magical"],
        category: "ammo",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Амуниция:</strong> любая</p><p><strong>Активация:</strong><span class="action-glyph">2</span> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]</p><hr /><p>Таинственные узоры создают магический резервуар внутри этой амуниции. Вы активируете <em>амуницию сокрушающей магии</em> с помощью "Сотворения заклинания" в амуницию. Заклинание должно быть 6-го ранга или ниже, и должно быть способно выбирать целью существо, не являющееся заклинателем. Существо, по которому попали <em>амуницией сокрушающей магии</em>, становится целью заклинания. Если существо не является допустимой целью для заклинания, то оно теряется.</p><p>Амуниция влияет только на цель, по которой было попадание, даже если заклинание обычно действует более чем на 1 цель. Если заклинанию требуется сделать атаку заклинанием, то используйте для этого результат вашего броска дистанционной атаки, чтобы определить степень успешности заклинания. Если для заклинания требуется спасбросок, цель делает спасбросок против вашего КС заклинаний.</p><p>Максимальный ранг заклинания, который может вместить амуниция, определяет её уровень и цену.</p>`
    },

    {
        ...gear(source.GMCore.key, 1090, 'Амуниция сокрушающей магии [Вид 7] / Spellstrike Ammunition (Type VII)', '1300G', ''),
        ...price(0, 1300, 0, 0),
        nameGear: "Амуниция сокрушающей магии [Вид 7] / Spellstrike Ammunition (Type VII)",
        traits: ["consumable", "magical"],
        category: "ammo",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Амуниция:</strong> любая</p><p><strong>Активация:</strong><span class="action-glyph">2</span> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]</p><hr /><p>Таинственные узоры создают магический резервуар внутри этой амуниции. Вы активируете <em>амуницию сокрушающей магии</em> с помощью "Сотворения заклинания" в амуницию. Заклинание должно быть 7-го ранга или ниже, и должно быть способно выбирать целью существо, не являющееся заклинателем. Существо, по которому попали <em>амуницией сокрушающей магии</em>, становится целью заклинания. Если существо не является допустимой целью для заклинания, то оно теряется.</p><p>Амуниция влияет только на цель, по которой было попадание, даже если заклинание обычно действует более чем на 1 цель. Если заклинанию требуется сделать атаку заклинанием, то используйте для этого результат вашего броска дистанционной атаки, чтобы определить степень успешности заклинания. Если для заклинания требуется спасбросок, цель делает спасбросок против вашего КС заклинаний.</p><p>Максимальный ранг заклинания, который может вместить амуниция, определяет её уровень и цену.</p>`
    },

    {
        ...gear(source.GMCore.key, 1091, 'Амуниция сокрушающей магии [Вид 8] / Spellstrike Ammunition (Type VIII)', '3000G', ''),
        ...price(0, 3000, 0, 0),
        nameGear: "Амуниция сокрушающей магии [Вид 8] / Spellstrike Ammunition (Type VIII)",
        traits: ["consumable", "magical"],
        category: "ammo",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Амуниция:</strong> любая</p><p><strong>Активация:</strong><span class="action-glyph">2</span> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]</p><hr /><p>Таинственные узоры создают магический резервуар внутри этой амуниции. Вы активируете <em>амуницию сокрушающей магии</em> с помощью "Сотворения заклинания" в амуницию. Заклинание должно быть 8-го ранга или ниже, и должно быть способно выбирать целью существо, не являющееся заклинателем. Существо, по которому попали <em>амуницией сокрушающей магии</em>, становится целью заклинания. Если существо не является допустимой целью для заклинания, то оно теряется.</p><p>Амуниция влияет только на цель, по которой было попадание, даже если заклинание обычно действует более чем на 1 цель. Если заклинанию требуется сделать атаку заклинанием, то используйте для этого результат вашего броска дистанционной атаки, чтобы определить степень успешности заклинания. Если для заклинания требуется спасбросок, цель делает спасбросок против вашего КС заклинаний.</p><p>Максимальный ранг заклинания, который может вместить амуниция, определяет её уровень и цену.</p>`
    },

    {
        ...gear(source.GMCore.key, 1092, 'Амуниция сокрушающей магии [Вид 9] / Spellstrike Ammunition (Type IX)', '8000G', ''),
        ...price(0, 8000, 0, 0),
        nameGear: "Амуниция сокрушающей магии [Вид 9] / Spellstrike Ammunition (Type IX)",
        traits: ["consumable", "magical"],
        category: "ammo",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Амуниция:</strong> любая</p><p><strong>Активация:</strong><span class="action-glyph">2</span> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]</p><hr /><p>Таинственные узоры создают магический резервуар внутри этой амуниции. Вы активируете <em>амуницию сокрушающей магии</em> с помощью "Сотворения заклинания" в амуницию. Заклинание должно быть 10-го ранга или ниже, и должно быть способно выбирать целью существо, не являющееся заклинателем. Существо, по которому попали <em>амуницией сокрушающей магии</em>, становится целью заклинания. Если существо не является допустимой целью для заклинания, то оно теряется.</p><p>Амуниция влияет только на цель, по которой было попадание, даже если заклинание обычно действует более чем на 1 цель. Если заклинанию требуется сделать атаку заклинанием, то используйте для этого результат вашего броска дистанционной атаки, чтобы определить степень успешности заклинания. Если для заклинания требуется спасбросок, цель делает спасбросок против вашего КС заклинаний.</p><p>Максимальный ранг заклинания, который может вместить амуниция, определяет её уровень и цену.</p>`
    },

    {
        ...gear(source.GMCore.key, 1093, 'Эликсир бомбометателя [Малый] / Bomber\'s Eye Elixir(Lesser)', '14G', ''),
        ...price(0, 14, 0, 0),
        nameGear: "Эликсир бомбометателя [Малый] / Bomber's Eye Elixir (Lesser)",
        traits: ["alchemical", "consumable", "elixir"],
        category: "elixir",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Эта настойка позволяет вам точно заострить внимание на своих врагов. На следующие 5 минут, ваши @UUID[Compendium.pf2e.actionspf2e.Item.VjxZFuUXrCU94MWR]{Удары} алхимическими бомбами снижают бонус обстоятельства к КБ, получаемый врагами от укрытия на 1.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.HmpYVsyiCq8XDlop]</p>`
    },

    {
        ...gear(source.GMCore.key, 1094, 'Перчатки шарлатана [Отличные] / Charlatan\'s Gloves(Greater)', '600G', ''),
        ...price(0, 600, 0, 0),
        nameGear: "Перчатки шарлатана [Отличные] / Charlatan's Gloves (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "worngloves",
        description: `<p>Маленькие серебряные крючки украшают эти шелковые перчатки. Они дают бонус предмета +2 к Воровству и позволяют Сотворять @UUID[Compendium.pf2e.spells-srd.Item.pwzdSlJgYqN7bs2w] как врожденное оккультное заклинание.</p><p>Если вы также носите @UUID[Compendium.pf2e.equipment-srd.Item.uiJAR3jQbQHhiP3Q], когда вы перемещаете объект при помощи <em>телекинетической руки</em>, вместо этого вы можете заставить его исчезнуть в клубах дыма и снова появиться, зависнув в пространстве рядом с вашим. Это эффект @Trait[Teleportation]{телепортации}. Предмет продолжает парить до конца вашего хода или пока не будет взят действием "Взаимодействовать".</p>`
    },

    {
        ...gear(source.GMCore.key, 1095, 'Демоническая маска [Отличная] / Demon Mask (Greater)', '900G', ''),
        ...price(0, 900, 0, 0),
        nameGear: "Демоническая маска [Отличная] / Demon Mask (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "wornmask",
        description: `<p>Эта ужасающая маска создана в облике злобного демона и даёт бонус предмета +2 к проверкам Запугивания.</p><hr /><p><strong>Активация—Злобная ухмылка:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Частота:</strong> Раз в день</p><p><strong>Эффект:</strong> Маска сотворяет @UUID[Compendium.pf2e.spells-srd.Item.4koZzrnMXhhosn0D] 3-го ранга с КС 29.</p>`
    },

    {
        ...gear(source.GMCore.key, 1096, 'Дублирующие кольца [Отличные] / Doubling Rings (Greater)', '1300G', ''),
        ...price(0, 1300, 0, 0),
        nameGear: "Дублирующие кольца [Отличные] / Doubling Rings (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "worn",
        description: `<p>Этот предмет состоит из двух магически связанных колец: замысловатого, блестящего золотого кольца с квадратным рубином и толстого, простого железного кольца. Когда вы владеете оружием ближнего боя в руке с золотым кольцом, основные руны этого оружия копируются на любое оружие ближнего боя, которым вы владеете другой рукой с надетым железным кольцом (основные руны это руны <em>мощи оружия</em> и <em>разящие</em>, которые добавляют бонус предмета для бросков атаки и дополнительные кости урона соответственно). Любые основные руны на оружии в руке с железным кольцом подавляются.</p><p>Копирование работает только если вы носите оба кольца, и прекращается как только вы перестаёте владеть оружием ближнего боя в одной из своих рук. Соответственно, преимущество не применяется к метательным атакам или если вы держите оружие, но не владеете им (например, держите одной рукой оружие, для владения которым требуется 2 руки).</p><p>Эти кольца так же копируют руны свойств с оружия в руке с золотым кольцом, до тех пор, пока оружие в руке с железным кольцом соответствует всем предварительным условиям для определённой руны и не является особым оружием. Оружие в руке с железным кольцом получает преимущества этих рун. Все собственные руны этого оружия подавляются. Когда вы инвестируете кольца, вы можете предпочесть, чтобы кольца передавали только основные руны, и в таком случае кольца работают как обычные <em>дублирующие кольца</em>.</p>`
    },

    {
        ...gear(source.GMCore.key, 1097, 'Вечное извержение Бэрроусиджа / Eternal Eruption of Barrowsiege', '40000G', ''),
        ...price(0, 40000, 0, 0),
        nameGear: "Вечное извержение Бэрроусиджа / Eternal Eruption of Barrowsiege",
        traits: ["fire", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Напоминающее <em>застывшую лаву</em>, <em>вечное извержение</em> создано с помощью того же типа магии времени, но построено таким образом, чтобы зацикливаться во времени, реформируя себя после использования. Чтобы определить разницу между ними, нужно внимательно присмотреться и увидеть слабый, повторяющийся узор из красных рун.</p><hr /><p><strong>Активация—Лавовая бомба:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие}, @Trait[Concentrate]{концентрация})</p><p><strong>Эффект:</strong> Вы бросаете <em>вечное извержение</em> с эффектом @UUID[Compendium.pf2e.equipment-srd.Item.ugxI9kH7osJ3J5qG]{Застывшей лавы Бэрроусиджа}. После [[/gmr 2d4 #часы]]{2d4 часов}, <em>вечное извержение</em> восстанавливается в носимом вами контейнере, обычно в том, в котором вы хранили его последний раз.</p><p><em>Вечное извержение Бэрроусиджа</em> наносит @Damage[19d6[fire]|options:area-damage] с простым спасброском @Check[reflex|dc:43|basic|options:area-effect]{Рефлекса}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1098, 'Застывшая лава Утёса Дроскара / Frozen Lava of Droskar\'s Crag', '600G', ''),
        ...price(0, 600, 0, 0),
        nameGear: "Застывшая лава Утёса Дроскара / Frozen Lava of Droskar's Crag",
        traits: ["consumable", "fire", "magical"],
        category: "other",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Эта бусина размером с чернику выглядит как стеклянная сфера с мерцающим светом в сердцевине. В действительности это "стекло" — пузырь застывшей магии времени, содержащий приостановленную лаву в момент, предшествующий извержению вулкана. При активации она становится крошечным маячком яркого света, прежде чем высвободить свою силу. После "Активации" <em>застывшей лавы</em>, она быстро нагревается. Если вы или кто-либо другой бросит ее (действие @UUID[Compendium.pf2e.actionspf2e.Item.pvQ5rY2zrtPI614F]), она взорвется как @UUID[Compendium.pf2e.spells-srd.Item.sxQZ6yqTn0czJxVd] там, где приземлится. Ваш бросок может поместить центр огненного шара в любое место в радиусе 70 футов, хотя, по усмотрению Мастера, вам может потребоваться сделать бросок атаки, если бросок необычайно сложен. Если до начала вашего следующего хода никто не бросит бусину, она взорвётся, как яркий, но безвредный фейерверк.</p><p><em>Застывшая лава</em> бывает разных видов, её делают из лавы, взятой из известных вулканов Голариона и других планов.</p><hr /><p><em>Застывшая лава Утёса Дроскара</em> наносит @Damage[13d6[fire]|options:area-damage] с простым спасброском @Check[reflex|dc:32|basic|options:area-effect]{Рефлекса}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1099, 'Инструмент маэстро [Отличный] / Maestro\'s Instrument(Greater)', '19000G', ''),
        ...price(0, 19000, 0, 0),
        nameGear: "Инструмент маэстро [Отличный] / Maestro's Instrument (Greater)",
        traits: ["magical"],
        category: "misc",
        rarity: "common",
        weight: 1,
        usage: "held-in-two-hands",
        description: `<p><em>Инструмент маэстро</em> может быть создан в виде любого из ручных музыкальных инструментов. Он даёт вам бонус предмета +3 к проверкам Выступления, при игре музыки на нём.</p><hr /><p><strong>Активация—Чарующее выступление:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Частота:</strong> Раз в день</p><p><strong>Эффект:</strong> Вы можете играть на инструменте чтобы создать эффект заклинания @UUID[Compendium.pf2e.spells-srd.Item.vLA0q0WOK2YPuJs6] 8-го ранга (КС 38).</p><hr /><p><strong>Требования для создания:</strong> Вы должны предоставить сотворение заклинания <em>очаровать</em> соответствующего ранга.</p>`
    },

    {
        ...gear(source.GMCore.key, 1100, 'Чудесные лекарства [Отличные] / Marvelous Medicines (Greater)', '19000G', ''),
        ...price(0, 19000, 0, 0),
        nameGear: "Чудесные лекарства [Отличные] / Marvelous Medicines (Greater)",
        traits: ["magical"],
        category: "misc",
        rarity: "common",
        weight: 1,
        usage: "held-in-two-hands",
        description: `<p>Этот набор лекаря содержит, казалось бы, бесконечный запас бинтов, трав и предметов для исцеления безупречного качества, давая вам бонус предмета +3 к проверкам Медицины.</p><p>Если вы используете <em>чудесные лекарства</em> когда @UUID[Compendium.pf2e.actionspf2e.Item.KjoCEEmPGTeFE4hh]{Лечите яд} или @UUID[Compendium.pf2e.actionspf2e.Item.TC7OcDa7JlWbqMaN]{Лечите болезнь}, перед тем как совершить проверку, лекарства пытаются @UUID[Compendium.pf2e.journals.JournalEntry.S55aqwWIzpQRFhcq.JournalEntryPage.E4Q7EiSG18sIvFwg]{Противодействовать} исцеляемых вами яда или болезни с рангом противодействия 8 и модификатором [[/r 1d20+30 #Противодействия]]{+30}. Это эффект @Trait[Healing]{исцеления}.</p><p>Эти лекарства нельзя повторно использовать для исцеления того же недуга этого пациента.</p>`
    },

    {
        ...gear(source.GMCore.key, 1101, 'Чудесная миниатюра [Лестница] / Marvelous Miniature (Ladder)', '3G', ''),
        ...price(0, 3, 0, 0),
        nameGear: "Чудесная миниатюра [Лестница] / Marvelous Miniature (Ladder)",
        traits: ["consumable", "expandable", "magical"],
        category: "other",
        rarity: "common",
        weight: 0,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Каждая <em>чудесная миниатюра</em> представляет собой исключительно маленькую копию настоящего существа или объекта. Миниатюра сделана из дерева, олова или других простых материалов, и содержит гравированную в основание руну. <em>Чудесные миниатюры</em> иногда поставляются в виде набора; например, туристический набор включает в себя миниатюры лодки, костра и лошади. Активация <em>чудесной миниатюры</em> трансформирует её в другое существо или объект, которое может быть использовано как обычно для этого объекта. Каждая миниатюра может быть активирована только один раз, и большинство из них навсегда становятся предметами из своего описания.</p><hr /><p>При активации, эта миниатюра навсегда превращается в @Unit[Foot|20]{20-футовую} деревянную лестницу.</p>`
    },

    {
        ...gear(source.GMCore.key, 1102, 'Мумифицированная летучая мышь / Mummified Bat', '175G', ''),
        ...price(0, 175, 0, 0),
        nameGear: "Мумифицированная летучая мышь / Mummified Bat",
        traits: ["consumable", "magical", "talisman"],
        category: "talisman",
        rarity: "common",
        weight: 0,
        usage: "affixed-to-weapon",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Concentrate]{концентрация})</p><hr /><p>Этот талисман представляет собой магически обработанный труп крошечной летучей мыши, обернутый папирусом. При активации, оружие, к которому он прикреплён, обнаруживает вибрации вокруг вас и направляет ваше восприятие. На 1 минуту вам не нужно проходить чистую проверку, чтобы целиться в @UUID[Compendium.pf2e.conditionitems.Item.DmAIPqOBomZ7H95W]{Скрытых} существ. Вы не @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Застигнуты врасплох} для @UUID[Compendium.pf2e.conditionitems.Item.iU0fEDdBp3rXpTMC]{Спрятанных} от вас существам (если только не @Condition[Off-Guard]{застигнуты врасплох} для них по другой причине кроме состояния @Condition[Hidden]{спрятан}), и вам достаточно пройти @Check[flat|dc:5]{Чистую проверку}, чтобы нацелиться на @Condition[Hidden]{спрятанное} существо. Соседние @UUID[Compendium.pf2e.conditionitems.Item.VRSef5y1LmL2Hkjf]{необнаруженные} существа с уровнем меньше вашего вместо этого только @Condition[Hidden]{спрятаны} для вас.</p><p>Если у вас есть способность <em>"Бой вслепую"</em>, то вы получаете неточное чувство эхолокации с дистанцией 30 футов на 1 минуту. Существа, которые были бы для вас @UUID[Compendium.pf2e.conditionitems.Item.VRSef5y1LmL2Hkjf]{Необнаружены} из-за того, что вы не можете их видеть, вместо этого @UUID[Compendium.pf2e.conditionitems.Item.iU0fEDdBp3rXpTMC]{Спрятаны}.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.3dvpk7jwcQbmLsUA]</p>`
    },

    {
        ...gear(source.GMCore.key, 1103, 'Зелье сопротивления [Большое] / Potion of Resistance (Greater)', '850G', ''),
        ...price(0, 850, 0, 0),
        nameGear: "Зелье сопротивления [Большое] / Potion of Resistance (Greater)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья дает сопротивление 15 к одному типу урона на 1 час. Каждое <em>зелье сопротивления</em> создано для защиты от звука, кислоты, огня, холода или электричества (и называется, соответственно, <em>малое зелье сопротивления огню</em> и т.д.).</p>`
    },

    {
        ...gear(source.GMCore.key, 1104, 'Зелье сопротивления [Среднее] / Potion of Resistance (Moderate)', '180G', ''),
        ...price(0, 180, 0, 0),
        nameGear: "Зелье сопротивления [Среднее] / Potion of Resistance (Moderate)",
        traits: ["consumable", "magical", "potion"],
        category: "potion",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p><strong>Активация:</strong><span class="action-glyph">1</span> (@Trait[Manipulate]{воздействие})</p><hr /><p>Выпивание этого густого укрепляющего зелья дает сопротивление 10 к одному типу урона на 1 час. Каждое <em>зелье сопротивления</em> создано для защиты от звука, кислоты, огня, холода или электричества (и называется, соответственно, <em>малое зелье сопротивления огню</em> и т.д.).</p>`
    },

    {
        ...gear(source.GMCore.key, 1105, 'Первозданная омела [Отличная] / Primeval Mistletoe (Greater)', '3900G', ''),
        ...price(0, 3900, 0, 0),
        nameGear: "Первозданная омела [Отличная] / Primeval Mistletoe (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "worn",
        description: `<p>Эта веточка увитого ягодами остролиста и омелы не увядает и не гниёт. Она может использоваться как природный фокус, а также даёт держащему её существу бонус предмета +2 к проверкам Природы.</p><hr /><p><strong>Активация—Помазать:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Частота:</strong> Раз в 10 минут</p><p><strong>Эффект:</strong> Вы выжимаете сок одной из ягод и размазываете его по оружию, сделанному в основном из дерева для сотворения на него @UUID[Compendium.pf2e.spells-srd.Item.TFitdEOpQC4SzKQQ] 6-го ранга, или по существу для сотворения @UUID[Compendium.pf2e.spells-srd.Item.EE7Q5BHIrfWNCPtT] 6-го ранга.</p><hr /><p><strong>Активация—Обвиться:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Частота:</strong> Раз в день</p><p><strong>Эффект:</strong> Вы касаетесь веточки, а затем дерева, для сотворения на себя @UUID[Compendium.pf2e.spells-srd.Item.dileJ0Yxqg76LMvu], превращая вас в лозу на тронутом дереве.</p><hr /><p><strong>Активация—Культивирование:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Частота:</strong> Раз в день</p><p><strong>Эффект:</strong> Вы сажаете <em>отличную первозданную омелу</em> в область естественной почвы или камня. После посадки растение немедленно прорастает в виде области кустов остролиста, которые не мешают движению и пульсируют жизненной энергией, производя эффекты заклинания @UUID[Compendium.pf2e.spells-srd.Item.x5rGOmhDRDVQPrnW]. Вы можете "Поддерживать" активацию вплоть до 1 минуты. Когда это волшебство заканчивается, кусты остролиста возвращаются к первоначальному виду <em>отличной первозданной омелы</em>.</p>`
    },

    {
        ...gear(source.GMCore.key, 1106, 'Сияющий символ [Превосходный] / Shining Symbol (Major)', '13500G', ''),
        ...price(0, 13500, 0, 0),
        nameGear: "Сияющий символ [Превосходный] / Shining Symbol (Major)",
        traits: ["divine", "invested", "light"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "worn",
        description: `<p>Если вы поклоняетесь какому-либо божеству, этот золотой амулет превращается в религиозный символ вашего божества, когда вы инвестируете его. Вы получаете бонус предмета +3 к Религии. Символ излучает тусклый свет в @Template[emanation|distance:20]{20-футовой эманации}.</p><hr /><p><strong>Активация—Духовный свет:</strong><span class="action-glyph">2</span> (@Trait[Concentrate]{концентрация}, @Trait[Revelation]{откровение}, @Trait[Light]{свет})</p><p><strong>Частота:</strong> Раз в день</p><p><strong>Эффект:</strong> Излучаемый символом свет становится ярким на 10 минут и светит сквозь тела, выявляя признаки духов внутри. Существа в свете получают штраф состояния −3 к проверкам Обмана и Скрытности, и, пока он активен, ваши противники получают в этом свете слабость 10 к духовному урону.</p><p>Вы можете "Развеять" эту активацию.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.NNxguHneoM3NvW1S]</p><hr /><p><strong>Требования для создания:</strong> Вы должны быть @Trait[Holy]{святым} или @Trait[Unholy]{нечестивым}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1107, 'Скользкая руна [Превосходная] / Slick (Major)', '9000G', ''),
        ...price(0, 9000, 0, 0),
        nameGear: "Скользкая руна [Превосходная] / Slick (Major)",
        traits: ["magical"],
        category: "misc",
        rarity: "common",
        weight: 0,
        usage: "etched-onto-armor",
        description: `<p>Это свойство делает доспех скользким, как будто он покрыт тонкой пленкой масла. Вы получаете бонус предмета +3 к проверкам Акробатики, чтобы @UUID[Compendium.pf2e.actionspf2e.Item.SkZAQRkLLkmBQNB9]{Вырваться} и @UUID[Compendium.pf2e.actionspf2e.Item.kMcV8e5EZUxa6evt]{Протиснуться}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1108, 'Курильница откровения [Малая] / Thurible of Revelation (Lesser)', '55G', ''),
        ...price(0, 55, 0, 0),
        nameGear: "Курильница откровения [Малая] / Thurible of Revelation (Lesser)",
        traits: ["divine"],
        category: "misc",
        rarity: "common",
        weight: 1,
        usage: "held-in-one-hand",
        description: `<p>Это медное кадило, которое болтается на длинной цепочке. Большинство <em>курильниц откровения</em> украшены кружащимся Эмпирейскими текстами, хотя некоторые из них сделаны из железа и содержат Дьявольские или Хтонические тексты.</p><hr /><p><strong>Активация—Сжечь благовония:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие})</p><p><strong>Стоимость:</strong> благовония стоимостью хотя бы 5 зм</p><p><strong>Эффект:</strong> Вы зажигаете благовония внутри кадила и они горят 1 час. В течение этого времени, пока вы держите курильницу, вы получаете бонус предмета +1 к проверкам Религии и любые критические провалы при @UUID[Compendium.pf2e.actionspf2e.Item.d9gbpiQjChYDYA2L]{Расшифровке текста} религиозной природы становятся просто провалами.</p><p>@UUID[Compendium.pf2e.equipment-effects.Item.lO95TwgihBdTilAB]</p>`
    },

    {
        ...gear(source.GMCore.key, 1109, 'Волшебная палочка продолжения [1-го ранга] / Wand of Continuation (1st-Rank Spell)', '160G', ''),
        ...price(0, 160, 0, 0),
        nameGear: "Волшебная палочка продолжения [1-го ранга] / Wand of Continuation (1st-Rank Spell)",
        traits: ["magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта волшебная палочка увеличивает продолжительность заклинания. Жёлтые огоньки закручиваются по её поверхности пока заклинание не закончится.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]; Эта активация занимает <span class="action-glyph">2</span> если заклинанию нужно <span class="action-glyph">1</span> для сотворения, или <span class="action-glyph">3</span>, если нужно <span class="action-glyph">2</span></p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете заклинание и его продолжительность увеличивается наполовину.</p><hr /><p><strong>Требования для создания:</strong> Предоставить сотворение заклинания соответствующего ранга. Заклинание должно иметь время сотворения <span class="action-glyph">1</span> или <span class="action-glyph">2</span> и продолжительность не менее 10 минут и не более 1 часа.</p>`
    },

    {
        ...gear(source.GMCore.key, 1110, 'Волшебная палочка продолжения [2-го ранга] / Wand of Continuation (2nd-Rank Spell)', '360G', ''),
        ...price(0, 360, 0, 0),
        nameGear: "Волшебная палочка продолжения [2-го ранга] / Wand of Continuation (2nd-Rank Spell)",
        traits: ["magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта волшебная палочка увеличивает продолжительность заклинания. Жёлтые огоньки закручиваются по её поверхности пока заклинание не закончится.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]; Эта активация занимает <span class="action-glyph">2</span> если заклинанию нужно <span class="action-glyph">1</span> для сотворения, или <span class="action-glyph">3</span>, если нужно <span class="action-glyph">2</span></p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете заклинание и его продолжительность увеличивается наполовину.</p><hr /><p><strong>Требования для создания:</strong> Предоставить сотворение заклинания соответствующего ранга. Заклинание должно иметь время сотворения <span class="action-glyph">1</span> или <span class="action-glyph">2</span> и продолжительность не менее 10 минут и не более 1 часа.</p>`
    },

    {
        ...gear(source.GMCore.key, 1111, 'Волшебная палочка продолжения [3-го ранга] / Wand of Continuation (3rd-Rank Spell)', '700G', ''),
        ...price(0, 700, 0, 0),
        nameGear: "Волшебная палочка продолжения [3-го ранга] / Wand of Continuation (3rd-Rank Spell)",
        traits: ["magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта волшебная палочка увеличивает продолжительность заклинания. Жёлтые огоньки закручиваются по её поверхности пока заклинание не закончится.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]; Эта активация занимает <span class="action-glyph">2</span> если заклинанию нужно <span class="action-glyph">1</span> для сотворения, или <span class="action-glyph">3</span>, если нужно <span class="action-glyph">2</span></p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете заклинание и его продолжительность увеличивается наполовину.</p><hr /><p><strong>Требования для создания:</strong> Предоставить сотворение заклинания соответствующего ранга. Заклинание должно иметь время сотворения <span class="action-glyph">1</span> или <span class="action-glyph">2</span> и продолжительность не менее 10 минут и не более 1 часа.</p>`
    },

    {
        ...gear(source.GMCore.key, 1112, 'Волшебная палочка продолжения [4-го ранга] / Wand of Continuation (4th-Rank Spell)', '1500G', ''),
        ...price(0, 1500, 0, 0),
        nameGear: "Волшебная палочка продолжения [4-го ранга] / Wand of Continuation (4th-Rank Spell)",
        traits: ["magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта волшебная палочка увеличивает продолжительность заклинания. Жёлтые огоньки закручиваются по её поверхности пока заклинание не закончится.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]; Эта активация занимает <span class="action-glyph">2</span> если заклинанию нужно <span class="action-glyph">1</span> для сотворения, или <span class="action-glyph">3</span>, если нужно <span class="action-glyph">2</span></p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете заклинание и его продолжительность увеличивается наполовину.</p><hr /><p><strong>Требования для создания:</strong> Предоставить сотворение заклинания соответствующего ранга. Заклинание должно иметь время сотворения <span class="action-glyph">1</span> или <span class="action-glyph">2</span> и продолжительность не менее 10 минут и не более 1 часа.</p>`
    },

    {
        ...gear(source.GMCore.key, 1113, 'Волшебная палочка продолжения [5-го ранга] / Wand of Continuation (5th-Rank Spell)', '3000G', ''),
        ...price(0, 3000, 0, 0),
        nameGear: "Волшебная палочка продолжения [5-го ранга] / Wand of Continuation (5th-Rank Spell)",
        traits: ["magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта волшебная палочка увеличивает продолжительность заклинания. Жёлтые огоньки закручиваются по её поверхности пока заклинание не закончится.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]; Эта активация занимает <span class="action-glyph">2</span> если заклинанию нужно <span class="action-glyph">1</span> для сотворения, или <span class="action-glyph">3</span>, если нужно <span class="action-glyph">2</span></p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете заклинание и его продолжительность увеличивается наполовину.</p><hr /><p><strong>Требования для создания:</strong> Предоставить сотворение заклинания соответствующего ранга. Заклинание должно иметь время сотворения <span class="action-glyph">1</span> или <span class="action-glyph">2</span> и продолжительность не менее 10 минут и не более 1 часа.</p>`
    },

    {
        ...gear(source.GMCore.key, 1114, 'Волшебная палочка продолжения [6-го ранга] / Wand of Continuation (6th-Rank Spell)', '6500G', ''),
        ...price(0, 6500, 0, 0),
        nameGear: "Волшебная палочка продолжения [6-го ранга] / Wand of Continuation (6th-Rank Spell)",
        traits: ["magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта волшебная палочка увеличивает продолжительность заклинания. Жёлтые огоньки закручиваются по её поверхности пока заклинание не закончится.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]; Эта активация занимает <span class="action-glyph">2</span> если заклинанию нужно <span class="action-glyph">1</span> для сотворения, или <span class="action-glyph">3</span>, если нужно <span class="action-glyph">2</span></p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете заклинание и его продолжительность увеличивается наполовину.</p><hr /><p><strong>Требования для создания:</strong> Предоставить сотворение заклинания соответствующего ранга. Заклинание должно иметь время сотворения <span class="action-glyph">1</span> или <span class="action-glyph">2</span> и продолжительность не менее 10 минут и не более 1 часа.</p>`
    },

    {
        ...gear(source.GMCore.key, 1115, 'Волшебная палочка продолжения [7-го ранга] / Wand of Continuation (7th-Rank Spell)', '15000G', ''),
        ...price(0, 15000, 0, 0),
        nameGear: "Волшебная палочка продолжения [7-го ранга] / Wand of Continuation (7th-Rank Spell)",
        traits: ["magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта волшебная палочка увеличивает продолжительность заклинания. Жёлтые огоньки закручиваются по её поверхности пока заклинание не закончится.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]; Эта активация занимает <span class="action-glyph">2</span> если заклинанию нужно <span class="action-glyph">1</span> для сотворения, или <span class="action-glyph">3</span>, если нужно <span class="action-glyph">2</span></p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете заклинание и его продолжительность увеличивается наполовину.</p><hr /><p><strong>Требования для создания:</strong> Предоставить сотворение заклинания соответствующего ранга. Заклинание должно иметь время сотворения <span class="action-glyph">1</span> или <span class="action-glyph">2</span> и продолжительность не менее 10 минут и не более 1 часа.</p>`
    },

    {
        ...gear(source.GMCore.key, 1116, 'Волшебная палочка продолжения [8-го ранга] / Wand of Continuation (8th-Rank Spell)', '40000G', ''),
        ...price(0, 40000, 0, 0),
        nameGear: "Волшебная палочка продолжения [8-го ранга] / Wand of Continuation (8th-Rank Spell)",
        traits: ["magical", "wand"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "held-in-one-hand",
        description: `<p>Эта волшебная палочка увеличивает продолжительность заклинания. Жёлтые огоньки закручиваются по её поверхности пока заклинание не закончится.</p><hr /><p><strong>Активация:</strong> @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]; Эта активация занимает <span class="action-glyph">2</span> если заклинанию нужно <span class="action-glyph">1</span> для сотворения, или <span class="action-glyph">3</span>, если нужно <span class="action-glyph">2</span></p><p><strong>Частота:</strong> Раз в день, плюс перегрузка</p><p><strong>Эффект:</strong> Вы сотворяете заклинание и его продолжительность увеличивается наполовину.</p><hr /><p><strong>Требования для создания:</strong> Предоставить сотворение заклинания соответствующего ранга. Заклинание должно иметь время сотворения <span class="action-glyph">1</span> или <span class="action-glyph">2</span> и продолжительность не менее 10 минут и не более 1 часа.</p>`
    },

    {
        ...gear(source.GMCore.key, 1117, 'Камень эонов [Отсрачивающий] / Aeon Stone (Delaying)', '350G', ''),
        ...price(0, 350, 0, 0),
        nameGear: "Камень эонов [Отсрачивающий] / Aeon Stone (Delaying)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "uncommon",
        weight: 0,
        usage: "worn",
        description: `<p>На протяжении тысячелетий эти загадочные, искусно ограненные драгоценные камни хранили мистики и фанатики, надеясь разгадать их секреты. Несмотря на огромное количество форм и функций, эти камни якобы являются фрагментами кристаллических инструментов, использовавшихся потусторонними сущностями для создания Вселенной в первородные времена.</p><p>Когда вы инвестируете один из этих кристаллов точной формы, камень вращается вокруг вашей головы, а не носится на теле. Вы можете спрятать <em>камень эонов</em> действием @UUID[Compendium.pf2e.actionspf2e.Item.pvQ5rY2zrtPI614F]{Взаимодействовать}, а кружащийся вокруг камень можно выхватить из воздуха успешным действием @UUID[Compendium.pf2e.actionspf2e.Item.Dt6B1slsBy8ipJu9]{Разоружение} против вас. Убранный или снятый камень остается инвестированным, но его эффекты подавляются, пока вы не вернете его на орбиту вокруг вашей головы.</p><p>Существуют различные типы <em>камней эонов</em>, каждый из которых имеет свой внешний вид и магический эффект. Каждый <em>камень эона</em> также приобретает силу резонанса, если поместить его в специальный магический предмет, называемый @UUID[Compendium.pf2e.equipment-srd.Item.gbwr57aT9ou8yKWT].</p><hr /><p>Когда вы умираете в состоянии @UUID[Compendium.pf2e.conditionitems.Item.yZRUzMqrMmfLu0V1], этот гладкий розовый камень автоматически активируется и снизит значение вашего состояния @Condition[Dying]{при смерти} на 1 меньше, при котором вы бы обычно не умерли (обычно @Condition[Dying]{при смерти} 3). Потом этот камень навсегда превращается в @UUID[Compendium.pf2e.equipment-srd.Item.CVTbxCY85nLoHYuw]. Вы можете получить преимущество от этой возможности только раз в день, даже если имеете несколько таких камней.</p><p>Сила резонанса позволяет вам 1 раз в день сотворять @UUID[Compendium.pf2e.spells-srd.Item.rfZpqmj0AIIdkVIs], как врождённое сакральное заклинание.</p>`
    },

    {
        ...gear(source.GMCore.key, 1118, 'Браслеты силы [Превосходные] / Bands of Force (Major)', '70000G', ''),
        ...price(0, 70000, 0, 0),
        nameGear: "Браслеты силы [Превосходные] / Bands of Force (Major)",
        traits: ["force", "invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "wornbracers",
        description: `<p>Украшенные прозрачными драгоценными камнями, эти толстые металлические браслеты распространяют по вашему телу несгибаемый слой силы. Сила дает вам бонус предмета +3 к КБ и спасброскам, и имеют максимальный модификатор Ловкости +5. Вы можете присоединять к ним талисманы, как будто они являются лёгким доспехом.</p><hr /><p><strong>Активация—Возвратная сила:</strong><span class="action-glyph">R</span> (@Trait[Manipulate]{воздействие}, @Trait[Force]{сила})</p><p><strong>Триггер:</strong> Существо критически промахивается по вам "Ударом" ближнего боя</p><p><strong>Эффект:</strong> Вы @UUID[Compendium.pf2e.actionspf2e.Item.7blmbDrQFNfdT731]{Толкаете} существо, используя модификатор Атлетики наручей [[/r d20+33]]{+33}.</p>`
    },

    {
        ...gear(source.GMCore.key, 1119, 'Плащ незаметности [Отличный] / Clandestine Cloak (Greater)', '900G', ''),
        ...price(0, 900, 0, 0),
        nameGear: "Плащ незаметности [Отличный] / Clandestine Cloak (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "uncommon",
        weight: 0.1,
        usage: "worncloak",
        description: `<p>Когда вы накидываете капюшон этого невзрачного серого плаща (действием @UUID[Compendium.pf2e.actionspf2e.Item.pvQ5rY2zrtPI614F]{Взаимодействовать}), вы становитесь невзрачным и неинтересным, получая бонус предмета +2 к проверкам Скрытности и проверкам Обмана, чтобы @UUID[Compendium.pf2e.actionspf2e.Item.AJstokjdG6iDjVjE]{Перевоплотиться} в непримечательного персонажа второго плана, такого как слуга, но также получая штраф предмета −1 к проверкам Дипломатии и Запугивания.</p><hr /><p><strong>Активация—Скрыть личность:</strong><span class="action-glyph">2</span> (@Trait[Manipulate]{воздействие}, @Trait[Concentrate]{концентрация})</p><p><strong>Частота:</strong> Раз в день</p><p><strong>Эффект:</strong> Вы накидываете капюшон плаща и получаете преимущества @UUID[Compendium.pf2e.spells-srd.Item.EoKBlgf6Smt8opaU] 5-го ранга на 8 часов или до тех пор, пока не снимете капюшон, в зависимости от того, что произойдёт раньше.</p>`
    },

    {
        ...gear(source.GMCore.key, 1120, 'Ботинки смельчака [Отличные] / Daredevil Boots (Greater)', '14000G', ''),
        ...price(0, 14000, 0, 0),
        nameGear: "Ботинки смельчака [Отличные] / Daredevil Boots (Greater)",
        traits: ["invested", "magical"],
        category: "misc",
        rarity: "common",
        weight: 0.1,
        usage: "wornshoes",
        description: `<p>Эти ярко окрашенные ботинки на мягкой подошве мотивируют вас выполнять рискованные трюки и придают вам ловкость, необходимую для успеха. Ботинки дают вам бонус предмета +3 к проверкам Акробатики и бонус обстоятельства +2 к проверкам @UUID[Compendium.pf2e.actionspf2e.Item.21WIfSu7Xd7uKqV8]{Проскочить} пространство противника.</p><p>Ботинки могут цепляться за твердые поверхности и помогать избежать падения, позволяя вам использовать реакцию @UUID[Compendium.pf2e.actionspf2e.Item.3yoajuKjwHZ9ApUY]{Схватиться за уступ}, даже если ваши руки заняты. Вы считаете падения на 10 футов короче, или если у вас есть способность @UUID[Compendium.pf2e.feats-srd.Item.LQw0yIMDUJJkq1nD]{Кошачье падение}, то для определения преимуществ этой способности, считайте свой уровень мастерства Акробатики на одну степень выше. Если у вас есть <em>"Кошачье падение"</em> и вы уже легенда Акробатики, то можете выбирать скорость своего падения, от 60 футов за раунд до обычной скорости падения.</p><hr /><p><strong>Активация—Импульс смельчака:</strong><span class="action-glyph">2</span> (@Trait[Concentrate]{концентрация})</p><p><strong>Частота:</strong> Раз в день</p><p><strong>Эффект:</strong> Ботинки сотворяют на вас @UUID[Compendium.pf2e.spells-srd.Item.aqRYNoSvxsVfqglH].</p>`
    }

]

module.exports = [
    ...playerCore,

];
