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


// =========================
// Source
// =========================

// Функция для безопасного добавления source
const sourceMod = (sourceKey) => ({
    source: {
        ...(source[sourceKey] || { key: sourceKey, book: "Нет в источнике" }),
    },
});


// =========================
// Traits
// =========================

function translateTraits(traits = []) {

    if (!Array.isArray(traits))
        return traits;

    return traits.map(t =>
        (traitMap[t] ?? t)
            .replace(/^\p{Lu}/u, c => c.toLowerCase())
    );
}


// =========================
// Glyphs
// =========================

const glyphs = {
    "Action 1": "action_single",
    "Action 2": "action_double",
    "Action 3": "action_triple",
    "Reaction": "action_reaction",
    "FreeAction": "action_free",
};


// =========================
// Description converter
// =========================

function convertDescription(text = "") {

    if (!text)
        return "";


    return text

        // Удаляем ссылки на эффекты
        .replace(
            /@UUID\[Compendium\.[^\]]*effects[^\]]+\](?:\{[^}]+\})?/gi,
            ""
        )


        // UUID
        .replace(
            /@UUID\[[^\]]+\]\{([^}]+)\}/g,
            "$1"
        )

        .replace(
            /@UUID\[[^\]]+\]/g,
            ""
        )


        // Inline rolls
        .replace(
            /\[\[\/[^\]]+\]\]\{([^}]+)\}/g,
            "$1"
        )


        // Traits
        .replace(
            /@Trait\[([^\]]+)\](?:\{([^}]+)\})?/gi,
            (_, slug, label) => {

                if (label)
                    return label;


                const translated =
                    traitMap[slug.toLowerCase()] ??
                    slug;


                return translated.replace(
                    /^\p{Lu}/u,
                    c => c.toLowerCase()
                );
            }
        )


        // Checks
        .replace(
            /@Check\[([^\]]+)\](?:\{([^}]+)\})?/g,
            (_, params, label) => {

                const parts = params.split("|");


                const names = {
                    fortitude: "Стойкость",
                    reflex: "Рефлекс",
                    will: "Воля",
                    perception: "Внимательность"
                };


                let result =
                    label ??
                    names[parts[0]] ??
                    parts[0];


                const dc = parts.find(
                    x => x.startsWith("dc:")
                );


                if (dc)
                    result += ` СЛ ${dc.substring(3)}`;


                if (parts.includes("basic"))
                    result = "Базовый спасбросок " + result;
                else
                    result = "спасбросок " + result;


                return result;
            }
        )


        // Templates
        .replace(
            /@Template\[([^\]]+)\](?:\{([^}]+)\})?/g,
            (_, params, label) => {


                if (label)
                    return label;


                const obj = Object.fromEntries(
                    params
                        .split("|")
                        .map(v => v.split(":"))
                );


                const types = {
                    burst: "взрыв",
                    cone: "конус",
                    line: "линия",
                    emanation: "эманация"
                };


                return `${obj.distance ?? ""} футов ${types[obj.type] ?? obj.type}`
                    .trim();

            }
        )


        // Actions glyph
        .replace(
            /@Glyph\[(.*?)\]/g,
            (_, glyph) => {

                const file = glyphs[glyph];

                if (!file)
                    return glyph;


                return `<img src="/img/icon/${file}.png" class="action-glyph" alt="${glyph}">`;
            }
        )


        // Actions
        .replace(
            /@Action\[([^\]]+)\]/g,
            "$1"
        )


        // Localize
        .replace(
            /@Localize\[([^\]]+)\]/g,
            "$1"
        )


        // Roll
        .replace(
            /@Roll\[([^\]]+)\]/g,
            "$1"
        )


        // Unknown foundry tags
        .replace(
            /@[A-Za-z]+\[[^\]]+\](?:\{([^}]+)\})?/g,
            (_, label) => label ?? ""
        )


        // Foundry original text
        .replace(
            /<details>[\s\S]*?<\/details>/g,
            ""
        );
}


// =========================
// JSON loader
// =========================

// =========================
// JSON loader
// =========================

function loadAllJSONFromFolder(folder) {

    const dirPath = path.join(__dirname, folder);


    if (!fs.existsSync(dirPath)) {

        console.error(
            `Папка ${dirPath} не найдена`
        );

        return [];
    }


    const wantedFiles = [
        'features.json'
    ];


    const files = fs.readdirSync(dirPath)
        .filter(f => f.endsWith('.json'))
        .filter(f => wantedFiles.includes(f));


    let allFeatures = [];


    files.forEach(file => {

        const filePath =
            path.join(dirPath, file);


        const json =
            JSON.parse(
                fs.readFileSync(
                    filePath,
                    'utf8'
                )
            );



        const sourceKey =
            path.basename(
                file,
                '.json'
            );


        const modified =
            json.map(feature => ({

                // сохраняем все поля как есть
                ...feature,


                // переводим traits
                traits:
                    translateTraits(
                        feature.traits ?? []
                    ),


                // конвертируем описание
                description:
                    convertDescription(
                        feature.description ?? ""
                    ),


                // добавляем источник
                ...sourceMod(
                    feature.sourceKey ||
                    feature.source ||
                    sourceKey
                )

            }));




        allFeatures =
            allFeatures.concat(
                modified
            );

    });


    return allFeatures;
}



// =========================
// Export
// =========================

const featureRepository =
    loadAllJSONFromFolder('.');

module.exports = featureRepository;