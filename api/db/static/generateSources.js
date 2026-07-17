const fs = require("fs");
const path = require("path");

// Папка с json
const root = __dirname;

const sourceKeys = new Set();

function walk(dir) {
    for (const file of fs.readdirSync(dir, { withFileTypes: true })) {

        const full = path.join(dir, file.name);

        if (file.isDirectory()) {
            walk(full);
            continue;
        }

        if (!file.name.endsWith(".json")) continue;

        try {
            const json = JSON.parse(fs.readFileSync(full, "utf8"));

            if (!Array.isArray(json)) continue;

            for (const item of json) {

                if (!item.sourceKey) continue;

                sourceKeys.add(item.sourceKey);
            }

        } catch {
            // пропускаем битые json
        }
    }
}

walk(root);

const sorted = [...sourceKeys].sort((a, b) => a.localeCompare(b));

let output = "const source = {\n\n";

for (const key of sorted) {

    const safeKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
        ? key
        : `"${key}"`;

    output += `  ${safeKey}: {\n`;
    output += `    book: ${JSON.stringify(key)},\n`;
    output += `    key: ${JSON.stringify(key)},\n`;
    output += `    version: "v0",\n`;
    output += `    link: "",\n`;
    output += `    group: ""\n`;
    output += `  },\n\n`;
}

output += "};\n\nexport {source,}; ";

const outFile = path.join(__dirname, "_sourcesRepository.js");

fs.writeFileSync(outFile, output, "utf8");

console.log(`Найдено ${sorted.length} источников.`);
console.log(`Файл сохранён: ${outFile}`);