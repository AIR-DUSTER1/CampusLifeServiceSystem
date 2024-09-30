<template>
    <div v-if="modeEdit == '1'">
        <a-form v-if="form" :model="form">
            <div class="basic">
                <a-form-item field="number" label="学号" label-col-flex="50px">
                    <a-input v-model="form.number" placeholder="请输入学号" />
                </a-form-item>
                <a-form-item field="username" label="姓名" label-col-flex="50px">
                    <a-input v-model="form.username" placeholder="请输入姓名" />
                </a-form-item>
                <a-form-item field="email" :rules="{ type: 'email' }" label="邮箱" label-col-flex="50px">
                    <a-input v-model="form.email" placeholder="请输入邮箱" />
                </a-form-item>
                <a-form-item field="phone" :rules="{ match: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }" label="手机号"
                    label-col-flex="50px">
                    <a-input v-model="form.phone" placeholder="请输入手机号" />
                </a-form-item>
                <a-form-item field="sex" label="性别" label-col-flex="50px">
                    <a-select placeholder="请选择性别" v-model="form.sex" :trigger-props="{ autoFitPopupMinWidth: true }">
                        <a-option>男</a-option>
                        <a-option>女</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="code" label="角色" label-col-flex="50px" v-if="props.modify">
                    <a-select :field-names="{ label: 'name', value: 'code' }" placeholder="请选择角色"
                        v-model="form.roles[0].label">
                        <a-option v-if="roleList && roleList.length > 0" v-for="item in roleList" :key="item.key"
                            :value="item.key" :label="item.label"></a-option>
                    </a-select>
                </a-form-item>
                <div v-if="form.uid">
                    <a-form-item field="locked" label="启用" label-col-flex="50px">
                        <a-switch type="round" @change="enable" :loading="loading"
                            :disabled="form.enabled ? true : false" :model-value="form.enabled">
                            <template #checked>
                                启用
                            </template>
                        </a-switch>
                    </a-form-item>
                </div>
                <div v-if="form.uid">
                    <a-form-item field="locked" label="锁定" label-col-flex="50px">
                        <a-switch type="round" @change="locking" :loading="loading" :model-value="form.locked">
                            <template #checked>
                                锁定
                            </template>
                            <template #unchecked>
                                解锁
                            </template>
                        </a-switch>
                    </a-form-item>
                </div>
            </div>
        </a-form>
    </div>
    <div v-else-if="modeEdit == '2'">
        <a-form v-if="Stuform" :model="Stuform">
            <div class="stubox">
                <a-form-item v-for="item in StuEditor" :key="item.field" :field="item.field" :label="item.label"
                    label-col-flex="80px">
                    <a-select v-if="item.field == 'cycle'" placeholder="请选择学制" v-model="Stuform[item.field]"
                        :trigger-props="{ autoFitPopupMinWidth: true }">
                        <a-option value="2">2年</a-option>
                        <a-option value="3">3年</a-option>
                        <a-option value="4">4年</a-option>
                        <a-option value="5">5年</a-option>
                    </a-select>
                    <a-select v-else-if="item.field == 'status'" placeholder="请选择学籍状态" v-model="Stuform[item.field]"
                        :trigger-props="{ autoFitPopupMinWidth: true }">
                        <a-option>在籍</a-option>
                        <a-option>毕业</a-option>
                        <a-option>休学</a-option>
                    </a-select>
                    <a-input v-else-if="typeof Stuform[item.field] == 'string'" v-model="Stuform[item.field]"
                        :placeholder="item.placeholder" :disabled="item.field == 'number' && Stuform.modify" />
                    <a-input-number
                        v-else-if="typeof Stuform[item.field] == 'number' || typeof Stuform[item.field] == 'object'"
                        hide-button v-model="Stuform[item.field]" :placeholder="item.placeholder" />
                </a-form-item>
            </div>
        </a-form>
    </div>
    <div v-else-if="modeEdit == '3'">
        <a-form v-if="form" :model="form">
            <div class="stubox">
                <a-form-item v-for="item in TeacherEditor" :key="item.field" :field="item.field" :label="item.label"
                    label-col-flex="80px">
                    <a-select v-if="item.field == 'status'" placeholder="请选择教师状态" v-model="TeacherForm[item.field]"
                        :trigger-props="{ autoFitPopupMinWidth: true }">
                        <a-option>在职</a-option>
                        <a-option>离职</a-option>
                    </a-select>
                    <a-input v-else :disabled="item.field == 'number' && TeacherForm.modify"
                        v-model="TeacherForm[item.field]" :placeholder="item.placeholder" />
                </a-form-item>
            </div>
        </a-form>
    </div>
</template>

<script setup lang='ts'>
import { get, post } from '@/api/api'
import { ref, reactive, shallowRef, onMounted, computed, watch } from 'vue'
import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue'
let form = defineModel<any>('form')
let modeEdit = defineModel('modeEdit')
let Stuform = defineModel<any>('Stuform')
let TeacherForm = defineModel<any>('TeacherForm')
const props = defineProps(['modify'])
let roleList = ref()
const emit = defineEmits(['getlist'])
let loading = ref(false)
let userStore = useUserStore()
let userInfo = computed(() => userStore.userinfo)
const StuEditor = [
    {
        field: 'number',
        label: '学号',
        placeholder: '请输入学号',
    },
    {
        field: 'username',
        label: '姓名',
        placeholder: '请输入姓名',
    },
    {
        field: 'dorm',
        label: '宿舍楼',
        placeholder: '请输入宿舍',
    },
    {
        field: 'room',
        label: '房间',
        placeholder: '请输入房间',
    },
    {
        field: 'bed',
        label: '床位',
        placeholder: '请输入床位',
    },
    {
        field: 'year',
        label: '年级',
        placeholder: '请输入年级',
    },
    {
        field: 'dept',
        label: '院系',
        placeholder: '请输入院系',
    },
    {
        field: 'classes',
        label: '班级',
        placeholder: '请输入班级',
    },
    {
        field: 'major',
        label: '专业',
        placeholder: '请输入专业',
    },
    {
        field: 'cycle',
        label: '学制',
        placeholder: '请输入学制',
    },
    {
        field: 'status',
        label: '学籍状态',
        placeholder: '请输入学籍状态',
    },
]
const TeacherEditor = [
    {
        field: 'number',
        label: '工号',
        placeholder: '请输入工号',
    },
    {
        field: 'username',
        label: '姓名',
        placeholder: '请输入姓名',
    },
    {
        field: 'dept',
        label: '院系',
        placeholder: '请输入院系',
    },
    {
        field: 'major',
        label: '专业',
        placeholder: '请输入专业',
    },
    {
        field: 'classes',
        label: '班级',
        placeholder: '请输入班级',
    },
    {
        field: 'status',
        label: '状态',
        placeholder: '请输入状态',
    }
]
onMounted(() => {
    getRoleList()
})
function locking(value: boolean | string | number) {
    form.value.locked = value
    loading.value = true
    if (value && form.value.uid) {
        post(
            `/user/lock/${form.value.uid}`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('锁定成功')
                emit('getlist')
                loading.value = false
            } else {
                Message.error(res.message)
                loading.value = false
            }
        }).catch((err) => {
            Message.error(err)
            loading.value = false
        })
    } else if (!value && form.value.uid) {
        post(
            `/user/unlock/${form.value.uid}`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('解锁成功')
                emit('getlist')
                loading.value = false
            } else {
                Message.error(res.message)
                loading.value = false
            }
        }).catch((err) => {
            Message.error(err)
            loading.value = false
        })
    } else {
        loading.value = false
        console.log('uid 为空');
    }
}
function enable(value: boolean | string | number) {
    form.value.enabled = value
    loading.value = true
    if (value && form.value.uid) {
        post(
            `/user/active/${form.value.uid}`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('激活成功')
                emit('getlist')
                loading.value = false
            } else {
                Message.error(res.message)
                loading.value = false
            }
        }).catch((err) => {
            Message.error(err)
            loading.value = false
        })
    } else {
        loading.value = false
        Message.error('禁用功能未开放')
    }
}
function getRoleList() {
    get(
        '/user/role/list',
        { Authorization: 'Bearer ' + userInfo.value.access_token }
    ).then((res) => {
        if (res.success) {
            roleList.value = res.data
        } else {
            Message.error(res.message)
        }
    }).catch((err) => {
        Message.error(err)
    })
}
</script>

<style lang='scss' scoped>
.stubox {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.basic {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
