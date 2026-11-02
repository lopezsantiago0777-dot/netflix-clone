import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  fetchCategories, fetchMovies, fetchMovieById,
  fetchMyList, addToMyList, removeFromMyList,
} from '../services/api.js';

export const useCatalogStore = defineStore('catalog', () => {
  const categories = ref([]);
  const movies = ref([]);
  const search = ref('');
  const loading = ref(false);
  const error = ref('');

  const activeMovie = ref(null);
  const detailLoading = ref(false);
  const detailError = ref('');

  const myListMovies = ref([]);
  const myListIds = computed(() => myListMovies.value.map((m) => m._id));

  const loadMovies = async () => {
    try {
      error.value = '';
      movies.value = await fetchMovies(search.value ? { title: search.value } : {});
    } catch {
      error.value = 'No se pudo cargar el catálogo.';
    }
  };

  const loadCatalog = async () => {
    loading.value = true;
    try {
      categories.value = await fetchCategories();
      await loadMovies();
    } catch {
      error.value = 'No se pudo cargar el catálogo.';
    } finally {
      loading.value = false;
    }
  };

  let timer;
  const searchMovies = () => {
    clearTimeout(timer);
    timer = setTimeout(loadMovies, 300);
  };

  const loadMovie = async (id) => {
    detailLoading.value = true;
    detailError.value = '';
    activeMovie.value = null;
    try {
      activeMovie.value = await fetchMovieById(id);
    } catch (e) {
      const status = e.response?.status;
      detailError.value =
        status === 404 || status === 400
          ? 'No encontramos esta película.'
          : 'No se pudo cargar la película.';
    } finally {
      detailLoading.value = false;
    }
  };

  const loadMyList = async () => {
    try {
      myListMovies.value = await fetchMyList();
    } catch {
      /* un 401 lo resuelve el interceptor */
    }
  };

  const isFavorite = (id) => myListIds.value.includes(id);

  const toggleFavorite = async (id) => {
    try {
      myListMovies.value = isFavorite(id) ? await removeFromMyList(id) : await addToMyList(id);
    } catch {
      /* un 401 lo resuelve el interceptor */
    }
  };

  const reset = () => {
    clearTimeout(timer);
    categories.value = [];
    movies.value = [];
    search.value = '';
    error.value = '';
    activeMovie.value = null;
    myListMovies.value = [];
  };

  return {
    categories, movies, search, loading, error,
    activeMovie, detailLoading, detailError,
    myListMovies,
    loadCatalog, searchMovies, loadMovie, loadMyList, isFavorite, toggleFavorite, reset,
  };
});