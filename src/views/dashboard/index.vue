<template>
  <div class="dashboard-container">
    <PanelGroup @handleSetLineChartData="handleSetLineChartData" />
    <Content />
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInfo } from '@/api/user'
import PanelGroup from './components/PanelGroup'
import Content from './components/content'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'Dashboard',
  components: { PanelGroup, Content },
  computed: {
    ...mapGetters(['name'])
  },
  data() {
    return {
      lineChartData: lineChartData['newVisitis']
    }
  },
  mounted() {
    getInfo().then((res) => {
      console.log('res =', res)
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
