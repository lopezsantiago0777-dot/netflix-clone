<script setup>
import { ref } from 'vue';

defineProps({
  title: String,
  movies: { type: Array, default: () => [] },
});

const track = ref(null);
const scroll = (dir) => {
  track.value.scrollBy({ left: dir * 600, behavior: 'smooth' });
};
</script>

<template>
  <section class="carousel">
    <h2>{{ title }}</h2>
    <button @click="scroll(-1)">‹</button>
    <div class="track" ref="track">
      <img v-for="movie in movies" :key="movie.id"
           :src="movie.coverImg" :alt="movie.title" />
    </div>
    <button @click="scroll(1)">›</button>
  </section>
</template>

<style scoped>
.track { display: flex; gap: 8px; overflow-x: auto; scroll-behavior: smooth; }
.track img { height: 180px; border-radius: 4px; }
</style>