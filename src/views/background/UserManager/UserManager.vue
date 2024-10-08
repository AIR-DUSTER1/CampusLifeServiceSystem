<template>
    <a-card>
        <div class="stuinfo">
            <a-tabs lazy-load default-active-key="1" @change="handleTabChange">
                <a-tab-pane key="1" title="基本信息">
                    <DataTable ref="basicTable" :id="'uid'" :columns="BasicColumns" :address="BasicAddress"
                        :checkbox="true" :editor="Editor" v-model:selectKey="BasicselectKey" v-model:modify="modify"
                        v-model:visible="visible" v-model:modifyData="modifyData">
                    </DataTable>
                </a-tab-pane>
                <a-tab-pane key="2" title="学籍信息">
                    <DataTable ref="stuTable" :id="'number'" :columns="StuStatusColumns" v-model:modify="modify"
                        :address="StudentAddress" :checkbox="true" :editor="Editor" v-model:selectKey="StuselectKey"
                        v-model:visible="visible" v-model:modifyData="modifyData">
                    </DataTable>
                </a-tab-pane>
                <a-tab-pane key="3" title="教师信息">
                    <DataTable ref="teaTable" :id="'number'" :columns="TeachColumns" :address="TeachAddress"
                        v-model:modify="modify" :checkbox="true" :editor="Editor" v-model:selectKey="TeacherselectKey"
                        v-model:visible="visible" v-model:modifyData="modifyData">
                    </DataTable>
                </a-tab-pane>
                <template #extra>
                    <div class="StuinfoOption">
                        <a-button class="button" type="primary" size="small" status="success" @click="addUser">{{
                            btntitle }}</a-button>
                        <a-upload :headers="headers" :limit="1" :action="address" :fileList="file ? [file] : []"
                            @before-upload="beforeUpload" :show-file-list="false" @success="success" @error="error"
                            v-if="userInfo && userInfo.authorities.includes('ROLE_SUPER_ADMIN')" @submit="handleSubmit"
                            accept=".xlsx">
                            <template #upload-button>
                                <a-button class="button" type="primary" size="small" status="success">批量导入</a-button>
                            </template>
                        </a-upload>
                        <a-button class="button" type="primary" size="small" status="success"
                            @click="deleteUser">删除用户</a-button>
                    </div>
                </template>
            </a-tabs>
            <a-modal v-model:visible="visible" width="60vw" title="编辑" @before-ok="handleBeforeOk"
                @cancel="handleCancel">
                <EditorForm v-model:modeEdit="tabkey" :modify="modify" v-model:form="form" v-model:Stuform="Stuform"
                    v-model:TeacherForm="TeacherForm" @getlist="basicTable.value.getlist()" />
            </a-modal>
        </div>
    </a-card>
</template>

<script setup lang='ts'>
import DataTable from '@/components/background/table/DataTable.vue'
import EditorForm from '@/components/background/EditorForm/EditorForm.vue'
import { reactive, h, computed, ref, onMounted, watch } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import useUserStore from '@/stores/modules/user'
import { del, post, put } from '@/api/api'
import { ApiAddress } from '@/setting/setting'
import { Message } from '@arco-design/web-vue'
import Upload from '@/components/background/upload/upload.vue'
let btntitle = ref('添加用户')
let userStore = useUserStore()
let userInfo = computed(() => userStore.userinfo)
let BasicselectKey = ref()
let StuselectKey = ref()
let TeacherselectKey = ref()
let modify = ref(false)
let modifyData = reactive<any>({})
let tabkey = ref('1')
let file = ref()
let type = '.xlsx'
let visible = ref(false)
const address = ref(ApiAddress + '/user/stu/import')
const headers = reactive({
    Authorization: 'Bearer ' + userInfo.value.access_token
})
const tab = {
    Basic: '1',
    Student: '2',
    Teacher: '3'
}
let form = reactive<any>({
    uid: Number,
    number: '',
    username: '',
    email: '',
    phone: '',
    sex: '',
    code: null,
    idNumber: '',
    enabled: false,
    locked: false,
    avatar: null,
})
let Stuform = reactive<any>({
    bed: null,
    classes: "",
    cycle: '',
    dept: "",
    dorm: null,
    major: "",
    number: "",
    room: null,
    status: "",
    username: "",
    year: "",
    modify: false
})
let TeacherForm = reactive<any>({
    classes: "",
    dept: "",
    major: "",
    number: null,
    status: "",
    username: "",
    modify: false
})
const BasicAddress: string = '/user/page'
const StudentAddress: string = '/user/stu/page'
const TeachAddress: string = '/user/tech/page'
const Editor: boolean = true
const basicTable = ref<any>(null)
const stuTable = ref<any>(null)
const teaTable = ref<any>(null)
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
        width: 170,
        filterable: {
            filter: (value: string, record: any) => record.email.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '手机',
        dataIndex: 'phone',
        width: 120,
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
        width: 140,
        filterable: {
            filter: (value: string, record: any) => record.idNumber.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '角色',
        dataIndex: 'roles',
        slotName: 'role',
        width: 80,
        filterable: {
            filter: (value: string, record: any) => record.idNumber.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '启用',
        dataIndex: 'enabled',
        width: 70,
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
        width: 70,
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
        width: 100,
        filterable: {
            filter: (value: string, record: any) => record.username.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '宿舍楼',
        dataIndex: 'dorm',
        width: 100,
        filterable: {
            filter: (value: string, record: any) => record.dorm.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '房间',
        dataIndex: 'room',
        filterable: {
            filter: (value: string, record: any) => record.room.includes(value),
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
        width: 120,
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
        width: 100,
        filterable: {
            filter: (value: string, record: any) => record.major.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        },
    },
    {
        title: '学制',
        dataIndex: 'cycle',
        width: 90,
        filterable: {
            filters: [{
                text: '2年',
                value: 2,
            },
            {
                text: '3年',
                value: 3,
            },
            {
                text: '4年',
                value: 4,
            },
            {
                text: '5年',
                value: 5,
            }
            ],
            filter: (value: string, record: any) => value.includes(record.cycle),
            multiple: true
        }
    },
    {
        title: '学籍状态',
        dataIndex: 'status',
        width: 140,
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
                text: '离职',
                value: '离职',
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
watch(modify, (value) => {

    if (value == true && tabkey.value == tab.Basic) {
        for (const key in modifyData) {
            form[key] = modifyData[key]
        }
    } else if (value == true && tabkey.value == tab.Student) {
        for (const key in modifyData) {
            Stuform[key] = modifyData[key]
        }
        Stuform.modify = true
    } else if (value == true && tabkey.value == tab.Teacher) {
        for (const key in modifyData) {
            TeacherForm[key] = modifyData[key]
        }
        TeacherForm.modify = true
    }
})
// 清空表单数据
function clearForm(form1: any) {
    for (const key in form1) {
        if (typeof form1[key] === 'string') {
            form1[key] = ''; // 如果属性值是字符串，则清空
        } else if (typeof form1[key] === 'boolean') {
            form1[key] = false; // 如果属性值是布尔值，则设为 false
        } else if (typeof form1[key] === 'number') {
            form1[key] = null; // 如果属性值是数字，则设为 0
        }
    }
}
function addUser() {
    visible.value = true
    if (modify.value == false && tabkey.value == tab.Basic) {
        clearForm(form)
    } else if (modify.value == false && tabkey.value == tab.Student) {
        clearForm(Stuform)
    } else if (modify.value == false && tabkey.value == tab.Teacher) {
        clearForm(TeacherForm)
    }
}
function deleteUser() {
    if (tabkey.value == tab.Basic) {
        del(
            `/user/${BasicselectKey.value}`,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('删除成功')
                BasicselectKey.value = BasicselectKey.value.filter((item: any) => item != BasicselectKey.value)
                basicTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    } else if (tabkey.value == tab.Student) {
        del(
            `/user/stu/${StuselectKey.value}`,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('删除成功')
                StuselectKey.value = StuselectKey.value.filter((item: any) => item != StuselectKey.value)
                stuTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    } else if (tabkey.value == tab.Teacher) {
        del(
            `/user/tech/${TeacherselectKey.value}`,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('删除成功')
                TeacherselectKey.value = TeacherselectKey.value.filter((item: any) => item != TeacherselectKey.value)
                teaTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }

}
function handleTabChange(key: any) {
    tabkey.value = key
    if (key == tab.Basic) {
        btntitle.value = '添加用户'
    } else if (key == tab.Student) {
        btntitle.value = '添加学生'
    } else if (key == tab.Teacher) {
        btntitle.value = '添加教师'
    }
}
const handleBeforeOk = (done: any) => {
    console.log(form)
    if (tabkey.value == tab.Basic && !modify.value) {
        editUser(done)
    } else if (tabkey.value == tab.Student && !modify.value) {
        editStu(done)
    } else if (tabkey.value == tab.Teacher && !modify.value) {
        editTea(done)
    } if (tabkey.value == tab.Basic && modify.value) {
        modifyUser(done)
    } else if (tabkey.value == tab.Student && modify.value) {
        modifyStu(done)
    } else if (tabkey.value == tab.Teacher && modify.value) {
        modifyTea(done)
    }
};
const handleCancel = () => {
    // modifyData = {}
    visible.value = false
    modify.value = false
}
function editUser(done: any) {
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
                modify.value = false
                basicTable.value.getlist()
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
}
function editStu(done: any) {
    post(
        '/user/stu',
        Stuform,
        { Authorization: 'Bearer ' + userInfo.value.access_token }
    ).then((res: any) => {
        if (res.success) {
            Message.success('添加成功')
            visible.value = false
            stuTable.value.getlist()
            done()
        } else {
            Message.error(res.message)
            done(false)
        }
    }).catch((err) => {
        Message.error(err)
        done(false)
    })
}
function editTea(done: any) {
    post(
        '/user/tech',
        TeacherForm,
        { Authorization: 'Bearer ' + userInfo.value.access_token }
    ).then((res: any) => {
        if (res.success) {
            Message.success('添加成功')
            visible.value = false
            teaTable.value.getlist()
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
function modifyUser(done: any) {
    if (form) {
        if (form.code != '') {
            post(
                '/user/auth/allocate',
                {
                    rid: form.code,
                    uid: form.uid
                },
                { Authorization: 'Bearer ' + userInfo.value.access_token }
            ).then((res) => {
                if (res.success) {

                } else {
                    Message.error(res.message)
                }
            }).catch((err) => {
                Message.error(err)
            })
        }
        put(
            `/user/${form.uid}`,
            form,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res: any) => {
            if (res.success) {
                Message.success('修改成功')
                visible.value = false
                basicTable.value.getlist()
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
}
function modifyStu(done: any) {
    if (Stuform) {
        put(
            `/user/stu/${Stuform.number}`,
            Stuform,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res: any) => {
            if (res.success) {
                Message.success('修改成功')
                visible.value = false
                stuTable.value.getlist()
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
}
function modifyTea(done: any) {
    if (TeacherForm) {
        put(
            `/user/tech/${TeacherForm.number}`,
            TeacherForm,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res: any) => {
            if (res.success) {
                Message.success('修改成功')
                visible.value = false
                teaTable.value.getlist()
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
}
function beforeUpload(fileitem: any) {
    file.value = fileitem
    handleSubmit(fileitem)
    console.log(fileitem);
}
function handleSubmit(fileitem: any) {
    console.log(fileitem);
    if (tabkey.value == tab.Teacher) {
        post(
            '/user/tech/import',
            { file: file.value },
            {
                Authorization: 'Bearer ' + userInfo.value.access_token,
                'Content-Type': `multipart/form-data boundary=--------------------------${Date.parse(new Date() + '')}`,
            },
            50000
        ).then((res: any) => {
            if (res.success) {
                Message.success('上传成功' + res.data)
                stuTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch(err => {
            Message.error(err)
        })
    } else {
        post(
            '/user/stu/import',
            { file: file.value },
            {
                Authorization: 'Bearer ' + userInfo.value.access_token,
                'Content-Type': `multipart/form-data boundary=--------------------------${Date.parse(new Date() + '')}`,
            },
            50000
        ).then((res: any) => {
            if (res.success) {
                Message.success('上传成功' + res.data)
                stuTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch(err => {
            Message.error(err)
        })
    }
}
function success(fileitem: any) {
    console.log(fileitem);
}
function error(err: any) {
    console.log(err);

}
</script>

<style lang='scss' scoped>
.stuinfo {
    margin-top: 5px;
    max-height: 85vh;

    .StuinfoOption {
        display: flex;
        justify-content: end;
        align-items: center;

        .button {
            margin-right: 10px;
        }
    }
}
</style>
