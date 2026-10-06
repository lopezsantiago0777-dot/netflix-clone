<script setup>
import { featured, categories } from '../data/movies.js';
import HeroBanner from '../components/HeroBanner.vue';
import MovieCarousel from '../components/MovieCarousel.vue';
</script>

<template>
  <HeroBanner :movie="featured" />
  <MovieCarousel v-for="cat in categories" :key="cat.name"
                 :title="cat.name" :movies="cat.movies" />
</template>