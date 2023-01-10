<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form size="mini" :inline="true" label-position="left" class="demo-form-inline">
        <el-form-item :label="$t('admin.username')">
          <el-input
            v-model="queryParams.username"
            :placeholder="$t('admin.username')"
            class="filter-item-input"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item :label="$t('admin.phone')">
          <el-input
            v-model="queryParams.phone"
            :placeholder="$t('admin.phone')"
            class="filter-item-input"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleFilter">
            {{ $t("common.search") }}
          </el-button>
          <el-button plain icon="el-icon-refresh-left" @click="handleReset">
            {{ $t("common.reset") }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column fixed prop="nickName" :label="$t('admin.nickName')" />
      <el-table-column prop="username" :label="$t('admin.username')" />
      <!-- <el-table-column prop="realName" :label="$t('admin.realName')" /> -->
      <el-table-column prop="phone" :label="$t('admin.phone')" />
      <el-table-column prop="email" :label="$t('admin.email')" />
      <!-- <el-table-column prop="sex" width="80" :label="$t('admin.sex')">
        <template slot-scope="scope">
          {{ $t('admin.sex' + scope.row.sex) }}
        </template>
      </el-table-column> -->
      <el-table-column prop="lastLoginTime" :label="$t('admin.lastTime')">
        <template slot-scope="scope">
          {{ transformDate(scope.row.lastLoginTime, 'local') }}
        </template>
      </el-table-column>

    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getUserList, getUserChildrenInfo } from '@/api/user'
import { transformDate } from '@/utils'

export default {
  components: { Pagination },
  data() {
    return {
      isShowDetail: false,
      currentId: '',
      total: 0,
      listQuery: {
        pageSize: 10,
        currentPage: 1
      },
      tableData: [],
      gridData: [],
      queryParams: {
        username: '',
        phone: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    transformDate,
    getChildrenInfo(row) {
      getUserChildrenInfo(row.bizId).then(res => {
        this.gridData = res.data || []
      })
    },
    handleFilter() {
      const params = { ...this.listQuery, ...this.queryParams }
      this.getList(params)
    },
    handleReset() {
      this.queryParams.username = ''
      this.queryParams.phone = ''
      this.handleFilter()
    },
    handleDetail(row) {
      this.currentId = row.bizId
      this.isShowDetail = true
    },
    getList(params) {
      getUserList(params || this.listQuery).then((res) => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    }
  }
}
</script>
<style lang=""></style>
