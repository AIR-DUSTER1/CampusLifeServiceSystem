<template>
    <div class="calendar">
        <a-calendar v-model="value" mode='month' :modes="['month']" @change="change" />
        <span>
            select: {{ value }}
        </span>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const value = ref(new Date('2023-01-01'))

function change(value) {
    console.log(value);

}
</script>

<style lang='scss' scoped>
.calendar {
    margin: 56px 0 0 0;
    padding-bottom: 56px;
    background-color: white;
}
</style>
