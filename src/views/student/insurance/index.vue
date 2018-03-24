<!-- 投保理赔管理 学生  -->
<template>
  <div class="wrapper">
    <div class="zjy-tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="我的保险">
          <my-insurance class="zjy-tab__item"></my-insurance>
        </el-tab-pane>
        <el-tab-pane label="全部保险">
          <insurance class="zjy-tab__item"></insurance>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import MyInsurance from './MyInsurance'
import Insurance from './Insurance'
export default {
  data() {
    return {
      activeName2: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    Insurance,
    MyInsurance
  }
}
</script>
<style lang='scss' scoped>

</style>