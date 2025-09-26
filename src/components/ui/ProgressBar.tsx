import React, { useMemo } from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number; // généralement steps.length - 1
  steps: string[];
}

export default function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  const stepCount = steps.length;
  const safeTotal = Math.max(1, totalSteps);
  const clampedCurrent = Math.min(Math.max(0, currentStep), safeTotal);
  const percent = Math.max(0, Math.min(100, (clampedCurrent / safeTotal) * 100));

  // Construction dynamique de la grille pour espacer proprement les marqueurs
  const gridTemplateColumns = useMemo(
    () => `repeat(${stepCount}, minmax(88px, 1fr))`,
    [stepCount]
  );

  return (
    <div className="w-full mb-8" aria-label="Progression de création de personnage">
      {/* Rail de fond */}
      <div className="relative h-3 rounded-full overflow-hidden">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(17,24,39,0.9), rgba(31,41,55,0.9))',
          }}
          aria-hidden="true"
        />
        {/* Texture légère + lueur interne */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
          }}
          aria-hidden="true"
        />
        {/* Barre de progression remplie */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out shadow-[0_0_16px_rgba(185,28,28,0.35)]"
          style={{
            width: `${percent}%`,
            background:
              'linear-gradient(90deg, #7f1d1d 0%, #b91c1c 35%, #ef4444 60%, #d4af37 100%)',
          }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
        />
        {/* Liseré doré subtil sur le remplissage */}
        <div
          className="absolute inset-y-0 left-0 rounded-full pointer-events-none"
          style={{
            width: `${percent}%`,
            background:
              'linear-gradient(180deg, rgba(212,175,55,0.18), rgba(212,175,55,0))',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Marqueurs d’étapes (runes) + libellés */}
      <div className="mt-3 overflow-x-auto">
        <div
          className="grid gap-x-4 sm:gap-x-6"
          style={{ gridTemplateColumns }}
        >
          {steps.map((label, idx) => {
            const isDone = idx < clampedCurrent;
            const isCurrent = idx === clampedCurrent;
            const isUpcoming = idx > clampedCurrent;

            return (
              <div
                key={idx}
                className="flex flex-col items-center shrink-0"
                title={label}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Rune (diamant) */}
                <div className="relative h-6 flex items-center justify-center">
                  {/* Connecteur vertical discret pour marquer l’alignement */}
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent pointer-events-none" />

                  <span
                    className={[
                      'inline-block w-3.5 h-3.5 rotate-45 border',
                      isDone
                        ? 'bg-gradient-to-br from-red-600 to-yellow-500 border-yellow-300 shadow-[0_0_10px_rgba(212,175,55,0.45)]'
                        : isCurrent
                        ? 'bg-red-600 border-red-300 shadow-[0_0_12px_rgba(185,28,28,0.55)] animate-pulse'
                        : 'bg-gray-600 border-gray-400',
                    ].join(' ')}
                  />
                </div>

                {/* Libellé */}
                <div
                  className={[
                    'mt-2 text-center text-xs sm:text-sm leading-snug px-1',
                    isDone ? 'text-red-400' : isCurrent ? 'text-gray-100' : 'text-gray-500',
                  ].join(' ')}
                  style={{ textShadow: isCurrent ? '0 0 10px rgba(239,68,68,0.35)' : undefined }}
                >
                  <span className="block truncate max-w-[12rem] sm:max-w-[14rem]">{label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}