import { DndBackground } from '../types/character';

export const backgrounds: DndBackground[] = [
  {
    name: 'Acolyte',
    description: 'Vous avez passé votre vie au service d\'un temple dédié à un dieu spécifique.',
    skillProficiencies: ['Intuition', 'Religion'],
    languages: 2,
    equipment: ['Symbole sacré', 'Livre de prières', 'Bâtons d\'encens', 'Vêtements de cérémonie'],
    feature: 'Abri du fidèle'
  },
  {
    name: 'Criminel',
    description: 'Vous êtes un criminel expérimenté avec des contacts dans le monde du crime.',
    skillProficiencies: ['Escamotage', 'Furtivité'],
    languages: 0,
    equipment: ['Pied-de-biche', 'Vêtements sombres', 'Ceinture avec une bourse', 'Outils de voleur'],
    feature: 'Contact criminel'
  },
  {
    name: 'Héros du peuple',
    description: 'Vous venez d\'une origine humble mais vous êtes destiné à de grandes choses.',
    skillProficiencies: ['Dressage', 'Survie'],
    languages: 0,
    equipment: ['Outils d\'artisan', 'Pelle', 'Vêtements de travail', 'Ceinture avec une bourse'],
    feature: 'Hospitalité rustique'
  },
  {
    name: 'Noble',
    description: 'Vous comprenez la richesse, le pouvoir et les privilèges.',
    skillProficiencies: ['Histoire', 'Persuasion'],
    languages: 1,
    equipment: ['Vêtements raffinés', 'Chevalière', 'Parchemin de généalogie', 'Bourse'],
    feature: 'Position de privilège'
  },
  {
    name: 'Sage',
    description: 'Vous avez passé des années à apprendre les traditions du monde.',
    skillProficiencies: ['Arcanes', 'Histoire'],
    languages: 2,
    equipment: ['Bouteille d\'encre', 'Plume', 'Petit couteau', 'Vêtements de savant'],
    feature: 'Chercheur'
  },
  {
    name: 'Soldat',
    description: 'Vous avez une expérience militaire en tant que combattant.',
    skillProficiencies: ['Athlétisme', 'Intimidation'],
    languages: 0,
    equipment: ['Insigne de grade', 'Trophée d\'ennemi', 'Cartes à jouer', 'Vêtements communs'],
    feature: 'Grade militaire'
  },
  {
    name: 'Artisan de guilde',
    description: 'Vous êtes membre d\'une guilde d\'artisans.',
    skillProficiencies: ['Intuition', 'Persuasion'],
    languages: 1,
    equipment: ['Outils d\'artisan', 'Lettre d\'introduction', 'Vêtements de voyageur', 'Bourse'],
    feature: 'Adhésion à une guilde'
  },
  {
    name: 'Ermite',
    description: 'Vous avez vécu dans la solitude, loin de la société.',
    skillProficiencies: ['Médecine', 'Religion'],
    languages: 1,
    equipment: ['Kit d\'herboriste', 'Parchemin', 'Vêtements en lambeaux', 'Ceinture avec une bourse'],
    feature: 'Découverte'
  },
  {
    name: 'Artiste',
    description: 'Vous vous épanouissez devant un public.',
    skillProficiencies: ['Acrobaties', 'Représentation'],
    languages: 0,
    equipment: ['Instrument de musique', 'Faveur d\'un admirateur', 'Costume', 'Bourse'],
    feature: 'Selon la rumeur publique'
  },
  {
    name: 'Charlatan',
    description: 'Vous avez toujours eu un don pour tromper les gens.',
    skillProficiencies: ['Escamotage', 'Tromperie'],
    languages: 0,
    equipment: ['Kit de contrefaçon', 'Kit de déguisement', 'Bagues de chevalière', 'Vêtements raffinés'],
    feature: 'Fausse identité'
  }
];