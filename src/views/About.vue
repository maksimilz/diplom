<template>
  <div class="about-page page-container">
    <section class="about-hero">
      <h1 class="page-title">О проекте «Питомец Плюс»</h1>
      <p class="about-lead">
        Веб-приложение для автоматизации заботы о домашних питомцах.
        Организуйте уход, следите за здоровьем и получайте полезные рекомендации.
      </p>
    </section>

    <section class="mission-section">
      <div class="mission-card">
        <span class="mission-icon">🎯</span>
        <h2>Наша миссия</h2>
        <p>
          Каждый питомец заслуживает заботливого хозяина. Наш сервис помогает
          систематизировать уход, чтобы ни одна важная процедура не была забыта.
        </p>
      </div>
    </section>

    <section class="offers-section">
      <h2 class="section-title">Что мы предлагаем</h2>
      <div class="offers-grid">
        <div class="offer-card" v-for="offer in offers" :key="offer.icon">
          <span class="offer-icon">{{ offer.icon }}</span>
          <h3>{{ offer.title }}</h3>
          <p>{{ offer.desc }}</p>
        </div>
      </div>
    </section>

    <section class="tech-section">
      <h2 class="section-title">Технологии</h2>
      <div class="tech-tags">
        <span class="tech-tag" v-for="tech in techs" :key="tech">{{ tech }}</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offers: [
        { icon: '📋', title: 'Управление задачами', desc: 'Планируйте прогулки, кормления, визиты к ветеринару и другие задачи.' },
        { icon: '📓', title: 'Дневник питомца', desc: 'Записи о весе, здоровье, прививках и важных событиях.' },
        { icon: '💡', title: 'Рекомендации', desc: 'Персонализированные советы по уходу, питанию и тренировкам.' },
        { icon: '📊', title: 'Аналитика', desc: 'Динамика веса и здоровья с помощью наглядных графиков.' },
      ],
      techs: ['Vue 3', 'Vite', 'Chart.js', 'FullCalendar', 'Vue Router', 'localStorage'],
    };
  },
};
</script>

<style scoped>
.about-hero {
  text-align: center;
  margin-bottom: 40px;
}

.about-lead {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.8;
}

/* Mission */
.mission-section {
  margin-bottom: 40px;
}

.mission-card {
  background: linear-gradient(135deg, var(--primary-50), #ede9fe);
  border-radius: var(--radius-xl);
  padding: 36px;
  text-align: center;
  border: 1px solid var(--primary-100);
}

.mission-icon {
  font-size: 36px;
  display: block;
  margin-bottom: 12px;
}

.mission-card h2 {
  font-size: 22px;
  margin-bottom: 10px;
}

.mission-card p {
  color: var(--text-secondary);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Offers */
.offers-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 24px;
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.offer-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  text-align: center;
  transition: all var(--transition);
}

.offer-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-100);
}

.offer-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 12px;
}

.offer-card h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
}

.offer-card p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Tech */
.tech-section {
  text-align: center;
}

.tech-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-tag {
  padding: 6px 16px;
  background: var(--gray-100);
  color: var(--gray-700);
  font-size: 13px;
  font-weight: 500;
  border-radius: 20px;
  border: 1px solid var(--gray-200);
  transition: all 0.2s;
}

.tech-tag:hover {
  background: var(--primary-50);
  color: var(--primary);
  border-color: var(--primary-100);
}
</style>