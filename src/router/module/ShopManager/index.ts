const ShopManager = {
    path: 'ShopManager',
    children: [
        {
            path: 'MerchantsManagement',
            name: 'MerchantsManagement',
            component: () => import('@/views/background/MerchantsManagement/MerchantsManagement.vue'),
            meta: { title: '商家管理' }
        },
        {
            path: 'GoodsManagement',
            name: 'GoodsManagement',
            component: () => import('@/views/background/GoodsManagement/GoodsManagement.vue'),
            meta: { title: '商品管理' }
        },
        {
            path: 'DeviceManagment',
            name: 'DeviceManagment',
            component: () => import('@/views/background/DeviceManagment/DeviceManagment.vue'),
            meta: { title: '设备管理' }
        }
    ],
    redirect: '/background/SystemManager/MerchantsManagement',
    meta: { title: '店铺管理' }
}
export default ShopManager