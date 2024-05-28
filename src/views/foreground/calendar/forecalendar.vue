<template>
    <div class="calendar-box">
        <calendar v-model:eventlist="eventlist" v-model:height="calendarheight" :address="address"
            :initialView="initialView" :editable="false" :buttonText="buttonText"></calendar>
    </div>

</template>

<script setup lang='ts'>
import { ref, reactive, toRaw } from 'vue'
import calendar from '@/components/common/calendar.vue'
import { identity, useWindowSize } from '@vueuse/core'
const { height } = useWindowSize()
let address = ref('')
let initialView = ref('multiMonthYear')
let calendarheight = ref(height.value - 60 + "px")
let buttonText = reactive({
    today: "今天",
    prev: "上一年",
    next: "下一年"
})
let eventlist = reactive([
    {
        id: 1,
        title: "开学",
        start: '2024-05-11',
        end: "",
        color: '#ff9f89',
        textColor: "#000000",
        display: "block"
    },
    {
        id: 2,
        groupId: 2,
        start: '2024-05-13 10:00:00',
        display: "block"
    },
    {
        id: 4,
        groupId: 2,
        start: '2024-05-15 10:00:00',
        display: "block"
    }
])

</script>

<style lang='scss' scoped>
.calendar-box {
    margin: 56px 0 0 0;
    height: v-bind(calendarheight);
    background-color: white;
}
</style>
