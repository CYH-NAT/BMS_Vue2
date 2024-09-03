//混入 可以在js文件中按照vue配置項那樣子編寫代碼
export default{
    data(){
        return {
            breadList:[]
        }
    },
    created(){
        this.getBreadCrumb();
    },
    watch:{
        $route(){  //監控路由
            this.getBreadCrumb()
        }
    },
    methods:{
        getBreadCrumb(){
            this.breadList=this.$route.meta.bread||[]
        }
    }
}