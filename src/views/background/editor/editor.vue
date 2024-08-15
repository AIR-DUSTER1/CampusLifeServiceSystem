<template>
    <div>
        <WangEditor />
    </div>
</template>

<script setup lang='ts'>
import WangEditor from '@/components/background/richtext/WangEditor.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { post } from '@/api/api'
const router = useRouter()
const query = router.currentRoute.value.query
const slug = query.slug


</script>

<style lang='scss' scoped></style>
