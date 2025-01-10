<template>
  <div class="tasks-page">
    <h1>Задачи по уходу</h1>

    <!-- Календарь -->
    <div class="calendar">
      <h2>Календарь</h2>
      <div id="calendar"></div>
    </div>

    <!-- Список задач -->
    <div class="task-list">
      <h2>Список задач</h2>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <div class="task-info">
            <p><strong>Название:</strong> {{ task.title }}</p>
            <p><strong>Дата и время:</strong> {{ task.date }}</p>
            <p><strong>Повторяемость:</strong> {{ task.recurrence }}</p>
          </div>
          <div class="task-actions">
            <button @click="editTask(task.id)">Редактировать</button>
            <button @click="deleteTask(task.id)">Удалить</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Форма добавления задачи -->
    <div class="task-form">
      <h2>Добавить задачу</h2>
      <form @submit.prevent="addTask">
        <label for="title">Название задачи:</label>
        <input id="title" v-model="newTask.title" required />

        <label for="date">Дата и время:</label>
        <input type="datetime-local" id="date" v-model="newTask.date" required />

        <label for="recurrence">Повторяемость:</label>
        <select id="recurrence" v-model="newTask.recurrence">
          <option value="Нет">Нет</option>
          <option value="Ежедневно">Ежедневно</option>
          <option value="Еженедельно">Еженедельно</option>
        </select>

        <button type="submit">Добавить</button>
      </form>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3"; // FullCalendar для календаря
import dayGridPlugin from "@fullcalendar/daygrid"; // Плагин отображения в виде сетки

export default {
  components: { FullCalendar },
  data() {
    return {
      tasks: [],
      newTask: {
        title: "",
        date: "",
        recurrence: "Нет",
      },
      calendarEvents: [], // События для календаря
    };
  },
  methods: {
    addTask() {
      const newTask = { ...this.newTask, id: Date.now() };
      this.tasks.push(newTask);

      // Добавление события в календарь
      this.calendarEvents.push({
        title: newTask.title,
        start: newTask.date,
      });

      this.resetForm();
    },
    resetForm() {
      this.newTask = {
        title: "",
        date: "",
        recurrence: "Нет",
      };
    },
    editTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        this.newTask = { ...task };
        this.tasks = this.tasks.filter((t) => t.id !== id); // Удаляем старую задачу
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.calendarEvents = this.calendarEvents.filter(
          (event) => event.id !== id
      );
    },
  },
};
</script>

<style scoped>
.tasks-page {
  padding: 20px;
}

.calendar {
  margin-bottom: 20px;
}

.task-list ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-list li {
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-actions button {
  margin-left: 10px;
  padding: 8px 12px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.task-actions button:hover {
  background-color: #1558b0;
}

.task-form form {
  display: grid;
  gap: 10px;
}

.task-form form input,
.task-form form select {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.task-form form button {
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.task-form form button:hover {
  background-color: #45a049;
}
</style>
