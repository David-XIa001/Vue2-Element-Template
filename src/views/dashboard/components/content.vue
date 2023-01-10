<template lang="">
  <el-row class="dash">
    <el-col :lg="6" class="dash-col">
      <div class="left">
        <div class="top">
          <div class="title">电量统计</div>
          <div class="content1">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="card"
            >
              <svg-icon
                icon-class="peoples"
                class-name="card-panel-icon card-icon"
              />
              <div class="card-content">
                <div class="card-num">{{ item.power }}</div>
                <div class="card-dis">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="title">充电电量</div>
          <div class="content">
            <BarChart />
          </div>
        </div>
      </div></el-col>
    <el-col :lg="12" class="dash-col">
      <div class="main">
        <AMap />
      </div>
    </el-col>
    <el-col :lg="6" class="dash-col">
      <div class="right">
        <div class="top">
          <div class="title">充电设备使用情况</div>
          <div class="content1">
            <div
              v-for="(item, index) in stateList"
              :key="index"
              class="card"
            >
              <svg-icon
                icon-class="peoples"
                class-name="card-panel-icon card-icon"
              />
              <div class="card-content">
                <div class="card-num">{{ item.power }}</div>
                <div class="card-dis">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="title">充电负荷曲线</div>
          <div class="content">
            <LineChart />
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import AMap from '@/components/Amap'
import LineChart from './LineChart'
import BarChart from './BarChart'

export default {
  components: { LineChart, AMap, BarChart },
  data() {
    return {
      list: [
        { title: '本周充电量', power: '224MWH' },
        { title: '本月充电量', power: '10220MWH' },
        { title: '周同比', power: '25%' },
        { title: '月同比', power: '16%' }
      ],
      stateList: [
        { title: '正在充电', power: '120' },
        { title: '空闲桩', power: '100' },
        { title: '异常桩', power: '20' },
        { title: '使用率', power: '50%' }
      ]
    }
  }
}
</script>
<style lang="scss">
.dash {
  height: 500px;
  overflow: hidden;
  .dash-col {
    height: 100%;
  }
  .left,
  .right {
    height: 100%;
    .top,
    .bottom {
      height: 245px;
      background: #fff;
      margin-bottom: 10px;
      display: flex;
      padding: 5px 10px;
      flex-direction: column;
      .title {
        height: 14px;
        color: rgba(0, 0, 0, 0.45);

        margin-bottom: 10px;
      }
      .content1 {
        flex-grow: 1;
        display: grid;
        grid-template-columns: 135px 135px;
        grid-gap: 10px;
        grid-template-rows: 100px 100px;
        .card {
          color: rgba(0, 0, 0, 0.85);

          display: flex;
          align-items: center;
          justify-content: space-around;
        }
      }
    }
    .bottom {
      height: 245px;
      background: #fff;
      .content {
        flex-grow: 1;
      }
    }
  }
  .left {
    margin-right: 5px;
  }
  .right {
    margin-left: 5px;
  }
  .main {
    height: 100%;
    margin: 0 5px;
    background: #fff;
  }
}
</style>
