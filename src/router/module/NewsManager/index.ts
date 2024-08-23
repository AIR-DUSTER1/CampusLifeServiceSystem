export const NewsManager = {
    path: "NewsManager",
    name: 'NewsManager',
    component: () => import("@/views/background/NewsManager/NewsManager.vue"),
    meta: { title: "新闻管理" }
}
export const NewsEditor = {
    path: "NewsEditor",
    name: 'NewsEditor',
    component: () => import("@/views/background/NewsManager/NewsEditor.vue"),
    meta: { title: "新闻编辑" }
}