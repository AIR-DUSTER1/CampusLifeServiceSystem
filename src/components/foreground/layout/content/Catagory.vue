<template>
    <div>
        <a-card class="card" hoverable title="Arco Card">
            <template #title>
            </template>
            <template #extra>
                <a-button type="primary" shape="round">更多</a-button>
            </template>
            <template #cover>
            </template>
        </a-card>
    </div>
</template>

<script setup lang='ts'>
import { get } from '@/api/api';

get<any>('/news/top6').then(res => {
    console.log(res.data);

});
</script>

<style lang='scss' scoped>
.card {
    width: 98%;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 5px;
}
</style>
