<!-- 教师端学生档案管理 -->
<template>
  <div class="zjy-table">
    <div class="zjy-table-search">
      <div class="zjy-table-search__item">
        <span>年份</span>
        <el-select v-model="query.enterYear" placeholder="请选择">
        </el-select>
      </div>
      <div class="zjy-table-search__item">
        <span>班级</span>
        <el-select v-model="query.classId" placeholder="请选择">
        </el-select>
      </div>
      <div class="zjy-table-search__item">
        <span>学号</span>
        <zjy-input v-model="query.studentNo"></zjy-input>
      </div>
      <a href="javascript:;" class="zjy-table-search__button" @click="search"></a>
    </div>
    <div class="zjy-line"></div>
    <div class="zjy-table-oper">
      <div class="zjy-table-oper__item">
        <div class="zjy-table-oper--create">
          <a href="javascript:;" @click="create">新增</a>
        </div>
      </div>
      <div class="zjy-table-oper__item">
        <div class="zjy-table-oper--">
          <a href="javascript:;" @click="_import">导入</a>
        </div>
      </div>

      <div class="zjy-table-oper__item">
        <div class="zjy-table-oper--">
          <a href="javascript:;" @click="_export">导出</a>
        </div>
      </div>
    </div>
    <el-table :data="list" style="width: 100%" v-loading="loading">
      <el-table-column type="selection" width="30">
      </el-table-column>
      <el-table-column type="index" label="序号" :index="1" width="50">
      </el-table-column>
      <el-table-column prop="studentNo" label="学号" width="100">
      </el-table-column>
      <el-table-column prop="studentName" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="facultyName" label="院系" width="120">
      </el-table-column>
      <el-table-column prop="facultyName" label="专业" width="120">
      </el-table-column>
      <el-table-column prop="facultyName" label="班级" width="120">
      </el-table-column>
      <el-table-column prop="applyDate" label="建档日期" :formatter="dateFormat" width="120">
      </el-table-column>
      <el-table-column prop="facultyName" label="入学年份" width="120">
      </el-table-column>
     
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a href="javascript:" @click="view(scope.row)" class="zjy-btn-view">
            <i class="zjy-icon"></i>
            <span>查看</span>
          </a>
        </template>
      </el-table-column>

      <span slot="empty">{{ empty }}</span>
    </el-table>
    <div class="zjy-pagination" v-if="list.length !== 0">
      <zjy-pagination :currentPage="currentPage" :total="total" :pageSize="limit" @current-change="currentChange">
      </zjy-pagination>
    </div>

    <el-dialog :title="title" :visible.sync="visible" width="800px">
      <file :formData="file"></file>
    </el-dialog>
  </div>
</template>

<script>
import stufileManageAPI from '@/api/teacher/stufile/manage'
import File from './File'
import ZjyInput from '@/components/input'
import ZjyPagination from '@/components/pagination'
import { dateFormat as _dateFormat } from '@/utils'

export default {
  data() {
    return {
      currentPage: 1,
      list: [],
      limit: 10,
      total: 0,
      visible: false,
      title: '',
      query: {
        offset: 0,
        limit: 10,
        enterYear: '',
        classId: '',
        studentNo: ''
      },
      loading: false,
      empty: '暂无数据',

      file: {} // 学生档案
    }
  },

  methods: {
    create () {
      this.title = '新增学生档案'
      this.visible = true
    },
    _import() {},
    _export() {},
    search() {},
    currentChange() {},

    dateFormat(row, column, cellValue) {
      return _dateFormat(cellValue)
    },

    handleSubmit(val) {
      this.visible = false
      // 查看操作时关闭
    
      if (val === 1) {
        this.refresh()
      }
    },
    refresh() {
      const old = this.currentPage
      this.currentPage = -1
      setTimeout(() => this.currentPage = old, 100)
    }
  },

  created() {},
  components: {
    ZjyInput,
    ZjyPagination,
    File
  },

  watch: {
    currentPage: {
      immediate: true,
      handler(val, oldval) {
        if (val === -1) return

        this.loading = true
        this.query.offset = this.query.limit * (val - 1)
        stufileManageAPI
          .queryForList(this.query)
          .then(response => {
            console.log(response)
            if (response.code === 1) {
              this.list = response.rows
              this.total = response.total
            } else {
              this.$alert(response.message)
            }
            this.loading = false
          })
          .catch(err => {
            this.loading = false
          })
      }
    },

    list(val) {
      if (!val) return
      this.empty = val.length === 0 ? '暂无数据' : '数据加载中....'
    }
  }
}
</script>
<style lang='scss' scoped>

</style>