import api from '../utils/api'

export const httpGet = () => {
  return api()
    .get('/todos')
    .then((res) => {
      return res.data || []
    })
    .catch((e) => {
      throw e
    })
}

export const httpDelete = (id) => {
  return api()
    .delete('/todos/' + id)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

export const httpPost = (a) => {
  return api()
    .post('/todos', a)
    .then((res) => {
      return res.data || {}
    })
    .catch((e) => {
      throw e
    })
}

export const httpGetOne = (id) => {
  return api()
    .get('/todos/' + id)
    .then((res) => {
      return res.data || {}
    })
    .catch((e) => {
      throw e
    })
}

export const httpPut = (id, a) => {
  return api()
    .put('/todos/' + id, a)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

export const exportData = (a) => {
  return api()
    .post('/download/excel', a)
    .then((res) => {
      return res.data || {}
    })
    .catch((e) => {
      throw e
    })
}
