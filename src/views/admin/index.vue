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
    <div class="operate">
      <el-button
        class="operate-item"
        type="primary"
        size="mini"
        plain
        icon="el-icon-plus"
        @click="handleAdd"
      >
        {{ $t("common.add") }}
      </el-button>
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
      <el-table-column prop="phone" :label="$t('admin.phone')" />
      <el-table-column prop="email" :label="$t('admin.email')" />
      <el-table-column :label="$t('common.operation')" width="120">
        <template slot-scope="scope">
          <!-- <el-button
            type="text"
            size="small"
            @click="handleDetail(scope.row)"
          >{{ $t('common.detail') }}</el-button> -->
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.row)"
          >{{ $t('common.edit') }}</el-button>
          <el-popconfirm
            :title="$t('common.confirmDelete')"
            style="margin-left:10px"
            @onConfirm="handleDelete(scope.row)"
          >
            <el-button
              slot="reference"
              type="text"
              size="small"
              style="color:red"
            >{{ $t('common.delete') }}</el-button>
          </el-popconfirm>
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
    <Detail
      :id="currentId"
      :is-show="isShowDetail"
      @closeChildDialog="isShowDetail = false"
    />
    <Add
      :id="currentId"
      :is-show="isShowAdd"
      @closeChildDialog="isShowAdd = false"
      @getList="getList"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getAdminList, deleteAdmin } from '@/api/user'
import Detail from './components/detail'
import Add from './components/add'

export default {
  components: { Pagination, Detail, Add },
  data() {
    return {
      isShowDetail: false,
      isShowAdd: false,
      currentId: '',
      total: 0,
      listQuery: {
        pageSize: 10,
        currentPage: 1
      },
      tableData: [],
      queryParams: {
        username: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleFilter() {
      this.listQuery.currentPage = 1
      const params = { ...this.listQuery, ...this.queryParams }
      this.getList(params)
    },
    handleReset() {
      this.queryParams.username = ''
      this.handleFilter()
    },
    handleDelete(row) {
      deleteAdmin(row.bizId).then(res => {
        this.$message({
          type: 'success',
          message: this.$t('common.deleteSuccess')
        })
        this.handleFilter()
      })
    },
    handleAdd() {
      this.currentId = ''
      this.isShowAdd = true
    },
    handleDetail(row) {
      this.currentId = row.bizId
      this.isShowDetail = true
    },
    handleEdit(row) {
      this.currentId = row.bizId
      this.isShowAdd = true
    },
    getList(params) {
      getAdminList(params || this.listQuery).then((res) => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    }
  }
}
</script>
<style lang=""></style>
