<template>
    <div>
        <a-list v-if="modules == 0">
            <template #header>账户管理</template>
            <a-list-item v-for="item in list" :key="item.id">
                <a-list-item-meta>
                    <template #title>
                        {{ item.title }}
                    </template>
                    <template #description>
                        {{ item.description }}
                    </template>
                </a-list-item-meta>
                <template #actions>
                    <a-button type="text" v-if="item.description != '未设置'" @click="modify(item)">修改</a-button>
                    <a-button type="text" v-else @click="setUp(item)">设置</a-button>
                </template>
            </a-list-item>
        </a-list>
        <div v-else-if="modules == 1" class="password">
            <div style="width: 18.75rem;">
                <a-typography-title :heading="3" style="margin: 0">
                    {{ title }}
                </a-typography-title>
                <div style="margin-top: 15px;line-height: 1.5;font-size: 12px;">
                    密码可由数字、大写英文字母、小写英文字母、特殊字符组成，至少包含两种类型，长度要求8-16位字符。</div>
                <div class="passwordform">
                    <a-input class="passwordinput" v-model="form.oldPassword" placeholder="请输入旧密码"></a-input>
                    <passwordstrong v-model:password="form.password" v-model:repassword="form.repassword">
                    </passwordstrong>
                </div>
                <div class="passwordbtn">
                    <a-button class="btn" type="primary" @click="modifypassword">修改</a-button>
                </div>
            </div>
        </div>
        <div v-else-if="modules == 2 || modules == 3" class="code">
            <div class="back">
                <a-link v-if="!newcode" @click="() => { modules = 0 }">
                    返回账户管理
                </a-link>
                <a-link v-else @click="!newcode">
                    返回上一步
                </a-link>
            </div>
            <div style="width: 18.75rem;">
                <a-typography-title :heading="3" style="margin: 0">
                    {{ title }}
                </a-typography-title>
                <div v-if="modules == 2 && !newcode" style="margin-top: 15px;line-height: 1.5;font-size: 12px;">
                    当前你正在修改登录手机号，请先输入新的手机号码。
                </div>
                <div v-if="modules == 2 && newcode" style="margin-top: 15px;line-height: 1.5;font-size: 12px;">
                    当前你正在修改登录手机号，需要完成手机号验证。验证码将发送至：+86 {{ form.phone }}
                </div>
                <div v-else-if="modules == 3 && !newcode" style="margin-top: 15px;line-height: 1.5;font-size: 12px;">
                    当前你正在修改登录邮箱，请先输入新的邮箱。
                </div>
                <div v-else-if="modules == 3 && newcode" style="margin-top: 15px;line-height: 1.5;font-size: 12px;">
                    当前你正在修改登录邮箱，需要完成邮箱验证。验证码将发送至：{{ form.email }}
                </div>
                <div class="codeform">
                    <a-input class="codeinput" v-model="form.phone" v-if="!newcode && modules == 2"
                        placeholder="请输入新手机号">
                        <template #prepend>
                            +86
                        </template>
                    </a-input>
                    <a-input class="codeinput" v-model="form.email" v-else-if="!newcode && modules == 3"
                        placeholder="请输入新邮箱"></a-input>
                    <a-verification-code v-if="newcode && modules == 2 || modules == 3" v-model="verificationCode"
                        class="verification-code" @finish="onFinish" />
                </div>
                <div class="codebtn">
                    <a-button class="btn" v-if="!newcode" @click="mfSendCode" type="primary">获取验证码</a-button>
                    <a-button class="btn" v-else @click="modifycode" type="primary">修改</a-button>
                </div>
            </div>
        </div>
        <div v-else-if="modules == moduleslist.setPhone || modules == moduleslist.setEmail" class="set">
            <div class="back">
                <a-link @click="() => { modules = 0 }">
                    返回
                </a-link>
            </div>
            <div v-if="modules == moduleslist.setPhone" class="setPhone">
                <a-typography-title :heading="3" style="margin: 0">
                    {{ title }}
                </a-typography-title>
                <div class="sendcode" v-if="!send">
                    <a-input v-model="form.newPhone" placeholder="请输入新手机号" allow-clear></a-input>
                    <a-button type="primary" class="btn" @click="sendcode">获取验证码</a-button>
                </div>
                <div v-else>
                    <div>
                        <div style="margin-top: 15px;line-height: 1.5;font-size: 12px;width: 18.75rem;">
                            当前你正在设置邮箱，需要完成邮箱验证。验证码将发送至：{{ form.newPhone }}
                        </div>
                        <a-verification-code class="verification-code" v-model="verificationCode" @finish="onFinish" />
                    </div>
                    <div class="setbtn">
                        <a-button type="primary" class="btn" @click="save">保存</a-button>
                    </div>
                </div>
            </div>
            <div v-else-if="modules == moduleslist.setEmail" class="setEmail">
                <a-typography-title :heading="3" style="margin-top: 1.25rem;text-align: center;">
                    {{ title }}
                </a-typography-title>
                <div class="sendcode" v-if="!send">
                    <a-input v-model="form.newEmail" placeholder="请输入新邮箱" allow-clear></a-input>
                    <a-button type="primary" class="btn" @click="sendcode">获取验证码</a-button>
                </div>
                <div v-else>
                    <div>
                        <div style="margin-top: 15px;line-height: 1.5;font-size: 12px;width: 18.75rem;">
                            当前你正在设置手机号，需要完成手机号验证。验证码将发送至：+86 {{ form.newPhone }}
                        </div>
                        <a-verification-code class="verification-code" v-model="verificationCode" @finish="onFinish" />
                    </div>
                    <div class="setbtn">
                        <a-button type="primary" class="btn" @click="save">保存</a-button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <securitycenter v-model:modules="modules" v-model:checkitem="checkitem"></securitycenter>
        </div>
        <Message ref="message" />
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import useUserStore from '@/stores/modules/user'
import passwordstrong from '@/components/home/passwordstrong.vue'
import securitycenter from '@/components/background/SecurityCenter/SecurityCenter.vue'
import Message from '@/components/background/message/message.vue'
import { get, put } from '@/api/api'
import { useDebounceFn } from '@vueuse/core'
const userStore = useUserStore()
let userInfo = computed(() => userStore.userinfo)
let modules = ref(0)
const message = ref()
let title = ref()
let checkitem = ref()
let verificationCode = ref()
let newcode = ref(false)
let send = ref(false)
let key = ref()
const emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const phonereg = /^1[3-9]\d{9}$/
let form = reactive({
    oldPassword: '',
    password: '',
    repassword: '',
    phone: '',
    email: '',
    newPhone: '',
    newEmail: '',
})
let moduleslist = {
    accountManagement: 0,// 账户管理
    changePassword: 1,// 修改密码
    changePhoneNumber: 2,// 修改手机号
    changeEmailAddress: 3,// 修改邮箱
    securitycenter: 4,// 安全中心
    verification: 5,// 验证
    setPhone: 6,// 设置手机号
    setEmail: 7,// 设置邮箱
}
let list = reactive([
    {
        id: 0,
        title: '修改密码',
        description: '已设置'
    },
    {
        id: 1,
        title: '修改手机号',
        description: userStore.phone ? userStore.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3") : "未设置"
    },
    {
        id: 2,
        title: '修改邮箱',
        description: userStore.email ? userStore.email.replace(/^(.{3}).*(.{9})$/, "$1****$2") : "未设置"
    },
])
function modify(item: any) {
    if (item.title == '修改密码') {
        modules.value = 4
        checkitem.value = item.title
        title.value = item.title
    } else if (item.title == '修改手机号') {
        modules.value = 4
        checkitem.value = item.title
        title.value = '新手机号设置'
    } else if (item.title == '修改邮箱') {
        modules.value = 4
        checkitem.value = item.title
        title.value = '新邮箱设置'
    }
}
function setUp(item: any) {
    console.log(item);
    if (item.title == '修改手机号') {
        modules.value = moduleslist.setPhone
        title.value = '新手机号设置'
    } else if (item.title == '修改邮箱') {
        modules.value = moduleslist.setEmail
        title.value = '新邮箱设置'
    }
}
function mfSendCode() {
    if (modules.value == moduleslist.changeEmailAddress && form.email == '' || form.email == undefined || form.email == null) {
        message.value.error('请输入邮箱')
    } else if (modules.value == moduleslist.changePhoneNumber && form.phone == '' || form.phone == undefined || form.phone == null) {
        message.value.error('请输入手机号')
    } else if (!emailreg.test(form.email)) {
        message.value.error('邮箱格式错误')
    } else if (!phonereg.test(form.phone)) {
        message.value.error('手机号格式错误')
    } else if (modules.value == moduleslist.changeEmailAddress) {
        get(
            '/captcha/email',
            { Authorization: 'Bearer ' + userInfo.value.access_token },
            { email: form.email }
        ).then((res: any) => {
            if (res.success) {
                key.value = res.data.key
                newcode.value = true
                message.value.success('发送成功')
            } else {
                message.value.error(res.message)
            }
        }).catch((err) => {
            message.value.error(err.message)
        })
    } else if (modules.value == moduleslist.changePhoneNumber) {
        get(
            '/captcha/phone',
            { Authorization: 'Bearer ' + userInfo.value.access_token },
            { phone: form.phone }
        ).then((res: any) => {
            if (res.success) {
                key.value = res.data.key
                newcode.value = true
                message.value.success('发送成功')
            } else {
                message.value.error(res.message)
            }
        }).catch((err) => {
            message.value.error(err.message)
        })
    } else {
        message.value.error('未知错误')
    }
}
function sendcode() {
    if (modules.value == moduleslist.setEmail && form.newEmail == '' || form.newEmail == undefined || form.newEmail == null) {
        message.value.error('请输入邮箱')
    } else if (modules.value == moduleslist.setPhone && form.newPhone == '' || form.newPhone == undefined || form.newPhone == null) {
        message.value.error('请输入手机号')
    } else if (form.newEmail != '' && modules.value == moduleslist.setEmail) {
        if (!emailreg.test(form.newEmail)) {
            message.value.error('邮箱格式错误')
        } else {
            get(
                '/captcha/email',
                { Authorization: 'Bearer ' + userInfo.value.access_token },
                { email: form.newEmail }
            ).then((res: any) => {
                if (res.success) {
                    key.value = res.data.key
                    send.value = true
                    message.value.success('发送成功')
                } else {
                    message.value.error(res.message)
                }
            }).catch((err) => {
                message.value.error(err.message)
            })
        }
    } else if (form.newPhone != '' && modules.value == moduleslist.setPhone) {
        if (!phonereg.test(form.newPhone)) {
            message.value.error('手机号格式错误')
        } else {
            get(
                '/captcha/phone',
                { Authorization: 'Bearer ' + userInfo.value.access_token },
                { phone: form.newPhone }
            ).then((res: any) => {
                if (res.success) {
                    key.value = res.data.key
                    send.value = true
                    message.value.success('发送成功')
                } else {
                    message.value.error(res.message)
                }
            }).catch((err) => {
                message.value.error(err.message)
            })
        }
    } else {
        message.value.error('未知错误')
    }
}
function onFinish() {
    console.log('验证码输入完成');
}
function modifypassword() {
    if (form.password != form.repassword) {
        Message.error('两次新密码不一致')
    } else if (form.oldPassword == form.repassword) {
        Message.error('新密码不能与旧密码相同')
    } else if (form.password == form.repassword) {
        put(
            '/user/edit/password',
            { newPassword: form.repassword, oldPassword: form.oldPassword },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('修改成功')
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err.message)
        })
    }

}
function modifycode() {
    if (modules.value == moduleslist.changeEmailAddress && verificationCode.value == '' || verificationCode.value == undefined || verificationCode.value == null) {
        message.value.error('请输入邮箱验证码')
    } else if (modules.value == moduleslist.changePhoneNumber && verificationCode.value == '' || verificationCode.value == undefined || verificationCode.value == null) {
        message.value.error('请输入手机验证码')
    } else if (verificationCode.value.length != 6) {
        message.value.error('验证码长度不足6位')
    } else if (modules.value == moduleslist.changeEmailAddress) {
        put(
            '/user/edit/email',
            {
                payload: form.email,
                key: key.value,
                code: verificationCode.value
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('修改成功')
                modules.value = moduleslist.accountManagement
                verificationCode.value = ''
            } else {
                Message.error(res.message)
            }
        }).catch(err => {
            Message.error(err.message)
        })
    } else if (modules.value == moduleslist.changePhoneNumber) {
        put(
            '/user/edit/phone',
            {
                payload: form.phone,
                key: key.value,
                code: verificationCode.value
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('修改成功')
                modules.value = moduleslist.accountManagement
                verificationCode.value = ''
            } else {
                Message.error(res.message)
            }
        }).catch(err => {
            Message.error(err.message)
        })
    } else {
        message.value.success('未知错误')
    }
}
function save() {
    if (modules.value == moduleslist.setEmail && verificationCode.value == '' || verificationCode.value == undefined || verificationCode.value == null) {
        message.value.error('请输入手机验证码')
    } else if (modules.value == moduleslist.setPhone && verificationCode.value == '' || verificationCode.value == undefined || verificationCode.value == null) {
        message.value.error('请输入邮箱验证码')
    } else if (verificationCode.value.length != 6) {
        message.value.error('验证码长度不足6位')
    } else if (modules.value == moduleslist.setEmail) {
        put(
            '/user/edit/email',
            {
                payload: form.newEmail,
                key: key.value,
                code: verificationCode.value
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('修改成功')
                modules.value = moduleslist.accountManagement
                verificationCode.value = ''
            } else {
                Message.error(res.message)
            }
        }).catch(err => {
            Message.error(err.message)
        })
    } else if (modules.value == moduleslist.setPhone) {
        put(
            '/user/edit/phone',
            {
                payload: form.newPhone,
                key: key.value,
                code: verificationCode.value
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('修改成功')
                modules.value = moduleslist.accountManagement
                verificationCode.value = ''
            } else {
                Message.error(res.message)
            }
        }).catch(err => {
            Message.error(err.message)
        })
    } else {
        message.value.error('未知错误')
    }
}
</script>

<style lang='scss' scoped>
.password {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .passwordform {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 1.25rem 0;
        flex-direction: column;
    }

    .passwordbtn {
        display: flex;
        justify-content: center;

        .btn {
            width: 100%;
        }
    }

}

.code {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .back {
        width: 100%;
    }

    .codeform {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1.875rem 0;

        .codeinput {
            max-width: 400px;
        }
    }

    .codebtn {
        display: flex;
        justify-content: center;

        .btn {
            width: 100%;
        }
    }
}

.set {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .back {
        width: 100%;
    }

    .setPhone {
        .sendcode {
            margin-top: 1.25rem;
            display: flex;
        }

        .verification-code {
            justify-content: center;
        }

        .setbtn {
            margin: 1.25rem 0;

            .btn {
                width: 100%;
            }
        }
    }

    .setEmail {
        .sendcode {
            display: flex;
        }

        .verification-code {
            justify-content: center;
            margin-top: .625rem;
        }

        .setbtn {
            margin: 1.25rem 0;

            .btn {
                width: 100%;
            }
        }

    }
}
</style>
