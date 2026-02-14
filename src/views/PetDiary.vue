<template>
  <div class="diary-page page-container">
    <h1 class="page-title">📓 Дневник питомца</h1>

    <!-- Графики -->
    <section class="charts-section">
      <div class="charts-grid">
        <div class="chart-card card">
          <h3>📈 Вес (кг)</h3>
          <canvas ref="growthChart"></canvas>
        </div>
        <div class="chart-card card">
          <h3>❤️ Здоровье</h3>
          <canvas ref="healthChart"></canvas>
        </div>
      </div>
    </section>

    <!-- Записи -->
    <section class="entries-section">
      <div class="entries-header">
        <h2 class="section-heading">Записи</h2>
        <button @click="showForm = !showForm" class="btn-add">
          {{ showForm ? 'Скрыть форму' : '+ Добавить запись' }}
        </button>
      </div>

      <p v-if="entries.length === 0" class="empty-state">
        <img :src="emptyDiaryImg" alt="Нет записей" class="empty-img" />
        <span>Записей пока нет. Добавьте первую!</span>
      </p>

      <div class="entries-grid">
        <div class="entry-card card" v-for="entry in entries" :key="entry.id">
          <img v-if="entry.photo" :src="entry.photo" alt="Фото" class="entry-photo" />
          <div class="entry-date">{{ entry.date }}</div>
          <p class="entry-comment">{{ entry.comment }}</p>
          <div class="entry-stats">
            <span class="stat">⚖️ {{ entry.weight }} кг</span>
            <span class="stat" :class="'health-' + healthClass(entry.health)">
              {{ healthEmoji(entry.health) }} {{ entry.health }}
            </span>
          </div>
          <p v-if="entry.vaccinations" class="entry-vacc">💉 {{ entry.vaccinations }}</p>
          <button class="btn-icon btn-icon-danger btn-delete-entry" @click="deleteEntry(entry.id)">🗑</button>
        </div>
      </div>
    </section>

    <!-- Форма -->
    <transition name="slide">
      <section v-if="showForm" class="form-section card">
        <h2 class="section-heading">Новая запись</h2>
        <form @submit.prevent="addEntry" class="diary-form">
          <div class="form-row">
            <div class="form-group">
              <label for="date">Дата</label>
              <input type="date" id="date" v-model="newEntry.date" required />
            </div>
            <div class="form-group">
              <label for="weight">Вес (кг)</label>
              <input type="number" id="weight" v-model="newEntry.weight" min="0" step="0.1" required />
            </div>
          </div>
          <div class="form-group">
            <label for="comment">Комментарий</label>
            <textarea id="comment" v-model="newEntry.comment" rows="3" required></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="health">Здоровье</label>
              <select id="health" v-model="newEntry.health">
                <option value="Отличное">Отличное</option>
                <option value="Хорошее">Хорошее</option>
                <option value="Удовлетворительное">Удовлетворительное</option>
                <option value="Плохое">Плохое</option>
              </select>
            </div>
            <div class="form-group">
              <label for="photo">Фото</label>
              <input type="file" id="photo" accept="image/*" @change="handlePhoto" />
            </div>
          </div>
          <div class="form-group">
            <label for="vaccinations">Прививки</label>
            <textarea id="vaccinations" v-model="newEntry.vaccinations" rows="2" placeholder="Бешенство, От клещей..."></textarea>
          </div>
          <button type="submit">Сохранить запись</button>
        </form>
      </section>
    </transition>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { markRaw } from 'vue';
import emptyDiaryImg from '@/assets/img/empty-diary.svg';
import { getUserCollection, addToUserCollection, deleteFromUserCollection } from '../db';

const STORAGE_KEY = 'pitomec-diary';
const HEALTH_MAP = { 'Отличное': 100, 'Хорошее': 75, 'Удовлетворительное': 50, 'Плохое': 25 };

export default {
  inject: ['getCurrentUser'],
  data() {
    return {
      entries: [],
      showForm: false,
      growthChartInstance: null,
      healthChartInstance: null,
      emptyDiaryImg,
      newEntry: { date: "", comment: "", photo: null, weight: null, health: "Отличное", vaccinations: "" },
    };
  },
  computed: {
    userId() {
      const user = this.getCurrentUser();
      return user ? user.uid : null;
    },
  },
  methods: {
    async addEntry() {
      const entryData = {
        date: this.newEntry.date,
        comment: this.newEntry.comment,
        weight: parseFloat(this.newEntry.weight),
        health: this.newEntry.health,
        vaccinations: this.newEntry.vaccinations,
      };

      if (this.userId) {
        const id = await addToUserCollection(this.userId, 'diary', entryData);
        this.entries.push({ ...entryData, id, photo: this.newEntry.photo });
      } else {
        this.entries.push({ ...entryData, id: String(Date.now()), photo: this.newEntry.photo });
        this.saveToLocalStorage();
      }

      this.entries.sort((a, b) => new Date(a.date) - new Date(b.date));
      this.resetForm();
      this.showForm = false;
      this.updateCharts();
    },
    async deleteEntry(id) {
      const entry = this.entries.find(e => e.id === id);
      if (entry && entry.photo) URL.revokeObjectURL(entry.photo);
      this.entries = this.entries.filter(e => e.id !== id);

      if (this.userId) {
        await deleteFromUserCollection(this.userId, 'diary', id);
      } else {
        this.saveToLocalStorage();
      }
      this.updateCharts();
    },
    resetForm() {
      this.newEntry = { date: "", comment: "", photo: null, weight: null, health: "Отличное", vaccinations: "" };
    },
    handlePhoto(e) {
      const f = e.target.files[0];
      if (f) {
        if (this.newEntry.photo) URL.revokeObjectURL(this.newEntry.photo);
        this.newEntry.photo = URL.createObjectURL(f);
      }
    },
    healthClass(h) {
      return { 'Отличное': 'good', 'Хорошее': 'ok', 'Удовлетворительное': 'warn', 'Плохое': 'bad' }[h] || 'ok';
    },
    healthEmoji(h) {
      return { 'Отличное': '💚', 'Хорошее': '💙', 'Удовлетворительное': '🧡', 'Плохое': '❤️' }[h] || '💙';
    },
    saveToLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries.map(e => ({ ...e, photo: null }))));
    },
    async loadEntries() {
      if (this.userId) {
        try {
          this.entries = await getUserCollection(this.userId, 'diary');
          this.entries.sort((a, b) => new Date(a.date) - new Date(b.date));
        } catch (e) {
          console.error('Ошибка загрузки дневника:', e);
          this.entries = [];
        }
      } else {
        const d = localStorage.getItem(STORAGE_KEY);
        if (d) try { this.entries = JSON.parse(d); } catch (e) { this.entries = []; }
      }
    },
    updateCharts() {
      const labels = this.entries.map(e => e.date);
      const weights = this.entries.map(e => e.weight);
      const scores = this.entries.map(e => HEALTH_MAP[e.health] || 50);
      if (this.growthChartInstance) {
        this.growthChartInstance.data.labels = labels;
        this.growthChartInstance.data.datasets[0].data = weights;
        this.growthChartInstance.update();
      }
      if (this.healthChartInstance) {
        this.healthChartInstance.data.labels = labels;
        this.healthChartInstance.data.datasets[0].data = scores;
        this.healthChartInstance.data.datasets[0].backgroundColor = scores.map(s =>
          s >= 75 ? 'rgba(16, 185, 129, 0.3)' : s >= 50 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'
        );
        this.healthChartInstance.update();
      }
    },
    createCharts() {
      const labels = this.entries.map(e => e.date);
      const weights = this.entries.map(e => e.weight);
      const scores = this.entries.map(e => HEALTH_MAP[e.health] || 50);

      this.growthChartInstance = markRaw(new Chart(this.$refs.growthChart, {
        type: 'line',
        data: {
          labels,
          datasets: [{ label: 'Вес', data: weights, borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)', borderWidth: 2, tension: 0.4, fill: true, pointRadius: 4, pointBackgroundColor: '#6366f1' }],
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false } } },
      }));

      this.healthChartInstance = markRaw(new Chart(this.$refs.healthChart, {
        type: 'bar',
        data: {
          labels,
          datasets: [{ label: 'Здоровье', data: scores, backgroundColor: scores.map(s =>
            s >= 75 ? 'rgba(16,185,129,0.3)' : s >= 50 ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'
          ), borderColor: scores.map(s =>
            s >= 75 ? '#10b981' : s >= 50 ? '#f59e0b' : '#ef4444'
          ), borderWidth: 2, borderRadius: 6 }],
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100 } } },
      }));
    },
  },
  async mounted() { await this.loadEntries(); this.createCharts(); },
  beforeUnmount() {
    if (this.growthChartInstance) this.growthChartInstance.destroy();
    if (this.healthChartInstance) this.healthChartInstance.destroy();
  },
};
</script>

<style scoped>
.charts-section { margin-bottom: 32px; }

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) { .charts-grid { grid-template-columns: 1fr; } }

.chart-card h3 {
  font-size: 15px;
  margin-bottom: 12px;
  color: var(--gray-700);
}

/* Entries */
.entries-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-heading { font-size: 18px; }

.btn-add {
  font-size: 13px;
  padding: 8px 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
  color: var(--text-secondary);
  font-size: 16px;
}
.empty-img {
  width: 200px;
  height: auto;
  opacity: 0.8;
}

.entries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.entry-card {
  position: relative;
  padding: 20px;
}

.entry-photo {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: var(--radius);
  margin-bottom: 12px;
}

.entry-date {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.entry-comment {
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 1.6;
}

.entry-stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.stat {
  font-size: 13px;
  padding: 4px 10px;
  background: var(--gray-100);
  border-radius: 12px;
}

.health-good { background: var(--success-light); color: #059669; }
.health-ok { background: var(--primary-50); color: var(--primary); }
.health-warn { background: var(--warning-light); color: #d97706; }
.health-bad { background: var(--danger-light); color: #dc2626; }

.entry-vacc {
  font-size: 13px;
  color: var(--text-secondary);
}

.btn-delete-entry {
  position: absolute;
  top: 12px;
  right: 12px;
}

/* Form */
.form-section { margin-top: 0; }

.diary-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }

/* Transition */
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }

/* Icon button */
.btn-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--gray-50);
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  transition: all 0.2s;
  box-shadow: none;
}
.btn-icon:hover { background: var(--gray-100); transform: none; }
.btn-icon-danger:hover { background: var(--danger-light); border-color: var(--danger); }
</style>
