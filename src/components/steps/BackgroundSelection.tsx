import React, { useState } from 'react';
import { backgrounds } from '../../data/backgrounds';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { Users, BookOpen, Star, Wrench, Zap, ChevronDown } from 'lucide-react';

interface BackgroundSelectionProps {
  selectedBackground: string;
  onBackgroundSelect: (background: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function BackgroundSelection({
  selectedBackground,
  onBackgroundSelect,
  onNext,
  onPrevious
}: BackgroundSelectionProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleClick = (name: string) => {
    onBackgroundSelect(name);
    setExpanded((prev) => (prev === name ? null : name));
  };

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
                          <h4 className="font-medium text-white mb-2">Équipement de départ</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <div className="text-gray-400 mb-1">Option A</div>
                              <ul className="text-gray-300 space-y-1">
                                {bg.equipmentOptions.optionA.map((item, i) => (
                                  <li key={i}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="text-gray-400 mb-1">Option B</div>
                              <ul className="text-gray-300 space-y-1">
                                {bg.equipmentOptions.optionB.map((item, i) => (
                                  <li key={i}>• {item}</li>
                                ))}
                              </ul>
                            </div>
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
          disabled={!selectedBackground}
          size="lg"
          className="min-w-[200px]"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}