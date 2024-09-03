<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-input placeholder="請輸入訂單號" v-model="params.No"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="請輸入客戶名稱" v-model="params.name"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="開始日期"
                        end-placeholder="结束日期" style="width: 100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-col>
                <el-col :span="6" class="tr">
                    <el-button type="primary" @click="loadData">查詢</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" v-loading="loading" element-loading-text="拚命載入中..."
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column prop="no" label="編號ID"></el-table-column>
                <el-table-column prop="nickname" label="簡稱"></el-table-column>
                <el-table-column prop="permit" label="許可證號"></el-table-column>
                <el-table-column prop="contact" label="聯絡人/電話"></el-table-column>
                <el-table-column prop="cartype" label="類型"></el-table-column>
                <el-table-column prop="date" label="註冊時間"></el-table-column>
                <el-table-column prop="name" label="承運商名稱"></el-table-column>
                <el-table-column prop="code" label="信用代碼">
                    <template slot-scope="scope">
                        <!-- 對該行數據進行操作 -->
                        {{ scope.row.code == 1 ? '無' : '有' }}
                    </template>
                </el-table-column>
                <el-table-column prop="register" label="註冊地"></el-table-column>
                <el-table-column prop="needreport" label="是否上報">
                    <template slot-scope="scope">
                        <!-- 對該行數據進行操作 -->
                        {{ scope.row.code == 1 ? '否' : '是' }}
                    </template>
                </el-table-column>
                <el-table-column prop="credit" label="信用分"></el-table-column>
                <el-table-column label="操作" min-width="100px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">編輯</el-button>
                        <el-button size='mini' @click="edit(scope.row)" type="danger">刪除</el-button>
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
import breadCrumb from '@/components/BreadCrumb'
import { post } from '@/utils/https'
export default {
    components: {
        breadCrumb
    },
    data() {
        return {
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
            const { data: { list, total } } = await post('/carrierList', { ...this.params, ...this.pageData, startDate, endDate })
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
    created() {
        this.loadData()
    }
}
</script>

<style lang="less" scoped></style>