import React, { useState, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ProgressBar from './ui/ProgressBar';
import RaceSelection from './steps/RaceSelection';
import ClassSelection from './steps/ClassSelection';
import AbilityScores from './steps/AbilityScores';
import BackgroundSelection from './steps/BackgroundSelection';
import CharacterSummary from './steps/CharacterSummary';
import { DndClass } from '../types/character';
import { supabase } from '../lib/supabase';
import { calculateHitPoints, calculateArmorClass, calculateModifier } from '../utils/dndCalculations';
import { races } from '../data/races';
import { classes } from '../data/classes';
import { backgrounds } from '../data/backgrounds';

const steps = [
  'Race',
  'Classe',
  'Historique',
  'Caractéristiques',
  'Résumé'
];

export default function CharacterCreationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [characterName, setCharacterName] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedClass, setSelectedClass] = useState<DndClass | ''>('');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [abilities, setAbilities] = useState<Record<string, number>>({
    'Force': 8,
    'Dextérité': 8,
    'Constitution': 8,
    'Intelligence': 8,
    'Sagesse': 8,
    'Charisme': 8
  });
  // Scores finaux (base + historique), renvoyés par AbilityScores
  const [effectiveAbilities, setEffectiveAbilities] = useState<Record<string, number>>(abilities);

  // Résoudre l'objet d'historique sélectionné
  const selectedBackgroundObj = useMemo(
    () => backgrounds.find(b => b.name === selectedBackground) || null,
    [selectedBackground]
  );

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Vous devez être connecté pour créer un personnage');
        return;
      }

      const raceData = races.find(r => r.name === selectedRace);
      const classData = classes.find(c => c.name === selectedClass);

      // Partir des scores finaux (déjà incluant l’historique)
      const finalAbilities = { ...effectiveAbilities };
      
      // Appliquer les bonus raciaux si présents
      if (raceData && raceData.abilityScoreIncrease) {
        Object.entries(raceData.abilityScoreIncrease).forEach(([ability, bonus]) => {
          if (finalAbilities[ability] != null) {
            finalAbilities[ability] += bonus;
          }
        });
      }

      const hitPoints = calculateHitPoints(finalAbilities['Constitution'] || 10, selectedClass as DndClass);
      const armorClass = calculateArmorClass(finalAbilities['Dextérité'] || 10);
      const initiative = calculateModifier(finalAbilities['Dextérité'] || 10);

      const characterData = {
        user_id: user.id,
        name: characterName,
        level: 1,
        current_hp: hitPoints,
        max_hp: hitPoints,
        class: selectedClass,
        // sous-classe retirée au niveau 1
        subclass: null,
        stats: {
          armor_class: armorClass,
          initiative: initiative,
          speed: raceData?.speed || 30,
          proficiency_bonus: 2,
          inspirations: 0
        },
        abilities: {
          strength: finalAbilities['Force'] || 10,
          dexterity: finalAbilities['Dextérité'] || 10,
          constitution: finalAbilities['Constitution'] || 10,
          intelligence: finalAbilities['Intelligence'] || 10,
          wisdom: finalAbilities['Sagesse'] || 10,
          charisma: finalAbilities['Charisme'] || 10
        },
        equipment: {
          race: selectedRace,
          background: selectedBackground,
          starting_equipment: classData?.equipment || []
        },
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('players')
        .insert([characterData]);

      if (error) {
        console.error('Error creating character:', error);
        toast.error('Erreur lors de la création du personnage');
      } else {
        toast.success('Personnage créé avec succès !');
        // Reset form
        setCurrentStep(0);
        setCharacterName('');
        setSelectedRace('');
        setSelectedClass('');
        setSelectedBackground('');
        setAbilities({
          'Force': 8,
          'Dextérité': 8,
          'Constitution': 8,
          'Intelligence': 8,
          'Sagesse': 8,
          'Charisme': 8
        });
        setEffectiveAbilities({
          'Force': 8,
          'Dextérité': 8,
          'Constitution': 8,
          'Intelligence': 8,
          'Sagesse': 8,
          'Charisme': 8
        });
      }
    } catch (error) {
      console.error('Error creating character:', error);
      toast.error('Erreur lors de la création du personnage');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <RaceSelection
            selectedRace={selectedRace}
            onRaceSelect={setSelectedRace}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <ClassSelection
            selectedClass={selectedClass}
            onClassSelect={setSelectedClass}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 2:
        return (
          <BackgroundSelection
            selectedBackground={selectedBackground}
            onBackgroundSelect={setSelectedBackground}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 3:
        return (
          <AbilityScores
            abilities={abilities}
            onAbilitiesChange={setAbilities}
            selectedBackground={selectedBackgroundObj}
            onEffectiveAbilitiesChange={setEffectiveAbilities}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 4:
        return (
          <CharacterSummary
            characterName={characterName}
            onCharacterNameChange={setCharacterName}
            selectedRace={selectedRace}
            selectedClass={selectedClass as DndClass}
            selectedBackground={selectedBackground}
            abilities={effectiveAbilities}
            onFinish={handleFinish}
            onPrevious={previousStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-fantasy relative">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-gray-800 text-white border border-gray-700',
          duration: 4000,
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Créez votre personnage
            </h1>
            <p className="text-gray-400">
              Choisissez vite mais choisissez bien !
            </p>
          </div>

          <ProgressBar
            currentStep={currentStep}
            totalSteps={steps.length - 1}
            steps={steps}
          />

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 md:p-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}