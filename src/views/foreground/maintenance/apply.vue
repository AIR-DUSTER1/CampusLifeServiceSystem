<template>
    <a-form :model="form" :rules="rules" @submit="handleSubmit" class="maintenance">
        <a-form-item :label="label.phone" :label-col-style="{ 'padding-right': '8px' }" validate-trigger="blur"
            field="phone">
            <div style="margin-right: 20px;width: 100%;">
                <a-input placeholder="请输入手机号" v-model="form.phone" allow-clear />
            </div>
        </a-form-item>
        <a-form-item :label="label.maintenancetype" :label-col-style="{ 'padding-right': '8px' }"
            validate-trigger="blur" field="maintenancetype">
            <treeselect v-model:maintenancetype="form.maintenancetype"></treeselect>
        </a-form-item>
        <a-form-item :label="label.maintenancearea" :label-col-style="{ 'padding-right': '8px' }"
            validate-trigger="blur" field="maintenancearea">
            <treeselect v-model:maintenancearea="form.maintenancearea"></treeselect>
        </a-form-item>
        <a-form-item :label="label.address" :label-col-style="{ 'padding-right': '8px' }" validate-trigger="blur"
            field="address">
            <div style="margin-right: 20px;width: 100%;">
                <a-input placeholder="请输入详细地点" v-model="form.address" allow-clear />
            </div>
        </a-form-item>
        <a-form-item :label="label.desc" :label-col-style="{ 'padding-right': '8px' }" validate-trigger="blur"
            field="desc">
            <a-textarea placeholder="请输入问题描述" v-model="form.desc" :max-length="1000" allow-clear show-word-limit
                auto-size style="margin-right: 20px;height: 100px;" />
        </a-form-item>
        <a-form-item :label="label.remarks" :label-col-style="{ 'padding-right': '8px' }" field="remarks">
            <a-textarea placeholder="请输入备注" v-model="form.remarks" :max-length="1000" allow-clear show-word-limit
                auto-size style="margin-right: 20px;height: 100px;" />
        </a-form-item>
        <a-form-item :label="label.img" :label-col-style="{ 'padding-right': '8px' }" field="img">
            <a-button type="dashed" style="height: 80px;width: 80px;" @click="opendrawer">
                <template #icon>
                    <icon-plus />
                </template>
            </a-button>
        </a-form-item>
        <a-form-item :label="label.timeline" :label-col-style="{ 'padding-right': '8px' }" field="timeline">
            <timeline></timeline>
        </a-form-item>
    </a-form>
    <drawer v-model:visible="visible"></drawer>
</template>

<script setup lang='ts'>
import timeline from '@/components/foreground/maintenance/timeline.vue'
import treeselect from '@/components/foreground/maintenance/treeselect.vue'
import upload from '@/components/foreground/maintenance/upload.vue'
import drawer from '@/components/foreground/maintenance/drawerbottom.vue'
import { ref, reactive } from 'vue'
let visible = ref(false)
let label = reactive({
    phone: "手机号",
    maintenancetype: "保修类型",
    maintenancearea: "报修区域",
    address: "详细地址",
    desc: "问题描述",
    remarks: "备注",
    img: "故障图片",
    timeline: "报修进度"
})
let form = reactive({
    phone: '',
    maintenancetype: '',
    maintenancearea: '',
    address: '',
    desc: '',
    remarks: '',
    img: '',
    timeline: ''
})
let typelist = [{

}]
let arealist = [{

}]
let rules = {
    phone: [{ required: true, message: '输入不得为空' }],
    maintenancetype: [{ message: '输入不得为空' }],
    maintenancearea: [{ message: '输入不得为空' }],
    address: [{ message: '输入不得为空' }],
    desc: [{ required: true, message: '输入不得为空' }],
    remarks: [{ message: '输入不得为空' }],
    img: [{ message: '输入不得为空' }],
    timeline: [{ message: '输入不得为空' }],
}

const handleSubmit = (data: any) => {
    console.log(data);
};
function opendrawer() {
    visible.value = true
}
</script>

<style lang='scss' scoped>
.maintenance {
    background-color: white;
    margin: 58px 0 0 0;
    padding: 5px;
}
</style>
