import React, { useState } from 'react';
import Button from '../ui/Button';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Input from '../ui/Input';
import { calculateHitPoints, calculateArmorClass, calculateModifier } from '../../utils/dndCalculations';
import { races } from '../../data/races';
import { classes } from '../../data/classes';
import { backgrounds } from '../../data/backgrounds';
import { DndClass } from '../../types/character';
import { User, Heart, Shield, Zap, Users, BookOpen } from 'lucide-react';

interface CharacterSummaryProps {
  characterName: string;
  onCharacterNameChange: (name: string) => void;
  selectedRace: string;
  selectedClass: DndClass;
  selectedBackground: string;
  abilities: Record<string, number>;
  onFinish: () => void;
  onPrevious: () => void;
}

export default function CharacterSummary({ 
  characterName, 
  onCharacterNameChange, 
  selectedRace, 
  selectedClass, 
  selectedBackground, 
  abilities, 
  onFinish, 
  onPrevious 
}: CharacterSummaryProps) {
  const [nameError, setNameError] = useState('');

  const raceData = races.find(r => r.name === selectedRace);
  const classData = classes.find(c => c.name === selectedClass);
  const backgroundData = backgrounds.find(b => b.name === selectedBackground);

  const finalAbilities = { ...abilities };
  
  // Apply racial bonuses
  if (raceData) {
    Object.entries(raceData.abilityScoreIncrease).forEach(([ability, bonus]) => {
      if (finalAbilities[ability]) {
        finalAbilities[ability] += bonus;
      }
    });
  }

  const hitPoints = calculateHitPoints(finalAbilities['Constitution'] || 10, selectedClass);
  const armorClass = calculateArmorClass(finalAbilities['Dextérité'] || 10);
  const initiative = calculateModifier(finalAbilities['Dextérité'] || 10);

  const handleFinish = () => {
    if (!characterName.trim()) {
      setNameError('Le nom du personnage est requis');
      return;
    }
    setNameError('');
    onFinish();
  };

  return (
    <div className="wizard-step space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Résumé de votre personnage</h2>
        <p className="text-gray-400">Vérifiez les détails avant de créer votre personnage</p>
      </div>

      <div className="max-w-md mx-auto">
        <Input
          label="Nom du personnage"
          value={characterName}
          onChange={(e) => onCharacterNameChange(e.target.value)}
          error={nameError}
          placeholder="Entrez le nom de votre personnage"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <User className="w-5 h-5 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Informations de base</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Race:</span>
              <span className="text-white font-medium">{selectedRace}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Classe:</span>
              <span className="text-white font-medium">{selectedClass}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Historique:</span>
              <span className="text-white font-medium">{selectedBackground}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Niveau:</span>
              <span className="text-white font-medium">1</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-red-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Statistiques de combat</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Points de vie:</span>
              <span className="text-white font-medium">{hitPoints}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Classe d'armure:</span>
              <span className="text-white font-medium">{armorClass}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Initiative:</span>
              <span className="text-white font-medium">
                {initiative >= 0 ? '+' : ''}{initiative}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Vitesse:</span>
              <span className="text-white font-medium">{raceData?.speed || 30} ft</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Zap className="w-5 h-5 text-yellow-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Caractéristiques</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(finalAbilities).map(([ability, score]) => (
              <div key={ability} className="text-center">
                <div className="ability-score">
                  <div className="font-medium text-white text-sm">{ability}</div>
                  <div className="text-2xl font-bold text-white">{score}</div>
                  <div className="text-sm text-gray-400">
                    {calculateModifier(score) >= 0 ? '+' : ''}{calculateModifier(score)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-purple-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Traits raciaux</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-gray-300 text-sm space-y-1">
              {raceData?.traits.map((trait, index) => (
                <li key={index}>• {trait}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 text-green-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Capacités de classe</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-gray-300 text-sm space-y-1">
              {classData?.features.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="secondary"
          size="lg"
        >
          Précédent
        </Button>
        <Button
          onClick={handleFinish}
          size="lg"
          className="min-w-[200px]"
        >
          Créer le personnage
        </Button>
      </div>
    </div>
  );
}