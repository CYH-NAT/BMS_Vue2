<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row>
                <el-col :span="6">
                    <el-input placeholder="請輸入內容" v-model="params.keyword" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="loadData"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6" :offset="12" style="text-align: right;">
                    <el-button type="primary" @click="newAdd">新建訂單</el-button>
                    <el-button :disabled="!seleciton.length" @click="operate(1)">審核</el-button>
                    <el-button :disabled="!seleciton.length" @click="operate(2)">修改</el-button>
                    <el-button :disabled="!seleciton.length" @click="operate(3)">作廢</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table @selection-change="handleSelectionChange" :data="tableData" style="width: 100%"
                v-loading="loading" element-loading-text="拚命載入中..." element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="訂單號" prop="id"></el-table-column>
                <el-table-column label="序號" type="index"></el-table-column>
                <el-table-column label="狀態" prop="status">
                    <template slot-scope="scope">
                        <!-- 對該行數據進行操作 -->
                        <span v-if="scope.row.status == 1">待審核</span>
                        <span v-else-if="scope.row.status == 2">已審核</span>
                        <span v-else-if="scope.row.status == 3">審核通過</span>
                        <span v-else>審核拒絕</span>
                    </template>
                </el-table-column>
                <el-table-column label="下單時間" prop="date"></el-table-column>
                <el-table-column label="客戶名稱" prop="name"></el-table-column>
                <el-table-column label="起始城市" prop="start"></el-table-column>
                <el-table-column label="目的城市" prop="end"></el-table-column>
                <el-table-column label="貨物名稱" prop="cargo"></el-table-column>
                <el-table-column label="件數" prop="count"></el-table-column>
                <el-table-column label="單位" prop="unit"></el-table-column>
                <el-table-column label="運費" prop="price"></el-table-column>
                <el-table-column label="訂單來源" prop="from"></el-table-column>
                <el-table-column label="是否支付" prop="pay">
                    <template slot-scope="scope">
                        <!-- 對該行數據進行操作 -->
                        <span v-if="scope.row.pay == 1">已支付</span>
                        <span v-else>未支付</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="100px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">編輯</el-button>
                        <el-button size='mini' @click="edit(scope.row)" type="danger">刪除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                layout="total, sizes, prev, pager, next, jumper" :total="total" class="fr mt">
            </el-pagination>
            <div class="clear"></div>
        </el-card>
        <orders-modal :visible="visible" @hide="visible=false" @reload="loadData"></orders-modal>
        <!-- 因為是點擊了父組件才跳出視窗，所以要用父子傳值的方式控制這個視窗是否顯示 -->
    </div>
</template>

<script>
import breadCrumb from '@/components/BreadCrumb'
import { post } from '@/utils/https'
import OrdersModal from './OrdersModal.vue'
import {mapMutations} from 'vuex'
export default {
    components: {
        breadCrumb,OrdersModal
    },
    data() {
        return {
            loading: false,
            tableData: [],
            currentPage: 1,
            params: {
                page: 1,
                pageSize: 20,
                keyword: ''  //設計的和後端需要的一樣
            },
            total: 0,
            seleciton: [],
            visible:false
        }
    },
    created() {
        this.loadData()
    },
    methods: {
        async loadData() {
            this.loading = !this.loading //加載中
            const { data: { list, total } } = await post('/orderList', this.params)  //解構data裡的list和total
            this.loading = !this.loading //走到這行就是await結束，把加載中關掉
            this.tableData = list
            this.total = total
        },
        handleCurrentChange(page) {
            //console.log('頁碼改變'),page是被點到的頁碼，像是事件對象的形參
            this.params.page = page //點到誰就把頁碼變成點到的頁碼
            this.loadData()
        },
        handleSizeChange(pageSize) {
            //console.log('條數改變'),pagesize是每頁條數，像是事件對象的形參
            this.params.pageSize = pageSize
            this.loadData()
        },
        handleSelectionChange(seleciton) {
            this.seleciton = seleciton
        },
        operate() {
            const nos = this.seleciton.map(item => item.id)//對數組返回每一項的id
            this.$notify({
                title: '操作成功',
                message: nos,
                type: 'success'
            });
        },
        edit(row){
            console.log(row)
            this.visible=true //子元件彈窗顯示
            this.setRow(row) //提交vuex中的setRow mutation，並且把row的值傳過去使其修改vuex的row state
        },
        newAdd(){
            this.visible=true;
            this.setRow({})
        },
        ...mapMutations(['setRow'])

    }
}
</script>

<style lang="less" scoped></style>