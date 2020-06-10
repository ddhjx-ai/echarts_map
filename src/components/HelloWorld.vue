<template>
  <div class="hello">
    <!-- 初始化echarts需要一个有固定宽高的盒子 -->
    <div ref="mapBox" style="height:600px;width:800px;"></div>
  </div>
</template>

<script>
import jsonp from "jsonp";
import echarts from "echarts";
// 引入中国地图
import "echarts/map/js/china.js";
// 注册地图
const option = {
  title: {
    text: "中国疫情地图",
    link: "http://www.baidu.com",
    subtext: "测试",
    sublink: "http://www.baidu.com"
  },
  series: [
    {
      name: '确诊人数',
      type: "map", // 渲染地图
      map: "china", // 渲染中国地图
      label: {
        // 显示对应地区的地名
        show: true,
        color: "red",
        fontSize: 10
      },
      itemStyle: {
        // 控制地图每个区域
      },
      emphasis: {
        // 控制当前hover状态下的区域
        label: {
          // 当前区域字体
          color: "#fff",
          fontSize: 12
        },
        itemStyle: {
          // 当前区域
          areaColor: "#835b7a"
        }
      },
      roam: true,     // 可以通过鼠标滚轮放大缩小和拖拽图片
      zoom: 1.2, // 地图放大的倍数
      data: [
        // 用来展示后台请求的数据,{name:xxx, value:xxx}
      ]
    }
  ],
  visualMap: [
    {
      // 分段
      type: "piecewise", // 分段型
      show: true,
      splitNumber: 5, // 数据被分为多少段
      pieces: [
        // 指定每一段的范围
        { min: 10000 },
        { min: 1000, max: 9999 },
        { min: 100, max: 999 },
        { min: 10, max: 99 },
        { min: 0, max: 9 }
      ],
      // align: 'right',   // 图形和文字的拜访关系，默认left
      orient: "vertical", //放置 visualMap 组件，水平（'horizontal'）或者竖直（'vertical'）
      // left/right   控制分段的位置
      inRange: {
        // 定义 在选中范围中 的视觉元素
        color: ["#ffc0b1", "#9c0505"]
      }
    }
  ],
  toolbox: {    // 下载数据图
    show: true,
    orient: "vertical",
    left: "right",
    top: "center",
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  tooltip: {
    trigger: 'item'
  }
};
export default {
  name: "HelloWorld",
  mounted() {
    this.getData();
    this.myChart = echarts.init(this.$refs.mapBox);
    this.myChart.setOption(option);
  },
  methods: {
    getData() {
      jsonp(
        "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427",
        {},
        (err, data) => {
          if (!err) {
            console.log(data);
            let list = data.data.list.map(item => {
              return {
                name: item.name,
                value: item.value
              };
            });
            option.series[0].data = list;
            this.myChart.setOption(option);
          }
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
