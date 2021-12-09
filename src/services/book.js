import api from '../utils/api'

export const httpGet = () => {
  return api()
    .get('/books')
    .then((res) => {
      return res.data || []
    })
    .catch((e) => {
      throw e
    })
}

export const httpDelete = (id) => {
  return api()
    .delete('/books/' + id)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

export const httpPost = (a) => {
  return api()
    .post('/books', a)
    .then((res) => {
      return res.data || {}
    })
    .catch((e) => {
      throw e
    })
}

export const httpGetOne = (id) => {
  return api()
    .get('/books/' + id)
    .then((res) => {
      return res.data || {}
    })
    .catch((e) => {
      throw e
    })
}

export const httpPut = (id, a) => {
  return api()
    .put('/books/' + id, a)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}
