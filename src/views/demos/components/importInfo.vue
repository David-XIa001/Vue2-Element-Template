<template>
  <el-dialog title="导入" :visible.sync="dialogVisible" @close="closeDialog">
    <el-upload
      ref="upload"
      class="upload-demo"
      action=""
      accept=".xlsx, .xls"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :limit="1"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传xlsx/xls文件，且不超过1M
      </div>
    </el-upload>
    <div slot="footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { importUser } from '@/api/user'
export default {
  props: {
    isShow: {
      type: Boolean
    }
  },
  data() {
    return {
      fileList: [],
      upload_List: [],
      dialogVisible: false
    }
  },
  watch: {
    isShow(newVal, oldVal) {
      this.dialogVisible = newVal
    }
  },
  methods: {
    submit() {
      const formData = new FormData()
      this.upload_List.forEach((item, index) => {
        formData.append('file', item.raw)
      })
      importUser(formData).then((res) => {
        this.$emit('getList')
        this.$message({
          message: '导入成功',
          type: 'success'
        })
        this.closeDialog()
      })
    },
    handleChange(file, fileList) {
      const isExlcle =
        file.raw.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.raw.type === 'xls'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isExlcle) {
        this.$message.error('只能上传xlsx和xls文件')
        this.$refs['upload'].clearFiles()
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
        this.$refs['upload'].clearFiles()
        return false
      }
      this.fileList = JSON.parse(JSON.stringify(fileList))
      this.upload_List.push(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请先删除之前的文件再上传`)
    },
    closeDialog() {
      this.$refs['upload'].clearFiles()
      this.fileList = []
      this.upload_List = []
      this.$emit('closeChildDialog')
    }
  }
}
</script>
