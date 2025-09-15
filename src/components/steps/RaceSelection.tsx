import React from 'react';
import { races } from '../../data/races';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { Users, Zap, Shield, Star } from 'lucide-react';

interface RaceSelectionProps {
  selectedRace: string;
  onRaceSelect: (race: string) => void;
  onNext: () => void;
}

export default function RaceSelection({ selectedRace, onRaceSelect, onNext }: RaceSelectionProps) {
  const selectedRaceData = races.find(r => r.name === selectedRace);

  return (
    <div className="wizard-step space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Choisissez votre race</h2>
        <p className="text-gray-400">Votre race détermine vos capacités innées et votre héritage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {races.map((race) => (
          <Card
            key={race.name}
            selected={selectedRace === race.name}
            onClick={() => onRaceSelect(race.name)}
            className="h-full"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{race.name}</h3>
                <Users className="w-5 h-5 text-red-400" />
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
                {Object.keys(race.abilityScoreIncrease).length > 0 && (
                  <div className="flex items-center text-sm text-gray-400">
                    <Star className="w-4 h-4 mr-2 text-green-400" />
                    <span>Bonus: {Object.entries(race.abilityScoreIncrease).map(([ability, bonus]) => `${ability} +${bonus}`).join(', ')}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRaceData && (
        <Card className="animate-fade-in">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">{selectedRaceData.name} - Détails</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">Langues</h4>
                <p className="text-gray-300 text-sm">{selectedRaceData.languages.join(', ')}</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Traits raciaux</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  {selectedRaceData.traits.map((trait, index) => (
                    <li key={index}>• {trait}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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