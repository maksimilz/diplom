<template>
  <div class="contacts-page page-container">
    <h1 class="page-title">Контакты</h1>

    <div class="contacts-grid">
      <section class="contact-info-section">
        <h2>Свяжитесь с нами</h2>
        <div class="info-cards">
          <div class="info-card" v-for="item in contactItems" :key="item.icon">
            <span class="info-icon">{{ item.icon }}</span>
            <div>
              <strong>{{ item.label }}</strong>
              <p v-if="item.href"><a :href="item.href">{{ item.linkText }}</a></p>
              <p v-else>{{ item.value }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-form-section">
        <h2>Напишите нам</h2>
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label for="name">Ваше имя</label>
            <input id="name" v-model="form.name" type="text" placeholder="Введите имя" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="email" placeholder="Введите email" required />
          </div>
          <div class="form-group">
            <label for="message">Сообщение</label>
            <textarea id="message" v-model="form.message" rows="5" placeholder="Ваше сообщение..." required></textarea>
          </div>
          <p v-if="successMessage" class="form-success">{{ successMessage }}</p>
          <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
          <button type="submit" :disabled="submitting">{{ submitting ? 'Отправка...' : 'Отправить сообщение' }}</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import { addToGlobalCollection } from '../db';

export default {
  data() {
    return {
      contactItems: [
        { icon: '📧', label: 'Email', href: 'mailto:support@pitomecplus.ru', linkText: 'support@pitomecplus.ru' },
        { icon: '📞', label: 'Телефон', value: '+7 (800) 123-45-67' },
        { icon: '🕐', label: 'Время работы', value: 'Пн–Пт: 9:00 – 18:00' },
        { icon: '📍', label: 'Адрес', value: 'г. Москва, ул. Примерная, д. 1' },
      ],
      form: { name: "", email: "", message: "" },
      submitting: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      this.submitting = true;
      this.successMessage = "";
      this.errorMessage = "";
      try {
        await addToGlobalCollection('contacts', {
          name: this.form.name,
          email: this.form.email,
          message: this.form.message,
        });
        this.successMessage = `Спасибо, ${this.form.name}! Ваше сообщение отправлено.`;
        this.form = { name: "", email: "", message: "" };
      } catch (e) {
        console.error('Ошибка отправки формы:', e);
        this.errorMessage = 'Не удалось отправить сообщение. Попробуйте позже.';
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style scoped>
.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

@media (max-width: 768px) {
  .contacts-grid { grid-template-columns: 1fr; }
}

h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

/* Info cards */
.info-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: all var(--transition);
}

.info-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--primary-100);
}

.info-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.info-card strong {
  display: block;
  font-size: 13px;
  color: var(--gray-500);
  font-weight: 500;
  margin-bottom: 2px;
}

.info-card p {
  margin: 0;
  font-size: 14px;
  color: var(--text);
}

.info-card a {
  color: var(--primary);
}

.info-card a:hover {
  text-decoration: underline;
}

/* Form */
.contact-form-section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-success {
  color: var(--success);
  font-size: 14px;
  text-align: center;
  padding: 8px 12px;
  background: var(--success-light);
  border-radius: var(--radius);
}

.form-error {
  color: var(--danger);
  font-size: 14px;
  text-align: center;
  padding: 8px 12px;
  background: var(--danger-light);
  border-radius: var(--radius);
}
</style>