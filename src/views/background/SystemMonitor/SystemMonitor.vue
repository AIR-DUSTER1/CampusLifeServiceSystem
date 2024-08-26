<template>
    <div class="system-monitor">
        <div class="system-monitor-content">
            <div class="system-monitor-title">
                {{ title }}
                <a-tooltip content="在线" background-color="#00a854">
                    <a-tag style="background-color: white;">
                        <template #icon>
                            <icon-check style="color: green;" size="24" />
                        </template>
                    </a-tag>
                </a-tooltip>
            </div>
            <div class="system-monitor-progress">
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" :percent="0.1" size="large" />
                    <span>CPU</span>
                </div>
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" status='warning' :percent="0.2" size="large" />
                    <span>RAM</span>
                </div>
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" status='danger' :percent="0.3" size="large" />
                    <span>Swap</span>
                </div>
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" status='success' :percent="0.4" size="large" />
                    <span>Disk</span>
                </div>
            </div>
        </div>
        <div class="system-monitor-content">
            <div class="system-monitor-title">
                {{ title }}
                <a-tooltip content="离线" background-color="#f5222d">
                    <a-tag style="background-color: white;">
                        <template #icon>
                            <icon-close style="color: #f5222d;" size="24" />
                        </template>
                    </a-tag>
                </a-tooltip>
            </div>
            <div class="system-monitor-progress">
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" :percent="0.1" size="large" />
                    <span>CPU</span>
                </div>
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" status='warning' :percent="0.2" size="large" />
                    <span>RAM</span>
                </div>
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" status='danger' :percent="0.3" size="large" />
                    <span>Swap</span>
                </div>
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" status='success' :percent="0.4" size="large" />
                    <span>Disk</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { get } from '@/api/api'
import { useWebSocket } from '@vueuse/core'
const { status, data, send, open, close } = useWebSocket('ws://websocketurl', {
    protocols: ['soap'], // ['soap', 'wamp']
    autoReconnect: {
        retries: 3,
        delay: 1000,
        onFailed() {
            alert('Failed to connect WebSocket after 3 retries')
        },
    },
    heartbeat: {
        message: 'ping',
        interval: 1000,
        pongTimeout: 1000,
    },
})
let title = ref('香港服务器')

</script>

<style lang='scss' scoped>
.system-monitor {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .system-monitor-content {
        border: 1px solid #e9e9e9;
        padding: 20px;
        border-radius: 5px;
        margin: 10px;

        .system-monitor-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .system-monitor-progress {
            display: flex;
            justify-content: space-between;

            .system-monitor-progress-item {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    }
}
</style>
