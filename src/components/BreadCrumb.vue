<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import breaCrumb from '@/mixins/breadCrumb'
    export default {
        mixins:[breaCrumb] //混入其他的配置項，先執行混入的再執行自己的，自己有的項就優先用自己的
    }
</script>

<style lang="less" scoped>

</style>