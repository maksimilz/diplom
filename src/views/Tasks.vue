<template>
  <div class="tasks-page page-container">
    <h1 class="page-title">📋 Задачи по уходу</h1>

    <!-- Календарь -->
    <section class="calendar-section card">
      <FullCalendar :options="calendarOptions" />
    </section>

    <!-- Список задач -->
    <section class="tasks-section">
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
    <section class="form-section card">
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

const STORAGE_KEY = 'pitomec-tasks';

export default {
  components: { FullCalendar },
  inject: ['getCurrentUser'],
  data() {
    return {
      tasks: [],
      editingId: null,
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
      const taskData = { title: this.newTask.title, date: this.newTask.date, recurrence: this.newTask.recurrence };

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
    },
    resetForm() { this.newTask = { title: "", date: "", recurrence: "Нет" }; },
    editTask(id) {
      const t = this.tasks.find(t => t.id === id);
      if (t) { this.newTask = { title: t.title, date: t.date, recurrence: t.recurrence }; this.editingId = id; }
    },
    cancelEdit() { this.editingId = null; this.resetForm(); },
    async deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      if (this.userId) {
        await deleteFromUserCollection(this.userId, 'tasks', id);
      } else {
        this.saveToLocalStorage();
      }
    },
    formatDate(d) {
      if (!d) return '';
      return new Date(d).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    },
    saveToLocalStorage() { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks)); },
    async loadTasks() {
      if (this.userId) {
        try {
          this.tasks = await getUserCollection(this.userId, 'tasks');
        } catch (e) {
          console.error('Ошибка загрузки задач:', e);
          this.tasks = [];
        }
      } else {
        const d = localStorage.getItem(STORAGE_KEY);
        if (d) try { this.tasks = JSON.parse(d); } catch(e) { this.tasks = []; }
      }
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

.task-actions {
  display: flex;
  gap: 6px;
}

.btn-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--gray-50);
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  transition: all 0.2s;
  box-shadow: none;
}

.btn-icon:hover {
  background: var(--gray-100);
  border-color: var(--gray-300);
  transform: none;
}

.btn-icon-danger:hover {
  background: var(--danger-light);
  border-color: var(--danger);
}

/* Form */
.task-form {
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

@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
}

.form-actions {
  display: flex;
  gap: 10px;
}

.btn-secondary {
  background: var(--gray-100);
  color: var(--gray-700);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--gray-200);
}
</style>
