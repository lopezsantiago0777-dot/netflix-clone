<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCatalogStore } from '../stores/catalog.js';
import HeroBanner from '../components/HeroBanner.vue';
import MovieCarousel from '../components/MovieCarousel.vue';

const store = useCatalogStore();
const { categories, movies, search, loading, error } = storeToRefs(store);

const featured = computed(() => movies.value.find((m) => m.bannerImg) || movies.value[0]);

const rows = computed(() =>
  categories.value
    .map((cat) => ({
      ...cat,
      movies: movies.value.filter((m) => m.category === cat._id),
    }))
    .filter((row) => row.movies.length)
);

onMounted(() => store.loadCatalog());
</script>

<template>
  <HeroBanner v-if="featured && !search" :movie="featured" />

  <div class="search" :class="{ solo: !featured || search }">
    <input v-model="search" @input="store.searchMovies()" placeholder="Buscar por título..." />
  </div>

  <p v-if="loading" class="msg">Cargando...</p>
  <p v-else-if="error" class="msg">{{ error }}</p>
  <p v-else-if="!rows.length" class="msg">
    {{ search ? `No encontramos resultados para "${search}".` : 'Todavía no hay títulos en el catálogo.' }}
  </p>

  <MovieCarousel v-for="row in rows" :key="row._id" :title="row.name" :movies="row.movies" />
</template>

<style scoped>
.search { padding: 1rem 4%; }
.search.solo { padding-top: 6rem; }
input {
  width: 100%; max-width: 320px; padding: .6rem 1rem;
  border: 1px solid #333; border-radius: 4px; background: #000; color: #fff;
}
.msg { padding: 1rem 4%; color: #b3b3b3; }
</style>