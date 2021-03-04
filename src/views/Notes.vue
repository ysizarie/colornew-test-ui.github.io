<template>
  <section class="notes">
    <template v-if="notes.length">
      <Note
        v-for="note in notes"
        :key="note._id"
        :id="note._id"
        :title="note.title"
        :creation-date="note.creationDate"
        :description="note.description"
        @reload="loadNotes"
      />
    </template>
    <template v-else>
      <div class="notes__stub">
        There are no notes, please create one!
      </div>
    </template>

  </section>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Note from '@/components/Note'

export default {
  name: 'Notes',
  components: {
    Note
  },
  setup () {
    const store = useStore()

    const loadNotes = async () => {
      await store.dispatch('getNotes')
    }

    onMounted(async () => {
      await loadNotes()
    })

    const notes = computed(() => store.state.notes)
    return {
      notes,
      loadNotes
    }
  }
}
</script>

<style lang="scss">
.notes {
  width: 95%;
  margin: 0 auto 50px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;

  &__stub {
    padding: 10px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
}
</style>
