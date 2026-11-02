<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';

const auth = useAuthStore();
const router = useRouter();

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Mi lista', to: '/my-list' },
];

const signOut = () => {
  auth.signOut();
  router.push({ name: 'sign-in' });
};
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" class="logo">NETFLIX</RouterLink>
    <ul>
      <li v-for="link in links" :key="link.label">
        <RouterLink :to="link.to">{{ link.label }}</RouterLink>
      </li>
    </ul>

    <div v-if="auth.user" class="user">
      <img v-if="auth.user.avatarUrl" :src="auth.user.avatarUrl" alt="" class="avatar" />
      <span v-else class="avatar initial">{{ auth.user.name?.[0]?.toUpperCase() }}</span>
      <span class="name">{{ auth.user.name }}</span>
      <button @click="signOut">Cerrar sesión</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed; top: 0; width: 100%; z-index: 10;
  display: flex; align-items: center; gap: 2rem;
  padding: 1rem 4%;
  background: linear-gradient(to bottom, rgba(0,0,0,.8), transparent);
}
.logo { color: #e50914; font-size: 1.8rem; font-weight: 800; letter-spacing: 2px; text-decoration: none; }
ul { display: flex; gap: 1.2rem; list-style: none; margin: 0; padding: 0; }
a { color: #e5e5e5; text-decoration: none; font-size: .9rem; }
a:hover { color: #b3b3b3; }
.user { margin-left: auto; display: flex; align-items: center; gap: .7rem; }
.avatar { width: 32px; height: 32px; border-radius: 4px; object-fit: cover; }
.initial { display: grid; place-items: center; background: #e50914; font-weight: 700; }
.name { font-size: .9rem; }
.user button {
  border: 1px solid #555; background: transparent; color: #fff;
  padding: .4rem .8rem; border-radius: 4px; cursor: pointer;
}
.user button:hover { background: rgba(255,255,255,.1); }
</style>