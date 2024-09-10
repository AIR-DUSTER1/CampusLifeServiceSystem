<template>
    <div class="calendar-box">
        <calendar :address="address" :initialView="initialView" :editable="true" :buttonText="buttonText"></calendar>
    </div>
</template>

<script setup lang='ts'>
import calendar from '@/components/common/calendar.vue'
import { get } from '@/api/api';
import { ref, reactive, onMounted, computed } from 'vue'
import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue'
let userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
let initialView = ref('dayGridMonth')
let address = ref('')
let height = ref('78vh')
let buttonText = reactive({
    today: "今天",
    prev: "上一月",
    next: "下一月"
})

</script>

<style lang='scss' scoped>
.calendar-box {
    height: v-bind(height);
    background-color: white;
}
</style>
