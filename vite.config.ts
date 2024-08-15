import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    VueSetupExtend(),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    }),
    vitePluginForArco({
      style: 'css'
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {
  //   // host: 'localhost',
  //   // port: 7940,
  //   proxy: {
  //     '/console': { // “/api” 以及前置字符串会被替换为真正域名
  //       target: 'http://feiniao-api.xkaipro.com:7940', // 请求域名
  //       // secure: true, // 请求是否为https
  //       changeOrigin: true, // 是否跨域
  //       rewrite: (path) => path.replace(/^\/console/, '')
  //     },
  //     '/user': {
  //       target: 'http://feiniao-api.xkaipro.com:7940',
  //       changeOrigin: true,
  //       // rewrite: (path) => path
  //     },
  //     '/captcha': {
  //       target: 'http://feiniao-api.xkaipro.com:7940',
  //       changeOrigin: true,
  //       // rewrite: (path) => path
  //     }
  //   }
  // }
})
