<template>
    <div class="mit">
        <el-submenu v-if="menu.children" :index="menu.url">
            <!-- index這個屬性對應到這個element ui所提供的路由模式需要的path，所以一定要加 -->
            <!-- 判斷傳進來的每個選單對象當中是否有children屬性，沒有時回傳undefined視為false -->
             <!-- 有子集的用submenu，沒有子集的要用普通的menu -->
            <template slot="title">
                <i :class="menu.icon"></i>
                <span slot="title">{{ menu.name }}</span>
            </template>
            <!-- 組件遞回，自己調自己，所以不必把自己註冊在自己的組件中 -->
            <!-- 外面是怎麼調用自己的，裡面也要用同樣的方式調用自己 -->
            <nav-menu v-for="(item,index) in menu.children" :menu="item" :key="index"></nav-menu>
        </el-submenu>
        <el-menu-item v-else :index="menu.url" >
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
    </div>
</template>

<script>
export default {
    name:'NavMenu',//給組件名字，就能夠自己調用自己的組件
    props: {  //被父組件傳進來的東西，用menu這個名字接收
        menu: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="less" scoped>
.mit{width: 200px;}
</style>