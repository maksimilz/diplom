import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Contacts from '../views/Contacts.vue';
import Register from '../views/Register.vue';
import PetDiary from "@/views/PetDiary.vue";
import Recommendations from "@/views/Recommendations.vue";
import Tasks from "@/views/Tasks.vue";
import Privacy from "@/views/Privacy.vue";
import Terms from "@/views/Terms.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/contacts', name: 'Contacts', component: Contacts },
    { path: '/register', name: 'Register', component: Register },
    { path: '/pet-diary', name: 'PetDiary', component: PetDiary },
    { path: '/recommendations', name: 'Recommendations', component: Recommendations },
    { path: '/tasks', name: 'Tasks', component: Tasks },
    { path: '/privacy', name: 'Privacy', component: Privacy },
    { path: '/terms', name: 'Terms', component: Terms },
];

const router = createRouter({
    history: createWebHistory('/diplom/'),
    routes,
});

export default router;
