<template>
  <div class="pet-diary">
    <h1>Дневник питомца</h1>

    <!-- Графики -->
    <div class="charts">
      <h2>Изменения</h2>
      <div class="chart">
        <h3>Рост</h3>
        <canvas id="growthChart"></canvas>
      </div>
      <div class="chart">
        <h3>Здоровье</h3>
        <canvas id="healthChart"></canvas>
      </div>
    </div>

    <!-- Записи дневника -->
    <div class="diary-entries">
      <h2>Записи дневника</h2>
      <ul>
        <li v-for="entry in entries" :key="entry.id">
          <img v-if="entry.photo" :src="entry.photo" alt="Фото записи" />
          <p><i class="fas fa-calendar-alt"></i> <strong>Дата:</strong> {{ entry.date }}</p>
          <p><i class="fas fa-comment"></i> <strong>Комментарий:</strong> {{ entry.comment }}</p>
          <p><i class="fas fa-weight"></i> <strong>Вес:</strong> {{ entry.weight }} кг</p>
          <p :class="`health-status ${entry.health.toLowerCase()}`">
            <i class="fas fa-heartbeat"></i> <strong>Состояние здоровья:</strong> {{ entry.health }}
          </p>
          <p><i class="fas fa-syringe"></i> <strong>Прививки:</strong> {{ entry.vaccinations }}</p>
        </li>
      </ul>
      <button @click="showForm = true">Добавить запись</button>
    </div>

    <!-- Форма добавления записи -->
    <div v-if="showForm" class="entry-form">
      <h2>Добавить запись</h2>
      <form @submit.prevent="addEntry">
        <label for="date">Дата</label>
        <input type="date" id="date" v-model="newEntry.date" required />

        <label for="comment">Комментарий</label>
        <textarea id="comment" v-model="newEntry.comment" required></textarea>

        <label for="photo">Фото (по желанию)</label>
        <input type="file" id="photo" @change="handlePhoto" />

        <label for="weight">Вес (кг)</label>
        <input type="number" id="weight" v-model="newEntry.weight" min="0" step="0.1" />

        <label for="health">Состояние здоровья</label>
        <select id="health" v-model="newEntry.health">
          <option value="Отличное">Отличное</option>
          <option value="Хорошее">Хорошее</option>
          <option value="Удовлетворительное">Удовлетворительное</option>
          <option value="Плохое">Плохое</option>
        </select>

        <label for="vaccinations">Прививки</label>
        <textarea id="vaccinations" v-model="newEntry.vaccinations" placeholder="Например: Бешенство, От клещей"></textarea>

        <button type="submit">Сохранить</button>
      </form>
    </div>
  </div>
</template>


<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      entries: [], // Список записей
      showForm: false, // Управление отображением формы
      newEntry: {
        date: "",
        comment: "",
        photo: null,
        weight: null,
        health: "Отличное",
        vaccinations: "",
      },
    };
  },
  methods: {
    addEntry() {
      const newEntry = { ...this.newEntry, id: Date.now() };
      this.entries.push(newEntry);
      this.resetForm();
      this.showForm = false;
    },
    resetForm() {
      this.newEntry = {
        date: "",
        comment: "",
        photo: null,
        weight: null,
        health: "Отличное",
        vaccinations: "",
      };
    },
    handlePhoto(event) {
      const file = event.target.files[0];
      if (file) {
        this.newEntry.photo = URL.createObjectURL(file);
      }
    },
  },
  mounted() {
    // График роста
    const growthCtx = document.getElementById('growthChart').getContext('2d');
    new Chart(growthCtx, {
      type: 'line',
      data: {
        labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май'],
        datasets: [
          {
            label: 'Вес',
            data: [3, 3.5, 4, 4.2, 4.4],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });

    // График здоровья
    const healthCtx = document.getElementById('healthChart').getContext('2d');
    new Chart(healthCtx, {
      type: 'bar',
      data: {
        labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май'],
        datasets: [
          {
            label: 'Состояние здоровья',
            data: [100, 95, 90, 85, 88],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  },
};

</script>

<style scoped>
.pet-diary {
  padding: 20px;
}

.charts {
  margin-bottom: 20px;
}

.chart {
  margin-bottom: 15px;
}

.diary-entries ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
}

.diary-entries li {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 320px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
  line-height: 1.5;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.diary-entries li:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.diary-entries img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 15px;
}

.health-status.отличное {
  color: green;
}

.health-status.удовлетворительное {
  color: orange;
}

.health-status.плохое {
  color: red;
}

.entry-form {
  margin-top: 20px;
}

.entry-form form {
  display: grid;
  gap: 15px;
}

.entry-form form label {
  font-weight: bold;
}

.entry-form form input,
.entry-form form textarea,
.entry-form form select {
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
}

button {
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}
</style>
