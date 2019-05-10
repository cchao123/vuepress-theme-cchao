<template>
  <article-card>
    <div class="card-title" slot="card-title">
      Follow Me
    </div>
    <div class="card-content" slot="card-content">
      <div>知乎</div>
      <div>思否</div>
      <div>掘金</div>
      <div>GIthub</div>
    </div>
  </article-card>
</template>

<script>
import ArticleCard from './ArticleCard.vue'
export default {
  components: { ArticleCard }
}
</script>
<style lang="stylus">

</style>