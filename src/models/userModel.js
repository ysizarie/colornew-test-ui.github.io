import axios from 'axios'
import endpoint from './endpoints'

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

class UserModel {
  resource = `${endpoint.api}`

  login (email, password) {
    return axios(`${this.resource}/login`, {
      method: 'post',
      data: {
        email,
        password
      }
    })
  }

  signup (email, password) {
    return axios(`${this.resource}/signup`, {
      method: 'post',
      data: {
        email,
        password
      }
    })
  }

  tokenLogin () {
    return axios(`${this.resource}/api/profile`, {
      method: 'get'
    })
  }

  getNotes () {
    return axios(`${this.resource}/api/todos`, {
      method: 'get'
    })
  }

  getNoteById (id) {
    return axios(`${this.resource}/api/todos/${id}`, {
      method: 'get'
    })
  }

  createNote (data) {
    return axios(`${this.resource}/api/todos`, {
      method: 'post',
      data
    })
  }

  editNote (id, title, description) {
    return axios(`${this.resource}/api/todos/${id}`, {
      method: 'patch',
      data: {
        title,
        description
      }
    })
  }

  deleteToDo (id) {
    return axios(`${this.resource}/api/todos/${id}`, {
      method: 'delete'
    })
  }
}

export default new UserModel()
