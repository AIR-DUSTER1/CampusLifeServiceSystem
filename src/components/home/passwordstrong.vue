<template>
    <a-input-password v-model="password" placeholder="请输入密码">
        <template #prefix>
            <icon-lock />
        </template>
    </a-input-password>
    <div v-if="password !== '' && password.length < 6" class="mt-1"
        style="color: rgb(var(--danger-6)); font-size: 12px">{{
        shortTip }}</div>
    <div class="passwordtip">
        <span class="tip" :class="[item.status]" ref="tip1" v-for="(item, index) of stronger" :key="index"></span>
    </div>
    <a-input-password v-model="repassword" placeholder="请再次输入密码">
        <template #prefix>
            <icon-lock />
        </template>
    </a-input-password>
    <div v-if="repassword != password" class="mt-1" style="color: rgb(var(--danger-6)); font-size: 12px">两次密码不一致</div>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue'

interface StrongTip {
    status: 'normal' | 'low' | 'middle' | 'strong'
}

const password = ref('')
const repassword = ref('')
const shortTip = ref('')
let tip1 = ref()

const stronger = reactive<StrongTip[]>([
    {
        status: 'normal',
    },
    {
        status: 'normal',
    },
    {
        status: 'normal',
    },
])
const tipValue = ref('弱')
watch(
    () => password.value,
    (newVal) => {
        const level = checkPassword(newVal)
        if (level === 1) {
            stronger[0].status = 'low'
            stronger[1].status = 'normal'
            stronger[2].status = 'normal'
            tipValue.value = '弱'
            tip1.value[1].innerHTML = '弱'
        } else if (level === 2) {
            stronger[0].status = 'low'
            stronger[1].status = 'middle'
            stronger[2].status = 'normal'
            tipValue.value = '中'
            tip1.value[1].innerHTML = '中'
        } else if (level >= 3) {
            stronger[0].status = 'low'
            stronger[1].status = 'middle'
            stronger[2].status = 'strong'
            tipValue.value = '强'
            tip1.value[1].innerHTML = '强'
        } else {
            shortTip.value = '请输入长度至少为6位数的密码'
            stronger.forEach((it) => (it.status = 'normal'))
        }
    }
)
//密码强度校验
function checkPassword(pwd: string) {
    /*
     返回密码的强度级别
     */
    function checkStrong(sPW: string) {
        if (sPW.length < 6) return 0 //密码太短或太长
        let modes = 0
        for (let i = 0; i < sPW.length; i++) {
            //测试每一个字符的类别并统计一共有多少种模式.
            modes |= charMode(sPW.charCodeAt(i))
        }
        return bitTotal(modes)
    }
    /*
     判断字符类型
     */
    function charMode(iN: number) {
        if (iN >= 48 && iN <= 57)
            //数字
            return 1
        if (iN >= 65 && iN <= 90)
            //大写字母
            return 2
        if (iN >= 97 && iN <= 122)
            //小写
            return 4
        else return 8 //特殊字符
    }
    /*
     统计字符类型
     */
    function bitTotal(num: number) {
        let modes = 0
        for (let i = 0; i < 4; i++) {
            if (num & 1) modes++
            num >>>= 1
        }
        return modes
    }
    /**
     * 密码强度等级说明，字符包括：小写字母、大写字母、数字、特殊字符
     * 1---密码包含其中之一
     * 2---密码包含其中之二
     * 3---密码包含其中之三
     * 4---密码包含其中之四
     */
    return checkStrong(pwd)
}
function getpassword() {
    return [password.value, repassword.value]
}
</script>
<style scoped lang="scss">
.passwordtip {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 50%;
    margin: 2% 0;
    margin-left: 50%;

    .tip {
        height: 16px;
        border-radius: 2px;
        background-color: #fff;
        width: 28%;
        text-align: center;
        margin-right: 2px;
    }

    .normal {
        background-color: #f3f3f3;
    }

    .low {
        background-color: #f00;
    }

    .middle {
        background-color: #dceb0c;
    }

    .strong {
        background-color: #0c94ee;
    }
}
</style>