import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';
import HomeView from '../views/HomeView.vue';
import MovieDetailView from '../views/MovieDetailView.vue';
import MyListView from '../views/MyListView.vue';
import SignInView from '../views/SignInView.vue';
import SignUpView from '../views/SignUpView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    { path: '/movies/:id', name: 'movie-detail', component: MovieDetailView, meta: { requiresAuth: true } },
    { path: '/my-list', name: 'my-list', component: MyListView, meta: { requiresAuth: true } },
    { path: '/sign-in', name: 'sign-in', component: SignInView, meta: { guestOnly: true } },
    { path: '/sign-up', name: 'sign-up', component: SignUpView, meta: { guestOnly: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) return { name: 'sign-in' };
  if (to.meta.guestOnly && auth.isAuthenticated) return { name: 'home' };
});

export default router;