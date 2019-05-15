<template>
  <article-card>
    <div class="card-title" slot="card-title">
      <span>TAGS </span>
      <!-- <i v-show="this.tagItem !== ''" class="iconfont iconqinglihuancun" @click="clearTags"></i> -->
    </div>
    <div class="card-content tags-content" slot="card-content">
      <span :class="tagItem === item ? 'tags-item tags-active' : 'tags-item' " v-for="item in tags" @click="tagFillter(item)"># {{ item }}
        <i v-show="tagItem === item" @click.stop="clearTags">&times;</i>
      </span>
    </div>
  </article-card>
</template>

<script>
import ArticleCard from "./ArticleCard.vue";
import SearchBox from "./SearchBox.vue";

export default {
  props: {
    tags: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      tagItem: ''
    }
  },
  components: { ArticleCard, SearchBox },
  methods: {
    clearTags () {
      this.tagItem = ''
      this.$emit('tag-fillter', null)
    },
    tagFillter (item) {
      this.tagItem = item
      this.$emit('tag-fillter', item)
    }
  },
};
</script>
<style lang="stylus">
.iconqinglihuancun
  cursor pointer
  font-size 20px!important

.tags-content
  cursor pointer
  display flex
  flex-wrap wrap
  justify-content space-between
  // justify-content space-around
  justify-content space-around
  .tags-item
    position relative
    font-size 12px
    color #fff
    margin 5px
    padding 3px 5px
    background-color rgb(44,62,80)
    background-color rgb(170, 170, 170)
    transition .5s
    border-radius 3px
    i
      position absolute
      font-size 14px
      right -5px
      top -5px
      width 12px
      height 12px
      border-radius 50%
      text-align center
      line-height 12px
      background-color rgb(44,62,80)
    &:hover
      background-color rgb(44,62,80)
  .tags-active
      background-color rgb(44,62,80)

</style>