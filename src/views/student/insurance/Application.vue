<!-- 保险设置详情面板 -->
<template>
  <panel>
    <div class="status">
      <img src="./ic_wait.png" alt="确认状态">
      <span>134134</span>
    </div>
    <panel-item class="item" label="保险名称：" labelWidth="70px">646464646</panel-item>
    <panel-item class="item" label="保险公司：" labelWidth="70px">34</panel-item>
    <panel-item class="item" label="险种类别：" labelWidth="70px">234</panel-item>
    <panel-item class="item" label="保险费用：" labelWidth="70px">234</panel-item>
    <panel-item class="item" label="保险期限：" labelWidth="70px">234</panel-item>
    <div class="details">
      <p class="title">详细说明</p>
      <div class="content">
        详细说明详细说明详细说明详细说明详细说明详细说明详细说明详细说明详细说明详细说明详细说明详细说明详细说明详细说明详细说明详细说明详细说明
      </div>
    </div>
    <!-- <panel-item class="item block" label="是否开通：" labelWidth="70px">
        <el-radio-group v-model="value">
          <el-radio :label="'1'">开通</el-radio>
          <el-radio :label="'0'">不开通</el-radio>
        </el-radio-group>
      </panel-item> -->
    <panel-item label="审批流程">
      <p v-if="steps.length === 0"> 还未配置流程</p>
      <div class="zjy-steps" v-else>
        <zjy-steps :active="step" align-center>
          <zjy-step title="发起人" :description="'(' + user.fullName + ')'">
          </zjy-step>
          <zjy-step v-for="(item, index) in steps" :key="item.approvalStep" :title="item.postName" :custom="item">
            <div slot="description">
              <div v-if="item.approvalType == 2 || item.approvalStatus">
                ({{ item.teacherName }})
              </div>
              <div v-else>
                <p v-if="index === step - 1 && approver">
                  ({{ nextApproverName }})
                </p>

              </div>
              <!-- 审批状态 -->
              <div v-if="index <= step - 1 && item.approvalStatus">
                <p :class="[
                { statusYes: item.approvalStatus == 1 },
                { statusNo: item.approvalStatus == 2 }, 
                { statusWait: item.approvalStatus == 0 }, 
                  'status'
                ]">
                  ({{ item.approvalStatus | statusFormat }})
                </p>
              </div>
            </div>

            <el-select class="zjy-select" v-model="approver" placeholder="请选择审批人" slot="custom" slot-scope="props" @change="handleChange" v-if="props.data.approvalType == 1 && index === 0 && !props.data.approvalStatus">
              <el-option v-for="item in approverList" :key="item.teacherId" :label="item.teacherName" :value="item.teacherId">
              </el-option>
            </el-select>
          </zjy-step>
        </zjy-steps>
      </div>
    </panel-item>
    <div class="zjy-footer">
      <zjy-button type="plain">取消</zjy-button>
      <zjy-button type="primary" @click="create">确认</zjy-button>
    </div>
  </panel>
</template>

<script>
import Panel from '@/components/panel/panel'
import PanelItem from '@/components/panel-item/panel-item'
import ZjyButton from '@/components/button'
import { ZjyStep, ZjySteps } from '@/components/steps'

import allInsuranceAPI from '@/api/student/insurance/all'

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      step: 1, // 申请操作与查看操作分开，因此申请操作中的step总是1
      steps: [], // 审批流程步骤
      approver: '',
      approverList: [], // 下一步需要初始化的审批教师列表
      hasNextApprover: false, // 是否需要初始化第一步的教师列表
      nextApproverName: '',
      nextApproverId: ''
    }
  },

  props: {
    data: Object,  // 投保设置信息
    value: Object  //
  },

  computed: {
    ...mapGetters(['user'])
  },

  components: {
    Panel,
    PanelItem,
    ZjyButton,
    ZjySteps,
    ZjyStep
  },

  methods: {
    // 学生选择下一审批教师
    handleChange(val) {
      this.nextApproverId = val
      if (this.hasNextApprover)
        this.nextApproverName = this.approverList.find(
          x => x.teacherId === val
        ).teacherName
    },

    // 学生申请保险提交
    create() {
     
      if (!this.approver && this.approverList) {
        this.$alert('请填写审批人')
        return
      }

      this.fullscreenLoading = true

      const _ = this.steps.find(x => x.approvalStep == this.step)
      if (_ && _.approvalType == 1) {
        _.teacherId = this.nextApproverId
        _.teacherName = this.nextApproverName
      }

      allInsuranceAPI.create(this.data.inssettingUid, this.steps).then(response => {
        console.log(response)
      }).catch(error => {

      })
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (this.$empty(val)) return

        this.approverList = val[+Object.keys(val).find(x => Number(x) == x)] || {}
        this.steps = val.swmsApprovals.sort(
          (x, y) => x.approvalStep - y.approvalStep
        )
        this.hasNextApprover = !this.$empty(this.approverList)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.item {
  width: 180px;
  margin-right: 50px;
  margin-bottom: 15px;
  &.block {
    width: 100%;
  }
}
.status {
  > span,
  > img {
    vertical-align: middle;
  }
  margin-bottom: 10px;
}
.details {
  padding: 20px;
  background-color: #f5f5f5;
  .title {
    color: #333333;
    font-weight: bold;
  }
  margin-bottom: 15px;
}
</style>