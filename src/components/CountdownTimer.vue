<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

interface TimeUnit {
  value: number;
  prev: number;
}

interface TimeLeft {
  days: TimeUnit;
  hours: TimeUnit;
  minutes: TimeUnit;
  seconds: TimeUnit;
}

const timeLeft = ref<TimeLeft>({
  days: { value: 0, prev: 0 },
  hours: { value: 0, prev: 0 },
  minutes: { value: 0, prev: 0 },
  seconds: { value: 0, prev: 0 }
});

let timer: number;

const animateValue = (element: HTMLElement, _start: number, end: number) => {
  gsap.to(element, {
    innerHTML: end,
    duration: 0.5,
    snap: { innerHTML: 1 },
    ease: 'power2.out'
  });
};

const calculateTimeLeft = () => {
  const halloween = new Date(new Date().getFullYear(), 9, 31);
  if (halloween.getTime() < Date.now()) {
    halloween.setFullYear(halloween.getFullYear() + 1);
  }

  const difference = halloween.getTime() - Date.now();

  const newTimeLeft = {
    days: {
      prev: timeLeft.value.days.value,
      value: Math.floor(difference / (1000 * 60 * 60 * 24))
    },
    hours: {
      prev: timeLeft.value.hours.value,
      value: Math.floor((difference / (1000 * 60 * 60)) % 24)
    },
    minutes: {
      prev: timeLeft.value.minutes.value,
      value: Math.floor((difference / 1000 / 60) % 60)
    },
    seconds: {
      prev: timeLeft.value.seconds.value,
      value: Math.floor((difference / 1000) % 60)
    }
  };

  Object.entries(newTimeLeft).forEach(([key, unit]) => {
    if (unit.value !== unit.prev) {
      const element = document.querySelector<HTMLElement>(`[data-unit="${key}"]`);
      if (element) {
        animateValue(element, unit.prev, unit.value);
      }
    }
  });

  timeLeft.value = newTimeLeft;

  if (newTimeLeft.seconds.value === 0) {
    crazyButyAnim()
  }
};

const crazyButyAnim = () => {
  const cards = document.querySelectorAll('.countdown-card');
  cards.forEach((card, index) => {
    gsap.fromTo(card, { x: 0, opacity: 1 }, {
      x: -200,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      delay: index * 0.2,
      onComplete: () => {
        gsap.fromTo(card, { x: 200, opacity: 0 }, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut'
        });
        return void 0; // Ensuring the return type is void
      }
    });
  });
};

onMounted(() => {
  calculateTimeLeft();
  timer = window.setInterval(calculateTimeLeft, 1000);

  gsap.from('.countdown-card', {
    scale: 0,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'elastic.out(1, 0.5)'
  });
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="countdown-wrapper">
    <div class="countdown-container">
      <div class="countdown-card">
        <div class="countdown-value">
          <span class="number" data-unit="days">{{ timeLeft.days.value }}</span>
        </div>
        <span class="label">{{ $t('d') }}</span>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-card">
        <div class="countdown-value">
          <span class="number" data-unit="hours">{{ timeLeft.hours.value }}</span>
        </div>
        <span class="label">{{ $t('h') }}</span>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-card">
        <div class="countdown-value">
          <span class="number" data-unit="minutes">{{ timeLeft.minutes.value }}</span>
        </div>
        <span class="label">{{ $t('m') }}</span>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-card">
        <div class="countdown-value">
          <span class="number" data-unit="seconds">{{ timeLeft.seconds.value }}</span>
        </div>
        <span class="label">{{ $t('s') }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countdown-wrapper {
  width: 100%;
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
}

.countdown-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(255, 107, 0, 0.2);
  backdrop-filter: blur(10px);
}

.countdown-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  padding: 1rem;
}

.countdown-value {
  background: linear-gradient(145deg, var(--primary), var(--secondary));
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.countdown-value::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(255, 255, 255, 0.1), transparent);
  pointer-events: none;
}

.number {
  font-size: 3rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  min-width: 2ch;
  display: inline-block;
  text-align: center;
}

.label {
  font-size: 1rem;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
}

.countdown-separator {
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary);
  margin: 0 0.5rem;
  animation: pulse 1s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .countdown-container {
    flex-wrap: wrap;
    gap: 1rem;
  }

  /* .countdown-card:last-child { */
  /*   margin-right: 1.9rem; */
  /* } */

  .countdown-card {
    min-width: 90px;
  }

  .number {
    font-size: 2rem;
  }

  .countdown-separator {
    font-size: 2rem;
    margin: 0 0.25rem;
  }

  .label {
    font-size: 0.875rem;
  }
}

@media (max-width: 425px) {
  .countdown-separator {
    display: none;
  }
}
</style>
