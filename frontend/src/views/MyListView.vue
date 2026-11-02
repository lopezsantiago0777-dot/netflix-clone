<script setup>
import { storeToRefs } from 'pinia';
import { useCatalogStore } from '../stores/catalog.js';

const store = useCatalogStore();
const { myListMovies } = storeToRefs(store);
</script>

<template>
  <section class="my-list">
    <h1>Mi lista</h1>

    <p v-if="!myListMovies.length" class="empty">
      Todavía no agregaste nada. Abrí un título y tocá "+ Mi lista".
    </p>

    <div v-else class="grid">
      <RouterLink v-for="m in myListMovies" :key="m._id" :to="`/movies/${m._id}`">
        <img :src="m.coverImg" :alt="m.title" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.my-list { padding: 6rem 4% 2rem; min-height: 70vh; }
h1 { margin: 0 0 1.5rem; }
.empty { color: #808080; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.grid img { width: 100%; border-radius: 4px; display: block; transition: transform .2s; }
.grid img:hover { transform: scale(1.05); }
</style>