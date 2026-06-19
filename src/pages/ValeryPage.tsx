import React from 'react';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { valeryTheme } from '@/types/theme';

const ValeryPage: React.FC = () => {
  return (
    <Layout theme={valeryTheme}>
      <div className="valery-page tome-page">
        <HeroNav theme={valeryTheme} />

        <header className="valery-header">
          <div className="valery-eyebrow">AC</div>
          <h1 className="valery-title">Личное умение Валерия Даркбейна</h1>
          <p className="valery-lead">
            По примеру Асов и героев древности, ярость битвы становится вашей мощью.
            Вы улавливаете эхо предсмертных мгновений и накал сражения, превращая их в силы, питающие дары вашей крови.
          </p>
        </header>

        <section className="charge-box">
          <h2 className="section-title">Получение зарядов энергии</h2>
          <p>
            Вы получаете <strong>заряд энергии</strong> (максимум = ваш бонус мастерства) в следующих случаях
            (не чаще 1 раза за ход):
          </p>
          <ul className="charge-list">
            <li>В начале вашего хода, если в радиусе 60 футов есть недавно убитые существа (погибшие не более 1 раунда назад).</li>
            <li>Когда вы наносите урон или получаете урон.</li>
          </ul>
          <p className="charge-note">Заряды исчезают через 1 раунд после окончания боя.</p>
        </section>

        <table className="gifts-table">
          <thead>
            <tr>
              <th>Дар</th>
              <th>Стоимость</th>
              <th>Действие</th>
              <th>Эффект</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Дар Слова</td>
              <td>1 заряд</td>
              <td>Свободное</td>
              <td>Выберите союзника и дайте ему преимущество на одну атаку или всю подконтрольную вам нежить в 30 футах. Нежить тратит реакцию и выполняет короткий, физически возможный приказ.</td>
            </tr>
            <tr>
              <td>Дар Воина</td>
              <td>1 заряд</td>
              <td>Часть атаки</td>
              <td>Максимизируется только урон от оружия. Игнорирует сопротивление и иммунитеты цели (кроме уязвимостей).</td>
            </tr>
            <tr>
              <td>Дар Мага</td>
              <td>2 заряда</td>
              <td>Действие</td>
              <td>Цель получает обычный урон от вашей атаки. Одновременно все остальные существа в радиусе 15 футов от цели получают урон излучением = ваша Божественная кара + уровень паладина (спасбросок Телосложения Сл 8 + БМ + Хар; успех — половина).</td>
            </tr>
            <tr>
              <td>Дар Славы</td>
              <td>3 заряда</td>
              <td>Бонусное</td>
              <td>Восстанавливаете 1 израсходованную ячейку заклинаний. Уровень ячейки = 1d4 (не выше вашего максимального уровня заклинаний).</td>
            </tr>
            <tr className="necro-row">
              <td>Дар Смерти</td>
              <td>4 заряда</td>
              <td>Бонусное</td>
              <td>На 1 минуту: когда вы убиваете существо, можете реакцией поднять его как нежить. Эта нежить подчиняется вашим мысленным командам. Ограничение: можно использовать только БМ раз в день.</td>
            </tr>
          </tbody>
        </table>

        <section className="spell-block">
          <h2 className="section-title">Дополнительное заклинание</h2>
          <h3 className="spell-name">ВОССТАНЬ</h3>
          <p className="spell-level">3-й уровень, некромантия</p>
          <div className="stat-row"><span className="stat-label">Время накладывания:</span><span className="stat-value">Действие</span></div>
          <div className="stat-row"><span className="stat-label">Дистанция:</span><span className="stat-value">30 футов</span></div>
          <div className="stat-row"><span className="stat-label">Компоненты:</span><span className="stat-value">В</span></div>
          <div className="stat-row"><span className="stat-label">Длительность:</span><span className="stat-value">Пока не развеется</span></div>
          <p className="prose-readable" style={{ marginTop: 14 }}>
            Вы произносите слово власти, и выбранные трупы в пределах дистанции поднимаются в виде{' '}
            <strong>солдата нежити</strong>.
          </p>
          <p className="prose-readable">
            <strong>Солдат нежити</strong> ментально связан с вами. Вы можете мысленно отдавать ему команды
            (никакое действие не требуется). Если вы не отдали приказ, солдат делает всё возможное, чтобы
            защитить вас. Солдат остаётся под вашим контролем, пока не умрёт или пока вы не отпустите его действием.
          </p>
          <p className="prose-readable">
            <strong>На больших уровнях.</strong> За каждый уровень ячейки выше 3-го вы поднимаете на 2 солдат нежити больше.
          </p>
        </section>

        <div className="quote-section">
          <div className="elven-quote">
            Нет добра или зла.<br />Есть только жизнь и смерть.
          </div>
        </div>

        <footer className="footer-ornament"><span className="rune-string">DARKBAIN</span></footer>
      </div>
    </Layout>
  );
};

export default ValeryPage;
