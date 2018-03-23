<!-- 新增投保设置 -->
<template>
  <div class="insurance-setting">
    <div class="zjy-form">
      <div class="form-item block">
        <span>保险名称:</span>
        <zjy-input type="text" class="insurance-name"></zjy-input>
      </div>
      <div class="form-item">
        <span>保险公司:</span>
        <zjy-input type="text" class="insurance-company"></zjy-input>
      </div>
      <div class="form-item pull-right">
        <span>险种类别:</span>
        <zjy-input type="text" class="insurance-category"></zjy-input>
      </div>

      <div class="form-item pull-right">
        <span>保险期限:</span>
        <zjy-input type="text" class="insurance-limit"></zjy-input>
      </div>
      <div class="form-item">
        <span>保险费用:</span>
        <zjy-input type="text" class="insurance-cost"></zjy-input>
      </div>
      <div class="form-item block">
        <span>详细条款:</span>
        <zjy-input type="textarea" class="detailed-terms"></zjy-input>
      </div>
      <div class="form-item block">
        <span>保险责任:</span>
        <zjy-input type="textarea" class="insurance-liability"></zjy-input>
      </div>
    </div>
  </div>
</template>

<script>
import ZjyInput from '@/components/input'
export default {
  data () {
    return {
    }
  },

  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  components: {
    ZjyInput
  }

}

</script>
<style lang='scss' scoped>
.insurance-setting {
  .form-item {
    .zjy-textarea {
      width: 656px;
      vertical-align: text-top;
      height: 98px;
    }
  }
.zjy-input {
  width: 250px;
  &.insurance-name {
    width: 656px;
  }
}
}

</style>