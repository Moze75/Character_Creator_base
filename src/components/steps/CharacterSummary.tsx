import React, { useState, useMemo } from 'react';
import Button from '../ui/Button';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Input from '../ui/Input';
import { calculateHitPoints, calculateArmorClass, calculateModifier, getProficiencyBonus } from '../../utils/dndCalculations';
import { races } from '../../data/races';
import { classes } from '../../data/classes';
import { backgrounds } from '../../data/backgrounds';
import { DndClass } from '../../types/character';
import { User, Heart, Shield, Zap, Users, BookOpen } from 'lucide-react';
import { CANONICAL_SKILLS, normalizeSkill, calculateSkillBonus } from '../../data/skills';

interface CharacterSummaryProps {
  characterName: string;
  onCharacterNameChange: (name: string) => void;
  selectedRace: string;
  selectedClass: DndClass;
  selectedBackground: string;
  abilities: Record<string, number>; // déjà base + historique
  selectedClassSkills: string[];      // normalisées
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
  selectedClassSkills,
  onFinish, 
  onPrevious 
}: CharacterSummaryProps) {
  const [nameError, setNameError] = useState('');

  const raceData = races.find(r => r.name === selectedRace);
  const classData = classes.find(c => c.name === selectedClass);
  const backgroundData = backgrounds.find(b => b.name === selectedBackground);

  // Appliquer également les bonus raciaux sur les abilities passées
  const finalAbilities = useMemo(() => {
    const fa = { ...abilities };
    if (raceData?.abilityScoreIncrease) {
      Object.entries(raceData.abilityScoreIncrease).forEach(([ability, bonus]) => {
        if (fa[ability] != null) fa[ability] += bonus;
      });
    }
    return fa;
  }, [abilities, raceData]);

  const hitPoints = calculateHitPoints(finalAbilities['Constitution'] || 10, selectedClass);
  const armorClass = calculateArmorClass(finalAbilities['Dextérité'] || 10);
  const initiative = calculateModifier(finalAbilities['Dextérité'] || 10);

  // Maîtrises issues de l'historique (normalisées)
  const backgroundSkills = useMemo(() => {
    const arr = backgroundData?.skillProficiencies ?? [];
    return Array.from(new Set(arr.map(normalizeSkill)));
  }, [backgroundData]);

  // Maîtrises totales: union classe + historique (normalisées)
  const proficientSet = useMemo(() => {
    const set = new Set<string>();
    selectedClassSkills.forEach((s) => set.add(normalizeSkill(s)));
    backgroundSkills.forEach((s) => set.add(normalizeSkill(s)));
    return set;
  }, [selectedClassSkills, backgroundSkills]);

  const proficiencyBonus = getProficiencyBonus(1);

  const handleFinishClick = () => {
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
              <span className="text-white font-medium">
                {/* Si vous êtes passé en mètres ailleurs, adaptez ici également */}
                {races.find(r => r.name === selectedRace)?.speed ?? 30} ft
              </span>
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
            {Object.entries(finalAbilities || {}).map(([ability, score]) => (
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

      {/* Synthèse des compétences avec bonus */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Users className="w-5 h-5 text-purple-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Compétences</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-400 mb-3">
            Bonus de maîtrise: +{proficiencyBonus} | Maîtrises: classe + historique
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
            {CANONICAL_SKILLS.map((skill) => {
              const proficient = proficientSet.has(skill);
              const bonus = calculateSkillBonus(skill, finalAbilities, proficient, proficiencyBonus);
              const bonusText = `${bonus >= 0 ? '+' : ''}${bonus}`;
              return (
                <div key={skill} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">
                    {skill}{' '}
                    {proficient && <span className="text-xs text-red-400">[M]</span>}
                  </span>
                  <span className="text-white font-medium">{bonusText}</span>
                </div>
              );
            })}
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
              {races.find(r => r.name === selectedRace)?.traits?.map((trait, index) => (
                <li key={index}>• {trait}</li>
              )) || <li className="text-gray-500">Aucun trait racial disponible</li>}
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
              {classData?.features?.map((feature, index) => (
                <li key={index}>• {feature}</li>
              )) || <li className="text-gray-500">Aucune capacité de classe disponible</li>}
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
          onClick={handleFinishClick}
          size="lg"
          className="min-w-[200px]"
        >
          Créer le personnage
        </Button>
      </div>
    </div>
  );
}