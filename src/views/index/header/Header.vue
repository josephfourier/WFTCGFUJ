<!--  -->
<template>
  <div class="zjy-header">
    <div class="logo">
      <img src="./logo.png" alt="职教云logo">
    </div>

    <div class="wrapper">
      <div class="school">
        <span>固原民族职业技术学校</span>
        <span class="spacer"></span>
        <span>学工系统</span>
      </div>

      <el-dropdown trigger="click" class="user-info">
        <span class="el-dropdown-link">
          <i class="zjy-icon zjy-icon-user"></i>
          <span>职教云用户</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>返回个人中心</el-dropdown-item>
          <el-dropdown-item>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang='scss' scoped>
.logo {
  background-color: #1e2a3c;
  position: absolute;
  left: 0;
  top: 0;
  width: 160px;
  height: 60px;
  box-shadow: 0 1px 0px 0px #26334b;
}
.wrapper {
  position: absolute;
  line-height: 60px;
  top: 0;
  right: 0;
  left: 160px;
  box-shadow: 0px 0px 8px 0px #d7d9de;
  .school {
    padding-left: 20px;
    & > span {
      color: #666666;
    }
  }

  .user-info {
    position: absolute;
    top: 0;
    right: 15px;
    height: 60px;
    margin-right: 35px;
    line-height: 60px;
    cursor: pointer;

    .zjy-icon-user {
      width: 20px;
      height: 20px;
      background: url('./zjy-icon-user.png') no-repeat 0 0;
    }
  }

  .badge-wrap {
    float: right;
    margin-right: 50px;
  }
}
.el-dropdown-menu.el-popper {
  top: 40px !important;
  min-width: 125px;
}
</style>