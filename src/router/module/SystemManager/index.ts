const SystemManager = {
    path: 'SystemManager',
    children: [
        {
            path: "RoleManager",
            name: 'RoleManager',
            component: () => import("@/views/background/RoleManager/RoleManager.vue"),
            meta: { title: "角色管理" }
        },
        {
            path: 'UserManager',
            name: 'UserManager',
            component: () => import("@/views/background/UserManager/UserManager.vue"),
            meta: { title: "用户管理" }
        },
        {
            path: 'MenuManager',
            name: 'MenuManager',
            component: () => import("@/views/background/MenuManager/MenuManager.vue"),
            meta: { title: "菜单管理" }
        },
        {
            path: 'NoticeManager',
            name: 'NoticeManager',
            component: () => import("@/views/background/NoticeManager/NoticeManager.vue"),
            meta: { title: "通知管理" }
        },
        {
            path: 'SystemMonitor',
            name: 'SystemMonitor',
            component: () => import("@/views/background/SystemMonitor/SystemMonitor.vue"),
            meta: { title: "系统监控" }
        },
        {
            path: 'SystemConfig',
            name: 'SystemConfig',
            component: () => import("@/views/background/SystemConfig/SystemConfig.vue"),
            meta: { title: "系统设置" }
        },
        {
            path: 'LogManager',
            name: 'LogManager',
            component: () => import("@/views/background/LogManager/LogManager.vue"),
            meta: { title: "日志管理" }
        }
    ],
    redirect: '/background/SystemManager/SystemConfig',
    meta: { title: "系统管理" }
}
export default SystemManager