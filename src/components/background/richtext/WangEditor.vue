<template>
  <div>
    <div style="border-bottom: 1px solid #e8e8e8;">
      <Toolbar style="width: 100%;background-color: #FCFCFC;margin: 0 auto;" :editor="editorRef"
        :defaultConfig="toolbarConfig" :mode="mode" />
    </div>
    <div style="height: 80vh;background-color: rgb(245, 245, 245);overflow-y: auto;position: relative;">
      <div
        style="max-width: 68.75rem;margin: 15px auto 15px auto;background-color: #fff;padding: 20px 50px 50px 50px;border: 1px solid #e8e8e8;box-shadow: 0 2px 10px rgb(0 0 0 / 12%);">
        <div style="padding: 20px 0;border-bottom: 1px solid #e8e8e8;">
          <input v-model="from.title" placeholder="标题"
            style="font-size: 30px;border: 0;outline: none;width: 100%;line-height: 1.5;text-align: center;">
          <input v-model="from.author" placeholder="作者"
            style="font-size: 16px;border: 0;outline: none;width: 100%;line-height: 1;text-align: center;">
        </div>
        <Editor style="min-height: 26.25rem;margin-top: 20px;" v-model="valueHtml" :defaultConfig="editorConfig"
          :defaultContent="defaultContent" :mode="mode" @onCreated="handleCreated" />

      </div>
      <div style="text-align: end;margin: 0 1.25rem 2.5rem 1.25rem ">
        <a-button type="primary" @click="preview">预览</a-button>
        <a-button type="primary" style="margin-left:1.25rem;" @click="postEdit">保存</a-button>
      </div>
    </div>
    <a-drawer :visible="visible" placement="right" @ok="handleOk" @cancel="handleCancel" ok-text="保存">
      <template #title>
        附件上传
      </template>
      <upload v-model:type="type" v-model:address="address" />
    </a-drawer>
    <a-modal title="预览" :visible="view" @ok="view = false" @cancel="view = false">
      <div class="preview">
        <div class="title">
          {{ from.title }}
        </div>
        <div class="author">
          {{ from.author }}
        </div>
        <div class="content">
          <div v-html="valueHtml"></div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang='ts'>
import '@wangeditor-next/editor/dist/css/style.css'
import { onBeforeUnmount, ref, reactive, shallowRef, onMounted, computed } from 'vue'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue'
import { type IEditorConfig, type IButtonMenu, type IDomEditor, Boot } from '@wangeditor-next/editor'
import type { ImageElement, InsertFnType } from '@/stores/types'
import { get, post } from "@/api/api"
import upload from '@/components/background/upload/upload.vue'
import { ApiAddress } from '@/setting/setting'
import useUserStore from '@/stores/modules/user' // 用户信息仓库
import useEditorSotre from '@/stores/modules/editor'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
let visible = ref(false)
let view = ref(false)
let type = ref('.xlsx,.pdf,.doc,.docx,.txt,.7z,.zip,.rar,.ppt,.pptx')
let address = ref(ApiAddress + '/file/upload')
const userStore = useUserStore()
const EditorSotre = useEditorSotre()
const router = useRouter()
let id = computed(() => router.currentRoute.value.query.nid)
const userInfo = computed(() => userStore.userinfo)
const hasRegistered = computed(() => EditorSotre.Registered)
let modeAddress
const headers = reactive({
  Authorization: 'Bearer ' + userInfo.value.access_token
})
let mode = 'default' // 'simple'
const editorRef = shallowRef()
const imageList: Array<string> = []
const videoList: Array<string> = []
// 内容 HTML
const valueHtml = ref('<p></p>')
watch(() => id.value, (value) => {
  console.log(value);
  if (value != null && value != '' && value != undefined) {
    reviseArticle()
  }
})
let from = reactive(
  {
    title: '',
    author: '',
  }
)
// 模拟 ajax 异步获取内容
onMounted(() => {
  // setTimeout(() => {
  //   valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  // }, 1500
  registerMenus()
  if (id.value != undefined && id.value != null) {
    reviseArticle()
    modeAddress = ''
  }
})
class EnclosureButtonMenu implements IButtonMenu {   // TS 语法
  title: string
  iconSvg?: string | undefined
  hotkey?: string | undefined
  alwaysEnable?: boolean | undefined
  tag: string
  width?: number | undefined
  constructor() {
    this.title = '附件' // 自定义菜单标题
    this.iconSvg = '<svg t="1724247145846" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4230" width="48" height="48"><path d="M924.672 126.976q36.864 36.864 54.784 82.432t17.92 93.696-17.92 93.696-54.784 82.432l-392.192 389.12q-36.864 36.864-90.624 61.44t-113.664 28.672-122.368-16.384-115.712-73.728q-52.224-52.224-72.704-113.152t-16.384-121.344 28.16-113.664 60.928-90.112l348.16-345.088q9.216-9.216 27.136-4.608t27.136 13.824q8.192 9.216 13.312 27.136t-4.096 27.136l-347.136 344.064q-27.648 27.648-46.08 64.512t-21.504 78.848 12.288 84.992 55.296 82.944q35.84 35.84 79.36 50.688t86.528 12.288 81.92-18.944 66.56-44.032l391.168-388.096q27.648-27.648 39.424-57.344t11.264-58.88-13.824-56.832-36.864-51.2q-44.032-43.008-98.816-40.448t-110.08 57.856l-353.28 351.232q-23.552 23.552-23.04 52.224t18.944 47.104q22.528 22.528 51.712 18.432t47.616-22.528l320.512-318.464q9.216-9.216 27.136-4.608t27.136 13.824 14.336 27.136-4.096 27.136l-321.536 318.464q-36.864 36.864-70.656 51.2t-63.488 12.8-55.296-15.872-47.104-34.816q-17.408-16.384-31.232-41.984t-15.872-56.32 10.752-65.536 49.664-70.656q18.432-18.432 32.768-33.792 12.288-13.312 23.04-23.552t11.776-11.264l285.696-284.672q36.864-36.864 80.384-57.856t88.576-24.064 88.576 12.288 80.384 52.224z" p-id="4231"></path></svg>' // 可选
    this.tag = 'button'
  }
  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor: IDomEditor): string | boolean {   // TS 语法
    return false
  }
  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor: IDomEditor): boolean {  // TS 语法
    return false
  }
  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor: IDomEditor): boolean {   // TS 语法
    return false
  }

  // 点击菜单时触发的函数
  exec(editor: IDomEditor, value: string | boolean) {   // TS 语法 
    visible.value = true

  }
}
class SaveButtonMenu implements IButtonMenu {   // TS 语法
  title: string
  iconSvg?: string | undefined
  hotkey?: string | undefined
  alwaysEnable?: boolean | undefined
  tag: string
  width?: number | undefined
  constructor() {
    this.title = '保存' // 自定义菜单标题
    this.iconSvg = '<svg t="1724326512296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4582" width="48" height="48"><path d="M870.4 0H153.6A153.6 153.6 0 0 0 0 153.6v716.8A153.984 153.984 0 0 0 153.6 1024h716.8A153.984 153.984 0 0 0 1024 870.4V153.6A153.6 153.6 0 0 0 870.4 0z m-96.32 71.296V432H249.984V71.296H774.08zM952.704 870.4a82.112 82.112 0 0 1-82.304 81.92H153.6a82.112 82.112 0 0 1-82.304-81.92V153.6c0-45.44 36.864-82.24 82.304-82.304h24.96V467.84a35.456 35.456 0 0 0 35.648 35.456h595.456a35.456 35.456 0 0 0 35.712-35.456V71.296H870.4c45.44 0 82.24 36.864 82.304 82.304v716.8zM649.6 355.456a35.84 35.84 0 0 0 35.648-35.84V172.608a35.712 35.712 0 0 0-71.36 0v147.008a35.84 35.84 0 0 0 35.584 35.84h0.128zM256 658.304h512a36.544 36.544 0 0 1 0 73.152H256a36.544 36.544 0 0 1 0-73.152z" p-id="4583"></path></svg>' // 可选
    this.tag = 'button'
  }
  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor: IDomEditor): string | boolean {   // TS 语法
    return false
  }
  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor: IDomEditor): boolean {  // TS 语法
    return false
  }
  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor: IDomEditor): boolean {   // TS 语法
    return false
  }

  // 点击菜单时触发的函数
  exec(editor: IDomEditor, value: string | boolean) {   // TS 语法               
    postEdit()
    console.log(editor, value);

  }
}
const defaultContent = [
  {
    type: 'paragraph',
    lineHeight: '1.5',
    children: [
      { text: '', fontFamily: '宋体', fontSize: '15px' }
    ]
  },
]
const menu1Conf = {
  key: 'enclosure', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new EnclosureButtonMenu() // 把 `YourMenuClass` 替换为你菜单的 class
  },
}
const menu2Conf = {
  key: 'save', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new SaveButtonMenu() // 把 `YourMenuClass` 替换为你菜单的 class
  },
}
const registerMenus = () => {
  if (!hasRegistered.value) {
    Boot.registerMenu(menu1Conf)
    Boot.registerMenu(menu2Conf)
    EditorSotre.setRegisterer(true)
  }
};
const toolbarConfig = {
  insertKeys: {
    index: 0,
    keys: ['']
  },

  toolbarKeys: [
    // 菜单 key
    {
      key: 'group-insert', // 必填，要以 group 开头
      title: '插入', // 必填
      iconSvg: '<svg t="1722073126820" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6251" width="64" height="64"><path d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z" p-id="6252"></path></svg>',
      menuKeys: ['uploadImage', 'uploadVideo', 'insertTable'] // 下级菜单 key ，必填
    },
    '|',
    'undo', // 撤销
    'redo', // 重做
    'clearStyle', // 清除格式
    '|',
    'headerSelect', // 标题
    'fontFamily', // 字体
    'fontSize', // 字号
    'bold', // 加粗
    'italic', // 倾斜
    'through', // 删除线
    'underline', // 下划线
    {
      key: 'group-more-style', // 必填，要以 group 开头
      title: '更多文字效果', // 必填
      iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>',
      menuKeys: ['sup', 'sub', 'code'] // 下级菜单 key ，必填
    },
    '|',
    'color', // 字体颜色
    'bgColor', // 背景颜色
    {
      key: 'group-justify', // 必填，要以 group 开头
      title: '对齐', // 必填
      iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
      menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'] // 下级菜单 key ，必填
    },
    'bulletedList', // 无序列表
    'numberedList', // 有序列表
    {
      key: 'group-indent', // 必填，要以 group 开头
      title: '缩进', // 必填
      iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
      menuKeys: ['indent', 'delIndent']
    },
    'lineHeight', // 行高
    '|',
    // todo、link、引用、分割线
    'todo', // 待办
    'insertLink', // 插入链接
    'blockquote', // 引用
    'divider', // 分割线
  ],
}
toolbarConfig.insertKeys = {
  index: 26,
  keys: ['enclosure', 'save']
}
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    insertImage: {
      onInsertedImage(imageNode: ImageElement | null) {  // TS 语法
        // onInsertedImage(imageNode) {                    // JS 语法
        if (imageNode == null) return
        const { src } = imageNode
        imageList.push(src)
      }
    },
    uploadImage: {
      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 5 * 1024, // 5kb
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 20 * 1024 * 1024, // 20M
      // // 最多可上传几个文件，默认为 100
      // maxNumberOfFiles: 5,
      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/*'],
      // 自定义上传
      async customUpload(file: any, insertFn: InsertFnType) { // 文件上传
        await post(
          '/file/upload',
          { file },
          { headers: { "Content-Type": 'multipart/form-data', headers } }
        ).then((res: any) => {
          insertFn(res.data.url)
        })
      },
    },
    insertVideo: {
      onInsertedVideo(videoNode: ImageElement | null) {  // TS 语法
        // onInsertedImage(imageNode) {                    // JS 语法
        if (videoNode == null) return
        const { src } = videoNode
        videoList.push(src)
      }
    },
    uploadVideo: {
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 20 * 1024 * 1024, // 20M
      // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['video/*'],
      async customUpload(file: any, insertFn: InsertFnType) { // 文件上传
        await post(
          '/file/upload',
          { file },
          { headers: { "Content-Type": 'multipart/form-data', headers } }
        ).then((res: any) => {
          insertFn(res.data.url)
        })
      }
    },
    fontSize: {
      fontSizeList: [
        '12px', '13px', '14px', '15px', '16px', '19px', '22px', '24px', '29px', '32px', '40px', '48px',
      ]
    },
    lineHeight: {
      lineHeightList: ['1', '1.25', '1.5', '1.75', '2']
    },
  }
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  console.log("change:=>", editor.getHtml())
  console.log("image:=>", imageList)
  console.log("video:=>", videoList)
}
function handleOk() {
  visible.value = false
}
function handleCancel() {
  visible.value = false
}
function postEdit() {
  if (from.title == '') {
    Message.error('标题不能为空')
    return
  } else if (from.author == '') {
    Message.error('作者不能为空')
    return
  } else {
    post(
      '/news/',
      {
        title: from.title,
        author: from.author,
        content: valueHtml.value
      },
      { Authorization: 'Bearer ' + userInfo.value.access_token }
    ).then((res) => {
      if (res.success) {
        Message.success('发布成功')
      } else {
        Message.error(res.message)
      }
    }).catch((err) => {
      Message.error(err)
    })
  }
}
function preview() {
  view.value = true

}
function reviseArticle() {
  get(
    `/news/${id.value}`,
    { Authorization: 'Bearer ' + userInfo.value.access_token },
  ).then((res: any) => {
    if (res.success) {
      from.title = res.data.title
      from.author = res.data.author
      valueHtml.value = res.data.content
    } else {
      Message.error(res.message)
    }
  }).catch((err) => {
    Message.error(err)
  })
}
</script>

<style lang='scss' scoped>
.preview {
  .title {
    text-align: center;
    font-size: 30px;
    border: 0;
    outline: none;
    width: 100%;
    line-height: 1.5;
  }

  .author {
    text-align: center;
    font-size: 16px;
    border: 0;
    outline: none;
    width: 100%;
    line-height: 1;
  }
}
</style>
