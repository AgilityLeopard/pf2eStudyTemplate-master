const { source } = require('./_sourcesRepository');
const fs = require('fs');
const path = require('path');
const traitRepository = require('./traitRepository');

const traitMap = Object.fromEntries(
    traitRepository.map(t => [
        t.nameEng.toLowerCase().replace(/\s+/g, "-"),
        t.key
    ])
);

// Функция для безопасного добавления source
const sourceMod = (sourceKey) => ({
    source: {
        ...(source[sourceKey] || { key: sourceKey, book: 'Unknown Source' }),
    },
});

// Функция для загрузки всех JSON из папки
function loadAllJSONFromFolder(folder) {
    const dirPath = path.join(__dirname, folder);
    if (!fs.existsSync(dirPath)) {
        console.error(`Папка ${dirPath} не найдена`);
        return [];
    }
    const wantedFiles = ['other-books-items.json'];
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json')).filter(f => wantedFiles.includes(f));;
    let allItems = [];


    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (!fs.existsSync(filePath)) return;

        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const sourceKey = path.basename(file, '.json'); // имя файла без расширения

        const modified = json.map(item => ({
            ...item,
            traits: translateTraits(item.traits),
            description: convertDescription(item.description),
            ...sourceMod(item.sourceKey || sourceKey),
        }));

        allItems = allItems.concat(modified);
    });


    return allItems;
}

function translateTraits(traits = []) {
    return traits.map(t =>
        (traitMap[t] ?? t).replace(/^\p{Lu}/u, c => c.toLowerCase())
    );
}

function convertDescription(text = "") {
    return text

        // UUID
        .replace(/@UUID\[[^\]]+\]\{([^}]+)\}/g, "$1")
        .replace(/@UUID\[[^\]]+\]/g, "")

        // Traits
        .replace(/@Trait\[([^\]]+)\](?:\{([^}]+)\})?/gi, (_, slug, label) => {
            if (label) return label;

            const translated =
                traitMap[slug.toLowerCase()] ??
                traitMap[slug] ??
                slug;

            return translated.replace(/^\p{Lu}/u, c => c.toLowerCase());
        })

        // Checks
        .replace(/@Check\[([^\]]+)\]/g, (_, params) => {
            const parts = params.split("|");

            const names = {
                fortitude: "Стойкость",
                reflex: "Реакция",
                will: "Воля",
                perception: "Восприятие"
            };

            let text = names[parts[0]] ?? parts[0];

            const dc = parts.find(x => x.startsWith("dc:"));
            if (dc) text += ` СЛ ${dc.substring(3)}`;

            if (parts.includes("basic"))
                text = "Базовый спасбросок " + text;

            return text;
        })

        // Templates
        .replace(/@Template\[([^\]]+)\]/g, (_, params) => {

            const obj = Object.fromEntries(
                params.split("|").map(v => v.split(":"))
            );

            const types = {
                burst: "взрыв",
                cone: "конус",
                line: "линия",
                emanation: "эманация"
            };

            return `${types[obj.type] ?? obj.type} ${obj.distance ?? ""} футов`.trim();
        })

        // Damage
        .replace(/@Damage\[([^\]]+)\]/g, "$1")

        // Roll
        .replace(/@Roll\[([^\]]+)\]/g, "$1")

        // Glyph
        .replace(/@Glyph\[Action 1\]/g, "1 действие")
        .replace(/@Glyph\[Action 2\]/g, "2 действия")
        .replace(/@Glyph\[Action 3\]/g, "3 действия")
        .replace(/@Glyph\[Reaction\]/g, "Реакция")
        .replace(/@Glyph\[FreeAction\]/g, "Свободное действие")

        // Action
        .replace(/@Action\[([^\]]+)\]/g, "$1")

        // Localize
        .replace(/@Localize\[([^\]]+)\]/g, "$1")

        // Всё неизвестное
        .replace(/@[A-Za-z]+\[[^\]]+\](?:\{([^}]+)\})?/g, (_, label) => label ?? "")
        .replace(/<details>[\s\S]*?<\/details>/g, "");
}
// Загружаем все JSON из текущей папки
const wargearRepository = loadAllJSONFromFolder('.');

module.exports = wargearRepository;
