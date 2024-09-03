<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-col :span="12" class="info" style="text-align: left;">
                <span>運單編號:YGC2017110000001</span>
                <span>創建時間:2022-08-24</span>
                <span>審核人員:張三豐</span>
            </el-col>
            <el-col :span="12" class="tr">
                <el-button type="primary" @click="back">返回</el-button>
            </el-col>
            <div class="clear"></div>
        </el-card>
        <el-card class="mt">
            <el-steps :active="2" align-center>
                <el-step title="步骤1" description="未發貨"></el-step>
                <el-step title="步骤2" description="已發貨"></el-step>
                <el-step title="步骤3" description="運輸中"></el-step>
                <el-step title="步骤4" description="已完成"></el-step>
            </el-steps>
        </el-card>
        <el-card class="mt">
            <h1>基礎訊息</h1>
            <el-row class="product-detail">
                <el-col :span="6">
                    <p>客戶名稱：諾來科技有限公司</p>
                    <p>貨物名稱：口罩</p>
                    <p>數量：8(噸)</p>
                </el-col>
                <el-col :span="6">
                    <p>是否是易燃易爆物品：不是</p>
                    <p>結算方式：現付</p>
                    <p>運費：12000元</p>
                </el-col>
                <el-col :span="6">
                    <p>發貨單據：暫未上傳</p>
                    <p>接貨單據：未上傳</p>
                    <p>所屬業務員：蘇澄海</p>
                </el-col>
                <el-col :span="6">
                    <p>客戶下單時間：2022-08-20</p>
                    <p>是否需要接貨：不需要</p>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <h1>運輸信息</h1>
            <el-row class="product-detail">
                <el-col :span="6">
                    <p>車牌號：京A12345</p>
                    <p>司機姓名：王五</p>                    
                </el-col>
                <el-col :span="6">
                    <p>司機電話：1888888888</p>
                    <p>司機地址：北京市朝陽區</p>                    
                </el-col>
                <el-col :span="6">
                    <p>司機身分證號：25789547854123698</p>
                    <p>所屬公司：天博運輸公司</p>                    
                </el-col>
                <el-col :span="6">
                    <p>預計運輸時間：8天</p>
                    <p>違約金：5000元</p>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <h1>經辦人員信息</h1>
            <el-row class="product-detail">
                <el-col :span="6">
                    <p>業務員：張三</p>                    
                </el-col>
                <el-col :span="6">
                    <p>審核員：李四</p>                     
                </el-col>
                <el-col :span="6">
                    <p>製單員：王五</p>                   
                </el-col>
                <el-col :span="6">
                    <p>備註：無</p>    
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import breadCrumb from '@/components/BreadCrumb'
export default {
    components: {
        breadCrumb
    },
    methods:{
        back(){
            this.$router.push('/waybill/list')
        }
    }
}
</script>

<style lang="less" scoped>
.mt {
    span {
        line-height: 40px;
    }
}
h1{
    text-align: left;
    margin:20px 0;
}
.product-datil p{
    text-align: left;
    line-height: 40px;
}
</style>