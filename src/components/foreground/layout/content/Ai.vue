<template>
    <div class="chat-container">
        <a-scrollbar type="embed" style="height: 90vh;width: 100%;overflow: hidden;" outer-class="chat-view">
            <div class="chat-view-content" id="chat">

            </div>
        </a-scrollbar>
        <div class="chat-input">
            <a-textarea class="chat-input-textarea" placeholder="请输入问题" v-model="text" :max-length="50" auto-size
                allow-clear show-word-limit :disabled="loading" />
            <a-button class="chat-input-button" :loading="loading" @click="sendtext" type="primary">发送</a-button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, toRaw, reactive, shallowRef, watch } from 'vue'
import { Message } from '@arco-design/web-vue'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import useUserStore from '@/stores/modules/user'
let chattext = shallowRef()// chat返回文本
let loading = shallowRef(false)// 发送请求中
const userStore = useUserStore()// 获取用户信息
const userInfo = userStore.getUserInfo()// 获取用户信息
let chatList = reactive({
    chat: <any>[

    ],
    user: <any>[

    ]
})
let pattern = /['"]|undefined/gi;// 去掉chat返回文本中的引号
let text = shallowRef()// 用户输入文本
//封装用户问题
let usertext = reactive({
    "content": "",
    "role": "user"
})
const ctrl = new AbortController()// 一个控制器对象
onMounted(() => {
    sendrequest()// 加载组件后发送默认对话
})
// 监听返回的chattext
watch(chattext, (value) => {
    let chatcontinuity = document.querySelectorAll(".chat-view-ai-continuity")
    chatcontinuity[chatcontinuity.length - 1]!.innerHTML = value
})
// 用户发送问题
function sendtext() {
    if (text.value == "") {
        Message.error("请输入问题")
        return
    } else {
        chatList.user.push(text.value)// 用户输入的文本保存到chatList中
        usertext.content = text.value// 封装用户问题
        renderuser()// 渲染用户对话
        sendrequest()// 发送对话请求
    }
}
// 封装对话请求
function sendrequest() {
    if (usertext.content == "") {
        usertext.content = "你好"
    }

    fetchEventSource('http://lirenjie.asia:8088/chat/zhipu/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: [{
                "content": "你好",
                "role": "user"
            },
            toRaw(usertext)
            ],
            system: "你是一名健康助手"
        }),
        signal: ctrl.signal,
        openWhenHidden: true,
        // 连接打开的回调
        async onopen(response) {
            console.log('onopen', response);
            loading.value = true // 发送请求中
            text.value = ""// 初始化用户问题
            chattext.value = ""// 初始化chat返回文本
            renderchat()// 渲染用户对话
        },
        // 接收到新消息时的回调
        onmessage(msg) {
            let term: string = ""// 创建文本缓存
            term += msg.data.replace(pattern, '')// 去掉chat返回文本中的引号
            chattext.value += term.replace(/[\\n]+/g, "<br />")// 替换chat返回数据中的\n换行符
            console.log('fetchEventSource:', msg.data)
        },
        // 连接关闭的回调
        onclose() {
            console.log('onclose')
            chatList.chat.push(chattext.value)// 会话结束后保存到chatList中
            loading.value = false// 请求结束
        },
        // 发生错误时的回调
        onerror(err) {
            console.log('onerror', err);
            ctrl.abort(); // 中断请求
            loading.value = false// 请求结束
            Message.error(err.message)
            throw err;
        }
    });
}
function renderchat() {
    // 获取chat视图
    const chat = document.getElementById("chat")
    // 创建chat父容器
    const ChatContainer = document.createElement('div')
    ChatContainer!.className = "chat-view-ai-content"
    ChatContainer.style.cssText = 'display: flex;align-items: flex-start;padding: 2.4vw;border-radius: 16px;margin-bottom: 10px;'
    // 创建chat子文本节点
    const chatcontinuity = document.createElement('div')
    chatcontinuity!.className = "chat-view-ai-continuity"
    chatcontinuity.style.cssText = 'line-height: 1.5;margin-left: 10px;background-color: bisque;padding: 2.4vw;border-radius: 16px; '
    // 创建chat子图片节点
    const chatimg = document.createElement('div')
    chatimg!.className = "chat-view-ai-img"
    chatimg!.style.cssText = 'width: 9.6vw;height: 9.6vw;min-width: 9.6vw;'
    // 创建chat子图片节点下的图片
    const img = document.createElement('img')
    img!.src = '/src/assets/images/logo.png'
    img!.style.cssText = 'width: 100%;height: 100%;'
    chat!.appendChild(ChatContainer)
    ChatContainer.appendChild(chatimg)
    chatimg.appendChild(img)
    ChatContainer.appendChild(chatcontinuity)
}
function renderuser() {
    // 获取chat视图
    const chat = document.getElementById("chat")
    // 创建user父容器
    const UserContainer = document.createElement('div')
    UserContainer!.className = "chat-view-user-content"
    UserContainer.style.cssText = 'display: flex;align-items: flex-start;flex-direction: row-reverse;padding: 2.4vw;border-radius: 16px;margin-bottom: 10px;'
    // 创建user子文本节点
    const UserText = document.createElement('div')
    UserText!.className = "chat-view-user-text"
    UserText.style.cssText = 'line-height: 1.5;margin-right: 10px;background-color: bisque;;padding: 2.4vw;border-radius: 16px;'
    // 创建user子图片节点
    const UserImg = document.createElement('div')
    UserImg!.className = "chat-view-user-img"
    UserImg!.style.cssText = 'width: 9.6vw;height: 9.6vw;min-width: 9.6vw;'
    // 创建user子图片节点下的图片
    const img = document.createElement('img')
    img!.src = userInfo.avatar
    img!.style.cssText = 'width: 100%;height: 100%;'
    UserText.innerHTML = chatList.user[chatList.user.length - 1]
    chat!.appendChild(UserContainer)
    UserContainer.appendChild(UserImg)
    UserImg.appendChild(img)
    UserContainer.appendChild(UserText)
}
</script>
<style lang='scss' scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    background-color: #f7f8fc;

    .chat-view {
        height: 90vh;
        width: 100%;
        border: 1px solid gray;

        .chat-view-content {
            margin: 1.6vw;
        }
    }

    .chat-input {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: calc(100% - 8.53333vw);
        border: .26667vw solid rgba(87, 116, 95, 0.08);
        border-radius: 16px;
        padding: 3.2vw 4.26667vw;

        .chat-input-textarea {
            flex: 6;
        }

        .chat-input-button {
            flex: 1;
        }
    }
}
</style>
