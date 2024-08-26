<template>
    <div class="stuinfo">
        <a-tabs lazy-load default-active-key="1" @change="handleTabChange">
            <a-tab-pane key="1" title="基本信息">
                <DataTable ref="table" :id="'uid'" v-model:columns="BasicColumns" v-model:address="BasicAddress"
                    :checkbox="true" :editor="Editor" v-model:selectKey="selectKey">
                </DataTable>
            </a-tab-pane>
            <a-tab-pane key="2" title="学籍信息">
                <DataTable :id="'number'" v-model:columns="StuStatusColumns" v-model:address="StudentAddress"
                    :checkbox="true" :editor="Editor" v-model:selectKey="selectKey">
                </DataTable>
            </a-tab-pane>
            <a-tab-pane key="3" title="教师信息">
                <DataTable :id="'number'" v-model:columns="TeachColumns" v-model:address="TeachAddress" :checkbox="true"
                    :editor="Editor" v-model:selectKey="selectKey">
                </DataTable>
            </a-tab-pane>
            <template #extra>
                <div class="StuinfoOption">
                    <a-button class="button" type="primary" size="small" status="success"
                        @click="addUser">添加用户</a-button>
                    <a-button class="button" type="primary" size="small" status="success" @click="addUser"
                        v-if="userInfo.authorities.includes('ROLE_ADMIN')">批量导入</a-button>
                    <a-button class="button" type="primary" size="small" status="success"
                        @click="deleteUser">删除用户</a-button>
                </div>
            </template>
        </a-tabs>
        <a-modal v-model:visible="visible" width="60vw" title="编辑" @before-ok="handleBeforeOk" @cancel="handleCancel">
            <EditorForm v-model:modeEdit="tabkey" v-model:form="form" v-model:Stuform="Stuform"
                @getlist="table.value.getlist()" />
        </a-modal>
    </div>
</template>

<script setup lang='ts'>
import DataTable from '@/components/background/table/DataTable.vue'
import EditorForm from '@/components/background/EditorForm/EditorForm.vue'
import { reactive, h, computed, ref, onMounted } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import useUserStore from '@/stores/modules/user'
import { del, post } from '@/api/api';
import { Message } from '@arco-design/web-vue';
let userStore = useUserStore()
let userInfo = computed(() => userStore.userinfo)
let selectKey = ref()
let tabkey = ref('1')
let visible = ref(false)
const tab = {
    Basic: '1',
    Student: '2',
    Teacher: '3'
}
let form = reactive({
    uid: '',
    number: '',
    username: '',
    email: '',
    phone: '',
    sex: '',
    idNumber: '',
    enabled: '',
    locked: '',
    avatar: '',
})
let Stuform = reactive<any>({
    bed: '',
    classes: "",
    cycle: '',
    dept: "",
    dorm: '',
    major: "",
    number: "",
    room: '',
    status: "",
    username: "",
    year: ""
})
const BasicAddress: string = '/user/page'
const StudentAddress: string = '/user/stu/page'
const TeachAddress: string = '/user/tech/page'
const Editor: boolean = true
let table = ref<any>(null)
const BasicColumns = [
    {
        title: '学号',
        dataIndex: 'number',
        width: 120,
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        filterable: {
            filter: (value: string, record: any) => record.number.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '姓名',
        dataIndex: 'username',
        width: 80,
        filterable: {
            filter: (value: string, record: any) => record.username.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        width: 200,
        filterable: {
            filter: (value: string, record: any) => record.email.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '手机',
        dataIndex: 'phone',
        width: 150,
        filterable: {
            filter: (value: string, record: any) => record.phone.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        filterable: {
            filters: [{
                text: '男',
                value: '男',
            },
            {
                text: '女',
                value: '女',
            },
            ],
            filter: (value: string, record: any) => record.sex == value,
        }
    },
    {
        title: '身份证号',
        dataIndex: 'idNumber',
        width: 190,
        filterable: {
            filter: (value: string, record: any) => record.idNumber.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '启用',
        dataIndex: 'enabled',
        width: 80,
        filterable: {
            filters: [{
                text: '启用',
                value: true,
            },
            {
                text: '禁用',
                value: false,
            },
            ],
            filter: (value: string, record: any) => record.enabled == value[0],
        },
        render: (value: any) => {
            return value.record.enabled ? '启用' : '禁用'
        }
    },
    {
        title: '锁定',
        dataIndex: 'locked',
        width: 80,
        filterable: {
            filters: [{
                text: '锁定',
                value: true,
            },
            {
                text: '解锁',
                value: false,
            },
            ],
            filter: (value: string, record: any) => record.locked == value[0],
        },
        render: (value: any) => {
            return value.record.locked ? '锁定' : '解锁'
        }
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 110,
        slotName: "action"
    }
];
const StuStatusColumns = [
    {
        title: '学号',
        dataIndex: 'number',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        filterable: {
            filter: (value: string, record: any) => record.number.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '姓名',
        dataIndex: 'username',
        filterable: {
            filter: (value: string, record: any) => record.username.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '宿舍',
        dataIndex: 'dorm',
        filterable: {
            filter: (value: string, record: any) => record.dorm.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '床号',
        dataIndex: 'bed',
        filterable: {
            filter: (value: string, record: any) => record.bed.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '年级',
        dataIndex: 'year',
        width: 140,
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        filterable: {
            filter: (value: string, record: any) => record.year.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '学院',
        dataIndex: 'dept',
        filterable: {
            filter: (value: string, record: any) => record.dept.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '班级',
        dataIndex: 'classes',
        filterable: {
            filter: (value: string, record: any) => record.classes.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '专业',
        dataIndex: 'major',
        filterable: {
            filter: (value: string, record: any) => record.major.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        },
        width: 200
    },
    {
        title: '学制',
        dataIndex: 'cycle',
        width: 90,
        filterable: {
            filters: [{
                text: '2年',
                value: '2',
            },
            {
                text: '3年',
                value: '3',
            },
            {
                text: '4年',
                value: '4',
            },
            {
                text: '5年',
                value: '5',
            }
            ],
            filter: (value: string, record: any) => record.cycle.includes(value),
            multiple: true
        }
    },
    {
        title: '学籍状态',
        dataIndex: 'status',
        filterable: {
            filters: [{
                text: '在籍',
                value: '在籍',
            },
            {
                text: '毕业',
                value: '毕业',
            },
            {
                text: '休学',
                value: '休学',
            }
            ],
            filter: (value: string, record: any) => record.status.includes(value),
        }
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 110,
        slotName: "action"
    }
]
const TeachColumns = [
    {
        title: '工号',
        dataIndex: 'number',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        filterable: {
            filter: (value: string, record: any) => record.number.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '姓名',
        dataIndex: 'username',
        filterable: {
            filter: (value: string, record: any) => record.username.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '院系',
        dataIndex: 'dept',
        filterable: {
            filter: (value: string, record: any) => record.dept.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '专业',
        dataIndex: 'major',
        filterable: {
            filter: (value: string, record: any) => record.major.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '班级',
        dataIndex: 'classes',
        filterable: {
            filter: (value: string, record: any) => record.classes.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '状态',
        dataIndex: 'status',
        filterable: {
            filters: [{
                text: '在职',
                value: '在职',
            },
            {
                text: '不在职',
                value: '不在职',
            },

            ],
            filter: (value: string, record: any) => record.status.includes(value),
        }
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 110,
        slotName: "action"
    }
]
onMounted(() => {

})
function addUser() {
    visible.value = true
    if (table.value != null) {
        table.value.editor()
        console.log(table)
    }
}
function deleteUser() {
    if (tabkey.value == tab.Basic) {
        del(
            `/user/${selectKey.value}`,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('删除成功')
                selectKey.value = selectKey.value.filter((item: any) => item != selectKey.value)
                table.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    } else if (tabkey.value == tab.Student) {

    } else if (tabkey.value == tab.Teacher) {


    }

}
function handleTabChange(key: any) {
    tabkey.value = key
}
const handleBeforeOk = (done: any) => {
    console.log(form)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneRegex = /^1[3-9]\d{9}$/
    if (form.username == '') {
        Message.error('用户名不能为空')
        done(false)
    } else if (form.sex == '') {
        Message.error('性别不能为空')
        done(false)
    } else if (form.email == '') {
        Message.error('邮箱不能为空')
        done(false)
    } else if (form.phone == '') {
        Message.error('手机号不能为空')
        done(false)
    } else if (form.email == '') {
        Message.error('邮箱不能为空')
        done(false)
    } else if (form.number == '') {
        Message.error('学号不能为空')
        done(false)
    } else if (form.number.length > 12) {
        Message.error('学号长度不能超过12位')
        done(false)
    } else if (!emailRegex.test(form.email)) {
        Message.error('邮箱格式不正确')
        done(false)
    } else if (form.phone == '') {
        Message.error('手机号不能为空')
        done(false)
    } else if (!phoneRegex.test(form.phone)) {
        Message.error('手机号格式不正确')
        done(false)
    } else if (form) {
        post(
            '/user/new',
            form,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res: any) => {
            if (res.success) {
                Message.success('添加成功')
                visible.value = false
                table.value.getlist()
                done()
            } else {
                Message.error(res.message)
                done(false)
            }
        }).catch(err => {
            Message.error(err)
            done(false)
        })
    }
};
const handleCancel = () => {
    visible.value = false;
}
</script>

<style lang='scss' scoped>
.stuinfo {
    margin-top: 5px;
    max-height: 85vh;

    .StuinfoOption {
        display: flex;
        justify-content: end;

        .button {
            margin-right: 10px;
        }
    }
}
</style>
