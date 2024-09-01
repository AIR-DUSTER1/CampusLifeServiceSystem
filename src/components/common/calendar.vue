<template>
    <FullCalendar class="calendar" :options='calendarOptions' ref="fullCalendar"></FullCalendar>
    <a-modal v-model:visible="visible" simple>
        <template #title>
            事件详情
        </template>
        <div>
            <div>标题：{{ detail.title }}</div>
            <div>开始时间：{{ detail.start }}</div>
            <div>结束时间：{{ detail.end }}</div>
            <div>描述：{{ detail.description }}</div>
        </div>
        <template #footer>
            <div class="detail-footer">
                <a-button class="btn" type="primary" @click="echoDisplay">修改</a-button>
                <a-button class="btn" type="primary" status="danger" @click="deleteEvent">删除</a-button>
            </div>
        </template>
    </a-modal>
    <a-modal v-if="options.initialView == 'dayGridMonth'" v-model:visible="addevent" simple>
        <template #title>
            <div v-if="!modifyEvent">
                添加事件
            </div>
            <div v-else>
                修改事件
            </div>
        </template>
        <a-form :model="form">
            <a-form-item field="groupId" label="分组id">
                <a-input v-model="form.groupId" placeholder="请输入事件分组id(可选)" />
            </a-form-item>
            <a-form-item field="title" label="标题" required>
                <a-input v-model="form.title" placeholder="请输入事件标题" />
            </a-form-item>
            <a-form-item label="时间" :rules="{ required: true }">
                <a-range-picker v-model="rangeTime" @change="onChange" />
            </a-form-item>
            <a-row>
                <a-col :span="12">
                    <a-form-item field="color" class="color">
                        <template #label>事件颜色</template>
                        <a-color-picker defaultValue="#FFFFFF" showText :historyColors="history" showHistory showPreset
                            @popup-visible-change="addHistory" @change="changecolor" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item field="textColor" class="textColor">
                        <template #label>文本颜色</template>
                        <a-color-picker defaultValue="#FFFFFF" showText :historyColors="history" showHistory showPreset
                            @popup-visible-change="addHistory" @change="changetextColor" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item field="display" label="显示方式">
                <a-select defaultValue="auto" @change="changedisplay">
                    <a-option value="auto">自动</a-option>
                    <a-option value="block">块状</a-option>
                    <a-option value="list-item">列表项</a-option>
                </a-select>
            </a-form-item>
            <a-form-item field="description" label="描述">
                <a-textarea v-model="form.description" placeholder="请输入事件描述" />
            </a-form-item>
        </a-form>
        <template #footer>
            <div>
                <a-button type="secondary" v-if="modifyEvent" @click="addevent = false">取消</a-button>
                <a-button type="secondary" v-else @click="formcolse">取消</a-button>
                <a-button type="primary" v-if="modifyEvent" @click="modify">修改</a-button>
                <a-button type="primary" v-else @click="submit">确定</a-button>
            </div>
        </template>
    </a-modal>
    <a-modal v-model:visible="orsave" width="auto" :footer="false">
        <template #title>
            <span style="margin-right: 20px;">
                表单中数据是否保存?
            </span>
        </template>
        <div class="savebutton">
            <a-button-group type="primary">
                <a-button @click="saveform">保存</a-button>
                <a-button @click="clearform">不保存</a-button>
            </a-button-group>
        </div>
    </a-modal>
</template>

<script setup lang='ts'>
import { ref, reactive, toRaw, onMounted, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Message } from '@arco-design/web-vue'
import { del, post, put } from '@/api/api'
import useUserStore from '@/stores/modules/user'
const emit = defineEmits(['getEventlist'])
let userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
let eventlist = defineModel<any>('eventlist')
const options = defineProps(['initialView', 'editable', 'address', 'buttonText'])
const fullCalendar = ref()
let modifyEvent = ref(false)
let dbclick = 0
let visible = ref<boolean>(false)
let addevent = ref<boolean>(false)
let orsave = ref<boolean>(false)
const history = ref(['#165DFF'])
let rangeTime = ref<any>([])
let form = reactive({
    groupId: "",
    title: "",
    start: "",
    end: "",
    color: '',
    textColor: "",
    display: "auto",
    description: ""
})
let detail = reactive({
    id: '',
    groupId: "",
    title: '',
    start: '',
    end: '',
    color: '',
    textColor: "",
    display: "auto",
    description: '',
})
let calendarOptions: any = ref({
    plugins: [multiMonthPlugin, interactionPlugin, dayGridPlugin],// 引入插件
    initialView: options.initialView,  // 显示视图
    multiMonthMaxColumns: 1,// 显示一列
    weekends: true,//  是否显示星期六/星期日列
    firstDay: 1,// 设置一周中的第一天为周一
    showNonCurrentDates: false,// 设置是否应呈现上个月或下个月的日期
    headerToolbar: {
        left: "title",
        center: "",
        right: "today,prev,next"
    },// toolbar 配置
    dayMaxEventRows: 2.0,   // 事件最大允许显示行数
    fixedWeekCount: false, // 固定显示周数
    locale: 'zh-cn', // 语言为中文
    selectable: true,
    editable: options.editable,
    buttonText: options.buttonText,// 自定义按钮文字
    events: computed(() => eventlist.value),// 显示事件
    dateClick: (info: any) => {
        console.log(info.dateStr);
        dbclick += 1
        if (dbclick == 2) {
            clearform()
            addevent.value = true
            modifyEvent.value = false
        }
        setTimeout(() => {
            dbclick = 0
        }, 250);
    },
    eventClick: (info: any) => {
        console.log(info.event.id);
        detail.id = info.event.id
        detail.groupId = info.event.groupId
        detail.title = info.event.title
        detail.start = info.event.start
        detail.end = info.event.end
        detail.color = info.event.backgroundColor
        detail.textColor = info.event.textColor
        detail.display = info.event.display
        detail.description = info.event.description
        visible.value = true
    }, //事件的点击
    eventDrop: (eventDropInfo: any) => {
        console.log(eventDropInfo.delta);
    },
})
onMounted(() => {
    console.log()
})
function onChange(dateString: any, date: any) {
    if (dateString == undefined) {
        form.start = ''
        form.end = ''
        rangeTime.value = []
    } else {
        form.start = dateString[0]
        form.end = dateString[1]
        rangeTime.value = dateString
    }

    console.log('onChange: ', dateString, date);
}
const addHistory = (visible: boolean, color: string) => {
    if (!visible) {
        const index = history.value.indexOf(color);
        if (index !== -1) {
            history.value.splice(index, 1);
        }
        history.value.unshift(color);
    }
}
function changedisplay(value: any) {
    console.log(value);
    form.display = value
}
function changecolor(value: string) {
    form.color = value
}
function changetextColor(value: string) {
    form.textColor = value
}
function submit() {
    console.log(form);
    if (form.start == '' || form.end == '') {
        Message.error('请选择时间')
    } else if (form.title == '') {
        Message.error('请输入标题')
    } else {
        post(
            '/calendar/',
            { ...form },
            { 'Authorization': 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                eventlist.value.push(form)
                Message.success('添加成功')
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err.message)
        })
    }
}
function formcolse() {
    if (form.groupId != "" || form.title != '' || form.start != '' || form.end != '' || form.description != '') {
        orsave.value = true
        addevent.value = false
    } else {
        addevent.value = false
    }
}
function saveform() {
    orsave.value = false
}
function clearform() {
    form.groupId = ''
    form.title = ''
    form.start = ''
    form.end = ''
    form.color = ''
    form.textColor = ''
    form.display = ''
    form.description = ''
    rangeTime.value = []
    orsave.value = false
}
function deleteEvent() {
    if (detail.id != '' && detail.id != null && detail.id != undefined) {
        del(
            `/calendar/${detail.id}`,
            { 'Authorization': 'Bearer ' + userInfo.value.access_token },
        ).then((res) => {
            if (res.success) {
                Message.error('删除成功')
                eventlist.value = eventlist.value.filter((item: any) => item.id != detail.id)
                visible.value = false
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    } else {
        Message.error('请选择要删除的事件')
    }
}
function echoDisplay() {
    modifyEvent.value = true
    addevent.value = true
    visible.value = false
    form.groupId = detail.groupId
    form.title = detail.title
    form.start = detail.start
    form.end = detail.end
    rangeTime.value = [detail.start, detail.end]
    form.color = detail.color
    form.textColor = detail.textColor
    form.display = detail.display
    form.description = detail.description
}
function modify() {
    put(
        `/calendar/${detail.id}`,
        { ...form },
        { 'Authorization': 'Bearer ' + userInfo.value.access_token }
    ).then((res) => {
        if (res.success) {
            Message.success('修改成功')
            eventlist.value.forEach((item: any) => {
                if (item.id == detail.id) {
                    item.groupId = detail.groupId
                    item.title = detail.title
                    item.start = detail.start
                    item.end = detail.end
                    item.color = detail.color
                    item.textColor = detail.textColor
                    item.display = detail.display
                }
            })
            emit('getEventlist')
            addevent.value = false
        } else {
            Message.error(res.message)
        }
    }).catch((err) => {
        Message.error(err)
    })
}
</script>

<style lang='scss' scoped>
.calendar {
    height: 100%;

    :deep(.fc-col-header) {
        width: 100% !important;
    }

    :deep(.fc-scrollgrid-sync-table) {
        width: 100% !important;
        height: 100% !important;
    }

    :deep(.fc-daygrid-body-unbalanced) {
        width: 100% !important;
        height: 100%;
    }
}

.semester {
    background-color: aqua;
}

.savebutton {
    display: flex;
    justify-content: center;
}

.color {
    margin-left: 10px;

    :deep(.arco-col-5) {
        flex: none;
        width: initial;
    }

    :deep(.arco-col-19) {
        flex: none;
        width: initial;
    }
}

.textColor {
    padding-left: 30px;
    width: 170px;

    :deep(.arco-col-5) {
        flex: none;
        width: initial;
    }

    :deep(.arco-col-19) {
        flex: none;
        width: initial;
    }
}

.detail-footer {
    display: flex;
    justify-content: end;

    .btn:first-child {
        margin-right: 1.5625rem;
    }
}
</style>
