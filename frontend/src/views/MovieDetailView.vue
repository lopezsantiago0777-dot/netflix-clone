<script setup>
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCatalogStore } from '../stores/catalog.js';
import MovieDetail from '../components/MovieDetail.vue';

const route = useRoute();
const router = useRouter();
const store = useCatalogStore();
const { activeMovie, detailLoading, detailError } = storeToRefs(store);

watch(
  () => route.params.id,
  (id) => { if (id) store.loadMovie(id); },
  { immediate: true }
);

const close = () => router.push('/');
</script>

<template>
  <div class="overlay" @click.self="close">
    <p v-if="detailLoading" class="msg">Cargando...</p>

    <div v-else-if="detailError" class="msg">
      <p>{{ detailError }}</p>
      <button @click="close">Volver al inicio</button>
    </div>

    <MovieDetail
      v-else-if="activeMovie"
      :movie="activeMovie"
      :is-favorite="store.isFavorite(activeMovie._id)"
      @close="close"
      @toggle-favorite="store.toggleFavorite(activeMovie._id)"
    />
  </div>
</template>

<style scoped>
.overlay {
  position: fixed; inset: 0; z-index: 20; overflow-y: auto;
  background: rgba(0, 0, 0, .85);
  display: flex; justify-content: center; align-items: flex-start;
  padding: 4rem 0;
}
.msg { margin-top: 20vh; text-align: center; color: #b3b3b3; }
.msg button { margin-top: 1rem; padding: .6rem 1.4rem; border: 0; border-radius: 4px; cursor: pointer; }
</style>