<template>
 <div class="note">
   <h2 class="note__title">
     {{ title }}
     <div class="note__creation-date">
       {{ noteCreation }}
     </div>
   </h2>

   <div class="note__description" v-html="compiledMarkdown" />

   <div class="note__actions">
     <Button
       label="Delete"
       class="p-button-rounded p-button-danger"
       @click="deleteNote"
     />
     <Button
       label="View"
       @click="openView"
       class="p-button-rounded p-button-warning"
     />
     <Button
       label="Edit"
       @click="handleEdit"
       class="p-button-rounded"
     />
   </div>
   <create-note
     v-model="showEdit"
     dialogType="edit"
     :note="currentEditNoteItem"
   />
 </div>
</template>

<script>
import Button from 'primevue/button'
import userModel from '@/models/userModel'
import CreateNote from '@/components/CreateNote/CreateNote'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import marked from 'marked'
import moment from 'moment'

export default {
  name: 'Note',
  components: {
    Button,
    CreateNote
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    creationDate: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const router = useRouter()

    console.log(props)

    const noteCreation = computed(() => {
      return moment(props.creationDate).format('llll')
    })

    const currentEditNoteItem = computed(() => ({
      id: props.id,
      title: props.title,
      description: props.description
    }))
    const deleteNote = async () => {
      console.log(props.id)
      await userModel.deleteToDo(props.id)
      emit('reload')
    }
    const showEdit = ref(false)
    const handleEdit = () => {
      showEdit.value = true
    }

    const compiledMarkdown = computed(() => {
      return marked(currentEditNoteItem.value.description, { sanitize: true })
    })

    const openView = () => {
      router.push({ name: 'note', params: { id: props.id } })
    }

    return {
      showEdit,
      currentEditNoteItem,
      compiledMarkdown,
      noteCreation,
      deleteNote,
      handleEdit,
      openView
    }
  }
}
</script>

<style lang="scss">
  .note {
    width: 300px;

    border-radius: 3px;
    background: #fff;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

    &__title {
      padding: 10px 5px;
      box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
      font-size: 25px;
      font-weight: 500;
    }

    &__description {
      padding: 10px;
      height: 300px;
      overflow: auto;

      img {
        max-width: 100%;
      }
    }

    &__creation-date {
      font-size: 15px;
      color: #9f9d9d;
    }

    &__actions {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }
  }
</style>
