<template>
    <div>
        <el-container>
            <el-aside width="200px" class="aside">
                <!-- el-aside是個容器 -->
                <nav-left></nav-left>
            </el-aside>
            <el-container class="rpart">
                <el-header>
                    <top-header></top-header>
                </el-header>
                <el-main>
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </el-main>
                <el-footer class="mt">
                    京ICP備8888888888號 京公安網備123456號
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import NavLeft from '@/components/NavLeft.vue';
import TopHeader from '@/components/TopHeader';
export default {
    components:{
        NavLeft,TopHeader
    }
}
</script>

<style scoped lang="less">
.aside{height:100vh;background-color: #001529;}//100vh個視圖高度 。100vw是100個視圖寬度
::-webkit-scrollbar{
    display: none;  //隱藏滾動條
}
.rpart{background-color: #e9eef3;}
.el-header{background-color: #fff;padding: 0 20px;} //在審查元素時可以發現到他的class名和標籤名一致
.el-main{height: 70vh;}
.el-footer{text-align: center;font-size: 12px; color: #666;}
</style>