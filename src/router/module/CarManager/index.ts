const CarManager = {
    path: '/CarManager',
    children: [
        {
            path: 'MerchantManagement',
            component: () => import('@/views/background/CarManager/CarManager.vue'),
            meta: { title: '商户管理' }
        },
        {
            path: 'EquipmentManagement',
            component: () => import('@/views/background/CarManager/CarManager.vue'),
            meta: { title: '设备管理' }
        },
        {
            path: 'OrderManagement',
            component: () => import('@/views/background/CarManager/CarManager.vue'),
            meta: { title: '订单管理' }
        },
        {
            path: 'CardManagement',
            component: () => import('@/views/background/CarManager/CarManager.vue'),
            meta: { title: '卡片管理' }
        },
    ]
}
export default CarManager