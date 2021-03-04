import { createStore } from 'vuex'
import userModel from '@/models/userModel'

export default createStore({
  state: {
    user: null,
    notes: []
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    SET_NOTES (state, notes) {
      state.notes = notes
    }
  },
  actions: {
    async getNotes ({ commit }) {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const { data } = (await userModel.getNotes()).data
          if (data) {
            commit('SET_NOTES', data)
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getNotes (state) {
      return state.notes
    }
  }
})
