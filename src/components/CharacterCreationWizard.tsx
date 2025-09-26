import React, { useEffect, useMemo, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import ProgressBar from './ui/ProgressBar';
import RaceSelection from './steps/RaceSelection';
import ClassSelection from './steps/ClassSelection';
import BackgroundSelection from './steps/BackgroundSelection';
import AbilityScores from './steps/AbilityScores';
import CharacterSummary from './steps/CharacterSummary';

import { DndClass } from '../types/character';
import { supabase } from '../lib/supabase';
import { calculateArmorClass, calculateHitPoints, calculateModifier } from '../utils/dndCalculations';

import { races } from '../data/races';
import { classes } from '../data/classes';
import { backgrounds } from '../data/backgrounds';

// Ordre final sans sous-classe
const steps = ['Race', 'Classe', 'Historique', 'Caractéristiques', 'Résumé'];

export default function CharacterCreationWizard() {
  // Étapes
  const [currentStep, setCurrentStep] = useState(0);

  // Saisie de base
  const [characterName, setCharacterName] = useState('');

  // Choix principaux
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedClass, setSelectedClass] = useState<DndClass | ''>('');
  const [selectedBackground, setSelectedBackground] = useState('');

  // Choix dépendants
  const [backgroundEquipmentOption, setBackgroundEquipmentOption] = useState<'A' | 'B' | ''>('');
  const [selectedClassSkills, setSelectedClassSkills] = useState<string[]>([]); // normalisées

  // Caractéristiques (base) et “effectives” (base + historique)
  const [abilities, setAbilities] = useState<Record<string, number>>({
    'Force': 8,
    'Dextérité': 8,
    'Constitution': 8,
    'Intelligence': 8,
    'Sagesse': 8,
    'Charisme': 8,
  });
  const [effectiveAbilities, setEffectiveAbilities] = useState<Record<string, number>>(abilities);

  // Objet d'historique sélectionné
  const selectedBackgroundObj = useMemo(
    () => backgrounds.find((b) => b.name === selectedBackground) || null,
    [selectedBackground]
  );

  // Resets cohérents quand on change de classe / historique
  useEffect(() => {
    // Si la classe change, on réinitialise les compétences de classe choisies
    setSelectedClassSkills([]);
  }, [selectedClass]);

  useEffect(() => {
    // Si l’historique change, on réinitialise le choix d’équipement A/B
    setBackgroundEquipmentOption('');
  }, [selectedBackground]);

  // Navigation
  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const previousStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  // Finalisation / Enregistrement
  const handleFinish = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Vous devez être connecté pour créer un personnage');
        return;
      }

      const raceData = races.find((r) => r.name === selectedRace);
      const classData = classes.find((c) => c.name === selectedClass);

      // Partir des “abilities effectives” (base + historique) calculées dans AbilityScores
      const finalAbilities = { ...effectiveAbilities };

      // Appliquer les bonus raciaux si présents
      if (raceData?.abilityScoreIncrease) {
        Object.entries(raceData.abilityScoreIncrease).forEach(([ability, bonus]) => {
          if (finalAbilities[ability] != null) {
            finalAbilities[ability] += bonus;
          }
        });
      }

      // Dérivés de combat
      const hitPoints = calculateHitPoints(finalAbilities['Constitution'] || 10, selectedClass as DndClass);
      const armorClass = calculateArmorClass(finalAbilities['Dextérité'] || 10);
      const initiative = calculateModifier(finalAbilities['Dextérité'] || 10);

      // Équipement d’historique selon Option A/B (si dispo)
      const bgEquip =
        backgroundEquipmentOption === 'A'
          ? selectedBackgroundObj?.equipmentOptions?.optionA ?? []
          : backgroundEquipmentOption === 'B'
            ? selectedBackgroundObj?.equipmentOptions?.optionB ?? []
            : [];

      // Payload (on garde la structure d’origine pour éviter de casser la BDD)
      const characterData = {
        user_id: user.id,
        name: characterName,
        level: 1,
        current_hp: hitPoints,
        max_hp: hitPoints,
        class: selectedClass,
        subclass: null, // pas de sous-classe au niveau 1
        stats: {
          armor_class: armorClass,
          initiative: initiative,
          speed: raceData?.speed || 30,
          proficiency_bonus: 2,
          inspirations: 0,
        },
        abilities: {
          strength: finalAbilities['Force'] || 10,
          dexterity: finalAbilities['Dextérité'] || 10,
          constitution: finalAbilities['Constitution'] || 10,
          intelligence: finalAbilities['Intelligence'] || 10,
          wisdom: finalAbilities['Sagesse'] || 10,
          charisma: finalAbilities['Charisme'] || 10,
        },
        equipment: {
          race: selectedRace,
          background: selectedBackground,
          starting_equipment: classData?.equipment || [],
          // Ajouts “souples” dans l’objet equipment (JSON) pour éviter les changements de schéma
          background_equipment_option: backgroundEquipmentOption || null,
          background_equipment_items: bgEquip,
        },
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('players').insert([characterData]);

      if (error) {
        console.error('Error creating character:', error);
        toast.error('Erreur lors de la création du personnage');
        return;
      }

      toast.success('Personnage créé avec succès !');

      // Reset complet
      setCurrentStep(0);
      setCharacterName('');
      setSelectedRace('');
      setSelectedClass('');
      setSelectedBackground('');
      setBackgroundEquipmentOption('');
      setSelectedClassSkills([]);
      setAbilities({
        'Force': 8,
        'Dextérité': 8,
        'Constitution': 8,
        'Intelligence': 8,
        'Sagesse': 8,
        'Charisme': 8,
      });
      setEffectiveAbilities({
        'Force': 8,
        'Dextérité': 8,
        'Constitution': 8,
        'Intelligence': 8,
        'Sagesse': 8,
        'Charisme': 8,
      });
    } catch (err) {
      console.error('Error creating character:', err);
      toast.error('Erreur lors de la création du personnage');
    }
  };

  // Rendu des étapes
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
            // Wiring compétences cliquables dans la classe
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
            // Wiring Option A / B équipement d’historique
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
            // Remonte “base + historique” pour tout le reste du process
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
            // Si ton CharacterSummary a été mis à jour:
            // - affiche l’équipement d’historique A/B
            // - affiche la synthèse des compétences (si implémentée)
            selectedBackgroundEquipmentOption={backgroundEquipmentOption as any}
            selectedClassSkills={selectedClassSkills as any}
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
              Créateur de Personnage D&D
            </h1>
            <p className="text-gray-400">
              Créez votre héros pour vos aventures dans les Donjons et Dragons
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