<template>
  <div class="home">
    <!-- Основной блок -->
    <main class="main">
      <section class="intro">
        <h2>Добро пожаловать в Питомец Плюс</h2>
        <p>
          Мы поможем вам автоматизировать заботу о ваших питомцах. Получайте
          персонализированные рекомендации, управляйте задачами и следите за
          здоровьем своих питомцев в одном месте.
        </p>
      </section>

      <!-- Остальной контент -->
      <!-- Особенности системы -->
      <section class="features">
        <h2>Особенности системы</h2>
        <div class="feature-list">
          <div class="feature-item" v-for="feature in features" :key="feature.id">
            <img :src="feature.img" :alt="feature.alt" />
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <!-- Форма подписки -->
      <section class="subscription">
        <h2>Подпишитесь на новости</h2>
        <form @submit.prevent="subscribe">
          <input type="email" placeholder="Введите ваш email" v-model="email" required />
          <button type="submit">Подписаться</button>
        </form>
      </section>

      <!-- Отзывы -->
      <section class="testimonials">
        <h2>Отзывы пользователей</h2>
        <div class="testimonial-list">
          <div class="testimonial-item" v-for="testimonial in testimonials" :key="testimonial.id">
            <p>"{{ testimonial.text }}"</p>
            <span>– {{ testimonial.author }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>



<script>
export default {
  data() {
    return {
      email: "",
      features: [
        {
          id: 1,
          img: "/src/assets/img/recommendations.png",
          alt: "Планирование задач",
          title: "Планирование задач",
          description: "Удобное управление расписанием для вашего питомца.",
        },
        {
          id: 2,
          img: "/src/assets/img/Task planning.png",
          alt: "Рекомендации",
          title: "Персонализированные рекомендации",
          description: "Получайте советы на основе характеристик вашего питомца.",
        },
        {
          id: 3,
          img: "/src/assets/img/Profile Management.png",
          alt: "Управление профилями",
          title: "Управление профилями",
          description: "Все данные о вашем питомце в одном месте.",
        },
      ],
      testimonials: [
        {
          id: 1,
          text: "Система помогла мне не забывать о прививках для моего пса!",
          author: "Анна, владелец Лабрадора",
        },
        {
          id: 2,
          text: "Очень удобное приложение для планирования прогулок!",
          author: "Иван, владелец Корги",
        },
      ],
    };
  },
  methods: {
    subscribe() {
      alert(`Спасибо за подписку, ${this.email}!`);
      this.email = "";
    },
  },
};
</script>


<style scoped>
/* Основной блок */
.main {
  padding: 20px;
  text-align: center;
}


.features .card {
  display: flex;
  flex-direction: column;
  align-items: center; /* Центровка контента в карточке */
  justify-content: center;
  text-align: center;
}
/* Кнопки действия */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px; /* Пространство между кнопками */
  margin-top: 20px;
}

.action-buttons button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
/* Центровка кнопок и текста */
.intro, .features {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.action-buttons button:hover {
  background-color: #1558b0;
  transform: scale(1.05); /* Легкое увеличение */
}

/* Особенности системы */
.features {
  margin:   40px auto; /* Центровка секции */
  text-align: center; /* Центрирование текста */
  max-width: 800px; /* Ограничение ширины */
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Автоматическая сетка */
  gap: 20px; /* Пространство между карточками */
}

.feature-item {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.feature-item img {
  max-width: 80px;
  margin-bottom: 15px;
}

/* Подписка */
.subscription {
  text-align: center; /* Центровка секции подписки */
  margin: auto; /* Пространство вокруг */
  max-width: 600px; /* Ограничение ширины */
}

.subscription form {
  display: flex;
  flex-wrap: wrap; /* Перенос на новую строку, если не помещается */
  justify-content: center; /* Центрирование формы */
  align-items: center; /* Выровнять элементы по высоте */
  gap: 10px; /* Расстояние между элементами */
}
.subscription input {
  flex: 1 1 300px; /* Адаптивная ширина */
  max-width: 400px; /* Максимальная ширина */
  padding: 10px; /* Отступ внутри поля */
  font-size: 16px; /* Размер текста */
  border: 1px solid #ccc; /* Рамка поля */
  border-radius: 5px; /* Скругленные углы */
  box-sizing: border-box; /* Учет отступов в ширине */
}
.subscription button {
  margin: 10px 10px; /* Центрируем, но убираем отступы сверху и снизу */
  flex: 0 1 auto; /* Размер кнопки автоматически подстраивается */
  max-width: 150px; /* Максимальная ширина */
  padding: 10px 20px; /* Внутренние отступы */
  background-color: var(--primary-color); /* Цвет кнопки */
  color: white; /* Цвет текста */
  border: none; /* Убираем рамку */
  border-radius: 5px; /* Скругленные углы */
  font-size: 14px; /* Размер текста */
  cursor: pointer; /* Курсор указателя */
  transition: background-color 0.3s ease; /* Плавное изменение цвета */
}
.subscription button:hover {
  background-color: #1558b0;
}

/* Отзывы */
.testimonials {
  margin: 40px 0;
}

.testimonial-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.testimonial-item {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.testimonial-item p {
  margin: 0;
}

.testimonial-item span {
  display: block;
  margin-top: 10px;
  font-style: italic;
  color: #555;
}

/* Адаптивность */
@media (min-width: 768px) {
  .features .feature-list {
    grid-template-columns: repeat(3, 1fr); /* Три колонки для больших экранов */
  }

  .subscription form {
    flex-direction: row;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .action-buttons {
    flex-direction: column; /* Кнопки в столбик на маленьких экранах */
    gap: 10px;
  }

  .feature-item {
    max-width: 100%;
  }

  .subscription form {
    flex-direction: column;
    align-items: stretch;
  }

  .subscription input {
    width: 100%;
  }
}

/* Карточки навигации */
.navigation-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.navigation-cards .card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.navigation-cards .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.navigation-cards .card h3 {
  margin-bottom: 10px;
  font-size: 20px;
  color: #1a73e8;
}

.navigation-cards .card p {
  font-size: 14px;
  color: #555;
}

</style>

