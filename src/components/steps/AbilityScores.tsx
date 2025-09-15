import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { calculateModifier, validatePointBuy, standardArray, rollAbilityScore } from '../../utils/dndCalculations';
import { Dice1, RotateCcw, Calculator } from 'lucide-react';

interface AbilityScoresProps {
  abilities: Record<string, number>;
  onAbilitiesChange: (abilities: Record<string, number>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const abilityNames = ['Force', 'Dextérité', 'Constitution', 'Intelligence', 'Sagesse', 'Charisme'];

export default function AbilityScores({ abilities, onAbilitiesChange, onNext, onPrevious }: AbilityScoresProps) {
  const [method, setMethod] = useState<'pointbuy' | 'array' | 'roll'>('pointbuy');
  const [rolledScores, setRolledScores] = useState<number[]>([]);
  const [assignedScores, setAssignedScores] = useState<Record<string, number>>({});

  useEffect(() => {
    if (method === 'pointbuy') {
      const defaultScores = abilityNames.reduce((acc, ability) => {
        acc[ability] = 8;
        return acc;
      }, {} as Record<string, number>);
      onAbilitiesChange(defaultScores);
    } else if (method === 'array') {
      setAssignedScores({});
      onAbilitiesChange({});
    } else if (method === 'roll') {
      rollAllAbilities();
    }
  }, [method]);

  const rollAllAbilities = () => {
    const newScores = Array.from({ length: 6 }, () => rollAbilityScore());
    setRolledScores(newScores);
    setAssignedScores({});
    onAbilitiesChange({});
  };

  const handlePointBuyChange = (ability: string, value: number) => {
    const newAbilities = { ...abilities, [ability]: value };
    onAbilitiesChange(newAbilities);
  };

  const assignScore = (ability: string, scoreIndex: number) => {
    if (method === 'array') {
      const newAssigned = { ...assignedScores };
      
      // Remove previous assignment of this ability
      Object.keys(newAssigned).forEach(key => {
        if (newAssigned[key] === scoreIndex) {
          delete newAssigned[key];
        }
      });
      
      // Remove previous assignment of this score
      if (newAssigned[ability] !== undefined) {
        delete newAssigned[ability];
      }
      
      newAssigned[ability] = scoreIndex;
      setAssignedScores(newAssigned);
      
      const newAbilities = { ...abilities };
      newAbilities[ability] = standardArray[scoreIndex];
      onAbilitiesChange(newAbilities);
    } else if (method === 'roll') {
      const newAssigned = { ...assignedScores };
      
      // Remove previous assignments
      Object.keys(newAssigned).forEach(key => {
        if (newAssigned[key] === scoreIndex) {
          delete newAssigned[key];
        }
      });
      
      if (newAssigned[ability] !== undefined) {
        delete newAssigned[ability];
      }
      
      newAssigned[ability] = scoreIndex;
      setAssignedScores(newAssigned);
      
      const newAbilities = { ...abilities };
      newAbilities[ability] = rolledScores[scoreIndex];
      onAbilitiesChange(newAbilities);
    }
  };

  const pointBuyValidation = method === 'pointbuy' ? validatePointBuy(abilities) : { valid: true, pointsUsed: 0, errors: [] };
  const isArrayComplete = method === 'array' && Object.keys(assignedScores).length === 6;
  const isRollComplete = method === 'roll' && Object.keys(assignedScores).length === 6;
  const canProceed = (method === 'pointbuy' && pointBuyValidation.valid) || isArrayComplete || isRollComplete;

  return (
    <div className="wizard-step space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Déterminez vos caractéristiques</h2>
        <p className="text-gray-400">Choisissez votre méthode de génération des scores</p>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <Button
          variant={method === 'pointbuy' ? 'primary' : 'secondary'}
          onClick={() => setMethod('pointbuy')}
          size="sm"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Point Buy
        </Button>
        <Button
          variant={method === 'array' ? 'primary' : 'secondary'}
          onClick={() => setMethod('array')}
          size="sm"
        >
          Tableau standard
        </Button>
        <Button
          variant={method === 'roll' ? 'primary' : 'secondary'}
          onClick={() => setMethod('roll')}
          size="sm"
        >
          <Dice1 className="w-4 h-4 mr-2" />
          Lancer de dés
        </Button>
      </div>

      {method === 'pointbuy' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Point Buy System</h3>
              <div className="text-sm text-gray-400">
                Points utilisés: {pointBuyValidation.pointsUsed}/27
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {abilityNames.map((ability) => (
                <div key={ability} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">{ability}</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="8"
                      max="15"
                      value={abilities[ability] || 8}
                      onChange={(e) => handlePointBuyChange(ability, parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="w-16 text-center">
                      <span className="text-lg font-bold text-white">{abilities[ability] || 8}</span>
                      <div className="text-xs text-gray-400">
                        {calculateModifier(abilities[ability] || 8) >= 0 ? '+' : ''}{calculateModifier(abilities[ability] || 8)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {pointBuyValidation.errors.length > 0 && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
                <ul className="text-red-400 text-sm space-y-1">
                  {pointBuyValidation.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {method === 'array' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Tableau Standard</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-2 mb-4">
                {standardArray.map((score, index) => (
                  <div
                    key={index}
                    className={`text-center py-2 rounded-lg border-2 transition-colors ${
                      Object.values(assignedScores).includes(index)
                        ? 'border-red-500 bg-red-900/20'
                        : 'border-gray-600 bg-gray-800'
                    }`}
                  >
                    <div className="text-lg font-bold text-white">{score}</div>
                    <div className="text-xs text-gray-400">
                      {calculateModifier(score) >= 0 ? '+' : ''}{calculateModifier(score)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {abilityNames.map((ability) => (
                  <div key={ability} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">{ability}</label>
                    <select
                      value={assignedScores[ability] !== undefined ? assignedScores[ability] : ''}
                      onChange={(e) => e.target.value && assignScore(ability, parseInt(e.target.value))}
                      className="input-dark w-full"
                    >
                      <option value="">Sélectionner...</option>
                      {standardArray.map((score, index) => (
                        <option
                          key={index}
                          value={index}
                          disabled={Object.values(assignedScores).includes(index)}
                        >
                          {score} ({calculateModifier(score) >= 0 ? '+' : ''}{calculateModifier(score)})
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {method === 'roll' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Lancer de dés (4d6, garder les 3 meilleurs)</h3>
              <Button
                variant="secondary"
                size="sm"
                onClick={rollAllAbilities}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Relancer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-2 mb-4">
                {rolledScores.map((score, index) => (
                  <div
                    key={index}
                    className={`text-center py-2 rounded-lg border-2 transition-colors ${
                      Object.values(assignedScores).includes(index)
                        ? 'border-red-500 bg-red-900/20'
                        : 'border-gray-600 bg-gray-800'
                    }`}
                  >
                    <div className="text-lg font-bold text-white">{score}</div>
                    <div className="text-xs text-gray-400">
                      {calculateModifier(score) >= 0 ? '+' : ''}{calculateModifier(score)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {abilityNames.map((ability) => (
                  <div key={ability} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">{ability}</label>
                    <select
                      value={assignedScores[ability] !== undefined ? assignedScores[ability] : ''}
                      onChange={(e) => e.target.value && assignScore(ability, parseInt(e.target.value))}
                      className="input-dark w-full"
                    >
                      <option value="">Sélectionner...</option>
                      {rolledScores.map((score, index) => (
                        <option
                          key={index}
                          value={index}
                          disabled={Object.values(assignedScores).includes(index)}
                        >
                          {score} ({calculateModifier(score) >= 0 ? '+' : ''}{calculateModifier(score)})
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="secondary"
          size="lg"
        >
          Précédent
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          className="min-w-[200px]"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}