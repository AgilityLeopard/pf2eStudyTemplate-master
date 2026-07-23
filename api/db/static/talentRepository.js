const { source } = require('./_sourcesRepository');
const fs = require('fs');
const path = require('path');
const traitRepository = require('./traitRepository');
// Функция для безопасного добавления source
const sourceMod = (sourceKey) => ({
    source: {
        ...(source[sourceKey] || { key: sourceKey, book: 'Unknown Source' }),
    },
});

const traitMap = Object.fromEntries(
    traitRepository.map(t => [
        t.nameEng.toLowerCase().replace(/\s+/g, "-"),
        t.key
    ])
);

const glyphs = {
    "Action 1": "action_single",
    "Action 2": "action_double",
    "Action 3": "action_triple",
    "Reaction": "action_reaction",
    "FreeAction": "action_free",
};

function convertDescription(text = "") {
    return text
        .replace(/@UUID\[Compendium\.[^\]]*effects[^\]]+\](?:\{[^}]+\})?/gi, "")
        // UUID
        .replace(/@UUID\[[^\]]+\]\{([^}]+)\}/g, "$1")
        .replace(/@UUID\[[^\]]+\]/g, "")
        .replace(/\[\[\/[^\]]+\]\]\{([^}]+)\}/g, "$1")
        // Traits
        .replace(/@Trait\[([^\]]+)\](?:\{([^}]+)\})?/gi, (_, slug, label) => {
            if (label) return label;

            const translated =
                traitMap[slug.toLowerCase()] ??
                traitMap[slug] ??
                slug;

            return translated.replace(/^\p{Lu}/u, c => c.toLowerCase());
        })

        .replace(/@Check\[([^\]]+)\](?:\{([^}]+)\})?/g, (_, params, label) => {
            const parts = params.split("|");

            const names = {
                fortitude: "Стойкость",
                reflex: "Рефлекс",
                will: "Воля",
                perception: "Внимательность"
            };

            const type = parts[0];

            // Если Foundry уже передал нужную форму — используем её
            let text = label ?? (names[type] ?? type);

            const dc = parts.find(x => x.startsWith("dc:"));
            if (dc) text += ` СЛ ${dc.substring(3)}`;

            if (parts.includes("basic"))
                text = "Базовый спасбросок " + text;
            else
                text = "спасбросок " + text;

            return text;
        })

        // Templates
        .replace(/@Template\[([^\]]+)\](?:\{([^}]+)\})?/g,
            (_, params, label) => {

                if (label)
                    return label;

                const obj = Object.fromEntries(
                    params.split("|").map(v => v.split(":"))
                );

                const types = {
                    burst: "взрыв",
                    cone: "конус",
                    line: "линия",
                    emanation: "эманация"
                };

                return `${obj.distance ?? ""} футов ${types[obj.type] ?? obj.type}`.trim();
            })

        // Damage
        .replace(/@Damage\[([^\]]+)\]/g, (_, damage) => {
            return damage.replace(/\[([^\]]+)\]/g, (_, tags) => {
                return " " + tags
                    .split(",")
                    .map(t => damageTypes[t.trim()] ?? t.trim())
                    .join(" ");
            });
        })
        .replace(
            /(\d+d\d+(?:\+\d+)?)(\[([^\]]+)\])/gi,
            (_, dice, __, tags) => {
                return (
                    dice +
                    " " +
                    tags
                        .split(",")
                        .map(t => damageTypes[t.trim()] ?? t.trim())
                        .join(" ")
                );
            }
        )

        // Roll
        .replace(/@Roll\[([^\]]+)\]/g, "$1")

        .replace(/@Glyph\[(.*?)\]/g, (_, glyph) => {
            const file = glyphs[glyph];

            if (!file) return glyph;

            return `<img src="/img/icon/${file}.png" class="action-glyph" alt="${glyph}">`;
        })

        // Action
        .replace(/@Action\[([^\]]+)\]/g, "$1")

        // Localize
        .replace(/@Localize\[([^\]]+)\]/g, "$1")

        // Всё неизвестное
        .replace(/@[A-Za-z]+\[[^\]]+\](?:\{([^}]+)\})?/g, (_, label) => label ?? "")
        .replace(/<details>[\s\S]*?<\/details>/g, "");
}

const damageTypes = {
    weaponDamage: "физический от оружия",
    piercing: "колющий",
    slashing: "режущий",
    bludgeoning: "дробящий",
    fire: "огонь",
    acid: "кислота",
    electricity: "электричество",
    vitality: "жизненность",
    force: "сила",
    void: "пустота",
    sonic: "звук",
    cold: "холод",
    spirit: "дух",
    mental: "ментальный",
    poison: "яд",
    bleed: "кровотечение",
    precision: "точный",
    persistent: "продолжительный"
};

function translateTraits(traits = []) {
    return traits.map(t =>
        (traitMap[t] ?? t).replace(/^\p{Lu}/u, c => c.toLowerCase())
    );
}


// Функция для загрузки всех JSON из папки
function loadAllJSONFromFolder(folder) {
    const dirPath = path.join(__dirname, folder);
    if (!fs.existsSync(dirPath)) {
        console.error(`Папка ${dirPath} не найдена`);
        return [];
    }
    const wantedFiles = ['feats.json'];
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json')).filter(f => wantedFiles.includes(f));;
    let allItems = [];

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const json1 = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (!fs.existsSync(filePath)) return;

        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const sourceKey = path.basename(file, '.json'); // имя файла без расширения

        const modified = json.map(item => ({

            ...item,
            traits: translateTraits(item.traits),
            description: convertDescription(item.description),
            ...sourceMod(item.system?.publication?.title || sourceKey),
        }));

        allItems = allItems.concat(modified);
    });


    return allItems;
}

// Загружаем все JSON из текущей папки
const wargearRepository = loadAllJSONFromFolder('.');

module.exports = wargearRepository;
