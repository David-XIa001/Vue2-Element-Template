<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-form">
        <div class="filter-item">
          <div class="lable">姓名</div>
          <el-input
            v-model="queryParams.name"
            placeholder="姓名"
            class="filter-item-input"
            @keyup.enter.native="handleFilter"
          />
        </div>
        <div class="filter-operate">
          <el-button type="primary" icon="el-icon-search" @click="handleFilter">
            {{ $t("common.search") }}
          </el-button>
          <el-button plain icon="el-icon-refresh-left" @click="handleReset">
            {{ $t("common.reset") }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="operate">
      <el-button
        class="operate-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleAdd"
      >
        {{ $t("common.add") }}
      </el-button>
      <el-button
        class="operate-item"
        type="primary"
        icon="el-icon-download"
        @click="handleExport"
      >
        {{ $t("common.export") }}
      </el-button>
      <el-button
        class="operate-item"
        type="primary"
        icon="el-icon-upload2"
        @click="handleImport"
      >
        {{ $t("common.import") }}
      </el-button>
    </div>
    <!-- <svg-icon icon-class="kc" class-name="disabled" /> -->
    <el-table
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column fixed prop="id" label="日期" />
      <el-table-column prop="userName" label="姓名" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="account" label="账号" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleDetail(scope.row)"
          >{{ $t('common.detail') }}</el-button>
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.row)"
          >{{ $t('common.edit') }}</el-button>
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
    />
    <ImportInfo
      :is-show="isShowImport"
      @getList="getList"
      @closeChildDialog="isShowImport = false"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getUserList, exportUser } from '@/api/user'
import { downloadFile, transformDate, debounce } from '@/utils'
import Detail from './components/detail'
import Add from './components/add'
import ImportInfo from './components/importInfo'

export default {
  components: { Pagination, Detail, Add, ImportInfo },
  data() {
    return {
      isShowDetail: false,
      isShowAdd: false,
      isShowImport: false,
      currentId: 0,
      total: 10,
      listQuery: {
        pageSize: 10,
        currentPage: 1
      },
      tableData: [
      ],
      queryParams: {
        name: ''
      },
      websock: null
    }
  },
  mounted() {
    const now = new Date()
    const utc = transformDate(now, 'UTC')
    const utcToNow = transformDate(now, 'local')
    console.log('nowUtc =', utc)
    console.log('utcToNow =', utcToNow)
    this.getList()
  },
  created() {
    this.initWebSocket()
  },
  destroyed() {
    this.websock.close() // 离开路由之后断开websocket连接
  },
  methods: {
    handleFilter() {
      // const params = { ...this.listQuery, ...this.queryParams }
    },
    handleReset() {
      this.queryParams.name = ''
    },
    handleAdd() {
      this.currentId = 0
      this.isShowAdd = true
    },
    handleExport() {
      exportUser().then((res) => {
        const url = URL.createObjectURL(res)
        downloadFile(url, '')
      })
    },
    handleImport() {
      this.isShowImport = true
    },
    handleDetail(row) {
      this.currentId = 1
      this.isShowDetail = true
    },
    handleEdit(row) {
      this.currentId = ''
      this.isShowAdd = true
    },
    getList(params) {
      console.log('params =', params)
      getUserList(params || this.listQuery).then((res) => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    // 初始化weosocket
    initWebSocket() {
      const wsurl = 'ws://192.168.150.87:9001/websocket/1'
      // 实例化 WebSocket
      this.websock = new WebSocket(wsurl)
      // 监听 WebSocket 连接
      this.websock.onopen = this.websocketonopen
      // 监听 WebSocket 错误信息
      this.websock.onerror = this.websocketonerror
      // 监听 WebSocket 消息
      this.websock.onmessage = this.websocketonmessage

      this.websock.onclose = this.websocketclose
    },
    // 连接建立之后执行send方法发送数据
    websocketonopen() {
      console.log('socket连接成功')
      const actions = { test: '12345' }
      this.websocketsend(JSON.stringify(actions))
    },
    // 连接建立失败重连
    websocketonerror() {
      console.log('连接错误')
      this.initWebSocket()
    },
    // 数据接收
    websocketonmessage(e) {
      const resdata = JSON.parse(e.data)
      console.log(resdata)
    },
    // 数据发送
    websocketsend(Data) {
      this.websock.send(Data)
    },
    // 关闭
    websocketclose(e) {
      console.log('WebSocket 断开连接', e)
    }
  }
}
</script>
<style lang=""></style>
