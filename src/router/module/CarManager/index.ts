const CardManager = {
    path: 'CardManager',
    children: [
        {
            path: 'CardManagement',
            name: 'CardManagement',
            component: () => import('@/views/background/CardManagement/CardManagement.vue'),
            meta: { title: '账户管理' }
        },
        {
            path: 'OrdersManagement',
            name: 'OrdersManagement',
            component: () => import('@/views/background/OrdersManagement/OrdersManagement.vue'),
            meta: { title: '订单管理' }
        },
    ],
    redirect: '/background/SystemManager/CardManagement',
    meta: { title: '一卡通' }
}
export default CardManager