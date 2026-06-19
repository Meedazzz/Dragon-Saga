import React from 'react';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import type { ColorTheme } from '@/types/theme';

const arantirTheme: ColorTheme = {
  name: 'arantir',
  void: '#0c0806',
  raven: '#140e0a',
  primary: '#6a4a20',
  primaryGlow: '#8a6a30',
  primaryBright: '#aa8a50',
  accent: '#c06020',
  accentGlow: '#e08040',
  silver: '#b0a090',
  silverBright: '#d0c0b0',
  parchment: '#c8b090',
  parchmentDim: '#887060',
  border: 'rgba(140, 100, 40, 0.25)',
  borderGlow: 'rgba(200, 140, 50, 0.4)',
  menuBg: 'rgba(12, 8, 6, 0.97)',
  menuText: '#c8b090',
  menuAccent: '#8a6a30',
  buttonBg: 'rgba(20, 14, 10, 0.85)',
  buttonText: '#e08040',
  buttonBorder: 'rgba(200, 140, 50, 0.4)',
  particleColors: ['#e08040', '#c06020', '#aa8a50'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #6a4a20 0%, transparent 15%, transparent 85%, #6a4a20 100%)',
  isDark: true,
};

const ArantirPage: React.FC = () => {
  const legends = [
    'Клан Арантир — древний орден Драконоборцев, некогда великий и могучий, истребивший последних драконов Второй Эпохи.',
    'С веками клан угасал, его песни забывались, а воины рассеивались по свету. Но память о великих подвигах жила в балладах, что передавались из уст в уста.',
    'Место для дополнительных преданий и легенд Клана Арантир.',
  ];

  const notableFigures = [
    { name: 'Таллис', role: 'Бард-Воин, последний носитель песен клана', desc: 'Место для описания связи Таллиса с Кланом Арантир.' },
  ];

  const glossary = [
    { term: 'Драконоборцы', def: 'Некогда великий орден, истребивший последних драконов Второй Эпохи. Место для подробного описания.' },
    { term: 'Песни клана', def: 'Древние баллады, хранящие историю и мудрость Драконоборцев. Место для подробного описания.' },
    { term: 'Лютня деда', def: 'Реликвия клана — старая лютня с трещиной на деке, хранительница песен. Место для подробного описания.' },
  ];

  return (
    <Layout theme={arantirTheme}>
      <div className="arantir-page tome-page">
        <HeroNav theme={arantirTheme} />

        <header className="arantir-header">
          <h1 className="arantir-title">Клан Арантир</h1>
          <p className="arantir-lead">Последние Драконоборцы, чьи песни пережили века</p>
        </header>

        <section className="charge-box">
          <h2 className="section-title">Предания клана</h2>
          <ul className="charge-list">
            {legends.map((legend, idx) => <li key={idx}>{legend}</li>)}
          </ul>
        </section>

        <section>
          <div className="section-header">
            <div className="section-title" style={{ color: arantirTheme.primaryBright }}>Известные личности</div>
            <div className="section-line" />
          </div>
          <div className="darkbain-grid">
            {notableFigures.map((fig, idx) => (
              <article key={idx} className="darkbain-card">
                <h3 className="darkbain-card-name">{fig.name}</h3>
                <p className="darkbain-card-role">{fig.role}</p>
                <p className="prose-readable">{fig.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="section-header">
            <div className="section-title" style={{ color: arantirTheme.primaryBright }}>Глоссарий</div>
            <div className="section-line" />
          </div>
          <dl className="letopis-glossary">
            {glossary.map((item, i) => (
              <div key={i} className="letopis-glossary-row">
                <dt>{item.term}</dt>
                <dd>{item.def}</dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="footer-ornament"><span className="rune-string">ARANTIR</span></footer>
      </div>
    </Layout>
  );
};

export default ArantirPage;
