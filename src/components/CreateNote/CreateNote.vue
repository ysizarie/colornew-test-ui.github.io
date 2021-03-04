<template>
  <Teleport to="#modal-portal">
    <Dialog
      :header="dialogHeader"
      v-model:visible="showDialog"
      :style="{width: '50vw'}"
      modal
      class="create-note"
    >
      <div class="p-col-12 p-md-4 create-note__title">
        <label
          for="note-title"
        >
          Title
        </label>
        <div class="p-inputgroup  create-note__title__wrapper">
          <InputText
            v-model="formData.title"
            id="note-title"
            type="text"
            placeholder="Enter your note title"
            :class="{'p-invalid' : formData.isTitleValid === false}"
          />
          <small
            v-if="formData.isTitleValid === false"
            id="username2-help"
            class="p-error create-note__title-error"
          >
              Minimum length is 3 characters max - 30.
          </small>
        </div>
      </div>

      <div class="create-note__description">
        <label for="note-description">Description</label>
        <Textarea
          id="note-description"
          placeholder="Enter your markdown text here"
          :value="formData.description"
          @input="updateDescription"
        />
      </div>

      <label class="create-note__preview-label">MD preview</label>
      <div class="create-note__preview" v-html="compiledMarkdown" />

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="showDialog = false"
        />
        <Button
          :label="buttonLabel"
          icon="pi pi-check"
          @click="handleSubmit"
        />
      </template>
    </Dialog>
  </Teleport>
</template>

<script>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { computed, reactive, ref, onMounted } from 'vue'
import { debounce } from 'lodash'
import marked from 'marked'
import userModel from '@/models/userModel'
import { useStore } from 'vuex'

export default {
  name: 'CreateNote',
  components: {
    Button,
    Dialog,
    InputText,
    Textarea
  },
  props: {
    modelValue: {
      type: Boolean
    },
    dialogType: {
      type: String,
      default: 'create'
    },
    note: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const dialogHeader = computed(() => {
      if (props.dialogType === 'create') {
        return 'Create note'
      }
      return 'Edit note'
    })

    const buttonLabel = computed(() => {
      if (props.dialogType === 'create') {
        return 'Create'
      }
      return 'Edit'
    })

    onMounted(() => {
      if (props.dialogType === 'edit') {
        formData.title = props.note?.title
        formData.description = props.note?.description
      }
    })

    const showDialog = computed({
      get: () => props.modelValue,
      set: val => {
        emit('update:modelValue', val)
      }
    })

    const formData = reactive({
      title: '',
      description: '',
      isTitleValid: null
    })

    const resetData = () => {
      formData.title = ''
      formData.description = ''
      formData.isTitleValid = null
    }

    const updateDescription = debounce((e) => {
      formData.description = e.target.value
    }, 350)

    const compiledMarkdown = computed(() => {
      return marked(formData.description, { sanitize: true })
    })

    const validateFields = () => {
      formData.isTitleValid = formData.title.length > 2 && formData.title.length < 31
    }

    const isLoading = ref(false)
    const createNote = async () => {
      await userModel.createNote({
        title: formData.title,
        description: formData.description,
        image: ''
      })
      resetData()
    }

    const updateNote = async () => {
      await userModel.editNote(props.note?.id, formData.title, formData.description)
    }

    const handleSubmit = async () => {
      validateFields()
      if (formData.isTitleValid) {
        try {
          isLoading.value = true
          if (props.dialogType === 'create') {
            await createNote()
          } else {
            await updateNote()
          }
          await store.dispatch('getNotes')
          showDialog.value = false
        } catch (e) {
          console.log(e)
        } finally {
          isLoading.value = false
        }
      }
    }

    return {
      showDialog,
      dialogHeader,
      formData,
      updateDescription,
      compiledMarkdown,
      buttonLabel,
      isLoading,
      handleSubmit
    }
  }
}
</script>

<style lang="scss">

.create-note {

  &__title {
    position: relative;

    &__wrapper {
      margin-top: 7px;
    }

    &-error {
      position: absolute;
      bottom: -19px;
    }
  }

  &__description {
    margin-top: 20px;

    textarea {
      resize: none;
      width: 100%;
      height: 200px;
      margin-top: 5px;
    }
  }

  &__preview {
    padding: 35px;
    border: 1px solid #a6a6a6;
    margin-bottom: 10px;
    border-radius: 3px;

    img {
      max-width: 100%;
    }

    &-label {
      margin-top: 15px;
      display: inline-block;
    }
  }

}

</style>
