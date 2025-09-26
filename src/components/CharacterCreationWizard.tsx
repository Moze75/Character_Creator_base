import React, { useState, useMemo, useEffect } from 'react';
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

const steps = ['Race', 'Classe', 'Historique', 'Caractéristiques', 'Résumé'];

export default function CharacterCreationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [characterName, setCharacterName] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedClass, setSelectedClass] = useState<DndClass | ''>('');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [backgroundEquipmentOption, setBackgroundEquipmentOption] = useState<'A' | 'B' | ''>('');
  const [abilities, setAbilities] = useState<Record<string, number>>({
    'Force': 8, 'Dextérité': 8, 'Constitution': 8, 'Intelligence': 8, 'Sagesse': 8, 'Charisme': 8
  });
  const [effectiveAbilities, setEffectiveAbilities] = useState<Record<string, number>>(abilities);

  // Nouveau: compétences choisies pour la classe
  const [selectedClassSkills, setSelectedClassSkills] = useState<string[]>([]);
  useEffect(() => {
    // reset quand la classe change
    setSelectedClassSkills([]);
  }, [selectedClass]);

  const selectedBackgroundObj = useMemo(
    () => backgrounds.find(b => b.name === selectedBackground) || null,
    [selectedBackground]
  );

  useEffect(() => {
    setBackgroundEquipmentOption('');
  }, [selectedBackground]);

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, steps.length - 1));
  const previousStep = () => setCurrentStep(s => Math.max(s - 1, 0));

  const handleFinish = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Vous devez être connecté pour créer un personnage');
        return;
      }
      const raceData = races.find(r => r.name === selectedRace);
      const classData = classes.find(c => c.name === selectedClass);

      const finalAbilities = { ...effectiveAbilities };
      if (raceData?.abilityScoreIncrease) {
        Object.entries(raceData.abilityScoreIncrease).forEach(([ability, bonus]) => {
          if (finalAbilities[ability] != null) finalAbilities[ability] += bonus;
        });
      }

      const hitPoints = calculateHitPoints(finalAbilities['Constitution'] || 10, selectedClass as DndClass);
      const armorClass = calculateArmorClass(finalAbilities['Dextérité'] || 10);
      const initiative = calculateModifier(finalAbilities['Dextérité'] || 10);

      // TODO: insérer dans la DB comme avant; on n’affiche pas la partie BDD ici pour rester concis
      toast.success('Personnage prêt à être créé.');
    } catch (e) {
      console.error(e);
      toast.error('Erreur lors de la création du personnage');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <RaceSelection selectedRace={selectedRace} onRaceSelect={setSelectedRace} onNext={nextStep} />;
      case 1:
        return (
          <ClassSelection
            selectedClass={selectedClass}
            onClassSelect={setSelectedClass}
            selectedSkills={selectedClassSkills}
            onSelectedSkillsChange={setSelectedClassSkills}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 2:
        return (
          <BackgroundSelection
            selectedBackground={selectedBackground}
            onBackgroundSelect={setSelectedBackground}
            selectedEquipmentOption={backgroundEquipmentOption}
            onEquipmentOptionChange={setBackgroundEquipmentOption}
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
            selectedBackgroundEquipmentOption={backgroundEquipmentOption}
            abilities={effectiveAbilities}
            // Si tu as ajouté l’affichage des compétences, passe aussi selectedClassSkills ici
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
      <Toaster position="top-right" toastOptions={{ className: 'bg-gray-800 text-white border border-gray-700', duration: 4000 }} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Créateur de Personnage D&D</h1>
            <p className="text-gray-400">Créez votre héros pour vos aventures dans les Donjons et Dragons</p>
          </div>
          <ProgressBar currentStep={currentStep} totalSteps={steps.length - 1} steps={steps} />
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 md:p-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}