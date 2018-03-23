import ajax from '@/utils/ajax'

export default {
  queryList (query) {
    return ajax.get('/manage/insurance-setting', {
      params: query,
      transformResponse: data => {
        const json = JSON.parse(data)
        if (json.code !== 1) return json

        const total = json.data.total
        const rows = json.data.rows
        return {
          total,
          rows
        }
      }
    })
  },

  createOne (setting) {
    return ajax.post('/manage/insurance-setting', setting)
  },

  updateOne (id, setting) {
    return ajax.put('/manage/insurance-setting/' + id, setting)
  },

  queryOne (id) {
    return ajax.get('/manage/insurance-setting/' + id)
  },

  deleteOne (id) {
    return ajax.delete('/manage/insurance-setting/' + id)
  },

  batchDelete (ids) {

  }
}
