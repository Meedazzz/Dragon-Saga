import React from 'react';

/**
 * MythicVeil — общий атмосферный слой сайта.
 *
 * Зачем он нужен:
 * - добавляет «живость» без тяжёлых canvas/WebGL-эффектов;
 * - поддерживает скандинавский мотив: руны, пепел, северное сияние;
 * - работает на всех страницах через Layout;
 * - отключается/успокаивается через CSS при prefers-reduced-motion.
 *
 * Если нужно уменьшить динамику — меняй стили `.mythic-*` в `src/index.css`.
 */
const runes = ['ᚠ', 'ᚱ', 'ᚢ', 'ᚨ', 'ᛟ', 'ᛞ', 'ᛗ', 'ᛉ', 'ᛏ', 'ᚲ'];

const runePositions = [
  { left: '6%', top: '18%', delay: '0s', duration: '18s' },
  { left: '15%', top: '72%', delay: '-7s', duration: '24s' },
  { left: '27%', top: '32%', delay: '-12s', duration: '21s' },
  { left: '42%', top: '84%', delay: '-4s', duration: '28s' },
  { left: '58%', top: '24%', delay: '-16s', duration: '22s' },
  { left: '72%', top: '68%', delay: '-9s', duration: '25s' },
  { left: '84%', top: '38%', delay: '-2s', duration: '20s' },
  { left: '93%', top: '78%', delay: '-14s', duration: '27s' },
  { left: '36%', top: '10%', delay: '-6s', duration: '23s' },
  { left: '66%', top: '92%', delay: '-19s', duration: '29s' },
];

const emberPositions = [
  { left: '8%', delay: '-2s', duration: '11s' },
  { left: '18%', delay: '-8s', duration: '14s' },
  { left: '31%', delay: '-4s', duration: '12s' },
  { left: '47%', delay: '-10s', duration: '16s' },
  { left: '61%', delay: '-1s', duration: '13s' },
  { left: '76%', delay: '-6s', duration: '15s' },
  { left: '89%', delay: '-12s', duration: '17s' },
];

const MythicVeil: React.FC = () => (
  <div className="mythic-veil" aria-hidden="true">
    <div className="mythic-veil__aurora" />
    <div className="mythic-veil__oath-line mythic-veil__oath-line--top" />
    <div className="mythic-veil__oath-line mythic-veil__oath-line--bottom" />

    {runePositions.map((style, index) => (
      <span
        key={`rune-${index}`}
        className="mythic-rune"
        style={{
          left: style.left,
          top: style.top,
          animationDelay: style.delay,
          animationDuration: style.duration,
        }}
      >
        {runes[index % runes.length]}
      </span>
    ))}

    {emberPositions.map((style, index) => (
      <span
        key={`ember-${index}`}
        className="mythic-ember"
        style={{
          left: style.left,
          animationDelay: style.delay,
          animationDuration: style.duration,
        }}
      />
    ))}
  </div>
);

export default MythicVeil;
