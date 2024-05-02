<template>
    <span  class="footer-container">
        <a-card class="footer-card"> Copyright © {{ projectName }} 2024 </a-card>
    </span>
</template>

<script lang="ts" setup name="backfooter">
import { projectName } from '@/setting/setting'
import { useWindowSize } from '@vueuse/core'
import { shallowRef ,watch,onMounted} from 'vue';
const { width } = useWindowSize()
let footerwidth = shallowRef()
let collapsed =  defineModel('collapsed')
let footerposition = defineModel('footerposition')
onMounted(()=>{
    getfooterwidth()
})
function getfooterwidth() {
    if (collapsed.value) {
            footerwidth.value = width.value - 55 +'px'
        }else{
            footerwidth.value = width.value - 207 +'px'
        }
}
watch(collapsed,
    () => {
        getfooterwidth()
    }
)

</script>

<style lang="scss" scoped>
.footer-container{
    position: v-bind(footerposition);
    bottom: 3px;
    width: v-bind(footerwidth);
    transition: all 0.3s;
    .footer-card {
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-top: 5px;
    :deep(.arco-card-body){
        padding: 0;
    }
}
}

</style>