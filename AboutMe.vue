<template>
  <article-card style="margin-top: 100px">
    <div slot="card-content">
      <div class="author">
        <img
          class="author-head"
          src="https://mllj2j8xvfl0.i.optimole.com/w:180/h:180/q:90/https://s20206.pcdn.co/wp-content/uploads/sites/60/2015/11/black-and-white-man-person-musician.jpg"
          alt
        >
        <div class="card-title" slot="card-title">About Me</div>
      </div>
    </div>
  </article-card>
</template>

<script>
import ArticleCard from "./ArticleCard.vue";

export default {
  components: { ArticleCard }
};
</script>

<style lang="stylus" scoped>
.author {
  .author-head {
    transition: 0.5s;
    display: table;
    margin: -120px auto 30px;
    padding: 5px;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    background-color: #fff;

    &:hover {
      transform: rotate(360deg);
    }
  }
}

.atc-title {
  border-left: 5px solid red;
  padding-left: 5px;
}
</style>