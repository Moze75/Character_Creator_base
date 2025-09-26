import { DndRace } from '../types/character';

export const races: DndRace[] = [
  {
    name: 'Humain',
    description: 'Polyvalents et adaptables, les humains se distinguent par leur ambition.',
    size: 'Moyen ou Petit',
    speed: 30,
    languages: ['Commun', 'Au choix'],
    proficiencies: [],
    traits: ['Compétent (maîtrise d\'une compétence)', 'Ingénieux (inspiration héroïque après repos long)', 'Don d\'origine (au choix)']
  },
  {
    name: 'Elfe',
    description: 'Gracieux et proches de la magie, les elfes vivent en harmonie avec la nature.',
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Au choix'],
    proficiencies: ['Perception'],
    traits: ['Vision dans le noir (18 m)', 'Ascendance féerique (avantage contre Charmé)', 'Transe (repos long en 4h)', 'Lignage elfique (sorts selon la lignée)']
  },
  {
    name: 'Demi-Elfe',
    description: 'Nés de l\'union entre humain et elfe, ils naviguent entre deux mondes.',
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Au choix'],
    proficiencies: ['Une compétence au choix'],
    traits: ['Vision dans le noir (18 m)', 'Ascendance féerique (avantage contre Charmé)', 'Ingénieux (inspiration héroïque après repos long)', 'Lignage elfique (sorts selon la lignée)']
  },
  {
    name: 'Nain',
    description: 'Robustes et endurants, les nains sont d\'excellents artisans et combattants.',
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Au choix'],
    proficiencies: [],
    traits: ['Vision dans le noir (36 m)', 'Résistance naine (avantage contre poison)', 'Connaissance de la pierre', 'Ténacité naine (+1 pv par niveau)']
  },
  {
    name: 'Halfelin',
    description: 'Petits mais courageux, les halfelins sont réputés pour leur chance.',
    size: 'Petit',
    speed: 25,
    languages: ['Commun', 'Au choix'],
    proficiencies: [],
    traits: ['Chanceux (relance les 1)', 'Brave (avantage contre Effrayé)', 'Agilité halfeline', 'Discrétion naturelle']
  },
  {
    name: 'Drakéide',
    description: 'Descendants des dragons, les drakéides possèdent des pouvoirs draconiques.',
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Au choix'],
    proficiencies: [],
    traits: ['Ascendance draconique (choix du type de dragon)', 'Souffle draconique (1d10 → évolutif)', 'Résistance draconique', 'Vol draconique (niv 5, repos long)']
  },
  {
    name: 'Gnome',
    description: 'Petits et curieux, les gnomes excellent dans la magie et l\'ingéniosité.',
    size: 'Petit',
    speed: 30,
    languages: ['Commun', 'Au choix'],
    proficiencies: [],
    traits: ['Vision dans le noir (18 m)', 'Ruse gnome (avantage aux JS mentaux)', 'Lignage gnome (forêt ou roches, sorts associés)']
  },
  {
    name: 'Orc',
    description: 'Fiers et puissants, les orcs sont marqués par leur force et leur ténacité.',
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Au choix'],
    proficiencies: [],
    traits: ['Vision dans le noir (36 m)', 'Acharnement (rester à 1 pv 1/long rest)', 'Poussée d\'adrénaline (points de vie temporaires + déplacement, selon bonus de maîtrise)']
  },
  {
    name: 'Demi-Orc',
    description: 'Issus de l\'union d\'humains et d\'orcs, ils héritent d\'une grande endurance.',
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Au choix'],
    proficiencies: [],
    traits: ['Vision dans le noir (36 m)', 'Acharnement (rester à 1 pv 1/long rest)', 'Ingénieux (inspiration héroïque après repos long)']
  },
  {
    name: 'Tieffelin',
    description: 'Marqués par un héritage infernal, les tieffelins portent en eux la magie des enfers.',
    size: 'Moyen ou Petit',
    speed: 30,
    languages: ['Commun', 'Au choix'],
    proficiencies: [],
    traits: ['Vision dans le noir (18 m)', 'Héritage fiélon (Infernal, Abyssal ou Chtonien, sorts associés)', 'Présence d\'outre-monde (thaumaturgie)']
  },
  {
    name: 'Aasimar',
    description: 'Descendants des plans célestes, porteurs de lumière et de puissance divine.',
    size: 'Moyen ou Petit',
    speed: 30,
    languages: ['Commun', 'Au choix'],
    proficiencies: [],
    traits: ['Vision dans le noir (18 m)', 'Mains guérisseuses (soins, repos long)', 'Résistance céleste (radiant & nécrotique)', 'Porte-lumière (lumière)', 'Révélation céleste (ailes, linceul, radiance)']
  },
  {
    name: 'Goliath',
    description: 'Descendants des géants, les goliaths possèdent une puissance colossale.',
    size: 'Moyen (grands)',
    speed: 35,
    languages: ['Commun', 'Au choix'],
    proficiencies: [],
    traits: ['Ascendance gigantesque (choix de pouvoir lié aux géants)', 'Vision dans le noir (18 m)', 'Forme de géant (niv 5, 1/long rest)', 'Forte carrure (capacité de charge accrue)']
  }
];