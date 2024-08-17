const NewsManager = {
    path: "NewsManager",
    name: 'NewsManager',
    component: () => import("@/views/background/NewsManager/NewsManager.vue"),
    meta: { title: "新闻管理" }
}
export default NewsManager