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

    <div class="zjy-steps">
      <span>审批进度</span>
      <zjy-steps :active="step" align-center>
        <zjy-step title="发起人" :description="'(' + student.studentName + ')'">
        </zjy-step>
        <zjy-step v-for="(item,index) in steps" :key="item.approvalStep" :title="item.postName" :custom="item">
          <div slot="description">
            <div v-if="item.approvalType == 2 || item.approvalStatus">
              ({{ item.teacherName }})
            </div>
            <div v-else>
              <!-- 当前流程动态绑定 -->
              <p v-if="index === step - 1 && value">
                ({{value}})
              </p>
              <!-- 其它只绑定一次,也可以不绑定(还未选择教师) -->
              <!-- <span v-else v-once>({{ value }})</span> -->
            </div>
            <!--  -->
            <div v-if="index <= step - 1 && item.approvalStatus">
              <p class="status">
                ({{ item.approvalStatus | statusFormat }})
              </p>
            </div>
          </div>
          <!-- 只初始化当前流程的教师列表 (index === step - 1) -->
          <!-- 对于学生只初始化第一步 (index = 0) -->
          <!-- 若存在流程状态属性则不初始化 (approvalStatus)-->

        </zjy-step>
      </zjy-steps>
    </div>
  </div>
</template>

<script>
import cardAPI from "@/api/stuidcard"
import { ZjyStep, ZjySteps } from "@/components/steps"

export default {
  data() {
    return {
      reissued: {},
      student: {},
      steps: [],
      step: 1
    }
  },

  props: {
    uid: String
  },

  components: {
    ZjyStep,
    ZjySteps
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
    student: {
      deep: true,
      handler(val) {
        alert(1)
        cardAPI
          .queryApprovalProcess(this.student.studentId, this.uid)
          .then(response => {
            this.steps = response.data.swmsApprovals
          })
          .catch(error => {
            console.log(error)
          })
      }
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