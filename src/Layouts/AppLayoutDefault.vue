<template>
  <Header />
  <main class="main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script>
import Header from '@/components/Header/Header'

export default {
  name: 'AppLayoutDefault',
  components: {
    Header
  }
}
</script>

<style lang="scss">
.main {
  padding-top: 110px;
  max-width: 1300px;
  margin: 0 auto;
}
</style>
