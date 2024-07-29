const LifeManager = {
    path: "/LifeManager",
    children: [
        {
            path: "Maintenance",
            component: () => import("@/views/background/LifeManager/LifeManager.vue"),
            meta: { title: "报修管理" }
        },
        {
            path: "leave",
            component: () => import("@/views/background/LifeManager/food/food.vue"),
            meta: { title: "请假管理" }
        },
        {
            path: "CalendarManagement",
            component: () => import("@/views/background/LifeManager/food/food.vue"),
            meta: { title: "校历管理" }
        }
    ]
}
export default LifeManager