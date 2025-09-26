import React, { useState } from 'react';
import { backgrounds } from '../../data/backgrounds';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { Users, BookOpen, Star, Wrench, Zap, ChevronDown, CheckCircle, Circle } from 'lucide-react';

interface BackgroundSelectionProps {
  selectedBackground: string;
  onBackgroundSelect: (background: string) => void;
  onNext: () => void;
  onPrevious: () => void;

  // Nouveau: choix d'équipement (Option A ou B)
  selectedBackgroundEquipment?: 'A' | 'B' | '';
  onBackgroundEquipmentSelect?: (option: 'A' | 'B') => void;
}

export default function BackgroundSelection({
  selectedBackground,
  onBackgroundSelect,
  onNext,
  onPrevious,
  selectedBackgroundEquipment = '',
  onBackgroundEquipmentSelect
}: BackgroundSelectionProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleClick = (name: string) => {
    onBackgroundSelect(name);
    setExpanded((prev) => (prev === name ? null : name));
  };

  const handleChoose = (e: React.MouseEvent, option: 'A' | 'B') => {
    e.stopPropagation();
    onBackgroundEquipmentSelect?.(option);
  };

  const isOptionChosen = (name: string, option: 'A' | 'B') =>
    selectedBackground === name && selectedBackgroundEquipment === option;

  return (
    <div className="wizard-step space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Choisissez votre historique</h2>
        <p className="text-gray-400">Votre historique reflète votre passé et vos talents acquis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {backgrounds.map((bg) => {
          const isSelected = selectedBackground === bg.name;
          const isExpanded = expanded === bg.name;

          return (
            <Card
              key={bg.name}
              selected={isSelected}
              onClick={() => handleClick(bg.name)}
              className="h-full"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{bg.name}</h3>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">{bg.description}</p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>Compétences: {bg.skillProficiencies?.join(', ') || '—'}</span>
                  </div>
                  <div className="flex items-center">
                    <Wrench className="w-4 h-4 mr-2 text-green-400" />
                    <span>Outils: {bg.toolProficiencies?.join(', ') || '—'}</span>
                  </div>
                  {bg.abilityScores && (
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-red-400" />
                      <span>Caractéristiques clés: {bg.abilityScores.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Détails dépliés dans la carte */}
                {isExpanded && (
                  <div className="mt-4 border-t border-gray-700/50 pt-4 animate-fade-in">
                    <div className="grid grid-cols-1 gap-4">
                      {bg.feat && (
                        <div>
                          <h4 className="font-medium text-white mb-2">Don</h4>
                          <p className="text-gray-300 text-sm">{bg.feat}</p>
                        </div>
                      )}

                      {bg.equipmentOptions && (
                        <div>
                          <h4 className="font-medium text-white mb-3">Équipement de départ</h4>

                          {/* Choix A/B */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={(e) => handleChoose(e, 'A')}
                              className={`text-left p-3 rounded-md border transition-colors ${
                                isOptionChosen(bg.name, 'A')
                                  ? 'border-red-500/60 bg-red-900/20'
                                  : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {isOptionChosen(bg.name, 'A') ? (
                                    <CheckCircle className="w-4 h-4 text-red-400" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-gray-400" />
                                  )}
                                  <span className="text-sm text-gray-200">Option A</span>
                                </div>
                              </div>
                              <ul className="text-gray-300 text-sm space-y-1">
                                {bg.equipmentOptions.optionA.map((item, i) => (
                                  <li key={i}>• {item}</li>
                                ))}
                              </ul>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => handleChoose(e, 'B')}
                              className={`text-left p-3 rounded-md border transition-colors ${
                                isOptionChosen(bg.name, 'B')
                                  ? 'border-red-500/60 bg-red-900/20'
                                  : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {isOptionChosen(bg.name, 'B') ? (
                                    <CheckCircle className="w-4 h-4 text-red-400" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-gray-400" />
                                  )}
                                  <span className="text-sm text-gray-200">Option B</span>
                                </div>
                              </div>
                              <ul className="text-gray-300 text-sm space-y-1">
                                {bg.equipmentOptions.optionB.map((item, i) => (
                                  <li key={i}>• {item}</li>
                                ))}
                              </ul>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between pt-6">
        <Button onClick={onPrevious} variant="secondary" size="lg">
          Précédent
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedBackground || !selectedBackgroundEquipment}
          size="lg"
          className="min-w-[200px]"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}