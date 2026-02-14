<template>
  <div class="home">
    <!-- Hero секция -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <span class="hero-badge">🐾 Платформа для заботы о питомцах</span>
          <h1 class="hero-title">
            Всё для вашего<br>
            <span class="gradient-text">питомца</span> в одном месте
          </h1>
          <p class="hero-desc">
            Автоматизируйте заботу о питомцах: персонализированные рекомендации,
            управление задачами и дневник здоровья.
          </p>
          <div class="hero-actions">
            <router-link to="/register" class="btn-hero-primary">Начать бесплатно</router-link>
            <router-link to="/about" class="btn-hero-secondary">Узнать больше →</router-link>
          </div>
        </div>
        <div class="hero-image-wrap">
          <img :src="heroImg" alt="Счастливые питомцы" class="hero-img" />
        </div>
      </div>
    </section>

    <!-- Особенности -->
    <section class="features-section">
      <h2 class="section-title">Возможности платформы</h2>
      <p class="section-subtitle">Инструменты для заботливых хозяев</p>
      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.id">
          <div class="feature-icon-wrap">
            <img :src="feature.img" :alt="feature.alt" class="feature-icon" />
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Подписка -->
    <section class="subscribe-section">
      <div class="subscribe-card">
        <h2>📬 Будьте в курсе</h2>
        <p>Подпишитесь на новости и советы по уходу за питомцами</p>
        <form @submit.prevent="subscribe" class="subscribe-form">
          <input type="email" placeholder="Введите ваш email" v-model="email" required />
          <button type="submit">Подписаться</button>
        </form>
      </div>
    </section>

    <!-- Отзывы -->
    <section class="testimonials-section">
      <h2 class="section-title">Отзывы пользователей</h2>
      <div class="testimonials-grid">
        <div class="testimonial-card" v-for="t in testimonials" :key="t.id">
          <div class="testimonial-quote">"</div>
          <p class="testimonial-text">{{ t.text }}</p>
          <div class="testimonial-author">
            <div class="author-avatar">{{ t.author.charAt(0) }}</div>
            <span>{{ t.author }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import heroImg from '@/assets/img/hero-illustration.svg';
import recommendationsImg from '@/assets/img/feature-recommendations.png';
import taskPlanningImg from '@/assets/img/feature-planning.png';
import profileMgmtImg from '@/assets/img/feature-profile.png';

export default {
  data() {
    return {
      heroImg,
      email: "",
      features: [
        {
          id: 1,
          img: taskPlanningImg,
          alt: "Планирование задач",
          title: "Планирование задач",
          description: "Удобное управление расписанием, кормлениями и прогулками.",
        },
        {
          id: 2,
          img: recommendationsImg,
          alt: "Рекомендации",
          title: "Рекомендации",
          description: "Персонализированные советы на основе данных питомца.",
        },
        {
          id: 3,
          img: profileMgmtImg,
          alt: "Управление профилями",
          title: "Профили питомцев",
          description: "Все данные о вашем питомце в одном месте.",
        },
      ],
      testimonials: [
        {
          id: 1,
          text: "Система помогла мне не забывать о прививках для моего пса! Теперь всё под контролем.",
          author: "Анна, владелец Лабрадора",
        },
        {
          id: 2,
          text: "Очень удобное приложение для планирования прогулок и отслеживания здоровья!",
          author: "Иван, владелец Корги",
        },
      ],
    };
  },
  methods: {
    subscribe() {
      alert(`Спасибо за подписку, ${this.email}!`);
      this.email = "";
    },
  },
};
</script>

<style scoped>
/* Hero */
.hero {
  padding: 80px 24px;
  background: linear-gradient(180deg, var(--primary-50) 0%, transparent 100%);
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  overflow: hidden;
}

.hero-badge {
  display: inline-block;
  padding: 6px 16px;
  background: var(--primary-100);
  color: var(--primary);
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 18px;
  color: var(--gray-900);
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 500px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px;
  text-align: left;
}

.hero-image-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-img {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

.hero-actions {
  display: flex;
  justify-content: flex-start;
  gap: 14px;
  flex-wrap: wrap;
}

.btn-hero-primary {
  padding: 12px 28px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  font-weight: 600;
  font-size: 15px;
  border-radius: var(--radius);
  transition: all var(--transition);
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
}

.btn-hero-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5);
}

.btn-hero-secondary {
  padding: 12px 28px;
  color: var(--primary);
  font-weight: 600;
  font-size: 15px;
  border-radius: var(--radius);
  border: 2px solid var(--primary-100);
  transition: all var(--transition);
}

.btn-hero-secondary:hover {
  background: var(--primary-50);
  border-color: var(--primary-light);
}

/* Features */
.features-section {
  padding: 50px 24px;
  text-align: center;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 15px;
  margin-bottom: 32px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}

.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 20px;
  text-align: center;
  transition: all var(--transition);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-100);
}

.feature-icon-wrap {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: var(--primary-50);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.feature-card h3 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
}

.feature-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Subscribe */
.subscribe-section {
  padding: 0 24px 50px;
}

.subscribe-card {
  max-width: 600px;
  margin: 0 auto;
  background: linear-gradient(135deg, var(--primary), #7c3aed);
  border-radius: var(--radius-xl);
  padding: 40px 32px;
  text-align: center;
  color: white;
}

.subscribe-card h2 {
  font-size: 22px;
  color: white;
  margin-bottom: 8px;
}

.subscribe-card p {
  font-size: 14px;
  opacity: 0.85;
  margin-bottom: 22px;
}

.subscribe-form {
  display: flex;
  gap: 10px;
  max-width: 420px;
  margin: 0 auto;
}

.subscribe-form input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: var(--radius);
  background: rgba(255,255,255,0.15);
  color: white;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.subscribe-form input::placeholder {
  color: rgba(255,255,255,0.6);
}

.subscribe-form input:focus {
  border-color: rgba(255,255,255,0.7);
  box-shadow: none;
}

.subscribe-form button {
  padding: 12px 24px;
  background: white;
  color: var(--primary);
  font-weight: 600;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  box-shadow: none;
}

.subscribe-form button:hover {
  background: var(--gray-100);
  transform: none;
}

/* Testimonials */
.testimonials-section {
  padding: 0 24px 60px;
  text-align: center;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.testimonial-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  text-align: left;
  position: relative;
  transition: all var(--transition);
}

.testimonial-card:hover {
  box-shadow: var(--shadow-md);
}

.testimonial-quote {
  font-size: 48px;
  font-weight: 700;
  color: var(--primary-100);
  line-height: 1;
  margin-bottom: -8px;
}

.testimonial-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 16px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.testimonial-author span {
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-700);
}

/* Responsive */
@media (max-width: 640px) {
  .hero-title {
    font-size: 28px;
  }

  .hero-desc {
    font-size: 15px;
  }

  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-desc {
    margin-left: auto;
    margin-right: auto;
  }

  .subscribe-form {
    flex-direction: column;
  }
}
</style>
