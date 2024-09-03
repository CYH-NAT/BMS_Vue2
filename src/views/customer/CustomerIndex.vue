<template>
    <div>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="18">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-input placeholder="用戶暱稱"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="用戶暱稱"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="聯絡電話"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24" class="mt" v-show="show">
                        <el-col :span="8">
                            <el-input placeholder="車牌號"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="客戶類型"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="配送區域"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="2">
                        <span class="el-dropdown-link" @click="show=!show">
                            {{ show?'收起':'展開' }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                </el-col>
                <el-col :span="4" class="tr">
                    <el-button type="primary">查詢</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-row>
                <el-col :span="12">
                    <el-button type="primary">添加客戶</el-button>
                    <el-button type="primary">批量導入</el-button>
                    <el-button type="primary">導入模板下載</el-button>
                    <el-button type="primary">導出客戶</el-button>
                    <el-button type="warning">分配</el-button>
                    <el-button type="warning">查看地圖</el-button>
                    <el-button type="warning">+新增</el-button>
                </el-col>
                <el-col :span="12" class="tr">
                    <el-button>
                        <i class="el-icon-edit"></i>修改</el-button>
                    <el-button type="danger">刪除</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" v-loading="loading" element-loading-text="拚命載入中..."
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column label="序號" type="index"></el-table-column>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="nickname" label="簡稱"></el-table-column>
                <el-table-column prop="name" label="所屬公司"></el-table-column>
                <el-table-column prop="mainBusiness" label="主營業務"></el-table-column>
                <el-table-column prop="balance" label="帳戶餘額"></el-table-column>
                <el-table-column prop="confirm" label="認證狀態">
                    <template slot-scope="scope">
                        <!-- 對該行數據進行操作 -->
                        {{ scope.row.confirm == 1 ? '有' : '無' }}
                    </template>
                </el-table-column>
                <el-table-column prop="mile" label="運輸里程數"></el-table-column>
                <el-table-column prop="contact" label="聯絡人"></el-table-column>
                <el-table-column prop="cell" label="聯絡電話"></el-table-column>
                <el-table-column prop="register" label="註冊地"></el-table-column>
                <el-table-column prop="account" label="銀行帳號"></el-table-column>

  
                <el-table-column label="操作" min-width="100px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)" type="primary">詳情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pageData.page" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                layout="total, sizes, prev, pager, next, jumper" :total="total" class="fr mt">
            </el-pagination>
            <div class="clear"></div>
        </el-card>
    </div>
</template>

<script>
import { post } from '@/utils/https'
export default {
    data(){
        return{
            show:false,
            params: {
                No: '',
                name: ''
            },
            date: ['', ''],
            pageData: {
                page: 1,
                pageSize: 10
            },
            tableData: [],
            total: 0,
            loading: false
        }
    },
    methods: {
        async loadData() {
            this.loading = true
            const [startDate, endDate] = this.date //日期對象是不會在前後端交互中出現，通常換成字串或時間戳
            const { data: { list, total } } = await post('/customerList', { ...this.params, ...this.pageData, startDate, endDate })
            //console.log(list)
            this.loading = false
            this.tableData = list;
            this.total = total;
        },
        reset() {
            this.params = { No: '', name: '', status: 1 };
            this.date = ['', ''];
            this.pageData = { page: 1, pageSize: 10 };
            this.loadData()
        },
        handleCurrentChange(page) {
            //console.log('頁碼改變'),page是被點到的頁碼，像是事件對象的形參
            this.pageData.page = page //點到誰就把頁碼變成點到的頁碼
            this.loadData()
        },
        handleSizeChange(pageSize) {
            //console.log('條數改變'),pagesize是每頁條數，像是事件對象的形參
            this.pageData.pageSize = pageSize
            this.loadData()
        },
        jump() {
            this.$router.push('/waybill/list/detail')
        },
        edit(e) {
            this.$message({
          message: '唉呀呀，這個功能暫不開放',
          type: 'warning'
        });
        },
        clearCache() {
            let vnode = this.$vnode;
            let parentVnode = vnode && vnode.parent;
            if (
                parentVnode &&
                parentVnode.componentInstance &&
                parentVnode.componentInstance.cache
            ) {
                var key =
                    vnode.key == null
                        ? vnode.componentOptions.Ctor.cid +
                        (vnode.componentOptions.tag
                            ? `::${vnode.componentOptions.tag}`
                            : "")
                        : vnode.key;
                var cache = parentVnode.componentInstance.cache;
                var keys = parentVnode.componentInstance.keys;
                if (cache[key]) {
                    this.$destroy();
                    // remove key
                    if (keys.length) {
                        var index = keys.indexOf(key);
                        if (index > -1) {
                            keys.splice(index, 1);
                        }
                    }
                    cache[key] = null;
                }
            }
        }
    },
    created(){
        this.loadData()
    }
}
</script>

<style lang="less" scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
  }

</style>