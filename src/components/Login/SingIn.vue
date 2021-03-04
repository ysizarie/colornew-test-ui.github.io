<template>
  <section class="sign-in__wrapper">
    <form
      class="sign-in"
      novalidate
      @submit.prevent="onLogin"
    >
      <h3 class="sign-in__title">Member Sign In</h3>
      <div class="p-col-12 p-md-4 sign-in__login">
        <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
        </span>
          <InputText
            placeholder="Username"
            v-model="formData.email"
            type="email"
            autocomplete="username"
            :class="{'p-invalid' : formData.isEmailValid === false}"
          />
          <div
            v-if="formData.isEmailValid === false"
            class="sign-in__login__error"
          >
            <small class="p-error">Username is not valid.</small>
          </div>
        </div>
      </div>
      <div class="p-col-12 p-md-4 sign-in__password">
        <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
        </span>
          <Password
            placeholder="Password"
            v-model="formData.password"
            :feedback="false"
            toggleMask
            autocomplete="password"
            :class="{'p-invalid' : formData.isPasswordValid === false}"
          />
          <div
            v-if="formData.isPasswordValid === false"
            class="sign-in__password__error"
          >
            <small class="p-error">Password is not valid.</small>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        label="Sign In"
        :disabled="isLoading"
      />
      <span class="sign-in__create-account" @click="$emit('change-form', 'SignUp')">
        Create your Account
        <i class="pi pi-arrow-right"></i>
      </span>
    </form>
  </section>
</template>

<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Password from 'primevue/password'
import { emailValidate, passwordValidate } from '@/utils/validators'
import { reactive, ref } from 'vue'
import userModel from '@/models/userModel'
import { useRouter } from 'vue-router'

export default {
  name: 'SingIn.vue',
  components: {
    InputText,
    Button,
    Password
  },
  setup () {
    const router = useRouter()

    const formData = reactive({
      email: '',
      password: '',
      isEmailValid: null,
      isPasswordValid: null
    })

    const isLoading = ref(false)

    const resetValidation = () => {
      formData.isEmailValid = null
      formData.isPasswordValid = null
    }

    const onLogin = async () => {
      resetValidation()
      formData.isEmailValid = emailValidate(formData.email)
      formData.isPasswordValid = passwordValidate(formData.password)
      if (formData.isEmailValid && formData.isPasswordValid) {
        try {
          isLoading.value = true
          const { data } = await userModel.login(formData.email, formData.password)
          if (data?.token) {
            localStorage.setItem('token', data.token)
            await router.push('/notes')
          }
        } catch (e) {
          console.log(e)
        } finally {
          isLoading.value = false
        }
      }
    }

    return {
      formData,
      isLoading,
      onLogin
    }
  }
}
</script>

<style lang="scss">
.sign-in {
  flex-basis: 960px;
  border: 1px solid lightgray;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  position: relative;

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: 15px;
  }

  &__title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 30px;
  }

  &__login, &__password {
    margin-bottom: 30px;
    position: relative;

    &__error {
      position: absolute;
      bottom: -19px
    }
  }

  &__password {
    input {
      width: 100% !important;
    }
  }

  &__create-account {
    position: absolute;
    cursor: pointer;
    bottom: 5px;
    right: 20px;
    color: #9f9d9d;
    user-select: none;
  }
}
</style>
