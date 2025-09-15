import React from 'react';
import { backgrounds } from '../../data/backgrounds';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { BookOpen, Users, Zap } from 'lucide-react';

interface BackgroundSelectionProps {
  selectedBackground: string;
  onBackgroundSelect: (background: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function BackgroundSelection({ selectedBackground, onBackgroundSelect, onNext, onPrevious }: BackgroundSelectionProps) {
  const selectedBackgroundData = backgrounds.find(b => b.name === selectedBackground);

  return (
    <div className="wizard-step space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Choisissez votre historique</h2>
        <p className="text-gray-400">Votre historique représente votre vie avant l'aventure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {backgrounds.map((background) => (
          <Card
            key={background.name}
            selected={selectedBackground === background.name}
            onClick={() => onBackgroundSelect(background.name)}
            className="h-full"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{background.name}</h3>
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">{background.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  <Users className="w-4 h-4 mr-2 text-green-400" />
                  <span>Compétences: {background.skillProficiencies.join(', ')}</span>
                </div>
                {background.languages > 0 && (
                  <div className="flex items-center text-sm text-gray-400">
                    <Zap className="w-4 h-4 mr-2 text-purple-400" />
                    <span>Langues: {background.languages}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedBackgroundData && (
        <Card className="animate-fade-in">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">{selectedBackgroundData.name} - Détails</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">Capacité spéciale</h4>
                <p className="text-gray-300 text-sm">{selectedBackgroundData.feature}</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Équipement de départ</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  {selectedBackgroundData.equipment.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
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