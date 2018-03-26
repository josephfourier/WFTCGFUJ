<!-- 投保理赔管理 学生  -->
<template>
  <div class="wrapper">
    <div class="zjy-tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="我的保险">
          <my-insurances class="zjy-tab__item"></my-insurances>
        </el-tab-pane>
        <el-tab-pane label="全部保险">
          <all-insurances class="zjy-tab__item"></all-insurances>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import MyInsurances from './MyInsurances'
import AllInsurances from './AllInsurances'
export default {
  data() {
    return {
      activeName2: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
     
    }
  },
  components: {
    AllInsurances,
    MyInsurances
  }
}
</script>
<style lang='scss' scoped>

</style>