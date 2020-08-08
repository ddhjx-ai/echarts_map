export default {
  props: {
    level: {
      type: Number,
      dafault: 1
    }
  },
  render(c) {
    return c(
      'h' + this.level,  // 标签名称
      this.$slots.dafault // 子元素数组
    )
  }
}