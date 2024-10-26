import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import './style.css'
import App from './App.vue'


const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      title: 'Halloween',
      h1: 'Halloween Countdown',
      p: 'The spookiest time of the year is approaching',
      d: 'days',
      h: 'hours',
      m: 'minutes',
      s: 'seconds'
    },
    es: {
      title: 'Halloween',
      h1: 'Cuenta regresiva para Halloween',
      p: 'La época más espeluznante del año se acerca',
      d: 'días',
      h: 'horas',
      m: 'minutos',
      s: 'segundos'
    },
    ja: {
      title: 'ハロウィン',
      h1: 'ハロウィンのカウントダウン',
      p: '一年で最も恐ろしい時期が近づいています',
      d: '日',
      h: '時間',
      m: '分',
      s: '秒'
    },
    fr: {
      title: 'Halloween',
      h1: 'Compte à rebours d\'Halloween',
      p: 'La période la plus effrayante de l\'année approche',
      d: 'jours',
      h: 'heures',
      m: 'minutes',
      s: 'secondes'
    },
    de: {
      title: 'Halloween',
      h1: 'Halloween-Countdown',
      p: 'Die gruseligste Zeit des Jahres steht vor der Tür',
      d: 'Tage',
      h: 'Stunden',
      m: 'Minuten',
      s: 'Sekunden'
    },
    zh: {
      title: '万圣节',
      h1: '万圣节倒计时',
      p: '一年中最恐怖的时刻即将到来',
      d: '天',
      h: '小时',
      m: '分钟',
      s: '秒'
    }
  }
});


createApp(App).use(i18n).mount('#app')
