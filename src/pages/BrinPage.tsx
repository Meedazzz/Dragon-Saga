import React from 'react';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { brinTheme } from '@/types/theme';

const BrinPage: React.FC = () => {
  return (
    <Layout theme={brinTheme}>
      <div className="brin-page tome-page">
        <HeroNav theme={brinTheme} />

        <header className="brin-header">
          <h1 className="brin-title">Ледяная крепость</h1>
          <p className="brin-lead">
            Личное умение Брина дель Хессена
          </p>
        </header>

        <section className="spell-block">
          <h2 className="section-title">Ледяная крепость</h2>
          <div className="stat-row"><span className="stat-label">Время сотворения:</span><span className="stat-value">Действие</span></div>
          <div className="stat-row"><span className="stat-label">Дистанция:</span><span className="stat-value">Видимое существо</span></div>
          <div className="stat-row"><span className="stat-label">Длительность:</span><span className="stat-value">5 минут</span></div>
          <div className="stat-row"><span className="stat-label">Компоненты:</span><span className="stat-value">—</span></div>

          <p className="prose-readable" style={{ marginTop: 14 }}>
            Черпая силу из <strong>Чёрного льда</strong>, что дремлет внутри Брина дель Хессена,
            чародей создаёт портал в ментальное чистилище внутри него — и перемещает в него сознание другого существа.
          </p>
          <p className="prose-readable">
            Брин выбирает видимое существо, которое должно совершить <strong>спасбросок Интеллекта</strong>.
            В случае провала, цель перемещается в чистилище — ментальное пространство, огранённое чёрным льдом.
          </p>
          <ul className="charge-list">
            <li>Внутри чистилища <strong>невозможно нанести физический и/или ментальный вред или урон</strong>.</li>
            <li>Существа сохраняют свой физический облик, могут взаимодействовать, но <strong>без нанесения урона</strong>.</li>
            <li>Брин может создавать <strong>любые иллюзии и визуальные эффекты</strong>.</li>
            <li>В конце каждого своего хода цель может совершить <strong>новый спасбросок Интеллекта</strong>; в случае успеха она покидает Ледяную крепость.</li>
            <li>Брин также может переместить в чистилище любое существо, которое он знает, <strong>независимо от расстояния</strong>, но только с его <strong>согласия</strong>.</li>
            <li>Во время действия заклинания Брин и цель <strong>недееспособны в физическом мире</strong>.</li>
            <li>Внешнее воздействие на Брина может <strong>прервать заклинание</strong>.</li>
          </ul>
          <p className="prose-readable">
            <strong>На больших уровнях.</strong> Если используется ячейка 5-го уровня или выше, длительность
            увеличивается на <strong>5 минут за каждый уровень ячейки</strong>. Если используется ячейка 6-го уровня,
            можно переместить сознание любой известной цели на любом расстоянии <strong>без её согласия</strong> на
            5 минут (и дополнительно 5 минут за каждый уровень ячейки выше 6-го).
          </p>
        </section>

        <div className="quote-section">
          <div className="elven-quote">
            Учитель,<br />мне кажется, что лёд не вредит мне,<br />он защищает меня?
          </div>
        </div>

        <footer className="footer-ornament"><span className="rune-string">HESSEN</span></footer>
      </div>
    </Layout>
  );
};

export default BrinPage;
