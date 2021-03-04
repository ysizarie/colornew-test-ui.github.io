<template>
  <section v-if="currentNote" class="note-view">
    <header class="note-view__header">
      <h3>{{ currentNote.title }}</h3>
      <p>{{ noteDate }}</p>
    </header>
    <div class="note-view__description" v-html="compiledMarkdown"/>
  </section>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import userModel from '@/models/userModel'
import { useRoute } from 'vue-router'
import moment from 'moment'
import marked from 'marked'

export default {
  name: 'Note',
  setup () {
    const route = useRoute()
    const currentNote = ref(null)
    onMounted(async () => {
      try {
        if (route.params.id) {
          const { data } = (await userModel.getNoteById(route.params.id)).data
          currentNote.value = data
          console.log(currentNote.value)
        }
      } catch (e) {
        console.log(e)
      }
    })

    const noteDate = computed(() => {
      return moment(currentNote.value.creationDate).format('llll')
    })

    const compiledMarkdown = computed(() => {
      return marked(currentNote.value.description, { sanitize: true })
    })

    return {
      currentNote,
      noteDate,
      compiledMarkdown
    }
  }
}
</script>

<style lang="scss">
  .note-view {
    width: 70%;
    margin: 0 auto 50px auto;
    border: 1px solid #9f9d9d;
    border-radius: 5px;
    background: #fff;

    &__description {
      padding: 50px;

      img {
        max-width: 100%;
      }
    }

    &__header {
      border-bottom: 1px solid #9f9d9d;
      padding: 10px;
    }
  }
</style>
