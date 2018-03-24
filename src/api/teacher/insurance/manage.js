import ajax from '@/utils/ajax'
import { selfMerge } from '@/utils'

export default {
  queryForList (query) {
    return ajax.get('/manage/insurance/teacher', {
      params: query,

      transformResponse: data => {
        const json = JSON.parse(data)
        if (json.code !== 1) return json

        // const total = json.data.total
        const total = 3
        let t = [
          {
            'applyDate': 1521734400000,
            'applyYear': 2018,
            'creator': '13900000001',
            'ctime': 1521771986256,
            'dataStatus': '0',
            'dataStatusName': '待审批',
            'inssettingUid': '1b584e88376a439fab4c1bf354a4ad03',
            'insuranceUid': '17004e2fa7a94c9899af09c392c4b7d7',
            'schoolCode': '4209820001',
            'status': '1',
            'studentId': 2546,
            'swmsInsuranceSetting': {
              'detailedTerms': '本阅读指引有助于您理解条款，对本附加险合同内容的解释以条款为准。 ',
              'insuranceCategory': '意外保险',
              'insuranceCompany': '中国太平',
              'insuranceCost': 10800,
              'insuranceLiability': '在合同责任有效期内，保险公司承担下列保险责任： ',
              'insuranceLimit': 10,
              'insuranceName': '平安附加住院费用医疗保险',
              'isOpen': '1',
              'isPay': '1'
            },
            'ucenterStudent': {
              'address': '陕西省西安市',
              'birthday': 685468800000,
              'classId': 29,
              'className': '计算机02班',
              'creator': 'admin',
              'ctime': 1516083309078,
              'description': '测试',
              'domicile': '陕西省西安市',
              'domicileType': '2',
              'enterTime': 1506009600000,
              'enterYear': 2018,
              'examineeNumber': '201810001',
              'examnum': '201810001',
              'facultyCode': 'YX-2017001',
              'facultyName': '信息工程学院',
              'familyPhone': '15800000001',
              'fromplace': '陕西省西安市',
              'gradHeadteacher': '测试老师',
              'gradSchool': '测试学校',
              'gradTime': 1600704000000,
              'idcard': '622629910000000001',
              'isLiveschool': false,
              'isPoor': true,
              'mail': 'test1@thinkjoy.cn',
              'nation': '01',
              'nationality': '中国',
              'origin': '陕西省西安市',
              'phone': '13900000001',
              'politics': '4',
              'postalCode': '700001',
              'schoolCode': '4209820001',
              'sex': '0',
              'specialtyCode': 'ZY-2017001001',
              'specialtyName': '计算机科学与技术',
              'status': '1',
              'studentCode': '201810001',
              'studentId': 2546,
              'studentName': '学生20180001',
              'studentNo': '201810001',
              'studentType': '1',
              'userId': 2853,
              'year': 2018
            }
          },
          {
            'applyDate': 1521561600000,
            'applyYear': 2018,
            'creator': '13900000001',
            'ctime': 1521613278804,
            'dataStatus': '3',
            'dataStatusName': '审批中',
            'inssettingUid': '0ad19a58249249acaf4b48e69b0a83b0',
            'insuranceUid': '45d5dc9007ca42b3865d4972f4d1e58e',
            'schoolCode': '4209820001',
            'status': '1',
            'studentId': 2546,
            'swmsInsuranceSetting': {
              'detailedTerms': '本阅读指引有助于您理解条款，对本附加险合同内容的解释以条款为准。 ',
              'insuranceCategory': '意外保险',
              'insuranceCompany': '平安保险',
              'insuranceCost': 1800,
              'insuranceLiability': '在合同责任有效期内，保险公司承担下列保险责任： ',
              'insuranceLimit': 3,
              'insuranceName': '平安附加残疾意外伤害保险',
              'isOpen': '1',
              'isPay': '1'
            },
            'ucenterStudent': {
              'address': '陕西省西安市',
              'birthday': 685468800000,
              'classId': 29,
              'className': '计算机02班',
              'creator': 'admin',
              'ctime': 1516083309078,
              'description': '测试',
              'domicile': '陕西省西安市',
              'domicileType': '2',
              'enterTime': 1506009600000,
              'enterYear': 2018,
              'examineeNumber': '201810001',
              'examnum': '201810001',
              'facultyCode': 'YX-2017001',
              'facultyName': '信息工程学院',
              'familyPhone': '15800000001',
              'fromplace': '陕西省西安市',
              'gradHeadteacher': '测试老师',
              'gradSchool': '测试学校',
              'gradTime': 1600704000000,
              'idcard': '622629910000000001',
              'isLiveschool': false,
              'isPoor': true,
              'mail': 'test1@thinkjoy.cn',
              'nation': '01',
              'nationality': '中国',
              'origin': '陕西省西安市',
              'phone': '13900000001',
              'politics': '4',
              'postalCode': '700001',
              'schoolCode': '4209820001',
              'sex': '0',
              'specialtyCode': 'ZY-2017001001',
              'specialtyName': '计算机科学与技术',
              'status': '1',
              'studentCode': '201810001',
              'studentId': 2546,
              'studentName': '学生20180001',
              'studentNo': '201810001',
              'studentType': '1',
              'userId': 2853,
              'year': 2018
            }
          },
          {
            'applyDate': 1521648000000,
            'applyYear': 2018,
            'creator': '15309253640',
            'ctime': 1521690378539,
            'dataStatus': '5',
            'dataStatusName': '待付款',
            'description': '',
            'inssettingUid': 'fa68a1693e9e4383bffa3305e0f42958',
            'insuranceUid': '9370b0472d8311e8916c0242ac110002',
            'schoolCode': '4209820001',
            'status': '1',
            'studentId': 2532,
            'swmsInsuranceSetting': {
              'detailedTerms': '本阅读指引有助于您理解条款，对本附加险合同内容的解释以条款为准。 ',
              'insuranceCategory': '意外保险',
              'insuranceCompany': '中国太平',
              'insuranceCost': 10800,
              'insuranceLiability': '在合同责任有效期内，保险公司承担下列保险责任： ',
              'insuranceLimit': 10,
              'insuranceName': '个人住院费用保险',
              'isOpen': '1',
              'isPay': '1'
            },
            'ucenterStudent': {
              'address': '陕西省西安市',
              'birthday': 685900800000,
              'classId': 30,
              'className': '机电01班',
              'creator': 'admin',
              'ctime': 1514356218196,
              'description': '测试',
              'domicile': '陕西省西安市',
              'domicileType': '3',
              'enterTime': 1506009600000,
              'enterYear': 2017,
              'examnum': '201710006',
              'facultyCode': 'YX-20170012',
              'facultyName': '机电学院',
              'familyPhone': '15800000006',
              'fromplace': '陕西省西安市',
              'gradHeadteacher': '测试老师',
              'gradSchool': '测试学校',
              'gradTime': 1506009600000,
              'idcard': '622629900000000006',
              'isLiveschool': true,
              'isPoor': false,
              'mail': 'test6@thinkjoy.cn',
              'nation': '06',
              'nationality': '中国',
              'origin': '陕西省西安市',
              'phone': '13800000006',
              'politics': '1',
              'postalCode': '700001',
              'schoolCode': '4209820001',
              'sex': '1',
              'specialtyCode': 'ZY-2017002001',
              'specialtyName': '电气自动化',
              'status': '1',
              'studentCode': '201710006',
              'studentId': 2532,
              'studentName': '学生6',
              'studentNo': '201710006',
              'studentType': '2',
              'userId': 2835,
              'year': 2017
            }
          }
        ]

        let rows = []
        for (let i = 0; i < t.length; ++i) {
          let row = {}
          selfMerge(t[i], row)
          rows.push(row)
        }
        return {
          total,
          rows
        }
      }
    })
  }
}
