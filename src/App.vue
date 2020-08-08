<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <AnchoredHeading1 :level='1'>hello world</AnchoredHeading1>
    <AnchoredHeading2 :level='2'>hello world</AnchoredHeading2>
    <AnchoredHeading3 :level='3'>hello world</AnchoredHeading3>
    <VNodes :vnodes="getHeading(4)"></VNodes>
    <VNodes :vnodes="getJSXspan()"></VNodes>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AnchoredHeading1 from './components/AnchoredHeading.vue'
import AnchoredHeading2 from './components/AnchoredHeading.js'
import AnchoredHeading3 from './components/AnchoredHeading.jsx'
export default {
  name: 'App',
  components: {
    HelloWorld,
    AnchoredHeading1,
    AnchoredHeading2,
    AnchoredHeading3,
    VNodes: {
      functional:true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  data() {
    return {
      msg: 'hello world'
    }
  },
  methods: {
    getHeading(level) {
      const Tag = `h${level}`
      return <Tag>hello world</Tag>
    },
    getJSXspan() {
      return <span>{this.msg}</span>
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
