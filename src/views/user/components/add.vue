<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" @close="closeDialog">
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="80px"
      style="width: 500px; margin-left: 50px"
    >
      <el-form-item label="昵称" prop="nick_name">
        <el-input v-model="form.nick_name" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="性别" prop="status">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="真实姓名" prop="real_name">
        <el-input v-model="form.real_name" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getUserInfo } from '@/api/user'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  props: {
    isShow: {
      type: Boolean
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      dialogVisible: false,
      form: {
        nick_name: '',
        username: '',
        phone: '',
        email: '',
        status: '',
        regist_source: '',
        sex: '',
        real_name: ''
      },
      rules: {

      }
    }
  },
  watch: {
    isShow(newVal, oldVal) {
      this.dialogVisible = newVal
      if (newVal && this.id) {
        // 编辑
        this.getDetail()
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
      console.log(this.selectedOptions)
      console.log(CodeToText[this.selectedOptions[0]])
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog() {
      this.$emit('closeChildDialog')
    },
    getDetail() {
      this.form = {
        nick_name: '昵称',
        username: '用户名',
        phone: '电话',
        email: '邮箱',
        status: '状态',
        regist_source: '注册来源',
        sex: '男',
        real_name: '真实姓名'
      }
      // getUserInfo(this.id).then((res) => {
      //   this.detailInfo = res.data
      // })
    }
  }
}
</script>
