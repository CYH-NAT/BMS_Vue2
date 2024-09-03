import Mock from 'mockjs'

// Mock.mock('接口地址','請求參數','收到請求要做的事')

Mock.setup({
    timeout:500
})

Mock.mock('http://localhost:8080/login','post',(req)=>{
    //後端接收到的req裡面包含 1.url 2.type 3.body
    console.log('後端接收的請求是',JSON.parse(req.body))
    const {username,password} = JSON.parse(req.body)
    if(username=='admin'&&password=='123456'){ //省略了數據庫查詢
        return {
            code:200,  //後端定義的提示碼
            success:true,  //後端定義的成功
            message:'登入成功',
            nickname:'趙鐵柱',
            token:'asdfg', //後端給出的像門禁卡的玩意，後端加密算出來的東西
            role:'boss' //後端認出來的權限
        }
    }else{
        return{
            code:100,
            success:false,
            message:'帳號或者密碼有誤'
        }
    }

})

//根據token獲取權限
Mock.mock("http://localhost:8080/getRole","get",()=>{
    return{
            code:200,
            success:true,
            message:"請求成功",
            role:"boss"
    }
})

const menuList = [
    {
        name: "首頁",
        icon: "el-icon-s-home",
        url: "/index",
    },
    {
        name: "訂單管理",
        icon: "el-icon-s-order",
        url: "/order",
        children: [
            {
                name: "訂單列表",
                icon: "el-icon-user",
                url: "/orders/list",
            }
        ]
    },
    {
        name: "運單管理",
        icon: "el-icon-menu",
        url: "/waybill",
        children: [
            {
                name: "運單錄入",
                icon: "el-icon-notebook-2",
                url: "/waybill/in",
            },
            {
                name: "運單列表",
                icon: "el-icon-truck",
                url: "/waybill/list",
            }
        ]
    },
    {
        name: "發車管理",
        icon: "el-icon-s-order",
        url: "/depart",
        children: [
            {
                name: "發車數據單",
                icon: "el-icon-tickets",
                url: "/depart/data",
            }
        ]
    },
    {
        name: "承運商管理",
        icon: "el-icon-user",
        url: "/carrier",
        children: [
            {
                name: "承運商列表",
                icon: "el-icon-chat-square",
                url: "/carrier/list",
            },
            {
                name: "車輛列表",
                icon: "el-icon-bank-card",
                url: "/carrier/trucks",
            },
            {
                name: "承運司機列表",
                icon: "el-icon-bank-card",
                url: "/carrier/driverlist",
            },
        ]
    },
    {
        name: "客户管理",
        icon: "el-icon-chat-dot-square",
        url: "/customer",
    },
    {
        name: "財務管理",
        icon: "el-icon-user",
        url: "/my",
        children: [
            {
                name: "客户對帳單",
                icon: "el-icon-chat-square",
                url: "/customer/info",
            },
            {
                name: "承運商對帳單",
                icon: "el-icon-bank-card",
                url: "/record",
            }
        ]
    },
    {
        name: "個人中心",
        icon: "el-icon-chat-dot-square",
        url: "/personal",
    },
    {
        name: "考勤頁面",
        icon: "el-icon-chat-dot-square",
        url: "/attendance",
    },
    {
        name: "工資頁面",
        icon: "el-icon-chat-dot-square",
        url: "/salary",
    },
]


Mock.mock('http://localhost:8080/menu','get',()=>{  //前端得菜單的方法不用傳參數，所以不必對req做處理
    return {
        code:200,
        success:true,
        massage:'請求成功',
        data:menuList  //把菜單數組回傳
    }

})


//入職日期接口
Mock.mock("http://localhost:8080/in","get",()=>{
    return{
            code:200,
            success:true,
            message:"請求成功",
            time:"2020-07-01 00:00:00"
    }
})

Mock.mock("http://localhost:8080/line","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:{
            "22-01":30,
            "22-02":84,
            "22-03":56,
            "22-04":47,
            "22-05":84,
            "22-06":61,
            "22-07":90,
        } 
    }
})

//訂單管理-訂單列表
Mock.mock('http://localhost:8080/orderList', 'post', (req) => {
    const { page, pageSize,keyword } = JSON.parse(req.body);
    console.log("接口接收到参数:",page,pageSize,keyword)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|+1': 10000,//订单号
                'status|1': [1,2,3,4],//订单状态 1待审核 2已审核 3审核通过 4审核拒绝
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'unit|1': ["方","吨"],//单位
                "price":Mock.Random.integer(5000,50000),//运费
                "from|1":["移動端","PC端"],
                "pay|1":[1,2],//是否支付 1 已支付 2未支付     
            }],
            "total": 47
        })
    }
})

//新增訂單
Mock.mock('http://localhost:8080/addOrder',"post",(req)=>{
    const  {name,start,end,cargo,count,unit,price,from,pay} =JSON.parse(req.body);
    console.log("新建订单接口收到参数:",name,start,end,cargo,count,unit,price,from,pay)
    return{
        code:200,
        success:true,
        message:"新建成功", 
    }
})

//運單管理-運單列表
Mock.mock('http://localhost:8080/waybillList', 'post', (req) => {
     const { page, pageSize,waybillNo,name,startDate,endDate,status } = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,waybillNo,name,startDate,endDate,status)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{  //隨機產生{pagesize}個數據
                'no|+1': 10000,//订单号，以10000開始自增1
                'date': Mock.Random.date(),//下单时间，隨機日期
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称，從數組中取1個
                'cargo': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                "price":Mock.Random.integer(5000,50000),//运费
                "needReceive|1":[1,2],//需要接货 1需要 2不需要
                'plateNumber|1': ["京A12345","苏C66666","鲁B45678"],//车牌号
                 "driver":Mock.Random.cname(),  //隨機生成人名
                 "tel|1":[18888888888,15577896554,15789654785,13698745269],
                 "percent|1":[37,22,89,65,80,74,56]
   
            }],
            "total": 47  //數據一共多少條
        })
    }
})

//承運商管理-承運列表
Mock.mock('http://localhost:8080/carrierList', 'post', (req) => {
     const { page, pageSize,No,name,startDate,endDate,status } = JSON.parse(req.body);
     console.log("服務端接收到参数",page, pageSize,No,name,startDate,endDate,status)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{  //隨機產生{pagesize}個數據
                'no|+1': 10000,//訂單編號，以10000開始自增1
                'nickname|1': ["順風"],//客户名，從數組中取1個
                'permit|1': ["D123456789"],//許可證號
                'contact|1': ["張三/0912345678"],//聯絡人與電話
                'cartype|1': ["自有車"],//承運車類型
                'date': Mock.Random.date(),//註冊時間，隨機日期
                'name|1': ["順風運輸有限公司"],//客户名，從數組中取1個
                "code|1":[1,2],//信用代碼 1無2有
                'register|1': ["臺北市"],//註冊地址
                "needreport|1":[1,2],//需要上報 1需要 2不需要
                "credit|1":[80,85,90,95],//信用分
            }],
            "total": 62  //數據一共多少條
        })
    }
})

//承運商管理-承運列表
Mock.mock('http://localhost:8080/customerList', 'post', (req) => {
     const { page, pageSize,No,name,startDate,endDate,status } = JSON.parse(req.body);
     console.log("服務端接收到参数",page, pageSize,No,name,startDate,endDate,status)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{  //隨機產生{pagesize}個數據
                'id|+1': 10000,//訂單編號，以10000開始自增1
                'nickname|1': ["晴空"],//客户名，從數組中取1個
                'name|1': ["晴空運輸有限公司"],//客户名，從數組中取1個
                'mainBusiness|1': ["紡織品出口"],//主要業務
                'balance|1': [880000],//帳戶餘額
                "confirm|1":[1],//認證狀態 1有2無
                'mile|1': ["25000公里"],//里程數
                'contact|1': ["劉德華"],//聯絡人
                "cell|1":['0912345678'],//信用代碼 1無2有
                'register|1': ["臺北市"],//註冊地址
                "account|1":['409554253981'],//銀行帳戶
            }],
            "total": 99  //數據一共多少條
        })
    }
})