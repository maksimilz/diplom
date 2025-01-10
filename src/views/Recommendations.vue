<template>
  <div class="recommendations-page">
    <h1>Рекомендации</h1>

    <!-- Фильтры -->
    <div class="filters">
      <label for="categoryFilter">Фильтр по категории:</label>
      <select id="categoryFilter" v-model="selectedCategory">
        <option value="">Все</option>
        <option value="Уход">Уход</option>
        <option value="Питание">Питание</option>
        <option value="Здоровье">Здоровье</option>
        <option value="Тренировки">Тренировки</option>
      </select>
    </div>

    <!-- Список рекомендаций -->
    <ul class="recommendations-list">
      <li
          v-for="recommendation in filteredRecommendations"
          :key="recommendation.id"
          :class="{ completed: recommendation.completed }"
      >
        <div class="recommendation-text">
          <h3>{{ recommendation.title }}</h3>
          <p>{{ recommendation.description }}</p>
        </div>
        <div class="recommendation-actions">
          <button @click="toggleCompleted(recommendation.id)">
            {{ recommendation.completed ? "Выполнено" : "Отметить как выполненное" }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "",
      recommendations: [
        {
          id: 1,
          title: "Ежедневный уход за шерстью",
          description: "Рекомендуем расчесывать шерсть каждый день.",
          category: "Уход",
          completed: false,
        },
        {
          id: 2,
          title: "Питание",
          description: "Кормите 3 раза в день по 200 грамм.",
          category: "Питание",
          completed: false,
        },
        {
          id: 3,
          title: "Регулярные тренировки",
          description: "Делайте утренние пробежки по 30 минут.",
          category: "Тренировки",
          completed: false,
        },
        {
          id: 4,
          title: "Ежемесячный осмотр у ветеринара",
          description: "Посетите ветеринара для профилактики.",
          category: "Здоровье",
          completed: false,
        },
      ],
    };
  },
  computed: {
    filteredRecommendations() {
      if (this.selectedCategory) {
        return this.recommendations.filter(
            (recommendation) => recommendation.category === this.selectedCategory
        );
      }
      return this.recommendations;
    },
  },
  methods: {
    toggleCompleted(id) {
      const recommendation = this.recommendations.find((rec) => rec.id === id);
      if (recommendation) {
        recommendation.completed = !recommendation.completed;
      }
    },
  },
};
</script>

<style scoped>
.recommendations-page {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

.filters select {
  padding: 8px;
  font-size: 16px;
}

.recommendations-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.recommendations-list li {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recommendations-list li.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.recommendation-actions button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.recommendation-actions button:hover {
  background-color: #45a049;
}
</style>