"use strict";
const common_vendor = require("../../common/vendor.js");
const api_activity = require("../../api/activity.js");
const data_home = require("../../data/home.js");
const SearchBar = () => "./components/SearchBar.js";
const BannerSwiper = () => "./components/BannerSwiper.js";
const QuickEntry = () => "./components/QuickEntry.js";
const SectionTitle = () => "./components/SectionTitle.js";
const ActivityCard = () => "./components/ActivityCard.js";
const _sfc_main = {
  components: {
    SearchBar,
    BannerSwiper,
    QuickEntry,
    SectionTitle,
    ActivityCard
  },
  data() {
    return {
      banners: [],
      quickEntries: [],
      activities: [],
      loading: false,
      hasMore: true,
      page: 1,
      pageSize: 10
    };
  },
  onLoad() {
    this.loadHomeData();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.hasMore = true;
    this.loadHomeData().then(() => {
      common_vendor.index.stopPullDownRefresh();
    });
  },
  onReachBottom() {
    if (this.hasMore && !this.loading) {
      this.loadMoreActivities();
    }
  },
  methods: {
    // 加载首页数据
    async loadHomeData() {
      try {
        this.loading = true;
        try {
          const res = await api_activity.getHomeData();
          if (res.code === 200) {
            this.banners = res.data.banners || [];
            this.quickEntries = res.data.quickEntries || [];
            this.activities = res.data.activities || [];
            this.hasMore = res.data.hasMore || false;
          }
        } catch (apiError) {
          common_vendor.index.__f__("log", "at pages/index/index.vue:131", "使用本地数据:", apiError);
          this.banners = data_home.homeData.banners;
          this.quickEntries = data_home.homeData.quickEntries;
          this.activities = data_home.homeData.activities;
          this.hasMore = data_home.homeData.hasMore;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:138", "加载首页数据失败:", error);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    },
    // 加载更多活动
    async loadMoreActivities() {
      if (this.loading || !this.hasMore)
        return;
      try {
        this.loading = true;
        this.page++;
        const res = await api_activity.getActivities({
          page: this.page,
          pageSize: this.pageSize
        });
        if (res.code === 200) {
          this.activities = [...this.activities, ...res.data.list];
          this.hasMore = res.data.hasMore;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:166", "加载更多失败:", error);
        this.page--;
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    },
    // 搜索
    handleSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    },
    // 横幅点击
    handleBannerClick({ banner }) {
      if (banner.link) {
        common_vendor.index.navigateTo({
          url: banner.link
        });
      }
    },
    // 快捷入口点击
    handleEntryClick(entry) {
      if (entry.path) {
        common_vendor.index.navigateTo({
          url: entry.path
        });
      }
    },
    // 查看更多活动
    handleMoreActivities() {
      common_vendor.index.navigateTo({
        url: "/pages/activity/list"
      });
    },
    // 活动详情
    handleActivityDetail(activity) {
      common_vendor.index.navigateTo({
        url: `/pages/activity/detail?id=${activity.id}`
      });
    },
    // 报名活动
    async handleJoinActivity(activity) {
      if (activity.status === "ended") {
        common_vendor.index.showToast({
          title: "活动已结束",
          icon: "none"
        });
        return;
      }
      try {
        const res = await api_activity.joinActivity(activity.id);
        if (res.code === 200) {
          common_vendor.index.showToast({
            title: "报名成功",
            icon: "success"
          });
          this.loadHomeData();
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: error.message || "报名失败",
          icon: "none"
        });
      }
    }
  }
};
if (!Array) {
  const _component_SearchBar = common_vendor.resolveComponent("SearchBar");
  const _component_BannerSwiper = common_vendor.resolveComponent("BannerSwiper");
  const _component_QuickEntry = common_vendor.resolveComponent("QuickEntry");
  const _component_SectionTitle = common_vendor.resolveComponent("SectionTitle");
  const _component_ActivityCard = common_vendor.resolveComponent("ActivityCard");
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  (_component_SearchBar + _component_BannerSwiper + _component_QuickEntry + _component_SectionTitle + _component_ActivityCard + _component_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.handleSearch),
    b: common_vendor.p({
      placeholder: "Search"
    }),
    c: $data.banners.length > 0
  }, $data.banners.length > 0 ? {
    d: common_vendor.o($options.handleBannerClick),
    e: common_vendor.p({
      banners: $data.banners
    })
  } : {}, {
    f: $data.quickEntries.length > 0
  }, $data.quickEntries.length > 0 ? {
    g: common_vendor.o($options.handleEntryClick),
    h: common_vendor.p({
      entries: $data.quickEntries
    })
  } : {}, {
    i: common_vendor.o($options.handleMoreActivities),
    j: common_vendor.p({
      title: "活动",
      subtitle: "再想个名字",
      ["show-arrow"]: true
    }),
    k: common_vendor.f($data.activities, (activity, k0, i0) => {
      return {
        a: activity.id,
        b: common_vendor.o($options.handleActivityDetail, activity.id),
        c: common_vendor.o($options.handleJoinActivity, activity.id),
        d: "1cf27b2a-4-" + i0,
        e: common_vendor.p({
          activity
        })
      };
    }),
    l: $data.hasMore && !$data.loading
  }, $data.hasMore && !$data.loading ? {
    m: common_vendor.o((...args) => $options.loadMoreActivities && $options.loadMoreActivities(...args))
  } : {}, {
    n: $data.loading
  }, $data.loading ? {
    o: common_vendor.p({
      status: "loading"
    })
  } : !$data.hasMore && $data.activities.length > 0 ? {} : {}, {
    p: !$data.hasMore && $data.activities.length > 0,
    q: !$data.loading && $data.activities.length === 0
  }, !$data.loading && $data.activities.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
