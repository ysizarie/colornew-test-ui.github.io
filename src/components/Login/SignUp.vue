<template>
  <section class="sign-up__wrapper">
    <form
      class="sign-up"
      novalidate
      @submit.prevent="onRegister"
    >
      <h3 class="sign-up__title">Member Sign Up</h3>
      <div class="p-col-12 p-md-4 sign-up__login mb-2">
        <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
        </span>
          <InputText
            v-model="formData.email"
            placeholder="Email"
            autocomplete="new-username"
            :class="{'p-invalid' : formData.isEmailValid === false}"
          />
          <div
            v-if="formData.isEmailValid === false"
            class="sign-in__login__error"
          >
            <small class="p-error">Email is not valid.</small>
          </div>
        </div>
      </div>
      <div class="p-col-12 p-md-4 sign-up__password">
        <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
        </span>
          <Password
            v-model="formData.password"
            placeholder="Password"
            toggleMask
            autocomplete="new-password"
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
      <div class="p-col-12 p-md-4 sign-up__confirm-password">
        <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
        </span>
          <Password
            v-model="formData.passwordConfirm"
            placeholder="Confirm Password"
            :feedback="false"
            toggleMask
            autocomplete="new-password"
            :class="{'p-invalid' : formData.isPasswordConfirmValid === false}"
          />
          <div
            v-if="formData.isPasswordConfirmValid === false"
            class="sign-in__password__error"
          >
            <small class="p-error">Passwords don't match.</small>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        label="Sign In"
        :disabled="isLoading"
      />
      <span class="sign-up__create-account" @click="$emit('change-form', 'SignIn')">
        Already have an account?
        <i class="pi pi-arrow-right"></i>
      </span>
    </form>
  </section>
</template>

<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Password from 'primevue/password'
import { reactive, ref } from 'vue'
import { emailValidate, passwordValidate } from '@/utils/validators'
import userModel from '@/models/userModel'

export default {
  name: 'SignUp',
  components: {
    InputText,
    Button,
    Password
  },
  setup (_, { emit }) {
    const formData = reactive({
      email: '',
      password: '',
      passwordConfirm: '',
      isEmailValid: null,
      isPasswordValid: null,
      isPasswordConfirmValid: null
    })

    const resetValidation = () => {
      formData.isEmailValid = null
      formData.isPasswordValid = null
      formData.isPasswordConfirmValid = null
    }

    const isLoading = ref(false)
    const onRegister = async () => {
      resetValidation()
      formData.isEmailValid = emailValidate(formData.email)
      formData.isPasswordValid = passwordValidate(formData.password)
      formData.isPasswordConfirmValid = formData.password === formData.passwordConfirm
      if (formData.isEmailValid && formData.isPasswordValid && formData.isPasswordConfirmValid) {
        try {
          isLoading.value = true
          await userModel.signup(formData.email, formData.password)
          emit('change-form', 'SignIn')
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
      onRegister
    }
  }
}
</script>

<style lang="scss">
.sign-up {
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

  &__login, &__password, &__confirm-password {
    margin-bottom: 30px;
    position: relative;

    &__error {
      position: absolute;
      bottom: -19px
    }
  }

  &__password, &__confirm-password {
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
