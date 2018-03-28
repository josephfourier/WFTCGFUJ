<!-- 学生档案实体 -->
<template>
  <div class="zjy-form">
    <p class="zjy-form__title">学生信息</p>
    <el-form :model="data" :rules="rules" ref="data" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="学号:" prop="studentNo" class="inline">
            <el-input @change="handleChange" v-model="studentNo" :class="[{'is-error': hasError}, {'is-success': success},'search-input']">
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

    <div class="zjy-table">
      <el-table :data="value" style="width: 100%" :show-header="false">

        <el-table-column label="材料名称" width="280">
          <template slot-scope="scope">
            <p class="setting-name">{{ scope.row.stufileName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="文件上传">
          <template slot-scope="scope">
            <zjy-upload v-if="!fileList[scope.$index].stufilePath" class="zjy-table-upload" :action="action + '?index=' + scope.$index" :headers="{'Zjy-Token': token}" multiple :limit="3" :showFileList="false" :before-upload="handleBeforeUpload" :on-progress="handleProgress" :on-success="handleSuccess" :on-error="handleError" :auto-upload="true">
              <el-button size="small" type="primary" @click="test(scope.row, scope.$index)">上传附件</el-button>
            </zjy-upload>
            <p v-else class="file-name">{{ fileList[scope.$index].stufileName }}</p>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div v-if="fileList[scope.$index].stufilePath">
              <a :href="fileList[scope.$index].stufilePath" target="_blank">下载</a>
              <a href="javascript:;" @click="deleteFile(scope.$index)">删除</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p class="zjy-form__title">档案说明</p>
    <zjy-input type="textarea" v-model="data.stufileDescription"></zjy-input>

    <div class="zjy-footer">
      <zjy-button type="plain" @click="resetForm('data')">取消</zjy-button>
      <zjy-button type="primary" @click="submitForm('data')">提交</zjy-button>
    </div>
  </div>
</template>

<script>
import ZjyButton from "@/components/button"
import ZjyInput from "@/components/input"
import stufileManageAPI from "@/api/teacher/stufile/manage"
import { mpaGetters, mapGetters } from "vuex"
import ZjyUpload from "@/components/upload/index"

export default {
  data() {
    return {
      data: {},
      action: process.env.BASE_URL + "upload/stufileUpload",
      rules: {
        stufileNo: [
          { required: true, message: "请输入档案编号", trigger: "blur" }
        ],
        recipient: [
          { required: true, message: "请输入接收人", trigger: "blur" }
        ],
        stufileDate: [
          { required: true, message: "请选择建档日期", trigger: "blur" }
        ]
      },
      studentNo: "",
      hasError: false,
      error: "",
      success: "",
      fileIndex: -1,
      activeFileIndex: -1,
      activeSettingId: "",
      fileList: []
    }
  },

  computed: {
    ...mapGetters(["token"])
  },

  methods: {
    test(row, index) {
      this.activeFileIndex = index
      this.activeSettingId = row.stufilesettingUid
    },

    deleteFile(index) {
      this.fileList[index].stufilePath = ""
      this.fileList[index].stufileName = ""
    },

    start(index) {
      this.$refs["upload" + index].submit()
    },

    handleUpload(index, row) {},

    handleProgress(event, file, fileList) {
      // console.log(event)
    },

    handleBeforeUpload(file) {
      this.fileList[this.activeFileIndex].index = this.activeFileIndex
      this.fileList[this.activeFileIndex].stufileName = file.name
      this.fileList[
        this.activeFileIndex
      ].stufilesettingUid = this.activeSettingId

      return true
      //return Promise.reject()
    },

    handleSuccess(response, file, fileList) {
      const path = response.data.split("?")[0]
      const index = response.data.split("?")[1].replace(/index=/gi, "")
      this.fileList[index].status = fileList[0].status
      this.fileList[index].stufilePath = path
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
        if (this.studentNo) {
          stufileManageAPI.checkExists(this.studentNo).then(response => {
            if (response.code !== 1) {
              this.hasError = true
              this.error = response.data
              this.success = ""
              this.clearData()
              reject(false)
            } else {
              this.fillData(response.data)
              this.error = ""
              this.hasError = false
              this.success = "success"
              resolve(true)
            }
          })
        } else {
          this.hasError = true
          this.error = "请输入学号"
          this.success = ""
          this.clearData()
        }
      })
    },

    handleChange() {
      this.clearData()
    },

    resetValidate() {
      this.hasError = false
      this.error = ""
      this.success = ""
    },

    clearData() {
      this.data.className = ""
      this.data.facultyName = ""
      this.data.studentName = ""
      this.data.studentNo = ""
    },

    fillData(data) {
      this.data.className = data.className
      this.data.facultyName = data.facultyName
      this.data.studentName = data.studentName
      this.data.studentNo = data.studentNo
      this.data.studentId = data.studentId
    },

    resetForm(formName) {
      this.resetValidate()
      this.$refs[formName].resetFields()
      this.$emit("close")
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let arg = {}

        arg.studentId = this.formData.studentId
        arg.stufileNo = this.formData.stufileNo + this.formData.studentId
        arg.recipient = this.formData.recipient
        arg.schoolCode = this.formData.schoolCode
        ;(arg.stufileDate = new Date(this.formData.stufileDate).getTime()),
          (arg.stufileDescription = this.formData.stufileDescription)
        arg.status = 1

        let stufileListList = []
        this.fileList.forEach((item, index) => {
          if (item.stufilePath) {
            stufileListList.push({
              listUid: item.listUid,
              stufileUid: item.stufileUid,
              stufilePath: item.stufilePath,
              swmsStufileSetting: item.swmsStufileSetting
            })
          }
        })
        arg.stufileListList = stufileListList

        if (this.type === 2) {
          this.check()
            .then(response => {
              if (response && valid) {
                // 验证通过后提交表单数据

                if (this.type === 2) {
                  stufileManageAPI
                    .create(arg)
                    .then(response => {
                      if (response.code === 1) {
                        this.$alert("添加成功")
                        this.resetValidate()
                        this.$emit("close")
                      } else {
                        this.$alert(response.message)
                      }
                    })
                    .catch(error => {
                      console.log(error)
                    })
                } else if (this.type === 1) {
                }
              }
            })
            .catch(error => {
              console.log(error)
              return false
            })
        } else if (true) {
          stufileManageAPI
            .update(this.data.stufileUid, arg)
            .then(response => {
              if (response.code === 1) {
                this.$alert("修改成功")
                this.resetValidate()
                this.$emit("close")
              } else {
                this.$alert(response.message)
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    }
  },

  props: {
    formData: Object,
    outterClose: Boolean,
    value: Array, // 学生档案设置列表
    type: Number, // 何种操作
    list: Array
  },

  components: {
    ZjyButton,
    ZjyUpload,
    ZjyInput
  },

  watch: {
    formData: {
      immediate: true,
      handler(val, oldVal) {
        this.data = val
        this.studentNo = ""
        try {
          if (this.data.ucenterStudent.studentNo) {
            this.studentNo = this.data.ucenterStudent.studentNo
            this.data.studentName = this.data.ucenterStudent.studentName
            this.data.className = this.data.ucenterStudent.className
            this.data.facultyName = this.data.ucenterStudent.facultyName
            this.data.studentNo = this.data.ucenterStudent.studentNo
          }
        } catch (e) {}
      }
    },

    list: {
      immediate: true,
      handler(val) {
        this.fileList = val
      }
    },

    outterClose(val) {
      this.resetValidate()
      this.$refs["data"].resetFields()
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
.setting-name {
  padding: 4px 0;
}
.file-name {
}
</style>