<template>
  <div>
    <div style="border-bottom: 1px solid #e8e8e8;">
      <Toolbar style="width: 100%;background-color: #FCFCFC;margin: 0 auto;" :editor="editorRef"
        :defaultConfig="toolbarConfig" :mode="mode" />
    </div>
    <div style="height: calc(100% - 40px);background-color: rgb(245, 245, 245);overflow-y: auto;position: relative;">
      <div
        style="width: 850px;margin: 30px auto 150px auto;background-color: #fff;padding: 20px 50px 50px 50px;border: 1px solid #e8e8e8;box-shadow: 0 2px 10px rgb(0 0 0 / 12%);">
        <div style="padding: 20px 0;border-bottom: 1px solid #e8e8e8;">
          <input placeholder="Page title..."
            style="font-size: 30px;border: 0;outline: none;width: 100%;line-height: 1;">
        </div>
        <Editor style="min-height: 900px;margin-top: 20px;" v-model="valueHtml" :defaultConfig="editorConfig"
          :defaultContent="defaultContent" :mode="mode" @onCreated="handleCreated" />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import '@wangeditor-next/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue'
import { type IEditorConfig } from '@wangeditor-next/editor'
import type { ImageElement, InsertFnType } from '@/stores/types'
import { post } from "@/api/api"
let mode = 'default' // 'simple'
const editorRef = shallowRef()
const imageList: Array<string> = []
const videoList: Array<string> = []
// 内容 HTML
const valueHtml = ref('<p></p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  // setTimeout(() => {
  //   valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  // }, 1500)
})
const defaultContent = [
  {
    type: 'paragraph',
    lineHeight: '1.5',
    children: [
      { text: '', fontFamily: '宋体', fontSize: '15px' }
    ]
  },
]
const toolbarConfig = {
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
          'http://feiniao-api.xkaipro.com:18080/file/upload',
          { file },
          { headers: { "Content-Type": 'multipart/form-data' } }
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
          'http://feiniao-api.xkaipro.com:18080/file/upload',
          { file },
          { headers: { "Content-Type": 'multipart/form-data' } }
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
</script>

<style lang='scss' scoped></style>
