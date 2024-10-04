import {SKILLS, TRAITS} from '../api/db/static/_statUtils';

export default {
  data() {
    const keywordRepository = [
      // General Keywords
      {
        name: 'Psyker', type: 'General', parentKeyword: undefined, description: 'Those who can wield psychic powers, channeling the warp through their mind.',
      },
      {
        name: '[Any]', type: 'General', parentKeyword: undefined, description: 'This keyword represents a free choice by the player at character creation; the GM deter-mines which selections are appropriate for the character.',
      },

      // Species Keywords
      {
        name: 'Abhuman', type: 'Species', parentKeyword: undefined, description: 'Some mutated strains of Humanity, such as the muscular, oversized, impeccably loyal Ogryns, are allowed citizenship in parts of the Imperium due to their usefulness. These mutants are known as Abhumans.',
      },
      {
        name: 'Ratling', type: 'Species', parentKeyword: undefined, description: 'The Ratling abhuman.',
      },
      {
        name: 'Ogryn', type: 'Species', parentKeyword: undefined, description: 'The Ogryn abhuman.',
      },
      {
        name: 'Kroot', type: 'Species', parentKeyword: undefined, description: 'A mercenary xenos Species with the ability to control their evolution through the consumption of other lifeforms.',
      },
      {
        name: 'Aeldari', type: 'Species', parentKeyword: undefined, description: 'The Eldar race.',
      },
      {
        name: 'Anhrathe', type: 'Species', parentKeyword: undefined, description: 'Eldar Corsairs, spacefaring pirates and raiders.',
      },
      {
        name: '[Coterie]', type: 'Species', parentKeyword: 'Anhrathe', description: 'A specific Eldar Corsair band (replaces this keyword when chosen).',
      },
      {
        name: 'Asuryani', type: 'Species', parentKeyword: undefined, description: 'Eldar of the Craftworlds.',
      },
      {
        name: '[Craftworld]', type: 'Species', parentKeyword: 'Asuryani', description: 'A specific Eldar Craftworld (replaces this keyword when chosen).',
      },
      {
        source: 'aaoa',
        name: 'Drukhari',
        type: 'Species',
        parentKeyword: undefined,
        description: 'The dark Aeldari siblings.',
      },
      {
        source: 'aaoa',
        name: '[Cult]',
        type: 'Species',
        description: 'A specific Drukhari Witch Cult (replaces this keyword when chosen).',
      },
      {
        source: 'aaoa',
        name: '[Masque]',
        type: 'Species',
        description: 'A specific Harlequin Masque (replaces this keyword when chosen).',
      },
      {
        source: 'aaoa',
        name: '[Coven]',
        type: 'Species',
        description: 'A specific Drukhari Haemunculus Coven (replaces this keyword when chosen).',
      },
      {
        source: 'aaoa',
        name: '[Cabal]',
        type: 'Species',
        description: 'A specific Drukhari Cabal (replaces this keyword when chosen).',
      },
      {
        name: 'Ork', type: 'Species', parentKeyword: undefined, description: 'The Ork race.',
      },
      {
        name: '[Clan]', type: 'Species', parentKeyword: 'Ork', description: 'A specific Ork clan (replaces this keyword when chosen).',
      },
      { source: 'aaoa', name: '[League]', type: 'Species', parentKeyword: 'Squat', description: 'A specific Squat league (replaces this keyword when chosen).' },

      // Imperium Keywords
      {
        name: 'Adepta Sororitas', type: 'Imperium', parentKeyword: undefined, description: 'The Sisters of Battle, warriors of the Ecclesiarchy.',
      },
      {
        name: '[Order]', type: 'Imperium', parentKeyword: 'Adepta Sororitas', description: 'A specific Adepta Sororitas Order (replaces this keyword when chosen).',
      },
      {
        name: '[Enclave]',
        type: 'Imperium',
        parentKeyword: undefined,
        description: 'A specific Sisters of Silence Enclave (replaces this keyword when chosen).',
        source: 'tnh',
      },
      { name: 'Adeptus Astartes', type: 'Imperium', parentKeyword: undefined, description: 'The Space Marines, superhuman elite warriors of the Imperium.' },
      {
        name: '[Chapter]', type: 'Imperium', parentKeyword: 'Adeptus Astartes', description: 'A specific Adeptus Astartes Chapter (replaces this keyword when chosen).',
      },
      {
        name: 'Adeptus Astra Telepathica', type: 'Imperium', parentKeyword: undefined, description: 'They administrate the role of psykers in the Imperium.',
      },
      {
        name: 'Adeptus Mechanicus',
        type: 'Imperium',
        parentKeyword: undefined,
        description: 'The Tech-Priesthood of Mars, they are entrusted with the secrets of tech-nology; allied to the Imperium.',
        // Data is Currency
        effectLabel: 'Data is Currency',
        effect: 'Characters with the Adeptus Mechanicus keyword may use Intellect in place of Fellowship when calculating Influence.',
      },
      {
        name: '[Forge World]', type: 'Imperium', parentKeyword: 'Adeptus Mechanicus', description: 'A specific Adeptus Mechanicus Forge World (replaces this keyword when chosen).',
      },
      {
        name: 'Adeptus Ministorum', type: 'Imperium', parentKeyword: undefined, description: 'Those who preach the Imperial Creed.',
      },
      {
        name: 'Astra Militarum', type: 'Imperium', parentKeyword: undefined, description: 'The Imperial Guard, soldiers of the Imperium’s main ground forces.',
      },
      {
        name: '[Regiment]', type: 'Imperium', parentKeyword: 'Astra Militarum', description: 'A specific Astra Militarum Regiment (replaces this keyword when chosen).',
      },
      {
        name: 'Cult Mechanicus', type: 'Imperium', parentKeyword: undefined, description: 'The Priesthood of the Omnissiah, a subset of the Adeptus Mechanicus.',
      },
      {
        name: 'Imperium', type: 'Imperium', parentKeyword: undefined, description: 'The Imperium of Man, a galaxy-spanning civilisation 10,000 years old.',
      },
      {
        name: 'Inquisition', type: 'Imperium', parentKeyword: undefined, description: 'Investigators and questioners, they wield great authority to root out threats to the Imperium.',
      },
      {
        name: '[Ordo]', type: 'Imperium', parentKeyword: 'Inquisition', description: 'A specific Ordo of the Inquisition (replaces this keyword when chosen).',
      },
      {
        name: 'Militarum Tempestus', type: 'Imperium', parentKeyword: undefined, description: 'Elite, specially-trained and equipped soldiers of the Astra Militarum.',
      },
      {
        name: 'Militarum Auxilla', type: 'Imperium', parentKeyword: undefined, description: 'A division of the Astra Militarum that consists of Abhumans.',
      },
      {
        name: 'Officio Prefectus', type: 'Imperium', parentKeyword: undefined, description: 'Elite leaders and disciplinarians of the Imperium’s military.',
      },
      {
        name: 'Primaris', type: 'Imperium', parentKeyword: undefined, description: 'A new, improved breed of Space Marine.',
      },
      {
        name: 'Rogue Trader', type: 'Imperium', parentKeyword: undefined, description: 'Space-faring merchant princes and explorers, granted great authority to expand the Imperium’s borders.',
      },
      {
        name: '[Dynasty]', type: 'Imperium', parentKeyword: 'Rogue Trader', description: 'A specific Rogue Trader Dynasty (replaces this keyword when chosen).',
      },
      {
        name: 'Adeptus Astra Telepathica', type: 'Imperium', parentKeyword: undefined, description: 'This Organisation is responsible for the recruitment and training of psykers.',
      },
      {
        name: 'Scholastica Psykana', type: 'Imperium', parentKeyword: undefined, description: 'A subset of the Adeptus Astra Telepathica, they train psykers in the use of their powers.',
      },
      {
        name: 'Anathema Psykana', type: 'Imperium', parentKeyword: undefined, description: 'A subset of the Adeptus Astra Telepathica, they train the Psychic Blanks into the Sisters of Silence.', source: 'tnh',
      },
      {
        name: 'Scum', type: 'Imperium', parentKeyword: undefined, description: 'Those who live upon the fringes of Imperial society, often in the underhive or criminal syndicates.',
      },
      {
        name: 'Skitarii', type: 'Imperium', parentKeyword: undefined, description: 'The warriors of the Omnissiah, devout troops who wield ancient technology.',
      },
      {
        name: 'Navis Nobilite',
        type: 'Imperium',
        parentKeyword: undefined,
        description: 'The mutants whose abilities allow starships to pass through the warp and so travel between distant stars.',
        source: 'pax',
        // Data is Currency
        effectLabel: 'Nobilite Encoding',
        effect: 'A number of archaic, dead tongues or dialects, now only know to the ancient Nobilite families that keep the old languages alive. A Navis Nobilite House character may choose this language as one of his initial languages, or purchase it for 1 XP at a later time.',
      },
      {
        name: '[Navis House]',
        type: 'Imperium',
        parentKeyword: 'Navis Nobilite',
        description: 'A specific type of Navis Nobilite house (replaces this keyword when chosen).',
        source: 'pax',
      },
      {
        name: 'Untouchable',
        type: 'Imperium',
        parentKeyword: undefined,
        description: 'Those unfortunate few whose very presence is unnaturally ‘wrong’, and intrinsically opposed to the Immaterium.',
        source: 'pax'
      },
      {
        name: '[Gang]',
        type: 'Imperium',
        parentKeyword: undefined,
        description: '',
        source: 'pax',
      },
      {
        name: 'Adeptus Arbites',
        type: 'Imperium',
        parentKeyword: undefined,
        description: 'The keepers of Imperial law and enforcers of loyalty to the Golden Throne.',
        effect:
          'You are immune to Terror or Fear originating from enemies with the [Imperium] keyword. ' +
          'In addition, you gain +2 bonus dice to any Scholar or Investigation tests related to recidivists or heretics.',
        source: 'pax',
      },

      {
        name: '[Predict]',
        type: 'Imperium',
        parentKeyword: 'Adeptus Arbites',
        description: 'A specific type of Arbites precinct (replaces this keyword when chosen).',
        source: 'pax',
      },

      // Renegade and Heretic Keywords
      { name: 'Chaos', type: 'Renegade', parentKeyword: undefined, description: 'Those who serve the Dark Gods, knowingly or otherwise.' },
      { name: '[Mark of Chaos]', type: 'Renegade', parentKeyword: undefined, description: 'A specific Chaos God (replaces this keyword when chosen).' },
      { name: 'Dark Mechanicus', type: 'Renegade', parentKeyword: undefined, description: 'Small groups of Tech-Priests who have rejected the doctrines of Mars and work with the forces of Chaos.' },
      { name: 'Heretic', type: 'Renegade', parentKeyword: undefined, description: 'Those who have rejected the Imperial Creed.' },
      { name: 'Heretic Astartes', type: 'Renegade', parentKeyword: undefined, description: 'Once loyal to the imperium but now outlawed and enemies of mankind.' },
      { name: '[Legion]', type: 'Renegade', parentKeyword: undefined, description: 'A specific Heretic Astartes Legion (replaces this keyword when chosen).' },

      // Social PAX
      { source: 'pax', name: 'Nobility', type: 'Social', parentKeyword: undefined, description: 'The high born elite of the Imperium.' },
      { source: 'pax', name: 'Lower Class', type: 'Social', parentKeyword: undefined, description: 'Those who in their uncountable numbers toil at industry, agriculture or another manual trade.' },
      { source: 'pax', name: 'Outcast', type: 'Social', parentKeyword: undefined, description: 'Those unfortunates who have slipped through the cracks of society.' },
      { source: 'pax', name: 'Military', type: 'Social', parentKeyword: undefined, description: 'Those whose craft is the waging of war.' },
    ];
    const keywordSubwordRepository = [

      // Orders of the Adepta Sororitas
      { placeholder: '[Order]', name: 'Order of the Bloody Rose', type: 'Order Militant of the Adepta Sororitas', description: 'Formed from the bodyguards of an Abbess, this order honours the martyrdom of a sister who died in exceptionally bloody battle.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.' },
      { placeholder: '[Order]', name: 'Order of Our Martyred Lady', type: 'Order Militant of the Adepta Sororitas', description: 'Founded in honour of Saint Katherine, this order wears black as a symbol of the deep mourning for their namesake’s death.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.' },
      { placeholder: '[Order]', name: 'Order of the Valorous Heart', type: 'Order Militant of the Adepta Sororitas', description: 'A highly penitent order, they seek to atone for their part in the Reign of Blood.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.' },
      { placeholder: '[Order]', name: 'Order of Sacred Rose', type: 'Order Militant of the Adepta Astartes', description: 'This order is highly disciplined, embodying the virtues of calm determination in the face of the enemy.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.' },
      { placeholder: '[Order]', name: 'Order of the Ebon Chalice', type: 'Order Militant of the Adepta Sororitas', description: 'The oldest of the Orders Militant, this one was founded by Saint Alicia Dominica in the 38th Millennium. This order reveres the history and traditions of the Adepta Sororitas.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.' },
      { placeholder: '[Order]', name: 'Order of the Agent Shroud', type: 'Order Militant of the Adepta Sororitas', description: 'This order is famed for their righteous fury and selfl ess acts of heroism. Their founder seldom spoke, believing that deeds proved more devotion than words.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.'},

      // Regiments of the Astra Militarum
      {
        name: 'Armageddon Steel Legion',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus dice on any Test to repair a vehicle or weapon',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        description: 'A mechanised force known for their industrial efficiency, these soldiers excel at motorised warfare to quickly outflank their Ork foes and protect them from the toxic environs of their homeworld.',
        modification: {},
        modifications: [
          { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 1, condition: 'when repairing a vehicle or weapon' },
        ],
      },
      {
        name: 'Cadian Shock Troopers',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus dice to Resolve Tests',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        description: 'Though their homeworld was destroyed, the resolute will of the most renowned Regiment of the Astra Militarum refuses to break as long as a single soldier stands.',
        modification: {},
        modifications: [
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Catachan Jungle Fighters',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus dice to Survival (Wil) Tests',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        description: 'Raised in savage jungles filled with monstrous fauna, the troopers of the Death World Catachan fight for survival from the day of their birth.',
        modification: {},
        modifications: [
          { targetGroup: 'skills', targetValue: 'survival', modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Death Korps of Krieg',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus dice to Intimidation (Wil) Tests',
        description: 'A planet in penitence for past rebellion, the radioactive Death World Krieg produces scores of warriors indoctrinated by sermons of sincere sacrifice. Their solemn nature, eagerness for martyrdom, and rebreather-covered faces are unnerving.',
        modification: {},
        modifications: [
          { targetGroup: 'skills', targetValue: 'intimidation', modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Gilead Gravediggers',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus to Defence when in Cover',
        description: 'Trained to embrace the discomforts of trench warfare even before the emergence of the Great Rift, the surviving Gilead Gravediggers have dug themselves deep into immovable positions to survive three years of daemonic incursions.',
        modification: {},
        modifications: [
          { targetGroup: 'traits', targetValue: 'defence', modifier: 0, rank: 1, condition: 'when in Cover' },
        ],
      },
      {
        name: 'Tallarn Desert Raiders',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus dice to Pilot (A) Tests.',
        description: 'Masters of mobile warfare, the Tallarns have a vaunted reputation for hit-and-run tactics and indirect engagement. Capable of meticulous military order in tank and vehicle formations, they strike fast and fade into dust storms.',
        modification: {},
        modifications: [
          { targetGroup: 'skills', targetValue: 'pilot', modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Valhallan Ice Warriors',
        effectLabel: 'Regimental Affiliation',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        effect: '+Rank bonus to Determination Tests',
        description: 'Tenacious and stubborn beyond a fault, Valhallans are indomitable in the face of defeat. They continue their grim advances and succeed despite suicidal odds — ignoring their oft heavy losses.',
        modification: { },
      },
      {
        name: 'Vostroyan Firstborn',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus to Leadership (Fel) Tests',
        description: 'Every firstborn child of Vostroya is offered to the Astra Militarum in atonement for the planet’s past sins. All see this as an honour, continuing to send reinforcements blind through the void despite the perils of Noctis Aeternia.',
        modification: {},
        modifications: [
          { targetGroup: 'traits', targetValue: 'determination', modifier: 0, rank: 1 },
        ],
      },

      // Ordos of the Inquisitor
      // (i) Characters with the [Ordo] keyword must have the Inquisition keyword as well.
      {
        placeholder: '[Ordo]',
        type: 'Ordo of the Inquisiton',
        name: 'Ordo Hereticus',
        description:
          'The Ordo Hereticus hunts down heretics, mutants, and rogue psykers. It is their ' +
          'responsibility to police the Adeptus Ministorum. Their most common ally is the Order ' +
          'Militant of the Ecclesiarchy, the Sisters of Battle.',
        effect: 'Choose one: You gain +2 bonus dice to resist psychic powers, or you gain +2 '
        + 'bonus dice to Corruption tests.',
        modification: {},
        options: [
          {
            name: 'Ordo Hereticus Specialisaton',
            snippet: 'You gain +2 bonus dice to resist psychic powers.',
            description: ''
          },
          {
            name: 'Ordo Hereticus Specialisaton',
            snippet: 'You gain +2 bonus dice to Corruption tests.',
            description: ''
          },
        ],
      },
      {
        placeholder: '[Ordo]',
        type: 'Ordo of the Inquisiton',
        name: 'Ordo Xenos',
        description: 'The Ordo Xenos is tasked with defeating the alien in all its loathsome '
        + 'forms. They study their foe, always probing for more information about the '
        + 'weaknesses of alien species and civilisations. It is their duty to investigate '
        + 'xenos influence over Imperial domains. Their operations often see them working '
        + 'alongside the Space Marines of the Deathwatch.',
        effect: 'The character is fluent in one alien language; choose an alien species and '
        + 'write it down on the character sheet. In addition, the character gains +2 bonus '
        + 'dice for any Scholar or Investigation tests related to xenos.',
        modification: {},
        modifications: [
          {
            name: 'Understand your enemies',
            snippet: 'The character is fluent in one alien language,',
          },
          {
            name: 'Know your enemies',
            snippet: '+2 bonus dice to Scholar tests related to xenos.',
          },
          {
            name: 'Exploit your enemies',
            snippet: '+2 bonus dice to Investigation tests related to xenos.',
          },
          { targetGroup: 'skills', targetValue: 'scholar', modifier: 2, condition: 'when related to xenos.' },
          { targetGroup: 'skills', targetValue: 'investigation', modifier: 2, condition: 'when related to xenos.' },
        ],
      },
      {
        placeholder: '[Ordo]',
        type: 'Ordo of the Inquisiton',
        name: 'Ordo Malleus',
        description: 'The Ordo Malleus were established to fight against mankind’s greatest '
        + 'menace the corrupting influence of Chaos. The Chamber Militant of the Ordo Malleus '
        + 'are the Grey Knights, and they sometimes campaign together under a dual command '
        + 'structure.',
        effect: 'Either the character gains +3 Corruption and +1 Conviction, or gain +2 bonus dice for any '
        + 'Scholar (Int) and Investigation (Int) tests related to daemons and the warp.',
        modification: {},
        options: [
          {
            name: 'Ordo Malleus Specialisaton',
            snippet: 'You gain +3 Corruption and +1 Conviction.',
            description: '',
            modifications: [
              { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
              { targetGroup: 'traits', targetValue: 'conviction', modifier: 1 },
            ],
          },
          {
            name: 'Ordo Malleus Specialisaton',
            snippet: 'You gain +2 bonus dice to Scholar (Int) and Investigation (Int) tests related to daemons and the warp.',
            description: '',
            modifications: [
              { targetGroup: 'skills', targetValue: 'scholar', modifier: 2, condition: 'when related to daemons and the warp' },
              { targetGroup: 'skills', targetValue: 'investigation', modifier: 2, condition: 'when related to daemons and the warp' },
            ],
          },
        ],
      },
      {
        placeholder: '[Ordo]',
        type: 'Ordo of the Inquisiton',
        name: 'Other Ordo',
        description: 'Inquisitors are as varied in appearance, manner and method as the worlds '
        + 'of the Imperium they strive to protect.',
        effect: 'Choose one Skill from the following list: Cunning, Deception, Insight, '
        + 'Intimidation, Persuasion, Psychic Mastery, Scholar, Stealth, Survival, Tech. '
        + 'Gain +Rank bonus dice with that skill.',
        modification: {},
        options: [
          { name: 'Cunning', snippet: 'Gain +Rank bonus dice to Cunning Tests.' },
          { name: 'Deception', snippet: 'Gain +Rank bonus dice to Deception Tests.' },
          { name: 'Insight', snippet: 'Gain +Rank bonus dice to Insight Tests.' },
          { name: 'Intimidation', snippet: 'Gain +Rank bonus dice to Intimidation Tests.' },
          { name: 'Persuasion', snippet: 'Gain +Rank bonus dice to Persuasion Tests.' },
          { name: 'Psychic Mastery', snippet: 'Gain +Rank bonus dice to Psychic Mastery Tests.' },
          { name: 'Scholar', snippet: 'Gain +Rank bonus dice to Scholar Tests.' },
          { name: 'Stealth', snippet: 'Gain +Rank bonus dice to Stealth Tests.' },
          { name: 'Survival', snippet: 'Gain +Rank bonus dice to Survival Tests.' },
          { name: 'Tech', snippet: 'Gain +Rank bonus dice to Tech Tests.' },
        ],
      },
      {
        placeholder: '[Ordo]',
        type: 'Ordo of the Inquisiton',
        name: 'No Ordo',
        description: 'Inquisitors are as varied in appearance, manner and method as the worlds '
        + 'of the Imperium they strive to protect.',
        effect: 'Choose one Skill from the following list: Cunning, Deception, Insight, '
        + 'Intimidation, Persuasion, Psychic Mastery, Scholar, Stealth, Survival, Tech. '
        + 'Gain +Rank bonus dice with that skill.',
        modification: {},
        options: [
          { name: 'Cunning', snippet: 'Gain +Rank bonus dice to Cunning Tests.' },
          { name: 'Deception', snippet: 'Gain +Rank bonus dice to Deception Tests.' },
          { name: 'Insight', snippet: 'Gain +Rank bonus dice to Insight Tests.' },
          { name: 'Intimidation', snippet: 'Gain +Rank bonus dice to Intimidation Tests.' },
          { name: 'Persuasion', snippet: 'Gain +Rank bonus dice to Persuasion Tests.' },
          { name: 'Psychic Mastery', snippet: 'Gain +Rank bonus dice to Psychic Mastery Tests.' },
          { name: 'Scholar', snippet: 'Gain +Rank bonus dice to Scholar Tests.' },
          { name: 'Stealth', snippet: 'Gain +Rank bonus dice to Stealth Tests.' },
          { name: 'Survival', snippet: 'Gain +Rank bonus dice to Survival Tests.' },
          { name: 'Tech', snippet: 'Gain +Rank bonus dice to Tech Tests.' },
        ],
      },

      // Rogue Trader Dystanies
      // (i) Characters with the [Dynasty] keyword must have the Rogue Trader keyword as well.
      { placeholder: '[Dynasty]', name: 'Your Rogue Trader House', type: 'Rogue Trader Dynasty', description: '' },

      // Forge Worlds of the Adeptus Mechanicus
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Mars', description: 'The Red Planet: Birthplace of the Cult Mechanicus, considered the holiest of all celestial orbs. Tech-Priests of Mars consider themselves the most blessed of the Cult Mechanicus, and their ability to placate machine spirits is second to none.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Lucius', description: 'The Hollow Forge: A hollow world, Lucius is powered by an artificial sun in the planet’s core. This Forge World is known for creating a unique, sought-after alloy known as Luciun.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Agripinaa', description: 'Orb of a Million Scars: This Forge World exists on the threshold of the Eye of Terror. Agripinaa has fought off countless, relentless invasions by the forces of Chaos.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Stygies VIII', description: 'The Ever-Staring Cyclops: Considered untrustworthy by other Forge Worlds, Stygies VIII nearly fell to heresy but was saved by an Aeldari intervention. It is home to a secretive sect dedicated to the study of alien technology known as Xenarites.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Graia', description: 'The Crown of Miracles: Graia’s forges exist as a geometrically-perfect network of space stations known as the Crown. The tenacity of this Forge World is legendary, and they are known for their steadfast pursuit of their goals, no matter the cost.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Metalica', description: 'The Gleaming Giant of Ultima Segmentum: This Forge World is formed nearly entirely from metal, having exterminated all biological life. It is a world of hissing pistons, glowing forges, and strata upon strata of industrial waste. The Tech-Priests of Metalica take pride in the sterile perfection of their lifeless world.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Ryza', description: 'Furnace of Shackled Stars: Famed for producing containment fields and plasma weaponry, Ryza is locked in a battle of survival against the invasion of two major Ork Waaagh!s. The residents of this Forge World have a reputation for fi erceness.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Triplex / Phall', description: 'Forge of the Eastern Frontier: Isolated on the Eastern Fringe, this Forge World is considered somewhat insubordinate to Mars. Autonomous and independently-minded, Triplex Phall sends numerous explorator fl eets to discover new worlds and resources.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Daimos', description: 'The Gift of the Sigillite: Relocated from the orbit of Mars to Titan, this heavily-industrialised moon produces highly-specialised wargear for the Grey Knights—a secret Chapter of Space Marines tasked with directly combating the threat of daemons and Chaos.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Voss Prime', description: 'The Right Hand of Mars: Modelled after Mars, Voss Prime is second only to that world in production of armaments for the Imperium. The Forge World’s vaunted capacity has gai-ned them praise for Vosspattern vehicles, but they have struggled to master replicating plasma technology.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Gryphonne IV', description: 'The Lost Forge: The formidable defences of this Forge World were overrun by the assault of Hive Fleet Leviathan. Certain that their fortifi cations would ensure victory, the defenders fought with valour and skill. However, the Tyranids shattered Gryphonne IV’s armies and laid waste to the world. Only a relative handful of survivors escaped.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Avachrus', description: '(See CORE pg. xx)' },

      // Astartes Chapters
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Blood Angels', description: 'Masters of melee combat, the Blood Angels readily charge into hordes of even the most capable foes, often overcoming terrible odds. Horus slew Sanguinius during the attack on blessed Terra, and visions of that death haunt the minds of every battle brother. Fury from that tragedy keeps all Blood Angels on the verge of complete loss of control.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Dark Angels', description: 'The Dark Angels demonstrate no emotion when they engage their opponents. They have no mercy for the Imperium’s foes, nor do they take pride in even their greatest triumphs. Their darkest secret is that members of the founding Legion turned against the Imperium—though this is known only to the highest-ranking members of the chapter. The Dark Angels and their successors strive endlessly to fi nd and eliminate their Fallen brethren.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Imperial Fists', description: 'The Imperial Fists proudly assume the responsibility for defending blessed Terra from invaders, including traitors and xenos. They are masters of siegecraft, exhibiting the patience and determination to outlast a foe in combination with a well-earned recognition for exceptional marksmanship. After the Horus Heresy, the Imperial Fists embraced the Codex Astartes, following its tenets to the letter.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Iron Hands', description: 'The Iron Hands see flesh and emotion as weaknesses to be excised. In battle, they always strive to fight without emotion, following a strategy directed entirely by logic. To purge themselves of weakness, Iron Hands replace their body’s fl esh with cybernetics—including the replacement of healthy tissues. These beliefs have led the chapter to build close ties to the Adeptus Mechanicus.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Raven Guard', description: 'The Raven Guard prefer to fight covertly, executing swift strikes from the shadows and rapid withdrawals instead of protracted engagements on open battlefi elds. While they are fully capable and equipped to execute more straightforward attacks, their numbers are limited due to fl aws in their gene-seed. Consequently, they prefer to execute focused attacks, exploiting what they can identify as the enemy’s weakest points.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Salamanders', description: 'The Salamanders’ Seed World is the planet Nocturne, a planet of exotic radiation and constant lava fl ows. They are known for their fi erce determination and endurance, which complement their skill at arms. The Salamanders are the only legion that did not divide into other chapters during the Second Founding, due to the severe losses they suffered during the Horus Heresy.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Space Wolves', description: 'The Space Wolves are fiercely loyal to the Imperium, but they are a savage and boastful lot. They have no patience for the rules of the Codex Astartes or any other Imperial authority. Instead, they revel in their feral actions and appearance as they overcome any who would dare to oppose the Imperium.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Ultramarines', description: 'Ultramarines are renowned for their discipline, honour, and tactical acumen. In the wake of the Horus Heresy, the Ultramarines Legion composed nearly half of the Space Marines in the galaxy. By willingly dividing the Legion into chapters, they set the example that enabled the second founding to succeed and provide a basis for the other legions to embrace the Codex Astartes.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'White Scars', description: 'The White Scars embrace strategies built around rapid and savage attacks, striking at an opponent and withdrawing before the foe has any opportunity to make a counterstrike. They prefer to attack from vehicles, deploying from transports or riding bikes or Land Speeders into battle. Their traditions prize ferocity, tempered by an inherent sense of honour and justice.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Other Chapter', description: 'An unkown chapter in the vast space.' },

      { source: 'dod', type: 'Chapter House of the Adeptus Astartes', placeholder: '[Chapter]', name: '', description: 'Thrive for excellence.' },
      { source: 'dod', type: 'Chapter House of the Adeptus Astartes', placeholder: '[Chapter]', name: '', description: 'Break the Tide.' },

      // [Legion] -> Let the Galaxy Burn
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Black Legion', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Iron Warriors', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Night Lords', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'World Bearers', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Alpha Legion', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Death Guard', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Emperor`s Children', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Thousand Suns', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'World Eaters', description: '' },

      // [Enclave] -> The Null Hypothese
      { source: 'tnh', type: 'Enclave of the Sisters of Silence', placeholder: '[Enclave]', name: 'Raptor Guard', description: '' },
      { source: 'tnh', type: 'Enclave of the Sisters of Silence', placeholder: '[Enclave]', name: 'Storm Dagger', description: '' },
      { source: 'tnh', type: 'Enclave of the Sisters of Silence', placeholder: '[Enclave]', name: 'White Talon', description: '' },
      { source: 'tnh', type: 'Enclave of the Sisters of Silence', placeholder: '[Enclave]', name: 'Brazen Sabre', description: '' },
      { source: 'tnh', type: 'Enclave of the Sisters of Silence', placeholder: '[Enclave]', name: 'Vigil of Gilead', description: '' },

      // Marks of the Chaos Goods
      { type: 'Mark of Chaos', placeholder: '[Mark of Chaos]', name: 'Mark of Khorne', description: '' },
      { type: 'Mark of Chaos', placeholder: '[Mark of Chaos]', name: 'Mark of Tzzeench', description: '' },
      { type: 'Mark of Chaos', placeholder: '[Mark of Chaos]', name: 'Mark of Nurgle', description: '' },
      { type: 'Mark of Chaos', placeholder: '[Mark of Chaos]', name: 'Mark of Slaneesh', description: '' },
      { type: 'Mark of Chaos', placeholder: '[Mark of Chaos]', name: 'Chaos Undivided', description: '' },

      // Eldar Craftworlds
      //{ type: 'Aeldari Craftsworld', placeholder: '[Craftworld]', name: 'Alaitoc', description: 'The Starstriders: The Eldar of Alaitoc have spread further afi eld than other Craftworlds, acting as their people’s eyes and ears as they wander the galaxy. The warriors of Alaitoc favour stealth and misdirection over brute force.' },
      //{ type: 'Aeldari Craftsworld', placeholder: '[Craftworld]', name: 'Biel-Tan', description: 'The Swordwind: This is the most militant of all Craftworlds. Those who strive hardest to return to the glory of their people before the Fall, the Eldar of Biel-Tan mourn the shattering of their Craftworld during an invasion by the forces of Slaanesh.' },
      //{ type: 'Aeldari Craftsworld', placeholder: '[Craftworld]', name: 'Iyanden', description: 'The Ghost Warriors: Once a thriving Craftworld, Iyanden was invaded by Tyranids of Hive Fleet Kraken. The Eldar fought off this brutal assault at great cost. Now, most of the Craftworld is empty, forcing the Iyanden Farseers to call upon their fallen to fight for survival.' },
      //{ type: 'Aeldari Craftsworld', placeholder: '[Craftworld]', name: 'Saim-Hann', description: 'The Wild Host: The Eldar of Saim-Hann are renowned for their fast, mobile warfare. They are a Craftworld of ancient tradition and a proud warrior culture. They observe many rituals that are unique to their Craftworld, including special races and duels.' },
      //{ type: 'Aeldari Craftsworld', placeholder: '[Craftworld]', name: 'Ulthwé', description: 'The Damned: This Craftworld has fought an unending war around the Eye of Terror. Ulthwé tends to involve itself in the events of the galaxy far more than other Craftworlds. It is also home to many of the most powerful psykers in the galaxy. Some Eldar believe this Craftworld is cursed due to its proximity to the Eye of Terror.' },
  

      // { placeholder: '<>', name: '', description: '' },
    ];
    return {
      keywordRepository,
      keywordSubwordRepository,
      keywordCombinedRepository: [ ...keywordRepository, ...keywordSubwordRepository],
    };
  },
};
