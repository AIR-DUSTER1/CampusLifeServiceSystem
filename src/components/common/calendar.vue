<template>
    <div class="calendar-box">
        <FullCalendar class="calendar" :options='calendarOptions' ref="fullCalendar"></FullCalendar>
    </div>
    <a-modal v-model:visible="visible" :footer="false" simple>
        <template #title>
            Title
        </template>
        <div>

        </div>
    </a-modal>
</template>

<script setup lang='ts'>
import { ref, reactive, toRaw, onMounted, getCurrentInstance, type ComponentInternalInstance, } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
const height = defineModel<any>('height')
let eventlist = defineModel('eventlist')
let address = defineModel('address')
let initialView = defineModel('initialView')
const update = getCurrentInstance() as ComponentInternalInstance | null
const fullCalendar = ref()
let visible = ref(false)
let calendarOptions: any = {
    plugins: [multiMonthPlugin, interactionPlugin, dayGridPlugin],// 引入插件
    initialView: initialView.value,  // 显示视图
    multiMonthMaxColumns: 1,// 显示一列
    weekends: true,//  是否显示星期六/星期日列
    firstDay: 1,// 设置一周中的第一天为周一
    headerToolbar: {
        left: "title",
        center: "",
        right: "today,prev,next"
    },// toolbar 配置
    dayMaxEventRows: 2.0,   // 事件最大允许显示行数
    fixedWeekCount: false, // 固定显示周数
    locale: 'zh-cn', // 语言为中文
    selectable: true,
    editable: true,
    buttonText: {
        today: "今天",
        prev: "上一年",
        next: "下一年"
    },// 自定义按钮文字
    events: eventlist,// 显示事件
    dateClick: (info: any) => {
        console.log(info);
    },
    eventClick: (info: any) => {
        console.log(info.event.id);
        visible.value = true;
    }, //事件的点击
}
onMounted(() => {
    update!.proxy!.$forceUpdate()
})
</script>

<style lang='scss' scoped>
.calendar-box {
    margin: 56px 0 0 0;
    height: v-bind(height);
    background-color: white;

    .calendar {
        height: 100%;
    }
}

.semester {
    background-color: aqua;
}
</style>
