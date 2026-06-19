import React from 'react';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { sakrisTheme } from '@/types/theme';

const BerghheimPage: React.FC = () => {
  const legends = [
    'Бергхейм — суровый горный край на севере, где ветры воют меж скальных зубьев, а в низинах стелется ледяной туман.',
    'Народ Бергхейма издревле славился стойкостью и охотничьим мастерством. Их рода хранят память о духах предков, что бродят по перевалам.',
    'Место для дополнительных преданий и легенд Бергхейма.',
  ];

  const notableFigures = [
    { name: 'Сакрис Ульриаш', role: 'Следопыт, сосуд древнего духа', desc: 'Место для описания связи Сакриса с Бергхеймом.' },
  ];

  const glossary = [
    { term: 'Бергхейм', def: 'Горный край на севере. Место для подробного описания.' },
    { term: 'Дух предка', def: 'Древняя сущность, пробудившаяся в Сакрисе. Место для подробного описания.' },
    { term: 'Перевал Северного Камня', def: 'Горный перевал в землях Бергхейма. Место для подробного описания.' },
  ];

  return (
    <Layout theme={sakrisTheme}>
      <div className="berghheim-page tome-page">
        <HeroNav theme={sakrisTheme} />

        <header className="berghheim-header">
          <h1 className="berghheim-title">Бергхейм</h1>
          <p className="berghheim-lead">Суровый горный край, где духи предков бродят по перевалам</p>
        </header>

        <section className="charge-box">
          <h2 className="section-title">Предания края</h2>
          <ul className="charge-list">
            {legends.map((legend, idx) => <li key={idx}>{legend}</li>)}
          </ul>
        </section>

        <section>
          <div className="section-header">
            <div className="section-title" style={{ color: sakrisTheme.primaryBright }}>Известные личности</div>
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
            <div className="section-title" style={{ color: sakrisTheme.primaryBright }}>Глоссарий</div>
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

        <footer className="footer-ornament"><span className="rune-string">BERGHHEIM</span></footer>
      </div>
    </Layout>
  );
};

export default BerghheimPage;
