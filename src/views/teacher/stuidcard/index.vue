<!-- 教师端学生证管理 -->
<template>
  <div class="zjy-app zjy-card">
    <div class="zjy-table">
      <el-table :data="cardList" style="width: 100%" :row-style="rowStyle" :header-row-style="rowStyle" :header-cell-style="rowStyle">
        <el-table-column type="selection" width="30">
        </el-table-column>
        <el-table-column type="index" label="序号" :index="1" width="45">
        </el-table-column>
        <el-table-column prop="studentNo" label="学号" width="150">
        </el-table-column>
        <el-table-column prop="studentName" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="facultyName" label="院系" width="120">
        </el-table-column>
        <el-table-column prop="enterYear" label="入学年份" width="100">
        </el-table-column>
        <el-table-column prop="appNum" label="申请次数" width="100">
        </el-table-column>
        <el-table-column prop="dataStatus" label="状态" :formatter="statusFormat" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a href="javascript:" @click="view(scope.row)" class="zjy-btn-view">
              <i class="zjy-icon"></i>
              <span>查看</span>
            </a>

            <a href="javascript:" @click="del(scope.row)" class="zjy-btn-delete" v-if="scope.row.dataStatus == 1">
              <i class="zjy-icon"></i>
              <span>删除</span>
            </a>
          </template>
        </el-table-column>

        <!-- <span slot="empty">{{ empty }}</span> -->
      </el-table>
    </div>
    <div class="zjy-pagination" v-if="cardList.length !== 0">
      <zjy-pagination :currentPage="currentPage" :total="total" @current-change="currentChange">
      </zjy-pagination>
    </div>
    <el-dialog title="学生证补办审批" :visible.sync="visible" width="800px">
      <zjy-approval
        :uid="uid"
      ></zjy-approval>
      <div slot="footer" class="dialog-footer">
        <zjy-button type="plain">拒绝</zjy-button>
        <zjy-button type="primary">同 意</zjy-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cardAPI from "@/api/stuidcard"
import ZjyPagination from "@/components/pagination"
import ZjyButton from "@/components/button"
import ZjyApproval from './Approval'

export default {
  data() {
    return {
      cardList: [],
      //limit: 1, // 测试分页
      total: 0,
      currentPage: 1,
      visible: false,
      uid: '', // 当前查看补办信息的id
      query: {
        offset: 0,
        limit: 10,
        dataStatus: "", //0:待审批, 1:已通过, 2:已拒绝, 3:审批中
        enterYear: "",
        studentCode: ""
      }
    }
  },
  methods: {
    view(row) {
      this.visible = true
      this.uid = row.stuidcardUid
    },

    del() {},

    currentChange(pageNumber) {
      this.currentPage = pageNumber
    },

    rowStyle({ row, rowIndex }) {
      return {
        textAlign: "center"
      }
    },
    statusFormat(row, column, cellValue) {
      return ["待审批", "已通过", "已拒绝", "审批中"][+cellValue]
    }
  },

  components: {
    ZjyPagination,
    ZjyButton,
    ZjyApproval
  },

  watch: {
    currentPage: {
      immediate: true,
      handler(val, oldval) {
        this.query.offset = this.query.limit * (val - 1)
        cardAPI
          .queryCardList(this.query)
          .then(response => {
            this.cardList = response.rows
            this.total = response.total
          })
          .catch(err => {})
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.zjy-btn-view {
  margin-right: 10px;
}
</style>