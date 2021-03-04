<template>
  <section class="login">
    <transition name="fade">
      <component :is="formType" @change-form="value => formType = value" />
    </transition>
  </section>

</template>

<script>
// @ is an alias to /src
import SignUp from '@/components/Login/SignUp'
import SignIn from '@/components/Login/SingIn'
import { ref } from 'vue'

export default {
  name: 'Home',
  components: {
    SignUp,
    SignIn
  },
  setup () {
    const formType = ref('SignIn')

    return { formType }
  }
}
</script>

<style>
.login {
  background: #9053c7;
  background: -webkit-linear-gradient(
    -135deg
    ,#c850c0,#4158d0);
  background: -o-linear-gradient(-135deg,#c850c0,#4158d0);
  background: -moz-linear-gradient(-135deg,#c850c0,#4158d0);
  background: linear-gradient(
    -135deg
    ,#c850c0,#4158d0);
}

</style>
