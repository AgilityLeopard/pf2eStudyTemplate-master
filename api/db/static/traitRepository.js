import { source } from './_sourcesRepository';

const traitRepository =
    [
        {
            "key": "Воздух",
            "nameEng": "air",
            "desc": "Эффекты с признаком `воздух` либо манипулируют воздухом, либо воплощают воздух. Те, которые управляют воздухом, не действуют в вакууме или в области без воздуха. Существа с этим признаком состоят в основном из воздуха или обладают связью с магическим воздухом."
        },
        {
            "key": "Земля",
            "nameEng": "earth",
            "desc": "Эффекты с признаком `земля` либо манипулируют землёй, либо воплощают ее. Те, что манипулируют землёй, не имеют никакого эффекта в области без земли. Существа с этим признаком состоят в основном из земли или имеют связь с магической землёй. Планы с этой чертой в основном твёрдые, с пещерами и другими полостями."
        },
        {
            "key": "Огонь",
            "nameEng": "fire",
            "desc": "Эффекты с этим признаком наносят урон огнём или, либо создают огонь, либо манипулируют им. Те, что манипулируют огнём, не имеют эффекта в области без огня. Существа с этим признаком состоят в основном из огня или имеют связь с магическим огнём. Планы с этим признаком состоят из непрерывно горящего пламени без источника топлива. Огненные планы чрезвычайно враждебны по отношению к неогненным существам."
        },
        {
            "key": "Металл",
            "nameEng": "metal",
            "desc": "Эффекты с признаком `металл` воплощают металл либо манипулируют им. Те, которые управляют металлом, не действуют в области без металла. Существа с этим признаком состоят в основном из металла или обладают связью с магическим металлом."
        },
        {
            "key": "Вода",
            "nameEng": "water",
            "desc": "Эффекты с признаком воды либо манипулируют водой, либо вызывают ее. Те, что манипулируют водой, не действуют в местах, где нет воды. Существа с этой признаком состоят в основном из воды или имеют связь с магической водой. Планы с этой признаком в основном жидкие, возможно, с полостями пригодного для дыхания воздуха."
        },
        {
            "key": "Дерево",
            "nameEng": "wood",
            "desc": "Эффекты с признаком `дерево` либо манипулируют деревом, либо воплощают дерево. Те, которые управляют деревом, не действуют в области без дерева. Существа с этим признаком состоят в основном из дерева или обладают связью с магической древесиной."
        },
        {
            "key": "Кислота",
            "nameEng": "acid",
            "desc": "Эффекты с этим признаком наносят урон кислотой. Существа с этим признаком обладают магической связью с кислотой."
        },
        {
            "key": "Холод",
            "nameEng": "cold",
            "desc": "Эффекты с этим признаком наносят урон холодом. Существа с этим признаком имеют магическую связь с холодом."
        },
        {
            "key": "Электричество",
            "nameEng": "electricity",
            "desc": "Эффекты с этим признаком наносят урон электричеством. Существа с этим признаком обладают магической связью с электричеством."
        },
        {
            "key": "Сила",
            "nameEng": "force",
            "desc": "Эффекты с этим признаком наносят урон силой или создают объекты из чистой магической силы."
        },
        {
            "key": "Звуковой",
            "nameEng": "sonic",
            "desc": "Эффект с признаком `звук` работает только если он издает звук, значит, что он не имеет эффекта в области тишины или в вакууме. Это отличается от `слухового` эффекта, который работает только если цель может слышать его. `Звуковой` эффект может наносить урон звуком. Существо с этим признаком обладает магической связью с силой звука."
        },
        {
            "key": "Жизненность",
            "nameEng": "vitality",
            "desc": "Эффекты с этим признаком исцеляют живых существ энергией из Кузницы Созидания, наносят нежити урон жизненностью или манипулируют жизненной энергией."
        },
        {
            "key": "Пустота",
            "nameEng": "void",
            "desc": "Эффекты с этим признаком исцеляют существ-нежить пустотной энергией, наносят пустотный урон живым существам или манипулируют пустотной энергией."
        },
        {
            "key": "Святой",
            "nameEng": "holy",
            "desc": "Эффекты с признаком `святой` связаны с могущественными магическими силами благосклонности и добродетели. Они часто оказывают более сильное воздействие на нечестивых существ. Существа с этим признаком сильно преданы святым целям и часто имеют слабость к нечестивости. Если существо со слабостью к святости использует святой предмет или эффект, оно получает урон от слабости."
        },
        {
            "key": "Нечестивый",
            "nameEng": "unholy",
            "desc": "Эффекты с признаком `нечестивый` связаны с могущественными магическими силами жестокости и греха. Они часто оказывают более сильное воздействие на святых существ. Существа с этим признаком сильно преданы нечестивым целям и часто имеют слабость к святости. Если существо со слабостью к нечестивости использует нечестивый предмет или эффект, оно получает урон от слабости."
        },
        {
            "key": "Свет",
            "nameEng": "light",
            "desc": "Эффекты `света` преодолевают в области немагическую тьму и могут противодействовать магической тьме. Обычно, чтобы противодействовать тьме вы своей магией света должны напрямую выбирать целью магию тьмы, но некоторые заклинания света автоматически совершают противодействие тьме."
        },
        {
            "key": "Магический",
            "nameEng": "magical",
            "desc": "Что-либо с признаком `магический` наполнено магическими энергиями, не связанными с конкретным магическим обычаем. Некоторые предметы или эффекты тесно связаны с определённым обычаем магии. В этих случаях предмет обладает признаком `аркана`, `сакральный`, `оккультный` или `природный`, а не `магический`. Любой из этих признаков обозначает магический предмет."
        },
        {
            "key": "Ментальный",
            "nameEng": "mental",
            "desc": "Ментальный эффект может изменять сознание цели. Он не действует на объект или неразумное существо."
        },
        {
            "key": "Несмертельное",
            "nameEng": "nonlethal",
            "desc": "Атаки этим оружием несмертельны, и используются, чтобы нокаутировать существ и они потеряли сознание, вместо того, чтобы убивать их. Вы можете использовать несмертельное оружие, чтобы совершить смертельную атаку со штрафом обстоятельства −2."
        },
        {
            "key": "Растение",
            "nameEng": "plant",
            "desc": "Растительные существа обладают признаком `растение`. Они отличаются от нормальных растений. Магические эффекты с этим признаком каким-либо образом манипулируют или призывают растения или растительную материю. Те, что манипулируют растениями, не действуют в области, где нет растений."
        },
        {
            "key": "Радиация",
            "nameEng": "radiation",
            "desc": "Опасное, как правило ядовитое излучение, источником которого обычно являются радиоактивные материалы."
        },
        {
            "key": "Дух",
            "nameEng": "spirit",
            "desc": "Эффекты с этим признаком могут воздействовать на существ с духовной сущностью и наносить духовный урон. Существо с этим признаком определяется по его духовной сущности. Духовные существа часто не имеют материальной формы."
        },
        {
            "key": "Аюварин",
            "nameEng": "aiuvarin",
            "desc": "Существо с этим признаком обладает универсальным наследием аюварин. Аюварины имеют смешанное происхождение, включая эльфов и других аюваринов. Умение с этим признаком может быть использовано или выбрано только аюваринами."
        },
        {
            "key": "Анади",
            "nameEng": "anadi",
            "desc": "Затворники из Гарунда, похожие на пауков и способные принимать человеческие формы."
        },
        {
            "key": "Андроид",
            "nameEng": "android",
            "desc": "Искусственно созданная родословная синтетических гуманоидов обладающих душой. Наиболее распространены в Нумерии."
        },
        {
            "key": "Афорит",
            "nameEng": "aphorite",
            "desc": "Вид планарных отпрысков происходящих от сущностей из Осей, Плана порядка."
        },
        {
            "key": "Арданд",
            "nameEng": "ardande",
            "desc": "Арданды — планарные отпрыски, произошедшие от кизидхаров и других существ стихии дерева."
        },
        {
            "key": "Астразоан",
            "nameEng": "astrazoan",
            "desc": ""
        },
        {
            "key": "Атамару",
            "nameEng": "athamaru",
            "desc": "Атамару — рыбоподобные водные гуманоиды."
        },
        {
            "key": "Автоматон",
            "nameEng": "automaton",
            "desc": "Автоматоны это живые конструкты, поддерживаемые магическим ядром."
        },
        {
            "key": "Пробуждённое животное",
            "nameEng": "awakened-animal",
            "desc": "Пробуждённые животные были обычными существами до того, как обрели разум."
        },
        {
            "key": "Азаркет",
            "nameEng": "azarketi",
            "desc": "Земноводные гуманоиды, живущие вдоль морей региона Внутреннего моря, по слухам происходящие от народа Ацланта. Порой известны как \"жаберные люди\" или низшие ацланты. Азаркеты — это потомки людей, приспособившиеся к жизни в водных сообществах. У них есть жабры, перепончатые лапы и небольшие плавники, и они могут выживать как в воде, так и вне ее."
        },
        {
            "key": "Бантрид",
            "nameEng": "bantrid",
            "desc": "A creature with this trait is a member of the bantrid ancestry. These small, anosmatic aberrations have a column-like body mounted on an organic rolling foot-orb and have trouble remaining stationary. An ability with this trait can be used or selected only by bantrids."
        },
        {
            "key": "Барату",
            "nameEng": "barathu",
            "desc": ""
        },
        {
            "key": "Зверолюд",
            "nameEng": "beastkin",
            "desc": "Гуманоиды которые могут частично или полностью превращаться в животные формы."
        },
        {
            "key": "Борай",
            "nameEng": "borai",
            "desc": ""
        },
        {
            "key": "Бреннери",
            "nameEng": "brenneri",
            "desc": "A creature with this trait is a member of the brenneri ancestry. They are friendly otter-like humanoids who can swim and hold their breath for long periods. An ability with this trait can be used or selected only by brenneris"
        },
        {
            "key": "Багбер",
            "nameEng": "bugbear",
            "desc": "Существо с этим признаком — мохнатый, скрытный гоблиноид. Багберы обычно обладают ночным зрением."
        },
        {
            "key": "Коточеловек",
            "nameEng": "catfolk",
            "desc": "Существо с этим признаком является представителем родословной котолюдей. Котолюди — гуманоиды с кошачьими чертами и страстью к открытиям. Умение с этим признаком может быть использовано или выбрано только котолюдьми. Предмет с этим признаком создается и используется котолюдьми."
        },
        {
            "key": "Кентавр",
            "nameEng": "centaur",
            "desc": "У кентавров верхняя часть тела гуманоидная, а нижняя — лошадиная."
        },
        {
            "key": "Подменыш",
            "nameEng": "changeling",
            "desc": "Существо с этим признаком обладает универсальным наследием подменыша. Подмены — дети карг и представители другой гуманоидной родословной. Умение с этим признаком может быть использовано или выбрано только подменышами."
        },
        {
            "key": "Coshyco",
            "nameEng": "coshyco",
            "desc": "PF2E.TraitDescriptionCoshyco"
        },
        {
            "key": "Конрас",
            "nameEng": "conrasu",
            "desc": "Народ, созданный из космической силы, обретший сознание и помещенный в уникальные экзоскелеты."
        },
        {
            "key": "Созерцатель",
            "nameEng": "contemplative",
            "desc": ""
        },
        {
            "key": "Копакси",
            "nameEng": "copaxi",
            "desc": "A creature with this trait is a member of the copaxi ancestry. They are a colony of genetically identical polyps with a humanoid form and coral-like exoskeleton who can manipulate gravity. An ability with this trait can be used or selected only by copaxis."
        },
        {
            "key": "Восставший",
            "nameEng": "corpsefolk",
            "desc": ""
        },
        {
            "key": "Дампир",
            "nameEng": "dhampir",
            "desc": "Существо с этим признаком обладает универсальным наследием дампира. Эти гуманоиды — потомки вампира и представителя другой родословной."
        },
        {
            "key": "Драконья кровь",
            "nameEng": "dragonblood",
            "desc": "Существо с этим признаком обладает универсальным наследием драконьей крови. Эти существа рождаются в драконьем роду и часто имеют драконью внешность."
        },
        {
            "key": "Дракончик",
            "nameEng": "dragonet",
            "desc": "PF2E.TraitDescriptionDragonet"
        },
        {
            "key": "Драконид",
            "nameEng": "dragonkin",
            "desc": ""
        },
        {
            "key": "Дромаар",
            "nameEng": "dromaar",
            "desc": "Существо с этим признаком обладает универсальным наследием дромаар. Дромаары имеют смешанное происхождение, включая орков и других дромааров. Умение с этим признаком может быть использовано или выбрано только дромаарами."
        },
        {
            "key": "Сумеречный",
            "nameEng": "duskwalker",
            "desc": "Существо с этим признаком обладает универсальным наследием сумеречного. Сумеречные — планарные отпрыски наполненные сверхъестественной энергией психопомпов. Умение с этим признаком может быть использовано или выбрано только сумеречными."
        },
        {
            "key": "Дварф",
            "nameEng": "dwarf",
            "desc": "Существо с этим признаком является представителем родословной дварфов. Предмет с этим признаком создается и используется дварфами. Умения с этим признаком могут использовать или выбирать только дварфы. Дварфы — крепкий народ, который часто живёт под землёй и обычно обладают ночным зрением."
        },
        {
            "key": "Элебриец",
            "nameEng": "elebrian",
            "desc": ""
        },
        {
            "key": "Эльф",
            "nameEng": "elf",
            "desc": "Существо с этим признаком является представителем родословной эльфов. Эльфы — таинственный народ с богатыми традициями магии и науки, и обычно обладают сумеречным зрением. Умения с этим признаком могут использовать и выбираться только эльфами. Оружие с этим признаком создается и используется эльфами."
        },
        {
            "key": "Колония энту",
            "nameEng": "entu-colony",
            "desc": "PF2E.TraitDescriptionEntuColony"
        },
        {
            "key": "Фечлинг",
            "nameEng": "fetchling",
            "desc": "Существо с этим признаком является представителем родословной фечлингов. Фечлинги когда-то были людьми, но поколения жизни в Незримом Мире изменили их."
        },
        {
            "key": "Деформированный",
            "nameEng": "fleshwarp",
            "desc": "Гуманоид так сильно измененный внешними силами, что теперь является уникальной родословной."
        },
        {
            "key": "Фонкугон",
            "nameEng": "fonqugon",
            "desc": "A creature with this trait is a member of the fonqugon ancestry. They are multi-brained oozes who value intelligence and environmental stewardship. An ability with this trait can be used or selected only by fonqugons."
        },
        {
            "key": "Формианец",
            "nameEng": "formian",
            "desc": "A creature with this trait is a member of the formian ancestry. They are ant-like creatures from hive mind colonies who experience a “Call” to set out as individual beings. An ability with this trait can be used or selected only by formians."
        },
        {
            "key": "Ганзи",
            "nameEng": "ganzi",
            "desc": "Планарные отпрыски, произошедшие от хаотичных сущностей Мальстрема, таких как протеи."
        },
        {
            "key": "Отмеченный Разрывом",
            "nameEng": "gap-touched",
            "desc": "A creature with this trait is a member of the gap-touched versatile heritage. They are creatures with a strong connection to the Gap. An ability with this trait can be used or selected only by gap-touched."
        },
        {
            "key": "Джинникин",
            "nameEng": "geniekin",
            "desc": "Собирательный термин для планарных отпрысков, произошедших от Стихийных планов."
        },
        {
            "key": "Г'фолианец",
            "nameEng": "gfolian",
            "desc": "A creature with this trait is a member of the g'folian ancestry. They are fire-breathing intelligent beasts known for a deep appreciation of philosophy. An ability with this trait can be used or selected only by g'folians."
        },
        {
            "key": "Горан",
            "nameEng": "ghoran",
            "desc": "Гораны это разумные растения, выросшие в форме гуманоидов с цветочными лицами."
        },
        {
            "key": "Гном",
            "nameEng": "gnome",
            "desc": "Существо с этим признаком является представителем родословной гномов. Гномы являются народом небольшого роста, умелыми в магии и ищущие нового опыта, а также обычно обладающие сумеречным зрением. Умение с этим признаком может быть использовано или выбрано только гномами. Оружие с этим признаком создается и используется гномами."
        },
        {
            "key": "Гоблин",
            "nameEng": "goblin",
            "desc": "Существо с этим признаком — маленький, суетливый гоблиноид. Гоблины обычно обладают ночным зрением. Умение с этим признаком может быть использовано или выбрано только гоблинами. Оружие с этим признаком создается и используется гоблинами."
        },
        {
            "key": "Голома",
            "nameEng": "goloma",
            "desc": "Замкнутые гуманоиды с бесчисленными глазами."
        },
        {
            "key": "Полурослик",
            "nameEng": "halfling",
            "desc": "Существо с этим признаком является представителем родословной полуросликов. Этот народ небольшого роста являются дружелюбными скитальцами, которые считаются очень везучими. Умение с этим признаком может быть использовано или выбрано только полуросликами. Оружие с этим признаком создается и используется полуросликами."
        },
        {
            "key": "Хобгоблин",
            "nameEng": "hobgoblin",
            "desc": "Существо с этим признаком — высокий, милитаристский гоблиноид. Хобгоблины обычно обладают ночным зрением."
        },
        {
            "key": "Человек",
            "nameEng": "human",
            "desc": "Существо с этим признаком является представителем родословной людей. Люди — разносторонний народ известный своей способностью адаптироваться. Умение с этим признаком может быть использовано или выбрано только человеком."
        },
        {
            "key": "Дитя голода",
            "nameEng": "hungerseed",
            "desc": ""
        },
        {
            "key": "Иджтикри",
            "nameEng": "ijtikri",
            "desc": "A creature with this trait is a member of the ijtikri ancestry. They are air-breathing squid-like aberrations with an oblong hardened head and numerous tentacular arms. An ability with this trait can be used or selected only by ijtikris."
        },
        {
            "key": "Икешти",
            "nameEng": "ikeshti",
            "desc": ""
        },
        {
            "key": "Изалгуун",
            "nameEng": "izalguun",
            "desc": "A creature with this trait is a member of the izalguun ancestry. They are large, six-limbed isolationist humanoids capable of adopting a bipedal or quadrupedal stance. An ability with this trait can be used or selected only by izalguuns."
        },
        {
            "key": "Ётунорожденный",
            "nameEng": "jotunborn",
            "desc": ""
        },
        {
            "key": "Кало",
            "nameEng": "kalo",
            "desc": ""
        },
        {
            "key": "Касат",
            "nameEng": "kasatha",
            "desc": ""
        },
        {
            "key": "Кашриши",
            "nameEng": "kashrishi",
            "desc": "Крепкая родословная с характерными кристаллическими рогами и врожденными экстрасенсорными способностями."
        },
        {
            "key": "Хизар",
            "nameEng": "khizar",
            "desc": ""
        },
        {
            "key": "Кхоло",
            "nameEng": "kholo",
            "desc": "Кхоло — гуманоиды, напоминающие гиен."
        },
        {
            "key": "Кицунэ",
            "nameEng": "kitsune",
            "desc": "Гуманоиды-оборотни, чья истинная форма напоминает лисиц. Любопытные и находчивые, они обладают репутацией трикстеров."
        },
        {
            "key": "Кобольд",
            "nameEng": "kobold",
            "desc": "Существо с этим признаком является представителем родословной кобольдов. Кобольды — рептилоидные гуманоиды обычно Маленького размера и обладающие ночным зрением. Умения с этим признаком могут использовать или выбирать только кобольды. Предмет с этим признаком создается и используется кобольдами."
        },
        {
            "key": "Лашунта",
            "nameEng": "lashunta",
            "desc": ""
        },
        {
            "key": "Леший",
            "nameEng": "leshy",
            "desc": "Существо с этим признаком является представителем родословной леших. Это Маленькие растительные или грибные существа гуманоидной формы."
        },
        {
            "key": "Людоящер",
            "nameEng": "lizardfolk",
            "desc": "Людоящеры — семейство рептилоидных гуманоидов. Чрезвычайно приспособленные и терпеливые рептилоидные гуманоиды, также известные как ирукси."
        },
        {
            "key": "Мадросерай",
            "nameEng": "madrosarai",
            "desc": "A creature with this trait is a member of the madrosarai ancestry. They are humanoids known for calm temperaments, vibrant coloration, and a strong connection with magic. An ability with this trait can be used or selected only by madrosarais."
        },
        {
            "key": "Маракой",
            "nameEng": "maraquoi",
            "desc": "A creature with this trait is a member of the maraquoi ancestry. They are tailed simian humanoids with seven reproductive sexes who cherish family, deeply mourn the dead, and detect sound through their skin. An ability with this trait can be used or selected only by maraquois."
        },
        {
            "key": "Мерфолк",
            "nameEng": "merfolk",
            "desc": "У этих водных гуманоидов верхняя часть тела похожа на человеческую, а нижняя — на рыбу."
        },
        {
            "key": "Минотавр",
            "nameEng": "minotaur",
            "desc": "Минотавры — рогатые бычьи гуманоиды, мастерски разбирающиеся в лабиринтах и головоломках."
        },
        {
            "key": "Мойишу",
            "nameEng": "moyishuu",
            "desc": "A creature with this trait is a member of the moyishuu ancestry. They are insightful fey with colorful skin and crystalline hair who can sense, emulate, and harness emotions. An ability with this trait can be used or selected only by moyishuus."
        },
        {
            "key": "Наари",
            "nameEng": "naari",
            "desc": "PF2E.TraitDescriptionNaari"
        },
        {
            "key": "Нагаджи",
            "nameEng": "nagaji",
            "desc": "Родословная с чертами рептилий и змеиными головами, которые придерживаются традиций, служат нагам или почитают их."
        },
        {
            "key": "Нефилим",
            "nameEng": "nephilim",
            "desc": "Существо с этим признаком имеет универсальное наследие нефилимов. Нефилимы — планарные отпрыски, произошедшие от бессмертных существ из других планов. Способность с этим признаком может быть использована или выбрана только нефилимами."
        },
        {
            "key": "Новианец",
            "nameEng": "novian",
            "desc": "A creature with this trait is a member of the novian ancestry. They are tiny floating suns born from the death of a star who emit powerful gravitational fields. An ability with this trait can be used or selected only by novians."
        },
        {
            "key": "Орк",
            "nameEng": "orc",
            "desc": "Существо с этим признаком является представителем родословной орков. Этот зеленокожий народ обладает ночным зрением. Умение с этим признаком может быть использовано или выбрано только орками. Оружие с этим признаком создается и используется орками."
        },
        {
            "key": "Ореад",
            "nameEng": "oread",
            "desc": "Вид джинникинов произошедший от сущностей Земляного плана, обычно шайтанов."
        },
        {
            "key": "Орокоран",
            "nameEng": "orocoran",
            "desc": "A creature with this trait is a member of the orocoran ancestry. They are spindly aberrations mutated by the eldritch fluids of Aucturn who yearn for a new identity. An ability with this trait can be used or selected only by orocorans."
        },
        {
            "key": "Ошару",
            "nameEng": "osharu",
            "desc": "A creature with this trait is a member of the osharu ancestry. They are sluglike humanoids that can swim and excrete sticky slime. They spend their lives amassing knowledge. An ability with this trait can be used or selected only by osharus."
        },
        {
            "key": "Патра",
            "nameEng": "pahtra",
            "desc": ""
        },
        {
            "key": "Кукла",
            "nameEng": "poppet",
            "desc": "Маленькие конструкты, изначально созданные для того, чтобы служить в качестве компаньонов или слуг. Иногда они получают значительную искру жизни, превращаясь в независимых разумных существ."
        },
        {
            "key": "Призмени",
            "nameEng": "prismeni",
            "desc": ""
        },
        {
            "key": "Крысолюд",
            "nameEng": "ratfolk",
            "desc": "Существо с этим признаком является представителем родословной крысолюдов. Крысолюды — гуманоиды похожие на крыс. Обычно называют себя исоки. Умения с этим признаком могут использовать или выбирать только крысолюди. Предмет с этим признаком создается и используется крысолюдами."
        },
        {
            "key": "Раксилит",
            "nameEng": "raxilite",
            "desc": "A creature with this trait is a member of the raxilite ancestry. They are tiny, gentle, sapient plants who use biotechnological grafts called LFAN. An ability with this trait can be used or selected only by raxilites."
        },
        {
            "key": "Отражение",
            "nameEng": "reflection",
            "desc": "Существо с этим признаком обладает универсальным наследием отражения. Отражения это существа скопированные с других живых индивидов, будь то клонированием, планарным дублированием или другим способом. Умения с этим признаком могут быть выбраны или использованы только отражениями."
        },
        {
            "key": "Рифорианец",
            "nameEng": "ryphorian",
            "desc": "A creature with this trait is a member of the ryphorian ancestry. They are trimorphic elf-like humanoids with exceptional hearing whose appearance changes with the seasons. An ability with this trait can be used or selected only by ryphorians."
        },
        {
            "key": "Самсар",
            "nameEng": "samsaran",
            "desc": "Синекожие смертные, уроженцы Зи Ха (Zi Ha), перевоплощающиеся после смерти и вспоминающие фрагменты своих прошлых жизней."
        },
        {
            "key": "Сарангай",
            "nameEng": "sarangay",
            "desc": ""
        },
        {
            "key": "Саркезианец",
            "nameEng": "sarcesian",
            "desc": ""
        },
        {
            "key": "Ширрен",
            "nameEng": "shirren",
            "desc": ""
        },
        {
            "key": "Шиск",
            "nameEng": "shisk",
            "desc": "Скрытные гуманоиды в костяном оперении, обитающие под землёй."
        },
        {
            "key": "Шобад",
            "nameEng": "shobhad",
            "desc": ""
        },
        {
            "key": "Шуни",
            "nameEng": "shoony",
            "desc": "Существо с этим признаком является представителем родословной шуни."
        },
        {
            "key": "Скелет",
            "nameEng": "skeleton",
            "desc": "Эта нежить создается путем оживления скелета мертвого существа с помощью энергии пустоты. Умение с этим признаком может быть использовано или выбрано только скелетами."
        },
        {
            "key": "Скиттермандр",
            "nameEng": "skittermander",
            "desc": ""
        },
        {
            "key": "Спрайт",
            "nameEng": "sprite",
            "desc": "Родословная миниатюрных крылатых фей, сильно связанных с природной магией и Материальным планом."
        },
        {
            "key": "Стрикс",
            "nameEng": "strix",
            "desc": "Крылатые гуманоиды, большинство из которых живут около Челии."
        },
        {
            "key": "Сули",
            "nameEng": "suli",
            "desc": "Вид джинникинов воплощающих смесь элементов и обычно происходящих от джаннов."
        },
        {
            "key": "Суркай",
            "nameEng": "surki",
            "desc": "Суркай — подземная насекомообразная родословная, впитывающая окружающую магию и развивающая уникальные адаптации."
        },
        {
            "key": "Сильф",
            "nameEng": "sylph",
            "desc": "Вид джинникинов произошедший от сущностей Воздушного плана, обычно джинни."
        },
        {
            "key": "Талос",
            "nameEng": "talos",
            "desc": "Талосы — планарные отпрыски, произошедшие от зухров."
        },
        {
            "key": "Талфи",
            "nameEng": "talphi",
            "desc": "A creature with this trait is a member of the talphi ancestry. They are small, mole-like humanoids known for their exceptional digging skills and use of glowing paints and dyes. An ability with this trait can be used or selected only by talphis."
        },
        {
            "key": "Тануки",
            "nameEng": "tanuki",
            "desc": ""
        },
        {
            "key": "Тэнгу",
            "nameEng": "tengu",
            "desc": "Существо с этим признаком является представителем родословной тэнгу. Тэнгу — гуманоиды похожие на ворон. Умения с этим признаком могут использовать или выбирать только тэнгу. Предмет с этим признаком создается и используется тэнгу."
        },
        {
            "key": "Трипки",
            "nameEng": "tripkee",
            "desc": "Трипки это семейство гуманоидов, похожих на лягушек."
        },
        {
            "key": "Трокс",
            "nameEng": "trox",
            "desc": "A creature with this trait is a member of the trox ancestry. They are large and sturdy arthropodal humanoids with multiple vestigial arms and a fearsome appearance that contrasts their peaceful spirituality. An ability with this trait can be used or selected only by troxes."
        },
        {
            "key": "Ундина",
            "nameEng": "undine",
            "desc": "Вид джинникинов произошедший от сущностей Водного плана, обычно маридов."
        },
        {
            "key": "Урог",
            "nameEng": "urog",
            "desc": "A creature with this trait is a member of the urog ancestry. They are exacting, semiconductive, silicon-based telepathic beasts who seek perfection through learning and understanding. An ability with this trait can be used or selected only by urogs."
        },
        {
            "key": "Ванар",
            "nameEng": "vanara",
            "desc": "Ванары — любознательные, похожие на приматов гуманоиды, обладающие цепкими хвостами."
        },
        {
            "key": "Веск",
            "nameEng": "vesk",
            "desc": ""
        },
        {
            "key": "Вишканья",
            "nameEng": "vishkanya",
            "desc": "Родословная гуманоидов со змеевидными чертами и сильным ядом."
        },
        {
            "key": "Влака",
            "nameEng": "vlaka",
            "desc": ""
        },
        {
            "key": "Ваянг",
            "nameEng": "wayang",
            "desc": "Маленький народец родом из Незримого Мира (Netherworld). Иммигрировали в Голарион после Землепада."
        },
        {
            "key": "Ворланиси",
            "nameEng": "worlanisi",
            "desc": "A creature with this trait is a member of the worlanisi ancestry. They are small, incredibly lucky, four-armed telepaths with bright blue skin. An ability with this trait can be used or selected only by worlanisis."
        },
        {
            "key": "Ксенометрический андроид",
            "nameEng": "xenometric-android",
            "desc": "A creature with this trait is a member of the xenometric android versatile heritage. These artificially constructed beings are made to resemble a particular species. An ability with this trait can be used or selected only by xenometric androids."
        },
        {
            "key": "Якша",
            "nameEng": "yaksha",
            "desc": ""
        },
        {
            "key": "Яогай",
            "nameEng": "yaoguai",
            "desc": ""
        },
        {
            "key": "Алхимик",
            "nameEng": "alchemist",
            "desc": "Обозначает умения класса алхимика."
        },
        {
            "key": "Анимист",
            "nameEng": "animist",
            "desc": "Обозначает умения класса анимиста."
        },
        {
            "key": "Варвар",
            "nameEng": "barbarian",
            "desc": "Обозначает умения класса варвара."
        },
        {
            "key": "Бард",
            "nameEng": "bard",
            "desc": "Обозначает умения класса барда."
        },
        {
            "key": "Чемпион",
            "nameEng": "champion",
            "desc": "Обозначает умения класса чемпиона."
        },
        {
            "key": "Жрец",
            "nameEng": "cleric",
            "desc": "Обозначает умения класса жреца."
        },
        {
            "key": "Командующий",
            "nameEng": "commander",
            "desc": ""
        },
        {
            "key": "Друид",
            "nameEng": "druid",
            "desc": "Обозначает умения класса друида."
        },
        {
            "key": "Посланник",
            "nameEng": "envoy",
            "desc": ""
        },
        {
            "key": "Герой",
            "nameEng": "exemplar",
            "desc": "Обозначает умения класса героя."
        },
        {
            "key": "Воин",
            "nameEng": "fighter",
            "desc": "Обозначает умения класса воина."
        },
        {
            "key": "Защитник",
            "nameEng": "guardian",
            "desc": ""
        },
        {
            "key": "Стрелок",
            "nameEng": "gunslinger",
            "desc": "Обозначает умения класса стрелка."
        },
        {
            "key": "Изобретатель",
            "nameEng": "inventor",
            "desc": "Обозначает умения класса изобретателя."
        },
        {
            "key": "Сыщик",
            "nameEng": "investigator",
            "desc": "Обозначает умения класса сыщика."
        },
        {
            "key": "Кинетик",
            "nameEng": "kineticist",
            "desc": "Обозначает умения класса кинетика."
        },
        {
            "key": "Магус",
            "nameEng": "magus",
            "desc": "Обозначает умения класса магуса."
        },
        {
            "key": "Монах",
            "nameEng": "monk",
            "desc": "Обозначает умения класса монаха. Оружие с этим признаком в основном используют монахи."
        },
        {
            "key": "Мистик",
            "nameEng": "mystic",
            "desc": ""
        },
        {
            "key": "Оперативник",
            "nameEng": "operative",
            "desc": ""
        },
        {
            "key": "Оракул",
            "nameEng": "oracle",
            "desc": "Обозначает умения класса оракула."
        },
        {
            "key": "Экстрасенс",
            "nameEng": "psychic",
            "desc": "Обозначает умения класса эстрасенса."
        },
        {
            "key": "Рейнджер",
            "nameEng": "ranger",
            "desc": "Обозначает умения класса рейнджера."
        },
        {
            "key": "Плут",
            "nameEng": "rogue",
            "desc": "Обозначает умения класса плута."
        },
        {
            "key": "Соларион",
            "nameEng": "solarian",
            "desc": ""
        },
        {
            "key": "Солдат",
            "nameEng": "soldier",
            "desc": ""
        },
        {
            "key": "Чародей",
            "nameEng": "sorcerer",
            "desc": "Обозначает умения класса чародея."
        },
        {
            "key": "Призыватель",
            "nameEng": "summoner",
            "desc": "Обозначает умения класса призывателя."
        },
        {
            "key": "Сорвиголова",
            "nameEng": "swashbuckler",
            "desc": "Обозначает умения класса сорвиголовы."
        },
        {
            "key": "Тауматург",
            "nameEng": "thaumaturge",
            "desc": "Обозначает умения класса тауматурга."
        },
        {
            "key": "Ведьма",
            "nameEng": "witch",
            "desc": "Обозначает умения класса ведьмы."
        },
        {
            "key": "Исказитель",
            "nameEng": "witchwarper",
            "desc": ""
        },
        {
            "key": "Волшебник",
            "nameEng": "wizard",
            "desc": "Обозначает умения класса волшебника."
        },
        {
            "key": "Арканный",
            "nameEng": "arcane",
            "desc": "Эта магия исходит от арканного обычая, который строится на логике и рациональности. Всё, что обладает этим признаком является магическим. Существо с этим признаком состоит в основном из арканной магии или имеет сильную связь с ней."
        },
        {
            "key": "Сакральный",
            "nameEng": "divine",
            "desc": "Эта магия исходит от сакрального обычая, черпая силы от божеств или подобных источников. Всё, что обладает этим признаком является магическим. Существо с этим признаком состоит в основном из сакральной магии или имеет сильную связь с ней."
        },
        {
            "key": "Оккультный",
            "nameEng": "occult",
            "desc": "Эта магия исходит от оккультного обычая, взывая к странным и эфемерным тайнам. Всё, что обладает этим признаком является магическим. Существо с этим признаком состоит в основном из оккультной магии или имеет сильную связь с ней."
        },
        {
            "key": "Природный",
            "nameEng": "primal",
            "desc": "Эта магия исходит от природного обычая, соединяющего с миром природы и инстинктом. Всё, что обладает этим признаком является магическим. Существо с этим признаком состоит в основном из природной магии или имеет сильную связь с ней."
        },
        {
            "key": "Расширение",
            "nameEng": "amp",
            "desc": ""
        },
        {
            "key": "Якорное",
            "nameEng": "anchoring",
            "desc": "Вы можете использовать умения с признаком `якорное`, только когда ваше квантовое поле активно. Если вы используете такое умение в свой ход, помимо описанных эффектов оно автоматически \"Поддерживает\" ваше квантовое поле."
        },
        {
            "key": "Атака",
            "nameEng": "attack",
            "desc": "Умение с этим признаком подразумевают атаку. В ваш ход, для каждой атаки после первой, вы получаете штраф множественных атак."
        },
        {
            "key": "Слуховой",
            "nameEng": "auditory",
            "desc": "Действия и эффекты с признаком `слуховой` полагаются на звук. Действие с признаком `слуховой` может быть успешным только, если существо использующее это действие может говорить или иным образом воспроизводить требуемые звуки. Заклинание или эффект с признаком `слуховой` обладает своими эффектами только, если цель может слышать его. На усмотрение Мастера, это применяется только к частям эффекта основанным на звуке. Это отличается от эффектов с признаком `звук`, все равно воздействующих на цели, которые не могут слышать (такие как глухие цели), пока сам эффект издает звук."
        },
        {
            "key": "Аура",
            "nameEng": "aura",
            "desc": "Аура это эманация, которая постоянно исходит от вас, воздействуя на существ в определенном радиусе. Аура ещё может относиться к магической сигнатуре предмета."
        },
        {
            "key": "Чудовище",
            "nameEng": "beast",
            "desc": "Существо, похожее на животное, но с модификатором Интеллекта −3 или выше, обычно является чудовищем. В отличие от животных, чудовище может быть способно говорить и мыслить."
        },
        {
            "key": "Чары",
            "nameEng": "cantrip",
            "desc": "Заклинание, которое вы можете сотворять по желанию и автоматически усиливающееся до половины вашего уровня, округлённой вверх."
        },
        {
            "key": "Композиция",
            "nameEng": "composition",
            "desc": "Для сотворения чар-композиции или заклинания фокусировки вы обычно используете навык Выступления. Если заклинание требует `слуховое` выступление, вы можете прочесть стихотворение, спеть песню или исполнить драматический монолог. Если заклинание требует `визуального` выступления, вы можете танцевать или пантомимировать. В каждый ход вы можете сотворить только одно заклинание-композицию, и одновременно у вас может быть активно только одно. Если вы сотворяете новое заклинание-композицию, любые длящиеся эффекты от предыдущего заклинания-композиции мгновенно заканчиваются."
        },
        {
            "key": "Концентрация",
            "nameEng": "concentrate",
            "desc": "Действие с этим признаком требует определенного умственного сосредоточения и порядка."
        },
        {
            "key": "Освящение",
            "nameEng": "consecration",
            "desc": "Заклинание освящения усиливает область на определенный период времени. Данная область единовременно может иметь только один эффект освящения. Новый эффект пытается противодействовать любому уже имеющему эффекту освящения в пересекающейся области."
        },
        {
            "key": "Сопряжённость",
            "nameEng": "contingency",
            "desc": "Заклинания с этим признаком, во время своего эффекта дают вам действие, обычно реакцию со специальным триггером. Обычно они имеют продолжительность 24 часа. Вы можете иметь одновременно активным только 1 заклинание с признаком `сопряженность` или 1 заклинание Сопряженность. Если вы сотворяете новое заклинание с признаком `сопряженность`, то более новое подавляет старое."
        },
        {
            "key": "Проклятие",
            "nameEng": "curse",
            "desc": "Проклятие это эффект, которые дает существу какой-то долговременный недуг. Проклятия всегда магические и обычно являются результатом заклинания или ловушки. Эффекты с этим признаком могут быть убраны только другими эффектами, которые выбирают целями конкретно проклятия."
        },
        {
            "key": "Проклятый",
            "nameEng": "cursebound",
            "desc": "Способности с этим признаком усиливают хватку вашего оракульского проклятия над вашей душой в обмен на божественное озарение, что даёт вам состояние `проклятый`. Когда вы используете способность с признаком `проклятый`, вы становитесь `проклятым 1` или, если вы уже подвержены состоянию `проклятый`, вы увеличиваете значение этого состояния на 1. Поскольку способности `проклятия` напрямую связаны с вашим проклятием оракула, вы не можете использовать способность с признаком `проклятый`, если у вас нет проклятия оракула или вы уже достигли максимального значения состояния `проклятый`. Вы не можете смягчить или обойти недостатки вашего проклятия оракула с помощью заклинаний или других эффектов, и эффекты любой способности `проклятого` заканчивается, когда вы \"Сфокусируетесь\" и уберете состояние `проклятый`."
        },
        {
            "key": "Тьма",
            "nameEng": "darkness",
            "desc": "Эффекты тьмы тушат в области немагический свет и могут противодействовать менее сильному магическому свету. Обычно, чтобы противодействовать свету вы своей магией тьмы должны напрямую выбирать целью магию света, но некоторые заклинания тьмы автоматически совершают противодействие свету."
        },
        {
            "key": "Смерть",
            "nameEng": "death",
            "desc": "Эффект имеющий признак `смерть` мгновенно убивает вас если снижает ОЗ до 0. Некоторые эффекты смерти могут приблизить вас к смерти или сразу убить, не уменьшая ваши ОЗ до 0."
        },
        {
            "key": "Обнаружение",
            "nameEng": "detection",
            "desc": "Эффекты с этим признаком пытаются найти присутствие или местоположение личности, объекта или ауры."
        },
        {
            "key": "Болезнь",
            "nameEng": "disease",
            "desc": "Эффект с этим признаком применяет одну или несколько болезней. Болезнь обычно является недугом."
        },
        {
            "key": "Сновидение",
            "nameEng": "dream",
            "desc": "Существа, обитающие в Измерении Снов, могут обладать разнообразными способностями, хотя те, кто связан с царством кошмаров Ленг, почти всегда `нечестивы` и иммунны к низким температурам своего царства."
        },
        {
            "key": "Эйдолон",
            "nameEng": "eidolon",
            "desc": "Существо с этим признаком является эйдолоном призывателя. Действие или заклинание с этим признаком может быть применено только эйдолоном. Предмет с этим признаком может быть использован или надет только эйдолоном, и эйдолон не может использовать предметы без этого признака (он может инвестировать вплоть до 2 предметов)."
        },
        {
            "key": "Эмоция",
            "nameEng": "emotion",
            "desc": "Этот эффект изменяют эмоции существа. Эффекты с этим признаком также всегда имеют признак `ментальный`. Существа обладающие специальной тренировкой, или имеющие механический или искусственный интеллект иммунны к эффектам эмоций."
        },
        {
            "key": "Исследование",
            "nameEng": "exploration",
            "desc": "На использование этой активности с этим признаком тратится более хода и обычно их можно использовать только в режиме исследования."
        },
        {
            "key": "Межпространственный",
            "nameEng": "extradimensional",
            "desc": "Этот эффект или предмет создает межпространственный карман. Межпространственный эффект помещенный внутрь другого межпространственного кармана перестаёт действовать пока не будет убран оттуда."
        },
        {
            "key": "Страх",
            "nameEng": "fear",
            "desc": "Эффекты страха вызывают эмоцию страха. Эффекты с этим признаком также всегда имеют признаки `эмоция` и `ментальный`."
        },
        {
            "key": "Фокус",
            "nameEng": "focus",
            "desc": "Заклинания фокусировки это особый вид заклинаний, получаемых непосредственно из области обучения, от божества или другого конкретного источника. Вы можете выучить заклинания фокусировки только через специальные особенности класса или способности, а не выбирая их из списка заклинаний. Кроме того, вы сотворяете их, используя специальный запас Очков Фокусировки; вы не можете подготавливать заклинание фокусировки в слоте заклинания или использовать ваши слоты заклинаний для колдовства заклинаний фокусировки; аналогично, вы не можете тратить свои Очки Фокусировки на сотворение заклинаний, которые не являются заклинаниями фокусировки."
        },
        {
            "key": "Удача",
            "nameEng": "fortune",
            "desc": "Эффект удачи благоприятно влияет на то, как вы бросаете кости. У вас никогда не может быть более одного эффекта удачи изменяющего один бросок. Если будут применяться несколько эффектов удачи, вы решает какой из них применить. Если эффект удачи и эффект неудачи будут применяться к одному и тому же броску, то они отменяют друг друга и вы делаете бросок как обычно."
        },
        {
            "key": "Грибковый",
            "nameEng": "fungus",
            "desc": "Грибковые существа обладают признаком `грибковый`. Они отличаются от нормальных грибов."
        },
        {
            "key": "Гравитация",
            "nameEng": "gravity",
            "desc": ""
        },
        {
            "key": "Исцеление",
            "nameEng": "healing",
            "desc": "Исцеляющий эффект восстанавливает тело существа, обычно восполняя Очки Здоровья, но иногда убирая болезни или другие ослабляющие эффекты."
        },
        {
            "key": "Сглаз",
            "nameEng": "hex",
            "desc": "Сглаз — это заклинание, вызванное непосредственным вниманием и вмешательством вашего покровителя. Ваш покровитель не любит, когда его постоянно беспокоят, поэтому в каждый ход вы можете сотворить только одно заклинание с признаком `сглаз`, попытки использовать второе автоматически проваливаются и обычно вызывают у вашего фамильяра недовольное шипение, поскольку ваш покровитель отвергает ваш призыв."
        },
        {
            "key": "Иллюзия",
            "nameEng": "illusion",
            "desc": "Эффекты и магические предметы с этим признаком включают в себя ложные сенсорные раздражители."
        },
        {
            "key": "Недееспособность",
            "nameEng": "incapacitation",
            "desc": "Умение с этим признаком может насовсем вывести персонажа из боя или даже убить, и его сложнее использовать на более сильных персонажах. Если заклинание имеет признак `недееспособность`, то любое существо, уровень которого более чем в 2 раза больше ранга заклинания, для преодоления недееспособности считает результат своей проверки на одну ступень успеха лучше, либо результат любой проверки совершаемой заклинателем, для выведения существа из строя, становится на одну ступень успеха хуже. Если какой-либо другой эффект имеет признак `недееспособность`, то существо обладающее уровнем больше уровня предмета, существа или опасности создающих этот эффект, получает те же преимущества."
        },
        {
            "key": "Инкарнация",
            "nameEng": "incarnate",
            "desc": "Заклинание с признаком `инкарнация` тематически похоже на заклинания призыва существ, но оно не воплощает миньона с признаком `призванный`. Вместо этого, при призыве, когда вы завершаете Сотворение этого заклинания, инкарнированное существо выполняет своей действие \"Прибытия\". В конце вашего следующего хода, инкарнированное существо может \"Шагнуть\", \"Переместиться\" или выполнить действие другого имеющегося у него вида передвижения (например, \"Карабкаться\" или \"Рыть\"), а потом выполняет свое действие \"Уход\". После этого заклинание заканчивается. После слов \"Прибытие\" или \"Уход\" курсивом указаны названия конкретных действий \"Прибытия\" и \"Ухода\", соответственно, а также все их признаки. Существо, вызванное заклинанием инкарнации, действует в ваших интересах, направляет свои эффекты как можно дальше от вас и ваших союзников, и может прислушиваться к вашим просьбам, но в конечном итоге принимает собственные решения. Если заклинание указывает на то, что инкарнированный принимает решение, то Мастер определяет, как бы оно поступило. После нескольких призывов, оно может даже стать более склонным делать именно то, что вы хотите. Инкарнированный не полностью является существом. Он не может выполнять другие действия, либо быть выбран целью или поврежден \"Ударами\", заклинаниями или другими эффектами, если только они не способны целиться в или заканчивать эффект заклинания (как например \"рассеять магию\"). Он обладает размером, с целью размещения его эффектов, но не блокирует движение. Если применимо, его эффекты используют ваши КС заклинаний и модификатор броска атаки заклинаниями."
        },
        {
            "key": "Бестелесный",
            "nameEng": "incorporeal",
            "desc": "Бестелесное существо или предмет не имеет физической формы. Он может проходить сквозь твердые предметы, в том числе стены. Находясь внутри объекта, бестелесное существо не может воспринимать, атаковать или взаимодействовать с чем-либо за пределами объекта, и если оно начинает свой ход в объекте, то оно `замедлено 1` до конца своего хода. Материальное существо и бестелесное существо могут проходить сквозь друг друга, но не могут закончить свое движение в пространстве другого. Бестелесное существо не может совершать проверки на основе Силы против материальных существ или объектов, только против бестелесных, если только эти объекты не имеют руны свойства \"призрачное касание\". Аналогично, материальное существо не может выполнять проверки основанные на Силе против бестелесных существ или объектов. Бестелесные существа обычно обладают иммунитетом к эффектам или состояниям, требующим физического тела, таким как болезнь, яд и точный урон. Обычно они имеют сопротивление любому урону (кроме урона силой, духовного урона и урона \"Ударами\" с руной свойства \"призрачное касание\"), с удвоенным сопротивлением против немагического урона."
        },
        {
            "key": "Вдыхаемый",
            "nameEng": "inhaled",
            "desc": "Вдыхаемый яд активируется, если выпустить его из контейнера. После высвобождения, яд создает облако, заполняющее 10-футовый куб и держится в течение 1 минуты или пока сильный ветер не рассеет облако. Каждое существо, попавшее в это облако, подвергается воздействию яда и должно совершить спасбросок против яда; существо, узнавшее о яде до попадания в облако, может использовать одно действие, чтобы задержать дыхание и получить бонус обстоятельства +2 к спасброску против яда на 1 раунд."
        },
        {
            "key": "Языковой",
            "nameEng": "linguistic",
            "desc": "Эффект с этим признаком зависит от понимая языка. Языковой эффект выбирающий целью существо действует только если цель понимает используемый вами язык."
        },
        {
            "key": "Литания",
            "nameEng": "litany",
            "desc": "Литании — специальные заклинания преданности, обычно используемые чемпионами и требующие одиночного действия, как правило дающие временный иммунитет для дальнейших литаний."
        },
        {
            "key": "Воздействие",
            "nameEng": "manipulate",
            "desc": "Вы должны физически воздействовать предметом или выполнять жесты, чтобы использовать действие с этим признаком. Существа без подходящей конечности не могут выполнять действия с этим признаком. Действия с признаком `воздействие` часто провоцируют реакции."
        },
        {
            "key": "Неудача",
            "nameEng": "misfortune",
            "desc": "Эффект `неудачи` отрицательно влияет на то, как вы бросаете кости. У вас никогда не может быть более одного эффекта `неудачи` изменяющего один бросок. Если будут применяться несколько эффектов `неудачи`, Мастер решает какой из них хуже, и применяет его. Если эффект `удачи` и эффект `неудачи` будут применяться к одному и тому же броску, то они отменяют друг друга и вы делаете бросок как обычно."
        },
        {
            "key": "Трансформация",
            "nameEng": "morph",
            "desc": "Заклинания, которые слегка изменяют форму существа, имеют признак `трансформация`. Любые \"Удары\", полученные конкретно от эффекта трансформации, являются магическим. На вас одновременно может действовать несколько заклинаний трансформации, но если вы трансформируете ту же самую часть тела более одного раза, второй эффект `трансформации` пытается противодействовать первому (таким же образом как и два эффекта `полиморфа`, как описано далее). Еще ваши эффекты `трансформации` могут закончится если вы полиморфитесь и эффект `полиморфа` аннулирует или переопределяет ваш имеющийся эффект `трансформации`. Например, трансформация дававшая вам крылья будет развеяна, если вы полиморфитесь в форму имеющую свои крылья (хотя если у вашей новой формы отсутствовали крылья, вы оставляете их от своей трансформации). Мастер решает какие эффекты `трансформации` могут быть использованы вместе а какие нет."
        },
        {
            "key": "Движение",
            "nameEng": "move",
            "desc": "Действие с этим признаком включает в себя перемещение из одного пространства в другое."
        },
        {
            "key": "Мифический",
            "nameEng": "mythic",
            "desc": "Опции с этим признаком даруют или используют мифическую силу. Способности с признаком `мифический` могут быть выбраны только мифическими персонажами, которые обычно обладают мифическим Призванием.</p><p>Монстры с признаком `мифический` имеют доступ к запасу Очков Мифа и являются особенно сильными для существ своего уровня. Многие мифические монстры обладают либо сопротивлением, либо полным иммунитетом к атакам, исходящим от не-мифических существ и оружия.</p><p>Заклинания с признаком `мифический` требуют использования Очка Мифа для сотворения, а предметы с этим признаком требуют расходования Очка Мифа для использования их активных умений.</p><p>Оружие с признаком `мифический` преодолевает сопротивления и иммунитеты мифических монстров."
        },
        {
            "key": "Обонятельный",
            "nameEng": "olfactory",
            "desc": "Обонятельный эффект может воздействовать только на существа, которые могут его унюхать. По решению Мастера, это применимо только к обонятельной части эффекта."
        },
        {
            "key": "Яд",
            "nameEng": "poison",
            "desc": "Эффект с этим признаком доставляет яд или наносит урон ядом. Предмет с этим признаком отравлен и может вызвать недуг."
        },
        {
            "key": "Полиморф",
            "nameEng": "polymorph",
            "desc": "Эти эффекты полностью превращают цель в новую форму. Цель не может быть одновременно под воздействием более одного полиморфа. Если она попадает под эффект другого полиморфа, он пытается противодействовать первому. Если ему это успешно удается, он вступает в силу, если нет — заклинание не имеет эффекта на цель. Любые \"Удары\", полученные конкретно от эффекта полиморфа являются магическим. Если только не сказано иначе, заклинания полиморфа не позволяют принимать внешний вид конкретного индивидуального существа. Если вы принимаете боевую форму при помощи заклинания полиморфа, специальные показатели могут быть скорректированы только бонусами обстоятельств, бонусами состояния и штрафами. Если не указано иначе, боевая форма не дает вам возможность сотворять заклинания, говорить, и использовать большинство действий с признаком `воздействие`, которые требуют наличия рук (если есть сомнения по поводу возможности использования действий, решение принимает Мастер). Ваше снаряжение поглощается вашей формой; постоянные возможности вашего снаряжения всё ещё функционируют, но вы не можете активировать какие-либо предметы. Вы теряете свои Скорости и получаете указанные в боевой форме. Если эффект полиморфа заставляет вас вырасти в размере, у вас должно быть достаточно места для расширения или эффект будет прерван."
        },
        {
            "key": "Одержимость",
            "nameEng": "possession",
            "desc": "Эффекты с этим признаком позволяют существам проецировать в цель свой разум и дух. Существо иммунное к `ментальным` эффектам не может использовать эффект `одержимости`. Во время обладания целью, настоящее тело хозяина находится без сознания (и не может очнуться как обычно), если только эффект `одержимости` не позволяет существу войти в цель физически. Всякий раз, когда цель получает урон, хозяин получает половину этого урона в виде ментального урона.\nХозяин теряет преимущества любых своих активных заклинаний или умений которые воздействуют на его физическое тело, однако он получает преимущества активных заклинаний цели и умений действующих на ее тело. Хозяин может использовать любые умения цели, которые являются чисто физическими и он не может использовать любые свои умения кроме заклинаний и чисто ментальных умений. Мастер решает, является ли умение чисто физическим или ментальным. Хозяин использует показатели цели: модификатор атаки, КБ, спасброски Стойкости и Рефлекса, Восприятие, и физические навыки; и свои собственные: спасбросок Воли, ментальные навыки, атаку заклинанием и КС заклинаний; преимущества инвестированных предметов применяются когда это уместно (инвестированные предметы хозяина применяются когда используются его собственные значения, а инвестированные предметы цели применяются при использовании значений цели). Хозяин не получает преимущества от сотворения заклинаний, которые обычно действуют только на заклинателя, так как он не в своем теле.\nХозяин должен использовать свои собственные действия, чтобы заставить действовать одержимое существо. Если хозяин достигает 0 ОЗ любой комбинацией урона его настоящему телу и ментального урона от одержимости, то он, как обычно, отправляется в нокаут и одержимость мгновенно заканчивается. Если цель достигает 0 ОЗ раньше, то хозяин может либо потерять сознание вместе с телом и продолжить одержимость, либо закончить эффект свободным действием и вернуться в свое тело. Если цель умирает, одержимость мгновенно заканчивается и хозяин получает состояние `ошеломлен` на 1 минуту."
        },
        {
            "key": "Предсказание",
            "nameEng": "prediction",
            "desc": "Эффекты с этим признаком определяют что может случиться в ближайшем будущем. Большинство предсказаний являются прорицаниями."
        },
        {
            "key": "Психика",
            "nameEng": "psyche",
            "desc": "Для использования умений с признаком психика у вас должна быть Раскрыта психика, и они автоматически заканчиваются когда ваша раскрытая психика утихнет."
        },
        {
            "key": "Ярость",
            "nameEng": "rage",
            "desc": "Чтобы использовать умения с признаком `ярость`, вы должны быть в ярости, и они автоматически заканчиваются, когда заканчивается ваша ярость."
        },
        {
            "key": "Откровение",
            "nameEng": "revelation",
            "desc": "Эффекты с этим признаком видят вещи такими, какими они являются на самом деле."
        },
        {
            "key": "Освященный",
            "nameEng": "sanctified",
            "desc": "Если вы `святой` или `нечестивый`, ваши освященные действия и заклинания приобретают тот же признак."
        },
        {
            "key": "Видение",
            "nameEng": "scrying",
            "desc": "Эффект `видения` позволяет вам видеть, слышать или иным образом получать на расстоянии сенсорную информацию, используя сенсор или прибор, вместо ваших глаз или ушей."
        },
        {
            "key": "Тень",
            "nameEng": "shadow",
            "desc": "Эта магия включает в себя тени или энергию Незримого Мира. Существа с этим признаком являются жителями Незримого Мира. Они могут выживать в основных эффектах окружающей среды Незримого Мира."
        },
        {
            "key": "Сон",
            "nameEng": "sleep",
            "desc": "Этот эффект может заставить существо уснуть или стать сонным."
        },
        {
            "key": "Форма заклинания",
            "nameEng": "spellshape",
            "desc": "Действия с признаком `форма заклинания` изменяют свойства ваших заклинаний. Обычно эти действия идут от способностей формы заклинаний. Вы обязаны использовать действие формы заклинания сразу перед тем, как \"Сотворить\" заклинание, которое хотите изменить. Если вы сразу после этого используете любое действие, отличное от \"Сотворения заклинания\" (включая свободные действия и реакции), то лишаетесь преимуществ действия формы заклинания. Это преимущество также теряется, если ваш ход заканчивается до того как вы \"Сотворите заклинание\". Любые дополнительные эффекты добавленные действием формы заклинания являются частью эффекта заклинания, а не самого действия формы заклинания."
        },
        {
            "key": "Стойка",
            "nameEng": "stance",
            "desc": "Стойка это общая боевая стратегия, и вы в нее становитесь используя действие с признаком `стойка`, и остаетесь в ней некоторое время. Стойка длится пока вас не нокаутируют, требования (если они есть) стойки буду нарушены, пока не закончится столкновение, или пока вы не встанете в новую стойку, в зависимости от того, что произойдёт раньше. После использования действия с признаком `стойка`, вы не можете использовать другое в течение 1 раунда. Вы можете встать в стойку, или быть в ней, только во время режима столкновения."
        },
        {
            "key": "Строение",
            "nameEng": "structure",
            "desc": "Заклинание, активация предмета, или умение с признаком `строение` создаёт магическое здание или другую постройку. Строение должно быть создано на земле, свободной от других строений. Строение адаптируется к естественному ландшафту, принимая структурные требования для строительства в этом месте. Строение приспосабливает небольшие объекты вокруг, такие как пруды или острые скалы, но она не может быть создана на воде или других не твердых поверхностях. При создании на снегу, песчаных дюнах или других мягких поверхностях с твёрдой поверхностью под ними фундамент сооружения (если он есть) достигает твёрдой земли. Если строение находится на твёрдой, но неустойчивой поверхности, такой как болото или область, подверженная подземными толчками, каждый день выполняйте @Check[flat|dc:3]{Чистую проверку}; при провале строение начинает тонуть или разрушаться.</p><p>Строение не причиняет вреда существам в пределах области, когда оно появляется, и оно не может быть создана в толпе или в густонаселенном районе. Любое существо, случайно оказавшееся внутри строения при активации предмета, оказывается невредимым внутри завершенного строения и всегда имеет чистый путь к выходу. Существо, находящееся внутри строения в момент создания, невредимо, и оно безвредно приземляется на землю, если оно было на верхнем уровне строения."
        },
        {
            "key": "Незаметный",
            "nameEng": "subtle",
            "desc": "Заклинание с признаком `незаметный` может быть сотворено без слов и не имеет очевидных проявлений."
        },
        {
            "key": "Призыв",
            "nameEng": "summon",
            "desc": "Заклинания с признаком `призыв` могут призывать существ, обычно обладающих определенным признаком. Таких существ можно найти в Monster Core и подобных книгах. Если не указано иное, существо должно быть обычным, оно приобретает признак `призванное` и должно появиться в свободном пространстве в пределах дистанции, достаточно большом, чтобы вместить его. Самый высокий уровень существа, которое может вызвать заклинание, зависит от ранга заклинания. По вашему желанию заклинание может призвать существо более низкого уровня. Эти правила относятся только к заклинаниям с признаком `призыв`, другие заклинания, вызывающие или призывающие предметы или существ, но не имеющих этого признака, например заклинание `призыв музыкального инструмента` действуют так, как описано в заклинании."
        },
        {
            "key": "Призванный",
            "nameEng": "summoned",
            "desc": "Существо, вызванное заклинанием или эффектом воплощения, получает признак `призванный`. Призванное существо не может призывать других существ, создавать ценные вещи, или сотворять заклинания которые имеют стоимость. Оно имеет признак `миньон`. Если оно пытается сотворять заклинание больше или равное ранга заклинания призвавшего его, то это пересиливает магию призыва, заклинание проваливается, а заклинание призыва заканчивается. В противном случае, призванное существо использует стандартные умения существа своего вида. Оно обычно атакует ваших врагов настолько хорошо, на сколько позволяют его умения. Если вы можете общаться с ним, то можете пытаться давать команды, но Мастер решает степень успешности следования вашим приказам.\nСразу же, когда вы завершаете \"Сотворение заклинания\", призванное существо использует свои 2 действия в этот ход. Призванное существо не может контролировать никаких порожденных или созданных им самим существ, и такие существа возвращаются в свое неизменное состояние (обычно вид тела в случае с порождениями), как только призванное существо уйдет. Если неясно каким будет это состояние, то решение остаётся за Мастером.\nПризванные существа могут быть изгнаны различными заклинаниями и эффектами. Они автоматически изгоняются если их ОЗ снижаются до 0 или если заканчивается призвавшее их заклинание."
        },
        {
            "key": "Телепортация",
            "nameEng": "teleportation",
            "desc": "Эффекты `телепортации` позволяют вам мгновенно перемещаться из одного пространства в другое. Обычно телепортация не провоцирует реакции основанные на движении."
        },
        {
            "key": "Передача",
            "nameEng": "transfer",
            "desc": "Такие действия уменьшают ОЗ вашей <em>\"Жизненной сети\"</em>. В вашей <em>\"Жизненной сети\"</em> должно быть как минимум столько же ОЗ, сколько указано в \"цене передачи\", чтобы использовать такие действия. Если вы не можете заплатить указанную цену, действие прерывается."
        },
        {
            "key": "Испытание",
            "nameEng": "trial",
            "desc": ""
        },
        {
            "key": "Истинное имя",
            "nameEng": "true-name",
            "desc": "Для использования элементов правил с этим признаком требуется знать истинное имя существа."
        },
        {
            "key": "Визуальный",
            "nameEng": "visual",
            "desc": "Визуальный эффект может воздействовать только на существ которые могут его видеть. На усмотрение Мастера, это применяется только к видимым частям эффекта."
        },
        {
            "key": "Примесь",
            "nameEng": "additive",
            "desc": "Способности с признаком `примесь` позволяют вам добавлять особые субстанции в алхимические расходуемые предметы, которые вы создаёте <em>\"Быстрой алхимией\"</em> (вы не можете использовать примеси с быстрыми склянками). К одному алхимическому предмету вы можете добавить только одну примесь, за раунд вы можете добавить только одну примесь, и большинство примесей указывают, к каким типам расходуемых предметов их можно добавить."
        },
        {
            "key": "Примесь 1",
            "nameEng": "additive1",
            "desc": "Способности с признаком `примесь` позволяют вам добавлять особые субстанции в алхимические расходуемые предметы, которые вы создаёте <em>\"Быстрой алхимией\"</em> (вы не можете использовать примеси с быстрыми склянками). К одному алхимическому предмету вы можете добавить только одну примесь, за раунд вы можете добавить только одну примесь, и большинство примесей указывают, к каким типам расходуемых предметов их можно добавить."
        },
        {
            "key": "Примесь 2",
            "nameEng": "additive2",
            "desc": "Способности с признаком `примесь` позволяют вам добавлять особые субстанции в алхимические расходуемые предметы, которые вы создаёте <em>\"Быстрой алхимией\"</em> (вы не можете использовать примеси с быстрыми склянками). К одному алхимическому предмету вы можете добавить только одну примесь, за раунд вы можете добавить только одну примесь, и большинство примесей указывают, к каким типам расходуемых предметов их можно добавить."
        },
        {
            "key": "Примесь 3",
            "nameEng": "additive3",
            "desc": "Способности с признаком `примесь` позволяют вам добавлять особые субстанции в алхимические расходуемые предметы, которые вы создаёте <em>\"Быстрой алхимией\"</em> (вы не можете использовать примеси с быстрыми склянками). К одному алхимическому предмету вы можете добавить только одну примесь, за раунд вы можете добавить только одну примесь, и большинство примесей указывают, к каким типам расходуемых предметов их можно добавить."
        },
        {
            "key": "Последствие",
            "nameEng": "aftermath",
            "desc": "Этот признак описывает способности, которые представляют собой особые возможности, полученные после контакта с чем-то странным и смертоносным."
        },
        {
            "key": "Алхимический",
            "nameEng": "alchemical",
            "desc": "Алхимические предметы подпитывают реакциями алхимических реагентов. Если не сказано иначе, алхимические предметы не являются магическими и не излучают магическую ауру. Алхимические существа частично работают за счет алхимических реакций."
        },
        {
            "key": "Явление",
            "nameEng": "apparition",
            "desc": "<p>Явления — это духовные сущности, которые, как правило, не обладают достаточной силой, связностью или привязанностью, чтобы войти в физический мир или повлиять на него. В отличие от привидения или фантома, явление не обязательно должно быть живым существом, оно может быть духовной памятью об особенно значимом месте или событии. Явления зависят от анимистов, чтобы взаимодействовать с другими смертными и вещами, и как правило, не могут быть направлены или затронуты заклинаниями или способностями, кроме тех, с которыми гармонизирует анимист. Способности и умения анимиста влияющие на духов, действуют на явления, только если в них это специально оговорено.</p><p>Способности анимиста с признаком `явление` включают в себя одно или несколько ваших явлений, действующих вместе с вами. Чтобы использовать способность вы должны гармонизировать с хотя бы одним явлением, а некоторые способности могут указывать в требованиях с каким именно явлением вы должны гармонизировать. Обычно предполагается, что вы всегда гармонизируете со своими явлениями во время ежедневных приготовлений, но в некоторых редких обстоятельствах или в результате использования определенных способностей анимиста, ваши явления могут быть рассеяны или отделены от вас на некоторое время; вы не гармонизируете с рассеянными явлениями.</p>"
        },
        {
            "key": "Архетип",
            "nameEng": "archetype",
            "desc": "Эта способность относится к архетипу."
        },
        {
            "key": "Область",
            "nameEng": "area",
            "desc": "Из оружия с этим признаком можно стрелять, только используя действие \"Огонь по области\"."
        },
        {
            "key": "Артефакт",
            "nameEng": "artifact",
            "desc": "Предметы с этим признаком являются артефактами. Эти магические предметы нельзя создать обычными способами, и их нельзя повредить обычными способами. Артефакты всегда являются редкими или уникальными."
        },
        {
            "key": "Созвучие",
            "nameEng": "attuned",
            "desc": "Вы не можете использовать умения с признаком `созвучие` когда вы не в созвучии. Многие умения `созвучия` требуют, чтобы вы были либо в созвучии с гравитонами, либо в созвучии с фотонами, в то время как остальные могут давать дополнительные преимущества в зависимости от вашего текущего звёздного созвучия."
        },
        {
            "key": "Автоматическое",
            "nameEng": "automatic",
            "desc": "Помимо обычных \"Ударов\", вы можете стрелять из этого оружия, используя действие \"Автоматический огонь\"."
        },
        {
            "key": "Потрясание",
            "nameEng": "brandish",
            "desc": ""
        },
        {
            "key": "Бравада",
            "nameEng": "bravado",
            "desc": "Действия с этим признаком могут давать вам кураж в зависимости от результата проверки. При успехе проверки для действия `бравада`, вы получаете кураж, а при провале (но не критическом провале) этой проверки, вы всё ещё получаете кураж, но только до конца своего следующего хода. Эти эффекты могут применяться даже если у этого действия не было других эффектов из-за провала или иммунитета существа."
        },
        {
            "key": "Призвание",
            "nameEng": "calling",
            "desc": "Признак `призвание` указывает на механическую опцию, которую персонаж получает, когда впервые завладевает мифической силой. Каждое призвание даёт возможность использовать и восстанавливать Очки Мифа."
        },
        {
            "key": "Цирк",
            "nameEng": "circus",
            "desc": ""
        },
        {
            "key": "Класс",
            "nameEng": "class",
            "desc": "Архетипы с признаком `класс` представляют собой фундаментальное расхождение с особенностями вашего класса, но такое, которое существует в контексте вашего класса. Вы можете выбрать классовый архетип только, если ваш класс соответствует критериям перечисленным в предварительных условиях архетипа. В дополнение к любым предлагаемым новым способностям, классовые архетипы всегда изменяют или замещают некоторые из статичных особенностей класса. Если классовый архетип изменяет или замещает некоторые начальные особенности класса, то его возможно взять на 1-м уровне. Такие возможности представлены почти как особенности класса и включают предварительные условия классового архетипа и правила о том, как они изменяют ваш класс. Если вы выбираете эту возможность, то обязаны взять способность посвящения этого архетипа на 2-м уровне и после этого продолжать как обычно. У вас никогда не может быть более 1 классового архетипа."
        },
        {
            "key": "Коагулянт",
            "nameEng": "coagulant",
            "desc": "Исцеляющие алхимические предметы с признаком `коагулянт` теряют эффективность при многократном применении за короткое время. Если существо восстанавливает ОЗ от предмета с признаком `коагулянт`, это существо на 10 минут временно иммунно к исцелению ОЗ от последующих предметов с признаком `коагулянт` (но не к другим эффектам от этих предметов)."
        },
        {
            "key": "Составной",
            "nameEng": "composite",
            "desc": "Составной импульс объединяет несколько стихий. Вы можете получить импульс с признаком составной только в том случае, если ваши кинетические стихии включают все стихии, перечисленные в признаках этого импульса."
        },
        {
            "key": "Цикл",
            "nameEng": "cycle",
            "desc": "Действия с признаком `цикл` меняют ваше текущее звёздное созвучие на противоположное. Когда вы используете действие с этим признаком, вы получаете преимущество дополнительного эффекта от вашего текущего созвучия, если у действия был признак `созвучие`, но после его завершения ваше созвучие меняется на противоположное (то есть на созвучие с гравитонами, если вы были в созвучии с фотонами до совершения этого действия, и наоборот)."
        },
        {
            "key": "Посвящение",
            "nameEng": "dedication",
            "desc": "Способность посвящения каждого архетипа отражает целеустремлённость вашего персонажа в изучении нового набора умений, что делает невозможным распыление внимания для одновременного развития другого архетипа. После выбора способности посвящения вы не можете выбрать другую способность посвящения, пока не завершите своё текущее посвящение, получив две другие способности вашего текущего архетипа. Вы не можете переобучиться способности посвящения, пока у вас есть другие способности этого архетипа."
        },
        {
            "key": "Предназначение",
            "nameEng": "destiny",
            "desc": "Признак `предназначение` указывает на первую способность мифического предназначения. Вы должны быть мифическим персонажем 12-го уровня, чтобы выбрать предназначение, и не можете выбирать другие способности этого предназначения, не взяв сначала саму способность предназначения."
        },
        {
            "key": "Девиантный",
            "nameEng": "deviant",
            "desc": "Этот признак описывает странные сверхъестественные или паранормальные возможности."
        },
        {
            "key": "Распоряжение",
            "nameEng": "directive",
            "desc": "Действия с этим признаком являются особыми приказами, которые дают преимущества вашим союзникам, если они им следуют. Ваши союзники должны быть способны ощущать вас, чтобы получать преимущества от ваших `распоряжений`. У этого действия есть признак `слуховой` или `визуальный` в зависимости от того, как вы вдохновляете своих союзников."
        },
        {
            "key": "Дисгармония",
            "nameEng": "disharmony",
            "desc": "Действия с признаком `дисгармония` изменяют ваше текущее звёздное созвучие на \"не в созвучии\". Когда вы используете действие с этим признаком, вы получаете преимущество дополнительного эффекта от вашего текущего созвучия, если у действия был признак `созвучие`, но после его завершения вы становитесь не в созвучии."
        },
        {
            "key": "Отдых",
            "nameEng": "downtime",
            "desc": "Активность с этим признаком занимает день или более, и может быть использована только в режиме отдыха."
        },
        {
            "key": "Эзотерика",
            "nameEng": "esoterica",
            "desc": "Признак `эзотерика` присутствует во многих способностях и классовых особенностях тауматурга, использующих различные талисманы, сверхъестественные безделушки и другие объекты, которые вы носите с собой. Для использования умений, обладающих признаком эзотерики, требуется, чтобы у вас в распоряжении была ваша эзотерика. Обычно предполагается, что эзотерика всегда при вас, но в некоторых редких обстоятельствах ее может не оказаться под рукой или ее у вас отберут."
        },
        {
            "key": "Эволюция",
            "nameEng": "evolution",
            "desc": "Способности с этим признаком воздействуют на эйдолона призывателя, а не на него самого, обычно давая ему дополнительные физические возможности."
        },
        {
            "key": "Финишер",
            "nameEng": "finisher",
            "desc": "Финишеры — это эффектные завершающие движения, которые используют ваш кураж. Вы можете использовать финишер только когда у вас есть кураж, и вы теряете свой кураж сразу же после выполнения финишера. После использования финишера вы до конца своего хода не можете использовать действия с признаком `атака`. Некоторые действия с признаком `финишер` также дают эффект при провале. Эффекты, добавляемые при провале, не применяются при критическом провале. Если ваше действие-финишер успешное, вы всё равно можете выбрать эффект провала. Например, вы можете сделать это когда атака не наносит урона из-за сопротивления."
        },
        {
            "key": "Размах",
            "nameEng": "flourish",
            "desc": "Действия с признаком `размах` — особые приёмы, требующие от вас слишком больших усилий, чтобы выполнять их часто. Вы можете использовать только одно действие с признаком `размах` за раунд."
        },
        {
            "key": "Общая",
            "nameEng": "general",
            "desc": "Вид способности которую может выбирать любой персонаж вне зависимости от родословной и класса, пока он соответствует предварительным условиям. Вы можете выбрать способность с таким признаком когда ваш класс получает общую способность."
        },
        {
            "key": "Ипостась",
            "nameEng": "ikon",
            "desc": "Предмет с признаком `ипостась` — это особый предмет, предоставленный или созданный божественностью героя, настолько связанный с ним, что может служить священным сосудом для его могущества. На первом уровне вы получаете три ипостаси. Каждая ипостась обладает пассивной способностью имманентности и активируемой способностью трансцендентности. Способность с признаком `ипостась` наделяет одну из ваших ипостасей дополнительными способностями. Каждый раз, когда вы получаете способность с признаком `ипостась`, выберите какая из ваших ипостасей получит эту способность, если у вас есть несколько ипостасей, отвечающих требованиям способности, вы можете выбрать способность несколько раз, чтобы применить её эффект к другой вашей ипостаси. В этих способностях указано, в какую ипостась они могут быть внедрены, и любое их количество может быть внедрено в одну ипостась."
        },
        {
            "key": "Импульс",
            "nameEng": "impulse",
            "desc": "Импульсами называются основные магические действия используемые кинетиками. Вы можете использовать импульс, только если ваша кинетическая аура активна и проводит эту стихию, и только если у вас свободна рука для формирования потока стихий. Признак импульс означает, что данное действие имеет признак концентрация, если только это не меняется другим умением. Если импульс позволяет вам выбрать стихию, то можете выбрать любую проводимую вами стихию, и импульс получает признак этой стихии."
        },
        {
            "key": "Нагнетание",
            "nameEng": "infusion",
            "desc": "Действия с признаком `нагнетание` изменяют кинетические импульсы. Вы должны использовать действие нагнетания непосредственно перед действием импульса, который хотите изменить. Если вы сразу после него используете любое действие (включая свободные действия и реакции), отличное от действия импульса, то теряете преимущества нагнетающего действия. Любые дополнительные эффекты, добавленные нагнетающим действием, являются частью эффекта импульса, а не самого действия нагнетания."
        },
        {
            "key": "Ранение",
            "nameEng": "injury",
            "desc": "Ранящий яд активируется при нанесении его на оружие или боеприпасы и действует на цель первого удара, нанесённого отравленным предметом. Если этот удар успешен и наносит колющий или рубящий урон, цель должна совершить спасбросок против яда. При проваленном ударе цель не получает урона, но яд остаётся на оружии, и вы можете повторить попытку. При критическом провале или если удар не наносит колющего или рубящего урона по какой-то другой причине, яд расходуется, но цель не затронута."
        },
        {
            "key": "LFAN",
            "nameEng": "lfan",
            "desc": "Feats with the LFAN trait represent optional functional improvements to a raxilite's LFAN."
        },
        {
            "key": "Род",
            "nameEng": "lineage",
            "desc": ""
        },
        {
            "key": "Проявление",
            "nameEng": "manifestation",
            "desc": "Способности с этим признаком улучшают или изменяют ваши солнечные воплощения (вспышку, ореол и оружие), либо позволяют вам создавать новые виды солнечных воплощений."
        },
        {
            "key": "Сдвиг разума",
            "nameEng": "mindshift",
            "desc": "Действие с этим признаком всегда может быть изменено для использования чистой силы вашего разума. При совершении этого действия, вы можете заменить любой наносимый им урон на ментальный, дать ему `ментальный` признак и заменить любой требуемый спасбросок на Волю. Действие теряет все признаки, соответствующие типам урона, которые оно больше не наносит."
        },
        {
            "key": "Модификация",
            "nameEng": "modification",
            "desc": "Способность с этим признаком изменяет конструкцию вашей инновации. Если у вас есть особенность класса <em>\"Перенастройка\"</em>, то вы можете легче переобучиться такой способности."
        },
        {
            "key": "Мультикласс",
            "nameEng": "multiclass",
            "desc": "Архетипы с признаком `мультикласс` представляют собой разнообразие вашего обучения особенностям другого класса. Вы не можете выбрать способность посвящения мультиклассового архетипа, если вы обладаете классом с тем же названием (например, воин не может выбрать способность Посвящение воина)."
        },
        {
            "key": "Клятва",
            "nameEng": "oath",
            "desc": "Клятвы добавляют дополнительные принципы к вашему кодексу. Обычно, вы можете иметь только одну способность с этим признаком."
        },
        {
            "key": "Переполнение",
            "nameEng": "overflow",
            "desc": "Мощные импульсы временно истощают энергию ваших кинетических врат. При использовании импульса с признаком `переполнение`, ваша кинетическая аура отключается до тех пор, пока вы не восстановите ее (обычно с помощью Проведение стихий). Столь сильное использование стихии требует больших усилий, поэтому можно использовать только 1 переполненный импульс в раунд, даже если вы восстановите свои кинетические врата."
        },
        {
            "key": "Повсеместная магия",
            "nameEng": "pervasive-magic",
            "desc": ""
        },
        {
            "key": "Натиск",
            "nameEng": "press",
            "desc": "Действия с этим признаком позволяют вам продолжать совершенные ранее атаки. Действия с признаком `натиск` могут быть использованы только, если вы в данный момент подвержены штрафу множественных атак. Некоторые действия с признаком `натиск` также дают эффекты при провале. Эффекты добавляемые при провале не применяются при критическом провале. В случае успеха действия с `натиском`, вы можете выбрать применение эффекта провала (например, вы можете захотеть так сделать когда атака не наносит урона из-за сопротивления). Так как действию `натиска` требуется штраф множественных атак, вы не можете использовать его вне своего хода, даже если используете активность \"Приготовиться\"."
        },
        {
            "key": "Безрассудство",
            "nameEng": "reckless",
            "desc": ""
        },
        {
            "key": "Реинкарнация",
            "nameEng": "reincarnated",
            "desc": "Эта способность родословной доступна любому персонажу, который хотя бы раз реинкарнировал, либо в рамках своей предыстории, либо из-за реинкарнации, произошедшей во время игры."
        },
        {
            "key": "Тайна",
            "nameEng": "secret",
            "desc": "Мастер совершает бросок этой проверки умения втайне."
        },
        {
            "key": "Навык",
            "nameEng": "skill",
            "desc": "Общая способность с признаком `навык` улучшает ваши навыки и их действия или дает вам новые действия навыка. Способность с этим признаком может быть выбрана когда класс дает способность навыка или общую способность. Способности архетипа с признаком `навык` могут быть выбраны вместо способности навыка, если у вас есть способность посвящения этого архетипа."
        },
        {
            "key": "Публичный",
            "nameEng": "social",
            "desc": "Действия и умения с признаком `публичный` могут быть использованы только когда линчеватель в публичной персоне."
        },
        {
            "key": "Магический стрелок",
            "nameEng": "spellshot",
            "desc": "PF2E.TraitNoDescription"
        },
        {
            "key": "Выносливость",
            "nameEng": "stamina",
            "desc": ""
        },
        {
            "key": "Подавление",
            "nameEng": "suppressed",
            "desc": "Существа, подавленные солдатом, могут получить дополнительные состояния и другие отрицательные эффекты, из-за использования (солдатом) способностей с признаком 'подавление'; солдат может применить только одну такую способность каждый раз, когда использует действие, накладывающее состояние `подавление`."
        },
        {
            "key": "Тактика",
            "nameEng": "tactic",
            "desc": ""
        },
        {
            "key": "Талисман",
            "nameEng": "talisman",
            "desc": "Талисман это небольшой объект прикрепленный к доспеху, щиту или оружию (и называется прикрепленным предметом). Чтобы активировать прикрепленный талисман, вы должны владеть предметом или носить его надетым. После активации талисман тут же сгорает."
        },
        {
            "key": "Тандем",
            "nameEng": "tandem",
            "desc": "Действия с этим признаком подразумевают совместные действия эйдолона и призывателя. Вы не можете использовать тандемное действие, если ни вы, ни ваш эйдолон не можете действовать, если вы не Проявили своего эйдолона или если вы Проявили своего эйдолона таким образом, что он не является отдельной сущностью (например, с помощью способности Слияние с эйдолоном). Тандемные действия часто позволяют и вам, и вашему эйдолону совершать отдельные действия, но это должны быть действия, совершаемые отдельно вами и вашим эйдолоном; вы не можете использовать тандемное действие для совершения другого тандемного действия."
        },
        {
            "key": "Технический",
            "nameEng": "tech",
            "desc": "<p>Снаряжение с признаком `технический` работает от электричества и может получать состояние <em>`сбоящий`</em>. Некоторые существа и опасности также обладают признаком `технический`, например искусственный интеллект, роботы и турели.</p>\n<p>Доспехи с признаком `технический` оснащены электроникой, компьютерными системами, встроенными источниками питания и коммуникатором.</p>\n<p>Щиты с признаком `технический` оснащены электроникой, компьютерными системами и встроенными источниками питания.<p>\n</p>Оружие с признаком `технический` оснащено электроникой, компьютерными системами и источниками питания. Обычно такое оружие работает от встроенных источников питания (например, оружие ближнего боя, не имеющее признака `аккумуляторное`), но есть и такое, которое расходует заряд аккумулятора при каждой атаке.</p>\n<p>Кибернетические имплантаты являются технологическими, а не магическими, хотя они не подвержены никаким эффектам или атакам, нацеленным на технологии, если только не указано, что они влияют на кибернетику.<p>"
        },
        {
            "key": "Время",
            "nameEng": "time",
            "desc": "Существа времени происходят родом из Измерения Времени. Они не стареют, и хотя некоторые из них могут быть влекомы сверхъестественным голодом, им не нужно ни есть ни пить для существования. Они могут выживать в простых природных явлениях Измерения Времени."
        },
        {
            "key": "Трансцендентность",
            "nameEng": "transcendence",
            "desc": "Трансцендентность направляет мощь божественной искры героя через одну из его ипостасей, чтобы превзойти деяния смертных и совершить чудесное деяние. У каждой ипостаси есть действие с признаком `трансцендентность` и оно активируется действием \"Трансцендентность искры\". Чтобы использовать это действие, ваша божественная искра должна быть наделена силой этой ипостаси, а сама ипостась должна быть готова к использованию (обычно вы держите ипостась оружие или носите носимую ипостась). Сразу же после того, как вы зажжете искру трансцендентности, ваша божественная искра будет с силой выброшена из этой ипостаси и попадет в другую ипостась по вашему выбору. Вы можете использовать \"Трансцендентность искры\" только раз в раунд. Поскольку действие трансцендентности исходит от вашей божественной искры, оно обладает признаком `сакральный`."
        },
        {
            "key": "Передвижение",
            "nameEng": "traversal",
            "desc": ""
        },
        {
            "key": "Нестабильный",
            "nameEng": "unstable",
            "desc": "Нестабильные действия используют экспериментальное применение вашей инновации, которое даже вы не можете полностью предсказать. После совершения нестабильного действия, использование ещё одного опасно."
        },
        {
            "key": "Линчеватель",
            "nameEng": "vigilante",
            "desc": "Ваши классовые способности и способности линчевателя связаны с вашей идентичностью линчевателя, и использование их в вашей социальной идентичности может привести к риску разоблачения вас как линчевателя. Если ваша личность будет выставлена на всеобщее обозрение вы потеряете преимущества маскировки \"Посвящения линчевателя\", но можете потратить 1 неделю свободного времени на создание новой социальной идентичности."
        },
        {
            "key": "Вирулентный",
            "nameEng": "virulent",
            "desc": "От недугов с признаком `вирулентный` тяжелее избавиться. Чтобы снизить стадию вирулентного недуга на 1, вам необходимо совершить подряд два успешных спасброска. Критический успех снижает стадию вирулентного небуга только на 1 а не на 2."
        },
        {
            "key": "Блуждающий",
            "nameEng": "wandering",
            "desc": "Блуждание определяет способности анимистов, настроенных на определённые типы явлений. Эти способности требуют, чтобы на момент их выбора вы гармонизировали с явлением, соответствующим их предварительным условиям, и представляют собой знания и способности, полученные от этой конкретной связи. Когда вы совершаете ежедневные приготовления, вы можете переобучить любую известную вам `блуждающую` способность на любую другую `блуждающую` способность, доступную на том уровне, на котором вы взяли заменяемую способность (включая `блуждающие` способности более низкого уровня, как обычно). При этом вы должны удовлетворять всем остальным предварительным условиям способности."
        },
        {
            "key": "Зона",
            "nameEng": "zone",
            "desc": "Такие действия дают дополнительный эффект вашему квантовому полю. Вы можете применять эффекты `зоны` только к квантовому полю, у которого ещё нет эффекта `зоны`."
        },
        {
            "key": "Дыхание в бутылке",
            "nameEng": "bottled-breath",
            "desc": "Бутылки дыхания — это зачарованные бутылки облаков и тумана, впервые разработанные жителями Плана Воздуха. Вы можете \"Активировать\"предмет с этим признаком, когда вы вдыхаете его или заставляете другое существо вдохнуть его."
        },
        {
            "key": "Катализатор",
            "nameEng": "catalyst",
            "desc": "Предметы с признаком `катализатор` являются расходуемыми материальными компонентами заклинания, которые изменяют или усиливают определенные заклинания. Активация катализатора — часть \"Сотворения\" этого заклинания. Катализатор может увеличивать количество действий требуемых для \"Сотворения заклинания\", как указано в его записи `Активация`. Кроме того, заклинание получает признак `воздействие`, если у него ещё его не было. Так как катализатор становится частью заклинания, вы можете достать его как часть \"Сотворения заклинания\"."
        },
        {
            "key": "Заводной",
            "nameEng": "clockwork",
            "desc": "Заводные это замысловатые сложные конструкты, которых можно запрограммировать для выполнения определенных функций. Заводное существо необходимо регулярно заводить, чтобы оно функционировало."
        },
        {
            "key": "Расходуемый",
            "nameEng": "consumable",
            "desc": "Предмет с этим признаком можно использовать только 1 раз. Он уничтожен после активации, если не сказано иначе. К расходуемым предметам относятся алхимические предметы и магические расходники, такие как свитки и талисманы. Когда персонаж создает расходуемые предметы, он может делать их партиями по 4."
        },
        {
            "key": "Контакт",
            "nameEng": "contact",
            "desc": "Контактный яд активируется при нанесении его на предмет или непосредственно на кожу живого существа. Первое существо, прикоснувшееся к затронутому предмету, должно совершить спасбросок против яда; если яд нанесён напрямую, существо должно совершить спасбросок сразу же, как только яд коснется его кожи. Контактные яды невозможно применить к существу с помощью атаки оружием из-за логики доставки яда, не отравив себя. Обычно время возникновения последствий контактного яда составляет 1 минуту."
        },
        {
            "key": "Проклятый",
            "nameEng": "cursed",
            "desc": "Предмет с этим признаком проклят, чтобы причинять неприятности своему хозяину. Проклятие не обнаруживается при идентификации предмета, но критический успех показывает наличие и точную природу проклятия. Проклятые предметы нельзя выбросить после того, как они сработали или были инвестированы в первый раз. Убрать предмет можно только в том случае, если снято проклятие."
        },
        {
            "key": "Наркотик",
            "nameEng": "drug",
            "desc": "Предмет с этим признаком является наркотиком, — ядом, который приносит краткосрочную пользу в дополнение к вредным побочным эффектам и долгосрочным последствиям. Каждый раз, когда существо употребляет наркотик, оно также должно совершить спасбросок против зависимости от этого наркотика."
        },
        {
            "key": "Эликсир",
            "nameEng": "elixir",
            "desc": "Эликсиры являются алхимическими жидкостями, которые используются при их употреблении."
        },
        {
            "key": "Расширяемый",
            "nameEng": "expandable",
            "desc": "При активации предмет с признаком `расширяемый` увеличивается до определенного размера. Если не указано иное, это пространство должно находиться рядом с вами и на земле, а у предмета должно быть достаточно открытого пространства, чтобы расшириться, иначе активация не даст эффекта. Когда эффект заканчивается, `расширяемый` предмет распадается, если это был `расходуемый` предмет, или уменьшается до своего обычного размера, если это был постоянный предмет."
        },
        {
            "key": "Фея",
            "nameEng": "fey",
            "desc": "Существа из Первого Мира называются феями."
        },
        {
            "key": "Фулу",
            "nameEng": "fulu",
            "desc": "Фулу это небольшие бумажные амулеты, которые можно прикрепить к доспехам, щиту, оружию, существу или даже сооружению. Некоторые фулу состоят из нескольких таких амулетов, которые начинают действовать только после того, как они все будут прикреплены. Обычные фулу действуют сразу после прикрепления, в то время как фулу талисманы дают эффект только после активации. После активации фулу действует в течение заданной продолжительности, а затем сгорает. Если не указано иначе, фулу теряют свои свойства через 1 год после создания, превращаясь в обычную бумагу.\nВсе фулу обладают признаками `фулу` и `расходуемый`. Еще у них есть признак магического обычая - `аркана`, `сакральный`, `оккультный`, `природный`. Например, фулу созданный жрецом будет иметь признак `сакральный`, а ведьма имеющая дело с судьбой могла бы создать `оккультный` фулу. Некоторые фулу обладают признаком `талисман`, если работают аналогично талисманам (прикрепляемые к комплектам доспехов, щиту или оружию)."
        },
        {
            "key": "Гаджет",
            "nameEng": "gadget",
            "desc": "Гаджеты это расходуемые технологические изобретения с инновационным применением."
        },
        {
            "key": "Насыщенный",
            "nameEng": "infused",
            "desc": "Алхимический предмет с признаком `насыщенный` теряет свои свойства через ограниченное время. Любые непостоянные эффекты от насыщенных алхимических предметов, за исключением недугов, таких как медленные яды, заканчиваются когда вы снова совершаете свои ежедневные приготовления."
        },
        {
            "key": "Глотаемый",
            "nameEng": "ingested",
            "desc": "Глотаемый яд активируется, если нанести его на пищу или питьё, которое будет употреблено живым существом, или поместить его непосредственно в рот живого существа. Существо совершает спасбросок против такого яда, когда употребляет яд, пищу или напиток, обработанные таким ядом. Время возникновения последствий таких ядов обычно колеблется от 1 минуты до 1 дня."
        },
        {
            "key": "Леденец",
            "nameEng": "lozenge",
            "desc": "Вы \"Активируете\" алхимический леденец, положив его в рот. Он остаётся там, медленно растворяясь и высвобождая свои ингредиенты с течением времени. Вы можете раскусить леденец, чтобы получить дополнительный эффект. Эффект, который при этом происходит, указан в предмете. Как только этот вторичный эффект проходит, леденец израсходован, и его польза для вас заканчивается. Вы можете пить эликсиры, зелья и напитки, держа леденец во рту, но вы не можете принимать более одного леденца за раз. Если вы держите во рту два леденца одновременно, оба становятся инертными. Вы также можете выплюнуть леденец в качестве одиночного действия, чтобы прекратить его действие и сделать неактивным. Леденец растворяется, благодаря своим алхимическим ингредиентам, поэтому, как правило, он продолжает действовать, даже если у вас нет слюны."
        },
        {
            "key": "Механический",
            "nameEng": "mechanical",
            "desc": "Опасность с этим признаком является созданным физическим объектом."
        },
        {
            "key": "Послание",
            "nameEng": "missive",
            "desc": "Послание — магический канцелярский предмет, который необходимо изготовить и составить, прежде чем его можно будет активировать. Все послания обладают признаками `послание` и `расходуемое`. Чаще всего послания изготавливают из бумаги или пергамента, но их можно изготовить и из другого тонкого портативного материала, на котором можно писать или тиснить. После изготовления послание остается чистым листом, пока на нем не будет написано сообщение, завершающее его магию."
        },
        {
            "key": "Мутаген",
            "nameEng": "mutagen",
            "desc": "Эликсир с признаком `мутаген` временно изменяет тело субъекта и его разум. Мутаген всегда дает один или несколько полезных эффектов наряду с одним или более вредными эффектами. Мутагены это эффекты `полиморфа`, значит что вы можете получить выгоду одновременно только от одного."
        },
        {
            "key": "Масло",
            "nameEng": "oil",
            "desc": "Масла — волшебные гели, притирки, пасты или мази, которые обычно наносятся на объект и расходуются в процессе."
        },
        {
            "key": "Зелье",
            "nameEng": "potion",
            "desc": "Зелье это магическая жидкость, которая активируется, когда вы ее пьете."
        },
        {
            "key": "Драгоценный",
            "nameEng": "precious",
            "desc": "Ценные материалы со специальными свойствами имеют признак `драгоценный`. Они могут заменить основные материалы когда вы \"Создаете\" предметы."
        },
        {
            "key": "Обработанный",
            "nameEng": "processed",
            "desc": "Алхимический расходуемый предмет с признаком `обработанный` можно создать с помощью \"Быстрой алхимии\", но он слишком сложен, чтобы создать его за одно действие."
        },
        {
            "key": "Сыворотка",
            "nameEng": "serum",
            "desc": "Это фармацевтические сыворотки; они могут быть технологическими или в некоторых случаях гибридными, но могут создаваться с помощью лаборатории, не требуя значительного использования магии. Вы можете активировать сыворотку действием \"Взаимодействия\", так как вы пьёте её или вливаете другому существу. Вы можете влить сыворотку только согласному или не способному сопротивляться беспомощному существу в вашей досягаемости. Обычно вам нужна одна конечность, чтобы активировать сыворотку."
        },
        {
            "key": "Свиток",
            "nameEng": "scroll",
            "desc": "Свиток содержит одно заклинание, которое вы можете сотворить без слота заклинания."
        },
        {
            "key": "Силок",
            "nameEng": "snare",
            "desc": "Ловушки, обычно созданные рейнджерами, силки используют специальные правила, которые позволяют создавать их быстро и применять на поле боя."
        },
        {
            "key": "Магическая пушка",
            "nameEng": "spellgun",
            "desc": "Признак `магической пушки` появляется на предметах, способных генерировать магический эффект, вылетающий подобно пуле. Вы можете совершить либо бросок атаки заклинанием, либо бросок атаки дальнего боя, используя свой ранг мастерства обращения с простым огнестрельным оружием. Магические пушки имеют шаг дистанции, применяемый независимо от того, какой тип атаки вы совершаете. Хотя вы можете использовать свой модификатор атаки простого огнестрельного оружия, магическая пушка на самом деле не является огнестрельным оружием. Вы не получаете ни урона от \"Удара\" огнестрельным оружием, ни других преимуществ, таких как критическая специализация. Точно так же вы не можете заряжать или перезаряжать магическую пушку, прикреплять к ней талисманы, наносить \"Удары\" магической пушкой в рамках действия позволяющего наносить \"Удары\" огнестрельным оружием и так далее."
        },
        {
            "key": "Брызги",
            "nameEng": "splash",
            "desc": "Некоторое оружие, такое как алхимические бомбы, и эффекты, имеют признак `брызги`. Вы не добавляете свой модификатор Силы к броскам урона брызгами для любого метаемого оружия с признаком `брызги` (даже если у него нет признака `бомба`). Оружие или эффект с признаком `брызги` наносит весь указанный урон брызгами цели при провале, успехе и критическом успехе, и всем остальным существам в радиусе 5 футов от цели при успехе или критическом успехе. При критическом провале оружие или эффект полностью промахиваются, не нанося урона. Сложите урон брызгами вместе с начальным уроном по цели, до применения сопротивлений или слабостей. При критическом попадании вы не умножаете урон брызг."
        },
        {
            "key": "Чай",
            "nameEng": "tea",
            "desc": "<p>Магический чай это разновидность `зелья`. Оно \"Активируется\", когда вы его пьёте, и расходуется быстрее. Магический чай обладает признаками `зелье` и `чай`. Когда вы готовите дозу магического чая, вы используете сырье в виде необычных и дорогих чайных листьев. Процесс приготовления магического чая включает в себе пропитку листьев магическими реагентами, очистку воды и замачивание чая в воде, в результате чего получается особенно вкусное зелье. Вы можете \"Активировать\" магический чай действием \"Взаимодействовать\", когда пьете его или поите им другое существо, как если бы это было `зелье`. Вы также можете \"Активировать\" магический чай совершив 10-минутную активность, для которого потребуется безупречная чайная посуда (этими инструментами ремесленника могут пользоваться до четырех смертных, выполняющих эту активность одновременно), чтобы приготовить чай, а затем выпить его или преподнести кому-нибудь во время короткой чайной церемонии, после чего эффекты чая начнут действовать; активация магического чая таким образом усиливает его эффекты, как описано в записи \"Чайная церемония\" каждого чая.</p><p>Как только вы выпьете дозу магического чая, вы получаете временный иммунитет к этому конкретному виду магического чая на 24 часа.</p>"
        },
        {
            "key": "Ловушка",
            "nameEng": "trap",
            "desc": "Опасность или предмет с этой чертой созданы, чтобы помешать злоумышленникам."
        },
        {
            "key": "Волшебная палочка",
            "nameEng": "wand",
            "desc": "Волшебная палочка содержит одно заклинание, которое вы можете сотворять раз в день."
        },
        {
            "key": "Точильный камень",
            "nameEng": "whetstone",
            "desc": ""
        },
        {
            "key": "Быстрое",
            "nameEng": "agile",
            "desc": "Получаемый с таким оружием штраф множественных атак, во время вашего хода, для второй атаки равен −4 вместо −5, а для третьей и последующих атак −8 вместо −10."
        },
        {
            "key": "Тяговое",
            "nameEng": "propulsive",
            "desc": "С тяговым дистанционным оружием, вы добавляете к броскам урона половину вашего модификатора Силы (если положительный). Если у вас отрицательный модификатор Силы, то добавляете ваш целый модификатор Силы."
        },
        {
            "key": "Обратный замах",
            "nameEng": "backswing",
            "desc": "С этим оружием, вы можете использовать инерцию атаки, которой промахнулись, чтобы нанести следующую. После промаха этим оружием во время своего хода, вы до конца своего хода, получаете бонус обстоятельства +1 к следующей атаке с помощью этого оружия."
        },
        {
            "key": "Силовое",
            "nameEng": "forceful",
            "desc": "Это оружие становится более опасным по мере того, как вы создаете импульс. Когда вы атакуете им более одного раза за ход, вторая атака получает бонус обстоятельства к урону, равный количеству костей урона оружия, а каждая последующая за ней атака получает бонус обстоятельства к урону, равный удвоенному количеству костей урона оружия."
        },
        {
            "key": "Длинное",
            "nameEng": "reach",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Размашистое",
            "nameEng": "sweep",
            "desc": "Это оружие делает широкие размашистые или вращающиеся атаки, что позволяет легче атаковать нескольких врагов. Когда вы атакуете этим оружием, то получаете бонус обстоятельства +1 к броску атаки, если уже использовали это оружие, чтобы атаковать другую цель в этот ход."
        },
        {
            "key": "Метательное",
            "nameEng": "thrown",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "Залповое 20 фт",
            "nameEng": "volley-20",
            "desc": "Это дистанционное оружие менее эффективно на ближних дистанциях. Ваши атаки по целям в пределах указанного расстояния получают штраф -2."
        },
        {
            "key": "Залповое 30 фт",
            "nameEng": "volley-30",
            "desc": "Это дистанционное оружие менее эффективно на ближних дистанциях. Ваши атаки по целям в пределах указанного расстояния получают штраф -2."
        },
        {
            "key": "Залповое 50 фт",
            "nameEng": "volley-50",
            "desc": "Это дистанционное оружие менее эффективно на ближних дистанциях. Ваши атаки по целям в пределах указанного расстояния получают штраф -2."
        },
        {
            "key": "Залповое 60 фт",
            "nameEng": "volley-60",
            "desc": "Это дистанционное оружие менее эффективно на ближних дистанциях. Ваши атаки по целям в пределах указанного расстояния получают штраф -2."
        },
        {
            "key": "Определённое убийство",
            "nameEng": "certain-kill",
            "desc": "Хранитель Света может использовать искусство Определенного Убийства, пока он находится внутри Стеклянного Маяка (Glass Lighthouse) — эти способности, обладающие признаком `определенное убийство`, вызывают очевидные искажения в структуре Маяка, когда пользователь использует эту технику. Однако, поскольку каждая техника требует, чтобы один из Хранителей Света временно взял на себя командование демипланом на себя, а не на остальную команду, в данном раунде любой из Хранителей Света может использовать только одно искусство Определенного Убийства."
        },
        {
            "key": "Skirmish",
            "nameEng": "skirmish",
            "desc": "This trait indicates abilities that can be used only during skirmish encounters."
        },
        {
            "key": "Вербальная дуэль",
            "nameEng": "вербальная-дуэль",
            "desc": ""
        },
        {
            "key": "Teamwork",
            "nameEng": "teamwork",
            "desc": "A teamwork action is a general combat strategy that you employ by using an action with the teamwork trait and designating a willing ally that meets the requirements as your partner. A teamwork lasts until you or your partner are knocked out, until its requirements (if any) are violated, until the encounter ends, or until you or your ally engage in another teamwork, whichever comes first. After you take an action with the teamwork trait, you and your partner can't take another one for 1 round. You can employ teamwork only in encounter mode. You or your partner can Dismiss a teamwork."
        },
        {
            "key": "Triumph",
            "nameEng": "triumph",
            "desc": "A triumph celebrates your acts during an encounter that make you feel triumphant and empower you to be bold. A triumph grants you benefits and gives you access to a bold action or activity. You celebrate a triumph until you get knocked out, until the encounter ends, until you use a triumph action again or until you've resolved a bold action or activity, whichever comes first. You can only celebrate a triumph while in encounter mode."
        },
        {
            "key": "Bold",
            "nameEng": "bold",
            "desc": "Bold actions are actions granted to you while under a triumph effect, and using an action with the bold trait ends the triumph effect after the action is resolved. You cannot use more than one bold action per turn. Once a bold action is used, you cannot gain another triumph effect for 1 round."
        },
        {
            "key": "Terminus",
            "nameEng": "terminus",
            "desc": "Terminus actions specify a cycle, which indicates the benefit your terminus provides you until the end of the current encounter where the cycle number is the number of times you have used that terminus action during the current encounter. You gain no additional benefits for using a terminus action if you have already reached its highest cycle in the current encounter."
        },
        {
            "key": "Exploit",
            "nameEng": "exploit",
            "desc": "With enough study, a wizard can learn to take advantage of the loopholes and rule gaps of magic to reconstitute its power into another form. This gives the wizard unique and unusual ways to make arcane magic obey them through subverting a spell’s normal behavior by either compressing it into a reactive rebuttal or unraveling it carefully to produce an alternate effect. Using an exploit costs a prepared arcane spell slot with specific qualities and the rank of the spell slot you expend determines the strength of the effects. You can use only one action with the exploit trait per round. For the purposes of counteract checks, exploits are treated as spells equal to the rank of the expended spell."
        },
        {
            "key": "(HOUSEPATCHED)",
            "nameEng": "xdy-pf2e-housepatched",
            "desc": "Houseruled using the PF2e Workbench's Housepatcher feature."
        },
        {
            "key": "НИП",
            "nameEng": "npc",
            "desc": ""
        },
        {
            "key": "Приспособленный",
            "nameEng": "adjusted",
            "desc": "Снаряжение снабжено приспособлением, указанным в его описании. Это приспособление встроено в снаряжение навсегда, то есть его нельзя ни добавить, ни поменять на другое. Если приспособление изменяет базовую статистику предмета, например добавляет шумовую характеристику, это уже отражено в записи снаряжения."
        },
        {
            "key": "Аналоговое",
            "nameEng": "analog",
            "desc": "В этом оружии нет продвинутой электроники, компьютерных систем и электрического источника питания, но оно было создано и откалибровано с использованием продвинутых технологий. Это оружие иммунно к умениям, которые воздействуют на технологии. Руны оружия не работают с таким оружием, если только у него также нет признака `архаичное`."
        },
        {
            "key": "Наивысший",
            "nameEng": "apex",
            "desc": "<p>Когда вы \"Инвестируете\" предмет, который имеет признак `наивысший`, он улучшает один из ваших атрибутов либо увеличивая его модификатор на +1, либо до +4, в зависимости от того, что даст большее значение. Это дает вам все преимущества нового модификатора атрибута пока не закончится инвестирование. Например, в дополнение к увеличению бросков, которые вы совершаете с этим атрибутом, повышение интеллекта сделает вас обученным в дополнительном навыки и новом языке, а увеличение Телосложения даст вам больше ОЗ.</p><p>Наивысший предмет даёт это преимущество только когда инвестирован первый раз за 24 часа, и вы можете одновременно получать преимущество только от одного наивысшего предмета. Если вы пытаетесь инвестировать `наивысший` предмет, когда у вас уже инвестирован один, вы не получаете увеличение модификатора атрибута, однако получаете любые другие эффекты от \"Инвестирования предмета\".</p>"
        },
        {
            "key": "Обтекаемый",
            "nameEng": "aquadynamic",
            "desc": "Этот доспех рассчитан для использования под водой и имеет обтекаемый дизайн и используемые в стратегических местах плавучие материалы. Вы не применяете штраф доспеха к проверкам Акробатики или Атлетики в воде или похожих жидкостях."
        },
        {
            "key": "Архаичное",
            "nameEng": "archaic",
            "desc": "Это оружие создано с помощью традиционных методов и материалов, но не подходит для поражения современной брони. Всё оружие из ролевой игры Pathfinder имеет признак `архаичное`. Руны оружия работают с `архаичным` оружием как обычно."
        },
        {
            "key": "Бард",
            "nameEng": "barding",
            "desc": ""
        },
        {
            "key": "Защитный",
            "nameEng": "bulwark",
            "desc": "Доспех имеет такое полное покрытие защитой, что дает преимущества против некоторых разрушительных эффектов. При спасбросках Рефлекса для избежания эффектов наносящих урон, таких как Огненный шар, вместо вашего модификатора Ловкости, вы добавляете модификатор +3."
        },
        {
            "key": "Удобный",
            "nameEng": "comfort",
            "desc": "Доспех настолько удобный, что вы можете нормально отдыхать, не снимая его на время сна."
        },
        {
            "key": "Компаньон",
            "nameEng": "companion",
            "desc": "Предмет с таким признаком может быть надет зверем-компаньоном или похожим существом. У компаньона может быть инвестировано вплоть до 2 предметов."
        },
        {
            "key": "Укрепиться против атак ближнего боя",
            "nameEng": "entrench-melee",
            "desc": "Вы можете расположиться в доспехах или переместить их шарнирные части, чтобы лучше защититься от некоторых атак. Если вы обучены ношению этих доспехов, то надев их, вы можете потратить одно действие, чтобы получить бонус обстоятельства +1 к КБ против определенного типа атаки до начала вашего следующего хода. В признаке `укрепиться` указан тип атаки, к которой применяется этот бонус, обычно это укрепление против атак ближнего или дальнего боя."
        },
        {
            "key": "Укрепиться против атак дальнего боя",
            "nameEng": "entrench-ranged",
            "desc": "Вы можете расположиться в доспехах или переместить их шарнирные части, чтобы лучше защититься от некоторых атак. Если вы обучены ношению этих доспехов, то надев их, вы можете потратить одно действие, чтобы получить бонус обстоятельства +1 к КБ против определенного типа атаки до начала вашего следующего хода. В признаке `укрепиться` указан тип атаки, к которой применяется этот бонус, обычно это укрепление против атак ближнего или дальнего боя."
        },
        {
            "key": "Незащищённый",
            "nameEng": "exposed",
            "desc": "Этот доспех не защищает от опасностей окружающей среды. Все доспехи из ролевой игры Pathfinder имеют признак `незащищённый`."
        },
        {
            "key": "Гибкий",
            "nameEng": "flexible",
            "desc": "Доспех достаточно гибкий, чтобы не мешать большинству действий. Вы не применяете его штраф проверки к проверкам Акробатики или Атлетики."
        },
        {
            "key": "Фокусирующий",
            "nameEng": "focused",
            "desc": "Предмет с этим признаком может дать вам дополнительное Очко Фокусировки. Это очко фокусировки отделено от вашего запаса очков фокусировки и не учитывается в счет максимума вашего запаса ОФ. Вы можете получить это преимущество только если у вас есть запас ОФ, а также могут быть ограничения на то, как можно использовать это очко. Вы не можете получить более 1 ОФ в день от фокусирующих предметов."
        },
        {
            "key": "Мешающий",
            "nameEng": "hindering",
            "desc": "Этот доспех настолько тяжёл и громоздок, что замедляет вас несмотря ни на что. Вы получаете штраф −5 ко всем своим Скоростям (минимум 5 футов). Это штраф отличен от штрафа к Скорости от доспеха, и он действует на вас даже в том случае, если ваша Сила или способность позволяют вам уменьшить или игнорировать штраф доспеха к Скорости."
        },
        {
            "key": "Начертанный",
            "nameEng": "inscribed",
            "desc": "Доспех или щит с этим признаком был обработан таким образом, чтобы на него можно было нанести магические символы тем же методом, что и при создании свитка. В предмете с этим признаком может храниться один начертанный на нём свиток. Чтобы активировать свиток, нужна свободная рука, но, чтобы вытащить его, не нужно \"Взаимодействовать\". Вы также можете активировать магию, чтобы стереть свиток, который сейчас начертан на предмете. Вы не можете начертать новый свиток на предмете, если на нем уже начертан свиток или если предмет сломан."
        },
        {
            "key": "Разумный",
            "nameEng": "intelligent",
            "desc": "Предмет с этим признаком является разумным и обладает собственной волей и личностью, а также рядом атрибутов, которых нет у большинства предметов. Разумные предметы нельзя создать обычным способом, и они всегда редкие или уникальные."
        },
        {
            "key": "Инвестируемый",
            "nameEng": "invested",
            "desc": "Персонаж может инвестировать только 10 магических предметов с признаком `инвестируемый`. Если персонаж не инвестировал магический предмет, то он не может его активировать и никакой из магических эффектов предмета не применяется, однако персонаж всё ещё получает любые обычные преимущества от ношения физического предмета (шапка защищает голову от дождя)."
        },
        {
            "key": "Ламинарный",
            "nameEng": "laminar",
            "desc": "Доспех состоит из слоистых секций, поэтому, когда они ломаются, это не представляет особой проблемы. Штраф к КБ при поломке этих доспехов составляет −1 для сломанных средних доспехов, −2 для сломанных тяжелых доспехов или вообще без штрафа для сломанных легких доспехов."
        },
        {
            "key": "Шумный",
            "nameEng": "noisy",
            "desc": "Этот доспех шумный и может предупредить других о вашем присутствии. Штраф проверок доспеха применяется к проверкам Скрытности даже если вы соответствуете показателю Силы."
        },
        {
            "key": "Сковывающий",
            "nameEng": "ponderous",
            "desc": "У этого доспеха есть подвижные части или другие осложняющие факторы, которые замедляют время реагирования владельца. Пока вы носите этот доспех, вы получаете штраф предмета −1 к броскам инициативы. Если вы не соответствуете требуемому модификатору Силы доспеха, этот штраф увеличивается и становится равным штрафу доспеха к проверкам навыков, если он больше."
        },
        {
            "key": "Реликвия",
            "nameEng": "relic",
            "desc": "Предмет с признаком `реликвия` растёт в силе вместе со своим владельцем."
        },
        {
            "key": "Стойкий +1",
            "nameEng": "resilient-1",
            "desc": "This armor has been developed with several integrated recalibration and defensive systems. While wearing this armor, you gain an item bonus to saving throws equal to the listed value."
        },
        {
            "key": "Стойкий +2",
            "nameEng": "resilient-2",
            "desc": "This armor has been developed with several integrated recalibration and defensive systems. While wearing this armor, you gain an item bonus to saving throws equal to the listed value."
        },
        {
            "key": "Стойкий +3",
            "nameEng": "resilient-3",
            "desc": "This armor has been developed with several integrated recalibration and defensive systems. While wearing this armor, you gain an item bonus to saving throws equal to the listed value."
        },
        {
            "key": "Lattice",
            "nameEng": "lattice",
            "desc": "<p>The material making up the main bulk of an Experimental Aeon Stone.</p><p>It determines the level of the stone and acts as a limit to the level of all other components.</p>"
        },
        {
            "key": "Mold",
            "nameEng": "mold",
            "desc": "<p>The mold that an Experimental Aeon Stone is cast into.</p><p>It determines what kinds of abilities the stone will have. It is not consumed in the tinkering process.</p>"
        },
        {
            "key": "Impurity",
            "nameEng": "impurity",
            "desc": "<p>A special ingredient used in crafting an Experimental Aeon Stone.</p><p>It determines the specific abilities imparted on the stone.</p>"
        },
        {
            "key": "Scepter",
            "nameEng": "scepter",
            "desc": "Using a scepter requires holding it in one hand. Scepters always grant access to spellshape and a once per day activated effect. activated effects will require sacrificing a spell slot of a rank indicated by the effect. If you are a prepared spellcaster, you choose one of your prepared spells to lose as if you had cast it. Spontaneous casters use one of their daily spell slots as if they had cast a spell from it. Most scepters will have a minimum and/or maximum spell slot rank required to activate it, listed in the effect. Scepters have a limited capacity to convert spells into actuated effects, but similar to wands they can be overloaded to allow for additional uses. If you have already used the actuated effect of a scepter, you can attempt to Overload it. Roll a DC 10 flat check. On a success the activation happens as normal, but the scepter gains the broken condition and cannot be used for either the Spellshape or actuated effect. On a failure, the effect does not happen, you lose the actions, and the scepter gains the broken condition. In either case, the scepter cannot be repaired until the next time you make your daily preparations. Repairing a scepter requires using the Repair action or sacrificing a daily spell slot of the minimum rank required to activate the scepter."
        },
        {
            "key": "Аберрация",
            "nameEng": "aberration",
            "desc": "Аберрации — существа из-за пределов планов или искажения естественного порядка."
        },
        {
            "key": "Эон",
            "nameEng": "aeon",
            "desc": "Эти наблюдатели — самопровозглашенные защитники реальности. Традиционные эоны имеют дуалистический характер и формы, придерживаются дихотомии интересов и общаются посредством странной телепатической сенсорной передачи всякой мешанины, называемой \"представлением\". Аксиомиты и их создания являются эонами, но они не разделяют все особенности обычных эонов."
        },
        {
            "key": "Асы",
            "nameEng": "aesir",
            "desc": "Асы часто являются воинственными наблюдателями хаотических планов, оттачивая свое мастерство в битве и готовясь к финальному противостоянию в конце мультивселенной."
        },
        {
            "key": "Агатион",
            "nameEng": "agathion",
            "desc": "Это семейство небожителей с животными чертами, родом с плана Нирваны. Большинство агатионов нейтрально добрые, обладают ночным зрением и имеют слабость к урону злом."
        },
        {
            "key": "Земноводный",
            "nameEng": "amphibious",
            "desc": "Земноводное существо может дышать в воде и на воздухе, даже за пределами предпочитаемой им среды, обычно бесконечно, но, по меньшей мере часами. У этих существ часто есть Скорость плавания. Их дробящие и рубящие безоружные \"Удары\" не получают обычный штраф −2 за нахождение под водой."
        },
        {
            "key": "Ангел",
            "nameEng": "angel",
            "desc": "Это семейство небожителей — посланники и воины. Большинство ангелов `святые`, обладают ночным зрением и имеют слабость к нечестивому урону."
        },
        {
            "key": "Животное",
            "nameEng": "animal",
            "desc": "Животное — существо с относительно низким интеллектом. Как правило, его модификатор Интеллекта не выше −4, оно не говорит на языках, и не может обучаться навыкам на основе Интеллекта."
        },
        {
            "key": "Анугобу",
            "nameEng": "anugobu",
            "desc": ""
        },
        {
            "key": "Водный",
            "nameEng": "aquatic",
            "desc": "Под водой, водные существа чувствуют себя как дома. Их дробящие и рубящие безоружные \"Удары\" не получают обычный штраф −2 за нахождение под водой. Водные существа могут дышать водой, но не воздухом."
        },
        {
            "key": "Архонт",
            "nameEng": "archon",
            "desc": "Члены этого семейства небожителей являются защитниками Небес и обычно `святые`. У них есть ночное зрение и слабость к нечестивому урону."
        },
        {
            "key": "Астральный",
            "nameEng": "astral",
            "desc": "Астральные существа родом с Астрального Плана. Они могут пережить основные эффекты окружающей среды Астрального Плана."
        },
        {
            "key": "Асура",
            "nameEng": "asura",
            "desc": "Эти принципиальные бесы являются физическими проявлениями сакральных несчастных случаев. Асуры, как правило, обладают ночным зрением, иммунны к `проклятиям` и имеют слабость к `святому` урону."
        },
        {
            "key": "Азата",
            "nameEng": "azata",
            "desc": "Это семейство небожителей родом из Элизиума. Они, как правило, `святые` и обладают ночным зрением и слабостью к нечестивому урону и холодному железу."
        },
        {
            "key": "Разложение",
            "nameEng": "blight",
            "desc": "Разложение — это искажение, вызывающее гнев природы."
        },
        {
            "key": "Боггард",
            "nameEng": "boggard",
            "desc": "Боггарды — лягушкоподобные гуманоиды. Обычно они обладают ночным зрением."
        },
        {
            "key": "Калигни",
            "nameEng": "caligni",
            "desc": "Этот подземный народ имеет ночное зрение, и некоторые имеют силу создавать тьму."
        },
        {
            "key": "Небожитель",
            "nameEng": "celestial",
            "desc": "Существа, которые родом со `святых` планов, или имеющие с ними сильную связь, называются небожителями. Небожители могут выживать в основных эффектах окружения планов Внешней Сферы."
        },
        {
            "key": "Чарау-ка",
            "nameEng": "charau-ka",
            "desc": "Гуманоиды, похожие на мандрилов, являющиеся жестокими воинами. В Усаро живет много чарау-ка."
        },
        {
            "key": "Конструкт",
            "nameEng": "construct",
            "desc": "Конструкт — искусственное существо наделенное силой отличной от жизненности или пустоты. Конструкты часто явлются неразумными; они иммунны кровотечению, эффектам смерти, болезням, исцелению, несмертельным атакам, ядам, духовному урону, жизненному урону и урону пустотой, и состояниям обречён, истощён, утомление, парализован, тошнота и без сознания; и они могут обладать Твёрдостью, основанной на материалах, использованных для создания их тел. Конструкты не живые существа, но и не нежить. Когда их ОЗ снижается до 0, существо-конструкт уничтожено."
        },
        {
            "key": "Космическое",
            "nameEng": "cosmic",
            "desc": "Creatures with this trait can survive in the harsh vacuum of space and the vast distances between planets and stars. They don't breathe while in space or in a vacuum. Creatures with this trait can use their fly Speed to Fly normally in a vacuum or zero gravity environment. Unless the creature possesses a bespoke ability (such as No Breath), they remain susceptible to effects that require breathing while in normal atmosphere."
        },
        {
            "key": "Коатль",
            "nameEng": "couatl",
            "desc": ""
        },
        {
            "key": "Дэймон",
            "nameEng": "daemon",
            "desc": "Род `бесов`, порождённый на опустошенном плане Абаддона; большинство дэймонов неисправимо `нечестивые`. Обычно они имеют ночное зрение и слабость к святому."
        },
        {
            "key": "Дарвакка",
            "nameEng": "darvakka",
            "desc": "Энтропийные существа нежити, извращённые Незримым Миром (Netherworld) и Пустотой (Void)."
        },
        {
            "key": "Демон",
            "nameEng": "demon",
            "desc": "Род `бесов` родом или происходящих из Внешних Разломов. Большинство из них неисправимо `нечестивые` и обладают ночным зрением и слабостью к холодному железу и святому."
        },
        {
            "key": "Деро",
            "nameEng": "dero",
            "desc": "Это семейство гуманоидов — потомки фейских существ, погрузившихся во тьму и смятение после того, как были брошены в Темноземье. Они невосприимчивы к замешательству и уязвимы к солнечному свету."
        },
        {
            "key": "Дьявол",
            "nameEng": "devil",
            "desc": "Род `бесов` из Ада, большинство дьяволов неисправимо `нечестивые`. Они обычно обладают сильным ночным зрением, телепатией, иммунитетом к огню и слабостью к святому."
        },
        {
            "key": "Динозавр",
            "nameEng": "dinosaur",
            "desc": "Эти рептилии выжили с доисторических времен."
        },
        {
            "key": "Див",
            "nameEng": "div",
            "desc": "Дивы это род `бесов`, порождённых духами злых гениев в Абаддоне. Большинство дивов неисправимо `нечестивые`. Как правило, они обладают сильным ночным зрением, слабостью к `святому` урону и урону холодным железом."
        },
        {
            "key": "Дракон",
            "nameEng": "dragon",
            "desc": "Драконы — подобные рептилиям существа, зачастую крылатые или обладающие способностью летать. Большинство из них могут выдыхать магическую энергию и невосприимчивы к сну и параличу."
        },
        {
            "key": "Поток",
            "nameEng": "drift",
            "desc": ""
        },
        {
            "key": "Дроу",
            "nameEng": "drow",
            "desc": ""
        },
        {
            "key": "Хрингар",
            "nameEng": "duergar",
            "desc": ""
        },
        {
            "key": "Элементаль",
            "nameEng": "elemental",
            "desc": "Элементали — существа, напрямую связанные со стихией и являющиеся исконными обитателями Стихийных планов. Элементалям не нужно дышать."
        },
        {
            "key": "Эфириал",
            "nameEng": "ethereal",
            "desc": "Эфирные существа являются обитателями Эфирного Плана. Они могут выживать в основных эффектах окружающей среды Эфирного Плана."
        },
        {
            "key": "Экспериментальный",
            "nameEng": "experiment",
            "desc": "Экспериментальный криптид был целенаправленно изменен с помощью алхимии, инженерии, магии или ритуала, чтобы в той или иной степени содержать компоненты конструкта. Несмотря на свою силу, этот процесс нестабилен и несовершенен."
        },
        {
            "key": "Бес",
            "nameEng": "fiend",
            "desc": "Существа, являющиеся выходцами с нечестивых планов или имеющие с ними сильную связь, называются бесами. Бесы могут выживать в основных эффектах окружающей среды планов Внешней Сферы."
        },
        {
            "key": "Гений",
            "nameEng": "genie",
            "desc": "Разнообразные семейства гениев занимают видное положение на Стихийных планах. Они обладают мощными магическими способностями."
        },
        {
            "key": "Привидение",
            "nameEng": "ghost",
            "desc": "Заблудшие души, которые бродят по миру как бестелесная нежить, называются `привидениями`."
        },
        {
            "key": "Гуль",
            "nameEng": "ghoul",
            "desc": "Гули — злобная нежить, которая поедает плоть."
        },
        {
            "key": "Гюль",
            "nameEng": "ghul",
            "desc": "Жадная и прожорливая нежить, изначально образовавшаяся из гения."
        },
        {
            "key": "Гигант",
            "nameEng": "giant",
            "desc": "Гиганты — здоровенные гуманоидные существа."
        },
        {
            "key": "Гигас",
            "nameEng": "gigas",
            "desc": ""
        },
        {
            "key": "Гиртаблил",
            "nameEng": "girtablilu",
            "desc": "У гиртаблилов верхняя часть тела гуманоидная, а нижняя — гигантского скорпиона."
        },
        {
            "key": "Голем",
            "nameEng": "golem",
            "desc": ""
        },
        {
            "key": "Могильный рыцарь",
            "nameEng": "graveknight",
            "desc": ""
        },
        {
            "key": "Гремлин",
            "nameEng": "gremlin",
            "desc": "Будучи жестокими и вредными феями, гремлины привыкли к жизни во Вселенной."
        },
        {
            "key": "Гриот",
            "nameEng": "grioth",
            "desc": "Гриоты — инопланетяне, похожие на летучих мышей, обладающие оккультными способностями и способные существовать в тёмном космическом вакууме. У них есть ночное зрение и эхолокация."
        },
        {
            "key": "Карга",
            "nameEng": "hag",
            "desc": "Эти злобные заклинатели образуют ковены."
        },
        {
            "key": "Ханту",
            "nameEng": "hantu",
            "desc": ""
        },
        {
            "key": "Вестник",
            "nameEng": "herald",
            "desc": "Почти у всех божеств есть определённый представитель, известный как вестник; вестники так же разнообразны по своей внешности и способностям, как и сами боги. Существо с признаком `вестник` всегда `уникальное`."
        },
        {
            "key": "Хрингар",
            "nameEng": "hryngar",
            "desc": "Подземные родственники дварфов, хрингары, как правило, обладают ночным зрением, сопротивлением к яду. Они остерегаются яркого света."
        },
        {
            "key": "Гуманоид",
            "nameEng": "humanoid",
            "desc": "Гуманоидные существа рассуждают и действуют так же, как люди. Обычно они являются прямоходящими и имеют 2 руки и 2 ноги."
        },
        {
            "key": "Неминуемый",
            "nameEng": "inevitable",
            "desc": "Эти сконструированные эоны были созданы аксиомитами. Каждый тип неминуемого предназначен для выполнения определенной задачи."
        },
        {
            "key": "Джинсул",
            "nameEng": "jinsul",
            "desc": ""
        },
        {
            "key": "Кайдзю",
            "nameEng": "kaiju",
            "desc": ""
        },
        {
            "key": "Ками",
            "nameEng": "kami",
            "desc": "Ками — это духи Вселенной, связанные с определенным объектом или местом."
        },
        {
            "key": "Котама",
            "nameEng": "kothama",
            "desc": ""
        },
        {
            "key": "Ковинт",
            "nameEng": "kovintus",
            "desc": "Гуманоиды-затворники с врожденным талантом к геомантии, ковинты имеют неразрывную связь как с природой, так и с магией."
        },
        {
            "key": "Кучарн",
            "nameEng": "kucharn",
            "desc": ""
        },
        {
            "key": "Лилу",
            "nameEng": "lilu",
            "desc": ""
        },
        {
            "key": "Атамару",
            "nameEng": "locathah",
            "desc": ""
        },
        {
            "key": "Мафтет",
            "nameEng": "maftet",
            "desc": "У мафтетов верхняя часть тела похожа на гуманоидную, нижняя — на львиную, а крылья похожи на ястребиные."
        },
        {
            "key": "Неразумный",
            "nameEng": "mindless",
            "desc": "Неразумное существо обладает либо запрограммированными, либо рудиментарными ментальными качествами. Большинство, если не все их модификаторы ментальных атрибутов −5. Они иммунны ко всем `ментальным` эффектам."
        },
        {
            "key": "Миньон",
            "nameEng": "minion",
            "desc": "<p>Миньоны это существа, которые напрямую служат другому существу. Ваш миньон действует в бою во время вашего хода, один раз за ход, когда вы тратите действие, чтобы отдать ему приказы. Для животного компаньона, вы используете Команда животному; для призванного миньона, который является эффектом заклинания или магического предмета, вы используете \"Поддержание\" эффекта; и если не указано иначе, вы отдаете устный приказ, который является одиночным действием с признаками `слуховой` и `концентрация`. Если миньону не были даны приказы, по-умолчанию он не использует действий, кроме как для своей защиты или чтобы избежать очевидного вреда. Если оставлены без присмотра на продолжительное время, обычно 1 минуту, неразумные миньоны обычно не делают ничего, животные часто дают волю своим животным привычкам, а разумные миньоны действуют как им вздумается. Под вашим управлением может быть максимум 4 миньона.</p><p>У миньона есть только 2 действия и 0 реакция в ход, хотя некоторые состояния (такие как `замедлен` или `ускорен`) или умения могут дать им реакцию, которую они могут использовать. Изменения количества действий миньона происходят когда они получают свои действия в этом раунде. Миньон не может управлять другими существами.</p>"
        },
        {
            "key": "Наблюдатель",
            "nameEng": "monitor",
            "desc": "Существа являющиеся выходцами с Оси, Могильника или Мальстрема или имеющие с ними сильную связь, называются наблюдателями. Наблюдатели могут пережить основные эффекты окружения планов во Внешней Сфере."
        },
        {
            "key": "Морлок",
            "nameEng": "morlock",
            "desc": "Морлоки это семейство бледных, обитающих под землёй гуманоидов, много поколений назад бывших людьми."
        },
        {
            "key": "Мортик",
            "nameEng": "mortic",
            "desc": "Мортики — живые гуманоиды, тесно связанные с нежитью. Они обладают ночным зрением, исцелением пустотой и уязвимостью к освященной земле, а также могут становиться нежитью, задержав дыхание."
        },
        {
            "key": "Мумия",
            "nameEng": "mummy",
            "desc": "Мумия — это нежить, созданная из сохранившегося трупа."
        },
        {
            "key": "Мунавр",
            "nameEng": "munavri",
            "desc": "Дружелюбные гуманоиды, живущие в Темноземье, мунавры обладают мощными телекинетическими и экстрасенсорными способностями."
        },
        {
            "key": "Мутант",
            "nameEng": "mutant",
            "desc": "Мутировавший или эволюционировавший монстр, из-за чего получивший необычные преимущества, недостатки, либо и то, и другое."
        },
        {
            "key": "Ниндору",
            "nameEng": "nindoru",
            "desc": "Ниндору — разновидность бесов, восстающих из-за пороков цикла реинкарнации душ и живущих во Вселенной. Хотя в их облике часто присутствуют элементы, заставляющие их казаться нежитью, на самом деле они живые существа. Большинство ниндору обладают ночным зрением, невосприимчивы к эффектам смерти, имеют слабость к серебру и обладают способностью создавать предметы или существ из своих мыслей."
        },
        {
            "key": "Нимфа",
            "nameEng": "nymph",
            "desc": "Это семейство красивых фей тесно связано с природными локациями."
        },
        {
            "key": "Они",
            "nameEng": "oni",
            "desc": "Они — семейство жестоких, меняющих форму гигантов, которые когда-то были ками."
        },
        {
            "key": "Слизь",
            "nameEng": "ooze",
            "desc": "Слизи это существа с простой анатомией. Как правило они обладают низкими ментальными характеристиками и иммунны к ментальным эффектам и точному урону."
        },
        {
            "key": "Паарайдар",
            "nameEng": "paaridar",
            "desc": "Паарайдары это гуманоиды, приобревшие физические качества и способности могущественного чудовища с помощью испорченных магических ритуалов."
        },
        {
            "key": "Палитанос",
            "nameEng": "palinthanos",
            "desc": "Когда космологическое событие, подобное Дождю Божьему (Godsrain) нарушает все существующее, Река Душ иногда на краткий миг, в буквальном смысле, течет вспять из-за ударной волны. Невольные и сбитые с толку души, оттеснённые достаточно далеко, могут испытать мучительный опыт перенесения смерти в обратном временном порядке. Некоторым из этих душ удаётся вернуться в реку, как только течение возвращается в нормальное русло, но те, кто выброшен на метафорические берега живых, могут стать палитаносами: могущественной нежитью, рождённой в результате обратной гибели, тщетно борющихся, пока их не отправят обратно в Реку."
        },
        {
            "key": "Личность: Кокет",
            "nameEng": "persona-flirt",
            "desc": "PF2E.TraitPersonaFlirtDescription"
        },
        {
            "key": "Личность: Хранитель",
            "nameEng": "persona-guardian",
            "desc": "PF2E.TraitPersonaGuardianDescription"
        },
        {
            "key": "Личность: Лидер",
            "nameEng": "persona-leader",
            "desc": "PF2E.TraitPersonaLeaderDescription"
        },
        {
            "key": "Личность: Учёный",
            "nameEng": "persona-scholar",
            "desc": "PF2E.TraitPersonaScholarDescription"
        },
        {
            "key": "Личность: Негодяй",
            "nameEng": "persona-scoundrel",
            "desc": "PF2E.TraitPersonaScoundrelDescription"
        },
        {
            "key": "Личность: Неудачник",
            "nameEng": "persona-underdog",
            "desc": "PF2E.TraitPersonaUnderdogDescription"
        },
        {
            "key": "Личность: Воин",
            "nameEng": "persona-warrior",
            "desc": "PF2E.TraitPersonaWarriorDescription"
        },
        {
            "key": "Личность: Джокер",
            "nameEng": "persona-wildcard",
            "desc": "PF2E.TraitPersonaWildcardDescription"
        },
        {
            "key": "Проситель",
            "nameEng": "petitioner",
            "desc": ""
        },
        {
            "key": "Фантом",
            "nameEng": "phantom",
            "desc": "Фантом это душа, которая отделилась от Реки Душ на Эфирном Плане до того, как ее осудят. Обычно они сохраняют воспоминания о своей жизни до смерти, но не являются нежитью."
        },
        {
            "key": "Протей",
            "nameEng": "protean",
            "desc": "Семейство наблюдателей, порожденное в Мальстреме, эти существа — хранители беспорядка. Обычно у них ночное зрение, аморфная анатомия и способности, создающие магические волны искажения."
        },
        {
            "key": "Психопомп",
            "nameEng": "psychopomp",
            "desc": "Семейство наблюдателей, порожденное в Могильнике, чтобы доставлять души на Внешние планы. Обычно у них есть ночное зрение, жизнечувствительность и касание пастыря, и они иммунны к эффектам смерти."
        },
        {
            "key": "Клиппот",
            "nameEng": "qlippoth",
            "desc": "Семейство бесов, родом из Внешних Разломов, большинство клиппотов нечестивые. Их внешний вид влияет на умы не-клиппотов, которые их видят."
        },
        {
            "key": "Ракшаса",
            "nameEng": "rakshasa",
            "desc": ""
        },
        {
            "key": "Робот",
            "nameEng": "robot",
            "desc": ""
        },
        {
            "key": "Сахкил",
            "nameEng": "sahkil",
            "desc": "Сакхилы это род `бесов`, наслаждающихся тем, что сеют страх и беспокойство среди смертных существ. Как правило, они обладают ночным зрением, иммунитетом к `страху` и слабостью к `святому` урону."
        },
        {
            "key": "Морской дьявол",
            "nameEng": "sea-devil",
            "desc": "Злобные живущие в океане гуманоиды, морские дьяволы как правило, обладают ночным зрением и волночувствительностью."
        },
        {
            "key": "Седактий",
            "nameEng": "sedacthy",
            "desc": "Обитающие в океане гуманоиды, общающиеся с морскими обитателями и обычно обладающие ночным зрением и волночувствительностью."
        },
        {
            "key": "Змеелюд",
            "nameEng": "serpentfolk",
            "desc": "Змеелюди это семейство змеевидных гуманоидов."
        },
        {
            "key": "Сьюгати",
            "nameEng": "seugathi",
            "desc": ""
        },
        {
            "key": "Шабти",
            "nameEng": "shabti",
            "desc": "Шабти это сконструированный гуманоид, изначально предназначенный для того, чтобы предстать перед судом за грехи живого существа после смерти."
        },
        {
            "key": "Оттенок",
            "nameEng": "shade",
            "desc": ""
        },
        {
            "key": "Сиктемпора",
            "nameEng": "siktempora",
            "desc": ""
        },
        {
            "key": "Скельм",
            "nameEng": "skelm",
            "desc": "Эти существа — чудовищные злобные мизантропы, стремящиеся контролировать других с помошью гнева и злобы."
        },
        {
            "key": "Скалк",
            "nameEng": "skulk",
            "desc": "Скалки это семейство гуманоидов, чья кожа может менять окраску, чтобы помогать прятаться."
        },
        {
            "key": "Одушевлённый",
            "nameEng": "soulbound",
            "desc": "Эти конструкты ментально усилены фрагментом души некогда живого существа."
        },
        {
            "key": "Спектр",
            "nameEng": "spectra",
            "desc": ""
        },
        {
            "key": "Споророждённый",
            "nameEng": "sporeborn",
            "desc": ""
        },
        {
            "key": "Спригган",
            "nameEng": "spriggan",
            "desc": "Родственники гномов, спригганы, как правило `нечестивы` и могут увеличиваться в размерах, становясь похожими на гигантов."
        },
        {
            "key": "Стено",
            "nameEng": "stheno",
            "desc": "Стено — гуманоиды, родственные медузам, со змеями вместо волос."
        },
        {
            "key": "Рой",
            "nameEng": "swarm",
            "desc": "Рой это масса или облако существ, функционирующих как один монстр. Его запись о размере указывает размер всей массы, хотя для большинства роев отдельные существа, образующие эту массу, являются Крошечными. Рой может занимать то же пространство, что и другие существа, и должен это делать, чтобы использовать свое действие наносящее урон. Рой обычно имеет слабость к эффектам наносящим урон по области (например, заклинаниям с областью и оружию с признаком `брызги`). Рои иммунны к состояниям `схвачен`, `ничком` и `сдерживаем`."
        },
        {
            "key": "Тэйн",
            "nameEng": "tane",
            "desc": "Тэйны — могущественные существа, созданные эры назад Старейшими из Первого мира. Все Тэйны относятся к любому плану, на котором они находятся, как к своему родному плану."
        },
        {
            "key": "Танггал",
            "nameEng": "tanggal",
            "desc": "Это семейство каннибальских аберраций состоит из различных существ гуманоидной формы, способных разделять своё тело на две части во время охоты."
        },
        {
            "key": "Титан",
            "nameEng": "titan",
            "desc": "Титаны — это первородные существа невероятно больших размеров и богоподобной мощи, которые жили задолго до появления смертных рас."
        },
        {
            "key": "Тролль",
            "nameEng": "troll",
            "desc": "Тролли — гигантские жестокие существа, хорошо известные своей способностью к превращению в неживые материалы."
        },
        {
            "key": "Отряд",
            "nameEng": "troop",
            "desc": "Отряд это организованная группа существ, обычно Средних или Маленьких размеров, работающих как единое целое. После достаточного количества атак и поверженных товарищей, численность отряда уменьшается. Обычно у отряда есть способности \"Защита отряда\" и \"Перемещение отряда\", но большинство отрядов имеет слабость к урону по области или урону брызгами. Поскольку они состоят из отдельных существ, их нельзя призвать."
        },
        {
            "key": "Нежить",
            "nameEng": "undead",
            "desc": "Некогда живые, эти существа после смерти были наполнены энергией пустоты и нечестивой магией разрушающей души. При уменьшении до 0 ОЗ, нежить уничтожается. Нежить получает урон от энергии жизненности, исцеляется энергией пустоты и не получает преимуществ от исцеляющих эффектов жизненности."
        },
        {
            "key": "Урдефан",
            "nameEng": "urdefhan",
            "desc": "Урдефаны — это гуманоиды, заключившие пакты с дэймонами. У них прозрачная кожа и они пьют кровь."
        },
        {
            "key": "Вампир",
            "nameEng": "vampire",
            "desc": "Нежить, жаждущая крови, вампиры, как известно, многогранны и их трудно уничтожить."
        },
        {
            "key": "Вельстрак",
            "nameEng": "velstrac",
            "desc": "Род `бесов` из Незримого Мира (Netherworld), ассоциирующийся с болью и мучениями. Все вельстраки обладают той или иной формой тревожащего взгляда."
        },
        {
            "key": "Оборотень",
            "nameEng": "werecreature",
            "desc": "Эти существа, меняющие форму, способны превращаться либо естественным образом между животной, гуманоидной и гибридной формами."
        },
        {
            "key": "Умертвие",
            "nameEng": "wight",
            "desc": "Умертвие — это нежить, высасывающая жизнь и стоящая на страже своего захоронения."
        },
        {
            "key": "Дикая охота",
            "nameEng": "wild-hunt",
            "desc": ""
        },
        {
            "key": "Рэйф",
            "nameEng": "wraith",
            "desc": "Рэйф — бестелесная нежить, наполненная энергией пустоты и движимая ненавистью ко всему живому."
        },
        {
            "key": "Призрачная лоза",
            "nameEng": "wraithvine",
            "desc": ""
        },
        {
            "key": "Вирвуд",
            "nameEng": "wyrwood",
            "desc": "Вирвуды это Маленькие живые конструкты, изготовленные из дерева и приводимые в действие камнем эона или подобным магическим камнем."
        },
        {
            "key": "Зулгат",
            "nameEng": "xulgath",
            "desc": "Эти подземные рептилоидные существа, как правило, обладают ночным зрением и ужасно пахнут."
        },
        {
            "key": "Зомби",
            "nameEng": "zombie",
            "desc": "Эта нежить — неразумные гниющие тела, жаждущие живой плоти."
        },
        {
            "key": "Примесь 0",
            "nameEng": "additive0",
            "desc": "Способности с признаком `примесь` позволяют вам добавлять особые субстанции в алхимические расходуемые предметы, которые вы создаёте <em>\"Быстрой алхимией\"</em> (вы не можете использовать примеси с быстрыми склянками). К одному алхимическому предмету вы можете добавить только одну примесь, за раунд вы можете добавить только одну примесь, и большинство примесей указывают, к каким типам расходуемых предметов их можно добавить."
        },
        {
            "key": "Приспособление",
            "nameEng": "adjustment",
            "desc": "Предметы с этим признаком нужны для изменения существующего снаряжения, обычно доспехов, щитов и оружия. Данный предмет будет помечать, какой вид снаряжения он модифицирует. Приспособление, модифицирующее доспех не может модифицировать одежду исследователя. Одновременно, на единицу снаряжения может воздействовать только 1 приспособление. Если не указано иначе, то для добавления или снятия приспособления требуется использование 10-минутной активности и набор для ремонта."
        },
        {
            "key": "Биотехнический",
            "nameEng": "biotech",
            "desc": "Биотехнические аугментации включают генные модификации и биологические имплантанты, которые подстраиваются под вашу физиологию. Биотехнические аугментации не являются магическими, хотя многие их них делаются из магических существ, или же подражают их свойствам."
        },
        {
            "key": "Кадильница",
            "nameEng": "censer",
            "desc": "Кадильницы — это декоративные ёмкости, чаще всего металлические или керамические, в которых сжигают благовония. Предмет с признаком `кадильница` должен быть наполнен благовониями для его \"Активации\", что поджигает благовония и заставляет кадильницу испускать облако дыма. Чтобы активировать кадильницу, вы должны держать ее в руках, но если вы отпустите кадильницу, благовония продолжат гореть в пространстве, где находится кадильница. Дым создаёт ауру, исходящую от пространства кадильницы. Дым держится 1 минуту, но тут же рассеивается сильным ветром (прекращая активацию) или если вы \"Развеете\" активацию, туша благовония. Если не указано иное, дым от кадильницы не настолько густой, чтобы быть сокрытием для существ, и вы можете выбрать получить иммунитет к дыму любой кадильницы, которую вы активируете."
        },
        {
            "key": "Керамический",
            "nameEng": "ceramic",
            "desc": ""
        },
        {
            "key": "Оберег",
            "nameEng": "charm",
            "desc": "Оберег устанавливается в определённый тип предмета, обычно в оружие, доспех или щит, но он не занимает слот для улучшения. Единовременно вы можете установить на предмет только один оберег. Чтобы активировать прикреплённый оберег, вы должны владеть предметом или он должен быть на вас надет."
        },
        {
            "key": "Кода",
            "nameEng": "coda",
            "desc": "<p>Инструменты с признаком `кода` работают в основном как посохи и имеют признак `посох`. Есть два отличия. Инструменты кода имеют форму музыкальных инструментов и их могут подготавливать только барды. Поскольку физически они не являются посохами, вы не можете атаковать с помощью коды и также выгравировать на ней руны оружия.</p><p>При подготовке коды, необходимо сыграть значительные фрагменты песен, связанных с заклинаниями заложенными в инструмент — либо старые стандарты, либо созданные вами. Это оставляет в инструменте магические отголоски, позволяющие завершить песни, сыграв их на коде позже в течение дня.</p>"
        },
        {
            "key": "Компактный",
            "nameEng": "compact",
            "desc": "Вы можете \"Поднимать\" `компактный` щит, пока эта рука свободна или вы держите в ней лёгкий объект, не являющийся оружием."
        },
        {
            "key": "Контракт",
            "nameEng": "contract",
            "desc": "Контракт — тип предмета, который волшебным образом устанавливает соглашение между несколькими сторонами и обычно представляет магические преимущества."
        },
        {
            "key": "Носовая фигура",
            "nameEng": "figurehead",
            "desc": "Хотя многие корабли украшены декоративной резьбой, смельчаки иногда приобретают для своих судов магические носовые фигуры. Установка предмета с признаком `носовая фигура` занимает 1 час. После этого предмет немного изменяется, чтобы соответствовать назначению судна или его экипажа, как определяет атрибутированное существо, например приобретает птичьи черты на судне тэнгу. Одновременно на корабле может быть только одна носовая фигура, прикрепление другой подавляет все носовые фигуры. Активировать фигуру может только существо, настроенное на нее, этот процесс занимает 1 час и может быть выполнен, пока существо устанавливает носовую фигуру. Одновременно на носовую фигуру может быть настроено только одно существо, если не указано иное. Настроенное существо может активировать фигуру с любого места на борту судна. Обычно владелец или капитан судна настраиваются на носовую фигуру судна."
        },
        {
            "key": "Приращение",
            "nameEng": "graft",
            "desc": "<p>Предмет с признаком `приращение` — это образец живой ткани, вживленный в организм носителя. Он навсегда становится частью тела субъекта и снижает количество предметов, которые существо может инвестировать в день, на 1. Каждое приращение имеет признак `инвестированный`, указывающий на это ограничение — приращение подобно инвестированному предмету и у существа-носителя нет другого выбора, как инвестировать его. Если существо получает новое приращение, когда его лимит инвестируемых предметов уже сократился до нуля, тело носителя отторгает приращение. После полного вживления приращение не может получать урон отдельно.</p><p>Если приращение когда-нибудь будет отрезано от тела носителя, его можно прикрепить заново любым эффектом, обычно позволяющим прикрепить конечность или органы, например заклинанием регенерации. Специалист может удалить приращение, используя тот же процесс, что и при его вживлении, хотя при этом не обязательно восстановятся органы, замененные приращением. Приращения обычно требуют специальных условий хранения, таких как алхимические резервуары, чтобы оставаться жизнеспособными вне носителя. Обычно приращения могут быть усовершенствованы до более совершенных версий, если специалист проведет дополнительные операции, мутагенное развитие или аналогичные медицинские процедуры.</p>"
        },
        {
            "key": "Граната",
            "nameEng": "grenade",
            "desc": "Оружие с этим признаком можно метнуть одиночным действием, используя \"Огонь по области\", как если бы у него был признак `площадное (взрыв)`."
        },
        {
            "key": "Гримуар",
            "nameEng": "grimoire",
            "desc": "Гримуар функционирует аналогично книге заклинаний, обычно может вмещать вплоть до 100 заклинаний и позволяет заклинателям стирать заклятия предыдущих владельцев, заменяя их своими. Заклинатель может перенести заклинания одной из своих книг заклинаний в гримуар, выполнив простой 1-минутный ритуал с использованием обеих книг. Если вы подготавливаете заклинания (благодаря классовым особенностям, таким как у жреца или волшебника, либо специальной способностью или умением, как Эзотерический эрудит), то можете изучать гримуар во время своих ежедневных приготовлений, чтобы усилить одно или более заклинаний в нем. До ваших следующих ежедневных приготовлений вы получаете возможность Активировать гримуар. Так как вы уже впитали силу гримуара во время приготовлений, вы можете Активировать его, даже если перестанете обладать им. Преимущества гримуаров применяются только к заклинаниям, сотворяемым с помощью слотов заклинаний — не с чарами, заклинаниями фокусировки или врождёнными заклинаниями. Никто не может использовать более 1 гримуара в день, и гримуар не может быть использован более чем 1 человеком в день."
        },
        {
            "key": "Двор Харро",
            "nameEng": "harrow-court",
            "desc": ""
        },
        {
            "key": "Устанавливаемый",
            "nameEng": "installed",
            "desc": "Некоторые щиты не нужно удерживать, так как они устанавливаются в качестве улучшений брони или оружия. Вы можете \"Поднимать\" установленный в качестве улучшения брони щит как обычно. Щиты могут быть установлены только на оружие с признаком `парирование`. Когда вы используете `парирующее` оружие с установленным в качестве улучшения щитом, чтобы получить бонус к КБ, улучшение щита создаёт инерционный защитный барьер и вы автоматически \"Поднимаете щит\". Если вы используете это оружие для какой-либо другой цели, щит перестаёт быть поднятым, и вы более перестаёте получить бонус к КБ. Вы не можете \"Поднимать щит\", установленный в качестве улучшения, никаким другим способом."
        },
        {
            "key": "Техномагический",
            "nameEng": "magitech",
            "desc": "`Техномагические` аугментации сочетают в себе кибернетические и магические компоненты. Они состоят из таких элементов, как заряжаемые мистическими энергиями кристаллы, сплавы звёздного металла и микрочипы, на которые нанесены руны. `Техномагические` аугментации являются магическими, но их нельзя рассеять, если только в эффекте или атаке конкретно не указано, что они воздействуют на аугментации."
        },
        {
            "key": "PF2E.TraitMissile",
            "nameEng": "missile",
            "desc": "PF2E.TraitDescriptionMissile"
        },
        {
            "key": "Стационарное",
            "nameEng": "mounted",
            "desc": "Стационарные осадные орудия занимают определенный размер и имеют габариты, и обычно имеют показатели позволяющие атаковать их. Они используются для крупномасштабных военных действий."
        },
        {
            "key": "Наниты",
            "nameEng": "nanite",
            "desc": ""
        },
        {
            "key": "Некроимплант",
            "nameEng": "necrograft",
            "desc": ""
        },
        {
            "key": "Полимерный",
            "nameEng": "polymer",
            "desc": ""
        },
        {
            "key": "Переносное",
            "nameEng": "portable",
            "desc": "Переносные осадные орудия, такие как тараны, можно легче переносить, и они играют важную роль как в военных действиях, так и в небольших конфликтах или во время исследования."
        },
        {
            "key": "Выдвижной",
            "nameEng": "retractable",
            "desc": "Этот щит может складываться в более компактную форму, прикреплённую к наручу, рукавице или аксессуару для удобства переноса и освобождения рук. Вы можете использовать действие \"Взаимодействовать\", чтобы развернуть или сложить щит. Пока он сложен, вы не можете \"Поднять щит\". Когда щит развёрнут, он получает признак `компактный`."
        },
        {
            "key": "Саггорак",
            "nameEng": "saggorak",
            "desc": "Древние кузнецы дварфов Саггорака разработали серию особо могущественных рун. Только хорошо разбирающиеся кузнецы дварфов из Ковлара, либо те, чьё умение в ремесле достигло легендарного уровня способны начертать, переносить и удалять руны с этим признаком. Из-за своей силы все руны Саггорака занимают до двух ячеек для рун свойств и, следовательно, могут быть начертаны только на броне и оружии с как минимум руной усиления +2."
        },
        {
            "key": "Сердце заклинания",
            "nameEng": "spellheart",
            "desc": "Это постоянные предметы, которые работают подобно талисманам. Вы прикрепляете сердце заклинания используя активность \"Прикрепить сердце заклинания\", которая абсолютно идентична \"Прикрепить талисман\". Ограничение об одном талисмане на предмете остаётся - предмет может иметь только 1 сердце заклинания или талисман, не оба одновременно. Правила относительно талисманов и их прикрепления находятся в разделе Талисманы. При сотворении чар из сердца заклинания, если ваше мастерство атак заклинаниями или КС заклинаний больше, то можете использовать их. Создание сердца заклинания требует заклинаний, которые оно может сотворять."
        },
        {
            "key": "Посох",
            "nameEng": "staff",
            "desc": "Этот магический предмет содержит заклинания определенной тематики и позволяет заклинателю сотворять дополнительные заклинания подготавливая посох."
        },
        {
            "key": "Паровое",
            "nameEng": "steam",
            "desc": "Вещи с этим признаком приводятся в действие двигателями, которые кипятят воду для получения пара и движения своими компонентами."
        },
        {
            "key": "Татуировка",
            "nameEng": "tattoo",
            "desc": "Татуировка это вид предмета, который нарисован или вырезан на коже существа и обычно имеет форму изображений или символов."
        },
        {
            "key": "Окружение",
            "nameEng": "environmental",
            "desc": "Опасность с этим признаком это нечто опасное, являющееся частью естественного мира, как например зыбучий песок или вредная плесень."
        },
        {
            "key": "Призрак",
            "nameEng": "haunt",
            "desc": "Опасность с этим признаком является духовным эхом, часто кого-то трагически умершего. Чтобы положить конец призраку, часто нужно решить его незавершенные дела. Призрак, которого не упокоили должным образом всегда возвращается спустя некоторое время."
        },
        {
            "key": "Кошмар",
            "nameEng": "nightmare",
            "desc": "Опасности кошмаров присущи только Ленгу. Во многих отношениях опасности ночных кошмаров напоминают призраков, и страшная правда может не открыться потенциальным жертвам, пока их не обнаружат, что попытки отключить их с помощью экзорцизма неэффективны."
        },
        {
            "key": "Технологическое",
            "nameEng": "technological",
            "desc": ""
        },
        {
            "key": "Армия",
            "nameEng": "army",
            "desc": ""
        },
        {
            "key": "Кавалерия",
            "nameEng": "cavalry",
            "desc": "Кавалерия состоит из конных бойцов."
        },
        {
            "key": "Гражданская",
            "nameEng": "civic",
            "desc": ""
        },
        {
            "key": "Коммерческая",
            "nameEng": "commerce",
            "desc": ""
        },
        {
            "key": "Пехота",
            "nameEng": "infantry",
            "desc": "Пехота состоит из солдат или существ, передвигающихся пешим строем."
        },
        {
            "key": "Королевство",
            "nameEng": "kingdom",
            "desc": ""
        },
        {
            "key": "Лидерская",
            "nameEng": "leadership",
            "desc": ""
        },
        {
            "key": "Манёвр",
            "nameEng": "maneuver",
            "desc": ""
        },
        {
            "key": "Мораль",
            "nameEng": "morale",
            "desc": ""
        },
        {
            "key": "Региональная",
            "nameEng": "region",
            "desc": ""
        },
        {
            "key": "Осадные орудия",
            "nameEng": "siege",
            "desc": "Осадные армии сосредоточены на развертывании осадных машин, а не на личных столкновениях."
        },
        {
            "key": "Застрельщики",
            "nameEng": "skirmisher",
            "desc": "Застрельщики состоят из небольшого количества очень подвижных бойцов."
        },
        {
            "key": "Содержание",
            "nameEng": "upkeep",
            "desc": ""
        },
        {
            "key": "Дуговое",
            "nameEng": "arc",
            "desc": "Эта атака устремляется дугой к ближайшему вражескому существу в 10 футах от изначальной цели. Если КБ вторичной цели меньше чем результат броска атаки, вы наносите электрический урон этому существу, равный 1 за кость урона оружия."
        },
        {
            "key": "Площадное (Взрыв 10 фт.)",
            "nameEng": "area-burst-10",
            "desc": "Из оружия с этим признаком можно стрелять, только используя действие \"Огонь по области\"."
        },
        {
            "key": "Площадное (Взрыв 15 фт.)",
            "nameEng": "area-burst-15",
            "desc": "Из оружия с этим признаком можно стрелять, только используя действие \"Огонь по области\"."
        },
        {
            "key": "Площадное (Взрыв 20 фт.)",
            "nameEng": "area-burst-20",
            "desc": "Из оружия с этим признаком можно стрелять, только используя действие \"Огонь по области\"."
        },
        {
            "key": "Площадное (Взрыв 25 фт.)",
            "nameEng": "area-burst-25",
            "desc": "Из оружия с этим признаком можно стрелять, только используя действие \"Огонь по области\"."
        },
        {
            "key": "Площадное (Взрыв 30 фт.)",
            "nameEng": "area-burst-30",
            "desc": "Из оружия с этим признаком можно стрелять, только используя действие \"Огонь по области\"."
        },
        {
            "key": "Площадное (Взрыв 5 фт.)",
            "nameEng": "area-burst-5",
            "desc": "Из оружия с этим признаком можно стрелять, только используя действие \"Огонь по области\"."
        },
        {
            "key": "Площадное (Конус)",
            "nameEng": "area-cone",
            "desc": "Из оружия с этим признаком можно стрелять, только используя действие \"Огонь по области\"."
        },
        {
            "key": "Площадное (Линия)",
            "nameEng": "area-line",
            "desc": "Из оружия с этим признаком можно стрелять, только используя действие \"Огонь по области\"."
        },
        {
            "key": "Прикрепляемый",
            "nameEng": "attached",
            "desc": "Для использования, прикрепляемое оружие должно быть объединено с другим снаряжением. Вы должны владеть или носить предмет, к которому прикреплено оружие, чтобы атаковать им. Признак указывает к какому виду предмета оружие должно быть прикреплено. Например, шипы для щита, прикрепляются к щиту, позволяя вам атаковать шипами вместо удара щитом. Прикрепленное оружие обычно привинчивается на основной предмет или встраивается в него, и как правило, предмет может иметь только одно прикрепляемое к нему оружие. Прикрепляемое оружие может быть установлено на предмет за 10 минут работы и успешной проверки Ремесла с КС 10; при необходимости это включает время, нужное, чтобы убрать оружие с предыдущего установленного оружия. Если предмет уничтожен, то обычно прикрепленное оружие можно подобрать. Обычно, оружие нельзя использовать, если предмет, к которому он прикреплён, сломано."
        },
        {
            "key": "Прикрепляемый к арбалету или огнестрельному оружию",
            "nameEng": "attached-to-crossbow-or-firearm",
            "desc": "Для использования, прикрепляемое оружие должно быть объединено с другим снаряжением. Вы должны владеть или носить предмет, к которому прикреплено оружие, чтобы атаковать им. Признак указывает к какому виду предмета оружие должно быть прикреплено. Например, шипы для щита, прикрепляются к щиту, позволяя вам атаковать шипами вместо удара щитом. Прикрепленное оружие обычно привинчивается на основной предмет или встраивается в него, и как правило, предмет может иметь только одно прикрепляемое к нему оружие. Прикрепляемое оружие может быть установлено на предмет за 10 минут работы и успешной проверки Ремесла с КС 10; при необходимости это включает время, нужное, чтобы убрать оружие с предыдущего установленного оружия. Если предмет уничтожен, то обычно прикрепленное оружие можно подобрать. Обычно, оружие нельзя использовать, если предмет, к которому он прикреплён, сломано."
        },
        {
            "key": "Прикрепляемое к щиту",
            "nameEng": "attached-to-shield",
            "desc": "Для использования, прикрепляемое оружие должно быть объединено с другим снаряжением. Вы должны владеть или носить предмет, к которому прикреплено оружие, чтобы атаковать им. Признак указывает к какому виду предмета оружие должно быть прикреплено. Например, шипы для щита, прикрепляются к щиту, позволяя вам атаковать шипами вместо удара щитом. Прикрепленное оружие обычно привинчивается на основной предмет или встраивается в него, и как правило, предмет может иметь только одно прикрепляемое к нему оружие. Прикрепляемое оружие может быть установлено на предмет за 10 минут работы и успешной проверки Ремесла с КС 10; при необходимости это включает время, нужное, чтобы убрать оружие с предыдущего установленного оружия. Если предмет уничтожен, то обычно прикрепленное оружие можно подобрать. Обычно, оружие нельзя использовать, если предмет, к которому он прикреплён, сломано."
        },
        {
            "key": "Предательское",
            "nameEng": "backstabber",
            "desc": "Когда вы попадаете по `застигнутому врасплох` существу, это оружие наносит дополнительные 1 точного урона, в дополнение к обычному урону. Точный урон увеличивается до 2, если оружие является оружием +3."
        },
        {
            "key": "Бомба",
            "nameEng": "bomb",
            "desc": "Алхимическая бомба объединяет горючие алхимические компоненты, которые взрываются когда бомба попадает в существо или объект. Большинство алхимических бомб наносят урон, однако некоторые производят другие эффекты."
        },
        {
            "key": "Заряжаемое 1d10",
            "nameEng": "boost-1d10",
            "desc": "Вы можете заряжать это оружие действием \"Взаимодействовать\", чтобы добавлять дополнительную кость урона указанного размера к следующей наносящей урон атаке этим оружием до конца вашего следующего хода. Урон от этого признака увеличивается до 2 костей для оружия продвинутого и превосходного качества, до 3 для оружия элитного и абсолютного качества, и до 4 для оружия совершенного качества. При критическом попадании бросайте эти кости после удвоения урона оружия. Зарядка оружия несколько раз не даёт никакого эффекта."
        },
        {
            "key": "Заряжаемое 1d12",
            "nameEng": "boost-1d12",
            "desc": "Вы можете заряжать это оружие действием \"Взаимодействовать\", чтобы добавлять дополнительную кость урона указанного размера к следующей наносящей урон атаке этим оружием до конца вашего следующего хода. Урон от этого признака увеличивается до 2 костей для оружия продвинутого и превосходного качества, до 3 для оружия элитного и абсолютного качества, и до 4 для оружия совершенного качества. При критическом попадании бросайте эти кости после удвоения урона оружия. Зарядка оружия несколько раз не даёт никакого эффекта."
        },
        {
            "key": "Заряжаемое 1d4",
            "nameEng": "boost-1d4",
            "desc": "Вы можете заряжать это оружие действием \"Взаимодействовать\", чтобы добавлять дополнительную кость урона указанного размера к следующей наносящей урон атаке этим оружием до конца вашего следующего хода. Урон от этого признака увеличивается до 2 костей для оружия продвинутого и превосходного качества, до 3 для оружия элитного и абсолютного качества, и до 4 для оружия совершенного качества. При критическом попадании бросайте эти кости после удвоения урона оружия. Зарядка оружия несколько раз не даёт никакого эффекта."
        },
        {
            "key": "Заряжаемое 1d6",
            "nameEng": "boost-1d6",
            "desc": "Вы можете заряжать это оружие действием \"Взаимодействовать\", чтобы добавлять дополнительную кость урона указанного размера к следующей наносящей урон атаке этим оружием до конца вашего следующего хода. Урон от этого признака увеличивается до 2 костей для оружия продвинутого и превосходного качества, до 3 для оружия элитного и абсолютного качества, и до 4 для оружия совершенного качества. При критическом попадании бросайте эти кости после удвоения урона оружия. Зарядка оружия несколько раз не даёт никакого эффекта."
        },
        {
            "key": "Заряжаемое 1d8",
            "nameEng": "boost-1d8",
            "desc": "Вы можете заряжать это оружие действием \"Взаимодействовать\", чтобы добавлять дополнительную кость урона указанного размера к следующей наносящей урон атаке этим оружием до конца вашего следующего хода. Урон от этого признака увеличивается до 2 костей для оружия продвинутого и превосходного качества, до 3 для оружия элитного и абсолютного качества, и до 4 для оружия совершенного качества. При критическом попадании бросайте эти кости после удвоения урона оружия. Зарядка оружия несколько раз не даёт никакого эффекта."
        },
        {
            "key": "Натягивающее",
            "nameEng": "brace",
            "desc": "Натягивающее оружие эффективно для нанесения урона по движущимся противникам. Когда вы \"Подготавливаете\" \"Удар\" по противнику, двигающемуся в вашей досягаемости, до начала вашего следующего хода \"Удары\" натягивающим оружием наносят дополнительные 2 точного урона за каждую кость урона оружием."
        },
        {
            "key": "Разборное",
            "nameEng": "breakdown",
            "desc": "Это оружие можно разобрать на несколько маленьких частей. Будучи разобранным, оружие считается маленьким предметом лёгкой Массы. Разборка и сборка оружия является активностью в три действия с признаком `воздействие`, и требует две руки."
        },
        {
            "key": "Брутальное",
            "nameEng": "brutal",
            "desc": "Дистанционная атака с этим признаком использует для броска атаки модификатор Силы вместо Ловкости."
        },
        {
            "key": "Вместимость 2",
            "nameEng": "capacity-2",
            "desc": "Оружие, обладающее признаком `вместимость`, обычно имеет несколько стволов или патронников, способных содержать патрон амуниции. Вместимость всегда имеет число, обозначающее количество стволов или патронников. После выстрела из вместительного оружия вы можете выбрать следующий заряженный ствол или патронник действием \"Взаимодействовать\", для которого не требуется свободная рука. Каждый ствол или патронник можно перезарядить после выстрела отдельным действием \"Взаимодействия\"."
        },
        {
            "key": "Вместимость 3",
            "nameEng": "capacity-3",
            "desc": "Оружие, обладающее признаком `вместимость`, обычно имеет несколько стволов или патронников, способных содержать патрон амуниции. Вместимость всегда имеет число, обозначающее количество стволов или патронников. После выстрела из вместительного оружия вы можете выбрать следующий заряженный ствол или патронник действием \"Взаимодействовать\", для которого не требуется свободная рука. Каждый ствол или патронник можно перезарядить после выстрела отдельным действием \"Взаимодействия\"."
        },
        {
            "key": "Вместимость 4",
            "nameEng": "capacity-4",
            "desc": "Оружие, обладающее признаком `вместимость`, обычно имеет несколько стволов или патронников, способных содержать патрон амуниции. Вместимость всегда имеет число, обозначающее количество стволов или патронников. После выстрела из вместительного оружия вы можете выбрать следующий заряженный ствол или патронник действием \"Взаимодействовать\", для которого не требуется свободная рука. Каждый ствол или патронник можно перезарядить после выстрела отдельным действием \"Взаимодействия\"."
        },
        {
            "key": "Вместимость 5",
            "nameEng": "capacity-5",
            "desc": "Оружие, обладающее признаком `вместимость`, обычно имеет несколько стволов или патронников, способных содержать патрон амуниции. Вместимость всегда имеет число, обозначающее количество стволов или патронников. После выстрела из вместительного оружия вы можете выбрать следующий заряженный ствол или патронник действием \"Взаимодействовать\", для которого не требуется свободная рука. Каждый ствол или патронник можно перезарядить после выстрела отдельным действием \"Взаимодействия\"."
        },
        {
            "key": "Заклинательское",
            "nameEng": "caster",
            "desc": "Это оружие может быть модифицировано \"Сотворением заклинания\" (включая чары), требующим двух или более действий. После сотворения заклинания, если у него был признак @Trait[Spirit]{духовный}, @Trait[Vitality]{жизненность}, @Trait[Sonic]{звук}, @Trait[Acid]{кислота}, @Trait[Fire]{огонь}, @Trait[Void]{пустота}, @Trait[Cold]{холод} или @Trait[Electricity]{электричество}, это оружие до конца вашего следующего хода наносит урон соответствующего типа вместо своего обычного. Если у этого оружия есть признак @Trait[Aeon]{вечное}, в нём установлен колдовской самоцвет, этот эффект длится 1 минуту. Если это заклинание наносит урон нескольких типов, выберите один при выстреле из оружия."
        },
        {
            "key": "Карабканье",
            "nameEng": "climbing",
            "desc": "Рука, держащая это оружие свободна для использования с действием \"Карабкаться\"."
        },
        {
            "key": "Сварганенное",
            "nameEng": "cobbled",
            "desc": "Это оружие сварганено в единое целое и вероятно может дать осечку. Неважно как хорошо вы его обслуживаете, при провале броска атаки оно дает осечку, и вы должны совершить @Check[flat|dc:5]{Чистую проверку}. При провале оружие даёт осечку."
        },
        {
            "key": "Комбинированное",
            "nameEng": "combination",
            "desc": "Комбинированное оружие — новый признак для оружия, которое уникальным или необычным образом сочетает в себе функциональность оружия ближнего боя и огнестрельного. Переключение между использованием оружия ближнего боя и огнестрельного оружия требует действия \"Взаимодействовать\". Однако, если при использовании комбинированного оружия, вашим последним действием был успешный \"Удар\" ближнего боя этим оружием, то вы можете совершить \"Удар\" с помощью этого комбинированного огнестрельного оружия по этому же противнику без полного переключения на использование огнестрельного оружия, стреляя огнестрелом сразу после попадания атакой ближнего боя. В этом случае после огнестрельного \"Удара\", комбинированное оружие возвращается к использованию в качестве оружия ближнего боя."
        },
        {
            "key": "Скрываемое",
            "nameEng": "concealable",
            "desc": "Это оружие предназначено для того, чтобы быть незаметным или легко скрытым. Вы получаете бонус обстоятельства +2 к проверкам Скрытности и КС, чтобы спрятать или скрыть оружие с этим признаком."
        },
        {
            "key": "Сотрясающее",
            "nameEng": "concussive",
            "desc": "Ударная сила от этого оружия так же мощная, как и пробивающая. При определении сопротивления или иммунитета существа к урону от этого оружия, используйте более слабое из сопротивлений или иммунитетов цели к колющему или дробящему урону. Например, если существо иммунно к колющему урону и не имеет сопротивления или иммунитета к дробящему, то оно получит полный урон от сотрясающего оружия. Сопротивление или иммунитет ко всему физическому урону или ко всему урону, действуют как обычно."
        },
        {
            "key": "Критическое (Безоружный)",
            "nameEng": "critical-brawling",
            "desc": "Это оружие использует критическую специализацию указанного типа оружия вместо собственного."
        },
        {
            "key": "Критическое (Коррозионное)",
            "nameEng": "critical-corrosive",
            "desc": "Это оружие использует критическую специализацию указанного типа оружия вместо собственного."
        },
        {
            "key": "Критическое (Криогенное)",
            "nameEng": "critical-cryo",
            "desc": "Это оружие использует критическую специализацию указанного типа оружия вместо собственного."
        },
        {
            "key": "Критическое (Пламенное)",
            "nameEng": "critical-flame",
            "desc": "Это оружие использует критическую специализацию указанного типа оружия вместо собственного."
        },
        {
            "key": "Критическое слияние",
            "nameEng": "critical-fusion",
            "desc": "Критическое слияние — это новый признак комбинированного оружия, который дает вам 2 дополнительных варианта эффекта критической специализации при использовании для атаки ближнего боя, когда огнестрельное оружие заряжено. Если вы выбираете один из них, он заменят обычный эффект критической специализации оружия ближнего боя. Первый — вы можете разрядить огнестрельное оружие, чтобы создать громкий взрыв и сотрясение, используя эффект критической специализации огнестрельного оружия, вместо эффекта критической специализации группы оружия ближнего боя. Второй — вы можете разрядить огнестрельное оружие, чтобы увеличить импульс критического удара или выстрелить в противника, когда вы атакуете его в ближнем бою, нанося 2 дополнительных урона за каждую кость урона оружия. Оба варианта разряжают огнестрельное оружие, что обычно означает необходимость его перезарядки, прежде чем стрелять снова."
        },
        {
            "key": "Критическое (Нож)",
            "nameEng": "critical-knife",
            "desc": "Это оружие использует критическую специализацию указанного типа оружия вместо собственного."
        },
        {
            "key": "Критическое (Ментальное)",
            "nameEng": "critical-mental",
            "desc": "Это оружие использует критическую специализацию указанного типа оружия вместо собственного."
        },
        {
            "key": "Критическое (Плазменное)",
            "nameEng": "critical-plasma",
            "desc": "Это оружие использует критическую специализацию указанного типа оружия вместо собственного."
        },
        {
            "key": "Критическое (Шоковое)",
            "nameEng": "critical-shock",
            "desc": "Это оружие использует критическую специализацию указанного типа оружия вместо собственного."
        },
        {
            "key": "Критическое (Звуковое)",
            "nameEng": "critical-sonic",
            "desc": "Это оружие использует критическую специализацию указанного типа оружия вместо собственного."
        },
        {
            "key": "Смертельное d4",
            "nameEng": "deadly-d4",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное d6",
            "nameEng": "deadly-d6",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное d8",
            "nameEng": "deadly-d8",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное d10",
            "nameEng": "deadly-d10",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное d12",
            "nameEng": "deadly-d12",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Разоружение",
            "nameEng": "disarm",
            "desc": "Вы можете использовать это оружие, чтобы Разоружить с помощью навыка Атлетики, даже если у вас нет свободной руки. Для этого используется досягаемость оружия (если она отличается от вашей собственной) и добавляется бонус предмета оружия к броскам атаки (если есть), в качестве бонуса предмета к проверке Атлетики. Если вы критически проваливаете проверку \"Разоружения\" используя это оружие, то вы можете бросить оружие, чтобы получить эффект обычного провала вместо критического провала. При критическом успехе вам всё ещё нужна свободная рука, если вы хотите взять предмет."
        },
        {
            "key": "Двуствольное",
            "nameEng": "double-barrel",
            "desc": "Это оружие имеет 2 ствола, каждый из которых заряжается отдельно. Вы можете выстрелить из обоих стволов двуствольного оружия за один \"Удар\", чтобы увеличить размер кости урона оружия на один шаг. Если оружие имеет признак фатальное, то это также увеличивает на один шаг и размер кости фатального урона."
        },
        {
            "key": "Расход 1",
            "nameEng": "expend-1",
            "desc": ""
        },
        {
            "key": "Расход 2",
            "nameEng": "expend-2",
            "desc": ""
        },
        {
            "key": "Расход 5",
            "nameEng": "expend-5",
            "desc": ""
        },
        {
            "key": "Расход 10",
            "nameEng": "expend-10",
            "desc": ""
        },
        {
            "key": "Фатальное прицеливание d10",
            "nameEng": "fatal-aim-d10",
            "desc": "Приклад этого оружия можно держать подмышкой одной руки, так что вы можете стрелять из него одной рукой при условии, что другая рука не держит оружие, щит или что-то еще, что требовалось бы двигать и позиционировать, тем самым гарантируя, что оружие не выскользнет из-под руки. Однако, если вы используете обе руки, это оружие может наносить фатальные атаки. Когда вы владеете этим оружием двумя руками, оно получает признак `фатальное` с указанной костью урона. Удерживать это оружие под мышкой достаточно стабильно для стрельбы, значительно сложнее, чем просто отпустить одну руку с оружия, поэтому для смены между этими двумя хватами, вы должны делать это действием \"Взаимодействовать\", а не \"Отпусканием\" или как часть перезарядки."
        },
        {
            "key": "Фатальное прицеливание d12",
            "nameEng": "fatal-aim-d12",
            "desc": "Приклад этого оружия можно держать подмышкой одной руки, так что вы можете стрелять из него одной рукой при условии, что другая рука не держит оружие, щит или что-то еще, что требовалось бы двигать и позиционировать, тем самым гарантируя, что оружие не выскользнет из-под руки. Однако, если вы используете обе руки, это оружие может наносить фатальные атаки. Когда вы владеете этим оружием двумя руками, оно получает признак `фатальное` с указанной костью урона. Удерживать это оружие под мышкой достаточно стабильно для стрельбы, значительно сложнее, чем просто отпустить одну руку с оружия, поэтому для смены между этими двумя хватами, вы должны делать это действием \"Взаимодействовать\", а не \"Отпусканием\" или как часть перезарядки."
        },
        {
            "key": "Фатальное d8",
            "nameEng": "fatal-d8",
            "desc": "Этот признак указывает размер кости. При критическом попадании кость урона оружия увеличивается до этого размера, и оружие добавляет 1 дополнительную кость урона указанного размера."
        },
        {
            "key": "Фатальное d10",
            "nameEng": "fatal-d10",
            "desc": "Этот признак указывает размер кости. При критическом попадании кость урона оружия увеличивается до этого размера, и оружие добавляет 1 дополнительную кость урона указанного размера."
        },
        {
            "key": "Фатальное d12",
            "nameEng": "fatal-d12",
            "desc": "Этот признак указывает размер кости. При критическом попадании кость урона оружия увеличивается до этого размера, и оружие добавляет 1 дополнительную кость урона указанного размера."
        },
        {
            "key": "Точное",
            "nameEng": "finesse",
            "desc": "Для бросков атаки этого оружия ближнего боя, вы можете использовать свой модификатор Ловкости вместо модификатора Силы. Вы всё ещё используете свой модификатор Силы когда рассчитываете урон. Бонус от этого признака уже учтен в блоке характеристик существ, но он может быть важен для таких состояний как неуклюжесть и ослаблен. У существ, если оружие обычно имеет признак `точное`, этот признак может быть не указан в записи атаки, если монстр использует для нее Силу."
        },
        {
            "key": "Свободная рука",
            "nameEng": "free-hand",
            "desc": "Это оружие не занимает вашу руку, обычно потому что оно встроено в ваш доспех. Оружие с признаком `свободная рука` нельзя \"Разоружить\". Вы можете использовать руку, покрытую оружием с признаком `свободная рука`, чтобы владеть другими предметами, выполнять действия с признаком `воздействие` и т.п. Вы не можете атаковать оружием с признаком `свободная рука`, если владеете чем-то в этой руке или другим образом используете ее. Когда вы не владеете ничем в этой руке и не используете эту руку другим образом, то можете использовать умения, которые требуют наличия свободной руки, а также те, что требуют владеть оружием в этой руке. Каждая из ваших рук может иметь только одно оружие с признаком `свободная рука`."
        },
        {
            "key": "Захват",
            "nameEng": "grapple",
            "desc": "Вы можете использовать это оружие, чтобы Захватить с помощью навыка Атлетики, даже если у вас нет свободной руки. Для этого используется досягаемость оружия (если она отличается от вашей собственной) и добавляется бонус предмета оружия к броскам атаки (если есть), в качестве бонуса предмета к проверке Атлетики. Если вы критически проваливаете проверку Захвата используя это оружие, то вы можете бросить оружие, чтобы получить эффект обычного провала вместо критического провала."
        },
        {
            "key": "Мешающее",
            "nameEng": "hampering",
            "desc": "После попадания этим оружием, вы можете использовать действие \"Взаимодействовать\", чтобы наложить на цель штраф обстоятельства –10 футов ко всем её Скоростям. Этот штраф завершается после того, как цель совершит действие `движения`, в начале вашего следующего хода, если вы атакуете этим оружием или если вы передвинетесь так, что цель окажется за пределами досягаемости — в зависимости от того, что произойдёт раньше."
        },
        {
            "key": "Инъекционный",
            "nameEng": "injection",
            "desc": "Это оружие может быть наполнено ранящим ядом. Сразу после успешной атаки этим оружием вы можете впрыснуть в цель заряженный яд одиночным действием \"Взаимодействовать\". Заполнение оружия новым веществом требует 3 действия \"Взаимодействовать\" и использования двух рук."
        },
        {
            "key": "Кавалерийское d4",
            "nameEng": "jousting-d4",
            "desc": "Оружие подходит для ведения конного боя с использованием упряжи или аналогичных средств. Когда находитесь верхом, если предыдущим действием до атаки, вы двигались хотя бы на 10 футов, то добавьте бонус обстоятельства к урону этой атаки, равный количеству костей урона оружия. Так же, будучи верхом, вы можете владеть этим оружием одной рукой, меняя кость урона на указанную в признаке."
        },
        {
            "key": "Кавалерийское d6",
            "nameEng": "jousting-d6",
            "desc": "Оружие подходит для ведения конного боя с использованием упряжи или аналогичных средств. Когда находитесь верхом, если предыдущим действием до атаки, вы двигались хотя бы на 10 футов, то добавьте бонус обстоятельства к урону этой атаки, равный количеству костей урона оружия. Так же, будучи верхом, вы можете владеть этим оружием одной рукой, меняя кость урона на указанную в признаке."
        },
        {
            "key": "Кавалерийское d8",
            "nameEng": "jousting-d8",
            "desc": "Оружие подходит для ведения конного боя с использованием упряжи или аналогичных средств. Когда находитесь верхом, если предыдущим действием до атаки, вы двигались хотя бы на 10 футов, то добавьте бонус обстоятельства к урону этой атаки, равный количеству костей урона оружия. Так же, будучи верхом, вы можете владеть этим оружием одной рукой, меняя кость урона на указанную в признаке."
        },
        {
            "key": "Кавалерийское d10",
            "nameEng": "jousting-d10",
            "desc": "Оружие подходит для ведения конного боя с использованием упряжи или аналогичных средств. Когда находитесь верхом, если предыдущим действием до атаки, вы двигались хотя бы на 10 футов, то добавьте бонус обстоятельства к урону этой атаки, равный количеству костей урона оружия. Так же, будучи верхом, вы можете владеть этим оружием одной рукой, меняя кость урона на указанную в признаке."
        },
        {
            "key": "Отдача",
            "nameEng": "kickback",
            "desc": "Оружие с отдачей является сверхмощным и сложным в использовании. Оно всеми атаками наносит дополнительные 1 урона. Оружие с отдачей даёт штраф обстоятельства −2 к броску атаки, но персонажи с Силой +2 или более игнорируют этот штраф. Присоединение оружия с отдачей к стабилизаторам может снизить этот штраф или убрать его."
        },
        {
            "key": "Модульное",
            "nameEng": "modular",
            "desc": "Оружие имеет несколько конфигураций, которые можно переключать с помощью действия \"Взаимодействовать\". Обычно переключение между конфигурациями модульного оружия позволяет ему наносить различные типы урона (перечисленные в признаке, как \"модульное Д/К/Р\"), однако описание модульного оружия может указывать более сложные комбинации."
        },
        {
            "key": "Парирование",
            "nameEng": "parry",
            "desc": "Это оружие может быть использовано защитно, чтобы блокировать атаки. Владея этим оружием, если вы хотя бы обучены обращению с ним, вы можете использовать одиночное действие, чтобы защищаться им от атак, получая бонус обстоятельства +1 к КБ до начала своего следующего хода."
        },
        {
            "key": "Аккумуляторное",
            "nameEng": "powered",
            "desc": "Это оружие ближнего боя использует аккумулятор. Вы можете активировать или деактивировать аккумуляторное оружие действие \"Взаимодействия\" или в рамках его выхватывания или убирания. Это оружие идёт в комплекте с установленным <em>серийным аккумулятором</em> и использует 1 заряд в день (а не 1 заряд за атаку). Если вы попытаетесь атаковать разряженным или деактивированным аккумуляторным оружием, оно работает как импровизированное оружие."
        },
        {
            "key": "Профессиональное (Компьютеры)",
            "nameEng": "professional-computers",
            "desc": "Оружие с этим признаком может быть использовано как инструмент, связанный с указанным навыком. Добавьте бонус предмета к броскам атаки этого оружия в качестве бонуса предмета к проверкам указанного навыка. Для определения мастерства обращения с этим оружием вы можете считать это воинское оружие простым, а продвинутое — воинским, вплоть до вашего мастерства указанного навыка."
        },
        {
            "key": "Профессиональное (Ремесло)",
            "nameEng": "professional-crafting",
            "desc": "Оружие с этим признаком может быть использовано как инструмент, связанный с указанным навыком. Добавьте бонус предмета к броскам атаки этого оружия в качестве бонуса предмета к проверкам указанного навыка. Для определения мастерства обращения с этим оружием вы можете считать это воинское оружие простым, а продвинутое — воинским, вплоть до вашего мастерства указанного навыка."
        },
        {
            "key": "Профессиональное (Обман)",
            "nameEng": "professional-deception",
            "desc": "Оружие с этим признаком может быть использовано как инструмент, связанный с указанным навыком. Добавьте бонус предмета к броскам атаки этого оружия в качестве бонуса предмета к проверкам указанного навыка. Для определения мастерства обращения с этим оружием вы можете считать это воинское оружие простым, а продвинутое — воинским, вплоть до вашего мастерства указанного навыка."
        },
        {
            "key": "Профессиональное (Выступление)",
            "nameEng": "professional-performance",
            "desc": "Оружие с этим признаком может быть использовано как инструмент, связанный с указанным навыком. Добавьте бонус предмета к броскам атаки этого оружия в качестве бонуса предмета к проверкам указанного навыка. Для определения мастерства обращения с этим оружием вы можете считать это воинское оружие простым, а продвинутое — воинским, вплоть до вашего мастерства указанного навыка."
        },
        {
            "key": "Дистанционный толчок",
            "nameEng": "ranged-shove",
            "desc": "Это оружие может быть использовано, чтобы сделать действие @UUID[Compendium.pf2e.actionspf2e.Item.7blmbDrQFNfdT731] с помощью навыка Атлетики, на расстоянии вплоть до первого шага дистанции оружия. Проверка навыка получает штраф обстоятельства −2. Вы можете добавить к этой проверке бонус предмета оружия к броскам атаки."
        },
        {
            "key": "Дистанционное опрокидывание",
            "nameEng": "ranged-trip",
            "desc": "Это оружие может быть использовано, чтобы сделать действие \"Опрокинуть\" с помощью навыка Атлетики, на расстоянии вплоть до первого шага дистанции оружия. Проверка навыка получает штраф обстоятельства −2. Вы можете добавить к этой проверке бонус предмета оружия к броскам атаки. Как и при использовании оружия ближнего боя для \"Опрокидывания\", дистанционное опрокидывание не наносит урона при опрокидывании. Этот признак обычно есть только у метательного оружия."
        },
        {
            "key": "Повреждающее",
            "nameEng": "razing",
            "desc": "Повреждающее оружие особенно хорошо наносит урон объектам, строениям и транспортным средствам. Когда вы наносите урон объекту (включая щиты и оживлённые объекты), строению или транспортному средству повреждающим оружием, объект получает дополнительный урон, равный удвоенному количеству костей урона оружия."
        },
        {
            "key": "Возвращающееся",
            "nameEng": "recovery",
            "desc": "Возвращающееся оружие — это метательное оружие, предназначенное для возврата к метателю, когда оно не попадает в цель. Когда вы проваливаете метательный \"Удар\" этим оружием, оно возвращается в вашу руку после завершения \"Удара\", позволяя вам повторить попытку. Если у вас заняты руки, когда оружие возвращается, оно падает на поверхность в вашем пространстве."
        },
        {
            "key": "Многозарядное",
            "nameEng": "repeating",
            "desc": "Это оружие не может быть заряжено отдельными болтами или пулями, как другие арбалеты и огнестрельное оружие; вместо этого, для них требуется, чтобы в специальный слот помещался магазин со специализированной амуницией. Как только магазин на месте, амуниция автоматически заряжается каждый раз, когда оружие взводится для стрельбы, уменьшая его перезарядку до значения в его записи `перезарядка` (обычно 0). Когда амуниция заканчивается, необходимо зарядить новый магазин, что требует свободной руки и 3 действия \"Взаимодействовать\" (убрать старый магазин, достать новый магазин, и зарядить новый магазин). Как и с другими типами перезарядки, занимающими несколько действий, эти действия не обязательно должны быть последовательными."
        },
        {
            "key": "Резонирующее",
            "nameEng": "resonant",
            "desc": "Это оружие может проводить энергетический урон. Когда вы владеете резонирующим оружием, то получаете свободное действие \"Пропустить энергию\"."
        },
        {
            "key": "Разброс 5",
            "nameEng": "scatter-5",
            "desc": "Это оружие стреляет скоплением дробинок широким снопом. У разброса всегда указана область, обозначающая радиус снопа дроби. При попадании основная цель атаки оружия с разбросом получает указанный урон, и цель со всеми остальными существами в указанном радиусе вокруг нее получают 1 урон брызгами за каждую кость урона оружия."
        },
        {
            "key": "Разброс 10",
            "nameEng": "scatter-10",
            "desc": "Это оружие стреляет скоплением дробинок широким снопом. У разброса всегда указана область, обозначающая радиус снопа дроби. При попадании основная цель атаки оружия с разбросом получает указанный урон, и цель со всеми остальными существами в указанном радиусе вокруг нее получают 1 урон брызгами за каждую кость урона оружия."
        },
        {
            "key": "Разброс 15",
            "nameEng": "scatter-15",
            "desc": "Это оружие стреляет скоплением дробинок широким снопом. У разброса всегда указана область, обозначающая радиус снопа дроби. При попадании основная цель атаки оружия с разбросом получает указанный урон, и цель со всеми остальными существами в указанном радиусе вокруг нее получают 1 урон брызгами за каждую кость урона оружия."
        },
        {
            "key": "Разброс 20",
            "nameEng": "scatter-20",
            "desc": "Это оружие стреляет скоплением дробинок широким снопом. У разброса всегда указана область, обозначающая радиус снопа дроби. При попадании основная цель атаки оружия с разбросом получает указанный урон, и цель со всеми остальными существами в указанном радиусе вокруг нее получают 1 урон брызгами за каждую кость урона оружия."
        },
        {
            "key": "Толчок",
            "nameEng": "shove",
            "desc": "Вы можете использовать это оружие, чтобы \"Толкнуть\" при помощи навыка Атлетики, даже если у вас нет свободной руки. Для этого используется досягаемость оружия (если она отличается от вашей собственной) и добавляется бонус предмета оружия к броскам атаки (если есть), в качестве бонуса предмета к проверке Атлетики. Если вы критически проваливаете проверку \"Толчка\" используя это оружие, то вы можете бросить оружие, чтобы получить эффект обычного провала вместо критического провала."
        },
        {
            "key": "Зазубренное",
            "nameEng": "tearing",
            "desc": "По кромке этого оружия располагаются волнистые зазубрины, оставляющие кровоточащие раны. Когда вы попадаете по существу этим оружием, оно наносит 1 урона кровотечением. Этот урон увеличивается до 2 продолжительного урона кровотечением, если на оружии есть <em>отличная разящая руна</em>."
        },
        {
            "key": "Привязанное",
            "nameEng": "tethered",
            "desc": "Это оружие привязано к длинной веревке или цепи, что позволяет вам возвращать его после того как оно покинуло вашу руку. Если у вас есть свободная рука (в том числе когда вы только что бросили двуручное привязанное оружие, и имеете руку, которая держит только привязь этого оружия), пока вы владеете этим оружием, то можете использовать действие \"Взаимодействовать\", чтобы подтянуть оружие обратно к себе в руку, после того, как бросили его дистанционной атакой или были разоружены (если только его не держит другое существо)."
        },
        {
            "key": "Мыслящее",
            "nameEng": "thought",
            "desc": "Разновидности оружия, у которых есть этот признак, являются живыми существами, с которыми можно общаться с помощью телепатии. Пока вы владеете этим оружием и способны общаться с ним, вы можете игнорировать любые другие признаки этого оружия, которые обычно у него есть; это касается только признаков, указанных для самого оружия, и не распространяется на признаки, которые оружие или действия получают от использования других особенностей и эффектов. Если вы умеете общаться с этим оружием, ваше мастерство обращения с ним соответствует вашему мастерству обращения с простым оружием."
        },
        {
            "key": "Метательное 10 фт",
            "nameEng": "thrown-10",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "Метательное 15 фт",
            "nameEng": "thrown-15",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "Метательное 20 фт",
            "nameEng": "thrown-20",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "Метательное 30 фт",
            "nameEng": "thrown-30",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "Метательное 40 фт",
            "nameEng": "thrown-40",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "Метательное 50 фт",
            "nameEng": "thrown-50",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "Метательное 60 фт",
            "nameEng": "thrown-60",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "Метательное 80 фт",
            "nameEng": "thrown-80",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "Метательное 100 фт",
            "nameEng": "thrown-100",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "Метательное 200 фт",
            "nameEng": "thrown-200",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "Отслеживающее +1",
            "nameEng": "tracking-1",
            "desc": "Это оружие было разработано с несколькими интегрированными системами наведения, стабилизации и отслеживания. Броски атаки этим оружием получают бонус предмета, равный указанному значению. Площадные атаки этим оружием получают бонус предмета, равный указанному значению, к КС класса для спасбросков."
        },
        {
            "key": "Отслеживающее +2",
            "nameEng": "tracking-2",
            "desc": "Это оружие было разработано с несколькими интегрированными системами наведения, стабилизации и отслеживания. Броски атаки этим оружием получают бонус предмета, равный указанному значению. Площадные атаки этим оружием получают бонус предмета, равный указанному значению, к КС класса для спасбросков."
        },
        {
            "key": "Отслеживающее +3",
            "nameEng": "tracking-3",
            "desc": "Это оружие было разработано с несколькими интегрированными системами наведения, стабилизации и отслеживания. Броски атаки этим оружием получают бонус предмета, равный указанному значению. Площадные атаки этим оружием получают бонус предмета, равный указанному значению, к КС класса для спасбросков."
        },
        {
            "key": "Дрессировочное",
            "nameEng": "training",
            "desc": "Дрессировочное оружие предназначено для использования при обучении животного участию в бою путем определения цели, которую животное должно атаковать. \"Удар\" по существу дрессировочным оружием даёт вашему зверю-компаньону или прирученному животному бонус обстоятельства +1 к следующему броску атаки против этой цели."
        },
        {
            "key": "Опрокидывание",
            "nameEng": "trip",
            "desc": "Вы можете использовать это оружие, чтобы Опрокинуть с помощью навыка Атлетики, даже если у вас нет свободной руки. Для этого используется досягаемость оружия (если она отличается от вашей собственной) и добавляется бонус предмета оружия к броскам атаки (если есть), в качестве бонуса предмета к проверке Атлетики. Если вы критически проваливаете проверку Опрокидывания используя это оружие, то вы можете бросить оружие, чтобы получить эффект обычного провала вместо критического провала."
        },
        {
            "key": "Парное",
            "nameEng": "twin",
            "desc": "Эти оружия используются в паре, дополняя друг друга. При атаке `парным` оружием вы получаете бонус обстоятельства к броску урона, равный количеству костей урона оружия, если ранее в этот ход вы атаковали другим оружием того же вида. Чтобы получить преимущество от этого признака, оружия должны быть того же вида, но им не обязательно иметь такие же руны."
        },
        {
            "key": "Двуручное d6",
            "nameEng": "two-hand-d6",
            "desc": "Этим оружием можно владеть двумя руками. Это изменяет кость урона оружия до указанного значения. Это применяется ко всем костям урона оружия, например таким как от разящих рун."
        },
        {
            "key": "Двуручное d8",
            "nameEng": "two-hand-d8",
            "desc": "Этим оружием можно владеть двумя руками. Это изменяет кость урона оружия до указанного значения. Это применяется ко всем костям урона оружия, например таким как от разящих рун."
        },
        {
            "key": "Двуручное d10",
            "nameEng": "two-hand-d10",
            "desc": "Этим оружием можно владеть двумя руками. Это изменяет кость урона оружия до указанного значения. Это применяется ко всем костям урона оружия, например таким как от разящих рун."
        },
        {
            "key": "Двуручное d12",
            "nameEng": "two-hand-d12",
            "desc": "Этим оружием можно владеть двумя руками. Это изменяет кость урона оружия до указанного значения. Это применяется ко всем костям урона оружия, например таким как от разящих рун."
        },
        {
            "key": "Безоружное",
            "nameEng": "unarmed",
            "desc": "Безоружная атака использует ваше тело вместо изготовленного оружия. Безоружная атака не является оружием, однако классифицируется среди групп оружия, и может иметь признаки оружия. Так как это часть вашего тела, то ее нельзя Разоружить. Оно так же не занимает руку, однако кулак или другая хватающая конечность обычно работает как оружие с признаком `свободная рука`."
        },
        {
            "key": "Громоздкое",
            "nameEng": "unwieldy",
            "desc": "Оружие с этим признаком большое, неудобное, требует охлаждения между выстрелами или его тяжело использовать для последовательных выстрелов по другой причине. Вы не можете использовать `громоздкое` оружие чаще, чем раз в раунд, и не можете использовать его для \"Ударов\" в рамках реакций, таких как <em>\"Реагирующий удар\"</em>."
        },
        {
            "key": "Улучшение",
            "nameEng": "upgrade",
            "desc": "Оружие может быть снабжено улучшениями, которые включают в себя технологические модификации и оружейные сопряжения. Здесь указано, сколько улучшений можно установить на оружие."
        },
        {
            "key": "Транспортное",
            "nameEng": "vehicular",
            "desc": "Транспортное оружие крепится к транспорту или надевается на всадника или скакуна и, как правило, может использоваться только водителем транспорта или основным всадником скакуна. Водитель или всадник может управлять транспортным оружием теми же руками, которыми он управляет транспортом или скакуном. Транспортное оружие можно \"Разоружить\", выбив элементы управления (обычно поводья для скакуна или рулевое устройство для транспорта) из рук владельца."
        },
        {
            "key": "Ядовитое",
            "nameEng": "venomous",
            "desc": "Это оружие добавляет яд к каждому удару. Когда вы поражаете существо этим оружием, оно наносит дополнительно 1 продолжительного урона ядом. Это значение увеличивается до 2 продолжительного урона ядом, если у оружия есть отличная разящая руна."
        },
        {
            "key": "Универсальное Кислота",
            "nameEng": "versatile-acid",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Дробящий",
            "nameEng": "versatile-b",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Холод",
            "nameEng": "versatile-cold",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Электричество",
            "nameEng": "versatile-electricity",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Огонь",
            "nameEng": "versatile-fire",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Сила",
            "nameEng": "versatile-force",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Ментальный",
            "nameEng": "versatile-mental",
            "desc": ""
        },
        {
            "key": "Универсальное Колющий",
            "nameEng": "versatile-p",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Яд",
            "nameEng": "versatile-poison",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Рубящий",
            "nameEng": "versatile-s",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Звук",
            "nameEng": "versatile-sonic",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Духовный",
            "nameEng": "versatile-spirit",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Жизненность",
            "nameEng": "versatile-vitality",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Универсальное Пустота",
            "nameEng": "versatile-void",
            "desc": "Универсальное оружие может быть использовано, чтобы наносить другой тип урона, а не только тот, что указан в записи \"Урон\". Этот признак указывает альтернативный тип урона. Например, колющее оружие, которое имеет признак `универсальное Д` может быть использовано, чтобы наносить колющий или дробящий урон. Вы выбираете тип урона каждый раз, когда совершаете атаку."
        },
        {
            "key": "Абисиум",
            "nameEng": "abysium",
            "desc": "Сине-зелёный металл с жутким зелёным свечением, абисиум излучает энергию, губительную для жизни. Неосторожное воздействие этого материала может привести к длительному повреждению иммунной системы; поэтому добыча абисиума опасна, так как большое количество этого металла вызывает заболевание у всех существ поблизости. Существо, переносящее объект из абисиума, испытывает @Condition[Sickened]{тошноту 1} от объекта стандартного качества лёгкой Массы, @Condition[Sickened]{тошноту 2} от объекта стандартного качества с Массой 1 или более или высококачественного объекта лёгкой Массы, или @Condition[Sickened]{тошноту 3} от высококачественного объекта Массой 1 или более. Этот и все другие тошнотворные эффекты абисиума являются эффектами @Trait[Poison]{яда}. Ремесленники могут использовать 1 кусок абисиума для создания вплоть до 6 доз ядовитого абисиумового порошка. Недобросовестные кузнецы используют токсичные свойства абисиума для создания едкого оружия и смертоносных веществ. Все объекты, созданные из абисиума, излучают тусклый свет в 10-футовом радиусе."
        },
        {
            "key": "Адамантин",
            "nameEng": "adamantine",
            "desc": "Добытый из камней, упавших с небес, адамантин является одним из самых твердых известных металлов. Он имеет блестящий, черный внешний вид, и его ценят за его удивительную крепость и способность оставаться невероятно острым по краям."
        },
        {
            "key": "Холодное железо",
            "nameEng": "cold-iron",
            "desc": "Оружие, изготовленное из холодного железа, смертельно для демонов и фей. Холодное железо выглядит как обычное железо, но добывается из особо чистых источников и формируется с небольшим нагревом или без него. Этот процесс чрезвычайно сложен, особенно для высококачественных изделий из холодного железа."
        },
        {
            "key": "Рассветное серебро",
            "nameEng": "dawnsilver",
            "desc": "Рассветное серебро славится своей легкостью, долговечностью и эффективностью против целого ряда существ, включая дьяволов и ликантропов. Он имеет такой же блеск, что и серебро, но обладает более светлым оттенком. Оружие и доспехи из рассветного серебра считаются как если бы они были серебряными, с целью урона существам со слабостью к серебру. Металлический предмет, сделанный из рассветного серебра, легче того, что сделан из железа или стали: Масса предмета снижена на 1 (или до легкой Массы, если его нормальная Масса равна 1, не влияя на предмет, который уже имеет лёгкую Массу). Цена предмета, сделанного из рассветного серебра, зависит от нормальной Массы предмета, а не его Массы, сниженной из-за применения рассветного серебра, но снизьте Массу прежде, чем делать какие-либо дальнейшие корректировки размера предмета."
        },
        {
            "key": "Сумеречное дерево",
            "nameEng": "duskwood",
            "desc": "Сумеречное дерево это очень легкая древесина, встречающаяся главным образом в старых лесах южно-центрального Авистана; она темная, как эбеновое дерево, но имеет легкий пурпурный оттенок. Масса предмета из сумеречного дерева снижена на 1 (или до лёгкой Массы, если его нормальная Масса равна 1, не влияя на предмет, который уже имеет лёгкую Массу). Цена предмета сделанного из сумеречного дерева зависит от нормальной Массы предмета, а не его Массы, сниженной из-за применения сумеречного дерева, но снизьте Массу прежде, чем делать какие-либо дальнейшие корректировки размера предмета."
        },
        {
            "key": "Джезет",
            "nameEng": "djezet",
            "desc": "Этот ржаво-рыжий металл жидкий при комнатной температуре, что делает его сложным в обработке для всех, кроме самых искусных металлургов, и в некоторых местах он получил название \"быстрое железо\". Джезет также чрезвычайно чувствителен к магии, даже в твердой, обработанной форме сплава. Становясь целью магического воздействия он светится, а предметы, изготовленные из сплавов джезета, светятся алыми полосами, из-за чего некоторые кузнецы прозвали его \"тигровым железом\". Становясь целью заклинаний, объекты изготовленные из сплавов джезета, проявляют светящиеся красные отметки, которые остаются на 1 раунд или время действия заклинания, в зависимости от того, что больше. Масса джезета содержит достаточно джезета для переработки в 2 Доза джезета."
        },
        {
            "key": "Драконья шкура",
            "nameEng": "dragonhide",
            "desc": "Шкура и чешуя дракона могут быть использованы, чтобы \"Создать\" любой предмет, обычно сделанный из простой кожи или шкуры. Драконья шкура различается по цветам от синей до блестящей золотой, в зависимости от дракона, из которого она сделана. Благодаря стойкости чешуи, ее так же можно использовать, чтобы \"Создать\" доспехи, которые обычно сделаны из металлических пластин (такие как нагрудник, полулаты и полные латы), что позволяет такой броне быть изготовленной без металла. Объекты из драконьей шкуры иммунны к одному типу урона, в зависимости от вида дракона."
        },
        {
            "key": "Паутина снов",
            "nameEng": "dreamweb",
            "desc": "Изготовленное из паутины, сплетенной из грудной клетки самой Ткачихи паутины, паутина снов обладает рядом мистических свойств. Тканевые изделия и веревки из паутины имеют Твёрдость 4, ОЗ 12 на дюйм и КС разрыва 16. Лёгкие доспехи из паутины снов легче обычной ткани или кожи: Масса доспеха снижается на 1 (уменьшается до Л, если обычная Масса доспеха 1, и не влияет на предмет, чья Масса Л). Лёгкие доспехи из паутины снов дают владельцу сопротивление яду, равное 3 + значение руны мощи доспеха."
        },
        {
            "key": "Гризантиевая шкура",
            "nameEng": "grisantian-pelt",
            "desc": "Эта сверхпрочная шкура животного имеет золотистый цвет и сияет на солнце. Из неё можно изготовить любой предмет, который обычно делают из ткани, кожи или шкуры. Этот материал невосприимчив к огню, а его Твёрдость удваивается против колющего или рубящего урона. С одного существа можно собрать до 4 Масс гризантиевой шкуры (этого обычно более чем достаточно для 4 наборов доспехов стандартного качества или 2 наборов высококачественных доспехов)."
        },
        {
            "key": "Инубрикс",
            "nameEng": "inubrix",
            "desc": "Необычная молекулярная структура этого бледного, податливого металла позволяет ему частично проходить сквозь железо и сталь, не касаясь их. Хотя это свойство полезно для создания оружия, обходящего металлические доспехи, инубрикс едва ли прочнее свинца. Даже в легированном состоянии этот небесный металл настолько хрупок, что его трудно использовать для создания надежных щитов, и он далеко не идеален для создания доспехов."
        },
        {
            "key": "Крепостной камень",
            "nameEng": "keep-stone",
            "desc": "Венцом тысячелетия металлургических достижений и инженерных разработок Высокограда является прекрасный сплав, называемый крепостным камнем. Несмотря на название, в производстве крепостного камня не используется камень. С помощью строго охраняемого процесса, в ходе которого выплавляются адамантин и свинец, величайшие мастера Высокограда смогли создать материал, по внешнему виду больше напоминающий мрамор, чем металл. Крепостной камень лишь немного слабее адамантина, но обладает невероятной способностью разрушать магию. Любое заклинание или магический эффект, направленный на необработанный камень, должен пройти @Check[flat|dc:5], иначе эффект будет потерян."
        },
        {
            "key": "Ноквал",
            "nameEng": "noqual",
            "desc": "Являясь легким и прочным, ноквал еще демонстрирует мощное сопротивление к магии. Побочным эффектом этого сопротивления является то, что изготовление магического оружия из ноквала требует сложной и дорогостоящей алхимической обработки. Кевот-Кул, Черный Повелитель Нумерии, разработал сплав ноквала и холодного железа, известный как суверенная сталь, чтобы помочь смягчить это свойство. Кристаллический вид этого металла может навести на мысль о его хрупкости, но бледно-зеленый материал можно обрабатывать так же, как и железо. Объекты, сделанные из ноквала, имеют бонус обстоятельства +4 к спасброскам против магии, совершаемым самим предметом, и дают свой бонус к спасброскам, которые владелец совершает специально для защиты этого предмета от магии (например, против заклинания Хватка ржавчины)."
        },
        {
            "key": "Орихалк",
            "nameEng": "orichalcum",
            "desc": "Орихалк — самый редкий и ценный небесный металл, который известен своими невероятными магическими свойствами, связанными со временем. Этот тусклый металл цвета меди не так прочен, как адамантин, но свойства орихалка подчиняющие время, обеспечивают большую Твёрдость и ОЗ. Если предмет из орихалка получает повреждения, но не был уничтожен, он сам полностью восстановится через 24 часа."
        },
        {
            "key": "Персиковое дерево",
            "nameEng": "peachwood",
            "desc": "Под прямыми солнечными лучами оружие из персикового дерева приобретает особенно темно-рыжий оттенок. Оружие из персикового дерева приравнивается к сумеречному дереву для любых сопротивлений или слабостей `нежити`, связанных с сумеречным деревом (что, например, позволяет оружию из персикового дерева преодолевать сопротивление цзянши). Кроме того, оружие из персикового дерева преодолевает небольшую часть сопротивлений любой нежити. \"Удары\" оружием из персикового дерева считают сопротивления нежити против физического урона на 2 меньше для оружия стандартного качества и на 4 меньше для высококачественного."
        },
        {
            "key": "Сиккатит",
            "nameEng": "siccatite",
            "desc": "В необработанном состоянии эта серебристая руда либо обжигающе горячая, либо леденяще холодная. Металлурги расходятся во мнении, является ли сиккатит двумя связанными веществами или это одно вещество, которое определяет свой температурный режим с помощью какого-то неизвестного процесса. Какова бы ни была причина, экстремальная температура этого материала означает, что с ним нужно осторожно обращаться. Горячий сиккатит может легко поджечь легковоспламеняющиеся вещи, такие как бумага и сухой кустарник, а холодный сиккатит, оставленный во влажных местах, быстро окружает себя толстым слоем льда. Существо, вступившее в физический контакт со значительным количеством сиккатита, получает 1 энергетический урон за каждый раунд продолжающегося контакта (огнем, либо холодом, для горячего и холодного сиккатита соответственно)."
        },
        {
            "key": "Серебро",
            "nameEng": "silver",
            "desc": "Серебряное оружие — погибель для различных существ, от дьяволов до оборотней. Серебряные предметы менее прочны, чем предметы из стали, а предметы из низкосортного серебра обычно лишь покрывают серебром."
        },
        {
            "key": "Сестринский камень",
            "nameEng": "sisterstone",
            "desc": "Сестринский камень — это термин используемый для обозначения двух близких руд, пропитанных духовным потоком в Поле Дев: сумеречного и алого сестринского камня. Они обладают одинаковыми физическими свойствами, за исключением цвета — сумеречный камень бледно-оранжевый, а алый — оранжево-красный. Если рядом с предметом, сделанным из другого типа сестринского камня, находится другой, они оба начинают источать духовную энергию, отталкивающую нежить."
        },
        {
            "key": "Сестринский камень (Сумеречный)",
            "nameEng": "sisterstone-dusk",
            "desc": "Сестринский камень — это термин используемый для обозначения двух близких руд, пропитанных духовным потоком в Поле Дев: сумеречного и алого сестринского камня. Они обладают одинаковыми физическими свойствами, за исключением цвета — сумеречный камень бледно-оранжевый, а алый — оранжево-красный. Если рядом с предметом, сделанным из другого типа сестринского камня, находится другой, они оба начинают источать духовную энергию, отталкивающую нежить."
        },
        {
            "key": "Сестринский камень (Алый)",
            "nameEng": "sisterstone-scarlet",
            "desc": "Сестринский камень — это термин используемый для обозначения двух близких руд, пропитанных духовным потоком в Поле Дев: сумеречного и алого сестринского камня. Они обладают одинаковыми физическими свойствами, за исключением цвета — сумеречный камень бледно-оранжевый, а алый — оранжево-красный. Если рядом с предметом, сделанным из другого типа сестринского камня, находится другой, они оба начинают источать духовную энергию, отталкивающую нежить."
        },
        {
            "key": "Экзувиелит",
            "nameEng": "sloughstone",
            "desc": "Оружие, сделанное из экзувиелита, использует ненависть Верекса-что-был к своему невольному превращению, обращая его собственную плоть против него самого. Обрабатывать экзувиелит сложно и неприятно, поэтому КС для создания предмета из этого материала увеличивается на 4. Из экзувиелита нельзя создавать строения."
        },
        {
            "key": "Суверенная сталь",
            "nameEng": "sovereign-steel",
            "desc": "Созданная Чёрным Владыкой Кевот-Кулом, этот уникальный сплав холодного железа и небесного металла ноквал может обеспечить защиту от магического нападения. Процесс холодной ковки двух материалов довольно сложен и точен. Персонажам, ищущим оружие и доспехи из суверенной стали, почти наверняка придётся отправиться в Звездопад (Starfall), чтобы добыть снаряжение из этого редкого сплава. Хотя некоторые считают, что из суверенной стали можно изготовить и щиты, Кевот-Кул в один из своих приступов крикнул, что они ему ни к чему и запретил кому-бы то ни было создавать подобные вещи. Пока что его кузнецы слишком боятся подтвердить, была ли это шутка или нет. Все предметы из суверенной стали (включая оружие и доспехи) получают бонус обстоятельства +4 к спасброскам от магии, которые делает сам предмет, и дают бонус к спасброскам, которые владелец делает специально для защиты предмета от магии (например от заклинания @UUID[Compendium.pf2e.spells-srd.Item.0fYE64odlKqISzft])"
        },
        {
            "key": "Искривлённое стекло",
            "nameEng": "warpglass",
            "desc": "Эта причудливая субстанция создается из чистой, хаотичной квинтэссенции Водоворота. Из нее можно делать оружие и предметы, но она слишком нестабильна, чтобы из неё можно было сделать полезные доспехи или щиты. Необработанное искривлённое стекло — опаловый стеклообразный материал с удивительной прочностью. При обработке оно меняет свой вид — хотя и не свойства — и становится похожим на случайные полосы других металлов и камней."
        },
        {
            "key": "Заряжаемое 2d10",
            "nameEng": "boost-2d10",
            "desc": "Вы можете заряжать это оружие действием \"Взаимодействовать\", чтобы добавлять дополнительную кость урона указанного размера к следующей наносящей урон атаке этим оружием до конца вашего следующего хода. Урон от этого признака увеличивается до 2 костей для оружия продвинутого и превосходного качества, до 3 для оружия элитного и абсолютного качества, и до 4 для оружия совершенного качества. При критическом попадании бросайте эти кости после удвоения урона оружия. Зарядка оружия несколько раз не даёт никакого эффекта."
        },
        {
            "key": "Смертельное 2d4",
            "nameEng": "deadly-2d4",
            "desc": ""
        },
        {
            "key": "Смертельное 3d4",
            "nameEng": "deadly-3d4",
            "desc": ""
        },
        {
            "key": "Смертельное 4d4",
            "nameEng": "deadly-4d4",
            "desc": ""
        },
        {
            "key": "Смертельное 2d6",
            "nameEng": "deadly-2d6",
            "desc": ""
        },
        {
            "key": "Смертельное 3d6",
            "nameEng": "deadly-3d6",
            "desc": ""
        },
        {
            "key": "Смертельное 4d6",
            "nameEng": "deadly-4d6",
            "desc": ""
        },
        {
            "key": "Смертельное 2d8",
            "nameEng": "deadly-2d8",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное 3d8",
            "nameEng": "deadly-3d8",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное 4d8",
            "nameEng": "deadly-4d8",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное 2d10",
            "nameEng": "deadly-2d10",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное 3d10",
            "nameEng": "deadly-3d10",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное 4d10",
            "nameEng": "deadly-4d10",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное 2d12",
            "nameEng": "deadly-2d12",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное 3d12",
            "nameEng": "deadly-3d12",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Смертельное 4d12",
            "nameEng": "deadly-4d12",
            "desc": "При критическом попадании это оружие добавляет кость урона оружия указанного размера. Бросок делается после удвоения урона оружия. Этот урон увеличивается до 2 костей, если оружие имеет отличную разящую руну, и до 3 для старшей разящей руны. Например, при критическом попадании рапира с отличной разящей руной наносит дополнительные 2d8 колющего урона. Умения, которые изменяют размер кости обычного урона оружия, не изменяют размер его `смертельной` кости."
        },
        {
            "key": "Длинное 0 футов",
            "nameEng": "reach-0",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 10 футов",
            "nameEng": "reach-10",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 15 футов",
            "nameEng": "reach-15",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 20 футов",
            "nameEng": "reach-20",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 25 футов",
            "nameEng": "reach-25",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 30 футов",
            "nameEng": "reach-30",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 40 футов",
            "nameEng": "reach-40",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 50 футов",
            "nameEng": "reach-50",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 60 футов",
            "nameEng": "reach-60",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 100 футов",
            "nameEng": "reach-100",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 120 футов",
            "nameEng": "reach-120",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 200 футов",
            "nameEng": "reach-200",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Длинное 1,000 футов",
            "nameEng": "reach-1000",
            "desc": "Естественные атаки с этой чертой могут быть использованы, чтобы атаковать существ, находящихся на указанном расстоянии, а не только существ рядом. Оружие с этим признаком длинное и может быть использовано, чтобы атаковать существ на расстоянии вплоть до 10 футов, а не только существ рядом. Для существ, которые уже имеют досягаемость за счет конечности или конечностей, которыми они владеют оружием, оружие увеличивает свою досягаемость на 5 футов."
        },
        {
            "key": "Перезарядка 0",
            "nameEng": "reload-0",
            "desc": "В то время как всему оружию требуется некоторое количество времени, чтобы прийти в боевую готовность, многое дистанционное оружие так же требуется заряжать и перезаряжать. Эта запись обозначает сколько действий \"Взаимодействовать\" требуется, чтобы перезарядить такое оружие. Это значение может быть равно 0, если вытаскивание амуниции и стрельба из оружия являются частью одного действия. Если для перезарядки предмета требуется 2 или больше действий, Мастер решает, должны ли они выполняться вместе как часть активности, или вы можете потратить часть этих действий во время одного хода, а остальные во время следующего."
        },
        {
            "key": "Перезарядка 1",
            "nameEng": "reload-1",
            "desc": "В то время как всему оружию требуется некоторое количество времени, чтобы прийти в боевую готовность, многое дистанционное оружие так же требуется заряжать и перезаряжать. Эта запись обозначает сколько действий \"Взаимодействовать\" требуется, чтобы перезарядить такое оружие. Это значение может быть равно 0, если вытаскивание амуниции и стрельба из оружия являются частью одного действия. Если для перезарядки предмета требуется 2 или больше действий, Мастер решает, должны ли они выполняться вместе как часть активности, или вы можете потратить часть этих действий во время одного хода, а остальные во время следующего."
        },
        {
            "key": "Перезарядка 2",
            "nameEng": "reload-2",
            "desc": "В то время как всему оружию требуется некоторое количество времени, чтобы прийти в боевую готовность, многое дистанционное оружие так же требуется заряжать и перезаряжать. Эта запись обозначает сколько действий \"Взаимодействовать\" требуется, чтобы перезарядить такое оружие. Это значение может быть равно 0, если вытаскивание амуниции и стрельба из оружия являются частью одного действия. Если для перезарядки предмета требуется 2 или больше действий, Мастер решает, должны ли они выполняться вместе как часть активности, или вы можете потратить часть этих действий во время одного хода, а остальные во время следующего."
        },
        {
            "key": "Перезарядка 1 минута",
            "nameEng": "reload-1-min",
            "desc": "В то время как всему оружию требуется некоторое количество времени, чтобы прийти в боевую готовность, многое дистанционное оружие так же требуется заряжать и перезаряжать. Эта запись обозначает сколько действий \"Взаимодействовать\" требуется, чтобы перезарядить такое оружие. Это значение может быть равно 0, если вытаскивание амуниции и стрельба из оружия являются частью одного действия. Если для перезарядки предмета требуется 2 или больше действий, Мастер решает, должны ли они выполняться вместе как часть активности, или вы можете потратить часть этих действий во время одного хода, а остальные во время следующего."
        },
        {
            "key": "Отражающий Дробящий",
            "nameEng": "deflecting-bludgeoning",
            "desc": "Этот щит предназначен для блокирования или отклонения определённых типов атак или оружия. Увеличивает Твёрдость щита против указанного типа атак на 2."
        },
        {
            "key": "Отражающий Физический дальнего боя",
            "nameEng": "deflecting-physical-ranged",
            "desc": "Этот щит предназначен для блокирования или отклонения определённых типов атак или оружия. Увеличивает Твёрдость щита против указанного типа атак на 2."
        },
        {
            "key": "Отражающий Колющий",
            "nameEng": "deflecting-piercing",
            "desc": ""
        },
        {
            "key": "Отражающий Рубящий",
            "nameEng": "deflecting-slashing",
            "desc": "Этот щит предназначен для блокирования или отклонения определённых типов атак или оружия. Увеличивает Твёрдость щита против указанного типа атак на 2."
        },
        {
            "key": "Складной",
            "nameEng": "foldaway",
            "desc": "<p>Этот щит может складываться в более компактную форму, прикреплённую к латной рукавице, для устойчивости и удобства передвижения. Вы можете использовать действие \"Взаимодействовать\", чтобы развернуть или сложить щит. Пока он развёрнут, вы можете \"Поднять щит\", если ваша рука свободна или вы держите в ней предмет лёгкой Массы, не являющийся оружием. Щит мешает использовать руку, пока он развернут. Хотя вы всё ещё можете держать предметы в этой руке, вы не можете использовать оружие в этой руке, управлять чем-либо, требующим двух рук или атаковать с помощью латной рукавицы.</p><p>Складной щит должен быть прикреплён к латной рукавице для стабильности. Его можно прикрепить к предмету за 10 минут работы при успешной проверке Ремесла КС 10; сюда входит время, необходимое для снятия щита с предыдущей перчатки, если это необходимо. Если латная рукавица была уничтожена, складной щит обычно можно снять. Складная природа щита делает невозможным прикрепления к нему оружия.</p>"
        },
        {
            "key": "Запряжённый",
            "nameEng": "harnessed",
            "desc": "В этом щите есть специальная скоба или отверстие, предназначенная для крепления пик или другого кавалерийского оружия. Кавалеристы часто используют такие щиты в качестве запасного варианта в узких проходах и других местах, где они не могут передвигаться верхом. Вы можете использовать действие \"Взаимодействовать\", чтобы зафиксировать в щите кавалерийское оружие, что позволит вам использовать две руки для одновременного владения щитом и оружием. Если вы не держите комбинированное устройство обеими руками, вы не можете использовать ни оружие, ни щит.</p>\n<p>Пока щит поднят, вы можете использовать кавалерийское оружие, как если бы вы были верхом. Поскольку значительная часть оружия должна быть закреплена за щитом, радиус действия оружия уменьшается на 5 футов, если он превышает 5 футов."
        },
        {
            "key": "Тяжёлый 2",
            "nameEng": "hefty-2",
            "desc": "Тяжёлый щит настолько массивен, что для его поднятия требуется больше усилий. Поднятие щита с признаком `тяжёлый` являются активностью, требующей двух действий, если только ваш модификатор Силы не равен указанному в признаке значению или не превышает его."
        },
        {
            "key": "Интегрированный 1d6 Д",
            "nameEng": "integrated-1d6-b",
            "desc": "Этот щит был создан, чтобы включить в свою конструкцию оружие, которое работает как прикреплённое оружие, но не может быть снято с щита. Это также не позволяет добавить к щиту другое прикрепленное оружие. Урон интегрированного оружия указывается рядом с признаком, например `интегрированное d6 Р`, а все признаки в скобках. Если в описании щита не указано иное, интегрированное оружие является воинским оружием из группы `щит` и требует одной руки для атаки. На интегрированном оружии могут быть выгравированы руны, как и на другом встроенном оружии. Если щит сломан, вы можете продолжать сражаться интегрированным оружием, но если щит уничтожен, то и оружие тоже."
        },
        {
            "key": "Интегрированный 1d6 К",
            "nameEng": "integrated-1d6-p",
            "desc": "Этот щит был создан, чтобы включить в свою конструкцию оружие, которое работает как прикреплённое оружие, но не может быть снято с щита. Это также не позволяет добавить к щиту другое прикрепленное оружие. Урон интегрированного оружия указывается рядом с признаком, например `интегрированное d6 Р`, а все признаки в скобках. Если в описании щита не указано иное, интегрированное оружие является воинским оружием из группы `щит` и требует одной руки для атаки. На интегрированном оружии могут быть выгравированы руны, как и на другом встроенном оружии. Если щит сломан, вы можете продолжать сражаться интегрированным оружием, но если щит уничтожен, то и оружие тоже."
        },
        {
            "key": "Интегрированный 1d6 Р",
            "nameEng": "integrated-1d6-s",
            "desc": "Этот щит был создан, чтобы включить в свою конструкцию оружие, которое работает как прикреплённое оружие, но не может быть снято с щита. Это также не позволяет добавить к щиту другое прикрепленное оружие. Урон интегрированного оружия указывается рядом с признаком, например `интегрированное d6 Р`, а все признаки в скобках. Если в описании щита не указано иное, интегрированное оружие является воинским оружием из группы `щит` и требует одной руки для атаки. На интегрированном оружии могут быть выгравированы руны, как и на другом встроенном оружии. Если щит сломан, вы можете продолжать сражаться интегрированным оружием, но если щит уничтожен, то и оружие тоже."
        },
        {
            "key": "Интегрированный 1d6 Р (Универсальное К)",
            "nameEng": "integrated-1d6-s-versatile-p",
            "desc": "Этот щит был создан, чтобы включить в свою конструкцию оружие, которое работает как прикреплённое оружие, но не может быть снято с щита. Это также не позволяет добавить к щиту другое прикрепленное оружие. Урон интегрированного оружия указывается рядом с признаком, например `интегрированное d6 Р`, а все признаки в скобках. Если в описании щита не указано иное, интегрированное оружие является воинским оружием из группы `щит` и требует одной руки для атаки. На интегрированном оружии могут быть выгравированы руны, как и на другом встроенном оружии. Если щит сломан, вы можете продолжать сражаться интегрированным оружием, но если щит уничтожен, то и оружие тоже."
        },
        {
            "key": "Запускающий",
            "nameEng": "launching-dart",
            "desc": "Механизм внутри этого щита может стрелять снарядами, в результате чего щит может работать и как оружие дальнего боя. В признаке указывается тип оружия, например `пусковой дротик`. Для совершения \"Удара\" с помощью пусковой установки требуется то же количество рук, что и обычно, за исключением того, что рука, держащая щит, засчитывается в это число, так что для одноручного оружия дальнего боя потребуется только одна рука. Перезарядка занимает обычное количество действий \"Взаимодействовать\", минимум 1 действие, и вы не можете использовать для перезарядки руку, держащую щит."
        },
        {
            "key": "Метнуть щит 20 фт",
            "nameEng": "shield-throw-20",
            "desc": "Щит с этим признаком предназначен для метания в качестве оружия дальнего боя. Когда щит метается, он является воинским оружием дальнего боя. Его кости урона и тип такие же, как у `удара щитом`, но если щит включает в себя прикрепленное или интегрированное оружие, вы можете выбрать атаковать им, когда метаете щит. К урону добавляется модификатор Силы, как и в случае с метательным оружием. Признак также включает в себя шаг дистанции."
        },
        {
            "key": "Метнуть щит 30 фт",
            "nameEng": "shield-throw-30",
            "desc": "Щит с этим признаком предназначен для метания в качестве оружия дальнего боя. Когда щит метается, он является воинским оружием дальнего боя. Его кости урона и тип такие же, как у `удара щитом`, но если щит включает в себя прикрепленное или интегрированное оружие, вы можете выбрать атаковать им, когда метаете щит. К урону добавляется модификатор Силы, как и в случае с метательным оружием. Признак также включает в себя шаг дистанции."
        },
        {
            "key": "Essence",
            "nameEng": "essence",
            "desc": "Spells and feats with the essence trait are modified by essence spellcasting features and rules. <i>This is a FoundryVTT-only inclusion, making it easier to work with Essence spellcasting and to assign which spells are affected.</i>"
        },
        {
            "key": "Aspectmorph",
            "nameEng": "aspectmorph",
            "desc": "These effects transform the target into a new form. A target can't be under the effect of more than one polymorph effect at a time. If it comes under the effect of a second polymorph effect, the second polymorph effect attempts to counteract the first. If it succeeds, it takes effect, and if it fails, the spell has no effect on that target. Any Strikes specifically granted by a polymorph effect are magical. Unless otherwise stated, polymorph spells don't allow the target to take on the appearance of a specific individual creature, but rather just a generic creature of a general type or ancestry.<p/> For more details, see the Aspect Forms page in the Magic+ Journal."
        },
        {
            "key": "Aspectmon",
            "nameEng": "aspectmon",
            "desc": "Summoned creatures typically take the appearance of a creature below the caster’s level, though juvenile or visibly weaker versions of the appropriate level are possible. Spells with the summon trait can conjure aspect creatures, typically ones of a particular aspect type. The aspect creature must be from a common aspect or from another aspect to which you have access. The aspect creature gains the minion and aspectformed traits, and it must appear adjacent to you in an unoccupied space large enough to contain it. The rank of the spell determines other statistics of the aspect creature you summon, such as its starting Hit Points. The spell can still summon a creature with statistics of a lower rank if you so choose. These rules apply only to spells that have the aspectmon trait; other spells that call or conjure items or beings but that don't have the trait, like summon instrument, work as explained in the spell."
        },
        {
            "key": "Aspectformed",
            "nameEng": "aspectformed",
            "desc": "Summoned creatures have the minion and summoned traits, and other traits as defined in the summon’s aspect. For all of the rules regarding aspectformed creatures, see the Aspect Summons page in the Magic+ Journal."
        },
        {
            "key": "Обычный",
            "nameEng": "common",
            "desc": "Все у чего не указан другой признак редкости (необычный, редкий или уникальный) автоматически имеет признак `обычный`. Этот признак обозначает, что умение, предмет или заклинание доступно всем игрокам соответствующим его предварительным условиям."
        },
        {
            "key": "Необычный",
            "nameEng": "uncommon",
            "desc": "Что-то необычной редкости требует тренировки или происходит из определенной культуры или части света. Некоторые выборы персонажа дают доступ к необычным опциям, а Мастер может разрешить доступ для всех.\nО необычных существах известно меньше, чем о распространенных. Обычно их нельзя призвать. Проверки \"Вспомнить информацию\" о таких существах имеют КС выше на 2."
        },
        {
            "key": "Редкий",
            "nameEng": "rare",
            "desc": "Эта редкость обозначает что элемент правил очень сложно найти в игровом мире. Редкая способность, заклинание, предмет или что-то подобное доступны игрокам только если Мастер решает включить это в игру, обычно благодаря обнаружению во время игры."
        },
        {
            "key": "Уникальный",
            "nameEng": "unique",
            "desc": "Элемент правил такой редкости единственный в своем роде."
        },
        {
            "key": "PF2E.TraitDescriptionAasimar",
            "nameEng": "aasimar",
            "desc": "PF2E.TraitDescriptionAasimar"
        },
        {
            "key": "PF2E.TraitDescriptionAbjuration",
            "nameEng": "abjuration",
            "desc": "PF2E.TraitDescriptionAbjuration"
        },
        {
            "key": "Ракшасы — сакральные духи, являющиеся примером вульгарности. Обычно они могут менять форму и имеют слабость к святости.",
            "nameEng": "akshasa",
            "desc": "Ракшасы — сакральные духи, являющиеся примером вульгарности. Обычно они могут менять форму и имеют слабость к святости."
        },
        {
            "key": "Род сверхъестественных пернатых змей, служащих хранителями и посланниками во Вселенной для различных `святых` божеств.",
            "nameEng": "coatl",
            "desc": "Род сверхъестественных пернатых змей, служащих хранителями и посланниками во Вселенной для различных `святых` божеств."
        },
        {
            "key": "Опасность с таким признаком делает свои собственные ходы во время столкновения.",
            "nameEng": "complex",
            "desc": "Опасность с таким признаком делает свои собственные ходы во время столкновения."
        },
        {
            "key": "PF2E.TraitDescriptionDivination",
            "nameEng": "divination",
            "desc": "PF2E.TraitDescriptionDivination"
        },
        {
            "key": "В то время как всему оружию требуется некоторое количество времени, чтобы прийти в боевую готовность, многое дистанционное оружие так же требуется заряжать и перезаряжать. Эта запись обозначает сколько действий \"Взаимодействовать\" требуется, чтобы перезарядить такое оружие. Это значение может быть равно 0, если вытаскивание амуниции и стрельба из оружия являются частью одного действия. Если для перезарядки предмета требуется 2 или больше действий, Мастер решает, должны ли они выполняться вместе как часть активности, или вы можете потратить часть этих действий во время одного хода, а остальные во время следующего.",
            "nameEng": "reload",
            "desc": "В то время как всему оружию требуется некоторое количество времени, чтобы прийти в боевую готовность, многое дистанционное оружие так же требуется заряжать и перезаряжать. Эта запись обозначает сколько действий \"Взаимодействовать\" требуется, чтобы перезарядить такое оружие. Это значение может быть равно 0, если вытаскивание амуниции и стрельба из оружия являются частью одного действия. Если для перезарядки предмета требуется 2 или больше действий, Мастер решает, должны ли они выполняться вместе как часть активности, или вы можете потратить часть этих действий во время одного хода, а остальные во время следующего."
        },
        {
            "key": "Когда вы используете метательное оружие с признаком `брызги`, вы не добавляете свой модификатор Силы к броску урона. Если атака оружием с признаком `брызги` проваливается, успешная или критически успешная, то все существа в радиусе 10 футов от цели (включая саму цель) получают указанный урон брызгами. При провале (но не критическом провале) цель атаки всё ещё получает урон брызгами. Сложите урон брызгами вместе с начальным уроном по цели, до применения сопротивлений или слабостей. При критическом попадании вы не умножаете урон брызг.",
            "nameEng": "splash-10",
            "desc": "Когда вы используете метательное оружие с признаком `брызги`, вы не добавляете свой модификатор Силы к броску урона. Если атака оружием с признаком `брызги` проваливается, успешная или критически успешная, то все существа в радиусе 10 футов от цели (включая саму цель) получают указанный урон брызгами. При провале (но не критическом провале) цель атаки всё ещё получает урон брызгами. Сложите урон брызгами вместе с начальным уроном по цели, до применения сопротивлений или слабостей. При критическом попадании вы не умножаете урон брызг."
        },
        {
            "key": "Все тела одинаковой массы могут быть центрами притяжения, но только если этого пожелает разумное существо. Ничейные предметы и неразумные существа воспринимают план как имеющую микрогравитацию. Существа, находящиеся на плане с субъективной гравитацией, могут нормально передвигаться по твердой поверхности, представляя себе \"вниз\" у своих ног. Определение направления вниз — это свободное действие с признаком `концентрация`. Зависнув в воздухе, существо может полететь, выбрав направление \"вниз\" и падая в этом направлении, двигаясь вплоть до своей Скорости или Скорости полёта. Этот псевдополёт использует действие \"Лететь\".",
            "nameEng": "subjective-gravity",
            "desc": "Все тела одинаковой массы могут быть центрами притяжения, но только если этого пожелает разумное существо. Ничейные предметы и неразумные существа воспринимают план как имеющую микрогравитацию. Существа, находящиеся на плане с субъективной гравитацией, могут нормально передвигаться по твердой поверхности, представляя себе \"вниз\" у своих ног. Определение направления вниз — это свободное действие с признаком `концентрация`. Зависнув в воздухе, существо может полететь, выбрав направление \"вниз\" и падая в этом направлении, двигаясь вплоть до своей Скорости или Скорости полёта. Этот псевдополёт использует действие \"Лететь\"."
        },
        {
            "key": "Существо, обладающее телепатией, может мысленно общаться с существами. Это не дает никакого особого доступа к их мыслям и передает не больше информации, чем обычная речь.",
            "nameEng": "telepathy",
            "desc": "Существо, обладающее телепатией, может мысленно общаться с существами. Это не дает никакого особого доступа к их мыслям и передает не больше информации, чем обычная речь."
        },
        {
            "key": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\".",
            "nameEng": "thrown-25",
            "desc": "Вы можете метать это оружие дистанционной атакой; и когда брошено это дистанционное оружие. Вы добавляете свой модификатор Силы к урону так же, как вы бы делали для оружия ближнего боя. Когда этот признак появляется у оружия ближнего боя, он также указывает шаг дистанции. Дистанционные оружия с этим признаком используют шаг дистанции указанный в записи оружия \"Дистанция\"."
        },
        {
            "key": "PF2E.TraitDescriptionTiefling",
            "nameEng": "tiefling",
            "desc": "PF2E.TraitDescriptionTiefling"
        }
    ]

module.exports = traitRepository;
