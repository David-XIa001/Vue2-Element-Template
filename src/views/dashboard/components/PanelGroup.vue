<template>
  <el-row :gutter="10" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="body">
          <div class="title">总充电量</div>
          <count-to
            :start-val="0"
            :end-val="13600"
            :duration="3600"
            class="num"
          />
          <div class="percentage">
            周同比 12% <span class="el-icon-caret-top red" /> 日同比 11%
            <span class="el-icon-caret-bottom green" />
          </div>
        </div>
        <div class="footer">
          日充电量 <count-to :start-val="0" :end-val="12423" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="body">
          <div class="title">用户数</div>
          <count-to
            :start-val="0"
            :end-val="16385850"
            :duration="3600"
            class="num"
          />
          <LineChartUser class="ml25" />
        </div>
        <div class="footer">
          当日注册用户
          <count-to :start-val="0" :end-val="1223" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="body">
          <div class="title">订单数</div>
          <count-to
            :start-val="0"
            :end-val="95650"
            :duration="3600"
            class="num"
          />
          <BarChartOrder class="ml25" />
        </div>
        <div class="footer">
          当日订单 <count-to :start-val="0" :end-val="123" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="body">
          <div class="title">充电桩平均负载</div>
          <div class="num">78%</div>
          <el-progress style="marginTop: 20px" :percentage="80" :show-text="false" status="success" />
        </div>
        <div class="footer">
          <div class="percentage">
            周同比 12% <span class="el-icon-caret-top red" /> 日同比 11%
            <span class="el-icon-caret-bottom green" />
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import LineChartUser from './LineChartUser'
import BarChartOrder from './BarChartOrder'

export default {
  components: {
    CountTo,
    LineChartUser,
    BarChartOrder
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 10px;
  }
  .card-panel {
    height: 184px;
    padding: 15px 15px 10px;
    cursor: pointer;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .title {
      height: 22px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 22px;
    }
    .num {
      height: 38px;
      margin-top: 4px;
      margin-bottom: 0;
      overflow: hidden;
      color: rgba(0, 0, 0, 0.85);
      font-size: 30px;
      line-height: 38px;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .ml25{
      margin-left: -25px;
    }
    .percentage {
      margin-top: 15px;
      .red {
        color: red;
      }
      .green {
        color: green;
      }
    }
    .footer {
      height: 32px;
      padding-top: 16px;
      position: relative;
      .percentage{
      margin-top: 0px;
      }
      &::before {
        position: absolute;
        width: 100%;
        height: 1px;
        top: 0px;
        content: "";
        background-color: #ccc;
      }
    }
  }
}
</style>
