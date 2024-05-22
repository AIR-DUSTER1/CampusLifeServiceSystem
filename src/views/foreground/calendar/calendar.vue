<template>
    <div class="calendar-box">
        <FullCalendar class="calendar" :options='calendarOptions' ref="fullCalendar"></FullCalendar>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRaw } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import { identity, useWindowSize } from '@vueuse/core'
const { height } = useWindowSize()
const fullCalendar = ref()
console.log(fullCalendar);

let calendarheight = ref(height.value - 60 + "px")
let eventlist = reactive([
    {
        id: 1,
        title: "开学",
        start: '2024-05-11 10:00:00',
        color: '#ff9f89',
        display: "block"
    },
    {
        id: 2,
        groupId: 2,
        start: '2024-05-13 10:00:00',
    }
])
let dialogVisible = ref(false)
let calendarOptions: any = {
    plugins: [multiMonthPlugin, interactionPlugin, dayGridPlugin],// 引入插件
    initialView: 'multiMonthYear',  // 显示视图
    multiMonthMaxColumns: 1,// 显示一列
    weekends: true,//  是否显示星期六/星期日列
    firstDay: 1,// 设置一周中的第一天为周一
    headerToolbar: {
        left: "title",
        center: "",
        right: "today,prev,next"
    },// toolbar 配置
    // dayMaxEventRows: 2.0,   // 事件最大允许显示行数
    fixedWeekCount: false, // 固定显示周数
    locale: 'zh-cn', // 语言为中文
    selectable: true,
    editable: true,
    buttonText: {
        today: "今天",
        prev: "上一年",
        next: "下一年"
    },// 自定义按钮文字
    events: toRaw(eventlist),// 显示事件
    dateClick: (info: any) => {
        console.log(info);
    },
    eventClick: (info: any) => {
        console.log(info);
        dialogVisible.value = true;
    }, //事件的点击
}

</script>

<style lang='scss' scoped>
.calendar-box {
    margin: 56px 0 0 0;
    height: v-bind(calendarheight);
    background-color: white;

    .calendar {
        height: 100%;
    }
}

.semester {
    background-color: aqua;
}
</style>
