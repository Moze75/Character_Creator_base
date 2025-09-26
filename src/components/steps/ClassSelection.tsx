import React from 'react';
import { classes } from '../../data/classes';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { Sword, Heart, Shield, Zap, BookOpen } from 'lucide-react';
import { DndClass } from '../../types/character';

interface ClassSelectionProps {
  selectedClass: DndClass | '';
  onClassSelect: (dndClass: DndClass) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ClassSelection: React.FC<ClassSelectionProps> = ({ selectedClass, onClassSelect, onNext, onPrevious }) => {
  const selectedClassData = classes.find(c => c.name === selectedClass);

  const getClassIcon = (className: DndClass) => {
    const iconMap: Record<DndClass, React.ReactNode> = {
      'Guerrier': <Sword className="w-5 h-5 text-red-400" />,
      'Magicien': <BookOpen className="w-5 h-5 text-blue-400" />,
      'Roublard': <Zap className="w-5 h-5 text-purple-400" />,
      'Clerc': <Shield className="w-5 h-5 text-yellow-400" />,
      'Rôdeur': <Sword className="w-5 h-5 text-green-400" />,
      'Barbare': <Heart className="w-5 h-5 text-red-500" />,
      'Barde': <BookOpen className="w-5 h-5 text-pink-400" />,
      'Druide': <Shield className="w-5 h-5 text-green-500" />,
      'Moine': <Zap className="w-5 h-5 text-orange-400" />,
      'Paladin': <Shield className="w-5 h-5 text-blue-500" />,
      'Ensorceleur': <Zap className="w-5 h-5 text-purple-500" />,
      'Occultiste': <BookOpen className="w-5 h-5 text-purple-600" />
    };
    return iconMap[className] || <Sword className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="wizard-step space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Choisissez votre classe</h2>
        <p className="text-gray-400">Votre classe détermine vos capacités et votre rôle dans l'aventure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((dndClass) => (
          <Card
            key={dndClass.name}
            selected={selectedClass === dndClass.name}
            onClick={() => onClassSelect(dndClass.name)}
            className="h-full"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{dndClass.name}</h3>
                {getClassIcon(dndClass.name)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">{dndClass.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  <Heart className="w-4 h-4 mr-2 text-red-400" />
                  <span>Dé de vie: d{dndClass.hitDie}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                  <span>Capacité principale: {dndClass.primaryAbility.join(', ')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Shield className="w-4 h-4 mr-2 text-blue-400" />
                  <span>Jets de sauvegarde: {dndClass.savingThrows.join(', ')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedClassData && (
        <Card className="animate-fade-in">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">{selectedClassData.name} - Détails</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">Compétences disponibles</h4>
                <p className="text-gray-300 text-sm mb-2">Choisissez {selectedClassData.skillsToChoose} compétences parmi :</p>
                <ul className="text-gray-300 text-sm space-y-1 max-h-24 overflow-y-auto">
                  {selectedClassData.availableSkills.map((skill, index) => (
                    <li key={index}>• {skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Équipement de départ</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  {selectedClassData.equipment.map((item, index) => (
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
          disabled={!selectedClass}
          size="lg"
          className="min-w-[200px]"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default ClassSelection;