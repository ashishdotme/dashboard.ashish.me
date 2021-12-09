import api from '../utils/api'

export const httpGet = () => {
  return api()
    .get('/courses')
    .then((res) => {
      return res.data || []
    })
    .catch((e) => {
      throw e
    })
}

export const httpDelete = (id) => {
  return api()
    .delete('/courses/' + id)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

export const httpPost = (a) => {
  return api()
    .post('/courses', a)
    .then((res) => {
      return res.data || {}
    })
    .catch((e) => {
      throw e
    })
}

export const httpGetOne = (id) => {
  return api()
    .get('/courses/' + id)
    .then((res) => {
      return res.data || {}
    })
    .catch((e) => {
      throw e
    })
}

export const httpPut = (id, a) => {
  return api()
    .put('/courses/' + id, a)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}
