<template>
  <el-dialog :title="$t('common.detail')" :visible.sync="dialogVisible" @close="closeDialog">
    <div class="detail">
      <el-form
        label-position="left"
        label-width="130px"
        style="width: 500px;"
      >
        <el-form-item :label="$t('admin.username')">
          <div class="info">{{ detailInfo.username }}</div>
        </el-form-item>
        <el-form-item :label="$t('admin.nickName')">
          <div class="info">{{ detailInfo.nickName }}</div>
        </el-form-item>
        <el-form-item :label="$t('admin.phone')">
          <div class="info">{{ detailInfo.phone }}</div>
        </el-form-item>
        <el-form-item :label="$t('admin.email')">
          <div class="info">{{ detailInfo.email }}</div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import { getAdminInfo } from '@/api/user'
export default {
  props: ['isShow', 'id'],
  data() {
    return {
      dialogVisible: false,
      detailInfo: {
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
      getAdminInfo(this.id).then((res) => {
        this.detailInfo = res.data
      })
    }
  }
}
</script>
