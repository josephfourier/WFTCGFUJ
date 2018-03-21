import ajax from '@/utils/ajax'

export default {
  // 查询初始流程信息（当补办信息为空时发送)
  queryInitial  (id) {
    return ajax({
      url: '/manage/swmsApproval/initSwmsApproval/' + id,
      method: 'get'
    })
  },
  // 获取补办信息
  queryReissued () {
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
        applyReason: reissued.applyReason,
        applyDate: new Date().getTime(),
        applyYear: new Date().getFullYear(),
        studentId: reissued.studentId,
        swmsApprovalList: steps
      }
    })
  },

  // 查询流程进度(当补办信息不为空时发送)
  queryApprovalProcess (sid, did) {
    return ajax({
      url: '/manage/swmsApproval/' + sid + '/' + did,
      method: 'get'
    })
  },

  // 查询审批进行到哪一步
  queryApprovalStep (list) {
    return list.filter(item => item.approvalStatus).map((i) => {
      return {
        approvalStatus: i.approvalStatus,
        approvalStep: i.approvalStep
      }
    })
  },

  // ------------------------- 教师端 -------------------------
  // 查询学生证列表
  queryCardList (query) {
    return ajax.get('/manage/teacher/swmsStuidcards', {
      params: query,
      transformResponse: data => {
        const json = JSON.parse(data)
        if (json.code !== 1) return json

        const total = json.data.total
        const rows = json.data.rows.map(item => {
          return {
            stuidcardUid: item.stuidcardUid,
            studentNo: item.ucenterStudent.studentNo,
            studentName: item.ucenterStudent.studentName,
            facultyName: item.ucenterStudent.facultyName,
            enterYear: item.ucenterStudent.enterYear,
            appNum: item.appNum,
            dataStatus: item.dataStatus
          }
        })

        return {
          total,
          rows
        }
      }
    })
  },

  queryOne (id) {
    return ajax.get('/manage/teacher/swmsStuidcard/' + id)
  },

  // 提交审批通过
  approved (reissued, steps) {
    console.log(reissued)
    console.log(steps)
    return ajax({
      url: '/manage/teacher/swmsStuidcard',
      method: 'put',
      data: {
        stuidcardUid: reissued.stuidcardUid,
        studentId: reissued.studentId,
        applyDate: reissued.applyDate,
        applyYear: reissued.applyYear,
        applyReason: reissued.applyReason,
        dataStatus: reissued.dataStatus,
        swmsApprovalList: steps
      }
    })
  }
}
