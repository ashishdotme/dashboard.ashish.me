import api from '../utils/api'

export const httpGet = () => {
  return api()
    .get('/calendars')
    .then((res) => {
      return res.data || []
    })
    .catch((e) => {
      throw e
    })
}

export const httpDelete = (id) => {
  return api()
    .delete('/calendars/' + id)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

export const httpPost = (a) => {
  return api()
    .post('/calendars', a)
    .then((res) => {
      return res.data || {}
    })
    .catch((e) => {
      throw e
    })
}

export const httpGetOne = (id) => {
  return api()
    .get('/calendars/' + id)
    .then((res) => {
      return res.data || {}
    })
    .catch((e) => {
      throw e
    })
}

export const httpPut = (id, a) => {
  return api()
    .put('/calendars/' + id, a)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}
