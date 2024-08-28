<template>
    <div class="system-monitor" ref="systemMonitor">
        <div class="system-monitor-content">
            <div class="system-monitor-title">
                <icon-computer />
                系统状态
                <a-tooltip :content="monitorStatus.isItOnline" background-color="#00a854">
                    <a-tag style="background-color: white;">
                        <template #icon>
                            <icon-check style="color: green;" size="24" />
                        </template>
                    </a-tag>
                </a-tooltip>
            </div>
            <div class="system-monitor-progress">
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" :status="monitorStatus.currentStatus" :percent="0.1" size="large" />
                    <span>CPU</span>
                </div>
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" status='warning' :percent="0.2" size="large" />
                    <span>RAM</span>
                </div>
                <!-- <div class="system-monitor-progress-item">
                    <a-progress type="circle" status='danger' :percent="0.3" size="large" />
                    <span>Swap</span>
                </div> -->
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" status='success' :percent="0.4" size="large" />

                    <span><icon-storage />Disk</span>
                </div>
            </div>
        </div>
        <div class="system-monitor-info">
            <a-list class="system-monitor-list" hoverable>
                <template #header>
                    {{ title }}
                </template>
                <a-list-item>
                    <div class="system-monitor-info-item">
                        <div>23</div>
                        <div>123</div>
                    </div>
                </a-list-item>
                <a-list-item>Bytedance Technology Co., Ltd.</a-list-item>
                <a-list-item>Beijing Toutiao Technology Co., Ltd.</a-list-item>
                <a-list-item>Beijing Volcengine Technology Co., Ltd.</a-list-item>
                <a-list-item>China Beijing Bytedance Technology Co., Ltd.</a-list-item>
            </a-list>
            <a-list class="system-monitor-list" hoverable>
                <template #header>
                    List title
                </template>
                <a-list-item>
                    <div class="system-monitor-info-item">
                        <div>23</div>
                        <div>123</div>
                    </div>
                </a-list-item>
                <a-list-item>China Beijing Bytedance Technology Co., Ltd.</a-list-item>
            </a-list>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onUnmounted } from 'vue'
import { get } from '@/api/api'
import { useWebSocket } from '@vueuse/core'
import { ApiAddress } from '@/setting/setting'
import { useElementVisibility } from '@vueuse/core'
import { watch } from 'vue'
const systemMonitor = ref()
const targetIsVisible = useElementVisibility(systemMonitor)
let monitor = reactive({
    cpu: 0,
    ram: 0,
    disk: 0,
    jvm: [],
    sys: []
})
const { status, data, send, open, close } = useWebSocket(ApiAddress + `/system/ws/${getRandomFloat(0, 1000)}`, {
    // protocols: ['soap'], // ['soap', 'wamp']
    autoReconnect: {
        retries: 3,
        delay: 1000,
        onFailed() {
            alert('重试3次后未能连接websocket')
        },
    },
    onMessage(ws, event) {
        console.log(data.value);
    },
    // heartbeat: {
    //     // message: 'ping',
    //     interval: 5000,
    //     pongTimeout: 1000,
    // },
})
let title = ref('')
const monitorStatus = {
    currentStatus: undefined,
    isItOnline: '',
    normal: 'normal',
    danger: 'danger',
    warning: 'warning',
    online: '在线',
    onlineColor: '#00a854',
    offline: '离线',
    offlineColor: '#f5222d',
}
watch(() => targetIsVisible.value, (isVisible) => {
    if (status.value == 'CLOSED' && isVisible) {
        open()
    } else if (status.value == 'OPEN' && !isVisible) {
        close()

    }
})
function getRandomFloat(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
}
onUnmounted(() => {
    close()
})
</script>

<style lang='scss' scoped>
.system-monitor {
    display: grid;
    grid-template-columns: 1fr;

    .system-monitor-content {
        border: 1px solid #e9e9e9;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
            justify-content: space-evenly;

            .system-monitor-progress-item {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    }

    .system-monitor-info {
        padding: 20px;
        margin: 10px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        justify-items: center;

        .system-monitor-list {
            width: 35vw;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

            .system-monitor-info-item {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
        }

    }
}
</style>
