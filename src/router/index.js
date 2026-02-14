import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Home from '../views/Home.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: () => import('../views/About.vue') },
    { path: '/contacts', name: 'Contacts', component: () => import('../views/Contacts.vue') },
    { path: '/register', name: 'Register', component: () => import('../views/Register.vue') },
    { path: '/pet-diary', name: 'PetDiary', component: () => import('../views/PetDiary.vue'), meta: { requiresAuth: true } },
    { path: '/recommendations', name: 'Recommendations', component: () => import('../views/Recommendations.vue'), meta: { requiresAuth: true } },
    { path: '/tasks', name: 'Tasks', component: () => import('../views/Tasks.vue'), meta: { requiresAuth: true } },
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

// Ожидание инициализации Firebase Auth (чтобы не было ложных редиректов при перезагрузке)
let authReady = false;
const waitForAuth = () => new Promise((resolve) => {
    if (authReady) { resolve(); return; }
    const unsub = onAuthStateChanged(auth, () => {
        authReady = true;
        unsub();
        resolve();
    });
});

router.beforeEach(async (to) => {
    if (to.meta.requiresAuth) {
        await waitForAuth();
        if (!auth.currentUser) {
            return { name: 'Register' };
        }
    }
});

export default router;

