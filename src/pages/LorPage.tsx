import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { lorTheme } from '@/types/theme';

const LorPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'heroes' | 'lore'>('heroes');

  const characters = [
    {
      name: 'Валерий Даркбейн',
      title: 'Потомок сильнейшего Авантюриста, носитель тёмного проклятья',
      ability: 'Личное умение — Ас',
      path: '/valery',
      color: '#2a5a8a',
    },
    {
      name: 'Сакрис из Бергхейма',
      title: 'Следопыт, сосуд древнего духа',
      ability: 'Личное умение — Дух бесплотный',
      path: '/sakris',
      color: '#2a6a3a',
    },
    {
      name: 'Брин дель Хессен',
      title: 'Наследный Принц Астарии, владыка Чёрного льда',
      ability: 'Личное умение — Ледяная крепость',
      path: '/brin',
      color: '#5a3a7a',
    },
  ];

  const loreCards = [
    {
      title: 'Род Даркбейнов',
      desc: 'Древний род, чья кровь связана с силами за гранью жизни и смерти. Тайны, передаваемые из поколения в поколение.',
      path: '/darkbain',
    },
    {
      title: 'Летопись мира',
      desc: 'Сказание о мире: от Музыки Айнур до 425 года Третьей Эпохи. История, расы, календарь и глоссарий.',
      path: '/letopis',
    },
  ];

  return (
    <Layout theme={lorTheme} particleCount={35}>
<<<<<<< HEAD
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 pb-20 pt-12">
        {/* Header */}
=======
      <div className="max-w-[900px] mx-auto px-4 md:px-8 pb-20 pt-10">
>>>>>>> 6b6b02308a0ac0c53a2bc9f64d2b3f629092826f
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pb-8 mb-8"
        >
          <div
            className="text-4xl md:text-6xl font-black tracking-[12px] uppercase mb-3"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: lorTheme.parchment,
              textShadow: '0 0 20px rgba(160,150,130,0.2), 0 2px 6px rgba(0,0,0,0.9)',
            }}
          >
            DND
          </div>
          <div className="rune-divider" style={{ '--divider-color': lorTheme.primary, '--divider-text': lorTheme.primaryGlow } as React.CSSProperties}>
            <span>LETO</span>
          </div>
          <h1
            className="text-xl md:text-3xl font-bold tracking-[3px] leading-tight my-3"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: lorTheme.silver,
              textShadow: '0 0 15px rgba(144,152,160,0.15), 0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Мир Игры
          </h1>
          <div className="rune-divider" style={{ '--divider-color': lorTheme.primary, '--divider-text': lorTheme.primaryGlow } as React.CSSProperties}>
            <span>PISE</span>
          </div>
          <p
            className="text-sm md:text-base italic max-w-[500px] mx-auto leading-relaxed mt-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: lorTheme.parchmentDim,
              letterSpacing: '1px',
            }}
          >
            Хроники героев, их судьбы и легенды, запечатлённые в цифровых страницах.
          </p>
        </motion.header>

<<<<<<< HEAD
        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
=======
        <motion.div
          initial={{ opacity: 0, y: 16 }}
>>>>>>> 6b6b02308a0ac0c53a2bc9f64d2b3f629092826f
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-10 flex-wrap"
        >
          {[
            { id: 'heroes' as const, label: 'Игровые персонажи', icon: '⚔' },
            { id: 'lore' as const, label: 'Лор', icon: '📜' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveSection(btn.id)}
              className="px-5 py-2.5 rounded-sm text-xs md:text-sm font-bold tracking-[2px] uppercase transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: "'Cinzel', serif",
                background: activeSection === btn.id
                  ? 'linear-gradient(180deg, rgba(30,25,15,0.5) 0%, rgba(15,12,8,0.4) 100%)'
                  : 'linear-gradient(180deg, rgba(30,25,15,0.4) 0%, rgba(15,12,8,0.3) 100%)',
                border: `1px solid ${activeSection === btn.id ? 'rgba(106,84,48,0.4)' : 'rgba(80,70,50,0.25)'}`,
                color: activeSection === btn.id ? lorTheme.parchment : lorTheme.parchmentDim,
                textShadow: activeSection === btn.id ? '0 0 8px rgba(160,144,96,0.2)' : 'none',
                transform: activeSection === btn.id ? 'translateY(-1px)' : 'none',
                boxShadow: activeSection === btn.id ? '0 3px 10px rgba(0,0,0,0.3)' : 'none',
              }}
            >
              <span className="mr-2">{btn.icon}</span>
              {btn.label}
            </button>
          ))}
          <button
            onClick={() => navigate('/letopis')}
            className="px-5 py-2.5 rounded-sm text-xs md:text-sm font-bold tracking-[2px] uppercase transition-all duration-300 cursor-pointer"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'linear-gradient(180deg, rgba(30,25,15,0.4) 0%, rgba(15,12,8,0.3) 100%)',
              border: '1px solid rgba(80,70,50,0.25)',
              color: lorTheme.parchmentDim,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(106,84,48,0.4)';
              (e.target as HTMLElement).style.color = lorTheme.parchment;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(80,70,50,0.25)';
              (e.target as HTMLElement).style.color = lorTheme.parchmentDim;
            }}
          >
            <span className="mr-2">🌍</span>
            Мир Игры
          </button>
        </motion.nav>

<<<<<<< HEAD
        {/* Heroes Section */}
        {activeSection === 'heroes' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
=======
        {categoryOrder.map((cat) => {
          const items = groupedItems[cat];
          if (!items || items.length === 0) return null;

          return (
            <motion.section
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-8"
            >
              <div className="section-header !mt-1 !mb-3" style={{ 
                '--section-border': 'rgba(80,70,50,0.15)', 
                '--section-icon-color': lorTheme.primaryGlow, 
                '--section-title-color': lorTheme.primaryGlow, 
                '--section-line-color': lorTheme.primary 
              } as React.CSSProperties}>
                <span className="section-icon">{items[0].icon}</span>
                <h2 className="section-title">{categoryLabels[cat]}</h2>
                <div className="section-line" />
              </div>

              <div className={`grid gap-3 ${cat === 'characters' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {items.map((item, idx) => {
                  const char = cat === 'characters' ? characters.find(c => c.id === item.id) : null;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      onClick={() => navigate(item.path)}
                      className="rounded-md p-4 md:p-5 relative overflow-hidden cursor-pointer transition-all duration-300"
                      style={{
                        background: 'linear-gradient(180deg, rgba(20,15,10,0.5) 0%, rgba(10,8,5,0.3) 100%)',
                        border: char ? `1px solid ${char.color}30` : '1px solid rgba(138,106,42,0.2)',
                        borderTop: char ? `2px solid ${char.color}` : undefined,
                      }}
                      whileHover={{
                        borderColor: char ? `${char.color}60` : 'rgba(184,144,58,0.3)',
                        y: -2,
                        boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                      }}
                    >
                      {char && (
                        <div
                          className="absolute top-0 left-0 right-0 h-0.5"
                          style={{ background: `linear-gradient(90deg, transparent, ${char.color}, ${char.color}80, transparent)` }}
                        />
                      )}
                      {!char && (
                        <div
                          className="absolute top-0 left-0 right-0 h-0.5"
                          style={{ background: `linear-gradient(90deg, transparent, ${lorTheme.primaryGlow}, transparent)` }}
                        />
                      )}
                      <div
                        className="text-sm md:text-base font-bold tracking-[2px] mb-1.5"
                        style={{
                          fontFamily: "'Cinzel Decorative', serif",
                          color: char ? lorTheme.silver : lorTheme.primaryGlow,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="text-xs leading-relaxed"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          color: lorTheme.parchmentDim,
                        }}
                      >
                        {item.desc}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
>>>>>>> 6b6b02308a0ac0c53a2bc9f64d2b3f629092826f
          >
            <div className="section-header" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': lorTheme.primaryGlow, '--section-title-color': lorTheme.primaryGlow, '--section-line-color': lorTheme.primary } as React.CSSProperties}>
              <span className="section-icon">&#9876;</span>
              <h2 className="section-title">Игровые персонажи</h2>
              <div className="section-line" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {characters.map((char, idx) => (
                <motion.div
                  key={char.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  onClick={() => navigate(char.path)}
                  className="rounded-md p-6 relative overflow-hidden cursor-pointer transition-all duration-300"
                  style={{
                    background: 'linear-gradient(180deg, rgba(20,15,10,0.6) 0%, rgba(10,8,5,0.4) 100%)',
                    border: `1px solid ${char.color}30`,
                    borderTop: `2px solid ${char.color}`,
                  }}
                  whileHover={{
                    borderColor: `${char.color}60`,
                    y: -3,
                    boxShadow: `0 8px 25px rgba(0,0,0,0.5)`,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${char.color}, ${char.color}80, transparent)` }}
                  />
                  <div
                    className="text-base md:text-xl font-bold tracking-[2px] mb-2"
                    style={{
                      fontFamily: "'Cinzel Decorative', serif",
                      color: lorTheme.silver,
                    }}
                  >
                    {char.name}
                  </div>
                  <div
                    className="text-xs italic mb-4"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: lorTheme.parchmentDim,
                    }}
                  >
                    {char.title}
                  </div>
                  <div
                    className="flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs tracking-[1px] transition-all duration-200"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      background: 'rgba(30,25,15,0.3)',
                      border: '1px solid rgba(80,70,50,0.2)',
                      color: lorTheme.parchmentDim,
                    }}
                  >
                    <span style={{ color: lorTheme.primaryGlow, fontSize: '0.7rem' }}>&#9670;</span>
                    {char.ability}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Lore Section */}
        {activeSection === 'lore' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="section-header" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': lorTheme.primaryGlow, '--section-title-color': lorTheme.primaryGlow, '--section-line-color': lorTheme.primary } as React.CSSProperties}>
              <span className="section-icon">&#128220;</span>
              <h2 className="section-title">Лор</h2>
              <div className="section-line" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {loreCards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  onClick={() => navigate(card.path)}
                  className="rounded-md p-6 relative cursor-pointer transition-all duration-300"
                  style={{
                    background: 'linear-gradient(180deg, rgba(20,15,10,0.5) 0%, rgba(10,8,5,0.3) 100%)',
                    border: '1px solid rgba(138,106,42,0.2)',
                  }}
                  whileHover={{
                    borderColor: 'rgba(184,144,58,0.3)',
                    y: -2,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${lorTheme.primaryGlow}, transparent)` }}
                  />
                  <div
                    className="text-base md:text-lg tracking-[2px] mb-2"
                    style={{
                      fontFamily: "'Cinzel Decorative', serif",
                      color: lorTheme.primaryGlow,
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    className="text-sm leading-relaxed mb-4"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: lorTheme.parchmentDim,
                    }}
                  >
                    {card.desc}
                  </div>
                  <span
                    className="inline-block px-5 py-2.5 rounded-sm text-xs tracking-[2px] uppercase transition-all duration-200 cursor-pointer"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      background: 'linear-gradient(180deg, rgba(30,25,15,0.4) 0%, rgba(15,12,8,0.3) 100%)',
                      border: '1px solid rgba(80,70,50,0.25)',
                      color: lorTheme.parchmentDim,
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.borderColor = lorTheme.primary;
                      (e.target as HTMLElement).style.color = lorTheme.parchment;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.borderColor = 'rgba(80,70,50,0.25)';
                      (e.target as HTMLElement).style.color = lorTheme.parchmentDim;
                    }}
                  >
                    Открыть
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <div className="footer-ornament mt-12" style={{ 
          '--footer-border': 'rgba(80,70,50,0.1)', 
          '--footer-text-color': lorTheme.primary 
        } as React.CSSProperties}>
          <div className="rune-string">L E T O P I S E</div>
        </div>
      </div>
    </Layout>
  );
};

export default LorPage;
