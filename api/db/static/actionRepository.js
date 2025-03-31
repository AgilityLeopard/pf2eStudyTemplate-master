import { source } from "./_sourcesRepository";

const sourceMod = function (
    sourceKey,
) {
    return {
        source: {
            ...source[sourceKey],
        },

    };
};

const playerCore = [{
    ...sourceMod("playerCore2"),
    key: "Rage",
    description: "<p><strong>Требования</strong>: Вы не в ярости или не имеет состояние <span class=\"c-fatigued\">утомлен</span></p>\n<hr class=\"docutils\">\n<p>Вы обращаетесь к своему внутреннему гневу и начинаете бушевать.\nВы получаете временные ОЗ в количестве, равном вашему уровню + модификатор Телосложения.\nЭта ярость длится 1 минуту, пока не останется врагов, которых вы можете ощущать, или пока вы не потеряете сознание, в зависимости от того, что произойдет раньше.\nКогда вы в ярости:</p>\n<ul class=\"simple\">\n<li><p>Вы наносите 2 дополнительного урона <button data-id=\"https://pf2e-ru-translation.readthedocs.io/ru/latest/playing_the_game.html#action-strike\" data-name=\"Ударами (Strikes)\">Ударами (Strikes)</button> ближнего боя. Этот дополнительный урон делится пополам, если ваше оружие или безоружная атака имеет признак <span class=\"w-agile\">быстрое</span>.</p></li>\n<li><p>Вы получаете штраф -1 к КБ</p></li>\n<li><p>Вы не можете использовать действия с признаком <span class=\"t-concentrate\">концентрация</span>, кроме тех, у которых еще есть признак <span class=\"t-rage\">ярость</span>. Во время ярости вы можете использовать <button data-id=\"https://pf2e-ru-translation.readthedocs.io/ru/latest/playing_the_game.html#action-seek\" data-name=\"Поиск (Seek) \">Поиск (Seek) </button>.</p></li>\n</ul>\n<p>После прекращения ярости, вы теряете любые временные ОЗ оставшиеся от \"Ярости\" и не можете впадать в нее снова в течение 1 минуты.</p>",
    aon_url: "https://2e.aonprd.com/Actions.aspx?ID=3",
    source: [
        "Player Core 2"
    ],
    name: "Ярость",
    nameEng: "Rage",
    action: [
        "одиночное действие"
    ],
    trait: [
        "варвар",
        "концентрация",
        "эмоция",
        "ментальный"
    ],
    rarity: "common"
},
{
    ...sourceMod("playerCore2"),
    key: "QuickTempered",
    description: "<p><strong>Триггер</strong>: Вы бросаете инициативу.</p>\n<p><strong>Требования</strong>: Вы не <span class=\"c-encumbered\">перегружены</span> и не носите тяжёлые доспехи.</p>\n<hr class=\"docutils\">\n<p>Пока вы можете свободно двигаться, ваша ярость вспыхивает мгновенно. Вы используете действие <button data-id=\"https://2e.aonprd.com/Actions.aspx?ID=2802\" data-name=\"Ярость (Rage)\">Ярость (Rage)</button>.</p>",
    aon_url: "https://2e.aonprd.com/Actions.aspx?ID=2803",

    name: "Вспыльчивость",
    nameEng: "Quick-Tempered",
    action: ["свободное действие"],
    trait: ["варвар"],
    rarity: "common"
}
]


module.exports = [...playerCore];