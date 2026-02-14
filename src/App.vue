<template>
  <div id="app">
    <!-- Шапка -->
    <header class="header">
      <div class="header-inner">
        <router-link to="/" class="logo">
          <span class="logo-icon">🐾</span>
          <span class="logo-text">Питомец Плюс</span>
        </router-link>

        <!-- Мобильное меню кнопка -->
        <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Меню">
          <span :class="['hamburger', { open: mobileMenuOpen }]">
            <span></span><span></span><span></span>
          </span>
        </button>

        <nav class="nav" :class="{ 'nav--open': mobileMenuOpen }">
          <router-link to="/" class="nav-link" @click="closeMenu">Главная</router-link>
          <router-link to="/about" class="nav-link" @click="closeMenu">О нас</router-link>
          <router-link to="/contacts" class="nav-link" @click="closeMenu">Контакты</router-link>
          <router-link to="/register" class="nav-link" @click="closeMenu">Вход</router-link>
          <!-- Dropdown -->
          <div
            class="dropdown"
            @mouseenter="showDropdown = true"
            @mouseleave="showDropdown = false"
          >
            <button class="nav-link dropdown-trigger" @click="showDropdown = !showDropdown">
              Функции
              <svg class="dropdown-arrow" :class="{ rotated: showDropdown }" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 5L6 8L9 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <transition name="dropdown">
              <div v-show="showDropdown" class="dropdown-menu">
                <router-link to="/tasks" class="dropdown-item" @click="closeMenu">
                  <span class="dropdown-icon">📋</span> Задачи
                </router-link>
                <router-link to="/pet-diary" class="dropdown-item" @click="closeMenu">
                  <span class="dropdown-icon">📓</span> Дневник питомца
                </router-link>
                <router-link to="/recommendations" class="dropdown-item" @click="closeMenu">
                  <span class="dropdown-icon">💡</span> Рекомендации
                </router-link>
              </div>
            </transition>
          </div>
        </nav>
      </div>
    </header>

    <!-- Контент -->
    <main>
      <router-view />
    </main>

    <!-- Подвал -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="footer-logo">🐾 Питомец Плюс</span>
          <p class="footer-desc">Автоматизация заботы о ваших питомцах</p>
        </div>
        <div class="footer-links">
          <router-link to="/privacy">Конфиденциальность</router-link>
          <router-link to="/terms">Условия</router-link>
          <router-link to="/contacts">Контакты</router-link>
        </div>
        <p class="footer-copy">© 2025 Питомец Плюс. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import './assets/styles.css';
export default {
  data() {
    return {
      showDropdown: false,
      mobileMenuOpen: false,
    };
  },
  methods: {
    closeMenu() {
      this.mobileMenuOpen = false;
      this.showDropdown = false;
    },
  },
};
</script>

<style scoped>
/* ========================================
   HEADER
   ======================================== */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%);
  box-shadow: 0 4px 20px rgba(79, 70, 229, 0.3);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.9;
}

.logo-icon {
  font-size: 26px;
}

/* Nav */
.nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.01em;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

/* Mobile toggle */
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  box-shadow: none;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ========================================
   DROPDOWN — FIXED!
   ======================================== */
.dropdown {
  position: relative;
}

.dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.dropdown-arrow {
  transition: transform 0.2s;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 8px;
  z-index: 1000;

  /* Вертикальный layout — ФИКС */
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  color: var(--gray-700);
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.15s;
  text-decoration: none;
}

.dropdown-item:hover {
  background: var(--primary-50);
  color: var(--primary);
}

.dropdown-icon {
  font-size: 18px;
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ========================================
   FOOTER
   ======================================== */
.footer {
  margin-top: auto;
  background: var(--gray-900);
  color: var(--gray-400);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 24px;
  text-align: center;
}

.footer-brand {
  margin-bottom: 20px;
}

.footer-logo {
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.footer-desc {
  font-size: 13px;
  margin-top: 4px;
  color: var(--gray-500);
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--gray-400);
  font-size: 13px;
  transition: color 0.2s;
  text-decoration: none;
}

.footer-links a:hover {
  color: white;
}

.footer-copy {
  font-size: 12px;
  color: var(--gray-600);
  padding-top: 16px;
  border-top: 1px solid var(--gray-800);
}

/* ========================================
   MOBILE RESPONSIVE
   ======================================== */
@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }

  .nav {
    position: fixed;
    top: 68px;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    flex-direction: column;
    padding: 16px;
    gap: 4px;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .nav--open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    width: 100%;
    justify-content: flex-start;
    padding: 12px 16px;
    font-size: 15px;
  }

  .dropdown {
    width: 100%;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.1);
    margin-top: 4px;
  }

  .dropdown-item {
    color: rgba(255, 255, 255, 0.9);
  }

  .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.15);
    color: white;
  }

  .footer-links {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
