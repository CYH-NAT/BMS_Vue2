<template>
<div>
    <div class="top">
        <el-dropdown class="fr" @command="handleClick">
            <span class="el-dropdown-link">
                歡迎您{{ nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">個人中心</el-dropdown-item>
                <el-dropdown-item command="b">修改密碼</el-dropdown-item>
                <el-dropdown-item command="c">退出登入</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <p class="fr date">今天是你在字節的第
            <span>{{days}}</span>天
        </p>
        <div class="clear"></div>
    </div>
</div>
</template>

<script>
import {get} from '@/utils/https'
export default {
    data(){
        return {
            nickname:sessionStorage.getItem('nickname'),
            time:new Date()
        }
    },
    created(){
        this.workTime()
    },
    methods:{
        async workTime(){
            const {time} = await get('/in')
            this.time=time
        },
        handleClick(k){
            if(k=='c'){
                sessionStorage.clear()
                this.$router.push('/login')
            }
        }
    },
    computed:{
        days(){
            let now=new Date()
            let target=new Date(this.time);
            return Math.floor((now-target)/86400/1000)
        }
    }
}
</script>

<style lang="less" scoped>
.top {
    height: 60px;
    line-height: 60px;
    .date{
        margin-right: 20px;
        span{
            font-size: 24px;
            color:#5696ff
        }
    }
}
</style>