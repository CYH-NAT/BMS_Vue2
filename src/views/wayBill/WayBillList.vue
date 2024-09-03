<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-input placeholder="請輸入訂單號" v-model="params.waybillNo"></el-input>
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
            <el-radio-group v-model="params.status" @input="loadData">
                <!-- 狀態也會發送至後端，所以沒差 -->
                <el-radio-button :label="1">全部運單(300)</el-radio-button>
                <el-radio-button :label="2">裝貨中(158)</el-radio-button>
                <el-radio-button :label="3">運輸中(42)</el-radio-button>
                <el-radio-button :label="4">已完成(100)</el-radio-button>
                <el-radio-button :label="5">運單異常(1)</el-radio-button>
            </el-radio-group>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" v-loading="loading" element-loading-text="拚命載入中..."
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="index" label="序號"></el-table-column>
                <el-table-column prop="no" label="運單號"></el-table-column>
                <el-table-column prop="date" label="下單時間"></el-table-column>
                <el-table-column prop="name" label="客戶名稱"></el-table-column>
                <el-table-column prop="cargo" label="貨物名稱"></el-table-column>
                <el-table-column prop="count" label="件數"></el-table-column>
                <el-table-column prop="start" label="起始地"></el-table-column>
                <el-table-column prop="end" label="目的地"></el-table-column>
                <el-table-column prop="price" label="運費"></el-table-column>
                <el-table-column prop="needReceive" label="需要接貨">
                    <template slot-scope="scope">
                        <!-- 對該行數據進行操作 -->
                        {{ scope.row.needReceive == 1 ? '需要' : '不需要' }}
                    </template>
                </el-table-column>
                <el-table-column prop="plateNumber" label="車牌號"></el-table-column>
                <el-table-column prop="driver" label="司機"></el-table-column>
                <el-table-column prop="tel" label="司機電話"></el-table-column>
                <el-table-column prop="percent" label="運輸進度">
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.percent"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="120px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="jump">詳情</el-button>
                        <el-button size='mini' @click="edit(scope.row)" type="danger">修改</el-button>
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
            demo: 'demo1',
            params: {
                waybillNo: '',
                name: '',
                status: 1
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
    //緩存組件被重新激活的時候觸發的生命週期
    activated() {
        console.log('緩存的組件又被重新激活了')
    },
    deactivated() {
        console.log('緩存的組件失活了')
    },
    beforeRouteLeave(to, from, next) {
        if (to.path != '/waybill/list/detail') {
            this.clearCache()
            console.log('我跑囉')
        }
        next()
    },
    methods: {
        async loadData() {
            this.loading = true
            const [startDate, endDate] = this.date //日期對象是不會在前後端交互中出現，通常換成字串或時間戳
            const { data: { list, total } } = await post('/waybillList', { ...this.params, ...this.pageData, startDate, endDate })
            this.loading = false
            this.tableData = list;
            this.total = total;
        },
        reset() {
            this.params = { waybillNo: '', name: '', status: 1 };
            this.date = ['', ''];
            this.pageData = { page: 1, pageSize: 10 };
            this.loadData()
            console.log('shit')
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
        edit(e){
            console.log(e)
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