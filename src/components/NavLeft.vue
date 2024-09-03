<template>
    <div>
        <h1>邦達國際物流平台</h1>
        <el-menu background-color="#001529" text-color="#fff" :router="true">
            <!-- 在element中，:router="true"代表利用index屬性當作router切換 -->
            <menus-vue v-for="(item,index) in menuData" :menu="item" :key="index"></menus-vue>
        </el-menu>
    </div>
</template>

<script>
import {get} from '@/utils/https'
import MenusVue from './MenusVue.vue'  //MenusVue是我們自己取的名，不一定是他本來的名
export default {
    data(){
        return {
            menuData:[]
        }
    },
    created(){
        this.getMenu();
    },
    methods:{
        async getMenu(){ //宣告一個異步函數(因為要await get(/menu))
            //let res = await get('/menu');  //await後方若是一個promise，那就等那個promise resolve，把resolve 的值，當成該表達式的值。在這邊意思就是等待後端axios這個promise的resolve並賦值給res。
            let {data} = await get('/menu');
            //console.log(data);
            this.menuData=data
        }
    },
    components:{
        MenusVue
    }
}
</script>

<style lang="less" scoped>
h1{line-height: 80px;color: white;text-align: center;}
</style>