import ajax from '@/utils/ajax'

export default {
  // 获取补办信息
  getReissued () {
    return ajax({
      url: '/manage/student/swmsStuidcard',
      method: 'get'
    })
  }
}
