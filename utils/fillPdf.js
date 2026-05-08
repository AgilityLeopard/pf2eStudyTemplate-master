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
        if (item.category === 'ancestry') {
            const skillPlace = item.level === '1' ? 'ANCESTRY FEAT' : 'SKILL FEAT ' + item.level + '-1';
            const skill = form.getTextField(skillPlace);
            skill.setText(String(item.name));
            skill.updateAppearances(customFont);
        }

        if (item.category === 'class') {
            const skillPlace = item.level === '1' ? 'CLASS FEATS & FEATURES' : 'CLASS FEAT ' + item.level + '-1';
            if (skillPlace === 'CLASS FEATS & FEATURES')
                skillFeat = item.name;
            else {
                const skill = form.getTextField(skillPlace);
                skill.setText(String(item.name));
                skill.updateAppearances(customFont);
            }
        }

        if (item.category === 'skill' && item.level !== '1') {
            const skillPlace = 'SKILL FEAT ' + item.level + '-2';
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

    /* Классовая особенность */
    if (this1.characterArchetype) {
        this1.characterArchetype.archetypeFeatures.forEach(item => {

            if (item.level === '1') {
                // skillFeat = '; ' + item.name;
                excludeFeature.push(item.name);
                classFeature.push({
                    place: 'CLASS FEATS & FEATURES',
                    name: item.name
                })
            }
            else {
                // if (!excludeFeature.includes(item.name)) {
                excludeFeature.push(item.name);
                const skillPlace = 'CLASS FEAT ' + item.level + '-2';
                classFeature.push({
                    place: skillPlace,
                    name: item.name
                })

                // const skill = form.getTextField(skillPlace);
                // skill.setText(String(item.name));
                // skill.updateAppearances(customFont);
                // }
            }

        })

        let t = classFeature.reduce((acc, { place, name }) => {
            acc[place] = acc[place] ? `${acc[place]}; ${name}` : name;
            return acc;
        }, {});

        const grouped = Object.entries(t).map(
            ([place, name]) => ({ place, name })
        );

        grouped.forEach(item => {
            const skill = form.getTextField(item.place);
            skill.setText(String(item.name));
            skill.updateAppearances(customFont);
        })

    }

    /* */
    // Скиллы

    this1.skills.forEach(skill => {
        const char1 = this1.SkillsTrained[this1.characterSkills[skill.key]];
        const char2 = (this1.characterAttributesEnhanced[skill.attribute.toLowerCase()] - 10) / 2;
        const char3 = char1 === 0 ? 0 : this1.characterLevel();

        // Общее количество
        const total = parseInt(char1) + parseInt(char2) + parseInt(char3) - skill.conditionalAdjustment;
        console.log(skill)
        const name = skill.key.toUpperCase() === 'PERFOMANCE' ? 'PERFORMANCE' : skill.key;


        if (!skill.custom) {
            const fieldText = form.getTextField(name.toUpperCase());
            fieldText.setText(String(total));
            fieldText.updateAppearances(customFont);

            const fieldPROFICIENCY = form.getTextField(name.toUpperCase() + ' PROFICIENCY');
            if (fieldPROFICIENCY) {
                fieldPROFICIENCY.setText(String(char1 + char3));
                fieldPROFICIENCY.updateAppearances(customFont);
            }

            const attribute = skill.attribute === 'intellect' ? 'INTELLIGENCE' : skill.attribute;
            console.log(attribute);
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



            }


        }

    })

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
        const arm = Def === 0 ? 0 : this1.characterLevel();


        totalAC = 10 + dex + Def + arm + bonusAC;
    }

    if (!wear) {
        const Def = this1.profiencyRepository[this1.skillDefence["unarmored"]];
        totalAC = totalAC + Def
    }

    console.log(totalAC)

    AC.setText(String(totalAC));
    AC.updateAppearances(customFont);

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

        Ancestry.setText(this1.speciesLabel);
        Ancestry.updateAppearances(customFont);

        Heritage.setText(this1.heritageLabel + ' (' + keyword + ')');
        Heritage.updateAppearances(customFont);
    }


    level.setText(String(this1.characterRank));


    return URL.createObjectURL(new Blob([await pdfDoc.save()], {
        type: 'application/pdf'
    }))
}