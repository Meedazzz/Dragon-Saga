import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Dices, Users, Compass, Scroll, Sparkles, BookOpen, 
  Clock, Shield, Sword, Heart, X, ChevronRight
} from 'lucide-react';
import Layout from '@/components/Layout';
import { homeTheme } from '@/types/theme';

interface Activity {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  category: string;
  color: string;
  details: string[];
}

const activities: Activity[] = [
  {
    id: 'oracle',
    icon: Dices,
    title: 'Оракул',
    description: 'Бросок + d20 для решения судьбоносных вопросов. Древний ритуал гадания, позволяющий заглянуть в пелену будущего.',
    category: 'Гадание',
    color: '#f59e0b',
    details: [
      'Бросьте кость судьбы и получите ответ на свой вопрос',
      'Каждый бросок влияет на нити судьбы персонажа',
      'Результаты записываются в летопись',
      'Модификаторы зависят от текущей ауры героя'
    ]
  },
  {
    id: 'threads',
    icon: Users,
    title: 'Нити героев',
    description: 'Связи между персонажами и их общая история. Карта отношений, показывающая, кто кому друг, а кто враг.',
    category: 'Связи',
    color: '#a78bfa',
    details: [
      'Визуальная карта всех отношений в партии',
      'История каждой связи и её развитие',
      'Влияние событий на динамику группы',
      'Скрытые нити, которые ещё предстоит обнаружить'
    ]
  },
  {
    id: 'route',
    icon: Compass,
    title: 'Маршрут',
    description: 'Путеводитель по миру и ключевым локациям. Интерактивная карта с отметками пройденных путей.',
    category: 'Навигация',
    color: '#34d399',
    details: [
      'Интерактивная карта мира Бергхейма',
      'Отметки пройденных и предстоящих маршрутов',
      'Описание ключевых локаций и их история',
      'Секретные зоны, открываемые по ходу кампании'
    ]
  },
  {
    id: 'archive',
    icon: Scroll,
    title: 'Архив',
    description: 'Все записи, документы и найденные артефакты. Полное собрание знаний, добытых в ходе приключений.',
    category: 'Знания',
    color: '#60a5fa',
    details: [
      'Каталог всех найденных артефактов',
      'Древние тексты и их переводы',
      'Записи о существах и монстрах',
      'Исторические хроники мира'
    ]
  },
  {
    id: 'quests',
    icon: BookOpen,
    title: 'Квесты',
    description: 'Активные и завершённые задания партии. Отслеживайте прогресс и открывайте новые цели.',
    category: 'Задания',
    color: '#f97316',
    details: [
      'Список активных заданий с приоритетами',
      'История завершённых квестов',
      'Скрытые цели и альтернативные пути',
      'Награды и последствия выбора'
    ]
  },
  {
    id: 'timeline',
    icon: Clock,
    title: 'Хронология',
    description: 'Временная шкала всех событий кампании. От первой встречи до последней битвы.',
    category: 'История',
    color: '#e6e6fa',
    details: [
      'Полная временная шкала кампании',
      'Ключевые события и поворотные моменты',
      'Связь между эпизодами и их последствия',
      'Пророчества и их исполнение'
    ]
  },
  {
    id: 'battle',
    icon: Sword,
    title: 'Тактика',
    description: 'Боевые formation и стратегии партии. Планируйте сражения и анализируйте прошлые битвы.',
    category: 'Бой',
    color: '#ef4444',
    details: [
      'Боевые formation и роли каждого героя',
      'Анализ прошедших сражений',
      'Слабые и сильные стороны врагов',
      'Рекомендации по тактике'
    ]
  },
  {
    id: 'sanctuary',
    icon: Heart,
    title: 'Убежище',
    description: 'База партии и её улучшения. Ваш дом в мире Бергхейма — от шалаша до крепости.',
    category: 'База',
    color: '#ec4899',
    details: [
      'Текущее состояние базы партии',
      'Доступные улучшения и их стоимость',
      'NPC и союзники в убежище',
      'Защитные механизмы и ловушки'
    ]
  }
];

const categories = ['Все', ...Array.from(new Set(activities.map(a => a.category)))];

const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = activities.filter(a => {
    const matchesCategory = activeCategory === 'Все' || a.category === activeCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout theme={homeTheme} particleCount={20}>
      <main className="activities-page">
        {/* Hero Header */}
        <motion.section 
          className="activities-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="activities-hero__bg">
            <div className="activities-hero__orb" />
          </div>

          <div className="activities-hero__content">
            <motion.span 
              className="activities-eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              🎲 Инструменты мастера
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Активности партии
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Всё необходимое для погружения в мир Драконьей Саги. 
              Оракулы, карты, хроники и многое другое.
            </motion.p>
          </div>
        </motion.section>

        {/* Search & Filter */}
        <motion.section 
          className="activities-controls"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="activities-search">
            <Sparkles size={16} className="activities-search__icon" />
            <input 
              type="text" 
              placeholder="Найти активность..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="activities-categories">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`activities-category ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Activities Grid */}
        <section className="activities-grid">
          <AnimatePresence mode="popLayout">
            {filteredActivities.map((activity, index) => (
              <motion.article
                key={activity.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="activity-card"
                style={{ '--activity-color': activity.color } as React.CSSProperties}
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="activity-card__glow" />
                <div className="activity-card__icon">
                  <activity.icon size={28} />
                </div>
                <div className="activity-card__content">
                  <span className="activity-card__category">{activity.category}</span>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>
                <div className="activity-card__arrow">
                  <ChevronRight size={20} />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </section>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <motion.div 
            className="activities-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Sparkles size={48} />
            <p>Ничего не найдено. Попробуйте другой запрос.</p>
          </motion.div>
        )}

        {/* Activity Detail Modal */}
        <AnimatePresence>
          {selectedActivity && (
            <motion.div
              className="activity-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedActivity(null)}
            >
              <motion.div
                className="activity-modal"
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                style={{ '--activity-color': selectedActivity.color } as React.CSSProperties}
              >
                <button 
                  className="activity-modal__close"
                  onClick={() => setSelectedActivity(null)}
                  type="button"
                >
                  <X size={24} />
                </button>

                <div className="activity-modal__header">
                  <div className="activity-modal__icon">
                    <selectedActivity.icon size={32} />
                  </div>
                  <div>
                    <span className="activity-modal__category">{selectedActivity.category}</span>
                    <h2>{selectedActivity.title}</h2>
                  </div>
                </div>

                <p className="activity-modal__description">{selectedActivity.description}</p>

                <div className="activity-modal__details">
                  <h4>Возможности</h4>
                  <ul>
                    {selectedActivity.details.map((detail, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Shield size={14} />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="activity-modal__actions">
                  <button 
                    className="activity-modal__btn activity-modal__btn--primary"
                    type="button"
                  >
                    Открыть инструмент
                  </button>
                  <button 
                    className="activity-modal__btn activity-modal__btn--secondary"
                    onClick={() => setSelectedActivity(null)}
                    type="button"
                  >
                    Закрыть
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button */}
        <div className="activities-back">
          <button 
            type="button" 
            className="saga-btn saga-btn--ghost tarot-no-glow"
            onClick={() => navigate('/')}
          >
            ← Вернуться на главную
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default ActivitiesPage;
