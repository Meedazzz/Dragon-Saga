import React from 'react';
import Layout from '@/components/Layout';
import { homeTheme } from '@/types/theme';

/**
 * AdminPage — справка по локальному редактору текста.
 *
 * Это не серверная админка с паролем, потому что сайт работает на GitHub Pages.
 * Она включает локальный режим редактирования и объясняет, как превратить правки
 * в постоянные: экспортировать JSON и положить его в `public/content-overrides.json`.
 */
const AdminPage: React.FC = () => (
  <Layout theme={homeTheme} particleCount={12}>
    <main className="admin-page">
      <section className="admin-page-card">
        <span className="codex-kicker">Локальный редактор</span>
        <h1>Редактирование текста сайта</h1>
        <p>
          Редактор включён. Перейдите на любую страницу и кликните по подсвеченному тексту,
          чтобы изменить его прямо в интерфейсе.
        </p>
        <ol>
          <li>Откройте страницу, которую нужно править.</li>
          <li>Кликните по подсвеченному заголовку или абзацу.</li>
          <li>Сохраните правку. Она останется в localStorage вашего браузера.</li>
          <li>Нажмите «Экспорт JSON» на панели редактора.</li>
          <li>Положите скачанный файл в <code>public/content-overrides.json</code> и запушьте сайт.</li>
        </ol>
        <p className="admin-page-note">
          Для быстрого включения редактора также можно добавить к любому адресу <code>?admin=1</code>.
        </p>
      </section>
    </main>
  </Layout>
);

export default AdminPage;
