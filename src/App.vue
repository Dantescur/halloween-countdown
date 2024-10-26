<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavBar from './components/NavBar.vue';
import CountdownTimer from './components/CountdownTimer.vue';

gsap.registerPlugin(ScrollTrigger);

let lenis: any = null;

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  gsap.from('.content-section', {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.content-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });
});

onUnmounted(() => {
  if (lenis) {
    lenis.destroy();
  }
});
</script>

<template>
  <NavBar />
  
  <div class="container">
    <section class="content-section hero">
      <h1>{{ $t('h1') }}</h1>
      <p>{{ $t('p') }}...</p>
      <CountdownTimer />
    </section>
  </div>
</template>

<style>
:root {
  --primary: #ff6b00;
  --secondary: #ff9d00;
  --background: #1a1a1a;
  --text: #ffffff;
}

body {
  background-color: var(--background);
  color: var(--text);
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}

.content-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('/hallowen-bg.webp') center/cover;
}

h1 {
  font-size: 4rem;
  color: var(--primary);
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>