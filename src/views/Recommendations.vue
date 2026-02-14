<template>
  <div class="reco-page page-container">
    <h1 class="page-title">💡 Рекомендации</h1>

    <!-- Фильтры -->
    <div class="filter-bar">
      <div class="filter-pills">
        <button
          v-for="cat in categories"
          :key="cat.value"
          :class="['filter-pill', { active: selectedCategory === cat.value }]"
          @click="selectedCategory = cat.value"
        >
          {{ cat.icon }} {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Список -->
    <div class="reco-list">
      <div
        v-for="rec in filteredRecommendations"
        :key="rec.id"
        :class="['reco-card card', { completed: rec.completed }]"
      >
        <div class="reco-body">
          <h3 class="reco-title">{{ rec.title }}</h3>
          <p class="reco-desc">{{ rec.description }}</p>
          <span class="reco-badge">{{ rec.category }}</span>
        </div>
        <button
          :class="['btn-check', { checked: rec.completed }]"
          @click="toggleCompleted(rec.id)"
        >
          {{ rec.completed ? "✓" : "" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = 'pitomec-recommendations';

export default {
  data() {
    return {
      selectedCategory: "",
      categories: [
        { value: "", label: "Все", icon: "📋" },
        { value: "Уход", label: "Уход", icon: "🧼" },
        { value: "Питание", label: "Питание", icon: "🍖" },
        { value: "Здоровье", label: "Здоровье", icon: "🏥" },
        { value: "Тренировки", label: "Тренировки", icon: "🏃" },
      ],
      recommendations: [
        { id: 1, title: "Ежедневный уход за шерстью", description: "Расчёсывайте шерсть каждый день для здоровья кожи.", category: "Уход", completed: false },
        { id: 2, title: "Режим питания", description: "Кормите 3 раза в день по 200 грамм.", category: "Питание", completed: false },
        { id: 3, title: "Утренние пробежки", description: "Делайте утренние пробежки по 30 минут.", category: "Тренировки", completed: false },
        { id: 4, title: "Осмотр у ветеринара", description: "Посетите ветеринара для ежемесячной профилактики.", category: "Здоровье", completed: false },
      ],
    };
  },
  computed: {
    filteredRecommendations() {
      if (this.selectedCategory) return this.recommendations.filter(r => r.category === this.selectedCategory);
      return this.recommendations;
    },
  },
  methods: {
    toggleCompleted(id) {
      const rec = this.recommendations.find(r => r.id === id);
      if (rec) { rec.completed = !rec.completed; this.saveRecommendations(); }
    },
    saveRecommendations() { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.recommendations)); },
    loadRecommendations() {
      const d = localStorage.getItem(STORAGE_KEY);
      if (d) try { this.recommendations = JSON.parse(d); } catch(e) { /* defaults */ }
    },
  },
  mounted() { this.loadRecommendations(); },
};
</script>

<style scoped>
/* Filter bar */
.filter-bar { margin-bottom: 24px; }

.filter-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-pill {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  background: var(--bg-card);
  color: var(--gray-600);
  border: 1px solid var(--border);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: none;
}

.filter-pill:hover {
  border-color: var(--primary-100);
  color: var(--primary);
  background: var(--primary-50);
  transform: none;
}

.filter-pill.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* Cards */
.reco-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.reco-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: all var(--transition);
}

.reco-card.completed {
  opacity: 0.5;
}

.reco-card.completed .reco-title {
  text-decoration: line-through;
}

.reco-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.reco-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  line-height: 1.6;
}

.reco-badge {
  display: inline-block;
  padding: 3px 10px;
  background: var(--primary-50);
  color: var(--primary);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

/* Check button */
.btn-check {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--border);
  background: var(--bg-card);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: white;
  transition: all 0.2s;
  padding: 0;
  box-shadow: none;
}

.btn-check:hover {
  border-color: var(--success);
  transform: none;
}

.btn-check.checked {
  background: var(--success);
  border-color: var(--success);
}
</style>