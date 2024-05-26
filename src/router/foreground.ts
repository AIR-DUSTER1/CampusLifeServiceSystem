const foreground = {
    path: "/foreground",
    component: () => import("@/views/foreground/foreground.vue"),
    redirect: "/foreground/index",
    children: [
        {
            path: "index",
            component: () => import("@/views/foreground/home/index.vue"),
            meta: { title: "飞鸟智慧校园生活服务平台" }
        },
        {
            path: 'MoreActicles',
            component: () => import("@/views/foreground/MoreArticle/MoreArticle.vue"),
            meta: { title: "更多新闻" },
        },
        {
            path: 'acticle',
            component: () => import("@/views/foreground/article/article.vue"),
            meta: { title: "文章页" }
        },
        {
            path: 'CampusService',
            children: [
                {
                    path: "calendar",
                    component: () => import("@/views/foreground/calendar/calendar.vue"),
                }
            ],
            meta: { title: '校历' }
        },
        {
            path: "LifeService",
            children: [
                {
                    path: "maintenance",
                    component: () => import("@/views/foreground/maintenance/index.vue"),
                    children: [
                        {
                            path: "index",
                            component: () => import("@/views/foreground/maintenance/maintenance.vue"),
                            meta: { title: "报修" }
                        },
                        {
                            path: "apply",
                            component: () => import("@/views/foreground/maintenance/apply.vue"),
                            meta: { title: "报修申请" }
                        },
                        {
                            path: "myapply",
                            component: () => import("@/views/foreground/maintenance/MyApply.vue"),
                            meta: { title: "我的报修" }
                        }
                    ],
                },
                {
                    path: "lostAndFound",
                    component: () => import("@/views/foreground/lostAndFound/index.vue"),
                    meta: { title: "失物招领" }
                },
            ]
        },
        {
            path: "HealthyLife/HealthyAi",
            component: () => import("@/views/foreground/HealthyLife/HealthyAi/Ai.vue"),
            meta: { title: "健康助手" }
        }
    ]
}
export default foreground