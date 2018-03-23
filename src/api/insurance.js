import ajax from '@/utils/ajax'

export default {
  queryList (query) {
    return ajax.get('/manage/insurance/teacher', {
      params: query,
      transformResponse: data => {
        const json = JSON.parse(data)
        if (json.code !== 1) return json

        const total = json.data.total
        const rows = json.data.rows.map(item => {
          return  {
            insuranceName: item.swmsInsuranceSetting.insuranceName,
            insuranceCompany: item.swmsInsuranceSetting.insuranceCompany,
            insuranceCategory: item.swmsInsuranceSetting.insuranceCategory,
            insuranceCost: item.swmsInsuranceSetting.insuranceCost,
            insuranceLimit: item.swmsInsuranceSetting.insuranceLimit
          }
        })

        return {
          total,
          rows
        }
      }
    })
  }
}
