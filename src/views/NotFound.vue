<template>
  <div class="not-found page-container">
    <div class="not-found-content">
      <span class="not-found-icon">🐾</span>
      <h1 class="not-found-title">404</h1>
      <p class="not-found-text">Страница не найдена</p>
      <p class="not-found-desc">Похоже, эта страница убежала, как непослушный щенок!</p>
      <router-link to="/" class="btn-home">← На главную</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
}

.not-found-content {
  text-align: center;
}

.not-found-icon {
  font-size: 64px;
  display: block;
  margin-bottom: 16px;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.not-found-title {
  font-size: 72px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.not-found-text {
  font-size: 22px;
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: 8px;
}

.not-found-desc {
  color: var(--text-secondary);
  font-size: 15px;
  margin-bottom: 28px;
}

.btn-home {
  display: inline-block;
  padding: 12px 28px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  font-weight: 600;
  font-size: 15px;
  border-radius: var(--radius);
  transition: all var(--transition);
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
}

.btn-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5);
}
</style>
