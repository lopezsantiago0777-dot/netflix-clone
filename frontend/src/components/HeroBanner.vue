<script setup>
defineProps({
  movie: { type: Object, required: true },
});
</script>

<template>
  <header class="hero" :style="{ backgroundImage: `url(${movie.bannerImg})` }">
    <div class="content">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.description }}</p>
      <div class="buttons">
        <button class="play">▶ Play</button>
        <button class="info">ⓘ Más información</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero {
  height: 80vh; background-size: cover; background-position: center;
  display: flex; align-items: center; padding: 0 4%;
  position: relative;
}
.hero::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,.85) 20%, transparent 70%),
              linear-gradient(to top, #141414 0%, transparent 30%);
}
.content { position: relative; z-index: 1; max-width: 500px; }
h1 { font-size: 3rem; margin: 0 0 1rem; }
p { font-size: 1.1rem; line-height: 1.4; }
.buttons { display: flex; gap: .8rem; margin-top: 1.5rem; }
button {
  border: 0; border-radius: 4px; padding: .7rem 1.6rem;
  font-size: 1rem; font-weight: 600; cursor: pointer;
}
.play { background: #fff; color: #000; }
.info { background: rgba(109,109,110,.7); color: #fff; }
button:hover { opacity: .8; }
</style>