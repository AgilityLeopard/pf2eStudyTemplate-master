import { source } from "./_sourcesRepository";
import { ATTRIBUTES, SKILLS, TRAITS } from "./_statUtils";

const stringToKebab = function (text) {
    return text.toLowerCase().replace(/\W/gm, "-");
};

const kebabToCamel = function (slug) {
    return slug.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
};

const stringToKebabToCamel = function (text) {
    const slug = stringToKebab(text);
    return kebabToCamel(slug);
};

const addModifier = function (
    targetGroup,
    targetValue,
    modifier = 0,
    rank = 0,
    condition = undefined
) {
    return {
        targetGroup,
        targetValue,
        modifier,
        rank,
        condition,
    };
};

const background = function (text, plusOne, type) {
    const parts = text.split(": ");
    const title = parts[0];
    const snippet = parts[1];
    const modification =
        plusOne === "[ANY] Keyword"
            ? { targetGroup: "keywords", targetValue: "[Any]" }
            : {
                targetGroup: "traits",
                targetValue: stringToKebabToCamel(plusOne),
                modifier: 1,
            };
    return {
        key: `${stringToKebab(title)}`,
        title,
        snippet,
        plusOne,
        type,
        modification,
    };
};

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

const statFlaw = function (str, dex, con, int, wis, cha) {
    return {
        attributeFlaw: [
            { name: "Сила", key: "strength", value: str },
            { name: "Ловкость", key: "dexterity", value: dex },
            { name: "Телосложение", key: "constitution", value: con },
            { name: "Интеллект", key: "intellect", value: int },
            { name: "Мудрость", key: "wisdom", value: wis },
            { name: "Харизма", key: "charisma", value: cha },
        ],
    };
};

const cost = function (cost, stats = 0, species = 0, other = 0) {
    return {
        cost,
        costs: {
            total: cost,
            stats,
            species,
            other,
        },
    };
};

const sourceMod = function (
    sourceKey,
) {
    return {
        source: {
            ...source[sourceKey],
        },

    };
};

const commonNames = function (namesString) {
    return { commonNames: namesString.split(",").map((part) => part.trim()) };
};

const coreRep =
    [
        {
            ...sourceMod("playerCore"),
            key: "keen eyes",
            name: "Зоркие глаза",
            description: "Ваши глаза остры, что позволяет различать мелкие детали в скрытых или даже невидимых существах, которые другие могут пропустить. Вы получаете бонус обстоятельства +2 когда используете действие Поиск (Seek) для поиска спрятанных или необнаруженных существ в пределах 30 футов от вас. Когда вы целитесь в противника, который для вас скрыт или спрятан, снизьте КС чистой проверки до 3 для скрытой цели или до 9 для спрятанной.",
            modification:
                [
                    {
                        key: "seek",
                        group: "action",
                        bonus: 2,
                        bonusType: "circumstance",
                        snippet: "Вы получаете бонус обстоятельства +2 когда используете действие Поиск (Seek) для поиска спрятанных или необнаруженных существ в пределах 30 футов от вас."
                    },
                    {
                        key: "additional",
                        snippet: "Когда вы целитесь в противника, который для вас скрыт или спрятан, снизьте КС чистой проверки до 3 для скрытой цели или до 9 для спрятанной."
                    }
                ]
        },
        {
            ...sourceMod("playerCore"),
            key: "darkvision",
            name: "Ночное зрение",
            modification:
                [
                    {
                        key: "darkvision",
                        group: "sense",
                    },
                ],
            description: "Вы можете видеть в темноте и при тусклом свете, как если бы это был яркий свет, однако ваше зрение в темноте - черно-белое.",
        },
        {
            ...sourceMod("playerCore"),
            key: "clan dagger",
            name: "Клановый кинжал",
            description: "Вы бесплатно получаете клановый кинжал своего клана, так как он был дан вам при рождении. Продажа этого кинжала - ужасное табу, которое вызывает к вам презрение других дварфов.",

        },
        {
            ...sourceMod("playerCore"),
            key: "low-light vision",
            modification:
                [
                    {
                        key: "low-light",
                        group: "sense",
                    },
                ],
            name: "Сумеречное зрение",
            description: "Вы можете видеть при тусклом свете как если бы это был яркий свет, так что вы игнорируете состояние скрыт из-за тусклого света.",
        },
        {
            ...sourceMod("playerCore"),
            key: "Plant Nourishment",
            name: "Питание Растений",
            description: "Вы получаете питание таким же образом, как растения или грибы, которые соответствуют вашему типу тела, через некоторое сочетание фотосинтеза, поглощения минералов вашими корнями или поглощения разлагающейся материи. Обычно вам не надо платить за пищу. Если обычно вы полагаетесь на фотосинтез и обходитесь без солнечного света в течение 1 недели, то начинаете голодать. Вместо естественного солнечного света, вы можете получать питание из специальных бутылок с солнечным светом, но они стоят в 10 раз больше, чем стандартные рационы (40 см).",
        },
    ]

module.exports = [...coreRep /*, ...fspg, ...aioe, ...aaoa, ...dod, ...gohe*/];
