<template>
    <div>
        <el-dialog :title="title" :visible="visible" width="50%" @close="close">
            <el-row :gutter="24">
                <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
                    <el-col :span="12">
                        <el-form-item label="客戶名稱" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="起始城市" prop="name">
                            <el-input v-model="ruleForm.start"></el-input>
                        </el-form-item>
                        <el-form-item label="目的城市" prop="end">
                            <el-input v-model="ruleForm.end"></el-input>
                        </el-form-item>
                        <el-form-item label="貨物名稱" prop="cargo">
                            <el-input v-model="ruleForm.cargo"></el-input>
                        </el-form-item>
                        <el-form-item label="件數" prop="count">
                            <el-input v-model="ruleForm.count"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="單位" prop="unit">
                            <el-input v-model="ruleForm.unit"></el-input>
                        </el-form-item>
                        <el-form-item label="運費" prop="price">
                            <el-input v-model="ruleForm.price"></el-input>
                        </el-form-item>
                        <el-form-item label="訂單來源" prop="from">
                            <el-radio-group v-model="ruleForm.from">
                                <el-radio label="移動端"></el-radio>
                                <el-radio label="PC端"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="支付狀態" prop="pay">
                            <el-radio-group v-model="ruleForm.pay">
                                <el-radio :label="1">已支付</el-radio>
                                <el-radio :label="2">未支付</el-radio>
                                <!-- 如果沒給名字，預設label名是顯示的名字 -->
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { post } from '@/utils/https'
import {mapState} from 'vuex'
export default {
    props: ["visible"],//寫變量的名字(字串)
    methods: {
        close() {
            this.$emit('hide', '視窗關閉啦')
        },
        save() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    const { message } = await post('/addOrder', this.ruleForm)
                    this.$message({
                        message,
                        type: 'success'
                    })
                    this.close();  //點完保存關掉窗口
                    this.$emit('reload')
                    this.ruleForm = {  //重新清空表單給下次使用
                        name: '',
                        start: '',
                        end: '',
                        cargo: '',
                        count: '',
                        unit: '',
                        price: '',
                        from: '',
                        pay: ''
                    }
                }
            })
        }
    },
    data() {
        return {
            rules: {
                name: [{ required: true, message: '不能為空', trigger: "blur" }],
                start: [{ required: true, message: '不能為空', trigger: "blur" }],
                end: [{ required: true, message: '不能為空', trigger: "blur" }],
                cargo: [{ required: true, message: '不能為空', trigger: "blur" }],
                count: [{ required: true, message: '不能為空', trigger: "blur" }],
                unit: [{ required: true, message: '不能為空', trigger: "blur" }],
                price: [{ required: true, message: '不能為空', trigger: "blur" }],
                from: [{ required: true, message: '不能為空', trigger: "change" }],
                pay: [{ required: true, message: '不能為空', trigger: "change" }]
            },
            ruleForm: {
                name: '',
                start: '',
                end: '',
                cargo: '',
                count: '',
                unit: '',
                price: '',
                from: '',
                pay: ''
            },
            title:'新建訂單'
        }
    },
    computed:{
        ...mapState(['row'])//把vuex的row引進來計算並更新
    },
    watch:{
        visible(){
            this.ruleForm=this.row //彈窗有顯示變換的時候，讓表單內容=row的內容
            this.title=Object.keys(this.ruleForm).length?'修改訂單':'新建訂單'
            delete this.ruleForm.id
            delete this.ruleForm.date
            delete this.ruleForm.status
        }
    }
}
</script>

<style lang="less" scoped></style>