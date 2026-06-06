<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Лор персонажа — Драконья Сага</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Amatic+SC:wght@400;700&display=swap');

  :root {
    --void: #050507;
    --raven: #0a0a0e;
    --cobalt-deep: #0b1a2e;
    --cobalt: #1a3a5c;
    --cobalt-glow: #2a5a8a;
    --sky-ice: #7ec8e3;
    --sky-pale: #a8d8f0;
    --silver: #c0c8d0;
    --silver-bright: #e0e8f0;
    --death-ember: #8a1c1c;
    --death-glow: #c43a3a;
    --parchment: #d4c4a0;
    --parchment-dim: #a09070;
    --onyx: #1a0a0a;
    --crimson-deep: #4a0a0a;
    --abyss: #020203;
    --elf-gold: #b8a060;
    --elf-pale: #c8d8e8;
    --elf-mist: rgba(200, 216, 232, 0.08);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--void);
    color: var(--silver);
    font-family: 'Cinzel', Georgia, serif;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 100;
    border: 3px solid transparent;
    border-image: linear-gradient(
      180deg,
      var(--cobalt-glow) 0%,
      transparent 15%,
      transparent 85%,
      var(--cobalt-glow) 100%
    ) 1;
    box-shadow: inset 0 0 80px rgba(11, 26, 46, 0.6), inset 0 0 20px rgba(42, 90, 138, 0.15);
  }

  /* частицы */
  .particles {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--sky-ice);
    border-radius: 50%;
    opacity: 0;
    animation: drift 12s infinite ease-in-out;
    box-shadow: 0 0 6px var(--sky-ice), 0 0 12px var(--cobalt-glow);
  }
  @keyframes drift {
    0% { opacity: 0; transform: translateY(100vh) scale(0); }
    10% { opacity: 0.6; }
    50% { opacity: 0.3; }
    90% { opacity: 0.6; }
    100% { opacity: 0; transform: translateY(-10vh) scale(1.5); }
  }

  .tome {
    max-width: 1000px;
    margin: 0 auto;
    padding: 60px 40px 80px;
    position: relative;
    z-index: 1;
    background: linear-gradient(180deg, rgba(5,5,7,0.98) 0%, rgba(10,15,25,0.95) 20%, rgba(8,12,22,0.95) 50%, rgba(10,15,25,0.95) 80%, rgba(5,5,7,0.98) 100%);
  }

  /* шапка с аватаром */
  .hero-header {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(42,90,138,0.3);
  }
  .avatar-frame {
    flex-shrink: 0;
    width: 180px;
    height: 180px;
    background: rgba(11,26,46,0.7);
    border: 2px solid var(--cobalt-glow);
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 0 20px rgba(42,90,138,0.3);
  }
  .avatar-frame:hover {
    border-color: var(--sky-ice);
    box-shadow: 0 0 30px rgba(126,200,227,0.3);
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .avatar-placeholder {
    font-size: 3rem;
    color: var(--cobalt-glow);
    text-align: center;
    line-height: 1.2;
  }
  .hero-titles {
    flex: 1;
    text-align: center;
  }
  .editable-name {
    font-family: 'Cinzel Decorative', serif;
    font-size: 3.2rem;
    font-weight: 900;
    color: var(--silver-bright);
    text-shadow: 0 0 20px rgba(192,200,208,0.4), 0 2px 6px black;
    letter-spacing: 4px;
    margin-bottom: 10px;
  }
  .editable-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: var(--sky-ice);
    font-style: italic;
    text-shadow: 0 0 8px rgba(126,200,227,0.2);
  }
  [contenteditable="true"] {
    outline: none;
    border-bottom: 1px dashed transparent;
    transition: border-color 0.2s;
  }
  [contenteditable="true"]:hover {
    border-bottom: 1px dashed var(--cobalt-glow);
  }
  [contenteditable="true"]:focus {
    border-bottom: 1px solid var(--sky-ice);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 45px 0 25px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(42, 90, 138, 0.3);
  }
  .section-icon {
    font-size: 1.6rem;
    color: var(--death-glow);
    text-shadow: 0 0 10px rgba(196,58,58,0.4);
    flex-shrink: 0;
  }
  .section-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--sky-ice);
    text-shadow: 0 0 12px rgba(126,200,227,0.25);
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--cobalt-glow), transparent);
  }

  .lore-block {
    background: rgba(11,26,46,0.3);
    padding: 25px 30px;
    border-radius: 4px;
    border-left: 3px solid var(--cobalt-glow);
    margin: 20px 0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    line-height: 1.85;
    color: var(--parchment);
    text-align: justify;
  }
  .quote-motto {
    margin: 40px 0;
    padding: 30px;
    background: var(--abyss);
    text-align: center;
    border: 1px solid rgba(42,90,138,0.4);
    border-radius: 4px;
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.4rem;
    color: var(--cobalt-glow);
    letter-spacing: 2px;
  }

  .button-bar {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 50px;
  }
  .action-btn {
    background: rgba(11,26,46,0.7);
    border: 1px solid var(--cobalt-glow);
    padding: 10px 24px;
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    letter-spacing: 2px;
    color: var(--sky-ice);
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 30px;
  }
  .action-btn:hover {
    background: var(--cobalt-glow);
    color: var(--void);
    border-color: var(--sky-ice);
    box-shadow: 0 0 12px var(--cobalt-glow);
  }

  .footer-ornament {
    text-align: center;
    margin-top: 60px;
    padding-top: 30px;
    border-top: 1px solid rgba(42,90,138,0.2);
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.5rem;
    color: var(--cobalt-glow);
    opacity: 0.6;
    letter-spacing: 10px;
  }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--void); }
  ::-webkit-scrollbar-thumb { background: var(--cobalt); border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--cobalt-glow); }

  @media (max-width: 768px) {
    .tome { padding: 30px 20px 50px; }
    .editable-name { font-size: 2rem; }
    .hero-header { flex-direction: column; }
  }
</style>
</head>
<body>

<div class="particles" id="particles"></div>

<div class="tome">

  <!-- шапка с аватаром и редактируемыми именем/титулом -->
  <div class="hero-header">
    <div class="avatar-frame" id="avatarUploader">
      <img id="avatarImg" class="avatar-img" src="" alt="Аватар" style="display: none;">
      <div id="avatarPlaceholder" class="avatar-placeholder">⚔️</div>
    </div>
    <div class="hero-titles">
      <div class="editable-name" contenteditable="true" id="charName">Валерий Даркбейн</div>
      <div class="editable-title" contenteditable="true" id="charTitle">Потомок сильнейшего Авантюриста, носитель тёмного проклятья</div>
    </div>
  </div>

  <!-- секция биографии / лор -->
  <div class="section-header">
    <span class="section-icon">📜</span>
    <h2 class="section-title">Биография и путь</h2>
    <div class="section-line"></div>
  </div>
  <div class="lore-block" id="bioBlock" contenteditable="true">
    <p>Родился в древнем роду Даркбейнов, чья кровь отмечена проклятием ещё со времён Падения Асов. С юных лет Валерий чувствовал холод смерти, дремлющий в его жилах. Он покинул родные земли, чтобы стать паладином ордена Серебряного Рассвета, но тень предков настигла его.</p>
    <p>В бою он черпает силу из последних мгновений павших врагов, превращая боль и смерть в оружие. Его доспехи помнят удары, которые не должны были пережить смертные. Говорят, что он заключил сделку с древним сущностью, обитающей за гранью жизни.</p>
  </div>

  <div class="section-header">
    <span class="section-icon">⚡</span>
    <h2 class="section-title">Ключевые свершения</h2>
    <div class="section-line"></div>
  </div>
  <div class="lore-block" id="deedsBlock" contenteditable="true">
    <ul style="margin-left: 1.5rem;">
      <li>Сокрушил культ Чёрного Пламени в подгорных залах Каз-Тура.</li>
      <li>Заключил перемирие между кланами Бергхейма и Драконьей стражей.</li>
      <li>Оживил павшего соратника ценой части собственной жизненной силы (ритуал «Восстань»).</li>
      <li>Противостоял воплощению Ледяного короля и выжил.</li>
    </ul>
  </div>

  <div class="section-header">
    <span class="section-icon">🗝️</span>
    <h2 class="section-title">Личные особенности</h2>
    <div class="section-line"></div>
  </div>
  <div class="lore-block" id="traitsBlock" contenteditable="true">
    <p><strong>Черта характера:</strong> «Смерть — не конец, а лишь ступень. Я помню лица всех, кого не смог спасти.»</p>
    <p><strong>Идеал:</strong> «Сила должна защищать тех, кто не может защитить себя. Даже если эта сила из мрака.»</p>
    <p><strong>Привязанность:</strong> Старый серебряный амулет матери, единственное, что осталось от семьи.</p>
    <p><strong>Слабость:</strong> Иногда его захлёстывает жажда боя, и он не различает друга и врага (испытание на мудрость).</p>
  </div>

  <!-- цитата / девиз -->
  <div class="quote-motto" contenteditable="true" id="mottoBlock">
    «Нет добра или зла. Есть только жизнь и смерть. И я выбираю — жить, пока могу сражаться.»
  </div>

  <!-- панель управления -->
  <div class="button-bar">
    <button class="action-btn" id="saveBtn">✧ СОХРАНИТЬ ✧</button>
    <button class="action-btn" id="resetBtn">⟳ СБРОС (ПРИМЕР) ⟳</button>
  </div>

  <div class="footer-ornament">
    ᚦ ᚨ ᚷ ᚨ ᛉ • DRAGON SAGA • ᚦ ᚨ ᚷ ᚨ ᛉ
  </div>
</div>

<script>
  // === Загрузка аватара ===
  const avatarUploader = document.getElementById('avatarUploader');
  const avatarImg = document.getElementById('avatarImg');
  const avatarPlaceholder = document.getElementById('avatarPlaceholder');

  avatarUploader.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          avatarImg.src = event.target.result;
          avatarImg.style.display = 'block';
          avatarPlaceholder.style.display = 'none';
          localStorage.setItem('avatarData', event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });

  // === Элементы с редактируемым контентом ===
  const editableElements = {
    name: document.getElementById('charName'),
    title: document.getElementById('charTitle'),
    bio: document.getElementById('bioBlock'),
    deeds: document.getElementById('deedsBlock'),
    traits: document.getElementById('traitsBlock'),
    motto: document.getElementById('mottoBlock')
  };

  // === Загрузка сохранённых данных ===
  function loadFromLocalStorage() {
    const savedAvatar = localStorage.getItem('avatarData');
    if (savedAvatar) {
      avatarImg.src = savedAvatar;
      avatarImg.style.display = 'block';
      avatarPlaceholder.style.display = 'none';
    } else {
      avatarImg.style.display = 'none';
      avatarPlaceholder.style.display = 'flex';
    }
    for (const [key, el] of Object.entries(editableElements)) {
      const saved = localStorage.getItem(`lore_${key}`);
      if (saved && el) el.innerHTML = saved;
    }
  }

  // === Сохранение всех данных ===
  function saveToLocalStorage() {
    for (const [key, el] of Object.entries(editableElements)) {
      if (el) localStorage.setItem(`lore_${key}`, el.innerHTML);
    }
    alert('✧ Лор и аватар сохранены! Страницу можно обновить – данные останутся.');
  }

  // === Сброс к примеру (произвольное заполнение, но в стиле лора) ===
  function resetToExample() {
    editableElements.name.innerHTML = 'Валерий Даркбейн';
    editableElements.title.innerHTML = 'Потомок сильнейшего Авантюриста, носитель тёмного проклятья';
    editableElements.bio.innerHTML = `
      <p>Родился в древнем роду Даркбейнов, чья кровь отмечена проклятием ещё со времён Падения Асов. С юных лет Валерий чувствовал холод смерти, дремлющий в его жилах. Он покинул родные земли, чтобы стать паладином ордена Серебряного Рассвета, но тень предков настигла его.</p>
      <p>В бою он черпает силу из последних мгновений павших врагов, превращая боль и смерть в оружие. Его доспехи помнят удары, которые не должны были пережить смертные. Говорят, что он заключил сделку с древним сущностью, обитающей за гранью жизни.</p>
    `;
    editableElements.deeds.innerHTML = `
      <ul style="margin-left: 1.5rem;">
        <li>Сокрушил культ Чёрного Пламени в подгорных залах Каз-Тура.</li>
        <li>Заключил перемирие между кланами Бергхейма и Драконьей стражей.</li>
        <li>Оживил павшего соратника ценой части собственной жизненной силы (ритуал «Восстань»).</li>
        <li>Противостоял воплощению Ледяного короля и выжил.</li>
      </ul>
    `;
    editableElements.traits.innerHTML = `
      <p><strong>Черта характера:</strong> «Смерть — не конец, а лишь ступень. Я помню лица всех, кого не смог спасти.»</p>
      <p><strong>Идеал:</strong> «Сила должна защищать тех, кто не может защитить себя. Даже если эта сила из мрака.»</p>
      <p><strong>Привязанность:</strong> Старый серебряный амулет матери, единственное, что осталось от семьи.</p>
      <p><strong>Слабость:</strong> Иногда его захлёстывает жажда боя, и он не различает друга и врага (испытание на мудрость).</p>
    `;
    editableElements.motto.innerHTML = '«Нет добра или зла. Есть только жизнь и смерть. И я выбираю — жить, пока могу сражаться.»';

    // удаляем сохранённый аватар из localStorage, сбрасываем вид
    localStorage.removeItem('avatarData');
    avatarImg.style.display = 'none';
    avatarPlaceholder.style.display = 'flex';
    avatarImg.src = '';
    
    // сохраним текстовые сброшенные данные тоже в localStorage (опционально)
    for (const [key, el] of Object.entries(editableElements)) {
      if (el) localStorage.setItem(`lore_${key}`, el.innerHTML);
    }
    alert('Пример лора загружен. При желании отредактируйте текст или загрузите аватар.');
  }

  // === Инициализация и обработчики кнопок ===
  loadFromLocalStorage();
  document.getElementById('saveBtn').addEventListener('click', saveToLocalStorage);
  document.getElementById('resetBtn').addEventListener('click', resetToExample);

  // === Частицы (как в оригинале) ===
  const particleContainer = document.getElementById('particles');
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 12 + 's';
    p.style.animationDuration = (8 + Math.random() * 8) + 's';
    particleContainer.appendChild(p);
  }
</script>
</body>
</html>
