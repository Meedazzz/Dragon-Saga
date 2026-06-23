import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Compass, Dices, Link2, ScrollText, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { characters } from '@/data/characters';
import { tarotCards, type TarotCard } from '@/data/tarot';
import { applyImageFallback } from '@/lib/imageFallback';
import { homeTheme } from '@/types/theme';

type ActivityTab = 'oracle' | 'bonds' | 'route' | 'sigil';

type OracleResult = {
  card: TarotCard;
  die: number;
  tone: string;
};

const tabs: { id: ActivityTab; label: string; icon: React.ElementType }[] = [
  { id: 'oracle', label: 'Оракул', icon: Dices },
  { id: 'bonds', label: 'Связи', icon: Link2 },
  { id: 'route', label: 'Маршрут', icon: Compass },
  { id: 'sigil', label: 'Печать', icon: Shield },
];

const routePoints = [
  'Нортвинд',
  'Бергхейм',
  'Дом Хессен',
  'Ледяная крепость',
  'Клан Арантир',
];

const runes = ['ᚠ', 'ᚱ', 'ᚢ', 'ᚨ', 'ᛟ', 'ᛞ', 'ᛗ', 'ᛉ', 'ᛏ'];

const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActivityTab>('oracle');
  const [oracle, setOracle] = useState<OracleResult | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [sigil, setSigil] = useState({ rune: 'ᛟ', card: tarotCards[0], element: 'Чёрный лёд' });

  const routeDraft = routePoints.slice(0, 4);

  const drawOracle = () => {
    const card = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    const die = Math.floor(Math.random() * 20) + 1;
    const tone = die >= 15 ? 'Дар' : die >= 8 ? 'Цена' : 'Осложнение';
    setOracle({ card, die, tone });
  };

  const forgeSigil = () => {
    const card = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    const rune = runes[Math.floor(Math.random() * runes.length)];
    const element = ['Кровь', 'Чёрный лёд', 'Песнь', 'След', 'Корень', 'Тень'][Math.floor(Math.random() * 6)];
    setSigil({ rune, card, element });
  };

  return (
    <Layout theme={homeTheme} particleVariant="mixed" particleCount={30}>
      <main className="activities-page">
        <motion.header className="activities-hero" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <span className="saga-eyebrow">ᛞ Новая вкладка</span>
          <h1>Активности Драконьей Саги</h1>
          <p>
            Живой зал для партии и ведущего: быстрые оракулы, связи героев, маршруты и печати. Всё завязано на существующие карты и страницы лора, без лишнего текста поверх канона.
          </p>
          <div className="saga-actions saga-actions--center">
            <button type="button" className="saga-button saga-button--primary tarot-no-glow" onClick={() => navigate('/')}>На главную</button>
            <button type="button" className="saga-button tarot-no-glow" onClick={() => navigate('/lor')}>Полный лор</button>
          </div>
        </motion.header>

        <nav className="activity-tabbar" aria-label="Активности">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" className={activeTab === id ? 'is-active tarot-no-glow' : 'tarot-no-glow'} onClick={() => setActiveTab(id)}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        {activeTab === 'oracle' && (
          <motion.section className="activity-stage" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="activity-copy">
              <span className="saga-eyebrow">ᚱ Оракул сцены</span>
              <h2>Карта + d20</h2>
              <p>Нажми кнопку — сайт вытянет аркан, бросит d20 и даст тон сцены. Полный лор карты открывается одной кнопкой.</p>
              <button type="button" className="saga-button saga-button--primary tarot-no-glow" onClick={drawOracle}><Dices size={16} /> Вытянуть сцену</button>
            </div>
            <div className="oracle-stage-card">
              {oracle ? (
                <>
                  <img src={oracle.card.tarot} alt={oracle.card.name} onError={applyImageFallback} />
                  <div>
                    <span>d20 = {oracle.die} · {oracle.tone}</span>
                    <h3>{oracle.card.name}</h3>
                    <p>{oracle.card.narrative.questHook}</p>
                    <button type="button" className="saga-button tarot-no-glow" onClick={() => navigate(oracle.card.lorePath)}><BookOpen size={15} /> Лор карты</button>
                  </div>
                </>
              ) : (
                <div className="oracle-empty"><Sparkles size={30} /><strong>Оракул ждёт броска</strong><span>Сейчас здесь появится лицевая карта.</span></div>
              )}
            </div>
          </motion.section>
        )}

        {activeTab === 'bonds' && (
          <motion.section className="activity-stage" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="activity-copy">
              <span className="saga-eyebrow">ᛟ Нити героев</span>
              <h2>Связанные страницы</h2>
              <p>Выбери героя — справа появятся его быстрые переходы. Это дублирует важную структуру, чтобы игроки не терялись.</p>
              <div className="bond-picker">
                {characters.map((character) => (
                  <button key={character.id} type="button" className={selectedCharacter.id === character.id ? 'is-active tarot-no-glow' : 'tarot-no-glow'} onClick={() => setSelectedCharacter(character)}>
                    {character.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="bond-result">
              <img src={selectedCharacter.tarot} alt={selectedCharacter.name} onError={applyImageFallback} />
              <div>
                <h3>{selectedCharacter.name}</h3>
                <p>{selectedCharacter.desc}</p>
                <div className="bond-links">
                  <button type="button" onClick={() => navigate(selectedCharacter.lorePath)} className="tarot-no-glow">↗ Полный лор</button>
                  {selectedCharacter.pages.map((page) => (
                    <button key={page.path} type="button" onClick={() => navigate(page.path)} className="tarot-no-glow">{page.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'route' && (
          <motion.section className="activity-stage" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="activity-copy">
              <span className="saga-eyebrow">ᚲ Маршрут</span>
              <h2>Черновик путешествия</h2>
              <p>Каркас для быстрой подготовки сессии: точки маршрута, событие и ссылка на летопись.</p>
              <button type="button" className="saga-button saga-button--primary tarot-no-glow" onClick={() => navigate('/letopis')}><ScrollText size={16} /> Открыть летопись</button>
            </div>
            <div className="route-board">
              {routeDraft.map((point, index) => (
                <article key={`${point}-${index}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{point}</h3>
                  <p>{index === 0 ? 'точка входа' : index === routeDraft.length - 1 ? 'последствие сцены' : 'испытание дороги'}</p>
                </article>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'sigil' && (
          <motion.section className="activity-stage" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="activity-copy">
              <span className="saga-eyebrow">ᛗ Печать</span>
              <h2>Кузница знака</h2>
              <p>Генерирует визуальный знак для сцены, главы или персонажной заметки.</p>
              <button type="button" className="saga-button saga-button--primary tarot-no-glow" onClick={forgeSigil}><Shield size={16} /> Собрать печать</button>
            </div>
            <div className="sigil-stage" style={{ '--char-color': sigil.card.color } as React.CSSProperties}>
              <div className="sigil-stage__mark">{sigil.rune}</div>
              <h3>{sigil.card.name}</h3>
              <p>{sigil.element} · {sigil.card.narrative.archetype}</p>
              <button type="button" className="saga-button tarot-no-glow" onClick={() => navigate(sigil.card.lorePath)}>Перейти к лору</button>
            </div>
          </motion.section>
        )}
      </main>
    </Layout>
  );
};

export default ActivitiesPage;
