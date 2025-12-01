export default {
  data() {
    return {
      attributeRepository: [
        {
          key: "strength",
          name: "Сила",
          short: "Сил",
          description:
            "Сила измеряет физическую силу вашего персонажа. Она важна если персонаж собирается драться в ближнем бою. Ваш модификатор Силы добавляется к броскам урона ближнего боя, и определяет сколько веса может переносить персонаж.",
          order: 1,
        },
        {
          key: "dexterity",
          name: "Ловкость",
          short: "Лов",
          description:
            "Ловкость показывает проворность, чувство равновесия и рефлексы вашего персонажа. Она важна если персонаж собирается использовать дистанционные атаки, или скрытность, чтобы удивлять врагов. Еще ваш модификатор Ловкости добавляется к КБ и спасброскам Рефлекса.",
          order: 2,
        },
        {
          key: "constitution",
          name: "Телосложение",
          short: "Тел",
          description:
            "Телосложение показывает общую выносливость и здоровье персонажа. Она важна для всех персонажей, особенно для тех, кто дерется в ближнем бою. Ваш модификатор Телосложения добавляется к Очкам Здоровья и спасброскам Стойкости.",
          order: 3,
        },
        {
          key: "intellect",
          name: "Интеллект",
          short: "Инт",
          description:
            "Интеллект измеряет как хорошо ваш персонаж учится и соображает. Высокий Интеллект позволяет вашему персонажу анализировать ситуации и понимать шаблоны, и это значит, что он может обучиться дополнительным навыкам и выучить дополнительные языки.",
          order: 4,
        },
        {
          key: "wisdom",
          name: "Мудрость",
          short: "Муд",
          description:
            "Мудрость измеряет основные чувства, внимательность и интуицию персонажа. Ваш модификатор Мудрости добавляется к Восприятию и спасброскам Воли.",
          order: 5,
        },
        {
          key: "charisma",
          name: "Харизма",
          short: "Хар",
          description:
            "Харизма отражает притягательность и силу личности персонажа. Высокая Харизма помогает влиять на других и вдохновлять их.",
          order: 6,
        },
      ],
      Perception:
      {
        key: "perception",
        name: "Внимательность",
        attribute: "wisdom",
        description: "A character’s overall physical prowess",
      },
      WeaponRepository: [
        {
          key: "simple",
          name: "Простое оружие",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "martial",
          name: "Воинское оружие",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "advanced",
          name: "Продвинутое оружие",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "bombs",
          name: "Алхимическое оружие",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "unarmed",
          name: "Безоружная атака",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
      ],
      DefenceRepository: [
        {
          key: "light",
          name: "Легкий доспех",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "medium",
          name: "Средний доспех",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "heavy",
          name: "Тяжелый доспех",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
        {
          key: "unarmored",
          name: "Защита без доспехов",
          // attribute: "wisdom",
          description: "A character’s overall physical prowess",
        },
      ],
      SavingRepository: [
        {
          key: "reflex",
          name: "Рефлекс",
          attribute: "dexterity",
          description: "Спасброски на рефлексы измеряют, насколько быстро вы можете реагировать на ситуацию и насколько изящно вы можете избегать эффектов, которые на вас воздействуют.",
        },
        {
          key: "fortitude",
          name: "Стойкость",
          attribute: "constitution",
          description: "Спасброски на стойкость позволяют вам снизить воздействие способностей и недугов, которые могут ослабить тело.",
        },
        {
          key: "will",
          name: "Воля",
          attribute: "wisdom",
          description: "Спасброски будут измерять, насколько хорошо вы можете противостоять атакам на свой разум и дух",
        },
      ],
      // https://api.sheety.co/669365df-fa15-4003-ad7d-21d86e11b69a
      skillRepository: [
        {
          key: "acrobatics",
          name: "Акробатика",
          attribute: "dexterity",
          description: "Акробатика измеряет вашу способность выполнять задачи, требующие координации и изящества. При использовании основного действия Вырваться (Escape) , вы можете использовать свой модификатор Акробатики, вместо вашего модификатора безоружной атаки.",
          optional: false,
        },
        {
          key: "arcana",
          name: "Аркана",
          attribute: "intellect",
          description:
            "Аркана измеряет как много вы знаете об арканной магии и существах.",
          optional: false,
        },
        {
          key: "athletics",
          name: "Атлетика",
          attribute: "strength",
          description: "Атлетика позволяет совершать действия связанные с физической подготовкой. Когда вы используете простое действие Вырваться (Escape) , то можете использовать свой модификатор Атлетики вместо модификатора безоружной атаки.",
          optional: false,
        },
        {
          key: "crafting",
          name: "Ремесло",
          attribute: "intellect",
          description: "Вы можете использовать этот навык, чтобы создавать и ремонтировать предметы. Даже если вы нетренированы, вы можете использовать Вспомнить информацию (Recall Knowledge) .",
          optional: false,
        },
        {
          key: "deception",
          name: "Обман",
          attribute: "charisma",
          description: "Вы можете обманывать и вводить в заблуждение других, используя маскировку, ложь и другие виды уловок.",
          optional: false,
        },
        {
          key: "diplomacy",
          name: "Дипломатия",
          attribute: "charisma",
          description: "Вы влияете на других с помощью переговоров и лести.",
          optional: false,
        },
        {
          key: "intimidation",
          name: "Запугивание",
          attribute: "charisma",
          description: "Вы угрозами подчиняете других своей воле.",
          optional: false,
        },
        {
          key: "medicine",
          name: "Медицина",
          attribute: "wisdom",
          description: "Вы можете залатать раны и помочь людям оправиться от болезней и ядов. Даже если вы нетренированы Медицине, то можете Вспомнить информацию (Recall Knowledge) .",
          optional: false,
        },
        {
          key: "occultism",
          name: "Оккультизм",
          attribute: "intellect",
          description: "Вы много знаете о древних философиях, эзотерических знаниях, неясном мистицизме, и сверхъестественных существах. Даже если вы нетренированы Оккультизму, то можете Вспомнить информацию (Recall Knowledge) .",
          optional: false,
        },
        {
          key: "perfomance",
          name: "Выступление",
          attribute: "charisma",
          description: "Вы искусны в разных видах выступлений, используя свои таланты, чтобы впечатлять толпу или заработать на жизнь.",
          optional: false,
        },
        {
          key: "religion",
          name: "Религия",
          attribute: "wisdom",
          description: "Для вас открыты тайны божеств, догмы, верования и царства божественных созданий, как величественных, так и зловещих. Еще вы понимаете как работает магия, хотя ваше обучение придает этому знанию религиозный уклон. ",
          optional: false,
        },
        {
          key: "society",
          name: "Общество",
          attribute: "intellect",
          description: "Вы понимаете людей и принципы, которые управляют цивилизацией, и вы знаете исторические события, которые делают общества такими, какими они являются сегодня. Кроме того, вы можете использовать эти знания для управления сложной физической, социальной и экономической работой поселений. ",
          optional: false,
        },
        {
          key: "stealth",
          name: "Скрытность",
          attribute: "dexterity",
          description: "Вы умеете избегать обнаружения, что позволяет вам проскальзывать мимо врагов, прятаться или скрывать предмет.",
          optional: false,
        },
        {
          key: "nature",
          name: "Природа",
          attribute: "wisdom",
          description: "Вы много знаете о природе, командуете и тренируете животных и магических чудовищ. Даже если вы нетренированы Природе, то можете Вспомнить информацию (Recall Knowledge).",
          optional: false,
        },
        {
          key: "survival",
          name: "Выживание",
          attribute: "wisdom",
          description: "Вы знаток выживания в глуши, добывания пищи и строительства убежища, а с тренировкой вы открываете секреты выслеживания и заметания своих следов. ",
          optional: false,
        },
        {
          key: "thievery",
          name: "Воровство",
          attribute: "dexterity",
          description: "Вы обучены определенному набору навыков, которые предпочитают воры и негодяи.",
          optional: false,
        },
      ],
      // https://api.sheety.co/2d702477-7a22-4d71-9c25-6119ee216253
      sizeRepository: [
        {
          key: "medium",
          name: "Средний",
        },
        {
          key: "small",
          name: "Маленький",
        },
        {
          key: "Large",
          name: "Большой",
        },
      ],
      rarityRepository: [
        {
          key: "common",
          name: "Обычный",
        },
        {
          key: "uncommon",
          name: "Необычный",
        },
        {
          key: "rare",
          name: "Редкий",
        },
        {
          key: "unique",
          name: "Уникальный"
        },
      ],

      typeRepository: [
        {
          key: "weapon",
          name: "Оружие",
        },
        {
          key: "armor",
          name: "Доспех",
        },
        {
          key: "equipment",
          name: "Снаряжение",
        },
        {
          key: "treasure",
          name: "Сокровища"
        },
        {
          key: "backpack",
          name: "Рюкзак"
        },
        {
          key: "consumable",
          name: "Расходуемый"
        },
        {
          key: "shield",
          name: "Щит"
        },
      ],
      profiencyRepository: {
        U: 0,
        T: 2,
        E: 4,
        M: 6,
        L: 8,
      },
      statusRepository: [

        {
          "name": "Бегство / Fleeing",
          "actions": null,
          "description": "<p>Вы вынуждены сбежать из-за страха или другого побуждения. В ваш ход, вы обязаны потратить каждое действие, чтобы попытаться избежать причины вашего состояния наиболее целесообразно (перемещаться, открывать двери преграждающие отступление). Причиной обычно является эффект или существо, которое дало вам это состояние, хотя некоторые эффекты могут обозначить что-то другое в качестве источника. Вы не можете @UUID[Compendium.pf2e.actionspf2e.Item.A72nHGUtNXgY5Ey9]{Выждать} или @UUID[Compendium.pf2e.actionspf2e.Item.dLgAMt3TbkmLkUqE]{Приготовиться} пока в @Condition[Fleeing]{бегстве}.</p>",
          "traits": [],
          "key": "fleeing",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Без сознания / Unconscious",
          "actions": null,
          "description": "<p>Вы спите или в нокауте. Вы не можете действовать. Вы получаете штраф состояния −4 к КБ, Восприятию и спасброскам Рефлекса, и имеете состояния @UUID[Compendium.pf2e.conditionitems.Item.XgEqL1kFApUbl5Z2]{Слепота} и @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Застигнут врасплох}. Когда вы получаете это состояние, то падаете @UUID[Compendium.pf2e.conditionitems.Item.j91X7x0XSomq8d60]{Ничком}, роняете все предметы, которыми владеете или которые держите в руках, если только эффект не указывает обратного или Мастер не решит, что вы в таком положении, что не выпустите их из рук.</p><p><strong>Если вы без сознания потому что @UUID[Compendium.pf2e.conditionitems.Item.yZRUzMqrMmfLu0V1]{При смерти}</strong>, вы не можете очнуться пока у вас 0 ОЗ. Если вам восстановили 1 ОЗ или более посредством исцеления, вы теряете состояние @Condition[Dying]{при смерти} и без сознания и можете действовать как обычно в свой следующий ход.</p><p><strong>Если вы без сознания с 0 ОЗ но не при смерти</strong>, вы естественным образом возвращаетесь к 1 ОЗ и приходите в сознание после достаточного времени. Мастер определяет как долго вы остаетесь без сознания, минимум от 10 минут до нескольких часов. Если вы получаете исцеление в это время, то теряете состояние без сознания и можете действовать как обычно в свой следующий ход.</p><p><strong>Если вы без сознания и у вас более 1 ОЗ</strong> (обычно потому что вы спите или из-за эффекта), вы приходите в сознание одним из перечисленных способов. Каждый из которых лишает вас бессознательного состояния.</p><ul><li>Вы получили урон, но ваши ОЗ не опустились до 0. Если этот урон снижает ваши ОЗ до 0, вы остаётесь @Condition[Unconscious]{без сознания} и получаете состояние @Condition[Dying]{при смерти} как обычно.</li><li>Вы были исцелены, но не из-за естественного исцеления от отдыха.</li><li>Кто-то тряской пробуждает вас с помощью действия @UUID[Compendium.pf2e.actionspf2e.Item.pvQ5rY2zrtPI614F]{Взаимодействовать}.</li><li>Вокруг вас раздаётся громкий шум, однако пробуждение не происходит автоматически. В начале вашего хода вы совершаете проверку Восприятия с КС шума (или наименьшего КС шума, если источников шума несколько), пробуждаясь при успехе. Для битвы это обычно @Check[perception|dc:5]{КС 5}, но если существа пытаются не шуметь вокруг вас, проверка Восприятия делается против их КС Скрытности. Некоторые магические эффекты усыпляют вас так сильно, что вам нельзя пройти эту проверку.</li><li>Если вы просто спите, Мастер решает, что вы проснулись, потому что у вас был спокойный ночной сон или что-то нарушило этот отдых.</li></ul>",
          "traits": [],
          "key": "unconscious",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": [
                "ac",
                "perception",
                "reflex"
              ],
              "slug": "unconscious",
              "type": "status",
              "value": -4
            },
            {
              "key": "GrantItem",
              "onDeleteActions": {
                "grantee": "restrict"
              },
              "uuid": "Compendium.pf2e.conditionitems.Item.XgEqL1kFApUbl5Z2"
            },
            {
              "inMemoryOnly": true,
              "key": "GrantItem",
              "uuid": "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg"
            },
            {
              "allowDuplicate": false,
              "key": "GrantItem",
              "onDeleteActions": {
                "grantee": "restrict",
                "granter": "detach"
              },
              "uuid": "Compendium.pf2e.conditionitems.Item.j91X7x0XSomq8d60"
            }
          ]
        },
        {
          "name": "Безразличный / Indifferent",
          "actions": null,
          "description": "<p>Это состояние показывает отношение существа к определённому персонажу, и только сверхъестественные эффекты (как заклинание) могут наложить это состояние на игрового персонажа. Существо, безразличное к персонажу, не волнует персонаж и его дела. Предполагается что существо относится безразлично к персонажу, если не говорится иначе.</p>",
          "traits": [],
          "key": "indifferent",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Враждебный / Hostile",
          "actions": null,
          "description": "<p>Это состояние показывает отношение существа к определённому персонажу, и только сверхъестественные эффекты (как заклинание) могут наложить это состояние на игрового персонажа. Существо, враждебное персонажу, активно ищет способы навредить ему. Оно не обязательно атакует его, но точно не принимает от него @UUID[Compendium.pf2e.actionspf2e.Item.DCb62iCBrJXy0Ik6]{Просьбы}.</p>",
          "traits": [],
          "key": "hostile",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Глухота / Deafened",
          "actions": null,
          "description": "<p>Вы не слышите. Вы автоматически критически проваливаете проверки Восприятия которые требуют, чтобы вы могли слышать. Вы получаете штраф состояния −2 к проверкам Восприятия на инициативу и проверкам связанным со звуком, но так же полагающимся на другие сенсорные чувства. Если вы совершаете действие с признаком @Trait[Auditory]{слуховой}, вы должны преуспеть в @Check[flat|showDC:all|dc:5]{Чистой проверке} или действие теряется; сделайте проверку после расходования действия, но до применения любых эффектов. Вы иммунны к эффектам с признаком @Trait[Auditory]{слуховой}.</p>",
          "traits": [],
          "key": "deafened",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "predicate": [
                {
                  "or": [
                    {
                      "and": [
                        "check:type:skill",
                        "item:trait:auditory"
                      ]
                    },
                    {
                      "and": [
                        "check:statistic:base:perception",
                        "check:statistic:initiative"
                      ]
                    }
                  ]
                }
              ],
              "selector": [
                "perception",
                "skill-check"
              ],
              "slug": "deafened",
              "type": "status",
              "value": -2
            },
            {
              "key": "Immunity",
              "type": "auditory"
            },
            {
              "itemType": "action",
              "key": "ItemAlteration",
              "mode": "add",
              "predicate": [
                "item:trait:auditory"
              ],
              "property": "description",
              "value": [
                {
                  "text": "PF2E.condition.deafened.note"
                }
              ]
            },
            {
              "itemType": "feat",
              "key": "ItemAlteration",
              "mode": "add",
              "predicate": [
                "item:trait:auditory"
              ],
              "property": "description",
              "value": [
                {
                  "text": "PF2E.condition.deafened.note"
                }
              ]
            },
            {
              "itemType": "spell",
              "key": "ItemAlteration",
              "mode": "add",
              "predicate": [
                {
                  "not": "item:trait:subtle"
                }
              ],
              "property": "description",
              "value": [
                {
                  "text": "PF2E.condition.deafened.note"
                }
              ]
            },
            {
              "adjustment": {
                "all": "to-critical-failure"
              },
              "key": "AdjustDegreeOfSuccess",
              "predicate": [
                "item:trait:auditory"
              ],
              "selector": ["perception"]
            }
          ]
        },
        {
          "name": "Дружественный / Friendly",
          "actions": null,
          "description": "<p>Это состояние показывает отношение существа к определённому персонажу, и только сверхъестественные эффекты (как заклинание) могут наложить это состояние на игрового персонажа. Дружественному существу нравится персонаж. Оно скорее всего согласится на @UUID[Compendium.pf2e.actionspf2e.Item.DCb62iCBrJXy0Ik6]{Просьбу} этого персонажа, если она простая и безопасная, и не требует многого, чтобы её выполнить. Если персонаж (или один из союзников) использует враждебное действие против существа, оно, по решению Мастера, изменит отношение на худшее, в зависимости от тяжести враждебного действия.</p>",
          "traits": [],
          "key": "friendly",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Заворожен / Fascinated",
          "actions": null,
          "description": "<p>Вы вынуждены сосредоточить внимание на чем-то, и отвлечены от происходящего вокруг. Вы получаете штраф состояния −2 к проверкам Восприятия и проверкам навыков, вы не можете использовать действия с признаком @Trait[Concentrate]{концентрация} если только они или их последствия не связаны с субъектом вашей завороженности (определяется Мастером). Например, вы можете осуществлять @UUID[Compendium.pf2e.actionspf2e.Item.BlAOM2X92SI6HMtJ]{Поиск} или @UUID[Compendium.pf2e.actionspf2e.Item.1OagaWtBpVXExToo]{Вспомнить информацию} о субъекте, но вы вряд ли можете использовать заклинание направленное на другое существо. Это состояние заканчивается, если существо использует против вас или ваших союзников враждебное действие.</p>",
          "traits": [],
          "key": "fascinated",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": [
                "perception",
                "skill-check"
              ],
              "slug": "fascinated",
              "type": "status",
              "value": -2
            }
          ]
        },
        {
          "name": "Замедлен / Slowed",
          "actions": null,
          "description": "<p>У вас меньше действий. @Condition[Slowed]{Замедление} всегда имеет значение. Когда вы восстанавливаете действия, уменьшите их количество на значение состояния @Condition[Slowed]{замедлен}. Так как вы восстанавливаете действия в начале своего хода, если вы были @Condition[Slowed]{замедлены} во время своего хода, то не теряете действия мгновенно.</p>",
          "traits": [],
          "key": "slowed",
          "source": "Pathfinder Player Core",
          "rules": [{
            "key": "FlatModifier",
            "value": "-value"
          }]
        },
        {
          "name": "Замечен / Observed",
          "actions": null,
          "description": "<p>Все что хорошо видно, считается @Condition[Observed]{замеченным} для вас. Если существо принимает меры чтобы избежать обнаружения, например, использует Скрытность чтобы @UUID[Compendium.pf2e.actionspf2e.Item.XMcnh4cSI32tljXa]{Спрятаться}, то оно может стать @UUID[Compendium.pf2e.conditionitems.Item.iU0fEDdBp3rXpTMC]{Спрятанным} или @UUID[Compendium.pf2e.conditionitems.Item.VRSef5y1LmL2Hkjf]{Необнаруженным} вместо того, чтобы быть @Condition[Observed]{замеченным}. Если вы имеете другое точное чувство вместо зрения, или как дополнительное, вы можете попытаться обнаружить существо или объект используя это чувство. Вы можете обнаружить существо только точным чувством. При использовании @UUID[Compendium.pf2e.actionspf2e.Item.BlAOM2X92SI6HMtJ]{Поиска} для обнаружения существа, только с помощью неточного чувства, оно остаётся @Condition[Hidden]{спрятанным}, а не @Condition[Observed]{замеченным}.</p>",
          "traits": [],
          "key": "observed",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Замешательство / Confused",
          "actions": null,
          "description": "<p>Вы лишаетесь рассудка и начинаете беспорядочно атаковать. Вы @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Застигнуты врасплох} и не считаете никого своими союзниками (хотя они всё ещё могут считать вас своим союзником), и вы не можете \"Выждать\", \"Приготовиться\", или использовать реакции.</p><p>Вы расходуете все ваши действия на \"Удар\" или чтобы колдовать атакующие чары, хотя Мастер может заставить вас использовать другие действия чтобы поспособствовать атаке, например вытащить оружие, подойти чтобы цель была в досягаемости, и так далее. Ваши цели определяет Мастер случайным образом. Если нет других доступных целей, вы выбираете себя целью, автоматически попадая, но не считая критические попадания. Если для вас невозможно атаковать или использовать заклинания, вы бурчите что-то бессвязное и тратите свои действия.</p><p>Каждый раз, когда вы получаете урон от атаки или заклинания, вы можете сделать @Check[flat|showDC:all|dc:11]{Чистую проверку} чтобы оправиться от @Condition[Confused]{замешательства} и закончить это состояние.</p>",
          "traits": [],
          "key": "confused",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "ActiveEffectLike",
              "mode": "override",
              "path": "system.attributes.flanking.canFlank",
              "value": false
            },
            {
              "key": "RollOption",
              "option": "target:ally",
              "value": false
            },
            {
              "key": "RollOption",
              "option": "origin:ally",
              "value": false
            },
            {
              "inMemoryOnly": true,
              "key": "GrantItem",
              "uuid": "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg"
            },
            {
              "key": "Note",
              "predicate": [
                {
                  "or": [
                    "item:type:spell",
                    "origin:action:trait:attack"
                  ]
                }
              ],
              "selector": ["damage-received"],
              "text": "PF2E.condition.confused.note",
              "title": "{item|name}"
            }
          ]
        },
        {
          "name": "Застигнут врасплох / Off-Guard",
          "actions": null,
          "description": "<p>Вы отвлечены или не способны сосредоточить все внимание на защите. Вы получаете штраф обстоятельства −2 к КБ. Некоторые эффекты дают вам это состояние только против определенных существ или атак. Другие, в особенности состояния, могут сделать вас @Condition[Off-Guard]{застигнутыми врасплох} для всего. Если правило не уточняет, что состояние применяется только к определенным условиям, то оно применяется ко всему; например, многие эффекты гласят \"Цель застигнута врасплох.\"</p>",
          "traits": [],
          "key": "off-guard",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": ["ac"],
              "slug": "off-guard",
              "type": "circumstance",
              "value": -2
            }
          ]
        },
        {
          "name": "Истощён / Drained",
          "actions": null,
          "description": "<p>Ваше здоровье и жизненная сила истощились, поскольку вы потеряли кровь, жизненную силу или какую-то другую сущность. @Condition[Drained]{Истощение} всегда имеет значение. Вы получаете штраф состояния, равный значению @Condition[Drained]{истощения}, к броскам и КС, основанным на Телосложении, таким как спасброски Стойкости. Вы так же теряете количество Очков Здоровья равное вашему уровню (мин. 1) помноженному на значение @Condition[Drained]{истощения}, и уменьшаете максимальные Очки Здоровья на это же значение. Например, если вы становитесь @Condition[Drained]{истощены 3} и вы персонаж 3-го уровня, то вы теряете 9 ОЗ и уменьшаете максимальные ОЗ на 9. Потеря этих Очков Здоровья не считается получением урона.</p><p>Ваше значение @Condition[Drained]{истощения} уменьшается на 1 каждый раз после ночного отдыха. Это увеличивает максимальные ОЗ, но вы не восстанавливаете вместе с этим потерянные ОЗ.</p>",
          "traits": [],
          "key": "drained",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": ["con-based"],
              "slug": "drained",
              "type": "status",
              "value": "-1 * @item.badge.value"
            },
            {
              "key": "FlatModifier",
              "selector": ["hp"],
              "slug": "drained",
              "type": "status",
              "value": "-value"
            },
            {
              "key": "LoseHitPoints",
              "reevaluateOnUpdate": true,
              "value": "max(1,@actor.level) * @item.badge.value"
            }
          ]
        },
        {
          "name": "Любезный / Helpful",
          "actions": null,
          "description": "<p>Это состояние показывает отношение существа к определённому персонажу, и только сверхъестественные эффекты (как заклинание) могут наложить это состояние на игрового персонажа. Любезное существо хочет активно помогать персонажу. Существо будет согласно на разумные @UUID[Compendium.pf2e.actionspf2e.Item.DCb62iCBrJXy0Ik6]{Просьбы} от этого персонажа, до тех пор, пока это не будет значительно влиять на его цели или жизнь. Если персонаж (или один из союзников) использует враждебное действие против существа, оно, по решению Мастера, изменит отношение на худшее, в зависимости от тяжести враждебного действия.</p>",
          "traits": [],
          "key": "helpful",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Напуган / Frightened",
          "actions": null,
          "description": "<p>Вы объяты страхом и вам трудно успокоиться. Состояние @Condition[Frightened]{напуган} всегда имеет значение. Вы получаете штраф состояния равный этому значению, для всех ваших проверок и КС. Если не сказано иначе, состояние @Condition[Frightened]{напуган} снижается на 1 в конце каждого вашего хода. Эффект может изменять это поведение.</p>",
          "traits": [],
          "key": "frightened",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": ["all"],
              "slug": "frightened",
              "type": "status",
              "value": "-value"
            }
          ]
        },
        {
          "name": "Невидимый / Invisible",
          "actions": null,
          "description": "<p>Вас нельзя увидеть. Вы @UUID[Compendium.pf2e.conditionitems.Item.VRSef5y1LmL2Hkjf]{Необнаружены} для всех. Существа могут использовать @UUID[Compendium.pf2e.actionspf2e.Item.BlAOM2X92SI6HMtJ]{Поиск} чтобы обнаружить вас. Если существо успешно пройдет проверку Восприятия, против вашего КС Скрытности, вы становитесь @UUID[Compendium.pf2e.conditionitems.Item.iU0fEDdBp3rXpTMC]{Спрятаны} от этого существа пока не используете @UUID[Compendium.pf2e.actionspf2e.Item.VMozDqMMuK5kpoX4]{Красться} чтобы снова стать @Condition[Undetected]{необнаруженным}. Если вы становитесь @Condition[Invisible]{невидимым} когда кто-то может видеть вас, то вначале вы будете @Condition[Hidden]{спрятаны} для наблюдателя (вместо того чтобы быть сразу @Condition[Undetected]{необнаруженным}), пока не используете успешно \"Красться\", чтобы снова стать @Condition[Undetected]{необнаруженным}. Во время @Condition[Invisible]{невидимости} вы не можете стать @UUID[Compendium.pf2e.conditionitems.Item.1wQY3JYyhMYeeV2G]{Замеченным}, разве что при помощи специальных умений или магии.</p>",
          "traits": [],
          "key": "invisible",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Недружественный / Unfriendly",
          "actions": null,
          "description": "<p>Это состояние показывает отношение существа к определённому персонажу, и только сверхъестественные эффекты (как заклинание) могут наложить это состояние на игрового персонажа. @Condition[Unfriendly]{Недружественному} существу не нравится персонаж и оно ему не доверяет. @Condition[Unfriendly]{Недружественное} существо не будет принимать @UUID[Compendium.pf2e.actionspf2e.Item.DCb62iCBrJXy0Ik6]{Просьбы} от персонажа.</p>",
          "traits": [],
          "key": "unfriendly",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Незамечен / Unnoticed",
          "actions": null,
          "description": "<p>Если вы не замечены существом, оно понятия не имеет о вашем присутствии. Когда вы @Condition[Undetected]{незамечены}, вы также @UUID[Compendium.pf2e.conditionitems.Item.VRSef5y1LmL2Hkjf]{Необнаружены} для существа. Это состояние имеет значение для умений, которые могут быть использованы против целей, которые совсем не подозревают о вашем присутствии.</p>",
          "traits": [],
          "key": "unnoticed",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Необнаружен / Undetected",
          "actions": null,
          "description": "<p>Когда вы необнаружены существом, это существо совсем не может видеть вас, не имеет понятия, в каком месте вы находитесь и не может целиться в вас, хотя на вас могут воздействовать эффекты по области. Когда вы @Condition[Undetected]{необнаружены} существом, оно @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Застигнут врасплох} для вас.</p><p>Существо, для которого вы необнаружены, может попытаться угадать квадрат, в котором вы находитесь и попытаться выбрать вас целью. Оно должно выбрать квадрат и попытаться атаковать. Это работает как прицеливание в @UUID[Compendium.pf2e.conditionitems.Item.iU0fEDdBp3rXpTMC]{Спрятанное} существо (требуется @Check[flat|showDC:all|dc:11|traits:secret]{Чистая проверка}), но чистая проверка и бросок атаки делаются Мастером втайне, он не раскрывает, была ли она неуспешной из-за чистой проверки, атаки или выбора неверного квадрата.</p><p>Существо может использовать действие @UUID[Compendium.pf2e.actionspf2e.Item.BlAOM2X92SI6HMtJ]{Поиск}, чтобы найти вас.</p>",
          "traits": [],
          "key": "undetected",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Неуклюжесть / Clumsy",
          "actions": null,
          "description": "<p>Ваши движения становятся неуклюжими и неточными. Неуклюжесть всегда имеет значение. Вы получаете штраф состояния равный значению состояния к КС и броскам, основанным на Ловкости, включая КБ, спасброски Рефлекса, дистанционные атаки и проверки навыков Акробатики, Скрытности и Воровства.</p>",
          "traits": [],
          "key": "clumsy",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": ["dex-based"],
              "slug": "clumsy",
              "type": "status",
              "value": "-value"
            }
          ]
        },
        {
          "name": "Ничком / Prone",
          "actions": null,
          "description": "<p>Вы лежите на земле. Вы @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Застигнуты врасплох} и получаете штраф обстоятельства −2 к броскам атаки. Когда вы @Condition[Prone]{ничком} на земле, единственные действия с признаком @Trait[Move]{движение}, которые вы можете использовать — @UUID[Compendium.pf2e.actionspf2e.Item.OdIUybJ3ddfL7wzj]{Встать} и @UUID[Compendium.pf2e.actionspf2e.Item.Tj055UcNm6UEgtCg]{Ползти}. Когда вы встаёте, состояние @Condition[Prone]{ничком} заканчивается. Даже если поблизости нет объекта для укрытия, вы можете использовать @UUID[Compendium.pf2e.actionspf2e.Item.ust1jJSCZQUhBZIz]{Укрыться}, лёжа @Condition[Prone]{ничком}, чтобы затаиться и получить большое укрытие от атак дальнего боя, получая бонус обстоятельства +4 к КБ против атак дальнего боя (но остаётесь @Condition[Off-Guard]{застигнутым врасплох}).</p><p>Если вы получите это состояние, пока @UUID[Compendium.pf2e.actionspf2e.Item.pprgrYQ1QnIDGZiy]{Карабкаетесь} или @UUID[Compendium.pf2e.actionspf2e.Item.cS9nfDRGD83bNU1p]{Летите}, то вы @UUID[Compendium.pf2e.journals.JournalEntry.S55aqwWIzpQRFhcq.JournalEntryPage.QnqlEgRJdEsrdM9q]{Падаете}. Вы не можете получить состояние @Condition[Prone]{ничком}, пока @UUID[Compendium.pf2e.actionspf2e.Item.c8TGiZ48ygoSPofx]{Плывёте}.</p>",
          "traits": [],
          "key": "prone",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": ["attack-roll"],
              "slug": "prone",
              "type": "circumstance",
              "value": -2
            },
            {
              "inMemoryOnly": true,
              "key": "GrantItem",
              "uuid": "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg"
            }
          ]
        },
        {
          "name": "Обездвижен / Immobilized",
          "actions": null,
          "description": "<p>Вы не способны двигаться. Вы не можете использовать никакое действие с признаком @Trait[Move]{движение}. Если вы обездвижены из-за чего-то, что удерживает вас на месте, и внешняя сила будет перемещать вас из вашего пространства, эта сила должна успешно пройти проверку либо с КС эффекта удерживающего вас на месте, либо относительной защиты (обычно КС Стойкости) монстра удерживающего вас на месте.</p>",
          "traits": [],
          "key": "immobilized",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Обречён / Doomed",
          "actions": null,
          "description": "<p>Могущественная сила завладела вашей душой, взывая к смерти. @Condition[Doomed]{Обречённость} всегда имеет значение. Значение @UUID[Compendium.pf2e.conditionitems.Item.yZRUzMqrMmfLu0V1]{При смерти}, при котором вы умираете, уменьшается на значение @Condition[Doomed]{обречённости}. Если ваше максимальное значение @Condition[Dying]{при смерти} когда-либо уменьшится до 0, вы мгновенно умираете. Когда вы умираете, вы перестаёте быть @Condition[Doomed]{обречены}.</p><p>Ваше значение @Condition[Doomed]{обречённости} уменьшается на 1 каждый раз после ночного отдыха.</p>",
          "traits": [],
          "key": "doomed",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Одурманен / Stupefied",
          "actions": null,
          "description": "<p>Ваши мысли и инстинкты затуманены. Одурманивание всегда имеет значение. Вы получаете штраф состояния, равный этому значению, к броскам и КС, основанным на Интеллекте, Мудрости и Харизме, а так же спасброскам Воли, атакам заклинаниями, КС заклинаний, и проверкам навыков которые используют эти модификаторы характеристик. Всякий раз, когда вы @Condition[Stupefied]{одурманены} и пытаетесь @UUID[Compendium.pf2e.actionspf2e.Item.aBQ8ajvEBByv45yz]{Сотворить заклинание}, оно прерывается, если только вы не преуспеете в @Check[flat|showDC:all|dc:resolve(5+@item.badge.value)]{Чистой проверке} с КС 5 + значение состояния.</p>",
          "traits": [],
          "key": "stupefied",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": [
                "cha-based",
                "int-based",
                "wis-based"
              ],
              "slug": "stupefied",
              "type": "status",
              "value": "-value"
            },
            {
              "itemType": "spell",
              "key": "ItemAlteration",
              "mode": "add",
              "property": "description",
              "value": [
                {
                  "text": "PF2E.condition.stupefied.note"
                }
              ]
            }
          ]
        },
        {
          "name": "Окаменение / Petrified",
          "actions": null,
          "description": "<p>Вы превращены в камень. Вы не можете действовать или ощущать что-либо. Вы становитесь объектом с массой в два раза выше вашей обычной массы (обычно 12 для среднего окаменевшего существа или 6 для маленького), КБ 9, Твёрдость 8, и тем же количеством ОЗ, что были к вас в живом состоянии. У вас нет Предела Поломки. Когда @Condition[Petrified]{окаменение} заканчивается, у вас то же значение ОЗ, что и было в состоянии статуи. Если статуя разрушается, вы мгновенно умираете. Во время окаменения ваш разум и тело в стазисе, поэтому вы не стареете и не замечаете течение времени.</p>",
          "traits": [],
          "key": "petrified",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Ослаблен / Enfeebled",
          "actions": null,
          "description": "<p>Вы ослаблены физически. @Condition[Enfeebled]{Ослабление} всегда имеет значение. Когда вы @Condition[Enfeebled]{ослаблены}, то получаете штраф состояния, равный значению этого состояния, к броскам и КС, основанным на Силе, включая атаки в ближнем бою, основанные на Силе, броски урона, основанные на Силе, и проверки Атлетики.</p>",
          "traits": [],
          "key": "enfeebled",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": [
                "str-based",
                "str-damage"
              ],
              "slug": "enfeebled",
              "type": "status",
              "value": "-value"
            }
          ]
        },
        {
          "name": "Ослеплён / Dazzled",
          "actions": null,
          "description": "<p>Ваши глаза перенапряжены или ваше зрение плывёт. Если зрение — ваше единственное точное чувство, все существа и объекты @UUID[Compendium.pf2e.conditionitems.Item.DmAIPqOBomZ7H95W]{Скрыты} для вас.</p>",
          "traits": [],
          "key": "dazzled",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Ошеломлён / Stunned",
          "actions": null,
          "description": "<p>Вы лишаетесь чувств. Вы не можете действовать. @Condition[Stunned]{Ошеломление} обычно имеет значение, которое означает сколько всего действий вы теряете, возможно в течении нескольких ходов с момента ошеломления. Каждый раз, когда вы восстанавливаете действия, отнимайте это значение из количества получаемых действий и снижайте значение этого состояния на такую же величину. Например, если вы были @Condition[Stunned]{ошеломлены 4}, вы потеряете все 3 действия в ваш ход, уменьшив значение состояния до @Condition[Stunned]{ошеломлен 1}; на следующем ходу вы потеряете еще 1 действие и сможете использовать оставшиеся 2 как обычно. @Condition[Stunned]{Ошеломление} так же может иметь продолжительность, как например \"ошеломлён на 1 минуту\". В том случае вы теряете все ваши действия в течение указанного времени.</p><p>Ошеломление замещает состояние @UUID[Compendium.pf2e.conditionitems.Item.xYTAsEpcJE1Ccni3]{Замедлен}. Если продолжительность ошеломления заканчивается, когда вы @Condition[Slowed]{замедлены}, вы считаете потерю действий от ошеломления в пользу замедления. Например, если вы были @Condition[Stunned]{ошеломлены 1} и @Condition[Slowed]{замедлены 2} в начале хода, то потеряете 1 действие от ошеломления и 1 от замедления, так что у вас останется 1 действие на этом ходу.</p>",
          "traits": [],
          "key": "stunned",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Парализован / Paralyzed",
          "actions": null,
          "description": "<p>Вы застыли на месте. Вы @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Застигнуты врасплох} и не можете действовать, за исключением использования @UUID[Compendium.pf2e.actionspf2e.Item.1OagaWtBpVXExToo]{Вспомнить информацию} и действий, требующих только использования разума (по решению Мастера). Ваши чувства всё ещё работают, но только в области, которую вы можете ощущать, не двигаясь, так что вы не можете использовать @UUID[Compendium.pf2e.actionspf2e.Item.BlAOM2X92SI6HMtJ]{Поиск} пока @Condition[Paralyzed]{парализованы}.</p>",
          "traits": [],
          "key": "paralyzed",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "ActiveEffectLike",
              "mode": "override",
              "path": "system.attributes.flanking.canFlank",
              "value": false
            },
            {
              "inMemoryOnly": true,
              "key": "GrantItem",
              "uuid": "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg"
            }
          ]
        },
        {
          "name": "Перегружен / Encumbered",
          "actions": null,
          "description": "<p>Вы несёте больше груза, чем можете. Когда вы @Condition[Encumbered]{перегружены}, то получаете состояние @UUID[Compendium.pf2e.conditionitems.Item.i3OJZU2nk64Df3xm]{Неуклюжесть 1} и штраф −10 футов ко всем своим Скоростям. Как и со всеми остальными штрафами Скорости, он не может снизить вашу Скорость ниже 5 футов.</p>",
          "traits": [],
          "key": "encumbered",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": ["speeds"],
              "slug": "encumbered",
              "value": -10
            },
            {
              "inMemoryOnly": true,
              "key": "GrantItem",
              "uuid": "Compendium.pf2e.conditionitems.Item.i3OJZU2nk64Df3xm"
            }
          ]
        },
        {
          "name": "Под контролем / Controlled",
          "actions": null,
          "description": "<p>Вам приказали, вас подчинили магией или иным образом подмяли под себя вашу волю. Управляющий указывает как вы действуете и может заставить вас использовать любые ваши действия, включая атаки, реакции или даже @UUID[Compendium.pf2e.actionspf2e.Item.A72nHGUtNXgY5Ey9]{Выждать}. Управляющему обычно не требуется тратить свои действия чтобы контролировать вас.</p>",
          "traits": [],
          "key": "controlled",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "При смерти / Dying",
          "actions": null,
          "description": "<p>Вы истекаете кровью или на пороге смерти по другой причине. Пока вы имеете это состояние, то находитесь @UUID[Compendium.pf2e.conditionitems.Item.fBnFDH2MTzgFijKf]{без сознания}. Состояние @Condition[Dying]{при смерти} всегда имеет значение. Если оно достигает 4, вы умираете. Если вы @Condition[Dying]{при смерти}, то должны проходить проверки восстановления (см. @UUID[Compendium.pf2e.journals.JournalEntry.S55aqwWIzpQRFhcq.JournalEntryPage.KdoLyU91c0oS2hTw]) каждый раунд в начале вашего хода, чтобы определить, становится вам лучше или хуже. Ваше значение состояния @Condition[Dying]{при смерти} увеличивается на 1 если вы получаете урон находясь при смерти, или на 2 если получаете урон от критической атаки врага или при критическом провале спасброска.</p><p>Если вы теряете состояние @Condition[Dying]{при смерти}, успешно пройдя проверку восстановления и всё ещё имеете 0 ОЗ, вы остаётесь @Condition[Unconscious]{без сознания}, но можете очнуться как описано в этом состоянии. Вы теряете состояние @Condition[Dying]{при смерти} автоматически и приходите в сознание если у вас 1 или более ОЗ. Всякий раз, когда вы лишаетесь состояния @Condition[Dying]{при смерти}, вы получаете состояние @UUID[Compendium.pf2e.conditionitems.Item.Yl48xTdMh3aeQYL2]{Ранен 1} или увеличиваете его на 1 если оно у вас уже было.</p>",
          "traits": [],
          "key": "dying",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "GrantItem",
              "onDeleteActions": {
                "grantee": "restrict"
              },
              "uuid": "Compendium.pf2e.conditionitems.Item.fBnFDH2MTzgFijKf"
            }
          ]
        },
        {
          "name": "Продолжительный урон / Persistent Damage",
          "actions": null,
          "description": "<p>Вы получаете урон от продолжительного эффекта, такого как горящее пламя. Он описывается как \"X продолжительного урона [тип]\", где \"X\" количество урона, а \"[тип]\" это тип урона. Как и обычный урон, он может быть удвоен или уменьшен вдвое в зависимости от результата броска атаки или спасброска. Вместо получения продолжительного урона мгновенно, вы получаете его в конце каждого своего хода, бросая кости урона заново, пока у вас не пропадёт состояние. После того как вы получили продолжительный урон, сделайте @Check[flat|dc:15]{Чистую проверку}, чтобы узнать оправились ли вы от продолжительного урона. При успехе это состояние заканчивается.</p>",
          "traits": [],
          "key": "persistent-damage",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Проклятый / Cursebound",
          "actions": null,
          "description": "<p>Ваше проклятие оракула смыкается вокруг вас, поскольку вы подвергаетесь божественному наказанию после того, как слишком глубоко погрузились в силу своего таинства. @Condition[Cursebound]{Проклятый} — это состояние, которое влияет только на существ с проклятием оракула всегда имеет значение. Ваше конкретное проклятие оракула накладывает уникальные негативные эффекты в зависимости от значения состояния @Condition[Cursebound]{проклятый}. Снять состояние @Condition[Cursebound]{проклятый} можно только с помощью активности @UUID[Compendium.pf2e.actionspf2e.Item.OSefkMgojBLqmRDh].</p>",
          "traits": [],
          "key": "cursebound",
          "source": "Pathfinder Player Core 2",
          "rules": []
        },
        {
          "name": "Ранен / Wounded",
          "actions": null,
          "description": "<p>Вы были серьезно травмированы в бою. Если вы потеряли состояние @UUID[Compendium.pf2e.conditionitems.Item.yZRUzMqrMmfLu0V1]{При смерти}, и не имели состояния @Condition[Wounded]{ранен}, то получаете @Condition[Wounded]ранен 1}. Если у вас уже было состояние @Condition[Wounded]ранен} когда вы теряете состояние @Condition[Dying]{при смерти}, то значение @Condition[Wounded]ранен} увеличивается на 1. Если вы получили состояние @Condition[Dying]{при смерти} будучи раненым, увеличьте значение @Condition[Dying]{при смерти} на значение @Condition[Wounded]{ранен}. Состояние @Condition[Wounded]{ранен} заканчивается, если кто-то успешно восстанавливает вам Очки Здоровья с помощью @UUID[Compendium.pf2e.actionspf2e.Item.1kGNdIIhuglAjIp9]{Лечения ран}, или если вы любым способом восстановили ОЗ до максимума и вы отдохнули 10 минут.</p>",
          "traits": [],
          "key": "wounded",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Сдерживаем / Restrained",
          "actions": null,
          "description": "<p>Вы связаны и едва можете двигаться или придавлены существом. Вы получаете состояния @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Застигнут врасплох} и @UUID[Compendium.pf2e.conditionitems.Item.eIcWbB5o3pP6OIMe]{Обездвижен}, и вы не можете использовать никакие атаки или действия с признаком @Trait[Manipulate]{воздействие}, за исключением попыток @UUID[Compendium.pf2e.actionspf2e.Item.SkZAQRkLLkmBQNB9]{Вырваться} или @UUID[Compendium.pf2e.actionspf2e.Item.SjmKHgI7a5Z9JzBx]{Открыть силой}, чтобы избавиться от того, что сдерживает вас. @Condition[Restrained]{Сдерживаем} замещает состояние @UUID[Compendium.pf2e.conditionitems.Item.kWc1fhmv9LBiTuei]{Схвачен}.</p>",
          "traits": [],
          "key": "restrained",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "ActiveEffectLike",
              "mode": "override",
              "path": "system.attributes.flanking.canFlank",
              "value": false
            },
            {
              "inMemoryOnly": true,
              "key": "GrantItem",
              "uuid": "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg"
            },
            {
              "inMemoryOnly": true,
              "key": "GrantItem",
              "uuid": "Compendium.pf2e.conditionitems.Item.eIcWbB5o3pP6OIMe"
            },
            {
              "itemType": "action",
              "key": "ItemAlteration",
              "mode": "add",
              "predicate": [
                "item:trait:manipulate"
              ],
              "property": "description",
              "value": [
                {
                  "text": "PF2E.condition.restrained.note"
                }
              ]
            },
            {
              "itemType": "feat",
              "key": "ItemAlteration",
              "mode": "add",
              "predicate": [
                "item:trait:manipulate"
              ],
              "property": "description",
              "value": [
                {
                  "text": "PF2E.condition.restrained.note"
                }
              ]
            },
            {
              "itemType": "spell",
              "key": "ItemAlteration",
              "mode": "add",
              "predicate": [
                "item:trait:manipulate"
              ],
              "property": "description",
              "value": [
                {
                  "text": "PF2E.condition.restrained.note"
                }
              ]
            },
            {
              "key": "Note",
              "predicate": [
                {
                  "nor": [
                    "action:escape",
                    "action:force-open"
                  ]
                }
              ],
              "selector": [
                "attack",
                "skill-check"
              ],
              "text": "PF2E.condition.restrained.note",
              "title": "{item|name}"
            }
          ]
        },
        {
          "name": "Скрыт / Concealed",
          "actions": null,
          "description": "<p>Одному или нескольким существам трудно вас разглядеть из-за густого тумана или других препятствий. Вы можете быть @Condition[Concealed]{скрыты} для одних существ, но не для других. Когда вы @Condition[Concealed]{скрыты}, вы всё ещё можете быть @UUID[Compendium.pf2e.conditionitems.Item.1wQY3JYyhMYeeV2G]{Замечены}, но в вас тяжелее целиться. Существо от которого вы скрыты должно преуспеть в @Check[flat|showDC:all|dc:5]{Чистой проверке} когда выбирает вас целью для атаки, заклинания или другого эффекта. Если проверка проваливается, вы остаётесь невредимы. Эффекты по области не подвержены этой чистой проверке.</p>",
          "traits": [],
          "key": "concealed",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Слепота / Blinded",
          "actions": null,
          "description": "<p>Вы не можете видеть. Вся обычная местность становится для вас @UUID[Compendium.pf2e.journals.JournalEntry.S55aqwWIzpQRFhcq.JournalEntryPage.z68vgV2XWhi1KYEP#mestnostь]{Сложной местностью}. Вы ничего не можете обнаружить с помощью зрения. Вы автоматически критически проваливаете проверки Восприятия, основанные на зрении, и если зрение — ваше единственное точное чувство, вы получаете штраф состояния −4 на проверки Восприятия. Вы иммунны к @Trait[Visual]{визуальным} эффектам. @Condition[Blinded]{Слепота} замещает @UUID[Compendium.pf2e.conditionitems.Item.TkIyaNPgTZFBCCuh]{Ослеплён}.</p>",
          "traits": [],
          "key": "blinded",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": ["perception"],
              "slug": "blinded",
              "type": "status",
              "value": -4
            },
            {
              "key": "Immunity",
              "type": "visual"
            }
          ]
        },
        {
          "name": "Сломан / Broken",
          "actions": null,
          "description": "<p>Это состояние объектов. Объект сломан, когда урон снизил его Очки Здоровья (ОЗ) до Предела Поломки (ПП) или ниже. Сломанный предмет не может быть использован как обычно, и не дает бонусы, за исключением доспеха. Сломанный доспех всё ещё дает бонус предмета к КБ, но еще дает штраф состояния к КБ в зависимости от категории:</p><ul><li>−1 для сломанного лёгкого доспеха</li><li>−2 для сломанного среднего доспеха</li><li>−3 при сломанного тяжёлого доспеха</li></ul><p>Сломанный предмет по-прежнему накладывает штрафы и ограничения, обычно связанные с его ношением, хранением или использованием. Например, сломанный доспех всё ещё будет накладывать ограничение модификатора Ловкости, штрафы проверок и так далее.</p><p>Если эффект делает вещь автоматически поломанной и предмет имеет ОЗ больше Предела Поломки, этот эффект также снижает ОЗ до Предела Поломки.</p>",
          "traits": [],
          "key": "broken",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Спрятан / Hidden",
          "actions": null,
          "description": "<p>Когда вы спрятаны от существа, оно знает в каком пространстве вы находитесь, но не может определить ваше точное место. Обычно вы становитесь @Condition[Hidden]{спрятанным} используя Скрытность чтобы @UUID[Compendium.pf2e.actionspf2e.Item.XMcnh4cSI32tljXa]{Спрятаться}. Когда для @UUID[Compendium.pf2e.actionspf2e.Item.BlAOM2X92SI6HMtJ]{Поиска} существа используются только неточные чувства, оно остаётся @Condition[Hidden]{спрятанным}, а не @UUID[Compendium.pf2e.conditionitems.Item.1wQY3JYyhMYeeV2G]{Замеченным}. Существо, от которого вы спрятались, является для вас @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Застигнутым врасплох}, а также должно преуспеть в @Check[flat|showDC:all|dc:11]{Чистой проверке}, когда делает вас целью для атаки, заклинания или другого эффекта, иначе этот эффект не действует на вас. Эффекты по области не подвержены этой чистой проверке.</p><p>Существо может попытаться использовать действие @UUID[Compendium.pf2e.actionspf2e.Item.BlAOM2X92SI6HMtJ]{Поиск} чтобы заметить вас, как описано.</p>",
          "traits": [],
          "key": "hidden",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Схвачен / Grabbed",
          "actions": null,
          "description": "<p>Другое существо схватило и удерживает вас на месте, делая вас @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Застигнутым врасплох} и @UUID[Compendium.pf2e.conditionitems.Item.eIcWbB5o3pP6OIMe]{Обездвиженным}. Если вы, будучи @Condition[Grabbed]{схваченным}, пытаетесь совершить действие с признаком @Trait[Manipulate]{воздействие}, то должны преуспеть в @Check[flat|showDC:all|dc:5]{Чистой проверке} или действие теряется; совершайте проверку после расходования действия, но до применения эффектов.</p>",
          "traits": [],
          "key": "grabbed",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "inMemoryOnly": true,
              "key": "GrantItem",
              "uuid": "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg"
            },
            {
              "inMemoryOnly": true,
              "key": "GrantItem",
              "uuid": "Compendium.pf2e.conditionitems.Item.eIcWbB5o3pP6OIMe"
            },
            {
              "itemType": "action",
              "key": "ItemAlteration",
              "mode": "add",
              "predicate": [
                "item:trait:manipulate"
              ],
              "property": "description",
              "value": [
                {
                  "text": "PF2E.condition.grabbed.note"
                }
              ]
            },
            {
              "itemType": "feat",
              "key": "ItemAlteration",
              "mode": "add",
              "predicate": [
                "item:trait:manipulate"
              ],
              "property": "description",
              "value": [
                {
                  "text": "PF2E.condition.grabbed.note"
                }
              ]
            },
            {
              "itemType": "spell",
              "key": "ItemAlteration",
              "mode": "add",
              "predicate": [
                "item:trait:manipulate"
              ],
              "property": "description",
              "value": [
                {
                  "text": "PF2E.condition.grabbed.note"
                }
              ]
            }
          ]
        },
        {
          "name": "Тошнота / Sickened",
          "actions": null,
          "description": "<p>Вы плохо себя чувствуете. @Condition[Sickened]{Тошнота} всегда имеет значение. Вы получаете штраф состояния, равный этому значению, на все ваши проверки и КС. Когда у вас @Condition[Sickened]{тошнота}, вы не можете ничего добровольно глотать, включая эликсиры и зелья.</p><p>Вы можете потратить одно действие (<span class=\"action-glyph\">1</span>) на рвотный позыв, чтобы попытаться оправиться, что позволит сделать спасбросок @Check[fortitude]{Стойкости} против КС эффекта, который вызвал у вас @Condition[Sickened]{тошноту}. При успехе вы снижаете значение @Condition[Sickened]{тошноты} на 1 (или на 2 при критическом успехе).</p>",
          "traits": [],
          "key": "sickened",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": ["all"],
              "slug": "sickened",
              "type": "status",
              "value": "-value"
            },
            {
              "itemType": "consumable",
              "key": "ItemAlteration",
              "label": "PF2E.condition.sickened.name",
              "mode": "add",
              "predicate": [
                {
                  "or": [
                    "item:tag:alchemical-food",
                    "item:trait:elixir",
                    "item:trait:ingested",
                    "item:trait:potion"
                  ]
                }
              ],
              "property": "description",
              "value": [
                {
                  "text": "PF2E.condition.sickened.note"
                }
              ]
            }
          ]
        },
        {
          "name": "Ускорен / Quickened",
          "actions": null,
          "description": "<p>Вы можете действовать быстрее. Каждый раунд, в начале своего хода, вы получаете 1 дополнительное действие. Многие эффекты, дающие @Condition[Quickened]{ускорение}, уточняют на какой вид действий вы можете потратить его. Если вы были @Condition[Quickened]{ускорены} несколькими эффектами, вы можете использовать это дополнительное действие на любое одиночное действие, разрешённое любым из эффектов ускорения, действующих на вас (прим. пер.: Вы получаете только одно очко действия, но можете использовать его на любое из разрешённых действий). Так как @Condition[Quickened]{ускорение} начинает действовать только в начале хода, если вы были @Condition[Quickened]{ускорены} во время своего хода, то не получаете действие мгновенно.</p>",
          "traits": [],
          "key": "quickened",
          "source": "Pathfinder Player Core",
          "rules": []
        },
        {
          "name": "Утомление / Fatigued",
          "actions": null,
          "description": "<p>Вы устали и не можете собраться с силами. Вы получаете штраф состояния −1 к КБ и спасброскам. Вы не можете использовать активности исследования, выполняемые во время путешествия, как те, что указаны в @UUID[Compendium.pf2e.journals.JournalEntry.S55aqwWIzpQRFhcq.JournalEntryPage.qbFZJybp6aFvj1VR]{Активности исследования}.</p><p>Утомление проходит после ночного отдыха.</p>",
          "traits": [],
          "key": "fatigued",
          "source": "Pathfinder Player Core",
          "rules": [
            {
              "key": "FlatModifier",
              "selector": [
                "ac",
                "saving-throw"
              ],
              "slug": "fatigued",
              "type": "status",
              "value": -1
            }
          ]
        }

      ],
      areaRepository: {
        burst: "взрыв",
        emanation: "эманация",
        line: "линия",
        cube: "куб",
        cone: "конус",
        cylinder: "цилиндр"
      },
      levelSkill: {
        class: [1, 3, 5, 7, 9, 10, 11, 13, 15, 17, 19, 20]
      },

    };

  },
  methods: {
    getAttributeByKey(key) {
      return this.attributeRepository.find((a) => a.key === key);
    },
    getTraitByKey(key) {
      key = key.replace("wounds", "Max Wounds");
      key = key.replace("shock", "Max Shock");
      key = key.replace("soak", "Determination");
      const trait = this.traitRepository.find((a) => a.key === key);
      if (trait) return trait;
      console.warn(`No trait forund for ${key}`);
      return {
        key: key,
        name: key,
      };
    },
    getSkillByKey(key) {
      return this.skillRepository.find((s) => s.key === key);
    },
    getTraitsByKey(key) {
      return this.traitRepository.find((s) => s.key === key);
    },
    getAttributeMaximumForSpecies(speciesName, attributeName) {
      const species = this.maximumBySpeciesRepository.find(
        (species) => species.name === speciesName
      );
      const maximum = species.attributeMaximums.find(
        (attribute) => attribute.name === attributeName
      );
      return maximum ? maximum.value : undefined;
    },
    getTraitMaximumForSpecies(speciesName, traitName) {
      const species = this.maximumBySpeciesRepository.find(
        (species) => species.name === speciesName
      );
      const maximum = species.traitMaximums.find(
        (trait) => trait.name === traitName
      );
      return maximum ? maximum.value : undefined;
    },
    getCreationAttributeArrayByTier() {
      return [
        [2, 2, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 4, 4, 4],
        [3, 4, 4, 4, 4, 4, 5],
        [4, 4, 4, 4, 5, 5, 6],
        [4, 4, 5, 6, 6, 6, 7],
      ];
    },
    getCreationAttributeArrayByTierExamples() {
      return [
        {
          strength: 2,
          agility: 3,
          toughness: 3,
          intellect: 3,
          fellowship: 3,
          willpower: 2,
          initiative: 3,
        },
        {
          strength: 3,
          agility: 4,
          toughness: 4,
          intellect: 3,
          fellowship: 3,
          willpower: 4,
          initiative: 3,
        },
        {
          strength: 3,
          agility: 4,
          toughness: 4,
          intellect: 4,
          fellowship: 4,
          willpower: 5,
          initiative: 4,
        },
        {
          strength: 4,
          agility: 6,
          toughness: 5,
          intellect: 4,
          fellowship: 4,
          willpower: 4,
          initiative: 5,
        },
        {
          strength: 4,
          agility: 7,
          toughness: 6,
          intellect: 4,
          fellowship: 5,
          willpower: 6,
          initiative: 6,
        },
      ];
    },
    getCreationSkillArrayByTier() {
      return [
        [2, 3, 3, 3, 4],
        [2, 3, 3, 3, 3, 4, 4, 5],
        [2, 3, 3, 3, 4, 4, 4, 4, 5, 5],
        [2, 2, 2, 3, 4, 4, 4, 5, 5, 5, 6],
        [3, 4, 4, 4, 4, 4, 4, 4, 5, 6, 6, 7],
      ];
    },
    getCreationSkillArrayByTierExamples() {
      return [
        {
          athletics: 2,
          awareness: 3,
          ballisticSkill: 4,
          persuasion: 3,
        },
      ];
    },
  },
};
