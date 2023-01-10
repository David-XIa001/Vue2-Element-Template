<template>
  <el-dialog :title="$t('common.detail')" :visible.sync="dialogVisible" @close="closeDialog">
    <div class="detail">
      <el-form
        label-position="left"
        label-width="150px"
        style="width: 500px;"
      >
        <el-form-item :label="$t('admin.nickName')">
          <div class="info">{{ detailInfo.nickName }}</div>
        </el-form-item>
        <el-form-item :label="$t('admin.username')">
          <div class="info">{{ detailInfo.username }}</div>
        </el-form-item>
        <el-form-item :label="$t('admin.phone')">
          <div class="info">{{ detailInfo.phone }}</div>
        </el-form-item>
        <el-form-item :label="$t('admin.email')">
          <div class="info">{{ detailInfo.email }}</div>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <div class="info">{{ detailInfo.status }}</div>
        </el-form-item>
        <el-form-item label="注册来源">
          <div class="info">{{ detailInfo.registSource }}</div>
        </el-form-item> -->
        <el-form-item :label="$t('admin.sex')">
          <div class="info">{{ detailInfo.sex }}</div>
        </el-form-item>
        <el-form-item :label="$t('admin.realName')">
          <div class="info">{{ detailInfo.realName }}</div>
        </el-form-item>
        <el-form-item :label="$t('admin.lastTime')">
          <div class="info">{{ transformDate(detailInfo.lastLoginTime, 'local') }}</div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import { getUserInfo } from '@/api/user'
import { transformDate } from '@/utils'

export default {
  props: {
    isShow: {
      type: Boolean
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      dialogVisible: false,
      detailInfo: {
        nickName: '',
        username: '',
        phone: '',
        email: '',
        registSource: '',
        sex: '',
        realName: '',
        lastLoginTime: ''
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
    transformDate,
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
