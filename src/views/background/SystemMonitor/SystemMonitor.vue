<template>
    <div class="system-monitor" ref="systemMonitor">
        <div class="system-monitor-content">
            <div class="system-monitor-title">
                <icon-computer />
                系统状态
                <a-tooltip :content="status && status == 'OPEN' ? monitorStatus.online : monitorStatus.offline"
                    background-color="#00a854">
                    <a-tag style="background-color: white;">
                        <template #icon>
                            <icon-check style="color: green;" size="24" />
                        </template>
                    </a-tag>
                </a-tooltip>
            </div>
            <div class="system-monitor-progress">
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" :status="monitorStatus.currentCpuStatus" :percent="infodata.cpu"
                        size="large" />
                    <span>CPU</span>
                </div>
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" :status="monitorStatus.currentRamStatus" :percent="infodata.ram"
                        size="large" />
                    <span>内存</span>
                </div>
                <div class="system-monitor-progress-item">
                    <a-progress type="circle" :status="monitorStatus.currentDiskStatus" :percent="infodata.disk"
                        size="large" />
                    <span>硬盘</span>
                </div>
            </div>
        </div>
        <div class="system-monitor-info">
            <a-list class="system-monitor-list" v-if="parseData" v-for="list in label" :key="list.title" hoverable>
                <template #header>
                    <svg t="1724908028702" v-if="list.title == 'Java虚拟机信息'" class="icon" viewBox="0 0 1024 1024"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6446" width="16" height="16">
                        <path
                            d="M377.596784 791.989528s-39.199482 22.799699 27.799633 30.399598c81.198926 9.199878 122.598379 7.999894 211.997197-8.999881 0 0 23.599688 14.799804 56.399254 27.599635C473.395518 926.787745 220.198866 835.988946 377.596784 791.989528m-24.399677-112.198517s-43.799421 32.399572 23.199693 39.399479c86.598855 8.999881 155.197948 9.599873 273.596382-13.199825 0 0 16.399783 16.599781 42.199442 25.599661-242.596792 70.999061-512.593222 5.799923-338.995517-51.799315m206.397271-190.197485c49.399347 56.799249-12.999828 107.998572-12.999828 107.998572s125.398342-64.799143 67.799103-145.798072c-53.799289-75.599-94.998744-113.198503 128.198305-242.596792 0.199997 0-350.395367 87.598842-182.99758 280.396292m265.196493 385.194907s28.999617 23.799685-31.799579 42.399439c-115.798469 34.999537-481.593632 45.599397-583.192289 1.399982-36.599516-15.799791 31.999577-37.999498 53.599291-42.599437 22.399704-4.799937 35.399532-3.999947 35.399532-3.999947-40.599463-28.599622-262.596528 56.199257-112.798508 80.398937 408.3946 66.399122 744.790152-29.799606 638.791553-77.598974M396.396536 563.592548s-186.197538 44.199416-65.999128 60.199204c50.799328 6.79991 151.99799 5.199931 246.196745-2.599966 76.998982-6.399915 154.397958-20.39973 154.397958-20.39973s-27.19964 11.599847-46.799381 24.999669c-188.997501 49.799342-553.992675 26.599648-448.994063-24.19968 88.998823-42.799434 161.197869-37.999498 161.197869-37.999497m333.995583 186.597532c192.197459-99.79868 103.198635-195.797411 41.199456-182.797582-15.199799 3.199958-21.999709 5.999921-21.999709 5.99992s5.599926-8.799884 16.399783-12.599833c122.598379-43.199429 216.997131 127.198318-39.599477 194.597427 0-0.199997 2.99996-2.799963 3.999947-5.199932M614.393653 0s106.398593 106.398593-100.998664 269.99643c-166.197802 131.198265-37.999498 206.197274 0 291.596144-96.998717-87.598842-168.197776-164.597824-120.398408-236.396874C463.195652 220.197088 657.393085 168.997765 614.393653 0m-198.997369 1020.786502c184.397562 11.799844 467.593817-6.599913 474.19373-93.798759 0 0-12.799831 32.999564-152.397985 59.399214-157.397919 29.599609-351.595351 26.199654-466.59383 7.199905 0-0.199997 23.599688 19.399743 144.798085 27.19964"
                            fill="" p-id="6447"></path>
                    </svg>
                    <svg v-else t="1724907929492" class="icon" viewBox="0 0 1055 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5230" width="16" height="16">
                        <path
                            d="M943.06822 0H110.748752A110.748752 110.748752 0 0 0 0 110.748752V766.72213a110.748752 110.748752 0 0 0 110.748752 110.748752h379.101498v72.412645h-255.574044a37.484193 37.484193 0 0 0-36.632279 37.484193 36.63228 36.63228 0 0 0 36.632279 36.63228h596.339435a37.484193 37.484193 0 0 0 37.484193-36.63228 37.484193 37.484193 0 0 0-37.484193-37.484193h-255.574044v-72.412645h379.101498A110.748752 110.748752 0 0 0 1053.816972 766.72213V110.748752a110.748752 110.748752 0 0 0-110.748752-110.748752z m36.632279 766.72213a36.63228 36.63228 0 0 1-36.632279 36.632279H110.748752A36.63228 36.63228 0 0 1 74.116473 766.72213V110.748752A36.63228 36.63228 0 0 1 110.748752 74.116473h832.319468a36.63228 36.63228 0 0 1 36.632279 36.632279z"
                            p-id="5231"></path>
                        <path
                            d="M818.688852 293.058236H374.84193a36.63228 36.63228 0 0 0 0 73.264559h443.846922a36.63228 36.63228 0 1 0 0-73.264559zM261.537438 303.281198a32.372712 32.372712 0 0 0-12.778703-7.667221 39.18802 39.18802 0 0 0-40.039933 7.667221 46.855241 46.855241 0 0 0-7.667221 11.926789 45.151414 45.151414 0 0 0 0 14.482529 45.151414 45.151414 0 0 0 11.074875 26.409318 38.336106 38.336106 0 0 0 26.409318 10.222961 40.039933 40.039933 0 0 0 26.409318-10.222961 32.372712 32.372712 0 0 0 4.259567-15.334443 34.928453 34.928453 0 0 0 0-13.630616 43.447587 43.447587 0 0 0 0-14.482529 46.855241 46.855241 0 0 0-7.667221-9.371048zM818.688852 511.148087H374.84193a36.63228 36.63228 0 0 0-34.076539 34.928452 37.484193 37.484193 0 0 0 36.63228 37.484193h441.291181a37.484193 37.484193 0 0 0 37.484193-37.484193 37.484193 37.484193 0 0 0-37.484193-34.928452zM208.718802 520.519135a40.891847 40.891847 0 0 0-11.074875 25.557404 45.151414 45.151414 0 0 0 0 14.482529 35.780366 35.780366 0 0 0 7.667221 11.926789 31.520799 31.520799 0 0 0 11.926789 7.667221 32.372712 32.372712 0 0 0 14.482529 0 40.891847 40.891847 0 0 0 26.409318-11.074875 36.63228 36.63228 0 0 0 10.222961-26.409318 35.780366 35.780366 0 0 0-10.222961-25.557404 37.484193 37.484193 0 0 0-49.410982 3.407654z"
                            p-id="5232"></path>
                    </svg>
                    {{ list.title }}
                </template>
                <a-list-item v-for="item in list.item" :key="item.value" class="system-monitor-info-item">
                    <div>{{ item.title }}</div>
                    <div>{{ parseData[list.obj][item.value] }}</div>
                </a-list-item>
            </a-list>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onUnmounted, watch } from 'vue'
import { get } from '@/api/api'
import { useWebSocket } from '@vueuse/core'
import { ApiAddress } from '@/setting/setting'
import { useElementVisibility } from '@vueuse/core'
const systemMonitor = ref()
const targetIsVisible = useElementVisibility(systemMonitor)
const infodata = reactive<any>(
    {
        cpu: 0,
        ram: 0,
        disk: 0,
    }
)
let parseData = ref()
const label = [
    {
        title: 'Java虚拟机信息',
        obj: 'jvm',
        item: [
            {
                title: 'Java名称',
                value: 'name'
            },
            {
                title: 'Java版本',
                value: 'version'
            },
            {
                title: 'Java路径',
                value: 'home'
            },
            {
                title: 'Java运行时间',
                value: 'runTime'
            },
            {
                title: 'JVM使用率',
                value: 'usage'
            },
        ]
    },
    {
        title: '系统信息',
        obj: 'sys',
        item: [
            {
                title: '服务器名称',
                value: 'computerName'
            },
            {
                title: '服务器IP',
                value: 'computerIp'
            },
            {
                title: '操作系统',
                value: 'osName'
            },
            {
                title: '系统架构',
                value: 'osArch'
            },
            {
                title: '项目路径',
                value: 'userDir'
            }
        ]
    }
]
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
        parseData.value = JSON.parse(event.data)
        infodata.cpu = parseData.value.cpu
        infodata.ram = parseData.value.mem
        infodata.disk = parseData.value.disk
        console.log(parseData.value['jvm']);

        if (parseData.value.cpu >= 0.8) {
            monitorStatus.currentCpuStatus = monitorStatus.warning
        } else if (parseData.value.cpu >= 0.95) {
            monitorStatus.currentCpuStatus = monitorStatus.danger
        }
        if (parseData.value.mem >= 0.8) {
            monitorStatus.currentRamStatus = monitorStatus.warning
        } else if (parseData.value.mem >= 0.95) {
            monitorStatus.currentRamStatus = monitorStatus.danger
        }
        if (parseData.value.disk >= 0.8) {
            monitorStatus.currentDiskStatus = monitorStatus.warning
        } else if (parseData.value.disk >= 0.8) {
            monitorStatus.currentDiskStatus = monitorStatus.danger
        }
    },
})
const monitorStatus: any = {
    currentCpuStatus: 'undefined',
    currentRamStatus: 'undefined',
    currentDiskStatus: 'undefined',
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
