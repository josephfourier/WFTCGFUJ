<!-- 投保管理教师端 -->
<template>
  <div class="zjy-app zjy-insurance">
    <div class="zjy-table">
      <div class="zjy-table-oper">

        <div class="zjy-table-oper__item">
          <div class="zjy-table-oper__create">
            <a href="javascript:;" @click="create">新增</a>
          </div>
        </div>

        <div class="zjy-table-oper__item">
          <div class="zjy-table-oper__del">
            <a href="javascript:;" @click="batchDelete">批量删除</a>
          </div>
        </div>
      </div>
      <el-table ref="insuranceTable" @selection-change="handleSelectionChange" :data="insuranceList" style="width: 100%" :row-style="rowStyle" :header-row-style="rowStyle" :header-cell-style="rowStyle" v-loading="loading">
        <el-table-column type="selection" width="30">
        </el-table-column>
        <el-table-column type="index" label="序号" :index="1" width="45">
        </el-table-column>
        <el-table-column prop="insuranceName" label="险种名称" width="200">
        </el-table-column>
        <el-table-column prop="insuranceCompany" label="保险公司" width="120">
        </el-table-column>
        <el-table-column prop="insuranceCategory" label="险种类别" width="120">
        </el-table-column>
        <el-table-column prop="insuranceCost" label="保险费用" width="100">
        </el-table-column>
        <el-table-column prop="insuranceLimit" label="保险期限" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="btn-group">
              <a href="javascript:" @click="view(scope.row)" class="zjy-btn-view">
                <i class="zjy-icon"></i>
                <span>查看</span>
              </a>

              <a href="javascript:" @click="del(scope.row)" class="zjy-btn-delete">
                <i class="zjy-icon"></i>
                <span>删除</span>
              </a>
            </div>
          </template>
        </el-table-column>

        <span slot="empty">{{ empty }}</span>
      </el-table>
    </div>
    <div class="zjy-pagination" v-if="insuranceList.length !== 0">
      <zjy-pagination :currentPage="currentPage" :total="total" @current-change="currentChange">
      </zjy-pagination>
    </div>
    <!-- <div class="zjy-pagination" v-if="cardList.length !== 0">
      <zjy-pagination :currentPage="currentPage" :total="total" @current-change="currentChange">
      </zjy-pagination>
    </div>
    <el-dialog title="学生证补办审批" :visible.sync="visible" width="800px">
      <zjy-approval :uid="uid" :closed="!visible" @submit="handleSubmit"></zjy-approval>
    </el-dialog> -->
  </div>
</template>

<script>
import insuranceAPI from "@/api/insurance"
import ZjyPagination from "@/components/pagination"

export default {
  data() {
    return {
      insuranceList: [],
      currentPage: 1,
      total: 0,
      query: {
        offset: 0,
        limit: 10,
        dataStatus: "", //0:待审批, 1:已通过, 2:已拒绝, 3:审批中
        appYear: "",
        studentCode: ""
      },
      empty: "数据加载中....",
      loading: false
    }
  },

  methods: {
    create() {},
    batchDelete() {},
    handleSelectionChange(rows) {
      this.selectedRows = rows
    },
    rowStyle({ row, rowIndex }) {
      return {
        textAlign: "center"
      }
    },

    currentChange(pageNumber) {
      this.currentPage = pageNumber
    },
  },

  components: {
    ZjyPagination
  }, 

  created() {
    insuranceAPI.queryList(this.query).then(response => {
        this.insuranceList = response.rows
        this.total = response.total
    })
  },

  watch: {
     currentPage: {
      immediate: true,
      handler(val, oldval) {
        if (val === -1) return
        this.query.offset = this.query.limit * (val - 1)
        insuranceAPI
          .queryList(this.query)
          .then(response => {
            this.this.insuranceList = response.rows
            this.total = response.total
            this.loading = false
          })
          .catch(err => {})
      }
    },

  }
}
</script>
<style lang='scss' scoped>

</style>