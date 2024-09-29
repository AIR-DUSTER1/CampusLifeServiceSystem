<template>
    <div class="home">
        <div class="chart-item-container">
            <div ref="channelsChart" class="chart-item" style="height: 300px;"> </div>
        </div>
        <div class="chart-item-container">
            <div ref="columnar" class="chart-item" style="height: 300px;"> </div>
        </div>
        <div class="chart-item-statistic">
            <a-statistic class="statistic" title="一卡通总消费" :value="totalAmount" show-group-separator />
            <a-statistic class="statistic" title="一卡通总收入" :value="totalIncome" show-group-separator />
        </div>
        <div class="chart-item-line">
            <div ref="line" class="chart-item" style="height: 300px;"> </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useEcharts from '@/hooks/useEcharts'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { dispose } from 'echarts/core'
import { get } from '@/api/api'
import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue'
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
let totalAmount = ref()
let totalIncome = ref()
const loading = ref(true)
const channelsChart = ref<HTMLDivElement | null>(null)
const line = ref<HTMLDivElement | null>(null)
const columnar = ref<HTMLDivElement | null>(null)
let data = [
    { value: 1969, name: '线上' },
    { value: 1594, name: '电话' },
    { value: 1347, name: '地推' },
    { value: 635, name: '直播' },
]
let studata: any = []
let teadata: any = []
let date: any = ref([])
let amount: any = ref([])
let option = {}
let lineOption = {}
let columnaroption = {}
const init = () => {
    option = {
        legend: {
            top: '5%',
            left: 'center',
            icon: 'circle',
            orient: 'horizontal',
            align: 'auto',
            formatter: function (name: string) {
                // 添加
                let total = 0
                let target = 0
                for (let i = 0; i < data.length; i++) {
                    total += data[i].value
                    if (data[i].name === name) {
                        target = data[i].value
                    }
                }
                var arr = ['{a|' + name + '}', '{b|' + ((target / total) * 100).toFixed(2) + '%}']
                return arr.join('  ')
            },
            textStyle: {
                // 添加
                rich: {
                    a: {
                        fontSize: 12,
                        // color: 'var(--color-text-2)',
                    },
                    b: {
                        fontSize: 12,
                        // color: 'rgb(var(--primary-1))',
                        fontWeight: 'bold',
                    },
                },
            },
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                center: ['50%', '55%'],
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 2,
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold',
                    },
                },
                label: {
                    show: false,
                    position: 'center',
                },
                labelLine: {
                    show: false,
                },
                data,
            },
        ],
    }
    columnaroption = {
        legend: {
            top: '5%',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            axisTick: { show: false },
            data: ['学生', '教师']
        },
        yAxis: {
            type: 'value'
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {
                name: '在校/在职',
                type: 'bar',
                data: studata
            },
            {
                name: '总人数',
                type: 'bar',
                data: teadata
            }
        ]
    }
    lineOption = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'line',
                smooth: true
            }
        ]
    }
    // setTimeout(() => {
    //     loading.value = false
    //     nextTick(() => {
    //         useEcharts(line.value as HTMLDivElement).setOption(lineOption)
    //         useEcharts(channelsChart.value as HTMLDivElement).setOption(option)
    //         useEcharts(columnar.value as HTMLDivElement).setOption(columnaroption)
    //     })
    // }, 1000)
}
const updateChart = () => {
    useEcharts(channelsChart.value as HTMLDivElement).resize()
    useEcharts(line.value as HTMLDivElement).resize()
    useEcharts(columnar.value as HTMLDivElement).resize()
}
onMounted(() => {
    getDept()
    getDayPay()
    getTotalIncome()
    getTotalResume()
    getStuTea()
    init()
})
onBeforeUnmount(() => {
    dispose(line.value as HTMLDivElement)
    dispose(channelsChart.value as HTMLDivElement)
    dispose(columnar.value as HTMLDivElement)
})
function getStuTea() {
    get(
        '/user/summary/total',
        { Authorization: 'Bearer ' + userInfo.value.access_token, }
    ).then((res) => {
        if (res.success) {
            let list = res.data as Array<any>
            list.forEach(item => {
                let i = 0
                item.forEach((item: any) => {
                    if (i == 1) {
                        studata.push(item)
                    } else if (i == 2) {
                        teadata.push(item)
                    }
                    i++
                })
            });
        } else {
            Message.error(res.message)
        }
    }).catch((err) => {
        Message.error(err)
    })
}
function getTotalResume() {
    get(
        '/card/order/total-amount',
        { Authorization: 'Bearer ' + userInfo.value.access_token, }
    ).then((res) => {
        if (res.success) {
            // console.log(res.data);
            totalAmount.value = res.data
            useEcharts(columnar.value as HTMLDivElement).setOption(columnaroption)
        } else {
            Message.error(res.message)
        }
    }).catch((err) => {
        Message.error(err)
    })
}
function getTotalIncome() {
    get(
        '/card/order/total-income',
        { Authorization: 'Bearer ' + userInfo.value.access_token, }
    ).then((res) => {
        if (res.success) {
            // console.log(res.data);
            totalIncome.value = res.data
        } else {
            Message.error(res.message)
        }
    }).catch((err) => {
        Message.error(err)
    })
}
function getDayPay() {
    get(
        '/card/order/average-expense',
        { Authorization: 'Bearer ' + userInfo.value.access_token, },
        { days: 7 }
    ).then((res: any) => {
        if (res.success) {
            lineOption.series[0].data = res.data.amount
            lineOption.xAxis.data = res.data.date
            loading.value = false
            useEcharts(line.value as HTMLDivElement).setOption(lineOption)
        } else {
            Message.error(res.message)
        }
    }).catch((err) => {
        Message.error(err)
    })
}
function getDept() {
    get(
        '',
        { Authorization: 'Bearer ' + userInfo.value.access_token, },
    ).then((res: any) => {
        if (res.success) {
            // console.log(res.data);
            data = res.data
            useEcharts(channelsChart.value as HTMLDivElement).setOption(option)
        } else {
            Message.error(res.message)
        }
    }).catch((err) => {
        Message.error(err)
    })
}
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    flex-wrap: wrap;
    // grid-template-columns: repeat(auto-fit, minmax(28.125rem, 1fr));
    // width: calc(100% - 1.875rem);

    .chart-item-container {
        height: 18.75rem;
        width: 31.25rem;
        background-color: white;
        border-radius: 1.875rem;
        margin-top: .9375rem;
        margin-left: .9375rem;
        // flex: 3;
    }

    .chart-item-statistic {
        height: 18.75rem;
        width: 11.25rem;
        background-color: white;
        border-radius: 1.875rem;
        margin-top: .9375rem;
        margin-left: .9375rem;
        display: flex;
        flex-direction: column;
        justify-content: end;
        // flex: 1;

        .statistic {
            padding: 2.5rem;
        }
    }

    .chart-item-line {
        height: 18.75rem;
        width: calc(100% - 4.0625rem);
        background-color: white;
        border-radius: 1.875rem;
        // margin-left: .9375rem;
        margin-left: .9375rem;
        margin-top: .9375rem;
        margin-bottom: .9375rem;
        // flex: 3;
    }
}
</style>