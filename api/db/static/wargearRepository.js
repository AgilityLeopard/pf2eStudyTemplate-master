const { source } = require('./_sourcesRepository');
const fs = require('fs');
const path = require('path');

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

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
    let allItems = [];

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (!fs.existsSync(filePath)) return;

        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const sourceKey = path.basename(file, '.json'); // имя файла без расширения

        const modified = json.map(item => ({
            ...item,
            ...sourceMod(item.sourceKey || sourceKey),
        }));

        allItems = allItems.concat(modified);
    });

    console.log(`✅ Загружено ${allItems.length} предметов из ${files.length} файлов`);
    return allItems;
}

// Загружаем все JSON из текущей папки
const wargearRepository = loadAllJSONFromFolder('.');

module.exports = wargearRepository;
