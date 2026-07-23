module.exports = [
    {
        "name": "Чародей",
        "img": "systems/pf2e/icons/classes/sorcerer.webp",
        "hitpoints": 6,
        "keyAbility": [
            "charisma"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 1
            }
        ],
        "skillTrained": [],
        "skillTrainedPoints": 2,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core 2",
        "key": "sorcerer",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "U",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            {
                "key": "spells",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 7
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 7
            },
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "simple",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 11
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 11
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 13,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "spells",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 15
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 15
            },
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 17
            },
            {
                "key": "spells",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 19
            },
            {
                "key": "class",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 19
            }
        ],
        "archetypeFeatures": [
            "reflex-expertise",
            "bloodline-paragon",
            "spell-repertoire",
            "majestic-will",
            "perception-expertise",
            "weapon-expertise",
            "expert-spellcaster",
            "sorcerous-potency",
            "weapon-specialization",
            "sorcerer-spellcasting",
            "signature-spells",
            "defensive-robes",
            "legendary-spellcaster",
            "bloodline",
            "bloodline-spells",
            "magical-fortitude",
            "master-spellcaster"
        ],
        "hint": "Вы не выбирали стать заклинателем — вы были рождены им. В вашей крови есть магия, независимо от того, коснулось ли божество одного из ваших предков, прародитель причищался с первородным существом или могущественный оккультный ритуал повлиял на ваш род. Самоанализ и учёба позволяют вам совершенствовать свои врожденные магические навыки и открывать новые, более мощные умения.",
        "keywords": "чародей",
        "prepared": false,
        "trait": [
            "чародей"
        ],
        "rarity": "common",
        "spellTradition": "",
        "spellProgression": {
            "1": [
                5,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "2": [
                5,
                4,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "3": [
                5,
                4,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "4": [
                5,
                4,
                4,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "5": [
                5,
                4,
                4,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "6": [
                5,
                4,
                4,
                4,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "7": [
                5,
                4,
                4,
                4,
                3,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "8": [
                5,
                4,
                4,
                4,
                4,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "9": [
                5,
                4,
                4,
                4,
                4,
                3,
                0,
                0,
                0,
                0,
                0
            ],
            "10": [
                5,
                4,
                4,
                4,
                4,
                4,
                0,
                0,
                0,
                0,
                0
            ],
            "11": [
                5,
                4,
                4,
                4,
                4,
                4,
                3,
                0,
                0,
                0,
                0
            ],
            "12": [
                5,
                4,
                4,
                4,
                4,
                4,
                4,
                0,
                0,
                0,
                0
            ],
            "13": [
                5,
                4,
                4,
                4,
                4,
                4,
                4,
                3,
                0,
                0,
                0
            ],
            "14": [
                5,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                0,
                0,
                0
            ],
            "15": [
                5,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                3,
                0,
                0
            ],
            "16": [
                5,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                0,
                0
            ],
            "17": [
                5,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                3,
                0
            ],
            "18": [
                5,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                0
            ],
            "19": [
                5,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                1
            ],
            "20": [
                5,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                4,
                1
            ]
        },
        "spellFocusPool": 1,
        "spellsClass": {
            "attack": "T",
            "class": "T"
        },
        "skillClass": "T",
        "isFeatLevelOne": false,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы используете заклинания, чтобы ранить врагов, влиять на их умы и препятствовать их движениям. Вы можете быть слишком уязвимы, чтобы идти в ближний бой, или же ваше наследие крови может дать умения, которые помогают вам держаться в драке. Хоть ваша магия и сильна, чтобы приберечь ваши лучшие заклинания, либо когда вы использовали их все, вы также полагаетесь на чары.</p>"
            },
            {
                "name": "social",
                "text": "<p>Ваше естественное обаяние позволяет вам хорошо взаимодействовать с людьми.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы обнаруживаете магию вокруг себя, находя сокровища и предупреждая свою группу о магических ловушках. Когда группа сталкивается с тайнами или проблемами, связанными с вашим наследием крови, то вы пытаетесь решить их.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы создаете магические предметы или пишите свитки. Ваше наследие крови может побудить вас исследовать свою родословную или общаться с относящимися к ней людьми или существами.</p>"
            },
            {
                "name": "you",
                "text": "<li><p>Иметь сильную независимую черту, и неважно, принимаете ли вы или отвергаете своё магическое наследие</p></li><li><p>Смотреть на свою родословную с восхищением, страхом или чем-то по середине</p></li><li><p>Полагаться на магические предметы, такие как свитки и палочки, чтобы дополнить свой ограниченный выбор заклинаний</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Восхищаются вашим умением создавать магию из воздуха и смотрят на ваши способности одновременно с восхищением и недоверием</p></li><li><p>Считают вас менее посвящённым заклинателем, чем прилежные волшебники</p></li><li><p>Полагают, что вы столь же непредсказуемы, как и магия, порождаемая вами</p></li>"
            }
        ]
    },
    {
        "name": "Защитник",
        "img": "systems/pf2e/icons/default-icons/class.svg",
        "hitpoints": 12,
        "keyAbility": [
            "strength"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 1
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "athletics"
        ],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Battlecry!",
        "key": "guardian",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "T"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "T",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 7
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 7
            },

            {
                "key": "fortitude",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9,
                "criticalSuccess": true
            },

            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 17,
                "criticalSuccess": true
            },

            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "martial",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "martial",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },

            {
                "key": "simple",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },

            // Защита
            {
                "key": "light",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "medium",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "heavy",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "medium",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "heavy",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },

            {
                "key": "medium",
                "upgrade": "L",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "heavy",
                "upgrade": "L",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "light",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 15
            },

            // КС класса
            {
                "key": "class",
                "upgrade": "T",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 1
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 9
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 19
            },

            // Специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 11,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },

            {
                "key": "Greater Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 17,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            }
        ],
        "archetypeFeatures": [
            "unbreakable-mastery",
            "reaction-time",
            "guardian-mastery",
            "unyielding-resolve",
            "taunt",
            "reflex-expertise",
            "tough-to-kill",
            "unbreakable-expertise",
            "guardians-techniques",
            "weapon-expertise",
            "weapon-specialization",
            "battle-hardened",
            "guardian-expertise",
            "shield-block",
            "guardians-armor",
            "unbreakable-legend",
            "weapon-mastery",
            "greater-weapon-specialization"
        ],
        "hint": "",
        "keywords": "защитник",
        "trait": [
            "защитник"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Изобретатель",
        "img": "systems/pf2e/icons/classes/inventor.webp",
        "hitpoints": 8,
        "keyAbility": [
            "intellect"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 1
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "crafting"
        ],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Guns & Gears",
        "key": "inventor",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "T",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 13
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 7
            },

            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11,
                "criticalSuccess": true
            },

            {
                "key": "fortitude",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 17,
                "criticalSuccess": true
            },

            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "martial",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "martial",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },

            {
                "key": "simple",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },

            // Защита
            {
                "key": "light",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "medium",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "medium",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },

            {
                "key": "light",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "medium",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },

            // КС класса
            {
                "key": "class",
                "upgrade": "T",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 1
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 9
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 17
            },

            // Специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "Greater Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            }
        ],
        "archetypeFeatures": [
            "inventor-weapon-expertise",
            "anvils-hardness",
            "peerless-inventor",
            "medium-armor-expertise-inventor",
            "perception-expertise",
            "complete-reconfiguration",
            "master-overdrive",
            "offensive-boost",
            "reflex-expertise",
            "medium-armor-mastery",
            "greater-weapon-specialization",
            "revolutionary-innovation",
            "inventive-mastery",
            "weapon-specialization",
            "shield-block",
            "breakthrough-innovation",
            "inventive-expertise",
            "legendary-overdrive",
            "infinite-invention",
            "explode",
            "overdrive",
            "reconfigure",
            "expert-overdrive",
            "churning-mind",
            "inventor-weapon-mastery",
            "innovation"
        ],
        "hint": "",
        "keywords": "изобретатель",
        "trait": [
            "изобретатель"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Бард",
        "img": "systems/pf2e/icons/classes/bard.webp",
        "hitpoints": 8,
        "keyAbility": [
            "charisma"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 1
            }
        ],
        "skillTrained": [
            "occultism",
            "perfomance"
        ],
        "skillTrainedPoints": 4,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core",
        "key": "bard",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 3
            },
            {
                "key": "attack",
                "upgrade": "E",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "class",
                "upgrade": "E",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "simple",
                "mode": "Upgrade",
                "upgrade": "E",
                "type": "Attack",
                "level": 11
            },
            {
                "key": "martial",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 11
            },
            {
                "key": "Perception",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Perception",
                "level": 11
            },
            {
                "key": "light",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "attack",
                "upgrade": "M",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "class",
                "upgrade": "M",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "attack",
                "upgrade": "L",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "class",
                "upgrade": "L",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 19
            }
        ],
        "archetypeFeatures": [
            "expert-spellcaster",
            "master-spellcaster",
            "weapon-specialization",
            "magnum-opus",
            "spell-repertoire",
            "legendary-spellcaster",
            "performers-heart",
            "reflex-expertise",
            "perception-mastery",
            "composition-spells",
            "signature-spells",
            "fortitude-expertise",
            "muses",
            "light-armor-expertise",
            "occult-spellcasting",
            "greater-performers-heart",
            "bard-weapon-expertise"
        ],
        "hint": "Вы мастер искусств, знаток скрытых тайн, и обольстительный мастер убеждения. С помощью эффектных выступлений, вы воздействуете на умы и вдохновляете сердца на новые героические свершения. Вы можете использовать свои силы, чтобы стать харизматическим лидером, или, вместо этого вы можете быть советником, манипулятором, ученым, проходимцем или виртуозом. В то время как ваша универсальность заставляет некоторых считать вас привлекательным негодником и мастером на все руки, но опасно списывать вас со счетов, как неумеху.",
        "keywords": "бард",
        "trait": [
            "бард"
        ],
        "rarity": "common",
        "prepared": false,
        "spellTradition": "оккультный",
        "spellProgression": {
            "1": [
                5,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "2": [
                5,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "3": [
                5,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "4": [
                5,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "5": [
                5,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "6": [
                5,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "7": [
                5,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "8": [
                5,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "9": [
                5,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0
            ],
            "10": [
                5,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0
            ],
            "11": [
                5,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0
            ],
            "12": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0
            ],
            "13": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0
            ],
            "14": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0
            ],
            "15": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0
            ],
            "16": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0
            ],
            "17": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0
            ],
            "18": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0
            ],
            "19": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ],
            "20": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ]
        },
        "spellFocusPool": 1,
        "spellFocusBase": [
            "Courageous Anthem",
            "Counter Performance"
        ],
        "spellsClass": {
            "attack": "T",
            "class": "T"
        },
        "skillClass": "T",
        "isFeatLevelOne": false,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы используете магические выступления, чтобы изменить шансы в пользу своих союзников. Вы по мере необходимости уверенно чередуете атаки, исцеление и полезные заклинания.</p>"
            },
            {
                "name": "social",
                "text": "<p>Вы с легкостью убеждаете, увиливаете и угрожаете.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы являетесь источником знаний, народных сказок, легенд и знаний, которые обеспечивают детальный контекст и полезную информацию для приключения группы. Ваши заклинания и выступления вдохновляют ваших союзников на великие открытия и успехи.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>С вашими выступлениями, вы можете зарабатывать деньги и авторитет, делая себе имя и приобретая покровителей. В конце концов, рассказы о ваших талантах и победах могут привлечь других бардов для изучения ваших приемов в колледже бардов.</p>"
            },
            {
                "name": "you",
                "text": "<li><p>Иметь настолько сильную страсть к своему искусству, что она формируется в духовную связь</p></li><li><p>Вступить в дело, когда требуется деликатность и ненасильственное решение</p></li><li><p>Следовать за своей музой, будь то таинственное существо-фея, философская концепция, психическая сила или божество искусства или музыки, и с ее помощью узнать тайные знания, которыми обладают не мног</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Не понимают, что ваше колдовство основывается на божественной силе, и вместо этого верят, что вы управляете чуждыми, и возможно злыми силами</p></li><li><p>Предполагают, что вы совершили какой-то ужасный проступок, чтобы стать проклятым богами</p></li><li><p>Восхищаются вашей решимостью и приносимыми жертвами, чтобы совершать удивительные поступки</p></li>"
            }
        ]
    },
    {
        "name": "Сыщик",
        "img": "systems/pf2e/icons/classes/investigator.webp",
        "hitpoints": 8,
        "keyAbility": [
            "intellect"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 1
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "society"
        ],
        "skillTrainedPoints": 4,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core 2",
        "key": "investigator",
        "Perception": "E",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "E",
            "will": "E"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "M",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "perception",
                "upgrade": "L",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 13
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },

            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11,
                "criticalSuccess": true
            },

            {
                "key": "reflex",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 15,
                "criticalSuccess": true
            },

            {
                "key": "will",
                "upgrade": "L",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 17,
                "criticalFailure": "failure",
                "failureDamage": "half"
            },

            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "martial",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "martial",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },

            {
                "key": "simple",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },

            // Защита
            {
                "key": "light",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },

            {
                "key": "light",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },

            // КС класса
            {
                "key": "class",
                "upgrade": "T",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 1
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 9
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 19
            },

            // Специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },

            {
                "key": "Greater Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            }
        ],
        "archetypeFeatures": [
            "deductive-improvisation",
            "perception-legend",
            "fortitude-expertise",
            "dogged-will",
            "on-the-case",
            "martial-weapon-mastery",
            "weapon-expertise",
            "keen-recollection",
            "perception-mastery",
            "light-armor-mastery",
            "methodology",
            "investigator-expertise",
            "savvy-reflexes",
            "master-detective",
            "greater-weapon-specialization",
            "devise-a-stratagem",
            "strategic-strike",
            "skillful-lessons",
            "light-armor-expertise",
            "weapon-specialization",
            "greater-dogged-will"
        ],
        "hint": "",
        "keywords": "сыщик",
        "trait": [
            "сыщик"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Друид",
        "img": "systems/pf2e/icons/classes/druid.webp",
        "hitpoints": 8,
        "keyAbility": [
            "wisdom"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 1
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "nature"
        ],
        "skillTrainedPoints": 2,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core",
        "key": "druid",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            {
                "key": "Perception",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Perception",
                "level": 3
            },
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 3
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "attack",
                "upgrade": "E",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "class",
                "upgrade": "E",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "simple",
                "mode": "Upgrade",
                "upgrade": "E",
                "type": "Attack",
                "level": 11
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 11
            },
            {
                "key": "light",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "medium",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 13,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "attack",
                "upgrade": "M",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "class",
                "upgrade": "M",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "attack",
                "upgrade": "L",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "class",
                "upgrade": "L",
                "type": "spellsClass",
                "mode": "Upgrade",
                "level": 19
            }
        ],
        "archetypeFeatures": [
            "anathema-druid",
            "medium-armor-expertise",
            "reflex-expertise",
            "druid-spellcasting",
            "wild-willpower",
            "perception-expertise",
            "fortitude-expertise",
            "master-spellcaster",
            "druidic-order",
            "wildsong",
            "legendary-spellcaster",
            "shield-block",
            "weapon-specialization",
            "voice-of-nature",
            "expert-spellcaster",
            "primal-hierophant",
            "weapon-expertise"
        ],
        "hint": "Силе природы невозможно сопротивляться. Она может разрушить самую неприступную крепость за считанные минуты, превратив даже самые мощные сооружения в руины, сжечь их до тла, похоронить под снежной лавиной или утопить в волнах. Она может дать нескончаемые дары и захватывающее великолепие тем, кто ее уважает, и мучительную смерть тем, кто относится к ней слишком легкомысленно. Вы один из тех, кто слышит зов природы. Вы трепещите перед величием ее могущества и отдаете всего себя ее службе.",
        "keywords": "друид",
        "trait": [
            "друид"
        ],
        "rarity": "common",
        "prepared": true,
        "spellTradition": "природный",
        "spellProgression": {
            "1": [
                5,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "2": [
                5,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "3": [
                5,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "4": [
                5,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "5": [
                5,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "6": [
                5,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "7": [
                5,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "8": [
                5,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "9": [
                5,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0
            ],
            "10": [
                5,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0
            ],
            "11": [
                5,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0
            ],
            "12": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0
            ],
            "13": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0
            ],
            "14": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0
            ],
            "15": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0
            ],
            "16": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0
            ],
            "17": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0
            ],
            "18": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0
            ],
            "19": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ],
            "20": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ]
        },
        "spellFocusPool": 1,
        "spellsClass": {
            "attack": "T",
            "class": "T"
        },
        "skillClass": "T",
        "isFeatLevelOne": false,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы призываете силы природы, чтобы побеждать врагов и защищать своих союзников. Вы колдуете заклинания подпитываемые природной магией, чтобы защищать себя и своих друзей, излечивать их раны или призывать смертоносных животных, которые сражаются на вашей стороне. В зависимости от вашей связи с природой, вы можете призвать мощную стихийную магию или поменять форму и стать ужасающим зверем.</p>"
            },
            {
                "name": "social",
                "text": "<p>Вы олицетворяете баланс и разумный подход к проблемам, ища решения, которые не только лучше всего подходят для природного мира, но и позволяют существам в нем жить в мире и гармонии. Вы часто предлагаете компромиссы, которые позволяют обеим сторонам получить то, что им действительно нужно, даже если они не могут получить все, что хотят.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Ваши познания природы - бесценны. Вы выслеживаете врагов, ориентируетесь в дикой местности, и используете заклинания, чтобы обнаружить магические ауры вокруг вас. Вы, даже можете попросить диких животных, помочь вашей группе, своими экстраординарными чувствами и навыками разведки.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы можете создавать магические предметы или зелья. Кроме того, ваша связь с природой может привести вас к уходу за дикими землями, дружбе с животными и исцелению ран, вызванных цивилизацией. Вы можете даже научить методам долговременного земледелия и животноводства, которые позволяют другим добывать пропитание с помощью земли, не нанося вреда ее балансу.</p>"
            },
            {
                "name": "you",
                "text": "<li><p> Испытывать глубокое и выраженное уважение к силе природы</p></li><li><p>Испытывать постоянный трепет перед природой, желая поделиться ей с другими, но опасаясь их влияния</p></li><li><p>Относиться к растениям и животным как к союзникам, работая вместе с ними для достижения своих целей</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Рассматривают вас как представителя природы и уверены, что вы можете контролировать ее</p></li><li><p>Считают вас отшельником, который избегает общества и городов и предпочитает жить в дикой природе</p></li><li><p>Считают вас таинственным, подобным священнику, но отвечающим только силам природы</p></li>"
            }
        ]
    },
    {
        "name": "Воин",
        "img": "systems/pf2e/icons/classes/fighter.webp",
        "hitpoints": 10,
        "keyAbility": [
            "dexterity",
            "strength"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [
            "acrobatics",
            "athletics"
        ],
        "sourceKey": "Pathfinder Player Core",
        "key": "fighter",
        "Perception": "E",
        "skillAttack": {
            "simple": "E",
            "martial": "E",
            "advanced": "T",
            "unarmed": "E"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "T"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "E",
            "will": "T"
        },
        "modification": [
            {
                "key": "will",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Saving",
                "level": 3
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "Perception",
                "upgrade": "M",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 7,
                "valueBonus": 2,
                "typeBonus": "circumstance"
            },
            {
                "key": "fortitude",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Saving",
                "level": 9
            },
            {
                "key": "light",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 11
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 11
            },
            {
                "key": "medium",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "criticalSpecialization": true,
                "level": 11
            },
            {
                "key": "heavy",
                "mode": "Upgrade",
                "upgrade": "E",
                "type": "Defence",
                "criticalSpecialization": true,
                "level": 11
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 11
            },
            {
                "key": "simple",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "advanced",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "unarmed",
                "mode": "Upgrade",
                "upgrade": "M",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "reflex",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Saving",
                "level": 15
            },
            {
                "key": "greater-weapon-specialization",
                "type": "greater-weapon-specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            },
            {
                "key": "light",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 17
            },
            {
                "key": "medium",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "criticalSpecialization": true,
                "level": 17
            },
            {
                "key": "heavy",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "criticalSpecialization": true,
                "level": 17
            },
            {
                "key": "unarmored",
                "mode": "Upgrade",
                "upgrade": "M",
                "type": "Defence",
                "level": 17
            },
            {
                "key": "simple",
                "mode": "Upgrade",
                "upgrade": "L",
                "type": "Attack",
                "level": 19
            },
            {
                "key": "martial",
                "upgrade": "L",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "advanced",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 19
            },
            {
                "key": "unarmed",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 19
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 19
            }
        ],
        "archetypeFeatures": [
            "weapon-legend",
            "fighter-expertise",
            "armor-expertise",
            "reactive-strike",
            "tempered-reflexes",
            "shield-block",
            "battle-hardened",
            "improved-flexibility",
            "battlefield-surveyor",
            "bravery",
            "armor-mastery",
            "combat-flexibility",
            "weapon-specialization",
            "fighter-weapon-mastery",
            "greater-weapon-specialization",
            "versatile-legend"
        ],
        "hint": "Сражаясь ради чести, жадности, верности или просто ради азарта битвы, вы бесспорно являетесь мастером владения оружием и боевыми техниками. Вы сочетаете свои действия в комбинациях открывающих движений, завершающих ударов, и контратак, когда ваши враги по неосторожности ослабят защиту. Являетесь ли вы рыцарем, наемником, снайпером или мастером клинка, вы искусно отточили свои боевые навыки и обрушиваете сокрушительные критические атаки на своих врагов.",
        "keywords": "воин",
        "trait": [
            "воин"
        ],
        "rarity": "Common",
        "skillClass": "T",
        "isFeatLevelOne": true,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы наносите удары с непревзойденной точностью и используете специализированные боевые приемы. Воин ближнего боя стоит между союзниками и врагами, атакуя врагов, которые пытаются пройти мимо. Воин дальнего боя производит точные выстрелы с расстояния.</p>"
            },
            {
                "name": "social",
                "text": "<p>Вы можете быть устрашающим фактором. Это может быть полезно при переговорах с врагами, но иногда является помехой при более деликатных взаимодействиях.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы на чеку, поддерживаете свою оборону, и следите за скрытыми угрозами. Еще вы преодолеваете физические трудности на своем пути, ломая двери, поднимая препятствия, ловко взбираясь и перепрыгивая через ямы.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы можете заниматься ручным трудом или создавать и ремонтировать оружие. Если вы знаете приемы, которые вам больше не нравятся, то можете обучиться новым. Если вы имеете авторитет, то можете основать собственную организацию или крепость.</p>"
            },
            {
                "name": "you",
                "text": "<li><p>Знать назначение и качество каждого оружия и части доспеха, которыми владеете</p></li><li><p>Признавать, что опасность жизни авантюриста должна быть уравновешена отличной попойкой или амбициозными делами</p></li><li><p>Быть нетерпеливым при решении головоломок или проблем, требующих обстоятельной логики или обучения</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Считать вас пугающим, пока не узнают вас поближе, а возможно, и даже после того, как узнают</p></li><li><p>Ожидать, что вы лишь грубая сила без мозгов</p></li><li><p>Уважать ваш опыт в военном искусстве и ценят ваше мнение о качестве вооружения</p></li>"
            }
        ]
    },
    {
        "name": "Анимист",
        "img": "systems/pf2e/icons/default-icons/class.svg",
        "hitpoints": 8,
        "keyAbility": [
            "wisdom"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 1
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "religion"
        ],
        "skillTrainedPoints": 2,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder War of Immortals",
        "key": "animist",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "T",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 9
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 3
            },

            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11
            },

            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 13,
                "criticalSuccess": true
            },

            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 11
            },

            // Защита
            {
                "key": "light",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "medium",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "medium",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },

            // Атаки заклинаниями
            {
                "key": "spell",
                "upgrade": "T",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "spell",
                "upgrade": "E",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "spell",
                "upgrade": "M",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "spell",
                "upgrade": "L",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 19
            },

            // КС заклинаний
            {
                "key": "spell",
                "upgrade": "T",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "spell",
                "upgrade": "E",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "spell",
                "upgrade": "M",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "spell",
                "upgrade": "L",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 19
            },

            // КС класса
            {
                "key": "class",
                "upgrade": "T",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 1
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 9
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 19
            },

            // Специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 13,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },

            {
                "key": "Greater Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            }
        ],
        "archetypeFeatures": [
            "expert-protections",
            "apparition-attunement",
            "third-apparition",
            "simple-weapon-expertise",
            "animistic-practice",
            "supreme-incarnation",
            "expert-spellcaster",
            "perception-expertise",
            "master-of-mind-and-spirit",
            "animist-apparition-spellcasting",
            "weapon-specialization",
            "fourth-apparition",
            "legendary-spellcaster",
            "fortitude-expertise",
            "master-spellcaster"
        ],
        "hint": "",
        "keywords": "анимист",
        "trait": [
            "анимист"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Жрец",
        "img": "systems/pf2e/icons/classes/cleric.webp",
        "hitpoints": 8,
        "keyAbility": [
            "wisdom"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 1
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "religion"
        ],
        "skillTrainedPoints": 2,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core",
        "key": "cleric",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T",
            "Deity's favored weapon": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "U",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            {
                "key": "Perception",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Perception",
                "level": 3
            },
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 13,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            }
        ],
        "archetypeFeatures": [
            "deity-cleric",
            "cleric-spellcasting",
            "doctrine",
            "first-doctrine",
            "divine-font",
            "second-doctrine",
            "perception-expertise",
            "third-doctrine",
            "resolute-faith",
            "reflex-expertise",
            "fourth-doctrine",
            "divine-defense",
            "fifth-doctrine",
            "weapon-specialization",
            "final-doctrine",
            "miraculous-spell"
        ],
        "hint": "Силе природы невозможно сопротивляться. Она может разрушить самую неприступную крепость за считанные минуты, превратив даже самые мощные сооружения в руины, сжечь их до тла, похоронить под снежной лавиной или утопить в волнах. Она может дать нескончаемые дары и захватывающее великолепие тем, кто ее уважает, и мучительную смерть тем, кто относится к ней слишком легкомысленно. Вы один из тех, кто слышит зов природы. Вы трепещите перед величием ее могущества и отдаете всего себя ее службе.",
        "keywords": "жрец",
        "prepared": true,
        "trait": [
            "жрец"
        ],
        "rarity": "common",
        "spellTradition": "сакральный",
        "spellProgression": {
            "1": [
                5,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "2": [
                5,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "3": [
                5,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "4": [
                5,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "5": [
                5,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "6": [
                5,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "7": [
                5,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "8": [
                5,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "9": [
                5,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0
            ],
            "10": [
                5,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0
            ],
            "11": [
                5,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0
            ],
            "12": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0
            ],
            "13": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0
            ],
            "14": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0
            ],
            "15": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0
            ],
            "16": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0
            ],
            "17": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0
            ],
            "18": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0
            ],
            "19": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ],
            "20": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ]
        },
        "spellsClass": {
            "attack": "T",
            "class": "T"
        },
        "skillClass": "T",
        "isFeatLevelOne": false,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Если вы боевой жрец, то соблюдаете баланс между сотворением заклинаний и атаками оружием, обычно предпочитаемым оружием божества. Если вы священнослужитель, то преимущественно сотворяете заклинания. Большинство ваших заклинаний могут усиливать, защищать или лечить ваших союзников. В зависимости от вашего божества, вы получаете дополнительные заклинания, чтобы исцелять союзников или ранить ваших врагов.</p>"
            },
            {
                "name": "social",
                "text": "<p>Вы можете совершать дипломатические предложения или устраивать впечатляющие речи. Так как вы мудры, вы улавливаете ложь, которую говорят другие.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы обнаруживаете магию поблизости и интерпретируете любые религиозные тексты, с которыми сталкиваетесь. Еще вы можете сосредоточиться на защитном заклинании в случае стычки. После битвы или опасности вы можете исцелить всех кто был ранен.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы можете проводит службы в храме, путешествовать чтобы нести слово вашего божества, исследовать священные писания, праздновать церковные праздники, или даже основать новый храм.</p>"
            },
            {
                "name": "you",
                "text": "<li><p> Посещать храмы и святые места, священные для вашей веры, и быстро находить общий язык с другими почитателями вашего божества</p></li><li><p>Знать учения священных текстов вашей религии и как они применимы к дилемме</p></li><li><p>Сотрудничать со своими союзниками, если они не просят вас идти против божественной воли</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p> Считать вашу верность впечатляющей, даже если они ее не понимают</p></li><li><p>Ожидают что вы исцелите их раны</p></li><li><p>Полагаются на то, что вы будете взаимодействовать с другими религиозными фигурами</p></li>"
            }
        ]
    },
    {
        "name": "Магус",
        "img": "systems/pf2e/icons/classes/magus.webp",
        "hitpoints": 8,
        "keyAbility": [
            "dexterity",
            "strength"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "arcana"
        ],
        "skillTrainedPoints": 2,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Secrets of Magic",
        "key": "magus",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "T",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 9
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 5
            },

            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9,
                "criticalSuccess": true
            },

            {
                "key": "fortitude",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 15,
                "criticalSuccess": true
            },


            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "martial",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "martial",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },

            {
                "key": "simple",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },


            // Защита
            {
                "key": "light",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "medium",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "medium",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },

            {
                "key": "light",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 17
            },
            {
                "key": "medium",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 17
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 17
            },


            // Атаки заклинаниями
            {
                "key": "spell",
                "upgrade": "T",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "spell",
                "upgrade": "E",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "spell",
                "upgrade": "M",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 17
            },


            // КС заклинаний
            {
                "key": "spell",
                "upgrade": "T",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "spell",
                "upgrade": "E",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "spell",
                "upgrade": "M",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 17
            },


            // КС класса
            {
                "key": "class",
                "upgrade": "T",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 1
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 9
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 17
            },


            // Специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },

            {
                "key": "Greater Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            }
        ],
        "archetypeFeatures": [
            "studious-spells",
            "weapon-expertise",
            "arcane-spellcasting-magus",
            "reflex-expertise",
            "arcane-cascade",
            "double-spellstrike",
            "spellstrike",
            "medium-armor-mastery",
            "expert-spellcaster",
            "master-spellcaster",
            "weapon-mastery",
            "hybrid-study",
            "medium-armor-expertise",
            "weapon-specialization",
            "greater-weapon-specialization",
            "conflux-spells",
            "alertness",
            "resolve",
            "juggernaut"
        ],
        "hint": "",
        "keywords": "магус",
        "trait": [
            "магус"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Экстрасенс",
        "img": "systems/pf2e/icons/default-icons/class.svg",
        "hitpoints": 6,
        "keyAbility": [],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "occultism"
        ],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Dark Archive (Remastered)",
        "key": "psychic",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "U",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "T",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 11
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 5
            },

            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },

            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11,
                "criticalSuccess": true
            },

            {
                "key": "will",
                "upgrade": "L",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 17,
                "criticalFailure": "failure",
                "damageFailureReduction": 0.5
            },

            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 11
            },

            // Защита
            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },

            // Атаки заклинаниями
            {
                "key": "spell",
                "upgrade": "T",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "spell",
                "upgrade": "E",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "spell",
                "upgrade": "M",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "spell",
                "upgrade": "L",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 19
            },

            // КС заклинаний
            {
                "key": "spell",
                "upgrade": "T",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "spell",
                "upgrade": "E",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "spell",
                "upgrade": "M",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "spell",
                "upgrade": "L",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 19
            },

            // Специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 13,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            }
        ],
        "archetypeFeatures": [
            "psychic-spellcasting",
            "weapon-expertise",
            "psi-cantrips-and-amps",
            "unleash-psyche",
            "subconscious-mind",
            "conscious-mind",
            "signature-spells",
            "clarity-of-focus",
            "precognitive-reflexes",
            "expert-spellcaster",
            "extrasensory-perception",
            "walls-of-will",
            "personal-barrier",
            "fortitude-expertise",
            "psychic-weapon-specialization",
            "master-spellcaster",
            "fortress-of-will",
            "infinite-mind",
            "legendary-spellcaster",
            "spell-repertoire"
        ],
        "hint": "",
        "keywords": "экстрасенс",
        "trait": [
            "экстрасенс"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Плут",
        "img": "systems/pf2e/icons/classes/rogue.webp",
        "hitpoints": 8,
        "keyAbility": [
            "dexterity",
            "strength",
            "charisma",
            "intellect"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 1
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "stealth"
        ],
        "skillTrainedPoints": 7,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core",
        "key": "rogue",
        "Perception": "E",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "E",
            "will": "E"
        },
        "modification": [
            {
                "key": "simple",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "martial",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "Perception",
                "upgrade": "M",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "reflex",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Saving",
                "level": 7
            },
            {
                "key": "fortitude",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Saving",
                "level": 9
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 11
            },
            {
                "key": "reflex",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "Saving",
                "level": 13
            },
            {
                "key": "greater-weapon-specialization",
                "type": "greater-weapon-specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            },
            {
                "key": "will",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Saving",
                "level": 15
            },
            {
                "key": "light",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 19
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 19
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 19
            }
        ],
        "archetypeFeatures": [
            "weapon-specialization",
            "weapon-tricks",
            "light-armor-mastery",
            "master-tricks",
            "perception-mastery",
            "greater-weapon-specialization",
            "light-armor-expertise",
            "evasive-reflexes",
            "rogues-racket",
            "rogue-resilience",
            "agile-mind",
            "rogue-expertise",
            "sneak-attack",
            "greater-rogue-reflexes",
            "debilitating-strike",
            "double-debilitation",
            "perception-legend",
            "surprise-attack",
            "deny-advantage",
            "master-strike"
        ],
        "hint": "Вы умелы и предприимчивы. Применяя свой острый ум и быструю реакцию, вы используете ошибки ваших противников в своих интересах и наносите удар по самому больному месту. Вы ведете опасную игру, ища острых ощущений и проверяя свои навыки, мало заботясь о любых законах, которые могут встать на вашем пути. В то время, как путь каждого плута уникален и пронизан опасностью, единственное, что вас всех объединяет - широта и глубина ваших навыков.",
        "keywords": "плут",
        "trait": [
            "плут"
        ],
        "rarity": "Common",
        "skillClass": "T",
        "isFeatLevelOne": true,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы скрытно перемещаетесь; чтобы застичь противника врасплох. Ваша задача — нанесение точечных ударов, поэтому атакуете вы чаще не рядовых солдат, а стоящих поодаль заклинателей и главарей.</p>"
            },
            {
                "name": "social",
                "text": "<p>Благодаря навыкам у вас множество возможностей повлиять на оппонента. Вы, как никто другой, умеете выуживать информацию и устраивать различного рода аферы.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы подкрадываетесь к врагам, чтобы ударить первым, и высматриваете опасности и ловушки. Вы ценный союзник, поскольку способны обезвреживать западни, решать головоломки и предчувствовать опасность.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы можете заниматься карманными кражами или торговать контрабандой. Кроме этого, вы можете примкнуть к воровской гильдии или даже основать собственную.</p>"
            },
            {
                "name": "you",
                "text": "<li>Оттачиваете свои навыки, как упражняясь, так и применяя их на практике.</li>< li > Знаете, где добыть контрабандные товары.</li><li>Обходите или нарушаете закон, потому что считаете его бессмысленным или потому что придумали собственные правила.</li>"
            },
            {
                "name": "other",
                "text": "<li><p>Считают вас обаятельным и интересным, даже если не особенно вам доверяют.</p></li> < li > <p>Обращаются к вам, когда нужен кто-то рисковый или не боящийся запачкать руки.</p></li><li><p>Полагают, что вами движет прежде всего алчность.</p></li>"
            }
        ]
    },
    {
        "name": "Командующий",
        "img": "systems/pf2e/icons/default-icons/class.svg",
        "hitpoints": 8,
        "keyAbility": [
            "intellect"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 1
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "society"
        ],
        "skillTrainedPoints": 2,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Battlecry!",
        "key": "commander",
        "Perception": "E",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "T"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "E",
            "will": "E"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "M",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 13
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },

            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11,
                "criticalSuccess": true
            },

            {
                "key": "reflex",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 15,
                "criticalSuccess": true
            },

            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "martial",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "martial",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },

            {
                "key": "simple",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },

            // Защита
            {
                "key": "light",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "medium",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "heavy",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "medium",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "heavy",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },

            {
                "key": "light",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 17
            },
            {
                "key": "medium",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 17
            },
            {
                "key": "heavy",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 17
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 17
            },

            // КС класса командующего
            {
                "key": "class",
                "upgrade": "T",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "class",
                "upgrade": "E",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "class",
                "upgrade": "M",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "class",
                "upgrade": "L",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 19
            },

            // Специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },

            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            }
        ],
        "archetypeFeatures": [
            "master-tactician",
            "commanders-banner",
            "armor-mastery",
            "tactics",
            "legendary-tactician",
            "expert-tactician",
            "drilled-reactions",
            "commanding-will",
            "fortitude-expertise",
            "armor-expertise",
            "military-expertise",
            "weapon-mastery",
            "greater-weapon-specialization",
            "battlefield-intuition",
            "weapon-specialization",
            "warfare-expertise",
            "perception-mastery",
            "shield-block"
        ],
        "hint": "",
        "keywords": "командующий",
        "trait": [
            "командующий"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Кинетик",
        "img": "systems/pf2e/icons/default-icons/class.svg",
        "hitpoints": 8,
        "keyAbility": [
            "constitution"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 1
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "nature"
        ],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Rage of Elements",
        "key": "kineticist",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "E",
            "will": "T"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "T",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 9
            },


            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 3
            },

            {
                "key": "fortitude",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 7,
                "criticalSuccess": true
            },

            {
                "key": "reflex",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11,
                "criticalSuccess": true
            },

            {
                "key": "fortitude",
                "upgrade": "L",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 15,
                "criticalFailure": "failure",
                "damageFailureReduction": 0.5
            },


            // Навыки
            {
                "key": "nature",
                "upgrade": "T",
                "type": "Skill",
                "mode": "Upgrade",
                "level": 1
            },


            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 11
            },

            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 11
            },


            // Защита
            {
                "key": "light",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },

            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },

            {
                "key": "light",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },

            {
                "key": "unarmored",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },


            // КС класса кинетика
            {
                "key": "class",
                "upgrade": "T",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "class",
                "upgrade": "E",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 7
            },

            {
                "key": "class",
                "upgrade": "M",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 15
            },

            {
                "key": "class",
                "upgrade": "L",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 19
            },


            // Специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 13,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            }
        ],
        "archetypeFeatures": [
            "kinetic-durability",
            "light-armor-mastery",
            "kinetic-mastery",
            "reflow-elements",
            "kinetic-legend",
            "kinetic-aura",
            "kinetic-gate",
            "second-gates-threshold",
            "fourth-gates-threshold",
            "kinetic-quickness",
            "impulses",
            "double-reflow",
            "weapon-expertise",
            "gates-threshold",
            "light-armor-expertise",
            "will-expertise",
            "perception-expertise",
            "final-gate",
            "third-gates-threshold",
            "extract-element",
            "kinetic-expertise",
            "weapon-specialization",
            "greater-kinetic-durability"
        ],
        "hint": "",
        "keywords": "кинетик",
        "trait": [
            "кинетик"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Волшебник",
        "img": "systems/pf2e/icons/classes/wizard.webp",
        "hitpoints": 6,
        "keyAbility": [
            "intellect"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 1
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "arcana"
        ],
        "skillTrainedPoints": 2,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core",
        "key": "wizard",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "U",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            {
                "key": "spells",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 7
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 7
            },
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "simple",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 11
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 11
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 13,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "spells",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 15
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 15
            },
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 17
            },
            {
                "key": "spells",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 19
            },
            {
                "key": "class",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 19
            }
        ],
        "archetypeFeatures": [
            "wizard-spellcasting",
            "arcane-school",
            "arcane-bond",
            "weapon-specialization",
            "perception-expertise",
            "expert-spellcaster",
            "weapon-expertise",
            "arcane-thesis",
            "legendary-spellcaster",
            "archwizards-spellcraft",
            "prodigious-will",
            "master-spellcaster",
            "reflex-expertise",
            "magical-fortitude",
            "defensive-robes"
        ],
        "hint": "Вы вечный ученик арканных тайн вселенной. Через строгую дисциплину и изучение вы овладеваете магией, используя древние тексты и научные методы, чтобы проникнуть в её суть. Ваша магия — это инструмент, дисциплина и путь к истине.",
        "keywords": "волшебник",
        "trait": [
            "волшебник"
        ],
        "prepared": true,
        "rarity": "common",
        "spellTradition": "арканный",
        "spellProgression": {
            "1": [
                5,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "2": [
                5,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "3": [
                5,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "4": [
                5,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "5": [
                5,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "6": [
                5,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "7": [
                5,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "8": [
                5,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "9": [
                5,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0
            ],
            "10": [
                5,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0
            ],
            "11": [
                5,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0
            ],
            "12": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0
            ],
            "13": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0
            ],
            "14": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0
            ],
            "15": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0
            ],
            "16": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0
            ],
            "17": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0
            ],
            "18": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0
            ],
            "19": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ],
            "20": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ]
        },
        "spellFocusPool": 1,
        "spellsClass": {
            "attack": "T",
            "class": "T"
        },
        "skillClass": "T",
        "isFeatLevelOne": false,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы, вероятно, стараетесь держаться подальше от сражения, тщательно оценивая, когда использовать свои заклинания.<br>Вы бережете свою самую мощную магию, чтобы вывести из строя грозных врагов и использовать свои чары, когда остаются только более слабые враги.Когда враги выкидывают такие трюки, как Невидимость / Invisibility или Полёт / Fly, вы отвечаете такими заклинаниями как Разоблачающий свет / Revealing Light или Земные оковы / Earthbind, уравнивая шансы для ваших союзников.</p>"
            },
            {
                "name": "social",
                "text": "<p>Вы предоставляете много знаний об арканных материях и решаете споры с помощью логики.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы находите магические ауры и определяете арканное значение обнаруженного магического писания или явления. Когда вы сталкиваетесь с необычным препятствием, мешающим дальнейшему исследованию, то вероятно у вас есть свиток, который облегчит его преодоление.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы изучаете новые заклинания, создаете магические предметы или пишете свитки для своей группы, а также в дополнение к заклинаниям ищете новые и захватывающие формулы. Вы можете даже наладить научные связи и основать собственную школу или гильдию.</p>"
            },
            {
                "name": "you",
                "text": "<li><p>Испытывать неутолимое интеллектуальное любопытство по поводу того, как все устроено в мире вокруг вас, в частности, магия</p></li><li><p>Искренне верить, что ваша школа магии наилучшая(если вы специалист) или что истинное мастерство магии требует знания всех школ(если вы универсалист)</p></li><li><p>Использовать эзотерический жаргон и технические термины, чтобы точно описать мельчайшие детали магических эффектов, даже если разница, вероятно, неуловима для других людей</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Считают вас невероятно могущественным и потенциально опасным</p></li><li><p>Боятся того, что ваша магия может сделать с их умами, телами и душами, и просят вас избегать произнесения заклинаний в нормальной компании, поскольку мало кто может определить, является ли одно из ваших заклинаний безвредным или злонамеренным, пока не станет слишком поздно</p></li><li><p>Полагают, что вы можете легко решить все их проблемы, от ненастной погоды до плохой урожайности, и просят вас о заклинаниях, которые могут помочь им получить все, что они пожелают</p></li>"
            }
        ]
    },
    {
        "name": "Алхимик",
        "img": "systems/pf2e/icons/classes/alchemist.webp",
        "hitpoints": 8,
        "keyAbility": [
            "intellect"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 1
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "crafting"
        ],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core 2",
        "key": "alchemist",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T",
            "Alchemical Bombs": "T",
            "bombs": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "E",
            "will": "T"
        },
        "modification": [
            {
                "key": "bombs",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 7
            },
            {
                "key": "simple",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 7
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 7
            },
            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 9
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 13,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "fortitude",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "reflex",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "bombs",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 15
            },
            {
                "key": "simple",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 15
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 15
            },
            {
                "key": "greater-weapon-specialization",
                "type": "greater-weapon-specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            },
            {
                "key": "light",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 19
            },
            {
                "key": "medium",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 19
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 17
            }
        ],
        "archetypeFeatures": [
            "alchemy",
            "chemical-hardiness",
            "alchemical-weapon-mastery",
            "perception-expertise",
            "explosion-dodger",
            "medium-armor-mastery",
            "will-expertise",
            "research-field",
            "medium-armor-expertise",
            "weapon-specialization",
            "double-brew",
            "alchemical-weapon-expertise",
            "greater-field-discovery",
            "alchemical-expertise",
            "abundant-vials",
            "advanced-vials",
            "field-discovery",
            "powerful-alchemy",
            "alchemical-mastery"
        ],
        "hint": "Для вас нет более прекрасного зрелища, чем странное варево, бурлящее в мензурке, и вы с самозабвением поглощаете свои гениальные эликсиры. Вы очарованы раскрытием тайн науки и природы, и постоянно, в своей лаборатории или прямо на ходу, экспериментируете с изобретательными составами на все случаи жизни. Вы бесстрашны в рисковой ситуации, бросая в своих врагов взрывчатые и токсичные склянки. Ваш уникальный путь к величию проложен алхимическими отварами, которые доводят ваш ум и тело до предела.",
        "keywords": "алхимик",
        "trait": [
            "алхимик"
        ],
        "rarity": "common",
        "skillClass": "T",
        "isFeatLevelOne": true,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы бросаете бомбы в своих врагов, надоедаете им и поддерживаете остальную часть своей группы сильнодействующими эликсирами. На более высоких уровнях, ваши мутагены деформируют ваше тело в стойкое и мощное оружие.</p>"
            },
            {
                "name": "social",
                "text": "<p>Вы предоставляете знания и опыт об алхимических предметах и связанных с ними секретах, таких как яды и болезни.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы на чеку, держа бомбы наготове, в тоже время давая советы по всему алхимическому и таинственному.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы экспериментируете в алхимической лаборатории, варите эликсиры, создаёте бомбы и продвигаете свои алхимические знания.</p>"
            },
            {
                "name": "you",
                "text": "<li><p>Наслаждаться вознёй со странными формулами и алхимическими реагентами, часто с безрассудством и целеустремлённой самоотдачей.</p></li><li><p>Получать удовольствие от того, чтобы сеять хаос с помощью сделанных вами алхимических смесей.</p></li><li><p>Бесконечно экспериментировать, чтобы обнаружить новые, более мощные алхимические инструменты.</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Думают, что вы какой-то чародей или эксцентричный волшебник, и не понимают, что вы не сотворяете заклинаний.</p></li><li><p>Не понимают ваше рвение к алхимии, креативности и изобретательству.</p></li><li><p>Предполагают, что если вы не вызвали катастрофу своими экспериментами, то неизбежно сделаете это позже.</p></li>"
            }
        ]
    },
    {
        "name": "Тауматург",
        "img": "systems/pf2e/icons/default-icons/class.svg",
        "hitpoints": 8,
        "keyAbility": [
            "charisma"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 1
            }
        ],
        "skillTrained": [
            "arcana",
            "nature",
            "occultism",
            "religion"
        ],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Dark Archive (Remastered)",
        "key": "thaumaturge",
        "Perception": "E",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "M",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 9
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "reflex",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 3
            },

            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 7,
                "criticalSuccess": true
            },
            {
                "key": "will",
                "upgrade": "L",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 13,
                "criticalFailure": "failure",
                "damageFailureReduction": 0.5
            },

            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "martial",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },

            {
                "key": "martial",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },

            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },

            {
                "key": "simple",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },

            {
                "key": "martial",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },

            {
                "key": "unarmed",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },

            // Защита
            {
                "key": "light",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "medium",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },

            {
                "key": "medium",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },

            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },

            {
                "key": "light",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },

            {
                "key": "medium",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },

            {
                "key": "unarmored",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },


            // КС класса Тауматурга
            {
                "key": "class",
                "upgrade": "T",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "class",
                "upgrade": "E",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 9
            },

            {
                "key": "class",
                "upgrade": "M",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 17
            },

            // Эзотерические знания
            {
                "key": "esoteric-lore",
                "upgrade": "T",
                "type": "Skill",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "esoteric-lore",
                "upgrade": "E",
                "type": "Skill",
                "mode": "Upgrade",
                "level": 3
            },

            {
                "key": "esoteric-lore",
                "upgrade": "M",
                "type": "Skill",
                "mode": "Upgrade",
                "level": 7
            },

            {
                "key": "esoteric-lore",
                "upgrade": "L",
                "type": "Skill",
                "mode": "Upgrade",
                "level": 15
            },


            // Специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },

            // Выдающаяся специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            }
        ],
        "archetypeFeatures": [
            "unlimited-esoterica",
            "first-implement-and-esoterica",
            "greater-weapon-specialization",
            "medium-armor-expertise",
            "second-adept",
            "esoteric-lore",
            "third-implement",
            "implements-empowerment",
            "earned-resilience",
            "implement-paragon",
            "weapon-mastery",
            "intensify-vulnerability",
            "thaumaturgic-expertise",
            "weapon-expertise",
            "second-implement",
            "perception-mastery",
            "perfected-mind",
            "implement-adept",
            "weapon-specialization",
            "thaumaturgic-mastery",
            "exploit-vulnerability",
            "medium-armor-mastery",
            "reflex-expertise",
            "disciplined-mind"
        ],
        "hint": "",
        "keywords": "тауматург",
        "trait": [
            "тауматург"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Варвар",
        "img": "systems/pf2e/icons/classes/barbarian.webp",
        "hitpoints": 12,
        "keyAbility": [
            "strength"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 1
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "athletics"
        ],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core 2",
        "key": "barbarian",
        "Perception": "E",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            {
                "type": "Speed",
                "mode": "Bonus",
                "key": "land",
                "valueBonus": 5,
                "typeBonus": "status"
            },
            {
                "key": "simple",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "martial",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "unarmed",
                "mode": "Upgrade",
                "upgrade": "E",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "fortitude",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 11
            },
            {
                "key": "fortitude",
                "upgrade": "L",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "simple",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "unarmed",
                "mode": "Upgrade",
                "upgrade": "M",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "greater-weapon-specialization",
                "type": "greater-weapon-specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            },
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 15
            },
            {
                "key": "Perception",
                "upgrade": "M",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 17
            },
            {
                "key": "light",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 19
            },
            {
                "key": "medium",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "criticalSpecialization": true,
                "level": 19
            },
            {
                "key": "unarmored",
                "mode": "Upgrade",
                "upgrade": "M",
                "type": "Defence",
                "level": 19
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 19
            }
        ],
        "archetypeFeatures": [
            "greater-juggernaut",
            "brutality",
            "medium-armor-expertise",
            "reflex-expertise",
            "perception-mastery",
            "revitalizing-rage",
            "weapon-mastery",
            "indomitable-will",
            "juggernaut",
            "furious-footfalls",
            "devastator",
            "greater-weapon-specialization-barbarian",
            "mighty-rage",
            "armor-mastery",
            "weapon-specialization",
            "raging-resistance",
            "instinct",
            "rage",
            "quick-tempered"
        ],
        "hint": "Ярость поглощает вас в бою. Вы наслаждаетесь тем, что сеете хаос и используете мощное оружие, чтобы пробиваться через своих врагов, полагаясь на невероятную живучесть, не нуждаясь в сложных техниках или строгих тренировках. Ваши приступы ярости проистекают из свирепого инстинкта, который вы можете ассоциировать с животным, духом или какой-то частью себя. Для многих варваров грубая сила — это молот, а каждая проблема выглядит как гвоздь, в то время как другие пытаются сдержать в себе бурю эмоций и высвободить свой гнев только тогда, когда это действительно важно.",
        "keywords": "варвар",
        "trait": [
            "варвар"
        ],
        "rarity": "common",
        "skillClass": "T",
        "isFeatLevelOne": true,
        "description": [
            {
                "name": "encounter",
                "text": "<p> Вы призываете свою ярость и бросаетесь на передовую, чтобы пробить себе путь.Ваша лучшая защита - нападение, вам нужно расправиться с врагам, прежде, чем они смогут воспользоваться вашей относительно слабой защитой.</p>"
            },
            {
                "name": "social",
                "text": "<p> Вы используете запугивание, чтобы получить то, что вам нужно, особенно когда более мягкое убеждение не может решить задачу.</p>"
            },
            {
                "name": "exporation",
                "text": "<p> Вы высматриваете опасность, готовые в одно мгновение броситься в бой. Вы взбираетесь на сложную каменную стену и сбрасываете веревку, чтобы другие последовали за вами, и идете вброд через опасные водные потоки, чтобы добраться до спрятанного переключателя под поверхностью воды.Если надо что - то сломать, то вы тут как тут.</p>"
            },
            {
                "name": "downtime",
                "text": "Вы можете отправиться в таверну чтобы покутить, дополнить устрашающую легенду о своих могучих подвигах или набрать последователей, чтобы самому стать военачальником.</p>"
            },
            {
                "name": "you",
                "text": "<li><p>  Иметь укоренившийся источник гнева, ненависти или разочарования</p></li><li><p>Предпочитать прямой подход тому, который утомительный и требует терпения</p></li><li><p>Заниматься интенсивной физической подготовкой и бить любого, кто говорит, что это противоречит вашему отвращению к терпению и скуке</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Полагаются на вашу храбрость и силу, и верят, что вы можете постоять за себя в бою</p></li><li><p>Считают вас нецивилизованным или грубым невежей, непригодным для высшего общества</p></li><li><p>Верят, что вы верны своим друзьям и союзникам, и никогда не сдадитесь, пока не окончен бой</p></li>"
            }
        ]
    },
    {
        "name": "Монах",
        "img": "systems/pf2e/icons/classes/monk.webp",
        "hitpoints": 10,
        "keyAbility": [
            "strength",
            "dexterity"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [],
        "skillTrainedPoints": 4,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core 2",
        "key": "monk",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "E",
            "light": "U",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "E",
            "will": "E"
        },
        "modification": [
            {
                "key": "speed",
                "mode": "Bonus",
                "valueBonus": 10,
                "typeBonus": "status",
                "level": 3
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "simple",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "speed",
                "mode": "Bonus",
                "valueBonus": 15,
                "typeBonus": "status",
                "level": 7
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "simple",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "speed",
                "mode": "Bonus",
                "valueBonus": 20,
                "typeBonus": "status",
                "level": 11
            },
            {
                "key": "speed",
                "mode": "Bonus",
                "valueBonus": 25,
                "typeBonus": "status",
                "level": 15
            },
            {
                "key": "unarmored",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 17
            },
            {
                "key": "speed",
                "mode": "Bonus",
                "valueBonus": 30,
                "typeBonus": "status",
                "level": 19
            }
        ],
        "archetypeFeatures": [
            "mystic-strikes",
            "weapon-specialization",
            "second-path-to-perfection",
            "greater-weapon-specialization",
            "incredible-movement",
            "expert-strikes",
            "flurry-of-blows",
            "perception-expertise",
            "graceful-legend",
            "powerful-fist",
            "graceful-mastery",
            "monk-expertise",
            "metal-strikes",
            "adamantine-strikes",
            "path-to-perfection",
            "perfected-form",
            "third-path-to-perfection",
            "master-strikes"
        ],
        "hint": "Разум и дух, вот что дает силу вашему кулаку. Вы стремитесь к совершенству, превращая своё тело в безупречный инструмент, а ум — в дисциплинированный оплот мудрости. Вы — ожесточенный боец, известный своими навыками боевых искусств и боевыми стойками.",
        "keywords": "монах",
        "trait": [
            "монах"
        ],
        "rarity": "common",
        "skillClass": "T",
        "isFeatLevelOne": true,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы мчитесь в бой, уклоняясь или прыгая мимо препятствий, вытворяя акробатические трюки. Вы наносите удары врагам, обрушивая на них шквал атак голыми руками или владея специальным оружием.</p>"
            },
            {
                "name": "social",
                "text": "<p>Ваша восприимчивость позволяет вам видеть ложь насквозь, а философская подготовка - постичь любую ситуацию.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы взбираетесь на стены, уклоняетесь от ловушек, преодолеваете препятствия и перепрыгиваете через ямы. Обычно вы остаетесь вне группы, чтобы защитить её более уязвимых членов.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы усердно тренируетесь, едите здоровую пищу, занимаетесь медитацией и изучаете различные философии. Ещё вы можете заняться ремеслом, которое стремитесь отточить до идеала.</p>"
            },
            {
                "name": "you",
                "text": "<li><p>Придерживаетесь режима физической тренировки и медитации</p></li><li><p>Встречаете невзгоды с холодным расчётом и спокойствием</p></li><li><p>Думаете о самосовершенствовании, оставаясь в гармонии с собой</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Восхищаются вашими физическими достижениями</p></li><li><p>Считают вас заносчивым из-за ваших принципов</p></li><li><p>Обращаются к вам за философскими советами</p></li>"
            }
        ]
    },
    {
        "name": "Рейнджер",
        "img": "systems/pf2e/icons/classes/ranger.webp",
        "hitpoints": 10,
        "keyAbility": [
            "dexterity",
            "strength"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "survival"
        ],
        "skillTrainedPoints": 4,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core",
        "key": "ranger",
        "Perception": "E",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "E",
            "will": "T"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "M",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "perception",
                "upgrade": "L",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 15
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 7,
                "criticalSuccess": true
            },
            {
                "key": "reflex",
                "upgrade": "L",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 15,
                "criticalFailure": "failure",
                "damageFailureReduction": 0.5
            },
            {
                "key": "will",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 3
            },

            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "martial",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "martial",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "simple",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },

            // Защита
            {
                "key": "light",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "medium",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "medium",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "light",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "medium",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },

            // КС класса рейнджера
            {
                "key": "class",
                "upgrade": "T",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "class",
                "upgrade": "E",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "class",
                "upgrade": "M",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 17
            },

            // Специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },

            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            }
        ],
        "archetypeFeatures": [
            "masterful-hunter",
            "weapon-specialization",
            "trackless-journey",
            "natures-edge",
            "medium-armor-expertise",
            "greater-natural-reflexes",
            "wardens-endurance",
            "natural-reflexes",
            "medium-armor-mastery",
            "greater-weapon-specialization",
            "hunters-edge",
            "swift-prey",
            "perception-legend",
            "ranger-weapon-expertise",
            "martial-weapon-mastery",
            "unimpeded-journey",
            "hunt-prey",
            "will-expertise",
            "ranger-expertise",
            "perception-mastery"
        ],
        "hint": "",
        "keywords": "рейнджер",
        "trait": [
            "рейнджер"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Призыватель",
        "img": "systems/pf2e/icons/classes/summoner.webp",
        "hitpoints": 10,
        "keyAbility": [
            "charisma"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 1
            }
        ],
        "skillTrained": [],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Secrets of Magic",
        "key": "summoner",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "U",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "T",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 3
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "fortitude",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11,
                "criticalSuccess": true
            },

            {
                "key": "reflex",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },

            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 15,
                "criticalSuccess": true
            },

            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 11
            },

            // Атаки эйдолона
            {
                "key": "eidolon-unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "eidolon-unarmed",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },

            // Защита
            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },

            // Защита эйдолона
            {
                "key": "eidolon-unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "eidolon-unarmored",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },

            // Атаки заклинаниями
            {
                "key": "spell-attack",
                "upgrade": "T",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "spell-attack",
                "upgrade": "E",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "spell-attack",
                "upgrade": "M",
                "type": "Spell Attack",
                "mode": "Upgrade",
                "level": 17
            },

            // КС заклинаний
            {
                "key": "spell-dc",
                "upgrade": "T",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "spell-dc",
                "upgrade": "E",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "spell-dc",
                "upgrade": "M",
                "type": "Spell DC",
                "mode": "Upgrade",
                "level": 17
            },

            // Специализация оружия призывателя
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 13,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },

            // Специализация оружия эйдолона
            {
                "key": "Eidolon Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },

            {
                "key": "Eidolon Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            }
        ],
        "archetypeFeatures": [
            "eidolon",
            "eidolon-defensive-expertise",
            "weapon-specialization",
            "expert-spellcaster",
            "instant-manifestation",
            "shared-vigilance",
            "eidolon-unarmed-mastery",
            "shared-resolve",
            "unlimited-signature-spells",
            "evolution-feat",
            "twin-juggernauts",
            "greater-eidolon-specialization",
            "defensive-robes",
            "simple-weapon-expertise",
            "summoner-spellcasting",
            "spell-repertoire",
            "eidolon-unarmed-expertise",
            "eidolon-symbiosis",
            "master-spellcaster",
            "eidolon-weapon-specialization",
            "eidolon-transcendence",
            "eidolon-defensive-mastery",
            "shared-reflexes",
            "link-spells"
        ],
        "hint": "",
        "keywords": "призыватель",
        "trait": [
            "призыватель"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Стрелок",
        "img": "systems/pf2e/icons/classes/gunslinger.webp",
        "hitpoints": 8,
        "keyAbility": [
            "dexterity"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 1
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Guns & Gears",
        "key": "gunslinger",
        "Perception": "E",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T",
            "Simple Firearms, Martial Firearms": "E"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "E",
            "will": "T"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "perception",
                "upgrade": "M",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "perception",
                "upgrade": "L",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 19
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "fortitude",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 17,
                "criticalSuccess": true
            },

            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "reflex",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11,
                "criticalSuccess": true
            },

            {
                "key": "will",
                "upgrade": "T",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 3
            },

            // Атаки
            // Огнестрельное оружие и арбалеты
            {
                "key": "firearms",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "crossbow",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "advanced-firearms",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "advanced-crossbow",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "martial",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            // Оружейное мастерство стрелка
            {
                "key": "firearms",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "crossbow",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "advanced-firearms",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "advanced-crossbow",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "martial",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },

            // Стрелковая легенда
            {
                "key": "firearms",
                "upgrade": "L",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "crossbow",
                "upgrade": "L",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "advanced-firearms",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "advanced-crossbow",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "simple",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },

            // Защита
            {
                "key": "light",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "medium",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "medium",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },

            {
                "key": "light",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "medium",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },

            // КС класса стрелка
            {
                "key": "class",
                "upgrade": "T",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "class",
                "upgrade": "E",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "class",
                "upgrade": "M",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 17
            },

            // Специализация оружия
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },

            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            }
        ],
        "archetypeFeatures": [
            "shootists-edge",
            "gunslinger-expertise",
            "greater-deed",
            "advanced-deed",
            "medium-armor-expertise",
            "gunslingers-way",
            "slingers-precision",
            "perception-legend",
            "medium-armor-mastery",
            "gunslinging-legend",
            "blast-dodger",
            "lead-constitution",
            "weapon-specialization",
            "stubborn",
            "gunslinger-weapon-mastery",
            "perception-mastery",
            "greater-weapon-specialization"
        ],
        "hint": "",
        "keywords": "стрелок",
        "trait": [
            "стрелок"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Ведьма",
        "img": "systems/pf2e/icons/classes/witch.webp",
        "hitpoints": 6,
        "keyAbility": [
            "intellect"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 1
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core",
        "key": "witch",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "U",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "spells",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 7
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 7
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "simple",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 11
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 11
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 13,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "spells",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 15
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 15
            },
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 17
            },
            {
                "key": "spells",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 19
            },
            {
                "key": "class",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 19
            }
        ],
        "archetypeFeatures": [
            "weapon-expertise",
            "master-spellcaster",
            "legendary-spellcaster",
            "perception-expertise",
            "will-of-the-pupil",
            "defensive-robes",
            "weapon-specialization",
            "reflex-expertise",
            "witch-spellcasting",
            "familiar-witch",
            "hex-spells",
            "patron",
            "magical-fortitude",
            "expert-spellcaster",
            "patrons-gift"
        ],
        "hint": "Вы повелеваете могущественной магией не через изучение или преданность какому-либо идеалу, но как сосуд или представитель таинственного, потустороннего покровителя, которого даже вы не совсем понимаете. Эта сущность может быть тайным божеством, могущественной феей, проявлением природных энергий, древним духом или любым другим могущественным сверхъестественным существом.",
        "keywords": "ведьма",
        "prepared": true,
        "trait": [
            "ведьма"
        ],
        "rarity": "common",
        "spellTradition": "",
        "spellProgression": {
            "1": [
                5,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "2": [
                5,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "3": [
                5,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "4": [
                5,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "5": [
                5,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "6": [
                5,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "7": [
                5,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "8": [
                5,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "9": [
                5,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0
            ],
            "10": [
                5,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0
            ],
            "11": [
                5,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0
            ],
            "12": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0
            ],
            "13": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0
            ],
            "14": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0
            ],
            "15": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0
            ],
            "16": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0
            ],
            "17": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0
            ],
            "18": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0
            ],
            "19": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ],
            "20": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ]
        },
        "spellFocusPool": 1,
        "spellsClass": {
            "attack": "T",
            "class": "T"
        },
        "skillClass": "T",
        "isFeatLevelOne": false,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы колдуете заклинания, чтобы изменить ход сражения. Вы используете магические сглазы, чтобы мешать врагам и помогать союзникам, в то же время используя более мощные заклинания, чтобы контролировать поле боя, исцелять или вредить, при помощи вашего экстраординарного фамильяра.</p>"
            },
            {
                "name": "social",
                "text": "<p>Вы даёте знания по множеству тем, включая различные магические вопросы, и можете призывать магию своего покровителя, чтобы очаровывать или обманывать других.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы остаетесь бдительными к магическим ловушкам и сокровищам, используя хитроумный набор заклинаний, чтобы преодолеть препятствия. Ваш фамильяр может помочь вам своим собственным набором необычных умений.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы варите зелья, создаёте магические предметы, или охотитесь за новыми заклинаниями, которые выучит ваш фамильяр. Вы можете попытаться узнать больше о своем покровителе.</p>"
            },
            {
                "name": "you",
                "text": "<li><p>Стремиться узнать больше о вашем покровителе или фамильяре</p></li><li><p>Искать новые источники магии, такие как свитки и книги заклинаний</p></li><li><p>Считать своего фамильяра как надежного союзника или вынужденную помеху</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Задаются вопросом о природе вашего покровителя и источнике вашей магии</p></li><li><p>Ценят вашу способность помогать им магией</p></li><li><p>Стараются не обижать вас, опасаясь сглаза</p></li>"
            }
        ]
    },
    {
        "name": "Оракул",
        "img": "systems/pf2e/icons/classes/oracle.webp",
        "hitpoints": 8,
        "keyAbility": [
            "charisma"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 1
            }
        ],
        "skillTrained": [
            "religion"
        ],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core 2",
        "key": "oracle",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "U",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "Perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "weapon-specialization",
                "type": "weapon-specialization",
                "level": 13,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "will",
                "upgrade": "L",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 17
            }
        ],
        "archetypeFeatures": [
            "mysterious-resolve",
            "oracle-spellcasting",
            "mystery",
            "signature-spells",
            "legendary-spellcaster",
            "oracular-clarity",
            "oracular-curse",
            "weapon-specialization",
            "weapon-expertise",
            "premonition-reflexes",
            "greater-mysterious-resolve",
            "revelation-spells",
            "light-armor-expertise",
            "major-curse",
            "extreme-curse",
            "magical-fortitude",
            "expert-spellcaster",
            "divine-access",
            "spell-repertoire",
            "master-spellcaster",
            "oracular-senses"
        ],
        "prepared": false,
        "hint": "Ваш проводник божественной силы сторонится традиционных каналов молитвы и служения - вместо этого вы собираете сакральные истины, которые выходят за рамки любого отдельного божества. Вы понимаете великие тайны вселенной, воплощенные во всеобъемлющих концепциях, которые превосходят добро и зло или хаос и порядок, независимо от того, воспринимаете ли вы общую связь между несколькими божествами или полностью обходите стороной их силу. Вы исследуете одну из этих тайн и используете ее силу, чтобы творить чудесные заклинания, но эта сила стоит ужасную цену: чем больше вы ее используете, тем сильнее становится проклятие. Ваши умения - обоюдоострый меч, который вы можете поддерживать как божественный инструмент или как проклятие богов.",
        "keywords": "оракул",
        "trait": [
            "оракул"
        ],
        "rarity": "сommon",
        "spellTradition": "сакральный",
        "spellProgression": {
            "1": [
                5,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "2": [
                5,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "3": [
                5,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "4": [
                5,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "5": [
                5,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "6": [
                5,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "7": [
                5,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "8": [
                5,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "9": [
                5,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0,
                0
            ],
            "10": [
                5,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0,
                0
            ],
            "11": [
                5,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0,
                0
            ],
            "12": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0,
                0
            ],
            "13": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0,
                0
            ],
            "14": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0,
                0
            ],
            "15": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0,
                0
            ],
            "16": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0,
                0
            ],
            "17": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                2,
                0
            ],
            "18": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                0
            ],
            "19": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ],
            "20": [
                5,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                1
            ]
        },
        "spellFocusPool": 2,
        "spellsClass": {
            "attack": "T",
            "class": "T"
        },
        "skillClass": "T",
        "isFeatLevelOne": false,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы используете свое таинство, чтобы усилить себя в бою, уравновешивая чудесные эффекты с возрастающей степенью вашего проклятия, поскольку противоречивые божественные требования перенапрягают ваше физическое тело. Вы сотворяете заклинания, чтобы помочь своим союзникам и вредить своим врагам, или, в зависимости от вашего таинства, вы можете сами вступить в бой.</p>"
            },
            {
                "name": "social",
                "text": "<p>Вы полагаетесь на озарения, почерпнутые из вашего таинства. Вы можете использовать свое проклятие, чтобы запугать людей или скрывать его последствия, чтобы не выделяться и слиться с толпой.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы сосредотачиваетесь, чтобы взять под контроль ужасные метафизические конфликты, вызывающие ваше проклятие, чтобы вы позднее могли снова использовать силу своего таинства. Вы остаетесь в курсе сверхъестественных сил, действующих вокруг вас, возможно, заглядывая в будущее, чтобы получить озарения.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы можете попытаться узнать больше о своем таинстве и божественных источниках, питающих вашу силу. Общение с другими интересующимися вашей тайной, может облегчить жизнь с вашим проклятием. Вы можете присоединиться к существующей религии или даже организовать свое собственное верование, посвященное вашей тайне.</p>"
            },
            {
                "name": "you",
                "text": "<li><p>Считать свои силы оракула благословением, проклятьем или и тем и другим</p></li><li><p>Довести себя до предела того, что вы можете выдержать, чтобы творить великую магию</p></li><li><p>Полагаться на магические предметы, чтобы иметь запас безопасной и более надежной магии</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Не понимают, что ваше колдовство основывается на божественной силе, и вместо этого верят, что вы управляете чуждыми, и возможно злыми силами</p></li><li><p>Предполагают, что вы совершили какой-то ужасный проступок, чтобы стать проклятым богами</p></li><li><p>Восхищаются вашей решимостью и приносимыми жертвами, чтобы совершать удивительные поступки</p></li>"
            }
        ]
    },
    {
        "name": "Сорвиголова",
        "img": "systems/pf2e/icons/classes/swashbuckler.webp",
        "hitpoints": 10,
        "keyAbility": [
            "dexterity"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 1
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "acrobatics"
        ],
        "skillTrainedPoints": 4,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core 2",
        "key": "swashbuckler",
        "Perception": "E",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "U",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "T",
            "reflex": "E",
            "will": "E"
        },
        "modification": [
            {
                "key": "speed",
                "mode": "Bonus",
                "valueBonus": 5,
                "typeBonus": "status",
                "condition": "hasPanache",
                "level": 1
            },
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 3
            },
            {
                "key": "martial",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "simple",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "reflex",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 7
            },
            {
                "key": "speed",
                "mode": "Bonus",
                "valueBonus": 10,
                "typeBonus": "status",
                "condition": "hasPanache",
                "level": 7
            },
            {
                "key": "perception",
                "upgrade": "M",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "light",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "simple",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "reflex",
                "upgrade": "L",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 17
            },
            {
                "key": "light",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 19
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 19
            }
        ],
        "archetypeFeatures": [
            "panache",
            "precise-strike",
            "confident-finisher",
            "weapon-specialization",
            "vivacious-speed",
            "weapon-expertise",
            "eternal-confidence",
            "assured-evasion",
            "greater-weapon-specialization",
            "swashbucklers-style",
            "reinforced-ego",
            "stylish-tricks",
            "perception-mastery",
            "light-armor-mastery",
            "stylish-combatant",
            "opportune-riposte",
            "exemplary-finisher",
            "light-armor-expertise",
            "fortitude-expertise",
            "confident-evasion",
            "keen-flair",
            "swashbuckler-expertise",
            "continuous-flair",
            "martial-weapon-mastery"
        ],
        "hint": "Для вас битва — танец, в котором вы стильно и изящно двигаетесь среди врагов. Вы со вкусом мечетесь между бойцов и наносите мощные завершающие движения с легким движением запястья и блеском клинка.",
        "keywords": "сорвиголова",
        "trait": [
            "сорвиголова"
        ],
        "rarity": "common",
        "skillClass": "T",
        "isFeatLevelOne": true,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы выпендриваетесь, чтобы получить кураж, уклоняясь от ударов врага и отвечая быстрыми контратаками. В зависимости от стиля, вы можете танцевать среди врагов или обманывать их.</p>"
            },
            {
                "name": "social",
                "text": "<p>Вы в равной степени можете очаровать или запугать других. Вы можете быть искусным светским львом или создавать отвлекающие маневры.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы внимательно следите за обстановкой, всегда готовы броситься в бой со своим стилем и бравадой. Вы смело взаимодействуете с окружением.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы можете кутить в таверне, ремонтировать своё вооружение или тренироваться. Для сохранения репутации вы можете создать организацию или завоевать поклонников.</p>"
            },
            {
                "name": "you",
                "text": "<li><p>Изображаете себя героическим смельчаком или плутоватым хвастуном</p></li><li><p>Высоко цените себя, будучи уверенным в своих умениях</p></li><li><p>Регулярно практикуете свои навыки и движения</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Восхищаются вашей театральностью и мастерством владения клинком</p></li><li><p>Считают вас высокомерным, пока не узнают лучше</p></li><li><p>Недооценивают вашу угрозу до первого удара</p></li>"
            }
        ]
    },
    {
        "name": "Герой",
        "img": "systems/pf2e/icons/default-icons/class.svg",
        "hitpoints": 10,
        "keyAbility": [
            "dexterity",
            "strength"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "religion"
        ],
        "skillTrainedPoints": 3,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder War of Immortals",
        "key": "exemplar",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "U"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            // Восприятие
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "perception",
                "upgrade": "M",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 17
            },

            // Спасброски
            {
                "key": "fortitude",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "fortitude",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 15,
                "criticalSuccess": true
            },

            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },

            {
                "key": "will",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 7,
                "criticalSuccess": true
            },
            {
                "key": "will",
                "upgrade": "L",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 13,
                "criticalSuccess": true,
                "criticalFailure": "failure",
                "damageFailureReduction": 0.5
            },

            // Атаки
            {
                "key": "simple",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "martial",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmed",
                "upgrade": "T",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "simple",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "martial",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 5
            },

            {
                "key": "simple",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "type": "Attack",
                "mode": "Upgrade",
                "level": 13
            },


            // Защита
            {
                "key": "light",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "medium",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "unarmored",
                "upgrade": "T",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 1
            },

            {
                "key": "light",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "medium",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 13
            },

            {
                "key": "light",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "medium",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "type": "Defence",
                "mode": "Upgrade",
                "level": 19
            },


            // КС класса героя
            {
                "key": "class",
                "upgrade": "T",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 1
            },
            {
                "key": "class",
                "upgrade": "E",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "class",
                "upgrade": "M",
                "type": "DC Class",
                "mode": "Upgrade",
                "level": 17
            },


            // // Специализация оружия
            // {
            //     "key": "Weapon Specialization",
            //     "type": "Weapon Specialization",
            //     "level": 7,
            //     "bonusDamage": {
            //         "E": 2,
            //         "M": 3,
            //         "L": 4
            //     }
            // },

            // {
            //     "key": "Weapon Specialization",
            //     "type": "Weapon Specialization",
            //     "level": 15,
            //     "bonusDamage": {
            //         "E": 4,
            //         "M": 6,
            //         "L": 8
            //     }
            // },


            // Духовные удары
            {
                "key": "Spiritual Strikes",
                "type": "Spiritual Damage",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },

            {
                "key": "Spiritual Strikes",
                "type": "Spiritual Damage",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            }
        ],
        "archetypeFeatures": [
            "shield-block",
            "burnished-armor-mastery",
            "perception-expertise",
            "divine-premonition",
            "sovereignty-epithet",
            "greater-spirit-striking",
            "mortality-reforged",
            "deific-mastery",
            "root-epithet",
            "greater-unassailable-soul",
            "weapon-expertise",
            "divine-weapon-mastery",
            "burnished-armor-expertise",
            "spirit-striking",
            "perception-mastery",
            "humble-strikes",
            "unassailable-soul",
            "dominion-epithet",
            "divine-spark-and-ikons",
            "godly-expertise"
        ],
        "hint": "",
        "keywords": "герой",
        "trait": [
            "герой"
        ],
        "rarity": "common",
        "skillClass": "T",
        "description": []
    },
    {
        "name": "Чемпион",
        "img": "systems/pf2e/icons/classes/champion.webp",
        "hitpoints": 10,
        "keyAbility": [
            "dexterity",
            "strength"
        ],
        "attributeBoost": [
            {
                "name": "Сила",
                "key": "strength",
                "value": 0
            },
            {
                "name": "Ловкость",
                "key": "dexterity",
                "value": 0
            },
            {
                "name": "Телосложение",
                "key": "constitution",
                "value": 0
            },
            {
                "name": "Интеллект",
                "key": "intellect",
                "value": 0
            },
            {
                "name": "Мудрость",
                "key": "wisdom",
                "value": 0
            },
            {
                "name": "Харизма",
                "key": "charisma",
                "value": 0
            }
        ],
        "skillTrained": [
            "religion"
        ],
        "skillTrainedPoints": 2,
        "skillTrainedChoice": [],
        "sourceKey": "Pathfinder Player Core 2",
        "key": "champion",
        "Perception": "T",
        "skillAttack": {
            "simple": "T",
            "martial": "T",
            "advanced": "U",
            "unarmed": "T"
        },
        "skillDefence": {
            "unarmored": "T",
            "light": "T",
            "medium": "T",
            "heavy": "T"
        },
        "saving": {
            "fortitude": "E",
            "reflex": "T",
            "will": "E"
        },
        "modification": [
            {
                "key": "martial",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "simple",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "unarmed",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 5
            },
            {
                "key": "heavy",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 7
            },
            {
                "key": "medium",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 7
            },
            {
                "key": "light",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 7
            },
            {
                "key": "unarmored",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 7
            },
            {
                "key": "Weapon Specialization",
                "type": "Weapon Specialization",
                "level": 7,
                "bonusDamage": {
                    "E": 2,
                    "M": 3,
                    "L": 4
                }
            },
            {
                "key": "class",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 9
            },
            {
                "key": "spells",
                "upgrade": "E",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 9
            },
            {
                "key": "reflex",
                "upgrade": "E",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "fortitude",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 9
            },
            {
                "key": "will",
                "upgrade": "M",
                "type": "Saving",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "perception",
                "upgrade": "E",
                "type": "Perception",
                "mode": "Upgrade",
                "level": 11
            },
            {
                "key": "heavy",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "medium",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "light",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "unarmored",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 13
            },
            {
                "key": "martial",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "simple",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "unarmed",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 13
            },
            {
                "key": "Greater Weapon Specialization",
                "type": "Greater Weapon Specialization",
                "level": 15,
                "bonusDamage": {
                    "E": 4,
                    "M": 6,
                    "L": 8
                }
            },
            {
                "key": "class",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "DC Class",
                "level": 17
            },
            {
                "key": "spells",
                "upgrade": "M",
                "mode": "Upgrade",
                "type": "Attack",
                "level": 17
            },
            {
                "key": "heavy",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 17
            },
            {
                "key": "medium",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 17
            },
            {
                "key": "light",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 17
            },
            {
                "key": "unarmored",
                "upgrade": "L",
                "mode": "Upgrade",
                "type": "Defence",
                "level": 17
            }
        ],
        "archetypeFeatures": [
            "armor-expertise",
            "champion-expertise",
            "reflex-expertise",
            "champion-mastery",
            "weapon-specialization",
            "deity-champion",
            "cause",
            "legendary-armor",
            "exalted-reaction",
            "devotion-spells",
            "shield-block",
            "blessing-of-the-devoted",
            "divine-will",
            "relentless-reaction",
            "weapon-expertise",
            "perception-expertise",
            "armor-mastery",
            "sacred-body",
            "heros-defiance",
            "greater-weapon-specialization",
            "martial-weapon-mastery"
        ],
        "hint": "Вы - посланник божества, преданный служитель, взявший на себя тяжелую ношу, и придерживающийся кодекса, который отличает вас от окружающих. В то время как чемпионы существуют для всех мировоззрений, как чемпион добра, вы даете уверенность и надежду невинным. У вас есть мощная защита, которой вы делитесь со своими союзниками и невинными очевидцами, а также святая сила, которую вы используете, чтобы положить конец угрозе зла. Ваша преданность даже привлекает внимание святых духов, которые помогают вам в путешествии.",
        "keywords": "чемпион",
        "trait": [
            "чемпион"
        ],
        "rarity": "common",
        "skillClass": "T",
        "spellsClass": {
            "attack": "T",
            "class": "T"
        },
        "isFeatLevelOne": true,
        "description": [
            {
                "name": "encounter",
                "text": "<p>Вы противостоите врагам в рукопашном бою, тщательно выбирая лучшую позицию, чтобы защитить своих союзников.</p>"
            },
            {
                "name": "social",
                "text": "<p>Вы - голос надежды, стремящийся достичь мирного решения, которое укрепит связи и принесет хорошие результаты для всех.</p>"
            },
            {
                "name": "exporation",
                "text": "<p>Вы преодолеваете как физические, так и духовные барьеры, вдохновляя ваших союзников своими действиями, и когда ваши товарищи-авантюристы просят об этом, даете моральное и этическое напутствие.</p>"
            },
            {
                "name": "downtime",
                "text": "<p>Вы проводите много времени в священных молитвах и размышлениях, тщательных тренировках, благотворительных делах и исполнении принципов своего кодекса, но это не значит, что у вас нет времени заняться ремеслом или хобби.</p>"
            },
            {
                "name": "you",
                "text": "<li><p>Верить, что всегда есть надежда, что добро восторжествует над злом, независимо от того, насколько мрачны шансы</p></li><li><p>Знать, что цель не оправдывает средства, поскольку злые деяния лишь увеличивают влияние зла</p></li><li><p>Иметь сильное чувство правильного и неправильного, и можете отчаяться, когда жадность или недальновидность порождают зло</p></li>"
            },
            {
                "name": "other",
                "text": "<li><p>Видят в вас символ надежды, особенно в период великой нужды</p></li><li><p>Беспокоятся, что вы втайне презираете их за то, что они не соответствуют вашим запредельным стандартам, или что вы непреклонны по отношению к компромиссам, когда это необходимо</p></li><li><p>Знают, что вы дали сакральные клятвы служения, и верят, что вы сдержите их</p></li>"
            }
        ]
    }
];