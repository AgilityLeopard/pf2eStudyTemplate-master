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
        // ...meleez(undefined,2,2,0,0),
        ...price(0, 9, 0, 0),
        nameGear: "Короткий меч",
        traits: ["быстрое", "точное", "универсальное рубящий"],
        type: "melee",
        category: "martial",
        weigthL: 1,
        // price: "9S",
        damage: "1d6",
        typeDamage: "piercing",
        rarity: "common",
        hands: 1,
        group: "sword",
        description: "Эти клинки бывают разных форм и стилей, но они обычно 2 фута длиной."
    },
    {
        ...gear(source.playerCore.key, 211, 'Composite Longbow', '2C', 'Blade,[Any]'),
        // ...meleez(undefined,2,2,0,0),
        ...price(0, 20, 0, 0),
        nameGear: "Композитный длинный лук",
        traits: ["залповое 30фт", "смертельное d10", "тяговое"],
        type: "ranged",
        category: "martial",
        // price: "20G",
        weight: 2,
        damage: "1d8",
        typeDamage: "piercing",
        rarity: "common",
        hands: 2,
        group: "bow",
        description: "Это дистанционное оружие сделано из рога, дерева и сухожилий, соединенных вместе, чтобы увеличить мощность натяжения и силу его снаряда. Как и у всех длинных луков, его большой размер увеличивает дальность и мощность. Чтобы стрелять, вы должны использовать две руки и он не может быть использован верхом на скакуне."
    },

    {
        ...gear(source.playerCore.key, 211, 'Elven Curve Blade', '2C', 'Blade,[Any]'),
        // ...meleez(undefined,2,2,0,0),
        ...price(0, 4, 0, 0),
        nameGear: "Эльфийская сабля",
        traits: ["силовое", "точное", "эльф"],
        type: "melee",
        category: "martial",
        // price: "20G",
        weight: 2,
        damage: "1d8",
        typeDamage: "slashing",
        rarity: "uncommon",
        hands: 2,
        group: "sword",
        description: "По сути, это удлиненная версия скимитара, традиционное эльфийское оружие имеет более тонкий клинок, чем его двоюродный брат."
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
    }
]

module.exports = [
    ...playerCore,

];
