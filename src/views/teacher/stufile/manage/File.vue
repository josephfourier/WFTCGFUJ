<!-- 学生档案实体 -->
<template>
  <div class="zjy-form">
    <p class="zjy-form__title">学生信息</p>
    <el-form :model="data" :rules="rules" ref="data" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="学号:" prop="studentId" class="inline">
            <el-input @change="handleChange" v-model="studentId" :class="[{'is-error': hasError}, {'is-success': success},'search-input']">
              <div class="search" slot="append" @click="check">
                <img src="@/assets/images/zjy-icon-search.png" alt="搜索">
              </div>
            </el-input>

            <transition name="el-zoom-in-top">
              <span class="tip" v-if="hasError">{{ error }}</span>
            </transition>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学生姓名:" prop="studentName" class="inline pull-right">
            <el-input v-model="data.studentName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="班级:" prop="className" class="inline">
        <el-input v-model="data.className" disabled></el-input>
      </el-form-item>
      <el-form-item label="院系:" prop="facultyName" class="inline pull-right">
        <el-input v-model="data.facultyName" disabled></el-input>
      </el-form-item>

      <el-form-item label="档案编号" prop="stufileNo" class="inline pull-left">
        <el-input type="text" v-model="data.stufileNo"></el-input>
      </el-form-item>
      <el-form-item label=" + 学号 + " prop="studentNo" class="inline pull-right">
        <el-input type="text" v-model="data.studentNo" disabled></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="接收人" prop="recipient" class="inline pull-left">
            <el-input type="text" v-model="data.recipient"></el-input>
          </el-form-item>

        </el-col>
        <el-col :span="12">
          <el-form-item label="建档日期" prop="stufileDate" class=" pull-right">
            <el-date-picker type="date" placeholder="选择日期" v-model="data.stufileDate" style="width: 100%;position:absolute;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <p class="zjy-form__title">档案材料清单</p>
    <zjy-upload 
      class="zjy-table-upload" 
      :action="action" 
      :headers="{'Zjy-Token': token}" 
      multiple :limit="3" 
      :showFileList="false" 
      :file-list="fileList" 
      :on-progress="handleProgress" 
      :on-success="handleSuccess" 
      :on-error="handleError"
    >
      <el-button size="small" type="primary">上传附件</el-button>
      <!-- <div slot="tip" class="el-upload__tip">上传测试</div> -->
    </zjy-upload>

    <div class="zjy-table">
      <el-table :data="tableData" style="width: 100%" :show-header="false">

        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            <zjy-upload class="zjy-table-upload" :action="action" :headers="{'Zjy-Token': token}" multiple :limit="3" :showFileList="false" :file-list="fileList" :on-progress="handleProgress" :on-success="handleSuccess" :on-error="handleError">
              <el-button size="small" type="primary">上传附件</el-button>
              <!-- <div slot="tip" class="el-upload__tip">上传测试</div> -->
            </zjy-upload>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="zjy-footer">
      <zjy-button type="plain" @click="resetForm('data')">取消</zjy-button>
      <zjy-button type="primary" @click="submitForm('data')">提交</zjy-button>
    </div>
  </div>
</template>

<script>
import ZjyButton from '@/components/button'
import stufileManageAPI from '@/api/teacher/stufile/manage'
import { mpaGetters, mapGetters } from 'vuex'
import ZjyUpload from '@/components/upload/index'

export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      data: {},
      action: process.env.BASE_URL + 'upload/stufileUpload',
      rules: {
        stufileNo: [
          { required: true, message: '请输入档案编号', trigger: 'blur' }
        ],
        recipient: [
          { required: true, message: '请输入接收人', trigger: 'blur' }
        ],
        stufileDate: [
          { required: true, message: '请选择建档日期', trigger: 'blur' }
        ]
      },
      studentId: '',
      list: [],
      hasError: false,
      error: '',
      success: '',

      fileList: []
    }
  },

  computed: {
    ...mapGetters(['token'])
  },

  methods: {
    handleProgress(event, file, fileList) {
      // console.log(event)
    },
    handleSuccess(response, file, fileList) {
      // console.log(response)
    },
    handleError(err, file, fileList) {
      console.log(err)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    check() {
      return new Promise((resolve, reject) => {
        if (this.studentId) {
          stufileManageAPI.checkExists(this.studentId).then(response => {
            if (response.code !== 1) {
              this.hasError = true
              this.error = response.data
              this.success = ''
              this.clearData()
              reject(false)
            } else {
              this.fillData(response.data)
              this.error = ''
              this.hasError = false
              this.success = 'success'
              resolve(true)
            }
          })
        } else {
          this.hasError = true
          this.error = '请输入学号'
          this.success = ''
          this.clearData()
          reject(false)
        }
      })
    },

    handleChange() {
      this.clearData()
    },

    reset() {
      this.data = {}
      this.studentId = ''
      this.hasError = false
      this.error = ''
      this.success = ''
    },

    clearData() {
      this.data.className = ''
      this.data.facultyName = ''
      this.data.studentName = ''
      this.data.studentNo = ''
    },

    fillData(data) {
      this.data.className = data.className
      this.data.facultyName = data.facultyName
      this.data.studentName = data.studentName
      this.data.studentNo = data.studentNo
    },

    resetForm(formName) {
      this.reset()
      this.$refs[formName].resetFields()
      this.$emit('close')
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        this.check()
          .then(response => {
            console.log(response)
            if (response && valid) {
              this.reset()
              this.$emit('close')
            }
          })
          .catch(error => {
            console.log(error)
            return false
          })
      })
    }
  },

  props: {
    formData: Object,
    outterClose: Boolean
  },

  components: {
    ZjyButton,
    ZjyUpload
  },

  watch: {
    formData: {
      immediate: true,
      handler(val, oldVal) {
        this.data = val
      }
    },

    outterClose(val) {
      this.reset()
      this.$refs['data'].resetFields()
    }
  }
}
</script>
<style lang='scss' scoped>
.el-form {
  padding: 0 50px;
  .el-form-item {
    width: 300px;
    margin-bottom: 20px;
  }
}
.search-input {
  width: 220px;
}
.tip {
  position: absolute;
  left: 0;
  line-height: 12px;
  top: 45px;
  font-size: 12px;
  display: inline-block;
  z-index: 999;
  color: #f56c6c;
}
.search {
  display: block;
}

.zjy-table-upload {
  .el-button--primary {
    color: #fff;
    background-color: #36c6d3;
    border-color: #36c6d3;
    border-radius: 25px;
  }
}

.el-button--small,
.el-button--small.is-round {
  padding: 7px 15px;
}
</style>