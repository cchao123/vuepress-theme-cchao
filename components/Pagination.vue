<template>
  <ul class="pagination-wrap">
    <!-- prev, pager, next -->
    <li @click="currentChange('prev')" class="iconfont iconhoutui"></li>
    <li class="pag-atcive" v-if="!total">{{ currentPage }}</li>
    <!-- <li v-else-if="total">123</li> -->
    <li :class="item === currentPage ? 'pag-atcive' :'da'" v-for="item in Math.ceil(total / pageSize)" :key="item" @click="currentChange(item)">{{ item }}</li>
    <li @click="currentChange('next')" class="iconfont iconqianjin"></li>
  </ul>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1 // 当前页码
    },
    total: {
      type: Number,
      default: 0 // 总条目数
    },
    pageSize: {
      type: Number,
      default: 3 // 一页几条
    }
  },
  data () {
    return {

    }
  },
  methods: {
    currentChange (item) {
      if (!isNaN(item)) this.$emit('current-change', item)
      var page = this.currentPage
      if (item === 'prev' && this.currentPage > 1) {
        this.$emit('current-change', --page)
      }
      if (item === 'next' && this.currentPage < Math.ceil(this.total / this.pageSize)) {
        this.$emit('current-change', ++page)
      }
    },
    pageTurning (item) {
      if (!isNaN(item)) this.currentPage = item

    }
  }
}
</script>

<style lang="stylus">
.pagination-wrap
  align-items center
  justify-content center
  list-style none
  display flex
  margin-bottom 20px
  border-radius 8px
  padding 5px 0
  li
    color #333
    cursor pointer
    background white
    align-items center
    justify-content center
    display flex
    margin 0 5px
    width 30px
    height 30px
    border-radius 8px
    // box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)
  .pag-atcive
    background #2c3e50
    color #fff
  .iconfont
    font-size 12px
    background rgba(0,0,0,0)
</style>