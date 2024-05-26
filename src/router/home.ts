
const home = {
    path: "/home",
    children: [
        {
            path: '/home',
            redirect: '/home/login',
        },
        {
            path: "login",
            component: () => import("@/views/home/login/login.vue"),
            meta: { title: "登录" }
        },
        {
            path: "register",
            component: () => import("@/views/home/register/register.vue"),
            meta: { title: "注册" }
        },
        {
            path: "forgotPassword",
            component: () => import("@/views/home/ForgotPassword/ForgotPassword.vue"),
            meta: { title: "忘记密码" }
        }
    ],
    component: () => import("@/views/home/index.vue")
}
export default home