<template>
  <component :is="layout" />
</template>

<script>
import AppLayoutDefault from '@/Layouts/AppLayoutDefault'
import Auth from '@/Layouts/Auth'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Layouts',
  components: {
    AppLayoutDefault,
    Auth
  },
  setup () {
    const route = useRoute()

    const layout = computed(() => {
      if (route.meta?.layout) {
        return route.meta.layout
      }
      return 'AppLayoutDefault'
    })

    return { layout }
  }

}
</script>
