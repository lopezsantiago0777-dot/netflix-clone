<script setup>
const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Series', to: '/' },
  { label: 'Películas', to: '/' },
  { label: 'Mi lista', to: '/' },
];
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" class="logo">NETFLIX</RouterLink>
    <ul>
      <li v-for="link in links" :key="link.label">
        <RouterLink :to="link.to">{{ link.label }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed; top: 0; width: 100%; z-index: 10;
  display: flex; align-items: center; gap: 2rem;
  padding: 1rem 4%;
  background: linear-gradient(to bottom, rgba(0,0,0,.8), transparent);
}
.logo { color: #e50914; font-size: 1.8rem; font-weight: 800; letter-spacing: 2px; }
ul { display: flex; gap: 1.2rem; list-style: none; margin: 0; padding: 0; }
a { color: #e5e5e5; text-decoration: none; font-size: .9rem; }
a:hover { color: #b3b3b3; }
</style>