<template>
  <div class="categories" v-if="categories.lenght || this.$page.headers">
    <div class="atc-title">
      Categories
    </div>
    <div>
    <ul class="aaa">
      <li v-for="item in $page.headers">
        <a v-if="item.level ==2" :href="$page.path + '#' +item.title">{{ item.title }}</a>
        <ol v-else>
          <li><a :href="$page.path + '#' +item.title">{{ item.title }}</a><li/>
        </ol>
      </li>
    </ul>
    </div>
    <div>
      <ul class="sidebar-links" v-if="categories.length">
      <li v-for="(item, i) in categories" :key="i">
        <SidebarGroup
          v-if="item.type === 'group'"
          :item="item"
          :first="i === 0"
          :open="i === openGroupIndex"
          :collapsable="item.collapsable || item.collapsible"
          @toggle="toggleGroup(i)"
        />
        <SidebarLink v-else :item="item"/>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import SidebarGroup from './SidebarGroup.vue'

export default {
  data () {
    return {
      openGroupIndex: 0
    }
  },
  props: ['categories'],
  components: { SidebarLink , SidebarGroup },
  mounted () {
    console.log(this.$page)
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'




.ca-fixed
  position fixed
  top $navbarHeight
  margin-top 20px
  width 260px
  padding 20px

ul, ol
  padding 0
  margin 0
  list-style-type none
a
  display inline-block
.nav-links
  display none
  // border-bottom 1px solid $borderColor
  // padding 0.5rem 0 0.75rem 0
  a
    font-weight 600
  .nav-item, .repo-link
    display block
    line-height 1.25rem
    font-size 1.1em
    padding 0.5rem 0 0.5rem 1.5rem
.sidebar-links
  padding 1.5rem 0

.atc-title
  border-left 5px solid red
  padding-left 5px
.categories
  background #fff
  // position -webkit-sticky
  // position sticky
  // top 0
  padding 20px

.aaa
  border-left 1px solid red
  ol
    border-left 1px solid red


</style>
