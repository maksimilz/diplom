import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Contacts from '../views/Contacts.vue';
import Register from '../views/Register.vue';
import petDiary from "@/views/PetDiary.vue";
import Recommendations from "@/views/Recommendations.vue";
import Tasks from "@/views/Tasks.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/contacts', name: 'Contacts', component: Contacts },
    { path: '/pet-diary', component: petDiary },
    { path: '/register', name: 'Register', component: Register },
    { path: '/recommendations', component: Recommendations },
    { path: '/tasks', component: Tasks },


];

const router = createRouter({
    history: createWebHistory('/diplom/'),м
    routes,
});

export default router;
