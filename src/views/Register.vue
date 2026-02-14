<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <span class="auth-icon">🐾</span>
        <h2>{{ isRegistering ? "Создать аккаунт" : "Добро пожаловать" }}</h2>
        <p class="auth-subtitle">{{ isRegistering ? "Зарегистрируйтесь для начала работы" : "Войдите в свой аккаунт" }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="isRegistering" class="form-group">
          <label for="username">Имя пользователя</label>
          <input id="username" v-model="form.username" type="text" placeholder="Введите имя" required />
        </div>
        <div class="form-group">
          <label for="email">Электронная почта</label>
          <input id="email" v-model="form.email" type="email" placeholder="you@example.com" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="form.password" type="password" placeholder="••••••••" required />
        </div>
        <div v-if="isRegistering" class="form-group">
          <label for="confirm-password">Подтвердите пароль</label>
          <input id="confirm-password" v-model="form.confirmPassword" type="password" placeholder="••••••••" required />
        </div>
        <p v-if="errorMessage" class="auth-error">{{ errorMessage }}</p>
        <button type="submit" class="btn-auth" :disabled="loading">
          {{ loading ? 'Подождите...' : (isRegistering ? 'Зарегистрироваться' : 'Войти') }}
        </button>
      </form>

      <p class="auth-toggle">
        {{ isRegistering ? "Уже есть аккаунт?" : "Нет аккаунта?" }}
        <span @click="toggleAuthMode" class="toggle-link">
          {{ isRegistering ? "Войти" : "Зарегистрироваться" }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { registerUser, loginUser } from '../auth';

export default {
  data() {
    return {
      isRegistering: true,
      form: { username: "", email: "", password: "", confirmPassword: "" },
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    toggleAuthMode() {
      this.isRegistering = !this.isRegistering;
      this.errorMessage = "";
    },
    async handleSubmit() {
      this.errorMessage = "";

      if (this.isRegistering && this.form.password !== this.form.confirmPassword) {
        this.errorMessage = "Пароли не совпадают!";
        return;
      }

      if (this.form.password.length < 6) {
        this.errorMessage = "Пароль должен быть не менее 6 символов";
        return;
      }

      this.loading = true;
      try {
        if (this.isRegistering) {
          await registerUser(this.form.email, this.form.password, this.form.username);
        } else {
          await loginUser(this.form.email, this.form.password);
        }
        this.$router.push('/');
      } catch (e) {
        const messages = {
          'auth/email-already-in-use': 'Этот email уже зарегистрирован',
          'auth/invalid-email': 'Некорректный email',
          'auth/weak-password': 'Слишком простой пароль',
          'auth/user-not-found': 'Пользователь не найден',
          'auth/wrong-password': 'Неверный пароль',
          'auth/invalid-credential': 'Неверный email или пароль',
        };
        this.errorMessage = messages[e.code] || `Ошибка: ${e.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 180px);
  padding: 40px 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 40px 32px;
  box-shadow: var(--shadow-lg);
}

.auth-header {
  text-align: center;
  margin-bottom: 28px;
}

.auth-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 12px;
}

.auth-header h2 {
  font-size: 24px;
  margin-bottom: 4px;
}

.auth-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.btn-auth {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 8px;
}

.btn-auth:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-error {
  color: var(--danger);
  font-size: 13px;
  text-align: center;
  padding: 8px 12px;
  background: var(--danger-light);
  border-radius: var(--radius);
}

.auth-toggle {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: var(--text-secondary);
}

.toggle-link {
  color: var(--primary);
  cursor: pointer;
  font-weight: 500;
  margin-left: 4px;
}

.toggle-link:hover {
  text-decoration: underline;
}
</style>
