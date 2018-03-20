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
      <div class="form-item" v-if="reissued.applyDate">
        <span>申请日期:</span>
        <zjy-input disabled :value="reissued.applyDate | dateFormat"></zjy-input>
      </div>
      <div class="form-item block">
        <span>申请原因:</span>
        <zjy-input type="textarea" v-model="reissued.applyReason"></zjy-input>
      </div>
    </div>
    <div class="zjy-steps">
      <span>申请流程配置</span>
      <zjy-steps :active="1" align-center>
        <zjy-step title="发起人" :description="'(' + student.studentName + ')'">
        </zjy-step>
        <zjy-step v-for="(step,index) in steps" :key="step.approvalStep" :title="step.postName" :custom="step" :description="step.approvalType === '2' ? step.teacherName : ''">
          <el-select class="zjy-select" v-model="value" placeholder="请选择审批人" slot="custom" slot-scope="props" v-if="props.data.approvalType === '1' && index === 0">
            <el-option v-for="item in currentStep" :key="item.teacherId" :label="item.teacherName" :value="item.teacherName">
            </el-option>
          </el-select>
        </zjy-step>
      </zjy-steps>
    </div>

    <div class="zjy-btn-group">
      <zjy-button :type="reissued.stuidcardUid ? 'plain' : 'primary'" :disabled="!!reissued.stuidcardUid">
        <span v-if="reissued.stuidcardUid">申请审核中</span>
        <span v-else @click="submit">申请</span>
      </zjy-button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import cardAPI from "@/api/stuidcard"
import ZjyInput from "@/components/input"
import ZjyButton from "@/components/button"

import { ZjyStep, ZjySteps } from "@/components/steps"

export default {
  data() {
    return {
      reissued: {},
      student: {},
      step: 1, // 进行中的流程步骤
      currentStep: {},
      steps: [],
      options: {},
      value: ""
    }
  },

  methods: {
    submit() {
      if (this.$empty(this.reissued)) {
        this.$alert("请填写申请原因")
        return
      }
      if (!this.value) {
        this.$alert("请填写审批人")
        return
      }

      cardAPI
        .createApproval(this.reissued, this.steps)
        .then(response => {})
        .catch(error => {})
    }
  },

  computed: {},

  components: {
    ZjyInput,
    ZjyButton,
    ZjyStep,
    ZjySteps
  },

  created() {
    axios.all([cardAPI.getReissued(), cardAPI.getApprovalAndCurrent(150)]).then(
      axios.spread((reissued, steps) => {
        this.student = reissued.data.ucenterStudent

        this.reissued = reissued.data.swmsStuidcard || {
          studentId: this.student.studentId || "",
          applyReason: ""
        }

        this.steps = steps.data.swmsApprovals.sort(
          (x, y) => x.approvalStep - y.approvalStep
        )
        this.currentStep =
          steps.data[
            Object.keys(steps.data).filter(item => Number(item) == item)[0]
          ]

        // 如果还未申请过则步骤为1
        if (this.$empty(this.reissued)) {
          this.step = 1
        }
      })
    )
  },

  filters: {
    dateFormat(val) {
      if (!val) return
      const date = new Date(val)
      const m = date.getMonth() + 1
      const d = date.getDate() + 1
      return (
        date.getFullYear() +
        "-" +
        (m < 10 ? "0" + m : m) +
        "-" +
        (d < 10 ? "0" + d : d)
      )
    }
  }
}
</script>
<style lang='scss'>
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
  padding: 50px 0;
  text-align: center;
}
.el-select.zjy-select {
  .el-input__inner,
  .el-input__inner:focus {
    border-color: #ed7734 !important;
    color: #ed7734;
    // width: 140px;
  }
}

.el-select .el-input .el-select__caret {
  color: #ed7734;
}

.el-select-dropdown.el-popper {
  .el-select-dropdown__item {
    font-size: 12px;
    height: 24px;
    line-height: 24px;

    &.selected {
      color: #37c6d4;
    }
  }

  .el-select-dropdown__item span {
    line-height: 24px !important;
  }
}
</style>