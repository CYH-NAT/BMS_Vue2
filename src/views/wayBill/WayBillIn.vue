<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                        <el-form-item label="客戶名稱" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客戶單號" prop="id">
                            <el-input v-model="ruleForm.id"></el-input>
                        </el-form-item>
                        <el-form-item label="貨物單位" prop="unit">
                            <el-select v-model="ruleForm.unit" placeholder="請選擇貨物單位">
                                <el-option label="噸" value="t"></el-option>
                                <el-option label="箱" value="box"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="配送時間" required>
                            <el-col :span="11">
                                <el-form-item prop="date1">
                                    <el-date-picker type="date" placeholder="選擇日期" v-model="ruleForm.date1"
                                        style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-time-picker placeholder="選擇時間" v-model="ruleForm.date2"
                                        style="width: 100%;"></el-time-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即時配送">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="配送地址">
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item>
                        <el-form-item label="承運方式" prop="way">
                            <el-radio-group v-model="ruleForm.way">
                                <el-radio label="個人"></el-radio>
                                <el-radio label="公司"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="備註">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即創建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm2" label-width="80px">
                        <el-form-item label="客戶名稱" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客戶單號" prop="id">
                            <el-input v-model="ruleForm.id"></el-input>
                        </el-form-item>
                        <el-form-item label="貨物單位" prop="unit">
                            <el-select v-model="ruleForm.unit" placeholder="請選擇貨物單位">
                                <el-option label="噸" value="t"></el-option>
                                <el-option label="箱" value="box"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="配送時間" required>
                            <el-col :span="11">
                                <el-form-item prop="date1">
                                    <el-date-picker type="date" placeholder="選擇日期" v-model="ruleForm.date1"
                                        style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-time-picker placeholder="選擇時間" v-model="ruleForm.date2"
                                        style="width: 100%;"></el-time-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即時配送">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="配送地址">
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item>
                        <el-form-item label="承運方式" prop="way">
                            <el-radio-group v-model="ruleForm.way">
                                <el-radio label="個人"></el-radio>
                                <el-radio label="公司"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="備註">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即創建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
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
    //--------------------------------------------------
    data() {
        return {
            ruleForm: {
                name: '',
                id: '',
                unit: '',
                date1: '',
                date2: '',
                delivery: false,
                address: '',
                type: [],
                way: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '請輸入客戶名稱', trigger: 'blur' },
                    { min: 3, max: 5, message: '長度為3到5個字', trigger: 'blur' }
                ],
                id: [
                    { required: true, message: '請輸入客戶單號', trigger: 'blur' },
                    { min: 12, max: 16, message: '長度為12到16個字', trigger: 'blur' }
                ],
                unit: [
                    { required: true, message: '請選擇貨物單位', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '請選擇日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '請選擇時間', trigger: 'change' }
                ],
                way: [
                    { required: true, message: '請選擇承運方式', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="less" scoped></style>