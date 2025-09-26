// Solution 1: Vérifier si l'objet existe avant d'utiliser Object.keys()

// Au lieu de :
Object.keys(someObject).map(...)

// Utilisez :
Object.keys(someObject || {}).map(...)

// Ou avec une vérification plus robuste :
(someObject ? Object.keys(someObject) : []).map(...)

// Solution 2: Si vous mappez sur les races, assurez-vous que la donnée est chargée

import { races } from '../../data/races';

const RaceSelection = () => {
  // Vérification de sécurité
  if (!races || !Array.isArray(races)) {
    return <div>Chargement des races...</div>;
  }

  return (
    <div>
      {races.map((race, index) => (
        <div key={race.name || index}>
          {/* Votre contenu de race */}
          <h3>{race.name}</h3>
          <p>{race.description}</p>
          
          {/* Pour les traits, vérifiez que race.traits existe */}
          {race.traits && race.traits.length > 0 && (
            <ul>
              {race.traits.map((trait, traitIndex) => (
                <li key={traitIndex}>{trait}</li>
              ))}
            </ul>
          )}
          
          {/* Pour les langues */}
          {race.languages && race.languages.length > 0 && (
            <div>
              <strong>Langues :</strong> {race.languages.join(', ')}
            </div>
          )}
          
          {/* Pour les compétences */}
          {race.proficiencies && race.proficiencies.length > 0 && (
            <div>
              <strong>Compétences :</strong> {race.proficiencies.join(', ')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Solution 3: Si vous utilisez un state pour les races

import { useState, useEffect } from 'react';
import { races } from '../../data/races';

const RaceSelection = () => {
  const [raceData, setRaceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setRaceData(races);
    } catch (error) {
      console.error('Erreur lors du chargement des races:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!raceData || !Array.isArray(raceData)) {
    return <div>Erreur lors du chargement des races</div>;
  }

  return (
    <div>
      {raceData.map((race, index) => (
        // Votre JSX ici
      ))}
    </div>
  );
};

// Solution 4: Fonction utilitaire pour vérifier les objets

const safeObjectKeys = (obj) => {
  return obj && typeof obj === 'object' ? Object.keys(obj) : [];
};

// Puis utilisez :
safeObjectKeys(someObject).map(...)

// Solution 5: Vérification avec optional chaining (si supporté)

someObject?.traits?.map(...) || []
Object.keys(someObject?.properties || {}).map(...)