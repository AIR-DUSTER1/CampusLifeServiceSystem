const SystemManager = {
    path: 'SystemManager',
    children: [
        {
            path: "RoleManager",
            component: () => import("@/views/background/RoleManager/role.vue"),
            meta: { title: "角色管理" }
        },
        {
            path: 'StuinfoManager',
            component: () => import("@/views/background/StuinfoManager/Stuinfo.vue"),
            meta: { title: "用户管理" }
        },
        {
            path: 'StuinfoManager',
            component: () => import("@/views/background/StuinfoManager/Stuinfo.vue"),
            meta: { title: "菜单管理" }
        },
        {
            path: 'NoticeManager',
            component: () => import("@/views/background/StuinfoManager/Stuinfo.vue"),
            meta: { title: "通知管理" }
        },
        {
            path: 'SystemInformation',
            component: () => import("@/views/background/StuinfoManager/Stuinfo.vue"),
            meta: { title: "系统信息" }
        },
        {
            path: 'SystemInOption',
            component: () => import("@/views/background/StuinfoManager/Stuinfo.vue"),
            meta: { title: "系统设置" }
        },
        {
            path: 'LogManagement',
            component: () => import("@/views/background/StuinfoManager/Stuinfo.vue"),
            meta: { title: "日志管理" }
        }
    ],
    meta: { title: "系统管理" }
}
export default SystemManager