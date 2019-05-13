<template>
  <div class="article-wrap">
    <div class="article-flow">
      <!-- <div style="position:">#TAGS</div> -->
      <template v-for="item in currentPost">
        <template>
          <div v-if="item.frontmatter.headimg" class="article-headimg" :style="{backgroundImage: `url(${item.frontmatter.headimg})`}"></div>
          <div class="article-item">
            <h3 class="article-title">
              <router-link :to="item.frontmatter.link || item.path">{{ item.title }}</router-link>
            </h3>
            <div class="article-date">
              <i class="iconfont iconrili"></i>
              {{ item.frontmatter.date || item.lastUpdated | formatTime('yyyy-MM-dd') }}
              <template
                class="article-tag"
                v-if="item.frontmatter.tags"
              >
                <span v-for="tag in item.frontmatter.tags">/ {{ tag }}</span>
              </template>
            </div>
            <div class="article-description">{{ item.frontmatter.description }}</div>
            <!-- <div class="article-tag" v-if="item.frontmatter.tags">
          <span v-for="tag in item.frontmatter.tags">{{ tag }}</span>
            </div>-->
            <div class="article-more">READ MORE</div>
          </div>
        </template>
      </template>

      <!-- 文章主题 -->
      <slot name="content"></slot>
      <!-- 分页器 -->
      <Pagination
        v-if="posts.length"
        :currentPage="currentPage"
        :total="total"
        :pageSize="pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 侧边栏 -->
    <div class="article-aside">
      <!-- 关于作者 -->
      <AboutMe :tagsNum="tags.length" :postsNum="postsArr.length"/>
      <!-- <FollowMe/> -->
      <!-- 标签分类 -->
      <Tags :tags="tags" @tag-fillter="tagFillter" />
      <Search/>

      <Categories :categories="sidebarItems"/>
      <!-- <Sidebar /> -->
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import AboutMe from "./AboutMe.vue";
import Categories from "./Categories.vue";
import Tags from "./Tags.vue";
import Search from "./Search.vue";

import FollowMe from "./FollowMe.vue";
import { formatTime } from "./../util/date.js";
import { resolveSidebarItems } from "./../util/util";

export default {
  components: {
    Pagination,
    AboutMe,
    Categories,
    Tags,
    FollowMe,
    Search
  },

  filters: {
    formatTime(time, format) {
      return formatTime(time, format);
    }
  },
  data() {
    return {
      tags: [],
      postsArr: [], // 文章列表
      currentPage: 1,
      pageSize: 3
    };
  },
  computed: {
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      );
    },
    total() {
      return this.postsArr.length;
    },
    currentPost() {
      return this.postsArr.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  props: {
    posts: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    // 标签筛选
    tagFillter (tagItem) {
      this.postsArr = []
      if (!tagItem) {
        this.posts.map((postItem, ind) => {
          if (/posts/.test(postItem.path)) {
            this.postsArr.push(postItem)
          }
        });
        return false
      }
      this.postsArr = []
      this.posts.map((postItem, ind) => {
        if (/posts/.test(postItem.path) && postItem.frontmatter.tags) {
          if (postItem.frontmatter.tags.indexOf(tagItem) != -1) {
            this.postsArr.push(postItem)
          }
        }
      });
    },
    // 收集文章并
    getPosts() {
      this.posts.map((postItem, ind) => {
        if (/posts/.test(postItem.path)) {
          // 收集标签
          if (postItem.frontmatter.tags) {
            postItem.frontmatter.tags.map(tagItem => {
              if (this.tags.indexOf(tagItem) == -1) this.tags.push(tagItem);
            });
          }
          this.postsArr.push(postItem);
          // TODO 添加一个排序 时间 or hot值
          // console.log(postItem.lastUpdated)
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>

<style lang="stylus">
@import './../styles/config.styl';

.content {
  background: #fff;
  border-radius: 8px;
}

.article-wrap {
  padding: $navbarHeight 0rem 0;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;

  .article-flow {
    position: relative;
    flex: 1;
    width: 100%;

    .article-headimg {
      background-color #959dae
      widht: 100%;
      height: 15rem;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background-size: cover;
      background-position: center center;
    }

    .article-item {
      background: #fff;
      margin-bottom: 20px;
      padding: 20px 30px;
      border-radius: 8px;
      transition: 0.5s;
      box-shadow: 5px 5px 10px rgb(224, 246, 249);

      .article-title {
        a {
          transition: 0.5s;
          font-size: 20px;
          color: #262626;

          &:hover {
            color: #b09dae;
          }
        }
      }
    }
  }

  .article-aside {
    margin-bottom: 20px;
    width: 300px;
    margin-left: 20px;
  }

  .article-date {
    font-size: 14px;
    color: #565656;
    cursor: pointer;
  }

  .article-description {
    line-height: 30px;
    margin: 16px 0;
    font-size: 16px;
    color: #393939;
    color: #656565;
    font-size: 14px;
    // color: #976666;
  }

  .article-more {
    font-size: 12px;
    cursor: pointer;
    transition: 0.5s;
    border: 1px solid #959dae;
    color: #959dae;
    padding: 2px 0;
    width: 7em;
    text-align: center;

    &:hover {
      background: #959dae;
      color: #fff;
    }
  }

  .article-tag {
    span {
      transition: 0.3s;
      font-size: 14px;
      background: #e0e0e0;
      color: #333333;
      padding: 2px 5px;
      margin-right: 5px;

      &:hover {
        background: #a161bf;
        color: #fff;
      }
    }
  }
}

@media (max-width: $MQNarrow) {
  .article-aside {
    display: none;
  }

  .article-wrap {
    margin-top: 0;
  }
}

@media (max-width: $MQNarrow) and (min-width: $MQMobile) {
  .article-aside {
    display: none;
  }
}
</style>
