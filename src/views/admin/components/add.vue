<template>
  <el-dialog :title="(id ? $t('common.edit') : $t('common.add'))+ $t('admin.admin')" :visible.sync="dialogVisible" @close="closeDialog">
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="100px"
      style="width: 500px; margin-left: 50px"
    >
      <el-form-item :label="$t('admin.nickName')" prop="nickName">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <el-form-item :label="$t('admin.username')" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item :label="$t('admin.email')" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item :label="$t('admin.phone')" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item :label="$t('login.password')" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="closeDialog">{{ $t("common.cancle") }}</el-button>
      <el-button type="primary" @click="submit('ruleForm')">{{ $t("common.confirm") }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addAdmin, getAdminInfo } from '@/api/user'
import { isEmail, isPhone } from '@/utils/validate'

export default {
  props: ['isShow', 'id'],
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error(this.$t('admin.emailTip1')))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!isPhone(value)) {
        callback(new Error(this.$t('admin.phoneTip2')))
      } else {
        callback()
      }
    }
    return {
      selectedOptions: [],
      dialogVisible: false,
      form: {
        username: '',
        nickName: '',
        phone: '',
        email: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: this.$t('admin.usernameTip1'), trigger: 'blur' },
          { min: 3, max: 16, message: this.$t('admin.usernameTip2'), trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: this.$t('admin.nickNameTip1'), trigger: 'blur' },
          { min: 3, max: 16, message: this.$t('admin.usernameTip2'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('admin.emailTip2'), trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        phone: [
          { required: true, message: this.$t('admin.phoneTip1'), trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        password: [
          { required: true, message: this.$t('admin.passwordTip1'), trigger: 'blur' },
          { min: 8, max: 16, message: this.$t('admin.passwordTip2'), trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    isShow(newVal, oldVal) {
      this.dialogVisible = newVal
      this.form = {
        username: '',
        nickName: '',
        phone: '',
        email: '',
        password: ''
      }
      if (newVal && this.id) {
        this.getDetail()
      }
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addAdmin(this.form, this.id).then(res => {
            this.$message({
              type: 'success',
              message: this.id ? this.$t('common.editSuccess') : this.$t('common.addSuccess')
            })
            this.closeDialog()
            this.$emit('getList')
          })
        } else {
          return false
        }
      })
    },
    closeDialog() {
      this.$emit('closeChildDialog')
    },
    getDetail() {
      getAdminInfo(this.id).then((res) => {
        this.form = res.data
      })
    }
  }
}
</script>
