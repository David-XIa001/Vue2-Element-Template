<template lang="">
  <div ref="container" class="map-container" />
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'AMap',
  data() {
    return {
      AMap: null
    }
  },
  created() {
    AMapLoader.load({
      key: 'e703e68013cb6170648e218245849c87', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        this.$nextTick(() => this.initMap(AMap))
      })
      .catch((e) => {
        console.error(e)
      })
  },
  methods: {
    initMap(AMap) {
      this.AMap = AMap
      // 使用 $refs 获取节点
      this.map = new AMap.Map(this.$refs.container)
      // this.map.setMapStyle('amap://styles/darkblue')
      this.map.setZoom(3)
      const positions = [
        [116, 39],
        [116, 40],
        [117, 39]
      ]
      const marker = []
      for (let i = 0; i < positions.length; i++) {
        const markItem = new AMap.Marker({
          position: positions[i] // 位置
        })
        markItem.on('mouseover', this.showInfoOver)
        markItem.on('mouseout', this.showInfoOut)
        marker.push(markItem)
      }
      this.map.add(marker) // 添加到地图
    },
    showInfoOver(e) {
      var info = []
      var cn = "<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> "
      info.push(cn)
      this.infoWindow = new this.AMap.InfoWindow({
        isCustom: true, // 使用自定义窗体
        content: info.join('<br/>'),
        offset: new this.AMap.Pixel(16, -45)
      })
      this.infoWindow.open(this.map, [e.lnglat.lng, e.lnglat.lat])
      console.log('鼠标移入覆盖物！ =')
    },
    showInfoOut(e) {
      this.infoWindow.close()
      console.log('鼠标移出覆盖物！ =')
    },
    // 关闭信息窗体
    closeInfoWindow() {
      this.map.clearInfoWindow()
    }
  }
}
</script>
<style lang="scss">
.map-container {
  width: 100%;
  height: 100%;
  cursor: pointer !important;
}
</style>
