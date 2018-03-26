<!-- 学生档案实体 -->
<template>
  <div class="zjy-form">
    <p class="zjy-form__title">学生信息</p>
    <el-form :model="formData" :rules="rules" ref="formData" label-width="80px">
 
      <el-form-item label="学号:" prop="insuranceCompany" class="inline">
        <el-input v-model="formData.insuranceCompany"></el-input>
      </el-form-item>
      <el-form-item label="学生姓名:" prop="insuranceCategory" class="inline pull-right">
        <el-input v-model="formData.insuranceCategory"></el-input>
      </el-form-item>
      <el-form-item label="年级:" prop="insuranceLimit" class="inline">
        <el-input v-model="formData.insuranceLimit"></el-input>
      </el-form-item>
      <el-form-item label="院系:" prop="insuranceCost" class="inline pull-right">
        <el-input v-model="formData.insuranceCost"></el-input>
      </el-form-item>
      <el-form-item label="详细条款" prop="detailedTerms">
        <el-input type="textarea" v-model="formData.detailedTerms"></el-input>
      </el-form-item>
      <el-form-item label="保险责任" prop="insuranceLiability">
        <el-input type="textarea" v-model="formData.insuranceLiability"></el-input>
      </el-form-item>
      <el-form-item label="开放申请">
        <el-radio-group v-model="formData.isOpen">
          <el-radio :label="'1'">开放</el-radio>
          <el-radio :label="'0'">不开放</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="在线支付">
        <el-radio-group v-model="formData.isPay">
          <el-radio :label="'1'">开启</el-radio>
          <el-radio :label="'0'">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="zjy-footer">
        <zjy-button type="plain" @click="resetForm('formData')">取消</zjy-button>
        <zjy-button type="primary" @click="submitForm('formData')">提交</zjy-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import ZjyButton from '@/components/button'

export default {
  data() {
    return {
      rules: {}
    }
  },

  methods: {
    resetForm(formName) {},
    submitForm(formName) {}
  },

  props: {
    formData: Object
  },

  components: {
    ZjyButton
  }
}
</script>
<style lang='scss' scoped>
  .el-form {
    padding: 0 50px;
  }
</style>