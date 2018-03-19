<!-- 学生证补办 学生 -->
<template>
  <div class="stuidcard">
    <div class="zjy-form">
      <div class="form-item">
        <span>学号:</span>
        <zjy-input disabled :value="student.studentCode"></zjy-input>
      </div>
      <div class="form-item">
        <span>学生姓名:</span>
        <zjy-input disabled :value="student.studentName"></zjy-input>
      </div>
      <div class="form-item">
        <span>年级:</span>
        <zjy-input disabled :value="student.className"></zjy-input>
      </div>
      <div class="form-item">
        <span>院系:</span>
        <zjy-input disabled :value="student.facultyName"></zjy-input>
      </div>
      <div class="form-item">
        <span>专业:</span>
        <zjy-input disabled :value="student.specialtyName"></zjy-input>
      </div>
      <div class="form-item">
        <span>班级:</span>
        <zjy-input disabled :value="student.className"></zjy-input>
      </div>
      <div class="form-item">
        <span>申请日期:</span>
        <zjy-input disabled :value="reissued.applyDate | dateFormat"></zjy-input>
      </div>
      <div class="form-item block">
        <span>申请原因:</span>
        <zjy-input type="textarea" :value="reissued.applyReason"></zjy-input>
      </div>
    </div>
    <div class="zjy-steps" v-if="reissued.applyReason">
      <span>申请流程配置</span>
      <zjy-steps :active="2" align-center>
        <zjy-step title="发起人" :description="student.studentName">
        </zjy-step>
        <zjy-step 
          v-for="(step,index) in steps" 
          :key="step.approvalStep"
          :title="step.postName"
          :custom="step"
          :description="values[index]"
        >
        <el-select 
          v-model="values[index]" 
          placeholder="请选择审批人" 
          slot="custom" 
          slot-scope="props" 
          v-if="props.data.approvalType === '2'"
        >
          <el-option
            :label="props.data.teacherName"
            :value="props.data.teacherName">
          </el-option>
        </el-select>
        </zjy-step>
      </zjy-steps>
    </div>

    <div class="zjy-btn-group">
      <zjy-button :type="reissued.applyReason ? 'plain' : 'primary'" :disabled="reissued.applyReason !== null">
        <span v-if="reissued.applyReason !== null">申请审核中</span>
        <span v-else>申请</span>
      </zjy-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import cardAPI from '@/api/stuidcard'
import approvalAPI from '@/api/approval'
import ZjyInput from '@/components/input'
import ZjyButton from '@/components/button'

import { ZjyStep, ZjySteps } from '@/components/steps'

export default {
  data() {
    return {
      reissued: {},
      student: {},
      steps: [],
      type2: [],
      options: {},
      values: null
    }
  },

  methods: {
    test() {}
  },

  computed: {
  },

  components: {
    ZjyInput,
    ZjyButton,
    ZjyStep,
    ZjySteps
  },

  created() {
    axios
      .all([cardAPI.getReissued(), approvalAPI.queryApprovalProcess(150)])
      .then(axios.spread((reissued, steps) => {
        this.reissued = reissued.data.swmsStuidcard
        this.student = reissued.data.ucenterStudent
        this.steps = steps.data.sort((x, y) => x.approvalStep - y.approvalStep)
        this.type2 = this.steps.filter(_ => _.approvalType === '2')
        this.values = new Array(this.steps.length)
      }))
  },

  filters: {
    dateFormat(val) {
      if (!val) return
      const date = new Date(val)
      const m = date.getMonth() + 1
      const d = date.getDate() + 1
      return (
        date.getFullYear() +
        '-' +
        (m < 10 ? '0' + m : m) +
        '-' +
        (d < 10 ? '0' + d : d)
      )
    }
  }
}
</script>
<style lang='scss' scoped>
.stuidcard {
  font-size: 12px;
  color: #333333;
  padding: 20px;
}
.zjy-form {
  .form-item {
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 10px;
    > span {
      width: 60px;
      display: inline-block;
      text-align: right;
    }
    &.block {
      display: block;
      span {
        margin-bottom: 10px;
      }
      .zjy-textarea {
        margin-left: 10px;
        height: 110px;
      }
    }
  }
  .zjy-input {
    width: 180px;
    font-size: 12px;
  }
}

.zjy-steps {
  margin-top: 20px;
  span {
    margin-left: 10px;
  }
}

.zjy-btn-group {
  text-align: center;
}
</style>