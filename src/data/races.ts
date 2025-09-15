import { DndRace } from '../types/character';

export const races: DndRace[] = [
  {
    name: 'Humain',
    description: 'Polyvalents et ambitieux, les humains sont l\'une des races les plus courantes.',
    abilityScoreIncrease: { 'Force': 1, 'Dextérité': 1, 'Constitution': 1, 'Intelligence': 1, 'Sagesse': 1, 'Charisme': 1 },
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Au choix'],
    proficiencies: [],
    traits: ['Compétence supplémentaire', 'Don supplémentaire']
  },
  {
    name: 'Elfe',
    description: 'Gracieux et magiques, les elfes vivent en harmonie avec la nature.',
    abilityScoreIncrease: { 'Dextérité': 2 },
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Elfique'],
    proficiencies: ['Perception'],
    traits: ['Vision dans le noir', 'Ascendance féerique', 'Transe']
  },
  {
    name: 'Nain',
    description: 'Robustes et déterminés, les nains sont des artisans et guerriers redoutables.',
    abilityScoreIncrease: { 'Constitution': 2 },
    size: 'Moyen',
    speed: 25,
    languages: ['Commun', 'Nain'],
    proficiencies: ['Haches de guerre', 'Marteaux de guerre'],
    traits: ['Vision dans le noir', 'Résistance naine', 'Connaissance de la pierre']
  },
  {
    name: 'Halfelin',
    description: 'Petits mais courageux, les halfelins sont connus pour leur chance.',
    abilityScoreIncrease: { 'Dextérité': 2 },
    size: 'Petit',
    speed: 25,
    languages: ['Commun', 'Halfelin'],
    proficiencies: [],
    traits: ['Chanceux', 'Brave', 'Agilité halfeline']
  },
  {
    name: 'Drakéide',
    description: 'Descendants des dragons, ils possèdent des pouvoirs draconiques.',
    abilityScoreIncrease: { 'Force': 2, 'Charisme': 1 },
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Draconique'],
    proficiencies: [],
    traits: ['Ascendance draconique', 'Souffle destructeur', 'Résistance aux dégâts']
  },
  {
    name: 'Gnome',
    description: 'Petits et curieux, les gnomes excellent dans la magie et la technologie.',
    abilityScoreIncrease: { 'Intelligence': 2 },
    size: 'Petit',
    speed: 25,
    languages: ['Commun', 'Gnome'],
    proficiencies: [],
    traits: ['Vision dans le noir', 'Ruse gnome', 'Communication avec les petites bêtes']
  },
  {
    name: 'Demi-Elfe',
    description: 'Mélange d\'humain et d\'elfe, ils naviguent entre deux mondes.',
    abilityScoreIncrease: { 'Charisme': 2 },
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Elfique', 'Au choix'],
    proficiencies: ['2 compétences au choix'],
    traits: ['Vision dans le noir', 'Ascendance féerique', 'Polyvalence']
  },
  {
    name: 'Demi-Orc',
    description: 'Força et sauvagerie, les demi-orcs luttent pour trouver leur place.',
    abilityScoreIncrease: { 'Force': 2, 'Constitution': 1 },
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Orc'],
    proficiencies: [],
    traits: ['Vision dans le noir', 'Endurance implacable', 'Attaques sauvages']
  },
  {
    name: 'Tieffelin',
    description: 'Marqués par un héritage infernal, ils portent le fardeau de leur ascendance.',
    abilityScoreIncrease: { 'Intelligence': 1, 'Charisme': 2 },
    size: 'Moyen',
    speed: 30,
    languages: ['Commun', 'Infernal'],
    proficiencies: [],
    traits: ['Vision dans le noir', 'Résistance infernale', 'Héritage infernal']
  }
];