import React, { useState } from 'react';
import { subclasses } from '../../data/subclasses';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { BookOpen, Sword, Shield, Zap, ChevronDown } from 'lucide-react';
import { DndClass } from '../../types/character';

interface SubclassSelectionProps {
  selectedClass: DndClass;
  selectedSubclass: string;
  onSubclassSelect: (subclass: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function SubclassSelection({
  selectedClass,
  selectedSubclass,
  onSubclassSelect,
  onNext,
  onPrevious
}: SubclassSelectionProps) {
  // Filtrer les sous-classes pour la classe sélectionnée
  const availableSubclasses = subclasses.filter(subclass => subclass.class === selectedClass);

  // Nouvel état: gérer l'expansion dans la carte
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleClick = (name: string) => {
    onSubclassSelect(name);
    setExpanded(prev => (prev === name ? null : name));
  };

  const getClassIcon = (className: DndClass) => {
    const iconMap: Record<DndClass, React.ReactNode> = {
      'Guerrier': <Sword className="w-5 h-5 text-red-400" />,
      'Magicien': <BookOpen className="w-5 h-5 text-blue-400" />,
      'Roublard': <Zap className="w-5 h-5 text-purple-400" />,
      'Clerc': <Shield className="w-5 h-5 text-yellow-400" />,
      'Rôdeur': <Sword className="w-5 h-5 text-green-400" />,
      'Barbare': <Shield className="w-5 h-5 text-red-500" />,
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
        <h2 className="text-2xl font-bold text-white mb-2">Choisissez votre sous-classe</h2>
        <p className="text-gray-400">
          Votre sous-classe de {selectedClass} définit votre spécialisation et vos capacités uniques
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableSubclasses.map((subclass) => {
          const isSelected = selectedSubclass === subclass.name;
          const isExpanded = expanded === subclass.name;

          return (
            <Card
              key={subclass.name}
              selected={isSelected}
              onClick={() => handleClick(subclass.name)}
              className="h-full"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{subclass.name}</h3>
                  <div className="flex items-center gap-2">
                    {getClassIcon(selectedClass)}
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">{subclass.description}</p>
                <div className="mt-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {subclass.class}
                  </span>
                </div>

                {/* Détails dépliés dans la carte */}
                {isExpanded && (
                  <div className="mt-4 border-t border-gray-700/50 pt-4 animate-fade-in">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Description</h4>
                        <p className="text-gray-300 text-sm">{subclass.description}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-2">Classe</h4>
                        <p className="text-gray-300 text-sm">{subclass.class}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm italic">
                          Les capacités spécifiques de cette sous-classe seront disponibles au niveau 3 et évolueront
                          avec votre progression.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
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
          onClick={onNext}
          disabled={!selectedSubclass}
          size="lg"
          className="min-w-[200px]"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}