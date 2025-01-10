<template>
  <div id="app">
    <!-- Шапка -->
    <header class="header">
      <h1>Питомец Плюс</h1>
      <nav class="navigation">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/about">О нас</router-link></li>
          <li><router-link to="/contacts">Контакты</router-link></li>
          <li><router-link to="/register">Вход/Регистрация</router-link></li>
          <!-- Пункт с выпадающим меню -->
          <li
              class="dropdown"
              @mouseenter="showDropdown = true"
              @mouseleave="showDropdown = false"
          >
            <a href="#">Функции</a>
            <ul v-show="showDropdown" class="dropdown-menu">
              <li><router-link to="/tasks">Задачи</router-link></li>
              <li><router-link to="/pet-diary">Дневник питомца</router-link></li>
              <li><router-link to="/recommendations">Рекомендации</router-link></li>

            </ul>
          </li>
        </ul>
      </nav>
    </header>
    <!-- Контент страницы -->
    <router-view />
    <!-- Подвал -->
    <footer class="footer">
      <p>© 2024 Питомец Плюс. Все права защищены.</p>
      <ul>
        <li><router-link to="/privacy">Политика конфиденциальности</router-link></li>
        <li><router-link to="/terms">Условия использования</router-link></li>
      </ul>
    </footer>
  </div>
</template>




<script>
import './assets/styles.css';
export default {
  data() {
    return {
      showDropdown: false,
    };
  },
};
</script>

<style scoped>
/* Шапка */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #007bff;
  color: white;
}

.navigation ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 15px;
}

.navigation li {
  position: relative;
}

.navigation a {
  color: white;
  text-decoration: none;
}

/* Выпадающее меню */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  list-style: none;
  z-index: 1000;
  border-radius: 5px;
  width: 200px;
}

.dropdown-menu li {
  padding: 10px 15px;
}

.dropdown-menu li a {
  color: #007bff;
  text-decoration: none;
  display: block;
}

.dropdown-menu li a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

/* Показ меню через Vue.js */
.dropdown-menu {
  display: none;
}

.dropdown-menu[style*="display: block;"] {
  display: block;
}

</style>
