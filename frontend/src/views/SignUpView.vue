<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';
import '../assets/auth.css';

const auth = useAuthStore();
const router = useRouter();

const form = reactive({
  name: '', lastName: '', email: '', password: '', confirmPassword: '', avatarUrl: '',
});
const errors = ref([]);
const loading = ref(false);

const isUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const validate = () => {
  const list = [];
  if (form.name.trim().length < 2) list.push('El nombre debe tener al menos 2 caracteres.');
  if (form.lastName.trim().length < 2) list.push('El apellido debe tener al menos 2 caracteres.');
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) list.push('Ingresá un email válido.');
  if (form.password.length < 8) list.push('La contraseña debe tener al menos 8 caracteres.');
  if (form.password !== form.confirmPassword) list.push('Las contraseñas no coinciden.');
  if (form.avatarUrl && !isUrl(form.avatarUrl.trim())) list.push('El avatar debe ser una URL válida.');
  return list;
};

const submit = async () => {
  errors.value = validate();
  if (errors.value.length) return;

  loading.value = true;
  try {
    await auth.signUp({
      name: form.name.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
      avatarUrl: form.avatarUrl.trim(),
    });
    router.push({ name: 'home' });
  } catch (e) {
    const data = e.response?.data;
    errors.value = data?.errors || [data?.message || 'No se pudo conectar con el servidor.'];
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="auth">
    <form class="auth-card" @submit.prevent="submit" novalidate>
      <div class="brand">NETFLIX</div>
      <h1>Crear cuenta</h1>

      <label for="name">Nombre</label>
      <input id="name" v-model="form.name" autocomplete="given-name" />

      <label for="lastName">Apellido</label>
      <input id="lastName" v-model="form.lastName" autocomplete="family-name" />

      <label for="email">Email</label>
      <input id="email" v-model="form.email" type="email" autocomplete="email" />

      <label for="password">Contraseña (mínimo 8 caracteres)</label>
      <input id="password" v-model="form.password" type="password" autocomplete="new-password" />

      <label for="confirm">Repetir contraseña</label>
      <input id="confirm" v-model="form.confirmPassword" type="password" autocomplete="new-password" />

      <label for="avatar">URL del avatar (opcional)</label>
      <input id="avatar" v-model="form.avatarUrl" />

      <ul v-if="errors.length" class="errors">
        <li v-for="e in errors" :key="e">{{ e }}</li>
      </ul>

      <button class="submit" :disabled="loading">
        {{ loading ? 'Creando cuenta...' : 'Registrarme' }}
      </button>

      <p class="switch">¿Ya tenés cuenta? <RouterLink to="/sign-in">Iniciá sesión</RouterLink></p>
    </form>
  </div>
</template>