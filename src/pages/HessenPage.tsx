import React from 'react';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { brinTheme } from '@/types/theme';

const HessenPage: React.FC = () => {
  const familyMembers = [
    { name: 'Герцог Хессен', role: 'Глава Дома Хессен, правитель Астарии', desc: 'Место для описания. Герцог Дома Хессен, чья власть простирается над древними землями Астарии.' },
    { name: 'Брин дель Хессен', role: 'Наследный Принц Астарии', desc: 'Место для описания. Единственный сын герцога, владыка Чёрного льда.' },
  ];

  const legends = [
    'Дом Хессен ведёт своё начало от первых людей, вставших под знамёна Валар.',
    'Чёрный лёд дремлет в крови наследников Хессенов — древняя сила, пробуждающаяся в моменты смертельной опасности.',
    'Место для дополнительных преданий и легенд Дома.',
  ];

  const glossary = [
    { term: 'Чёрный лёд', def: 'Древняя сила, дремлющая в крови наследников Хессенов. Место для подробного описания.' },
    { term: 'Астария', def: 'Первое людское королевство. Место для подробного описания.' },
    { term: 'Ледяной медальон', def: 'Реликвия, передаваемая в роду Хессенов из поколения в поколение. Место для подробного описания.' },
  ];

  return (
    <Layout theme={brinTheme}>
      <div className="hessen-page tome-page">
        <HeroNav theme={brinTheme} />

        <header className="hessen-header">
          <h1 className="hessen-title">Дом Хессен</h1>
          <p className="hessen-lead">Великий Дом, чья кровь хранит тайны Чёрного льда</p>
        </header>

        <section className="charge-box">
          <h2 className="section-title">Предания Дома</h2>
          <ul className="charge-list">
            {legends.map((legend, idx) => <li key={idx}>{legend}</li>)}
          </ul>
        </section>

        <section>
          <div className="section-header">
            <div className="section-title" style={{ color: brinTheme.primaryBright }}>Члены Дома</div>
            <div className="section-line" />
          </div>
          <div className="darkbain-grid">
            {familyMembers.map((member, idx) => (
              <article key={idx} className="darkbain-card">
                <h3 className="darkbain-card-name">{member.name}</h3>
                <p className="darkbain-card-role">{member.role}</p>
                <p className="prose-readable">{member.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="section-header">
            <div className="section-title" style={{ color: brinTheme.primaryBright }}>Глоссарий</div>
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

        <footer className="footer-ornament"><span className="rune-string">HESSEN</span></footer>
      </div>
    </Layout>
  );
};

export default HessenPage;
