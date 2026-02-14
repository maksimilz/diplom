<template>
  <div id="app">
    <!-- Шапка -->
    <header class="header">
      <div class="header-inner">
        <router-link to="/" class="logo">
          <IconLogo class="logo-icon" />
          <span class="logo-text">Питомец Плюс</span>
        </router-link>

        <!-- Мобильное меню кнопка -->
        <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Меню">
          <IconMenu :class="['hamburger-icon', { open: mobileMenuOpen }]" />
        </button>

        <nav class="nav" :class="{ 'nav--open': mobileMenuOpen }">
          <router-link to="/" class="nav-link" @click="closeMenu">
            <IconHome /> Главная
          </router-link>
          <router-link to="/about" class="nav-link" @click="closeMenu">
            <IconAbout /> О нас
          </router-link>
          <router-link to="/contacts" class="nav-link" @click="closeMenu">
            <IconContacts /> Контакты
          </router-link>
          <router-link v-if="!currentUser" to="/register" class="nav-link" @click="closeMenu">
            <IconUser /> Вход
          </router-link>
          <button v-else class="nav-link" @click="handleLogout">
            <IconUser /> Выйти
          </button>
          <!-- Dropdown -->
          <div
            class="dropdown"
            @mouseenter="showDropdown = true"
            @mouseleave="showDropdown = false"
          >
            <button class="nav-link dropdown-trigger" @click="showDropdown = !showDropdown">
              Функции
              <IconChevronDown class="dropdown-arrow" :class="{ rotated: showDropdown }" />
            </button>
            <transition name="dropdown">
              <div v-show="showDropdown" class="dropdown-menu">
                <router-link to="/tasks" class="dropdown-item" @click="closeMenu">
                  <IconTasks class="dropdown-icon" /> Задачи
                </router-link>
                <router-link to="/pet-diary" class="dropdown-item" @click="closeMenu">
                  <IconDiary class="dropdown-icon" /> Дневник питомца
                </router-link>
                <router-link to="/recommendations" class="dropdown-item" @click="closeMenu">
                  <IconRecommendations class="dropdown-icon" /> Рекомендации
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
        <p class="footer-copy">© {{ new Date().getFullYear() }} Питомец Плюс. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import IconLogo from './components/icons/IconLogo.vue';
import IconHome from './components/icons/IconHome.vue';
import IconTasks from './components/icons/IconTasks.vue';
import IconDiary from './components/icons/IconDiary.vue';
import IconRecommendations from './components/icons/IconRecommendations.vue';
import IconAbout from './components/icons/IconAbout.vue';
import IconContacts from './components/icons/IconContacts.vue';
import IconUser from './components/icons/IconUser.vue';
import IconMenu from './components/icons/IconMenu.vue';
import IconChevronDown from './components/icons/IconChevronDown.vue';
import { onAuthChange, logoutUser } from './auth';

export default {
  components: {
    IconLogo,
    IconHome,
    IconTasks,
    IconDiary,
    IconRecommendations,
    IconAbout,
    IconContacts,
    IconUser,
    IconMenu,
    IconChevronDown
  },
  data() {
    return {
      showDropdown: false,
      mobileMenuOpen: false,
      currentUser: null,
    };
  },
  provide() {
    return {
      getCurrentUser: () => this.currentUser,
    };
  },
  mounted() {
    this._unsubAuth = onAuthChange((user) => {
      this.currentUser = user;
    });
  },
  beforeUnmount() {
    if (this._unsubAuth) this._unsubAuth();
  },
  methods: {
    closeMenu() {
      this.mobileMenuOpen = false;
      this.showDropdown = false;
    },
    async handleLogout() {
      await logoutUser();
      this.closeMenu();
      this.$router.push('/');
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
  width: 28px;
  height: 28px;
  color: white;
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

/* Hamburger (IconMenu) */
.hamburger-icon {
  width: 24px;
  height: 24px;
  color: white;
  transition: transform 0.3s;
}

.hamburger-icon.open {
  transform: rotate(90deg);
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
  width: 20px;
  height: 20px;
  color: var(--primary);
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
