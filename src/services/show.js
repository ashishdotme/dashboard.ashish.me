import api from '../utils/api'

export const httpGet = () => {
  return api()
    .get('/shows')
    .then((res) => {
      return res.data || []
    })
    .catch((e) => {
      throw e
    })
}

export const httpDelete = (id) => {
  return api()
    .delete('/shows/' + id)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

export const httpPost = (a) => {
  return api()
    .post('/shows', a)
    .then((res) => {
      return res.data || {}
    })
    .catch((e) => {
      throw e
    })
}

export const httpGetOne = (id) => {
  return api()
    .get('/shows/' + id)
    .then((res) => {
      return res.data || {}
    })
    .catch((e) => {
      throw e
    })
}

export const httpPut = (id, a) => {
  return api()
    .put('/shows/' + id, a)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}
