import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: () => import('../views/About.vue') },
    { path: '/contacts', name: 'Contacts', component: () => import('../views/Contacts.vue') },
    { path: '/register', name: 'Register', component: () => import('../views/Register.vue') },
    { path: '/pet-diary', name: 'PetDiary', component: () => import('../views/PetDiary.vue') },
    { path: '/recommendations', name: 'Recommendations', component: () => import('../views/Recommendations.vue') },
    { path: '/tasks', name: 'Tasks', component: () => import('../views/Tasks.vue') },
    { path: '/privacy', name: 'Privacy', component: () => import('../views/Privacy.vue') },
    { path: '/terms', name: 'Terms', component: () => import('../views/Terms.vue') },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },
];

const router = createRouter({
    history: createWebHistory('/diplom/'),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

export default router;

