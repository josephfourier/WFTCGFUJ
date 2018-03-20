import ajax from '@/utils/ajax'

export default {
  // 获取流程信息及当前步骤信息
  getApprovalAndCurrent (id) {
    return ajax({
      url: '/manage/swmsApproval/initSwmsApproval/' + id,
      method: 'get'
    })
  },
  // 获取补办信息
  getReissued () {
    return ajax({
      url: '/manage/student/swmsStuidcard',
      method: 'get'
    })
  },

  createApproval (reissued, steps) {
    return ajax({
      url: '/manage/student/swmsStuidcard',
      method: 'post',
      data: {
        reissued,
        steps
      },
      transformRequest: [function (data) {
        console.log({
          applyReason: data.reissued.applyReason,
          studentId: data.reissued.studentId,
          swmsApprovalList: data.steps
        })
        return {
          applyReason: data.reissued.applyReason,
          studentId: data.reissued.studentId,
          swmsApprovalList: data.steps
        }
      }]
    })
  }
}
