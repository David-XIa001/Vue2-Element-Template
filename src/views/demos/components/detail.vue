<template>
  <el-dialog title="详情" :visible.sync="dialogVisible" @close="closeDialog">
    <div class="detail">
      <el-form
        label-position="left"
        label-width="80px"
        style="width: 500px;"
      >
        <el-form-item label="姓名" prop="name">
          <div class="info">{{ detailInfo.userName }}</div>
        </el-form-item>
        <el-form-item label="邮箱" prop="name">
          <div class="info">{{ detailInfo.email }}</div>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div slot="footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="closeDialog">确 定</el-button>
    </div> -->
  </el-dialog>
</template>
<script>
import { getUserInfo } from '@/api/user'
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
      dialogVisible: false,
      detailInfo: {
        id: 0,
        userName: '',
        email: '',
        phone: '',
        account: ''
      }
    }
  },
  watch: {
    isShow(newVal, oldVal) {
      this.dialogVisible = newVal
      if (newVal) {
        this.getDetail()
      }
    }
  },
  methods: {
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
