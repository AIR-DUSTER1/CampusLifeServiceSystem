
const home = {
    path: "/",
    children: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: "login",
            name: 'login',
            component: () => import("@/views/home/login/login.vue"),
            meta: { title: "登录" }
        },
        {
            path: "active",
            name: 'active',
            component: () => import("@/views/home/active/active.vue"),
            meta: { title: "注册" }
        },
        {
            path: "forgotPassword",
            name: 'forgotPassword',
            component: () => import("@/views/home/ForgotPassword/ForgotPassword.vue"),
            meta: { title: "忘记密码" }
        }
    ],
    component: () => import("@/views/home/index.vue")
}
export default home