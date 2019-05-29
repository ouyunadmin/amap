<template>
  <div class="amap">
    <!-- id="id-demo" -->
    <div  class="warp">
      <!-- :vid="amapDemo" 地图显示区域 -->
    </div>
    <el-amap
      class="amap-demo" 
      ref="mapDom"
      :vid="amapDemo" 
      :center="center" 
      :zoom="zoom" 
      :zooms="zooms"
      :events="events"
      :plugin="plugin"
    ></el-amap>
    <div>
      <button @click="onClick">get map</button>
      <!-- <button type="button" name="button" v-on:click="toggleVisible">toggle first marker</button> -->
    </div>
  </div>
</template>

<script>
// NPM 方式
import { AMapManager } from 'vue-amap'
// CDN 方式
// let amapManager = new VueAMap.AMapManager()
export default {
  name: 'amapTemp',
  data () {
    return {
      AMapManager,
      // amapManager,
      amapDemo: 'id-demo',
      initCoolng: 120.22187,
      initCoolat: 30.25385,
      center: [], // 初始化坐标: 经度、纬度
      zoom: 11, // 默认缩放级别
      zooms: [8, 18], // 缩放范围，数字越大缩放越小，PC:3-18, SJ:3-19
      events: {
        click(e) {
          console.log('点击')
        },
        init(map) {
          AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
            const marker = new SimpleMarker({ // 定位图标
              iconLabel: 'A',
              iconStyle: 'red',
              map: map,
              position: map.getCenter()
            })
          })
        }
      },
      plugin: ['ToolBar', { // amap自带插件
        pName: 'MapType',
        defaultType: 0,
        // enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        // timeout: 100,             // 超过10秒后停止定位，默认：无穷大
        // maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
        // convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        // showButton: true,         // 显示定位按钮，默认：true
        // buttonPosition: 'RB',     // 定位按钮停靠位置，默认：'LB'，左下角
        // showMarker: true,         // 定位成功后在定位到的位置显示点标记，默认：true
        // showCircle: true,         // 定位成功后用圆圈表示定位精度范围，默认：true
        // panToLocation: true,      // 定位成功后将定位到的位置作为地图中心点，默认：true
        // zoomToAccuracy:true,      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
        // extensions:'all',
        events: {
          init(o) {
            console.log(o)
            // console.log(this.$refs.mapDom.$$getInstance())
            // o 是高德地图定位插件实例
            // o.getCurrentPosition((status, result) => {
            //   console.log(result)
            //   if (result && result.position) {
            //     self.lng = result.position.lng
            //     self.lat = result.position.lat
            //     self.center = [self.lng, self.lat]
            //     self.loaded = true
            //     self.$nextTick()
            //   }
            // })
          },
        }
      }]
    }
  },
  mounted() {
    const data = this.bd_decrypt(this.initCoolng, this.initCoolat)
    let arr = []
    for(var key in data){
      arr.push(data[key])
    }
    this.center = arr
  },
  methods: {
    onClick() {
      console.log(AMapManager)
      // amap vue component
      // console.log(amapManager._componentMap)
      // gaode map instance
      // console.log(amapManager._map)
    },
    // 百度坐标转高德坐标
    bd_decrypt(bd_lng, bd_lat) {
      var X_PI = Math.PI * 3000.0 / 180.0
      var x = bd_lng - 0.0065
      var y = bd_lat - 0.006
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI)
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI)
      var gg_lng = z * Math.cos(theta)
      var gg_lat = z * Math.sin(theta)
      return {lng: gg_lng, lat: gg_lat}
    },
    // 高德坐标转百度坐标
    bd_encrypt(gg_lng, gg_lat) {
      var X_PI = Math.PI * 3000.0 / 180.0
      var x = gg_lng, y = gg_lat
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
      var bd_lng = z * Math.cos(theta) + 0.0065
      var bd_lat = z * Math.sin(theta) + 0.006
      return {
        bd_lng: bd_lng,
        bd_lat: bd_lat
      }
    }
  }
}
</script>

<style>
.amap *{padding: 0;margin: 0;}
.amap{
  height: calc(100vh - 100px);
}
.warp{
  width: 1100px;
  height: 700px;
}
</style>
