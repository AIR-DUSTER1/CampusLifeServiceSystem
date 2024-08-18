<template>
    <div class="calendar-box">
        <calendar v-model:eventlist="eventlist" :address="address" :initialView="initialView" :editable="true"
            :buttonText="buttonText"></calendar>
    </div>
</template>

<script setup lang='ts'>
import calendar from '@/components/common/calendar.vue'
import { ref, reactive } from 'vue'
let initialView = ref('dayGridMonth')
let address = ref('')
let height = ref('78vh')
let buttonText = reactive({
    today: "今天",
    prev: "上一月",
    next: "下一月"
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
    height: v-bind(height);
    background-color: white;
}
</style>
