<template>
    <div>
        <calendar v-model:eventlist="eventlist" v-model:height="height" v-model:address="address"
            v-model:initialView="initialView"></calendar>
    </div>
</template>

<script setup lang='ts' name="CalendarMannager">
import calendar from '@/components/common/calendar.vue'
import { ref, reactive } from 'vue'
let initialView = ref('dayGridMonth')
let address = ref('')
let height = ref('')
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

<style lang='scss' scoped></style>
