const LifeManager = {
    path: "LifeManager",
    children: [
        {
            path: "Repairs",
            name: 'Repairs',
            component: () => import("@/views/background/Repairs/Repairs.vue"),
            meta: { title: "报修管理" }
        },
        {
            path: "leave",
            name: 'leave',
            component: () => import("@/views/background/Leave/Leave.vue"),
            meta: { title: "请假管理" }
        },
        {
            path: "Calendar",
            name: 'Calendar',
            component: () => import("@/views/background/Calendar/Calendar.vue"),
            meta: { title: "校历管理" }
        }
    ]
}
export default LifeManager