import React, { useState } from 'react';
import { races } from '../../data/races';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { Users, Zap, Shield, Star, ChevronDown } from 'lucide-react';

interface RaceSelectionProps {
  selectedRace: string;
  onRaceSelect: (race: string) => void;
  onNext: () => void;
}

export default function RaceSelection({ selectedRace, onRaceSelect, onNext }: RaceSelectionProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleClick = (raceName: string) => {
    onRaceSelect(raceName);
    setExpanded((prev) => (prev === raceName ? null : raceName));
  };

  return (
    <div className="wizard-step space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Choisissez votre race</h2>
        <p className="text-gray-400">Votre race détermine vos capacités innées et votre héritage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {races.map((race) => {
          const isSelected = selectedRace === race.name;
          const isExpanded = expanded === race.name;

          return (
            <Card
              key={race.name}
              selected={isSelected}
              onClick={() => handleClick(race.name)}
              className="h-full"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{race.name}</h3>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-red-400" />
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">{race.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-400">
                    <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>Vitesse: {race.speed} ft</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Shield className="w-4 h-4 mr-2 text-blue-400" />
                    <span>Taille: {race.size}</span>
                  </div>
                  {race.languages && race.languages.length > 0 && (
                    <div className="flex items-center text-sm text-gray-400">
                      <Star className="w-4 h-4 mr-2 text-green-400" />
                      <span>
                        Langues: {race.languages.slice(0, 2).join(', ')}
                        {race.languages.length > 2 ? '...' : ''}
                      </span>
                    </div>
                  )}
                </div>

                {/* Détails dépliés dans la carte */}
                {isExpanded && (
                  <div className="mt-4 border-t border-gray-700/50 pt-4 animate-fade-in">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Langues</h4>
                        <p className="text-gray-300 text-sm">
                          {race.languages && race.languages.length > 0
                            ? race.languages.join(', ')
                            : '—'}
                        </p>
                      </div>

                      {race.proficiencies && race.proficiencies.length > 0 && (
                        <div>
                          <h4 className="font-medium text-white mb-2">Compétences</h4>
                          <p className="text-gray-300 text-sm">
                            {race.proficiencies.join(', ')}
                          </p>
                        </div>
                      )}

                      {race.traits && race.traits.length > 0 && (
                        <div>
                          <h4 className="font-medium text-white mb-2">Traits raciaux</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            {race.traits.map((trait, index) => (
                              <li key={index}>• {trait}</li>
                            ))}
                          </ul>
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

      <div className="flex justify-center pt-6">
        <Button
          onClick={onNext}
          disabled={!selectedRace}
          size="lg"
          className="min-w-[200px]"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}