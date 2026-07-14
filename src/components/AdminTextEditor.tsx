import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * AdminTextEditor — лёгкий статический редактор текста прямо на страницах.
 *
 * Важно понимать ограничение GitHub Pages:
 * - на статическом сайте нет базы данных и настоящего серверного сохранения;
 * - редактор сохраняет правки в localStorage текущего браузера;
 * - чтобы сделать правки постоянными для всех, нажми «Экспорт JSON» и положи файл
 *   в `public/content-overrides.json`, затем сделай commit/push.
 *
 * Как включить:
 * - открыть `/admin`;
 * - или добавить к любой странице `?admin=1`.
 *
 * Где менять логику редактора:
 * - список редактируемых тегов: EDITABLE_SELECTOR;
 * - правила исключения элементов: isEditableElement;
 * - стили панели: `src/index.css`, блок `.admin-editor-*`.
 */
interface OverridePayload {
  version: 1;
  updatedAt: string;
  edits: Record<string, string>;
}

const STORAGE_KEY = 'dragon-saga-text-overrides-v1';
const ADMIN_FLAG_KEY = 'dragon-saga-admin-enabled';
const ADMIN_UNLOCKED_KEY = 'dragon-saga-admin-unlocked';
const DEFAULT_ADMIN_KEY = 'dragon-saga-dm';
const EDITABLE_SELECTOR = [
  'main h1',
  'main h2',
  'main h3',
  'main h4',
  'main h5',
  'main h6',
  'main p',
  'main li',
  'main blockquote',
  'main figcaption',
  'main td',
  'main th',
  'main small',
  'main span',
  'main strong',
  'main b',
  'main em',
  'main button',
  'main a',
].join(', ');

const hashText = (value: string) => {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) + hash) + value.charCodeAt(index);
  }
  return Math.abs(hash).toString(36);
};

const loadLocalOverrides = (): Record<string, string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<OverridePayload>;
    return parsed.edits && typeof parsed.edits === 'object' ? parsed.edits : {};
  } catch {
    return {};
  }
};

const saveLocalOverrides = (edits: Record<string, string>) => {
  const payload: OverridePayload = {
    version: 1,
    updatedAt: new Date().toISOString(),
    edits,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload, null, 2));
};

const getElementPath = (element: Element) => {
  const parts: string[] = [];
  let node: Element | null = element;

  while (node && node.tagName.toLowerCase() !== 'main' && node.parentElement) {
    const tag = node.tagName.toLowerCase();
    const siblings = Array.from(node.parentElement.children).filter((child) => child.tagName === node?.tagName);
    const index = siblings.indexOf(node) + 1;
    parts.unshift(`${tag}:nth-of-type(${index})`);
    node = node.parentElement;
  }

  return parts.join('>');
};

const getOriginalText = (element: HTMLElement) => {
  const existing = element.dataset.adminOriginalText;
  if (existing) return existing;
  const text = (element.textContent ?? '').replace(/\s+/g, ' ').trim();
  element.dataset.adminOriginalText = text;
  return text;
};

const getElementKey = (element: HTMLElement, pathname: string) => {
  const original = getOriginalText(element);
  return `${pathname}|${getElementPath(element)}|${hashText(original)}`;
};

const isEditableElement = (element: HTMLElement) => {
  if (element.closest('.admin-editor-root')) return false;
  if (element.closest('input, textarea, select, iframe, nav')) return false;
  if (element.closest('.tarot-fan-wrapper, .codex-video-grid, .codex-card-altar')) return false;
  if (element.childElementCount > 0) return false;

  const text = (element.textContent ?? '').replace(/\s+/g, ' ').trim();
  if (text.length < 3) return false;

  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;

  return true;
};

const downloadJson = (payload: OverridePayload) => {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'content-overrides.json';
  link.click();
  URL.revokeObjectURL(url);
};

const AdminTextEditor: React.FC = () => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [adminSurfaceVisible, setAdminSurfaceVisible] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [fileOverrides, setFileOverrides] = useState<Record<string, string>>({});
  const [localOverrides, setLocalOverrides] = useState<Record<string, string>>({});
  const [editingElement, setEditingElement] = useState<HTMLElement | null>(null);
  const [draft, setDraft] = useState('');
  const [notice, setNotice] = useState('');

  const mergedOverrides = useMemo(() => ({ ...fileOverrides, ...localOverrides }), [fileOverrides, localOverrides]);

  const applyOverrides = useCallback(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(EDITABLE_SELECTOR));

    elements.forEach((element) => {
      if (!isEditableElement(element)) return;
      const key = getElementKey(element, location.pathname);
      const override = mergedOverrides[key];

      element.classList.toggle('admin-editor-highlight', enabled);
      element.dataset.adminEditKey = key;
      if (enabled) element.title = 'Кликните, чтобы редактировать текст';
      else element.removeAttribute('title');

      if (override && element.textContent !== override) {
        element.textContent = override;
      }
    });
  }, [enabled, location.pathname, mergedOverrides]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const shouldShow = params.get('admin') === '1' || location.pathname.endsWith('/admin') || localStorage.getItem(ADMIN_FLAG_KEY) === 'true';
    const isUnlocked = localStorage.getItem(ADMIN_UNLOCKED_KEY) === 'true';
    setAdminSurfaceVisible(shouldShow);
    setUnlocked(isUnlocked);
    setEnabled(shouldShow && isUnlocked);
    if (shouldShow) localStorage.setItem(ADMIN_FLAG_KEY, 'true');
    setLocalOverrides(loadLocalOverrides());
  }, [location.pathname, location.search]);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}content-overrides.json`, { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: Partial<OverridePayload> | null) => {
        if (!cancelled && payload?.edits && typeof payload.edits === 'object') {
          setFileOverrides(payload.edits);
        }
      })
      .catch(() => undefined);

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(applyOverrides, 120);
    const observer = new MutationObserver(() => {
      window.clearTimeout(timer);
      window.setTimeout(applyOverrides, 120);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [applyOverrides]);

  useEffect(() => {
    if (!enabled) return undefined;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const element = target?.closest<HTMLElement>(EDITABLE_SELECTOR);
      if (!element || !isEditableElement(element)) return;

      event.preventDefault();
      event.stopPropagation();
      setEditingElement(element);
      setDraft((element.textContent ?? '').trim());
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [enabled]);

  const unlockAdmin = () => {
    const configuredKey = import.meta.env.VITE_ADMIN_KEY || DEFAULT_ADMIN_KEY;
    if (password.trim() !== configuredKey) {
      setNotice('Неверный ключ редактора.');
      return;
    }
    localStorage.setItem(ADMIN_UNLOCKED_KEY, 'true');
    localStorage.setItem(ADMIN_FLAG_KEY, 'true');
    setUnlocked(true);
    setEnabled(true);
    setPassword('');
    setNotice('Редактор разблокирован. Кликните по подсвеченному тексту, чтобы изменить его.');
  };

  const lockAdmin = () => {
    localStorage.setItem(ADMIN_UNLOCKED_KEY, 'false');
    localStorage.setItem(ADMIN_FLAG_KEY, 'false');
    setUnlocked(false);
    setEnabled(false);
    setAdminSurfaceVisible(location.pathname.endsWith('/admin'));
    setNotice('Редактор заблокирован.');
  };

  const setAdminEnabled = (value: boolean) => {
    if (!unlocked && value) {
      setNotice('Сначала введите ключ редактора.');
      return;
    }
    setEnabled(value);
    localStorage.setItem(ADMIN_FLAG_KEY, value ? 'true' : 'false');
    setNotice(value ? 'Режим редактирования включён.' : 'Режим редактирования выключен.');
  };

  const saveDraft = () => {
    if (!editingElement) return;
    const key = getElementKey(editingElement, location.pathname);
    const next = { ...localOverrides, [key]: draft.trim() };
    setLocalOverrides(next);
    saveLocalOverrides(next);
    setEditingElement(null);
    window.setTimeout(applyOverrides, 80);
    setNotice('Текст сохранён локально. Для публикации экспортируй JSON и положи его в public/content-overrides.json.');
  };

  const exportOverrides = () => {
    downloadJson({ version: 1, updatedAt: new Date().toISOString(), edits: { ...fileOverrides, ...localOverrides } });
    setNotice('Файл content-overrides.json скачан. Его можно положить в public/ и запушить в GitHub.');
  };

  const importOverrides = async (file: File) => {
    const text = await file.text();
    const payload = JSON.parse(text) as Partial<OverridePayload>;
    const edits = payload.edits && typeof payload.edits === 'object' ? payload.edits : {};
    setLocalOverrides(edits);
    saveLocalOverrides(edits);
    setNotice('Импорт завершён. Правки применятся к совпадающим страницам.');
    window.setTimeout(applyOverrides, 150);
  };

  const clearLocal = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLocalOverrides({});
    setNotice('Локальные правки очищены. Обнови страницу, чтобы увидеть исходный текст.');
  };

  return (
    <div className="admin-editor-root" aria-live="polite">
      {adminSurfaceVisible && !unlocked && (
        <form className="admin-editor-panel admin-editor-login" onSubmit={(event) => { event.preventDefault(); unlockAdmin(); }}>
          <strong>Редактор текста</strong>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ключ редактора"
            aria-label="Ключ редактора"
          />
          <button type="submit">Войти</button>
          {notice && <span>{notice}</span>}
        </form>
      )}

      {adminSurfaceVisible && unlocked && (
        <div className="admin-editor-panel">
          <strong>Редактор текста</strong>
          <button type="button" onClick={() => setAdminEnabled(!enabled)}>{enabled ? 'Пауза' : 'Включить'}</button>
          <button type="button" onClick={exportOverrides}>Экспорт JSON</button>
          <button type="button" onClick={() => fileInputRef.current?.click()}>Импорт</button>
          <button type="button" onClick={clearLocal}>Очистить</button>
          <button type="button" onClick={lockAdmin}>Выйти</button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void importOverrides(file);
              event.currentTarget.value = '';
            }}
          />
          {notice && <span>{notice}</span>}
        </div>
      )}

      {editingElement && (
        <div className="admin-editor-modal" role="dialog" aria-modal="true">
          <div className="admin-editor-dialog">
            <h2>Редактирование текста</h2>
            <p>Правка сохранится в этом браузере. Для публикации на сайте экспортируй JSON.</p>
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={8} />
            <div>
              <button type="button" onClick={saveDraft}>Сохранить</button>
              <button type="button" onClick={() => setEditingElement(null)}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTextEditor;
