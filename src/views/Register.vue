<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2 v-if="isRegistering">Регистрация</h2>
      <h2 v-else>Вход</h2>
      <form @submit.prevent="handleSubmit">
        <div v-if="isRegistering" class="form-group">
          <label for="username">Имя пользователя</label>
          <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Введите имя пользователя"
              required
          />
        </div>
        <div class="form-group">
          <label for="email">Электронная почта</label>
          <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Введите вашу почту"
              required
          />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Введите пароль"
              required
          />
        </div>
        <div v-if="isRegistering" class="form-group">
          <label for="confirm-password">Подтвердите пароль</label>
          <input
              id="confirm-password"
              v-model="form.confirmPassword"
              type="password"
              placeholder="Введите пароль повторно"
              required
          />
        </div>
        <button type="submit" class="btn-primary">
          {{ isRegistering ? "Зарегистрироваться" : "Войти" }}
        </button>
        <p class="auth-toggle">
          {{ isRegistering ? "Уже есть аккаунт?" : "Нет аккаунта?" }}
          <span @click="toggleAuthMode">
            {{ isRegistering ? "Войти" : "Зарегистрироваться" }}
          </span>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRegistering: true,
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    toggleAuthMode() {
      this.isRegistering = !this.isRegistering;
    },
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
  justify-content: center; /* Центровка по горизонтали */
  align-items: center; /* Центровка по вертикали */
  height: 100vh; /* Высота экрана */
  background-color: transparent; /* Убирает фон */
  margin: 0; /* Убираем отступы */
  padding: 0; /* Убираем внутренние отступы */
}

.auth-container {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #1558b0;
}

.auth-toggle {
  text-align: center;
  margin-top: 15px;
}

.auth-toggle span {
  color: #1a73e8;
  cursor: pointer;
  text-decoration: underline;
}

</style>
