<!-- 投保管理教师端 -->
<template>
  <div class="wrapper">
    <div class="zjy-table">
      <el-table :data="list" style="width: 100%" :row-style="rowStyle" :header-row-style="rowStyle" :header-cell-style="rowStyle" v-loading="loading">
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
          <el-table-column prop="applyStatus" label="状态" width="300" :formatter="statusFormate">
      </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="table-oper-group">
              <a href="javascript:" @click="view(scope.row)" class="zjy-btn-view">
                <i class="zjy-icon"></i>
                <span>查看</span>
              </a>

              <a href="javascript:" @click="deleteOne(scope.row)" class="zjy-btn-delete">
                <i class="zjy-icon"></i>
                <span>申请</span>
              </a>
            </div>
          </template>
        </el-table-column>

        <span slot="empty">{{ empty }}</span>
      </el-table>
    </div>
    <div class="zjy-pagination" v-if="list.length !== 0">
      <zjy-pagination :currentPage="currentPage" :total="total" @current-change="currentChange">
      </zjy-pagination>
    </div>

  </div>
</template>

<script>
import insuranceAPI from '@/api/student/insurance/all'
import ZjyPagination from '@/components/pagination'

export default {
  data() {
    return {
      list: [],
      currentPage: 1,
      total: 0,
      query: {
        offset: 0,
        limit: 10
      },
      title: '',
      empty: '数据加载中....',
      loading: false,
      visible: false
    }
  },

  methods: {
    statusFormate(row, column, cellValue) {
      return ['可申请', '申请中', '未申请'][
        +cellValue
      ]
    },

    rowStyle({ row, rowIndex }) {
      return {
        textAlign: 'center'
      }
    },

    view(row) {
      console.log(row.inssettingUid)
      insuranceAPI.queryForObject(row.inssettingUid).then(response => {
        console.log(response)
      }).catch(error => {

      })
    },

    currentChange(pageNumber) {
      this.currentPage = pageNumber
    },

    refresh() {
      const old = this.currentPage
      this.currentPage = -1
      setTimeout(() => {
        this.currentPage = old
      }, 100)
    }
  },

  components: {
    ZjyPagination
  },

  watch: {
    currentPage: {
      immediate: true,
      handler(val, oldval) {
        if (val === -1) return

        this.loading = true
        this.query.offset = this.query.limit * (val - 1)
        insuranceAPI
          .queryForList(this.query)
          .then(response => {
            this.list = response.rows
            this.total = response.total
            this.loading = false
          })
          .catch(err => {
            this.loading = false
          })
      }
    },

    list(val) {
      this.empty = val.length === 0 ? '暂无数据' : '数据加载中....'
    }
  }
}
</script>
<style lang='scss' scoped>

</style>