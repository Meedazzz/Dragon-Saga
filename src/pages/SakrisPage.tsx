import React from 'react';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { sakrisTheme } from '@/types/theme';

const SakrisPage: React.FC = () => {
  return (
    <Layout theme={sakrisTheme}>
      <div className="sakris-page tome-page">
        <HeroNav theme={sakrisTheme} />

        <header className="sakris-header">
          <h1 className="sakris-title">Умение Покровителя</h1>
          <p className="sakris-lead">
            Личное умение Сакриса Ульриаша
          </p>
        </header>

        <section className="spell-block">
          <h2 className="section-title">Дух бесплотный — Единение</h2>
          <div className="stat-row"><span className="stat-label">Время активации:</span><span className="stat-value">Бонусное действие</span></div>
          <div className="stat-row"><span className="stat-label">Длительность:</span><span className="stat-value">1 минута</span></div>
          <div className="stat-row"><span className="stat-label">Дистанция:</span><span className="stat-value">На себя</span></div>

          <p className="prose-readable" style={{ marginTop: 14 }}>
            Вы уступаете тело своему покровителю. Пока способность активна, вы получаете следующие эффекты:
          </p>
          <ul className="charge-list">
            <li><strong>Мудрость перворождённых.</strong> Ваши Интеллект, Мудрость и Харизма становятся равны 20 (если не были выше).</li>
            <li><strong>Потусторонняя мощь.</strong> Ваши текущие уровни заменяются уровнями Колдуна. Вы получаете все умения этого класса соответствующего уровня, включая заранее выбранные воззвания.</li>
          </ul>
          <p className="prose-readable">
            <strong>Использование:</strong> Один раз в день.
          </p>
        </section>

        <div className="quote-section">
          <div className="elven-quote">
            Сакрис,<br />Я устал,<br />Я так устал...
          </div>
        </div>

        <footer className="footer-ornament"><span className="rune-string">ULRIASH</span></footer>
      </div>
    </Layout>
  );
};

export default SakrisPage;
