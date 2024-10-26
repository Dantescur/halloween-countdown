<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';


const { locale } = useI18n()

onMounted(() => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    locale.value = savedLocale;
  }
})

watch(locale, (newLocale) => {
  localStorage.setItem('locale', newLocale)
})

</script>

<template>
  <nav class="navbar">
    <div class="nav-item pointer"> {{ $t("title") }}</div>
    <div class="locale-changer nav-item">
      <select v-model="locale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
          {{ locale }}
        </option>
      </select>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

.pointer {
  cursor: pointer;
}

.nav-item {
  color: #ff6b00;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #ff9d00;
}

.locale-changer select {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background 0.3s ease, color 0.3s ease;
}

.locale-changer select:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #ff6b00;
}

.locale-changer select:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(255, 107, 0, 0.5);
}
</style>
