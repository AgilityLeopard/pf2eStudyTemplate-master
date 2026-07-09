import { PDFDocument } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'

export async function fillPdf(this1) {

    // Твой код заполнения PDF через pdf-lib
    const existingPdfBytes = await fetch('/vault/charsheetRu.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Регистрируем fontkit и готовим пдф
    pdfDoc.registerFontkit(fontkit);
    const form = pdfDoc.getForm();
    const fontBytes = await fetch('/fonts/Roboto.ttf').then(res => res.arrayBuffer());
    const customFont = await pdfDoc.embedFont(fontBytes);


    //Поля
    const nameField = form.getTextField('Character Name');
    const level = form.getTextField('LEVEL');

    /*Характеристики */
    const str = form.getTextField('STRENGTH STAT');
    const dex = form.getTextField('DEXTERITY STAT');
    const con = form.getTextField('CONSTITUTION STAT');
    const wis = form.getTextField('WISDOM STAT');
    const int = form.getTextField('INTELLIGENCE STAT');
    const cha = form.getTextField('CHARISMA STAT');



    const dexCheckbox = form.getCheckBox('DEXTERITY PARTIAL BOOST');
    this1.characterAttributes['dexterity'] % 2 !== 0 ? dexCheckbox.check() : dexCheckbox.uncheck();
    const strCheckbox = form.getCheckBox('STRENGTH PARTIAL BOOST');
    this1.characterAttributes['strength'] % 2 !== 0 ? strCheckbox.check() : strCheckbox.uncheck();
    const conCheckbox = form.getCheckBox('CONSTITUTION PARTIAL BOODST');
    this1.characterAttributes['constitution'] % 2 !== 0 ? conCheckbox.check() : conCheckbox.uncheck();
    const wisCheckbox = form.getCheckBox('WISDOM PARTIAL BOOST');
    this1.characterAttributes['wisdom'] % 2 !== 0 ? wisCheckbox.check() : wisCheckbox.uncheck();
    const intCheckbox = form.getCheckBox('INTELLIGENCE PARTIAL BOODST');
    this1.characterAttributes['intellect'] % 2 !== 0 ? intCheckbox.check() : intCheckbox.uncheck();
    const chaCheckbox = form.getCheckBox('CHARISMA PARTIAL BOOST');
    this1.characterAttributes['charisma'] % 2 !== 0 ? chaCheckbox.check() : chaCheckbox.uncheck();

    const strText = ((this1.characterAttributes['strength'] - 10) / 2 > 0) ? "+" + ((this1.characterAttributes['strength'] - 10) / 2) : ((this1.characterAttributes['strength'] - 10) / 2);
    const dexText = ((this1.characterAttributes['dexterity'] - 10) / 2 > 0) ? "+" + ((this1.characterAttributes['dexterity'] - 10) / 2) : ((this1.characterAttributes['dexterity'] - 10) / 2);
    const conText = ((this1.characterAttributes['constitution'] - 10) / 2 > 0) ? "+" + ((this1.characterAttributes['constitution'] - 10) / 2) : ((this1.characterAttributes['constitution'] - 10) / 2);
    const wisText = ((this1.characterAttributes['wisdom'] - 10) / 2 > 0) ? "+" + ((this1.characterAttributes['wisdom'] - 10) / 2) : ((this1.characterAttributes['wisdom'] - 10) / 2);
    const intText = ((this1.characterAttributes['intellect'] - 10) / 2 > 0) ? "+" + ((this1.characterAttributes['intellect'] - 10) / 2) : ((this1.characterAttributes['intellect'] - 10) / 2);
    const chaText = ((this1.characterAttributes['charisma'] - 10) / 2 > 0) ? "+" + ((this1.characterAttributes['charisma'] - 10) / 2) : ((this1.characterAttributes['charisma'] - 10) / 2);



    str.setText(String(strText));
    str.updateAppearances(customFont);
    dex.setText(String(dexText));
    dex.updateAppearances(customFont);
    con.setText(String(conText));
    con.updateAppearances(customFont);
    wis.setText(String(wisText));
    wis.updateAppearances(customFont);
    int.setText(String(intText));
    int.updateAppearances(customFont);
    cha.setText(String(chaText));
    cha.updateAppearances(customFont);
    /* */

    /* Черты */
    let skillFeat = ''

    this1.talents.forEach(item => {
        if (item.source === 'ancestry') {
            const skillPlace = item.level === 1 ? 'ANCESTRY FEAT' : 'SKILL FEAT ' + item.level + '-1';

            const skill = form.getTextField(skillPlace);
            skill.setText(String(item.name));
            skill.updateAppearances(customFont);
        }

        if (item.source === 'class') {
            const skillPlace = item.level === 1 ? 'CLASS FEATS & FEATURES' : 'CLASS FEAT ' + item.level + '-1';
            if (skillPlace === 'CLASS FEATS & FEATURES')
                skillFeat = item.name;
            else {
                const skill = form.getTextField(skillPlace);
                skill.setText(String(item.name));
                skill.updateAppearances(customFont);
            }
        }

        if (item.source === 'skill' && item.level !== 1) {
            const skillPlace = 'SKILL FEAT ' + item.level + '-2';
            const skill = form.getTextField(skillPlace);
            skill.setText(String(item.name));
            skill.updateAppearances(customFont);
        }

        if (item.source === 'general' && item.level !== 1) {
            const skillPlace = 'SKILL FEAT ' + item.level + '-3';
            const skill = form.getTextField(skillPlace);
            skill.setText(String(item.name));
            skill.updateAppearances(customFont);
        }




    })

    const excludeFeature = [];
    const classFeature = [];
    classFeature.push({
        place: 'CLASS FEATS & FEATURES',
        name: skillFeat
    })

    let grouped = [];
    /* Классовая особенность */
    if (this1.characterArchetype) {
        this1.characterArchetype.archetypeFeatures.forEach(item => {
            if (item.level === 1) {
                // excludeFeature.push(item.name);
                // classFeature.push({
                //     place: 'CLASS FEATS & FEATURES',
                //     name: item.name
                // });
                if (!grouped[item.level]) {
                    grouped[item.level] = [];
                }

                grouped[item.level].push(item.name);
            } else {
                if (!grouped[item.level]) {
                    grouped[item.level] = [];
                }

                grouped[item.level].push(item.name);

                excludeFeature.push(item.name);
            }
        });






        /* */
        // Скиллы
        Object.keys(grouped).forEach(level => {
            const items = grouped[level];

            if (Number(level) === 1) {
                // 👉 одна строка без разбивки
                classFeature.push({
                    place: 'CLASS FEATS & FEATURES',
                    name: items.join(', ')
                });

            } else {
                // 👉 обычная логика с переносами
                const lines = distributeToLines(items);

                lines.forEach((line, index) => {
                    if (!line) return;

                    classFeature.push({
                        place: `CLASS FEAT ${level - 1}-${index + 1}`,
                        name: line
                    });
                });
            }
        });


        classFeature.forEach(item => {
            if (item.name) {
                const skill = form.getTextField(item.place);

                skill.setText(String(item.name));
                skill.updateAppearances(customFont);
            }
        });


    }
    this1.skills.forEach(skill => {
        const char1 = this1.SkillsTrained[this1.characterSkills[skill.key]];
        const char2 = (this1.characterAttributesEnhanced[skill.attribute.toLowerCase()] - 10) / 2;
        const char3 = char1 === 0 ? 0 : this1.characterRank;

        // Общее количество
        const name = skill.key.toUpperCase() === 'PERFOMANCE' ? 'PERFORMANCE' : skill.key;


        if (!skill.custom) {


            const fieldPROFICIENCY = form.getTextField(name.toUpperCase() + ' PROFICIENCY');
            if (fieldPROFICIENCY) {
                fieldPROFICIENCY.setText(String(char1 + char3));
                fieldPROFICIENCY.updateAppearances(customFont);
            }

            const attribute = skill.attribute === 'intellect' ? 'INTELLIGENCE' : skill.attribute;

            const fieldAttribute = form.getTextField(name.toUpperCase() + ' ' + attribute.toUpperCase());
            if (fieldAttribute) {
                fieldAttribute.setText(String(char2));
                fieldAttribute.updateAppearances(customFont);
            }
            // Изученное

            if (name) {
                switch (skill.value) {
                    case "T":
                        const prof = form.getCheckBox(name.toUpperCase() + ' TRAINED');

                        prof.check();
                        break;
                    case "E":
                        const prof1 = form.getCheckBox(name.toUpperCase() + ' EXPERT');
                        prof1.check();
                        break;
                    case "M":
                        const prof2 = form.getCheckBox(name.toUpperCase() + ' MASTER');
                        prof2.check();
                        break;
                    case "L":
                        const prof3 = form.getCheckBox(name.toUpperCase() + ' LEGENDARY');
                        prof3.check();
                        break;
                }

                let item = 0;
                if (this1.modificatorBonus) {

                    const itemBonus = this1.modificatorBonus.filter(
                        item =>
                            item.selector === skill.key &&
                            item.type === 'item'

                    )

                    let typeMaxItem = itemBonus.length > 0 ? itemBonus[0] : undefined

                    if (itemBonus) {
                        itemBonus.forEach(item => {
                            if (typeMaxItem.value < item.value)
                                typeMaxItem = item

                        })

                    }
                    if (typeMaxItem) {
                        const fieldTextItem = form.getTextField(name.toUpperCase() + ' ITEM');
                        fieldTextItem.setText(String(typeMaxItem.value || 0));
                        fieldTextItem.updateAppearances(customFont);
                        item = typeMaxItem ? typeMaxItem.value : 0;
                    }


                }

                const total = parseInt(char1) + parseInt(char2) + parseInt(char3) + item;


                const fieldText = form.getTextField(name.toUpperCase());
                fieldText.setText(String(total));
                fieldText.updateAppearances(customFont);
            }


        }

    })


    //Деньги


    let money = form.getTextField('COPPER');

    money.setText(String(this1.money.cp));
    money.updateAppearances(customFont);

    money = form.getTextField('SILVER');

    money.setText(String(this1.money.sp));
    money.updateAppearances(customFont);

    money = form.getTextField('GOLD');

    money.setText(String(this1.money.gp));
    money.updateAppearances(customFont);

    money = form.getTextField('PLATINUM');

    money.setText(String(this1.money.pp));
    money.updateAppearances(customFont);


    /*Скорость */
    // Получаем speed из store
    const originalSpeed = this1.Speed

    const speedLand = form.getTextField('SPEED');

    speedLand.setText(String(originalSpeed["land"]));
    speedLand.updateAppearances(customFont);

    // Создаем копию объекта, чтобы не мутировать store
    const speed = { ...originalSpeed };

    const specialSpeed = form.getTextField('SPECIAL MOVEMENT');
    let move = "";
    Object.keys(speed).forEach(key => {


        move = move + String(this1.speedRepository[key] + ": " + speed[key] + ";")


    });


    specialSpeed.setText(String(move));
    specialSpeed.updateAppearances(customFont);

    const per1 = this1.profiencyRepository[this1.SkillPerception];
    const per2 = (this1.characterAttributesEnhanced["wisdom"] - 10) / 2;
    const per3 = this1.characterRank;

    const totalPer = parseInt(per1) + parseInt(per2) + parseInt(per3);
    const fieldTextPer = form.getTextField('PERCEPTION');
    fieldTextPer.setText(String(totalPer));
    fieldTextPer.updateAppearances(customFont);

    const fieldPROFICIENCYPer = form.getTextField('PERCEPTION' + ' ' + 'PROFICIENCY');
    if (fieldPROFICIENCYPer) {
        fieldPROFICIENCYPer.setText(String(per1 + per3));
        fieldPROFICIENCYPer.updateAppearances(customFont);
    }



    const fieldAttribute = form.getTextField('PERCEPTION WISDOM');
    if (fieldAttribute) {
        fieldAttribute.setText(String(per2));
        fieldAttribute.updateAppearances(customFont);
    }

    const namePer = 'PERCEPTION'
    switch (this1.SkillPerception) {
        case "T":
            const prof = form.getCheckBox(namePer.toUpperCase() + ' TRAINED');

            prof.check();
            break;
        case "E":
            const prof1 = form.getCheckBox(namePer.toUpperCase() + ' EXPERT');
            prof1.check();
            break;
        case "M":
            const prof2 = form.getCheckBox(namePer.toUpperCase() + ' MASTER');
            prof2.check();
            break;
        case "L":
            const prof3 = form.getCheckBox(namePer.toUpperCase() + ' LEGENDARY');
            prof3.check();
            break;
    }






    Object.entries(this1.characterSaving).forEach(([key, value]) => {
        const keySave = this1.SavingRepository.find(k => k.key === key).attribute;

        const char1 = this1.SkillsTrained[value];
        const char2 = (this1.characterAttributesEnhanced[keySave] - 10) / 2;
        const char3 = char1 === 0 ? 0 : this1.characterRank;

        // Общее количество
        const total = parseInt(char1) + parseInt(char2) + parseInt(char3);

        const name = key.toUpperCase();


        const number = {
            fortitude: '',
            reflex: '2',
            will: '3'
        }

        const fieldText = form.getTextField(name.toUpperCase());
        fieldText.setText(String(total));
        fieldText.updateAppearances(customFont);

        const fieldPROFICIENCY = form.getTextField('PROFICIENCY' + '' + number[key]);
        if (fieldPROFICIENCY) {
            fieldPROFICIENCY.setText(String(char1 + char3));
            fieldPROFICIENCY.updateAppearances(customFont);
        }

        const attribute = keySave;

        const fieldAttribute = form.getTextField(attribute.toUpperCase());
        if (fieldAttribute) {
            fieldAttribute.setText(String(char2));
            fieldAttribute.updateAppearances(customFont);
        }
        // Изученное

        if (name) {
            switch (value) {
                case "T":
                    const prof = form.getCheckBox(name.toUpperCase() + ' TRAINED');

                    prof.check();
                    break;
                case "E":
                    const prof1 = form.getCheckBox(name.toUpperCase() + ' EXPERT');
                    prof1.check();
                    break;
                case "M":
                    const prof2 = form.getCheckBox(name.toUpperCase() + ' MASTER');
                    prof2.check();
                    break;
                case "L":
                    const prof3 = form.getCheckBox(name.toUpperCase() + ' LEGENDARY');
                    prof3.check();
                    break;
            }



        }



    })


    Object.entries(this1.skillDefence).forEach(([key, value]) => {


        if (key) {
            switch (value) {
                case "T":
                    const prof = form.getCheckBox(key.toUpperCase() + ' TRAINED');

                    prof.check();
                    break;
                case "E":
                    const prof1 = form.getCheckBox(key.toUpperCase() + ' EXPERT');
                    prof1.check();
                    break;
                case "M":
                    const prof2 = form.getCheckBox(key.toUpperCase() + ' MASTER');
                    prof2.check();
                    break;
                case "L":
                    const prof3 = form.getCheckBox(key.toUpperCase() + ' LEGENDARY');
                    prof3.check();
                    break;
            }



        }



    })

    const AttackDes =
    {
        simple: "SIMPLE WEAPONS",
        martial: "MARTIAL WEAPONS",
        advanced: "ADVANCED WEAPON",
        unarmed: "UNARMED"
    }

    Object.entries(this1.skillAttack).forEach(([key, value]) => {



        if (key) {
            switch (value) {
                case "T":
                    const prof = form.getCheckBox(AttackDes[key].toUpperCase() + ' TRAINED');

                    prof.check();
                    break;
                case "E":
                    const prof1 = form.getCheckBox(AttackDes[key].toUpperCase() + ' EXPERT');
                    prof1.check();
                    break;
                case "M":
                    const prof2 = form.getCheckBox(AttackDes[key].toUpperCase() + ' MASTER');
                    prof2.check();
                    break;
                case "L":
                    const prof3 = form.getCheckBox(AttackDes[key].toUpperCase() + ' LEGENDARY');
                    prof3.check();
                    break;
            }



        }



    })

    money = form.getTextField('PLATINUM');

    money.setText(String(this1.money.pp));
    money.updateAppearances(customFont);

    /*Хиты */
    const hitMax = form.getTextField('MAXIMUM HIT POINTS');



    const species = this1.characterHitPoints["species"]
        ? this1.characterHitPoints["species"]
        : 0;
    const classh = this1.characterHitPoints["class"]
        ? this1.characterHitPoints["class"]
        : 0;

    const levelClass =
        (classh + (this1.characterAttributesEnhanced["constitution"] - 10) / 2) *
        this1.characterRank;

    hitMax.setText(String(species + levelClass));
    hitMax.updateAppearances(customFont);

    /* Защиты*/
    const AC = form.getTextField('AC');
    const wear = this1.wear;


    let totalAC = 10;
    if (this1.wear) {
        const modDex = Math.floor(
            (this1.characterAttributes["dexterity"] - 10) / 2
        );

        const wearModDex = wear.modDex ? wear.modDex : 0;
        const dex = modDex > wearModDex ? wearModDex : modDex;
        const Def = wear.category ? this1.profiencyRepository[this1.skillDefence[wear.category]] : 0;
        const bonusAC = wear.acBonus ? wear.acBonus : 0;
        const arm = Def === 0 ? 0 : this1.characterRank;


        totalAC = 10 + dex + Def + arm + bonusAC;

        const ACCalc = form.getTextField('AC CALCULATION 1 DEXTERITY');
        ACCalc.setText(String(dex));
        ACCalc.updateAppearances(customFont);

        const ACCalc2 = form.getTextField('AC CALCULATION 2 PROFICIENCY');
        ACCalc2.setText(String(arm + Def));
        ACCalc2.updateAppearances(customFont);

        const ACCalc3 = form.getTextField('AC CALCULATION 3 ITEM');
        ACCalc3.setText(String(bonusAC));
        ACCalc3.updateAppearances(customFont);

    }

    if (!wear) {
        const Def = this1.profiencyRepository[this1.skillDefence["unarmored"]];
        totalAC = totalAC + Def
    }


    let index = 0
    let weaponIndex = 0
    let weaponDexIndex = 0

    let SumTotal = 0;
    let SumLTotal = 0;
    this1.wargear.forEach(wargear => {
        index++;

        if (index > 17) return
        const skill = form.getTextField('HELD ' + index.toString());

        skill.setText(String(wargear.name));
        skill.updateAppearances(customFont);
        let Sum = 0;
        let SumL = 0;
        if (wargear.bulk && wargear.bulk?.value >= 1)
            Sum = Sum + (wargear.bulk ? wargear.bulk.value : 0) * wargear.qty;
        else
            SumL = SumL + 1 * wargear.qty;

        const carry = Math.floor(SumL / 10)

        Sum += carry
        SumL = SumL % 10
        SumTotal += Sum
        SumLTotal += SumL

        const skill1 = form.getTextField('HELD BULK ' + index.toString());

        skill1.setText(String((Sum === 0 ? "" : Sum + " ") + + (SumL === 0 ? "" : SumL + "Л")));
        skill1.updateAppearances(customFont);

        //ближнее оружие
        if (wargear.type === 'weapon' && weaponIndex < 4 && wargear.range === null) {
            weaponIndex++;
            const nameWargear = 'MELEE STRIKE ' + weaponIndex.toString()
            const weap = form.getTextField('MELEE STRIKE ' + weaponIndex.toString());

            weap.setText(wargear.name);
            weap.updateAppearances(customFont);

            const atkBonus = form.getTextField(nameWargear + " ATTACK BONUS");

            const modAbility = wargear.range === null ? this1.characterAttributesEnhanced["strength"] : this1.characterAttributesEnhanced["dexterity"];

            const modProfiency = this1.characterArchetype ? this1.skillAttack[wargear.category] : "U";
            const modLevel = modProfiency !== "U" ? this1.characterRank : 0;
            const rune = wargear.runes ? wargear.runes.potency : 0

            const totalBonAtk = this1.profiencyRepository[modProfiency] + (modAbility - 10) / 2 + modLevel + rune;

            const traits = wargear.traits.join(', ')
            atkBonus.setText(String(totalBonAtk));
            atkBonus.updateAppearances(customFont);

            const strWeap = form.getTextField(nameWargear + ' STRENGTH');

            strWeap.setText(String((modAbility - 10) / 2));
            strWeap.updateAppearances(customFont);



            const profWeap = form.getTextField(nameWargear + ' PROFICIENCY');

            profWeap.setText(String(this1.profiencyRepository[modProfiency] + modLevel));
            profWeap.updateAppearances(customFont);


            const runeWeap = form.getTextField(nameWargear + ' ITEM');

            runeWeap.setText(String(rune));
            runeWeap.updateAppearances(customFont);

            const traitsWeap = form.getTextField(nameWargear + ' TRAITS AND NOTES');

            traitsWeap.setText(String(traits));
            traitsWeap.updateAppearances(customFont);


            const mod = (modAbility - 10) / 2;
            const enc = this1.enc;

            //Для вычисления специализаций
            const spec = enc.find(s => s.type === "Weapon Specialization") ? enc.find(s => s.type === "Weapon Specialization") : "";
            const specGreater = enc.find(s => s.type === "greater-weapon-specialization") ? enc.find(s => s.type === "greater-weapon-specialization") : "";

            const damSpec = spec !== "" ? spec.bonusDamage[this1.skillAttack[wargear.category]] : 0;
            const damGreaterSpec = specGreater !== "" ? specGreater.bonusDamage[this1.skillAttack[wargear.category]] : 0;
            const modSpec = damGreaterSpec !== 0 ? damGreaterSpec : damSpec;

            //Для руны мощи 
            const runeStriking = wargear.runes ? wargear.runes.striking : 0;
            const damage = wargear.damage?.die ? (wargear.damage.dice + runeStriking) + wargear.damage.die : wargear.damage;
            const type = this1.DamageType.find(t => t.key === wargear.damageOrig.damageType) ? this1.DamageType.find(t => t.key === wargear.damageOrig.damageType).name : wargear.damageOrig.damageType;

            ///Руны свойств
            let damageProperty = " ";
            const runeList = this1.WeaponRuneProperty;
            wargear.runes.property.forEach(rune => {
                const damageRune = runeList.find(t => t.key === rune.toLowerCase());
                if (damageRune) {
                    damageProperty = damageProperty + " + " + damageRune.damage + " " + damageRune.type + " ";
                }
            })

            const damageCalc = damage.toString() + (mod + modSpec < 0 ? " " : " + ") + (mod + modSpec).toString() + " " + type + damageProperty;

            const damageWeap = form.getTextField(nameWargear + ' DAMAGE');

            damageWeap.setText(String(damageCalc));
            damageWeap.updateAppearances(customFont);



            const damageTypeWeap = wargear.damageOrig.damageType.slice(0, 1).toUpperCase()

            const damageCheck = form.getCheckBox(String(damageTypeWeap + (weaponIndex > 1 ? '_' + weaponIndex : '')));
            damageCheck.check();



        }

        //ближнее оружие
        if (wargear.type === 'weapon' && weaponDexIndex < 3 && wargear.range !== null) {
            weaponDexIndex++;
            const nameWargear = 'RANGED STRIKE ' + (weaponDexIndex + 3).toString()
            const weap = form.getTextField('RANGED STRIKE ' + (weaponDexIndex + 3).toString());

            weap.setText(wargear.name);
            weap.updateAppearances(customFont);

            const atkBonus = form.getTextField(nameWargear + " ATTACK BONUS");

            const modAbility = wargear.range === null ? this1.characterAttributesEnhanced["strength"] : this1.characterAttributesEnhanced["dexterity"];

            const modProfiency = this1.characterArchetype ? this1.skillAttack[wargear.category] : "U";
            const modLevel = modProfiency !== "U" ? this1.characterRank : 0;
            const rune = wargear.runes ? wargear.runes.potency : 0

            const totalBonAtk = this1.profiencyRepository[modProfiency] + (modAbility - 10) / 2 + modLevel + rune;

            atkBonus.setText(String(totalBonAtk));
            atkBonus.updateAppearances(customFont);

            const strWeap = form.getTextField(nameWargear + ' STRENGTH');

            strWeap.setText(String((modAbility - 10) / 2));
            strWeap.updateAppearances(customFont);



            const profWeap = form.getTextField(nameWargear + ' PROFICIENCY');

            profWeap.setText(String(this1.profiencyRepository[modProfiency] + modLevel));
            profWeap.updateAppearances(customFont);


            const runeWeap = form.getTextField(nameWargear + ' ITEM');

            runeWeap.setText(String(rune));
            runeWeap.updateAppearances(customFont);

            const traitsWeap = form.getTextField(nameWargear + ' TRAITS AND NOTES');

            traitsWeap.setText(String(traits));
            traitsWeap.updateAppearances(customFont);


            const mod = (modAbility - 10) / 2;
            const enc = this1.enc;

            //Для вычисления специализаций
            const spec = enc.find(s => s.type === "Weapon Specialization") ? enc.find(s => s.type === "Weapon Specialization") : "";
            const specGreater = enc.find(s => s.type === "greater-weapon-specialization") ? enc.find(s => s.type === "greater-weapon-specialization") : "";

            const damSpec = spec !== "" ? spec.bonusDamage[this1.skillAttack[wargear.category]] : 0;
            const damGreaterSpec = specGreater !== "" ? specGreater.bonusDamage[this1.skillAttack[wargear.category]] : 0;
            const modSpec = damGreaterSpec !== 0 ? damGreaterSpec : damSpec;

            //Для руны мощи 
            const runeStriking = wargear.runes ? wargear.runes.striking : 0;
            const damage = wargear.damage?.die ? (wargear.damage.dice + runeStriking) + wargear.damage.die : wargear.damage;
            const type = this1.DamageType.find(t => t.key === wargear.damageOrig.damageType) ? this1.DamageType.find(t => t.key === wargear.damageOrig.damageType).name : wargear.damageOrig.damageType;

            ///Руны свойств
            let damageProperty = " ";
            const runeList = this1.WeaponRuneProperty;
            wargear.runes.property.forEach(rune => {
                const damageRune = runeList.find(t => t.key === rune.toLowerCase());
                if (damageRune) {
                    damageProperty = damageProperty + " + " + damageRune.damage + " " + damageRune.type + " ";
                }
            })

            const damageCalc = damage.toString() + (mod + modSpec < 0 ? " " : " + ") + (mod + modSpec).toString() + " " + type + damageProperty;

            const damageWeap = form.getTextField(nameWargear + ' DAMAGE');

            damageWeap.setText(String(damageCalc));
            damageWeap.updateAppearances(customFont);



            const damageTypeWeap = wargear.damageOrig.damageType.slice(0, 1).toUpperCase()

            const damageCheck = form.getCheckBox(String(damageTypeWeap + (weaponDexIndex + 3)));
            damageCheck.check();
            // const spec = enc.filter(s => s.type === 'Attack' && s.criticalSpecialization && s.criticalSpecialization === true)
            // if (spec) {



            //     const specWeap = form.getTextField('CRITICAL SPECIALIZATIONS');

            //     specWeap.setText(String(damageCalc));
            //     specWeap.updateAppearances(customFont);
            // }



        }

    })

    const blk = form.getTextField('BULK TOTAL');

    blk.setText(String((SumTotal === 0 ? "" : SumTotal + " ") + (SumLTotal === 0 ? "" : SumLTotal + "Л")));
    blk.updateAppearances(customFont);


    AC.setText(String(totalAC));
    AC.updateAppearances(customFont);


    //Спеллы
    if (this1.characterArchetype && this1.characterArchetype.spellProgression) {

        const Tradition = {
            "арканный": "ARCANE",
            "природный": "PRIMAL",
            "сакральный": "DIVINE",
            "оккультный": "OCCULT"
        }
        if (Tradition[this1.characterArchetype.spellTradition]) {
            const sp = form.getCheckBox(Tradition[this1.characterArchetype.spellTradition]);
            sp.check();
        }

        const radio = form.getRadioGroup(
            'Magical Tradition'
        );

        radio.select(this1.characterArchetype.prepared === false ? 'Spontaneous Caster' : 'Prepared Caster'); // имя выбранной опции

        const profSpell = this1.characterArchetype.spellsClass["attack"]

        if (profSpell) {
            switch (profSpell) {
                case "T":
                    const prof = form.getCheckBox('SPELL ATTACK' + ' TRAINED');

                    prof.check();
                    break;
                case "E":
                    const prof1 = form.getCheckBox('SPELL ATTACK' + ' EXPERT');
                    prof1.check();
                    break;
                case "M":
                    const prof2 = form.getCheckBox('SPELL ATTACK' + ' MASTER');
                    prof2.check();
                    break;
                case "L":
                    const prof3 = form.getCheckBox('SPELL ATTACK' + ' LEGENDARY');
                    prof3.check();
                    break;
            }

        }

        const attrSpell = (this1.characterAttributes[this1.characterArchetype.attributeBoost.find(t => t.value > 0).key] - 10) / 2;
        const levelSpell = this1.characterRank;

        const modSpell = this1.profiencyRepository[this1.characterArchetype.spellsClass["attack"]];

        const attrSpellAttack = form.getTextField('SPELL ATTACK');
        attrSpellAttack.setText(String(parseInt(attrSpell) + parseInt(levelSpell) + parseInt(modSpell)));
        attrSpellAttack.updateAppearances(customFont);

        const prodSpellBonus = form.getTextField('SPELL ATTACK PROFICIENCY');
        prodSpellBonus.setText(String(parseInt(modSpell + levelSpell)));
        prodSpellBonus.updateAppearances(customFont);

        const attrSpellBonus = form.getTextField('SPELL ATTACK KEY');
        attrSpellBonus.setText(String(parseInt(attrSpell)));
        attrSpellBonus.updateAppearances(customFont);

        // ---------- SPELLS PER DAY / CANTRIPS PER DAY ----------

        const progression =
            this1.characterArchetype.spellProgression[this1.characterRank];

        // progression например: [5, 4, 3, 2, 0, 0]

        const firstZero = progression.findIndex(v => v === 0);

        // если 0 нет (20 уровень) - берем всю длину массива
        const maxRank =
            firstZero === -1 || this1.characterRank === 20
                ? progression.length
                : firstZero;

        // Cantrips
        if (progression.length > 0) {
            const field = form.getTextField('CANTRIPS PER DAY');
            field.setText(String(progression[0]));
            field.updateAppearances(customFont);
        }

        // SPELLS PER DAY 1,2,3...
        for (let i = 1; i < maxRank; i++) {
            const field = form.getTextField(`SPELLS PER DAY ${i}`);
            field.setText(String(progression[i]));
            field.updateAppearances(customFont);
        }

        const maxRankCant = form.getTextField(`CANTRIPS RANK`);
        maxRankCant.setText(String(maxRank - 1));
        maxRankCant.updateAppearances(customFont);

        const maxRankFocus = form.getTextField(`FOCUS SPELL RANK`);
        maxRankFocus.setText(String(maxRank - 1));
        maxRankFocus.updateAppearances(customFont);


        const spells = (this1.psychicPowers ?? [])
            .filter(spell => spell.rank !== 0);
        for (let i = 0; i < Math.min(spells.length, 74); i++) {
            const spell = spells[i];

            // SPELL N
            const nameField = form.getTextField(`SPELL ${i + 1}`);
            nameField.setText(spell.name ?? '');
            nameField.updateAppearances(customFont);

            // SPELL ACTION N
            let action = spell.time?.value ?? '';

            if (action === 'reaction')
                action = 'р';
            else if (action === 'free')
                action = 'св';

            const actionField = form.getTextField(`SPELL ACTION ${i + 1}`);
            actionField.setText(String(action));
            actionField.updateAppearances(customFont);

            // SPELL RANK N
            const rankField = form.getTextField(`SPELL RANK ${i + 1}`);
            rankField.setText(String(spell.rank ?? ''));
            rankField.updateAppearances(customFont);
        }
    }

    const Cantrips = (this1.psychicPowers ?? [])
        .filter(spell => spell.rank === 0);

    for (let i = 0; i < Math.min(Cantrips.length, 24); i++) {
        const spell = Cantrips[i];

        // SPELL N
        const nameField = form.getTextField(`CANTRIP NAME ${i + 1}`);
        nameField.setText(spell.name ?? '');
        nameField.updateAppearances(customFont);

        // SPELL ACTION N
        let action = spell.time?.value ?? '';

        if (action === 'reaction')
            action = 'р';
        else if (action === 'free')
            action = 'св';

        const actionField = form.getTextField(`CANTRIP ${i + 1} ACTIONS`);
        actionField.setText(String(action));
        actionField.updateAppearances(customFont);


    }


    /* */
    // Заполняем текст с кастомным шрифтом
    const Class = form.getTextField('Class');
    const Background = form.getTextField('Background');
    const Heritage = form.getTextField('Heritage and Traits');
    const Ancestry = form.getTextField('Ancestry');

    nameField.setText(this1.characterName);
    nameField.updateAppearances(customFont);

    Class.setText(this1.archetypeLabel);
    Class.updateAppearances(customFont);

    Background.setText(this1.backgroundLabel);
    Background.updateAppearances(customFont);

    if (this1.speciesLabel) {
        const keyword = this1.archetypeLabel ? this1.keywords.filter(s => s.name !== this1.archetypeLabel.toLowerCase()).map(s => s.name).join(', ') : this1.keywords.map(s => s.name).join(', ')

        Ancestry.setText(this1.speciesLabel || '');
        Ancestry.updateAppearances(customFont);

        Heritage.setText(this1.heritageLabel + ' (' + keyword + ')');
        Heritage.updateAppearances(customFont);
    }


    level.setText(String(this1.characterRank));


    return URL.createObjectURL(new Blob([await pdfDoc.save()], {
        type: 'application/pdf'
    }))
}

const LIMITS = [25, 35, 35]; // -1, -2, -3

function distributeToLines(items) {
    const lines = ['', '', '']; // -1, -2, -3
    let lineIndex = 0;

    items.forEach(name => {
        if (lineIndex > 2) return;

        let currentLine = lines[lineIndex];
        const limit = LIMITS[lineIndex];

        const toAdd = currentLine ? ', ' + name : name;

        if ((currentLine + toAdd).length <= limit) {
            lines[lineIndex] += toAdd;
        } else {
            lineIndex++;

            if (lineIndex > 2) return;

            lines[lineIndex] = name;
        }
    });

    return lines;
}