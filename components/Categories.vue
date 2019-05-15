<template>
  <div class="categories" v-if="categories.lenght || this.$page.headers">
    <div class="atc-title" v-if="categories.lenght">Categories</div>
    <div v-if="categories.length">
      <ul class="sidebar-links">
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
    <div v-else>
      <ul class="sidebar-links else">
        <li v-for="item in $page.headers">
          <a v-if="item.level ==2" :href="$page.path + '#' +item.title">{{ item.title }}</a>
          <ul class="sidebar-sub-headers" v-else>
            <li class="sidebar-sub-header">
              <a :href="$page.path + '#' +item.title">{{ item.title }}</a>
            </li>
            <li/>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink.vue";
import SidebarGroup from "./SidebarGroup.vue";

export default {
  data() {
    return {
      openGroupIndex: 0
    };
  },
  props: ["categories"],
  components: { SidebarLink, SidebarGroup }
};
</script>

<style lang="stylus">
@import './../styles/config.styl';

.ca-fixed {
  position: fixed;
  top: $navbarHeight;
  margin-top: 20px;
  width: 260px;
  padding: 20px;
}

ul, ol {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

a {
  display: inline-block;
}

.nav-links {
  display: none;
  .nav-item, .repo-link {
    display: block;
    line-height: 1.25rem;
    font-size: 1.1em;
    padding: 0.5rem 0 0.5rem 1.5rem;
  }
}

.sidebar-links {
  position relative;
  // padding: 1.5rem 0;
  padding: 0;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 7px;
    bottom: 0;
    width: 2px;
    background-color: #ebedef;
    opacity: .5;
  }
  a {
    position relative;
    color #2c3e50
    padding 0.35rem 1rem 0.35rem 1.25rem
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 1px;
      margin-top: -5px;
      width: 6px;
      height: 6px;
      background-color: currentColor;
      border-radius: 50%;
    }
  }
}

.else {
  a {
    left 4px
  }
}
.sidebar-sub-header {
  a {
    &:before {
      width 4px
      height 4px
    }
  }
}

.atc-title {
  border-left: 5px solid red;
  padding-left: 5px;
}

.categories {
  background: #fff;
  // position -webkit-sticky
  // position sticky
  // top 0
  padding: 20px;
}

</style>
