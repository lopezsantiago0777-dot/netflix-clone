<script setup>
import { ref } from 'vue';

defineProps({
  title: String,
  movies: { type: Array, default: () => [] },
});

const track = ref(null);
const scroll = (dir) => {
  track.value?.scrollBy({ left: dir * 600, behavior: 'smooth' });
};
</script>

<template>
  <section class="carousel">
    <h2>{{ title }}</h2>

    <p v-if="!movies.length" class="empty">Todavía no hay títulos en esta categoría.</p>

    <div v-else class="wrapper">
      <button class="arrow left" @click="scroll(-1)">‹</button>
      <div class="track" ref="track">
        <RouterLink
          v-for="movie in movies"
          :key="movie._id"
          :to="`/movies/${movie._id}`"
        >
          <img :src="movie.coverImg" :alt="movie.title" />
        </RouterLink>
      </div>
      <button class="arrow right" @click="scroll(1)">›</button>
    </div>
  </section>
</template>

<style scoped>
.carousel { padding: 0 4%; margin-bottom: 2rem; }
h2 { font-size: 1.3rem; margin: 0 0 .6rem; }
.wrapper { position: relative; }
.track { display: flex; gap: 8px; overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none; }
.track::-webkit-scrollbar { display: none; }
.track img { height: 180px; border-radius: 4px; display: block; transition: transform .2s; }
.track img:hover { transform: scale(1.05); }
.arrow {
  position: absolute; top: 0; bottom: 0; z-index: 2; width: 40px; border: 0;
  background: rgba(0, 0, 0, .5); color: #fff; font-size: 2rem; cursor: pointer;
}
.left { left: 0; }
.right { right: 0; }
.empty { color: #808080; }
</style>