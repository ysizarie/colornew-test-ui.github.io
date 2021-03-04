import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/nova/theme.css' // theme
import 'primevue/resources/primevue.min.css' // core css
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(PrimeVue, { ripple: true })

app.directive('click-outside', {
  beforeMount (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

app.mount('#app')
