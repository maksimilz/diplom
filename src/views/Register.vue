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
        <button type="submit" class="btn-auth">
          {{ isRegistering ? "Зарегистрироваться" : "Войти" }}
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
export default {
  data() {
    return {
      isRegistering: true,
      form: { username: "", email: "", password: "", confirmPassword: "" },
    };
  },
  methods: {
    toggleAuthMode() { this.isRegistering = !this.isRegistering; },
    handleSubmit() {
      if (this.isRegistering && this.form.password !== this.form.confirmPassword) {
        alert("Пароли не совпадают!");
        return;
      }
      alert(this.isRegistering ? "Регистрация успешна!" : "Вход выполнен!");
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
