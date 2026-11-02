<script setup>
defineProps({
  movie: { type: Object, required: true },
  isFavorite: { type: Boolean, default: false },
});
defineEmits(['close', 'toggle-favorite']);
</script>

<template>
  <article class="detail">
    <button class="close" @click="$emit('close')">✕</button>
    <div
      class="banner"
      :style="{ backgroundImage: `url(${movie.bannerImg || movie.coverImg})` }"
    ></div>
    <div class="body">
      <h1>{{ movie.title }}</h1>
      <p class="meta">
        <span v-if="movie.releaseYear">{{ movie.releaseYear }}</span>
        <span v-if="movie.duration">{{ movie.duration }} min</span>
        <span v-if="movie.category?.name" class="tag">{{ movie.category.name }}</span>
      </p>
      <p class="description">{{ movie.description }}</p>
      <div class="buttons">
        <a v-if="movie.videoUrl" :href="movie.videoUrl" target="_blank" rel="noopener" class="play">
          ▶ Play
        </a>
        <button class="list" @click="$emit('toggle-favorite')">
          {{ isFavorite ? '✓ En Mi lista' : '+ Mi lista' }}
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.detail { position: relative; width: min(850px, 94vw); background: #181818; border-radius: 8px; overflow: hidden; }
.banner { height: 320px; background-size: cover; background-position: center; }
.banner::after { content: ''; display: block; height: 100%; background: linear-gradient(to top, #181818, transparent 60%); }
.body { padding: 0 2rem 2rem; margin-top: -4rem; position: relative; }
h1 { margin: 0 0 .5rem; font-size: 2.2rem; }
.meta { display: flex; gap: 1rem; color: #b3b3b3; align-items: center; }
.tag { border: 1px solid #555; padding: 0 .5rem; border-radius: 3px; font-size: .85rem; }
.description { line-height: 1.5; max-width: 650px; }
.buttons { display: flex; gap: .8rem; margin-top: 1.5rem; }
.play, .list { border: 0; border-radius: 4px; padding: .7rem 1.6rem; font-size: 1rem; font-weight: 600; cursor: pointer; text-decoration: none; }
.play { background: #fff; color: #000; }
.list { background: rgba(109, 109, 110, .7); color: #fff; }
.close { position: absolute; top: 12px; right: 12px; z-index: 2; width: 36px; height: 36px; border: 0; border-radius: 50%; background: #181818; color: #fff; font-size: 1rem; cursor: pointer; }
</style>