<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>

    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <slot name="sidebar-top" slot="top"/>
      <slot name="sidebar-bottom" slot="bottom"/>
    </Sidebar>

    <div class="custom-layout" v-if="$page.frontmatter.layout">
      <component :is="$page.frontmatter.layout"/>
    </div>

    <Home v-else-if="$page.frontmatter.home"/>

    <Page v-else :sidebar-items="sidebarItems">
      <slot name="page-top" slot="top"/>
      <slot name="page-bottom" slot="bottom"/>
    </Page>

    <SWUpdatePopup :updateEvent="swUpdateEvent"/>

    <div v-show="isShowGotoTop" @click="goTop" class="goTop iconfont iconicon-test"></div>

  </div>
</template>

<script>
import Vue from "vue";
import nprogress from "nprogress";
import Home from "./components/Home.vue";
import TagsLayout from "./components/TagsLayout.vue";
import Navbar from "./components/Navbar.vue";
import Page from "./components/Page.vue";
import Sidebar from "./components/Sidebar.vue";
import SWUpdatePopup from "./components/SWUpdatePopup.vue";
import { resolveSidebarItems } from "./util/util";
export default {
  components: { Home, Page, Sidebar, Navbar, SWUpdatePopup, TagsLayout},

  data() {
    return {
      scrollTop: 0,
      isSidebarOpen: false,
      swUpdateEvent: null
    };
  },
  watch: {
    scrollTop: {
      handler(val) {
        var top = 100; // about 的margin
        var len = document.querySelectorAll(".article-card").length;
        document.querySelectorAll(".article-card").forEach(e => {
          top += e.offsetHeight;
        });
        top += len * 20; // length * margin
        if (val >= top && document.querySelector(".categories")
&& !(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
          document.querySelectorAll(".categories")[1].className += " ca-fixed";
        } else {
          if (document.querySelectorAll(".categories")[1])
            document.querySelectorAll(".categories")[1].className = "categories";
        }
      }
    }
  },
  computed: {
    isShowGotoTop() {
      return this.scrollTop < 500 ? false : true ;
    },
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.layout &&
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar
        },
        userPageClass
      ];
    }
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);

    // configure progress bar
    nprogress.configure({ showSpinner: false });

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start();
      }
      next();
    });

    this.$router.afterEach(() => {
      nprogress.done();
      this.isSidebarOpen = false;
    });

    this.$on("sw-updated", this.onSWUpdated);
  },

  methods: {
    goTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    onScroll() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },

    onSWUpdated(e) {
      this.swUpdateEvent = e;
    }
  }
};
</script>

<style src="./iconfont/iconfont.css"></style>
<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./styles/theme.styl" lang="stylus"></style>
<style lang="stylus">
.goTop {
  cursor: pointer;
  border-radius: 50%;
  position: fixed;
  right: 3%;
  bottom: 5%;
  font-size 30px
}
</style>
