<!-- 教师审批流程查看 -->
<template>
  <div class="stuidcard">
    <div class="zjy-form">
      <div class="form-item">
        <span>学号:</span>
        <span>{{ student.studentNo }}</span>
      </div>
      <div class="form-item">
        <span>学生姓名:</span>
        <span>{{ student.studentName }}</span>
      </div>
      <div class="form-item">
        <span>年级:</span>
        <span>{{ student.facultyName }}</span>
      </div>
      <div class="form-item">
        <span>院系:</span>
        <span>{{ student.facultyName }}</span>
      </div>
      <div class="form-item">
        <span>专业:</span>
        <span>{{ student.specialtyName }}</span>
      </div>
      <div class="form-item">
        <span>班级:</span>
        <span>{{ student.className }}</span>
      </div>
      <div class="form-item">
        <span>申请日期:</span>
        <span>{{ reissued.applyDate | dateFormat }}</span>
      </div>
    </div>
    <div class="reason">
      <p class="title">申请原因</p>
      <p>{{ reissued.applyReason }}</p>
    </div>
    <div class="steps">
      审批进度
    </div>
  </div>
</template>

<script>
import cardAPI from "@/api/stuidcard"

export default {
  data() {
    return {
      reissued: {},
      student: {}
    }
  },

  props: {
    uid: String
  },

  watch: {
    uid: {
      immediate: true,
      handler(val) {
        cardAPI
          .queryOne(val)
          .then(response => {
            this.student = response.data.ucenterStudent
            this.reissued = {
              applyDate: response.data.applyDate,
              applyReason: response.data.applyReason,
              applyYear: response.data.applyYear,
              studentId: response.data.studentId,
              dataStatus: response.data.dataStatus
            }
            // 查询流程进度
          })
          .catch(error => {})
      }
    },
    student(val, oldVal) {
      cardAPI
        .queryApprovalProcess(this.student.studentId, this.uid)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang='scss' scoped>
.form-item {
  font-size: 14px;
  margin-bottom: 20px;
  margin-right: 20px;
  > span:nth-child(1) {
    color: #666;
  }
  > span:nth-child(2) {
    color: #323232;
  }
}
.reason {
  .title {
    font-weight: bold;
  }
}
</style>