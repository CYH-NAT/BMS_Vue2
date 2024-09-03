<template>
    <div>
        <el-row :gutter="24" style="margin-bottom: 20px;" class="total">
            <el-col :span="6">
                <el-card shadow="always" class="in" :body-style="{ paddingBottom: '20px' }">
                    <div class="fl">
                        <p>本月進件</p>
                        <p style="font-weight: bold;">6588</p>
                        <p>+20.12%
                            <span style="font-size: 12px;">與上月相比</span>
                        </p>
                    </div>
                    <i class="el-icon-tickets ico"></i>
                    <div class="clear"></div>
                    <!-- 不清浮動的話，無法撐開card -->
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="out">
                    <div class="fl">
                        <p>本月放款(元)</p>
                        <p style="font-weight: bold;">121000000</p>
                        <p>+1.25%
                            <span style="font-size: 12px;">與上月相比</span>
                        </p>
                    </div>
                    <i class="el-icon-money ico"></i>
                    <div class="clear"></div>
                    <!-- 不清浮動的話，無法撐開card -->
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="allin">
                    <div class="fl">
                        <p>累積進件</p>
                        <p style="font-weight: bold;">128700</p>
                        <p>+11.48%
                            <span style="font-size: 12px;">與去年相比</span>
                        </p>
                    </div>
                    <i class="el-icon-date ico"></i>
                    <div class="clear"></div>
                    <!-- 不清浮動的話，無法撐開card -->
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="allout">
                    <div class="fl">
                        <p>累計放款</p>
                        <p style="font-weight: bold;">923380079</p>
                        <p>-2.06%
                            <span style="font-size: 12px;">與去年相比</span>
                        </p>
                    </div>
                    <i class="el-icon-coin ico"></i>
                    <div class="clear"></div>
                    <!-- 不清浮動的話，無法撐開card -->
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-bottom: 20px;">
            <el-col :span="18">
                <el-card>
                    <div slot="header">進件統計分析</div>
                    <div style="height: 240px;" ref="analysis"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">進件統計分析</div>
                    <div style="height: 240px;" ref="percent"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-bottom: 20px;">
            <el-col :span="12">
                <el-card :body-style="{height:'650px'}">
                    <div class="block">
                        <el-timeline>
                            <el-timeline-item timestamp="2018/4/12" placement="top">
                                <el-card>
                                    <h4>更新 Github 模板</h4>
                                    <p>王小虎 提交于 2018/4/12 20:46</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/3" placement="top">
                                <el-card>
                                    <h4>更新 Github 模板</h4>
                                    <p>王小虎 提交于 2018/4/3 20:46</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                                <el-card>
                                    <h4>更新 Github 模板</h4>
                                    <p>王小虎 提交于 2018/4/2 20:46</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                                <el-card>
                                    <h4>更新 Github 模板</h4>
                                    <p>王小虎 提交于 2018/4/2 20:46</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                                <el-card>
                                    <h4>更新 Github 模板</h4>
                                    <p>王小虎 提交于 2018/4/2 20:46</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card :body-style="{height:'650px'}">
                    <el-calendar v-model="value">
                    </el-calendar>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import { get } from '@/utils/https'
export default {
    data() {
        return {
            xdata: [],
            ydata: [],
            value: new Date()
        }
    },
    created() {
        //頁面創建了，但尚未掛載組件，也找不到DOM
    },
    mounted() {
        //掛載完成才有DOM元素存在，才能用echart
        this.getData()
        this.drawPie()
    },
    methods: {
        drawLine() {
            //初始化一個容器
            let mychart = echarts.init(this.$refs.analysis)
            //寫好配置項
            const option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xdata
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: this.ydata,
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: '#4f88ff'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255,255,255,0.3)'
                                }
                            ])
                        }
                    }
                ]
            }
            mychart.setOption(option)
        },
        drawPie() {
            //初始化一個容器
            let mychart = echarts.init(this.$refs.percent)
            //寫好配置項
            const option = {
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ]
            };
            mychart.setOption(option)
        },
        async getData() {
            const { data } = await get('/line')
            this.xdata = Object.keys(data)//很像Array.isArray(數組)，返回一個鍵數組
            this.ydata = Object.values(data)
            this.drawLine()  //先讓後端傳資料，再繪圖。不然會因為異步代碼而無法顯示
        }
    }
}
</script>

<style lang="less" scoped>
.ico {
    float: right;
    font-size: 90px;
    color: rgba(255, 255, 255, 0.3);
    margin-bottom: 10px; //不加的話底部很窄
}

.total {
    p {
        line-height: 30px;
        color: #fff;
        font-size: 16px;
    }
}

.in {
    background: #4f88ff;
}

.allin {
    background: #5050ff;
}

.allout {
    background: #f49b3b;
}

.out {
    background: #f26075;
}
</style>