<template>
    <div>
        <el-empty description="頁面跑去火星了~">
            <el-button type="primary" @click="$router.push('/')">返回首頁</el-button>
            <router-link to="/">點我回首頁</router-link>
        </el-empty>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>

</style>