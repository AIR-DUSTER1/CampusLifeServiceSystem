const NewsManager = {
    path: "/NewsManager",
    component: () => import("@/views/background/NewsManager/NewsManager.vue"),
    meta: { title: "新闻管理" }
}
export default NewsManager