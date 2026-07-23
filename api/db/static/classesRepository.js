const { source } = require('./_sourcesRepository');
const traitRepository = require('./traitRepository');
const classes = require('./classesGenerated');


// ---------------------
// Traits
// ---------------------

const traitMap = Object.fromEntries(
    traitRepository.map(t => [
        t.nameEng.toLowerCase().replace(/\s+/g, "-"),
        t.key
    ])
);


// ---------------------
// Source
// ---------------------

const sourceMod = (sourceKey) => ({
    source: {
        ...(source[sourceKey] || {
            key: sourceKey,
            book: "Нет в источнике"
        })
    }
});


// ---------------------
// Glyphs
// ---------------------

const glyphs = {
    "Action 1": "action_single",
    "Action 2": "action_double",
    "Action 3": "action_triple",
    "Reaction": "action_reaction",
    "FreeAction": "action_free",
};


// ---------------------
// Traits
// ---------------------

function translateTraits(traits = []) {

    return traits.map(t =>
        (
            traitMap[t] ?? t
        )
            .replace(/^\p{Lu}/u, c => c.toLowerCase())
    );

}



// ---------------------
// Description
// ---------------------

function convertDescription(text = "") {

    if (!text)
        return text;


    return text

        // UUID effects
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


        // Traits

        .replace(
            /@Trait\[([^\]]+)\](?:\{([^}]+)\})?/gi,

            (_, slug, label) => {

                if (label)
                    return label;


                const translated =
                    traitMap[slug.toLowerCase()]
                    ??
                    traitMap[slug]
                    ??
                    slug;


                return translated
                    .replace(/^\p{Lu}/u, c => c.toLowerCase());

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
                    label
                    ??
                    names[parts[0]]
                    ??
                    parts[0];


                const dc =
                    parts.find(x => x.startsWith("dc:"));


                if (dc)
                    result += ` СЛ ${dc.substring(3)}`;


                if (parts.includes("basic"))
                    result = "Базовый спасбросок " + result;
                else
                    result = "спасбросок " + result;


                return result;

            }
        )


        // Glyph

        .replace(
            /@Glyph\[(.*?)\]/g,

            (_, glyph) => {

                const file = glyphs[glyph];

                if (!file)
                    return glyph;


                return `<img src="/img/icon/${file}.png" class="action-glyph" alt="${glyph}">`;

            }
        )


        // Action

        .replace(
            /@Action\[([^\]]+)\]/g,
            "$1"
        )


        // Localize

        .replace(
            /@Localize\[([^\]]+)\]/g,
            "$1"
        )


        // неизвестные Foundry ссылки

        .replace(
            /@[A-Za-z]+\[[^\]]+\](?:\{([^}]+)\})?/g,
            (_, label) => label ?? ""
        )


        // оригинал Foundry

        .replace(
            /<details>[\s\S]*?<\/details>/g,
            "");

}



// ---------------------
// Normalize classes
// ---------------------

const classesRepository = classes.map(cls => ({


    ...cls,


    // source
    ...sourceMod(
        cls.sourceKey
        ||
        "Pathfinder Player Core 2"
    ),


    // traits
    trait:
        translateTraits(
            cls.trait || []
        ),


    // descriptions

    description:

        Array.isArray(cls.description)

            ?

            cls.description.map(block => ({

                ...block,

                text:
                    convertDescription(block.text)

            }))

            :

            convertDescription(
                cls.description
            )


}));


module.exports = classesRepository;