<template>
  <header class="header">
    <div class="header__wrapper">
      <h1 class="header__logo">
        Notes
      </h1>
      <div class="header__info">
        <Button
          label="Create"
          class="p-button-rounded p-button-warning"
          icon="pi pi-plus"
          iconPos="right"
          @click="showDialog = true"
        />
        <div class="header__info__user-wrapper">
          <div class="header__info__user" @click.stop="showDropdown">
            <img class="header__info__user-img" src="../../assets/images/profile.svg" alt="user">
            <span class="header__info__username">{{ username }}</span>
            <i class="pi pi-angle-down"></i>
          </div>
          <div
            v-if="showLogout"
            class="header__info__user__logout"
            v-click-outside="hideLogout"
            @click="logout"
          >
            logout
          </div>
        </div>

      </div>
    </div>
    <create-note v-model="showDialog" />
  </header>
</template>

<script>
import Button from 'primevue/button'
import CreateNote from '@/components/CreateNote/CreateNote'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'index',
  components: {
    Button,
    CreateNote
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const showDialog = ref(false)
    const username = computed(() => store.state.user?.email)

    const showLogout = ref(false)
    const showDropdown = () => {
      showLogout.value = !showLogout.value
    }

    const hideLogout = () => {
      showLogout.value = false
    }

    const logout = () => {
      localStorage.removeItem('token')
      router.push('/')
    }

    return {
      showDialog,
      username,
      showLogout,
      showDropdown,
      logout,
      hideLogout
    }
  }
}
</script>

<style lang="scss">
.header {
  font-family: "proxima-nova", sans-serif !important;
  font-weight: 100 !important;
  display: flex;
  justify-content: center;
  height: 90px;
  padding: 0 40px;
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background: #fff;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-basis: 1300px;
  }

  &__logo {
    text-transform: uppercase;
    line-height: 50px;
    font-size: 30px;
    color: #ffba01;;
  }

  &__info {
    display: flex;
    align-items: center;
    &__user-img {
      height: 40px;
      width: 40px;
      align-self: center;
      cursor: pointer;
      border: 2px solid #ffba01;
      border-radius: 50%;
    }

    &__username {
      margin-left: 10px;
    }

    &__user {
      display: flex;
      align-items: center;
      cursor: pointer;

      &-wrapper {
        position: relative;
        margin-left: 15px;
      }

      &__logout {
        position: absolute;
        bottom: -30px;
        background: rgba(0, 0, 0, .2);
        right: 0;
        padding: 5px 10px;
        border-radius: 30px;
        border: 1px solid #ffba01;
        width: 100%;
        cursor: pointer;
        user-select: none;
        text-align: center;
      }
    }
  }
}
</style>
