export function rollDiceFormula(formula) {
    // пример: "2d6+3"
    const match = formula.match(/(\d*)d(\d+)([+-]\d+)?/);

    if (!match) {
        return { total: 0, rolls: [] };
    }

    const count = parseInt(match[1] || 1);
    const sides = parseInt(match[2]);
    const modifier = parseInt(match[3] || 0);

    const rolls = [];

    for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }

    const total = rolls.reduce((a, b) => a + b, 0) + modifier;

    return { rolls, total };
}