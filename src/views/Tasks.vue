<template>
  <div class="tasks-page page-container">
    <h1 class="page-title">📋 Задачи по уходу</h1>

    <!-- Календарь -->
    <section class="calendar-section card">
      <FullCalendar :options="calendarOptions" />
    </section>

    <!-- Загрузка -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Загрузка задач...</p>
    </div>

    <!-- Список задач -->
    <section v-else class="tasks-section">
      <h2 class="section-heading">Список задач</h2>
      <p v-if="tasks.length === 0" class="empty-state">
        <span class="empty-icon">📝</span>
        Задач пока нет. Добавьте первую!
      </p>
      <div class="tasks-list">
        <div class="task-card" v-for="task in tasks" :key="task.id">
          <div class="task-body">
            <h3 class="task-title">{{ task.title }}</h3>
            <div class="task-meta">
              <span class="meta-item">🗓 {{ formatDate(task.date) }}</span>
              <span class="meta-badge" v-if="task.recurrence !== 'Нет'">🔁 {{ task.recurrence }}</span>
            </div>
          </div>
          <div class="task-actions">
            <button class="btn-icon" @click="editTask(task.id)" title="Редактировать">✏️</button>
            <button class="btn-icon btn-icon-danger" @click="deleteTask(task.id)" title="Удалить">🗑</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Форма -->
    <p v-if="errorMessage" class="error-banner">⚠️ {{ errorMessage }}</p>
    <section v-if="showForm" class="form-section card">
      <h2 class="section-heading">{{ editingId ? '✏️ Редактировать' : '➕ Добавить задачу' }}</h2>
      <form @submit.prevent="addTask" class="task-form">
        <div class="form-group">
          <label for="title">Название</label>
          <input id="title" v-model="newTask.title" placeholder="Например: Прогулка" required />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="date">Дата и время</label>
            <input type="datetime-local" id="date" v-model="newTask.date" required />
          </div>
          <div class="form-group">
            <label for="recurrence">Повторяемость</label>
            <select id="recurrence" v-model="newTask.recurrence">
              <option value="Нет">Нет</option>
              <option value="Ежедневно">Ежедневно</option>
              <option value="Еженедельно">Еженедельно</option>
            </select>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit">{{ editingId ? 'Сохранить' : 'Добавить' }}</button>
          <button v-if="editingId" type="button" class="btn-secondary" @click="cancelEdit">Отмена</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getUserCollection, addToUserCollection, updateInUserCollection, deleteFromUserCollection } from '../db';
import { STORAGE_KEYS } from '../constants';

export default {
  components: { FullCalendar },
  inject: ['getCurrentUser'],
  data() {
    return {
      tasks: [],
      editingId: null,
      errorMessage: "",
      loading: false,
      newTask: { title: "", date: "", recurrence: "Нет" },
    };
  },
  computed: {
    userId() {
      const user = this.getCurrentUser();
      return user ? user.uid : null;
    },
    calendarOptions() {
      return {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        locale: 'ru',
        height: 'auto',
        headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,dayGridWeek' },
        events: this.tasks.map(t => ({ id: String(t.id), title: t.title, start: t.date })),
      };
    },
  },
  methods: {
    async addTask() {
      this.errorMessage = "";
      const taskData = { title: this.newTask.title, date: this.newTask.date, recurrence: this.newTask.recurrence };

      try {
        if (this.editingId) {
          const i = this.tasks.findIndex(t => t.id === this.editingId);
          if (i !== -1) {
            this.tasks[i] = { ...taskData, id: this.editingId };
            if (this.userId) {
              await updateInUserCollection(this.userId, 'tasks', this.editingId, taskData);
            }
          }
          this.editingId = null;
        } else {
          if (this.userId) {
            const id = await addToUserCollection(this.userId, 'tasks', taskData);
            this.tasks.push({ ...taskData, id });
          } else {
            this.tasks.push({ ...taskData, id: String(Date.now()) });
          }
        }

        this.resetForm();
        if (!this.userId) this.saveToLocalStorage();
      } catch (e) {
        console.error('Ошибка сохранения задачи:', e);
        this.errorMessage = 'Не удалось сохранить задачу. Попробуйте позже.';
      }
    },
    resetForm() { this.newTask = { title: "", date: "", recurrence: "Нет" }; },
    editTask(id) {
      const t = this.tasks.find(t => t.id === id);
      if (t) { this.newTask = { title: t.title, date: t.date, recurrence: t.recurrence }; this.editingId = id; }
    },
    cancelEdit() { this.editingId = null; this.resetForm(); },
    async deleteTask(id) {
      this.errorMessage = "";
      this.tasks = this.tasks.filter(t => t.id !== id);
      try {
        if (this.userId) {
          await deleteFromUserCollection(this.userId, 'tasks', id);
        } else {
          this.saveToLocalStorage();
        }
      } catch (e) {
        console.error('Ошибка удаления задачи:', e);
        this.errorMessage = 'Не удалось удалить задачу.';
      }
    },
    formatDate(d) {
      if (!d) return '';
      return new Date(d).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    },
    saveToLocalStorage() { localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(this.tasks)); },
    async loadTasks() {
      this.loading = true;
      if (this.userId) {
        try {
          this.tasks = await getUserCollection(this.userId, 'tasks');
          await this.processRecurrence();
        } catch (e) {
          console.error('Ошибка загрузки задач:', e);
          this.tasks = [];
        }
      } else {
        const d = localStorage.getItem(STORAGE_KEYS.TASKS);
        if (d) try { this.tasks = JSON.parse(d); await this.processRecurrence(); } catch(e) { this.tasks = []; }
      }
      this.loading = false;
    },
    async processRecurrence() {
      const now = new Date();
      const newTasks = [];
      
      for (const t of this.tasks) {
        if (!t.recurrence || t.recurrence === 'Нет') continue;
        const taskDate = new Date(t.date);
        if (taskDate < now) {
            let nextDate = new Date(taskDate);
            if (t.recurrence === 'Ежедневно') nextDate.setDate(nextDate.getDate() + 1);
            else if (t.recurrence === 'Еженедельно') nextDate.setDate(nextDate.getDate() + 7);
            
            const nextDateStr = nextDate.toISOString().slice(0, 16);
            const exists = this.tasks.find(ex => ex.title === t.title && ex.date === nextDateStr);
            
            if (!exists && nextDate > now) {
                const newTask = { title: t.title, date: nextDateStr, recurrence: t.recurrence };
                newTasks.push(newTask);
            }
        }
      }

      if (newTasks.length > 0) {
        for (const nt of newTasks) {
            if (this.userId) {
                const id = await addToUserCollection(this.userId, 'tasks', nt);
                this.tasks.push({ ...nt, id });
            } else {
                this.tasks.push({ ...nt, id: String(Date.now() + Math.random()) });
            }
        }
        if (!this.userId) this.saveToLocalStorage();
      }
    },
    handleDateClick(arg) {
      if (this.newTask.date && this.newTask.date.startsWith(arg.dateStr)) return;
      this.newTask.date = arg.dateStr + 'T12:00';
      this.showForm = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  watch: {
    userId() {
      this.loadTasks();
    },
  },
  async mounted() { await this.loadTasks(); },
};
</script>

<style scoped>
.calendar-section {
  margin-bottom: 32px;
}

.section-heading {
  font-size: 18px;
  margin-bottom: 16px;
}

/* Empty */
.empty-state {
  text-align: center;
  padding: 32px;
  color: var(--text-secondary);
  font-size: 14px;
}
.empty-icon { font-size: 32px; display: block; margin-bottom: 8px; }

/* Task cards */
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.task-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 20px;
  transition: all var(--transition);
}

.task-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--primary-100);
}

.task-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.task-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--text-secondary);
}

.meta-badge {
  padding: 2px 8px;
  background: var(--primary-50);
  border-radius: 12px;
  font-size: 12px;
  color: var(--primary);
  font-weight: 500;
}

/* Spinner */
.loading-state {
    text-align: center;
    padding: 40px;
    color: var(--gray-500);
}
.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--gray-200);
    border-top: 4px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>
