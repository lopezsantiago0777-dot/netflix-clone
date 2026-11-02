<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { useAuthStore } from './stores/auth.js';
import { useCatalogStore } from './stores/catalog.js';

const route = useRoute();
const auth = useAuthStore();
const catalog = useCatalogStore();

// Carga "Mi lista" al iniciar sesión y también al recargar la página con sesión activa
watch(
  () => auth.isAuthenticated,
  (ok) => { if (ok) catalog.loadMyList(); },
  { immediate: true }
);
</script>

<template>
  <Navbar v-if="auth.isAuthenticated && route.meta.requiresAuth" />
  <main>
    <RouterView />
  </main>
  <Footer v-if="route.meta.requiresAuth" />
</template>