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
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-cascader
          v-model="selectedOptions"
          :options="options"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              v-model="form.date2"
              placeholder="选择时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type" />
          <el-checkbox label="地推活动" name="type" />
          <el-checkbox label="线下主题活动" name="type" />
          <el-checkbox label="单纯品牌曝光" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助" />
          <el-radio label="线下场地免费" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input v-model="form.desc" type="textarea" />
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
        timestamp: '',
        name: '',
        region: '',
        date1: '',
        date2: '',
        type: '',
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
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
      getUserInfo(this.id).then((res) => {
        this.detailInfo = res.data
      })
    }
  }
}
</script>
