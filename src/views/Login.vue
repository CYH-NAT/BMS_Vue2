<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="6">
                <!-- 6/24=25% -->
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <h1>邦達國際物流後臺管理系統</h1>
                    </div>
                    <el-form ref="ruleForm" label-width="80px" class="demo-ruleForm" :rules="rules" :model="ruleForm">
                        <!-- :在elementui中 model="ruleForm" 有規則的表單 -->
                        <el-form-item label="用戶名" prop="username">
                            <el-input v-model="ruleForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密碼" prop="password">
                            <el-input type="password" v-model="ruleForm.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="login" style="width: 100%" :loading="loading">登入</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row>

        </el-row>
    </div>
</template>

<script>
//mock 模擬接口：生成模擬數據
import { mapMutations } from 'vuex';
import {post} from '@/utils/https';
export default {
    data() {
        return {
            loading:false,
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '請輸入用戶名', trigger: 'blur' },
                    { pattern: /^\w{4,8}$/, message: '用戶名要求使用4-8位數字字母組合', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '請輸入密碼', trigger: 'blur' },
                    { pattern: /^\d{6}$/, message: '密碼要求6位數字', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        ...mapMutations(['setRole']),
        login() { //從elementui自定義的form組件中調用validate方法
            
            this.$refs.ruleForm.validate((valid, err) => {  //據文檔所說，valid是個布爾值，err是哪個語句校驗失敗
                if (valid) {
                    //發請求
                    this.loading=!this.loading //登入鍵轉圈圈
                    post('/login',this.ruleForm).then(res => { //請求成功的時候走的路線。then可以傳兩個函數當作參數，分別為promise 成功或失敗時的回調函數，只傳一個時默認為成功時的回調函數
                        console.log('結果是', res)
                        this.loading=!this.loading 
                        sessionStorage.setItem('token',res.token)  //把上方res改成{token,nickname}作解構賦值也行，只是不想再改了
                        sessionStorage.setItem('nickname',res.nickname)
                        this.setRole(res.role) //後端得到的身份設置到vuex中
                        this.$router.push('/')  //成功的話跳到主頁
                    }).catch((err)=>{  //then的第二個失敗時回調函數
                        console.error(err)
                        this.loading=!this.loading 
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
//less sass都差不多，還有stylus
// less讓css可以嵌套，有子父集結構
@a: red; //less可以定義變量，使用時直接@變量名

//如果想要讓A選擇器使用和B選擇器相同的CSS樣式，那就在A要面加上B()
//樣式內部的值可以運算，單位擇一即可
//還有函數、導入功能，但很少用
.box-card {
    margin-top: 100px*2;

    h1 {
        text-align: center;
    }
}
</style>